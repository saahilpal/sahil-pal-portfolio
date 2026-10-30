"use client";

import React, { useRef, useState, useCallback } from "react";
import { animate } from "animejs";

interface TactileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  glowColor?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function TactileCard({
  children,
  className = "",
  enableTilt = true,
  glowColor = "rgba(229, 169, 60, 0.15)",
  onClick,
  ...props
}: TactileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouched, setIsTouched] = useState(false);

  const handlePointerDown = useCallback(() => {
    setIsTouched(true);
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(8);
      } catch {
        // Ignore devices where vibrate is restricted
      }
    }
    const el = cardRef.current;
    if (!el) return;
    animate(el, {
      scale: 0.985,
      translateY: 2,
      duration: 100,
      ease: "outQuad",
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    setIsTouched(false);
    const el = cardRef.current;
    if (!el) return;
    animate(el, {
      scale: 1,
      translateY: 0,
      duration: 380,
      ease: "outBack",
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsTouched(false);
    const el = cardRef.current;
    if (!el) return;
    animate(el, {
      scale: 1,
      translateY: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 450,
      ease: "outCubic",
    });
    el.style.removeProperty("--card-x");
    el.style.removeProperty("--card-y");
    el.style.removeProperty("--card-active");
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      el.style.setProperty("--card-x", `${x}px`);
      el.style.setProperty("--card-y", `${y}px`);
      el.style.setProperty("--card-active", "1");

      if (enableTilt && e.pointerType === "mouse") {
        const xPct = (x / rect.width - 0.5) * 2; // -1 to 1
        const yPct = (y / rect.height - 0.5) * 2; // -1 to 1

        const rotX = -yPct * 2.5; // Max 2.5 deg tilt
        const rotY = xPct * 2.5;

        animate(el, {
          rotateX: rotX,
          rotateY: rotY,
          duration: 150,
          ease: "outQuad",
        });
      }
    },
    [enableTilt]
  );

  return (
    <div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      onPointerMove={handlePointerMove}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
        touchAction: "manipulation",
      }}
      className={`group relative rounded-xl border border-[var(--line)] bg-[var(--surface)] transition-colors duration-300 will-change-transform ${
        isTouched ? "border-[var(--accent-move)] shadow-lg" : "hover:border-[var(--line-strong)]"
      } ${className}`}
      {...props}
    >
      {/* Subtle interior cursor/finger spotlight sheen */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at var(--card-x, 50%) var(--card-y, 50%), ${glowColor}, transparent 65%)`,
        }}
        aria-hidden="true"
      />

      {/* Card Content */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

interface TactilePillProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export function TactilePill({
  children,
  className = "",
  interactive = true,
  onClick,
  ...props
}: TactilePillProps) {
  const pillRef = useRef<HTMLSpanElement>(null);

  const handlePointerDown = () => {
    if (!interactive) return;
    const el = pillRef.current;
    if (!el) return;
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(6);
      } catch {
        // Ignore
      }
    }
    animate(el, {
      scale: 0.92,
      duration: 90,
      ease: "outQuad",
    });
  };

  const handlePointerUp = () => {
    if (!interactive) return;
    const el = pillRef.current;
    if (!el) return;
    animate(el, {
      scale: 1.05,
      duration: 120,
      ease: "outBack",
      onComplete: () => {
        animate(el, {
          scale: 1,
          duration: 180,
          ease: "outCubic",
        });
      },
    });
  };

  const handlePointerLeave = () => {
    if (!interactive) return;
    const el = pillRef.current;
    if (!el) return;
    animate(el, {
      scale: 1,
      duration: 200,
      ease: "outCubic",
    });
  };

  return (
    <span
      ref={pillRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        touchAction: "manipulation",
      }}
      className={`select-none cursor-pointer will-change-transform transition-colors ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

interface TactileButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "pill";
}

export function TactileButton({
  children,
  className = "",
  href,
  ...props
}: TactileButtonProps) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handlePointerDown = () => {
    const el = btnRef.current;
    if (!el) return;
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(10);
      } catch {
        // Ignore
      }
    }
    animate(el, {
      scale: 0.95,
      translateY: 2,
      duration: 80,
      ease: "outQuad",
    });
  };

  const handlePointerUp = () => {
    const el = btnRef.current;
    if (!el) return;
    animate(el, {
      scale: 1,
      translateY: 0,
      duration: 320,
      ease: "outBack",
    });
  };

  const handlePointerLeave = () => {
    const el = btnRef.current;
    if (!el) return;
    animate(el, {
      scale: 1,
      translateY: 0,
      duration: 250,
      ease: "outCubic",
    });
  };

  return (
    <a
      ref={btnRef}
      href={href}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      style={{
        touchAction: "manipulation",
      }}
      className={`will-change-transform inline-flex items-center justify-center select-none ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

