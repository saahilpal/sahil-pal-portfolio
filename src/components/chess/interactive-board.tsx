"use client";

import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { animate } from "animejs";
import {
  MATE_IN_4_MOVES,
  PUZZLE_START_FEN,
  ChessMoveItem,
} from "@/lib/chess-puzzle";
import { Play, RotateCcw, FastForward, CheckCircle2, ShieldAlert, Award, ExternalLink } from "lucide-react";

interface PieceSvgProps {
  type: string;
  color: "w" | "b";
  className?: string;
}

// Elegant Minimalist SVG Chess Piece Icons
function ChessPieceIcon({ type, color, className = "w-8 h-8" }: PieceSvgProps) {
  const isWhite = color === "w";
  const fill = isWhite ? "#FAF8F5" : "#1B1817";
  const stroke = isWhite ? "#262322" : "#D4CEBA";

  const symbols: Record<string, string> = {
    p: isWhite ? "♙" : "♟",
    r: isWhite ? "♖" : "♜",
    n: isWhite ? "♘" : "♞",
    b: isWhite ? "♗" : "♝",
    q: isWhite ? "♕" : "♛",
    k: isWhite ? "♔" : "♚",
  };

  return (
    <div
      className={`flex items-center justify-center select-none text-2xl sm:text-3xl font-serif ${className}`}
      style={{
        color: fill,
        textShadow: isWhite
          ? "0 1px 2px rgba(0,0,0,0.8), 0 0 1px #000"
          : "0 1px 2px rgba(255,255,255,0.4), 0 0 1px #fff",
      }}
    >
      {symbols[type.toLowerCase()] || ""}
    </div>
  );
}

interface InteractiveBoardProps {
  onSelectProject?: (slug: string) => void;
  activeMoveIndex: number;
  setActiveMoveIndex: (idx: number) => void;
}

export function InteractiveBoard({
  onSelectProject,
  activeMoveIndex,
  setActiveMoveIndex,
}: InteractiveBoardProps) {
  const [game, setGame] = useState<Chess | null>(null);
  const [boardState, setBoardState] = useState<(any | null)[][]>([]);
  const [highlightSquares, setHighlightSquares] = useState<{ from?: string; to?: string }>({});
  const [isCheckmate, setIsCheckmate] = useState<boolean>(false);

  // Initialize Chess instance
  useEffect(() => {
    try {
      const g = new Chess(PUZZLE_START_FEN);
      setGame(g);
      setBoardState(g.board());
    } catch (e) {
      console.error("Chess init error:", e);
    }
  }, []);

  const syncBoardToMove = (targetIdx: number) => {
    if (!game) return;
    try {
      const newGame = new Chess(PUZZLE_START_FEN);

      for (let i = 0; i <= targetIdx && i < MATE_IN_4_MOVES.length; i++) {
        const m = MATE_IN_4_MOVES[i];
        newGame.load(m.fenAfter);
      }

      setGame(newGame);
      setBoardState(newGame.board());
      setActiveMoveIndex(targetIdx);

      const currentMove = MATE_IN_4_MOVES[targetIdx];
      if (currentMove) {
        setHighlightSquares({ from: currentMove.from, to: currentMove.to });
        if (onSelectProject) {
          onSelectProject(currentMove.projectSlug);
        }
      }

      setIsCheckmate(targetIdx === 3);
    } catch (e) {
      console.error("Board sync error:", e);
    }
  };

  const handleNextMove = () => {
    if (activeMoveIndex < MATE_IN_4_MOVES.length - 1) {
      syncBoardToMove(activeMoveIndex + 1);
    }
  };

  const handleReset = () => {
    if (!game) return;
    game.load(PUZZLE_START_FEN);
    setBoardState(game.board());
    setActiveMoveIndex(-1);
    setHighlightSquares({});
    setIsCheckmate(false);
  };

  const handleAutoSolve = () => {
    syncBoardToMove(3);
  };

  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

  const getSquareName = (rIdx: number, cIdx: number) => {
    return `${files[cIdx]}${ranks[rIdx]}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left / Center: The Chessboard */}
      <div className="lg:col-span-7 space-y-4">
        {/* Board Surface */}
        <div className="relative rounded-sm p-3 sm:p-4 bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] shadow-2xl">
          {/* Header Coordinates Strip */}
          <div className="flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)] border-b border-[var(--border-hairline)] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-copper)] animate-pulse" />
              <span className="font-bold text-[var(--text-ivory)] uppercase tracking-wider">
                TACTICAL ENGINE // MATE IN 4
              </span>
            </div>
            <div className="text-[10px] text-[var(--accent-copper)] font-semibold">
              {activeMoveIndex === -1 ? "WHITE TO PLAY" : `MOVE ${activeMoveIndex + 1} OF 4`}
            </div>
          </div>

          {/* 8x8 Board Container */}
          <div className="chess-board-grid aspect-square max-w-[480px] mx-auto rounded-xs overflow-hidden select-none">
            {boardState.map((row, rIdx) =>
              row.map((piece, cIdx) => {
                const sqName = getSquareName(rIdx, cIdx);
                const isLight = (rIdx + cIdx) % 2 === 0;
                const isFrom = highlightSquares.from === sqName;
                const isTo = highlightSquares.to === sqName;

                return (
                  <div
                    key={sqName}
                    style={{
                      backgroundColor: isTo || isFrom
                        ? "var(--board-highlight)"
                        : isLight
                        ? "var(--board-light)"
                        : "var(--board-dark)",
                    }}
                    className="relative flex items-center justify-center transition-colors duration-200 cursor-pointer group"
                    title={sqName}
                    onClick={() => {
                      // Click-to-step through moves
                      handleNextMove();
                    }}
                  >
                    {/* Rank / File Coordinate Labels */}
                    {cIdx === 0 && (
                      <span className="absolute top-0.5 left-1 font-mono text-[8px] font-bold text-black/40 pointer-events-none">
                        {ranks[rIdx]}
                      </span>
                    )}
                    {rIdx === 7 && (
                      <span className="absolute bottom-0.5 right-1 font-mono text-[8px] font-bold text-black/40 pointer-events-none">
                        {files[cIdx]}
                      </span>
                    )}

                    {/* Move highlight ring */}
                    {(isFrom || isTo) && (
                      <div className="absolute inset-1 rounded-xs border-2 border-[var(--accent-copper)] pointer-events-none" />
                    )}

                    {/* Piece Icon */}
                    {piece && (
                      <ChessPieceIcon
                        type={piece.type}
                        color={piece.color}
                        className="transition-transform group-hover:scale-110"
                      />
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Engine Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 font-mono text-xs">
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleNextMove}
                disabled={activeMoveIndex >= MATE_IN_4_MOVES.length - 1}
                className="px-3 py-1.5 bg-[var(--accent-copper)] text-black font-bold rounded-xs flex items-center gap-1.5 hover:opacity-90 active:scale-95 disabled:opacity-40 transition-all shadow-xs"
              >
                <Play size={12} />
                <span>PLAY NEXT MOVE</span>
              </button>

              <button
                onClick={handleAutoSolve}
                className="px-3 py-1.5 bg-[var(--bg-obsidian-subtle)] text-[var(--text-ivory)] border border-[var(--border-hairline)] hover:border-[var(--text-muted)] rounded-xs flex items-center gap-1.5 transition-all active:scale-95"
              >
                <FastForward size={12} />
                <span>AUTO-SOLVE</span>
              </button>

              <button
                onClick={handleReset}
                className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-ivory)] transition-colors"
                title="Reset puzzle to start"
              >
                <RotateCcw size={13} />
              </button>
            </div>

            {isCheckmate && (
              <div className="flex items-center gap-1.5 text-[var(--accent-emerald)] font-bold text-[11px] animate-pulse">
                <CheckCircle2 size={13} />
                <span>CHECKMATE — HIRE ME UNLOCKED</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right: PGN Move List as Table of Contents */}
      <div className="lg:col-span-5 space-y-4 font-mono text-xs">
        <div className="p-4 sm:p-5 rounded-sm bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-2.5">
            <span className="font-bold text-[var(--text-ivory)] uppercase tracking-wider text-[11px]">
              PGN MOVE LIST // TABLE OF CONTENTS
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">
              4 MOVES = 4 SHIPPED SYSTEMS
            </span>
          </div>

          {/* The 4 Move Cards */}
          <div className="space-y-2.5">
            {MATE_IN_4_MOVES.map((move, idx) => {
              const isActive = activeMoveIndex === idx;
              const isPast = activeMoveIndex > idx;

              return (
                <div
                  key={move.notation}
                  onClick={() => syncBoardToMove(idx)}
                  className={`p-3 rounded-xs border transition-all cursor-pointer ${
                    isActive
                      ? "border-[var(--accent-copper)] bg-[var(--accent-copper-glow)]/15 shadow-sm"
                      : isPast
                      ? "border-[var(--border-hairline-strong)] bg-[var(--bg-obsidian-elevated)] opacity-90"
                      : "border-[var(--border-hairline)] bg-[var(--bg-obsidian)] opacity-60 hover:opacity-100 hover:border-[var(--border-hairline-strong)]"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-[var(--accent-copper)] flex items-center gap-1.5">
                      <span>{move.pieceSymbol}</span>
                      <span>{move.notation}</span>
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-[var(--text-muted)]">
                      {move.pieceName}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-[var(--text-pure)]">
                    {move.projectName}
                  </div>

                  <div className="text-[10.5px] text-[var(--text-muted)] mt-0.5 leading-snug">
                    {move.thesis}
                  </div>

                  {isActive && (
                    <div className="mt-2 pt-1.5 border-t border-dashed border-[var(--border-hairline)] flex items-center justify-between text-[10px] text-[var(--accent-copper)]">
                      <span>UNLOCKED IN VIEWPORT</span>
                      <a
                        href={`#${move.projectSlug}`}
                        className="hover:underline flex items-center gap-0.5"
                      >
                        <span>INSPECT SPEC</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Thesis Footer */}
          <div className="p-2.5 rounded-xs bg-[var(--bg-obsidian-subtle)] border border-[var(--border-hairline)] text-[10px] text-[var(--text-muted)] leading-relaxed">
            <span className="text-[var(--text-ivory)] font-bold">THE AI ANGLE:</span> Chess is the foundational benchmark of artificial intelligence. Stockfish runs on NNUE (neural networks). The board is not decoration; it is proof of engines that evaluate, retrieve, and decide.
          </div>
        </div>
      </div>
    </div>
  );
}
