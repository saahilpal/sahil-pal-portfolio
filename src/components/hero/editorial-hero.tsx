"use client";

import { useEffect, useRef, useState } from "react";
import { animate, createTimeline } from "animejs";
import { ArrowDown, Award, GitBranch, ShieldCheck, Compass, Terminal, Sparkles, Sliders, Activity, Cpu } from "lucide-react";
import { DraftingRuler } from "@/components/hero/drafting-ruler";
import { StampMachine } from "@/components/hero/stamp-machine";
import { HeroAstWorkbench } from "@/components/hero/hero-ast-workbench";
import { ArchitecturalMotionCanvas } from "@/components/hero/architectural-motion-canvas";

export function EditorialHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const stampRef = useRef<HTMLSpanElement>(null);
  const compassPathRef = useRef<SVGPathElement>(null);
  const compassArmRef = useRef<SVGLineElement>(null);

  const [heroCenterTab, setHeroCenterTab] = useState<"canvas" | "ast">("canvas");
  const [symbolCount, setSymbolCount] = useState<number>(0);
  const [latencyVal, setLatencyVal] = useState<number>(0);

  useEffect(() => {
    // 1. Anime.js v4 timeline for kinetic drafting entrance
    const tl = createTimeline({
      defaults: { ease: "outCubic" },
    });

    // Stamp Thump Animation (physical rubber stamp drop)
    if (stampRef.current) {
      animate(stampRef.current, {
        scale: [1.8, 1],
        rotate: [-12, -2],
        opacity: [0, 1],
        duration: 500,
        ease: "outBack",
      });
    }

    // Headline entrance
    if (headlineRef.current) {
      animate(headlineRef.current, {
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 750,
        delay: 100,
        ease: "outCubic",
      });
    }

    // Compass SVG stroke animation
    if (compassPathRef.current) {
      animate(compassPathRef.current, {
        strokeDashoffset: [280, 0],
        duration: 1400,
        delay: 200,
        ease: "inOutQuad",
      });
    }

    if (compassArmRef.current) {
      animate(compassArmRef.current, {
        rotate: [0, 135],
        duration: 2000,
        delay: 300,
        ease: "outElastic(1, .6)",
      });
    }

    // Animated counter rollups
    const countObj = { symbols: 0, latency: 0 };
    animate(countObj, {
      symbols: 50000,
      latency: 1.84,
      duration: 1200,
      delay: 250,
      ease: "outExpo",
      onUpdate: () => {
        setSymbolCount(Math.round(countObj.symbols));
        setLatencyVal(+countObj.latency.toFixed(2));
      },
    });
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative pt-6 pb-20 border-b border-[var(--border-paper-strong)] drafting-grid overflow-hidden"
    >
      {/* Precision Millimeter Architectural Ruler */}
      <DraftingRuler />

      {/* Background Architectural Drafting Compass (Animated Anime.js SVG) */}
      <div className="absolute right-4 top-16 pointer-events-none opacity-20 hidden lg:block">
        <svg width="340" height="340" viewBox="0 0 340 340" className="text-[var(--text-ink)]">
          <circle cx="170" cy="170" r="160" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
          <circle cx="170" cy="170" r="120" stroke="currentColor" strokeWidth="0.5" />
          <path
            ref={compassPathRef}
            d="M 170 50 A 120 120 0 1 1 50 170"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="280"
          />
          <line
            ref={compassArmRef}
            x1="170"
            y1="170"
            x2="290"
            y2="170"
            stroke="var(--stamp-red)"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ transformOrigin: "170px 170px" }}
          />
          <circle cx="170" cy="170" r="4" fill="var(--stamp-red)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 pt-8">
        {/* Margin Note / Catalog Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border-paper)] font-mono text-[11px] text-[var(--text-ink-muted)]">
          <div className="flex items-center gap-3">
            <span ref={stampRef} className="stamp-seal stamp-red">
              ARCHITECTURAL DRAFT
            </span>
            <span>INDEX NO. SP-2026-ENG</span>
            <span>•</span>
            <span className="hidden sm:inline">DISCIPLINE: AI SYSTEMS / AST COMPILERS / DISTRIBUTED STATE</span>
          </div>

          <div className="flex items-center gap-2 text-[var(--text-ink-secondary)]">
            <span className="w-2 h-2 rounded-full bg-[var(--stamp-green)] animate-pulse" />
            <span>PRODUCTION VERIFIED SYSTEMS</span>
          </div>
        </div>

        {/* Hero Title & Subheadline */}
        <div className="pt-8 pb-8 space-y-6 max-w-4xl">
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[var(--text-ink)] tracking-tight leading-[1.08]"
          >
            Architecting systems at the boundary of code &amp; intelligence.
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text-ink-secondary)] font-normal leading-relaxed">
            I am <strong className="text-[var(--text-ink)] font-semibold">Sahil Pal</strong> — a software engineer building Git-aware AST context daemons for AI coding agents, grounded multi-document RAG pipelines, offline-first native Android ERPs, and developer tooling.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 font-mono text-xs">
            <span className="px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-paper)] rounded-xs text-[var(--text-ink-secondary)] flex items-center gap-1.5 shadow-sm hover:border-[var(--text-ink)] transition-colors">
              <Award size={13} className="text-[var(--stamp-red)]" />
              <span>BCA Graduate • Kristu Jayanti (CGPA 7.9/10)</span>
            </span>
            <span className="px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-paper)] rounded-xs text-[var(--text-ink-secondary)] flex items-center gap-1.5 shadow-sm hover:border-[var(--text-ink)] transition-colors">
              <GitBranch size={13} className="text-[var(--stamp-blue)]" />
              <span>Tree-sitter AST &amp; Model Context Protocol</span>
            </span>
            <span className="px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-paper)] rounded-xs text-[var(--text-ink-secondary)] flex items-center gap-1.5 shadow-sm hover:border-[var(--text-ink)] transition-colors">
              <ShieldCheck size={13} className="text-[var(--stamp-green)]" />
              <span>ACID Local Storage &amp; SQLite WAL</span>
            </span>
          </div>
        </div>

        {/* Interactive Workbench Stage Controls */}
        <div className="flex items-center justify-between border-b border-[var(--border-paper)] pb-2 pt-2 font-mono text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setHeroCenterTab("canvas")}
              className={`px-3 py-1.5 rounded-xs border transition-all flex items-center gap-1.5 ${
                heroCenterTab === "canvas"
                  ? "bg-[var(--text-ink)] text-[var(--bg-paper)] border-[var(--text-ink)] font-bold shadow-xs"
                  : "bg-[var(--bg-card)] border-[var(--border-paper)] text-[var(--text-ink-secondary)] hover:border-[var(--border-paper-strong)]"
              }`}
            >
              <Activity size={12} className={heroCenterTab === "canvas" ? "text-[var(--stamp-red)]" : "text-current"} />
              <span>01. 60FPS ARCHITECTURAL MOTION CANVAS</span>
            </button>

            <button
              onClick={() => setHeroCenterTab("ast")}
              className={`px-3 py-1.5 rounded-xs border transition-all flex items-center gap-1.5 ${
                heroCenterTab === "ast"
                  ? "bg-[var(--text-ink)] text-[var(--bg-paper)] border-[var(--text-ink)] font-bold shadow-xs"
                  : "bg-[var(--bg-card)] border-[var(--border-paper)] text-[var(--text-ink-secondary)] hover:border-[var(--border-paper-strong)]"
              }`}
            >
              <Cpu size={12} className={heroCenterTab === "ast" ? "text-[var(--stamp-blue)]" : "text-current"} />
              <span>02. SYNTACTIC AST CODE SCANNER</span>
            </button>
          </div>

          <span className="text-[10px] text-[var(--text-ink-muted)] hidden sm:inline">
            TOGGLE INTERACTIVE HARDWARE INSTRUMENTS
          </span>
        </div>

        {/* CENTERPIECE WORKBENCH: Motion Canvas OR AST Compiler + Stamp Machine */}
        <div className="pt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Left: Interactive Stage */}
          <div className="lg:col-span-8">
            {heroCenterTab === "canvas" ? (
              <ArchitecturalMotionCanvas />
            ) : (
              <HeroAstWorkbench />
            )}
          </div>

          {/* Right Column: Mechanical Stamp Machine & Benchmarks */}
          <div className="lg:col-span-4 space-y-6">
            {/* 1. Tactile Verification Stamp Press */}
            <StampMachine />

            {/* 2. Engineering Benchmarks Card */}
            <div className="paper-sheet p-6 space-y-5 rounded-sm relative shadow-md">
              {/* Corner Registration Crosshairs */}
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

              {/* Metric 1 (Animated Counter) */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[var(--text-ink-secondary)]">AST Index Latency</span>
                  <span className="font-bold text-[var(--text-ink)] text-sm">
                    &lt; {latencyVal}s
                  </span>
                </div>
                <div className="text-[11px] text-[var(--text-ink-muted)] font-mono">
                  Tree-sitter parallel parse on {symbolCount.toLocaleString()} symbols.
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
                className="w-full mt-2 py-2.5 bg-[var(--text-ink)] text-[var(--bg-paper)] font-mono text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[var(--text-ink-secondary)] active:scale-95 transition-all rounded-xs shadow-sm"
              >
                <span>INSPECT PRODUCTION SYSTEMS (4)</span>
                <ArrowDown size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
