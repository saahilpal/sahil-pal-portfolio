"use client";

import { useState, useEffect } from "react";
import { profile } from "@/lib/portfolio-data";
import { MagneticButton } from "./magnetic-button";
import { TactileCard, TactilePill } from "./tactile-card";
import { ScrubStatement } from "./scrub-statement";
import {
  Copy,
  Check,
  Download,
  Clock,
  Activity,
  Github,
  Linkedin,
  Code2,
  Package,
  ArrowUpRight,
} from "lucide-react";

export function ContactSection() {
  const [istTime, setIstTime] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Indian Standard Time (UTC+5:30)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setIstTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

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
    <footer
      id="contact"
      aria-label="Contact and Links"
      className="relative z-20 py-20 sm:py-32 bg-[var(--canvas)] text-[var(--ink-primary)] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 space-y-12 sm:space-y-16">
        {/* Header (No Kicker Eyebrow) */}
        <div className="space-y-4">
          <h2 className="lightup-heading text-[10vw] sm:text-[8vw] lg:text-[6.5vw] font-[family-name:var(--font-heading)] font-black tracking-[-0.03em] leading-[0.9] uppercase text-[var(--ink-primary)]">
            CONTACT
          </h2>
        </div>

        {/* Scroll-scrub Statement: Lights up word by word as you scroll */}
        <div className="max-w-4xl py-6 border-y border-[var(--line)]">
          <ScrubStatement text="Open to forward-looking AI engineering roles, technical research partnerships, and distributed context architecture engagements." />
        </div>

        {/* Big Display Email Callout + Copy Action */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="lightup-heading text-2xl sm:text-5xl lg:text-6xl font-[family-name:var(--font-heading)] font-extrabold tracking-tight text-[var(--ink-primary)] hover:text-[var(--accent-move)] transition-colors inline-block break-all"
              >
                {profile.email}
              </a>

              <TactilePill onClick={handleCopyEmail}>
                <button
                  type="button"
                  className="px-3.5 py-2.5 rounded-lg text-xs font-mono bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--accent-move)] text-[var(--ink-primary)] hover:text-white transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY EMAIL</span>
                    </>
                  )}
                </button>
              </TactilePill>
            </div>

            <p className="text-xs sm:text-sm font-mono text-[var(--ink-muted)] flex items-center gap-2">
              <span className="text-[var(--accent-move)] select-none" aria-hidden="true">
                ♞
              </span>
              <span>1000 Elo Rapid • Direct responses within 24 hours.</span>
            </p>
          </div>
        </div>

        {/* Engineering Status Panel: Live IST Clock + Chess Rating + System Availability */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <TactileCard className="p-6 bg-[var(--surface)] space-y-2 cursor-pointer border-[var(--line)] hover:border-[var(--line-strong)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--ink-muted)] uppercase block font-semibold">
                TIMEZONE / AVAILABILITY
              </span>
              <Clock className="w-3.5 h-3.5 text-[var(--accent-move)]" />
            </div>
            <span className="text-[var(--ink-primary)] font-semibold text-base font-mono block">
              IST • {istTime || "Loading..."}
            </span>
            <span className="text-xs text-[var(--ink-muted)] block">
              UTC +05:30 (Bengaluru)
            </span>
          </TactileCard>

          <TactileCard className="p-6 bg-[var(--surface)] space-y-2 cursor-pointer border-[var(--line)] hover:border-[var(--accent-move)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--ink-muted)] uppercase font-semibold">
                CHESS RATING
              </span>
              <span className="text-xs text-[var(--accent-move)] font-mono">RAPID</span>
            </div>
            <span className="text-[var(--accent-move)] font-bold text-xl sm:text-2xl font-mono flex items-center gap-2">
              <span>♞</span>
              <span>1000 Elo</span>
            </span>
            <span className="text-xs text-[var(--ink-muted)] block">
              Tactical foresight &amp; positional calculation
            </span>
          </TactileCard>

          <TactileCard className="p-6 bg-[var(--surface)] space-y-2 cursor-pointer border-[var(--line)] hover:border-[var(--line-strong)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--ink-muted)] uppercase block font-semibold">
                SYSTEM STATUS
              </span>
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="text-emerald-400 font-semibold text-base font-mono flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>Available for 2026 roles</span>
            </span>
            <span className="text-xs text-[var(--ink-muted)] block">
              AI / Gen AI Engineering
            </span>
          </TactileCard>
        </div>

        {/* Bottom Bar: Links repeated with icons + working resume button */}
        <div className="pt-8 border-t border-[var(--line)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
            {profile.links.map((link) => (
              <TactilePill key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono bg-[var(--surface)] border border-[var(--line)] text-[var(--ink-secondary)] hover:text-white hover:border-[var(--accent-move)] transition-all min-h-[44px]"
                >
                  <span className="text-[var(--ink-muted)] group-hover:text-[var(--accent-move)] transition-colors">
                    {getSocialIcon(link.label)}
                  </span>
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3 h-3 text-[var(--ink-muted)] opacity-50 group-hover:opacity-100 group-hover:text-[var(--accent-move)] transition-all" />
                </a>
              </TactilePill>
            ))}
          </div>

          <div className="flex items-center gap-4">
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

        {/* Bottom Colophon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[var(--ink-muted)] pt-4">
          <div>Sahil Pal • AI Systems Specification</div>
          <div>Built with Next.js, Archivo Variable, GSAP, Anime.js &amp; Lenis</div>
        </div>
      </div>
    </footer>
  );
}
