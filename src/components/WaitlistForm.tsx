"use client";

import React, { useId, useState, type FormEvent } from "react";
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
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
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-3 sm:w-auto">
      <form
        id={id}
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
            if (status === "error") setStatus("idle");
          }}
          placeholder="Your email address"
          aria-invalid={status === "error"}
          aria-describedby={message ? messageId : undefined}
          disabled={status === "loading"}
          className="w-full rounded-full bg-white px-6 py-4 text-base leading-[normal] text-deep-blue placeholder:text-deep-blue focus:outline-none focus-visible:ring-4 focus-visible:ring-sky/60 sm:w-[340px]"
        />
        <button type="submit" disabled={status === "loading"} className={primaryButtonClass}>
          <ArrowLabel>{status === "loading" ? "Joining…" : "Join the waitlist"}</ArrowLabel>
        </button>
      </form>
      {message && (
        <p
          id={messageId}
          role={status === "error" ? "alert" : "status"}
          className={`text-[15px] font-semibold leading-[normal] ${
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
