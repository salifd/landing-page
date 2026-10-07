"use client";

import React, { useEffect, useState } from "react";

export type TocItem = { id: string; number: number; title: string };

/** "On this page" list that highlights the section currently being read. */
const LegalToc: React.FC<{ items: TocItem[] }> = ({ items }) => {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    // A section counts as "current" while it crosses the upper part of the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <ol className="flex flex-col gap-1">
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={isActive ? "true" : undefined}
              className={`group flex items-start gap-3 rounded-xl px-3 py-2 text-[15px] leading-snug transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky/60 ${
                isActive ? "bg-white font-semibold text-deep-blue shadow-sm" : "text-deep-blue/70 hover:text-deep-blue"
              }`}
            >
              <span
                className={`mt-px flex size-5 shrink-0 items-center justify-center rounded-md font-display text-[11px] font-bold transition-colors duration-200 ${
                  isActive ? "bg-coral text-white" : "bg-sky/60 text-deep-blue group-hover:bg-sky"
                }`}
              >
                {item.number}
              </span>
              {item.title}
            </a>
          </li>
        );
      })}
    </ol>
  );
};

export default LegalToc;
