import React from "react";
import { Eyebrow } from "./brand";
import { delay } from "./motion";

// The sign stage is a 440 × 440 artboard scaled with container query units.
const s = (px: number) => `${(px / 4.4).toFixed(3)}cqw`;

const SignStage: React.FC = () => (
  <div data-reveal-group className="w-full max-w-[440px] shrink-0 [container-type:inline-size]">
    <div className="relative aspect-square w-full">
      <div
        data-reveal="tilt"
        className="absolute -rotate-[8deg] bg-sun"
        style={{ left: s(169.42), top: s(127.67), width: s(300), height: s(300), borderRadius: s(72) }}
      />
      <div
        data-reveal="pop"
        className="absolute bg-sky"
        style={delay(500, { left: 0, top: s(350), width: s(72), height: s(72), borderRadius: s(18) })}
      />

      {/* Stall sign */}
      <div
        data-reveal="swing"
        className="absolute flex origin-top rotate-[4deg] flex-col items-start border-solid border-deep-blue bg-white text-deep-blue shadow-[0_30px_60px_-30px_rgba(10,36,114,0.45)]"
        style={delay(200, {
          left: s(29.97),
          top: s(48.09),
          width: s(360),
          padding: s(36),
          gap: s(16),
          borderWidth: s(3),
          borderRadius: s(32),
        })}
      >
        <p
          className="font-display font-semibold uppercase leading-[normal] text-coral"
          style={{ fontSize: s(20), letterSpacing: "0.08em" }}
        >
          Sorry,
        </p>
        <p className="font-display font-bold leading-[0.92] tracking-[-0.03em]" style={{ fontSize: s(96) }}>
          QR
          <br />
          only.
        </p>
        <div className="flex w-full items-center" style={{ gap: s(16), paddingTop: s(12) }}>
          <div
            className="flex shrink-0 items-center justify-center border-solid border-deep-blue"
            style={{ width: s(56), height: s(56), borderWidth: s(6), borderRadius: s(14) }}
          >
            <div className="bg-deep-blue" style={{ width: s(22), height: s(22), borderRadius: s(6) }} />
          </div>
          <p className="min-w-0 flex-1 font-medium leading-[1.4]" style={{ fontSize: s(16) }}>
            Scan to pay.
            <br />
            No cash, no cards.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Story: React.FC = () => (
  <section className="w-full overflow-hidden bg-cream py-16 md:py-[120px]">
    <div className="page-container flex flex-col items-center gap-12 lg:flex-row lg:gap-[88px]">
      <SignStage />

      <div className="flex min-w-0 flex-1 flex-col items-start gap-7 text-deep-blue">
        <div data-reveal="up">
          <Eyebrow>What you can do</Eyebrow>
        </div>
        <h2
          data-reveal="up"
          style={delay(90)}
          className="text-balance font-display text-[clamp(2.25rem,4.5vw,3.25rem)] font-bold leading-[1.12] tracking-[-0.02em]"
        >
          Scan any local QR. Pay with your own card.
        </h2>
        <p data-reveal="up" style={delay(180)} className="text-pretty text-lg leading-[1.55] md:text-[19px]">
          Local QR normally needs a local bank account. Quikku connects your Visa or Mastercard to it, so you pay the
          way locals do.
        </p>
      </div>
    </div>
  </section>
);

export default Story;
