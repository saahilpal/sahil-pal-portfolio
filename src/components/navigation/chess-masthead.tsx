"use client";

import { useState, useEffect } from "react";
import { FileDown } from "lucide-react";

export function ChessMasthead() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeStr(`${now.toLocaleTimeString("en-GB", options)} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-chess-dark)]/95 backdrop-blur-md border-b border-[var(--border-chess)] transition-colors">
      {/* Top Telemetry Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between text-[11px] font-mono text-[var(--chess-nude-dark)] border-b border-[var(--border-chess)]/60 gap-2">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[var(--text-white)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--chess-green)] ring-2 ring-[var(--chess-green)]/20" />
            <span>SAHIL PAL // AI SYSTEMS &amp; RETRIEVAL</span>
          </span>
          <span>•</span>
          <span>{timeStr || "18:00:00 IST"}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold text-[var(--chess-green)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--chess-green)]" />
            <span>AVAILABLE FOR HIRE</span>
          </span>
          <a
            href="mailto:saahilpal17@gmail.com"
            className="hover:text-[var(--text-white)] transition-colors hidden md:inline"
          >
            saahilpal17@gmail.com
          </a>
        </div>
      </div>

      {/* Main Navigation Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <a
          href="#"
          className="group flex items-baseline gap-2.5 text-[var(--text-white)] btn-tactile"
        >
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight group-hover:text-[var(--chess-green)] transition-colors">
            SAHIL PAL
          </span>
          <span className="text-xs font-mono text-[var(--chess-green)] font-normal tracking-wider hidden md:inline">
            / AI ENGINEER
          </span>
        </a>

        {/* Section Links & Creative Resume CTA */}
        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="flex items-center gap-1 sm:gap-3 font-mono text-xs text-[var(--chess-nude-muted)]">
            <button
              onClick={() => scrollTo("moves")}
              className="btn-tactile animated-link-underline px-2 py-1 hover:text-[var(--text-white)] transition-colors"
            >
              01. ENGINES
            </button>
            <button
              onClick={() => scrollTo("evals")}
              className="btn-tactile animated-link-underline px-2 py-1 hover:text-[var(--text-white)] transition-colors"
            >
              02. EVALS
            </button>
            <button
              onClick={() => scrollTo("blunders")}
              className="btn-tactile animated-link-underline px-2 py-1 hover:text-[var(--text-white)] transition-colors hidden sm:inline"
            >
              03. BLUNDERS
            </button>
            <button
              onClick={() => scrollTo("opening-book")}
              className="btn-tactile animated-link-underline px-2 py-1 hover:text-[var(--text-white)] transition-colors hidden md:inline"
            >
              04. ABOUT
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="btn-tactile animated-link-underline px-2 py-1 hover:text-[var(--text-white)] transition-colors hidden sm:inline"
            >
              05. CONTACT
            </button>
          </nav>

          {/* Creative Top Resume Download CTA */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Sahil Pal Technical Resume (PDF, 75KB, ATS Verified)"
            className="group relative inline-flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1.5 sm:py-1.5 rounded-sm bg-gradient-to-r from-[var(--bg-chess-card)] via-[#262420] to-[var(--bg-chess-surface)] hover:from-[#2e2b26] hover:to-[#35322b] border border-[var(--chess-green)]/45 hover:border-[var(--chess-green)] shadow-[0_0_12px_rgba(129,182,76,0.18)] hover:shadow-[0_0_24px_rgba(129,182,76,0.45)] transition-all duration-200 cursor-pointer overflow-hidden btn-tactile focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--chess-green)]"
          >
            {/* Shimmer light sweep */}
            <span
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"
              aria-hidden="true"
            />

            {/* Tactical Green Icon Badge */}
            <span className="relative flex items-center justify-center w-5 sm:w-6 h-5 sm:h-6 rounded-xs bg-[var(--chess-green)] text-black font-bold shadow-xs group-hover:scale-105 group-hover:bg-[var(--chess-green-hover)] transition-all duration-200 shrink-0">
              <FileDown size={13} className="stroke-[2.5] transition-transform duration-200 group-hover:translate-y-0.5" />
            </span>

            {/* Label & Metadata */}
            <div className="flex flex-col text-left leading-tight">
              <div className="flex items-center gap-1 font-mono font-bold text-[11px] sm:text-xs text-[var(--text-white)] group-hover:text-[var(--chess-green)] transition-colors tracking-wide">
                <span>RESUME</span>
                <span className="text-[9px] text-[var(--chess-green)] font-semibold">.PDF</span>
              </div>
              <span className="font-mono text-[9px] text-[var(--chess-nude-dark)] tracking-tight hidden sm:inline">
                ATS Verified • 75KB
              </span>
            </div>

            {/* Live Indicator Pill */}
            <span className="hidden lg:inline-flex items-center gap-1 pl-1.5 pr-1 py-0.5 rounded-xs bg-[var(--chess-green-subtle)] border border-[var(--border-green)] text-[9px] font-mono font-bold text-[var(--chess-green)] tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--chess-green)] animate-ping" />
              <span>GET</span>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
