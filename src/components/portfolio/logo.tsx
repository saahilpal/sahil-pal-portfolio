"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Sahil — Grandmaster Systems Lab Logo Mark
 * Geometric neo-brutalist emblem: Interlocking "S" chronometer with tactical chess knight crest.
 */
export function SahilLogo({ className = "w-6 h-6", size = 24 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 transition-transform hover:scale-105 ${className}`}
      aria-label="Sahil Logo"
    >
      {/* Outer brutalist frame */}
      <rect
        x="2"
        y="2"
        width="28"
        height="28"
        stroke="currentColor"
        strokeWidth="2"
        className="text-[var(--border-frame)]"
        fill="var(--surface-raised)"
      />

      {/* Acid lime corner accent */}
      <rect x="2" y="2" width="6" height="6" fill="#CCFF00" />
      <rect x="24" y="24" width="6" height="6" fill="#CCFF00" />

      {/* Central stylized Geometric 'S' & Knight Profile */}
      <path
        d="M22 9H11C9.34315 9 8 10.3431 8 12C8 13.6569 9.34315 15 11 15H21C22.6569 15 24 16.3431 24 18C24 19.6569 22.6569 21 21 21H10"
        stroke="#CCFF00"
        strokeWidth="2.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      {/* Crosshair telemetry dots */}
      <circle cx="16" cy="15" r="1.5" fill="#F4F4F0" />
      <line x1="16" y1="5" x2="16" y2="7" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="23" x2="16" y2="25" stroke="currentColor" strokeWidth="1.5" />
      <line x1="5" y1="15" x2="7" y2="15" stroke="currentColor" strokeWidth="1.5" />
      <line x1="23" y1="15" x2="25" y2="15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
