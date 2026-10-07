import React from "react";
import { ArrowRight } from "lucide-react";
import { delay } from "./motion";

// Shared building blocks of the Quikku brand design system.

export const ASSETS = {
  logo: "/assets/redesign/logo-quikku-white.svg",
  photoHan: "/assets/redesign/photo-han.jpg",
  photoMnl: "/assets/redesign/photo-mnl.jpg",
  photoVn1: "/assets/redesign/photo-vn1.jpg",
  photoVn2: "/assets/redesign/photo-vn2.jpg",
  photoBkk: "/assets/redesign/photo-bkk.jpg",
  photoX1: "/assets/redesign/photo-x1.jpg",
  ticketTha: "/assets/redesign/ticket-tha.png",
  ticketVnm: "/assets/redesign/ticket-vnm.png",
  ticketPhl: "/assets/redesign/ticket-phl.png",
} as const;

export const Logo: React.FC = () => (
  <div className="flex items-center gap-3">
    <img src={ASSETS.logo} alt="" width={53} height={40} className="h-10 w-auto shrink-0" />
    <span className="font-display text-2xl font-bold leading-[normal] tracking-[-0.01em] text-white">Quikku</span>
  </div>
);

type EyebrowProps = { children: React.ReactNode; tone?: "coral" | "sky" };

export const Eyebrow: React.FC<EyebrowProps> = ({ children, tone = "coral" }) => {
  const border = tone === "coral" ? "border-coral" : "border-sky";
  const fill = tone === "coral" ? "bg-coral" : "bg-sky";
  const text = tone === "coral" ? "text-coral" : "text-sky";
  return (
    <div className="flex items-center gap-2.5">
      <div className={`flex size-4 shrink-0 items-center justify-center rounded border-2 ${border}`}>
        <div className={`size-1.5 rounded-sm ${fill}`} />
      </div>
      <p className={`text-[13px] font-semibold uppercase leading-[normal] tracking-[0.1em] ${text}`}>{children}</p>
    </div>
  );
};

export const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded-full bg-sky px-4 py-2 text-sm font-semibold leading-[normal] text-deep-blue">
    {children}
  </span>
);

export const SectionHeading: React.FC<{
  eyebrow: string;
  tone?: "coral" | "sky";
  className?: string;
  children: React.ReactNode;
}> = ({ eyebrow, tone, className = "text-deep-blue", children }) => (
  <div className="flex flex-col items-start gap-6">
    <div data-reveal="up">
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
    </div>
    <h2
      data-reveal="up"
      style={delay(90)}
      className={`text-balance font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em] ${className}`}
    >
      {children}
    </h2>
  </div>
);

/** Primary pill button label: text + an arrow that nudges forward on hover. */
export const ArrowLabel: React.FC<{ children: React.ReactNode; compact?: boolean }> = ({ children, compact }) => (
  <>
    <span
      className={`font-display font-semibold leading-[normal] text-white ${compact ? "text-sm md:text-base" : "text-base"}`}
    >
      {children}
    </span>
    <ArrowRight
      aria-hidden="true"
      strokeWidth={2.5}
      className={`shrink-0 text-white transition-transform duration-300 ease-out group-hover:translate-x-1 ${
        compact ? "size-4 md:size-5" : "size-5"
      }`}
    />
  </>
);

const buttonBase =
  "group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-coral shadow-[0_10px_24px_-8px_rgba(255,92,92,0.7),inset_0_1px_0_rgba(255,255,255,0.35)] transition-[background-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#f04848] hover:shadow-[0_16px_30px_-8px_rgba(255,92,92,0.8),inset_0_1px_0_rgba(255,255,255,0.35)] active:translate-y-0 active:scale-[0.97] focus:outline-none focus-visible:ring-4 focus-visible:ring-sky/60 disabled:pointer-events-none";

export const primaryButtonClass = `${buttonBase} px-7 py-4`;
export const compactButtonClass = `${buttonBase} px-4 py-2.5 md:px-7 md:py-4`;
