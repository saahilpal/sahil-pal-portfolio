"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Terminal,
  FileCode,
  Coffee,
  Binary,
  Database,
  GitBranch,
  Network,
  FileText,
  Layers,
  Search,
  Server,
  Workflow,
  Radio,
  Lock,
  Zap,
  Smartphone,
  HardDrive,
  FolderCheck,
  Printer,
  RefreshCw,
  GitCommit,
  Box,
  Sparkles,
  Package,
  Shield,
  Code2,
} from "lucide-react";

interface SkillItem {
  id: string;
  name: string;
  level: "CORE STACK" | "BUILT PROJECTS WITH" | "INTERN / ACADEMIC";
  icon: any;
  context: string;
  repo: string;
}

interface DomainCategory {
  catNo: string;
  title: string;
  skills: SkillItem[];
}

const DOMAINS: DomainCategory[] = [
  {
    catNo: "CAT-01",
    title: "CORE PROGRAMMING LANGUAGES",
    skills: [
      {
        id: "python",
        name: "Python 3.11",
        level: "CORE STACK",
        icon: Terminal,
        context: "Daily language for Synapse daemon: AsyncIO background workers, Tree-sitter AST parsing, PyPI packaging.",
        repo: "saahilpal/synapse",
      },
      {
        id: "typescript",
        name: "TypeScript",
        level: "CORE STACK",
        icon: FileCode,
        context: "Primary language for DocAnalyzer frontend/backend and LeetSync Manifest V3 extension with strict typing.",
        repo: "saahilpal/RAG-DOCAnalyzer",
      },
      {
        id: "kotlin",
        name: "Kotlin & Android",
        level: "CORE STACK",
        icon: Smartphone,
        context: "100% Jetpack Compose MVI architecture, Kotlin StateFlow, Room DB v13, WorkManager daily backups.",
        repo: "local/herabilling",
      },
      {
        id: "java",
        name: "Java 17",
        level: "INTERN / ACADEMIC",
        icon: Coffee,
        context: "Developed RESTful APIs with Vert.x event loops, JWT sessions, and Redis during university internship.",
        repo: "Kristu Jayanti SDC",
      },
      {
        id: "sql",
        name: "SQL & Relational",
        level: "CORE STACK",
        icon: Database,
        context: "Writing PostgreSQL queries, pgvector distance indexing, and SQLite WAL transactions.",
        repo: "saahilpal/RAG-DOCAnalyzer",
      },
      {
        id: "cpp",
        name: "C++ (DSA)",
        level: "INTERN / ACADEMIC",
        icon: Binary,
        context: "Data structures, pointer arithmetic, memory management, and university competitive programming coursework.",
        repo: "Academic BCA Coursework",
      },
    ],
  },
  {
    catNo: "CAT-02",
    title: "AI SYSTEMS & RETRIEVAL (AST / RAG)",
    skills: [
      {
        id: "ast",
        name: "Tree-sitter AST",
        level: "BUILT PROJECTS WITH",
        icon: GitBranch,
        context: "Parsed multi-language abstract syntax trees to extract scopes, parent classes, and call hierarchies in Synapse.",
        repo: "saahilpal/synapse",
      },
      {
        id: "mcp",
        name: "Model Context Protocol",
        level: "BUILT PROJECTS WITH",
        icon: Network,
        context: "Constructed an MCP-compliant server providing token-budget-bounded code snippets to AI coding agents.",
        repo: "saahilpal/synapse",
      },
      {
        id: "rag",
        name: "Grounded RAG",
        level: "BUILT PROJECTS WITH",
        icon: FileText,
        context: "Multi-document pipeline pairing Gemini embeddings with exact paragraph coordinates streamed via SSE.",
        repo: "saahilpal/RAG-DOCAnalyzer",
      },
      {
        id: "rrf",
        name: "Reciprocal Rank Fusion",
        level: "BUILT PROJECTS WITH",
        icon: Layers,
        context: "Implemented RRF formula 1/(k + rank) to merge BM25 lexical results with dense semantic vector distances.",
        repo: "saahilpal/synapse",
      },
      {
        id: "pgvector",
        name: "pgvector Indexing",
        level: "CORE STACK",
        icon: Search,
        context: "Cosine similarity search over 768-dim Gemini embeddings stored in PostgreSQL with HNSW/IVFFlat indexes.",
        repo: "saahilpal/RAG-DOCAnalyzer",
      },
    ],
  },
  {
    catNo: "CAT-03",
    title: "BACKEND & CONCURRENCY",
    skills: [
      {
        id: "node",
        name: "Node.js & Express",
        level: "CORE STACK",
        icon: Server,
        context: "REST API server handling multi-part PDF uploads, auth middleware, and job worker dispatching.",
        repo: "saahilpal/RAG-DOCAnalyzer",
      },
      {
        id: "queue",
        name: "PostgreSQL Queues",
        level: "BUILT PROJECTS WITH",
        icon: Lock,
        context: "Employed SELECT ... FOR UPDATE SKIP LOCKED to prevent duplicate chunking passes across worker threads.",
        repo: "saahilpal/RAG-DOCAnalyzer",
      },
      {
        id: "sse",
        name: "Server-Sent Events",
        level: "CORE STACK",
        icon: Radio,
        context: "EventStream HTTP protocol streaming LLM tokens in real-time to the client with sub-100ms TTFT.",
        repo: "saahilpal/RAG-DOCAnalyzer",
      },
      {
        id: "vertx",
        name: "Eclipse Vert.x",
        level: "INTERN / ACADEMIC",
        icon: Workflow,
        context: "Asynchronous non-blocking event loops and routing handlers built during software engineering internship.",
        repo: "Kristu Jayanti SDC",
      },
      {
        id: "redis",
        name: "Redis Token Blacklist",
        level: "INTERN / ACADEMIC",
        icon: Zap,
        context: "Implemented session revocation and JWT blacklist in Redis cache with automated TTL expiration.",
        repo: "Kristu Jayanti SDC",
      },
    ],
  },
  {
    catNo: "CAT-04",
    title: "MOBILE, STORAGE & TOOLS",
    skills: [
      {
        id: "compose",
        name: "Jetpack Compose",
        level: "CORE STACK",
        icon: Smartphone,
        context: "Declarative UI with MVI state modeling, custom theme tokens, and 30-second checkout POS workflow.",
        repo: "local/herabilling",
      },
      {
        id: "room",
        name: "Room v13 (WAL)",
        level: "CORE STACK",
        icon: HardDrive,
        context: "Relational SQLite database with foreign keys, index optimization, and crash-resilient write-ahead logging.",
        repo: "local/herabilling",
      },
      {
        id: "backup",
        name: "Google Drive Sync",
        level: "BUILT PROJECTS WITH",
        icon: RefreshCw,
        context: "Automated daily background backups via WorkManager and atomic JSON encryption for wholesale ledgers.",
        repo: "local/herabilling",
      },
      {
        id: "storage",
        name: "Scoped Storage Fix",
        level: "BUILT PROJECTS WITH",
        icon: FolderCheck,
        context: "Resolved Android 14 SecurityException by routing PDF exports through internal cache file descriptors.",
        repo: "local/herabilling",
      },
      {
        id: "pdf",
        name: "Headless PDF Print",
        level: "BUILT PROJECTS WITH",
        icon: Printer,
        context: "A4 wholesale tax invoice generator with dynamic single-to-dual column table auto-packing.",
        repo: "local/herabilling",
      },
      {
        id: "git",
        name: "Git & GitHub API",
        level: "CORE STACK",
        icon: GitCommit,
        context: "Version control and automated commit synchronization via GitHub Contents API in LeetSync.",
        repo: "saahilpal/LeetSync",
      },
    ],
  },
];

export function TechnicalIndex() {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(DOMAINS[0].skills[0]);
  const SelectedIcon = selectedSkill.icon;

  return (
    <section id="index" className="py-16 border-b border-[var(--border-paper-strong)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border-paper)] pb-4 gap-2">
          <div>
            <div className="font-mono text-xs text-[var(--text-ink-muted)] uppercase tracking-wider">
              SECTION 03 // TECHNICAL DIRECTORY
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-ink)] tracking-tight">
              Technical Index
            </h2>
          </div>
          <div className="font-mono text-xs text-[var(--text-ink-muted)]">
            EVERY SKILL HAS VERIFIED IMPLEMENTATION PROOFS
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
                  {dom.skills.map((s) => {
                    const IconComp = s.icon;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSelectedSkill(s)}
                        className={`p-3 text-left border rounded-xs font-mono text-xs transition-all flex items-center justify-between group ${
                          selectedSkill.id === s.id
                            ? "border-[var(--text-ink)] bg-[var(--bg-card)] shadow-sm"
                            : "border-[var(--border-paper)] bg-[var(--bg-card-draft)] hover:border-[var(--border-paper-strong)]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className={`p-1.5 rounded-xs border transition-colors ${
                            selectedSkill.id === s.id
                              ? "bg-[var(--text-ink)] text-[var(--bg-paper)] border-[var(--text-ink)]"
                              : "bg-[var(--bg-card)] text-[var(--text-ink-secondary)] border-[var(--border-paper)] group-hover:border-[var(--text-ink)]"
                          }`}>
                            <IconComp size={13} />
                          </span>
                          <span className="font-medium text-[var(--text-ink)] truncate">{s.name}</span>
                        </div>

                        <span className={`text-[9px] px-1.5 py-0.5 rounded-xs font-mono shrink-0 ml-2 ${
                          s.level === "CORE STACK"
                            ? "bg-[var(--stamp-blue-bg)] text-[var(--stamp-blue)] border border-[var(--stamp-blue-border)]"
                            : s.level === "BUILT PROJECTS WITH"
                            ? "bg-[var(--stamp-green-bg)] text-[var(--stamp-green)] border border-[var(--stamp-green-border)]"
                            : "bg-[var(--border-paper)] text-[var(--text-ink-muted)]"
                        }`}>
                          {s.level}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Physical Index Card Inspector */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="paper-sheet p-6 rounded-sm space-y-4 font-mono text-xs relative shadow-md">
              <div className="absolute top-2.5 right-2.5 text-[9px] text-[var(--text-ink-faint)]">+</div>

              <div className="border-b border-[var(--border-paper)] pb-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-[var(--bg-card-draft)] border border-[var(--border-paper)] rounded-xs text-[var(--text-ink)]">
                    <SelectedIcon size={16} />
                  </span>
                  <div>
                    <div className="text-[10px] text-[var(--text-ink-muted)]">INSPECTING SKILL ENTRY</div>
                    <div className="text-lg font-serif font-bold text-[var(--text-ink)]">
                      {selectedSkill.name}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-[var(--text-ink-muted)]">PROFICIENCY RATING:</span>
                  <span className="font-bold text-[var(--stamp-blue)]">
                    {selectedSkill.level}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-[10px] text-[var(--text-ink-muted)] uppercase">AUTHENTIC APPLICATION:</div>
                <p className="text-xs text-[var(--text-ink-secondary)] leading-relaxed font-sans">
                  {selectedSkill.context}
                </p>
              </div>

              <div className="pt-2 border-t border-dashed border-[var(--border-paper)] flex items-center justify-between text-[11px]">
                <span className="text-[var(--text-ink-muted)]">CODE EVIDENCE:</span>
                <span className="font-bold text-[var(--text-ink)] bg-[var(--bg-card-draft)] px-1.5 py-0.5 border border-[var(--border-paper)] rounded-xs">
                  {selectedSkill.repo}
                </span>
              </div>

              <div className="pt-2 border-t border-[var(--border-paper)] flex items-center gap-1.5 text-[10px] text-[var(--stamp-green)] font-semibold">
                <CheckCircle2 size={12} />
                <span>NO OVER-CLAIMING • GROUNDED IN WORKING CODE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
