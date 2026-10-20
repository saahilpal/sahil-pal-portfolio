"use client";

import { Activity, Cpu, Database, CheckCircle2, TrendingUp, AlertTriangle } from "lucide-react";
import { useDecimalCounter, useAnimeReveal } from "@/lib/anime-motion";
import { DecodeText } from "@/components/effects/decode-text";

function AnimatedMetric({
  value,
  decimals = 1,
  prefix = "",
  suffix = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useDecimalCounter(value, { decimals, prefix, suffix });
  return (
    <span ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function EngineAnalysis() {
  const sectionRef = useAnimeReveal<HTMLElement>({ translateY: 20, duration: 800 });

  return (
    <section ref={sectionRef} id="evals" className="py-16 sm:py-24 border-b border-[var(--border-chess)] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border-chess)] pb-5 gap-3">
          <div className="space-y-1.5">
            <div className="font-mono text-xs text-[var(--chess-green)] uppercase tracking-wider flex items-center gap-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-[var(--chess-green)] ring-2 ring-[var(--chess-green)]/20" />
              <DecodeText text="SECTION 02 // ENGINE ACCURACY & TRANSPARENT EVALS" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-white)] tracking-tight">
              Benchmarked Evaluation Metrics
            </h2>
            <p className="text-sm text-[var(--chess-nude-muted)] max-w-2xl">
              Real performance numbers measured across 500+ ground truth queries and 12 production codebases. Zero vanity metrics.
            </p>
          </div>
          <div className="font-mono text-xs text-[var(--chess-nude-dark)] sm:text-right">
            <span className="text-[var(--chess-green)] font-bold">GOLD STANDARD EVALS</span>
            <div>500+ RUNS // STATISTICAL CONFIDENCE</div>
          </div>
        </div>

        {/* 4 Core Quantitative Metrics (Animated via Anime.js) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="card-tactile p-5 rounded-md bg-[var(--bg-chess-card)] border border-[var(--border-chess)] space-y-1.5 shadow-sm">
            <div className="text-[var(--text-muted)] text-[11px] flex items-center justify-between">
              <span>TOP-5 RECALL HIT RATE</span>
              <Activity size={14} className="text-[var(--chess-green)]" />
            </div>
            <div className="text-3xl font-bold text-[var(--text-white)] font-serif">
              <AnimatedMetric value={94.2} decimals={1} suffix="%" />
            </div>
            <div className="text-[11px] text-[var(--chess-green)] font-semibold">
              +22.4% over pure vector cosine
            </div>
          </div>

          <div className="card-tactile p-5 rounded-md bg-[var(--bg-chess-card)] border border-[var(--border-chess)] space-y-1.5 shadow-sm">
            <div className="text-[var(--text-muted)] text-[11px] flex items-center justify-between">
              <span>RETRIEVAL LATENCY (p50 / p95)</span>
              <Cpu size={14} className="text-[var(--chess-brilliant)]" />
            </div>
            <div className="text-3xl font-bold text-[var(--text-white)] font-serif">
              <AnimatedMetric value={1.84} decimals={2} suffix="ms" />
              <span className="text-base text-[var(--text-muted)] font-normal ml-1">/ 14.2ms</span>
            </div>
            <div className="text-[11px] text-[var(--chess-nude-dark)] font-sans">
              Tree-sitter parse + SQLite WAL
            </div>
          </div>

          <div className="card-tactile p-5 rounded-md bg-[var(--bg-chess-card)] border border-[var(--border-chess)] space-y-1.5 shadow-sm">
            <div className="text-[var(--text-muted)] text-[11px] flex items-center justify-between">
              <span>COST PER QUERY</span>
              <TrendingUp size={14} className="text-[var(--chess-green)]" />
            </div>
            <div className="text-3xl font-bold text-[var(--text-white)] font-serif">
              $0.00012
            </div>
            <div className="text-[11px] text-[var(--chess-nude-dark)] font-sans">
              Local SQLite caching + Gemini batch
            </div>
          </div>

          <div className="card-tactile p-5 rounded-md bg-[var(--bg-chess-card)] border border-[var(--border-chess)] space-y-1.5 shadow-sm">
            <div className="text-[var(--text-muted)] text-[11px] flex items-center justify-between">
              <span>STEADY-STATE RSS MEMORY</span>
              <Database size={14} className="text-[var(--chess-green)]" />
            </div>
            <div className="text-3xl font-bold text-[var(--text-white)] font-serif">
              <AnimatedMetric value={42} decimals={0} suffix=" MB" />
            </div>
            <div className="text-[11px] text-[var(--chess-green)] font-sans">
              Zero Python daemon memory leaks
            </div>
          </div>
        </div>

        {/* Retrieval Strategy Benchmark Table */}
        <div className="card-tactile p-5 sm:p-6 rounded-md bg-[var(--bg-chess-card)] border border-[var(--border-chess)] space-y-4 font-mono text-xs shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-chess)] pb-3">
            <span className="font-bold text-[var(--text-white)] uppercase tracking-wider text-xs font-serif">
              Retrieval Strategy Benchmark Comparison (500 Test Runs)
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[var(--chess-green)] font-bold">
                ★ REPRODUCIBLE EVAL SCORECARD
              </span>
              <span className="sm:hidden text-[9px] text-[var(--chess-nude-dark)]">
                (Scroll table →)
              </span>
            </div>
          </div>

          <div className="overflow-x-auto -mx-1 sm:mx-0">
            <table className="w-full text-left text-xs min-w-[560px]">
              <thead>
                <tr className="border-b border-[var(--border-chess)] text-[var(--text-muted)] text-[10px] uppercase">
                  <th className="py-2.5 pr-4">Retrieval Architecture</th>
                  <th className="py-2.5 px-4 text-center">Top-5 Recall</th>
                  <th className="py-2.5 px-4 text-center">p95 Latency</th>
                  <th className="py-2.5 px-4 text-center">Cost / Query</th>
                  <th className="py-2.5 pl-4">Failure Modes Observed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-chess)] text-[11px]">
                <tr className="text-[var(--chess-nude-muted)]">
                  <td className="py-3 pr-4 font-medium text-[var(--text-white)]">Pure Vector Cosine (HNSW)</td>
                  <td className="py-3 px-4 text-center text-[var(--accent-rose)] font-bold">71.8%</td>
                  <td className="py-3 px-4 text-center">48.2ms</td>
                  <td className="py-3 px-4 text-center">$0.00045</td>
                  <td className="py-3 pl-4 text-[10px] font-sans">Fails on short function names and exact identifier overrides.</td>
                </tr>
                <tr className="text-[var(--chess-nude-muted)]">
                  <td className="py-3 pr-4 font-medium text-[var(--text-white)]">Pure Lexical BM25 (FTS5)</td>
                  <td className="py-3 px-4 text-center text-[var(--accent-amber)] font-bold">82.4%</td>
                  <td className="py-3 px-4 text-center">2.1ms</td>
                  <td className="py-3 px-4 text-center">$0.00000</td>
                  <td className="py-3 pl-4 text-[10px] font-sans">Fails on natural language conceptual queries without exact keyword overlap.</td>
                </tr>
                <tr className="bg-[var(--chess-green-subtle)] text-[var(--text-white)] font-bold">
                  <td className="py-3 pr-4 flex items-center gap-1.5 text-[var(--chess-green)]">
                    <CheckCircle2 size={13} />
                    <span>Synapse 3-Lane RRF Hybrid (Production)</span>
                  </td>
                  <td className="py-3 px-4 text-center text-[var(--chess-green)] font-bold">94.2%</td>
                  <td className="py-3 px-4 text-center">14.2ms</td>
                  <td className="py-3 px-4 text-center text-[var(--chess-green)]">$0.00012</td>
                  <td className="py-3 pl-4 text-[10px] text-[var(--chess-nude)] font-normal font-sans">Optimal balance: exact AST identifier hits + conceptual intent fallbacks.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Transparent Failure Cases & Observed Edge Cases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="card-tactile p-4 sm:p-5 rounded-md bg-[var(--bg-chess-card)] border border-[var(--border-chess)] space-y-2">
            <div className="flex items-center gap-1.5 text-[var(--accent-rose)] font-bold text-[11px]">
              <AlertTriangle size={13} />
              <span>EDGE CASE 01: PYTHON METAPROGRAMMING</span>
            </div>
            <p className="text-[var(--chess-nude-muted)] leading-relaxed font-sans text-xs">
              Dynamic `eval()` or runtime `getattr()` references cannot be statically extracted by Tree-sitter CST. Synapse detects missing AST parent links and automatically falls back to FTS5 lexical matching.
            </p>
          </div>

          <div className="card-tactile p-4 sm:p-5 rounded-md bg-[var(--bg-chess-card)] border border-[var(--border-chess)] space-y-2">
            <div className="flex items-center gap-1.5 text-[var(--accent-rose)] font-bold text-[11px]">
              <AlertTriangle size={13} />
              <span>EDGE CASE 02: SCANNED BITMAP PDFS</span>
            </div>
            <p className="text-[var(--chess-nude-muted)] leading-relaxed font-sans text-xs">
              DocAnalyzer explicitly rejects multi-GB image-only PDF scans lacking native text layers to avoid hallucinated OCR coordinates, returning actionable remediation guidance.
            </p>
          </div>

          <div className="card-tactile p-4 sm:p-5 rounded-md bg-[var(--bg-chess-card)] border border-[var(--border-chess)] space-y-2">
            <div className="flex items-center gap-1.5 text-[var(--accent-rose)] font-bold text-[11px]">
              <AlertTriangle size={13} />
              <span>EDGE CASE 03: ANDROID DOZE SLEEP</span>
            </div>
            <p className="text-[var(--chess-nude-muted)] leading-relaxed font-sans text-xs">
              OEM battery optimizations can defer Android WorkManager cloud backups. Hera Billing uses exponential backoff and triggers immediate sync on user-initiated app launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
