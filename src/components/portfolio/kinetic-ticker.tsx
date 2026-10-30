"use client";

import React from "react";
import { TactilePill } from "./tactile-card";

export function KineticTicker() {
  const items = [
    { label: "CHESS", detail: "♞ 1000 Elo Rapid" },
    { label: "SYNAPSE", detail: "Tree-sitter AST Daemon & MCP" },
    { label: "BENCHMARK", detail: "Sub-2s 50K Symbol Indexing" },
    { label: "DOCANALYZER", detail: "Grounded 768d pgvector Cosine" },
    { label: "HERA BILLING", detail: "Offline Room SQLite WAL" },
    { label: "LEETSYNC", detail: "Chromium Manifest V3 Octokit" },
    { label: "STATUS", detail: "Available for 2026 Engineering Roles" },
  ];

  // Duplicate items for infinite seamless marquee loop
  const tape = [...items, ...items, ...items];

  return (
    <div
      className="relative w-full overflow-hidden border-y border-[var(--line)] bg-[var(--canvas)] py-3 select-none"
      aria-label="Engineering Specification Ticker"
    >
      {/* Subtle edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[var(--canvas)] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[var(--canvas)] to-transparent z-10" />

      <div className="animate-marquee flex items-center gap-8 text-xs font-mono">
        {tape.map((item, idx) => (
          <TactilePill key={idx}>
            <div className="flex items-center gap-3 shrink-0 px-3 py-1 rounded bg-[var(--surface)]/50 border border-[var(--line)]/50 hover:border-[var(--accent-move)] hover:text-white transition-colors cursor-pointer group">
              <span className="text-[var(--accent-move)] text-xs group-hover:scale-125 transition-transform">
                {item.label === "CHESS" ? "♞" : "◆"}
              </span>
              <span className="font-bold tracking-wider text-[var(--ink-primary)]">
                {item.label}
              </span>
              <span className="text-[var(--line-strong)]" aria-hidden="true">
                {"//"}
              </span>
              <span className="text-[var(--ink-muted)] group-hover:text-[var(--ink-secondary)] transition-colors">
                {item.detail}
              </span>
            </div>
          </TactilePill>
        ))}
      </div>
    </div>
  );
}
