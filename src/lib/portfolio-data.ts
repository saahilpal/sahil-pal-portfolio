export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  whatItDoes: string;
  problem: string;
  whatIBuilt: string;
  toolsUsed: string[];
  result: string;
  links: ProjectLink[];
}

export interface WorkItem {
  company: string;
  role: string;
  dates: string;
  bullets: string[];
}

export interface EducationItem {
  college: string;
  degree: string;
  years: string;
}

export interface TechStackGroup {
  category: string;
  skills: string;
}

export const profile = {
  name: "Sahil Pal",
  title: "AI / Gen AI Engineer",
  summaryLines: [
    "I build deterministic context engines for coding agents, grounded retrieval pipelines, and offline-first backends.",
    "Creator of Synapse (published on PyPI as synap-git) and DocAnalyzer.",
    "Focused on AST parsing, database concurrency, and verifiable model evaluation.",
  ],
  email: "saahilpal17@gmail.com",
  resumePath: "/resume.pdf",
  links: [
    { label: "GitHub", url: "https://github.com/saahilpal" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/sahiilpal" },
    { label: "LeetCode", url: "https://leetcode.com/u/saahiilpal/" },
    { label: "PyPI", url: "https://pypi.org/project/synap-git/" },
  ],
};

export const projects: ProjectItem[] = [
  {
    id: "synapse",
    name: "Synapse (synap-git)",
    whatItDoes: "Git-aware structural context engine and MCP daemon for coding agents.",
    problem:
      "Coding agents like Cursor or Claude exhaust context windows on large codebases because naive grep or vector-only search fails to retrieve call hierarchies and scope definitions.",
    whatIBuilt:
      "A background daemon that parses repository ASTs in parallel with Tree-sitter, maintains an incremental symbol graph in SQLite WAL mode, and serves token-budgeted context packages over the Model Context Protocol (MCP).",
    toolsUsed: ["Python 3.12", "Tree-sitter", "Model Context Protocol", "SQLite (WAL)", "tiktoken", "AsyncIO"],
    result:
      "Published as a public package on PyPI (`synap-git`) with sub-2 second indexing across 50,000+ symbol codebases.",
    links: [
      { label: "PyPI Package", url: "https://pypi.org/project/synap-git/" },
      { label: "Documentation", url: "https://synapse-six-eta.vercel.app/" },
      { label: "GitHub Source", url: "https://github.com/saahilpal/synapse" },
    ],
  },
  {
    id: "docanalyzer",
    name: "DocAnalyzer (RAG-DOCAnalyzer)",
    whatItDoes: "Grounded multi-document QA platform with citation verification and worker queues.",
    problem:
      "Document question-answering systems frequently hallucinate without exact paragraph attribution, and concurrent PDF ingestion tasks block Node.js server execution threads.",
    whatIBuilt:
      "An asynchronous multi-worker ingestion queue backed by PostgreSQL row locks (`FOR UPDATE SKIP LOCKED`), combining 768-dimensional Gemini embeddings, pgvector cosine search, full-text search fallback, and Server-Sent Events (SSE) streaming answers with exact citation highlights.",
    toolsUsed: ["Next.js", "Express", "PostgreSQL", "pgvector", "Gemini Embeddings", "Supabase Storage", "Server-Sent Events"],
    result:
      "Eliminated upload race conditions across concurrent multi-page PDFs with bit-level SHA-256 deduplication and line-level citation coordinates.",
    links: [
      { label: "Live Application", url: "https://www.docanalyzer.app/" },
      { label: "GitHub Source", url: "https://github.com/saahilpal/RAG-DOCAnalyzer" },
    ],
  },
  {
    id: "herabilling",
    name: "Hera Billing",
    whatItDoes: "Offline-first Android ERP and A4 invoice generator for a wholesale textile business.",
    problem:
      "A garment wholesale shop (Hera Hosiery) required fast, reliable billing, odd-rupee textile GST calculations, and print-ready A4 invoices on budget devices without depending on active internet connections.",
    whatIBuilt:
      "A native Android application with Kotlin and Jetpack Compose using Room SQLite in WAL mode. Generates clean single-page or two-column A4 PDF invoices directly on device via Android WebView printing and handles 5% textile GST rounding.",
    toolsUsed: ["Kotlin", "Jetpack Compose", "Room SQLite (WAL)", "Coroutines", "Android Print Framework", "Clean Architecture"],
    result:
      "Deployed and actively used in shop operations, eliminating handwritten billing errors and generating print-ready invoices in under 1 second.",
    links: [
      { label: "GitHub Source", url: "https://github.com/saahilpal" },
    ],
  },
  {
    id: "leetsync",
    name: "LeetSync",
    whatItDoes: "Manifest V3 browser extension that automatically synchronizes accepted coding submissions to GitHub.",
    problem:
      "Engineers solve problems on competitive coding platforms but manually copying code, runtime benchmarks, and problem descriptions into Git repositories is tedious.",
    whatIBuilt:
      "A browser extension that injects an isolated Shadow DOM overlay into the submission page, parses accepted solutions and execution stats, formats them into structured Markdown, and commits them via the GitHub Octokit API.",
    toolsUsed: ["TypeScript", "Vite", "Manifest V3", "GitHub REST API", "Shadow DOM", "Chrome Storage"],
    result:
      "Zero CSS collisions with platform code editors, automated categorized commits, and an onboarding companion site built with Vite.",
    links: [
      { label: "Live Companion", url: "https://leetsync-web.vercel.app/" },
      { label: "GitHub Source", url: "https://github.com/saahilpal/LeetSync" },
    ],
  },
];

export const techStack: TechStackGroup[] = [
  {
    category: "Languages",
    skills: "Python 3.12, TypeScript, Kotlin, Java 17, SQL, HTML/CSS",
  },
  {
    category: "LLMs & GenAI Tools",
    skills: "Model Context Protocol (MCP), Tree-sitter AST, Gemini Embeddings, Prompt Engineering, Evaluation Oracles, tiktoken",
  },
  {
    category: "Data & Vector Stores",
    skills: "PostgreSQL, pgvector, SQLite (WAL mode), Room SQLite, Redis, MongoDB",
  },
  {
    category: "Cloud & Deployment",
    skills: "Docker, Git, Linux, Supabase, Express.js, Next.js, Vercel, Android Studio",
  },
];

export const workExperience: WorkItem[] = [
  {
    company: "Kristu Jayanti Software Development Centre",
    role: "Software Engineering Intern",
    dates: "June 2025 – July 2025",
    bullets: [
      "Engineered reactive non-blocking REST APIs in Java 17 with Vert.x for authentication, profiles, and catalog access.",
      "Implemented a token revocation blacklist in Redis with TTLs mapped to JWT session expiry, preventing revoked token replay.",
      "Optimized document queries in MongoDB to maintain sub-50ms read latency during high concurrent loads.",
    ],
  },
];

export const education: EducationItem[] = [
  {
    college: "Kristu Jayanti College, Autonomous (Bengaluru)",
    degree: "Bachelor of Computer Applications (BCA)",
    years: "2023 – 2026",
  },
];
