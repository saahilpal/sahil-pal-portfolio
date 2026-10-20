"use client";

import { Award, GitBranch, Database, ArrowDown, ChevronRight, Zap, Sparkles, MessageSquare } from "lucide-react";
import { EngineMotionGraphic } from "./engine-motion-graphic";

interface ChessHeroProps {
  onOpenGrandmaster: () => void;
  onSelectProject?: (slug: string) => void;
}

export function ChessHero({ onOpenGrandmaster, onSelectProject }: ChessHeroProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-8 sm:pt-14 pb-16 border-b border-[var(--border-chess)] overflow-hidden">
      {/* Subtle Ambient Background Light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[var(--chess-green)]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Clear, High-Impact Bio & Thesis */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Verification Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-chess-card)] border border-[var(--border-green)] font-mono text-xs text-[var(--chess-green)] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[var(--chess-green)] animate-ping" />
              <span className="font-bold tracking-wide">AI SYSTEMS &amp; RETRIEVAL ARCHITECT</span>
              <span className="text-[var(--text-muted)]">•</span>
              <span className="text-[var(--chess-nude)]">BENGALURU</span>
            </div>

            {/* Main Punchy Headline */}
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[var(--text-white)] tracking-tight leading-[1.08]">
              I build engines that <span className="text-[var(--chess-green)] underline decoration-[var(--chess-green)]/40 underline-offset-8">evaluate</span>, <span className="text-[var(--chess-nude)]">retrieve</span>, and decide.
            </h1>

            {/* Clear Plain-English Description */}
            <p className="text-base sm:text-lg text-[var(--chess-nude-muted)] leading-relaxed max-w-2xl font-normal">
              I am <strong className="text-[var(--text-white)] font-semibold">Sahil Pal</strong> — an AI engineer in Bengaluru. I design AST-grounded retrieval daemons for coding agents, zero-contention document RAG pipelines, offline-first Android ERPs, and developer tools. Four shipped production systems, real benchmarks, and zero fluff.
            </p>

            {/* 3 Proof Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 font-mono text-xs">
              <div className="p-2.5 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-chess)] text-[var(--text-nude)] flex items-center gap-2 shadow-xs">
                <Award size={15} className="text-[var(--chess-green)] shrink-0" />
                <span className="leading-tight">BCA Graduate • Kristu Jayanti (7.9/10)</span>
              </div>
              <div className="p-2.5 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-chess)] text-[var(--text-nude)] flex items-center gap-2 shadow-xs">
                <GitBranch size={15} className="text-[var(--chess-brilliant)] shrink-0" />
                <span className="leading-tight">Tree-sitter AST &amp; MCP Protocol</span>
              </div>
              <div className="p-2.5 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-chess)] text-[var(--text-nude)] flex items-center gap-2 shadow-xs">
                <Database size={15} className="text-[var(--chess-green)] shrink-0" />
                <span className="leading-tight">PostgreSQL SKIP LOCKED &amp; pgvector</span>
              </div>
            </div>

            {/* Direct Action Row */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => scrollTo("moves")}
                className="px-5 py-3 rounded-sm bg-[var(--chess-green)] hover:bg-[var(--chess-green-hover)] text-black font-mono font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-[var(--chess-green)]/20 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>EXPLORE 4 SHIPPED ENGINES</span>
                <ArrowDown size={14} />
              </button>

              <button
                onClick={() => scrollTo("evals")}
                className="px-4 py-3 rounded-sm bg-[var(--bg-chess-card)] hover:bg-[var(--bg-chess-surface)] text-[var(--chess-nude)] hover:text-white font-mono font-semibold text-xs border border-[var(--border-chess)] hover:border-[var(--chess-green)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>ENGINE EVALS (94.2%)</span>
              </button>

              <button
                onClick={onOpenGrandmaster}
                className="px-4 py-3 rounded-sm bg-[var(--bg-chess-card)] hover:bg-[var(--bg-chess-surface)] text-[var(--chess-green)] font-mono font-bold text-xs border border-[var(--border-green)] transition-all flex items-center gap-2 cursor-pointer"
                title="Chat with AI Grandmaster dogfooding Synapse retrieval"
              >
                <span className="text-sm">♛</span>
                <span>ASK AI ASSISTANT</span>
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
