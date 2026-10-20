"use client";

import { ShieldAlert, Bug, CheckCircle2 } from "lucide-react";
import { CASE_STUDIES } from "@/lib/chess-puzzle";
import { useStaggerReveal } from "@/lib/anime-motion";

export function BlundersSection() {
  const containerRef = useStaggerReveal<HTMLDivElement>(".blunder-card", {
    staggerMs: 80,
    duration: 650,
    translateY: 20,
  });

  return (
    <section id="blunders" className="py-16 sm:py-24 border-b border-[var(--border-chess)] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border-chess)] pb-5 gap-3">
          <div className="space-y-1.5">
            <div className="font-mono text-xs text-[var(--accent-rose)] uppercase tracking-wider font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-rose)]" />
              <span>SECTION 03 // PRODUCTION RESILIENCE &amp; DEBUGGING</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-white)] tracking-tight">
              Blunders I Fixed in Production
            </h2>
            <p className="text-sm text-[var(--chess-nude-muted)] max-w-2xl">
              Systems fail at boundaries. Real war stories that demonstrate diagnostic depth, root-cause isolation, and permanent invariant fixes.
            </p>
          </div>
          <div className="font-mono text-xs text-[var(--chess-nude-dark)] sm:text-right">
            <span>4 REAL INCIDENTS</span>
            <div>PROVING ARCHITECTURAL SENIORITY</div>
          </div>
        </div>

        {/* 4 Blunder War Stories (Animated Stagger via Anime.js) */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {CASE_STUDIES.map((c, idx) => (
            <div
              key={c.id}
              className="blunder-card card-tactile p-5 sm:p-6 rounded-md bg-[var(--bg-chess-card)] border border-[var(--border-chess)] space-y-4 relative overflow-hidden shadow-sm"
            >
              {/* Top Tag */}
              <div className="flex items-center justify-between border-b border-[var(--border-chess)] pb-3">
                <span className="font-bold text-[var(--text-white)] text-xs flex items-center gap-2">
                  <span className="text-[var(--chess-green)] font-serif text-sm">{c.pieceSymbol}</span>
                  <span>{c.title} // INCIDENT 0{idx + 1}</span>
                </span>
                <span className="text-[10px] text-[var(--accent-rose)] font-bold flex items-center gap-1 px-2 py-0.5 rounded-xs bg-[var(--accent-rose)]/10 border border-[var(--accent-rose)]/20">
                  <Bug size={11} />
                  <span>PRODUCTION SEV-2</span>
                </span>
              </div>

              {/* The Incident */}
              <div className="space-y-1">
                <div className="text-[10px] text-[var(--chess-nude-dark)] uppercase font-semibold">The Failure Symptom</div>
                <p className="text-[var(--text-white)] font-sans text-xs sm:text-sm leading-relaxed">
                  {c.blunderFixed.incident}
                </p>
              </div>

              {/* The Root Cause */}
              <div className="space-y-1.5 p-3.5 rounded-sm bg-[var(--bg-chess-dark)] border border-[var(--border-chess)]">
                <div className="text-[10px] text-[var(--accent-rose)] uppercase font-bold flex items-center gap-1.5">
                  <ShieldAlert size={12} />
                  <span>Root Cause Analysis</span>
                </div>
                <p className="text-[var(--chess-nude-muted)] font-sans text-xs leading-relaxed">
                  {c.blunderFixed.rootCause}
                </p>
              </div>

              {/* The Production Fix */}
              <div className="space-y-1.5 p-3.5 rounded-sm bg-[var(--chess-green-subtle)] border border-[var(--border-green)]">
                <div className="text-[10px] text-[var(--chess-green)] uppercase font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={12} />
                  <span>Permanent Resolution &amp; Invariant</span>
                </div>
                <p className="text-[var(--text-white)] font-sans text-xs leading-relaxed">
                  {c.blunderFixed.productionFix}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
