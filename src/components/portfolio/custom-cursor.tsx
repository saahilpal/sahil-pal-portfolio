"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only activate on fine-pointer desktop devices
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || isReduced) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let hasMoved = false;

    // Use GSAP quickTo for silky 120fps GPU transform updates
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        gsap.to(cursor, { opacity: 1, duration: 0.2 });
      }

      xTo(clientX);
      yTo(clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("[data-cursor], a, button, input") as HTMLElement | null;
      if (!target) {
        gsap.to(cursor, {
          scale: 1,
          width: 12,
          height: 12,
          backgroundColor: "#E2C974",
          duration: 0.2,
          ease: "power2.out",
        });
        if (textRef.current) textRef.current.textContent = "";
        return;
      }

      const cursorType = target.getAttribute("data-cursor");

      if (cursorType === "download") {
        gsap.to(cursor, {
          scale: 1,
          width: 58,
          height: 58,
          backgroundColor: "#E2C974",
          duration: 0.25,
          ease: "power2.out",
        });
        if (textRef.current) {
          textRef.current.textContent = "PDF ↓";
          gsap.to(textRef.current, { color: "#121315", opacity: 1, duration: 0.15 });
        }
      } else {
        // Subtle magnetic expansion on interactive items
        gsap.to(cursor, {
          scale: 1,
          width: 32,
          height: 32,
          backgroundColor: "rgba(226, 201, 116, 0.25)",
          borderColor: "#E2C974",
          duration: 0.2,
          ease: "power2.out",
        });
        if (textRef.current) textRef.current.textContent = "";
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    /* Clean Minimal Precision Dot Cursor (Zero invasive spotlight / zero screen blend) */
    <div
      ref={cursorRef}
      className="hidden md:flex fixed top-0 left-0 -ml-[6px] -mt-[6px] w-[12px] h-[12px] rounded-full bg-[var(--accent-move)] pointer-events-none z-[9999] items-center justify-center opacity-0 will-change-transform"
      aria-hidden="true"
    >
      <span
        ref={textRef}
        className="text-[9px] font-mono font-black tracking-wider uppercase text-center select-none text-[#121315]"
      />
    </div>
  );
}
