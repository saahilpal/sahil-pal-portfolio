"use client";

import { useState, useEffect } from "react";
import { Sparkles, Activity, ShieldCheck, Zap, ArrowRight, Cpu, GitBranch, Database, Smartphone, CheckCircle2 } from "lucide-react";

interface EngineNode {
  id: string;
  piece: string;
  name: string;
  badge: string;
  badgeColor: string;
  metric: string;
  detail: string;
  subsystem: string;
  x: number;
  y: number;
}

const ENGINE_NODES: EngineNode[] = [
  {
    id: "synapse",
    piece: "♗",
    name: "Synapse",
    badge: "BRILLIANT !!",
    badgeColor: "#3AA1DA",
    metric: "94.2% Top-5 Recall",
    detail: "Tree-sitter AST & 3-Lane RRF Fusion",
    subsystem: "Code Intelligence Daemon",
    x: 25,
    y: 28,
  },
  {
    id: "docanalyzer",
    piece: "♖",
    name: "DocAnalyzer",
    badge: "BEST MOVE ★",
    badgeColor: "#81B64C",
    metric: "0% Lock Contention",
    detail: "PostgreSQL SKIP LOCKED Queue & RAG",
    subsystem: "Document Pipeline",
    x: 75,
    y: 28,
  },
  {
    id: "herabilling",
    piece: "♘",
    name: "Hera Billing",
    badge: "GREAT MOVE ✦",
    badgeColor: "#81B64C",
    metric: "0-Paise Math Parity",
    detail: "Offline-First Android ERP & Drive Backup",
    subsystem: "Wholesale POS Engine",
    x: 25,
    y: 72,
  },
  {
    id: "leetsync",
    piece: "♙",
    name: "LeetSync",
    badge: "PROMOTION ♛",
    badgeColor: "#E5B643",
    metric: "Closed Shadow DOM",
    detail: "Manifest V3 & Octokit Vault Sync",
    subsystem: "Developer Tooling",
    x: 75,
    y: 72,
  },
];

export function EngineMotionGraphic({ onSelectNode }: { onSelectNode?: (id: string) => void }) {
  const [activeNode, setActiveNode] = useState<string>("synapse");
  const [pulsePhase, setPulsePhase] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase((p) => (p + 1) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const selected = ENGINE_NODES.find((n) => n.id === activeNode) || ENGINE_NODES[0];

  return (
    <div className="w-full rounded-lg bg-[var(--bg-chess-card)] border border-[var(--border-chess)] overflow-hidden shadow-2xl relative">
      {/* Header Evaluation Bar (Chess.com Style) */}
      <div className="px-4 py-2.5 bg-[var(--bg-chess-subtle)] border-b border-[var(--border-chess)] flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--chess-green)] animate-pulse" />
          <span className="font-bold text-[var(--text-white)] tracking-wide">
            NNUE ENGINE EVALUATION
          </span>
          <span className="text-[var(--text-muted)] hidden sm:inline">•</span>
          <span className="text-[var(--chess-nude)] hidden sm:inline">DEPTH 24</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-xs bg-[var(--chess-green-subtle)] text-[var(--chess-green)] font-bold border border-[var(--chess-green)]/30 text-[11px]">
            +4.8 (WINNING TACTIC)
          </span>
          <span className="text-[var(--text-muted)] text-[11px] hidden md:inline">
            ACCURACY: 94.2%
          </span>
        </div>
      </div>

      {/* Main Interactive Motion Stage */}
      <div className="relative aspect-4/3 sm:aspect-16/10 w-full p-4 flex items-center justify-center bg-radial from-[var(--bg-chess-surface)]/60 to-[var(--bg-chess-card)]">
        {/* Animated Background Vector Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="greenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#81B64C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EEEED2" stopOpacity="0.2" />
            </linearGradient>
            <radialGradient id="centerCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#81B64C" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#81B64C" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Central Core Ambient Glow */}
          <circle cx="50" cy="50" r="22" fill="url(#centerCore)" />
          <circle
            cx="50"
            cy="50"
            r="16"
            fill="none"
            stroke="var(--border-chess-strong)"
            strokeDasharray="2, 2"
          />

          {/* Neural Lines Connecting Core to Nodes */}
          {ENGINE_NODES.map((node) => {
            const isSelected = node.id === activeNode;
            return (
              <g key={node.id}>
                {/* Static hairline connector */}
                <line
                  x1="50"
                  y1="50"
                  x2={node.x}
                  y2={node.y}
                  stroke={isSelected ? "#81B64C" : "rgba(238, 238, 210, 0.15)"}
                  strokeWidth={isSelected ? "0.8" : "0.4"}
                  strokeDasharray={isSelected ? undefined : "1, 1"}
                />

                {/* Traveling Energy Pulse */}
                <circle
                  cx={50 + ((node.x - 50) * ((pulsePhase + (node.x > 50 ? 50 : 0)) % 100)) / 100}
                  cy={50 + ((node.y - 50) * ((pulsePhase + (node.x > 50 ? 50 : 0)) % 100)) / 100}
                  r={isSelected ? "1" : "0.7"}
                  fill={isSelected ? "#81B64C" : "#EEEED2"}
                  opacity="0.9"
                />
              </g>
            );
          })}

          {/* Peripheral Interconnections */}
          <line x1="25" y1="28" x2="75" y2="28" stroke="rgba(238, 238, 210, 0.08)" strokeWidth="0.4" />
          <line x1="75" y1="28" x2="75" y2="72" stroke="rgba(238, 238, 210, 0.08)" strokeWidth="0.4" />
          <line x1="75" y1="72" x2="25" y2="72" stroke="rgba(238, 238, 210, 0.08)" strokeWidth="0.4" />
          <line x1="25" y1="72" x2="25" y2="28" stroke="rgba(238, 238, 210, 0.08)" strokeWidth="0.4" />
        </svg>

        {/* Central Core Evaluation Hub */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none select-none text-center">
          <div className="w-12 h-12 rounded-full bg-[var(--bg-chess-dark)] border-2 border-[var(--chess-green)] shadow-[0_0_20px_rgba(129,182,76,0.3)] flex items-center justify-center text-lg font-serif font-bold text-[var(--chess-green)]">
            ♚
          </div>
          <span className="font-mono text-[9px] text-[var(--text-white)] font-bold mt-1 uppercase tracking-wider">
            SAHIL PAL
          </span>
          <span className="font-mono text-[8px] text-[var(--chess-green)]">
            AI ARCHITECT
          </span>
        </div>

        {/* 4 Interactive Tactical Nodes */}
        {ENGINE_NODES.map((node) => {
          const isSelected = node.id === activeNode;
          return (
            <button
              key={node.id}
              onClick={() => {
                setActiveNode(node.id);
                onSelectNode?.(node.id);
              }}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-200 cursor-pointer group flex flex-col items-center ${
                isSelected ? "scale-110" : "hover:scale-105 opacity-85 hover:opacity-100"
              }`}
            >
              {/* Node Orb */}
              <div
                className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center font-serif text-xl sm:text-2xl transition-all shadow-md ${
                  isSelected
                    ? "bg-[var(--chess-green)] text-black border-2 border-white shadow-[0_0_20px_rgba(129,182,76,0.6)]"
                    : "bg-[var(--bg-chess-dark)] text-[var(--chess-nude)] border border-[var(--border-chess-strong)] group-hover:border-[var(--chess-green)]"
                }`}
              >
                <span>{node.piece}</span>
              </div>

              {/* Node Label Capsule */}
              <div
                className={`mt-1.5 px-2 py-0.5 rounded-xs font-mono text-[10px] font-bold whitespace-nowrap transition-colors border ${
                  isSelected
                    ? "bg-[var(--bg-chess-dark)] text-[var(--chess-green)] border-[var(--chess-green)] shadow-xs"
                    : "bg-[var(--bg-chess-dark)]/90 text-[var(--text-nude)] border-[var(--border-chess)] group-hover:text-white"
                }`}
              >
                {node.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Node Telemetry Callout Card */}
      <div className="p-4 bg-[var(--bg-chess-dark)] border-t border-[var(--border-chess)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className="px-1.5 py-0.5 rounded-xs text-[10px] font-bold"
              style={{ backgroundColor: `${selected.badgeColor}20`, color: selected.badgeColor }}
            >
              {selected.badge}
            </span>
            <span className="font-bold text-sm text-[var(--text-white)] font-serif">
              {selected.name}
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-[var(--chess-nude)]">{selected.subsystem}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--text-muted)]">
            <span className="text-[var(--chess-green)] font-semibold flex items-center gap-1">
              <CheckCircle2 size={12} />
              {selected.metric}
            </span>
            <span>—</span>
            <span>{selected.detail}</span>
          </div>
        </div>

        <button
          onClick={() => {
            const el = document.getElementById(selected.id);
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-3.5 py-2 rounded-xs bg-[var(--chess-green)] hover:bg-[var(--chess-green-hover)] text-black font-bold font-mono text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-sm"
        >
          <span>VIEW SPEC</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
