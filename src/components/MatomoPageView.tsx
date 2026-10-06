"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    _paq?: unknown[][];
  }
}

// The Matomo snippet tracks the initial page view; this tracks client-side
// navigations between pages (e.g. home -> /terms via <Link>).
export default function MatomoPageView() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const paq = (window._paq = window._paq || []);
    paq.push(["setCustomUrl", window.location.href]);
    paq.push(["setDocumentTitle", document.title]);
    paq.push(["trackPageView"]);
  }, [pathname]);

  return null;
}
