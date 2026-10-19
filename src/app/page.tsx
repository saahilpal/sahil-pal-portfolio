"use client";

import { useState } from "react";
import { projects } from "@/lib/portfolio-data";
import { FloatingDock } from "@/components/navigation/floating-dock";
import { CommandPalette } from "@/components/navigation/command-palette";
import { SpatialHero } from "@/components/hero/spatial-hero";
import { SynapseStudio } from "@/components/projects/synapse-studio";
import { DocAnalyzerStudio } from "@/components/projects/docanalyzer-studio";
import { HeraBillingStudio } from "@/components/projects/herabilling-studio";
import { MindsetBento } from "@/components/architecture/mindset-bento";
import { CapabilityDock } from "@/components/skills/capability-dock";
import { JourneyCard } from "@/components/experience/journey-card";
import { TransmissionFooter } from "@/components/footer/transmission-footer";
import { ExternalLink, Github, Code2, Sparkles } from "lucide-react";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] subtle-grid relative overflow-x-hidden">
      {/* Ambient Aurora Flares */}
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-glow-1" />
        <div className="aurora-glow-2" />
      </div>

      {/* Floating Dynamic Island Navigation */}
      <FloatingDock onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Global Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* Main Page Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-16 space-y-28 sm:space-y-36 relative z-10">
        {/* Spatial Hero Stage */}
        <SpatialHero onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

        {/* ═══════════════════════════════════════════════════════════════
            FEATURED SYSTEMS CASE STUDIES
            ═══════════════════════════════════════════════════════════════ */}
        <section id="projects" className="space-y-16 scroll-mt-24">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-wider mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>[01] // FEATURED SYSTEMS &amp; INFRASTRUCTURE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--text-primary)]">
                Selected Engineering Work
              </h2>
            </div>
            <p className="font-mono text-xs text-[var(--text-secondary)] max-w-sm">
              Deep dives into code intelligence indexing, grounded document RAG, and production Android ERP systems.
            </p>
          </div>

          {/* System 1: Synapse Code Intelligence Studio */}
          <SynapseStudio />

          {/* System 2: DocAnalyzer Grounded RAG Studio */}
          <DocAnalyzerStudio />

          {/* System 3: Hera Billing Android Wholesale ERP Studio */}
          <HeraBillingStudio />

          {/* System 4: LeetSync Developer Tooling Card */}
          <div id="project-leetsync" className="p-7 sm:p-8 rounded-3xl glass-card space-y-5 border border-white/[0.1] shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] text-slate-300 font-bold">
                    SYSTEM 04
                  </span>
                  <span>•</span>
                  <span>DEVELOPER TOOLS &amp; CHROME EXTENSION</span>
                </div>
                <h4 className="text-2xl font-bold text-[var(--text-primary)] mt-1">
                  LeetSync — DSA Problem Vault &amp; Browser Synchronizer
                </h4>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <a
                  href="https://leetsync-web.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full glass-card hover:border-cyan-400/50 text-white font-medium flex items-center gap-1.5 transition-all"
                >
                  <span>Live Companion</span>
                  <ExternalLink size={12} />
                </a>
                <a
                  href="https://github.com/saahilpal/LeetSync"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full glass-card hover:border-white/30 text-[var(--text-secondary)] hover:text-white flex items-center gap-1.5 transition-all"
                >
                  <Github size={13} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Manifest V3 Chrome extension that captures accepted LeetCode submissions via isolated Shadow DOM injection, transforms solutions into structured Markdown, and pushes commits across categorized folder trees using the GitHub Contents API.
            </p>

            <div className="flex flex-wrap gap-2 font-mono text-xs text-[var(--text-dim)]">
              {projects[3].stack.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-slate-300 text-[11px]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Systems Architecture & Mindset */}
        <MindsetBento />

        {/* Capability Dock & Skills Radar */}
        <CapabilityDock />

        {/* Engineering Journey & Education */}
        <JourneyCard />
      </main>

      {/* Monumental Transmission Footer */}
      <TransmissionFooter />
    </div>
  );
}
