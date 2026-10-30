export interface ProjectLink {
  label: string;
  url: string;
  primary?: boolean;
}

export interface ProjectArchitecture {
  title: string;
  description: string;
  lanes?: { name: string; detail: string; badge: string }[];
  pipeline?: { stage: string; action: string; tech: string }[];
  highlights: string[];
  invariants?: string[];
  tradeoffs?: { decision: string; why: string; alternativeRejected: string }[];
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  category: string;
  status: string;
  featured: boolean;
  version?: string;
  isOngoing?: boolean;
  image?: string;
  chessRole?: string;
  links: ProjectLink[];
  stack: string[];
  problem: string;
  solution: string;
  architecture: ProjectArchitecture;
  metrics: { label: string; value: string }[];
  githubRepo?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  date: string;
  type: string;
  highlights: string[];
  stack: string[];
  architectureNotes?: string[];
}

export interface SkillCategory {
  category: string;
  headline: string;
  items: { name: string; context: string; level?: "Primary" | "Advanced" | "Proficient" }[];
}

export interface EducationItem {
  degree: string;
  school: string;
  location: string;
  date: string;
  grade: string;
  focus: string[];
}

export interface LangGraphStage {
  step: string;
  name: string;
  role: string;
  action: string;
  tech: string;
  invariant: string;
}

export const profile = {
  name: "Sahil Pal",
  callsign: "sahil.pal",
  role: "Software Engineer — Code Intelligence & High-Throughput Backends",
  headline: "Deterministic Spines for Probabilistic Models",
  summary:
    "Software engineer specializing in deterministic code verification, AST-driven context engines, and scalable distributed backends. Creator of Synapse (PyPI synap-git, AST context engine) and architect of PatchBound v1.1 (bounded code repair with formal V1–V3 verification). Proven experience building production retrieval pipelines, lock-free PostgreSQL queues, and reactive event-loop microservices.",
  status: "Available for Software Engineering & Systems Roles",
  location: "Bengaluru, India (Available Globally • Remote / Relocation Ready)",
  timezone: "UTC+05:30 (IST)",
  phone: "+91 9322783036",
  links: {
    github: "https://github.com/saahilpal",
    linkedin: "https://www.linkedin.com/in/sahiilpal",
    email: "saahilpal17@gmail.com",
    leetcode: "https://leetcode.com/u/saahiilpal/",
    resume: "/resume.pdf",
    portfolio: "https://sahil-pal-portfolio-d147.vercel.app/",
  },
  chess: {
    rating: "1000 ELO",
    platform: "Chess.com",
    format: "Rapid (10m)",
    favoritePiece: "♞ Knight",
    favoriteOpenings: ["Italian Game", "Vienna Gambit"],
    philosophy:
      "At 1000 ELO on Chess.com, you don't lose to 25-move computer prep—you lose to hanging a piece when the clock drops below 20s. That is why I build deterministic test oracles, lock-free queues, and strict state machines: production systems can never afford to hang a queen.",
  },
  keyMetrics: [
    { label: "Strict Test Oracles", value: "80/80", subtext: "PatchBound deterministic verification suite" },
    { label: "Context Token Pruning", value: "72.4%", subtext: "Synapse Tree-sitter AST subgraph extraction" },
    { label: "Chess.com Rating", value: "~1000", subtext: "Rapid player & tactical 0-blunder philosophy" },
    { label: "Worker Concurrency", value: "Lock-Free", subtext: "PostgreSQL FOR UPDATE SKIP LOCKED queues" },
  ],
};

export const langGraphPipeline: LangGraphStage[] = [
  {
    step: "01",
    name: "Snapshot & Reproduce",
    role: "Deterministic Core",
    action: "Creates disposable clone at base commit; executes failing command N times to establish F2P and P2P sets.",
    tech: "Git / Python Core",
    invariant: "Mutations isolated to disposable clone; host repo is strictly read-only.",
  },
  {
    step: "02",
    name: "AST Parse & Triage",
    role: "Parser Subsystem",
    action: "AST and regex log parsers extract normalized failure signatures (error_type, message, top_frame).",
    tech: "JUnit / AST Parsers",
    invariant: "Cheap deterministic fallback on syntax errors before invocation.",
  },
  {
    step: "03",
    name: "Repairability Policy Gate",
    role: "Policy Engine",
    action: "Deterministic filter eliminates flaky tests, environment mismatches, and forbidden repos.",
    tech: "policy.yaml",
    invariant: "Non-repairable tasks exit cleanly with diagnosis report without token spend.",
  },
  {
    step: "04",
    name: "Investigator Loop",
    role: "Bounded Agent Loop",
    action: "Single bounded loop with strict token/step budgets running read-only tools and scratchpad tests.",
    tech: "LangGraph State Machine",
    invariant: "Exactly 1 agent loop; tool execution scoped to read-only sandbox.",
  },
  {
    step: "05",
    name: "Fixer Synthesis",
    role: "Narrow Structured LLM",
    action: "Single structured call emitting a causal repair plan and exact anchored edits without brittle unified diffs.",
    tech: "Pydantic Schemas",
    invariant: "Exact (file_path, old_text, new_text) anchored to AST nodes.",
  },
  {
    step: "06",
    name: "Sandbox Oracle Verification",
    role: "Adversarial Runner",
    action: "Restores test files/configs by SHA-256 hash, runs isolated tests, computes formal levels (V1, V2, V3).",
    tech: "Docker / gVisor Sandboxes",
    invariant: "Test suites pinned by hash; modified tests are rejected by anti-cheat.",
  },
  {
    step: "07",
    name: "Adversarial Blind Review",
    role: "Independent Blind LLM",
    action: "AST anti-cheat detection (assert deletion, skip injection) and blind reviewer inspecting diffs without bias.",
    tech: "Anti-Cheat / Blind LLM",
    invariant: "Reviewer never sees Fixer's reasoning or conversational persuasion.",
  },
  {
    step: "08",
    name: "Human Approval Gate",
    role: "LangGraph Interrupt",
    action: "Pauses execution for operator sign-off cryptographically bound to patch and verification hashes.",
    tech: "Human-in-the-Loop Gate",
    invariant: "Approval hash is invalidated if underlying patch digest changes.",
  },
  {
    step: "09",
    name: "Cryptographic Export",
    role: "Audit Journal",
    action: "Re-verifies patch digest and exports canonical git patch with full typed claim ledger.",
    tech: "Append-Only Audit Journal",
    invariant: "No patch exported without passing at least formal Level V1 verification.",
  },
];

export const projects: Project[] = [
  {
    id: "patchbound",
    name: "PatchBound v1.1",
    tagline: "Deterministic Trust Boundary & Bounded AI Repair Engine for Mission-Critical Codebases",
    category: "AI Systems & Agents",
    status: "ACTIVE • ONGOING PROJECT",
    featured: true,
    version: "v1.1.0",
    isOngoing: true,
    chessRole: "♚ King's Perimeter (Safety Boundary)",
    image: "/media/patchbound-preview.jpg",
    links: [
      { label: "Architecture Spec", url: "https://github.com/saahilpal", primary: true },
      { label: "GitHub Repo", url: "https://github.com/saahilpal" },
    ],
    stack: [
      "Python 3.12",
      "LangGraph",
      "Pydantic v2",
      "Tree-sitter",
      "Disposable Clones",
      "JUnit / Pytest Parsers",
      "Cryptographic Ledger",
      "Docker / gVisor",
    ],
    problem:
      "Conventional AI automated repair systems suffer from multi-agent anti-patterns: chaining 7+ conversational LLMs together causes severe context degradation, compounds token costs ($5+ per bug), accumulates hallucinations, and relies on LLMs to self-evaluate their own buggy patches.",
    solution:
      "PatchBound inverts this paradigm with a thick deterministic spine and exactly three narrow LLM roles (Investigator loop, single-call Fixer, and blind Adversarial Reviewer). Employs disposable local clones, pinned test oracles, formal verification levels (V1–V3), and a cryptographic append-only claim ledger.",
    architecture: {
      title: "9-Stage Execution Graph & Deterministic Spine Architecture",
      description:
        "Every repair workflow executes through a strict 9-stage state graph where LLMs never decide whether a patch succeeded; verification is mathematically and deterministically derived in isolated sandboxes:",
      highlights: [
        "Thick Deterministic Spine: Git cloning, log parsing, test verification, diff synthesis, and audit ledgers run in 100% deterministic code.",
        "Formal Verification Levels: V1 (F2P tests pass), V2 (V1 + P2P regression tests pass), V3 (V2 + full CI suite passes). No ambiguous boolean 'works' claims.",
        "Reproduce-First & Pinned Oracle: Never attempts repair without prior failure reproduction; test suites and config files are restored from pre-patch hashes to prevent test-tampering.",
        "Adversarial Blind Reviewer: Prevents confirmation bias by evaluating diffs without seeing the fixer's explanation.",
      ],
      invariants: [
        "Host repository working directory is read-only; mutations occur only in disposable clone.",
        "Test oracles are pinned by SHA-256 hash; patched tests are rejected by anti-cheat rules.",
        "No patch is exported without achieving at least Level V1 verification.",
      ],
    },
    metrics: [
      { label: "Test Oracles", value: "80/80 Strict Oracles" },
      { label: "LLM Roles", value: "3 Narrow Roles" },
      { label: "Agent Loops", value: "Exactly 1 Loop" },
      { label: "Token Savings", value: "~72% vs Multi-Agent" },
    ],
  },
  {
    id: "synapse",
    name: "Synapse (synap-git)",
    tagline: "Git-Aware Structural Code Intelligence & Context Engine for AI Coding Agents",
    category: "AI Infrastructure & Context Engine",
    status: "OPEN SOURCE • PyPI",
    featured: true,
    version: "v0.3.4",
    chessRole: "♝ Bishop's Diagonal (AST Traversal)",
    image: "/media/synapse-preview.jpg",
    links: [
      { label: "PyPI Package", url: "https://pypi.org/project/synap-git/", primary: true },
      { label: "Live Docs", url: "https://synapse-six-eta.vercel.app/" },
      { label: "GitHub Repo", url: "https://github.com/saahilpal/synapse" },
    ],
    stack: [
      "Python 3.12",
      "Tree-sitter",
      "Model Context Protocol (MCP)",
      "SQLite (WAL)",
      "Reciprocal Rank Fusion",
      "tiktoken",
      "AsyncIO",
    ],
    problem:
      "Coding agents like Claude and Cursor frequently hallucinate or exhaust context windows when given naive grep or vector-only search on 50k+ symbol codebases. They miss call hierarchies, type scopes, and project-wide AST relationships.",
    solution:
      "Engineered an O(1) memory indexing daemon that builds a localized symbol graph via parallel Tree-sitter AST parsing. Serves structured, token-budget-aware context packages over an MCP-native interface using a 3-lane hybrid retrieval engine.",
    architecture: {
      title: "3-Lane Hybrid Retrieval & Token Packing Architecture",
      description:
        "Every query passes through three orthogonal retrieval lanes before synthesizing into a rank-fused context envelope:",
      lanes: [
        {
          name: "Lane 1: Lexical Search",
          detail: "SQLite FTS5 full-text index with BM25 scoring for exact symbol & identifier matches.",
          badge: "FTS5 / BM25",
        },
        {
          name: "Lane 2: Structural AST Graph",
          detail: "Tree-sitter parsed syntax tree tracking function definitions, classes, parent scopes, and call relationships with recursive CTE traversals.",
          badge: "AST / Tree-sitter",
        },
        {
          name: "Lane 3: Semantic Vectors",
          detail: "Dense embedding similarity search targeting docstrings, intents, and high-level architectural semantics.",
          badge: "Vector Space",
        },
      ],
      highlights: [
        "Synthesizes ranked results using Reciprocal Rank Fusion (RRF) to eliminate scoring bias between dense and sparse spaces.",
        "Built a native MCP (Model Context Protocol) server delivering context payloads tailored to strict agent token budgets via tiktoken.",
        "Persistent WAL-mode SQLite state engine with incremental file watching for instantaneous diff-only indexing via git diff-tree.",
        "Sub-2s retrieval latency across multi-language projects (Python, TypeScript, C++, Java, Kotlin).",
      ],
    },
    metrics: [
      { label: "Index Latency", value: "< 2.0s on 50k symbols" },
      { label: "Retrieval Lanes", value: "3 (Lexical + AST + Vector)" },
      { label: "Concurrency", value: "Lock-Free WAL Mode" },
      { label: "Distribution", value: "Published on PyPI (synap-git)" },
    ],
  },
  {
    id: "docanalyzer",
    name: "DocAnalyzer (RAG-DOCAnalyzer)",
    tagline: "High-Fidelity Document Intelligence & Grounded Multi-Doc RAG Platform",
    category: "AI Systems & Grounded RAG",
    status: "PRODUCTION LIVE",
    featured: true,
    chessRole: "♜ Rook's Open File (Durable Queues)",
    image: "/media/docanalyzer-preview.jpg",
    links: [
      { label: "Live App", url: "https://www.docanalyzer.app/", primary: true },
      { label: "GitHub Repo", url: "https://github.com/saahilpal/RAG-DOCAnalyzer" },
    ],
    stack: [
      "Next.js 16",
      "Express 5",
      "PostgreSQL",
      "pgvector",
      "Gemini Embeddings (768-dim)",
      "Firebase Auth",
      "Supabase Storage",
      "Server-Sent Events (SSE)",
    ],
    problem:
      "Enterprise document QA systems suffer from ungrounded hallucinations, slow asynchronous ingestion pipelines that block user sessions, and poor ingestion deduplication causing redundant vector embedding costs.",
    solution:
      "Constructed a grounded RAG architecture pairing Gemini embedding vectors with PostgreSQL pgvector and full-text fallbacks. Features an asynchronous multi-worker ingestion queue and real-time SSE streaming answer synthesis.",
    architecture: {
      title: "Asynchronous Grounded Document Processing Pipeline",
      description:
        "Guarantees deterministic grounding and zero server thread starvation through an asynchronous queue:",
      pipeline: [
        { stage: "01. INGEST", action: "Upload with Multer & SHA-256 deduplication to Supabase Storage", tech: "Express / Multer" },
        { stage: "02. PARSE", action: "Multi-page PDF extraction and adaptive semantic sliding-window chunking", tech: "Node / PDF Engine" },
        { stage: "03. EMBED", action: "Batch embedding generation with dimensional normalisation", tech: "Gemini Embeddings" },
        { stage: "04. RETRIEVE", action: "Cosine similarity search over pgvector with PostgreSQL FTS fallback", tech: "pgvector / SQL" },
        { stage: "05. SYNTHESIZE", action: "Token-budgeted grounded prompt synthesis streamed via SSE", tech: "Server-Sent Events" },
      ],
      highlights: [
        "Asynchronous worker queue backed by PostgreSQL FOR UPDATE SKIP LOCKED preventing race conditions in distributed deployments without Redis.",
        "Strict citation grounding: each LLM response highlights source paragraph coordinates directly in the UI.",
        "Persistent multi-tenant workspaces with Firebase JWT verification, quota controls, and ownership validation.",
        "Graceful fallback to SQL full-text search (tsvector) if vector similarity confidence dips below defined threshold.",
      ],
    },
    metrics: [
      { label: "Ingestion Queue", value: "FOR UPDATE SKIP LOCKED" },
      { label: "Streaming", value: "Low-latency SSE Streams" },
      { label: "Deduplication", value: "SHA-256 Bit-level" },
      { label: "Vector Space", value: "768-dim pgvector" },
    ],
  },
  {
    id: "leetsync",
    name: "LeetSync",
    tagline: "Automated DSA Submission Synchronizer & Problem Vault Browser Extension",
    category: "Developer Tools & Browser Extensions",
    status: "PRODUCTION LIVE",
    featured: false,
    chessRole: "♟ Pawn Promotion (Browser to Git)",
    image: "/media/leetsync-popup.png",
    links: [
      { label: "Live Companion", url: "https://leetsync-web.vercel.app/", primary: true },
      { label: "GitHub Repo", url: "https://github.com/saahilpal/LeetSync" },
    ],
    stack: ["TypeScript", "Vite", "Manifest V3", "GitHub API", "Shadow DOM", "Chrome Storage"],
    problem:
      "Software engineers waste hours manually copying code and problem statements from competitive platforms into Git repositories for revision and review.",
    solution:
      "Built a Manifest V3 browser extension injecting isolated Shadow DOM overlays to capture accepted submissions, format metadata into structured Markdown, and push to GitHub repositories via the Octokit Contents API.",
    architecture: {
      title: "Manifest V3 Isolated Context Architecture",
      description: "Operates safely inside page context without interfering with LeetCode's Monaco Editor:",
      highlights: [
        "Injected Shadow DOM container ensuring complete CSS encapsulation and conflict-free in-tab UI.",
        "Automated commit tree creation categorizing problems by difficulty, category, and runtime benchmarks.",
        "Companion onboarding web application built with Vite and TypeScript for token verification.",
      ],
    },
    metrics: [
      { label: "Extension Spec", value: "Manifest V3 Compliant" },
      { label: "Sync Engine", value: "GitHub Contents API" },
      { label: "Styling Isolation", value: "100% Shadow DOM" },
      { label: "Companion App", value: "Vite + TypeScript" },
    ],
  },
  {
    id: "herabilling",
    name: "Hera Billing",
    tagline: "Offline-First Android Billing & PDF Invoice Generator for Wholesale Business",
    category: "Mobile Systems & Invoicing",
    status: "PRODUCTION IN USE",
    featured: true,
    chessRole: "♞ Knight's Leap (Offline-First Mobility)",
    image: "/media/herabilling-preview.jpg",
    links: [
      { label: "GitHub Repo", url: "https://github.com/saahilpal", primary: true },
    ],
    stack: [
      "Kotlin",
      "Jetpack Compose",
      "Room SQLite (WAL)",
      "Coroutines & Flow",
      "Android WebView / PDF",
      "Clean Architecture",
    ],
    problem:
      "A wholesale garment business (Hera Hosiery) needed a fast, reliable mobile app to calculate GST bills, manage orders, and generate print-ready A4 invoices directly on Android phones without depending on an internet connection.",
    solution:
      "Engineered an offline-first Android billing app using Kotlin, Jetpack Compose, and Room SQLite. Generates clean single-page A4 PDF bills from an HTML template, handles odd-rupee 5% textile GST accurately, and saves all data locally on the device.",
    architecture: {
      title: "Clean Architecture & Offline-First Android Storage",
      description: "Designed for day-to-day wholesale shop operations:",
      highlights: [
        "Offline-First Room SQLite: Stores products, customer details, and bill history locally with zero network dependency.",
        "Print-Ready A4 PDF Invoices: Generates clean wholesale bills directly on device with automatic single vs. double column layout depending on item count.",
        "Accurate GST Calculation: Handles 5% textile GST (2.5% CGST + 2.5% SGST) with proper rounding to prevent penny mismatches.",
        "Android 14 Compatibility: Uses app-internal cache storage to save and share PDF invoices cleanly without permission errors.",
      ],
    },
    metrics: [
      { label: "Usage", value: "Active in Shop (Hera Hosiery)" },
      { label: "Architecture", value: "Jetpack Compose + Room" },
      { label: "Storage", value: "100% Offline-First" },
      { label: "Platform", value: "Android (API 34 tested)" },
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineering Intern",
    company: "Kristu Jayanti Software Development Centre",
    location: "Software Development Centre (On-site)",
    date: "June 2025 – July 2025",
    type: "Internship • Backend & Systems",
    highlights: [
      "Engineered a resilient Java 17 + Vert.x reactive backend exposing non-blocking REST APIs for authentication, member profiles, catalog search, and audit logging.",
      "Implemented enterprise-grade security protocols: JWT session authorization, Redis-backed token revocation/blacklisting with TTL matching token lifespan, secure password resets, and fine-grained RBAC.",
      "Architected asynchronous handlers across MongoDB and Redis coordinated with SMTP notification micro-routines and scheduled database hygiene crons.",
      "Profiled and optimized API throughput, ensuring non-blocking event-loop execution under high concurrent load.",
    ],
    stack: ["Java 17", "Vert.x", "MongoDB", "Redis", "JWT", "Docker", "REST APIs"],
    architectureNotes: [
      "Why Vert.x over Spring Boot: Vert.x uses an asynchronous event loop based on Netty, avoiding the memory overhead of a thread-per-request model.",
      "Redis JWT Blacklist: Stateless tokens are revoked before expiry by storing jti in Redis with TTL.",
    ],
  },
];

export const skills: SkillCategory[] = [
  {
    category: "AI Systems & Context Engineering",
    headline: "Infrastructure bridging neural models and deterministic systems",
    items: [
      { name: "LangGraph State Machines", context: "Cyclic multi-agent state machines, type-safe Pydantic reducers, checkpoints, and human approval interrupts", level: "Primary" },
      { name: "Model Context Protocol (MCP)", context: "Writing native stdio JSON-RPC tool endpoints exposing code intelligence and symbol subgraphs to Cursor and Claude", level: "Primary" },
      { name: "Deterministic Agent Verification", context: "Thick deterministic trust boundaries, pinned test oracles, formal V1-V3 verification levels", level: "Primary" },
      { name: "Tree-sitter AST Parsing", context: "Concrete syntax tree parsing, symbol extraction, lexical call graphs at 42k LOC/s", level: "Primary" },
      { name: "Grounded RAG Pipelines", context: "Sliding-window chunking, semantic deduplication, citation paragraph grounding", level: "Primary" },
      { name: "Hybrid Search (RRF & BM25)", context: "Merging lexical FTS5 with dense vector spaces via Reciprocal Rank Fusion", level: "Primary" },
      { name: "Vector Databases", context: "PostgreSQL pgvector, HNSW indexing, Gemini 768-dim embeddings", level: "Primary" },
    ],
  },
  {
    category: "Languages & Runtimes",
    headline: "Low-overhead, typed, and concurrency-focused languages",
    items: [
      { name: "Python 3.12+", context: "AsyncIO, Tree-sitter, LangGraph, FastMCP, tiktoken, Pydantic v2", level: "Primary" },
      { name: "TypeScript / Node.js", context: "Next.js 16, Express 5, React 19, Shadow DOM, Vite", level: "Primary" },
      { name: "Java 17+", context: "Vert.x reactive streams, concurrent event loops, Netty internals", level: "Advanced" },
      { name: "Kotlin", context: "Coroutines, StateFlow, Jetpack Compose, Room WAL, Clean Architecture MVI", level: "Advanced" },
      { name: "SQL", context: "Complex joins, indexing strategies, pgvector, CTEs, window functions, FOR UPDATE SKIP LOCKED", level: "Primary" },
      { name: "C++", context: "Data structures, memory allocation patterns, computational algorithms", level: "Proficient" },
    ],
  },
  {
    category: "Backend Systems & Concurrency",
    headline: "Scalable APIs, worker queues, and distributed primitives",
    items: [
      { name: "Worker Queues", context: "PostgreSQL FOR UPDATE SKIP LOCKED queues, retry policies, lock-free claiming", level: "Primary" },
      { name: "AsyncIO & Reactive Runtimes", context: "Event loops, coroutines, non-blocking network I/O, Vert.x", level: "Primary" },
      { name: "Streaming APIs (SSE)", context: "Real-time token and event delivery over persistent HTTP streams", level: "Primary" },
      { name: "Auth & Identity Security", context: "JWT tokens, Redis revocation lists, OAuth 2.0 flows, RBAC", level: "Primary" },
      { name: "RESTful Architecture", context: "Idempotent endpoints, schema validation, rate limiting, error contracts", level: "Primary" },
    ],
  },
  {
    category: "Databases & Storage Engines",
    headline: "Relational, document, cache, and embedded stores",
    items: [
      { name: "PostgreSQL", context: "Schema design, pgvector, full-text search indexes, connection pooling", level: "Primary" },
      { name: "SQLite (WAL Mode)", context: "Embedded zero-dependency persistence with concurrent WAL readers", level: "Primary" },
      { name: "Redis", context: "In-memory caching, token blacklisting, key expiry, atomic counters", level: "Advanced" },
      { name: "MongoDB", context: "Document collections, aggregation pipelines, schema validation", level: "Advanced" },
      { name: "Supabase / Cloud Storage", context: "Object storage, signed URLs, asset deduplication", level: "Advanced" },
    ],
  },
  {
    category: "Tooling, Infra & Frameworks",
    headline: "Ecosystems, environments, and development utilities",
    items: [
      { name: "Docker & Containerization", context: "Multi-stage builds, isolated sandboxes (gVisor/Docker), shell automation", level: "Advanced" },
      { name: "Linux & Arch Ecosystem", context: "System administration, POSIX shell, zsh, process monitoring, IPC", level: "Primary" },
      { name: "Git & GitHub API", context: "Diff-tree inspection, Octokit automation, Git-aware diff analysis", level: "Primary" },
      { name: "Android SDK", context: "Jetpack Compose, MVVM/MVI, Room, Scoped Storage API 34", level: "Advanced" },
      { name: "Next.js 16 & Tailwind CSS v4", context: "App router, layout streaming, modern CSS design tokens", level: "Primary" },
    ],
  },
];

export const education: EducationItem[] = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Kristu Jayanti College (Autonomous)",
    location: "Bengaluru, India",
    date: "2023 – 2026",
    grade: "CGPA: 7.9 / 10",
    focus: [
      "Operating Systems & Process Scheduling",
      "Data Structures, Algorithm Complexity & Optimization",
      "Relational & Distributed Database Design",
      "Object-Oriented Design Patterns & Software Engineering",
      "Computer Networks & Protocol Architectures",
    ],
  },
];

export const architecturalPillars = [
  {
    number: "01",
    title: "Thick Deterministic Spine vs. Probabilistic LLM Chaos",
    badge: "AI RELIABILITY & SAFETY",
    description:
      "Repairing software and synthesizing context is a strictly constrained problem. Code execution, sandbox isolation, test verification, diff synthesis, and audit logging must be executed by deterministic code. LLMs should only be deployed in bounded, structured roles (investigator, fixer, blind reviewer) where their outputs are verified by deterministic oracles.",
    projectAnchor: "patchbound",
  },
  {
    number: "02",
    title: "Structural Code Graphs (AST) over Naive Text Dumps",
    badge: "CONTEXT ENGINEERING",
    description:
      "Language models hallucinate when given naive string dumps or isolated vector snippets that lack scope and hierarchy. By incrementally indexing Tree-sitter Abstract Syntax Trees (ASTs) in SQLite WAL and synthesizing 3-lane hybrid retrieval (FTS5 + AST Call Graphs + Vector Embeddings via RRF), AI agents receive exact, token-budgeted context.",
    projectAnchor: "synapse",
  },
  {
    number: "03",
    title: "Zero-Thread Starvation via Row-Level Skip Locks",
    badge: "CONCURRENCY & SCALE",
    description:
      "Blocking main HTTP request threads during long-running embedding or multi-page PDF ingestion destroys backend throughput. Using PostgreSQL's native FOR UPDATE SKIP LOCKED allows distributed workers to atomically claim pending ingestion jobs with zero race conditions, zero thread starvation, and no external queue overhead.",
    projectAnchor: "docanalyzer",
  },
  {
    number: "04",
    title: "Arithmetic Integrity & Scoped Storage Hardening",
    badge: "SYSTEMS ROBUSTNESS",
    description:
      "In enterprise billing and ERP systems, floating-point distortion and platform runtime exceptions can halt business operations. Eliminating rounding errors through iterative Largest Remainder Optimization and routing Android 14 Scoped Storage writes via internal cache file descriptors guarantees crash-free 0-paise parity.",
    projectAnchor: "herabilling",
  },
];

