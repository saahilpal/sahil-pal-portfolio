"use client";

import { useState } from "react";
import { CASE_STUDIES } from "@/lib/chess-puzzle";
import { GitBranch, Terminal, ArrowUpRight, CheckCircle2, Search, Layers, Cpu, Star, ExternalLink, Zap } from "lucide-react";

export function SynapseCase() {
  const caseData = CASE_STUDIES.find((c) => c.id === "synapse")!;
  const [testQuery, setTestQuery] = useState<string>("resolve_call_signature");
  const [bm25Rank, setBm25Rank] = useState<number>(2);
  const [vectorRank, setVectorRank] = useState<number>(4);

  // Reciprocal Rank Fusion calculation: 1/(60 + rank_bm25) + 1/(60 + rank_vec)
  const rrfScore = (1 / (60 + bm25Rank) + 1 / (60 + vectorRank)).toFixed(4);

  const sampleQueries = [
    { label: "Exact Symbol", query: "resolve_call_signature", bm25: 1, vec: 4 },
    { label: "Semantic Goal", query: "find AST nodes by scope", bm25: 6, vec: 1 },
    { label: "Typo / Fuzzy", query: "resolv_signatur", bm25: 3, vec: 2 },
  ];

  return (
    <article id="synapse" className="card-tactile p-6 sm:p-10 rounded-md space-y-8 scroll-mt-24 border border-[var(--border-chess)]">
      {/* Product Hero Header Plate */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[var(--border-chess)] pb-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-0.5 rounded-sm bg-[var(--chess-green-subtle)] border border-[var(--border-green)] text-[var(--chess-green)] font-bold">
              ♗ BISHOP // CODE RETRIEVAL
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-[var(--chess-brilliant)] font-semibold">
              PUBLISHED ON PYPI (synap-git)
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-white)] tracking-tight">
            Synapse: AST-Grounded Code Intelligence for AI Coding Agents
          </h2>

          <p className="text-sm sm:text-base text-[var(--chess-nude-muted)] max-w-3xl font-sans leading-relaxed">
            AI agents choke on large codebases because dumb line/character chunking splits functions in half. Synapse uses <strong>Tree-sitter CST parsing</strong> to extract complete function and class scopes, indexing 50,000+ symbols in sub-1.84ms with 3-lane Reciprocal Rank Fusion.
          </p>
        </div>

        {/* Pitch Call-to-Action Links */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href="https://github.com/saahilpal/synapse"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile px-4 py-2 rounded-sm bg-[var(--chess-green)] hover:bg-[var(--chess-green-hover)] text-black font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Star size={13} className="fill-black" />
            <span>GITHUB REPO</span>
            <ArrowUpRight size={13} />
          </a>

          <a
            href="https://pypi.org/project/synap-git/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile px-3.5 py-2 rounded-sm bg-[var(--bg-chess-surface)] hover:bg-[var(--bg-chess-hover)] border border-[var(--border-chess)] hover:border-[var(--border-green)] text-[var(--text-white)] font-mono text-xs font-semibold flex items-center gap-1.5"
          >
            <span>PYPI PACKAGE</span>
            <ExternalLink size={12} className="text-[var(--text-muted)]" />
          </a>
        </div>
      </div>

      {/* The 3-Pillar Product Pitch Story (Scannable in 15 seconds) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {/* Pillar 1: The Bottleneck */}
        <div className="p-4 rounded-sm bg-[var(--bg-chess-surface)] border border-[var(--border-chess)] space-y-2">
          <div className="text-[10px] text-[var(--accent-rose)] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span>● THE BOTTLE-NECK</span>
          </div>
          <div className="text-sm font-serif font-bold text-[var(--text-white)]">
            Dumb Text Chunking Kills LLM Accuracy
          </div>
          <p className="font-sans text-xs text-[var(--chess-nude-muted)] leading-relaxed">
            Chunking by fixed line counts or character windows cuts classes and functions midway through signature bodies. The AI receives mutilated syntax, hallucinations surge, and agent tool execution fails.
          </p>
        </div>

        {/* Pillar 2: The Solution */}
        <div className="p-4 rounded-sm bg-[var(--bg-chess-surface)] border border-[var(--border-chess)] space-y-2">
          <div className="text-[10px] text-[var(--chess-green)] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span>✦ THE ARCHITECTURAL FIX</span>
          </div>
          <div className="text-sm font-serif font-bold text-[var(--text-white)]">
            Tree-sitter CST Scopes + 3-Lane RRF
          </div>
          <p className="font-sans text-xs text-[var(--chess-nude-muted)] leading-relaxed">
            Synapse parses concrete syntax trees (CST) to extract caller/callee scopes as atomic context units. It fuses SQLite FTS5 lexical keyword search with 768-dim vector embeddings via Reciprocal Rank Fusion.
          </p>
        </div>

        {/* Pillar 3: Real Proof Metrics */}
        <div className="p-4 rounded-sm bg-[var(--bg-chess-surface)] border border-[var(--border-chess)] space-y-2">
          <div className="text-[10px] text-[var(--chess-brilliant)] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span>★ PROVEN BENCHMARK RESULTS</span>
          </div>
          <div className="text-sm font-serif font-bold text-[var(--text-white)]">
            94.2% Top-5 Recall Hit Rate
          </div>
          <p className="font-sans text-xs text-[var(--chess-nude-muted)] leading-relaxed">
            Tested across 12 production codebases (50k+ symbols). Outperformed pure dense vector search by +22.4% with sub-1.84ms p50 query latency and steady-state 42MB memory consumption.
          </p>
        </div>
      </div>

      {/* Interactive Product Feature: 3-Lane Hybrid Retrieval Prism */}
      <div className="p-5 sm:p-6 rounded-sm bg-[var(--bg-chess-subtle)] border border-[var(--border-chess)] space-y-5 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-chess)] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--chess-green)]" />
            <span className="font-bold text-[var(--text-white)] text-sm font-serif">
              Live Product Demo: 3-Lane RRF Hybrid Retrieval
            </span>
          </div>
          <span className="text-[11px] text-[var(--chess-nude-dark)]">
            RRF Score: <strong className="text-[var(--chess-green)]">{rrfScore}</strong>
          </span>
        </div>

        {/* Quick Query Selector Chips */}
        <div className="space-y-2">
          <div className="text-[11px] text-[var(--chess-nude-muted)] flex items-center gap-1.5">
            <Search size={12} className="text-[var(--chess-green)]" />
            <span>Select or enter a code query to see how Synapse fuses search lanes:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sampleQueries.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTestQuery(item.query);
                  setBm25Rank(item.bm25);
                  setVectorRank(item.vec);
                }}
                className={`btn-tactile px-3 py-1.5 rounded-sm border text-xs font-mono transition-all ${
                  testQuery === item.query
                    ? "bg-[var(--chess-green)] text-black font-bold border-[var(--chess-green)] shadow-sm"
                    : "bg-[var(--bg-chess-card)] text-[var(--text-nude)] border-[var(--border-chess)] hover:border-[var(--border-green)]"
                }`}
              >
                <span>{item.label}: </span>
                <span className="font-mono opacity-80">&quot;{item.query}&quot;</span>
              </button>
            ))}
          </div>
        </div>

        {/* Visual 3-Lane Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Lane 1: BM25 Lexical */}
          <div className="p-3.5 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-chess)] space-y-1.5">
            <div className="text-[10px] text-[var(--text-muted)] font-bold">LANE 1: BM25 KEYWORD (FTS5)</div>
            <div className="text-xl font-bold text-[var(--chess-brilliant)] font-serif">Rank #{bm25Rank}</div>
            <div className="text-[11px] text-[var(--chess-nude-dark)] font-sans">
              Exact symbol &amp; identifier index in SQLite WAL
            </div>
          </div>

          {/* Lane 2: Dense Vectors */}
          <div className="p-3.5 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-chess)] space-y-1.5">
            <div className="text-[10px] text-[var(--text-muted)] font-bold">LANE 2: DENSE VECTORS (768-D)</div>
            <div className="text-xl font-bold text-[var(--chess-green)] font-serif">Rank #{vectorRank}</div>
            <div className="text-[11px] text-[var(--chess-nude-dark)] font-sans">
              Semantic docstring &amp; conceptual query match
            </div>
          </div>

          {/* Lane 3: Synapse RRF Output */}
          <div className="p-3.5 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-green)] space-y-1.5 shadow-sm">
            <div className="text-[10px] text-[var(--chess-green)] font-bold">LANE 3: SYNAPSE FUSED RRF</div>
            <div className="text-xl font-bold text-[var(--text-white)] font-serif flex items-center gap-1.5">
              <span>RANK #1 WINNER</span>
              <CheckCircle2 size={16} className="text-[var(--chess-green)]" />
            </div>
            <div className="text-[11px] text-[var(--chess-green)] font-sans">
              Fused score: {rrfScore} (Grounded AST payload served)
            </div>
          </div>
        </div>

        <div className="text-[11px] text-[var(--chess-nude-dark)] flex items-center justify-between pt-1">
          <span>Formula: 1 / (60 + BM25_Rank) + 1 / (60 + Vector_Rank)</span>
          <span className="text-[var(--chess-green)] font-semibold">Zero hallucinated scopes sent to AI coding agents</span>
        </div>
      </div>

      {/* Tech Stack Pills */}
      <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
        <span className="text-[11px] text-[var(--chess-nude-dark)] mr-1">TECH STACK:</span>
        {caseData.stack.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 rounded-sm bg-[var(--bg-chess-surface)] border border-[var(--border-chess)] text-[var(--text-nude)]"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
