"use client";

import React, { useId, useState } from "react";
import { Plus } from "lucide-react";
import { Eyebrow } from "./brand";

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

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(true);
  const panelId = useId();
  return (
    <li className="flex flex-col gap-3 border-b border-deep-blue py-7 text-deep-blue">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center gap-6 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-sky/60"
        >
          <span className="min-w-0 flex-1 font-display text-xl font-semibold leading-[1.35] md:text-[22px]">{q}</span>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-sky">
            <Plus aria-hidden="true" strokeWidth={2.5} className="size-[18px] text-deep-blue" />
          </span>
        </button>
      </h3>
      <p id={panelId} hidden={!open} className="text-base leading-[1.6] md:text-[17px]">
        {a}
      </p>
    </li>
  );
};

const Faq: React.FC = () => (
  <section className="w-full bg-white py-16 md:py-[120px]">
    <div className="page-container flex flex-col gap-10 lg:flex-row lg:gap-20">
      <div className="flex shrink-0 flex-col items-start gap-6 lg:w-[360px]">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="font-display text-[clamp(2.25rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em] text-deep-blue">
          Questions travelers ask first.
        </h2>
      </div>
      <ul className="min-w-0 flex-1">
        {FAQS.map((item) => (
          <FaqItem key={item.q} {...item} />
        ))}
      </ul>
    </div>
  </section>
);

export default Faq;
