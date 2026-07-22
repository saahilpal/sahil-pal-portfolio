import { Github, Linkedin, Mail, ExternalLink, Code2 } from "lucide-react";

export const profile = {
  name: "Sahil Pal",
  role: "Software Engineer, AI & Backend",
  summary: "Software engineer specializing in AI development, backend systems, and developer tools. Experienced in building production-grade RAG pipelines, context engines for AI agents, and scalable APIs using Python, TypeScript, and vector databases.",
  links: {
    github: "https://github.com/saahilpal",
    linkedin: "https://www.linkedin.com/in/sahiilpal",
    email: "saahilpal17@gmail.com",
    leetcode: "https://leetcode.com/u/saahiilpal/",
    resume: "/resume.pdf",
  },
};

export const projects = [
  {
    name: "Synap",
    type: "Developer Tools / AI Infrastructure / Open Source",
    links: [
      { label: "Docs", url: "https://github.com/saahilpal/synapse#readme" },
      { label: "GitHub", url: "https://github.com/saahilpal/synapse" },
    ],
    stack: ["Python", "SQLite", "Tree-sitter", "MCP", "Vector Search", "AsyncIO"],
    highlights: [
      "Designed a 3-lane hybrid retrieval engine merging lexical (FTS5), structural (Tree-sitter AST graph), and semantic vector searches using Reciprocal Rank Fusion.",
      "Built an MCP-native server serving structured, token-budget-aware codebase context packages directly to Cursor, Claude, and coding agents.",
      "Engineered an O(1) memory indexing daemon using parallel AST parsing, background embedding generation, and a WAL-mode SQLite state engine.",
      "Optimized index retrieval to sub-2s latency on 50k+ symbol codebases, supporting multi-language parsing (Python, TS/JS, Go, Rust, C++)."
    ],
  },
  {
    name: "RAG Doc Analyzer",
    type: "Document Q&A platform",
    links: [
      { label: "Live", url: "https://www.docanalyzer.app/" },
      { label: "GitHub", url: "https://github.com/saahilpal/RAG-DOCAnalyzer" },
    ],
    stack: ["Next.js", "Express", "PostgreSQL", "Gemini", "pgvector"],
    highlights: [
      "Implemented a grounded RAG pipeline using Gemini embeddings, pgvector similarity search, and PostgreSQL full-text fallback with SSE response delivery.",
      "Built a chat-first platform with Firebase authentication, JWT sessions, persistent workspaces, and multi-document conversations.",
      "Designed async ingestion (Multer, SHA-256 deduplication, Supabase Storage) and a PostgreSQL worker queue using FOR UPDATE SKIP LOCKED.",
      "Added ownership checks, quotas, and health endpoints to ensure reliable production workflows."
    ],
  },
  {
    name: "LeetSync",
    type: "Chrome extension + product site",
    links: [
      { label: "Live", url: "https://leetsync-web.vercel.app/" },
      { label: "GitHub", url: "https://github.com/saahilpal/LeetSync" },
    ],
    stack: ["TypeScript", "Vite", "Manifest V3"],
    highlights: [
      "Built a Manifest V3 Chrome extension to capture LeetCode editor content and metadata, converting solutions into structured Markdown.",
      "Implemented page-context injection (popup + Shadow DOM) for in-tab capture of problem-solving notes and metadata.",
      "Automated GitHub synchronization via Contents API across structured DSA folders, eliminating manual workflows.",
      "Launched a companion site with installation guides and setup scripts to streamline onboarding."
    ],
  }
];

export const experience = [
  {
    role: "Intern",
    company: "Kristu Jayanti Software Development Centre — Kristu Jayanti University",
    date: "June 2025 – July 2025",
    highlights: [
      "Built a Java 17 + Vert.x backend exposing REST APIs for authentication, profiles, items, search, and moderation.",
      "Implemented production-grade authentication including JWT sessions, email verification, password reset, Redis token blacklisting, and role-based access control.",
      "Designed MongoDB-backed workflows with SMTP notifications, scheduled cleanup jobs, and asynchronous handlers coordinating database, cache, and email systems."
    ],
    stack: ["Java 17", "Vert.x", "MongoDB", "Redis"],
  }
];

export const skills = [
  {
    category: "Languages",
    items: ["Python", "Java", "C++", "TypeScript", "JavaScript", "SQL"]
  },
  {
    category: "Backend & Systems",
    items: ["REST APIs", "AsyncIO", "Worker Queues", "Async Pipelines", "SSE", "JWT", "OAuth"]
  },
  {
    category: "Databases & Search",
    items: ["PostgreSQL", "SQLite", "MongoDB", "Redis", "pgvector", "FTS5", "Vector Databases", "Hybrid Search (RRF/BM25)"]
  },
  {
    category: "Tools & Frameworks",
    items: ["Next.js", "Express", "Vert.x", "FastMCP", "Tree-sitter", "Vite", "Manifest V3", "React", "Tailwind CSS", "tiktoken", "GSAP", "Framer Motion"]
  },
  {
    category: "Concepts",
    items: ["LLM Agents", "RAG", "Knowledge Graphs", "AST Parsing", "Event-Driven Architecture", "Hybrid Retrieval", "Reciprocal Rank Fusion"]
  },
  {
    category: "AI/ML",
    items: ["LLM Integration", "Vector Embeddings", "Prompt Engineering", "Semantic Search", "RAG Systems", "MCP Protocol", "Context Engineering"]
  }
];

export const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Kristu Jayanti College, Bengaluru",
    date: "2023 – 2026",
  }
];
