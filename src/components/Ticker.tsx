import React from "react";

const RAILS = ["Thai QR", "VietQR", "QR Ph", "Merchant QR", "Personal QR", "Store QR"];

const Separator: React.FC = () => (
  <div
    aria-hidden="true"
    className="flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border-2 border-deep-blue"
  >
    <div className="size-[7px] rounded-sm bg-deep-blue" />
  </div>
);

const Ticker: React.FC = () => (
  <section aria-label="Supported QR payment rails" className="w-full bg-sun py-[22px]">
    <ul className="page-container grid grid-cols-2 items-center gap-x-6 gap-y-3 text-center sm:flex sm:flex-wrap sm:justify-center sm:gap-x-7">
      {RAILS.map((rail, i) => (
        <li key={rail} className="flex items-center justify-center gap-7">
          {/* Separators only in the single-row layout */}
          {i > 0 && (
            <span className="hidden sm:flex">
              <Separator />
            </span>
          )}
          <span className="whitespace-nowrap font-display text-lg font-semibold uppercase leading-[normal] tracking-[0.04em] text-deep-blue md:text-xl">
            {rail}
          </span>
        </li>
      ))}
    </ul>
  </section>
);

export default Ticker;
