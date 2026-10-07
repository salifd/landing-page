import React from "react";
import RateLockCountdown from "./RateLockCountdown";
import { delay } from "./motion";

// "Confirm payment" screen from the design, drawn on a 264px-wide artboard.
// Every length is expressed in container query units so the phone scales
// with the QR mosaic it sits in. The mosaic passes the frame's position,
// size and border via `frameStyle` / `screenWidth` in its own units.
const p = (px: number) => `${(px / 2.64).toFixed(3)}cqw`;

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex w-full items-center leading-[normal]">
    <span className="min-w-0 flex-1 text-stone" style={{ fontSize: p(8.733) }}>
      {label}
    </span>
    <span className="shrink-0 font-semibold text-deep-blue" style={{ fontSize: p(9.405) }}>
      {value}
    </span>
  </div>
);

const PhoneMockup: React.FC<{ frameStyle: React.CSSProperties; screenWidth: string }> = ({
  frameStyle,
  screenWidth,
}) => (
  <div
    data-reveal="rise"
    className="absolute overflow-hidden border-solid border-midnight bg-cream shadow-[0_0_0_1px_rgba(166,225,250,0.3),0_40px_80px_-24px_rgba(0,8,30,0.75)]"
    style={delay(520, frameStyle)}
  >
    <div
      className="absolute left-0 top-0 overflow-hidden bg-cream text-deep-blue [container-type:inline-size]"
      style={{ width: screenWidth, aspectRatio: "264 / 572.336" }}
    >
      <p
        className="absolute font-display font-semibold leading-[normal]"
        style={{ left: p(16.12), top: p(10.75), fontSize: p(10.076) }}
      >
        9:41
      </p>
      <div
        className="absolute rounded-full bg-white"
        style={{ left: p(16.12), top: p(37.62), width: p(29.557), height: p(29.557) }}
      />
      <p
        className="absolute -translate-x-1/2 text-center font-display font-semibold leading-[normal]"
        style={{ left: p(30.9), top: p(43.66), width: p(29.557), fontSize: p(13.435) }}
      >
        ←
      </p>
      <p
        className="absolute whitespace-nowrap font-display font-semibold"
        style={{ left: p(16.12), top: p(79.27), fontSize: p(14.779), lineHeight: p(18.809) }}
      >
        Confirm payment
      </p>

      {/* Merchant row */}
      <div
        className="absolute flex items-center bg-white"
        style={{
          left: p(16.12),
          top: p(110.17),
          width: p(231.756),
          padding: p(9.405),
          gap: p(8.061),
          borderRadius: p(12.092),
        }}
      >
        <div className="shrink-0 rounded-full bg-sky" style={{ width: p(29.557), height: p(29.557) }} />
        <div className="flex min-w-0 flex-1 flex-col items-start leading-[normal]" style={{ gap: p(2.687) }}>
          <div className="flex items-center" style={{ gap: p(5.374) }}>
            <span className="whitespace-nowrap font-semibold" style={{ fontSize: p(10.076) }}>
              Somtam Jay So
            </span>
            <span
              className="whitespace-nowrap bg-sky font-semibold"
              style={{ fontSize: p(7.389), padding: `${p(2.015)} ${p(5.374)}`, borderRadius: p(6.046) }}
            >
              Thai QR
            </span>
          </div>
          <span className="whitespace-nowrap text-stone" style={{ fontSize: p(8.061) }}>
            Bangkok · Merchant QR
          </span>
        </div>
      </div>

      <p
        className="absolute whitespace-nowrap font-display font-bold"
        style={{ left: p(16.12), top: p(176), fontSize: p(26.87), lineHeight: p(32.244) }}
      >
        THB 180.00
      </p>
      <p
        className="absolute leading-[normal] text-stone"
        style={{ left: p(16.12), top: p(213.62), width: p(231.756), fontSize: p(8.733) }}
      >
        The merchant receives this exact amount in baht.
      </p>

      {/* Cost breakdown */}
      <div
        className="absolute flex flex-col items-start bg-white"
        style={{
          left: p(16.12),
          top: p(239.15),
          width: p(231.756),
          padding: p(13.435),
          gap: p(9.405),
          borderRadius: p(13.435),
        }}
      >
        <Row label="Amount in baht" value="THB 180.00" />
        <Row label="Exchange rate" value="1 EUR = 37.96 THB" />
        <Row label="Quikku fee · Free plan" value="€0.09" />
        <div className="w-full bg-hairline" style={{ height: p(0.672), borderRadius: p(0.336) }} />
        <div className="flex w-full items-center leading-[normal]">
          <span className="min-w-0 flex-1 font-semibold" style={{ fontSize: p(10.076) }}>
            Total charged to card
          </span>
          <span className="shrink-0 font-display font-semibold" style={{ fontSize: p(11.42) }}>
            €4.83
          </span>
        </div>
      </div>

      <div
        className="absolute flex items-center whitespace-nowrap leading-[normal]"
        style={{ left: p(16.12), top: p(381.56), gap: p(4.031), fontSize: p(8.061) }}
      >
        <span className="text-stone">On Pro this payment would cost</span>
        <span className="font-semibold">€4.78</span>
      </div>

      {/* Card selector */}
      <div
        className="absolute flex items-center bg-white"
        style={{
          left: p(16.12),
          top: p(403.05),
          width: p(231.756),
          padding: `${p(9.405)} ${p(10.748)} ${p(9.405)} ${p(9.405)}`,
          gap: p(8.061),
          borderRadius: p(12.092),
        }}
      >
        <div className="shrink-0 bg-deep-blue" style={{ width: p(26.87), height: p(17.466), borderRadius: p(3.359) }} />
        <div
          className="flex min-w-0 flex-1 flex-col items-start whitespace-nowrap leading-[normal]"
          style={{ gap: p(1.344) }}
        >
          <span className="font-semibold" style={{ fontSize: p(9.405) }}>
            Visa •••• 0612
          </span>
          <span className="text-stone" style={{ fontSize: p(8.061) }}>
            Charged in EUR
          </span>
        </div>
        <span className="shrink-0 whitespace-nowrap font-semibold leading-[normal]" style={{ fontSize: p(8.733) }}>
          Change
        </span>
      </div>

      <div className="absolute flex items-center" style={{ left: p(16.12), top: p(456.79), gap: p(5.374) }}>
        <span className="relative flex shrink-0" style={{ width: p(5.374), height: p(5.374) }}>
          <span className="absolute inset-0 animate-ping-soft rounded-full bg-coral" />
          <span className="relative size-full rounded-full bg-coral" />
        </span>
        <span className="whitespace-nowrap leading-[normal] text-stone" style={{ fontSize: p(8.061) }}>
          Rate locked for <RateLockCountdown />
        </span>
      </div>

      <div
        className="absolute flex items-center justify-center bg-coral"
        style={{
          left: p(16.12),
          top: p(480.98),
          width: p(231.756),
          height: p(37.618),
          borderRadius: p(18.809),
          boxShadow: `0 ${p(5.374)} ${p(13.435)} ${p(-2.687)} rgba(255,92,92,0.35)`,
        }}
      >
        <span
          className="whitespace-nowrap font-display font-semibold leading-[normal] text-white"
          style={{ fontSize: p(11.42) }}
        >
          Pay THB 180.00
        </span>
      </div>
      <p
        className="absolute -translate-x-1/2 text-center font-semibold leading-[normal] text-stone"
        style={{ left: p(132), top: p(530.69), width: p(231.756), fontSize: p(9.405) }}
      >
        Cancel
      </p>
      <div
        className="absolute bg-deep-blue/25"
        style={{ left: p(84.98), top: p(562.93), width: p(94.046), height: p(3.359), borderRadius: p(1.679) }}
      />
    </div>
  </div>
);

export default PhoneMockup;
