"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

export function DraftingCursor() {
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const ringRef = useRef<SVGSVGElement>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on non-touch devices with fine pointers
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let rot = 0;
    const onMouseMove = (e: MouseEvent) => {
      setVisible(true);
      setCoords({ x: e.clientX, y: e.clientY });

      rot = (rot + 1.2) % 360;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) rotate(${rot}deg)`;
      }
      if (crosshairRef.current) {
        crosshairRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      // Create tactile ink ripple effect
      const ripple = document.createElement("div");
      ripple.className = "fixed pointer-events-none rounded-full border border-[var(--stamp-red)] z-50";
      ripple.style.left = `${e.clientX - 15}px`;
      ripple.style.top = `${e.clientY - 15}px`;
      ripple.style.width = "30px";
      ripple.style.height = "30px";
      document.body.appendChild(ripple);

      animate(ripple, {
        scale: [1, 2.5],
        opacity: [0.8, 0],
        duration: 450,
        ease: "outCubic",
        onComplete: () => ripple.remove(),
      });
    };

    const onMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden hidden md:block">
      {/* Floating Animated Compass Reticle */}
      <svg
        ref={ringRef}
        className="fixed top-0 left-0 -ml-6 -mt-6 w-12 h-12 text-[var(--border-paper-strong)] opacity-60 transition-opacity duration-200"
        viewBox="0 0 48 48"
        fill="none"
      >
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
        <line x1="24" y1="0" x2="24" y2="4" stroke="currentColor" strokeWidth="1" />
        <line x1="24" y1="44" x2="24" y2="48" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="24" x2="4" y2="24" stroke="currentColor" strokeWidth="1" />
        <line x1="44" y1="24" x2="48" y2="24" stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Crosshair Center Point & Live Drafting Coordinates */}
      <div
        ref={crosshairRef}
        className="fixed top-0 left-0 pointer-events-none transition-opacity duration-200"
      >
        <div className="w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-[var(--stamp-red)] opacity-75" />
        <div className="ml-4 mt-2 px-1.5 py-0.5 rounded-xs bg-[var(--bg-paper)]/90 border border-[var(--border-paper)] font-mono text-[9px] text-[var(--text-ink-muted)] shadow-xs select-none whitespace-nowrap">
          X:{coords.x} Y:{coords.y}
        </div>
      </div>
    </div>
  );
}
