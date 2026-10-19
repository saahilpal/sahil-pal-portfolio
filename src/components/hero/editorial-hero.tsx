"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { ArrowDown, Cpu, ShieldCheck, Terminal, Award, GitBranch } from "lucide-react";

export function EditorialHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const specSheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headlineRef.current || !specSheetRef.current) return;

    // Anime.js smooth drafting rule reveal
    animate(headlineRef.current, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      ease: "outCubic",
    });

    animate(specSheetRef.current, {
      opacity: [0, 1],
      translateY: [30, 0],
      delay: 200,
      duration: 900,
      ease: "outCubic",
    });
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative pt-12 pb-20 border-b border-[var(--border-paper-strong)] drafting-grid overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Margin Note / Catalog Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border-paper)] font-mono text-[11px] text-[var(--text-ink-muted)]">
          <div className="flex items-center gap-3">
            <span className="stamp-seal stamp-red">ARCHITECTURAL DRAFT</span>
            <span>INDEX NO. SP-2026-ENG</span>
            <span>•</span>
            <span className="hidden sm:inline">DISCIPLINE: AI SYSTEMS / AST COMPILERS / DISTRIBUTED STATE</span>
          </div>

          <div className="flex items-center gap-2 text-[var(--text-ink-secondary)]">
            <span className="w-2 h-2 rounded-full bg-[var(--stamp-green)]" />
            <span>PRODUCTION VERIFIED SYSTEMS</span>
          </div>
        </div>

        {/* Main Editorial Hero Layout */}
        <div className="pt-10 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Title Column */}
          <div className="lg:col-span-8 space-y-6">
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[var(--text-ink)] tracking-tight leading-[1.08]"
            >
              Architecting systems at the boundary of code &amp; intelligence.
            </h1>

            <p className="text-lg sm:text-xl text-[var(--text-ink-secondary)] font-normal leading-relaxed max-w-3xl">
              I am <strong className="text-[var(--text-ink)] font-semibold">Sahil Pal</strong> — a software engineer building Git-aware AST context daemons for AI coding agents, grounded multi-document RAG pipelines, and offline-first native Android ERPs deployed in wholesale manufacturing.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
              <span className="px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-paper)] rounded-sm text-[var(--text-ink-secondary)] flex items-center gap-1.5 shadow-sm">
                <Award size={13} className="text-[var(--stamp-red)]" />
                <span>BCA Graduate • Kristu Jayanti (CGPA 7.9/10)</span>
              </span>
              <span className="px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-paper)] rounded-sm text-[var(--text-ink-secondary)] flex items-center gap-1.5 shadow-sm">
                <GitBranch size={13} className="text-[var(--stamp-blue)]" />
                <span>Tree-sitter AST &amp; Model Context Protocol</span>
              </span>
              <span className="px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-paper)] rounded-sm text-[var(--text-ink-secondary)] flex items-center gap-1.5 shadow-sm">
                <ShieldCheck size={13} className="text-[var(--stamp-green)]" />
                <span>ACID Local Storage &amp; SQLite WAL</span>
              </span>
            </div>
          </div>

          {/* Right Column: Architectural Sidebar Spec Sheet */}
          <div className="lg:col-span-4">
            <div
              ref={specSheetRef}
              className="paper-sheet p-6 space-y-5 rounded-sm relative"
            >
              {/* Corner Registration Crosshair */}
              <div className="absolute top-2 left-2 text-[10px] font-mono text-[var(--text-ink-faint)]">+</div>
              <div className="absolute top-2 right-2 text-[10px] font-mono text-[var(--text-ink-faint)]">+</div>
              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-[var(--text-ink-faint)]">+</div>
              <div className="absolute bottom-2 right-2 text-[10px] font-mono text-[var(--text-ink-faint)]">+</div>

              <div className="flex items-center justify-between border-b border-[var(--border-paper)] pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-ink)]">
                  ENGINEERING BENCHMARKS
                </span>
                <span className="font-mono text-[10px] text-[var(--text-ink-muted)]">
                  SPEC 01/A
                </span>
              </div>

              {/* Metric 1 */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[var(--text-ink-secondary)]">AST Index Latency</span>
                  <span className="font-bold text-[var(--text-ink)]">&lt; 1.84s</span>
                </div>
                <div className="text-[11px] text-[var(--text-ink-muted)] font-mono">
                  Tree-sitter parallel parse across 50,000 codebase symbols.
                </div>
              </div>

              {/* Metric 2 */}
              <div className="space-y-1 pt-2 border-t border-dashed border-[var(--border-paper)]">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[var(--text-ink-secondary)]">Worker Concurrency</span>
                  <span className="font-bold text-[var(--stamp-blue)]">SKIP LOCKED</span>
                </div>
                <div className="text-[11px] text-[var(--text-ink-muted)] font-mono">
                  PostgreSQL queue eliminates race conditions &amp; double chunking.
                </div>
              </div>

              {/* Metric 3 */}
              <div className="space-y-1 pt-2 border-t border-dashed border-[var(--border-paper)]">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[var(--text-ink-secondary)]">Hera Wholesale Math</span>
                  <span className="font-bold text-[var(--stamp-green)]">ZERO ROUND-OFF</span>
                </div>
                <div className="text-[11px] text-[var(--text-ink-muted)] font-mono">
                  Hare-Niemeyer Largest Remainder with 2.5% CGST/SGST parity.
                </div>
              </div>

              {/* Action trigger */}
              <button
                onClick={() => scrollTo("systems")}
                className="w-full mt-2 py-2.5 bg-[var(--text-ink)] text-[var(--bg-paper)] font-mono text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[var(--text-ink-secondary)] transition-colors rounded-xs shadow-sm"
              >
                <span>INSPECT PRODUCTION SYSTEMS</span>
                <ArrowDown size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
