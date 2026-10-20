"use client";

import { useState } from "react";
import { ChessMasthead } from "@/components/navigation/chess-masthead";
import { EvalBar } from "@/components/chess/eval-bar";
import { ChessHero } from "@/components/hero/chess-hero";
import { SynapseCase } from "@/components/cases/synapse-case";
import { DocAnalyzerCase } from "@/components/cases/docanalyzer-case";
import { HeraBillingCase } from "@/components/cases/herabilling-case";
import { LeetSyncCase } from "@/components/cases/leetsync-case";
import { EngineAnalysis } from "@/components/analysis/engine-analysis";
import { BlundersSection } from "@/components/blunders/blunders-section";
import { PieceValues } from "@/components/skills/piece-values";
import { OpeningBook } from "@/components/about/opening-book";
import { CheckmateFooter } from "@/components/contact/checkmate-footer";
import { GrandmasterChat } from "@/components/assistant/grandmaster-chat";

export default function Home() {
  const [activeMoveIndex, setActiveMoveIndex] = useState<number>(0);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const handleSelectProject = (slug: string) => {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="top" className="min-h-screen bg-[var(--bg-chess-dark)] text-[var(--text-nude)] antialiased transition-colors relative selection:bg-[var(--chess-green)] selection:text-black">
      {/* Chess.com Style Advantage Bar (Left edge on wide screens) */}
      <EvalBar activeMoveIndex={activeMoveIndex} />

      {/* 00. Top Masthead with Telemetry & Section Links */}
      <ChessMasthead
        onOpenGrandmaster={() => setIsChatOpen(true)}
      />

      {/* 01. Hero Landing Page: Thesis, Badges & 60FPS Engine Motion Graphic */}
      <ChessHero
        onOpenGrandmaster={() => setIsChatOpen(true)}
        onSelectProject={handleSelectProject}
      />

      {/* Main Technical Portfolio Content */}
      <main className="space-y-0">
        {/* Section 01: Moves (The 4 Shipped Production Systems) */}
        <section id="moves" className="py-16 sm:py-24 border-b border-[var(--border-chess)] scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border-chess)] pb-6 gap-3">
              <div className="space-y-1.5">
                <div className="font-mono text-xs text-[var(--chess-green)] uppercase tracking-wider flex items-center gap-2 font-bold">
                  <span className="w-2 h-2 rounded-full bg-[var(--chess-green)]" />
                  <span>SECTION 01 // 4 PRODUCTION ENGINES</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-white)] tracking-tight">
                  Shipped Systems &amp; Case Studies
                </h2>
                <p className="text-sm text-[var(--chess-nude-muted)] max-w-2xl">
                  Each system is framed around a core architectural invariant: Tree-sitter AST scopes, worker queue skip locks, offline integer parity, and closed Shadow DOM isolation.
                </p>
              </div>
              <div className="font-mono text-xs text-[var(--chess-nude-muted)] sm:text-right">
                <span className="text-[var(--chess-green)] font-bold">4 VERIFIED SYSTEMS</span>
                <div>ARCHITECTURE • TRADEOFFS • NUMBERS</div>
              </div>
            </div>

            {/* The 4 Tactical Engines */}
            <div className="space-y-16">
              {/* Move 1: Bishop -> Synapse */}
              <div id="case-synapse">
                <SynapseCase />
              </div>

              {/* Move 2: Rook -> DocAnalyzer */}
              <div id="case-docanalyzer">
                <DocAnalyzerCase />
              </div>

              {/* Move 3: Knight -> Hera Billing */}
              <div id="case-herabilling">
                <HeraBillingCase />
              </div>

              {/* Move 4: Pawn -> LeetSync (Promoting to Queen) */}
              <div id="case-leetsync">
                <LeetSyncCase />
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Engine Analysis & Transparent Evals */}
        <div id="evals">
          <EngineAnalysis />
        </div>

        {/* Section 03: Blunders I Fixed (Production War Stories) */}
        <div id="blunders">
          <BlundersSection />
        </div>

        {/* Skills: Piece Values Hierarchy */}
        <div id="skills">
          <PieceValues />
        </div>

        {/* Section 04: Opening Book (About & Philosophy) */}
        <div id="opening-book">
          <OpeningBook />
        </div>
      </main>

      {/* Section 05: Checkmate (Contact / Hire Me) */}
      <CheckmateFooter />

      {/* Floating Tactical Queen Trigger (Always 1 click away on every screen) */}
      <aside aria-label="Quick Actions" className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsChatOpen(true)}
          className="btn-tactile group px-4 py-2.5 rounded-full bg-[var(--chess-green)] hover:bg-[var(--chess-green-hover)] text-black font-mono text-xs font-bold transition-all shadow-xl hover:shadow-[0_0_25px_rgba(129,182,76,0.4)] flex items-center gap-2 cursor-pointer"
          title="System Retrieval Assistant (Synapse RRF)"
        >
          <span className="text-sm leading-none">♛</span>
          <span className="tracking-wide">SYSTEM RETRIEVAL</span>
        </button>
      </aside>

      {/* Slide-out Grounded Assistant Drawer */}
      <GrandmasterChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onJumpToSection={handleSelectProject}
      />
    </div>
  );
}
