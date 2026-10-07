"use client";

import React, { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import { ArrowLabel, primaryButtonClass } from "./brand";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

type Status = "idle" | "loading" | "success" | "error";

const WaitlistForm: React.FC<{ id?: string }> = ({ id }) => {
  const inputId = useId();
  const messageId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  // Bumped on each validation error to replay the shake animation
  const [shakeKey, setShakeKey] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  // Restart the shake animation without remounting the input (keeps focus)
  useEffect(() => {
    const form = formRef.current;
    if (!shakeKey || !form) return;
    form.classList.remove("animate-shake");
    void form.offsetWidth;
    form.classList.add("animate-shake");
  }, [shakeKey]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      setShakeKey((k) => k + 1);
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Subscription failed");
      }

      setStatus("success");
      setMessage("You're on the list. We'll email you when your country opens.");
      setEmail("");
    } catch (error) {
      console.error("Error subscribing:", error);
      setStatus("error");
      setMessage("There was an error subscribing. Please try again later.");
      setShakeKey((k) => k + 1);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-3 sm:w-auto">
      <form
        id={id}
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
      >
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error" || status === "success") setStatus("idle");
          }}
          placeholder="Your email address"
          aria-invalid={status === "error"}
          aria-describedby={message ? messageId : undefined}
          disabled={status === "loading"}
          className={`w-full rounded-full bg-white px-6 py-4 text-base leading-[normal] text-deep-blue shadow-[inset_0_0_0_2px_transparent,0_10px_30px_-12px_rgba(0,13,46,0.6)] transition-shadow duration-300 placeholder:text-deep-blue/70 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky/60 sm:w-[340px] ${
            status === "error" ? "shadow-[inset_0_0_0_2px_#ffd34d,0_10px_30px_-12px_rgba(0,13,46,0.6)]" : ""
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`${primaryButtonClass} min-w-[212px] ${status === "success" ? "!bg-sky !shadow-none" : ""}`}
        >
          {status === "loading" && (
            <>
              <Loader2 aria-hidden="true" className="size-5 animate-spin text-white" />
              <span className="font-display text-base font-semibold leading-[normal] text-white">Joining…</span>
            </>
          )}
          {status === "success" && (
            <span className="flex animate-pop-in items-center gap-2 font-display text-base font-semibold leading-[normal] text-deep-blue">
              <Check aria-hidden="true" strokeWidth={3} className="size-5" />
              You&apos;re on the list
            </span>
          )}
          {(status === "idle" || status === "error") && <ArrowLabel>Join the waitlist</ArrowLabel>}
        </button>
      </form>
      {message && (
        <p
          id={messageId}
          role={status === "error" ? "alert" : "status"}
          className={`animate-pop-in text-[15px] font-semibold leading-[normal] ${
            status === "error" ? "text-sun" : "text-sky"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default WaitlistForm;
