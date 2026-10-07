import React from "react";
import { ArrowLabel, Logo, primaryButtonClass } from "./brand";
import QrMosaic from "./QrMosaic";
import WaitlistForm from "./WaitlistForm";

const Hero: React.FC = () => (
  <section className="relative flex w-full flex-col items-center overflow-hidden bg-deep-blue pb-14 md:pb-[88px]">
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-coral focus:px-4 focus:py-2 focus:text-white"
    >
      Skip to main content
    </a>

    <header className="page-container flex items-center justify-between gap-4 py-5 md:py-7">
      <Logo />
      <a href="#waitlist" className={`${primaryButtonClass} hidden sm:inline-flex`}>
        <ArrowLabel>Join the waitlist</ArrowLabel>
      </a>
    </header>

    <div id="main-content" className="page-container flex flex-col items-center gap-6 pb-12 pt-8 text-center md:pb-[72px] md:pt-14">
      <div className="flex items-center gap-2.5 rounded-full border border-sky py-2 pl-3 pr-4">
        <div className="size-2.5 shrink-0 rounded-[3px] bg-coral" />
        <p className="text-sm font-semibold leading-[normal] text-sky">Launching in Thailand · Vietnam · Philippines</p>
      </div>

      <h1 className="font-display text-[clamp(3.5rem,11vw,8rem)] font-bold leading-none tracking-[-0.04em] text-white">
        Pay like <span className="whitespace-nowrap text-sky">a local.</span>
      </h1>

      <p className="max-w-[760px] text-lg leading-[1.5] text-white md:text-[22px]">
        Scan the QR codes locals use and pay with the Visa or Mastercard already in your pocket. No local bank
        account, no top-ups.
      </p>

      <WaitlistForm id="waitlist" />

      <p className="text-[15px] leading-[normal] text-white">
        Get early access to the beta. One email when your country opens.
      </p>
    </div>

    <QrMosaic />
  </section>
);

export default Hero;
