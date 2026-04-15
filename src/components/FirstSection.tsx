import React from "react";

const FirstSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#000d2e] pt-20 min-h-screen flex items-center overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-primary/35 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-accent-dark/25 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text Content — LEFT */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-secondary/25 bg-secondary/[0.07] mb-8 animate-slide-right"
              style={{ animationDelay: '0.05s' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-coral animate-pulse flex-shrink-0" />
              <span className="text-secondary text-[11px] font-semibold uppercase tracking-[0.2em]">
                Coming Soon
              </span>
            </div>

            <h1
              className="font-display text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-white leading-[1.02] mb-7 animate-slide-right"
              style={{ animationDelay: '0.2s' }}
            >
              Starting a<br />
              <em className="not-italic font-extralight text-secondary/90">new</em>{" "}
              journey.
            </h1>

            <p
              className="text-lg md:text-xl text-white/50 leading-relaxed max-w-[480px] animate-slide-right"
              style={{ animationDelay: '0.38s' }}
            >
              Reimagining how the world moves. We're building something that
              will change the way you experience every destination.
            </p>

            <div
              className="mt-10 flex items-center gap-3 animate-slide-right"
              style={{ animationDelay: '0.52s' }}
            >
              <div className="w-16 h-0.5 bg-accent-coral rounded-full" />
              <div className="w-8 h-0.5 bg-secondary/40 rounded-full" />
              <div className="w-4 h-0.5 bg-white/15 rounded-full" />
            </div>

            <a
              href="#waitlist"
              className="inline-flex items-center gap-2.5 mt-10 px-7 py-3.5 bg-accent-coral hover:bg-[#e55a5a] text-white text-base font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-accent-coral/20 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent-coral/50 animate-slide-right"
              style={{ animationDelay: '0.65s' }}
            >
              Join the waitlist
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Image — RIGHT */}
          <div className="order-1 lg:order-2 animate-slide-left">
            <div className="relative">
              {/* Orbital rings */}
              <div className="absolute inset-[-20px] rounded-full border border-dashed border-white/[0.07] pointer-events-none" />
              <div className="absolute inset-[-44px] rounded-full border border-dashed border-secondary/[0.05] pointer-events-none" />

              {/* Main Image */}
              <div className="relative aspect-square rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-primary/60">
                <img
                  src="/assets/images/illustration_2.webp"
                  alt="Travel journey illustration showing innovative payment solutions for global travelers"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  width="800"
                  height="800"
                />
                {/* Blend illustration edges into dark bg */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#000d2e]/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#000d2e]/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Glow halos */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent-coral/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-secondary/12 rounded-full blur-2xl pointer-events-none" />

              {/* Floating access card */}
              <div className="animate-float absolute bottom-3 left-3 sm:-bottom-5 sm:-left-8 bg-white/[0.07] backdrop-blur-xl border border-white/[0.14] rounded-2xl p-4 shadow-2xl min-w-[190px]">
                <div className="flex items-center gap-2 mb-3.5">
                  <div className="w-6 h-6 rounded-lg bg-secondary/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                  </div>
                  <span className="text-white/35 text-[10px] font-semibold uppercase tracking-[0.22em]">
                    Quikku
                  </span>
                </div>
                <div className="font-display text-white text-[1.6rem] font-bold leading-none mb-1">
                  Pioneer
                </div>
                <div className="text-secondary/80 text-sm font-medium mb-3.5">
                  Early access member
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-coral animate-pulse flex-shrink-0" />
                  <span className="text-white/35 text-[11px] font-semibold">Coming soon</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        style={{ animation: 'fadeIn 0.7s ease-in-out 1.4s both' }}
      >
        <span className="text-white/20 text-[9px] font-medium uppercase tracking-[0.3em]">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
};

export default FirstSection;
