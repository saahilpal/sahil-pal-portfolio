"use client";

import { useState, useRef } from "react";
import { animate } from "animejs";
import { ArrowUpRight, Cpu, Database, CheckCircle2, Lock, FileSearch, Sparkles, Play, Search, Eye } from "lucide-react";

interface RagQueryPreset {
  id: string;
  query: string;
  answer: string;
  citation: string;
  similarity: number;
  bbox: { top: number; left: number; width: number; height: number };
}

const RAG_PRESETS: RagQueryPreset[] = [
  {
    id: "queue",
    query: "How does the worker queue prevent duplicate embeddings?",
    answer:
      "Under Section 4.2 of the specification, the background ingestion workers acquire locks using PostgreSQL FOR UPDATE SKIP LOCKED. This guarantees that multiple worker threads never duplicate embedding passes on the same document chunk.",
    citation: "DOC_SPEC.PDF, PAGE 4, ¶ 2",
    similarity: 0.942,
    bbox: { top: 38, left: 15, width: 70, height: 22 },
  },
  {
    id: "sliding",
    query: "What is the token sliding window and chunk overlap size?",
    answer:
      "Documents are partitioned into 512-token windows with a 64-token stride overlap. This preserves contiguous semantic meaning across paragraph boundaries before computing 768-dimensional Gemini embeddings.",
    citation: "CHUNKING_RFC.PDF, PAGE 2, ¶ 5",
    similarity: 0.918,
    bbox: { top: 62, left: 12, width: 76, height: 18 },
  },
  {
    id: "vector",
    query: "How are vector embeddings indexed in pgvector?",
    answer:
      "Vector embeddings are stored in PostgreSQL pgvector columns with Hierarchical Navigable Small World (HNSW) indexing using vector_cosine_ops, achieving sub-10ms nearest-neighbor recall.",
    citation: "DB_INDEXING.PDF, PAGE 7, ¶ 1",
    similarity: 0.965,
    bbox: { top: 20, left: 14, width: 72, height: 26 },
  },
];

export function DocAnalyzerPaper() {
  const [activeStage, setActiveStage] = useState<number>(4);
  const [selectedPresetIdx, setSelectedPresetIdx] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [showCitationBox, setShowCitationBox] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string>(RAG_PRESETS[0].answer);

  const cardRef = useRef<HTMLDivElement>(null);
  const streamBoxRef = useRef<HTMLDivElement>(null);
  const citationDocRef = useRef<HTMLDivElement>(null);

  const activePreset = RAG_PRESETS[selectedPresetIdx];

  const stages = [
    { num: "01", name: "INGEST", desc: "Multer & SHA-256 deduplication to Supabase", badge: "Express / Multer" },
    { num: "02", name: "PARSE", desc: "Multi-page PDF extraction with token sliding window", badge: "Node Worker" },
    { num: "03", name: "EMBED", desc: "Google Gemini 768-dim batch vector generation", badge: "Gemini API" },
    { num: "04", name: "RETRIEVE", desc: "Cosine similarity over pgvector + FTS fallback", badge: "PostgreSQL" },
    { num: "05", name: "SYNTHESIZE", desc: "Strict citation grounding streamed via SSE", badge: "Server-Sent Events" },
  ];

  const triggerStreamSimulation = (preset = activePreset) => {
    if (isSimulating) return;
    setIsSimulating(true);

    const fullAnswer = preset.answer;
    setDisplayText("");
    let charIdx = 0;

    const interval = setInterval(() => {
      if (charIdx < fullAnswer.length) {
        setDisplayText((prev) => prev + fullAnswer.charAt(charIdx));
        charIdx++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 14);

    if (streamBoxRef.current) {
      animate(streamBoxRef.current, {
        borderColor: ["var(--border-paper)", "var(--stamp-blue)", "var(--border-paper)"],
        duration: 900,
        ease: "inOutQuad",
      });
    }
  };

  const handleSelectPreset = (idx: number) => {
    setSelectedPresetIdx(idx);
    setShowCitationBox(true);
    triggerStreamSimulation(RAG_PRESETS[idx]);
  };

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
            <span className="stamp-seal stamp-red">PRODUCTION SPEC // 02</span>
            <span className="text-[var(--text-ink-muted)]">•</span>
            <span className="text-[var(--text-ink-muted)]">FIG. 2.0 — GROUNDED RAG PIPELINE &amp; QUEUE</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-ink)]">
            DocAnalyzer
          </h3>

          <p className="text-sm sm:text-base text-[var(--text-ink-secondary)] max-w-2xl font-sans">
            High-fidelity document intelligence platform with deterministic citation grounding. Features asynchronous worker queues preventing server starvation and real-time Server-Sent Events (SSE) answer streaming.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://www.docanalyzer.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 border border-[var(--border-paper)] hover:border-[var(--text-ink)] rounded-xs font-mono text-xs text-[var(--text-ink)] flex items-center gap-1.5 transition-colors bg-[var(--bg-card)] shadow-xs"
          >
            <span>Live App</span>
            <ArrowUpRight size={12} />
          </a>
          <a
            href="https://github.com/saahilpal/RAG-DOCAnalyzer"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-[var(--text-ink)] text-[var(--bg-paper)] rounded-xs font-mono text-xs flex items-center gap-1.5 hover:bg-[var(--text-ink-secondary)] active:scale-95 transition-all shadow-xs"
          >
            <span>GitHub Spec</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>

      {/* 5-Stage Blueprint Flow with Animated Indicator */}
      <div className="space-y-4 font-mono">
        <div className="flex justify-between items-center text-xs text-[var(--text-ink-muted)] border-b border-[var(--border-paper)] pb-2">
          <span className="flex items-center gap-1.5">
            <span>THE 5-STAGE GROUNDED PIPELINE</span>
            <span className="w-2 h-2 rounded-full bg-[var(--stamp-blue)] animate-ping" />
          </span>
          <span className="text-[var(--stamp-green)] font-semibold flex items-center gap-1">
            <Lock size={11} />
            <span>FOR UPDATE SKIP LOCKED</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {stages.map((st, idx) => (
            <button
              key={st.num}
              onClick={() => setActiveStage(idx)}
              className={`p-3 text-left border rounded-xs transition-all relative overflow-hidden ${
                activeStage === idx
                  ? "border-[var(--text-ink)] bg-[var(--bg-card)] shadow-sm translate-y-[-2px]"
                  : "border-[var(--border-paper)] bg-[var(--bg-card-draft)] hover:border-[var(--border-paper-strong)]"
              }`}
            >
              <div className="flex justify-between items-center text-[10px] text-[var(--text-ink-muted)]">
                <span>{st.num}</span>
                <span className="text-[9px] uppercase px-1 py-0.5 rounded-xs bg-[var(--border-paper)]">
                  {st.badge}
                </span>
              </div>
              <div className="font-bold text-xs text-[var(--text-ink)] mt-1">{st.name}</div>
              <div className="text-[11px] text-[var(--text-ink-secondary)] mt-0.5 leading-snug">
                {st.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Simulation Window */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
        {/* Left Side: Grounded Answer Stream & Query Presets */}
        <div className="lg:col-span-7 space-y-3 font-mono text-xs">
          {/* Query Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="text-[var(--text-ink-muted)] mr-1">TEST QUESTION:</span>
            {RAG_PRESETS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(idx)}
                className={`px-2 py-1 rounded-xs border transition-all ${
                  selectedPresetIdx === idx
                    ? "bg-[var(--text-ink)] text-[var(--bg-paper)] border-[var(--text-ink)] font-bold shadow-xs"
                    : "bg-[var(--bg-card)] border-[var(--border-paper)] text-[var(--text-ink-secondary)] hover:border-[var(--border-paper-strong)]"
                }`}
              >
                Q0{idx + 1}
              </button>
            ))}
          </div>

          <div ref={streamBoxRef} className="p-4 border border-[var(--border-paper)] rounded-xs bg-[var(--bg-card-draft)] space-y-3 transition-colors">
            <div className="flex items-center justify-between text-[11px] text-[var(--text-ink-muted)] border-b border-[var(--border-paper)] pb-2">
              <span className="flex items-center gap-1 font-bold text-[var(--text-ink)]">
                <FileSearch size={12} />
                <span>SERVER-SENT EVENTS (SSE) STREAM</span>
              </span>
              <button
                onClick={() => triggerStreamSimulation()}
                disabled={isSimulating}
                className="px-2 py-0.5 rounded-xs bg-[var(--text-ink)] text-[var(--bg-paper)] text-[10px] font-bold flex items-center gap-1 hover:bg-[var(--text-ink-secondary)] active:scale-95 disabled:opacity-50 transition-all shadow-xs"
              >
                <Play size={9} />
                <span>{isSimulating ? "STREAMING..." : "RE-STREAM"}</span>
              </button>
            </div>

            <div className="p-3 bg-[var(--bg-card)] border border-[var(--border-paper)] rounded-xs space-y-2">
              <div className="text-[11px] text-[var(--text-ink-muted)]">
                QUERY: &quot;{activePreset.query}&quot;
              </div>
              <div className="text-xs text-[var(--text-ink)] leading-relaxed font-sans font-medium min-h-[54px]">
                {displayText}
                {isSimulating && <span className="inline-block w-1.5 h-3.5 bg-[var(--stamp-blue)] ml-1 animate-pulse" />}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-dashed border-[var(--border-paper)]">
                <button
                  onClick={() => setShowCitationBox(!showCitationBox)}
                  className="stamp-seal stamp-blue text-[9px] py-0.5 px-1.5 cursor-pointer hover:opacity-90 flex items-center gap-1"
                >
                  <Eye size={10} />
                  <span>CITATION: [{activePreset.citation}]</span>
                </button>
                <span className="text-[10px] text-[var(--text-ink-muted)] font-mono">
                  Cosine Distance: {(1 - activePreset.similarity).toFixed(3)} • Sim: {(activePreset.similarity * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Virtual Document Citation Bounding Box Inspector */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-4 border border-[var(--border-paper)] rounded-xs bg-[var(--bg-card)] space-y-3 font-mono text-xs shadow-sm">
            <div className="font-bold text-xs text-[var(--text-ink)] flex items-center justify-between border-b border-[var(--border-paper)] pb-2">
              <span className="flex items-center gap-1.5">
                <Database size={13} className="text-[var(--stamp-green)]" />
                <span>BOUNDING BOX CITATION VERIFIER</span>
              </span>
              <span className="text-[9px] text-[var(--stamp-blue)] font-bold">PAGE INSPECTION</span>
            </div>

            {/* Virtual A4 Page Thumbnail with Highlighted Bounding Box */}
            <div className="w-full h-36 bg-[var(--bg-card-draft)] border border-[var(--border-paper-strong)] rounded-xs relative p-3 overflow-hidden shadow-inner">
              {/* Fake text skeleton lines */}
              <div className="space-y-1.5 opacity-40">
                <div className="w-1/3 h-2 bg-[var(--border-paper-strong)] rounded-xs" />
                <div className="w-full h-1.5 bg-[var(--border-paper-strong)] rounded-xs" />
                <div className="w-5/6 h-1.5 bg-[var(--border-paper-strong)] rounded-xs" />
                <div className="w-4/5 h-1.5 bg-[var(--border-paper-strong)] rounded-xs" />
                <div className="w-full h-1.5 bg-[var(--border-paper-strong)] rounded-xs" />
                <div className="w-3/4 h-1.5 bg-[var(--border-paper-strong)] rounded-xs" />
              </div>

              {/* Exact Highlighted Citation Box */}
              <div
                style={{
                  top: `${activePreset.bbox.top}%`,
                  left: `${activePreset.bbox.left}%`,
                  width: `${activePreset.bbox.width}%`,
                  height: `${activePreset.bbox.height}%`,
                }}
                className="absolute border-2 border-[var(--stamp-blue)] bg-[var(--stamp-blue-bg)] rounded-xs flex items-center justify-between px-2 text-[9px] font-bold text-[var(--stamp-blue)] animate-pulse"
              >
                <span>VERIFIED SOURCE OFFSET</span>
                <span>¶ {activePreset.citation.split("¶")[1] || "2"}</span>
              </div>
            </div>

            <div className="space-y-1 text-[11px] text-[var(--text-ink-muted)] pt-1 border-t border-dashed border-[var(--border-paper)]">
              <div>• PostgreSQL <code className="text-[var(--text-ink)] font-bold">FOR UPDATE SKIP LOCKED</code> queue lock.</div>
              <div>• Eliminates duplicate embeddings across parallel ingestion workers.</div>
              <div>• Real-time SSE streaming preserves source coordinates.</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
