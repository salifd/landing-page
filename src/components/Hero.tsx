import React from "react";
import HeroBackdrop from "./HeroBackdrop";
import QrMosaic from "./QrMosaic";
import WaitlistForm from "./WaitlistForm";
import { delay } from "./motion";

const HEADLINE: { word: string; accent?: boolean }[] = [
  { word: "Pay" },
  { word: "like" },
  { word: "a local.", accent: true },
];

const Hero: React.FC = () => (
  <section data-hero className="relative isolate flex w-full flex-col items-center overflow-hidden pb-14 md:pb-[88px]">
    <HeroBackdrop />
    <div
      id="main-content"
      className="page-container flex flex-col items-center gap-6 pb-12 pt-[calc(var(--header-h)+1.5rem)] text-center md:pb-[72px] md:pt-[calc(var(--header-h)+3.5rem)]"
    >
      <div
        data-reveal="up"
        className="flex items-center gap-2.5 rounded-full border border-sky/40 bg-sky/[0.06] py-2 pl-3 pr-4 backdrop-blur-md"
      >
        <span className="relative flex size-2.5 shrink-0">
          <span className="absolute inset-0 animate-ping-soft rounded-[3px] bg-coral" />
          <span className="relative size-2.5 rounded-[3px] bg-coral" />
        </span>
        <p className="text-sm font-semibold leading-[normal] text-sky">Launching in Thailand · Vietnam · Philippines</p>
      </div>

      <h1 className="font-display text-[clamp(3.5rem,11vw,8rem)] font-bold leading-none tracking-[-0.04em] text-white">
        {HEADLINE.map(({ word, accent }, i) => (
          <React.Fragment key={word}>
            {i > 0 && " "}
            <span
              data-reveal="up"
              style={delay(120 + i * 110)}
              className={`inline-block whitespace-nowrap ${accent ? "text-sky" : ""}`}
            >
              {word}
            </span>
          </React.Fragment>
        ))}
      </h1>

      <p
        data-reveal="up"
        style={delay(480)}
        className="max-w-[760px] text-pretty text-lg leading-[1.5] text-white md:text-[22px]"
      >
        Scan the QR codes locals use and pay with the Visa or Mastercard already in your pocket. No local bank account,
        no top-ups.
      </p>

      <div data-reveal="up" style={delay(600)} className="w-full sm:w-auto">
        <WaitlistForm id="waitlist" />
      </div>

      <p data-reveal="fade" style={delay(760)} className="text-[15px] leading-[normal] text-white">
        Get early access to the beta. One email when your country opens.
      </p>
    </div>

    <QrMosaic />
  </section>
);

export default Hero;
