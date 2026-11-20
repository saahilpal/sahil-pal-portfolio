"use client";

import { useEffect, useState } from "react";
import { sound } from "@/lib/audio";

export function KineticTickerTape() {
  const [scrollSkew, setScrollSkew] = useState(0);

  useEffect(() => {
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let animFrame: number;

    const handleScroll = () => {
      const now = performance.now();
      const dt = Math.max(16, now - lastTime);
      const dy = window.scrollY - lastY;
      const velocity = dy / dt;
      const targetSkew = Math.max(-4, Math.min(4, velocity * 2.5));
      setScrollSkew(targetSkew);
      lastY = window.scrollY;
      lastTime = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const damp = () => {
      setScrollSkew((prev) => (Math.abs(prev) > 0.05 ? prev * 0.88 : 0));
      animFrame = requestAnimationFrame(damp);
    };
    animFrame = requestAnimationFrame(damp);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const items = [
    "SYNAPSE MCP ★ FLAGSHIP",
    "PROPEVAL v1.0.0 — 0.36MS CPU CASCADE",
    "DISHA AI — MULTILINGUAL HYBRID RAG",
    "PGVECTOR DOCANALYZER",
    "CHESS.COM/MEMBER/SAHILL17 — SEND A CHALLENGE",
  ];

  // Repeat items for continuous marquee loop
  const tape = [...items, ...items, ...items, ...items];

  return (
    <div
      className="relative w-full overflow-hidden border-y-2 border-[var(--border-frame)] bg-[var(--accent-lime)] text-[#050507] py-2 sm:py-2.5 select-none z-20"
      aria-label="Grandmaster Systems Lab Telemetry Ticker"
      style={{
        transform: `skewX(${scrollSkew}deg)`,
        transition: "transform 0.12s ease-out",
      }}
    >
      <div
        className="animate-ticker flex items-center gap-8 font-mono text-xs sm:text-sm font-black tracking-wider cursor-default"
        onMouseEnter={() => sound.tick()}
      >
        {tape.map((phrase, idx) => (
          <div key={idx} className="flex items-center gap-6 shrink-0">
            <span>{phrase}</span>
            <span className="text-black/50 font-black">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
