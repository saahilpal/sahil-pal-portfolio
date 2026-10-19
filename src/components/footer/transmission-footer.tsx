"use client";

import { useState } from "react";
import { profile } from "@/lib/portfolio-data";
import { Mail, Github, Linkedin, FileText, Copy, Check, ArrowUp, Code2, Sparkles } from "lucide-react";

export function TransmissionFooter() {
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
    <footer id="contact" className="pt-24 pb-16 border-t border-white/[0.08] mt-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Main Transmission Callout Box */}
        <div className="p-8 sm:p-14 rounded-[36px] glass-card relative overflow-hidden shadow-2xl border border-white/[0.12] bg-gradient-to-br from-cyan-950/20 via-black/40 to-purple-950/20">
          <div className="max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 font-mono text-xs">
              <Sparkles size={12} />
              <span className="font-semibold tracking-wider uppercase text-[10px]">
                TRANSMISSION // DIRECT DISPATCH
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[var(--text-primary)] leading-[1.05]">
              Let&apos;s build something <span className="gradient-accent-text">high-impact.</span>
            </h2>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Open to software engineering roles, AI systems infrastructure positions, and technical collaborations with engineering teams solving difficult computing problems.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3 font-mono text-xs">
              <a
                href={`mailto:${profile.links.email}`}
                className="px-6 py-3.5 rounded-full bg-white text-slate-950 font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-slate-100 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)]"
              >
                <Mail size={15} />
                <span>Initiate Dispatch</span>
              </a>

              <button
                onClick={copyEmail}
                className="px-5 py-3.5 rounded-full glass-card hover:border-cyan-400/50 text-[var(--text-primary)] font-medium flex items-center gap-2 transition-all"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied: {profile.links.email}</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-[var(--text-dim)]" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href={profile.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[var(--text-secondary)] hover:text-white flex items-center gap-2 transition-all"
              >
                <FileText size={14} />
                <span>Technical CV</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Meta Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/[0.06] font-mono text-xs text-[var(--text-dim)]">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[var(--text-primary)] font-bold">SAHIL PAL</span>
            <span>•</span>
            <span>BENGALURU, INDIA</span>
            <span>•</span>
            <span className="text-emerald-400">ALL SYSTEMS NOMINAL</span>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center gap-5">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>
            <a
              href={profile.links.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Code2 size={14} />
              <span>LeetCode</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full border border-white/[0.08] hover:border-cyan-400 text-[var(--text-secondary)] hover:text-cyan-400 transition-colors ml-2"
              title="Back to Top"
              aria-label="Scroll back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        <div className="text-center font-mono text-[11px] text-[var(--text-dim)]">
          &copy; {new Date().getFullYear()} Sahil Pal. Built with Next.js App Router, Tailwind CSS v4, and Anime.js v4. Engineered with precision.
        </div>
      </div>
    </footer>
  );
}
