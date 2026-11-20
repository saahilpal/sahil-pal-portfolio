"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Chess, Square } from "chess.js";
import confetti from "canvas-confetti";
import { sound } from "@/lib/audio";
import { PROFILE_CORE } from "@/lib/portfolio-data";
import { ExternalLink, RotateCcw, Check, Trophy, Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";
import { ChessPiece } from "./chess-piece";

interface Step {
  from: Square;
  to: Square;
  notation: string;
}

interface Puzzle {
  id: number;
  name: string;
  difficulty: "WARMUP" | "TACTICAL" | "HARD // GRANDMASTER";
  theme: string;
  fen: string;
  whiteSteps: Step[];
  blackReplies: Step[];
  hint: string;
}

const PUZZLES: Puzzle[] = [
  {
    id: 1,
    name: "01 // BACK-RANK CORRIDOR",
    difficulty: "WARMUP",
    theme: "Back-Rank Clearance",
    fen: "6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1",
    whiteSteps: [{ from: "d1", to: "d8", notation: "1. Rd8#" }],
    blackReplies: [],
    hint: "The 8th rank is undefended; strike behind the enemy pawn shield.",
  },
  {
    id: 2,
    name: "02 // ARABIAN COORDINATION",
    difficulty: "TACTICAL",
    theme: "Knight & Rook Net",
    fen: "7k/2R5/5N2/8/8/8/8/6K1 w - - 0 1",
    whiteSteps: [{ from: "c7", to: "h7", notation: "1. Rh7#" }],
    blackReplies: [],
    hint: "The f6 knight locks down g8 and shields h7; drive the rook in.",
  },
  {
    id: 3,
    name: "03 // OPERA GAME SACRIFICE",
    difficulty: "HARD // GRANDMASTER",
    theme: "Queen Sacrifice & Back-Rank Pin",
    fen: "4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 1",
    whiteSteps: [
      { from: "b3", to: "b8", notation: "1. Qb8+!" },
      { from: "d1", to: "d8", notation: "2. Rd8#" },
    ],
    blackReplies: [{ from: "d7", to: "b8", notation: "1... Nxb8" }],
    hint: "44 legal moves. Only ONE wins: Deflect the d7 knight with a queen sacrifice, then execute checkmate.",
  },
];

export function ChessArena() {
  const [activePuzzleIdx, setActivePuzzleIdx] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [chess, setChess] = useState<Chess>(() => new Chess(PUZZLES[0].fen));
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<string[]>([]);
  const [solvedPuzzles, setSolvedPuzzles] = useState<Set<number>>(new Set());
  const [isWrongMove, setIsWrongMove] = useState(false);
  const [showHintBox, setShowHintBox] = useState(false);
  const [highlightHintSquare, setHighlightHintSquare] = useState<Square | null>(null);
  const [lastMoveStatus, setLastMoveStatus] = useState<string | null>(null);
  const [liveRating, setLiveRating] = useState<string>("LIVE");
  const [isEngineResponding, setIsEngineResponding] = useState(false);
  const engineTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentPuzzle = PUZZLES[activePuzzleIdx];

  // Load puzzle
  const loadPuzzle = useCallback(
    (idx: number) => {
      sound.tick();
      if (engineTimerRef.current) clearTimeout(engineTimerRef.current);
      setActivePuzzleIdx(idx);
      setStepIndex(0);
      const p = PUZZLES[idx];
      setChess(new Chess(p.fen));
      setSelectedSquare(null);
      setLegalMoves([]);
      setIsWrongMove(false);
      setShowHintBox(false);
      setHighlightHintSquare(null);
      setLastMoveStatus(null);
      setIsEngineResponding(false);
    },
    []
  );

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
        setLiveRating("1000 RAPID");
      });
  }, []);

  const handleSquareClick = (square: Square) => {
    if (isEngineResponding) return;

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
      const targetStep = currentPuzzle.whiteSteps[stepIndex];

      if (targetStep && selectedSquare === targetStep.from && square === targetStep.to) {
        // Correct White move
        chess.move({ from: selectedSquare, to: square });
        sound.thock();
        setSelectedSquare(null);
        setLegalMoves([]);
        setIsWrongMove(false);

        // Check if there is a forced Black engine reply for this step
        const blackReply = currentPuzzle.blackReplies[stepIndex];

        if (blackReply) {
          setLastMoveStatus(`${targetStep.notation} — BRILLIANT MOVE!`);
          setIsEngineResponding(true);

          engineTimerRef.current = setTimeout(() => {
            chess.move({ from: blackReply.from, to: blackReply.to });
            sound.thock();
            setStepIndex((prev) => prev + 1);
            setIsEngineResponding(false);
            setLastMoveStatus(`${blackReply.notation} (Forced). NOW DELIVER CHECKMATE!`);
          }, 500);
        } else {
          // Final checkmate delivered!
          sound.checkmate();
          setLastMoveStatus(`${targetStep.notation} — CHECKMATE !!`);

          setSolvedPuzzles((prev) => {
            const next = new Set(prev);
            next.add(currentPuzzle.id);
            return next;
          });

          // Trigger victory confetti
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.65 },
            colors: ["#CCFF00", "#FF3B30", "#F4F4F0"],
          });
        }
      } else {
        // Wrong move
        sound.error();
        setIsWrongMove(true);
        setLastMoveStatus("Incorrect move. Look for the tactical combination.");
        setTimeout(() => {
          setIsWrongMove(false);
          setChess(new Chess(currentPuzzle.fen));
          setStepIndex(0);
          setSelectedSquare(null);
          setLegalMoves([]);
        }, 850);
      }
    }
  };

  const handleShowHint = () => {
    sound.pulse();
    setShowHintBox(true);
    const target = currentPuzzle.whiteSteps[stepIndex];
    if (target) {
      setHighlightHintSquare(target.from);
      setTimeout(() => setHighlightHintSquare(null), 2500);
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
          <div className="lg:col-span-7 flex flex-col items-center gap-4">
            <div
              className={`relative p-2 sm:p-4 bg-[var(--surface)] border-2 border-[var(--border-frame)] shadow-[6px_6px_0px_var(--accent-lime)] max-w-[480px] w-full transition-transform ${
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
                    const isHinted = highlightHintSquare === square;
                    const piece = cell ? (cell.color === "w" ? cell.type.toUpperCase() : cell.type) : null;

                    return (
                      <button
                        key={square}
                        type="button"
                        onClick={() => handleSquareClick(square)}
                        className={`relative flex items-center justify-center aspect-square select-none cursor-pointer transition-all ${
                          isLight ? "bg-[var(--square-light)]" : "bg-[var(--square-dark)]"
                        } ${isSelected ? "ring-2 ring-[var(--accent-lime)] bg-[var(--accent-lime)]/20 z-10" : ""} ${
                          isHinted ? "ring-2 ring-[var(--accent-lime)] animate-pulse z-10" : ""
                        }`}
                        aria-label={`Square ${square}${piece ? ` with ${piece}` : ""}`}
                      >
                        {/* Legal Target Marker */}
                        {isLegalTarget && (
                          <span className="absolute w-3.5 h-3.5 rounded-full bg-[var(--accent-lime)] opacity-90 z-20 pointer-events-none shadow-[0_0_8px_var(--accent-lime)]" />
                        )}

                        {/* High-Contrast Staunton Vector SVG Piece */}
                        {piece && (
                          <div className="w-[80%] h-[80%] flex items-center justify-center z-10">
                            <ChessPiece type={piece} className="w-full h-full" />
                          </div>
                        )}

                        {/* Rank label on left edge */}
                        {cIdx === 0 && (
                          <span className="absolute top-0.5 left-1 text-[9px] font-mono font-bold text-[var(--ink-muted)] opacity-70 pointer-events-none">
                            {ranks[rIdx]}
                          </span>
                        )}
                        {/* File label on bottom edge */}
                        {rIdx === 7 && (
                          <span className="absolute bottom-0.5 right-1 text-[9px] font-mono font-bold text-[var(--ink-muted)] opacity-70 pointer-events-none">
                            {files[cIdx]}
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Quick Puzzle Navigation Bar Under Board */}
            <div className="flex items-center justify-between max-w-[480px] w-full px-1 text-xs font-mono">
              <button
                type="button"
                onClick={() => loadPuzzle((activePuzzleIdx - 1 + PUZZLES.length) % PUZZLES.length)}
                className="inline-flex items-center gap-1 text-[var(--ink-muted)] hover:text-[var(--accent-lime)] cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>PREV PUZZLE</span>
              </button>

              <span className="text-[var(--accent-lime)] font-bold">
                PUZZLE {activePuzzleIdx + 1} OF {PUZZLES.length}
              </span>

              <button
                type="button"
                onClick={() => loadPuzzle((activePuzzleIdx + 1) % PUZZLES.length)}
                className="inline-flex items-center gap-1 text-[var(--ink-muted)] hover:text-[var(--accent-lime)] cursor-pointer"
              >
                <span>NEXT PUZZLE</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Tactical Puzzle Dispatch & Challenge Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Puzzle Selector Tabs */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-lime)] font-bold block">
                TACTICAL PUZZLES (PROGRESSIVE DIFFICULTY)
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
                      className={`w-full p-3 text-left border flex items-center justify-between font-mono text-xs transition-all cursor-pointer ${
                        isCur
                          ? "bg-[var(--surface-raised)] border-[var(--border-frame)] shadow-[4px_4px_0px_var(--accent-lime)] text-[var(--ink-primary)] font-bold"
                          : "bg-[var(--surface)] border-[var(--border-grid)] text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{pz.name}</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 border ${
                            pz.difficulty.includes("HARD")
                              ? "bg-[var(--accent-red)] text-white border-[var(--border-frame)]"
                              : "bg-[var(--canvas)] text-[var(--accent-lime)] border-[var(--border-grid)]"
                          }`}
                        >
                          {pz.difficulty}
                        </span>
                      </div>
                      {pzSolved ? (
                        <span className="inline-flex items-center gap-1 text-[var(--accent-lime)] font-bold">
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

            {/* Hint, Reset & Tactical Status Box */}
            <div className="p-4 bg-[var(--surface)] border border-[var(--border-grid)] font-mono text-xs space-y-3">
              <div className="text-[var(--accent-lime)] font-bold flex items-center justify-between border-b border-[var(--border-grid)] pb-2">
                <span>THEME: {currentPuzzle.theme}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShowHint}
                    className="inline-flex items-center gap-1 text-[var(--ink-muted)] hover:text-[var(--accent-lime)] cursor-pointer"
                    title="Show Tactical Hint"
                  >
                    <Lightbulb className="w-3 h-3" />
                    <span>HINT</span>
                  </button>
                  <span className="text-[var(--border-grid)]">|</span>
                  <button
                    type="button"
                    onClick={() => loadPuzzle(activePuzzleIdx)}
                    className="inline-flex items-center gap-1 text-[var(--ink-muted)] hover:text-[var(--ink-primary)] cursor-pointer"
                    title="Reset Board"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>RESET</span>
                  </button>
                </div>
              </div>

              {showHintBox ? (
                <p className="text-[var(--accent-lime)] leading-relaxed">
                  TACTICAL CLUE: {currentPuzzle.hint}
                </p>
              ) : (
                <p className="text-[var(--ink-secondary)]">
                  White to move and win. Click a piece to inspect legal targets, then strike.
                </p>
              )}

              {lastMoveStatus && (
                <div
                  className={`pt-2 font-bold border-t border-[var(--border-grid)] ${
                    isSolved
                      ? "text-[var(--accent-lime)]"
                      : isWrongMove
                      ? "text-[var(--accent-red)]"
                      : "text-[var(--ink-primary)]"
                  }`}
                >
                  {lastMoveStatus}
                </div>
              )}
            </div>

            {/* Challenge Unlocked Action */}
            <div className="pt-2">
              {totalSolved > 0 ? (
                <div className="p-4 bg-[var(--surface-raised)] border-2 border-[var(--accent-lime)] shadow-[5px_5px_0px_var(--accent-lime)] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-lime)]">
                    <Trophy className="w-4 h-4" />
                    <span>
                      {totalSolved === 3
                        ? "GRANDMASTER CLEARANCE: 3/3 SOLVED !!"
                        : `CHALLENGE UNLOCKED (${totalSolved}/3 PUZZLES SOLVED)`}
                    </span>
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
