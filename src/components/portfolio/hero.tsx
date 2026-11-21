"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PROFILE_CORE } from "@/lib/portfolio-data";
import { sound } from "@/lib/audio";
import { ArrowDown, Copy, Check } from "lucide-react";

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
  noteName: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [namePulse, setNamePulse] = useState(false);
  const [identityStatus, setIdentityStatus] = useState<string | null>(null);
  const [scrollSkew, setScrollSkew] = useState(0);

  const pointerPosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const shockwavesRef = useRef<Shockwave[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  // Scroll Velocity Skew (spring-damped clamp between -4deg and 4deg)
  useEffect(() => {
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let animFrame: number;

    const handleScroll = () => {
      const now = performance.now();
      const dt = Math.max(16, now - lastTime);
      const dy = window.scrollY - lastY;
      const velocity = dy / dt; // px per ms
      const targetSkew = Math.max(-4, Math.min(4, velocity * 2.5));
      setScrollSkew(targetSkew);
      lastY = window.scrollY;
      lastTime = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const damp = () => {
      setScrollSkew((prev) => (Math.abs(prev) > 0.05 ? prev * 0.88 : 0));
      animFrame = requestAnimationFrame(damp);
    };
    animFrame = requestAnimationFrame(damp);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  // Tactile Hardware Stamp on Name Click
  const handleNameClick = useCallback(() => {
    sound.pulse();
    setNamePulse(true);
    setIdentityStatus("IDENTITY // SAHIL PAL // SYSTEMS ARCHITECT");
    setTimeout(() => setNamePulse(false), 500);
    setTimeout(() => setIdentityStatus(null), 2800);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_CORE.email);
      sound.relay();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  // Full-Bleed Cursor-Reactive 3D Polyhedron & Pocket Operator Canvas Engine
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
    // Scale vertices with generous proportions
    const scale = Math.min(width, height) * 0.24;
    const vertices = rawVertices.map(([x, y, z]) => [x * scale * 0.62, y * scale * 0.62, z * scale * 0.62]);

    // Edges
    const edges: [number, number][] = [
      [0,1],[0,5],[0,7],[0,10],[0,11],[1,5],[1,7],[1,8],[1,9],[2,3],[2,4],[2,6],[2,10],[2,11],
      [3,4],[3,6],[3,8],[3,9],[4,5],[4,9],[4,11],[5,9],[5,11],[6,7],[6,8],[6,10],[7,8],[7,10],[8,9],[10,11]
    ];

    const spawnBeatEffect = (cx: number, cy: number, noteName: string) => {
      const colors = ["#CCFF00", "#FF3B30", "#3B82F6", "#F4F4F0"];
      const hitColor = colors[Math.floor(Math.random() * colors.length)];

      // Shockwave ring
      shockwavesRef.current.push({
        x: cx,
        y: cy,
        radius: 6,
        maxRadius: 72,
        alpha: 1,
        color: hitColor,
        noteName,
      });

      // Small particle spray
      for (let i = 0; i < 18; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 4.5;
        particlesRef.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 3,
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
      const normX = clickX / width;
      const normY = clickY / height;
      const note = sound.spatialBeat(normX, normY);
      spawnBeatEffect(clickX, clickY, note.name);
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
      const radius = 200;

      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const dx = px - x;
          const dy = py - y;
          const dist = Math.hypot(dx, dy);

          if (dist < radius) {
            const intensity = 1 - dist / radius;
            ctx.fillStyle = `rgba(204, 255, 0, ${intensity * 0.9})`;
            ctx.fillRect(x - 2, y - 2, 4, 4);
          } else {
            ctx.fillStyle = "rgba(100, 110, 130, 0.2)";
            ctx.fillRect(x - 1, y - 1, 2, 2);
          }
        }
      }

      // 2. 3D Polyhedron Rotation Physics with Pointer Inertia
      const tiltX = ((py - height / 2) / height) * 0.007;
      const tiltY = ((px - width / 2) / width) * 0.007;

      rotX += 0.004 + tiltX;
      rotY += 0.006 + tiltY;
      rotZ += 0.002;

      // Position in the upper-right quadrant on desktop, centered on mobile
      const centerX = width > 1024 ? width * 0.74 : width * 0.5;
      const centerY = width > 1024 ? height * 0.44 : height * 0.35;

      // Project vertices
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);

      const projected = vertices.map(([vx, vy, vz]) => {
        const x1 = vx * cosY + vz * sinY;
        const y1 = vy;
        const z1 = -vx * sinY + vz * cosY;

        const x2 = x1;
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;

        const x3 = x2 * cosZ - y2 * sinZ;
        const y3 = x2 * sinZ + y2 * cosZ;
        const z3 = z2;

        const fov = 460;
        const pz = z3 + fov;
        const beatPulse = sound.getBeatPulse();
        const factor = (fov / Math.max(10, pz)) * (1 + beatPulse * 0.14);

        return {
          x: centerX + x3 * factor,
          y: centerY + y3 * factor,
          z: z3,
        };
      });

      // Draw Edges with Audio-Reactive Intensity
      const beatPulse = sound.getBeatPulse();
      ctx.lineWidth = 1.5 + beatPulse * 1.5;
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const avgZ = (p1.z + p2.z) / 2;
        const edgeAlpha = Math.max(0.18, Math.min(0.85, (avgZ + 120) / 240));

        ctx.strokeStyle = beatPulse > 0.5
          ? `rgba(204, 255, 0, ${edgeAlpha * 0.9})`
          : `rgba(244, 244, 240, ${edgeAlpha * 0.65})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw Vertex Nodes with Audio Flare
      projected.forEach((p) => {
        ctx.fillStyle = beatPulse > 0.5 ? "#00E5FF" : "#CCFF00";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5 + beatPulse * 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw & Update Shockwave Beat Rings
      for (let i = shockwavesRef.current.length - 1; i >= 0; i--) {
        const sw = shockwavesRef.current[i];
        sw.radius += 3;
        sw.alpha -= 0.035;

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwavesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = sw.color;
        ctx.globalAlpha = sw.alpha;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Note label floating above ring
        ctx.font = "bold 12px 'JetBrains Mono', monospace";
        ctx.fillStyle = sw.color;
        ctx.fillText(sw.noteName, sw.x - 8, sw.y - sw.radius * 0.5);
        ctx.restore();
      }

      // 4. Update & Draw Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.alpha -= 0.022;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
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
      {/* Background Interactive HTML5 Canvas (Spatial Beat Pad + 3D Mesh) */}
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
            <span>EXPLORING AI &amp; BUILDING SYSTEMS</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold bg-[var(--surface)] border border-[var(--border-frame)] text-[var(--ink-primary)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)] animate-ping" />
              <span>ACTIVE ORACLE // CHESS.COM: SAHILL17</span>
            </span>
          </div>
        </div>

        {/* Hero Central Space: Oversized 3-Line Monumental Title + Product Pitch + Clean Breathing Room */}
        <div className="max-w-4xl space-y-6 sm:space-y-8 pt-4 sm:pt-8">
          <div
            className="space-y-1 sm:space-y-2 select-none cursor-pointer group"
            onClick={handleNameClick}
            title="Sahil Pal — Click to verify identity"
            style={{
              transform: `skewX(${scrollSkew}deg)`,
              transition: "transform 0.12s ease-out",
            }}
          >
            {/* Line 1: Solid Ink with subtle mechanical tactile interaction */}
            <div className="relative inline-block">
              <h1
                className={`text-[12vw] sm:text-[9.5vw] lg:text-[7.6vw] font-[family-name:var(--font-heading)] font-black tracking-[-0.04em] leading-[0.85] text-[var(--ink-primary)] uppercase transition-all duration-200 ${
                  namePulse
                    ? "scale-[0.98] text-[var(--accent-lime)] drop-shadow-[0_0_24px_rgba(204,255,0,0.5)]"
                    : "group-hover:text-[var(--accent-lime)]"
                }`}
              >
                SAHIL PAL
              </h1>
              {identityStatus && (
                <div className="absolute -bottom-6 left-0 text-[10px] font-mono font-bold text-[var(--accent-lime)] bg-[var(--surface-raised)] border border-[var(--accent-lime)] px-2 py-0.5 shadow-[2px_2px_0px_var(--border-frame)] z-20 animate-in fade-in slide-in-from-top-1">
                  {identityStatus}
                </div>
              )}
            </div>

            {/* Line 2: Hollow 2px Outline Stroke */}
            <div className="text-[12vw] sm:text-[9.5vw] lg:text-[7.6vw] font-[family-name:var(--font-heading)] font-black tracking-[-0.04em] leading-[0.85] outline-text-stroke uppercase">
              BUILDS FAST
            </div>

            {/* Line 3: Solid Acid Lime */}
            <div className="text-[12vw] sm:text-[9.5vw] lg:text-[7.6vw] font-[family-name:var(--font-heading)] font-black tracking-[-0.04em] leading-[0.85] text-[var(--accent-lime)] uppercase">
              AI SYSTEMS.
            </div>
          </div>

          {/* Simple, Human-First Summary */}
          <p className="max-w-2xl text-base sm:text-xl font-[family-name:var(--font-body)] text-[var(--ink-primary)] leading-relaxed border-l-2 border-[var(--accent-lime)] pl-4">
            I love solving problems, exploring AI, and building software that runs fast and just works. Big fan of clean code, simple architecture, and good chess.
          </p>

          {/* CTAs Bar */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <a
              href="#arena"
              onClick={() => sound.chessMove(4)}
              className="brutalist-btn brutalist-btn-primary px-4 sm:px-6 py-3 text-xs sm:text-sm"
            >
              <span>♔ ACCEPT CHESS CHALLENGE</span>
            </a>

            <a
              href="#systems"
              onClick={() => sound.relay()}
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

        {/* Bottom Coordinates & Timecode */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--border-frame)] text-xs font-mono text-[var(--ink-muted)]">
          <div className="flex items-center gap-3">
            <span>COORD: 19.0760° N, 72.8777° E (MUMBAI)</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">IMAX 70MM FRAMING</span>
          </div>

          <div className="flex items-center gap-2 text-[var(--accent-lime)] font-bold">
            <span className="hidden sm:inline">SYSTEMS [1–4] • COMMAND [⌘K] •</span>
            <span>PRESS [1–4] SYSTEMS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
