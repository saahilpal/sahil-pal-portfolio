"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, ArrowUpRight, Compass, FileText } from "lucide-react";

export function EditorialMasthead() {
  const [timeStr, setTimeStr] = useState<string>("");
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    // Update live Bengaluru time (UTC+05:30)
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

    // Initial dark mode check
    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
    }

    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-paper)]/95 backdrop-blur-md border-b border-[var(--border-paper-strong)] transition-colors">
      {/* Top Folio Line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between text-[11px] font-mono text-[var(--text-ink-muted)] border-b border-[var(--border-paper)] gap-2">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[var(--text-ink)]">VOL. 2026 // ED. 04</span>
          <span>•</span>
          <span className="hidden sm:inline flex items-center gap-1">
            <Compass size={11} className="text-[var(--stamp-red)]" />
            12°58&apos;23&quot;N 77°35&apos;45&quot;E [BENGALURU, INDIA]
          </span>
          <span className="hidden sm:inline">•</span>
          <span>{timeStr || "12:00:00 IST"}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="stamp-seal stamp-green text-[9px] py-0.5 px-2">
            ● AVAILABLE FOR HIRE
          </span>
          <button
            onClick={toggleTheme}
            className="p-1 rounded text-[var(--text-ink-secondary)] hover:text-[var(--text-ink)] hover:bg-[var(--border-paper)] transition-colors"
            title={isDark ? "Switch to Ivory Paper" : "Switch to Blueprint Dark"}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={13} /> : <Moon size={13} />}
          </button>
        </div>
      </div>

      {/* Main Masthead Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <a
          href="#"
          className="group flex items-baseline gap-2 text-[var(--text-ink)] font-serif"
        >
          <span className="text-xl sm:text-2xl font-bold tracking-tight">
            SAHIL PAL
          </span>
          <span className="text-xs font-mono text-[var(--text-ink-muted)] font-normal tracking-wider hidden md:inline">
            / SOFTWARE ENGINEER &amp; SYSTEMS ARCHITECT
          </span>
        </a>

        {/* Clean Editorial Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-6 font-mono text-xs text-[var(--text-ink-secondary)]">
          <button
            onClick={() => scrollTo("systems")}
            className="px-2 py-1 hover:text-[var(--text-ink)] hover:underline decoration-1 underline-offset-4 transition-all"
          >
            01. SYSTEMS
          </button>
          <button
            onClick={() => scrollTo("architecture")}
            className="px-2 py-1 hover:text-[var(--text-ink)] hover:underline decoration-1 underline-offset-4 transition-all"
          >
            02. ARCHITECTURE
          </button>
          <button
            onClick={() => scrollTo("index")}
            className="px-2 py-1 hover:text-[var(--text-ink)] hover:underline decoration-1 underline-offset-4 transition-all hidden sm:inline"
          >
            03. INDEX
          </button>
          <button
            onClick={() => scrollTo("journey")}
            className="px-2 py-1 hover:text-[var(--text-ink)] hover:underline decoration-1 underline-offset-4 transition-all hidden md:inline"
          >
            04. JOURNEY
          </button>

          <button
            onClick={() => scrollTo("colophon")}
            className="ml-2 px-3 py-1.5 rounded-sm bg-[var(--text-ink)] text-[var(--bg-paper)] font-mono text-[11px] font-semibold flex items-center gap-1 hover:opacity-90 active:scale-95 transition-all"
          >
            <span>DISPATCH</span>
            <ArrowUpRight size={12} />
          </button>
        </nav>
      </div>
    </header>
  );
}
