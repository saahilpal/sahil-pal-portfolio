"use client";

import { EditorialMasthead } from "@/components/navigation/editorial-masthead";
import { EditorialHero } from "@/components/hero/editorial-hero";
import { SynapsePaper } from "@/components/projects/synapse-paper";
import { DocAnalyzerPaper } from "@/components/projects/docanalyzer-paper";
import { HeraBillingPaper } from "@/components/projects/herabilling-paper";
import { PaperBento } from "@/components/architecture/paper-bento";
import { TechnicalIndex } from "@/components/skills/technical-index";
import { EditorialJourney } from "@/components/experience/editorial-journey";
import { ColophonFooter } from "@/components/footer/colophon-footer";
import { DraftingCursor } from "@/components/effects/drafting-cursor";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-paper)] text-[var(--text-ink)] antialiased transition-colors">
      {/* Interactive Drafting Reticle & Ink Ripples */}
      <DraftingCursor />

      {/* 00. Masthead Header */}
      <EditorialMasthead />

      {/* 01. Architectural Hero */}
      <EditorialHero />

      {/* Main Content Area */}
      <main className="space-y-0">
        {/* Section 01: Featured Production Systems */}
        <section id="systems" className="py-16 border-b border-[var(--border-paper-strong)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border-paper)] pb-4 gap-2">
              <div>
                <div className="font-mono text-xs text-[var(--text-ink-muted)] uppercase tracking-wider">
                  SECTION 01 // PRODUCTION SYSTEMS
                </div>
                <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-ink)] tracking-tight">
                  Selected Engineering Case Studies
                </h2>
              </div>
              <div className="font-mono text-xs text-[var(--text-ink-muted)]">
                VERIFIED ARCHITECTURE &amp; ARITHMETIC BOUNDARIES
              </div>
            </div>

            {/* The 3 Systems */}
            <div className="space-y-12">
              {/* System 01: Synapse */}
              <SynapsePaper />

              {/* System 02: DocAnalyzer */}
              <DocAnalyzerPaper />

              {/* System 03: Hera Billing */}
              <HeraBillingPaper />
            </div>
          </div>
        </section>

        {/* Section 02: Systems Mindset Bento */}
        <PaperBento />

        {/* Section 03: Catalog Raisonné / Technical Index */}
        <TechnicalIndex />

        {/* Section 04: Work & Academic Journey */}
        <EditorialJourney />
      </main>

      {/* 05. Print Colophon Footer */}
      <ColophonFooter />
    </div>
  );
}
