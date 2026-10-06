import React from "react";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <>
      <div className="relative min-h-screen bg-[#000d2e] flex items-center justify-center px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/20 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative text-center">
          {/* Ghost 404 */}
          <div className="font-display text-[11rem] md:text-[16rem] font-bold text-white/[0.04] leading-none select-none pointer-events-none">
            404
          </div>

          {/* Content */}
          <div className="-mt-16 md:-mt-24">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Lost in transit.
            </h2>
            <p className="text-white/40 mb-8 max-w-sm mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent-coral hover:bg-[#e55a5a] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-accent-coral/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
              </svg>
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
