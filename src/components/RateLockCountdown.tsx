"use client";

import React, { useEffect, useState } from "react";

const START = 58;

/** Ticking "00:58" in the phone mockup; restarts at 01:00 when it runs out. */
const RateLockCountdown: React.FC = () => {
  const [seconds, setSeconds] = useState(START);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setSeconds((s) => (s <= 0 ? 60 : s - 1)), 1000);
    return () => window.clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return <span className="tabular-nums">{`${mm}:${ss}`}</span>;
};

export default RateLockCountdown;
