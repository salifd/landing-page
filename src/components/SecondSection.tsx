import React, { useState, type FormEvent } from "react";

const SecondSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setEmail("");
      setIsSubmitted(false);
    }, 3000);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!isValid) {
      setIsValid(true);
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image - LEFT */}
          <div className="order-2 lg:order-1 animate-slide-right">
            <div className="relative">
              {/* Main Image Container */}
              <div className="aspect-square bg-gradient-to-br from-primary via-accent-dark to-secondary rounded-3xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center p-8">
                  {/* Placeholder SVG Illustration - Email/Notification theme */}
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 400 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Email envelope */}
                    <rect
                      x="80"
                      y="120"
                      width="240"
                      height="160"
                      rx="12"
                      fill="white"
                      opacity="0.9"
                    />
                    <path
                      d="M80 140 L200 220 L320 140"
                      stroke="#0A2472"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="80"
                      y1="140"
                      x2="80"
                      y2="280"
                      stroke="#0A2472"
                      strokeWidth="3"
                      opacity="0.3"
                    />
                    <line
                      x1="320"
                      y1="140"
                      x2="320"
                      y2="280"
                      stroke="#0A2472"
                      strokeWidth="3"
                      opacity="0.3"
                    />

                    {/* Notification badge */}
                    <circle cx="300" cy="130" r="20" fill="#FF6B6B" />
                    <text
                      x="300"
                      y="137"
                      textAnchor="middle"
                      fill="white"
                      fontSize="20"
                      fontWeight="bold"
                    >
                      1
                    </text>

                    {/* Decorative dots */}
                    <circle
                      cx="120"
                      cy="80"
                      r="8"
                      fill="#A6E1FA"
                      opacity="0.6"
                    />
                    <circle
                      cx="280"
                      cy="320"
                      r="12"
                      fill="#A6E1FA"
                      opacity="0.6"
                    />
                    <circle
                      cx="340"
                      cy="200"
                      r="6"
                      fill="#FF6B6B"
                      opacity="0.6"
                    />
                  </svg>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent-coral rounded-full opacity-30 blur-xl"></div>
            </div>
          </div>

          {/* Form - RIGHT */}
          <div className="order-1 lg:order-2 animate-slide-left">
            <div className="max-w-md lg:ml-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-6">
                Be the first to embark with us
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Join our waitlist to stay updated on our launch and be among the
                first to experience the future of travel.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email address"
                    className={`w-full px-6 py-4 text-lg border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 ${
                      !isValid
                        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-primary focus:ring-secondary"
                    } ${
                      isSubmitted ? "bg-green-50 border-green-500" : "bg-white"
                    }`}
                    disabled={isLoading || isSubmitted}
                    required
                  />
                  {!isValid && (
                    <p className="mt-2 text-sm text-red-600 animate-slide-up">
                      Please enter a valid email address
                    </p>
                  )}
                  {isSubmitted && (
                    <p className="mt-2 text-sm text-green-600 animate-slide-up flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Thank you for subscribing!
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || isSubmitted}
                  className={`w-full px-8 py-4 text-lg font-semibold text-white rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent-coral focus:ring-opacity-50 ${
                    isLoading || isSubmitted
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-accent-coral to-red-500"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : isSubmitted ? (
                    "Subscribed!"
                  ) : (
                    "Join the waitlist"
                  )}
                </button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  By filling the form you accept our{" "}
                  <a
                    href="#"
                    className="text-primary hover:text-accent-dark underline transition-colors"
                  >
                    terms of use
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-primary hover:text-accent-dark underline transition-colors"
                  >
                    privacy
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
