"use client";

import { useEffect } from "react";

/**
 * Drives the page's scroll animations from plain data attributes, so the
 * sections themselves can stay server components:
 *
 * - `data-reveal="<variant>"` fades/moves an element in once it enters the
 *   viewport (variants live in globals.css).
 * - `data-reveal-group` reveals every `data-reveal` descendant together when
 *   the group enters, e.g. the hero mosaic whose edges sit off-screen on phones.
 * - `data-count="126"` counts a number up from 0 when revealed. The server-
 *   rendered text stays the final value for no-JS visitors and crawlers.
 */
const COUNT_DURATION = 1400;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  const prefix = el.dataset.prefix ?? "";
  const suffix = el.dataset.suffix ?? "";
  const delay = parseFloat(getComputedStyle(el).getPropertyValue("--reveal-delay")) || 0;
  el.textContent = `${prefix}0${suffix}`;

  let start: number | null = null;
  const tick = (now: number) => {
    start ??= now + delay;
    const t = Math.min(Math.max((now - start) / COUNT_DURATION, 0), 1);
    el.textContent = `${prefix}${Math.round(easeOutCubic(t) * target)}${suffix}`;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function reveal(el: Element) {
  const targets = el.hasAttribute("data-reveal-group") ? [el, ...el.querySelectorAll("[data-reveal]")] : [el];
  for (const target of targets) {
    target.classList.add("is-visible");
  }
  const counters = [el, ...el.querySelectorAll("[data-count]")].filter(
    (node): node is HTMLElement => node instanceof HTMLElement && node.dataset.count !== undefined,
  );
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    counters.forEach(countUp);
  }
}

export default function MotionController() {
  useEffect(() => {
    // The hero animates with CSS on first paint (see globals.css)
    const outsideHero = (el: Element) => !el.closest("[data-hero]");
    const groups = [...document.querySelectorAll("[data-reveal-group]")].filter(outsideHero);
    const singles = [...document.querySelectorAll("[data-reveal], [data-count]")].filter(
      (el) => outsideHero(el) && !el.closest("[data-reveal-group]"),
    );
    const targets = [...groups, ...singles];

    if (!("IntersectionObserver" in window)) {
      targets.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.1 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
