"use client";

import { useState, useRef } from "react";
import { animate } from "animejs";
import { ShieldCheck, Check, Sparkles, RefreshCw } from "lucide-react";

interface StampRecord {
  id: number;
  text: string;
  sub: string;
  color: string;
  x: number;
  y: number;
  rot: number;
}

const STAMP_DIES = [
  {
    id: "acid",
    title: "ACID STATE",
    sub: "SQLite WAL // Room v13",
    color: "var(--stamp-green)",
    border: "var(--stamp-green-border)",
    bg: "var(--stamp-green-bg)",
  },
  {
    id: "compiler",
    title: "AST VERIFIED",
    sub: "Tree-sitter // Model Context Protocol",
    color: "var(--stamp-blue)",
    border: "var(--stamp-blue-border)",
    bg: "var(--stamp-blue-bg)",
  },
  {
    id: "wholesale",
    title: "ZERO ROUND-OFF",
    sub: "Largest Remainder // 0-Paise Error",
    color: "var(--stamp-red)",
    border: "var(--stamp-red-border)",
    bg: "var(--stamp-red-bg)",
  },
];

export function StampMachine() {
  const [selectedDie, setSelectedDie] = useState<number>(0);
  const [stamps, setStamps] = useState<StampRecord[]>([
    {
      id: 1,
      text: "ARCHITECTURAL DRAFT",
      sub: "VERIFIED SAHIL.PAL // 2026",
      color: "var(--stamp-red)",
      x: 18,
      y: 12,
      rot: -3,
    },
  ]);
  const [stampCount, setStampCount] = useState<number>(1);
  const [isPressing, setIsPressing] = useState<boolean>(false);

  const stampArmRef = useRef<HTMLDivElement>(null);
  const paperBedRef = useRef<HTMLDivElement>(null);

  const handleApplyStamp = (e?: React.MouseEvent<HTMLElement>) => {
    if (isPressing) return;
    setIsPressing(true);

    const die = STAMP_DIES[selectedDie];
    const newCount = stampCount + 1;
    setStampCount(newCount);

    // Mechanical Stamp Drop Animation
    if (stampArmRef.current) {
      animate(stampArmRef.current, {
        scale: [1.35, 0.92, 1],
        translateY: [-16, 0],
        rotate: [-6, 0],
        duration: 380,
        ease: "outElastic(1, .5)",
      });
    }

    // Determine position inside paper bed or fallback random
    const rect = paperBedRef.current?.getBoundingClientRect();
    const x = rect && e ? Math.max(10, Math.min(rect.width - 140, e.clientX - rect.left - 60)) : 20 + (newCount % 4) * 25;
    const y = rect && e ? Math.max(10, Math.min(rect.height - 40, e.clientY - rect.top - 20)) : 10 + (newCount % 3) * 20;
    const rot = -4 + Math.random() * 8;

    const newRecord: StampRecord = {
      id: newCount,
      text: die.title,
      sub: `SPEC #${String(newCount).padStart(3, "0")} • ${die.sub}`,
      color: die.color,
      x: Math.round(x),
      y: Math.round(y),
      rot: Math.round(rot),
    };

    setStamps((prev) => [...prev.slice(-4), newRecord]);

    setTimeout(() => {
      setIsPressing(false);
    }, 350);
  };

  const clearStamps = () => {
    setStamps([]);
  };

  const activeDie = STAMP_DIES[selectedDie];

  return (
    <div className="paper-sheet p-4 sm:p-5 rounded-sm space-y-3 relative overflow-hidden bg-[var(--bg-card)]">
      {/* Header plate */}
      <div className="flex items-center justify-between border-b border-[var(--border-paper)] pb-2.5 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--stamp-red)] animate-pulse" />
          <span className="font-bold text-[var(--text-ink)] uppercase tracking-wider text-[11px]">
            MECHANICAL VERIFICATION STAMP
          </span>
        </div>
        <span className="text-[10px] text-[var(--text-ink-muted)]">
          TACTILE DIE PRESS
        </span>
      </div>

      {/* Die Selection Tabs */}
      <div className="flex items-center gap-1.5 font-mono text-[10px]">
        {STAMP_DIES.map((die, idx) => (
          <button
            key={die.id}
            onClick={() => setSelectedDie(idx)}
            className={`px-2 py-1 rounded-xs border transition-all ${
              selectedDie === idx
                ? "bg-[var(--text-ink)] text-[var(--bg-paper)] border-[var(--text-ink)] font-semibold shadow-xs"
                : "border-[var(--border-paper)] text-[var(--text-ink-secondary)] hover:border-[var(--border-paper-strong)]"
            }`}
          >
            DIE 0{idx + 1}: {die.title}
          </button>
        ))}
      </div>

      {/* Interactive Stamping Surface (Clickable Drafting Paper Bed) */}
      <div
        ref={paperBedRef}
        onClick={handleApplyStamp}
        className="h-28 sm:h-32 border border-dashed border-[var(--border-paper-strong)] rounded-xs bg-[var(--bg-card-draft)] relative cursor-pointer select-none overflow-hidden group hover:border-[var(--stamp-red)] transition-colors p-2"
        title="Click anywhere on this surface to stamp the paper"
      >
        {/* Background drafting watermark instructions */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity">
          <span className="font-mono text-[11px] text-[var(--text-ink)] font-semibold uppercase tracking-wider">
            [ CLICK TO APPLY ARCHIVAL INK STAMP ]
          </span>
          <span className="font-mono text-[9px] text-[var(--text-ink-muted)]">
            STAMPS APPLIED: {stampCount} // PHYSICS RECOIL SIMULATED
          </span>
        </div>

        {/* Existing Inked Stamps */}
        {stamps.map((st) => (
          <div
            key={st.id}
            style={{
              position: "absolute",
              left: `${st.x}px`,
              top: `${st.y}px`,
              transform: `rotate(${st.rot}deg)`,
              color: st.color,
            }}
            className="pointer-events-none transition-all duration-200"
          >
            <div className="border-2 border-current px-2.5 py-1 rounded-xs bg-[var(--bg-paper)]/95 shadow-sm font-mono text-[10px] font-bold tracking-wider inline-flex flex-col">
              <span className="leading-tight flex items-center gap-1">
                <span>{st.text}</span>
                <Check size={10} className="stroke-[3]" />
              </span>
              <span className="text-[7.5px] font-normal tracking-normal opacity-85 leading-tight">
                {st.sub}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mechanical Action Bar */}
      <div className="flex items-center justify-between pt-1 font-mono text-[10px]">
        <div ref={stampArmRef} className="flex items-center gap-2 text-[var(--text-ink-muted)]">
          <span className="text-[var(--text-ink)] font-bold">READY:</span>
          <span style={{ color: activeDie.color }} className="font-semibold">
            {activeDie.title} ({activeDie.sub})
          </span>
        </div>

        <div className="flex items-center gap-2">
          {stamps.length > 0 && (
            <button
              onClick={clearStamps}
              className="text-[var(--text-ink-muted)] hover:text-[var(--text-ink)] transition-colors"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={handleApplyStamp}
            disabled={isPressing}
            className="px-3 py-1 bg-[var(--stamp-red)] text-white rounded-xs font-bold flex items-center gap-1.5 hover:opacity-90 active:scale-95 transition-all shadow-xs"
          >
            <span>STAMP INK</span>
          </button>
        </div>
      </div>
    </div>
  );
}
