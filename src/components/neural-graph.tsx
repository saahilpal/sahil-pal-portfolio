"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  ox: number; // origin x (for drift)
  oy: number; // origin y
  vx: number;
  vy: number;
  radius: number;
  phase: number; // for organic drift
  isHero?: boolean; // special glowing node
  latched?: boolean; // currently hooked to cursor
}

export function NeuralGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const count = isTouch ? 40 : 100; // Minimalist count for a cleaner look
    const connectDist = isTouch ? 90 : 130;
    const fps = isTouch ? 30 : 60; 
    const interval = 1000 / fps;

    // Mouse interaction config
    const mouseRadius = 300; 
    const mouseForce = 0.05; 
    const returnForce = 0.025; 
    const cursorConnectDist = 140; 
    const breakDist = 240; 
    const repulsionForce = 45; 
    const repulsionRadius = 80; 
    const maxLatched = 6; // Very limited latching for extreme cleanliness

    let w = 0;
    let h = 0;
    const particles: Particle[] = [];

    // Smoothed mouse position
    const mouse = { x: -1000, y: -1000, active: false };
    const smoothMouse = { x: -1000, y: -1000 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-seed origins on resize
      for (const p of particles) {
        p.ox = Math.random() * w;
        p.oy = Math.random() * h;
      }
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Initialize particles with organic variety
    for (let i = 0; i < count; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const sizeBase = Math.random();
      particles.push({
        x,
        y,
        ox: x,
        oy: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: sizeBase < 0.7 ? 0.8 + Math.random() * 0.4 : 1.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        isHero: sizeBase > 0.92, 
      });
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };
    // Touch support
    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (touch) {
        mouse.x = touch.clientX - rect.left;
        mouse.y = touch.clientY - rect.top;
        mouse.active = true;
      }
    };
    const handleTouchEnd = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    let raf = 0;
    let last = 0;
    let time = 0;

    // Theme-reactive color and density
    const getThemeConfig = () => {
      const isLight = document.documentElement.classList.contains("light");
      const style = getComputedStyle(document.documentElement);
      return {
        color: style.getPropertyValue("--neural-color").trim() || "0, 255, 65",
        opacityScale: isLight ? 0.7 : 1.0, // Increased for better visibility in light mode
        lineWidthScale: isLight ? 0.8 : 1.0,
      };
    };
    let themeConfig = getThemeConfig();

    const observer = new MutationObserver(() => {
      themeConfig = getThemeConfig();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (now - last < interval) return;
      last = now - ((now - last) % interval);
      time += 0.008;

      ctx.clearRect(0, 0, w, h);

      // Lerp smoothed mouse position
      const lerpFactor = mouse.active ? 0.08 : 0.03;
      smoothMouse.x += (mouse.x - smoothMouse.x) * lerpFactor;
      smoothMouse.y += (mouse.y - smoothMouse.y) * lerpFactor;

      // ── Update particles ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Organic drift
        p.ox += Math.sin(time + p.phase) * 0.12;
        p.oy += Math.cos(time * 0.8 + p.phase) * 0.1;

        // Wrap origins
        if (p.ox < -50) p.ox = w + 50;
        if (p.ox > w + 50) p.ox = -50;
        if (p.oy < -50) p.oy = h + 50;
        if (p.oy > h + 50) p.oy = -50;

        // 2. Mouse parallax + Elastic Latching
        const dxM = smoothMouse.x - p.x;
        const dyM = smoothMouse.y - p.y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);

        let fx = (p.ox - p.x) * returnForce;
        let fy = (p.oy - p.y) * returnForce;

        if (mouse.active) {
          // Latching logic with strict limit
          const currentlyLatched = particles.filter(p => p.latched);
          
          if (!p.latched && distM < cursorConnectDist && currentlyLatched.length < maxLatched) {
            p.latched = true;
          } else if (p.latched && distM > breakDist) {
            p.latched = false;
          }

          if (p.latched) {
            // Precise elastic force
            const elasticConst = 0.02;
            fx += dxM * elasticConst;
            fy += dyM * elasticConst;
          } else if (distM < mouseRadius * 0.5) {
            // Subtle pull for unlatched nodes in inner circle
            const force = (1 - distM / (mouseRadius * 0.5)) * mouseForce;
            fx += (dxM / distM) * force;
            fy += (dyM / distM) * force;
          }
        } else {
          p.latched = false;
        }

        p.vx += fx;
        p.vy += fy;
        
        // High friction for premium feel
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;
      }

      // ── Draw connections ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Draw elastic cursor connections (The "Web")
        if (p.latched && mouse.active) {
          const dx = smoothMouse.x - p.x;
          const dy = smoothMouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const stretch = dist / breakDist;
          // Fade out as it stretches
          const alpha = Math.max(0, (1 - stretch) * 0.4) * themeConfig.opacityScale;
          
          if (alpha > 0.01) {
            ctx.strokeStyle = `rgba(${themeConfig.color}, ${alpha})`;
            ctx.lineWidth = 1.0 * themeConfig.lineWidthScale;
            ctx.beginPath();
            ctx.moveTo(smoothMouse.x, smoothMouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }

        // 2. Draw node-to-node connections (The "Constellation")
        // Only visible when NEAR the cursor for maximum cleanliness
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          
          if (d2 < connectDist * connectDist) {
            const d = Math.sqrt(d2);
            
            // Interaction: Only show connections near the searchlight
            const midX = (p.x + q.x) / 2;
            const midY = (p.y + q.y) / 2;
            const dxC = smoothMouse.x - midX;
            const dyC = smoothMouse.y - midY;
            const distC = Math.sqrt(dxC * dxC + dyC * dyC);
            
            if (mouse.active && distC < mouseRadius) {
              const proximity = 1 - distC / mouseRadius;
              const alpha = (1 - d / connectDist) * 0.15 * proximity * themeConfig.opacityScale;
              
              if (alpha > 0.01) {
                ctx.strokeStyle = `rgba(${themeConfig.color}, ${alpha})`;
                ctx.lineWidth = 0.4 * themeConfig.lineWidthScale;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.stroke();
              }
            }
          }
        }
      }

      // ── Draw nodes ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let nodeAlpha = (p.isHero ? 0.4 : 0.2) * themeConfig.opacityScale;
        let nodeSize = p.radius + (p.isHero ? Math.sin(time * 2 + p.phase) * 0.5 : 0);

        if (mouse.active) {
          const dx = smoothMouse.x - p.x;
          const dy = smoothMouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius) {
            const proximity = 1 - dist / mouseRadius;
            nodeAlpha += proximity * 0.6 * themeConfig.opacityScale;
            nodeSize += proximity * 1.5;
            
            if (proximity > 0.6 || p.isHero) {
               ctx.shadowBlur = 10 * themeConfig.opacityScale;
               ctx.shadowColor = `rgba(${themeConfig.color}, 0.5)`;
            }
          }
        }

        ctx.fillStyle = `rgba(${themeConfig.color}, ${nodeAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const cleanup = init();
    return cleanup;
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
