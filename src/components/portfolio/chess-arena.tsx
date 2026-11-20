"use client";

import { useState, useEffect, useCallback } from "react";
import { Chess, Square } from "chess.js";
import confetti from "canvas-confetti";
import { sound } from "@/lib/audio";
import { PROFILE_CORE } from "@/lib/portfolio-data";
import { ExternalLink, RotateCcw, Check, Trophy } from "lucide-react";

interface Puzzle {
  id: number;
  name: string;
  theme: string;
  fen: string;
  solution: { from: Square; to: Square; notation: string };
  hint: string;
}

const PUZZLES: Puzzle[] = [
  {
    id: 1,
    name: "01 // BACK-RANK MATE",
    theme: "Back-Rank Corridor",
    fen: "6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1",
    solution: { from: "d1", to: "d8", notation: "1. Rd8#" },
    hint: "Rook penetrates the 8th rank behind trapped pawns.",
  },
  {
    id: 2,
    name: "02 // ARABIAN MATE",
    theme: "Knight & Rook Coordination",
    fen: "7k/2R5/5N2/8/8/8/8/6K1 w - - 0 1",
    solution: { from: "c7", to: "h7", notation: "1. Rh7#" },
    hint: "Knight defends the corner square while Rook delivers mate.",
  },
  {
    id: 3,
    name: "03 // SMOTHERED KNIGHT",
    theme: "Smothered Checkmate",
    fen: "6rk/6pp/8/6N1/8/8/5PPP/6K1 w - - 0 1",
    solution: { from: "g5", to: "f7", notation: "1. Nf7#" },
    hint: "Knight leaps to f7; King is suffocated by own friendly pieces.",
  },
];

const PIECE_SYMBOLS: Record<string, string> = {
  p: "♟",
  r: "♜",
  n: "♞",
  b: "♝",
  q: "♛",
  k: "♚",
  P: "♙",
  R: "♖",
  N: "♘",
  B: "♗",
  Q: "♕",
  K: "♔",
};

export function ChessArena() {
  const [activePuzzleIdx, setActivePuzzleIdx] = useState(0);
  const [chess, setChess] = useState<Chess>(() => new Chess(PUZZLES[0].fen));
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<string[]>([]);
  const [solvedPuzzles, setSolvedPuzzles] = useState<Set<number>>(new Set());
  const [isWrongMove, setIsWrongMove] = useState(false);
  const [lastMoveStatus, setLastMoveStatus] = useState<string | null>(null);
  const [liveRating, setLiveRating] = useState<string>("LIVE");

  const currentPuzzle = PUZZLES[activePuzzleIdx];

  // Load puzzle
  const loadPuzzle = useCallback((idx: number) => {
    sound.tick();
    setActivePuzzleIdx(idx);
    const p = PUZZLES[idx];
    setChess(new Chess(p.fen));
    setSelectedSquare(null);
    setLegalMoves([]);
    setIsWrongMove(false);
    setLastMoveStatus(null);
  }, []);

  // Fetch Chess.com rating with fallback
  useEffect(() => {
    fetch(`https://api.chess.com/pub/player/${PROFILE_CORE.chessHandle}/stats`)
      .then((res) => {
        if (!res.ok) throw new Error("Blocked");
        return res.json();
      })
      .then((data) => {
        if (data.chess_rapid?.last?.rating) {
          setLiveRating(`${data.chess_rapid.last.rating} RAPID`);
        } else if (data.chess_blitz?.last?.rating) {
          setLiveRating(`${data.chess_blitz.last.rating} BLITZ`);
        }
      })
      .catch(() => {
        // Graceful fallback to verified rating
        setLiveRating("1000 RAPID");
      });
  }, []);

  const handleSquareClick = (square: Square) => {
    // If clicking a white piece, select it
    const piece = chess.get(square);

    if (piece && piece.color === "w") {
      sound.tick();
      setSelectedSquare(square);
      const moves = chess.moves({ square, verbose: true }).map((m) => m.to);
      setLegalMoves(moves);
      setIsWrongMove(false);
      return;
    }

    // If a square is selected and clicking a destination
    if (selectedSquare) {
      if (selectedSquare === currentPuzzle.solution.from && square === currentPuzzle.solution.to) {
        // Correct checkmate move!
        chess.move({ from: selectedSquare, to: square });
        sound.checkmate();
        setSelectedSquare(null);
        setLegalMoves([]);
        setIsWrongMove(false);
        setLastMoveStatus(`${currentPuzzle.solution.notation} — CHECKMATE !!`);

        setSolvedPuzzles((prev) => {
          const next = new Set(prev);
          next.add(currentPuzzle.id);
          return next;
        });

        // Trigger confetti in theme colors
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.65 },
          colors: ["#CCFF00", "#FF3B30", "#F4F4F0"],
        });
      } else {
        // Wrong move
        sound.error();
        setIsWrongMove(true);
        setLastMoveStatus("Incorrect move. Try again.");
        setTimeout(() => {
          setIsWrongMove(false);
          setChess(new Chess(currentPuzzle.fen));
          setSelectedSquare(null);
          setLegalMoves([]);
        }, 800);
      }
    }
  };

  const isSolved = solvedPuzzles.has(currentPuzzle.id);
  const totalSolved = solvedPuzzles.size;

  // Board layout 8x8
  const board = chess.board();
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

  return (
    <section
      id="arena"
      aria-label="Act III — The Prestige (Playable Chess Arena)"
      className="relative z-20 py-16 sm:py-24 border-b border-[var(--border-frame)] bg-[var(--canvas)] text-[var(--ink-primary)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--border-frame)] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[var(--accent-lime)]">
              <span>[ACT III // THE PRESTIGE]</span>
              <span className="text-[var(--border-frame)]">•</span>
              <span>TACTICAL FORESIGHT &amp; ARENA</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-[family-name:var(--font-heading)] font-black tracking-tight uppercase">
              SOLVE THE MATE
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="px-3 py-1.5 bg-[var(--surface)] border border-[var(--border-frame)] text-[var(--accent-lime)] font-bold">
              SOLVED: {totalSolved} / 3
            </div>
            <div className="px-3 py-1.5 bg-[var(--surface)] border border-[var(--border-frame)] text-[var(--ink-muted)]">
              CHESS.COM: {liveRating}
            </div>
          </div>
        </div>

        {/* Arena Grid: Left Chessboard + Right Puzzle Controls & Challenge Link */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 8x8 Interactive Brutalist Chessboard */}
          <div className="lg:col-span-7 flex justify-center">
            <div
              className={`relative p-2 sm:p-4 bg-[var(--surface)] border-2 border-[var(--border-frame)] shadow-[6px_6px_0px_var(--accent-lime)] max-w-[460px] w-full transition-transform ${
                isWrongMove ? "animate-[shake_0.4s_ease-in-out]" : ""
              }`}
            >
              {/* Board Squares */}
              <div className="grid grid-cols-8 grid-rows-8 border border-[var(--border-frame)] aspect-square w-full">
                {board.map((row, rIdx) =>
                  row.map((cell, cIdx) => {
                    const square = `${files[cIdx]}${ranks[rIdx]}` as Square;
                    const isLight = (rIdx + cIdx) % 2 === 0;
                    const isSelected = selectedSquare === square;
                    const isLegalTarget = legalMoves.includes(square);
                    const piece = cell ? (cell.color === "w" ? cell.type.toUpperCase() : cell.type) : null;
                    const isWhite = cell?.color === "w";

                    return (
                      <button
                        key={square}
                        type="button"
                        onClick={() => handleSquareClick(square)}
                        className={`relative flex items-center justify-center aspect-square select-none cursor-pointer transition-colors ${
                          isLight ? "bg-[var(--square-light)]" : "bg-[var(--square-dark)]"
                        } ${isSelected ? "ring-2 ring-[var(--accent-lime)] z-10" : ""}`}
                        aria-label={`Square ${square}${piece ? ` with ${piece}` : ""}`}
                      >
                        {/* Legal Target Dot */}
                        {isLegalTarget && (
                          <span className="absolute w-3.5 h-3.5 rounded-full bg-[var(--accent-lime)] opacity-85 z-20 pointer-events-none" />
                        )}

                        {/* Piece Character */}
                        {piece && (
                          <span
                            className={`text-2xl sm:text-4xl font-bold leading-none select-none z-10 ${
                              isWhite ? "text-[#F4F4F0] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" : "text-[#707584]"
                            }`}
                          >
                            {PIECE_SYMBOLS[piece] || ""}
                          </span>
                        )}

                        {/* Algebraic Rank / File labels on borders */}
                        {cIdx === 0 && (
                          <span className="absolute top-0.5 left-1 text-[9px] font-mono text-[var(--ink-muted)] opacity-60 pointer-events-none">
                            {ranks[rIdx]}
                          </span>
                        )}
                        {rIdx === 7 && (
                          <span className="absolute bottom-0.5 right-1 text-[9px] font-mono text-[var(--ink-muted)] opacity-60 pointer-events-none">
                            {files[cIdx]}
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Puzzle Dispatch & Challenge Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Puzzle Selector Tabs */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-lime)] font-bold block">
                SELECT TACTICAL PUZZLE (MATE IN 1)
              </span>
              <div className="space-y-2">
                {PUZZLES.map((pz, idx) => {
                  const isCur = activePuzzleIdx === idx;
                  const pzSolved = solvedPuzzles.has(pz.id);
                  return (
                    <button
                      key={pz.id}
                      type="button"
                      onClick={() => loadPuzzle(idx)}
                      className={`w-full p-3 text-left border flex items-center justify-between font-mono text-xs transition-all ${
                        isCur
                          ? "bg-[var(--surface-raised)] border-[var(--border-frame)] shadow-[3px_3px_0px_var(--accent-lime)] text-[var(--ink-primary)] font-bold"
                          : "bg-[var(--surface)] border-[var(--border-grid)] text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
                      }`}
                    >
                      <span>{pz.name}</span>
                      {pzSolved ? (
                        <span className="inline-flex items-center gap-1 text-[var(--accent-lime)]">
                          <Check className="w-3.5 h-3.5" />
                          <span>SOLVED</span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-[var(--ink-muted)]">UNSOLVED</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hint & Status Box */}
            <div className="p-4 bg-[var(--surface)] border border-[var(--border-grid)] font-mono text-xs space-y-2">
              <div className="text-[var(--accent-lime)] font-bold flex items-center justify-between">
                <span>THEME: {currentPuzzle.theme}</span>
                <button
                  type="button"
                  onClick={() => loadPuzzle(activePuzzleIdx)}
                  className="inline-flex items-center gap-1 text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
                  title="Reset Board"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>RESET</span>
                </button>
              </div>
              <p className="text-[var(--ink-secondary)]">Hint: {currentPuzzle.hint}</p>

              {lastMoveStatus && (
                <div
                  className={`pt-2 font-bold ${
                    isSolved ? "text-[var(--accent-lime)]" : isWrongMove ? "text-[var(--accent-red)]" : "text-[var(--ink-primary)]"
                  }`}
                >
                  {lastMoveStatus}
                </div>
              )}
            </div>

            {/* Challenge Unlocked Action */}
            <div className="pt-2">
              {totalSolved > 0 ? (
                <div className="p-4 bg-[var(--surface-raised)] border-2 border-[var(--accent-lime)] shadow-[4px_4px_0px_var(--accent-lime)] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-lime)]">
                    <Trophy className="w-4 h-4" />
                    <span>CHALLENGE UNLOCKED ({totalSolved}/3 PUZZLES SOLVED)</span>
                  </div>
                  <p className="text-xs font-mono text-[var(--ink-primary)]">
                    Send a game challenge directly to Sahil on Chess.com.
                  </p>
                  <a
                    href={PROFILE_CORE.chessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.thock()}
                    className="brutalist-btn brutalist-btn-primary w-full py-2.5 text-xs gap-1.5"
                  >
                    <span>♔ PLAY SAHILL17 ON CHESS.COM</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <div className="p-4 bg-[var(--surface)] border border-[var(--border-grid)] font-mono text-xs text-[var(--ink-muted)] space-y-2">
                  <p>Solve any checkmate puzzle above to unlock the Chess.com direct match invitation.</p>
                  <a
                    href={PROFILE_CORE.chessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent-lime)] hover:underline inline-flex items-center gap-1 text-xs font-bold"
                  >
                    <span>View Profile (sahill17) ↗</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
