import React from "react";
import { ASSETS } from "./brand";
import PhoneMockup from "./PhoneMockup";

// The hero "QR mosaic" is laid out on a 1184 × 540 artboard. Lengths use
// container query units so the whole composition scales as one piece.
const m = (px: number) => `${(px / 11.84).toFixed(3)}cqw`;

type Tone = "sky" | "white" | "coral" | "sun";
const toneClass: Record<Tone, string> = {
  sky: "bg-sky",
  // "White" modules sit at 10% opacity in the design
  white: "bg-white/10",
  coral: "bg-coral",
  sun: "bg-sun",
};

const PHOTOS: [string, number, number][] = [
  [ASSETS.photoHan, 276, 0],
  [ASSETS.photoMnl, 0, 276],
  [ASSETS.photoVn2, 276, 276],
  [ASSETS.photoBkk, 736, 0],
  [ASSETS.photoVn1, 736, 276],
  [ASSETS.photoX1, 1012, 276],
];

const MODULES: [number, number, Tone][] = [
  [276, 184, "sky"],
  [368, 184, "white"],
  [184, 276, "coral"],
  [184, 368, "white"],
  [0, 460, "white"],
  [92, 460, "sky"],
  [184, 460, "white"],
  [276, 460, "sun"],
  [368, 460, "white"],
  [736, 184, "white"],
  [828, 184, "sun"],
  [920, 276, "sky"],
  [920, 368, "white"],
  [736, 460, "sky"],
  [828, 460, "white"],
  [920, 460, "white"],
  [1012, 460, "white"],
  [1104, 460, "sky"],
];

const PAID_TAGS: [string, number, number][] = [
  ["Iced coffee · VND 25,000", 248, 144],
  ["Mango · THB 40", 776, 144],
  ["Turon · PHP 30", -20, 420],
];

const FinderEye: React.FC<{ left: number; pupil: "sky" | "coral" }> = ({ left, pupil }) => (
  <div
    className="absolute flex items-center justify-center border-solid border-sky"
    style={{ left: m(left), top: 0, width: m(264), height: m(264), borderWidth: m(29), borderRadius: m(66) }}
  >
    <div className={pupil === "sky" ? "bg-sky" : "bg-coral"} style={{ width: m(106), height: m(106), borderRadius: m(29) }} />
  </div>
);

const QrMosaic: React.FC = () => (
  // Wider than the viewport on small screens so the phone stays legible;
  // the hero clips the overflowing edges.
  <div
    className="relative left-1/2 -translate-x-1/2 [container-type:inline-size]"
    style={{ width: "min(1184px, max(680px, 100% - 40px))" }}
    role="img"
    aria-label="Quikku paying local QR codes: a payment confirmation for THB 180.00 surrounded by street-food purchases in Vietnam, Thailand and the Philippines"
  >
    <div className="relative w-full" style={{ aspectRatio: "1184 / 540" }} aria-hidden="true">
      <PhoneMockup
        frameStyle={{
          left: m(460),
          top: m(-32),
          width: m(264),
          height: m(572.336),
          borderWidth: m(8),
          borderRadius: m(36),
        }}
        screenWidth={m(264)}
      />

      <FinderEye left={0} pupil="sky" />
      <FinderEye left={920} pupil="coral" />

      {PHOTOS.map(([src, left, top]) => (
        <img
          key={src}
          src={src}
          alt=""
          className="absolute max-w-none object-cover"
          style={{ left: m(left), top: m(top), width: m(172), height: m(172), borderRadius: m(36) }}
        />
      ))}

      {MODULES.map(([left, top, tone]) => (
        <div
          key={`${left}-${top}`}
          className={`absolute ${toneClass[tone]}`}
          style={{ left: m(left), top: m(top), width: m(80), height: m(80), borderRadius: m(20) }}
        />
      ))}

      {PAID_TAGS.map(([label, left, top]) => (
        <div
          key={label}
          className="absolute flex items-center rounded-full bg-white"
          style={{ left: m(left), top: m(top), gap: m(8), padding: `${m(8)} ${m(14)} ${m(8)} ${m(10)}` }}
        >
          <div
            className="flex shrink-0 items-center justify-center rounded-full bg-deep-blue"
            style={{ width: m(20), height: m(20) }}
          >
            <img src={ASSETS.check} alt="" className="block" style={{ width: m(12), height: m(12) }} />
          </div>
          <span className="whitespace-nowrap font-semibold leading-[normal] text-deep-blue" style={{ fontSize: m(13) }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default QrMosaic;
