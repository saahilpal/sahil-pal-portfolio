"use client";

import { useState } from "react";
import { Terminal, ExternalLink, Github, Database, Network, Cpu, CheckCircle2, Sparkles, Layers } from "lucide-react";
import { projects } from "@/lib/portfolio-data";

export function SynapseStudio() {
  const [activeTab, setActiveTab] = useState<"lanes" | "ast" | "mcp">("lanes");
  const [selectedQuery, setSelectedQuery] = useState(0);

  const sampleQueries = [
    {
      query: "find_references('parse_ast') in tree-sitter daemon",
      symbol: "def parse_ast(source_bytes: bytes, lang: str) -> ASTNode",
      bm25: 0.94,
      astRank: 0.98,
      vectorSim: 0.89,
      rrf: 0.0482,
      latency: "1.2ms",
      tokens: 312,
    },
    {
      query: "get_context_package(budget=4096) for Claude coding agent",
      symbol: "async def pack_token_budget(ranked_symbols, budget=4096)",
      bm25: 0.88,
      astRank: 0.95,
      vectorSim: 0.93,
      rrf: 0.0491,
      latency: "1.8ms",
      tokens: 486,
    },
    {
      query: "inspect SQLite WAL mode lock-free readers",
      symbol: "def init_wal_engine(db_path: Path) -> sqlite3.Connection",
      bm25: 0.91,
      astRank: 0.92,
      vectorSim: 0.87,
      rrf: 0.0465,
      latency: "0.9ms",
      tokens: 284,
    },
  ];

  const current = sampleQueries[selectedQuery];

  return (
    <div className="w-full rounded-3xl glass-card overflow-hidden border border-white/[0.12] shadow-2xl space-y-0">
      {/* Top Banner Header */}
      <div className="p-6 sm:p-8 border-b border-white/[0.08] flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-cyan-950/20 via-transparent to-violet-950/20">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 font-bold uppercase tracking-wider text-[10px]">
              FEATURED SYSTEM // 01
            </span>
            <span className="text-[var(--text-dim)]">•</span>
            <span className="text-[var(--text-dim)] uppercase">AI INFRASTRUCTURE &amp; DEVELOPER TOOLS</span>
          </div>

          <h3 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            Synapse
          </h3>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Git-aware code intelligence and structural indexing daemon. Serves exact, token-budget-aware context packages to Claude, Cursor, and AI coding agents via native Model Context Protocol (MCP).
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0 font-mono text-xs">
          <a
            href="https://synapse-six-eta.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-full bg-cyan-400 text-slate-950 font-bold flex items-center gap-2 hover:bg-cyan-300 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(0,242,254,0.3)]"
          >
            <span>Live Docs &amp; Demo</span>
            <ExternalLink size={13} />
          </a>

          <a
            href="https://github.com/saahilpal/synapse"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-full glass-card hover:border-white/30 text-[var(--text-primary)] font-medium flex items-center gap-2 transition-all"
          >
            <Github size={14} />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* Main Studio Body: The Interactive IDE Experience */}
      <div className="p-5 sm:p-8 space-y-6">
        {/* Studio Window Mockup */}
        <div className="rounded-2xl border border-white/[0.1] bg-[#050814]/90 overflow-hidden shadow-2xl">
          {/* Window Title Bar */}
          <div className="px-4 py-3 bg-black/60 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[var(--text-dim)]">synapse-daemon // v1.0.0</span>
            </div>

            {/* Studio Mode Tabs */}
            <div className="flex rounded-lg bg-white/[0.04] p-0.5 border border-white/[0.06] text-[11px]">
              <button
                onClick={() => setActiveTab("lanes")}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeTab === "lanes"
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                    : "text-[var(--text-dim)] hover:text-white"
                }`}
              >
                3-Lane Retrieval Studio
              </button>
              <button
                onClick={() => setActiveTab("ast")}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeTab === "ast"
                    ? "bg-purple-500 text-white font-bold shadow-sm"
                    : "text-[var(--text-dim)] hover:text-white"
                }`}
              >
                AST Syntax Tree
              </button>
              <button
                onClick={() => setActiveTab("mcp")}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeTab === "mcp"
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-sm"
                    : "text-[var(--text-dim)] hover:text-white"
                }`}
              >
                MCP Payload Output
              </button>
            </div>
          </div>

          {/* Active Tab View */}
          {activeTab === "lanes" && (
            <div className="p-5 sm:p-6 space-y-6">
              {/* Query Selector */}
              <div>
                <div className="text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-wider mb-2">
                  Select Real Agent Query:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {sampleQueries.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedQuery(idx)}
                      className={`p-3 rounded-xl border text-left font-mono text-xs transition-all ${
                        selectedQuery === idx
                          ? "border-cyan-400 bg-cyan-950/20 text-white shadow-sm"
                          : "border-white/[0.08] bg-white/[0.02] text-[var(--text-secondary)] hover:border-white/20"
                      }`}
                    >
                      <div className="font-semibold truncate text-[11px] text-cyan-300">
                        QUERY 0{idx + 1}
                      </div>
                      <div className="truncate text-[10px] text-[var(--text-dim)] mt-0.5">{q.query}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Real-time 3-Lane Processing Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Lane 1: Lexical */}
                <div className="p-4 rounded-xl border border-white/[0.08] bg-black/40 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1.5 font-bold text-cyan-400">
                      <Database size={13} /> LANE 1: LEXICAL
                    </span>
                    <span className="text-[10px] text-[var(--text-dim)]">SQLite FTS5</span>
                  </div>
                  <p className="text-[11px] font-mono text-[var(--text-secondary)]">
                    Exact symbol &amp; token boundary matches with BM25 ranking.
                  </p>
                  <div className="pt-2 border-t border-white/[0.06] flex justify-between font-mono text-xs">
                    <span className="text-[var(--text-dim)]">BM25 Score</span>
                    <span className="text-cyan-400 font-bold">{current.bm25}</span>
                  </div>
                </div>

                {/* Lane 2: Structural AST */}
                <div className="p-4 rounded-xl border border-white/[0.08] bg-black/40 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1.5 font-bold text-purple-400">
                      <Network size={13} /> LANE 2: AST GRAPH
                    </span>
                    <span className="text-[10px] text-[var(--text-dim)]">Tree-sitter</span>
                  </div>
                  <p className="text-[11px] font-mono text-[var(--text-secondary)]">
                    Function, class scopes, parent hierarchies, and caller trees.
                  </p>
                  <div className="pt-2 border-t border-white/[0.06] flex justify-between font-mono text-xs">
                    <span className="text-[var(--text-dim)]">Scope Match</span>
                    <span className="text-purple-400 font-bold">{current.astRank}</span>
                  </div>
                </div>

                {/* Lane 3: Semantic Vectors */}
                <div className="p-4 rounded-xl border border-white/[0.08] bg-black/40 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                      <Cpu size={13} /> LANE 3: VECTOR
                    </span>
                    <span className="text-[10px] text-[var(--text-dim)]">Dense Embeds</span>
                  </div>
                  <p className="text-[11px] font-mono text-[var(--text-secondary)]">
                    Spherical cosine distance capturing semantic intent and docstrings.
                  </p>
                  <div className="pt-2 border-t border-white/[0.06] flex justify-between font-mono text-xs">
                    <span className="text-[var(--text-dim)]">Cosine Similarity</span>
                    <span className="text-emerald-400 font-bold">{current.vectorSim}</span>
                  </div>
                </div>
              </div>

              {/* Synthesized Output Banner */}
              <div className="p-4 rounded-xl border border-cyan-400/30 bg-cyan-950/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
                <div>
                  <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 size={13} /> RRF SYNTHESIZED SYMBOL ENVELOPE (k=60)
                  </div>
                  <div className="text-sm font-semibold text-white mt-0.5">{current.symbol}</div>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-[var(--text-secondary)] shrink-0">
                  <span>RRF SCORE: <strong className="text-cyan-400">{current.rrf}</strong></span>
                  <span>LATENCY: <strong className="text-emerald-400">{current.latency}</strong></span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ast" && (
            <div className="p-6 font-mono text-xs space-y-3">
              <div className="text-[11px] text-[var(--text-dim)] uppercase">
                Tree-sitter Incremental AST Graph Output:
              </div>
              <pre className="p-4 rounded-xl bg-black/60 border border-white/[0.08] text-cyan-300 text-[11px] leading-relaxed overflow-x-auto">
{`[ASTNode: FunctionDefinition]
  ├── Identifier: 'parse_ast' (line: 42, col: 4)
  ├── Parameters: [source_bytes: bytes, lang: str]
  ├── ReturnType: 'ASTNode'
  ├── ParentScope: class IncrementalIndexer (synapse.core.daemon)
  └── Subgraph Callers:
       ├── extract_symbols()
       └── build_scope_graph()
[Index Engine]: WAL mode SQLite checkpointed in 0.8ms.`}
              </pre>
            </div>
          )}

          {activeTab === "mcp" && (
            <div className="p-6 font-mono text-xs space-y-3">
              <div className="text-[11px] text-[var(--text-dim)] uppercase">
                Model Context Protocol (MCP) JSON Payload to Claude / Cursor:
              </div>
              <pre className="p-4 rounded-xl bg-black/60 border border-white/[0.08] text-emerald-300 text-[11px] leading-relaxed overflow-x-auto">
{`{
  "jsonrpc": "2.0",
  "result": {
    "context_envelope": {
      "query": "${current.query}",
      "symbol": "${current.symbol}",
      "token_cost": ${current.tokens},
      "token_budget_limit": 4096,
      "retrieval_method": "3_lane_hybrid_rrf",
      "callers": ["extract_symbols()", "build_scope_graph()"]
    }
  }
}`}
              </pre>
            </div>
          )}
        </div>

        {/* Technical Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
            <div className="text-[10px] text-[var(--text-dim)] uppercase">LATENCY PROFILE</div>
            <div className="text-base font-bold text-cyan-400">&lt; 2.0s on 50k Symbols</div>
            <div className="text-[11px] text-[var(--text-secondary)]">Sub-second incremental diff indexing</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
            <div className="text-[10px] text-[var(--text-dim)] uppercase">MEMORY DAEMON</div>
            <div className="text-base font-bold text-emerald-400">O(1) Streaming Model</div>
            <div className="text-[11px] text-[var(--text-secondary)]">Lock-free SQLite WAL architecture</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
            <div className="text-[10px] text-[var(--text-dim)] uppercase">INTEGRATION PROTOCOL</div>
            <div className="text-base font-bold text-purple-400">Model Context Protocol</div>
            <div className="text-[11px] text-[var(--text-secondary)]">Native Cursor &amp; Claude agent server</div>
          </div>
        </div>
      </div>
    </div>
  );
}
