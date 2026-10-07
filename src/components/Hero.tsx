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
    </div>

    <QrMosaic />
  </section>
);

export default Hero;
