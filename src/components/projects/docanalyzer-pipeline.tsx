"use client";

import { useState } from "react";
import { FileText, Scissors, Hash, Search, Radio, Layers, type LucideIcon } from "lucide-react";

interface PipelineStep {
  step: string;
  title: string;
  icon: LucideIcon;
  tech: string;
  description: string;
  payload: string;
  metrics: string;
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    step: "01",
    title: "Document Ingestion & Deduplication",
    icon: FileText,
    tech: "Express / Multer / SHA-256",
    description:
      "Uploaded PDF documents are hashed via SHA-256 before storage write. If identical content exists in the workspace, ingestion resolves in O(1) time without re-indexing or redundant embedding costs.",
    payload: "sha256_checksum: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\nstatus: DEDUP_VERIFIED -> Supabase Object Storage",
    metrics: "Ingestion queue: PostgreSQL FOR UPDATE SKIP LOCKED",
  },
  {
    step: "02",
    title: "Sliding-Window Semantic Chunking",
    icon: Scissors,
    tech: "PDF Parser / Token Splitter",
    description:
      "Extracts text stream while preserving section headers, paragraph boundaries, and table geometry. Applies sliding-window chunking (800 tokens with 150-token semantic overlap) to prevent boundary context severing.",
    payload: "chunk_id: doc_chunk_042\ntokens: 780\noverlap_prefix: '...as described in Section 4.2 governing concurrent isolation...'",
    metrics: "Zero context truncation across page breaks",
  },
  {
    step: "03",
    title: "Vector Embedding Generation",
    icon: Hash,
    tech: "Gemini Text Embeddings (768-dim)",
    description:
      "Dispatches batches to Gemini embedding models with automatic retry logic, backoff, and dimensional L2 normalization for instant spherical cosine comparisons.",
    payload: "vector: [-0.0241, 0.0812, 0.0094, -0.0521, ..., +0.0189] (768 dimensions)\nnormalized: true",
    metrics: "Batch throughput: 50 chunks/sec with quota guards",
  },
  {
    step: "04",
    title: "pgvector Cosine Search & FTS Fallback",
    icon: Search,
    tech: "PostgreSQL 16 / pgvector / HNSW Index",
    description:
      "Performs high-speed cosine distance query `<=>` against HNSW index with workspace isolation. If vector similarity falls below threshold, automatically falls back to PostgreSQL full-text search `tsvector`.",
    payload: "SELECT chunk_id, 1 - (embedding <=> $query_vec) as cosine_sim\nFROM document_chunks\nWHERE workspace_id = $1\nORDER BY embedding <=> $query_vec LIMIT 5;",
    metrics: "Average index query time: 4.2ms on 100k chunks",
  },
  {
    step: "05",
    title: "Grounded Answer Streaming via SSE",
    icon: Radio,
    tech: "Server-Sent Events (SSE) / Gemini 1.5",
    description:
      "Injects top retrieved passages into strict system prompt with paragraph-level citation constraints. Streams token-by-token back to the browser UI with real-time source reference coordinates.",
    payload: "event: message\ndata: {\"token\": \"The architecture enforces\", \"citation\": {\"doc\": \"system_spec.pdf\", \"page\": 4}}\nstatus: STREAMING_ACTIVE",
    metrics: "Time to First Token (TTFT): < 280ms over SSE",
  },
];

export function DocAnalyzerPipeline() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const current = PIPELINE_STEPS[activeStepIndex];
  const Icon = current.icon;

  return (
    <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-xs">
          <Layers size={14} className="text-[var(--color-accent)]" />
          <span className="font-bold text-[var(--color-text)]">DOCANALYZER GROUNDED RAG PIPELINE</span>
        </div>
        <div className="font-mono text-[10px] text-[var(--color-text-dim)] flex items-center gap-2">
          <span>WORKER: FOR UPDATE SKIP LOCKED</span>
          <span>•</span>
          <span className="text-[var(--color-accent)] font-semibold">STREAMING SSE</span>
        </div>
      </div>

      {/* Pipeline Navigation Bar */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg)]/60 overflow-x-auto">
        <div className="flex items-center min-w-[580px] p-2 gap-1.5">
          {PIPELINE_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`flex-1 flex items-center gap-2 px-3 py-2 rounded border font-mono text-xs transition-all ${
                  isActive
                    ? "border-[var(--color-accent)] bg-[var(--color-surface-elevated)] text-[var(--color-text)] font-semibold shadow-sm"
                    : "border-transparent bg-transparent text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive ? "bg-[var(--color-accent)] text-[#050608]" : "bg-[var(--color-surface-elevated)] text-[var(--color-text-dim)]"
                  }`}
                >
                  {step.step}
                </span>
                <span className="truncate">{step.title.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Deep Dive */}
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="font-mono text-[11px] text-[var(--color-accent)] uppercase tracking-wider">
              STAGE {current.step} OF 05
            </div>
            <h4 className="text-base font-bold text-[var(--color-text)] mt-0.5 flex items-center gap-2">
              <Icon size={18} className="text-[var(--color-accent)]" />
              <span>{current.title}</span>
            </h4>
          </div>
          <div className="font-mono text-[10px] px-2.5 py-1 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-dim)] self-start sm:self-auto">
            TECH: {current.tech}
          </div>
        </div>

        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
          {current.description}
        </p>

        {/* Live Payload Preview */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-3 font-mono text-xs overflow-x-auto">
          <div className="text-[10px] text-[var(--color-text-dim)] uppercase tracking-wider mb-1.5 flex justify-between">
            <span>DATA ENVELOPE / QUERY PAYLOAD:</span>
            <span className="text-[var(--color-accent)]">{current.metrics}</span>
          </div>
          <pre className="text-[11px] text-[var(--color-text)] leading-relaxed whitespace-pre-wrap">
            {current.payload}
          </pre>
        </div>

        {/* Quick Stage Controls */}
        <div className="flex items-center justify-between pt-2 font-mono text-xs">
          <button
            onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeStepIndex === 0}
            className="px-3 py-1.5 rounded border border-[var(--color-border)] text-[var(--color-text-dim)] hover:text-[var(--color-text)] disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            &larr; Previous Stage
          </button>
          <div className="text-[10px] text-[var(--color-text-dim)]">
            CLICK TABS OR BUTTONS TO TRACE DATAFLOW
          </div>
          <button
            onClick={() => setActiveStepIndex((prev) => Math.min(PIPELINE_STEPS.length - 1, prev + 1))}
            disabled={activeStepIndex === PIPELINE_STEPS.length - 1}
            className="px-3 py-1.5 rounded border border-[var(--color-border)] text-[var(--color-text-dim)] hover:text-[var(--color-text)] disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            Next Stage &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
