"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { ASSETS } from "./brand";
import { delay } from "./motion";

// The hero mosaic is a 13 × 6 grid of 80px modules with 12px gaps, laid out on a
// 1184 × 540 artboard. Lengths use container query units so it scales as one piece.
const m = (px: number) => `${(px / 11.84).toFixed(3)}cqw`;

/** Grid cell (1-based column/row, span in modules) to artboard position and size. */
const cell = (col: number, row: number, span = 1) => ({
  left: (col - 1) * 92,
  top: (row - 1) * 92,
  size: span * 80 + (span - 1) * 12,
});

type Tone = "sky" | "glass" | "coral" | "sun";
const toneClass: Record<Tone, string> = {
  sky: "solid-tile bg-sky",
  glass: "glass",
  coral: "solid-tile bg-coral",
  sun: "solid-tile bg-sun",
};

const EYES: [number, number, "sky" | "coral"][] = [
  [1, 1, "sky"],
  [11, 1, "coral"],
  [1, 4, "sky"],
];

const PHOTOS: { key: string; src: string; col: number; row: number; span: number }[] = [
  { key: "court", src: ASSETS.photoCourt, col: 4, row: 1, span: 2 },
  { key: "pay", src: ASSETS.photoPay, col: 6, row: 1, span: 3 },
  { key: "stall", src: ASSETS.photoStall, col: 9, row: 1, span: 2 },
  { key: "han", src: ASSETS.photoHan, col: 4, row: 4, span: 2 },
  { key: "float", src: ASSETS.photoFloat, col: 6, row: 4, span: 2 },
  { key: "bkk", src: ASSETS.photoBkk, col: 9, row: 4, span: 2 },
  { key: "x1", src: ASSETS.photoX1, col: 12, row: 4, span: 2 },
];

const MODULES: [number, number, Tone][] = [
  [4, 3, "sky"],
  [5, 3, "glass"],
  [9, 3, "glass"],
  [10, 3, "sun"],
  [8, 4, "coral"],
  [8, 5, "glass"],
  [4, 6, "sun"],
  [5, 6, "glass"],
  [6, 6, "glass"],
  [7, 6, "sky"],
  [8, 6, "glass"],
  [9, 6, "sky"],
  [10, 6, "glass"],
  [11, 4, "sky"],
  [11, 5, "glass"],
  [11, 6, "glass"],
  [12, 6, "glass"],
  [13, 6, "sky"],
];

// Payments the loop "makes": which photo gets scanned and where its tag appears.
// Tags are anchored so they stay inside the visible part of the grid on phones too
// (the stall tag by its right edge, just inside the right finder eye).
const PAYMENTS: { label: string; photo: string; top: number; left?: number; right?: number }[] = [
  { label: "Chicken rice, THB 50", photo: "stall", right: 924, top: 142 },
  { label: "Iced coffee, VND 25,000", photo: "han", left: 290, top: 258 },
  { label: "Fruit, THB 60", photo: "float", left: 496, top: 416 },
];

// Pieces pop in as a ripple spreading out from the middle of the grid
const rippleDelay = (left: number, top: number, size: number) =>
  600 + Math.hypot(left + size / 2 - 592, (top + size / 2 - 270) * 1.4) * 0.75;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Scan a photo, mark it paid, show its tag; repeat for each payment, then start over. */
function usePaymentLoop(stageRef: React.RefObject<HTMLDivElement | null>) {
  const [scanning, setScanning] = useState<string | null>(null);
  const [paid, setPaid] = useState<string | null>(null);
  const [shown, setShown] = useState<boolean[]>(() => PAYMENTS.map(() => false));

  useEffect(() => {
    // With reduced motion there is no loop; CSS shows every tag instead
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let onScreen = true;
    const observer = new IntersectionObserver(([entry]) => (onScreen = entry.isIntersecting));
    if (stageRef.current) observer.observe(stageRef.current);
    // Pause while the hero is scrolled away or the tab is in the background
    const ready = async () => {
      while (!cancelled && (!onScreen || document.hidden)) await wait(400);
      return !cancelled;
    };

    (async () => {
      await wait(2300); // let the intro finish
      for (let i = 0; ; i++) {
        const index = i % PAYMENTS.length;
        if (index === 0 && i > 0) {
          setShown(PAYMENTS.map(() => false));
          await wait(600);
        }
        if (!(await ready())) return;
        const { photo } = PAYMENTS[index];
        setScanning(photo);
        await wait(1400);
        if (cancelled) return;
        setScanning(null);
        setPaid(photo);
        setShown((current) => current.map((on, j) => on || j === index));
        await wait(450);
        if (cancelled) return;
        setPaid(null);
        await wait(1500);
      }
    })();

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [stageRef]);

  return { scanning, paid, shown };
}

const FinderEye: React.FC<{ col: number; row: number; pupil: "sky" | "coral" }> = ({ col, row, pupil }) => {
  const { left, top, size } = cell(col, row, 3);
  return (
    <div
      data-reveal="pop"
      className="absolute flex items-center justify-center border-solid border-sky"
      style={delay(rippleDelay(left, top, size), {
        left: m(left),
        top: m(top),
        width: m(size),
        height: m(size),
        borderWidth: m(28),
        borderRadius: m(64),
      })}
    >
      <div
        className={pupil === "sky" ? "bg-sky" : "bg-coral"}
        style={{ width: m(106), height: m(106), borderRadius: m(29) }}
      />
    </div>
  );
};

const QrMosaic: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const { scanning, paid, shown } = usePaymentLoop(stageRef);

  return (
    // Wider than the viewport on small screens so the photos stay legible. The hero's
    // flex centring keeps it centred (overflowing equally on both sides) and clips the edges.
    <div
      className="relative shrink-0 [container-type:inline-size]"
      style={{ width: "min(1184px, max(680px, 100% - 40px))" }}
      role="img"
      aria-label="Street-food stalls and markets in Thailand, Vietnam and the Philippines, paid by scanning their QR codes with Quikku"
    >
      <div ref={stageRef} className="relative w-full" style={{ aspectRatio: "1184 / 540" }} aria-hidden="true">
        {EYES.map(([col, row, pupil]) => (
          <FinderEye key={`${col}-${row}`} col={col} row={row} pupil={pupil} />
        ))}

        {PHOTOS.map(({ key, src, col, row, span }) => {
          const { left, top, size } = cell(col, row, span);
          const state = scanning === key ? "scan" : paid === key ? "paid" : undefined;
          return (
            // Outer element pops in; inner element carries the scan / paid states
            <div
              key={key}
              data-reveal="pop"
              className="absolute"
              style={delay(rippleDelay(left, top, size), {
                left: m(left),
                top: m(top),
                width: m(size),
                height: m(size),
              })}
            >
              <div
                data-state={state}
                className="mosaic-photo relative size-full overflow-hidden shadow-[0_16px_36px_-10px_rgba(0,13,46,0.7)]"
                style={{ borderRadius: m(size * 0.2) }}
              >
                <img src={src} alt="" width={360} height={360} className="size-full object-cover" />
                {state === "scan" && <span className="scan-beam" />}
              </div>
            </div>
          );
        })}

        {MODULES.map(([col, row, tone]) => {
          const { left, top, size } = cell(col, row);
          return (
            <div
              key={`${col}-${row}`}
              data-reveal="pop"
              className={`absolute ${toneClass[tone]}`}
              style={delay(rippleDelay(left, top, size), {
                left: m(left),
                top: m(top),
                width: m(size),
                height: m(size),
                borderRadius: m(20),
              })}
            />
          );
        })}

        {PAYMENTS.map(({ label, left, right, top }, i) => (
          <div
            key={label}
            data-paid-tag
            data-on={shown[i] || undefined}
            className="absolute z-10 flex items-center rounded-full bg-white shadow-[0_10px_24px_-6px_rgba(0,13,46,0.55)]"
            // Text never drops below 10px; spacing is in em so the pill grows with it
            style={{
              ...(right !== undefined ? { right: m(1184 - right) } : { left: m(left ?? 0) }),
              top: m(top),
              fontSize: `max(10px, ${m(13)})`,
              gap: "0.6em",
              padding: "0.6em 1.1em 0.6em 0.75em",
            }}
          >
            <div
              className="flex shrink-0 items-center justify-center rounded-full bg-deep-blue"
              style={{ width: "1.55em", height: "1.55em" }}
            >
              <Check strokeWidth={3.5} className="block size-[60%] text-sky" />
            </div>
            <span className="whitespace-nowrap font-semibold leading-[normal] text-deep-blue">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QrMosaic;
