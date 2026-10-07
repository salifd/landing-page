import React from "react";
import { ASSETS, Chip, SectionHeading } from "./brand";
import { delay } from "./motion";

const TICKETS = [
  { code: "THA", country: "Thailand", rail: "Thai QR · PromptPay", currency: "THB", photo: ASSETS.ticketTha },
  { code: "VNM", country: "Vietnam", rail: "VietQR", currency: "VND", photo: ASSETS.ticketVnm },
  { code: "PHL", country: "Philippines", rail: "QR Ph", currency: "PHP", photo: ASSETS.ticketPhl },
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

      <ul data-reveal-group className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {TICKETS.map((t, i) => (
          // Reveal on the <li>, hover on the card: each keeps its own transition
          <li key={t.code} data-reveal="up" style={delay(i * 140)} className="flex">
            <div className="group relative flex w-full flex-col overflow-hidden rounded-[32px] bg-white text-deep-blue transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_30px_60px_-30px_rgba(10,36,114,0.45)]">
              <div className="h-[220px] overflow-hidden">
                <img
                  src={t.photo}
                  alt=""
                  width={384}
                  height={220}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                />
              </div>
              <div className="flex flex-col gap-3 p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-[64px] font-bold leading-none tracking-[-0.02em]">{t.code}</span>
                  <span
                    data-reveal="stamp"
                    style={delay(i * 140 + 650)}
                    className="rotate-[5deg] whitespace-nowrap rounded-full border-2 border-coral px-3.5 py-2 text-xs font-semibold uppercase leading-[normal] tracking-[0.08em] text-coral"
                  >
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
            </div>
          </li>
        ))}
      </ul>

      <div data-reveal="up" className="flex flex-wrap items-center gap-3">
        <span className="text-base font-medium leading-[normal] text-deep-blue">Next stops</span>
        <Chip>Indonesia</Chip>
        <Chip>Malaysia</Chip>
      </div>
    </div>
  </section>
);

export default Destinations;
