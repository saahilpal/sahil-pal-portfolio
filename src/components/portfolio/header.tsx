"use client";

import { useEffect, useState, useRef } from "react";
import { sound } from "@/lib/audio";
import { Volume2, VolumeX, Command } from "lucide-react";
import { SahilLogo } from "./logo";

interface HeaderProps {
  onOpenPalette: () => void;
  onOpenTerminal: () => void;
  eggCount: number;
  theme: string;
  onToggleTheme: () => void;
}

export function PortfolioHeader({
  onOpenPalette,
  onOpenTerminal,
  eggCount,
  theme,
  onToggleTheme,
}: HeaderProps) {
  const [istTime, setIstTime] = useState("");
  const [sfxEnabled, setSfxEnabled] = useState(() => sound.isEnabled());
  const clickCountRef = useRef(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setIstTime(`${new Intl.DateTimeFormat("en-GB", options).format(now)} IST`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleWordmarkClick = () => {
    sound.tick();
    clickCountRef.current += 1;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      onOpenTerminal();
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 1500);
    }
  };

  const handleToggleSfx = () => {
    const next = sound.toggle();
    setSfxEnabled(next);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--canvas)]/95 backdrop-blur border-b border-[var(--border-frame)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto pl-4 pr-3 sm:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Wordmark + Secret Click Target + Easter Egg Badge */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={handleWordmarkClick}
            className="flex items-center gap-2 px-2 py-1 font-[family-name:var(--font-heading)] text-base sm:text-lg font-bold tracking-tight text-[var(--ink-primary)] hover:text-[var(--accent-lime)] transition-colors cursor-pointer select-none group"
            title="sahil (Click 5x for Terminal)"
          >
            <SahilLogo className="w-5 h-5 text-[var(--accent-lime)] group-hover:rotate-12 transition-transform duration-200" />
            <span className="font-mono lowercase text-sm sm:text-base font-bold tracking-tight">sahil</span>
          </button>

          {/* Discoverable Easter Egg Badge: ONLY visible when at least 1 egg is found */}
          {eggCount > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold bg-[var(--surface-raised)] border border-[var(--accent-lime)] text-[var(--accent-lime)] animate-pulse">
              <span>EGGS:</span>
              <span>{eggCount}/5</span>
              <span>!!</span>
            </span>
          )}
        </div>

        {/* Center: Clean Section Links (Hidden on small mobile) */}
        <nav
          aria-label="Section Navigation"
          className="hidden md:flex items-center gap-5 text-xs font-mono font-bold tracking-wider"
        >
          <a
            href="#about"
            onClick={() => sound.tick()}
            className="text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:border-b-2 hover:border-[var(--accent-lime)] transition-all py-1"
          >
            [01] ABOUT
          </a>
          <a
            href="#projects"
            onClick={() => sound.tick()}
            className="text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:border-b-2 hover:border-[var(--accent-lime)] transition-all py-1"
          >
            [02] PROJECTS
          </a>
          <a
            href="#chess"
            onClick={() => sound.tick()}
            className="text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:border-b-2 hover:border-[var(--accent-lime)] transition-all py-1"
          >
            [03] CHESS
          </a>
          <a
            href="#contact"
            onClick={() => sound.tick()}
            className="text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:border-b-2 hover:border-[var(--accent-lime)] transition-all py-1"
          >
            [04] CONTACT
          </a>
        </nav>

        {/* Right: Chronometer, Audio Toggle, Command Palette, Turnstile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Mumbai IST Chronometer */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-[var(--surface)] border border-[var(--border-grid)] text-[var(--ink-primary)] select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-lime)] animate-ping" />
            <span>{istTime || "12:00:00 IST"}</span>
          </div>

          {/* Web Audio Toggle */}
          <button
            type="button"
            onClick={handleToggleSfx}
            className="brutalist-btn px-2 py-1 text-[11px] gap-1"
            title={sfxEnabled ? "Mute SFX" : "Enable SFX"}
            aria-label="Toggle Synthesized Audio"
          >
            {sfxEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
                <span className="hidden sm:inline">SFX:ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[var(--accent-red)]" />
                <span className="hidden sm:inline">SFX:OFF</span>
              </>
            )}
          </button>

          {/* ⌘K Command Palette Button */}
          <button
            type="button"
            onClick={() => {
              sound.tick();
              onOpenPalette();
            }}
            className="brutalist-btn px-2 sm:px-2.5 py-1 text-[11px] gap-1"
            title="Open Command Palette (⌘K)"
            aria-label="Open Command Palette"
          >
            <Command className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">⌘K</span>
          </button>

          {/* Theme Polarity Toggle (VOID / BLUEPRINT) */}
          <button
            type="button"
            onClick={() => {
              sound.turnstile();
              onToggleTheme();
            }}
            className="brutalist-btn px-2.5 py-1 text-[11px] bg-[var(--surface)] text-[var(--accent-lime)] border-[var(--border-frame)]"
            title="Toggle Theme (Hotkey: T)"
            aria-label="Toggle Theme"
          >
            <span className="text-[10px] text-[var(--ink-muted)] hidden sm:inline">MODE:</span>
            <span className="font-bold">{theme === "void" ? "DARK" : "LIGHT"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
