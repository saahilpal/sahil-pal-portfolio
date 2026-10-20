"use client";

import { useEffect, useState } from "react";

interface EvalBarProps {
  activeMoveIndex: number;
}

export function EvalBar({ activeMoveIndex }: EvalBarProps) {
  // Height percentage of the winning white eval fill (0% to 100%)
  const [fillPct, setFillPct] = useState<number>(65);
  const [evalText, setEvalText] = useState<string>("+2.4");

  useEffect(() => {
    switch (activeMoveIndex) {
      case -1:
        setFillPct(60);
        setEvalText("+2.0");
        break;
      case 0: // Synapse (Move 1 - Bishop)
        setFillPct(72);
        setEvalText("+4.8");
        break;
      case 1: // DocAnalyzer (Move 2 - Rook)
        setFillPct(82);
        setEvalText("+7.5");
        break;
      case 2: // Hera Billing (Move 3 - Knight)
        setFillPct(92);
        setEvalText("+M2");
        break;
      case 3: // LeetSync (Move 4 - Pawn to Queen)
        setFillPct(100);
        setEvalText("#HIRE");
        break;
      default:
        setFillPct(65);
        setEvalText("+2.4");
    }
  }, [activeMoveIndex]);

  return (
    <aside
      className="fixed left-3 top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col items-center select-none"
      aria-label="Chess.com Engine Evaluation Bar"
    >
      {/* Eval Bar Pillar */}
      <div className="w-4 h-64 rounded-xs bg-[var(--bg-chess-dark)] border border-[var(--border-chess-strong)] overflow-hidden flex flex-col justify-end relative shadow-xl">
        {/* White / Winning Evaluation Fill */}
        <div
          className="w-full bg-[var(--chess-nude)] transition-all duration-700 ease-out relative"
          style={{ height: `${fillPct}%` }}
        >
          {/* Subtle horizontal tick marking advantage */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-[var(--chess-green)] shadow-xs" />
        </div>

        {/* Floating Eval Score Tag */}
        <div className="absolute bottom-2 inset-x-0 text-center font-mono text-[9px] font-bold text-black pointer-events-none">
          {evalText}
        </div>
      </div>

      {/* Label */}
      <div className="mt-2 text-[8px] font-mono uppercase tracking-widest text-[var(--chess-green)] rotate-90 origin-center whitespace-nowrap translate-y-3 font-bold">
        EVAL
      </div>
    </aside>
  );
}
