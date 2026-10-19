"use client";

import { useState } from "react";
import { profile, projects } from "@/lib/portfolio-data";
import { SiteHeader } from "@/components/navigation/site-header";
import { CommandPalette } from "@/components/navigation/command-palette";
import { AstCanvas } from "@/components/hero/ast-canvas";
import { SynapseVisualizer } from "@/components/projects/synapse-visualizer";
import { DocAnalyzerPipeline } from "@/components/projects/docanalyzer-pipeline";
import { HeraBillingPreview } from "@/components/projects/herabilling-preview";
import { PillarsSection } from "@/components/architecture/pillars-section";
import { SkillsMatrix } from "@/components/skills/skills-matrix";
import { JourneyTimeline } from "@/components/experience/journey-timeline";
import { SiteFooter } from "@/components/footer/site-footer";
import {
  ExternalLink,
  Github,
  ArrowDown,
  FileText,
  Terminal,
} from "lucide-react";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] blueprint-grid selection:bg-[var(--color-accent)] selection:text-[#050608]">
      {/* Fixed Site Header */}
      <SiteHeader onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Global Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-16 space-y-28 sm:space-y-36">
        {/* ═══════════════════════════════════════════════════════════════
            HERO: THE ENGINEER'S WORKSPACE
            ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-10">
          {/* Asymmetric Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Dominant Editorial Introduction */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge & Coordinates */}
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
                <span className="px-2.5 py-1 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-accent)] font-semibold uppercase tracking-wider">
                  BCA GRADUATE • AI &amp; BACKEND SYSTEMS
                </span>
                <span className="text-[var(--color-text-dim)]">
                  BENGALURU, INDIA // 12.9716° N, 77.5946° E
                </span>
              </div>

              {/* Bold Editorial Headline */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[var(--color-text)] leading-[1.08]">
                  BUILDING SYSTEMS AT THE INTERSECTION OF{" "}
                  <span className="text-[var(--color-accent)]">AI &amp; RUNTIMES.</span>
                </h1>
                <p className="font-mono text-xs sm:text-sm text-[var(--color-text-dim)]">
                  SOFTWARE ENGINEER // RETRIEVAL-AUGMENTED GENERATION • AST INDEXING • DISTRIBUTED APIS
                </p>
              </div>

              {/* Identity & Core Value Proposition */}
              <p className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-xl">
                I am <strong className="text-[var(--color-text)]">Sahil Pal</strong>. I engineer Git-aware code intelligence systems, deterministic RAG pipelines, and high-throughput backend services that turn complex computing ideas into resilient, production software.
              </p>

              {/* System Specs Readout */}
              <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 font-mono text-xs grid grid-cols-1 sm:grid-cols-2 gap-3 shadow-sm">
                {profile.systemSpecs.map((spec) => (
                  <div key={spec.label} className="space-y-0.5">
                    <div className="text-[10px] text-[var(--color-text-dim)] uppercase tracking-wider">
                      {spec.label}
                    </div>
                    <div className="text-[var(--color-text)] font-semibold text-[11px] truncate">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Primary Call to Action Array */}
              <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
                <a
                  href="#projects"
                  className="px-5 py-3 rounded-lg bg-[var(--color-accent)] text-[#050608] font-bold uppercase tracking-wider flex items-center gap-2 hover:brightness-105 active:scale-95 transition-all shadow-sm"
                >
                  <span>EXPLORE TECHNICAL SYSTEMS</span>
                  <ArrowDown size={14} />
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-border-active)] transition-colors flex items-center gap-2"
                >
                  <FileText size={14} className="text-[var(--color-text-dim)]" />
                  <span>READ RESUME (PDF)</span>
                </a>

                <button
                  onClick={() => setCommandPaletteOpen(true)}
                  className="px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors flex items-center gap-2"
                >
                  <Terminal size={14} className="text-[var(--color-accent)]" />
                  <span>DISPATCH (⌘K)</span>
                </button>
              </div>
            </div>

            {/* Right Interactive AST & Retrieval Visualizer */}
            <div className="lg:col-span-5">
              <AstCanvas />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            PROJECTS: THE CENTERPIECE CASE STUDIES
            ═══════════════════════════════════════════════════════════════ */}
        <section id="projects" className="space-y-16 scroll-mt-24">
          {/* Section Banner */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[var(--color-border)]">
            <div>
              <div className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-wider mb-1">
                [01] // FEATURED SYSTEMS &amp; OPEN SOURCE
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--color-text)]">
                Selected Engineering Work
              </h2>
            </div>
            <p className="font-mono text-xs text-[var(--color-text-dim)] max-w-sm">
              Deep dives into code intelligence, grounded document embeddings, and offline-first mobile architecture.
            </p>
          </div>

          {/* ─────────────────────────────────────────────────────────
              PROJECT 1: SYNAPSE (Flagship AI Infrastructure)
              ───────────────────────────────────────────────────────── */}
          <article id="project-synapse" className="space-y-6 pt-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs mb-1.5">
                  <span className="px-2 py-0.5 rounded bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold uppercase tracking-wider">
                    FEATURED SYSTEM // 01
                  </span>
                  <span className="text-[var(--color-text-dim)]">•</span>
                  <span className="text-[var(--color-text-dim)] uppercase">
                    AI INFRASTRUCTURE &amp; DEVELOPER TOOLS
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)]">
                  Synapse
                </h3>
                <p className="text-sm sm:text-base text-[var(--color-text-muted)] mt-1">
                  Git-Aware Code Intelligence &amp; Structural Context Engine for AI Coding Agents
                </p>
              </div>

              {/* External Links */}
              <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
                <a
                  href="https://synapse-six-eta.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-[var(--color-accent)] text-[#050608] font-bold flex items-center gap-1.5 hover:brightness-105 transition-all shadow-sm"
                >
                  <span>LIVE DEMO &amp; DOCS</span>
                  <ExternalLink size={13} />
                </a>
                <a
                  href="https://github.com/saahilpal/synapse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors flex items-center gap-1.5"
                >
                  <Github size={14} />
                  <span>SOURCE CODE</span>
                </a>
              </div>
            </div>

            {/* Problem & Solution Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <div className="font-mono text-[10px] text-amber-500 uppercase tracking-wider font-semibold">
                  THE COMPUTATIONAL PROBLEM
                </div>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  Coding agents (Claude, Cursor, Copilot) frequently hallucinate or exhaust context windows when given naive grep or vector-only search on 50k+ symbol codebases. They miss call hierarchies, type scopes, and project-wide AST relationships.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <div className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-wider font-semibold">
                  THE ARCHITECTURAL SOLUTION
                </div>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  Engineered an O(1) memory indexing daemon that builds a localized symbol graph via parallel Tree-sitter AST parsing. Serves structured, token-budget-aware context packages over an MCP-native interface using a 3-lane hybrid retrieval engine.
                </p>
              </div>
            </div>

            {/* Interactive 3-Lane Retrieval Visualizer */}
            <SynapseVisualizer />

            {/* Tech Stack Tags & Architecture Highlights */}
            <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-3 font-mono text-xs">
              <div className="text-[10px] text-[var(--color-text-dim)] uppercase tracking-wider">
                CORE VERIFIED TECHNOLOGIES:
              </div>
              <div className="flex flex-wrap gap-2">
                {projects[0].stack.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] text-[11px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* ─────────────────────────────────────────────────────────
              PROJECT 2: DOCANALYZER (AI Document Intelligence RAG)
              ───────────────────────────────────────────────────────── */}
          <article id="project-docanalyzer" className="space-y-6 pt-12 border-t border-[var(--color-border)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs mb-1.5">
                  <span className="px-2 py-0.5 rounded bg-[var(--color-accent-secondary)]/15 text-[var(--color-accent-secondary)] font-bold uppercase tracking-wider">
                    PRODUCTION SYSTEM // 02
                  </span>
                  <span className="text-[var(--color-text-dim)]">•</span>
                  <span className="text-[var(--color-text-dim)] uppercase">
                    AI APPLICATION &amp; DISTRIBUTED RAG
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)]">
                  DocAnalyzer
                </h3>
                <p className="text-sm sm:text-base text-[var(--color-text-muted)] mt-1">
                  High-Fidelity Document Intelligence &amp; Grounded Multi-Doc RAG Platform
                </p>
              </div>

              {/* External Links */}
              <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
                <a
                  href="https://www.docanalyzer.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-[var(--color-accent)] text-[#050608] font-bold flex items-center gap-1.5 hover:brightness-105 transition-all shadow-sm"
                >
                  <span>LIVE PRODUCTION APP</span>
                  <ExternalLink size={13} />
                </a>
                <a
                  href="https://github.com/saahilpal/RAG-DOCAnalyzer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors flex items-center gap-1.5"
                >
                  <Github size={14} />
                  <span>SOURCE CODE</span>
                </a>
              </div>
            </div>

            {/* Problem & Solution Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <div className="font-mono text-[10px] text-amber-500 uppercase tracking-wider font-semibold">
                  THE COMPUTATIONAL PROBLEM
                </div>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  Enterprise document QA systems suffer from ungrounded hallucinations, slow synchronous upload pipelines that block worker threads, and poor deduplication creating redundant embedding queries.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <div className="font-mono text-[10px] text-[var(--color-accent-secondary)] uppercase tracking-wider font-semibold">
                  THE ARCHITECTURAL SOLUTION
                </div>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  Constructed a grounded RAG architecture pairing Gemini embedding vectors with PostgreSQL pgvector and full-text fallbacks. Features an asynchronous multi-worker ingestion queue and real-time SSE streaming answer synthesis.
                </p>
              </div>
            </div>

            {/* Interactive 5-Stage Pipeline Visualizer */}
            <DocAnalyzerPipeline />

            {/* Tech Stack Tags */}
            <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-3 font-mono text-xs">
              <div className="text-[10px] text-[var(--color-text-dim)] uppercase tracking-wider">
                CORE VERIFIED TECHNOLOGIES:
              </div>
              <div className="flex flex-wrap gap-2">
                {projects[1].stack.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] text-[11px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* ─────────────────────────────────────────────────────────
              PROJECT 3: HERA BILLING (Production Android POS ERP)
              ───────────────────────────────────────────────────────── */}
          <article id="project-herabilling" className="space-y-6 pt-12 border-t border-[var(--color-border)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs mb-1.5">
                  <span className="px-2 py-0.5 rounded bg-[var(--color-telemetry)]/15 text-[var(--color-telemetry)] font-bold uppercase tracking-wider">
                    PRODUCTION SYSTEM // 03
                  </span>
                  <span className="text-[var(--color-text-dim)]">•</span>
                  <span className="text-[var(--color-text-dim)] uppercase">
                    MOBILE ARCHITECTURE &amp; OFFLINE-FIRST ERP
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)]">
                  Hera Billing
                </h3>
                <p className="text-sm sm:text-base text-[var(--color-text-muted)] mt-1">
                  Offline-First Android ERP &amp; High-Speed Retail Invoicing Engine
                </p>
              </div>

              {/* External Links */}
              <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
                <a
                  href="https://github.com/saahilpal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors flex items-center gap-1.5"
                >
                  <Github size={14} />
                  <span>REPOSITORY SPEC</span>
                </a>
              </div>
            </div>

            {/* Problem & Solution Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <div className="font-mono text-[10px] text-amber-500 uppercase tracking-wider font-semibold">
                  THE PRACTICAL BUSINESS PROBLEM
                </div>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  Retail storefronts in bandwidth-constrained regions experience crippling POS downtime when cloud-only billing systems lose connectivity, risking transaction failure and lost sales records.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <div className="font-mono text-[10px] text-[var(--color-telemetry)] uppercase tracking-wider font-semibold">
                  THE ARCHITECTURAL SOLUTION
                </div>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  Engineered an offline-first Android billing platform featuring zero-delay local caching, real-time receipt generation directly to PDF, tax calculation engines (CGST/SGST), and transactional background backup workers.
                </p>
              </div>
            </div>

            {/* Interactive Android Simulator & Invoice Generator */}
            <HeraBillingPreview />

            {/* Tech Stack Tags */}
            <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-3 font-mono text-xs">
              <div className="text-[10px] text-[var(--color-text-dim)] uppercase tracking-wider">
                CORE VERIFIED TECHNOLOGIES:
              </div>
              <div className="flex flex-wrap gap-2">
                {projects[2].stack.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] text-[11px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* ─────────────────────────────────────────────────────────
              PROJECT 4: LEETSYNC (Developer Tooling & Extension)
              ───────────────────────────────────────────────────────── */}
          <article id="project-leetsync" className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-3">
              <div>
                <div className="font-mono text-[10px] text-[var(--color-text-dim)] uppercase tracking-wider">
                  DEVELOPER UTILITY // 04
                </div>
                <h4 className="text-xl font-bold text-[var(--color-text)]">
                  LeetSync — DSA Problem Vault &amp; Browser Extension
                </h4>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <a
                  href="https://leetsync-web.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors flex items-center gap-1.5"
                >
                  <span>LIVE COMPANION</span>
                  <ExternalLink size={12} />
                </a>
                <a
                  href="https://github.com/saahilpal/LeetSync"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors flex items-center gap-1.5"
                >
                  <Github size={13} />
                  <span>GITHUB</span>
                </a>
              </div>
            </div>

            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Manifest V3 Chrome extension that captures accepted LeetCode submissions via isolated Shadow DOM injection, generates structured Markdown documentation, and pushes commits to target GitHub repositories via the Contents API.
            </p>

            <div className="flex flex-wrap gap-2 font-mono text-[10px] text-[var(--color-text-dim)]">
              {projects[3].stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-[var(--color-bg)] border border-[var(--color-border)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SYSTEMS ARCHITECTURE & MINDSET ("HOW I THINK")
            ═══════════════════════════════════════════════════════════════ */}
        <PillarsSection />

        {/* ═══════════════════════════════════════════════════════════════
            CAPABILITY GRAPH & SKILLS RADAR
            ═══════════════════════════════════════════════════════════════ */}
        <SkillsMatrix />

        {/* ═══════════════════════════════════════════════════════════════
            ENGINEERING JOURNEY & EDUCATION RUN-LOGS
            ═══════════════════════════════════════════════════════════════ */}
        <JourneyTimeline />
      </main>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER & DIRECT DISPATCH TRANSMISSION
          ═══════════════════════════════════════════════════════════════ */}
      <SiteFooter />
    </div>
  );
}
