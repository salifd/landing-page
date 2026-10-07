import React from "react";

// Faint tile of rounded QR "modules" used as a background texture
const MODULE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect x='11' y='11' width='26' height='26' rx='7' fill='%23fff' fill-opacity='.07'/%3E%3Crect x='59' y='59' width='26' height='26' rx='7' fill='%23fff' fill-opacity='.045'/%3E%3Crect x='59' y='11' width='26' height='26' rx='7' fill='%23fff' fill-opacity='.02'/%3E%3C/svg%3E\")";

/**
 * Deep-blue gradient with slowly drifting light glows and a QR-module
 * texture along the edges. Sits behind the hero content; the parent needs
 * `relative isolate overflow-hidden`.
 */
const HeroBackdrop: React.FC = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#0d2c8a_0%,#0a2472_45%,#001c55_100%)]"
  >
    <div className="hero-glow left-[15vw] top-[-8vw] h-[46vw] w-[70vw] animate-glow-drift bg-[radial-gradient(closest-side,rgba(47,91,255,0.75),transparent)]" />
    <div className="hero-glow bottom-[2vw] left-[20vw] h-[40vw] w-[60vw] animate-glow-drift-reverse bg-[radial-gradient(closest-side,rgba(166,225,250,0.38),transparent)]" />
    <div className="hero-glow -bottom-[12vw] -left-[10vw] size-[34vw] bg-[radial-gradient(closest-side,rgba(255,92,92,0.22),transparent)]" />
    <div
      className="hero-texture absolute inset-x-0 bottom-[44%] top-0 opacity-90"
      style={{ backgroundImage: MODULE_TEXTURE }}
    />
  </div>
);

export default HeroBackdrop;
