"use client";

import { useState } from "react";
import { Terminal, Cpu, Database, Network, CheckCircle2 } from "lucide-react";

interface QueryPreset {
  id: string;
  query: string;
  targetSymbol: string;
  lexicalMatch: { file: string; line: number; score: number; snippet: string };
  structuralMatch: { scope: string; parent: string; children: string[]; score: number };
  vectorMatch: { concept: string; cosineSim: number };
  rrfScore: number;
  tokenCost: number;
}

const PRESETS: QueryPreset[] = [
  {
    id: "parse_ast",
    query: "find_references('parse_ast') in tree-sitter indexing pipeline",
    targetSymbol: "def parse_ast(source_bytes: bytes, lang: str) -> ASTNode:",
    lexicalMatch: {
      file: "synapse/indexer/treesitter.py",
      line: 42,
      score: 0.94,
      snippet: "tree = self.parsers[lang].parse(source_bytes)",
    },
    structuralMatch: {
      scope: "class IncrementalIndexer",
      parent: "synapse.core.daemon",
      children: ["extract_symbols()", "build_scope_graph()"],
      score: 0.98,
    },
    vectorMatch: {
      concept: "syntax grammar parsing & token boundary extraction",
      cosineSim: 0.89,
    },
    rrfScore: 0.0482,
    tokenCost: 312,
  },
  {
    id: "mcp_handler",
    query: "get_context_package(token_budget=4096) for coding agent",
    targetSymbol: "async def handle_context_envelope(request: MCPContextRequest):",
    lexicalMatch: {
      file: "synapse/server/mcp_protocol.py",
      line: 118,
      score: 0.88,
      snippet: "envelope = pack_token_budget(ranked_symbols, budget=request.budget)",
    },
    structuralMatch: {
      scope: "class FastMCPServer",
      parent: "synapse.api.stdio",
      children: ["serialize_mcp_response()", "enforce_token_budget()"],
      score: 0.95,
    },
    vectorMatch: {
      concept: "serving token-budgeted prompt payloads to Claude/Cursor",
      cosineSim: 0.93,
    },
    rrfScore: 0.0491,
    tokenCost: 486,
  },
  {
    id: "wal_daemon",
    query: "how does SQLite WAL mode prevent reader locks during indexing?",
    targetSymbol: "def init_wal_engine(db_path: Path) -> sqlite3.Connection:",
    lexicalMatch: {
      file: "synapse/storage/sqlite_state.py",
      line: 67,
      score: 0.91,
      snippet: "cursor.execute('PRAGMA journal_mode=WAL; PRAGMA synchronous=NORMAL;')",
    },
    structuralMatch: {
      scope: "class SQLiteStateManager",
      parent: "synapse.storage.pool",
      children: ["checkpoint_wal()", "stream_uncommitted_diffs()"],
      score: 0.92,
    },
    vectorMatch: {
      concept: "lock-free concurrent indexing daemon with zero disk thrashing",
      cosineSim: 0.87,
    },
    rrfScore: 0.0465,
    tokenCost: 284,
  },
];

export function SynapseVisualizer() {
  const [activePreset, setActivePreset] = useState<QueryPreset>(PRESETS[0]);
  const [executing, setExecuting] = useState(false);

  const handleSelect = (p: QueryPreset) => {
    setExecuting(true);
    setActivePreset(p);
    setTimeout(() => setExecuting(false), 250);
  };

  return (
    <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      {/* Visualizer Bar */}
      <div className="px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-xs">
          <Terminal size={14} className="text-[var(--color-accent)]" />
          <span className="font-bold text-[var(--color-text)]">SYNAPSE 3-LANE RETRIEVAL EMULATOR</span>
        </div>
        <div className="font-mono text-[10px] text-[var(--color-text-dim)] flex items-center gap-2">
          <span>ALGORITHM: RRF (k=60)</span>
          <span>•</span>
          <span className="text-[var(--color-accent)] font-semibold">O(1) STREAMING MEMORY</span>
        </div>
      </div>

      {/* Query Selector Tabs */}
      <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/50">
        <div className="text-[11px] font-mono text-[var(--color-text-dim)] mb-2 uppercase tracking-wider">
          Select sample agent query to inspect structural retrieval:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelect(p)}
              className={`p-2.5 text-left rounded border font-mono text-xs transition-all ${
                activePreset.id === p.id
                  ? "border-[var(--color-accent)] bg-[var(--color-surface-elevated)] text-[var(--color-text)] shadow-sm"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-border-active)]"
              }`}
            >
              <div className="font-semibold truncate">{p.id.replace("_", " ").toUpperCase()}</div>
              <div className="text-[10px] text-[var(--color-text-dim)] truncate mt-0.5">{p.query}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 3-Lane Architecture Processing Grid */}
      <div className={`p-4 md:p-6 transition-opacity duration-200 ${executing ? "opacity-50" : "opacity-100"}`}>
        <div className="mb-4">
          <div className="font-mono text-[10px] text-[var(--color-text-dim)] uppercase">TARGET QUERY TO MCP ENGINE:</div>
          <div className="font-mono text-sm text-[var(--color-accent)] font-medium bg-[var(--color-bg)] p-2.5 rounded border border-[var(--color-border)] mt-1 break-all">
            &gt; {activePreset.query}
          </div>
        </div>

        {/* 3 Parallel Retrieval Lanes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Lane 1: Lexical */}
          <div className="p-3.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-[var(--color-text)] font-semibold flex items-center gap-1.5">
                  <Database size={13} className="text-[var(--color-accent)]" /> LANE 1: LEXICAL
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-surface-elevated)] text-[var(--color-text-dim)]">
                  SQLite FTS5
                </span>
              </div>
              <p className="text-[11px] text-[var(--color-text-dim)] font-mono mb-2">
                File: {activePreset.lexicalMatch.file}:{activePreset.lexicalMatch.line}
              </p>
              <div className="p-2 rounded bg-[var(--color-surface)] border border-[var(--color-border)] font-mono text-[10px] text-[var(--color-text-muted)] overflow-x-auto">
                <code>{activePreset.lexicalMatch.snippet}</code>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-[var(--color-border)] flex justify-between font-mono text-[10px]">
              <span className="text-[var(--color-text-dim)]">BM25 Score</span>
              <span className="text-[var(--color-accent)] font-bold">{activePreset.lexicalMatch.score}</span>
            </div>
          </div>

          {/* Lane 2: Structural AST */}
          <div className="p-3.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-[var(--color-text)] font-semibold flex items-center gap-1.5">
                  <Network size={13} className="text-[var(--color-accent-secondary)]" /> LANE 2: AST GRAPH
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-surface-elevated)] text-[var(--color-text-dim)]">
                  Tree-sitter
                </span>
              </div>
              <p className="text-[11px] text-[var(--color-text-dim)] font-mono mb-2">
                Scope: {activePreset.structuralMatch.scope}
              </p>
              <div className="space-y-1 font-mono text-[10px] text-[var(--color-text-muted)]">
                <div className="truncate">↳ Parent: {activePreset.structuralMatch.parent}</div>
                <div className="truncate">↳ Callers: {activePreset.structuralMatch.children.join(", ")}</div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-[var(--color-border)] flex justify-between font-mono text-[10px]">
              <span className="text-[var(--color-text-dim)]">AST Scope Rank</span>
              <span className="text-[var(--color-accent-secondary)] font-bold">{activePreset.structuralMatch.score}</span>
            </div>
          </div>

          {/* Lane 3: Semantic Vectors */}
          <div className="p-3.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-[var(--color-text)] font-semibold flex items-center gap-1.5">
                  <Cpu size={13} className="text-[var(--color-telemetry)]" /> LANE 3: SEMANTIC
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-surface-elevated)] text-[var(--color-text-dim)]">
                  Vector Space
                </span>
              </div>
              <p className="text-[11px] text-[var(--color-text-dim)] font-mono mb-2">
                Intent: {activePreset.vectorMatch.concept}
              </p>
              <div className="h-6 w-full bg-[var(--color-surface)] rounded overflow-hidden flex items-center px-2 border border-[var(--color-border)]">
                <div
                  className="h-2 rounded bg-[var(--color-telemetry)]"
                  style={{ width: `${activePreset.vectorMatch.cosineSim * 100}%` }}
                />
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-[var(--color-border)] flex justify-between font-mono text-[10px]">
              <span className="text-[var(--color-text-dim)]">Cosine Similarity</span>
              <span className="text-[var(--color-telemetry)] font-bold">{activePreset.vectorMatch.cosineSim}</span>
            </div>
          </div>
        </div>

        {/* Fusion Output: Synthesized MCP Context Envelope */}
        <div className="p-4 rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-surface-elevated)]/50 font-mono text-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[var(--color-border)] mb-3">
            <div className="flex items-center gap-2 text-[var(--color-text)] font-bold">
              <CheckCircle2 size={15} className="text-[var(--color-accent)]" />
              <span>RECIPROCAL RANK FUSION (RRF) SYNTHESIS &rarr; MCP ENVELOPE</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-[var(--color-text-dim)]">
              <span>RRF SCORE: <strong className="text-[var(--color-accent)]">{activePreset.rrfScore}</strong></span>
              <span>TOKEN LOAD: <strong className="text-[var(--color-text)]">{activePreset.tokenCost} tokens</strong></span>
            </div>
          </div>

          <div className="text-[11px] text-[var(--color-text-muted)] space-y-1">
            <div className="text-[var(--color-text)] font-semibold">{activePreset.targetSymbol}</div>
            <div className="text-[var(--color-text-dim)]">
              Served directly over stdio/SSE to Claude / Cursor coding agents with AST boundary tags, parameter types, and call graph context.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
