"use client";

import { useEffect, useState } from "react";

interface EvalBarProps {
  activeMoveIndex: number;
}

export function EvalBar({ activeMoveIndex }: EvalBarProps) {
  // Height percentage of the white eval fill (0% to 100%)
  const [fillPct, setFillPct] = useState<number>(55);
  const [evalText, setEvalText] = useState<string>("+1.8");

  useEffect(() => {
    switch (activeMoveIndex) {
      case -1:
        setFillPct(55);
        setEvalText("+1.8");
        break;
      case 0: // Synapse (Move 1)
        setFillPct(68);
        setEvalText("+4.2");
        break;
      case 1: // DocAnalyzer (Move 2)
        setFillPct(80);
        setEvalText("+7.9");
        break;
      case 2: // Hera Billing (Move 3)
        setFillPct(92);
        setEvalText("+M2");
        break;
      case 3: // LeetSync (Move 4 - Mate)
        setFillPct(100);
        setEvalText("#HIRE");
        break;
      default:
        setFillPct(55);
        setEvalText("+1.8");
    }
  }, [activeMoveIndex]);

  return (
    <aside
      className="fixed left-3 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center select-none"
      aria-label="Lichess-style Engine Evaluation Bar"
    >
      {/* Eval Bar Pillar */}
      <div className="w-5 h-72 rounded-xs bg-[#1A1A1A] border border-[var(--border-hairline-strong)] overflow-hidden flex flex-col justify-end relative shadow-2xl">
        {/* White / Winning Evaluation Fill */}
        <div
          className="w-full bg-[#EAE5D9] transition-all duration-700 ease-out relative"
          style={{ height: `${fillPct}%` }}
        >
          {/* Subtle horizontal tick marking 0.0 equality */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-[var(--accent-copper)]" />
        </div>

        {/* Floating Eval Score Tag */}
        <div className="absolute bottom-2 inset-x-0 text-center font-mono text-[9px] font-bold text-black pointer-events-none">
          {evalText}
        </div>
      </div>

      {/* Label */}
      <div className="mt-2 text-[8px] font-mono uppercase tracking-widest text-[var(--text-muted)] rotate-90 origin-center whitespace-nowrap translate-y-3">
        NNUE EVAL
      </div>
    </aside>
  );
}
