import React from "react";

const FirstSection: React.FC = () => {
  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - LEFT */}
          <div className="order-2 lg:order-1 animate-slide-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
              Starting a new journey.
            </h1>
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
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img
                  src="/assets/images/illustration_2.webp"
                  alt="Travel journey illustration showing innovative payment solutions for global travelers"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="800"
                />
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
