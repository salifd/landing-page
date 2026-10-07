import React from "react";
import { SectionHeading } from "./brand";

const STOPS = [
  { title: "Sign up", body: "With your passport, in about 30 seconds." },
  { title: "Add your card", body: "Link the Visa or Mastercard you already have." },
  { title: "Scan and pay", body: "Scan a local QR, confirm the exact amount, done." },
];

const HowItWorks: React.FC = () => (
  <section className="w-full bg-deep-blue py-16 md:py-[120px]">
    <div className="page-container flex flex-col gap-12 md:gap-[72px]">
      <SectionHeading eyebrow="How it works" tone="sky" className="text-white">
        Three moves. Then you&apos;re scanning.
      </SectionHeading>

      <ol className="flex flex-col gap-10 md:flex-row md:gap-0">
        {STOPS.map((stop, i) => {
          const isLast = i === STOPS.length - 1;
          return (
            <li key={stop.title} className="flex min-w-0 flex-1 flex-col gap-6">
              <div className="flex w-full items-center">
                <div
                  className={`flex size-[72px] shrink-0 items-center justify-center rounded-[18px] font-display text-[28px] font-bold leading-[normal] ${
                    isLast ? "bg-coral text-white" : "bg-sky text-deep-blue"
                  }`}
                >
                  {i + 1}
                </div>
                {!isLast && <div className="hidden h-1 min-w-px flex-1 rounded-sm bg-sky md:block" />}
              </div>
              <div className="flex flex-col gap-2.5 pr-8 text-white">
                <h3 className="font-display text-2xl font-semibold leading-[1.25]">{stop.title}</h3>
                <p className="text-base leading-[1.55]">{stop.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  </section>
);

export default HowItWorks;
