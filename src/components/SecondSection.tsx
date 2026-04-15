import React, { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";

const API_URL = import.meta.env.VITE_API_URL || "";

const SecondSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

    try {
      const response = await fetch(`${API_URL}/api/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Subscription failed");
      }

      setIsLoading(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setEmail("");
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error subscribing:", error);
      setIsLoading(false);
      setErrorMessage("There was an error subscribing. Please try again later.");
      setIsValid(false);
    }
  };

  const { ref: leftRef, isVisible: leftVisible } = useScrollReveal();
  const { ref: rightRef, isVisible: rightVisible } = useScrollReveal();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!isValid) {
      setIsValid(true);
    }
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  return (
    <section id="waitlist" className="relative w-full bg-[#010e34] py-24 md:py-32 overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 dot-grid opacity-35 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-accent-coral/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-primary/25 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image — LEFT */}
          <div ref={leftRef} className={`order-first transition-opacity duration-100 ${leftVisible ? 'animate-slide-right' : 'opacity-0'}`}>
            <div className="relative">
              {/* Orbital ring */}
              <div className="absolute inset-[-20px] rounded-full border border-dashed border-secondary/[0.07] pointer-events-none" />

              {/* Main Image */}
              <div className="relative aspect-square rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-accent-dark/60">
                <img
                  src="/assets/images/illustration_5.webp"
                  alt="Join our community illustration - Be the first to experience innovative travel payments"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="800"
                />
                {/* Blend illustration edges into dark bg */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#010e34]/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-l from-[#010e34]/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Glow halos */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/50 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent-coral/12 rounded-full blur-2xl pointer-events-none" />

              {/* Floating badge — hidden on small screens */}
              <div className="hidden sm:block animate-float absolute -top-5 -right-6 bg-white/[0.07] backdrop-blur-xl border border-white/[0.13] rounded-2xl px-4 py-3 shadow-2xl" style={{ animationDelay: '1.5s' }}>
                <div className="text-secondary text-[10px] font-semibold uppercase tracking-[0.2em] mb-0.5">
                  Waitlist
                </div>
                <div className="font-display text-white text-2xl font-bold leading-none">
                  Early
                </div>
                <div className="text-white/35 text-[11px] mt-1">
                  Access members
                </div>
              </div>
            </div>
          </div>

          {/* Form — RIGHT */}
          <div ref={rightRef} className={`order-last transition-opacity duration-100 ${rightVisible ? 'animate-slide-left' : 'opacity-0'}`}>
            <div className="max-w-md lg:ml-auto">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-coral/25 bg-accent-coral/[0.07] mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-coral animate-pulse flex-shrink-0" />
                <span className="text-accent-coral text-[11px] font-semibold uppercase tracking-[0.2em]">
                  Join Waitlist
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.06] mb-5">
                Be the first to<br />
                <em className="not-italic font-light text-secondary/90">embark</em> with us
              </h2>

              <p className="text-white/45 text-lg leading-relaxed mb-10">
                Join our waitlist to stay updated on our launch and be among the
                first to experience the future of travel.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                    className={`w-full px-5 py-4 text-base rounded-xl border transition-all duration-300 focus:outline-none text-white placeholder-white/25 bg-white/[0.05] ${
                      !isValid
                        ? "border-red-500/50 focus:border-red-400/70 focus:ring-2 focus:ring-red-400/15"
                        : isSubmitted
                        ? "border-green-500/40 bg-green-500/[0.08]"
                        : "border-white/[0.10] focus:border-secondary/50 focus:ring-2 focus:ring-secondary/15"
                    }`}
                    disabled={isLoading || isSubmitted}
                    required
                  />
                  {!isValid && (
                    <p className="mt-2 text-sm text-red-400 animate-slide-up">
                      Please enter a valid email address
                    </p>
                  )}
                  {isSubmitted && (
                    <p className="mt-2 text-sm text-green-400 animate-slide-up flex items-center gap-2">
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      You're on the list — we'll be in touch!
                    </p>
                  )}
                  {errorMessage && (
                    <p className="mt-2 text-sm text-red-400 animate-slide-up">
                      {errorMessage}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || isSubmitted}
                  className={`w-full px-8 py-4 text-base font-semibold text-white rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent-coral/25 ${
                    isLoading || isSubmitted
                      ? "bg-white/10 cursor-not-allowed text-white/35"
                      : "bg-accent-coral hover:bg-[#e55a5a] shadow-lg shadow-accent-coral/20 hover:shadow-accent-coral/30 hover:scale-[1.01] active:scale-[0.99]"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 text-white/60"
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
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : isSubmitted ? (
                    "Subscribed!"
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Join the waitlist
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  )}
                </button>

                <p className="text-xs text-white/25 text-center pt-1">
                  By joining you accept our{" "}
                  <Link
                    to="/terms"
                    className="text-white/45 hover:text-secondary underline underline-offset-2 transition-colors duration-200"
                  >
                    terms of use
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-white/45 hover:text-secondary underline underline-offset-2 transition-colors duration-200"
                  >
                    privacy policy
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
