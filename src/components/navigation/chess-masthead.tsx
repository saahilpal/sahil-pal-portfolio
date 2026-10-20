"use client";

import { useState, useEffect } from "react";

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
          <span className="hidden sm:inline">BENGALURU, INDIA</span>
          <span className="hidden sm:inline">•</span>
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

        {/* Section Links */}
        <nav className="flex items-center gap-1 sm:gap-4 font-mono text-xs text-[var(--chess-nude-muted)]">
          <button
            onClick={() => scrollTo("moves")}
            className="btn-tactile px-2 py-1 hover:text-[var(--text-white)] transition-colors"
          >
            01. ENGINES
          </button>
          <button
            onClick={() => scrollTo("evals")}
            className="btn-tactile px-2 py-1 hover:text-[var(--text-white)] transition-colors"
          >
            02. EVALS
          </button>
          <button
            onClick={() => scrollTo("blunders")}
            className="btn-tactile px-2 py-1 hover:text-[var(--text-white)] transition-colors hidden sm:inline"
          >
            03. BLUNDERS
          </button>
          <button
            onClick={() => scrollTo("opening-book")}
            className="btn-tactile px-2 py-1 hover:text-[var(--text-white)] transition-colors hidden md:inline"
          >
            04. ABOUT
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="btn-tactile px-2 py-1 hover:text-[var(--text-white)] transition-colors hidden sm:inline"
          >
            05. CONTACT
          </button>
        </nav>
      </div>
    </header>
  );
}
