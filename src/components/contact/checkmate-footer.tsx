"use client";

import { useState } from "react";
import { Mail, Copy, Check, ArrowUpRight, Github, Linkedin, FileText, Code2, MapPin, Clock, ShieldCheck, Heart } from "lucide-react";

export function CheckmateFooter() {
  const [copied, setCopied] = useState(false);
  const email = "saahilpal17@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="relative bg-[var(--bg-obsidian)] border-t border-[var(--border-hairline)] pt-20 pb-16 overflow-hidden">
      {/* Decorative Chess Hairline Watermark */}
      <div className="absolute right-0 bottom-0 text-[180px] font-serif font-black text-white/[0.015] select-none pointer-events-none leading-none pr-8">
        #
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Checkmate Callout Card */}
        <div className="p-8 sm:p-12 rounded-xs bg-[var(--bg-obsidian-card)] border border-[var(--border-copper)] relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[var(--bg-obsidian-subtle)] border border-[var(--border-hairline)] font-mono text-[11px] text-[var(--accent-copper)]">
              <span className="font-bold">MOVE 4. e8=Q#</span>
              <span>•</span>
              <span>FINAL MOVE: CHECKMATE</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-serif font-bold text-[var(--text-pure)] tracking-tight leading-tight">
              Checkmate. Let&apos;s build engines together.
            </h2>

            <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
              In 10 seconds you saw what I build. In 2 minutes you reviewed the Tree-sitter AST parser, the PostgreSQL worker locks, the offline parity math, and the evals. The next step is getting in touch.
            </p>

            {/* Quick Contact Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleCopy}
                className="px-4 py-2.5 rounded-xs bg-[var(--accent-copper)] text-black hover:opacity-90 font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              >
                {copied ? <Check size={14} className="text-black" /> : <Copy size={14} />}
                <span>{copied ? "COPIED saahilpal17@gmail.com" : "COPY EMAIL"}</span>
              </button>

              <a
                href={`mailto:${email}`}
                className="px-4 py-2.5 rounded-xs bg-[var(--bg-obsidian-subtle)] border border-[var(--border-hairline)] hover:border-[var(--accent-copper)] text-[var(--text-pure)] font-mono text-xs font-semibold transition-all flex items-center gap-2"
              >
                <Mail size={14} className="text-[var(--accent-copper)]" />
                <span>OPEN EMAIL CLIENT</span>
                <ArrowUpRight size={12} className="text-[var(--text-muted)]" />
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xs bg-[var(--bg-obsidian-subtle)] border border-[var(--border-hairline)] hover:border-[var(--accent-copper)] text-[var(--text-pure)] font-mono text-xs font-semibold transition-all flex items-center gap-2"
              >
                <FileText size={14} className="text-[var(--accent-cyan)]" />
                <span>DOWNLOAD RESUME (PDF)</span>
                <ArrowUpRight size={12} className="text-[var(--text-muted)]" />
              </a>
            </div>
          </div>

          {/* Chess PGN State Record Badge */}
          <div className="mt-8 pt-8 border-t border-[var(--border-hairline)] font-mono text-[11px] text-[var(--text-muted)] grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-[var(--accent-copper)] font-bold mb-1">
                [PGN GAME SCORECARD // RECORDED RESULT: 0-1]
              </div>
              <div>1. Bxf7+ Synapse (AST Retrieval)</div>
              <div>2. Rxf6+ DocAnalyzer (SKIP LOCKED RAG)</div>
              <div>3. Ne6 Hera Billing (Offline-First Math)</div>
              <div>4. e8=Q# LeetSync ➔ Grandmaster Promotion (Checkmate)</div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[var(--text-ivory)]">
                <MapPin size={12} className="text-[var(--accent-copper)]" />
                <span>Bengaluru, Karnataka, India (UTC+05:30 IST)</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-ivory)]">
                <ShieldCheck size={12} className="text-[var(--accent-emerald)]" />
                <span>Active Availability: Open to AI Engineer / Systems Roles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <a
            href="https://github.com/saahilpal"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xs bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] hover:border-[var(--accent-copper)] text-[var(--text-ivory)] hover:text-[var(--text-pure)] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5">
              <Github size={16} className="text-[var(--text-muted)] group-hover:text-[var(--accent-copper)]" />
              <span>GITHUB</span>
            </div>
            <ArrowUpRight size={13} className="text-[var(--text-muted)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="https://www.linkedin.com/in/sahiilpal"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xs bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] hover:border-[var(--accent-copper)] text-[var(--text-ivory)] hover:text-[var(--text-pure)] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5">
              <Linkedin size={16} className="text-[var(--accent-cyan)]" />
              <span>LINKEDIN</span>
            </div>
            <ArrowUpRight size={13} className="text-[var(--text-muted)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="https://leetcode.com/u/saahiilpal/"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xs bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] hover:border-[var(--accent-copper)] text-[var(--text-ivory)] hover:text-[var(--text-pure)] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5">
              <Code2 size={16} className="text-[var(--accent-copper)]" />
              <span>LEETCODE</span>
            </div>
            <ArrowUpRight size={13} className="text-[var(--text-muted)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="https://pypi.org/project/synap-git/"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xs bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] hover:border-[var(--accent-copper)] text-[var(--text-ivory)] hover:text-[var(--text-pure)] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold text-[var(--accent-emerald)]">PYPI</span>
              <span>SYNAP-GIT</span>
            </div>
            <ArrowUpRight size={13} className="text-[var(--text-muted)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Colophon & Performance Guarantee */}
        <div className="pt-8 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[var(--text-muted)] gap-4">
          <div>
            © {new Date().getFullYear()} Sahil Pal • AI Engineer • Bengaluru, India.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>DESIGN: MATE IN 4 (NNUE CHESS MOTIF)</span>
            <span>•</span>
            <span>OBSIDIAN &amp; COPPER SQUARES</span>
            <span>•</span>
            <span className="text-[var(--accent-emerald)]">60FPS ZERO-SLOP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
