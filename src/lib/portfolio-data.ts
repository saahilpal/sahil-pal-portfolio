export interface SystemProject {
  id: string;
  keyNum: string;
  symbol: string;
  badge?: string;
  name: string;
  tagline: string;
  problem: string;
  mechanism: string;
  proof: string;
  stats: { label: string; value: string }[];
  tools: string[];
  links: { label: string; url: string }[];
}

export const FLAGSHIP_SYSTEMS: SystemProject[] = [
  {
    id: "synapse",
    keyNum: "01",
    symbol: "♔",
    badge: "FAVORITE !!",
    name: "Synapse (synap-git)",
    tagline: "Git-Aware Structural Context Engine & MCP Daemon for AI Coding Agents",
    problem:
      "Coding agents exhaust token budgets by grepping raw source trees, repeating reverted mistakes across multi-file refactors.",
    mechanism:
      "Builds an offline-first Tree-sitter AST symbol graph, computes Git blast radius, and serves token-budgeted context packs over MCP backed by SQLite WAL and FTS5.",
    proof:
      "Published on PyPI as synap-git. Benchmarked 85.2% token reduction via AST skeletons. P95 symbol lookup: 2.1ms. P95 graph neighborhood: 0.8ms.",
    stats: [
      { label: "Token Reduction", value: "85.2%" },
      { label: "P95 Symbol Lookup", value: "2.1ms" },
      { label: "P95 Graph Query", value: "0.8ms" },
      { label: "Incremental Index", value: "14ms" },
    ],
    tools: ["Python 3.12", "Tree-sitter", "Model Context Protocol (MCP)", "SQLite WAL", "FTS5", "PageRank"],
    links: [
      { label: "PyPI Package", url: "https://pypi.org/project/synap-git/" },
      { label: "GitHub Source", url: "https://github.com/saahilpal/synapse" },
      { label: "Documentation", url: "https://synapse-six-eta.vercel.app/" },
    ],
  },
  {
    id: "disha",
    keyNum: "02",
    symbol: "♖",
    badge: "HEALTH AI",
    name: "Disha AI",
    tagline: "Deterministic Voice-Enabled Clinical Health Coach & Emergency Breaker",
    problem:
      "Multilingual health coaching across Hindi and Hinglish cannot risk hallucinated clinical claims or missed acute myocardial infarction signals.",
    mechanism:
      "Compiled Aho-Corasick emergency breaker trips under 10µs to escalate to 112 before any model inference. Clinical retrieval uses PostgreSQL tsvector and pg_trgm reciprocal rank fusion.",
    proof:
      "Zero-ML emergency breaker runs under 10µs. Curated corpus of 960 ICMR-NIN guideline chunks. Cryptographic SHA-256 Merkle audit ledger.",
    stats: [
      { label: "Emergency Breaker", value: "<10µs" },
      { label: "Guideline Chunks", value: "960 Verified" },
      { label: "Search Architecture", value: "tsvector + pg_trgm" },
      { label: "Audit Ledger", value: "SHA-256 Chain" },
    ],
    tools: ["FastAPI", "PostgreSQL 16", "Aho-Corasick", "Reciprocal Rank Fusion", "Groq Whisper", "Edge-TTS"],
    links: [
      { label: "GitHub Source", url: "https://github.com/saahilpal/disha-ai" },
    ],
  },
  {
    id: "docanalyzer",
    keyNum: "03",
    symbol: "♘",
    badge: "RETRIEVAL",
    name: "RAG-DOCAnalyzer",
    tagline: "PostgreSQL pgvector Euclidean Distance Multi-Document Retrieval Platform",
    problem:
      "Document Q&A engines hallucinate when concurrent multi-page PDF ingestion blocks workers and distance metrics lack paragraph attribution.",
    mechanism:
      "Asynchronous worker queue with PostgreSQL row locks, Gemini 768d embeddings, and pgvector L2 (<->) Euclidean distance ordering with chunk-level citations and FTS fallback.",
    proof:
      "Verified c.embedding <-> $3::vector Euclidean ordering. Exact chunk-level citation coordinates [Source N | file | chunk K]. Bit-level SHA-256 upload deduplication.",
    stats: [
      { label: "Vector Distance", value: "pgvector L2 (<->)" },
      { label: "Embedding Dim", value: "768d Gemini" },
      { label: "Citation Granularity", value: "Chunk-Level" },
      { label: "Deduplication", value: "SHA-256 Bitwise" },
    ],
    tools: ["Next.js", "Express", "PostgreSQL", "pgvector L2", "Gemini Embeddings", "SSE Streaming"],
    links: [
      { label: "Live Application", url: "https://www.docanalyzer.app/" },
      { label: "GitHub Source", url: "https://github.com/saahilpal/RAG-DOCAnalyzer" },
    ],
  },
];

export const PROFILE_CORE = {
  name: "Sahil Pal",
  callsign: "sahil",
  title: "AI Systems Engineer",
  email: "saahilpal17@gmail.com",
  chessHandle: "sahill17",
  chessUrl: "https://www.chess.com/member/sahill17",
  githubUrl: "https://github.com/saahilpal",
  linkedinUrl: "https://www.linkedin.com/in/sahiilpal",
  huggingfaceUrl: "https://huggingface.co/sahilpal",
  pitchLine1: "I build backend systems and AI applications.",
  pitchLine2: "I love solving hard engineering problems and building fast, reliable software that actually works.",
};

export const DOCTRINES = [
  {
    num: "01",
    title: "DETERMINISTIC FIRST",
    body: "Probabilistic models generate candidate tokens; deterministic code graphs, Tree-sitter parsers, and Aho-Corasick breakers decide what executes.",
  },
  {
    num: "02",
    title: "POSTGRES IS THE ENGINE",
    body: "Before adopting standalone vector databases, exhaust PostgreSQL. pgvector L2 (<->) and tsvector + pg_trgm RRF handle high-throughput indexing with ACID transactions.",
  },
  {
    num: "03",
    title: "TEST THE EDGE CASES",
    body: "Systems fail at phone audio noise, phone-number redactions, and prompt regressions. We verify with paired McNemar significance and metamorphic test suites.",
  },
];
