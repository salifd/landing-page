import React from "react";

const items = [
  "Starting a new journey",
  "The future of travel",
  "Something new is coming",
  "Join the waitlist",
  "A different way to move",
];

const itemsAlt = [
  "Explorer access",
  "Built for explorers",
  "Something extraordinary",
  "The world is waiting",
  "Be among the first",
];

const MarqueeSection: React.FC = () => {
  return (
    <div className="relative w-full bg-[#010e34] py-5 overflow-hidden border-y border-white/[0.06]">
      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#010e34] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#010e34] to-transparent z-10 pointer-events-none" />

      {/* Row 1 — going left */}
      <div className="flex w-max animate-marquee mb-3">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-5 px-8">
            <span className="font-display text-[11px] font-semibold text-white/20 uppercase tracking-[0.28em] whitespace-nowrap">
              {item}
            </span>
            <span className="text-accent-coral/35 text-[7px] flex-shrink-0 select-none">◆</span>
          </div>
        ))}
      </div>

      {/* Row 2 — going right */}
      <div className="flex w-max animate-marquee-reverse">
        {[...itemsAlt, ...itemsAlt].map((item, i) => (
          <div key={i} className="flex items-center gap-5 px-8">
            <span className="font-display text-[11px] font-semibold text-white/[0.09] uppercase tracking-[0.28em] whitespace-nowrap">
              {item}
            </span>
            <span className="text-secondary/20 text-[7px] flex-shrink-0 select-none">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeSection;
