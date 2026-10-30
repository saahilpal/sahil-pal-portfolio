"use client";

import { useState, useRef } from "react";
import { Chess, Square } from "chess.js";
import {
  Play,
  RotateCcw,
  FastForward,
  Sparkles,
  Swords,
  ShieldCheck,
} from "lucide-react";
import { animate } from "animejs";

// Classic 1000-ELO Bishop Sacrifice / Tactical Fork sequence
export const TACTIC_START_FEN = "r1bqkb1r/pppp1ppp/2n5/4p3/2B1n3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4";

export interface TacticalStep {
  move: string;
  annotation: string;
  explanation: string;
  engineeringLesson: string;
}

export const TACTICAL_STEPS: TacticalStep[] = [
  {
    move: "Bxf7+",
    annotation: "1. Bxf7+! (Bishop Sacrifice)",
    explanation: "White sacrifices the bishop to drag the black king out of its defensive castle perimeter into an open square.",
    engineeringLesson: "Shedding transient state to force the system into a known deterministic evaluation boundary.",
  },
  {
    move: "Kxf7",
    annotation: "1... Kxf7 (Forced Recapture)",
    explanation: "Black is compelled to capture, exposing the king along the diagonal and opening the e-file.",
    engineeringLesson: "State machine forced transition: with zero alternative branches, predictable inputs yield predictable outcomes.",
  },
  {
    move: "Nxe5+",
    annotation: "2. Nxe5+! (Tempo Knight Leap)",
    explanation: "Knight strikes with check, forcing an immediate response and clearing the queen's attacking file.",
    engineeringLesson: "Non-blocking event dispatch: handling the critical priority interrupt before resuming normal execution.",
  },
  {
    move: "Nxe5",
    annotation: "2... Nxe5 (Knight Exchange)",
    explanation: "Black trades knights to neutralize the check, but leaves the king completely unprotected against the queen.",
    engineeringLesson: "Resource contention trade-off: eliminating one bottleneck often reveals an architectural vulnerability elsewhere.",
  },
  {
    move: "Qh5+",
    annotation: "3. Qh5+! (Royal Double-Attack Fork)",
    explanation: "The queen simultaneously attacks Black's exposed king on f7 and the undefended knight on e5.",
    engineeringLesson: "Atomic two-phase commit: achieving verification across two separate system nodes in a single cycle.",
  },
];

// Crisp Unicode Chess Piece Glyphs with high-contrast styling
const PIECE_GLYPHS: Record<string, string> = {
  P: "♙",
  N: "♘",
  B: "♗",
  R: "♖",
  Q: "♕",
  K: "♔",
  p: "♟",
  n: "♞",
  b: "♝",
  r: "♜",
  q: "♛",
  k: "♚",
};

export function ChessTacticsSandbox() {
  const [game, setGame] = useState<Chess>(() => new Chess(TACTIC_START_FEN));
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<string[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [lastMoveSquares, setLastMoveSquares] = useState<{ from?: Square; to?: Square }>({});
  const [statusMessage, setStatusMessage] = useState<string>("White to move: Strike with 1. Bxf7+ or tap any white piece!");
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const boardContainerRef = useRef<HTMLDivElement>(null);

  // Restart puzzle
  const handleReset = () => {
    const freshGame = new Chess(TACTIC_START_FEN);
    setGame(freshGame);
    setSelectedSquare(null);
    setLegalMoves([]);
    setCurrentStepIndex(0);
    setLastMoveSquares({});
    setStatusMessage("Board reset to tactical starting position. White to play!");
    setIsAutoPlaying(false);

    if (boardContainerRef.current) {
      animate(boardContainerRef.current, {
        opacity: [0.7, 1],
        scale: [0.99, 1],
        duration: 200,
        ease: "outQuad",
      });
    }
  };

  // Step forward in the tactical line
  const handlePlayNextStep = () => {
    if (currentStepIndex >= TACTICAL_STEPS.length) return;
    const step = TACTICAL_STEPS[currentStepIndex];

    try {
      const moveResult = game.move(step.move);
      if (moveResult) {
        setGame(new Chess(game.fen()));
        setLastMoveSquares({ from: moveResult.from as Square, to: moveResult.to as Square });
        setSelectedSquare(null);
        setLegalMoves([]);
        setCurrentStepIndex((prev) => prev + 1);
        setStatusMessage(step.annotation);
      }
    } catch (e) {
      console.error("Illegal tactical step:", e);
    }
  };

  // Auto-play through all tactical steps
  const handleAutoPlay = () => {
    if (isAutoPlaying) return;
    setIsAutoPlaying(true);

    const freshGame = new Chess(TACTIC_START_FEN);
    setGame(freshGame);
    setSelectedSquare(null);
    setLegalMoves([]);
    setCurrentStepIndex(0);
    setLastMoveSquares({});

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < TACTICAL_STEPS.length) {
        const step = TACTICAL_STEPS[stepIdx];
        const res = freshGame.move(step.move);
        if (res) {
          setGame(new Chess(freshGame.fen()));
          setLastMoveSquares({ from: res.from as Square, to: res.to as Square });
          setStatusMessage(step.annotation);
          setCurrentStepIndex(stepIdx + 1);
        }
        stepIdx++;
      } else {
        clearInterval(interval);
        setIsAutoPlaying(false);
      }
    }, 700);
  };

  // Interactive square click handler
  const handleSquareClick = (square: Square) => {
    // If a square is already selected and target is a legal destination
    if (selectedSquare) {
      if (legalMoves.includes(square)) {
        try {
          const moveResult = game.move({
            from: selectedSquare,
            to: square,
            promotion: "q",
          });

          if (moveResult) {
            setGame(new Chess(game.fen()));
            setLastMoveSquares({ from: selectedSquare, to: square });
            setSelectedSquare(null);
            setLegalMoves([]);

            if (game.isCheckmate()) {
              setStatusMessage("Checkmate! Flawless tactical conversion.");
            } else if (game.inCheck()) {
              setStatusMessage(`Move played: ${moveResult.san} — CHECK!`);
            } else {
              setStatusMessage(`Move played: ${moveResult.san}`);
            }
            return;
          }
        } catch {
          // invalid move fallback
        }
      }
    }

    // Otherwise, select piece if it belongs to active turn
    const piece = game.get(square);
    if (piece && piece.color === game.turn()) {
      setSelectedSquare(square);
      const moves = game.moves({ square, verbose: true }).map((m) => m.to);
      setLegalMoves(moves);
    } else {
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  };

  const board = game.board();
  const currentStep = TACTICAL_STEPS[Math.min(currentStepIndex, TACTICAL_STEPS.length - 1)];

  return (
    <div className="craft-card p-6 sm:p-8 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                Tactical Sandbox // ~1000 ELO (Rapid)
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 font-bold border border-amber-500/30">
                CHESS.COM VERIFIED
              </span>
            </div>
            <p className="text-xs text-[var(--accent-emerald)] font-mono">
              Interactive board engine powered by chess.js &bull; Zero blunders in code
            </p>
          </div>
        </div>

        {/* Engine Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handlePlayNextStep}
            disabled={currentStepIndex >= TACTICAL_STEPS.length || isAutoPlaying}
            className="btn-emerald !py-1.5 !px-3 !text-xs inline-flex items-center gap-1.5 disabled:opacity-40"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Next Move</span>
          </button>
          <button
            onClick={handleAutoPlay}
            disabled={isAutoPlaying}
            className="btn-surface !py-1.5 !px-3 !text-xs inline-flex items-center gap-1.5 disabled:opacity-40"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Auto-Play</span>
          </button>
          <button
            onClick={handleReset}
            title="Reset Puzzle"
            className="btn-surface !py-1.5 !px-2.5 !text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Board (Left) + 1000 ELO Dossier & Tactical Invariants (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: 8x8 Playable Board + Evaluation Gauge */}
        <div className="lg:col-span-6 flex flex-col items-center space-y-3">
          {/* Status Message Ribbon */}
          <div className="w-full px-3 py-1.5 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-xs font-mono flex items-center justify-between text-[var(--text-secondary)]">
            <span className="truncate">{statusMessage}</span>
            <span className="text-[10px] font-bold text-[var(--accent-emerald)] shrink-0 ml-2">
              TURN: {game.turn() === "w" ? "WHITE (YOU)" : "BLACK"}
            </span>
          </div>

          {/* 8x8 Chessboard Container */}
          <div
            ref={boardContainerRef}
            className="relative p-2 sm:p-3 rounded-xl bg-[#0c0e12] border border-[var(--border-medium)] shadow-xl w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] flex justify-center"
          >
            <div className="grid grid-cols-8 grid-rows-8 w-full aspect-square select-none border border-black/40 rounded-lg overflow-hidden">
              {board.map((row, rowIdx) =>
                row.map((cell, colIdx) => {
                  const squareName = `${String.fromCharCode(97 + colIdx)}${8 - rowIdx}` as Square;
                  const isDark = (rowIdx + colIdx) % 2 === 1;
                  const isSelected = selectedSquare === squareName;
                  const isLegalTarget = legalMoves.includes(squareName);
                  const isLastMoveFrom = lastMoveSquares.from === squareName;
                  const isLastMoveTo = lastMoveSquares.to === squareName;

                  // Base square colors
                  let bgClass = isDark ? "bg-[#181a20]" : "bg-[#252833]";
                  if (isLastMoveFrom || isLastMoveTo) {
                    bgClass = isDark ? "bg-amber-900/40" : "bg-amber-800/40";
                  }
                  if (isSelected) {
                    bgClass = "bg-emerald-600/40 ring-2 ring-emerald-400 inset-0";
                  }

                  const glyphKey = cell ? (cell.color === "w" ? cell.type.toUpperCase() : cell.type.toLowerCase()) : "";
                  const pieceGlyph = PIECE_GLYPHS[glyphKey] || "";

                  return (
                    <div
                      key={squareName}
                      onClick={() => handleSquareClick(squareName)}
                      className={`relative flex items-center justify-center cursor-pointer transition-colors ${bgClass} hover:opacity-90`}
                    >
                      {/* Square Coordinate Labels (a-h on rank 1, 1-8 on file a) */}
                      {colIdx === 0 && (
                        <span className="absolute top-0.5 left-1 text-[7px] sm:text-[8px] font-mono text-zinc-500 select-none">
                          {8 - rowIdx}
                        </span>
                      )}
                      {rowIdx === 7 && (
                        <span className="absolute bottom-0.5 right-1 text-[7px] sm:text-[8px] font-mono text-zinc-500 select-none">
                          {String.fromCharCode(97 + colIdx)}
                        </span>
                      )}

                      {/* Legal Move Destination Indicator */}
                      {isLegalTarget && (
                        <div className="absolute z-10 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400/80 animate-pulse shadow-sm" />
                      )}

                      {/* Chess Piece Glyph */}
                      {cell && (
                        <span
                          className={`text-xl sm:text-2xl md:text-3xl font-serif select-none transition-transform duration-150 ${
                            cell.color === "w"
                              ? "text-zinc-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                              : "text-zinc-950 drop-shadow-[0_0_1px_rgba(255,255,255,0.7)]"
                          }`}
                        >
                          {pieceGlyph}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <p className="text-[11px] font-mono text-[var(--text-muted)] text-center">
            Tap white pieces to preview legal moves &bull; Step through the tactical fork
          </p>
        </div>

        {/* RIGHT COLUMN: 1000 ELO Reality Check & Systems Analogy */}
        <div className="lg:col-span-6 space-y-4">
          {/* Active Tactical Step Highlight */}
          <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tactical Sequence (Step {currentStepIndex} of {TACTICAL_STEPS.length})</span>
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">
                ITALIAN FORK DRILL
              </span>
            </div>
            <div className="text-sm font-bold text-[var(--text-primary)]">
              {currentStep ? currentStep.annotation : "Sequence Complete!"}
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {currentStep ? currentStep.explanation : "Black's position collapses under the double attack."}
            </p>
            <div className="mt-2 pt-2 border-t border-[var(--border-subtle)] flex items-start gap-2 text-xs text-[var(--accent-emerald)] font-mono">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>Systems Invariant:</strong> {currentStep ? currentStep.engineeringLesson : "State boundaries preserved."}
              </span>
            </div>
          </div>

          {/* 1000 ELO Dossier / Developer Reality Check */}
          <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-3">
            <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--border-subtle)] pb-2">
              <span className="text-[var(--text-primary)] font-bold flex items-center gap-1.5">
                <span>♞</span>
                <span>The 1000-ELO Engineering Reality Check</span>
              </span>
              <span className="text-amber-400 font-bold">~1000 RAPID</span>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              At 1000 ELO on Chess.com, you understand opening principles and sharp tactics—but you still occasionally blunder a piece when the clock drops below 20 seconds.
            </p>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              That humility directly shapes how I write code: <em>I treat LLMs and distributed microservices with the same paranoia as a 1-minute time scramble.</em> That is why PatchBound has strict test oracles, DocAnalyzer uses PostgreSQL row-level locks, and Hera Billing runs 100% offline-first. Systems must never hang a queen.
            </p>

            {/* Quick Tactical Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-[11px] font-mono">
              <div className="p-2 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)]">
                <div className="text-[10px] text-[var(--text-muted)]">Openings</div>
                <div className="font-semibold text-[var(--text-primary)]">Italian / Vienna</div>
              </div>
              <div className="p-2 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)]">
                <div className="text-[10px] text-[var(--text-muted)]">Fav Piece</div>
                <div className="font-semibold text-amber-400">♞ Knight (Forks)</div>
              </div>
              <div className="p-2 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] col-span-2 sm:col-span-1">
                <div className="text-[10px] text-[var(--text-muted)]">Blunder Invariant</div>
                <div className="font-semibold text-[var(--accent-emerald)]">0% in Production</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
