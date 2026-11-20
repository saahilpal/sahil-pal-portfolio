"use client";

import { useState } from "react";
import { DOCTRINES, PROFILE_CORE } from "@/lib/portfolio-data";
import { sound } from "@/lib/audio";
import { Copy, Check, ExternalLink, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { SahilLogo } from "./logo";

interface DoctrineAndSignalProps {
  onUnlockEgg?: (eggNum: number, title: string) => void;
}

export function DoctrineAndSignal({ onUnlockEgg }: DoctrineAndSignalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_CORE.email);
      sound.tick();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleE6Click = () => {
    sound.thock();
    if (onUnlockEgg) {
      onUnlockEgg(3, "En Passant — Forced move (!!)");
    }
  };

  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

  return (
    <footer
      id="signal"
      aria-label="Act IV — Engineering Doctrine & Open Signal"
      className="relative z-20 py-16 sm:py-24 bg-[var(--surface)] text-[var(--ink-primary)] border-t border-[var(--border-frame)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16 sm:space-y-20">
        {/* DOCTRINE SECTION */}
        <div className="space-y-8">
          <div className="space-y-2 border-b border-[var(--border-frame)] pb-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[var(--accent-lime)]">
              <span>[ACT IV {"//"} THE SIGNAL]</span>
              <span className="text-[var(--border-frame)]">•</span>
              <span>ENGINEERING DOCTRINE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-[family-name:var(--font-heading)] font-black tracking-tight uppercase">
              CORE DOCTRINE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DOCTRINES.map((doc) => (
              <div
                key={doc.num}
                className="brutalist-card p-6 bg-[var(--canvas)] space-y-3 cursor-default"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[var(--accent-lime)] font-bold">{doc.num} {"//"}</span>
                  <span className="text-[var(--ink-muted)]">INVARIANT</span>
                </div>
                <h3 className="text-lg sm:text-xl font-[family-name:var(--font-heading)] font-bold text-[var(--ink-primary)]">
                  {doc.title}
                </h3>
                <p className="font-mono text-xs text-[var(--ink-muted)] leading-relaxed">
                  {doc.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* OPEN SIGNAL CALLOUT */}
        <div className="brutalist-card p-8 sm:p-12 bg-[var(--canvas)] space-y-8">
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs font-mono font-bold tracking-wider text-[var(--accent-lime)] uppercase">
              {"//"} OPEN TRANSMISSION CHANNEL
            </span>
            <h3 className="text-3xl sm:text-5xl font-[family-name:var(--font-heading)] font-black uppercase tracking-tight text-[var(--ink-primary)]">
              TRANSMIT A SIGNAL
            </h3>
            <p className="font-mono text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
              Open to high-impact AI systems engineering roles, evaluation harness contracts, and Postgres retrieval architecture engagements.
            </p>
          </div>

          {/* Primary Action Row */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="brutalist-btn brutalist-btn-primary px-5 py-3.5 text-xs sm:text-sm gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>COPIED SAAHILPAL17@GMAIL.COM</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-black" />
                  <span>COPY SAAHILPAL17@GMAIL.COM</span>
                </>
              )}
            </button>

            <a
              href={PROFILE_CORE.chessUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.thock()}
              className="brutalist-btn px-5 py-3.5 text-xs sm:text-sm gap-2"
            >
              <span>CHALLENGE ON CHESS.COM</span>
              <ExternalLink className="w-4 h-4 text-[var(--accent-lime)]" />
            </a>
          </div>

          {/* Social Links Matrix */}
          <div className="pt-6 border-t border-[var(--border-grid)] flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs">
            <a
              href={PROFILE_CORE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.tick()}
              className="brutalist-btn px-3 py-2 gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GITHUB</span>
              <ArrowUpRight className="w-3 h-3 text-[var(--accent-lime)]" />
            </a>

            <a
              href={PROFILE_CORE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.tick()}
              className="brutalist-btn px-3 py-2 gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LINKEDIN</span>
              <ArrowUpRight className="w-3 h-3 text-[var(--accent-lime)]" />
            </a>

            <a
              href={PROFILE_CORE.huggingfaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.tick()}
              className="brutalist-btn px-3 py-2 gap-1.5"
            >
              <span>🤗 HUGGING FACE</span>
              <ArrowUpRight className="w-3 h-3 text-[var(--accent-lime)]" />
            </a>

            <a
              href={PROFILE_CORE.chessUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.tick()}
              className="brutalist-btn px-3 py-2 gap-1.5"
            >
              <span>♔ CHESS.COM (SAHILL17)</span>
              <ArrowUpRight className="w-3 h-3 text-[var(--accent-lime)]" />
            </a>
          </div>
        </div>

        {/* ALGEBRAIC FILE COORDINATES DIVIDER (With hidden clickable 'e6' Easter Egg 3!) */}
        <div className="pt-4 border-t border-[var(--border-frame)] flex items-center justify-between text-xs font-mono text-[var(--ink-muted)] select-none">
          <div className="flex items-center gap-4">
            {files.map((file) => (
              <span key={file} className="hover:text-[var(--ink-primary)] transition-colors">
                {file === "e" ? (
                  <button
                    type="button"
                    onClick={handleE6Click}
                    className="cursor-pointer text-[var(--ink-muted)] hover:text-[var(--accent-lime)] font-bold transition-colors"
                    title="e6 — Click for tactical secret"
                  >
                    e6
                  </button>
                ) : (
                  <span>{file}</span>
                )}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <SahilLogo className="w-4 h-4 text-[var(--accent-lime)]" />
            <span className="font-mono lowercase font-bold text-[var(--ink-primary)]">sahil</span>
            <span className="text-[var(--border-frame)]">•</span>
            <span>GRANDMASTER SYSTEMS LAB {"//"} 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
