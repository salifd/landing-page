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
  <section aria-label="Supported QR payment rails" className="w-full overflow-hidden bg-sun py-[22px]">
    <div className="flex w-max animate-marquee motion-reduce:animate-none">
      <Track />
      <Track hidden />
    </div>
  </section>
);

export default Ticker;
