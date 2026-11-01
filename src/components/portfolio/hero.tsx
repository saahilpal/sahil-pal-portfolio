"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/lib/portfolio-data";
import { MagneticButton } from "./magnetic-button";
import { TactileCard, TactilePill } from "./tactile-card";
import {
  Download,
  Mail,
  Github,
  Linkedin,
  Code2,
  Package,
  Cpu,
  Database,
  ArrowUpRight,
} from "lucide-react";

export function PortfolioHero() {
  const containerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    // Variable font animation responding to mouse position (Desktop cursor)
    if (!hasFinePointer || isReduced) return;

    const nameEl = nameRef.current;
    if (!nameEl) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xRatio = Math.max(0, Math.min(1, e.clientX / innerWidth));
      const yRatio = Math.max(0, Math.min(1, e.clientY / innerHeight));

      // Vary width axis between 75 and 125, weight between 600 and 850
      const wdth = Math.round(75 + xRatio * 50);
      const wght = Math.round(650 + yRatio * 200);

      nameEl.style.fontVariationSettings = `'wdth' ${wdth}, 'wght' ${wght}`;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const getSocialIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case "github":
        return <Github className="w-4 h-4 shrink-0" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4 shrink-0" />;
      case "leetcode":
        return <Code2 className="w-4 h-4 shrink-0" />;
      case "pypi":
        return <Package className="w-4 h-4 shrink-0" />;
      default:
        return <ArrowUpRight className="w-4 h-4 shrink-0" />;
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
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
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[var(--surface)] border border-[var(--line)] text-[var(--ink-secondary)] hover:border-[var(--accent-move)] hover:text-white transition-colors cursor-pointer"
              >
                <span className="text-[var(--accent-move)]">♞</span>
                <span className="font-bold text-[var(--ink-primary)]">1000 Elo</span>
                <span className="text-[10px] text-[var(--ink-muted)]">Rapid</span>
              </a>
            </TactilePill>
          </div>

          {/* Scaled Hero Display Name (fluid responsive clamp) */}
          <div className="py-1">
            <h1
              ref={nameRef}
              className="lightup-heading text-[13vw] sm:text-[11vw] lg:text-[10vw] font-[family-name:var(--font-heading)] font-black tracking-[-0.04em] leading-[0.88] text-[var(--ink-primary)] select-none uppercase will-change-[font-variation-settings]"
              style={{
                fontVariationSettings: "'wdth' 100, 'wght' 700",
                display: "inline-block",
              }}
            >
              {profile.name}
            </h1>
          </div>

          {/* 2 to 3 simple lines on who I am and what I build */}
          <div className="space-y-3 max-w-3xl text-base sm:text-xl lg:text-[1.3rem] leading-relaxed text-[var(--ink-secondary)]">
            {profile.summaryLines.map((line, idx) => (
              <p key={idx} className="lightup-text">
                {line}
              </p>
            ))}
          </div>

          {/* Social Links & Primary CTAs placed IMMEDIATELY after summary */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[var(--line)]/50 pt-5">
            {/* Social Links Pills */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {profile.links.map((link) => (
                <TactilePill key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-medium bg-[var(--surface)] border border-[var(--line)] text-[var(--ink-secondary)] hover:text-white hover:border-[var(--accent-move)] transition-all min-h-[44px]"
                  >
                    <span className="text-[var(--ink-muted)] group-hover:text-[var(--accent-move)] transition-colors">
                      {getSocialIcon(link.label)}
                    </span>
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-[var(--ink-muted)] opacity-50 group-hover:opacity-100 group-hover:text-[var(--accent-move)] transition-all" />
                  </a>
                </TactilePill>
              ))}

              <TactilePill>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-medium bg-[var(--surface)] border border-[var(--line)] text-[var(--ink-secondary)] hover:text-white hover:border-[var(--accent-move)] transition-all min-h-[44px]"
                >
                  <Mail className="w-4 h-4 text-[var(--accent-move)]" />
                  <span>{profile.email}</span>
                </a>
              </TactilePill>
            </div>

            {/* Resume Download Action */}
            <div className="shrink-0">
              <MagneticButton
                href={profile.resumePath}
                download="Sahil_Pal_Resume.pdf"
                className="spec-button"
                dataCursor="download"
              >
                <span>Download resume (PDF)</span>
                <Download className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>

          {/* Tactile Engineering Pillars (Interactive Touch Boxes with Corner Crosshairs) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <TactileCard className="p-4 bg-[var(--surface)]/70 cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[var(--accent-move)] block font-semibold">
                  01 // CORE PACKAGE
                </span>
                <Cpu className="w-3.5 h-3.5 text-[var(--accent-move)]" />
              </div>
              <p className="text-sm font-bold text-[var(--ink-primary)] pt-1">
                PyPI: synap-git
              </p>
              <p className="text-xs text-[var(--ink-muted)] pt-0.5">
                Tree-sitter AST &amp; MCP Daemon
              </p>
            </TactileCard>

            <TactileCard className="p-4 bg-[var(--surface)]/70 cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[var(--accent-move)] block font-semibold">
                  02 // GROUNDED RAG
                </span>
                <Database className="w-3.5 h-3.5 text-[var(--accent-move)]" />
              </div>
              <p className="text-sm font-bold text-[var(--ink-primary)] pt-1">
                DocAnalyzer
              </p>
              <p className="text-xs text-[var(--ink-muted)] pt-0.5">
                pgvector + Gemini 768d Cosine
              </p>
            </TactileCard>

            <TactileCard className="p-4 bg-[var(--surface)]/70 cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[var(--accent-move)] block font-semibold">
                  03 // TACTICAL MINDSET
                </span>
                <span className="text-xs text-[var(--accent-move)]">♞</span>
              </div>
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
      </div>
    </section>
  );
}
