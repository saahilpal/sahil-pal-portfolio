"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, Copy, Check, ArrowUpRight, Github, Linkedin, FileText, Code2, MapPin, ShieldCheck } from "lucide-react";
import { animate, stagger } from "animejs";
import { isReducedMotion } from "@/lib/anime-motion";

export function CheckmateFooter() {
  const [copied, setCopied] = useState(false);
  const email = "saahilpal17@gmail.com";
  const footerRef = useRef<HTMLElement>(null);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);
  const squaresRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const el = footerRef.current;
    if (!el || isReducedMotion()) return;

    let hasAnimated = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          observer.disconnect();

          // Ripple wave across squares
          if (squaresRef.current) {
            const sqs = squaresRef.current.querySelectorAll(".checkmate-square");
            animate(sqs, {
              opacity: [0.02, 0.16, 0.04],
              scale: [0.92, 1.06, 1],
              delay: stagger(35, { grid: [4, 8], from: "center" }),
              duration: 750,
              ease: "outQuad",
            });
          }

          // Single CTA pulse when it enters
          if (ctaBtnRef.current) {
            animate(ctaBtnRef.current, {
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0 rgba(129,182,76,0)",
                "0 0 28px rgba(129,182,76,0.65)",
                "0 10px 20px rgba(129,182,76,0.2)",
              ],
              duration: 850,
              delay: 350,
              ease: "outBack",
            });
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} id="contact" className="relative bg-[var(--bg-chess-dark)] border-t border-[var(--border-chess)] pt-16 sm:pt-24 pb-16 overflow-hidden">
      {/* Decorative Chess Motif Watermark */}
      <div className="absolute right-0 bottom-0 text-[180px] font-serif font-black text-white/[0.012] select-none pointer-events-none leading-none pr-8">
        #
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16">
        {/* Checkmate Callout Card */}
        <div className="p-4 sm:p-8 lg:p-12 rounded-md bg-[var(--bg-chess-card)] border border-[var(--border-green)] relative overflow-hidden shadow-2xl max-w-full">
          {/* Subtle 8x4 Chess Square Matrix for Ripple Wave */}
          <div
            ref={squaresRef}
            className="absolute inset-0 grid grid-cols-8 grid-rows-4 pointer-events-none opacity-60 z-0"
            aria-hidden="true"
          >
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className="checkmate-square border border-white/[0.03] bg-[var(--chess-green)] opacity-0 transition-opacity"
              />
            ))}
          </div>
          <div className="max-w-3xl space-y-5 sm:space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--bg-chess-surface)] border border-[var(--border-chess)] font-mono text-[11px] text-[var(--chess-green)]">
              <span className="font-bold">MOVE 4. e8=Q#</span>
              <span>•</span>
              <span>FINAL MOVE: CHECKMATE</span>
            </div>

            <h2 className="text-2xl sm:text-5xl lg:text-6xl font-serif font-bold text-[var(--text-white)] tracking-tight leading-tight">
              Checkmate. Let&apos;s build engines together.
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-[var(--chess-nude-muted)] leading-relaxed font-normal">
              In 10 seconds you saw what I build. In 2 minutes you reviewed the Tree-sitter AST parser, the PostgreSQL worker locks, the offline parity math, and the evals. The next step is a direct conversation.
            </p>

            {/* Quick Contact Action Bar (Responsive: stacks neatly on mobile) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                ref={ctaBtnRef}
                onClick={handleCopy}
                className="btn-tactile px-5 py-3 rounded-sm bg-[var(--chess-green)] hover:bg-[var(--chess-green-hover)] text-black font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-[var(--chess-green)]/20 cursor-pointer"
              >
                {copied ? <Check size={14} className="text-black" /> : <Copy size={14} />}
                <span>{copied ? "COPIED saahilpal17@gmail.com" : "COPY EMAIL"}</span>
              </button>

              <a
                href={`mailto:${email}`}
                className="btn-tactile px-5 py-3 rounded-sm bg-[var(--bg-chess-surface)] hover:bg-[var(--bg-chess-hover)] border border-[var(--border-chess)] hover:border-[var(--border-green)] text-[var(--text-white)] font-mono text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Mail size={14} className="text-[var(--chess-green)]" />
                <span>OPEN EMAIL CLIENT</span>
                <ArrowUpRight size={12} className="text-[var(--text-muted)]" />
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-tactile px-5 py-3 rounded-sm bg-[var(--bg-chess-surface)] hover:bg-[var(--bg-chess-hover)] border border-[var(--border-chess)] hover:border-[var(--border-green)] text-[var(--text-white)] font-mono text-xs font-semibold flex items-center justify-center gap-2"
              >
                <FileText size={14} className="text-[var(--chess-brilliant)]" />
                <span>DOWNLOAD RESUME (PDF)</span>
                <ArrowUpRight size={12} className="text-[var(--text-muted)]" />
              </a>
            </div>
          </div>

          {/* Chess PGN State Record Badge */}
          <div className="mt-8 pt-6 border-t border-[var(--border-chess)] font-mono text-[11px] text-[var(--chess-nude-dark)] grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-[var(--chess-green)] font-bold mb-1">
                [PGN GAME SCORECARD // RESULT: 0-1]
              </div>
              <div>1. Bxf7+ Synapse (AST Retrieval)</div>
              <div>2. Rxf6+ DocAnalyzer (SKIP LOCKED RAG)</div>
              <div>3. Ne6 Hera Billing (Offline-First Math)</div>
              <div>4. e8=Q# LeetSync ➔ Queen Promotion (Checkmate)</div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[var(--text-nude)]">
                <ShieldCheck size={12} className="text-[var(--chess-green)]" />
                <span>Timezone: UTC+05:30 (IST)</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-nude)]">
                <ShieldCheck size={12} className="text-[var(--chess-green)]" />
                <span>Active Availability: Open to AI Engineer / Systems Roles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 font-mono text-xs">
          <a
            href="https://github.com/saahilpal"
            target="_blank"
            rel="noreferrer"
            className="card-tactile p-4 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-chess)] text-[var(--text-nude)] hover:text-white flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5">
              <Github size={16} className="text-[var(--text-muted)] group-hover:text-[var(--chess-green)]" />
              <span>GITHUB</span>
            </div>
            <ArrowUpRight size={13} className="text-[var(--text-muted)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="https://www.linkedin.com/in/sahiilpal"
            target="_blank"
            rel="noreferrer"
            className="card-tactile p-4 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-chess)] text-[var(--text-nude)] hover:text-white flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5">
              <Linkedin size={16} className="text-[var(--chess-brilliant)]" />
              <span>LINKEDIN</span>
            </div>
            <ArrowUpRight size={13} className="text-[var(--text-muted)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="https://leetcode.com/u/saahiilpal/"
            target="_blank"
            rel="noreferrer"
            className="card-tactile p-4 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-chess)] text-[var(--text-nude)] hover:text-white flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5">
              <Code2 size={16} className="text-[var(--chess-green)]" />
              <span>LEETCODE</span>
            </div>
            <ArrowUpRight size={13} className="text-[var(--text-muted)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="https://pypi.org/project/synap-git/"
            target="_blank"
            rel="noreferrer"
            className="card-tactile p-4 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-chess)] text-[var(--text-nude)] hover:text-white flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold text-[var(--chess-green)]">PYPI</span>
              <span>SYNAP-GIT</span>
            </div>
            <ArrowUpRight size={13} className="text-[var(--text-muted)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Colophon Strip */}
        <div className="pt-8 border-t border-[var(--border-chess)] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[var(--chess-nude-dark)] gap-4">
          <div>
            © {new Date().getFullYear()} Sahil Pal • AI Engineer.
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span>MATE IN 4 (NNUE CHESS MOTIF)</span>
            <span>•</span>
            <span className="text-[var(--chess-green)]">CHESS.COM GREEN &amp; NUDE</span>
            <span>•</span>
            <span>60FPS ARCHITECTURE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
