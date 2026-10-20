"use client";

import { useEffect, useState, useRef } from "react";

export function DraftingRuler() {
  const [indicatorPos, setIndicatorPos] = useState<number>(35);
  const [scrollPct, setScrollPct] = useState<number>(0);
  const rulerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      const pct = total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0;
      setScrollPct(Math.round(pct));
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!rulerRef.current) return;
      const rect = rulerRef.current.getBoundingClientRect();
      if (e.clientY >= rect.top - 20 && e.clientY <= rect.bottom + 20) {
        const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
        const pct = (x / rect.width) * 100;
        setIndicatorPos(pct);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={rulerRef}
      className="w-full border-y border-[var(--border-paper-strong)] bg-[var(--bg-paper-secondary)]/80 select-none overflow-hidden relative py-1 font-mono text-[9px] text-[var(--text-ink-muted)] hidden sm:block"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between relative">
        {/* Left Calibration Label */}
        <div className="flex items-center gap-2 z-10 bg-[var(--bg-paper-secondary)]/90 px-1">
          <span className="font-bold text-[var(--text-ink)]">SCALE 1:1</span>
          <span>•</span>
          <span className="text-[var(--stamp-red)] font-semibold">ARCHITECTURAL METRIC (MM)</span>
        </div>

        {/* Center Calibrated Tick Marks SVG */}
        <div className="absolute inset-x-32 inset-y-0 flex items-center justify-center opacity-60">
          <svg className="w-full h-4" preserveAspectRatio="none" viewBox="0 0 1000 16">
            {/* Generate millimeter ticks */}
            {Array.from({ length: 101 }).map((_, i) => {
              const isMajor = i % 10 === 0;
              const isMedium = i % 5 === 0 && !isMajor;
              const height = isMajor ? 14 : isMedium ? 9 : 5;
              const y1 = 16 - height;
              return (
                <line
                  key={i}
                  x1={i * 10}
                  y1={y1}
                  x2={i * 10}
                  y2={16}
                  stroke="currentColor"
                  strokeWidth={isMajor ? 1.2 : 0.6}
                  strokeOpacity={isMajor ? 0.9 : 0.4}
                />
              );
            })}
          </svg>
        </div>

        {/* Sliding Brass Needle Indicator */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none transition-all duration-75 ease-out z-20 flex flex-col items-center"
          style={{ left: `${indicatorPos}%` }}
        >
          <div className="w-2.5 h-1.5 bg-[var(--stamp-red)] -mt-0.5 clip-triangle" />
          <div className="w-[1.5px] h-full bg-[var(--stamp-red)]" />
          <div className="absolute -top-3.5 px-1 py-0.2 rounded-xs bg-[var(--text-ink)] text-[var(--bg-paper)] text-[8px] font-bold shadow-xs whitespace-nowrap">
            {(indicatorPos * 2.8).toFixed(1)}mm
          </div>
        </div>

        {/* Right Readout */}
        <div className="flex items-center gap-3 z-10 bg-[var(--bg-paper-secondary)]/90 px-1">
          <span className="text-[var(--text-ink-secondary)]">READOUT: {scrollPct}% SCROLL DEPTH</span>
          <span>•</span>
          <span className="text-[var(--stamp-green)] font-semibold">VERIFIED SPEC</span>
        </div>
      </div>
    </div>
  );
}
