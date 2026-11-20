"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PROFILE_CORE } from "@/lib/portfolio-data";
import { sound } from "@/lib/audio";
import { ArrowDown, Copy, Check, ExternalLink, Zap } from "lucide-react";

interface HeroProps {
  onOverclock?: () => void;
}

const SCRAMBLE_GLYPHS = "♔♕♖♗♘01#@$%&*!?<>[]{}";

export function HeroSection({ onOverclock }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [displayName, setDisplayName] = useState("SAHIL PAL");
  const [isOverclocked, setIsOverclocked] = useState(false);
  const pointerPosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const overclockRef = useRef(1);

  // Scramble decode text effect for Line 1
  const triggerScramble = useCallback(() => {
    sound.tick();
    const original = "SAHIL PAL";
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayName(() =>
        original
          .split("")
          .map((char, idx) => {
            if (char === " ") return " ";
            if (idx < iterations) return original[idx];
            return SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
          })
          .join("")
      );
      iterations += 1 / 3;
      if (iterations >= original.length) {
        clearInterval(interval);
        setDisplayName(original);
      }
    }, 30);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_CORE.email);
      sound.tick();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleOverclockClick = () => {
    sound.turnstile();
    setIsOverclocked(true);
    overclockRef.current = 4;
    if (onOverclock) onOverclock();
    setTimeout(() => {
      setIsOverclocked(false);
      overclockRef.current = 1;
    }, 3500);
  };

  // Full-Bleed Cursor-Reactive 3D Polyhedron Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // 3D Polyhedron Vertices (Icosahedron base)
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];
    // Scale vertices
    const scale = Math.min(width, height) * 0.22;
    const vertices = rawVertices.map(([x, y, z]) => [x * scale * 0.6, y * scale * 0.6, z * scale * 0.6]);

    // Edges
    const edges: [number, number][] = [
      [0,1],[0,5],[0,7],[0,10],[0,11],[1,5],[1,7],[1,8],[1,9],[2,3],[2,4],[2,6],[2,10],[2,11],
      [3,4],[3,6],[3,8],[3,9],[4,5],[4,9],[4,11],[5,9],[5,11],[6,7],[6,8],[6,10],[7,8],[7,10],[8,9],[10,11]
    ];

    // Particles system
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }
    const particles: Particle[] = [];

    const spawnParticles = (cx: number, cy: number, count = 24) => {
      sound.thock();
      const colors = ["#CCFF00", "#FF3B30", "#3B82F6", "#F4F4F0"];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 5 * overclockRef.current;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 4,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerPosRef.current.targetX = e.clientX - rect.left;
      pointerPosRef.current.targetY = e.clientY - rect.top;
    };

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      spawnParticles(clickX, clickY, 32);
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    canvas.addEventListener("click", handleCanvasClick);

    // Initial center pointer
    pointerPosRef.current.x = width / 2;
    pointerPosRef.current.y = height / 2;
    pointerPosRef.current.targetX = width / 2;
    pointerPosRef.current.targetY = height / 2;

    let rotX = 0.2;
    let rotY = 0.3;
    let rotZ = 0.1;

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth pointer lerp
      pointerPosRef.current.x += (pointerPosRef.current.targetX - pointerPosRef.current.x) * 0.05;
      pointerPosRef.current.y += (pointerPosRef.current.targetY - pointerPosRef.current.y) * 0.05;

      const px = pointerPosRef.current.x;
      const py = pointerPosRef.current.y;

      // 1. Draw 64px Architectural Grid with Cursor Proximity Illumination
      const gridSize = 64;
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const dx = px - x;
          const dy = py - y;
          const dist = Math.hypot(dx, dy);

          // Grid line tick / crosshair
          const radius = 180;
          if (dist < radius) {
            const intensity = (1 - dist / radius);
            ctx.fillStyle = `rgba(204, 255, 0, ${intensity * 0.9})`;
            ctx.fillRect(x - 2, y - 2, 4, 4);
          } else {
            ctx.fillStyle = "rgba(100, 110, 130, 0.2)";
            ctx.fillRect(x - 1, y - 1, 2, 2);
          }
        }
      }

      // 2. 3D Polyhedron Rotation Physics with Pointer Inertia
      const speedMult = overclockRef.current;
      const tiltX = ((py - height / 2) / height) * 0.008 * speedMult;
      const tiltY = ((px - width / 2) / width) * 0.008 * speedMult;

      rotX += 0.004 * speedMult + tiltX;
      rotY += 0.006 * speedMult + tiltY;
      rotZ += 0.002 * speedMult;

      // Center in upper right or center of hero
      const centerX = width > 1024 ? width * 0.72 : width * 0.5;
      const centerY = height * 0.45;

      // Project vertices
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);

      const projected = vertices.map(([vx, vy, vz]) => {
        // Rotate Y
        const x1 = vx * cosY + vz * sinY;
        const y1 = vy;
        const z1 = -vx * sinY + vz * cosY;

        // Rotate X
        const x2 = x1;
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;

        // Rotate Z
        const x3 = x2 * cosZ - y2 * sinZ;
        const y3 = x2 * sinZ + y2 * cosZ;
        const z3 = z2;

        const fov = 450;
        const pz = z3 + fov;
        const factor = fov / Math.max(10, pz);

        return {
          x: centerX + x3 * factor,
          y: centerY + y3 * factor,
          z: z3,
        };
      });

      // Draw Edges
      ctx.lineWidth = 1.5;
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const avgZ = (p1.z + p2.z) / 2;
        const edgeAlpha = Math.max(0.15, Math.min(0.9, (avgZ + 120) / 240));

        ctx.strokeStyle = overclockRef.current > 1
          ? `rgba(204, 255, 0, ${edgeAlpha})`
          : `rgba(244, 244, 240, ${edgeAlpha * 0.65})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw Vertex Nodes
      projected.forEach((p) => {
        ctx.fillStyle = "#CCFF00";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Update & Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.alpha -= 0.018;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, []);

  return (
    <section
      id="pledge"
      aria-label="Act I — The Pledge"
      className="relative z-10 min-h-[min(94vh,980px)] flex flex-col justify-between pt-6 sm:pt-10 pb-12 sm:pb-16 border-b border-[var(--border-frame)] bg-[var(--canvas)] overflow-hidden"
    >
      {/* Background Interactive HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto cursor-crosshair z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full flex-1 flex flex-col justify-between space-y-8 sm:space-y-12">
        {/* Top Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[var(--accent-lime)]">
            <span>[ACT I // THE PLEDGE]</span>
            <span className="text-[var(--border-frame)]">•</span>
            <span>SYSTEMS EVALUATION &amp; RUNTIME LAB</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold bg-[var(--surface)] border border-[var(--border-frame)] text-[var(--ink-primary)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)] animate-ping" />
              <span>ACTIVE ORACLE // CHESS.COM: SAHILL17</span>
            </span>
          </div>
        </div>

        {/* Hero Central Grid: IMAX 3-Line Title + Product Pitch + Right Telemetry Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2">
          {/* Left Column: 3-Line Monumental Brutalist Title & Pitch */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            <div
              className="space-y-1 sm:space-y-2 select-none cursor-pointer"
              onClick={triggerScramble}
              title="Click to scramble decode"
            >
              {/* Line 1: Solid Ink */}
              <h1 className="text-[12vw] sm:text-[9.5vw] lg:text-[7.8vw] font-[family-name:var(--font-heading)] font-black tracking-[-0.04em] leading-[0.85] text-[var(--ink-primary)] uppercase">
                {displayName}
              </h1>

              {/* Line 2: Hollow 2px Outline Stroke */}
              <div className="text-[12vw] sm:text-[9.5vw] lg:text-[7.8vw] font-[family-name:var(--font-heading)] font-black tracking-[-0.04em] leading-[0.85] outline-text-stroke uppercase">
                BUILDS FAST
              </div>

              {/* Line 3: Solid Acid Lime */}
              <div className="text-[12vw] sm:text-[9.5vw] lg:text-[7.8vw] font-[family-name:var(--font-heading)] font-black tracking-[-0.04em] leading-[0.85] text-[var(--accent-lime)] uppercase">
                AI SYSTEMS.
              </div>
            </div>

            {/* Zero-Slop Product Pitch (Strictly 2 lines) */}
            <p className="max-w-2xl text-base sm:text-xl font-[family-name:var(--font-body)] text-[var(--ink-primary)] leading-relaxed border-l-2 border-[var(--accent-lime)] pl-4">
              Building deterministic guardrails, sub-0.4ms evaluation cascades, and Postgres-native retrieval engines. No speculative wrappers; every system verified against production benchmarks.
            </p>

            {/* CTAs Bar */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <a
                href="#arena"
                onClick={() => sound.thock()}
                className="brutalist-btn brutalist-btn-primary px-4 sm:px-6 py-3 text-xs sm:text-sm"
              >
                <span>♔ ACCEPT CHESS CHALLENGE</span>
              </a>

              <a
                href="#systems"
                onClick={() => sound.tick()}
                className="brutalist-btn px-4 sm:px-5 py-3 text-xs sm:text-sm gap-2"
              >
                <span>INSPECT 4 SYSTEMS</span>
                <ArrowDown className="w-4 h-4 text-[var(--accent-lime)]" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="brutalist-btn px-4 py-3 text-xs sm:text-sm gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[var(--accent-lime)]" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Live Telemetry Card (Nolan Terminal) */}
          <div className="lg:col-span-4 w-full">
            <div className="brutalist-card p-5 sm:p-6 space-y-4 bg-[var(--surface)] text-[var(--ink-primary)] relative">
              <div className="flex items-center justify-between border-b border-[var(--border-frame)] pb-3">
                <span className="text-xs font-mono font-bold tracking-wider text-[var(--accent-lime)] uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-[var(--accent-lime)]" />
                  <span>SYSTEM TELEMETRY</span>
                </span>
                <span className="text-[10px] font-mono text-[var(--ink-muted)]">NODE 01</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center py-1 border-b border-[var(--border-grid)]">
                  <span className="text-[var(--ink-muted)]">FLAGSHIP BUILD:</span>
                  <span className="font-bold text-[var(--accent-lime)]">SYNAPSE MCP (!!)</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-[var(--border-grid)]">
                  <span className="text-[var(--ink-muted)]">LATEST SHIP:</span>
                  <span className="font-bold">PROPEVAL v1.0.0</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-[var(--border-grid)]">
                  <span className="text-[var(--ink-muted)]">CASCADE S1 CPU:</span>
                  <span className="font-bold text-[var(--accent-lime)]">0.36ms · 0.98 OOD F1</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-[var(--border-grid)]">
                  <span className="text-[var(--ink-muted)]">TEST VERIFICATION:</span>
                  <span className="font-bold text-emerald-400">158 / 158 GREEN</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-[var(--ink-muted)]">CHESS.COM:</span>
                  <a
                    href={PROFILE_CORE.chessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[var(--accent-lime)] hover:underline inline-flex items-center gap-1"
                  >
                    <span>SAHILL17</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Overclock 3D Mesh Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleOverclockClick}
                  className={`w-full brutalist-btn py-2 text-xs gap-1.5 transition-all ${
                    isOverclocked
                      ? "bg-[var(--accent-red)] text-white border-[var(--border-frame)]"
                      : "bg-[var(--surface-raised)] text-[var(--accent-lime)]"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{isOverclocked ? "OVERCLOCK ACTIVE (4X)" : "⚡ OVERCLOCK 3D MESH"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Coordinates & Timecode */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--border-frame)] text-xs font-mono text-[var(--ink-muted)]">
          <div className="flex items-center gap-3">
            <span>COORD: 19.0760° N, 72.8777° E (MUMBAI)</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">IMAX 70MM FRAMING</span>
          </div>

          <div className="flex items-center gap-2 text-[var(--accent-lime)] font-bold">
            <span>PRESS [1–4] TO SWITCH SYSTEMS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
