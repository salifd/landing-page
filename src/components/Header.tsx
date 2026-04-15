import React from "react";

const Header: React.FC = () => {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-coral focus:text-white focus:rounded"
      >
        Skip to main content
      </a>

      <header className="fixed top-0 left-0 right-0 z-50 bg-[#000d2e]/80 backdrop-blur-md border-b border-white/[0.06] animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo + Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-coral to-[#c9402a] rounded-xl flex items-center justify-center shadow-lg shadow-accent-coral/20 hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="font-display text-[1.375rem] font-bold text-white leading-none tracking-tight">
                  Quikku
                </div>
                <p className="text-[9px] text-secondary uppercase tracking-[0.22em] font-semibold opacity-60 mt-0.5">
                  Payment reimagined
                </p>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#waitlist"
              className="px-4 py-2 text-sm font-semibold text-white bg-accent-coral hover:bg-[#e55a5a] rounded-lg transition-all duration-200 shadow-sm shadow-accent-coral/20 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent-coral/50"
            >
              Get early access
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
