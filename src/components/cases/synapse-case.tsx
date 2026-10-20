"use client";

import { useState } from "react";
import { CASE_STUDIES } from "@/lib/chess-puzzle";
import { GitBranch, Terminal, ArrowUpRight, Play, CheckCircle2, Search, Layers, Cpu } from "lucide-react";

export function SynapseCase() {
  const caseData = CASE_STUDIES.find((c) => c.id === "synapse")!;

  const [testQuery, setTestQuery] = useState<string>("def resolve_call_signature(node)");
  const [bm25Rank, setBm25Rank] = useState<number>(2);
  const [vectorRank, setVectorRank] = useState<number>(4);

  // Reciprocal Rank Fusion calculation: 1/(60 + rank_bm25) + 1/(60 + rank_vec)
  const rrfScore = (1 / (60 + bm25Rank) + 1 / (60 + vectorRank)).toFixed(4);

  return (
    <article id="synapse" className="obsidian-card p-6 sm:p-10 rounded-sm space-y-8 scroll-mt-24">
      {/* Header Plate */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-2 py-0.5 rounded-xs bg-[var(--accent-copper)]/15 border border-[var(--accent-copper)] text-[var(--accent-copper)] font-bold">
              MOVE 1: BISHOP // 1. Bxf7+
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-[var(--accent-cyan)] font-semibold">AST RETRIEVAL &amp; TREE CHUNKING</span>
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

      {/* Grid: Problem & Constraints vs Key Tradeoffs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs font-mono">
        {/* Problem & Constraints */}
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
                <span className="text-[var(--accent-copper)]">•</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Tradeoff */}
        <div className="lg:col-span-6 space-y-4 p-4 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)]">
          <div className="font-bold text-[var(--accent-copper)] uppercase tracking-wider text-[11px] border-b border-[var(--border-hairline)] pb-2">
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

      {/* Interactive Retrieval Demo: BM25 vs Vector vs RRF */}
      <div className="p-4 sm:p-6 rounded-xs bg-[var(--bg-obsidian-subtle)] border border-[var(--border-hairline)] space-y-4 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-hairline)] pb-2.5">
          <span className="font-bold text-[var(--text-pure)] flex items-center gap-1.5 text-[11px]">
            <Layers size={13} className="text-[var(--accent-cyan)]" />
            <span>INTERACTIVE RRF HYBRID RETRIEVAL SIMULATOR</span>
          </span>
          <span className="text-[10px] text-[var(--text-muted)]">
            FORMULA: RRF(d) = Σ 1 / (60 + rank(d))
          </span>
        </div>

        {/* Query Input */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 flex items-center gap-2 p-2 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)]">
            <Search size={12} className="text-[var(--accent-copper)]" />
            <input
              type="text"
              value={testQuery}
              onChange={(e) => setTestQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-[var(--text-pure)] w-full font-mono"
              placeholder="Enter symbol query..."
            />
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => { setBm25Rank(1); setVectorRank(3); }}
              className="px-2 py-1 bg-[var(--bg-obsidian)] border border-[var(--border-hairline)] rounded-xs hover:border-[var(--text-muted)] text-[10px]"
            >
              Query A
            </button>
            <button
              onClick={() => { setBm25Rank(8); setVectorRank(1); }}
              className="px-2 py-1 bg-[var(--bg-obsidian)] border border-[var(--border-hairline)] rounded-xs hover:border-[var(--text-muted)] text-[10px]"
            >
              Query B
            </button>
          </div>
        </div>

        {/* 3 Retrieval Lanes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Lane 1 */}
          <div className="p-3 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)] space-y-1">
            <div className="text-[10px] text-[var(--text-muted)]">LANE 1: BM25 (FTS5)</div>
            <div className="text-sm font-bold text-[var(--accent-cyan)]">Rank #{bm25Rank}</div>
            <div className="text-[10px] text-[var(--text-muted)]">Exact identifier lookup in SQLite</div>
          </div>

          {/* Lane 2 */}
          <div className="p-3 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)] space-y-1">
            <div className="text-[10px] text-[var(--text-muted)]">LANE 2: DENSE VECTORS</div>
            <div className="text-sm font-bold text-[var(--accent-emerald)]">Rank #{vectorRank}</div>
            <div className="text-[10px] text-[var(--text-muted)]">Gemini 768-dim cosine distance</div>
          </div>

          {/* Lane 3: Fused */}
          <div className="p-3 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-copper)] space-y-1">
            <div className="text-[10px] text-[var(--accent-copper)] font-bold">LANE 3: RRF FUSED SCORE</div>
            <div className="text-sm font-bold text-[var(--text-pure)]">{rrfScore}</div>
            <div className="text-[10px] text-[var(--text-muted)]">Bounded top result served to Claude</div>
          </div>
        </div>
      </div>

      {/* Code Snippet & Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Code Snippet */}
        <div className="lg:col-span-7 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] border-b border-[var(--border-hairline)] pb-1.5">
            <span className="flex items-center gap-1.5 text-[var(--text-ivory)]">
              <Terminal size={12} />
              <span>tree_sitter_ast_extractor.py</span>
            </span>
            <span className="text-[10px] text-[var(--accent-emerald)]">PYTHON 3.11</span>
          </div>

          <pre className="p-3 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)] text-[11px] leading-relaxed text-[var(--text-muted)] overflow-x-auto shadow-inner">
{`# Tree-sitter CST scope resolution daemon
class SymbolParser:
    def extract_hierarchy(self, node: Node, source: bytes) -> List[Symbol]:
        query = self.language.query("""
            (function_definition name: (identifier) @fn)
            (class_definition name: (identifier) @cls)
        """)
        matches = query.matches(node)
        return [self.build_symbol_node(m, source) for m in matches]`}
          </pre>
        </div>

        {/* Results & Verification */}
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
                <div className="text-sm font-bold text-[var(--accent-copper)]">{res.value}</div>
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
