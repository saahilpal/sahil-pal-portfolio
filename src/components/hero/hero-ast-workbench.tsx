"use client";

import { useState, useRef, useEffect } from "react";
import { animate } from "animejs";
import { Terminal, GitBranch, Play, CheckCircle2, Cpu, Sparkles, Layers } from "lucide-react";

interface SnippetOption {
  id: string;
  label: string;
  file: string;
  lang: string;
  system: string;
  code: string[];
  astNodes: { id: string; label: string; type: string; x: number; y: number; parent?: string }[];
  metrics: { latency: string; tokens: number; guarantee: string };
}

const SNIPPETS: SnippetOption[] = [
  {
    id: "synapse",
    label: "Synapse: AST Parser",
    file: "daemon/ast_indexer.py",
    lang: "Python 3.11",
    system: "Synapse Code Intelligence",
    code: [
      "def extract_caller_hierarchy(node: Node, max_depth: int = 4):",
      "    # Tree-sitter CST traversal for AST symbols",
      "    query = parser.get_language().query('(function_definition name: (identifier) @fn)')",
      "    matches = query.matches(node)",
      "    return [m[1]['fn'].text.decode('utf-8') for m in matches]",
    ],
    astNodes: [
      { id: "root", label: "Module", type: "module", x: 200, y: 15 },
      { id: "fn", label: "FunctionDef: extract_caller", type: "def", x: 200, y: 55, parent: "root" },
      { id: "params", label: "Params (node, depth=4)", type: "param", x: 80, y: 100, parent: "fn" },
      { id: "query", label: "Tree-sitter Query", type: "call", x: 220, y: 100, parent: "fn" },
      { id: "ret", label: "Call Hierarchy Array", type: "ret", x: 340, y: 100, parent: "fn" },
    ],
    metrics: { latency: "1.84ms", tokens: 52, guarantee: "Deterministic AST Traversal" },
  },
  {
    id: "docanalyzer",
    label: "DocAnalyzer: Queue Lock",
    file: "workers/ingestion_queue.sql",
    lang: "PostgreSQL 16",
    system: "DocAnalyzer Worker Pool",
    code: [
      "WITH next_job AS (",
      "    SELECT job_id, document_id",
      "    FROM ingestion_queue WHERE status = 'PENDING'",
      "    ORDER BY priority DESC, created_at ASC",
      "    FOR UPDATE SKIP LOCKED LIMIT 1",
      ")",
      "UPDATE ingestion_queue SET status = 'PROCESSING' WHERE job_id = (SELECT job_id FROM next_job);",
    ],
    astNodes: [
      { id: "root", label: "CTE Statement (WITH)", type: "module", x: 200, y: 15 },
      { id: "select", label: "SELECT PENDING", type: "call", x: 100, y: 60, parent: "root" },
      { id: "lock", label: "FOR UPDATE SKIP LOCKED", type: "lock", x: 200, y: 105, parent: "select" },
      { id: "update", label: "ATOMIC UPDATE (PROCESSING)", type: "def", x: 320, y: 60, parent: "root" },
    ],
    metrics: { latency: "0.42ms", tokens: 68, guarantee: "Zero Race Conditions" },
  },
  {
    id: "herabilling",
    label: "Hera: Even Parity Math",
    file: "domain/WholesaleTaxEngine.kt",
    lang: "Kotlin 2.0",
    system: "Hera Hosiery Wholesale",
    code: [
      "// Largest Remainder Method in ₹0.50 steps",
      "val roundedQ = (rawQuantity / 1000.0).roundToStep(0.50)",
      "val subtotal = (rateInPaise * roundedQ).roundToLong()",
      "// Guarantee strict even parity so CGST == SGST",
      "val taxSplit = if (subtotal % 2L != 0L) subtotal + 1L else subtotal",
      "return WholesaleInvoice(taxable = taxSplit, cgst = taxSplit / 40, sgst = taxSplit / 40)",
    ],
    astNodes: [
      { id: "root", label: "Function: computeWholesaleTax", type: "module", x: 200, y: 15 },
      { id: "step", label: "Quantize (0.50 Step)", type: "param", x: 90, y: 60, parent: "root" },
      { id: "parity", label: "Check Even Parity % 2L", type: "lock", x: 200, y: 105, parent: "root" },
      { id: "split", label: "Exact 50/50 Split (CGST/SGST)", type: "def", x: 330, y: 60, parent: "parity" },
    ],
    metrics: { latency: "0.08ms", tokens: 74, guarantee: "0-Paise Discrepancy" },
  },
];

export function HeroAstWorkbench() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(100);

  const laserLineRef = useRef<HTMLDivElement>(null);
  const codeBoxRef = useRef<HTMLDivElement>(null);
  const treeSvgRef = useRef<SVGSVGElement>(null);

  const activeSnippet = SNIPPETS[selectedIdx];

  const triggerScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);

    // Laser beam scan animation
    if (laserLineRef.current) {
      animate(laserLineRef.current, {
        top: ["0%", "100%"],
        opacity: [0, 1, 1, 0],
        duration: 850,
        ease: "inOutQuad",
      });
    }

    // Animate SVG tree lines
    if (treeSvgRef.current) {
      const paths = treeSvgRef.current.querySelectorAll("line");
      paths.forEach((p, idx) => {
        animate(p, {
          strokeDashoffset: [100, 0],
          opacity: [0.2, 1],
          duration: 500 + idx * 80,
          ease: "outQuad",
        });
      });

      const circles = treeSvgRef.current.querySelectorAll("circle");
      circles.forEach((c, idx) => {
        animate(c, {
          scale: [0, 1],
          duration: 400 + idx * 60,
          ease: "outBack",
        });
      });
    }

    setTimeout(() => {
      setScanProgress(100);
      setIsScanning(false);
    }, 900);
  };

  useEffect(() => {
    triggerScan();
  }, [selectedIdx]);

  return (
    <div className="paper-sheet rounded-sm p-4 sm:p-6 space-y-4 relative overflow-hidden bg-[var(--bg-card)] shadow-md">
      {/* Corner crosshairs */}
      <div className="absolute top-2 left-2 font-mono text-[9px] text-[var(--text-ink-faint)]">+</div>
      <div className="absolute top-2 right-2 font-mono text-[9px] text-[var(--text-ink-faint)]">+</div>
      <div className="absolute bottom-2 left-2 font-mono text-[9px] text-[var(--text-ink-faint)]">+</div>
      <div className="absolute bottom-2 right-2 font-mono text-[9px] text-[var(--text-ink-faint)]">+</div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border-paper)] pb-3 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--stamp-blue)] animate-ping" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-ink)]">
            LIVE SYSTEMS &amp; AST COMPILER WORKBENCH
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--text-ink-muted)]">
          <span>{activeSnippet.lang}</span>
          <span>•</span>
          <span className="text-[var(--text-ink)] font-semibold">{activeSnippet.file}</span>
        </div>
      </div>

      {/* Snippet Selection Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
        {SNIPPETS.map((snip, idx) => (
          <button
            key={snip.id}
            onClick={() => setSelectedIdx(idx)}
            className={`px-3 py-1.5 rounded-xs border transition-all text-[11px] flex items-center gap-1.5 ${
              selectedIdx === idx
                ? "bg-[var(--text-ink)] text-[var(--bg-paper)] border-[var(--text-ink)] font-semibold shadow-xs"
                : "border-[var(--border-paper)] bg-[var(--bg-card-draft)] text-[var(--text-ink-secondary)] hover:border-[var(--border-paper-strong)]"
            }`}
          >
            <GitBranch size={11} className={selectedIdx === idx ? "text-[var(--stamp-red)]" : "text-current"} />
            <span>{snip.label}</span>
          </button>
        ))}

        <button
          onClick={triggerScan}
          disabled={isScanning}
          className="ml-auto px-2.5 py-1.5 bg-[var(--bg-paper-secondary)] hover:bg-[var(--border-paper)] text-[var(--text-ink)] border border-[var(--border-paper)] rounded-xs font-mono text-[11px] font-semibold flex items-center gap-1 transition-all active:scale-95"
          title="Re-run AST Parser Scan"
        >
          <Play size={10} className={isScanning ? "animate-spin text-[var(--stamp-blue)]" : ""} />
          <span>{isScanning ? "SCANNING..." : "SCAN AST"}</span>
        </button>
      </div>

      {/* Code Editor Surface with Animated Laser Scanner */}
      <div
        ref={codeBoxRef}
        className="relative bg-[var(--bg-card-draft)] border border-[var(--border-paper)] rounded-xs p-3 font-mono text-xs leading-relaxed text-[var(--text-ink-secondary)] overflow-hidden shadow-inner"
      >
        {/* Laser Scanner Beam */}
        <div
          ref={laserLineRef}
          className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--stamp-blue)] to-transparent pointer-events-none z-10 opacity-0"
        />

        <div className="space-y-1">
          {activeSnippet.code.map((line, lIdx) => (
            <div key={lIdx} className="flex items-start gap-3 hover:bg-[var(--border-paper)]/40 px-1 rounded-xs transition-colors">
              <span className="text-[10px] text-[var(--text-ink-faint)] select-none w-4 text-right">
                {lIdx + 1}
              </span>
              <span className="overflow-x-auto whitespace-pre">{line}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Abstract Syntax Tree (Dynamic SVG Node Graph) */}
      <div className="border border-[var(--border-paper)] rounded-xs p-3 bg-[var(--bg-card)] space-y-2">
        <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-ink-muted)] border-b border-dashed border-[var(--border-paper)] pb-1.5">
          <span className="font-semibold text-[var(--text-ink)] uppercase tracking-wider">
            SYNTACTIC TREE TOPOLOGY (AST)
          </span>
          <span className="text-[var(--stamp-green)] font-semibold flex items-center gap-1">
            <CheckCircle2 size={10} />
            <span>{activeSnippet.metrics.guarantee}</span>
          </span>
        </div>

        {/* Tree SVG */}
        <div className="w-full h-32 sm:h-36 relative flex items-center justify-center overflow-x-auto">
          <svg ref={treeSvgRef} className="w-full h-full min-w-[380px]" viewBox="0 0 420 130">
            {/* Connection Lines */}
            {activeSnippet.astNodes.map((node) => {
              if (!node.parent) return null;
              const parentNode = activeSnippet.astNodes.find((n) => n.id === node.parent);
              if (!parentNode) return null;
              return (
                <line
                  key={`${parentNode.id}-${node.id}`}
                  x1={parentNode.x}
                  y1={parentNode.y}
                  x2={node.x}
                  y2={node.y}
                  stroke="var(--border-paper-strong)"
                  strokeWidth="1.25"
                  strokeDasharray="4 2"
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Tree Nodes */}
            {activeSnippet.astNodes.map((node) => (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                <circle
                  r="6"
                  fill={
                    node.type === "module"
                      ? "var(--stamp-blue)"
                      : node.type === "lock"
                      ? "var(--stamp-red)"
                      : "var(--stamp-green)"
                  }
                  stroke="var(--bg-card)"
                  strokeWidth="2"
                />
                <rect
                  x="-55"
                  y="8"
                  width="110"
                  height="16"
                  rx="2"
                  fill="var(--bg-paper-secondary)"
                  stroke="var(--border-paper)"
                  strokeWidth="0.75"
                />
                <text
                  x="0"
                  y="19"
                  textAnchor="middle"
                  className="font-mono text-[8.5px] font-semibold fill-[var(--text-ink)] select-none pointer-events-none"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Metrics Footer Readouts */}
      <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[10px]">
        <div className="p-2 border border-[var(--border-paper)] rounded-xs bg-[var(--bg-card-draft)]">
          <div className="text-[var(--text-ink-muted)]">PARSE LATENCY</div>
          <div className="text-xs font-bold text-[var(--text-ink)] mt-0.5">
            {activeSnippet.metrics.latency}
          </div>
        </div>
        <div className="p-2 border border-[var(--border-paper)] rounded-xs bg-[var(--bg-card-draft)]">
          <div className="text-[var(--text-ink-muted)]">TOKENS ANALYZED</div>
          <div className="text-xs font-bold text-[var(--stamp-blue)] mt-0.5">
            {activeSnippet.metrics.tokens} AST Nodes
          </div>
        </div>
        <div className="p-2 border border-[var(--border-paper)] rounded-xs bg-[var(--bg-card-draft)]">
          <div className="text-[var(--text-ink-muted)]">SYSTEM PROOF</div>
          <div className="text-xs font-bold text-[var(--stamp-green)] mt-0.5 truncate">
            {activeSnippet.metrics.guarantee}
          </div>
        </div>
      </div>
    </div>
  );
}
