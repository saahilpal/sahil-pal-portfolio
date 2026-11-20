"use client";

import { useState, useEffect, useCallback } from "react";
import { StockfishEvalBar } from "@/components/portfolio/eval-bar";
import { PortfolioHeader } from "@/components/portfolio/header";
import { KineticTickerTape } from "@/components/portfolio/ticker-tape";
import { RhythmOperator } from "@/components/portfolio/rhythm-bar";
import { HeroSection } from "@/components/portfolio/hero";
import { SystemsWorkbench } from "@/components/portfolio/systems-workbench";
import { ChessArena } from "@/components/portfolio/chess-arena";
import { DoctrineAndSignal } from "@/components/portfolio/doctrine-and-signal";
import { EasterEggsController } from "@/components/portfolio/easter-eggs";

export default function Home() {
  const [theme, setTheme] = useState<"void" | "blueprint">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sahil_theme");
      if (saved === "blueprint" || saved === "void") return saved;
    }
    return "void";
  });
  const [eggCount, setEggCount] = useState(0);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Synchronize document attribute with theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "void" ? "blueprint" : "void";
      localStorage.setItem("sahil_theme", next);
      return next;
    });
  }, []);

  const handleEggUnlock = useCallback((eggId: number, title: string) => {
    if (typeof window !== "undefined") {
      const trigger = (window as unknown as { unlockEgg?: (id: number, t: string) => void }).unlockEgg;
      if (trigger) {
        trigger(eggId, title);
      }
    }
  }, []);

  // Expose togglePalette for global Cmd+K
  useEffect(() => {
    (window as unknown as { togglePalette?: () => void }).togglePalette = () => {
      setIsPaletteOpen((prev) => !prev);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--canvas)] text-[var(--ink-primary)] selection:bg-[var(--accent-lime)] selection:text-[#050507]">
      {/* Stockfish Fixed Left-Edge Evaluation Bar */}
      <StockfishEvalBar />

      {/* Easter Eggs Controller: Terminal, Palette, Context Menu, Tab Title, Sounds */}
      <EasterEggsController
        onToggleTheme={handleToggleTheme}
        eggCount={eggCount}
        onEggCountChange={setEggCount}
        isPaletteOpen={isPaletteOpen}
        onClosePalette={() => setIsPaletteOpen(false)}
        isTerminalOpen={isTerminalOpen}
        onCloseTerminal={() => setIsTerminalOpen(false)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Sticky Command Bar Header */}
      <PortfolioHeader
        onOpenPalette={() => setIsPaletteOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        eggCount={eggCount}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Kinetic Acid-Lime Ticker Tape */}
      <KineticTickerTape />

      {/* Teenage Engineering Pocket Operator Rhythm & Instrument HUD */}
      <RhythmOperator />

      <main className="w-full">
        {/* ACT I — THE PLEDGE (Monumental Hero + 3D Wireframe Canvas) */}
        <HeroSection />

        {/* ACT II — THE TURN (4 Flagship Systems Workbench) */}
        <SystemsWorkbench />

        {/* ACT III — THE PRESTIGE (Playable Chess Arena) */}
        <ChessArena />

        {/* ACT IV — THE SIGNAL (Core Doctrine & Open Signal Footer) */}
        <DoctrineAndSignal onUnlockEgg={handleEggUnlock} />
      </main>
    </div>
  );
}
