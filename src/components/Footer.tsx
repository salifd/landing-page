import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#000d2e] border-t border-white/[0.06] overflow-hidden">
      {/* Ghost wordmark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display text-[10rem] md:text-[14rem] font-bold text-white/[0.025] leading-none tracking-tight">
          Quikku
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/20 text-sm">
            © {currentYear} Quikku Pte. Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-white/25 hover:text-secondary text-sm transition-colors duration-200"
            >
              Terms of Use
            </Link>
            <Link
              href="/privacy"
              className="text-white/25 hover:text-secondary text-sm transition-colors duration-200"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
