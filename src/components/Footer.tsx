import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-gray-600 text-sm">
            © {currentYear} Quikku. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/terms"
              className="text-gray-600 hover:text-primary text-sm transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              to="/privacy"
              className="text-gray-600 hover:text-primary text-sm transition-colors"
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
