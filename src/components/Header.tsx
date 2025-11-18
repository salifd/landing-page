import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            {/* Modern Logo Design */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent-dark rounded-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <svg
                  className="w-9 h-9 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent-coral rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">Quikku</h1>
              <p className="text-xs text-gray-500">Payment reimagined</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
