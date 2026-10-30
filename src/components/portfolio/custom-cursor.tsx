"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on fine-pointer desktop devices with mouse input
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || isReduced) {
      return;
    }

    const cursor = cursorRef.current;
    const spotlight = spotlightRef.current;
    if (!cursor) return;

    let hasMoved = false;

    // Use GSAP quickTo for 60-120fps GPU transform updates
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        gsap.to(cursor, { opacity: 1, duration: 0.25 });
        if (spotlight) {
          gsap.to(spotlight, { opacity: 1, duration: 0.3 });
        }
      }

      // Update CSS variables for radial font illumination
      document.documentElement.style.setProperty("--mouse-x", `${clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${clientY}px`);

      xTo(clientX);
      yTo(clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("[data-cursor], a, button, input") as HTMLElement | null;
      if (!target) {
        gsap.to(cursor, {
          scale: 1,
          width: 22,
          height: 22,
          backgroundColor: "transparent",
          borderColor: "rgba(226, 201, 116, 0.75)",
          duration: 0.25,
          ease: "power2.out",
        });
        if (textRef.current) textRef.current.textContent = "";
        return;
      }

      const cursorType = target.getAttribute("data-cursor");

      if (cursorType === "download") {
        gsap.to(cursor, {
          scale: 1,
          width: 72,
          height: 72,
          backgroundColor: "#E2C974",
          borderColor: "#E2C974",
          duration: 0.3,
          ease: "power2.out",
        });
        if (textRef.current) {
          textRef.current.textContent = "PDF ↓";
          gsap.to(textRef.current, { color: "#121315", opacity: 1, duration: 0.2 });
        }
      } else {
        // Generic interactive element hover
        gsap.to(cursor, {
          scale: 1.35,
          width: 32,
          height: 32,
          backgroundColor: "rgba(226, 201, 116, 0.18)",
          borderColor: "#E2C974",
          duration: 0.25,
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
    <>
      {/* Dynamic Radial Light Spotlight that illuminates font colors within a ~340px radius */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-300 will-change-transform select-none hidden md:block"
        style={{
          background:
            "radial-gradient(340px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(255, 255, 255, 0.22) 0%, rgba(226, 201, 116, 0.14) 35%, rgba(226, 201, 116, 0.04) 65%, transparent 80%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Central Cursor Follower Ring */}
      <div
        ref={cursorRef}
        className="hidden md:flex fixed top-0 left-0 -ml-[11px] -mt-[11px] w-[22px] h-[22px] rounded-full border border-[var(--accent-move)] pointer-events-none z-[9999] items-center justify-center mix-blend-difference opacity-0 will-change-transform"
        aria-hidden="true"
      >
        <span
          ref={textRef}
          className="text-[9px] font-mono font-black tracking-wider uppercase text-center select-none text-[#121315]"
        />
      </div>
    </>
  );
}
