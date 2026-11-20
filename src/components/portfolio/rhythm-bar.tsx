"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { sound, RhythmPatternName, D_MIN_PENTATONIC } from "@/lib/audio";
import { Play, Square, Activity, Radio, Volume2, VolumeX } from "lucide-react";

export function RhythmOperator() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [pattern, setPattern] = useState<RhythmPatternName>("chrono");
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [lastPlayedNote, setLastPlayedNote] = useState<string | null>(null);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const noteFadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSfxEnabled(sound.isEnabled());

    // Subscribe to rhythm step updates
    const unsubscribeStep = sound.subscribeStep((step) => {
      setActiveStep(step);
    });

    // Subscribe to state updates (is playing, bpm, pattern)
    const unsubscribeState = sound.subscribeRhythmState((playing, currentBpm, currentPattern) => {
      setIsPlaying(playing);
      setBpm(currentBpm);
      setPattern(currentPattern);
      if (!playing) setActiveStep(-1);
    });

    return () => {
      unsubscribeStep();
      unsubscribeState();
    };
  }, []);

  const triggerNote = useCallback((idx: number) => {
    const note = sound.playNote(idx);
    setLastPlayedNote(note.name);
    if (noteFadeTimeoutRef.current) clearTimeout(noteFadeTimeoutRef.current);
    noteFadeTimeoutRef.current = setTimeout(() => {
      setLastPlayedNote(null);
    }, 700);
  }, []);

  // Global Keyboard Synthesizer Listeners (ASDFGHJKL keys + 1-8 keys)
  useEffect(() => {
    const KEY_NOTE_MAP: Record<string, number> = {
      a: 0, // D3
      s: 1, // F3
      d: 2, // G3
      f: 3, // A3
      g: 4, // C4
      h: 5, // D4
      j: 6, // F4
      k: 7, // G4
      l: 8, // A4
      "1": 0,
      "2": 1,
      "3": 2,
      "4": 3,
      "5": 4,
      "6": 5,
      "7": 6,
      "8": 7,
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in form controls or with Cmd/Ctrl
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const lowerKey = e.key.toLowerCase();

      // Check if key is a musical key
      if (KEY_NOTE_MAP[lowerKey] !== undefined) {
        // Don't preventDefault on 1-4 so workbench also switches
        triggerNote(KEY_NOTE_MAP[lowerKey]);
        return;
      }

      // Spacebar: Toggle rhythm playback
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        sound.toggleRhythm();
        return;
      }

      // Key M: Toggle SFX mute
      if (lowerKey === "m" && !e.repeat) {
        e.preventDefault();
        const next = sound.toggle();
        setSfxEnabled(next);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerNote]);

  const handleTogglePlay = () => {
    sound.toggleRhythm();
  };

  const handleBpmChange = (delta: number) => {
    sound.relay();
    sound.setBpm(bpm + delta);
  };

  const handlePatternChange = (p: RhythmPatternName) => {
    sound.relay();
    sound.setPattern(p);
  };

  const handleToggleSfx = () => {
    const next = sound.toggle();
    setSfxEnabled(next);
  };

  return (
    <section
      aria-label="Pocket Operator Rhythm Synthesizer"
      className="w-full bg-[var(--surface-raised)] border-y border-[var(--border-frame)] transition-colors select-none py-2 px-3 sm:px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-xs">
        {/* Left: Device Label + Transport Play/Pause + BPM Engine */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[var(--canvas)] border border-[var(--border-grid)] text-[var(--accent-lime)] font-bold tracking-wider">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">OP-PO //</span>
            <span>RHYTHM ENGINE</span>
          </div>

          {/* Transport Controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleTogglePlay}
              className={`brutalist-btn px-2.5 py-1 text-[11px] gap-1.5 font-bold transition-all ${
                isPlaying
                  ? "bg-[var(--accent-lime)] text-black border-[var(--accent-lime)] shadow-[2px_2px_0px_#000]"
                  : "bg-[var(--surface)] text-[var(--ink-primary)]"
              }`}
              title="Toggle Beat Sequencer (Hotkey: Space)"
              aria-label={isPlaying ? "Stop Rhythm" : "Start Rhythm"}
            >
              {isPlaying ? (
                <>
                  <Square className="w-3 h-3 fill-current" />
                  <span>STOP</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current text-[var(--accent-lime)]" />
                  <span>PLAY [SPACE]</span>
                </>
              )}
            </button>

            {/* BPM Adjusters */}
            <div className="flex items-center bg-[var(--surface)] border border-[var(--border-frame)] shadow-[1px_1px_0px_var(--border-frame)]">
              <button
                type="button"
                onClick={() => handleBpmChange(-5)}
                className="px-2 py-0.5 hover:bg-[var(--surface-raised)] hover:text-[var(--accent-lime)] cursor-pointer"
                title="Decrease BPM (-5)"
              >
                -
              </button>
              <span className="px-2 py-0.5 font-bold text-[var(--ink-primary)]">
                {bpm} <span className="text-[10px] text-[var(--ink-muted)]">BPM</span>
              </span>
              <button
                type="button"
                onClick={() => handleBpmChange(5)}
                className="px-2 py-0.5 hover:bg-[var(--surface-raised)] hover:text-[var(--accent-lime)] cursor-pointer"
                title="Increase BPM (+5)"
              >
                +
              </button>
            </div>
          </div>

          {/* SFX Mute Quick Toggle */}
          <button
            type="button"
            onClick={handleToggleSfx}
            className="p-1 hover:text-[var(--accent-lime)] text-[var(--ink-muted)] cursor-pointer"
            title={sfxEnabled ? "Mute All Audio (Hotkey: M)" : "Unmute Audio (Hotkey: M)"}
          >
            {sfxEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-[var(--accent-red)]" />}
          </button>
        </div>

        {/* Center: 16-Step LED Runner (Teenage Engineering Hardware Display) */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full py-1">
          {Array.from({ length: 16 }).map((_, stepIdx) => {
            const isActive = activeStep === stepIdx;
            const isQuarter = stepIdx % 4 === 0;
            return (
              <div
                key={stepIdx}
                className={`flex flex-col items-center gap-0.5 transition-all ${
                  isQuarter ? "opacity-100" : "opacity-80"
                }`}
              >
                <div
                  className={`w-2.5 sm:w-3.5 h-3 sm:h-3.5 rounded-[1px] border transition-all ${
                    isActive
                      ? "bg-[var(--accent-lime)] border-[var(--accent-lime)] shadow-[0_0_8px_var(--accent-lime)] scale-110"
                      : isQuarter
                      ? "bg-[var(--surface)] border-[var(--border-frame)]"
                      : "bg-[var(--canvas)] border-[var(--border-grid)]"
                  }`}
                />
                <span className="text-[8px] text-[var(--ink-muted)] hidden sm:block">
                  {stepIdx + 1}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right: Pattern Presets + Live Keyboard Note Visualizer */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          {/* Pattern Switcher */}
          <div className="flex items-center gap-1 bg-[var(--surface)] p-0.5 border border-[var(--border-frame)]">
            {(["chrono", "teenage", "minimal"] as RhythmPatternName[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => handlePatternChange(p)}
                className={`px-2 py-0.5 text-[10px] font-bold uppercase transition-all cursor-pointer ${
                  pattern === p
                    ? "bg-[var(--ink-primary)] text-[var(--canvas)]"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Interactive Keyboard Note Feedback */}
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[var(--surface)] border border-[var(--border-grid)] min-w-[100px] justify-center">
            {lastPlayedNote ? (
              <div className="flex items-center gap-1 text-[var(--accent-lime)] font-black animate-bounce">
                <Activity className="w-3.5 h-3.5" />
                <span>{lastPlayedNote}</span>
              </div>
            ) : (
              <div className="text-[10px] text-[var(--ink-muted)]">
                <span>KEYS [A–L / 1–8]</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
