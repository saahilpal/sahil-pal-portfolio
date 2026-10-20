export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  category: string;
  status: string;
  featured: boolean;
  links: ProjectLink[];
  stack: string[];
  problem: string;
  solution: string;
  architecture: {
    title: string;
    description: string;
    lanes?: { name: string; detail: string; badge: string }[];
    pipeline?: { stage: string; action: string; tech: string }[];
    highlights: string[];
  };
  metrics?: { label: string; value: string }[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  date: string;
  type: string;
  highlights: string[];
  stack: string[];
}

export interface SkillCategory {
  category: string;
  headline: string;
  items: { name: string; context: string }[];
}

export interface EducationItem {
  degree: string;
  school: string;
  location: string;
  date: string;
  focus: string[];
}

export const profile = {
  name: "Sahil Pal",
  callsign: "sahil.pal",
  role: "Software Engineer — AI Systems & Backend",
  headline: "Architecting Code Intelligence, Deterministic RAG & High-Throughput Backends",
  summary:
    "BCA graduate and software engineer specializing in AI systems engineering, retrieval-augmented generation, and developer tools. Experienced in building production-grade RAG pipelines, AST-aware structural indexing engines, and robust asynchronous backend services.",
  status: "Available for engineering roles & ambitious technical collaborations",
  location: "Available Globally",
  timezone: "UTC+05:30 (IST)",
  links: {
    github: "https://github.com/saahilpal",
    linkedin: "https://www.linkedin.com/in/sahiilpal",
    email: "saahilpal17@gmail.com",
    leetcode: "https://leetcode.com/u/saahiilpal/",
    resume: "/resume.pdf",
  },
  systemSpecs: [
    { label: "PRIMARY RUNTIMES", value: "Python, Java 17, TypeScript, Kotlin" },
    { label: "CORE FOCUS", value: "AST Indexing, Deterministic RAG, Worker Queues" },
    { label: "PROTOCOLS", value: "Model Context Protocol (MCP), SSE, REST, gRPC" },
    { label: "DATA ENGINES", value: "PostgreSQL (pgvector), SQLite WAL, Redis, MongoDB" },
  ],
};

export const projects: Project[] = [
  {
    id: "synapse",
    name: "Synapse",
    tagline: "Git-Aware Code Intelligence & Structural Context Engine for AI Coding Agents",
    category: "AI Infrastructure / Developer Tools",
    status: "ACTIVE • OPEN SOURCE",
    featured: true,
    links: [
      { label: "Live Docs", url: "https://synapse-six-eta.vercel.app/" },
      { label: "GitHub", url: "https://github.com/saahilpal/synapse" },
      { label: "Readme", url: "https://github.com/saahilpal/synapse#readme" },
    ],
    stack: [
      "Python",
      "Tree-sitter",
      "Model Context Protocol (MCP)",
      "SQLite (WAL)",
      "Reciprocal Rank Fusion",
      "Vector Search",
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
          detail: "Tree-sitter parsed syntax tree tracking function definitions, classes, parent scopes, and call relationships.",
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
        "Built a native MCP (Model Context Protocol) server delivering context payloads tailored to strict agent token budgets.",
        "Persistent WAL-mode SQLite state engine with incremental file watching for instantaneous diff-only indexing.",
        "Sub-2s retrieval latency across multi-language projects (Python, TypeScript, Go, Rust, C++).",
      ],
    },
    metrics: [
      { label: "Index Latency", value: "< 2.0s on 50k symbols" },
      { label: "Retrieval Lanes", value: "3 (Lexical + AST + Vector)" },
      { label: "Memory Footprint", value: "O(1) Streaming Daemon" },
    ],
  },
  {
    id: "docanalyzer",
    name: "DocAnalyzer",
    tagline: "High-Fidelity Document Intelligence & Grounded Multi-Doc RAG Platform",
    category: "AI Application / Systems Architecture",
    status: "PRODUCTION LIVE",
    featured: true,
    links: [
      { label: "Live App", url: "https://www.docanalyzer.app/" },
      { label: "GitHub", url: "https://github.com/saahilpal/RAG-DOCAnalyzer" },
    ],
    stack: [
      "Next.js",
      "Express",
      "PostgreSQL",
      "pgvector",
      "Gemini Embeddings",
      "Firebase Auth",
      "Supabase Storage",
      "Server-Sent Events",
    ],
    problem:
      "Enterprise document QA systems suffer from ungrounded responses, slow asynchronous ingestion pipelines that block user sessions, and poor ingestion deduplication causing redundant vector costs.",
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
        "Asynchronous worker queue backed by PostgreSQL FOR UPDATE SKIP LOCKED preventing race conditions in distributed deployments.",
        "Strict citation grounding: each LLM response highlights source paragraph coordinates directly in the UI.",
        "Persistent multi-tenant workspaces with Firebase JWT verification, quota controls, and ownership validation.",
        "Graceful fallback to SQL full-text search if vector similarity confidence dips below defined threshold.",
      ],
    },
    metrics: [
      { label: "Ingestion Queue", value: "FOR UPDATE SKIP LOCKED" },
      { label: "Streaming", value: "Low-latency SSE" },
      { label: "Deduplication", value: "SHA-256 Bit-level" },
    ],
  },
  {
    id: "herabilling",
    name: "Hera Billing",
    tagline: "Production Android ERP & HTML-to-PDF Invoicing Engine for Wholesale Garments",
    category: "Mobile Architecture / Systems Engineering",
    status: "PRODUCTION DEPLOYED",
    featured: true,
    links: [
      { label: "Architecture Audit", url: "https://github.com/saahilpal" },
    ],
    stack: [
      "Kotlin",
      "Jetpack Compose",
      "Clean Architecture (MVI)",
      "Room DB v13 (WAL)",
      "Hilt DI",
      "Android WebView / PDF",
      "StateFlow",
    ],
    problem:
      "A real-world wholesale garment manufacturing business (Hera Hosiery / Kids Wear) handled complex wholesale orders with variable lot sizes, transport charges, and strict 5% textile GST rules. Standard billing apps suffered from connectivity crashes, while Android 14 Scoped Storage threw uncaught security exceptions when saving invoices. Custom target invoices also suffered from price distortion caused by naive rounding.",
    solution:
      "Engineered an offline-first Android ERP and HTML-to-PDF invoice engine using Clean Architecture / MVI. Solved Android 14 Scoped Storage crashes by routing through internal cache file descriptors, developed a Largest Remainder optimization engine to eliminate fractional rounding distortion, and built a dynamic single-to-dual column A4 pagination system for 30+ item wholesale orders.",
    architecture: {
      title: "Android Clean MVI Architecture & Arithmetic Boundary Engineering",
      description:
        "Engineered and validated on physical Samsung Galaxy S24 and M34 devices for production wholesale operations:",
      highlights: [
        "Android 14 (API 34) Scoped Storage Fix: Solved fatal SecurityExceptions when writing to public storage by returning app-internal cache file descriptors, tested and verified on physical Galaxy S24 and M34.",
        "Largest Remainder Rounding Optimizer: Replaced naive 'last-item absorber' with an iterative optimizer distributing fractional paise in ₹0.50 increments across up to 1,000 iterations to guarantee zero round-off error on custom target totals.",
        "GST 1-Paise Parity Engine: Solved the classic odd-rupee textile GST (5%) mismatch by calculating 2.5% CGST/SGST with HALF_UP parity, preventing accounting discrepancy.",
        "Dynamic Single vs. Dual-Column A4 Pagination: Evaluates item thresholds (<=15 items uses padded single-column; >15 items switches to compact dual-column) ensuring wholesale orders with up to 30 items never spill onto an awkward second sheet.",
        "Sequential Concurrency-Safe Numbering: 5-digit padded sequence (H-00001) with automatic Financial Year resets (April 1st) and SQLite UNIQUE constraint collision handling.",
      ],
    },
    metrics: [
      { label: "Deployment", value: "Hera Hosiery Wholesale" },
      { label: "Architecture", value: "Jetpack Compose MVI + Room v13" },
      { label: "OS Compatibility", value: "Android 14 (API 34) Hardened" },
    ],
  },
  {
    id: "leetsync",
    name: "LeetSync",
    tagline: "Automated DSA Submission Synchronizer & Problem Vault",
    category: "Developer Tools / Browser Extension",
    status: "PRODUCTION LIVE",
    featured: false,
    links: [
      { label: "Live Companion", url: "https://leetsync-web.vercel.app/" },
      { label: "GitHub", url: "https://github.com/saahilpal/LeetSync" },
    ],
    stack: ["TypeScript", "Vite", "Manifest V3", "GitHub API", "Shadow DOM"],
    problem:
      "Software engineers waste hours manually copying code and problem statements from competitive platforms into Git repositories for review.",
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
      { label: "Extension Spec", value: "Manifest V3" },
      { label: "Sync Engine", value: "GitHub Contents API" },
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineering Intern",
    company: "Kristu Jayanti Software Development Centre",
    location: "Bengaluru, India",
    date: "June 2025 – July 2025",
    type: "Internship • Backend & Systems",
    highlights: [
      "Engineered a resilient Java 17 + Vert.x reactive backend exposing non-blocking REST APIs for authentication, member profiles, catalog search, and audit logging.",
      "Implemented enterprise-grade security protocols: JWT session authorization, Redis-backed token revocation/blacklisting, secure password resets, and fine-grained RBAC.",
      "Architected asynchronous handlers across MongoDB and Redis coordinated with SMTP notification micro-routines and scheduled database hygiene crons.",
      "Profiled and optimized API throughput, ensuring non-blocking event-loop execution under concurrent load.",
    ],
    stack: ["Java 17", "Vert.x", "MongoDB", "Redis", "JWT", "Docker"],
  },
];

export const skills: SkillCategory[] = [
  {
    category: "Languages & Runtimes",
    headline: "Low-overhead, typed, and concurrency-focused languages",
    items: [
      { name: "Python", context: "AsyncIO, Tree-sitter, FastMCP, tiktoken, scientific packages" },
      { name: "Java 17+", context: "Vert.x reactive streams, concurrent programming, JVM internals" },
      { name: "Kotlin", context: "Coroutines, Flow, Android Jetpack, Room, modern mobile architecture" },
      { name: "TypeScript / JS", context: "Node.js, Express, Next.js, strict typing, DOM & Canvas APIs" },
      { name: "C++", context: "Data structures, memory allocation patterns, computational algorithms" },
      { name: "SQL", context: "Complex joins, indexing strategies, pgvector, CTEs, window functions" },
    ],
  },
  {
    category: "AI Systems & Context Engineering",
    headline: "Infrastructure bridging neural models and deterministic systems",
    items: [
      { name: "Model Context Protocol (MCP)", context: "Writing native MCP servers for Cursor, Claude, and IDE agents" },
      { name: "Tree-sitter AST Parsing", context: "Grammar parsing, symbol extraction, lexical call graphs" },
      { name: "Grounded RAG Pipelines", context: "Sliding-window chunking, semantic deduplication, citation grounding" },
      { name: "Hybrid Search (RRF & BM25)", context: "Merging lexical FTS5 with dense vector spaces via Reciprocal Rank Fusion" },
      { name: "Vector Databases", context: "pgvector similarity queries, HNSW/IVFFlat indexing, Gemini embeddings" },
      { name: "Token Budget Optimization", context: "Dynamic context envelope packing and tiktoken budget enforcement" },
    ],
  },
  {
    category: "Backend Systems & Concurrency",
    headline: "Scalable APIs, worker queues, and distributed primitives",
    items: [
      { name: "AsyncIO & Reactive Runtimes", context: "Event loops, coroutines, non-blocking network I/O" },
      { name: "Worker Queues", context: "PostgreSQL FOR UPDATE SKIP LOCKED queues, retry policies" },
      { name: "Streaming APIs (SSE)", context: "Real-time token and event delivery over persistent HTTP streams" },
      { name: "Auth & Identity", context: "JWT tokens, Redis revocation lists, OAuth 2.0 flows, RBAC" },
      { name: "RESTful Architecture", context: "Idempotent endpoints, schema validation, rate limiting, error contracts" },
    ],
  },
  {
    category: "Databases & Storage Engines",
    headline: "Relational, document, cache, and embedded stores",
    items: [
      { name: "PostgreSQL", context: "Schema design, pgvector, full-text search indexes, connection pooling" },
      { name: "SQLite (WAL Mode)", context: "Embedded zero-dependency persistence with concurrent WAL readers" },
      { name: "Redis", context: "In-memory caching, token blacklisting, key expiry, atomic counters" },
      { name: "MongoDB", context: "Document collections, aggregation pipelines, schema validation" },
      { name: "Supabase / Cloud Storage", context: "Object storage, signed URLs, asset deduplication" },
    ],
  },
  {
    category: "Tooling, Infra & Frameworks",
    headline: "Ecosystems and development utilities",
    items: [
      { name: "Next.js & React 19", context: "Server & client components, layout streaming, modern web architecture" },
      { name: "Tailwind CSS v4", context: "Custom design systems, CSS variables, fluid responsive typography" },
      { name: "Anime.js v4", context: "High-performance JavaScript motion engine, SVG path animation, timelines" },
      { name: "Docker & Linux", context: "Containerization, multi-stage builds, shell automation, POSIX scripting" },
      { name: "Git & GitHub API", context: "Branch workflows, Octokit automation, Git-aware diff analysis" },
      { name: "Android SDK", context: "Jetpack Compose, MVVM, Room, WorkManager, Canvas graphics" },
    ],
  },
];

export const education: EducationItem[] = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Kristu Jayanti College (Autonomous)",
    location: "Bengaluru, India",
    date: "2023 – 2026",
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
    title: "Deterministic Grounding over Brittle Prompts",
    badge: "AI RELIABILITY",
    description:
      "LLMs generate superior code when anchored to real structural graphs rather than probabilistic guesses. By indexing abstract syntax trees (ASTs) with Tree-sitter and validating dependencies through lexical and symbol graphs, systems can serve mathematically grounded context that prevents hallucinations.",
  },
  {
    number: "02",
    title: "Zero-Thread Starvation via Asynchronous Queues",
    badge: "SYSTEMS CONCURRENCY",
    description:
      "Blocking main request loops during heavy embedding or file ingestion destroys scalability. By utilizing PostgreSQL's `FOR UPDATE SKIP LOCKED` or async worker daemons with WAL SQLite, background jobs process deterministically with zero race conditions, lock-free reads, and minimal memory footprints.",
  },
  {
    number: "03",
    title: "Developer Ergonomics as a System Metric",
    badge: "SOFTWARE CRAFT",
    description:
      "A developer tool or internal engine is only as effective as its integration surface. Adopting standardized interfaces like the Model Context Protocol (MCP), building zero-config offline fallbacks, and maintaining sub-second CLI response loops turns academic engineering into tools developers rely on every single day.",
  },
];
