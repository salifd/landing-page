import React from "react";
import { ASSETS, Chip, SectionHeading } from "./brand";

const TICKETS = [
  { code: "THA", country: "Thailand", rail: "Thai QR · PromptPay", currency: "THB", photo: ASSETS.photoBkk },
  { code: "VNM", country: "Vietnam", rail: "VietQR", currency: "VND", photo: ASSETS.photoX1 },
  { code: "PHL", country: "Philippines", rail: "QR Ph", currency: "PHP", photo: ASSETS.photoMnl },
];

const StubField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[11px] font-semibold uppercase leading-[normal] tracking-[0.1em]">{label}</span>
    <span className="font-display text-base font-semibold leading-[normal]">{value}</span>
  </div>
);

const Destinations: React.FC = () => (
  <section className="w-full bg-cream py-16 md:py-[120px]">
    <div className="page-container flex flex-col gap-12 md:gap-16">
      <SectionHeading eyebrow="Destinations">Three countries. One boarding pass.</SectionHeading>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {TICKETS.map((t) => (
          <li key={t.code} className="relative flex flex-col overflow-hidden rounded-[32px] bg-white text-deep-blue">
            <img src={t.photo} alt="" className="h-[220px] w-full object-cover" />
            <div className="flex flex-col gap-3 p-7">
              <div className="flex items-center justify-between gap-3">
                <span className="font-display text-[64px] font-bold leading-none tracking-[-0.02em]">{t.code}</span>
                <span className="rotate-[5deg] whitespace-nowrap rounded-full border-2 border-coral px-3.5 py-2 text-xs font-semibold uppercase leading-[normal] tracking-[0.08em] text-coral">
                  Launch market
                </span>
              </div>
              <h3 className="font-display text-2xl font-semibold leading-[1.25]">{t.country}</h3>
            </div>

            {/* Perforation with ticket notches */}
            <div className="relative mt-auto h-1 w-full border-t-2 border-dashed border-deep-blue">
              <div className="absolute -left-3.5 -top-[15px] size-7 rounded-full bg-cream" />
              <div className="absolute -right-3.5 -top-[15px] size-7 rounded-full bg-cream" />
            </div>
            <div className="flex items-start justify-between gap-4 whitespace-nowrap px-7 pb-6 pt-5">
              <StubField label="Rail" value={t.rail} />
              <StubField label="Currency" value={t.currency} />
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-base font-medium leading-[normal] text-deep-blue">Next stops</span>
        <Chip>Indonesia</Chip>
        <Chip>Malaysia</Chip>
      </div>
    </div>
  </section>
);

export default Destinations;
