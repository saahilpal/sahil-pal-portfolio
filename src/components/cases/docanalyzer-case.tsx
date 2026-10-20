"use client";

import { useState } from "react";
import { CASE_STUDIES } from "@/lib/chess-puzzle";
import { Database, Lock, ArrowUpRight, Play, CheckCircle2, FileSearch, ShieldCheck } from "lucide-react";

export function DocAnalyzerCase() {
  const caseData = CASE_STUDIES.find((c) => c.id === "docanalyzer")!;

  const [activeWorker, setActiveWorker] = useState<number>(1);
  const [lockedRow, setLockedRow] = useState<string>("JOB_042 (contract_v2.pdf)");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [streamText, setStreamText] = useState<string>(
    "Under Section 4.2 of the specification, the background ingestion workers acquire locks using PostgreSQL FOR UPDATE SKIP LOCKED. This guarantees zero duplicate embedding passes."
  );

  const triggerStream = () => {
    if (isStreaming) return;
    setIsStreaming(true);
    setStreamText("");
    const full =
      "Under Section 4.2 of the specification, the background ingestion workers acquire locks using PostgreSQL FOR UPDATE SKIP LOCKED. This guarantees zero duplicate embedding passes.";
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < full.length) {
        setStreamText((p) => p + full.charAt(idx));
        idx++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 15);
  };

  return (
    <article id="docanalyzer" className="obsidian-card p-6 sm:p-10 rounded-sm space-y-8 scroll-mt-24">
      {/* Header Plate */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-2 py-0.5 rounded-xs bg-[var(--accent-cyan)]/15 border border-[var(--accent-cyan)] text-[var(--accent-cyan)] font-bold">
              MOVE 2: ROOK // 2. Rxf6+
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-[var(--accent-emerald)] font-semibold">LLM PIPELINE &amp; DURABLE QUEUES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-pure)]">
            {caseData.title}
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-3xl font-sans">
            {caseData.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {caseData.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xs border border-[var(--border-hairline)] hover:border-[var(--text-pure)] bg-[var(--bg-obsidian-subtle)] text-[var(--text-ivory)] font-mono text-xs flex items-center gap-1.5 transition-all shadow-xs"
            >
              <span>{link.label}</span>
              <ArrowUpRight size={12} />
            </a>
          ))}
        </div>
      </div>

      {/* Grid: Problem & Constraints vs Tradeoffs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs font-mono">
        <div className="lg:col-span-6 space-y-4 p-4 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)]">
          <div className="font-bold text-[var(--text-pure)] uppercase tracking-wider text-[11px] border-b border-[var(--border-hairline)] pb-2">
            THE PRODUCTION PROBLEM &amp; CONSTRAINTS
          </div>
          <p className="text-[var(--text-muted)] leading-relaxed font-sans text-sm">
            {caseData.problem}
          </p>
          <div className="space-y-1.5 pt-1">
            <div className="text-[var(--text-ivory)] font-bold text-[10.5px]">CONSTRAINTS:</div>
            {caseData.constraints.map((c, i) => (
              <div key={i} className="flex items-start gap-2 text-[var(--text-muted)]">
                <span className="text-[var(--accent-cyan)]">•</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4 p-4 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)]">
          <div className="font-bold text-[var(--accent-cyan)] uppercase tracking-wider text-[11px] border-b border-[var(--border-hairline)] pb-2">
            KEY ARCHITECTURAL TRADEOFF
          </div>
          <div className="space-y-2 text-xs font-sans">
            <div>
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block">Decision</span>
              <strong className="text-[var(--text-pure)]">{caseData.keyTradeoff.decision}</strong>
            </div>
            <div>
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block">Rationale</span>
              <p className="text-[var(--text-muted)] leading-relaxed">{caseData.keyTradeoff.rationale}</p>
            </div>
            <div>
              <span className="font-mono text-[10px] text-[var(--accent-rose)] uppercase block">Alternative Discarded</span>
              <p className="text-[var(--text-muted)] leading-relaxed">{caseData.keyTradeoff.alternativeDiscarded}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tiny Live Demo: Worker Queue Lock & Real-time SSE Stream */}
      <div className="p-4 sm:p-6 rounded-xs bg-[var(--bg-obsidian-subtle)] border border-[var(--border-hairline)] space-y-4 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-hairline)] pb-2.5">
          <span className="font-bold text-[var(--text-pure)] flex items-center gap-1.5 text-[11px]">
            <Lock size={13} className="text-[var(--accent-emerald)]" />
            <span>INTERACTIVE WORKER QUEUE LOCK &amp; CITATION SSE STREAM</span>
          </span>
          <button
            onClick={triggerStream}
            disabled={isStreaming}
            className="px-2.5 py-1 bg-[var(--bg-obsidian)] border border-[var(--border-hairline)] hover:border-[var(--text-muted)] rounded-xs text-[10px] font-bold text-[var(--accent-cyan)] flex items-center gap-1"
          >
            <Play size={10} className={isStreaming ? "animate-spin" : ""} />
            <span>{isStreaming ? "STREAMING..." : "RE-STREAM SSE"}</span>
          </button>
        </div>

        {/* Queue Workers View */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 1, name: "Worker Thread #1", status: "ACQUIRED LOCK", row: "JOB_042" },
            { id: 2, name: "Worker Thread #2", status: "SKIPPED LOCKED", row: "JOB_043" },
            { id: 3, name: "Worker Thread #3", status: "IDLE / POLLING", row: "NONE" },
          ].map((w) => (
            <div key={w.id} className="p-3 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)] space-y-1">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-[var(--text-pure)]">{w.name}</span>
                <span className={w.id === 1 ? "text-[var(--accent-emerald)] font-bold" : "text-[var(--text-muted)]"}>
                  {w.status}
                </span>
              </div>
              <div className="text-[10px] text-[var(--text-muted)]">Target: {w.row}</div>
            </div>
          ))}
        </div>

        {/* SSE Stream Result */}
        <div className="p-3 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)] space-y-1.5">
          <div className="text-[10px] text-[var(--text-muted)] flex justify-between">
            <span>STREAMED ANSWER (SERVER-SENT EVENTS)</span>
            <span className="text-[var(--accent-cyan)] font-bold">CITATION: [CONTRACT.PDF, P.4, ¶2]</span>
          </div>
          <div className="text-xs text-[var(--text-ivory)] leading-relaxed font-sans min-h-[44px]">
            {streamText}
            {isStreaming && <span className="inline-block w-1.5 h-3.5 bg-[var(--accent-cyan)] ml-1 animate-pulse" />}
          </div>
        </div>
      </div>

      {/* Code Snippet & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] border-b border-[var(--border-hairline)] pb-1.5">
            <span className="text-[var(--text-ivory)] flex items-center gap-1.5">
              <Database size={12} />
              <span>concurrency_queue.sql</span>
            </span>
            <span className="text-[10px] text-[var(--accent-emerald)]">POSTGRESQL 16</span>
          </div>

          <pre className="p-3 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)] text-[11px] leading-relaxed text-[var(--text-muted)] overflow-x-auto shadow-inner">
{`WITH next_job AS (
    SELECT job_id, document_id, chunk_index
    FROM ingestion_queue
    WHERE status = 'PENDING'
    ORDER BY priority DESC, created_at ASC
    FOR UPDATE SKIP LOCKED
    LIMIT 1
)
UPDATE ingestion_queue
SET status = 'PROCESSING', locked_at = NOW()
WHERE job_id = (SELECT job_id FROM next_job);`}
          </pre>
        </div>

        <div className="lg:col-span-5 space-y-3 font-mono text-xs">
          <div className="text-[11px] text-[var(--text-muted)] uppercase border-b border-[var(--border-hairline)] pb-1.5 font-bold">
            EVALUATION &amp; NUMERICAL PROOFS
          </div>

          <div className="space-y-2">
            {caseData.results.map((res) => (
              <div key={res.label} className="p-2.5 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)] flex justify-between items-center">
                <div>
                  <div className="font-bold text-[var(--text-pure)]">{res.label}</div>
                  <div className="text-[10px] text-[var(--text-muted)]">{res.desc}</div>
                </div>
                <div className="text-sm font-bold text-[var(--accent-cyan)]">{res.value}</div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[10.5px] text-[var(--text-muted)]">
            <strong className="text-[var(--text-ivory)]">Stack:</strong> {caseData.stack.join(" • ")}
          </div>
        </div>
      </div>
    </article>
  );
}
