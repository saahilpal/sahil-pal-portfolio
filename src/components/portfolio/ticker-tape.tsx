"use client";

import { sound } from "@/lib/audio";

export function KineticTickerTape() {
  const items = [
    "SYNAPSE MCP ★ FLAGSHIP",
    "PROPEVAL v1.0.0 — 0.36MS CPU CASCADE",
    "DISHA AI — MULTILINGUAL HYBRID RAG",
    "PGVECTOR DOCANALYZER",
    "CHESS.COM/MEMBER/SAHILL17 — SEND A CHALLENGE",
  ];

  // Repeat items for continuous marquee loop
  const tape = [...items, ...items, ...items, ...items];

  return (
    <div
      className="relative w-full overflow-hidden border-y-2 border-[var(--border-frame)] bg-[var(--accent-lime)] text-[#050507] py-2 sm:py-2.5 select-none z-20"
      aria-label="Grandmaster Systems Lab Telemetry Ticker"
    >
      <div
        className="animate-ticker flex items-center gap-8 font-mono text-xs sm:text-sm font-black tracking-wider cursor-default"
        onMouseEnter={() => sound.tick()}
      >
        {tape.map((phrase, idx) => (
          <div key={idx} className="flex items-center gap-6 shrink-0">
            <span>{phrase}</span>
            <span className="text-black/50 font-black">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
