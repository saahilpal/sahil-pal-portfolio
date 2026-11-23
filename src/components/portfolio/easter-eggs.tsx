"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { sound } from "@/lib/audio";
import { PROFILE_CORE } from "@/lib/portfolio-data";
import {
  Terminal as TerminalIcon,
  Search,
  X,
  Sparkles,
  SunMoon,
  ExternalLink,
  Copy,
} from "lucide-react";

interface EasterEggsProps {
  onToggleTheme: () => void;
  eggCount: number;
  onEggCountChange: (count: number) => void;
  isPaletteOpen: boolean;
  onClosePalette: () => void;
  isTerminalOpen: boolean;
  onCloseTerminal: () => void;
  onOpenTerminal: () => void;
}

export function EasterEggsController({
  onToggleTheme,
  eggCount,
  onEggCountChange,
  isPaletteOpen,
  onClosePalette,
  isTerminalOpen,
  onCloseTerminal,
  onOpenTerminal,
}: EasterEggsProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastTimer, setToastTimer] = useState<NodeJS.Timeout | null>(null);

  // Context Menu state
  const [contextMenuPos, setContextMenuPos] = useState<{ x: number; y: number } | null>(null);

  // Command palette search
  const [paletteQuery, setPaletteQuery] = useState("");

  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState<
    { command?: string; output: string | React.ReactNode }[]
  >([
    {
      output:
        "♔ sahil // interactive terminal v2.6.0\nType 'help' for available diagnostic commands.",
    },
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Key buffer for 'e4' or 'nf3'
  const keyBufferRef = useRef<string>("");

  const triggerToast = useCallback((msg: string) => {
    sound.turnstile();
    setToastMessage(msg);
    if (toastTimer) clearTimeout(toastTimer);
    const t = setTimeout(() => {
      setToastMessage(null);
    }, 3800);
    setToastTimer(t);
  }, [toastTimer]);

  const unlockEgg = useCallback((eggId: number, title: string) => {
    if (typeof window === "undefined") return;
    try {
      const saved = JSON.parse(localStorage.getItem("sahil_unlocked_eggs") || "[]") as number[];
      if (!saved.includes(eggId)) {
        saved.push(eggId);
        localStorage.setItem("sahil_unlocked_eggs", JSON.stringify(saved));
        onEggCountChange(saved.length);
        triggerToast(`♔ EASTER EGG UNLOCKED [${eggId}/5]: ${title}`);
      }
    } catch {}
  }, [onEggCountChange, triggerToast]);

  // Initial load of eggs & ASCII console greeting (Egg 5)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("sahil_unlocked_eggs") || "[]") as number[];
      onEggCountChange(saved.length);
    } catch {}

    // Styled ASCII Knight in DevTools console (Egg 5 clue)
    console.log(
      `%c
    _ 
   / \\
  | ♘ |  SAHIL PAL // AI & BACKEND SYSTEMS
   \\_/   Deterministic AI Systems, Evaluation Cascades & Postgres Engines
         Hint: Open Terminal and run 'console' to claim Egg 5!
`,
      "color: #CCFF00; font-family: monospace; font-size: 13px; font-weight: bold; background: #050507; padding: 10px;"
    );
  }, [onEggCountChange]);

  // Dynamic Browser Title on visibility change
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        document.title = "Your move — Sahil Pal ♘";
      } else {
        document.title = "Sahil Pal — AI & Backend Systems";
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Global Keyboard listener: 'e4', 'nf3', 'T', 'Cmd+K'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        sound.tick();
        if (isPaletteOpen) {
          onClosePalette();
        } else {
          // Open
          setPaletteQuery("");
          (window as unknown as { togglePalette?: () => void }).togglePalette?.();
        }
        return;
      }

      // Check if typing inside input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // T key for Turnstile toggle (Egg 4)
      if (e.key.toLowerCase() === "t") {
        sound.turnstile();
        onToggleTheme();
        unlockEgg(4, "Temporal Turnstile — Tenet Inversion (T)");
        return;
      }

      // Buffer for chess algebraic moves: 'e4' or 'nf3' (Egg 1)
      keyBufferRef.current += e.key.toLowerCase();
      if (keyBufferRef.current.length > 5) {
        keyBufferRef.current = keyBufferRef.current.slice(-5);
      }

      if (keyBufferRef.current.includes("e4") || keyBufferRef.current.includes("nf3")) {
        keyBufferRef.current = "";
        sound.checkmate();
        unlockEgg(1, "Opening Move (e4 / Nf3) — Tactical Arena Jump (!!)");
        const arenaEl = document.getElementById("chess") || document.getElementById("arena");
        if (arenaEl) {
          arenaEl.scrollIntoView({ behavior: "smooth" });
          arenaEl.classList.add("ring-4", "ring-[var(--accent-lime)]");
          setTimeout(() => {
            arenaEl.classList.remove("ring-4", "ring-[var(--accent-lime)]");
          }, 1500);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPaletteOpen, onClosePalette, onToggleTheme, unlockEgg]);

  // Custom Right-Click Context Menu (Shift + Right-Click preserves native)
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if (e.shiftKey) return; // Native fallback
      e.preventDefault();
      sound.tick();
      setContextMenuPos({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
      setContextMenuPos(null);
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  // Terminal commands interpreter
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    setTerminalInput("");
    sound.tick();

    let reply: string | React.ReactNode = "";

    switch (cmd) {
      case "help":
        reply =
          "Available commands: whoami, synapse, disha, docanalyzer, chess, eggs, console, hire, clear";
        break;
      case "whoami":
        reply = `${PROFILE_CORE.name} — ${PROFILE_CORE.title}. ${PROFILE_CORE.pitchLine1}`;
        break;
      case "synapse":
        reply = "Synapse (synap-git): Tree-sitter AST Context Engine for AI Coding Agents. PyPI: synap-git";
        break;
      case "disha":
        reply = "Disha AI: Real-time clinical voice health coach with <10µs Aho-Corasick emergency breaker.";
        break;
      case "docanalyzer":
        reply = "RAG-DOCAnalyzer: PostgreSQL pgvector Euclidean distance (L2 <->) multi-document QA.";
        break;
      case "chess":
        reply = "Chess.com profile: sahill17. Challenge unlocked at Act III.";
        break;
      case "eggs":
        reply = `Unlocked Easter Eggs: ${eggCount}/5. Check header badge for status!`;
        break;
      case "console":
      case "claim":
        unlockEgg(5, "Knight's Console — Claimed from DevTools!");
        reply = "♔ EGG 5 CLAIMED! ASCII Knight credentials verified.";
        break;
      case "hire":
        reply = `Transmit offer to: ${PROFILE_CORE.email}`;
        break;
      case "clear":
        setTerminalHistory([]);
        return;
      default:
        reply = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
    }

    setTerminalHistory((prev) => [...prev, { command: cmd, output: reply }]);

    setTimeout(() => {
      terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  // Expose unlock method on window for child components (e.g. e6 coordinate)
  useEffect(() => {
    (window as unknown as { unlockEgg?: typeof unlockEgg }).unlockEgg = unlockEgg;
  }, [unlockEgg]);

  // Command palette items
  const paletteItems = [
    { label: "Jump to About", action: () => (document.getElementById("about") || document.getElementById("pledge"))?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Jump to Projects", action: () => (document.getElementById("projects") || document.getElementById("systems"))?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Jump to Chess Puzzles", action: () => (document.getElementById("chess") || document.getElementById("arena"))?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Jump to Contact", action: () => (document.getElementById("contact") || document.getElementById("signal"))?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Inspect 01: Synapse MCP Daemon", action: () => { (document.getElementById("projects") || document.getElementById("systems"))?.scrollIntoView({ behavior: "smooth" }); window.dispatchEvent(new KeyboardEvent("keydown", { key: "1" })); } },
    { label: "Inspect 02: Disha AI Clinical Coach", action: () => { (document.getElementById("projects") || document.getElementById("systems"))?.scrollIntoView({ behavior: "smooth" }); window.dispatchEvent(new KeyboardEvent("keydown", { key: "2" })); } },
    { label: "Inspect 03: RAG-DOCAnalyzer", action: () => { (document.getElementById("projects") || document.getElementById("systems"))?.scrollIntoView({ behavior: "smooth" }); window.dispatchEvent(new KeyboardEvent("keydown", { key: "3" })); } },
    { label: "Invert Polarity (Temporal Turnstile T)", action: () => { sound.turnstile(); onToggleTheme(); unlockEgg(4, "Temporal Turnstile — Tenet Inversion"); } },
    { label: "Toggle Synthesized Audio (SFX)", action: () => sound.toggle() },
    { label: "Open Terminal", action: () => onOpenTerminal() },
    { label: "Copy Direct Email (saahilpal17@gmail.com)", action: () => navigator.clipboard.writeText(PROFILE_CORE.email) },
    { label: "Send Chess.com Match Challenge", action: () => window.open(PROFILE_CORE.chessUrl, "_blank") },
  ];

  const filteredPalette = paletteItems.filter((it) =>
    it.label.toLowerCase().includes(paletteQuery.toLowerCase())
  );

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-[var(--surface-raised)] border-2 border-[var(--accent-lime)] shadow-[5px_5px_0px_var(--accent-lime)] font-mono text-xs text-[var(--ink-primary)] max-w-sm animate-bounce">
          <div className="flex items-center gap-2 text-[var(--accent-lime)] font-bold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>SYSTEM EVENT</span>
          </div>
          <div>{toastMessage}</div>
        </div>
      )}

      {/* Custom Right-Click Context Menu */}
      {contextMenuPos && (
        <div
          className="fixed z-50 w-56 bg-[var(--surface-raised)] border-2 border-[var(--border-frame)] shadow-[4px_4px_0px_var(--accent-lime)] font-mono text-xs py-1 select-none"
          style={{
            top: Math.min(contextMenuPos.y, window.innerHeight - 260),
            left: Math.min(contextMenuPos.x, window.innerWidth - 240),
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-3 py-1.5 border-b border-[var(--border-grid)] text-[10px] text-[var(--accent-lime)] font-bold flex justify-between">
            <span>♔ sahil // menu</span>
            <span className="text-[var(--ink-muted)]">SHIFT+R-CLICK=NATIVE</span>
          </div>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(PROFILE_CORE.email);
              sound.tick();
              setContextMenuPos(null);
              triggerToast("Email copied to clipboard!");
            }}
            className="w-full text-left px-3 py-2 hover:bg-[var(--surface)] text-[var(--ink-primary)] hover:text-[var(--accent-lime)] flex items-center justify-between"
          >
            <span>Copy Direct Email</span>
            <Copy className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => {
              setContextMenuPos(null);
              document.getElementById("arena")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full text-left px-3 py-2 hover:bg-[var(--surface)] text-[var(--ink-primary)] hover:text-[var(--accent-lime)] flex items-center justify-between"
          >
            <span>Jump to Chess Arena</span>
            <span>♔</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setContextMenuPos(null);
              sound.turnstile();
              onToggleTheme();
              unlockEgg(4, "Temporal Turnstile — Tenet Inversion");
            }}
            className="w-full text-left px-3 py-2 hover:bg-[var(--surface)] text-[var(--ink-primary)] hover:text-[var(--accent-lime)] flex items-center justify-between"
          >
            <span>Invert Polarity (T)</span>
            <SunMoon className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => {
              setContextMenuPos(null);
              onOpenTerminal();
            }}
            className="w-full text-left px-3 py-2 hover:bg-[var(--surface)] text-[var(--ink-primary)] hover:text-[var(--accent-lime)] flex items-center justify-between"
          >
            <span>Open GM Terminal</span>
            <TerminalIcon className="w-3.5 h-3.5" />
          </button>

          <div className="border-t border-[var(--border-grid)] my-1" />

          <a
            href={PROFILE_CORE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setContextMenuPos(null)}
            className="w-full text-left px-3 py-1.5 hover:bg-[var(--surface)] text-[var(--ink-muted)] hover:text-[var(--ink-primary)] flex items-center justify-between"
          >
            <span>GitHub ↗</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <a
            href={PROFILE_CORE.chessUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setContextMenuPos(null)}
            className="w-full text-left px-3 py-1.5 hover:bg-[var(--surface)] text-[var(--ink-muted)] hover:text-[var(--ink-primary)] flex items-center justify-between"
          >
            <span>Chess.com ↗</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* Command Palette Modal (⌘K) */}
      {isPaletteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm"
          onClick={onClosePalette}
        >
          <div
            className="brutalist-card w-full max-w-xl bg-[var(--surface)] border-2 border-[var(--border-frame)] shadow-[6px_6px_0px_var(--accent-lime)] p-4 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-2 border-b-2 border-[var(--border-frame)] pb-2">
              <Search className="w-4 h-4 text-[var(--accent-lime)]" />
              <input
                type="text"
                value={paletteQuery}
                onChange={(e) => setPaletteQuery(e.target.value)}
                placeholder="Type a command or jump destination..."
                className="w-full bg-transparent font-mono text-sm text-[var(--ink-primary)] focus:outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={onClosePalette}
                className="text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results list */}
            <div className="max-h-72 overflow-y-auto space-y-1 font-mono text-xs">
              {filteredPalette.length > 0 ? (
                filteredPalette.map((it, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      sound.tick();
                      onClosePalette();
                      it.action();
                    }}
                    className="w-full text-left px-3 py-2 border border-transparent hover:border-[var(--accent-lime)] hover:bg-[var(--surface-raised)] text-[var(--ink-primary)] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{it.label}</span>
                    <span className="text-[var(--accent-lime)]">↵</span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-[var(--ink-muted)]">No matching commands found.</div>
              )}
            </div>

            <div className="pt-2 border-t border-[var(--border-grid)] flex justify-between text-[10px] font-mono text-[var(--ink-muted)]">
              <span>ESC TO EXIT</span>
              <span>⌘K TO TOGGLE</span>
            </div>
          </div>
        </div>
      )}

      {/* Secret Interactive GM Terminal Modal */}
      {isTerminalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={onCloseTerminal}
        >
          <div
            className="brutalist-card w-full max-w-2xl bg-[#090A0E] border-2 border-[var(--accent-lime)] shadow-[8px_8px_0px_var(--accent-lime)] p-5 space-y-4 text-emerald-400 font-mono text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between border-b border-emerald-500/40 pb-2">
              <div className="flex items-center gap-2 font-bold text-[var(--accent-lime)]">
                <TerminalIcon className="w-4 h-4" />
                <span>♔ sahil // secret gm terminal [tty-1]</span>
              </div>
              <button
                type="button"
                onClick={onCloseTerminal}
                className="text-emerald-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal Output Stream */}
            <div className="h-64 overflow-y-auto space-y-2 pr-2 text-[11px] leading-relaxed">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-0.5">
                  {item.command && (
                    <div className="text-[var(--accent-lime)] font-bold">
                      guest@sahil:~$ {item.command}
                    </div>
                  )}
                  <div className="text-[#F4F4F0] whitespace-pre-wrap">{item.output}</div>
                </div>
              ))}
              <div ref={terminalBottomRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 border-t border-emerald-500/40 pt-2">
              <span className="text-[var(--accent-lime)] font-bold">guest@sahil:~$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type 'help'..."
                className="flex-1 bg-transparent text-emerald-300 focus:outline-none font-mono text-xs"
                autoFocus
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
