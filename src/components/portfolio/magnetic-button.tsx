"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface MagneticButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
  dataCursor?: string;
}

export function MagneticButton({
  children,
  className = "",
  dataCursor = "download",
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const btn = buttonRef.current;

    if (!btn || isReduced || !hasFinePointer) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.3, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * 0.28;
      const deltaY = (e.clientY - centerY) * 0.28;

      // Cap at 10px
      const clampedX = Math.max(-10, Math.min(10, deltaX));
      const clampedY = Math.max(-10, Math.min(10, deltaY));

      xTo(clampedX);
      yTo(clampedY);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a
      ref={buttonRef}
      data-cursor={dataCursor}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-[3px] border border-[var(--ink-primary)] bg-[var(--ink-primary)] px-6 py-3 text-sm font-bold text-[#141517] transition-colors duration-300 group min-h-[44px] ${className}`}
      {...props}
    >
      {/* Fill Wipe Layer on Hover */}
      <span
        className="absolute inset-0 bg-[#E2C974] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        aria-hidden="true"
      />
      <span className="relative z-10 select-none flex items-center gap-2">
        {children}
      </span>
    </a>
  );
}

