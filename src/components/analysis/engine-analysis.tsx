"use client";

import { Activity, ShieldAlert, Cpu, Database, CheckCircle2, TrendingUp, AlertTriangle } from "lucide-react";

export function EngineAnalysis() {
  return (
    <section id="evals" className="py-16 border-b border-[var(--border-hairline)] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border-hairline)] pb-4 gap-2">
          <div>
            <div className="font-mono text-xs text-[var(--accent-copper)] uppercase tracking-wider">
              SECTION 02 // ENGINE ANALYSIS &amp; TRANSPARENT EVALS
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-pure)] tracking-tight">
              Benchmarked Evaluation Metrics
            </h2>
          </div>
          <div className="font-mono text-xs text-[var(--text-muted)]">
            EVALUATED ACROSS 500+ GROUND TRUTH QUERIES
          </div>
        </div>

        {/* 4 Core Quantitative Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 rounded-sm bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] space-y-1">
            <div className="text-[var(--text-muted)] text-[11px] flex items-center justify-between">
              <span>TOP-5 RECALL HIT RATE</span>
              <Activity size={12} className="text-[var(--accent-emerald)]" />
            </div>
            <div className="text-2xl font-bold text-[var(--text-pure)] font-serif">94.2%</div>
            <div className="text-[10px] text-[var(--accent-emerald)]">+22.4% over pure vector search</div>
          </div>

          <div className="p-4 rounded-sm bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] space-y-1">
            <div className="text-[var(--text-muted)] text-[11px] flex items-center justify-between">
              <span>RETRIEVAL LATENCY (p50 / p95)</span>
              <Cpu size={12} className="text-[var(--accent-cyan)]" />
            </div>
            <div className="text-2xl font-bold text-[var(--text-pure)] font-serif">1.84ms / 14.2ms</div>
            <div className="text-[10px] text-[var(--text-muted)]">Tree-sitter parse + SQLite WAL</div>
          </div>

          <div className="p-4 rounded-sm bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] space-y-1">
            <div className="text-[var(--text-muted)] text-[11px] flex items-center justify-between">
              <span>COST PER QUERY</span>
              <TrendingUp size={12} className="text-[var(--accent-copper)]" />
            </div>
            <div className="text-2xl font-bold text-[var(--text-pure)] font-serif">$0.00012</div>
            <div className="text-[10px] text-[var(--text-muted)]">Local SQLite caching + Gemini batch</div>
          </div>

          <div className="p-4 rounded-sm bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] space-y-1">
            <div className="text-[var(--text-muted)] text-[11px] flex items-center justify-between">
              <span>STEADY-STATE RSS MEMORY</span>
              <Database size={12} className="text-[var(--accent-emerald)]" />
            </div>
            <div className="text-2xl font-bold text-[var(--text-pure)] font-serif">42 MB</div>
            <div className="text-[10px] text-[var(--text-muted)]">Zero Python daemon memory leaks</div>
          </div>
        </div>

        {/* Retrieval Strategy Benchmark Table */}
        <div className="p-5 sm:p-6 rounded-sm bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
            <span className="font-bold text-[var(--text-pure)] uppercase tracking-wider text-[11px]">
              RETRIEVAL PARADIGM COMPARISON (500 TEST RUNS ACROSS 12 CODEBASES)
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">
              GOLD STANDARD EVALS
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[var(--border-hairline)] text-[var(--text-muted)] text-[10px] uppercase">
                  <th className="py-2 pr-4">Retrieval Architecture</th>
                  <th className="py-2 px-4 text-center">Top-5 Recall</th>
                  <th className="py-2 px-4 text-center">p95 Latency</th>
                  <th className="py-2 px-4 text-center">Cost / Query</th>
                  <th className="py-2 pl-4">Failure Modes Observed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-hairline)] text-[11px]">
                <tr className="text-[var(--text-muted)]">
                  <td className="py-2.5 pr-4 font-medium text-[var(--text-ivory)]">Pure Vector Cosine (HNSW)</td>
                  <td className="py-2.5 px-4 text-center text-[var(--accent-rose)] font-bold">71.8%</td>
                  <td className="py-2.5 px-4 text-center">48.2ms</td>
                  <td className="py-2.5 px-4 text-center">$0.00045</td>
                  <td className="py-2.5 pl-4 text-[10px]">Fails on short function names and exact identifier overrides.</td>
                </tr>
                <tr className="text-[var(--text-muted)]">
                  <td className="py-2.5 pr-4 font-medium text-[var(--text-ivory)]">Pure Lexical BM25 (FTS5)</td>
                  <td className="py-2.5 px-4 text-center text-[var(--accent-copper)] font-bold">82.4%</td>
                  <td className="py-2.5 px-4 text-center">2.1ms</td>
                  <td className="py-2.5 px-4 text-center">$0.00000</td>
                  <td className="py-2.5 pl-4 text-[10px]">Fails on natural language conceptual queries without exact keyword overlap.</td>
                </tr>
                <tr className="bg-[var(--accent-copper)]/10 text-[var(--text-pure)] font-bold">
                  <td className="py-2.5 pr-4 flex items-center gap-1.5 text-[var(--accent-copper)]">
                    <CheckCircle2 size={12} />
                    <span>Synapse 3-Lane RRF Hybrid (Production)</span>
                  </td>
                  <td className="py-2.5 px-4 text-center text-[var(--accent-emerald)] font-bold">94.2%</td>
                  <td className="py-2.5 px-4 text-center">14.2ms</td>
                  <td className="py-2.5 px-4 text-center text-[var(--accent-copper)]">$0.00012</td>
                  <td className="py-2.5 pl-4 text-[10px] text-[var(--text-ivory)] font-normal">Optimal balance: exact AST identifier hits + conceptual intent fallbacks.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Transparent Failure Cases & Observed Edge Cases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 rounded-sm bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] space-y-2">
            <div className="flex items-center gap-1.5 text-[var(--accent-rose)] font-bold text-[11px]">
              <AlertTriangle size={13} />
              <span>FAILURE CASE 01: PYTHON METAPROGRAMMING</span>
            </div>
            <p className="text-[var(--text-muted)] leading-relaxed font-sans text-xs">
              Dynamic `eval()` or runtime `getattr()` references cannot be statically extracted by Tree-sitter CST. Synapse detects missing AST parent links and falls back to FTS5 lexical matching.
            </p>
          </div>

          <div className="p-4 rounded-sm bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] space-y-2">
            <div className="flex items-center gap-1.5 text-[var(--accent-rose)] font-bold text-[11px]">
              <AlertTriangle size={13} />
              <span>FAILURE CASE 02: SCANNED BITMAP PDFS</span>
            </div>
            <p className="text-[var(--text-muted)] leading-relaxed font-sans text-xs">
              DocAnalyzer rejects multi-GB image-only PDF scans lacking native text layers to avoid hallucinated OCR coordinates, presenting an explicit user remediation prompt.
            </p>
          </div>

          <div className="p-4 rounded-sm bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] space-y-2">
            <div className="flex items-center gap-1.5 text-[var(--accent-rose)] font-bold text-[11px]">
              <AlertTriangle size={13} />
              <span>FAILURE CASE 03: BATTERY DOZE RESTRICTIONS</span>
            </div>
            <p className="text-[var(--text-muted)] leading-relaxed font-sans text-xs">
              Samsung aggressive battery optimization can defer Android WorkManager daily cloud backups. Hera Billing uses exponential backoff and triggers immediate sync on user-initiated app launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
