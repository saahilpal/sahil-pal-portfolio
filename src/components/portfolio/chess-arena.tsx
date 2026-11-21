"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Chess, Square } from "chess.js";
import confetti from "canvas-confetti";
import { sound } from "@/lib/audio";
import { PROFILE_CORE } from "@/lib/portfolio-data";
import {
  ExternalLink,
  RotateCcw,
  Check,
  Trophy,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Copy,
} from "lucide-react";
import { ChessPiece } from "./chess-piece";

interface Step {
  from: Square;
  to: Square;
  notation: string;
  isBrilliant?: boolean;
}

interface Puzzle {
  id: number;
  name: string;
  theme: string;
  fen: string;
  whiteStep1: Step;
  blackReply: Step;
  whiteStep2: Step;
  hint: string;
  challengeNote: string;
}

const PUZZLES: Puzzle[] = [
  {
    id: 1,
    name: "01 // PHILIDOR SMOTHERED MATE",
    theme: "Queen Sacrifice & Smothered Mate",
    fen: "5r1k/6pp/7N/8/8/1Q6/5PPP/6K1 w - - 0 1",
    whiteStep1: { from: "b3", to: "g8", notation: "1. Qg8+!!", isBrilliant: true },
    blackReply: { from: "f8", to: "g8", notation: "1... Rxg8" },
    whiteStep2: { from: "h6", to: "f7", notation: "2. Nf7#" },
    hint: "Sacrifice the Queen on g8 to lure Black's Rook into smothering its own King, then jump the Knight to f7.",
    challengeNote:
      "Solved your Philidor Smothered Mate (1. Qg8+!! Rxg8 2. Nf7#) — ready for 3+0 blitz on chess.com/member/sahill17",
  },
  {
    id: 2,
    name: "02 // ANASTASIA'S MATE",
    theme: "Knight Anchor & Rook File Slice",
    fen: "7k/4Nppp/8/7Q/8/5R2/5PPP/6K1 w - - 0 1",
    whiteStep1: { from: "h5", to: "h7", notation: "1. Qxh7+!!", isBrilliant: true },
    blackReply: { from: "h8", to: "h7", notation: "1... Kxh7" },
    whiteStep2: { from: "f3", to: "h3", notation: "2. Rh3#" },
    hint: "Your Knight on e7 seals the g8 escape square. Sacrifice the Queen on h7 to drag the King onto the h-file, then swing the Rook to h3.",
    challengeNote:
      "Solved your Anastasia Mate (1. Qxh7+!! Kxh7 2. Rh3#) — ready for 3+0 blitz on chess.com/member/sahill17",
  },
  {
    id: 3,
    name: "03 // BODEN'S CRISS-CROSS MATE",
    theme: "Queen Sacrifice & Double Bishop Criss-Cross",
    fen: "2k1r3/pp3ppp/2p1p3/8/5B2/2Q5/PPP2PPP/2KR1B2 w - - 0 1",
    whiteStep1: { from: "c3", to: "c6", notation: "1. Qxc6+!!" },
    blackReply: { from: "b7", to: "c6", notation: "1... bxc6" },
    whiteStep2: { from: "f1", to: "a6", notation: "2. Ba6#" },
    hint: "Sacrifice your Queen on c6 to deflect Black's b-pawn and open the light diagonal, then slice your f1 Bishop to a6 for criss-cross mate.",
    challengeNote:
      "Solved your Boden's Criss-Cross Mate (1. Qxc6+!! bxc6 2. Ba6#) — ready for 3+0 blitz on chess.com/member/sahill17",
  },
];

export function ChessArena() {
  const [activePuzzleIdx, setActivePuzzleIdx] = useState(0);
  const [stepPhase, setStepPhase] = useState<1 | 2>(1);
  const [chess, setChess] = useState<Chess>(() => new Chess(PUZZLES[0].fen));
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<string[]>([]);
  const [solvedPuzzles, setSolvedPuzzles] = useState<Set<number>>(new Set());
  const [isWrongMove, setIsWrongMove] = useState(false);
  const [showHintBox, setShowHintBox] = useState(false);
  const [highlightHintSquare, setHighlightHintSquare] = useState<Square | null>(null);
  const [brilliantSquare, setBrilliantSquare] = useState<Square | null>(null);
  const [lastMoveSquares, setLastMoveSquares] = useState<{ from?: Square; to?: Square }>({});
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [lastStatus, setLastStatus] = useState<string | null>(null);
  const [copiedChallenge, setCopiedChallenge] = useState(false);
  const [liveRating, setLiveRating] = useState<string>("LIVE");
  const [isEngineResponding, setIsEngineResponding] = useState(false);
  const engineTimerRef = useRef<NodeJS.Timeout | null>(null);
  const wrongMoveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentPuzzle = PUZZLES[activePuzzleIdx];

  // Load puzzle
  const loadPuzzle = useCallback(
    (idx: number) => {
      sound.relay();
      if (engineTimerRef.current) clearTimeout(engineTimerRef.current);
      if (wrongMoveTimerRef.current) clearTimeout(wrongMoveTimerRef.current);
      setActivePuzzleIdx(idx);
      setStepPhase(1);
      const p = PUZZLES[idx];
      setChess(new Chess(p.fen));
      setSelectedSquare(null);
      setLegalMoves([]);
      setIsWrongMove(false);
      setShowHintBox(false);
      setHighlightHintSquare(null);
      setBrilliantSquare(null);
      setLastMoveSquares({});
      setMoveHistory([]);
      setLastStatus(null);
      setIsEngineResponding(false);
    },
    []
  );

  // Fetch verified rating from Chess.com with graceful fallback
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

  // Execute a candidate move
  const executeMove = (from: Square, to: Square) => {
    if (isEngineResponding) return;

    if (stepPhase === 1) {
      // Step 1: User must play whiteStep1
      const target = currentPuzzle.whiteStep1;
      if (from === target.from && to === target.to) {
        const nextChess = new Chess(chess.fen());
        nextChess.move({ from, to });
        setChess(nextChess);
        sound.check();
        setSelectedSquare(null);
        setLegalMoves([]);
        setIsWrongMove(false);
        setLastMoveSquares({ from, to });
        setMoveHistory([target.notation]);

        if (target.isBrilliant) {
          setBrilliantSquare(to);
        }

        setLastStatus(`${target.notation} — BRILLIANT SACRIFICE!`);
        setIsEngineResponding(true);

        // Black auto-replies after exactly 320ms
        engineTimerRef.current = setTimeout(() => {
          const reply = currentPuzzle.blackReply;
          const replyChess = new Chess(nextChess.fen());
          replyChess.move({ from: reply.from, to: reply.to });
          setChess(replyChess);
          sound.reply();
          setLastMoveSquares({ from: reply.from, to: reply.to });
          setMoveHistory([target.notation, reply.notation]);
          setStepPhase(2);
          setIsEngineResponding(false);
          setLastStatus(`${reply.notation} (Forced). DELIVER CHECKMATE!`);
        }, 320);
      } else {
        // Wrong move for step 1
        handleWrongMove();
      }
    } else if (stepPhase === 2) {
      // Step 2: User must play whiteStep2 (Checkmate)
      const target = currentPuzzle.whiteStep2;
      if (from === target.from && to === target.to) {
        const mateChess = new Chess(chess.fen());
        mateChess.move({ from, to });
        setChess(mateChess);
        sound.checkmate();
        setSelectedSquare(null);
        setLegalMoves([]);
        setIsWrongMove(false);
        setLastMoveSquares({ from, to });
        setMoveHistory((prev) => [...prev, target.notation]);
        setLastStatus(`${target.notation} — CHECKMATE !! PUZZLE SOLVED`);

        setSolvedPuzzles((prev) => {
          const next = new Set(prev);
          next.add(currentPuzzle.id);
          return next;
        });

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.65 },
          colors: ["#CCFF00", "#FF3B30", "#3B82F6", "#F4F4F0"],
        });
      } else {
        // Wrong move for step 2
        handleWrongMove();
      }
    }
  };

  const handleWrongMove = () => {
    sound.error();
    setIsWrongMove(true);
    setLastStatus("Incorrect move. Defended by Black. Try again.");
    if (wrongMoveTimerRef.current) clearTimeout(wrongMoveTimerRef.current);
    wrongMoveTimerRef.current = setTimeout(() => {
      setIsWrongMove(false);
      setChess(new Chess(currentPuzzle.fen));
      setStepPhase(1);
      setSelectedSquare(null);
      setLegalMoves([]);
      setBrilliantSquare(null);
      setLastMoveSquares({});
      setMoveHistory([]);
    }, 750);
  };

  const handleSquareClick = (square: Square) => {
    if (isEngineResponding) return;

    const piece = chess.get(square);

    // Click white piece to select
    if (piece && piece.color === "w") {
      const rankNum = parseInt(square[1], 10) || 4;
      sound.chessMove(rankNum);
      setSelectedSquare(square);
      const moves = chess.moves({ square, verbose: true }).map((m) => m.to);
      setLegalMoves(moves);
      setIsWrongMove(false);
      return;
    }

    // Click destination square
    if (selectedSquare) {
      executeMove(selectedSquare, square);
    }
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, square: Square) => {
    if (isEngineResponding) return;
    const piece = chess.get(square);
    if (!piece || piece.color !== "w") return;

    e.dataTransfer.setData("text/plain", square);
    setSelectedSquare(square);
    const moves = chess.moves({ square, verbose: true }).map((m) => m.to);
    setLegalMoves(moves);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetSquare: Square) => {
    e.preventDefault();
    const fromSquare = e.dataTransfer.getData("text/plain") as Square;
    if (fromSquare && fromSquare !== targetSquare) {
      executeMove(fromSquare, targetSquare);
    }
  };

  const handleShowHint = () => {
    sound.pulse();
    setShowHintBox(true);
    const currentTarget = stepPhase === 1 ? currentPuzzle.whiteStep1 : currentPuzzle.whiteStep2;
    if (currentTarget) {
      setHighlightHintSquare(currentTarget.from);
      setTimeout(() => setHighlightHintSquare(null), 2500);
    }
  };

  const handleCopyChallengeNote = async () => {
    try {
      await navigator.clipboard.writeText(currentPuzzle.challengeNote);
      sound.relay();
      setCopiedChallenge(true);
      setTimeout(() => setCopiedChallenge(false), 2400);
    } catch {}
  };

  const isSolved = solvedPuzzles.has(currentPuzzle.id);
  const totalSolved = solvedPuzzles.size;

  const board = chess.board();
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

  return (
    <section
      id="chess"
      aria-label="03 — Playable Chess Arena"
      className="relative z-20 py-16 sm:py-24 border-b border-[var(--border-frame)] bg-[var(--canvas)] text-[var(--ink-primary)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--border-frame)] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[var(--accent-lime)]">
              <span>[03 {"//"} CHESS]</span>
              <span className="text-[var(--border-frame)]">•</span>
              <span>FORCED MATE-IN-2 PUZZLES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-[family-name:var(--font-heading)] font-black tracking-tight uppercase">
              CHESS PUZZLES
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

        {/* Live Algebraic Move Strip + Step Indicator */}
        <div className="p-3 bg-[var(--surface)] border border-[var(--border-frame)] flex flex-wrap items-center justify-between gap-4 font-mono text-xs shadow-[3px_3px_0px_var(--border-frame)]">
          <div className="flex items-center gap-3">
            <span
              className={`px-2 py-0.5 font-bold uppercase ${
                isSolved
                  ? "bg-[var(--accent-lime)] text-black"
                  : "bg-[var(--surface-raised)] border border-[var(--accent-lime)] text-[var(--accent-lime)]"
              }`}
            >
              {isSolved ? "CHECKMATE SOLVED" : `STEP ${stepPhase}/2`}
            </span>
            <span className="text-[var(--ink-muted)]">MOVE STRIP:</span>
            <div className="flex items-center gap-2 font-bold text-sm">
              {moveHistory.length === 0 ? (
                <span className="text-[var(--ink-muted)]">1. ... White to move</span>
              ) : (
                moveHistory.map((m, i) => (
                  <span
                    key={i}
                    className={
                      m.includes("!!")
                        ? "text-[#00E5FF] drop-shadow-[0_0_6px_#00E5FF]"
                        : m.includes("#")
                        ? "text-[var(--accent-lime)] font-black"
                        : "text-[var(--ink-primary)]"
                    }
                  >
                    {m}
                  </span>
                ))
              )}
            </div>
          </div>

          <div className="text-[11px] text-[var(--ink-muted)]">
            CLICK OR DRAG PIECES • BLACK AUTO-REPLIES IN 320ms
          </div>
        </div>

        {/* Arena Grid: Left Chessboard + Right Puzzle Controls & Challenge Link */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 8x8 Interactive Brutalist Chessboard */}
          <div className="lg:col-span-7 flex flex-col items-center gap-4">
            <div
              className={`relative p-2 sm:p-4 bg-[var(--surface)] border-2 border-[var(--border-frame)] shadow-[4px_4px_0px_var(--accent-lime)] sm:shadow-[6px_6px_0px_var(--accent-lime)] max-w-[440px] sm:max-w-[480px] w-full transition-transform ${
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
                    const isLastFrom = lastMoveSquares.from === square;
                    const isLastTo = lastMoveSquares.to === square;
                    const hasBrilliantBadge = brilliantSquare === square;
                    const piece = cell ? (cell.color === "w" ? cell.type.toUpperCase() : cell.type) : null;
                    const isWhitePiece = cell?.color === "w";

                    return (
                      <button
                        key={square}
                        data-square={square}
                        type="button"
                        onClick={() => handleSquareClick(square)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, square)}
                        className={`relative flex items-center justify-center aspect-square select-none cursor-pointer transition-all border border-[var(--border-grid)]/25 ${
                          isLight ? "bg-[var(--square-light)] shadow-inner" : "bg-[var(--square-dark)] shadow-inner"
                        } ${isSelected ? "ring-2 ring-[var(--accent-lime)] bg-[var(--accent-lime)]/25 z-10" : ""} ${
                          isHinted ? "ring-2 ring-[var(--accent-lime)] animate-pulse z-10" : ""
                        } ${
                          isLastFrom || isLastTo
                            ? "bg-[var(--accent-blue)]/25 ring-1 ring-[var(--accent-blue)]"
                            : ""
                        }`}
                        aria-label={`Square ${square}${piece ? ` with ${piece}` : ""}`}
                      >
                        {/* Legal Target Marker */}
                        {isLegalTarget && (
                          <span className="absolute w-3.5 h-3.5 rounded-full bg-[var(--accent-lime)] opacity-95 z-20 pointer-events-none shadow-[0_0_10px_var(--accent-lime)] ring-2 ring-black/40" />
                        )}

                        {/* Teal Brilliant Move Badge (!!) */}
                        {hasBrilliantBadge && (
                          <span className="absolute top-0.5 right-0.5 px-1 py-0.2 bg-[#00E5FF] text-black font-black text-[9px] font-mono rounded-sm shadow-[0_0_8px_#00E5FF] z-30 animate-bounce">
                            !!
                          </span>
                        )}

                        {/* High-Contrast Staunton Vector SVG Piece (Draggable on White) */}
                        {piece && (
                          <div
                            draggable={isWhitePiece && !isEngineResponding}
                            onDragStart={(e) => handleDragStart(e, square)}
                            className={`w-[82%] h-[82%] flex items-center justify-center z-10 transition-transform ${
                              isWhitePiece ? "cursor-grab active:cursor-grabbing hover:scale-105" : "cursor-default"
                            }`}
                          >
                            <ChessPiece type={piece} className="w-full h-full" />
                          </div>
                        )}

                        {/* Rank label on left edge */}
                        {cIdx === 0 && (
                          <span className={`absolute top-0.5 left-1 text-[9px] font-mono font-extrabold pointer-events-none ${
                            isLight ? "text-[var(--ink-primary)]" : "text-[var(--ink-muted)]"
                          }`}>
                            {ranks[rIdx]}
                          </span>
                        )}
                        {/* File label on bottom edge */}
                        {rIdx === 7 && (
                          <span className={`absolute bottom-0.5 right-1 text-[9px] font-mono font-extrabold pointer-events-none ${
                            isLight ? "text-[var(--ink-primary)]" : "text-[var(--ink-muted)]"
                          }`}>
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
                FORCED MATE-IN-2 COMBINATIONS
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
                        <span className="text-[9px] px-1.5 py-0.2 border bg-[var(--canvas)] text-[var(--accent-lime)] border-[var(--border-grid)]">
                          MATE IN 2
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
                  White to move. Find the forced Queen/Rook sacrifice, wait for Black&apos;s auto-reply, then deliver mate.
                </p>
              )}

              {lastStatus && (
                <div
                  className={`pt-2 font-bold border-t border-[var(--border-grid)] ${
                    isSolved
                      ? "text-[var(--accent-lime)]"
                      : isWrongMove
                      ? "text-[var(--accent-red)]"
                      : "text-[var(--ink-primary)]"
                  }`}
                >
                  {lastStatus}
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
                        ? "ALL 3/3 PUZZLES SOLVED!"
                        : `CHALLENGE UNLOCKED (${totalSolved}/3 PUZZLES SOLVED)`}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[var(--ink-primary)]">
                    Send a game challenge directly to Sahil on Chess.com or copy the challenge note.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <a
                      href={PROFILE_CORE.chessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.chessMove(4)}
                      className="brutalist-btn brutalist-btn-primary flex-1 py-2.5 text-xs gap-1.5"
                    >
                      <span>♔ PLAY ON CHESS.COM</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyChallengeNote}
                      className="brutalist-btn py-2.5 px-3 text-xs gap-1.5"
                    >
                      {copiedChallenge ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[var(--accent-lime)]" />
                          <span>NOTE COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>COPY NOTE</span>
                        </>
                      )}
                    </button>
                  </div>
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
