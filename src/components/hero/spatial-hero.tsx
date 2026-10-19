"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Sparkles, Terminal, Copy, Check, FileText, Cpu, Database, Network } from "lucide-react";
import { profile } from "@/lib/portfolio-data";

export function SpatialHero({ onOpenCommandPalette }: { onOpenCommandPalette: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [activeQuery, setActiveQuery] = useState("parse_ast()");
  const [engineLatency, setEngineLatency] = useState(1.4);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.links.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 540);
    let height = (canvas.height = 380);

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 380;
    };
    window.addEventListener("resize", resize, { passive: true });

    // Node definitions for code intelligence visualizer
    const nodes = [
      { id: "core", label: "Synapse Daemon", x: 0.5, y: 0.45, vx: 0.2, vy: 0.15, r: 8, color: "#00f2fe" },
      { id: "treesitter", label: "Tree-sitter AST", x: 0.22, y: 0.3, vx: -0.15, vy: 0.12, r: 6, color: "#a855f7" },
      { id: "sqlite", label: "SQLite WAL Engine", x: 0.3, y: 0.72, vx: 0.1, vy: -0.14, r: 6, color: "#10b981" },
      { id: "vector", label: "pgvector HNSW", x: 0.78, y: 0.32, vx: -0.18, vy: -0.1, r: 6, color: "#4facfe" },
      { id: "rrf", label: "RRF Synthesizer", x: 0.75, y: 0.68, vx: 0.14, vy: 0.16, r: 6, color: "#f59e0b" },
      { id: "mcp", label: "MCP Protocol Server", x: 0.5, y: 0.18, vx: 0.08, vy: 0.18, r: 7, color: "#ec4899" },
    ];

    const links = [
      ["core", "treesitter"],
      ["core", "sqlite"],
      ["core", "vector"],
      ["core", "rrf"],
      ["core", "mcp"],
      ["treesitter", "mcp"],
      ["rrf", "vector"],
      ["sqlite", "rrf"],
    ];

    let t = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.015;

      const isLight = document.documentElement.classList.contains("light");

      // Draw links with animated pulse flow
      for (const [sId, tId] of links) {
        const s = nodes.find((n) => n.id === sId)!;
        const target = nodes.find((n) => n.id === tId)!;

        const sx = s.x * width;
        const sy = s.y * height;
        const tx = target.x * width;
        const ty = target.y * height;

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = isLight ? "rgba(14, 165, 233, 0.18)" : "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Traveling pulse packet
        const progress = (t * 0.75 + s.vx * 3) % 1;
        const px = sx + (tx - sx) * progress;
        const py = sy + (ty - sy) * progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? "#0284c7" : s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw nodes
      for (const n of nodes) {
        n.x += (Math.sin(t + n.vx * 10) * 0.0006);
        n.y += (Math.cos(t + n.vy * 10) * 0.0006);

        const nx = n.x * width;
        const ny = n.y * height;

        // Outer glow halo
        ctx.beginPath();
        ctx.arc(nx, ny, n.r + 7, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? "rgba(2, 132, 199, 0.08)" : `${n.color}15`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(nx, ny, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = isLight ? 4 : 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        ctx.font = "11px var(--font-mono), monospace";
        ctx.fillStyle = isLight ? "#334155" : "#cbd5e1";
        ctx.fillText(n.label, nx + n.r + 8, ny + 3.5);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleQuerySwitch = (query: string, latency: number) => {
    setActiveQuery(query);
    setEngineLatency(latency);
  };

  return (
    <section id="hero" className="relative pt-10 sm:pt-16 pb-16 space-y-12">
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[var(--text-primary)] font-semibold tracking-wide">
            AVAILABLE FOR SOFTWARE &amp; AI SYSTEMS ENGINEERING
          </span>
        </div>

        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-[var(--text-dim)]">
          <Cpu size={12} className="text-cyan-400" />
          <span>BENGALURU, INDIA // UTC+5:30</span>
        </div>
      </div>

      {/* Main Massive Editorial Title */}
      <div className="space-y-6 max-w-4xl">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.02] shimmer-text">
          Architecting{" "}
          <span className="gradient-accent-text">Intelligent Systems</span>{" "}
          at Runtime Scale.
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-secondary)] font-normal leading-relaxed max-w-2xl">
          I am <strong className="text-[var(--text-primary)] font-semibold">Sahil Pal</strong>. I engineer Git-aware code intelligence engines, deterministic RAG pipelines, and high-concurrency backend runtimes that bridge neural models with resilient production software.
        </p>

        {/* Action Array */}
        <div className="flex flex-wrap items-center gap-3.5 pt-2 font-mono text-xs">
          <a
            href="#projects"
            className="px-6 py-3.5 rounded-full bg-white text-slate-950 font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)]"
          >
            <span>Explore Systems</span>
            <ArrowDown size={14} />
          </a>

          <button
            onClick={copyEmail}
            className="px-5 py-3.5 rounded-full glass-card hover:border-cyan-400/50 text-[var(--text-primary)] font-medium flex items-center gap-2 transition-all"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span className="text-emerald-400">Email Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} className="text-[var(--text-dim)]" />
                <span>saahilpal17@gmail.com</span>
              </>
            )}
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[var(--text-secondary)] hover:text-white flex items-center gap-2 transition-all"
          >
            <FileText size={14} />
            <span>Download CV</span>
          </a>
        </div>
      </div>

      {/* Holographic Systems Stage */}
      <div className="w-full rounded-2xl glass-card overflow-hidden border border-white/[0.1] shadow-2xl">
        {/* Stage Header */}
        <div className="px-5 py-3.5 border-b border-white/[0.08] bg-black/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-xs">
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="text-[var(--text-primary)] font-bold tracking-wider text-[11px]">
              SYNAPSE CODE INTELLIGENCE // REAL-TIME RUNTIME
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-dim)]">
            <span>QUERY LATENCY: <strong className="text-cyan-400 font-bold">{engineLatency}ms</strong></span>
            <span>•</span>
            <span className="text-emerald-400">STATUS: O(1) MEMORY</span>
          </div>
        </div>

        {/* Canvas Engine */}
        <div className="relative w-full h-[360px] bg-gradient-to-b from-black/20 to-black/60">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Floating Live Query Trigger Bar */}
          <div className="absolute bottom-4 inset-x-4 sm:inset-x-6 flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 font-mono text-xs">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-[10px] text-[var(--text-dim)] uppercase tracking-wider shrink-0">
                PROBE QUERY:
              </span>
              <button
                onClick={() => handleQuerySwitch("parse_ast()", 1.4)}
                className={`px-2.5 py-1 rounded text-[11px] transition-all shrink-0 ${
                  activeQuery === "parse_ast()"
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                    : "bg-white/[0.06] text-[var(--text-secondary)] hover:text-white"
                }`}
              >
                Tree-sitter AST Graph
              </button>
              <button
                onClick={() => handleQuerySwitch("hybrid_rrf_rank()", 1.9)}
                className={`px-2.5 py-1 rounded text-[11px] transition-all shrink-0 ${
                  activeQuery === "hybrid_rrf_rank()"
                    ? "bg-purple-500 text-white font-bold shadow-sm"
                    : "bg-white/[0.06] text-[var(--text-secondary)] hover:text-white"
                }`}
              >
                3-Lane RRF Fusion
              </button>
              <button
                onClick={() => handleQuerySwitch("mcp_context_pack()", 0.9)}
                className={`px-2.5 py-1 rounded text-[11px] transition-all shrink-0 ${
                  activeQuery === "mcp_context_pack()"
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-sm"
                    : "bg-white/[0.06] text-[var(--text-secondary)] hover:text-white"
                }`}
              >
                MCP Context Packing
              </button>
            </div>

            <div className="hidden md:flex items-center gap-2 text-[10px] text-[var(--text-dim)]">
              <span>INDEXED: 50,000+ SYMBOLS</span>
              <span>•</span>
              <span className="text-cyan-400 font-bold">SQLITE WAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
