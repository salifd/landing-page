import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#000d2e] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/20 text-sm">
            © {currentYear} Quikku. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/terms"
              className="text-white/25 hover:text-secondary text-sm transition-colors duration-200"
            >
              Terms of Use
            </Link>
            <Link
              to="/privacy"
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
