import React from "react";

const PLACES = [
  "Street food",
  "Night markets",
  "Cafés",
  "Taxis",
  "Convenience stores",
  "Sari-sari stores",
  "Restaurants",
  "Malls",
  "Shopping",
  "Groceries",
];

const Separator: React.FC = () => (
  <div
    aria-hidden="true"
    data-separator
    className="flex size-[14px] shrink-0 items-center justify-center rounded-[4px] border-2 border-deep-blue md:size-[18px] md:rounded-[5px]"
  >
    <div className="size-[5px] rounded-[2px] bg-deep-blue md:size-[7px] md:rounded-sm" />
  </div>
);

// Every item carries its trailing separator and spacing, so the two copies line up seamlessly
const PlaceList: React.FC<{ copy?: boolean }> = ({ copy }) => (
  <ul aria-hidden={copy || undefined} data-marquee-copy={copy || undefined} className="marquee-list flex shrink-0">
    {PLACES.map((place) => (
      <li key={place} className="flex items-center gap-4 pr-4 md:gap-7 md:pr-7">
        <span className="whitespace-nowrap font-display text-base font-semibold uppercase leading-[normal] tracking-[0.04em] text-deep-blue md:text-lg lg:text-xl">
          {place}
        </span>
        <Separator />
      </li>
    ))}
  </ul>
);

const Ticker: React.FC = () => (
  <section aria-label="Places you can pay with Quikku" className="w-full overflow-hidden bg-sun py-5 md:py-[22px]">
    {/* The fade sits on an inner wrapper so the yellow background itself stays solid */}
    <div className="marquee-mask">
      <div className="marquee-track flex w-max">
        <PlaceList />
        <PlaceList copy />
      </div>
    </div>
  </section>
);

export default Ticker;
