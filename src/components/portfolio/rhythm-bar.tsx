"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  sound,
  LAUNCHPAD_PADS,
  OG_BEATS,
  LaunchpadPadId,
  OgBeatId,
} from "@/lib/audio";
import { Play, Square, Radio, Volume2, VolumeX, Disc3 } from "lucide-react";

export function RhythmOperator() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeBeatId, setActiveBeatId] = useState<OgBeatId>("boombap");
  const [bpm, setBpm] = useState(90);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [activePad, setActivePad] = useState<LaunchpadPadId | null>(null);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const padTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSfxEnabled(sound.isEnabled());

    // Step clock updates for 16-step LED visualizer
    const unsubscribeStep = sound.subscribeStep((step) => {
      setActiveStep(step);
    });

    // Beat state updates
    const unsubscribeBeat = sound.subscribeBeatState((playing, beatId, currentBpm) => {
      setIsPlaying(playing);
      setActiveBeatId(beatId);
      setBpm(currentBpm);
      if (!playing) setActiveStep(-1);
    });

    return () => {
      unsubscribeStep();
      unsubscribeBeat();
    };
  }, []);

  const triggerPad = useCallback((padId: LaunchpadPadId) => {
    sound.triggerPad(padId);
    setActivePad(padId);
    if (padTimerRef.current) clearTimeout(padTimerRef.current);
    padTimerRef.current = setTimeout(() => {
      setActivePad(null);
    }, 180);
  }, []);

  // Global Keyboard Launchpad Listeners (Q W E R / A S D F) + Spacebar
  useEffect(() => {
    const KEY_PAD_MAP: Record<string, LaunchpadPadId> = {
      q: "kick",
      w: "snare",
      e: "clap",
      r: "hihat",
      a: "openhat",
      s: "subbass",
      d: "chord",
      f: "scratch",
    };

    const handleKeyDown = (e: KeyboardEvent) => {
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

      // Launchpad keys Q, W, E, R, A, S, D, F
      if (KEY_PAD_MAP[lowerKey]) {
        e.preventDefault();
        triggerPad(KEY_PAD_MAP[lowerKey]);
        return;
      }

      // Spacebar: Toggle OG Beat Loop
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        sound.toggleOgBeat();
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
  }, [triggerPad]);

  const handleTogglePlay = () => {
    sound.toggleOgBeat(activeBeatId);
  };

  const handleSelectBeat = (id: OgBeatId) => {
    sound.relay();
    sound.playOgBeat(id);
  };

  const handleBpmChange = (delta: number) => {
    sound.relay();
    sound.setBeatBpm(bpm + delta);
  };

  const handleToggleSfx = () => {
    const next = sound.toggle();
    setSfxEnabled(next);
  };

  return (
    <section
      aria-label="Pocket Operator & OG Beats Launchpad"
      className="w-full bg-[var(--surface-raised)] border-y border-[var(--border-frame)] transition-colors select-none py-2 px-3 sm:px-6"
    >
      <div className="max-w-7xl mx-auto space-y-2.5 font-mono text-xs">
        {/* Top Control Bar: OG Beats Transport + 16-Step LED Runner + Mute */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2.5">
          {/* Left: Device Label + Transport Play/Pause + BPM Engine */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[var(--canvas)] border border-[var(--border-grid)] text-[var(--accent-lime)] font-bold tracking-wider">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span className="hidden sm:inline">OP-PO //</span>
              <span>LAUNCHPAD & OG BEATS</span>
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
                title="Toggle OG Beat (Hotkey: Space)"
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
              {sfxEnabled ? (
                <Volume2 className="w-3.5 h-3.5" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-[var(--accent-red)]" />
              )}
            </button>
          </div>

          {/* Center: 16-Step LED Runner */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-full py-0.5">
            {Array.from({ length: 16 }).map((_, stepIdx) => {
              const isActive = activeStep === stepIdx;
              const isQuarter = stepIdx % 4 === 0;
              return (
                <div
                  key={stepIdx}
                  className={`flex flex-col items-center gap-0.5 transition-all ${
                    isQuarter ? "opacity-100" : "opacity-75"
                  }`}
                >
                  <div
                    className={`w-2 sm:w-3 h-2.5 sm:h-3 rounded-[1px] border transition-all ${
                      isActive
                        ? "bg-[var(--accent-lime)] border-[var(--accent-lime)] shadow-[0_0_8px_var(--accent-lime)] scale-110"
                        : isQuarter
                        ? "bg-[var(--surface)] border-[var(--border-frame)]"
                        : "bg-[var(--canvas)] border-[var(--border-grid)]"
                    }`}
                  />
                  <span className="text-[7px] text-[var(--ink-muted)] hidden sm:block">
                    {stepIdx + 1}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right: 4 OG Beat Presets */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-full bg-[var(--surface)] p-0.5 border border-[var(--border-frame)]">
            {OG_BEATS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => handleSelectBeat(b.id)}
                className={`px-2 py-0.5 text-[10px] font-bold uppercase transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  activeBeatId === b.id && isPlaying
                    ? "bg-[var(--accent-lime)] text-black"
                    : activeBeatId === b.id
                    ? "bg-[var(--ink-primary)] text-[var(--canvas)]"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
                }`}
                title={b.description}
              >
                <Disc3
                  className={`w-2.5 h-2.5 ${
                    activeBeatId === b.id && isPlaying ? "animate-spin" : ""
                  }`}
                />
                <span>{b.title.replace(/^\d+\s*\/\/\s*/, "")}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Section: 8 Playable MPC Launchpad Pads */}
        <div className="pt-1 border-t border-[var(--border-grid)]/60">
          <div className="flex items-center justify-between mb-1.5 text-[10px] text-[var(--ink-muted)]">
            <span className="font-bold text-[var(--accent-lime)]">
              TACTILE LAUNCHPAD PADS //
            </span>
            <span>PRESS KEYS [Q, W, E, R, A, S, D, F] OR TAP PADS</span>
          </div>

          {/* 8 Drum Pads Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
            {LAUNCHPAD_PADS.map((pad) => {
              const isHit = activePad === pad.id;
              return (
                <button
                  key={pad.id}
                  type="button"
                  data-pad={pad.id}
                  onClick={() => triggerPad(pad.id)}
                  className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-sm border text-center transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.4)] ${
                    isHit
                      ? "translate-x-[1px] translate-y-[1px] shadow-none bg-[var(--accent-lime)] text-black border-[var(--accent-lime)] scale-98"
                      : "bg-[var(--surface)] text-[var(--ink-primary)] border-[var(--border-frame)] hover:border-[var(--accent-lime)] hover:-translate-y-0.5"
                  }`}
                  title={`Trigger ${pad.label} (Hotkey: ${pad.key})`}
                >
                  {/* Top Key Shortcut Badge */}
                  <span
                    className={`text-[9px] font-mono font-black px-1 rounded-xs mb-0.5 ${
                      isHit
                        ? "bg-black text-[var(--accent-lime)]"
                        : "bg-[var(--surface-raised)] text-[var(--ink-muted)] border border-[var(--border-grid)]"
                    }`}
                  >
                    [{pad.key}]
                  </span>

                  {/* Pad Label */}
                  <span className="text-[10px] font-mono font-bold tracking-tight uppercase leading-tight truncate w-full">
                    {pad.label}
                  </span>

                  {/* Corner LED Accent */}
                  <span
                    className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full transition-all ${
                      isHit
                        ? "bg-black shadow-[0_0_6px_#000]"
                        : "bg-[var(--accent-lime)] opacity-70"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
