"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { Sparkles, Compass, Radio, Activity, Zap, Play } from "lucide-react";

type MotionMode = "constellation" | "flowfield" | "gravity";

interface AstNode {
  id: string;
  name: string;
  sub: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  color: string;
  connections: string[];
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

export function ArchitecturalMotionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<MotionMode>("constellation");
  const [fps, setFps] = useState<number>(60);
  const [activeNodeName, setActiveNodeName] = useState<string>("Synapse AST Daemon");
  const [activeNodeDetail, setActiveNodeDetail] = useState<string>(
    "Parallel Tree-sitter CST parsing compiled to SQLite WAL symbol indexes."
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = 0;

    // Handle high-DPI Retina screens
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = 360;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // AST Nodes for Constellation Mode
    const nodes: AstNode[] = [
      { id: "synapse", name: "Synapse AST Daemon", sub: "Parallel Tree-sitter CST traversal on 50k+ symbols", x: width * 0.2, y: height * 0.28, vx: 0.12, vy: 0.08, baseRadius: 7, color: "var(--stamp-blue)", connections: ["wal", "rrf", "mcp"] },
      { id: "wal", name: "SQLite WAL Engine", sub: "PRAGMA synchronous = NORMAL crash-resilient journal", x: width * 0.42, y: height * 0.22, vx: -0.09, vy: 0.11, baseRadius: 6, color: "var(--stamp-green)", connections: ["rrf", "synapse"] },
      { id: "rrf", name: "RRF Fusion Prism", sub: "1/(60+rank) merging sparse BM25 with dense vectors", x: width * 0.35, y: height * 0.58, vx: 0.14, vy: -0.07, baseRadius: 6, color: "var(--stamp-blue)", connections: ["mcp"] },
      { id: "mcp", name: "Model Context Protocol", sub: "Token-budgeted JSON-RPC envelope server for Claude/Cursor", x: width * 0.18, y: height * 0.72, vx: -0.08, vy: -0.1, baseRadius: 6, color: "var(--stamp-red)", connections: [] },
      { id: "queue", name: "SKIP LOCKED Queue", sub: "PostgreSQL row locks preventing worker ingestion race conditions", x: width * 0.65, y: height * 0.28, vx: 0.11, vy: 0.09, baseRadius: 6, color: "var(--stamp-green)", connections: ["embed", "sse"] },
      { id: "embed", name: "Gemini 768d Vector", sub: "Sliding window token chunks with cosine similarity matching", x: width * 0.85, y: height * 0.24, vx: -0.12, vy: 0.08, baseRadius: 6, color: "var(--stamp-blue)", connections: ["sse"] },
      { id: "sse", name: "SSE Stream Engine", sub: "Deterministic citation grounding coordinates streamed in real-time", x: width * 0.75, y: height * 0.62, vx: 0.09, vy: -0.12, baseRadius: 6, color: "var(--stamp-red)", connections: [] },
      { id: "room", name: "Room v13 DB (Hera)", sub: "Offline-first transactional sales & inventory local database", x: width * 0.52, y: height * 0.76, vx: -0.1, vy: 0.07, baseRadius: 7, color: "var(--stamp-green)", connections: ["drive", "parity"] },
      { id: "drive", name: "Daily Drive Worker", sub: "Android WorkManager daily AES encrypted cloud snapshot sync", x: width * 0.68, y: height * 0.82, vx: 0.08, vy: -0.09, baseRadius: 6, color: "var(--stamp-blue)", connections: [] },
      { id: "parity", name: "Even-Parity Math", sub: "Hare-Niemeyer Largest Remainder (r*q)%2==0 zero-roundoff", x: width * 0.4, y: height * 0.85, vx: -0.07, vy: -0.11, baseRadius: 6, color: "var(--stamp-red)", connections: [] },
      { id: "shadow", name: "Shadow DOM (LeetSync)", sub: "Isolated CSS context avoiding LeetCode Monaco editor pollution", x: width * 0.88, y: height * 0.72, vx: 0.1, vy: 0.1, baseRadius: 6, color: "var(--stamp-blue)", connections: ["octokit"] },
      { id: "octokit", name: "Octokit Contents API", sub: "Direct GitHub API commit tree creation for DSA problem vault", x: width * 0.82, y: height * 0.88, vx: -0.09, vy: -0.08, baseRadius: 6, color: "var(--stamp-green)", connections: [] },
    ];

    // Flow Field Particles
    const flowParticles: Particle[] = Array.from({ length: 180 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: Math.random() * 100,
      maxLife: 80 + Math.random() * 80,
      color: Math.random() > 0.6 ? "var(--stamp-blue)" : Math.random() > 0.3 ? "var(--stamp-red)" : "var(--text-ink)",
    }));

    // Mouse Tracking
    const mouse = { x: -1000, y: -1000, prevX: -1000, prevY: -1000, vx: 0, vy: 0, isDown: false };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const curX = e.clientX - rect.left;
      const curY = e.clientY - rect.top;

      mouse.vx = curX - mouse.prevX;
      mouse.vy = curY - mouse.prevY;
      mouse.prevX = mouse.x = curX;
      mouse.prevY = mouse.y = curY;

      // Check hover on nodes
      for (const n of nodes) {
        const dist = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (dist < n.baseRadius + 14) {
          setActiveNodeName(n.name);
          setActiveNodeDetail(n.sub);
          break;
        }
      }
    };

    const onMouseDown = () => {
      mouse.isDown = true;
      // Shockwave burst on click
      for (const n of nodes) {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < 220) {
          const force = (220 - dist) / 18;
          n.vx += (dx / dist) * force;
          n.vy += (dy / dist) * force;
        }
      }
    };

    const onMouseUp = () => {
      mouse.isDown = false;
    };

    canvas.addEventListener("mousemove", onMouseMove, { passive: true });
    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    let tick = 0;

    const render = (time: number) => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      // FPS Calculation
      frameCount++;
      if (time - fpsTimer >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        fpsTimer = time;
      }

      ctx.clearRect(0, 0, width, height);
      tick += 0.012;

      // Mode 1: AST Constellation Graph
      if (mode === "constellation") {
        // Draw Connecting Lines
        for (const n of nodes) {
          for (const targetId of n.connections) {
            const target = nodes.find((t) => t.id === targetId);
            if (!target) continue;

            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            const cx = (n.x + target.x) / 2 + Math.sin(tick + n.x * 0.01) * 8;
            const cy = (n.y + target.y) / 2 + Math.cos(tick + n.y * 0.01) * 8;
            ctx.quadraticCurveTo(cx, cy, target.x, target.y);

            ctx.strokeStyle = "rgba(209, 199, 183, 0.45)";
            ctx.lineWidth = 1;
            ctx.stroke();

            // Animated light packet traveling on the curve
            const progress = (tick * 0.7 + (n.x % 10) * 0.1) % 1;
            const px = (1 - progress) * (1 - progress) * n.x + 2 * (1 - progress) * progress * cx + progress * progress * target.x;
            const py = (1 - progress) * (1 - progress) * n.y + 2 * (1 - progress) * progress * cy + progress * progress * target.y;

            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fillStyle = n.color;
            ctx.fill();
          }
        }

        // Draw and update Nodes
        for (const n of nodes) {
          // Physics movement
          n.x += n.vx;
          n.y += n.vy;

          // Damping & screen bounding
          n.vx *= 0.985;
          n.vy *= 0.985;

          if (n.x < 30 || n.x > width - 30) n.vx *= -1;
          if (n.y < 30 || n.y > height - 30) n.vy *= -1;

          // Mouse proximity attraction/repulsion
          const mdx = n.x - mouse.x;
          const mdy = n.y - mouse.y;
          const mDist = Math.hypot(mdx, mdy);
          if (mDist < 90 && mDist > 0) {
            n.vx += (mdx / mDist) * 0.35;
            n.vy += (mdy / mDist) * 0.35;
          }

          // Outer ring
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.baseRadius + 4, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(20, 19, 18, 0.15)";
          ctx.lineWidth = 1;
          ctx.stroke();

          // Node Core
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.baseRadius, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.fill();

          // Node Text Label
          ctx.font = "bold 9px monospace";
          ctx.fillStyle = "var(--text-ink)";
          ctx.fillText(n.name, n.x + n.baseRadius + 6, n.y + 3);
        }
      }

      // Mode 2: Flow Field Particles
      else if (mode === "flowfield") {
        for (const p of flowParticles) {
          p.life++;
          if (p.life > p.maxLife || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
            p.x = Math.random() * width;
            p.y = Math.random() * height;
            p.life = 0;
          }

          // Angle from computational noise/vector field
          const angle = Math.sin(p.x * 0.005 + tick) * Math.cos(p.y * 0.005 + tick) * Math.PI * 2;
          p.vx += Math.cos(angle) * 0.18;
          p.vy += Math.sin(angle) * 0.18;

          // Mouse magnetic pull
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mDist = Math.hypot(mdx, mdy);
          if (mDist < 140 && mDist > 0) {
            p.vx += (mdx / mDist) * 0.45;
            p.vy += (mdy / mDist) * 0.45;
          }

          p.vx *= 0.94;
          p.vy *= 0.94;
          p.x += p.vx;
          p.y += p.vy;

          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
      }

      // Mode 3: Gravity Simulator
      else if (mode === "gravity") {
        for (const n of nodes) {
          // Gravity pull down
          n.vy += 0.18;
          n.x += n.vx;
          n.y += n.vy;

          // Bounce floor
          if (n.y > height - n.baseRadius - 10) {
            n.y = height - n.baseRadius - 10;
            n.vy *= -0.78;
            n.vx *= 0.96;
          }
          if (n.x < n.baseRadius + 10 || n.x > width - n.baseRadius - 10) {
            n.vx *= -0.8;
          }

          // Fling with mouse
          const mdx = n.x - mouse.x;
          const mdy = n.y - mouse.y;
          const mDist = Math.hypot(mdx, mdy);
          if (mDist < 70 && mouse.isDown) {
            n.vx += mouse.vx * 0.4;
            n.vy += mouse.vy * 0.4 - 1;
          }

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.baseRadius + 2, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.fill();
          ctx.strokeStyle = "var(--border-paper-strong)";
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.font = "bold 9px monospace";
          ctx.fillStyle = "var(--text-ink)";
          ctx.fillText(n.name, n.x + n.baseRadius + 6, n.y + 3);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      observer.disconnect();
    };
  }, [mode]);

  return (
    <div className="paper-sheet rounded-sm overflow-hidden bg-[var(--bg-card)] shadow-md space-y-0 relative">
      {/* Top Telemetry Control Strip */}
      <div className="p-3.5 border-b border-[var(--border-paper)] bg-[var(--bg-card-draft)] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Activity size={13} className="text-[var(--stamp-red)] animate-pulse" />
          <span className="font-bold text-[var(--text-ink)] uppercase tracking-wider text-[11px]">
            ARCHITECTURAL DYNAMICS ENGINE
          </span>
          <span className="text-[10px] text-[var(--text-ink-muted)]">
            // {fps} FPS 60Hz
          </span>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1.5 font-mono text-[10px]">
          <button
            onClick={() => setMode("constellation")}
            className={`px-2.5 py-1 rounded-xs border transition-all ${
              mode === "constellation"
                ? "bg-[var(--text-ink)] text-[var(--bg-paper)] border-[var(--text-ink)] font-bold shadow-xs"
                : "bg-[var(--bg-card)] border-[var(--border-paper)] text-[var(--text-ink-secondary)] hover:border-[var(--border-paper-strong)]"
            }`}
          >
            01. AST CONSTELLATION
          </button>
          <button
            onClick={() => setMode("flowfield")}
            className={`px-2.5 py-1 rounded-xs border transition-all ${
              mode === "flowfield"
                ? "bg-[var(--text-ink)] text-[var(--bg-paper)] border-[var(--text-ink)] font-bold shadow-xs"
                : "bg-[var(--bg-card)] border-[var(--border-paper)] text-[var(--text-ink-secondary)] hover:border-[var(--border-paper-strong)]"
            }`}
          >
            02. VECTOR FLOW FIELD
          </button>
          <button
            onClick={() => setMode("gravity")}
            className={`px-2.5 py-1 rounded-xs border transition-all ${
              mode === "gravity"
                ? "bg-[var(--text-ink)] text-[var(--bg-paper)] border-[var(--text-ink)] font-bold shadow-xs"
                : "bg-[var(--bg-card)] border-[var(--border-paper)] text-[var(--text-ink-secondary)] hover:border-[var(--border-paper-strong)]"
            }`}
          >
            03. GRAVITY SIMULATOR
          </button>
        </div>
      </div>

      {/* Interactive Canvas Viewport */}
      <div className="relative w-full h-[360px] bg-[var(--bg-card)] cursor-crosshair overflow-hidden select-none">
        <canvas ref={canvasRef} className="block w-full h-full" />

        {/* Blueprint Watermark Instructions */}
        <div className="absolute top-3 right-3 font-mono text-[9px] text-[var(--text-ink-muted)] pointer-events-none bg-[var(--bg-card)]/90 px-2 py-1 rounded-xs border border-[var(--border-paper)] shadow-xs">
          MOVE POINTER TO ATTRACT • CLICK FOR SHOCKWAVE PULSE
        </div>

        {/* Bottom Coordinates & Node HUD */}
        <div className="absolute bottom-3 left-4 font-mono text-[10px] pointer-events-none flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--stamp-green)] animate-ping" />
          <span className="font-bold text-[var(--text-ink)]">{activeNodeName}:</span>
          <span className="text-[var(--text-ink-muted)] hidden sm:inline">{activeNodeDetail}</span>
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="px-4 py-2.5 border-t border-[var(--border-paper)] bg-[var(--bg-card-draft)] flex flex-wrap items-center justify-between text-[11px] font-mono text-[var(--text-ink-muted)]">
        <div>12 DISTRIBUTED NODES • BIDIRECTIONAL BEZIERS • ZERO EXTERNAL PHYSICS LIBS</div>
        <div className="text-[var(--stamp-green)] font-semibold">ALL NODES GROUNDED IN PRODUCTION REPOS</div>
      </div>
    </div>
  );
}
