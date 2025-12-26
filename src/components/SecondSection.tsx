import React, { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

// TypeScript declaration for Matomo tracking
declare global {
  interface Window {
    _paq: any[];
  }
}

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
      // Track validation error
      if (window._paq) {
        window._paq.push([
          "trackEvent",
          "Waitlist",
          "Validation Error",
          "Invalid Email",
        ]);
      }
      return;
    }

    setIsValid(true);
    setIsLoading(true);

    try {
      console.log("Submitting to waitlist API...", { email });

      // Get the API URL from environment or use default
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

      // Submit to waitlist API
      const response = await fetch(`${apiUrl}/api/waitlist/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Waitlist API error:", data);

        // Track API error
        if (window._paq) {
          window._paq.push([
            "trackEvent",
            "Waitlist",
            "API Error",
            `Status ${response.status}`,
          ]);
        }

        throw new Error(data.error || `API error: ${response.status}`);
      }

      console.log("Successfully subscribed to waitlist!");

      // Track successful submission
      if (window._paq) {
        window._paq.push(["trackEvent", "Waitlist", "Signup Success", email]);
        window._paq.push(["trackGoal", 1]); // Configure goal ID 1 in Matomo dashboard
      }

      setIsLoading(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setEmail("");
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting to waitlist:", error);

      // Track exception
      if (window._paq) {
        window._paq.push([
          "trackEvent",
          "Waitlist",
          "Exception",
          String(error),
        ]);
      }

      setIsLoading(false);
      // Show error to user
      alert(
        "There was an error subscribing. Please try again or check the console for details."
      );
      setIsValid(false);
    }
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
          <div className="order-first animate-slide-right">
            <div className="relative">
              {/* Main Image Container */}
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img
                  src="/assets/images/illustration_5.webp"
                  alt="Join our community illustration - Be the first to experience innovative travel payments"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="800"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent-coral rounded-full opacity-30 blur-xl"></div>
            </div>
          </div>

          {/* Form - RIGHT */}
          <div className="order-last animate-slide-left">
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
                  <Link
                    to="/terms"
                    className="text-primary hover:text-accent-dark underline transition-colors"
                  >
                    terms of use
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-primary hover:text-accent-dark underline transition-colors"
                  >
                    privacy
                  </Link>
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
