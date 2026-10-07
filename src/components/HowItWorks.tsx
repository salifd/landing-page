import React from "react";
import { Eyebrow } from "./brand";
import { delay } from "./motion";

const STEPS = [
  {
    title: "Sign up",
    body: "Onboard in about 30 seconds with your passport. No local ID, licence or phone number.",
  },
  {
    title: "Add your card",
    body: "Link an international Visa or Mastercard. Card details are tokenized by a PCI-compliant partner.",
  },
  {
    title: "Scan the QR",
    body: "Point at a Thai QR, VietQR or QR Ph code: merchant, personal or convenience store.",
  },
  {
    title: "Pay",
    body: "Confirm the exact amount. The merchant receives local currency on the spot.",
  },
];

const HowItWorks: React.FC = () => (
  <section className="w-full bg-deep-blue py-16 md:py-[120px]">
    <div className="page-container flex flex-col gap-12 md:gap-16">
      <div className="flex flex-col items-start gap-6">
        <div data-reveal="up">
          <Eyebrow tone="sky">How it works</Eyebrow>
        </div>
        <h2
          data-reveal="up"
          style={delay(90)}
          className="text-balance font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-white"
        >
          Your card. Their QR. One scan.
        </h2>
        <p
          data-reveal="up"
          style={delay(180)}
          className="max-w-[720px] text-pretty text-lg leading-[1.55] text-white md:text-[19px]"
        >
          No wallet to load and no local account to open. Set up once before you fly, then pay the way locals do.
        </p>
      </div>

      <ol data-reveal-group className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {STEPS.map((step, i) => {
          const isLast = i === STEPS.length - 1;
          return (
            // Reveal on the <li>, hover on the card: each keeps its own transition
            <li key={step.title} data-reveal="up" style={delay(i * 120)} className="flex">
              <div
                className={`flex min-h-[260px] w-full flex-col justify-between gap-10 rounded-[28px] p-8 text-deep-blue transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_30px_60px_-30px_rgba(0,8,30,0.8)] lg:min-h-[300px] ${
                  isLast ? "bg-sun" : "bg-sky"
                }`}
              >
                <span className="font-display text-[44px] font-bold leading-none tracking-[-0.02em] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-[22px] font-semibold leading-[1.25]">{step.title}</h3>
                  <p className="text-pretty text-[15px] leading-[1.55]">{step.body}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  </section>
);

export default HowItWorks;
