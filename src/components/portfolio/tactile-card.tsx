"use client";

import React, { useRef, useState, useCallback } from "react";
import { animate } from "animejs";

interface TactileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function TactileCard({
  children,
  className = "",
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
        // Ignore
      }
    }
    const el = cardRef.current;
    if (!el) return;
    animate(el, {
      scale: 0.985,
      translateY: 2,
      duration: 90,
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
      duration: 280,
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
      duration: 250,
      ease: "outCubic",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      onClick={onClick}
      style={{
        touchAction: "manipulation",
      }}
      className={`group relative rounded-xl border border-[var(--line)] bg-[var(--surface)] transition-all duration-200 will-change-transform hover:border-[var(--line-strong)] hover:shadow-lg ${
        isTouched ? "border-[var(--accent-move)] shadow-md" : ""
      } ${className}`}
      {...props}
    >
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
      scale: 0.93,
      duration: 80,
      ease: "outQuad",
    });
  };

  const handlePointerUp = () => {
    if (!interactive) return;
    const el = pillRef.current;
    if (!el) return;
    animate(el, {
      scale: 1.04,
      duration: 100,
      ease: "outBack",
      onComplete: () => {
        animate(el, {
          scale: 1,
          duration: 160,
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
      duration: 180,
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
    animate(el, {
      scale: 0.96,
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
      duration: 250,
      ease: "outBack",
    });
  };

  const handlePointerLeave = () => {
    const el = btnRef.current;
    if (!el) return;
    animate(el, {
      scale: 1,
      translateY: 0,
      duration: 200,
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
