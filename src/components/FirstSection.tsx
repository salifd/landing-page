import React from "react";

const FirstSection: React.FC = () => {
  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - LEFT */}
          <div className="order-2 lg:order-1 animate-slide-right">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
              Starting a new journey.
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Reimagining how the world moves. We're building something that will change the way you experience every destination.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-16 h-1 bg-accent-coral rounded-full"></div>
              <div className="w-8 h-1 bg-secondary rounded-full"></div>
              <div className="w-4 h-1 bg-primary rounded-full"></div>
            </div>
          </div>

          {/* Image - RIGHT */}
          <div className="order-1 lg:order-2 animate-slide-left">
            <div className="relative">
              {/* Main Image Container */}
              <div className="aspect-square bg-gradient-to-br from-secondary via-blue-100 to-primary rounded-3xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center p-8">
                  {/* Placeholder SVG Illustration */}
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 400 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Globe/Travel Icon */}
                    <circle
                      cx="200"
                      cy="200"
                      r="150"
                      fill="white"
                      opacity="0.2"
                    />
                    <circle
                      cx="200"
                      cy="200"
                      r="120"
                      stroke="white"
                      strokeWidth="3"
                      opacity="0.6"
                    />

                    {/* Latitude lines */}
                    <ellipse
                      cx="200"
                      cy="200"
                      rx="120"
                      ry="40"
                      stroke="white"
                      strokeWidth="2"
                      opacity="0.4"
                    />
                    <ellipse
                      cx="200"
                      cy="200"
                      rx="120"
                      ry="80"
                      stroke="white"
                      strokeWidth="2"
                      opacity="0.4"
                    />

                    {/* Longitude line */}
                    <ellipse
                      cx="200"
                      cy="200"
                      rx="40"
                      ry="120"
                      stroke="white"
                      strokeWidth="2"
                      opacity="0.4"
                    />

                    {/* Airplane */}
                    <g transform="translate(280, 150) rotate(45)">
                      <path d="M0 0 L20 5 L0 10 L5 5 Z" fill="#FF6B6B" />
                      <circle cx="25" cy="5" r="3" fill="#FF6B6B" />
                    </g>

                    {/* Location pins */}
                    <circle cx="150" cy="180" r="6" fill="#FF6B6B" />
                    <circle cx="250" cy="220" r="6" fill="#FF6B6B" />
                    <circle cx="200" cy="150" r="6" fill="#FF6B6B" />
                  </svg>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-coral rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary rounded-full opacity-30 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
