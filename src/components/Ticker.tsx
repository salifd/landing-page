"use client";

import React, { useLayoutEffect, useRef } from "react";

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

// Sits centred in the gap before its item, out of the flow, so hiding it never changes the wrapping
const Separator: React.FC = () => (
  <div
    aria-hidden="true"
    data-separator
    className="absolute right-[calc(100%+14px)] top-1/2 flex size-[14px] -translate-y-1/2 items-center justify-center rounded-[4px] border-2 border-deep-blue md:right-[calc(100%+28px)] md:size-[18px] md:rounded-[5px]"
  >
    <div className="size-[5px] rounded-[2px] bg-deep-blue md:size-[7px] md:rounded-sm" />
  </div>
);

/** Flags the items that begin a wrapped line, so their leading separator is hidden. */
function useLineStarts(listRef: React.RefObject<HTMLUListElement | null>) {
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const mark = () => {
      const items = [...list.children] as HTMLElement[];
      items.forEach((item) => item.removeAttribute("data-line-start"));
      items.forEach((item, i) => {
        if (i === 0 || item.offsetTop > items[i - 1].offsetTop)
          item.setAttribute("data-line-start", "");
      });
    };
    mark();
    // Watch the items too: a late web font re-wraps the lines without resizing the list
    const observer = new ResizeObserver(mark);
    observer.observe(list);
    for (const item of list.children) observer.observe(item);
    return () => observer.disconnect();
  }, [listRef]);
}

const Ticker: React.FC = () => {
  const listRef = useRef<HTMLUListElement>(null);
  useLineStarts(listRef);

  return (
    <section
      aria-label="Places you can pay with Quikku"
      className="w-full bg-sun py-5 md:py-[22px]"
    >
      <ul
        ref={listRef}
        // Column gap = separator plus the space on either side of it
        className="page-container flex flex-wrap items-center justify-center gap-x-[42px] gap-y-2.5 md:gap-x-[74px] md:gap-y-3"
      >
        {PLACES.map((place, i) => (
          <li
            key={place}
            className="relative [&[data-line-start]>[data-separator]]:invisible"
          >
            {i > 0 && <Separator />}
            <span className="block whitespace-nowrap font-display text-sm font-semibold uppercase leading-[normal] tracking-[0.04em] text-deep-blue sm:text-base md:text-lg lg:text-xl">
              {place}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Ticker;
