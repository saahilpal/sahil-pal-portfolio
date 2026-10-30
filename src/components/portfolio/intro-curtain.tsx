"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const RANKS = ["8", "7", "6", "5", "4", "3", "2", "1"];

export function IntroCurtain() {
  const [mounted, setMounted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If reduced motion or already seen in this session, skip
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      const timer = setTimeout(() => setMounted(false), 0);
      return () => clearTimeout(timer);
    }

    const container = containerRef.current;
    if (!container) return;

    const tiles = container.querySelectorAll(".curtain-tile");
    if (!tiles.length) {
      const timer = setTimeout(() => setMounted(false), 0);
      return () => clearTimeout(timer);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setMounted(false);
      },
    });

    // 1. Badge subtle pulse, then fade
    tl.to(badgeRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.35,
      delay: 0.5,
      ease: "power2.out",
    })
      // 2. Ultra-smooth diagonal tile stagger wipe
      .to(
        tiles,
        {
          scale: 0,
          opacity: 0,
          duration: 0.45,
          stagger: {
            grid: [8, 8],
            from: "start",
            amount: 0.45,
            ease: "power2.inOut",
          },
          ease: "power3.in",
        },
        "-=0.1"
      );

    // Click to skip
    const handleSkip = () => {
      tl.kill();
      gsap.to(container, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => setMounted(false),
      });
    };

    container.addEventListener("click", handleSkip);
    window.addEventListener("keydown", handleSkip);

    return () => {
      tl.kill();
      container.removeEventListener("click", handleSkip);
      window.removeEventListener("keydown", handleSkip);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0D0E10] cursor-pointer select-none overflow-hidden"
      aria-label="Chess Opening Curtain"
    >
      {/* 8x8 Chessboard Grid Tiles */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 w-full h-full pointer-events-none">
        {RANKS.flatMap((rank) =>
          FILES.map((file) => {
            const square = `${file}${rank}`;
            const fileIdx = FILES.indexOf(file);
            const rankIdx = RANKS.indexOf(rank);
            const isDark = (fileIdx + rankIdx) % 2 === 1;

            return (
              <div
                key={square}
                className={`curtain-tile relative flex items-center justify-center will-change-transform ${
                  isDark ? "bg-[#141619]" : "bg-[#1A1D21]"
                } border border-white/[0.03]`}
              >
                <span className="text-[10px] font-mono text-white/15 uppercase select-none">
                  {square}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Center Tactical Knight Badge */}
      <div
        ref={badgeRef}
        className="relative z-10 px-6 py-4 rounded-xl bg-[#121316]/95 border border-[var(--accent-move)]/40 shadow-2xl flex items-center gap-3.5 backdrop-blur-md will-change-transform"
      >
        <span className="text-2xl text-[var(--accent-move)] animate-pulse">♞</span>
        <div className="space-y-0.5">
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-white">
            OPENING // 1000 ELO RAPID
          </div>
          <div className="text-[11px] font-mono text-[var(--accent-move)]">
            SAHIL PAL &bull; SYSTEMS READY
          </div>
        </div>
      </div>
    </div>
  );
}
