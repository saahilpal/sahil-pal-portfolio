"use client";

import { useState } from "react";
import { profile } from "@/lib/portfolio-data";
import { Mail, Github, Linkedin, FileText, Copy, Check, ArrowUp, Code2 } from "lucide-react";

export function SiteFooter() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.links.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="pt-20 pb-12 border-t border-[var(--color-border)] mt-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Main Contact Callout */}
        <div className="p-8 sm:p-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] relative overflow-hidden shadow-sm">
          <div className="max-w-2xl space-y-4">
            <div className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <span>[05] // TRANSMISSION &amp; DISPATCH</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--color-text)]">
              Let&apos;s build software that matters.
            </h2>

            <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              I am open to full-time software engineering roles, AI systems infrastructure positions, and technical collaborations with high-conviction founders and engineering teams.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href={`mailto:${profile.links.email}`}
                className="px-5 py-3 rounded-lg bg-[var(--color-accent)] text-[#050608] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:brightness-105 active:scale-95 transition-all shadow-sm"
              >
                <Mail size={15} />
                <span>INITIATE EMAIL DISPATCH</span>
              </a>

              <button
                onClick={copyEmail}
                className="px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text)] font-mono text-xs hover:border-[var(--color-accent)] transition-all flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-[var(--color-accent)]" />
                    <span className="text-[var(--color-accent)]">COPIED: {profile.links.email}</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>

              <a
                href={profile.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text)] font-mono text-xs hover:border-[var(--color-border-active)] transition-colors flex items-center gap-2"
              >
                <FileText size={14} />
                <span>TECHNICAL RESUME (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Meta & Telemetry */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-[var(--color-border)] font-mono text-xs text-[var(--color-text-dim)]">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[var(--color-text)] font-bold">SAHIL PAL</span>
            <span>•</span>
            <span>BENGALURU, INDIA</span>
            <span>•</span>
            <span className="text-[var(--color-accent)]">ALL SYSTEMS NOMINAL</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1.5"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1.5"
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>
            <a
              href={profile.links.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1.5"
            >
              <Code2 size={14} />
              <span>LeetCode</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors ml-2"
              title="Scroll to Top"
              aria-label="Scroll to top of page"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        <div className="text-center font-mono text-[10px] text-[var(--color-text-dim)]">
          &copy; {new Date().getFullYear()} Sahil Pal. Built with Next.js App Router, Tailwind CSS v4 &amp; Anime.js v4. Engineered with precision.
        </div>
      </div>
    </footer>
  );
}
