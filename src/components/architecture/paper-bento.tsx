"use client";

import { ShieldCheck, Database, GitCommit, Lock, CheckCircle2 } from "lucide-react";

export function PaperBento() {
  const cards = [
    {
      id: "wal-acid",
      tag: "CORE PRINCIPLE // 01",
      stamp: "ACID RESILIENT",
      stampColor: "stamp-green",
      title: "Crash-Resilient State Foundations",
      subtitle: "Designing for unexpected power loss and OS process termination.",
      detail:
        "Every data layer I construct — from Synapse's SQLite WAL engine to Hera Billing's Room v13 database — uses atomic transaction barriers and Write-Ahead Logging. Systems must be mathematically incapable of corrupting persistent state even if the host kills the process mid-write.",
      proofs: [
        "PRAGMA synchronous = NORMAL + WAL journaling in SQLite",
        "Deterministic Room v13 migrations with zero data loss fallback",
        "Foreign Key cascades strictly bounded by RESTRICT rules",
      ],
    },
    {
      id: "grounded-truth",
      tag: "CORE PRINCIPLE // 02",
      stamp: "STRICT GROUNDING",
      stampColor: "stamp-blue",
      title: "Grounded Truth Over Probabilistic Fluff",
      subtitle: "Eliminating generative hallucinations through syntactic and spatial bounds.",
      detail:
        "AI agents must operate on grounded reality, not fuzzy similarity scores. Synapse forces agent queries through Tree-sitter abstract syntax trees and lexical BM25 tables before vector synthesis. DocAnalyzer extracts exact paragraph coordinates, streaming citations that point directly to the source bounding box.",
      proofs: [
        "Tree-sitter concrete syntax trees tracking caller/callee scopes",
        "Reciprocal Rank Fusion (RRF) balancing sparse and dense spaces",
        "Exact paragraph citation offsets verified via SSE streams",
      ],
    },
    {
      id: "concurrency",
      tag: "CORE PRINCIPLE // 03",
      stamp: "ZERO STARVATION",
      stampColor: "stamp-red",
      title: "Asynchronous Concurrency Without Race Conditions",
      subtitle: "Safe multi-worker task execution in high-throughput pipelines.",
      detail:
        "Whether building background document ingestion for DocAnalyzer or Java 17 Vert.x APIs at Kristu Jayanti Software Development Centre, I design concurrent systems using event-driven architectures and row-level queue locks to eliminate thread starvation.",
      proofs: [
        "PostgreSQL worker queue using FOR UPDATE SKIP LOCKED",
        "Non-blocking AsyncIO daemons for file system watching",
        "Reactive StateFlow unidirectional data flow in native Android",
      ],
    },
  ];

  return (
    <section id="architecture" className="py-16 border-b border-[var(--border-paper-strong)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border-paper)] pb-4 gap-2">
          <div>
            <div className="font-mono text-xs text-[var(--text-ink-muted)] uppercase tracking-wider">
              SECTION 02 // ARCHITECTURAL DOCTRINE
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-ink)] tracking-tight">
              Systems Mindset
            </h2>
          </div>
          <div className="font-mono text-xs text-[var(--text-ink-muted)]">
            3 ENGINEERING PILLARS OF MY WORK
          </div>
        </div>

        {/* 3-Column Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div
              key={c.id}
              className="paper-sheet p-6 sm:p-7 rounded-sm space-y-4 relative flex flex-col justify-between"
            >
              {/* Corner crosshair */}
              <div className="absolute top-2.5 right-2.5 font-mono text-[9px] text-[var(--text-ink-faint)]">+</div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[var(--text-ink-muted)] uppercase tracking-wider">
                    {c.tag}
                  </span>
                  <span className={`stamp-seal ${c.stampColor} text-[8px] py-0.5 px-1.5`}>
                    {c.stamp}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-[var(--text-ink)] leading-snug">
                  {c.title}
                </h3>

                <p className="text-xs font-mono font-medium text-[var(--stamp-blue)]">
                  {c.subtitle}
                </p>

                <p className="text-xs text-[var(--text-ink-secondary)] leading-relaxed font-sans">
                  {c.detail}
                </p>
              </div>

              {/* Concrete Proofs */}
              <div className="pt-3 border-t border-[var(--border-paper)] space-y-1.5 font-mono text-[11px] text-[var(--text-ink-muted)]">
                {c.proofs.map((proof, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className="text-[var(--stamp-green)] font-bold">✓</span>
                    <span className="text-[var(--text-ink-secondary)]">{proof}</span>
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
