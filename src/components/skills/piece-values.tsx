"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useStaggerReveal } from "@/lib/anime-motion";

interface PieceGroup {
  piece: string;
  symbol: string;
  value: string;
  category: string;
  percentage: number;
  skills: { name: string; context: string; verified: string }[];
}

const PIECE_GROUPS: PieceGroup[] = [
  {
    piece: "QUEEN",
    symbol: "♛",
    value: "9 PTS",
    category: "LLM APPLICATIONS & GROUNDED RAG",
    percentage: 96,
    skills: [
      { name: "Model Context Protocol", context: "JSON-RPC streaming to Claude/Cursor AI coding agents.", verified: "saahilpal/synapse" },
      { name: "Grounded RAG Pipelines", context: "Deterministic paragraph and spatial bounding box offsets.", verified: "saahilpal/RAG-DOCAnalyzer" },
      { name: "Server-Sent Events (SSE)", context: "Real-time token streaming with citation tracking.", verified: "DocAnalyzer Live" },
      { name: "Context Envelope Budgets", context: "Dynamic tiktoken packing avoiding prompt window truncation.", verified: "DocAnalyzer Live" },
    ],
  },
  {
    piece: "ROOK",
    symbol: "♜",
    value: "5 PTS",
    category: "BACKEND, QUEUES & STATE ENGINES",
    percentage: 90,
    skills: [
      { name: "PostgreSQL Concurrency", context: "Row-level queue locks with FOR UPDATE SKIP LOCKED.", verified: "DocAnalyzer Worker Pool" },
      { name: "SQLite WAL Journaling", context: "Lock-free concurrent reads and ACID transactional integrity.", verified: "Synapse Indexer" },
      { name: "Java 17 & Eclipse Vert.x", context: "Asynchronous event loops, JWT sessions, and Redis caching.", verified: "Internship KJC-SDC" },
      { name: "Python 3.11 AsyncIO", context: "High-throughput asynchronous background daemons.", verified: "Synapse Daemon" },
    ],
  },
  {
    piece: "BISHOP",
    symbol: "♝",
    value: "3 PTS",
    category: "RETRIEVAL, EMBEDDINGS & COMPILERS",
    percentage: 88,
    skills: [
      { name: "Tree-sitter AST", context: "Concrete syntax tree traversal and symbol scope resolution.", verified: "saahilpal/synapse" },
      { name: "Hybrid RRF Fusion", context: "Reciprocal Rank Fusion 1/(60+k) merging sparse and dense ranks.", verified: "Synapse Algorithm" },
      { name: "pgvector (HNSW)", context: "Sub-15ms nearest-neighbor vector cosine distance recall.", verified: "DocAnalyzer" },
      { name: "FTS5 BM25 Search", context: "Lexical inverted index queries for exact keyword overrides.", verified: "SQLite FTS5" },
    ],
  },
  {
    piece: "KNIGHT",
    symbol: "♞",
    value: "3 PTS",
    category: "MOBILE & OFFLINE SYSTEMS",
    percentage: 84,
    skills: [
      { name: "Kotlin 2.0 & Jetpack Compose", context: "100% declarative MVI architecture and unidirectional data flows.", verified: "Hera Hosiery Wholesale" },
      { name: "Room DB v13", context: "Offline-first relational schemas with foreign key RESTRICT constraints.", verified: "Hera Billing App" },
      { name: "Android WorkManager", context: "Guaranteed background execution for daily Google Drive sync.", verified: "DailyDriveBackupWorker" },
      { name: "Android 14 Scoped Storage", context: "Internal cache FileProvider adapters eliminating SecurityException.", verified: "Production Hardened" },
    ],
  },
  {
    piece: "PAWN",
    symbol: "♟",
    value: "1 PT",
    category: "DEVELOPER TOOLING & CONSISTENCY",
    percentage: 80,
    skills: [
      { name: "Manifest V3 Extensions", context: "Service worker lifecycle adherence and isolated Shadow DOM injection.", verified: "saahilpal/LeetSync" },
      { name: "GitHub Contents API", context: "Atomic commit trees and automated documentation vaults.", verified: "Octokit REST" },
      { name: "TypeScript & Vite", context: "Strict typing and ultra-fast ESM bundling for companion dashboards.", verified: "LeetSync Companion" },
      { name: "Tailwind CSS", context: "Fluid responsive UI engineering with zero CSS pollution.", verified: "All Shipped Apps" },
    ],
  },
];

export function PieceValues() {
  const [isBarsVisible, setIsBarsVisible] = useState(false);
  const containerRef = useStaggerReveal<HTMLDivElement>(".skill-tier-group", {
    staggerMs: 90,
    duration: 650,
    translateY: 18,
  });

  useEffect(() => {
    const el = document.getElementById("skills");
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsBarsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-16 sm:py-24 border-b border-[var(--border-chess)] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border-chess)] pb-5 gap-3">
          <div className="space-y-1.5">
            <div className="font-mono text-xs text-[var(--chess-green)] uppercase tracking-wider font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--chess-green)]" />
              <span>PIECE VALUES // CAPABILITY HIERARCHY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-white)] tracking-tight">
              Technical Stack &amp; Piece Values
            </h2>
            <p className="text-sm text-[var(--chess-nude-muted)] max-w-2xl">
              Skills mapped to chess piece values and backed by verifiable codebases.
            </p>
          </div>
          <div className="font-mono text-xs text-[var(--chess-nude-dark)] sm:text-right">
            <span>CHESS PIECE VALUES</span>
            <div>TIERED SYSTEM EXPERTISE</div>
          </div>
        </div>

        {/* Piece Groups Grid (Animated Stagger via Anime.js) */}
        <div ref={containerRef} className="space-y-6">
          {PIECE_GROUPS.map((group) => (
            <div
              key={group.piece}
              className="skill-tier-group card-tactile p-4 sm:p-6 rounded-md bg-[var(--bg-chess-card)] border border-[var(--border-chess)] space-y-4 shadow-sm max-w-full overflow-hidden"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-chess)] pb-3 font-mono text-xs">
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  <span className="text-xl text-[var(--chess-green)] font-serif">{group.symbol}</span>
                  <span className="font-bold text-[var(--text-white)] text-sm">{group.piece}:</span>
                  <span className="text-[var(--chess-nude-muted)] text-[11px] sm:text-xs">{group.category}</span>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[10px] text-[var(--chess-nude-dark)] font-mono">{group.percentage}% MASTERY</span>
                  <span className="px-2.5 py-0.5 rounded-sm bg-[var(--chess-green-subtle)] border border-[var(--border-green)] text-[var(--chess-green)] font-bold text-[11px]">
                    {group.value}
                  </span>
                </div>
              </div>

              {/* Skills Chart Bar Growing from Zero */}
              <div className="w-full bg-[var(--bg-chess-dark)] h-1.5 rounded-full overflow-hidden border border-[var(--border-chess)]/40 relative">
                <div
                  className="h-full bg-gradient-to-r from-[var(--chess-green)] to-[var(--chess-brilliant)] rounded-full transition-transform duration-1000 ease-out origin-left"
                  style={{
                    width: `${group.percentage}%`,
                    transform: isBarsVisible ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                  }}
                />
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3.5 rounded-sm bg-[var(--bg-chess-dark)] border border-[var(--border-chess)] space-y-2 flex flex-col justify-between hover:border-[var(--border-green)] transition-colors"
                  >
                    <div>
                      <div className="font-bold text-[var(--text-white)] text-xs">{skill.name}</div>
                      <div className="text-[11px] text-[var(--chess-nude-muted)] leading-relaxed font-sans mt-1">
                        {skill.context}
                      </div>
                    </div>
                    <div className="pt-2 border-t border-[var(--border-chess)] text-[10px] text-[var(--chess-green)] flex items-center gap-1 font-semibold">
                      <Check size={11} className="stroke-[3]" />
                      <span>{skill.verified}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
