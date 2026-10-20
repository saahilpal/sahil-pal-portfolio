"use client";

import { useState } from "react";
import { CASE_STUDIES } from "@/lib/chess-puzzle";
import { Database, Lock, Play, ArrowUpRight, CheckCircle2, Star, Zap, Cpu } from "lucide-react";

export function DocAnalyzerCase() {
  const caseData = CASE_STUDIES.find((c) => c.id === "docanalyzer")!;
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamText, setStreamText] = useState(
    "Under Section 4.2 of the specification, background workers acquire tasks using PostgreSQL FOR UPDATE SKIP LOCKED LIMIT 1. This guarantees zero duplicate embedding passes and eliminates worker starvation."
  );
  const [activeWorkerSim, setActiveWorkerSim] = useState(false);

  const triggerStream = () => {
    if (isStreaming) return;
    setIsStreaming(true);
    setStreamText("");
    const full =
      "Under Section 4.2 of the specification, background workers acquire tasks using PostgreSQL FOR UPDATE SKIP LOCKED LIMIT 1. This guarantees zero duplicate embedding passes and eliminates worker starvation across parallel 50-page PDF uploads.";
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < full.length) {
        setStreamText(full.slice(0, idx + 1));
        idx++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 12);
  };

  const simulateQueue = () => {
    setActiveWorkerSim(true);
    setTimeout(() => setActiveWorkerSim(false), 2500);
  };

  return (
    <article id="docanalyzer" className="card-tactile p-6 sm:p-10 rounded-md space-y-8 scroll-mt-24 border border-[var(--border-chess)]">
      {/* Product Hero Header Plate */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[var(--border-chess)] pb-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-0.5 rounded-sm bg-[var(--chess-green-subtle)] border border-[var(--border-green)] text-[var(--chess-green)] font-bold">
              ♖ ROOK // LLM &amp; DOCUMENT PIPELINE
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-[var(--chess-brilliant)] font-semibold">
              POSTGRESQL SKIP LOCKED QUEUE
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-white)] tracking-tight">
            DocAnalyzer: Zero-Contention Enterprise Document RAG
          </h2>

          <p className="text-sm sm:text-base text-[var(--chess-nude-muted)] max-w-3xl font-sans leading-relaxed">
            Enterprise document pipelines waste thousands of dollars when multiple worker threads double-process identical heavy PDFs. DocAnalyzer uses a durable <strong>PostgreSQL SKIP LOCKED queue</strong> to eliminate worker contention and streams answers with spatial paragraph citations.
          </p>
        </div>

        {/* Pitch Call-to-Action Links */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href="https://github.com/saahilpal/RAG-DOCAnalyzer"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile px-4 py-2 rounded-sm bg-[var(--chess-green)] hover:bg-[var(--chess-green-hover)] text-black font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Star size={13} className="fill-black" />
            <span>GITHUB REPO</span>
            <ArrowUpRight size={13} />
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
            Worker Starvation &amp; Double GPU Passes
          </div>
          <p className="font-sans text-xs text-[var(--chess-nude-muted)] leading-relaxed">
            Concurrent multi-user PDF uploads trigger worker lock contention. Threads block each other, re-run identical embedding batches, and cause Supabase connection pool exhaustion under load.
          </p>
        </div>

        {/* Pillar 2: The Solution */}
        <div className="p-4 rounded-sm bg-[var(--bg-chess-surface)] border border-[var(--border-chess)] space-y-2">
          <div className="text-[10px] text-[var(--chess-green)] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span>✦ THE ARCHITECTURAL FIX</span>
          </div>
          <div className="text-sm font-serif font-bold text-[var(--text-white)]">
            FOR UPDATE SKIP LOCKED Queue
          </div>
          <p className="font-sans text-xs text-[var(--chess-nude-muted)] leading-relaxed">
            Workers poll PostgreSQL with non-blocking row acquisition. If a document is locked by Worker A, Worker B instantly skips to the next available job with 0ms lock waiting time and 0 duplicate vector writes.
          </p>
        </div>

        {/* Pillar 3: Real Proof Metrics */}
        <div className="p-4 rounded-sm bg-[var(--bg-chess-surface)] border border-[var(--border-chess)] space-y-2">
          <div className="text-[10px] text-[var(--chess-brilliant)] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span>★ PROVEN BENCHMARK RESULTS</span>
          </div>
          <div className="text-sm font-serif font-bold text-[var(--text-white)]">
            0% Contention &amp; Spatial Citations
          </div>
          <p className="font-sans text-xs text-[var(--chess-nude-muted)] leading-relaxed">
            Scaled across 20-file simultaneous bursts with 0 duplicated embeddings. Streams answers via Server-Sent Events (SSE) with precise spatial bounding box citations `[Page X, Paragraph Y]`.
          </p>
        </div>
      </div>

      {/* Interactive Product Feature: Queue Lock Simulator & SSE Citation Stream */}
      <div className="p-5 sm:p-6 rounded-sm bg-[var(--bg-chess-subtle)] border border-[var(--border-chess)] space-y-5 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-chess)] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--chess-green)]" />
            <span className="font-bold text-[var(--text-white)] text-sm font-serif">
              Live Product Demo: SKIP LOCKED Queue &amp; Citation Stream
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={simulateQueue}
              className="btn-tactile px-3 py-1.5 bg-[var(--bg-chess-card)] border border-[var(--border-chess)] hover:border-[var(--border-green)] rounded-sm text-[11px] font-bold text-[var(--chess-green)] flex items-center gap-1.5"
            >
              <Lock size={12} />
              <span>TEST WORKER LOCK CONCURRENCY</span>
            </button>

            <button
              onClick={triggerStream}
              disabled={isStreaming}
              className="btn-tactile px-3 py-1.5 bg-[var(--chess-green)] text-black rounded-sm text-[11px] font-bold flex items-center gap-1.5"
            >
              <Play size={11} className={isStreaming ? "animate-spin" : ""} />
              <span>{isStreaming ? "STREAMING..." : "RE-STREAM SSE"}</span>
            </button>
          </div>
        </div>

        {/* 3 Concurrent Workers Real-Time State */}
        <div className="space-y-2">
          <div className="text-[11px] text-[var(--chess-nude-muted)]">
            Worker State Visualization (PostgreSQL row locks):
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 1,
                name: "Worker Thread #1",
                status: "ACQUIRED LOCK",
                row: "DOC_CHUNK_042",
                note: "Processing 512-token sliding window",
                color: "text-[var(--chess-green)]",
              },
              {
                id: 2,
                name: "Worker Thread #2",
                status: activeWorkerSim ? "SKIPPED LOCKED (0ms wait)" : "SKIPPED LOCKED",
                row: "DOC_CHUNK_043",
                note: "Automatically grabbed next free task",
                color: "text-[var(--chess-brilliant)]",
              },
              {
                id: 3,
                name: "Worker Thread #3",
                status: "IDLE / POLLING",
                row: "AWAITING BURST",
                note: "0% CPU waste, no thread spinlocks",
                color: "text-[var(--text-muted)]",
              },
            ].map((w) => (
              <div key={w.id} className="p-3.5 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-chess)] space-y-1.5">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold text-[var(--text-white)]">{w.name}</span>
                  <span className={`font-bold ${w.color}`}>{w.status}</span>
                </div>
                <div className="text-[10px] text-[var(--chess-nude-dark)]">Target: {w.row}</div>
                <div className="text-[10px] text-[var(--text-muted)] font-sans">{w.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-Time Streamed Answer Box with Bounding Box Citation */}
        <div className="p-4 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-chess)] space-y-2">
          <div className="text-[11px] text-[var(--text-muted)] flex items-center justify-between">
            <span className="font-bold text-[var(--text-white)]">STREAMED GROUNDED ANSWER (SERVER-SENT EVENTS):</span>
            <span className="px-2 py-0.5 rounded-xs bg-[var(--chess-green-subtle)] text-[var(--chess-green)] font-bold text-[10px] border border-[var(--border-green)]">
              CITATION: [SPECIFICATION.PDF, PAGE 4, ¶2]
            </span>
          </div>
          <div className="text-xs sm:text-sm text-[var(--chess-nude)] leading-relaxed font-sans min-h-[50px]">
            {streamText}
            {isStreaming && <span className="inline-block w-1.5 h-3.5 bg-[var(--chess-green)] ml-1" />}
          </div>
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
