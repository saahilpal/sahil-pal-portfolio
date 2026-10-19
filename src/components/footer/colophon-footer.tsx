"use client";

import { useState } from "react";
import { Mail, Check, Copy, ArrowUpRight, ArrowUp } from "lucide-react";

export function ColophonFooter() {
  const [copied, setCopied] = useState<boolean>(false);
  const email = "saahilpal17@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="colophon" className="py-16 bg-[var(--bg-paper-secondary)] border-t border-[var(--border-paper-strong)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Main Dispatch Action Banner */}
        <div className="paper-sheet p-8 sm:p-12 rounded-sm space-y-6 relative overflow-hidden">
          <div className="absolute top-3 right-3 font-mono text-[9px] text-[var(--text-ink-faint)]">+</div>

          <div className="space-y-2">
            <span className="stamp-seal stamp-red text-[9px] py-0.5 px-2">
              OPEN FOR DIRECT TRANSMISSION
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-ink)] tracking-tight">
              Ready to construct resilient systems?
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-ink-secondary)] max-w-2xl font-sans">
              Currently available for software engineering roles focusing on AI Context Engines, Grounded RAG Architectures, and High-Throughput Distributed Backends.
            </p>
          </div>

          {/* Email Copy Box */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--bg-card-draft)] border border-[var(--border-paper)] rounded-xs font-mono text-xs text-[var(--text-ink)]">
              <Mail size={13} className="text-[var(--stamp-red)]" />
              <span>{email}</span>
            </div>

            <button
              onClick={copyEmail}
              className="px-4 py-2.5 bg-[var(--text-ink)] text-[var(--bg-paper)] rounded-xs font-mono text-xs font-semibold flex items-center gap-1.5 hover:bg-[var(--text-ink-secondary)] active:scale-95 transition-all shadow-sm"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-[var(--stamp-green)]" />
                  <span>COPIED TO CLIPBOARD</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>ONE-CLICK COPY</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${email}?subject=Engineering%20Opportunity%20//%20Sahil%20Pal`}
              className="px-4 py-2.5 border border-[var(--border-paper-strong)] rounded-xs font-mono text-xs text-[var(--text-ink)] bg-[var(--bg-card)] hover:border-[var(--text-ink)] flex items-center gap-1.5 transition-colors"
            >
              <span>OPEN MAIL CLIENT</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* The Print Colophon */}
        <div className="pt-8 border-t border-[var(--border-paper)] grid grid-cols-1 md:grid-cols-12 gap-8 text-xs font-mono text-[var(--text-ink-muted)]">
          {/* Left Column: Colophon Specs */}
          <div className="md:col-span-8 space-y-2">
            <div className="font-bold text-[var(--text-ink)] uppercase tracking-wider text-[11px]">
              COLOPHON // PRODUCTION PRINT SPECIFICATION
            </div>
            <p className="text-[11px] leading-relaxed text-[var(--text-ink-secondary)]">
              Typeset in Playfair Display (Serif), Inter (Body), and JetBrains Mono (Technical Telemetry). Rendered digitally on tactile Somerset Ivory ground (#FAF8F5). Structured with Next.js 16 and animated with Anime.js v4. Engineered and audited against real production codebases in Bengaluru, Karnataka, India.
            </p>
            <div className="text-[10px] text-[var(--text-ink-muted)] pt-1">
              © {new Date().getFullYear()} Sahil Pal. All architectural rights reserved.
            </div>
          </div>

          {/* Right Column: Transmission Coordinates & Social Links */}
          <div className="md:col-span-4 space-y-3 md:text-right">
            <div className="flex md:justify-end items-center gap-4 text-xs font-mono text-[var(--text-ink)]">
              <a
                href="https://github.com/saahilpal"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--stamp-blue)] hover:underline underline-offset-4 flex items-center gap-1"
              >
                <span>GitHub</span>
                <ArrowUpRight size={11} />
              </a>
              <a
                href="https://www.linkedin.com/in/sahiilpal"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--stamp-blue)] hover:underline underline-offset-4 flex items-center gap-1"
              >
                <span>LinkedIn</span>
                <ArrowUpRight size={11} />
              </a>
              <a
                href="https://pypi.org/project/synap-git/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--stamp-blue)] hover:underline underline-offset-4 flex items-center gap-1"
              >
                <span>PyPI</span>
                <ArrowUpRight size={11} />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-ink-muted)] hover:text-[var(--text-ink)] transition-colors pt-2"
            >
              <span>RETURN TO MASTHEAD TOP</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
