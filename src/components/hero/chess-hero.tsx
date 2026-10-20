"use client";

import { Award, GitBranch, ShieldCheck, Database, ArrowDown, ChevronRight, Zap } from "lucide-react";
import { InteractiveBoard } from "@/components/chess/interactive-board";

interface ChessHeroProps {
  isRecruiterMode: boolean;
  activeMoveIndex: number;
  setActiveMoveIndex: (idx: number) => void;
  onSelectProject?: (slug: string) => void;
}

export function ChessHero({
  isRecruiterMode,
  activeMoveIndex,
  setActiveMoveIndex,
  onSelectProject,
}: ChessHeroProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-10 pb-16 border-b border-[var(--border-hairline)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Thesis & Headline Block */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xs bg-[var(--bg-obsidian-subtle)] border border-[var(--border-copper)] font-mono text-[11px] text-[var(--accent-copper)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-copper)] animate-ping" />
            <span>AI ENGINEER PORTFOLIO // 4 SHIPPED ENGINES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[var(--text-pure)] tracking-tight leading-[1.06]">
            I build engines that evaluate, retrieve, and decide.
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text-muted)] leading-relaxed font-normal">
            I am <strong className="text-[var(--text-pure)] font-semibold">Sahil Pal</strong> — an AI engineer in Bengaluru building AST context daemons for AI coding agents, grounded multi-document RAG pipelines, offline-first native Android ERPs, and developer tooling.
          </p>

          {/* Proof Badges */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-xs bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] text-[var(--text-ivory)] flex items-center gap-1.5 shadow-xs">
              <Award size={13} className="text-[var(--accent-copper)]" />
              <span>BCA Graduate • Kristu Jayanti (CGPA 7.9/10)</span>
            </span>
            <span className="px-3 py-1.5 rounded-xs bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] text-[var(--text-ivory)] flex items-center gap-1.5 shadow-xs">
              <GitBranch size={13} className="text-[var(--accent-cyan)]" />
              <span>Tree-sitter AST &amp; Model Context Protocol</span>
            </span>
            <span className="px-3 py-1.5 rounded-xs bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] text-[var(--text-ivory)] flex items-center gap-1.5 shadow-xs">
              <Database size={13} className="text-[var(--accent-emerald)]" />
              <span>PostgreSQL FOR UPDATE SKIP LOCKED &amp; pgvector</span>
            </span>
          </div>
        </div>

        {/* The Tactical Mate in 4 Board Stage */}
        {!isRecruiterMode ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-2 font-mono text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <span>TACTICAL NAVIGATION STAGE</span>
                <span>•</span>
                <span className="text-[var(--accent-copper)]">EACH MOVE UNLOCKS ONE CASE STUDY</span>
              </div>
              <button
                onClick={() => scrollTo("moves")}
                className="hover:text-[var(--text-pure)] flex items-center gap-1 transition-colors"
              >
                <span>SKIP TO CASE STUDIES</span>
                <ArrowDown size={11} />
              </button>
            </div>

            <InteractiveBoard
              activeMoveIndex={activeMoveIndex}
              setActiveMoveIndex={setActiveMoveIndex}
              onSelectProject={onSelectProject}
            />
          </div>
        ) : (
          /* Recruiter Mode Banner */
          <div className="p-4 rounded-xs bg-[var(--bg-obsidian-card)] border border-[var(--accent-copper)] flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 text-[var(--text-ivory)]">
              <Zap size={14} className="text-[var(--accent-copper)]" />
              <span className="font-bold">RECRUITER MODE ACTIVE:</span>
              <span className="text-[var(--text-muted)]">Chess board bypassed. Displaying full linear technical specifications below.</span>
            </div>
            <button
              onClick={() => scrollTo("moves")}
              className="px-3 py-1 bg-[var(--accent-copper)] text-black font-bold rounded-xs flex items-center gap-1 hover:opacity-90"
            >
              <span>INSPECT ARCHITECTURE</span>
              <ArrowDown size={12} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
