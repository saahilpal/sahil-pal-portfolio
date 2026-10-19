"use client";

import { useEffect, useRef, useState } from "react";
import { isReducedMotion } from "@/lib/anime-motion";

interface NodeItem {
  id: string;
  label: string;
  type: "class" | "func" | "query" | "retrieval" | "output";
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  connections: string[];
}

export function AstCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeMode, setActiveMode] = useState<"ast" | "hybrid" | "budget">("ast");
  const [selectedNode, setSelectedNode] = useState<string>("SynapseEngine");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let isVisible = true;
    const reduced = isReducedMotion();

    // Responsive sizing
    let width = (canvas.width = canvas.parentElement?.clientWidth || 480);
    let height = (canvas.height = 340);

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 340;
    };
    window.addEventListener("resize", resize, { passive: true });

    // Node definitions based on real AST structural indexing
    const baseNodes: NodeItem[] = [
      { id: "SynapseEngine", label: "class SynapseEngine", type: "class", x: width * 0.5, y: height * 0.22, vx: 0.15, vy: 0.1, radius: 8, connections: ["TreeSitterParser", "WALDatabase", "RRFSearcher"] },
      { id: "TreeSitterParser", label: "fn parse_ast()", type: "func", x: width * 0.24, y: height * 0.48, vx: -0.12, vy: 0.08, radius: 6, connections: ["SymbolGraph", "FTS5Index"] },
      { id: "WALDatabase", label: "db sqlite_wal", type: "query", x: width * 0.5, y: height * 0.52, vx: 0.08, vy: -0.1, radius: 7, connections: ["SymbolGraph", "RRFSearcher"] },
      { id: "RRFSearcher", label: "fn rank_fusion()", type: "retrieval", x: width * 0.76, y: height * 0.48, vx: 0.1, vy: 0.14, radius: 6, connections: ["VectorEmbeds", "TokenPacker"] },
      { id: "SymbolGraph", label: "graph call_hierarchy", type: "class", x: width * 0.2, y: height * 0.8, vx: -0.09, vy: -0.07, radius: 5, connections: ["TokenPacker"] },
      { id: "FTS5Index", label: "idx bm25_lexical", type: "query", x: width * 0.38, y: height * 0.82, vx: 0.06, vy: 0.09, radius: 5, connections: ["RRFSearcher"] },
      { id: "VectorEmbeds", label: "vec pgvector_hnsw", type: "retrieval", x: width * 0.62, y: height * 0.82, vx: -0.08, vy: 0.08, radius: 5, connections: ["TokenPacker"] },
      { id: "TokenPacker", label: "mcp token_envelope", type: "output", x: width * 0.82, y: height * 0.78, vx: 0.12, vy: -0.06, radius: 7, connections: [] },
    ];

    const nodes = [...baseNodes];

    // Visibility observer to pause canvas rendering when offscreen
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    observer.observe(canvas);

    // Track mouse for interaction
    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      let found: string | null = null;
      for (const node of nodes) {
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        if (Math.hypot(dx, dy) < node.radius + 10) {
          found = node.id;
          break;
        }
      }
      setHoveredNode(found);
    };

    const handleClick = () => {
      if (hoveredNode) setSelectedNode(hoveredNode);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    let tick = 0;

    const render = () => {
      if (!isVisible) {
        animFrame = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      tick += 0.015;

      const isLight = document.documentElement.classList.contains("light");
      const accentColor = isLight ? "#0958d9" : "#0df2a6";
      const secondaryColor = isLight ? "#5842db" : "#8567ff";
      const lineColor = isLight ? "rgba(9, 88, 217, 0.18)" : "rgba(13, 242, 166, 0.15)";
      const activeLineColor = isLight ? "rgba(9, 88, 217, 0.6)" : "rgba(13, 242, 166, 0.55)";
      const textColor = isLight ? "#414a5d" : "#9ba4b9";

      // Draw Connections
      for (const node of nodes) {
        for (const connId of node.connections) {
          const target = nodes.find((n) => n.id === connId);
          if (!target) continue;

          const isConnectedToSelected = node.id === selectedNode || target.id === selectedNode;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);

          // Subtle bezier curve for organic structural feel
          const cx = (node.x + target.x) / 2 + Math.sin(tick + node.x * 0.01) * 6;
          const cy = (node.y + target.y) / 2 + Math.cos(tick + node.y * 0.01) * 6;
          ctx.quadraticCurveTo(cx, cy, target.x, target.y);

          ctx.strokeStyle = isConnectedToSelected ? activeLineColor : lineColor;
          ctx.lineWidth = isConnectedToSelected ? 1.75 : 1;
          ctx.stroke();

          // Animated pulse along active connections
          if (!reduced && isConnectedToSelected) {
            const progress = (tick * 0.8) % 1;
            const px = (1 - progress) * (1 - progress) * node.x + 2 * (1 - progress) * progress * cx + progress * progress * target.x;
            const py = (1 - progress) * (1 - progress) * node.y + 2 * (1 - progress) * progress * cy + progress * progress * target.y;

            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = accentColor;
            ctx.fill();
          }
        }
      }

      // Draw Nodes
      for (const node of nodes) {
        if (!reduced) {
          node.x += node.vx;
          node.y += node.vy;

          // Boundary bounce with damping
          if (node.x < 30 || node.x > width - 30) node.vx *= -1;
          if (node.y < 25 || node.y > height - 25) node.vy *= -1;

          // Proximity to mouse repulsion
          const mdx = node.x - mouse.x;
          const mdy = node.y - mouse.y;
          const dist = Math.hypot(mdx, mdy);
          if (dist < 60) {
            node.x += (mdx / dist) * 1.5;
            node.y += (mdy / dist) * 1.5;
          }
        }

        const isSelected = node.id === selectedNode;
        const isHovered = node.id === hoveredNode;

        // Outer halo for selected or hovered node
        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 6, 0, Math.PI * 2);
          ctx.fillStyle = isLight ? "rgba(9, 88, 217, 0.12)" : "rgba(13, 242, 166, 0.15)";
          ctx.fill();
          ctx.strokeStyle = isSelected ? accentColor : secondaryColor;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Inner solid core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.type === "class" ? accentColor : node.type === "retrieval" ? secondaryColor : isLight ? "#10121a" : "#f1f3f9";
        ctx.fill();

        // Node label
        ctx.font = "10px monospace";
        ctx.fillStyle = isSelected ? (isLight ? "#0958d9" : "#0df2a6") : textColor;
        ctx.fillText(node.label, node.x + node.radius + 6, node.y + 3);
      }

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      observer.disconnect();
    };
  }, [selectedNode, hoveredNode]);

  return (
    <div className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-sm">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)]/60 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
          <span className="text-[var(--color-text)] font-semibold tracking-wider uppercase text-[11px]">
            SYNAPSE // AST & RETRIEVAL WORKSPACE
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px]">
          <button
            onClick={() => setActiveMode("ast")}
            className={`px-2 py-1 rounded transition-colors ${
              activeMode === "ast"
                ? "bg-[var(--color-accent)] text-[#050608] font-bold"
                : "text-[var(--color-text-dim)] hover:text-[var(--color-text)]"
            }`}
          >
            AST GRAPH
          </button>
          <button
            onClick={() => setActiveMode("hybrid")}
            className={`px-2 py-1 rounded transition-colors ${
              activeMode === "hybrid"
                ? "bg-[var(--color-accent)] text-[#050608] font-bold"
                : "text-[var(--color-text-dim)] hover:text-[var(--color-text)]"
            }`}
          >
            3-LANE RRF
          </button>
          <button
            onClick={() => setActiveMode("budget")}
            className={`px-2 py-1 rounded transition-colors ${
              activeMode === "budget"
                ? "bg-[var(--color-accent)] text-[#050608] font-bold"
                : "text-[var(--color-text-dim)] hover:text-[var(--color-text)]"
            }`}
          >
            TOKEN ENVELOPE
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative w-full h-[340px] bg-[var(--color-bg)] cursor-crosshair">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Blueprint telemetry overlay */}
        <div className="absolute bottom-2.5 left-3 font-mono text-[9px] text-[var(--color-text-dim)] uppercase tracking-wider pointer-events-none flex items-center gap-3">
          <span>NODES: 8 ACTIVE</span>
          <span>•</span>
          <span>LATENCY: &lt; 1.8ms</span>
          <span>•</span>
          <span>MODE: {activeMode.toUpperCase()}</span>
        </div>
        <div className="absolute top-2.5 right-3 font-mono text-[9px] text-[var(--color-text-dim)] pointer-events-none bg-[var(--color-surface)]/80 px-2 py-1 rounded border border-[var(--color-border)]">
          CLICK NODE TO INSPECT
        </div>
      </div>

      {/* Inspector Details Footer */}
      <div className="px-4 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[var(--color-accent)] font-semibold">SELECTED:</span>
          <span className="text-[var(--color-text)] font-bold">{selectedNode}</span>
        </div>
        <div className="text-[11px] text-[var(--color-text-muted)]">
          {selectedNode === "SynapseEngine" && "Core daemon orchestrating parallel parsing, SQLite WAL storage, and MCP server."}
          {selectedNode === "TreeSitterParser" && "Incremental AST grammar extractor compiling function & class hierarchy scopes."}
          {selectedNode === "WALDatabase" && "SQLite Write-Ahead Log state machine enabling lock-free concurrent reads."}
          {selectedNode === "RRFSearcher" && "Reciprocal Rank Fusion merging dense vector scores with sparse BM25 scores."}
          {selectedNode === "SymbolGraph" && "Bidirectional caller/callee reference graph spanning multi-file codebases."}
          {selectedNode === "FTS5Index" && "Lexical full-text index for sub-millisecond exact identifier retrieval."}
          {selectedNode === "VectorEmbeds" && "Dense embedding vectors capturing semantic function intents."}
          {selectedNode === "TokenPacker" && "Model Context Protocol serializer fitting payloads to LLM budget limits."}
        </div>
      </div>
    </div>
  );
}
