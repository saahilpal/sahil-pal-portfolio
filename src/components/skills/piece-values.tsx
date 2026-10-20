"use client";

import { Award, ShieldCheck, Check } from "lucide-react";

interface PieceGroup {
  piece: string;
  symbol: string;
  value: string;
  category: string;
  skills: { name: string; context: string; verified: string }[];
}

const PIECE_GROUPS: PieceGroup[] = [
  {
    piece: "QUEEN",
    symbol: "♛",
    value: "9 PTS",
    category: "LLM APPLICATIONS & GROUNDED RAG",
    skills: [
      { name: "Model Context Protocol", context: "JSON-RPC streaming to Claude/Cursor AI coding agents.", verified: "saahilpal/synapse" },
      { name: "Grounded RAG Pipelines", context: "Deterministic paragraph and spatial bounding box offsets.", verified: "saahilpal/RAG-DOCAnalyzer" },
      { name: "Server-Sent Events (SSE)", context: "Real-time token streaming with citation tracking.", verified: "DocAnalyzer Live" },
      { name: "Prompt Guardrails", context: "Injection resistance and bounded context budget envelopes.", verified: "Grandmaster Engine" },
    ],
  },
  {
    piece: "ROOK",
    symbol: "♜",
    value: "5 PTS",
    category: "BACKEND, QUEUES & STATE ENGINES",
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
    skills: [
      { name: "Manifest V3 Extensions", context: "Service worker lifecycle adherence and isolated Shadow DOM injection.", verified: "saahilpal/LeetSync" },
      { name: "GitHub Contents API", context: "Atomic commit trees and automated documentation vaults.", verified: "Octokit REST" },
      { name: "TypeScript & Vite", context: "Strict typing and ultra-fast ESM bundling for companion dashboards.", verified: "LeetSync Companion" },
      { name: "Tailwind CSS", context: "Fluid responsive UI engineering with zero CSS pollution.", verified: "All Shipped Apps" },
    ],
  },
];

export function PieceValues() {
  return (
    <section id="skills" className="py-16 border-b border-[var(--border-hairline)] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border-hairline)] pb-4 gap-2">
          <div>
            <div className="font-mono text-xs text-[var(--accent-copper)] uppercase tracking-wider">
              PIECE VALUES // CAPABILITY RADAR
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-pure)] tracking-tight">
              Technical Stack &amp; Piece Values
            </h2>
          </div>
          <div className="font-mono text-xs text-[var(--text-muted)]">
            EVALUATED BY PRODUCTION PROOFS
          </div>
        </div>

        {/* Piece Groups Grid */}
        <div className="space-y-6">
          {PIECE_GROUPS.map((group) => (
            <div
              key={group.piece}
              className="p-5 sm:p-6 rounded-sm bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] space-y-4"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-hairline)] pb-3 font-mono text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl text-[var(--accent-copper)]">{group.symbol}</span>
                  <span className="font-bold text-[var(--text-pure)] text-[12px]">{group.piece}:</span>
                  <span className="text-[var(--text-muted)]">{group.category}</span>
                </div>
                <span className="px-2 py-0.5 rounded-xs bg-[var(--accent-copper)]/15 border border-[var(--border-copper)] text-[var(--accent-copper)] font-bold text-[10px]">
                  {group.value}
                </span>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)] space-y-1.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="font-bold text-[var(--text-ivory)] text-[11px]">{skill.name}</div>
                      <div className="text-[10px] text-[var(--text-muted)] leading-relaxed font-sans mt-0.5">
                        {skill.context}
                      </div>
                    </div>
                    <div className="pt-1.5 border-t border-[var(--border-hairline)] text-[9px] text-[var(--accent-emerald)] flex items-center gap-1 font-semibold">
                      <Check size={10} className="stroke-[3]" />
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
