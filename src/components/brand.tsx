import React from "react";
import { ArrowRight } from "lucide-react";

// Shared building blocks of the Quikku brand design system.

export const ASSETS = {
  logo: "/assets/redesign/logo-quikku-white.svg",
  photoHan: "/assets/redesign/photo-han.png",
  photoMnl: "/assets/redesign/photo-mnl.png",
  photoVn1: "/assets/redesign/photo-vn1.png",
  photoVn2: "/assets/redesign/photo-vn2.png",
  photoBkk: "/assets/redesign/photo-bkk.png",
  photoX1: "/assets/redesign/photo-x1.png",
  ticketTha: "/assets/redesign/ticket-tha.png",
  ticketVnm: "/assets/redesign/ticket-vnm.png",
  ticketPhl: "/assets/redesign/ticket-phl.png",
} as const;

export const Logo: React.FC = () => (
  <div className="flex items-center gap-3">
    <img src={ASSETS.logo} alt="" width={53} height={40} className="h-10 w-auto shrink-0" />
    <span className="font-display text-2xl font-bold leading-[normal] tracking-[-0.01em] text-white">
      Quikku
    </span>
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
      <p className={`text-[13px] font-semibold uppercase leading-[normal] tracking-[0.1em] ${text}`}>
        {children}
      </p>
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
    <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
    <h2
      className={`font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em] ${className}`}
    >
      {children}
    </h2>
  </div>
);

/** Primary pill button label: text + arrow icon. */
export const ArrowLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <span className="font-display text-base font-semibold leading-[normal] text-white">{children}</span>
    <ArrowRight aria-hidden="true" strokeWidth={2.5} className="size-5 shrink-0 text-white" />
  </>
);

export const primaryButtonClass =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-coral px-7 py-4 transition-colors duration-200 hover:bg-[#f04848] focus:outline-none focus-visible:ring-4 focus-visible:ring-sky/60 disabled:cursor-not-allowed disabled:opacity-70";
