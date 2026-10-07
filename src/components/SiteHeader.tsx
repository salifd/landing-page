"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLabel, compactButtonClass, Logo } from "./brand";

const SiteHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to the hero form and put the cursor in the email field
  const goToWaitlist = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const form = document.getElementById("waitlist");
    if (!form) return;
    e.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    form.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    form.querySelector("input")?.focus({ preventScroll: true });
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-coral focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <header
        className={`sticky top-0 z-50 w-full transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled
            ? "bg-deep-blue/85 shadow-[0_1px_0_rgba(166,225,250,0.12),0_12px_32px_-16px_rgba(0,28,85,0.8)] backdrop-blur-md"
            : "bg-deep-blue"
        }`}
      >
        <div
          className={`page-container flex items-center justify-between gap-4 transition-[padding] duration-500 ease-out ${
            scrolled ? "py-3" : "py-4 md:py-7"
          }`}
        >
          <Link
            href="/"
            aria-label="Quikku home"
            className="rounded-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-sky/60"
          >
            <Logo />
          </Link>
          {/* On the home page this scrolls to the hero form; elsewhere it navigates there */}
          <Link href="/#waitlist" onClick={goToWaitlist} className={compactButtonClass}>
            <ArrowLabel compact>Join the waitlist</ArrowLabel>
          </Link>
        </div>
      </header>
    </>
  );
};

export default SiteHeader;
