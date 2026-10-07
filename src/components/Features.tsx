import React from "react";
import { Chip, SectionHeading } from "./brand";
import { delay } from "./motion";

const bigNumber = "font-display text-[clamp(5rem,9vw,7.5rem)] font-bold leading-[0.92] tracking-[-0.05em]";
const card =
  "flex h-full min-h-[340px] flex-col justify-between gap-10 overflow-hidden rounded-[32px] p-8 transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_30px_60px_-30px_rgba(10,36,114,0.5)] md:p-9 lg:h-[400px]";

const CardCopy: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="flex flex-col gap-2">
    <h3 className="font-display text-2xl font-semibold leading-[1.25]">{title}</h3>
    {children}
  </div>
);

const Features: React.FC = () => (
  <section className="w-full bg-white py-16 md:py-[120px]">
    <div className="page-container flex flex-col gap-12 md:gap-16">
      <SectionHeading eyebrow="Why Quikku">Built for the stalls your card can&apos;t reach.</SectionHeading>

      <div data-reveal-group className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-[588fr_282fr_282fr]">
        <div data-reveal="up" className="md:col-span-2 lg:col-span-1">
          <div className={`${card} bg-deep-blue text-white`}>
            <p className={`${bigNumber} flex flex-wrap items-end gap-x-5`}>
              <span>1</span>
              <span className="text-sky">scan.</span>
            </p>
            <CardCopy title="Every kind of QR, not just big merchants">
              <p className="text-base leading-[1.55]">
                A street-food stall with a personal QR, a market vendor, a 7-Eleven counter. If locals can scan it,
                Quikku is built to pay it.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-3">
                <Chip>Merchant QR</Chip>
                <Chip>Personal QR</Chip>
                <Chip>Store QR</Chip>
              </div>
            </CardCopy>
          </div>
        </div>

        <div data-reveal="up" style={delay(140)}>
          <div className={`${card} bg-sky text-deep-blue`}>
            <p className={bigNumber}>0</p>
            <CardCopy title="Top-ups. Zero.">
              <p className="text-base leading-[1.55]">
                No wallet to pre-load and no balance left stranded when you fly home.
              </p>
            </CardCopy>
          </div>
        </div>

        <div data-reveal="up" style={delay(280)}>
          <div className={`${card} bg-sun text-deep-blue`}>
            <p data-count={30} data-suffix="s" style={delay(280)} className={`${bigNumber} tabular-nums`}>
              30s
            </p>
            <CardCopy title="Passport-only setup">
              <p className="text-base leading-[1.55]">
                No local licence, no local number, no branch visit. Verify from your phone.
              </p>
            </CardCopy>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Features;
