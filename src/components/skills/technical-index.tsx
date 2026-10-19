"use client";

import { useState } from "react";
import { CheckCircle2, Bookmark, Terminal, Hash } from "lucide-react";

interface SkillItem {
  id: string;
  name: string;
  level: "EXPERT" | "PRODUCTION";
  context: string;
}

interface DomainCategory {
  catNo: string;
  title: string;
  skills: SkillItem[];
}

const DOMAINS: DomainCategory[] = [
  {
    catNo: "CAT-01",
    title: "AI SYSTEMS & AGENT CONTEXT",
    skills: [
      { id: "ast", name: "Tree-sitter AST", level: "EXPERT", context: "Built Python symbol traversal daemon parsing 50k+ symbols in Synapse" },
      { id: "mcp", name: "Model Context Protocol", level: "EXPERT", context: "Engineered real-time MCP context server for Claude and Cursor agents" },
      { id: "rag", name: "Grounded RAG", level: "EXPERT", context: "Multi-document pipeline pairing Gemini embeddings with exact paragraph citations" },
      { id: "rrf", name: "Reciprocal Rank Fusion", level: "PRODUCTION", context: "Synthesized 3 retrieval lanes (BM25, AST, Vector) to eliminate scoring bias" },
      { id: "pgvector", name: "pgvector & FTS5", level: "EXPERT", context: "Cosine similarity search paired with full-text keyword indexing" },
    ],
  },
  {
    catNo: "CAT-02",
    title: "BACKEND & DISTRIBUTED SYSTEMS",
    skills: [
      { id: "node", name: "Node.js & Express", level: "EXPERT", context: "Asynchronous document parsing API handling PDF uploads and background jobs" },
      { id: "java", name: "Java 17 & Vert.x", level: "PRODUCTION", context: "High-throughput RESTful services built at Kristu Jayanti Software Dev Centre" },
      { id: "sse", name: "Server-Sent Events", level: "EXPERT", context: "Low-latency streaming of synthesized LLM responses directly to clients" },
      { id: "queue", name: "PostgreSQL Queues", level: "EXPERT", context: "FOR UPDATE SKIP LOCKED concurrent multi-worker job scheduling" },
      { id: "redis", name: "Redis Caching & RBAC", level: "PRODUCTION", context: "JWT session token blacklisting and role-based access verification" },
    ],
  },
  {
    catNo: "CAT-03",
    title: "MOBILE & NATIVE SYSTEMS",
    skills: [
      { id: "android", name: "Android SDK & Compose", level: "EXPERT", context: "100% Jetpack Compose MVI architecture built for wholesale billing ERP" },
      { id: "room", name: "Room v13 (WAL)", level: "EXPERT", context: "Encrypted offline-first storage with PRAGMA synchronous = NORMAL" },
      { id: "storage", name: "Scoped Storage (API 34)", level: "PRODUCTION", context: "Solved Android 14 SecurityException via internal cache file descriptors" },
      { id: "pdf", name: "Headless PDF Generation", level: "PRODUCTION", context: "A4 wholesale tax invoice generator with dynamic single-to-dual column packing" },
      { id: "stateflow", name: "Kotlin StateFlow", level: "EXPERT", context: "Unidirectional data flow guaranteeing deterministic UI state without leaks" },
    ],
  },
  {
    catNo: "CAT-04",
    title: "DATABASES & SYSTEMS CORE",
    skills: [
      { id: "postgres", name: "PostgreSQL", level: "EXPERT", context: "Relational modeling, pgvector indexing, and transactional locking" },
      { id: "sqlite", name: "SQLite (WAL Mode)", level: "EXPERT", context: "Lightweight, crash-safe embedded database for sub-2s code retrieval" },
      { id: "mongo", name: "MongoDB", level: "PRODUCTION", context: "Document storage and aggregation pipelines for enterprise intern workflows" },
      { id: "python", name: "Python 3.11", level: "EXPERT", context: "AsyncIO background workers, AST manipulation, and PyPI packaging" },
      { id: "typescript", name: "TypeScript & Next.js", level: "EXPERT", context: "Strictly typed full-stack interfaces, server components, and Tailwind v4" },
    ],
  },
];

export function TechnicalIndex() {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(DOMAINS[0].skills[0]);

  return (
    <section id="index" className="py-16 border-b border-[var(--border-paper-strong)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border-paper)] pb-4 gap-2">
          <div>
            <div className="font-mono text-xs text-[var(--text-ink-muted)] uppercase tracking-wider">
              SECTION 03 // CATALOG RAISONNÉ
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-ink)] tracking-tight">
              Technical Index
            </h2>
          </div>
          <div className="font-mono text-xs text-[var(--text-ink-muted)]">
            CLICK ANY ENTRY TO INSPECT PROOF
          </div>
        </div>

        {/* Index Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Catalog Columns */}
          <div className="lg:col-span-8 space-y-6">
            {DOMAINS.map((dom) => (
              <div key={dom.catNo} className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-ink-muted)] border-b border-[var(--border-paper)] pb-1">
                  <span className="font-bold text-[var(--stamp-red)]">{dom.catNo}</span>
                  <span>•</span>
                  <span>{dom.title}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dom.skills.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSkill(s)}
                      className={`p-3 text-left border rounded-xs font-mono text-xs transition-all flex items-center justify-between ${
                        selectedSkill.id === s.id
                          ? "border-[var(--text-ink)] bg-[var(--bg-card)] shadow-sm"
                          : "border-[var(--border-paper)] bg-[var(--bg-card-draft)] hover:border-[var(--border-paper-strong)]"
                      }`}
                    >
                      <span className="font-medium text-[var(--text-ink)]">{s.name}</span>
                      <span className="text-[10px] text-[var(--text-ink-muted)] px-1.5 py-0.5 rounded-xs bg-[var(--border-paper)]">
                        {s.level}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Physical Index Card Inspector */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="paper-sheet p-6 rounded-sm space-y-4 font-mono text-xs relative">
              <div className="absolute top-2.5 right-2.5 text-[9px] text-[var(--text-ink-faint)]">+</div>

              <div className="border-b border-[var(--border-paper)] pb-3 space-y-1">
                <div className="text-[10px] text-[var(--text-ink-muted)]">VERIFIED PRODUCTION PROOF</div>
                <div className="text-lg font-serif font-bold text-[var(--text-ink)]">
                  {selectedSkill.name}
                </div>
                <div className="text-[11px] text-[var(--stamp-blue)] font-bold">
                  LEVEL: {selectedSkill.level}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[10px] text-[var(--text-ink-muted)] uppercase">DEPLOYMENT CONTEXT:</div>
                <p className="text-xs text-[var(--text-ink-secondary)] leading-relaxed font-sans">
                  {selectedSkill.context}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border-paper)] flex items-center gap-2 text-[10px] text-[var(--stamp-green)] font-bold">
                <CheckCircle2 size={12} />
                <span>CROSS-VERIFIED AGAINST REAL REPOSITORIES</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
