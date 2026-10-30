"use client";

import { useState, useEffect } from "react";
import { profile } from "@/lib/portfolio-data";
import { MagneticButton } from "./magnetic-button";
import { RollLink } from "./roll-link";
import { TactileCard, TactilePill } from "./tactile-card";

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

  return (
    <footer
      id="contact"
      aria-label="Contact and Links"
      className="relative z-20 py-20 sm:py-32 bg-[var(--canvas)] text-[var(--ink-primary)] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 space-y-16 sm:space-y-24">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[var(--accent-move)] tracking-widest uppercase">
              {"// 05 • INITIATE CONTACT"}
            </span>
            <span className="h-[1px] w-16 bg-[var(--line-strong)]" aria-hidden="true" />
          </div>
          <h2 className="torch-heading text-[10vw] sm:text-[8vw] lg:text-[6.5vw] font-[family-name:var(--font-heading)] font-black tracking-[-0.03em] leading-[0.9] uppercase text-[var(--ink-primary)]">
            CONTACT
          </h2>
        </div>

        {/* Big Display Email Callout + Copy Action */}
        <div className="space-y-6">
          <p className="text-base sm:text-xl text-[var(--ink-secondary)] max-w-xl">
            Open to engineering roles, research collaboration, and systems architecture work.
          </p>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="torch-heading text-2xl sm:text-5xl lg:text-6xl font-[family-name:var(--font-heading)] font-extrabold tracking-tight text-[var(--ink-primary)] hover:text-[var(--accent-move)] transition-colors inline-block break-all"
              >
                {profile.email}
              </a>

              <TactilePill onClick={handleCopyEmail}>
                <button
                  type="button"
                  className="px-3.5 py-2 rounded-lg text-xs font-mono bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--accent-move)] text-[var(--ink-primary)] hover:text-white transition-all shadow-sm flex items-center gap-1.5"
                >
                  <span>{copied ? "✓ COPIED" : "COPY EMAIL"}</span>
                </button>
              </TactilePill>
            </div>

            <p className="text-xs sm:text-sm font-mono text-[var(--ink-muted)] flex items-center gap-2">
              <span className="text-[var(--accent-move)] select-none" aria-hidden="true">
                ♞
              </span>
              <span>1000 Elo Rapid &bull; Direct responses within 24 hours.</span>
            </p>
          </div>
        </div>

        {/* Engineering Status Panel: Live IST Clock + Chess Rating + System Availability */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <TactileCard className="p-6 bg-[var(--surface)] space-y-2 cursor-pointer">
            <span className="text-xs font-mono text-[var(--ink-muted)] uppercase block font-semibold">
              TIMEZONE / AVAILABILITY
            </span>
            <span className="text-[var(--ink-primary)] font-semibold text-base font-mono block">
              IST &bull; {istTime || "Loading..."}
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

          <TactileCard className="p-6 bg-[var(--surface)] space-y-2 cursor-pointer">
            <span className="text-xs font-mono text-[var(--ink-muted)] uppercase block font-semibold">
              STATUS
            </span>
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

        {/* Bottom Bar: Links repeated with text labels + working resume button */}
        <div className="pt-8 border-t border-[var(--line)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
            {profile.links.map((link) => (
              <TactilePill key={link.label}>
                <RollLink
                  href={link.url}
                  label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                />
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
              <span className="text-xs font-mono" aria-hidden="true">
                ↓
              </span>
            </MagneticButton>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[var(--ink-muted)] pt-4">
          <div>Sahil Pal &bull; Systems Specification Edition</div>
          <div>Built with Next.js, Archivo Variable, GSAP, Anime.js &amp; Lenis</div>
        </div>
      </div>
    </footer>
  );
}
