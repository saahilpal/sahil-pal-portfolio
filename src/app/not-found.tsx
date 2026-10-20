"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { AlertCircle, ArrowLeft, RotateCcw } from "lucide-react";
import { isReducedMotion } from "@/lib/anime-motion";

export default function NotFound() {
  const blunderBadgeRef = useRef<HTMLDivElement>(null);
  const evalDropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    if (blunderBadgeRef.current) {
      animate(blunderBadgeRef.current, {
        scale: [0.7, 1.15, 1],
        rotate: [-8, 4, 0],
        opacity: [0, 1],
        duration: 800,
        ease: "outBack",
      });
    }

    if (evalDropRef.current) {
      animate(evalDropRef.current, {
        height: ["85%", "12%"],
        duration: 1100,
        delay: 200,
        ease: "outExpo",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-chess-dark)] text-[var(--text-nude)] flex flex-col items-center justify-center p-6 select-none relative overflow-hidden">
      {/* Background Subtle Chess Grid */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-10 pointer-events-none" aria-hidden="true">
        {Array.from({ length: 64 }).map((_, i) => {
          const isDark = (Math.floor(i / 8) + (i % 8)) % 2 === 1;
          return (
            <div
              key={i}
              className={isDark ? "bg-[var(--chess-green)]/10" : "bg-white/[0.02]"}
            />
          );
        })}
      </div>

      <div className="max-w-md w-full text-center space-y-6 relative z-10">
        {/* Blunder ?? Badge */}
        <div className="flex justify-center">
          <div
            ref={blunderBadgeRef}
            className="w-20 h-20 rounded-2xl bg-[var(--accent-rose)]/15 border-2 border-[var(--accent-rose)] flex flex-col items-center justify-center shadow-[0_0_40px_rgba(250,65,45,0.35)]"
          >
            <span className="text-3xl font-mono font-black text-[var(--accent-rose)]">??</span>
            <span className="text-[9px] font-mono font-bold text-[var(--accent-rose)] uppercase tracking-wider">
              BLUNDER
            </span>
          </div>
        </div>

        {/* Title & Technical Reason */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-chess)] font-mono text-xs text-[var(--chess-nude-dark)]">
            <AlertCircle size={13} className="text-[var(--accent-rose)]" />
            <span>ERROR 404 // ILLEGAL MOVE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Position Not Found
          </h1>
          <p className="text-sm text-[var(--chess-nude-muted)] leading-relaxed font-sans">
            The coordinate or route you requested does not exist on this board. Stockfish evaluates this position as an immediate resignation.
          </p>
        </div>

        {/* Mini Blunder Eval Bar Animation */}
        <div className="p-4 rounded-md bg-[var(--bg-chess-card)] border border-[var(--border-chess)] flex items-center justify-between font-mono text-xs max-w-xs mx-auto shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-12 rounded-xs bg-black/60 overflow-hidden flex flex-col justify-end border border-white/10">
              <div
                ref={evalDropRef}
                className="w-full bg-[var(--accent-rose)] transition-all"
                style={{ height: "12%" }}
              />
            </div>
            <span className="text-[11px] text-[var(--chess-nude-dark)]">EVALUATION:</span>
          </div>
          <span className="font-bold text-[var(--accent-rose)] font-serif text-sm">-9.9 (LOST)</span>
        </div>

        {/* Tactical Recovery CTA */}
        <div className="pt-2 flex justify-center">
          <Link
            href="/"
            className="btn-tactile px-6 py-3 rounded-sm bg-[var(--chess-green)] hover:bg-[var(--chess-green-hover)] text-black font-mono font-bold text-xs flex items-center gap-2 shadow-lg shadow-[var(--chess-green)]/25"
          >
            <RotateCcw size={14} />
            <span>1... e5 BEST MOVE: RETURN HOME</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
