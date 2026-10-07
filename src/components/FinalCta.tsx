import React from "react";
import WaitlistForm from "./WaitlistForm";
import { delay } from "./motion";

const FinalCta: React.FC = () => (
  <section className="relative w-full overflow-hidden bg-deep-blue py-20 md:py-32">
    {/* Giant finder eye, anchored 900px into the 1440px design frame */}
    <div
      aria-hidden="true"
      className="absolute -top-[70px] hidden size-[620px] items-center justify-center rounded-[155px] border-[68px] border-sky lg:flex"
      style={{ left: "max(860px, 50% + 180px)" }}
    >
      <div className="size-[248px] rounded-[68px] bg-coral" />
    </div>

    <div className="page-container relative flex flex-col items-start gap-8">
      <h2
        data-reveal="up"
        className="max-w-[720px] text-balance font-display text-[clamp(2.5rem,5.5vw,4.25rem)] font-bold leading-[1.06] tracking-[-0.025em] text-white"
      >
        Southeast Asia runs on QR. Quikku lets you tap in.
      </h2>
      <p
        data-reveal="up"
        style={delay(120)}
        className="max-w-[560px] text-pretty text-lg leading-[1.5] text-white md:text-xl"
      >
        Join the waitlist for early access in Thailand, Vietnam and the Philippines.
      </p>
      <div data-reveal="up" style={delay(240)} className="w-full sm:w-auto [&>div]:items-start">
        <WaitlistForm />
      </div>
    </div>
  </section>
);

export default FinalCta;
