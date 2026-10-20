"use client";

import { useEffect, useRef } from "react";
import { Award, GitBranch, Database, ArrowDown } from "lucide-react";
import { EngineMotionGraphic } from "./engine-motion-graphic";
import { animate, stagger } from "animejs";

interface ChessHeroProps {
  onSelectProject?: (slug: string) => void;
}

export function ChessHero({ onSelectProject }: ChessHeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasSeenIntro = typeof window !== "undefined" && sessionStorage.getItem("hero_intro_seen") === "true";
    if (hasSeenIntro || !contentRef.current) return;

    // Headline and text reveal
    const titleLines = contentRef.current.querySelectorAll(".hero-headline-reveal");
    const badges = contentRef.current.querySelectorAll(".hero-badge-stagger");
    const buttons = contentRef.current.querySelectorAll(".hero-btn-stagger");

    animate(titleLines, {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 800,
      delay: stagger(90),
      ease: "outCubic",
    });

    animate(badges, {
      opacity: [0, 1],
      translateY: [14, 0],
      duration: 650,
      delay: stagger(70, { start: 300 }),
      ease: "outCubic",
    });

    animate(buttons, {
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 600,
      delay: stagger(80, { start: 500 }),
      ease: "outCubic",
    });
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-10 sm:pt-16 pb-16 sm:pb-20 border-b border-[var(--border-chess)] overflow-hidden">
      {/* Subtle Ambient Background Light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[var(--chess-green)]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Clear, High-Impact Bio & Thesis */}
          <div ref={contentRef} className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Top Verification Tag */}
            <div className="hero-headline-reveal inline-flex items-center gap-2.5 px-3 py-1 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-green)] font-mono text-[11px] text-[var(--chess-green)] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[var(--chess-green)] ring-2 ring-[var(--chess-green)]/20" />
              <span className="font-bold tracking-wide">AI SYSTEMS &amp; BACKEND ENGINEER</span>
            </div>

            {/* Main Punchy Headline (Kept in DOM for instant LCP) */}
            <h1 className="hero-headline-reveal text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[var(--text-white)] tracking-tight leading-[1.12]">
              I build engines that <span className="text-[var(--chess-green)] underline decoration-[var(--chess-green)]/40 underline-offset-8">evaluate</span>, <span className="text-[var(--chess-nude)]">retrieve</span>, and decide.
            </h1>

            {/* Clear Plain-English Description */}
            <p className="hero-headline-reveal text-sm sm:text-base lg:text-lg text-[var(--chess-nude-muted)] leading-relaxed max-w-2xl font-normal">
              I am <strong className="text-[var(--text-white)] font-semibold">Sahil Pal</strong> — an AI engineer. I build AST-grounded code intelligence daemons, zero-contention document RAG pipelines, offline-first Android ERPs, and developer tooling. Four shipped production systems, real benchmarks, and zero fluff.
            </p>

            {/* 3 Proof Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 font-mono text-xs">
              <div className="hero-badge-stagger p-3 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-chess)] text-[var(--text-nude)] flex items-center gap-2.5 shadow-xs hover:border-[var(--border-green)] transition-colors">
                <Award size={15} className="text-[var(--chess-green)] shrink-0" />
                <span className="leading-tight">BCA Graduate • Kristu Jayanti (7.9/10)</span>
              </div>
              <div className="hero-badge-stagger p-3 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-chess)] text-[var(--text-nude)] flex items-center gap-2.5 shadow-xs hover:border-[var(--border-green)] transition-colors">
                <GitBranch size={15} className="text-[var(--chess-brilliant)] shrink-0" />
                <span className="leading-tight">Tree-sitter AST &amp; MCP Protocol</span>
              </div>
              <div className="hero-badge-stagger p-3 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-chess)] text-[var(--text-nude)] flex items-center gap-2.5 shadow-xs hover:border-[var(--border-green)] transition-colors">
                <Database size={15} className="text-[var(--chess-green)] shrink-0" />
                <span className="leading-tight">PostgreSQL SKIP LOCKED &amp; pgvector</span>
              </div>
            </div>

            {/* Direct Action Row (Responsive on mobile) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => scrollTo("moves")}
                className="hero-btn-stagger btn-tactile px-5 py-3 rounded-sm bg-[var(--chess-green)] hover:bg-[var(--chess-green-hover)] text-black font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[var(--chess-green)]/20 cursor-pointer"
              >
                <span>EXPLORE 4 SHIPPED ENGINES</span>
                <ArrowDown size={14} />
              </button>

              <button
                onClick={() => scrollTo("evals")}
                className="hero-btn-stagger btn-tactile px-4 py-3 rounded-sm bg-[var(--bg-chess-card)] hover:bg-[var(--bg-chess-surface)] text-[var(--chess-nude)] hover:text-white font-mono font-semibold text-xs border border-[var(--border-chess)] hover:border-[var(--chess-green)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ENGINE EVALS (94.2%)</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-End Engine Motion Graphic */}
          <div className="lg:col-span-5">
            <EngineMotionGraphic onSelectNode={onSelectProject} />
          </div>
        </div>
      </div>
    </section>
  );
}
