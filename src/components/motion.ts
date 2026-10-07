import type { CSSProperties } from "react";

/** Stagger helper for `data-reveal` elements: `style={delay(120)}`. */
export const delay = (ms: number, style?: CSSProperties): CSSProperties =>
  ({ ...style, "--reveal-delay": `${Math.round(ms)}ms` }) as CSSProperties;
