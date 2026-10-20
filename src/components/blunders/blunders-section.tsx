"use client";

import { ShieldAlert, Wrench, Bug, CheckCircle2 } from "lucide-react";
import { CASE_STUDIES } from "@/lib/chess-puzzle";

export function BlundersSection() {
  return (
    <section id="blunders" className="py-16 border-b border-[var(--border-hairline)] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border-hairline)] pb-4 gap-2">
          <div>
            <div className="font-mono text-xs text-[var(--accent-rose)] uppercase tracking-wider">
              SECTION 03 // ARCHITECTURAL WAR STORIES
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-pure)] tracking-tight">
              Blunders I Fixed in Production
            </h2>
          </div>
          <div className="font-mono text-xs text-[var(--text-muted)]">
            HOW REAL FAILURES PROVE SENIORITY &amp; SYSTEM RESILIENCE
          </div>
        </div>

        {/* 4 Blunder War Stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {CASE_STUDIES.map((c, idx) => (
            <div
              key={c.id}
              className="p-5 sm:p-6 rounded-sm bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] space-y-4 relative overflow-hidden"
            >
              {/* Top Tag */}
              <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-2.5">
                <span className="font-bold text-[var(--text-pure)] text-[11px] flex items-center gap-1.5">
                  <span className="text-[var(--accent-copper)]">{c.pieceSymbol}</span>
                  <span>{c.title} // BLUNDER 0{idx + 1}</span>
                </span>
                <span className="text-[10px] text-[var(--accent-rose)] font-semibold flex items-center gap-1">
                  <Bug size={11} />
                  <span>PRODUCTION INCIDENT</span>
                </span>
              </div>

              {/* The Incident */}
              <div className="space-y-1">
                <div className="text-[10px] text-[var(--text-muted)] uppercase">The Failure Incident</div>
                <p className="text-[var(--text-ivory)] font-sans text-xs sm:text-sm leading-relaxed">
                  {c.blunderFixed.incident}
                </p>
              </div>

              {/* The Root Cause */}
              <div className="space-y-1 p-3 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)]">
                <div className="text-[10px] text-[var(--accent-rose)] uppercase font-bold flex items-center gap-1">
                  <ShieldAlert size={11} />
                  <span>Root Cause Analysis</span>
                </div>
                <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
                  {c.blunderFixed.rootCause}
                </p>
              </div>

              {/* The Production Fix */}
              <div className="space-y-1 p-3 rounded-xs bg-[var(--accent-emerald)]/10 border border-[var(--accent-emerald)]/30">
                <div className="text-[10px] text-[var(--accent-emerald)] uppercase font-bold flex items-center gap-1">
                  <CheckCircle2 size={11} />
                  <span>Production Resolution &amp; Invariant</span>
                </div>
                <p className="text-[var(--text-ivory)] text-[11px] leading-relaxed">
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
