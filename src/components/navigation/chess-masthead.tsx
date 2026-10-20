"use client";

import { useState, useEffect } from "react";
import { MessageSquare, ArrowUpRight, Zap, Eye, SlidersHorizontal, BookOpen, ShieldCheck } from "lucide-react";

interface ChessMastheadProps {
  isRecruiterMode: boolean;
  setIsRecruiterMode: (val: boolean) => void;
  onOpenGrandmaster: () => void;
}

export function ChessMasthead({
  isRecruiterMode,
  setIsRecruiterMode,
  onOpenGrandmaster,
}: ChessMastheadProps) {
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
    <header className="sticky top-0 z-50 bg-[var(--bg-obsidian)]/90 backdrop-blur-md border-b border-[var(--border-hairline)] transition-colors">
      {/* Top Telemetry Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between text-[11px] font-mono text-[var(--text-muted)] border-b border-[var(--border-hairline)] gap-2">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[var(--text-pure)] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-copper)]" />
            <span>MATE IN 4 // AI ENGINE ARCHITECTURE</span>
          </span>
          <span>•</span>
          <span className="hidden sm:inline">BENGALURU, INDIA</span>
          <span className="hidden sm:inline">•</span>
          <span>{timeStr || "18:00:00 IST"}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Recruiter Mode Toggle */}
          <button
            onClick={() => setIsRecruiterMode(!isRecruiterMode)}
            className={`px-2.5 py-1 rounded-xs font-mono text-[10px] font-bold flex items-center gap-1.5 transition-all border ${
              isRecruiterMode
                ? "bg-[var(--accent-copper)] text-black border-[var(--accent-copper)] shadow-xs"
                : "bg-[var(--bg-obsidian-subtle)] text-[var(--text-ivory)] border-[var(--border-hairline)] hover:border-[var(--text-muted)]"
            }`}
            title="Toggle plain linear recruiter view without chess board"
          >
            <SlidersHorizontal size={11} />
            <span>{isRecruiterMode ? "RECRUITER MODE: ON" : "RECRUITER MODE"}</span>
          </button>

          <span className="text-[10px] font-semibold text-[var(--accent-emerald)] hidden md:inline">
            ● AVAILABLE FOR HIRE
          </span>
        </div>
      </div>

      {/* Main Navigation Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <a
          href="#"
          className="group flex items-baseline gap-2.5 text-[var(--text-pure)] font-serif"
        >
          <span className="text-xl sm:text-2xl font-bold tracking-tight">
            SAHIL PAL
          </span>
          <span className="text-xs font-mono text-[var(--accent-copper)] font-normal tracking-wider hidden md:inline">
            / AI ENGINEER (RETRIEVAL &amp; LLM PIPELINES)
          </span>
        </a>

        {/* Section Links */}
        <nav className="flex items-center gap-1 sm:gap-5 font-mono text-xs text-[var(--text-muted)]">
          <button
            onClick={() => scrollTo("moves")}
            className="px-2 py-1 hover:text-[var(--text-pure)] transition-colors"
          >
            01. MOVES
          </button>
          <button
            onClick={() => scrollTo("evals")}
            className="px-2 py-1 hover:text-[var(--text-pure)] transition-colors"
          >
            02. EVALS
          </button>
          <button
            onClick={() => scrollTo("blunders")}
            className="px-2 py-1 hover:text-[var(--text-pure)] transition-colors hidden sm:inline"
          >
            03. BLUNDERS
          </button>
          <button
            onClick={() => scrollTo("opening-book")}
            className="px-2 py-1 hover:text-[var(--text-pure)] transition-colors hidden md:inline"
          >
            04. OPENING BOOK
          </button>

          {/* Ask the Grandmaster Button */}
          <button
            onClick={onOpenGrandmaster}
            className="px-2.5 py-1.5 rounded-xs bg-[var(--bg-obsidian-subtle)] border border-[var(--border-copper)] text-[var(--accent-copper)] hover:bg-[var(--accent-copper)] hover:text-black font-bold flex items-center gap-1.5 transition-all active:scale-95 text-[11px]"
          >
            <MessageSquare size={12} />
            <span className="hidden sm:inline">ASK GRANDMASTER</span>
          </button>

          <button
            onClick={() => scrollTo("checkmate")}
            className="px-3 py-1.5 rounded-xs bg-[var(--text-pure)] text-black font-bold flex items-center gap-1 hover:opacity-90 active:scale-95 transition-all text-[11px]"
          >
            <span>CHECKMATE</span>
            <ArrowUpRight size={12} />
          </button>
        </nav>
      </div>
    </header>
  );
}
