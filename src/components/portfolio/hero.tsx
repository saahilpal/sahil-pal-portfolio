"use client";

import { profile } from "@/lib/portfolio-data";
import { MagneticButton } from "./magnetic-button";
import { TactileCard, TactilePill } from "./tactile-card";

export function PortfolioHero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative z-10 sticky top-16 min-h-[min(90vh,940px)] flex flex-col justify-between pt-8 sm:pt-12 pb-10 sm:pb-14 border-b border-[var(--line)] bg-[var(--canvas)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 w-full flex-1 flex flex-col justify-between space-y-8 sm:space-y-10">
        <div className="space-y-6 sm:space-y-8 max-w-6xl">
          {/* Top Tagline with Live Status Badge and Chess Rating */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-move)] font-bold">
              {profile.title}
            </span>
            <span className="h-[1px] w-8 bg-[var(--line-strong)]" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-950/50 border border-emerald-500/30 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>OPEN TO ENGINEERING ROLES</span>
            </span>
            <TactilePill>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[var(--surface)] border border-[var(--line)] text-[var(--ink-secondary)] hover:border-[var(--accent-move)] hover:text-white transition-colors cursor-pointer">
                <span className="text-[var(--accent-move)]">♞</span>
                <span className="font-bold text-[var(--ink-primary)]">1000 Elo</span>
                <span className="text-[10px] text-[var(--ink-muted)]">Rapid</span>
              </span>
            </TactilePill>
          </div>

          {/* Scaled Hero Display Name (clean static typography, zero layout thrashing) */}
          <div className="py-1">
            <h1 className="lightup-heading text-illuminated text-[13vw] sm:text-[11vw] lg:text-[10vw] font-[family-name:var(--font-heading)] font-black tracking-[-0.04em] leading-[0.88] text-[var(--ink-primary)] select-none uppercase">
              {profile.name}
            </h1>
          </div>

          {/* 2 to 3 simple lines on who I am and what I build */}
          <div className="space-y-3 max-w-3xl text-base sm:text-xl lg:text-[1.3rem] leading-relaxed text-[var(--ink-secondary)]">
            {profile.summaryLines.map((line, idx) => (
              <p key={idx} className="lightup-text text-illuminated">
                {line}
              </p>
            ))}
          </div>

          {/* Social Links — PLACED DIRECTLY AFTER THE SUMMARY AS REQUESTED */}
          <div className="pt-2 pb-2">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--ink-muted)] pr-1">
                CONNECT //
              </span>
              {profile.links.map((link) => (
                <TactilePill key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-mono font-medium bg-[var(--surface)] border border-[var(--line)] text-[var(--ink-primary)] hover:border-[var(--accent-move)] hover:text-white hover:bg-[var(--surface-hover)] transition-all min-h-[44px]"
                  >
                    <span>{link.label}</span>
                    <span className="text-[var(--accent-move)] text-xs" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </TactilePill>
              ))}
            </div>
          </div>

          {/* Tactile Engineering Pillars (Interactive Touch Boxes) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <TactileCard className="p-4 bg-[var(--surface)]/70 cursor-pointer">
              <span className="text-[10px] font-mono uppercase text-[var(--accent-move)] block font-semibold">
                01 // CORE PACKAGE
              </span>
              <p className="text-sm font-bold text-[var(--ink-primary)] pt-1">
                PyPI: synap-git
              </p>
              <p className="text-xs text-[var(--ink-muted)] pt-0.5">
                Tree-sitter AST &amp; MCP Daemon
              </p>
            </TactileCard>

            <TactileCard className="p-4 bg-[var(--surface)]/70 cursor-pointer">
              <span className="text-[10px] font-mono uppercase text-[var(--accent-move)] block font-semibold">
                02 // GROUNDED RAG
              </span>
              <p className="text-sm font-bold text-[var(--ink-primary)] pt-1">
                DocAnalyzer
              </p>
              <p className="text-xs text-[var(--ink-muted)] pt-0.5">
                pgvector + Gemini 768d Cosine
              </p>
            </TactileCard>

            <TactileCard className="p-4 bg-[var(--surface)]/70 cursor-pointer">
              <span className="text-[10px] font-mono uppercase text-[var(--accent-move)] block font-semibold flex items-center justify-between">
                <span>03 // TACTICAL MINDSET</span>
                <span className="text-xs">♞</span>
              </span>
              <p className="text-sm font-bold text-[var(--ink-primary)] pt-1 flex items-center gap-1.5">
                <span>1000 Elo Rapid</span>
                <span className="text-[10px] font-mono text-[var(--accent-move)] px-1 py-0.2 rounded bg-[var(--canvas)] border border-[var(--line)]">
                  ACTIVE
                </span>
              </p>
              <p className="text-xs text-[var(--ink-muted)] pt-0.5">
                Positional calculation &amp; foresight
              </p>
            </TactileCard>
          </div>
        </div>

        {/* Hero Actions: Download Resume & Direct Email */}
        <div className="pt-6 sm:pt-8 border-t border-[var(--line)]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Magnetic Resume Download Button */}
            <MagneticButton
              href={profile.resumePath}
              download="Sahil_Pal_Resume.pdf"
              className="spec-button"
              dataCursor="download"
            >
              <span>Download resume (PDF)</span>
              <span className="text-xs font-mono opacity-80" aria-hidden="true">
                ↓
              </span>
            </MagneticButton>

            {/* Quick email link with tactile feedback */}
            <TactilePill>
              <a
                href={`mailto:${profile.email}`}
                className="text-xs sm:text-sm font-mono text-[var(--ink-secondary)] hover:text-white px-3.5 py-2.5 rounded-lg border border-[var(--line)] hover:border-[var(--accent-move)] transition-colors min-h-[44px] inline-flex items-center gap-2 bg-[var(--surface)]/50"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--accent-move)]" />
                <span>{profile.email}</span>
              </a>
            </TactilePill>
          </div>

          <div className="text-xs font-mono text-[var(--ink-muted)]">
            <span>SCROLL TO EXPLORE WORK ↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
