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
import { MessageSquare, ArrowUpRight } from "lucide-react";

export default function Home() {
  const [isRecruiterMode, setIsRecruiterMode] = useState<boolean>(false);
  const [activeMoveIndex, setActiveMoveIndex] = useState<number>(0);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const handleSelectProject = (slug: string) => {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="top" className="min-h-screen bg-[var(--bg-obsidian)] text-[var(--text-ivory)] antialiased transition-colors relative selection:bg-[var(--accent-copper)] selection:text-black">
      {/* Lichess Vertical Eval Bar (Left edge) */}
      <EvalBar activeMoveIndex={activeMoveIndex} />

      {/* 00. Top Masthead with Recruiter Mode & Telemetry */}
      <ChessMasthead
        isRecruiterMode={isRecruiterMode}
        setIsRecruiterMode={setIsRecruiterMode}
        onOpenGrandmaster={() => setIsChatOpen(true)}
      />

      {/* 01. Chess Hero Stage: Thesis + Interactive Mate in 4 Board */}
      <ChessHero
        isRecruiterMode={isRecruiterMode}
        activeMoveIndex={activeMoveIndex}
        setActiveMoveIndex={setActiveMoveIndex}
        onSelectProject={handleSelectProject}
      />

      {/* Main Technical Portfolio Content */}
      <main className="space-y-0">
        {/* Section 01: Moves (The 4 Shipped Production Systems) */}
        <section id="moves" className="py-20 border-b border-[var(--border-hairline)] scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border-hairline)] pb-5 gap-3">
              <div>
                <div className="font-mono text-xs text-[var(--accent-copper)] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-copper)]" />
                  <span>SECTION 01 // 4 TACTICAL MOVES</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-pure)] tracking-tight">
                  Shipped Systems &amp; Case Studies
                </h2>
              </div>
              <div className="font-mono text-xs text-[var(--text-muted)] text-right">
                4 VERIFIED ENGINES // ARCHITECTURE &amp; EVALS
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
          className="group px-4 py-3 rounded-xs bg-[var(--accent-copper)] hover:bg-[#B45309] text-black font-mono text-xs font-bold transition-all shadow-xl hover:shadow-[0_0_25px_rgba(217,119,6,0.5)] flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          title="Ask the Grandmaster (Queen) AI Assistant"
        >
          <span className="text-base leading-none">♛</span>
          <span className="tracking-wide">ASK THE GRANDMASTER</span>
          <span className="w-2 h-2 rounded-full bg-black/60 group-hover:bg-black transition-colors" />
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
