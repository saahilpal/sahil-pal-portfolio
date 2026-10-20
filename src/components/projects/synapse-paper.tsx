"use client";

import { useState, useRef, useEffect } from "react";
import { animate } from "animejs";
import { GitBranch, Terminal, Layers, ArrowUpRight, Play, CheckCircle2, Shield, Sparkles, Search } from "lucide-react";

interface QueryPreset {
  id: string;
  query: string;
  bm25: number;
  ast: number;
  vector: number;
  tokens: string[];
}

const PRESETS: QueryPreset[] = [
  {
    id: "caller",
    query: "def extract_caller_hierarchy(node)",
    bm25: 0.94,
    ast: 0.98,
    vector: 0.88,
    tokens: ["resolve_call_signature()", "AST:FunctionDef", "Tree-sitter:CST", "RRF_Rank:1/61"],
  },
  {
    id: "wal",
    query: "PRAGMA synchronous = NORMAL",
    bm25: 0.99,
    ast: 0.72,
    vector: 0.81,
    tokens: ["WAL_PRAGMA_NORMAL", "sqlite3_wal_checkpoint", "atomic_commit", "RRF_Rank:1/62"],
  },
  {
    id: "mcp",
    query: "mcp_server.stream_resource()",
    bm25: 0.89,
    ast: 0.95,
    vector: 0.92,
    tokens: ["JSON_RPC_2.0", "ModelContextProtocol", "TokenBudgetGate", "RRF_Rank:1/60"],
  },
];

export function SynapsePaper() {
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  const [fusedScore, setFusedScore] = useState<number>(0.964);
  const [tokensBurst, setTokensBurst] = useState<string[]>(PRESETS[0].tokens);

  const outputBoxRef = useRef<HTMLDivElement>(null);
  const prismRef = useRef<HTMLDivElement>(null);
  const laserSvgRef = useRef<SVGSVGElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const activePreset = PRESETS[selectedPreset];

  const runSimulation = () => {
    if (isQuerying) return;
    setIsQuerying(true);

    // 1. Anime.js laser beam animation
    if (laserSvgRef.current) {
      const paths = laserSvgRef.current.querySelectorAll("line");
      paths.forEach((p, idx) => {
        animate(p, {
          strokeDashoffset: [80, 0],
          opacity: [0.2, 1],
          duration: 380 + idx * 80,
          ease: "outQuad",
        });
      });
    }

    // 2. Prism glow pulse
    if (prismRef.current) {
      animate(prismRef.current, {
        scale: [1, 1.03, 1],
        duration: 500,
        ease: "inOutQuad",
      });
    }

    // 3. Token burst animation
    setTokensBurst(activePreset.tokens);

    setTimeout(() => {
      const calculated = +(
        1 / (60 + Math.round((1 - activePreset.bm25) * 10)) +
        1 / (60 + Math.round((1 - activePreset.vector) * 10)) +
        0.93
      ).toFixed(3);
      setFusedScore(calculated);
      setIsQuerying(false);
    }, 600);
  };

  useEffect(() => {
    runSimulation();
  }, [selectedPreset]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = (-y / rect.height) * 3;
    const rotY = (x / rect.width) * 3;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="paper-sheet p-6 sm:p-10 rounded-sm space-y-8 relative overflow-hidden transition-transform duration-200 ease-out"
    >
      {/* Corner Registration Marks */}
      <div className="absolute top-3 left-3 font-mono text-[9px] text-[var(--text-ink-faint)]">+</div>
      <div className="absolute top-3 right-3 font-mono text-[9px] text-[var(--text-ink-faint)]">+</div>
      <div className="absolute bottom-3 left-3 font-mono text-[9px] text-[var(--text-ink-faint)]">+</div>
      <div className="absolute bottom-3 right-3 font-mono text-[9px] text-[var(--text-ink-faint)]">+</div>

      {/* Header Plate */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-paper-strong)] pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="stamp-seal stamp-blue">PATENT SPEC // 01</span>
            <span className="text-[var(--text-ink-muted)]">•</span>
            <span className="text-[var(--text-ink-muted)]">FIG. 1.0 — 3-LANE HYBRID RETRIEVAL PRISM</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-ink)]">
            Synapse
          </h3>

          <p className="text-sm sm:text-base text-[var(--text-ink-secondary)] max-w-2xl font-sans">
            Structural code intelligence engine for AI agents (Cursor, Claude). Solves hallucination on 50k+ symbol codebases through Tree-sitter AST parsing, SQLite WAL persistence, and Model Context Protocol (MCP) streaming.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://pypi.org/project/synap-git/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 border border-[var(--border-paper)] hover:border-[var(--text-ink)] rounded-xs font-mono text-xs text-[var(--text-ink)] flex items-center gap-1.5 transition-colors bg-[var(--bg-card)] shadow-xs"
          >
            <span>PyPI Live</span>
            <ArrowUpRight size={12} />
          </a>
          <a
            href="https://github.com/saahilpal/synapse"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-[var(--text-ink)] text-[var(--bg-paper)] rounded-xs font-mono text-xs flex items-center gap-1.5 hover:bg-[var(--text-ink-secondary)] active:scale-95 transition-all shadow-xs"
          >
            <span>GitHub Spec</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>

      {/* Interactive Query Presets Selector */}
      <div className="p-3 bg-[var(--bg-card-draft)] border border-[var(--border-paper)] rounded-xs flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-[var(--text-ink-muted)] text-[11px]">
          <Search size={12} className="text-[var(--stamp-blue)]" />
          <span className="font-bold text-[var(--text-ink)]">TEST LIVE AGENT QUERIES:</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setSelectedPreset(idx)}
              className={`px-2.5 py-1 rounded-xs border text-[11px] transition-all ${
                selectedPreset === idx
                  ? "bg-[var(--text-ink)] text-[var(--bg-paper)] border-[var(--text-ink)] font-bold shadow-xs"
                  : "bg-[var(--bg-card)] border-[var(--border-paper)] text-[var(--text-ink-secondary)] hover:border-[var(--border-paper-strong)]"
              }`}
            >
              <code>{p.query}</code>
            </button>
          ))}
        </div>
      </div>

      {/* Technical Schematic Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Technical Patent Diagram */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border border-[var(--border-paper)] rounded-xs p-4 sm:p-6 bg-[var(--bg-card-draft)] space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[var(--border-paper)] pb-2 text-[11px] text-[var(--text-ink-muted)]">
              <span className="flex items-center gap-1.5 font-bold text-[var(--text-ink)]">
                <Terminal size={12} />
                <span>TREE-SITTER AST SYMBOL EXTRACTION</span>
              </span>
              <span className="text-[10px] text-[var(--stamp-green)] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--stamp-green)] animate-ping" />
                <span>DAEMON ACTIVE</span>
              </span>
            </div>

            {/* Code Block */}
            <pre className="p-3 bg-[var(--bg-card)] border border-[var(--border-paper)] rounded-xs text-[11px] leading-relaxed text-[var(--text-ink-secondary)] overflow-x-auto shadow-inner">
{`# Synapse AST Engine Daemon (Python 3.11 + Tree-sitter)
class ASTSymbolParser:
    def extract_symbol_hierarchy(self, tree: Tree, source_bytes: bytes) -> SymbolNode:
        # Traverses parent-child scopes without memory bloat
        for node in tree.root_node.children:
            if node.type in ("function_definition", "class_definition"):
                symbol = self.resolve_call_signature(node, source_bytes)
                self.wal_store.insert_symbol(symbol.identifier, symbol.ast_hash)`}
            </pre>

            {/* Token Budget Gauge */}
            <div className="p-3 bg-[var(--bg-card)] border border-[var(--border-paper)] rounded-xs space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-[var(--text-ink-muted)]">STRICT AGENT TOKEN BUDGET</span>
                <span className="font-bold text-[var(--text-ink)]">3,840 / 4,096 TOKENS (93.7%)</span>
              </div>
              <div className="w-full bg-[var(--border-paper)] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[var(--text-ink)] h-full w-[93.7%] transition-all duration-500" />
              </div>
              <div className="text-[10px] text-[var(--text-ink-muted)] flex justify-between">
                <span>AST Graph Pruning: ON</span>
                <span>Context Window Overflow: 0.00%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive 3-Lane Retrieval Simulator */}
        <div className="lg:col-span-5 space-y-4">
          <div ref={prismRef} className="border border-[var(--border-paper)] p-5 rounded-xs bg-[var(--bg-card)] space-y-4 shadow-sm transition-all">
            <div className="flex items-center justify-between border-b border-[var(--border-paper)] pb-2 text-xs font-mono">
              <span className="font-bold text-[var(--text-ink)] flex items-center gap-1.5">
                <Layers size={13} className="text-[var(--stamp-blue)]" />
                <span>3-LANE RETRIEVAL PRISM</span>
              </span>
              <button
                onClick={runSimulation}
                disabled={isQuerying}
                className="px-2.5 py-1 rounded-xs bg-[var(--text-ink)] text-[var(--bg-paper)] text-[10px] font-bold flex items-center gap-1 hover:bg-[var(--text-ink-secondary)] active:scale-95 disabled:opacity-50 transition-all shadow-xs"
              >
                <Play size={10} className={isQuerying ? "animate-spin" : ""} />
                <span>{isQuerying ? "FUSING BEAMS..." : "RE-EMULATE"}</span>
              </button>
            </div>

            {/* Animated Laser SVG Canvas */}
            <svg ref={laserSvgRef} className="w-full h-8" viewBox="0 0 300 32">
              <line x1="10" y1="6" x2="150" y2="16" stroke="var(--stamp-blue)" strokeWidth="1.5" strokeDasharray="80" />
              <line x1="10" y1="16" x2="150" y2="16" stroke="var(--stamp-green)" strokeWidth="1.5" strokeDasharray="80" />
              <line x1="10" y1="26" x2="150" y2="16" stroke="var(--stamp-red)" strokeWidth="1.5" strokeDasharray="80" />
              <circle cx="150" cy="16" r="4" fill="var(--text-ink)" />
              <line x1="150" y1="16" x2="290" y2="16" stroke="var(--text-ink)" strokeWidth="2" strokeDasharray="4 2" />
            </svg>

            {/* Lane 1: Lexical */}
            <div className="p-2.5 rounded-xs border border-[var(--border-paper)] space-y-1.5 bg-[var(--bg-card-draft)]">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="font-bold text-[var(--text-ink)]">LANE 1: LEXICAL (BM25)</span>
                <span className="text-[var(--stamp-blue)] font-bold">{(activePreset.bm25 * 100).toFixed(0)}% MATCH</span>
              </div>
              <div className="w-full bg-[var(--border-paper)] h-1 rounded-full overflow-hidden">
                <div
                  className="bg-[var(--stamp-blue)] h-full transition-all duration-300"
                  style={{ width: `${activePreset.bm25 * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-[var(--text-ink-muted)] font-mono">
                Exact symbol keywords in SQLite FTS5 table with BM25 ranking.
              </p>
            </div>

            {/* Lane 2: AST */}
            <div className="p-2.5 rounded-xs border border-[var(--border-paper)] space-y-1.5 bg-[var(--bg-card-draft)]">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="font-bold text-[var(--text-ink)]">LANE 2: STRUCTURAL AST</span>
                <span className="text-[var(--stamp-green)] font-bold">{(activePreset.ast * 100).toFixed(0)}% MATCH</span>
              </div>
              <div className="w-full bg-[var(--border-paper)] h-1 rounded-full overflow-hidden">
                <div
                  className="bg-[var(--stamp-green)] h-full transition-all duration-300"
                  style={{ width: `${activePreset.ast * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-[var(--text-ink-muted)] font-mono">
                Tree-sitter parent scopes, callers, and class inheritance hierarchies.
              </p>
            </div>

            {/* Lane 3: Vectors */}
            <div className="p-2.5 rounded-xs border border-[var(--border-paper)] space-y-1.5 bg-[var(--bg-card-draft)]">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="font-bold text-[var(--text-ink)]">LANE 3: SEMANTIC VECTORS</span>
                <span className="text-[var(--stamp-red)] font-bold">{(activePreset.vector * 100).toFixed(0)}% MATCH</span>
              </div>
              <div className="w-full bg-[var(--border-paper)] h-1 rounded-full overflow-hidden">
                <div
                  className="bg-[var(--stamp-red)] h-full transition-all duration-300"
                  style={{ width: `${activePreset.vector * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-[var(--text-ink-muted)] font-mono">
                Dense embeddings for conceptual agent intent inquiries.
              </p>
            </div>

            {/* Token Burst Pills */}
            {tokensBurst.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tokensBurst.map((t, i) => (
                  <span key={i} className="px-1.5 py-0.5 rounded-xs bg-[var(--stamp-blue-bg)] text-[var(--stamp-blue)] text-[9px] font-mono border border-[var(--stamp-blue-border)]">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* RRF Fused Result Box */}
            <div
              ref={outputBoxRef}
              className="p-3 border border-[var(--border-paper-strong)] rounded-xs bg-[var(--bg-paper-secondary)] space-y-1.5 font-mono text-xs"
            >
              <div className="flex justify-between text-[11px] text-[var(--text-ink-muted)]">
                <span>RECIPROCAL RANK FUSION (RRF)</span>
                <span className="font-bold text-[var(--text-ink)]">SCORE: {fusedScore}</span>
              </div>
              <div className="text-[11px] text-[var(--text-ink-secondary)]">
                Formula: <code className="font-bold">RRF(d) = Σ 1 / (60 + rank(d))</code>
              </div>
              <div className="text-[10px] text-[var(--stamp-green)] flex items-center gap-1 font-semibold">
                <CheckCircle2 size={11} />
                <span>SYNTACTICALLY BOUNDED CONTEXT SERVED OVER MCP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
