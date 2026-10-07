import React from "react";

const RAILS = ["Thai QR", "VietQR", "QR Ph", "Merchant QR", "Personal QR", "Store QR"];

const Separator: React.FC = () => (
  <div className="flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border-2 border-deep-blue">
    <div className="size-[7px] rounded-sm bg-deep-blue" />
  </div>
);

const Track: React.FC<{ hidden?: boolean }> = ({ hidden }) => (
  <ul className="flex shrink-0 items-center gap-7 pr-7" aria-hidden={hidden || undefined}>
    {RAILS.map((rail) => (
      <li key={rail} className="flex items-center gap-7">
        <span className="whitespace-nowrap font-display text-xl font-semibold uppercase leading-[normal] tracking-[0.04em] text-deep-blue">
          {rail}
        </span>
        <Separator />
      </li>
    ))}
  </ul>
);

const Ticker: React.FC = () => (
  <section aria-label="Supported QR payment rails" className="w-full bg-sun py-[22px]">
    {/* Rails fade out at the edges; the yellow band itself stays solid */}
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Track />
        <Track hidden />
      </div>
    </div>
  </section>
);

export default Ticker;
