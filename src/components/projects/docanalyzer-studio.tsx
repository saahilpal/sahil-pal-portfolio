"use client";

import { useState } from "react";
import { ExternalLink, Github, Layers, Search, Radio, CheckCircle2, FileText, ArrowRight } from "lucide-react";

export function DocAnalyzerStudio() {
  const [activeStep, setActiveStep] = useState(0);

  const pipelineStages = [
    {
      title: "SHA-256 Ingestion & Dedup",
      badge: "O(1) CACHING",
      detail: "Incoming documents are hashed at byte-level before storage writes. If identical hashes exist in the workspace, indexing finishes instantly without redundant embedding API billing.",
      telemetry: "DEDUP_VERIFIED: 100% collision-free",
    },
    {
      title: "Sliding-Window Semantic Chunking",
      badge: "800 TOKENS",
      detail: "Adaptive window chunking with 150-token semantic overlap ensures definitions, clauses, and table relationships are never fractured across arbitrary page cuts.",
      telemetry: "CHUNK_BOUNDARIES: 42 blocks compiled",
    },
    {
      title: "Gemini Embedding Vectors",
      badge: "768 DIMENSIONS",
      detail: "Generates high-dimensional vector embeddings with spherical L2 normalisation, enabling instant cosine similarity comparisons in PostgreSQL.",
      telemetry: "BATCH_RATE: 50 chunks/sec with quota guards",
    },
    {
      title: "pgvector HNSW Cosine Search",
      badge: "4.2ms QUERY",
      detail: "Runs sub-5ms cosine distance queries with automatic fallback to PostgreSQL tsvector full-text search if semantic confidence dips below defined threshold.",
      telemetry: "WORKER QUEUE: FOR UPDATE SKIP LOCKED",
    },
    {
      title: "Grounded SSE Answer Streaming",
      badge: "TTFT < 280ms",
      detail: "Streams real-time answers with paragraph-level citation coordinates, guaranteeing that every single claim is traceable to the source document.",
      telemetry: "STATUS: 100% Grounded Answer Delivery",
    },
  ];

  return (
    <div className="w-full rounded-3xl glass-card overflow-hidden border border-white/[0.12] shadow-2xl space-y-0">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 border-b border-white/[0.08] flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-purple-950/20 via-transparent to-cyan-950/20">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-purple-400/10 text-purple-400 border border-purple-400/20 font-bold uppercase tracking-wider text-[10px]">
              PRODUCTION SYSTEM // 02
            </span>
            <span className="text-[var(--text-dim)]">•</span>
            <span className="text-[var(--text-dim)] uppercase">AI APPLICATION &amp; GROUNDED RAG</span>
          </div>

          <h3 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            DocAnalyzer
          </h3>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            High-fidelity document intelligence and question-answering platform. Uses Gemini vector embeddings, PostgreSQL pgvector, and an asynchronous worker queue for grounded citation delivery.
          </p>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 shrink-0 font-mono text-xs">
          <a
            href="https://www.docanalyzer.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-full bg-purple-500 text-white font-bold flex items-center gap-2 hover:bg-purple-400 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(168,85,247,0.3)]"
          >
            <span>Live Platform</span>
            <ExternalLink size={13} />
          </a>

          <a
            href="https://github.com/saahilpal/RAG-DOCAnalyzer"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-full glass-card hover:border-white/30 text-[var(--text-primary)] font-medium flex items-center gap-2 transition-all"
          >
            <Github size={14} />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* Interactive Pipeline Stage */}
      <div className="p-5 sm:p-8 space-y-6">
        {/* Interactive Steps Slider */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 font-mono text-xs">
          {pipelineStages.map((stage, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-xl border text-left transition-all ${
                activeStep === idx
                  ? "border-purple-400 bg-purple-950/30 text-white shadow-sm"
                  : "border-white/[0.08] bg-white/[0.02] text-[var(--text-secondary)] hover:border-white/20"
              }`}
            >
              <div className="text-[10px] text-purple-400 font-bold mb-1">STAGE 0{idx + 1}</div>
              <div className="font-semibold text-[11px] truncate">{stage.title}</div>
            </button>
          ))}
        </div>

        {/* Detailed Stage Visualizer Card */}
        <div className="p-6 rounded-2xl border border-white/[0.1] bg-[#050814]/90 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
            <div>
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-bold">
                ACTIVE DATAFLOW STAGE 0{activeStep + 1}
              </span>
              <h4 className="text-xl font-bold text-[var(--text-primary)] mt-0.5">
                {pipelineStages[activeStep].title}
              </h4>
            </div>
            <span className="self-start sm:self-auto font-mono text-xs px-3 py-1 rounded-full bg-purple-400/10 text-purple-300 border border-purple-400/20">
              {pipelineStages[activeStep].badge}
            </span>
          </div>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {pipelineStages[activeStep].detail}
          </p>

          <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className="text-[var(--text-dim)] uppercase text-[10px]">VERIFIED QUEUE STATE:</span>
            <span className="text-cyan-400 font-bold">{pipelineStages[activeStep].telemetry}</span>
          </div>
        </div>

        {/* Architectural Pillars Pill Array */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
            <div className="text-[10px] text-[var(--text-dim)] uppercase">CONCURRENCY QUEUE</div>
            <div className="text-base font-bold text-purple-400">FOR UPDATE SKIP LOCKED</div>
            <div className="text-[11px] text-[var(--text-secondary)]">Race-condition free worker dispatch</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
            <div className="text-[10px] text-[var(--text-dim)] uppercase">SEARCH ENGINE</div>
            <div className="text-base font-bold text-cyan-400">PostgreSQL + pgvector</div>
            <div className="text-[11px] text-[var(--text-secondary)]">Cosine HNSW with FTS5 fallback</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
            <div className="text-[10px] text-[var(--text-dim)] uppercase">STREAMING PROTOCOL</div>
            <div className="text-base font-bold text-emerald-400">Server-Sent Events</div>
            <div className="text-[11px] text-[var(--text-secondary)]">Low latency token-by-token stream</div>
          </div>
        </div>
      </div>
    </div>
  );
}
