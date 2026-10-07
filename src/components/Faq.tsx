"use client";

import React, { useId, useState } from "react";
import { Plus } from "lucide-react";
import { Eyebrow } from "./brand";
import { delay } from "./motion";

const FAQS = [
  {
    q: "Do I need a local bank account or phone number?",
    a: "No. You sign up with your passport and pay from your existing Visa or Mastercard.",
  },
  {
    q: "Which QR codes can I scan?",
    a: "Thai QR (PromptPay) in Thailand, VietQR in Vietnam and QR Ph in the Philippines, including merchant, personal and convenience-store codes.",
  },
  {
    q: "What does it cost?",
    a: "A small fee per payment, always shown before you confirm. Full pricing arrives with the beta.",
  },
  {
    q: "Is it safe?",
    a: "You verify your identity with your passport, your card details are tokenized by a PCI-compliant partner, and you approve every payment yourself.",
  },
];

const FaqItem: React.FC<{ q: string; a: string; defaultOpen?: boolean; index: number }> = ({
  q,
  a,
  defaultOpen = false,
  index,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  return (
    <li data-reveal="up" style={delay(index * 90)} className="border-b border-deep-blue text-deep-blue">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="group flex w-full items-center gap-6 py-7 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-sky/60"
        >
          <span className="min-w-0 flex-1 font-display text-xl font-semibold leading-[1.35] transition-colors duration-300 group-hover:text-coral md:text-[22px]">
            {q}
          </span>
          <span
            className={`flex size-9 shrink-0 items-center justify-center rounded-[10px] transition-colors duration-300 ${
              open ? "bg-deep-blue text-sky" : "bg-sky text-deep-blue group-hover:bg-[#8fd6f5]"
            }`}
          >
            <Plus
              aria-hidden="true"
              strokeWidth={2.5}
              className={`size-[18px] transition-transform duration-500 ease-out ${open ? "rotate-45" : ""}`}
            />
          </span>
        </button>
      </h3>
      {/* Animating grid rows from 0fr to 1fr gives a smooth auto-height reveal */}
      <div
        id={panelId}
        role="region"
        data-faq-panel
        aria-hidden={!open}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-pretty pb-7 pr-14 text-base leading-[1.6] md:text-[17px]">{a}</p>
        </div>
      </div>
    </li>
  );
};

const Faq: React.FC = () => (
  <section className="w-full bg-white py-16 md:py-[120px]">
    <div className="page-container flex flex-col gap-10 lg:flex-row lg:gap-20">
      <div className="flex shrink-0 flex-col items-start gap-6 lg:w-[360px]">
        <div data-reveal="up">
          <Eyebrow>FAQ</Eyebrow>
        </div>
        <h2
          data-reveal="up"
          style={delay(90)}
          className="text-balance font-display text-[clamp(2.25rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em] text-deep-blue"
        >
          Questions travelers ask first.
        </h2>
      </div>
      <ul data-reveal-group className="min-w-0 flex-1">
        {FAQS.map((item, i) => (
          <FaqItem key={item.q} {...item} index={i} defaultOpen={i === 0} />
        ))}
      </ul>
    </div>
  </section>
);

export default Faq;
