"use client";

import { useEffect, useState } from "react";

export function StockfishEvalBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [evalText, setEvalText] = useState("+0.4");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      setScrollProgress(progress);

      // Climbs: +0.4 Act I -> +2.4 Act II -> +4.6 Act III -> M1 Signal
      if (progress < 0.3) {
        const val = (0.4 + (progress / 0.3) * 1.6).toFixed(1);
        setEvalText(`+${val}`);
      } else if (progress < 0.7) {
        const val = (2.0 + ((progress - 0.3) / 0.4) * 2.2).toFixed(1);
        setEvalText(`+${val}`);
      } else if (progress < 0.92) {
        const val = (4.2 + ((progress - 0.7) / 0.22) * 2.8).toFixed(1);
        setEvalText(`+${val}`);
      } else {
        setEvalText("#M1");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // White portion percentage: Starts at 52% (+0.4) and climbs up to 98% (#M1)
  const whitePercent = Math.min(98, 52 + scrollProgress * 46);

  return (
    <div
      className="fixed left-0 top-0 bottom-0 z-40 w-[6px] group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Stockfish Engine Evaluation: ${evalText}`}
    >
      {/* Black / White Eval Gradient Bar */}
      <div className="relative w-full h-full bg-[#12141A] border-r border-[var(--border-grid)]">
        {/* White evaluation advantage climbing from bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-[#F4F4F0] transition-[height] duration-150 ease-out"
          style={{ height: `${whitePercent}%` }}
        />

        {/* Center line (equal 0.0 indicator) */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[var(--accent-red)] z-10" />
      </div>

      {/* Hover Floating Tooltip */}
      <div
        className={`absolute left-3 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase bg-[var(--surface)] text-[var(--ink-primary)] border border-[var(--border-frame)] shadow-[3px_3px_0px_var(--accent-lime)] whitespace-nowrap pointer-events-none transition-all duration-150 z-50 ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
        }`}
      >
        <span className="text-[var(--accent-lime)] font-bold">Eval: sahill17</span>
        <span className="ml-2 font-bold">{evalText}</span>
      </div>
    </div>
  );
}
