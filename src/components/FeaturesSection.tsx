import React from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const features = [
  {
    number: "01",
    title: "Effortless",
    body: "Complexity has no place in your journey. We stripped away everything that shouldn't be there — so you never have to think about it.",
    accent: "bg-secondary/10 text-secondary",
    delay: "0s",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Everywhere",
    body: "Built without borders. Wherever the road takes you, we'll already be there — ready before you arrive.",
    accent: "bg-accent-coral/10 text-accent-coral/80",
    delay: "0.15s",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Connected",
    body: "The gap between where you are and where you want to pay — closed. One step, any destination.",
    accent: "bg-white/[0.05] text-white/40",
    delay: "0.3s",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
];

const FeaturesSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative w-full bg-[#000d2e] py-20 md:py-28 overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[350px] bg-primary/15 rounded-full blur-[120px] pointer-events-none animate-drift-1" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[300px] bg-secondary/[0.05] rounded-full blur-[100px] pointer-events-none animate-drift-2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/[0.07]" />
          <span className="text-white/20 text-[10px] font-semibold uppercase tracking-[0.35em] flex-shrink-0">
            The experience
          </span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/[0.07]" />
        </div>

        {/* Cards */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {features.map((f) => (
            <div
              key={f.number}
              className={`group relative rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-7 transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.05] ${
                isVisible ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: f.delay }}
            >
              {/* Ghost number */}
              <div className="absolute top-4 right-5 font-display text-[3.5rem] font-bold text-white/[0.035] leading-none select-none pointer-events-none">
                {f.number}
              </div>

              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${f.accent} mb-6`}>
                {f.icon}
              </div>

              {/* Text */}
              <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-secondary transition-colors duration-300">
                {f.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {f.body}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
