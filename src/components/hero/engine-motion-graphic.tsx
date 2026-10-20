"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2, FastForward } from "lucide-react";
import { animate, stagger } from "animejs";

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
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showSkip, setShowSkip] = useState<boolean>(false);
  const [evalScore, setEvalScore] = useState<number>(1.8);
  const containerRef = useRef<HTMLDivElement>(null);
  const boardSvgRef = useRef<SVGSVGElement>(null);

  // Check if intro has played this session
  useEffect(() => {
    const hasSeenIntro = typeof window !== "undefined" && sessionStorage.getItem("hero_intro_seen") === "true";

    if (hasSeenIntro) {
      setEvalScore(4.8);
      return;
    }

    setShowSkip(true);

    // 1. Animate Board Lines Draw-in (stroke-dashoffset)
    if (boardSvgRef.current) {
      const lines = boardSvgRef.current.querySelectorAll(".board-draw-line");
      const squares = boardSvgRef.current.querySelectorAll(".board-wave-square");

      lines.forEach((line) => {
        const path = line as SVGLineElement;
        path.style.strokeDasharray = "100";
        path.style.strokeDashoffset = "100";
      });

      animate(lines, {
        strokeDashoffset: [100, 0],
        duration: 900,
        delay: stagger(60),
        ease: "outCubic",
      });

      // 2. Diagonal wave squares fill
      animate(squares, {
        opacity: [0, 0.45],
        duration: 700,
        delay: stagger(40, { grid: [4, 4], from: "first" }),
        ease: "outQuad",
      });
    }

    // 3. Staggered piece nodes rise-in with spring easing
    if (containerRef.current) {
      const nodes = containerRef.current.querySelectorAll(".tactile-piece-node");
      const centerCore = containerRef.current.querySelector(".center-core-hub");

      animate(nodes, {
        opacity: [0, 1],
        translateY: [24, 0],
        scale: [0.65, 1],
        duration: 850,
        delay: stagger(100, { start: 250 }),
        ease: "outBack",
      });

      if (centerCore) {
        animate(centerCore, {
          opacity: [0, 1],
          scale: [0.5, 1],
          duration: 900,
          delay: 150,
          ease: "outBack",
        });
      }
    }

    // 4. Eval counter transition (+1.8 -> +4.8)
    const scoreState = { val: 1.8 };
    animate(scoreState, {
      val: 4.8,
      duration: 1100,
      delay: 350,
      ease: "outExpo",
      onUpdate: () => setEvalScore(Number(scoreState.val.toFixed(1))),
    });

    const timer = setTimeout(() => {
      setShowSkip(false);
      try {
        sessionStorage.setItem("hero_intro_seen", "true");
      } catch {
        // ignore storage errors
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const handleSkipIntro = () => {
    setShowSkip(false);
    setEvalScore(4.8);
    try {
      sessionStorage.setItem("hero_intro_seen", "true");
    } catch {
      // ignore
    }

    if (boardSvgRef.current) {
      const lines = boardSvgRef.current.querySelectorAll(".board-draw-line");
      const squares = boardSvgRef.current.querySelectorAll(".board-wave-square");
      lines.forEach((l) => ((l as SVGLineElement).style.strokeDashoffset = "0"));
      squares.forEach((s) => ((s as SVGRectElement).style.opacity = "0.45"));
    }
    if (containerRef.current) {
      const nodes = containerRef.current.querySelectorAll(".tactile-piece-node");
      nodes.forEach((n) => {
        (n as HTMLElement).style.opacity = "1";
        (n as HTMLElement).style.transform = "none";
      });
    }
  };

  // 3D Pointer tilt (max 6 deg) on desktop + Auto-drift on touch/idle
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: Number((-yPct * 6).toFixed(2)),
      y: Number((xPct * 6).toFixed(2)),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Traveling signal pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase((p) => (p + 1) % 100);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  const selected = ENGINE_NODES.find((n) => n.id === activeNode) || ENGINE_NODES[0];

  const handleNodeClick = (nodeId: string) => {
    setActiveNode(nodeId);
    onSelectNode?.(nodeId);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="w-full rounded-md bg-[var(--bg-chess-card)] border border-[var(--border-chess)] overflow-hidden shadow-2xl relative select-none will-change-transform"
    >
      {/* Skip Intro Control (Visible during initial session play) */}
      {showSkip && (
        <button
          onClick={handleSkipIntro}
          className="absolute top-2 right-2 z-30 px-2 py-1 rounded-xs bg-[var(--bg-chess-dark)]/90 border border-[var(--border-green)] text-[10px] font-mono text-[var(--chess-green)] hover:text-white flex items-center gap-1 cursor-pointer transition-colors shadow-md backdrop-blur-xs"
        >
          <FastForward size={11} />
          <span>Skip intro</span>
        </button>
      )}

      {/* Header Evaluation Bar (Chess.com Style) */}
      <div className="px-4 py-3 bg-[var(--bg-chess-subtle)] border-b border-[var(--border-chess)] flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[var(--chess-green)] ring-2 ring-[var(--chess-green)]/20" />
          <span className="font-bold text-[var(--text-white)] tracking-wide">
            NNUE ENGINE EVALUATION
          </span>
          <span className="text-[var(--text-muted)] hidden sm:inline">•</span>
          <span className="text-[var(--chess-nude)] hidden sm:inline">DEPTH 24</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-xs bg-[var(--chess-green-subtle)] text-[var(--chess-green)] font-bold border border-[var(--chess-green)]/30 text-[11px]">
            +{evalScore} (WINNING TACTIC)
          </span>
          <span className="text-[var(--text-muted)] text-[11px] hidden md:inline">
            ACCURACY: 94.2%
          </span>
        </div>
      </div>

      {/* Main Interactive Motion Stage (Square aspect ratio guarantees 1:1 SVG coordinate alignment) */}
      <div className="relative aspect-square w-full max-w-[420px] mx-auto p-4 flex items-center justify-center bg-radial from-[var(--bg-chess-surface)]/60 to-[var(--bg-chess-card)]">
        {/* Animated Background SVG: Diagonal Wave Squares & Lines */}
        <svg
          ref={boardSvgRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
        >
          <defs>
            <radialGradient id="centerCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#81B64C" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#81B64C" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 4x4 Subtle Diagonal Wave Squares */}
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2, 3].map((c) => {
              const isDark = (r + c) % 2 === 1;
              return (
                <rect
                  key={`${r}-${c}`}
                  x={12.5 + c * 18.75}
                  y={12.5 + r * 18.75}
                  width="18.75"
                  height="18.75"
                  className="board-wave-square"
                  fill={isDark ? "rgba(129, 182, 76, 0.04)" : "rgba(238, 238, 210, 0.02)"}
                  opacity="0.45"
                />
              );
            })
          )}

          {/* Board Grid Lines with stroke-dashoffset */}
          <line x1="25" y1="28" x2="75" y2="28" className="board-draw-line" stroke="rgba(238, 238, 210, 0.12)" strokeWidth="0.4" />
          <line x1="75" y1="28" x2="75" y2="72" className="board-draw-line" stroke="rgba(238, 238, 210, 0.12)" strokeWidth="0.4" />
          <line x1="75" y1="72" x2="25" y2="72" className="board-draw-line" stroke="rgba(238, 238, 210, 0.12)" strokeWidth="0.4" />
          <line x1="25" y1="72" x2="25" y2="28" className="board-draw-line" stroke="rgba(238, 238, 210, 0.12)" strokeWidth="0.4" />

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

          {/* Neural Connector Lines */}
          {ENGINE_NODES.map((node) => {
            const isSelected = node.id === activeNode;
            return (
              <g key={node.id}>
                <line
                  x1="50"
                  y1="50"
                  x2={node.x}
                  y2={node.y}
                  className="board-draw-line"
                  stroke={isSelected ? "#81B64C" : "rgba(238, 238, 210, 0.18)"}
                  strokeWidth={isSelected ? "0.9" : "0.4"}
                  strokeDasharray={isSelected ? undefined : "1, 1"}
                />

                {/* Traveling Energy Pulse */}
                <circle
                  cx={50 + ((node.x - 50) * ((pulsePhase + (node.x > 50 ? 50 : 0)) % 100)) / 100}
                  cy={50 + ((node.y - 50) * ((pulsePhase + (node.x > 50 ? 50 : 0)) % 100)) / 100}
                  r={isSelected ? "1.2" : "0.8"}
                  fill={isSelected ? "#81B64C" : "#EEEED2"}
                  opacity="0.9"
                />
              </g>
            );
          })}
        </svg>

        {/* Central Core Hub */}
        <div className="center-core-hub absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none select-none text-center">
          <div className="w-12 h-12 rounded-full bg-[var(--bg-chess-dark)] border-2 border-[var(--chess-green)] shadow-[0_0_20px_rgba(129,182,76,0.35)] flex items-center justify-center text-lg font-serif font-bold text-[var(--chess-green)] transition-transform duration-700">
            ♚
          </div>
          <span className="font-mono text-[9px] text-[var(--text-white)] font-bold mt-1 uppercase tracking-wider">
            SAHIL PAL
          </span>
          <span className="font-mono text-[8px] text-[var(--chess-green)]">
            AI SYSTEMS
          </span>
        </div>

        {/* 4 Interactive Tactical Nodes with 2-3px Breathing Idle Motion */}
        {ENGINE_NODES.map((node, idx) => {
          const isSelected = node.id === activeNode;
          // Calculate subtle 2-3px breathing float offset
          const breatheOffset = Math.sin((pulsePhase * Math.PI) / 50 + idx) * 2.5;

          return (
            <button
              key={node.id}
              onClick={() => handleNodeClick(node.id)}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: `translate(-50%, calc(-50% + ${breatheOffset}px)) scale(${isSelected ? 1.1 : 1})`,
              }}
              className={`tactile-piece-node absolute z-20 transition-all duration-300 cursor-pointer group flex flex-col items-center btn-tactile ${
                isSelected ? "opacity-100" : "opacity-85 hover:opacity-100"
              }`}
            >
              {/* Node Orb with Soft Shadow */}
              <div
                className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center font-serif text-xl sm:text-2xl transition-all shadow-lg ${
                  isSelected
                    ? "bg-[var(--chess-green)] text-black border-2 border-white shadow-[0_4px_24px_rgba(129,182,76,0.65)]"
                    : "bg-[var(--bg-chess-dark)] text-[var(--chess-nude)] border border-[var(--border-chess-strong)] group-hover:border-[var(--chess-green)] shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
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

      {/* Tactical Quick Switcher Tabs (Responsive on mobile) */}
      <div className="grid grid-cols-4 border-t border-[var(--border-chess)] bg-[var(--bg-chess-subtle)] text-[9px] sm:text-[10px] font-mono">
        {ENGINE_NODES.map((node) => {
          const isSelected = node.id === activeNode;
          return (
            <button
              key={node.id}
              onClick={() => handleNodeClick(node.id)}
              className={`py-2 px-0.5 sm:px-1 text-center transition-colors border-r last:border-r-0 border-[var(--border-chess)] cursor-pointer btn-tactile ${
                isSelected
                  ? "bg-[var(--bg-chess-card)] text-[var(--chess-green)] font-bold border-b-2 border-b-[var(--chess-green)]"
                  : "text-[var(--text-muted)] hover:text-white"
              }`}
            >
              <div className="truncate">
                <span className="font-serif mr-0.5 sm:mr-1">{node.piece}</span>
                <span>{node.name}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Node Telemetry Callout Card */}
      <div className="p-4 bg-[var(--bg-chess-dark)] border-t border-[var(--border-chess)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
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
          className="btn-tactile px-3.5 py-2 rounded-xs bg-[var(--chess-green)] hover:bg-[var(--chess-green-hover)] text-black font-bold font-mono text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-sm"
        >
          <span>VIEW SPEC</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
