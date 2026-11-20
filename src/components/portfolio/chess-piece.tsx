"use client";

import React from "react";

interface ChessPieceProps {
  type: string; // "P", "R", "N", "B", "Q", "K" for White; "p", "r", "n", "b", "q", "k" for Black
  className?: string;
}

/**
 * Tournament-Grade High-Contrast Vector SVG Chess Pieces
 * - White: Brilliant Chalk White (#FFFFFF) with 2px Obsidian frame (#111318) + soft depth shadow
 * - Black: Titanium Obsidian (#181A22) with 2px Crisp Chalk/Lime stroke (#F4F4F0 / #CCFF00) + glow
 * 100% visible on both Light (#20232E / #D8D5C8) and Dark (#101218 / #FFFFFF) squares in VOID & BLUEPRINT themes.
 */
export function ChessPiece({ type, className = "w-9 h-9" }: ChessPieceProps) {
  const isWhite = type === type.toUpperCase();
  const lower = type.toLowerCase();

  const strokeColor = isWhite ? "#0B0C10" : "#F8FAFC";
  const fillColor = isWhite ? "#FAF9F6" : "#161922";
  const accentColor = isWhite ? "#CBD5E1" : "#CCFF00";

  return (
    <svg
      viewBox="0 0 45 45"
      className={`select-none pointer-events-none drop-shadow-[0_3px_5px_rgba(0,0,0,0.7)] transition-transform ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* PAWN */}
      {lower === "p" && (
        <g stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Base */}
          <path d="M9 39h27c0-2-3-4-8-4.5H17C12 35 9 37 9 39z" fill={fillColor} />
          {/* Body */}
          <path d="M14 34.5c1-6 2-10 4-13h9c2 3 3 7 4 13" fill={fillColor} />
          {/* Collar ring */}
          <path d="M16 21.5h13" stroke={accentColor} strokeWidth="1.6" />
          {/* Head sphere */}
          <circle cx="22.5" cy="14.5" r="5.5" fill={fillColor} />
          {/* Highlight dot */}
          <circle cx="20.5" cy="13" r="1.2" fill={accentColor} stroke="none" />
        </g>
      )}

      {/* ROOK */}
      {lower === "r" && (
        <g stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Base */}
          <path d="M9 39h27c0-2-3-4-7-4.5H16C12 35 9 37 9 39z" fill={fillColor} />
          {/* Body */}
          <path d="M13 34.5l2-16h15l2 16H13z" fill={fillColor} />
          {/* Battlements / Crenels */}
          <path
            d="M11 18.5h23v-7h-4.5v3h-4.5v-3h-5v3h-4.5v-3H11v7z"
            fill={fillColor}
          />
          {/* Mid ring */}
          <line x1="14" y1="26" x2="31" y2="26" stroke={accentColor} strokeWidth="1.5" />
          <line x1="13" y1="34" x2="32" y2="34" stroke={accentColor} strokeWidth="1.5" />
        </g>
      )}

      {/* KNIGHT */}
      {lower === "n" && (
        <g stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Base */}
          <path d="M9 39h27c0-2-3-4-7-4.5H16C12 35 9 37 9 39z" fill={fillColor} />
          {/* Horse Mane and Head */}
          <path
            d="M13 34.5c-.5-6 1-11 5-15 0-3-1.5-6-3.5-7.5 4.5.5 8 3 9.5 6 1.5-2.5 3.5-3 5.5-2.5-1 2-1 4.5-1.5 6 3 1.5 5 4 4.5 7.5-.5 3-3.5 5-5 5.5H13z"
            fill={fillColor}
          />
          {/* Snout & Eye */}
          <circle cx="18" cy="19.5" r="1.5" fill={accentColor} stroke="none" />
          <path d="M12.5 25c1.5 1 4 0 5-1" stroke={accentColor} strokeWidth="1.5" />
          {/* Mane line */}
          <path d="M24 16c2 3 3 8 2 13" stroke={accentColor} strokeWidth="1.4" />
        </g>
      )}

      {/* BISHOP */}
      {lower === "b" && (
        <g stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Base */}
          <path d="M10 39h25c0-2-3-4-6.5-4.5H16.5C13 35 10 37 10 39z" fill={fillColor} />
          {/* Stem */}
          <path d="M14.5 34.5c1-4 2-7 4-9.5h8c2 2.5 3 5.5 4 9.5H14.5z" fill={fillColor} />
          {/* Mitre / Head */}
          <path
            d="M16 24.5c-2-3.5-2-8 1-12 2-2.5 4.5-3.5 5.5-3.5s3.5 1 5.5 3.5c3 4 3 8.5 1 12H16z"
            fill={fillColor}
          />
          {/* Cross on top */}
          <circle cx="22.5" cy="7" r="2" fill={accentColor} stroke={strokeColor} strokeWidth="1.4" />
          {/* Mitre cut / slash */}
          <path d="M19 14l7 7" stroke={accentColor} strokeWidth="1.6" />
        </g>
      )}

      {/* QUEEN */}
      {lower === "q" && (
        <g stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Base */}
          <path d="M9 39h27c0-2-3-4-7-4.5H16C12 35 9 37 9 39z" fill={fillColor} />
          {/* Stem & Gown */}
          <path d="M12.5 34.5c2-6 3.5-10 5.5-13h9c2 3 3.5 7 5.5 13H12.5z" fill={fillColor} />
          {/* Crown Spikes */}
          <path
            d="M11 20.5l3.5-10 4 6 4-8 4 8 4-6 3.5 10H11z"
            fill={fillColor}
          />
          {/* Crown Jewels */}
          <circle cx="14.5" cy="10" r="1.5" fill={accentColor} stroke={strokeColor} strokeWidth="1.2" />
          <circle cx="18.5" cy="16" r="1.5" fill={accentColor} stroke={strokeColor} strokeWidth="1.2" />
          <circle cx="22.5" cy="8" r="1.8" fill={accentColor} stroke={strokeColor} strokeWidth="1.2" />
          <circle cx="26.5" cy="16" r="1.5" fill={accentColor} stroke={strokeColor} strokeWidth="1.2" />
          <circle cx="30.5" cy="10" r="1.5" fill={accentColor} stroke={strokeColor} strokeWidth="1.2" />
        </g>
      )}

      {/* KING */}
      {lower === "k" && (
        <g stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Base */}
          <path d="M9 39h27c0-2-3-4-7-4.5H16C12 35 9 37 9 39z" fill={fillColor} />
          {/* Robe */}
          <path d="M13 34.5c1.5-5 3-9 5.5-11.5h8c2.5 2.5 4 6.5 5.5 11.5H13z" fill={fillColor} />
          {/* Crown */}
          <path
            d="M13.5 22.5c-1-2.5-1-6 2.5-8.5 2-1.5 5-2 6.5-2s4.5.5 6.5 2c3.5 2.5 3.5 6 2.5 8.5H13.5z"
            fill={fillColor}
          />
          {/* Sovereign Cross */}
          <path d="M22.5 5v5.5M19.5 8h6" stroke={accentColor} strokeWidth="2.2" strokeLinecap="square" />
        </g>
      )}
    </svg>
  );
}
