export interface KnowledgeChunk {
  id: string;
  section: string;
  title: string;
  keywords: string[];
  content: string;
  citation: string;
}

export const SITE_KNOWLEDGE: KnowledgeChunk[] = [
  {
    id: "synapse-arch",
    section: "Synapse Architecture",
    title: "Synapse 3-Lane Retrieval Prism & Tree-sitter AST",
    keywords: ["synapse", "tree-sitter", "ast", "cst", "retrieval", "rrf", "hybrid", "bm25", "mcp", "latency", "recall"],
    content:
      "Synapse is an AST-grounded code intelligence daemon that extracts caller/callee function scopes using Tree-sitter CST parsing. It merges lexical FTS5 BM25 search with 768-dim vector embeddings via Reciprocal Rank Fusion (RRF: 1/(60+rank)). It achieves a 94.2% top-5 recall hit rate with sub-1.84s parallel indexing latency on 50,000+ symbols, and serves token-budget-bounded payloads to AI coding agents via a Model Context Protocol (MCP) server. Published on PyPI as synap-git.",
    citation: "Synapse §3.1 [AST & RRF Retrieval]",
  },
  {
    id: "synapse-blunder",
    section: "Synapse Incident",
    title: "Tree-sitter Memory Leak in Synapse",
    keywords: ["synapse blunder", "tree-sitter memory leak", "incident", "bug", "rss memory", "leak"],
    content:
      "During early monorepo testing, Tree-sitter native C-bindings leaked memory, causing daemon RSS memory to balloon to 1.8GB. Sahil resolved this by implementing explicit tree.root_node scoped lifecycle hooks and batched garbage collection every 250 files, reducing steady-state RSS to 42MB.",
    citation: "Synapse §4.2 [Blunders Fixed]",
  },
  {
    id: "docanalyzer-queue",
    section: "DocAnalyzer Architecture",
    title: "DocAnalyzer SKIP LOCKED Worker Queue & RAG",
    keywords: ["docanalyzer", "skip locked", "queue", "postgres", "concurrency", "rag", "embeddings", "sse", "streaming"],
    content:
      "DocAnalyzer is an enterprise document intelligence pipeline. To prevent worker starvation and duplicated embedding passes across concurrent PDF uploads, background workers acquire tasks using PostgreSQL `FOR UPDATE SKIP LOCKED LIMIT 1`. Documents are partitioned into 512-token sliding windows with 64-token stride overlap. Answers are streamed via Server-Sent Events (SSE) with exact spatial page and paragraph citation bounding boxes.",
    citation: "DocAnalyzer §2.4 [Queue & Concurrency]",
  },
  {
    id: "docanalyzer-blunder",
    section: "DocAnalyzer Incident",
    title: "Supabase Connection Pool Exhaustion",
    keywords: ["docanalyzer blunder", "connection pool", "supabase", "pgbouncer", "incident", "bug"],
    content:
      "Concurrent 20-file PDF upload bursts exhausted Supabase database connection limits because worker threads opened individual connections per chunk. Sahil debugged this by introducing PgBouncer connection pooling and batching vector writes to 16 chunks per transaction.",
    citation: "DocAnalyzer §5.1 [Blunders Fixed]",
  },
  {
    id: "herabilling-offline",
    section: "Hera Billing Architecture",
    title: "Hera Billing Android ERP, Even Parity & Drive Sync",
    keywords: ["hera", "hera billing", "android", "room", "wholesale", "offline", "backup", "drive", "math", "even parity", "gst"],
    content:
      "Hera Billing is an offline-first Android ERP deployed in production at Hera Hosiery Wholesale (Bengaluru). Built with Kotlin and Jetpack Compose MVI architecture over a local Room v13 database. It features an automated DailyDriveBackupWorker that serializes 5 tables and business branding into AES-GCM encrypted JSON on Google Drive. It uses Hare-Niemeyer integer factorization to guarantee subtotal `(rate * qty) % 2 == 0` for 0-paise discrepancy between 2.5% CGST and SGST.",
    citation: "Hera Billing §1.2 [Mobile ERP & Math]",
  },
  {
    id: "herabilling-blunder",
    section: "Hera Billing Incident",
    title: "Android 14 Scoped Storage SecurityException",
    keywords: ["hera blunder", "android 14", "scoped storage", "securityexception", "crash", "print", "samsung"],
    content:
      "Samsung Galaxy devices running Android 14 API 34 threw fatal SecurityException crashes when attempting to write PDF invoices directly to external `/Documents/`. Sahil resolved this by writing PDF streams to `context.cacheDir`, passing them via Android FileProvider into PrintManager with zero permission popups.",
    citation: "Hera Billing §3.4 [Blunders Fixed]",
  },
  {
    id: "leetsync-shadow",
    section: "LeetSync Architecture",
    title: "LeetSync Manifest V3 Shadow DOM & GitHub Sync",
    keywords: ["leetsync", "manifest v3", "shadow dom", "chrome extension", "github api", "dsa", "leetcode", "octokit"],
    content:
      "LeetSync is a Manifest V3 browser extension and Vite companion dashboard that intercepts accepted LeetCode submissions. It mounts `#leetsync-root` inside an isolated closed Shadow Root to avoid polluting LeetCode's Monaco Editor CSS. It formats runtime and memory percentiles into structured Markdown and commits directly to user repositories via the Octokit GitHub Contents API.",
    citation: "LeetSync §1.1 [Shadow DOM & GitHub API]",
  },
  {
    id: "sahil-bio",
    section: "Sahil Pal Profile",
    title: "Sahil Pal Education, Internship & Background",
    keywords: ["sahil", "sahil pal", "education", "bca", "kristu jayanti", "gpa", "cgpa", "internship", "bengaluru", "experience"],
    content:
      "Sahil Pal is an AI Engineer based in Bengaluru, India. He graduated with a Bachelor of Computer Applications (BCA) from Kristu Jayanti College (Autonomous) with a cumulative CGPA of 7.9 / 10.0. He completed a software engineering internship at Kristu Jayanti Software Development Centre building high-throughput Java 17 and Eclipse Vert.x event-loop microservices with Redis session caching and MongoDB pipelines.",
    citation: "Opening Book §0.1 [Credentials]",
  },
];

// Synapse Dogfood Retrieval: BM25 + Keyword overlap
export function searchSiteKnowledge(query: string): { chunk: KnowledgeChunk; score: number }[] {
  const queryTokens = query.toLowerCase().split(/\s+/).filter(Boolean);

  const scored = SITE_KNOWLEDGE.map((chunk) => {
    let score = 0;
    const textToMatch = `${chunk.title} ${chunk.content} ${chunk.keywords.join(" ")}`.toLowerCase();

    for (const token of queryTokens) {
      if (textToMatch.includes(token)) {
        score += 1.0;
        // Exact keyword hit boost
        if (chunk.keywords.some((k) => k.includes(token))) {
          score += 1.5;
        }
      }
    }

    return { chunk, score };
  });

  return scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
}
