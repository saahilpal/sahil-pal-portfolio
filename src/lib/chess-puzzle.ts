export interface ChessMoveItem {
  moveNumber: number;
  notation: string;
  pieceName: string;
  pieceSymbol: string;
  pieceRole: string;
  projectName: string;
  projectSlug: string;
  tagline: string;
  thesis: string;
  from: string;
  to: string;
  fenAfter: string;
}

export const PUZZLE_START_FEN = "r1bqkb1r/pppp1ppp/2n5/4p3/2B1n3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4";

// The 4 Tactical Moves (Mate in 4)
export const MATE_IN_4_MOVES: ChessMoveItem[] = [
  {
    moveNumber: 1,
    notation: "1. Bxf7+",
    pieceName: "BISHOP",
    pieceSymbol: "♝",
    pieceRole: "Retrieval & Compilers",
    projectName: "Synapse",
    projectSlug: "synapse",
    tagline: "Git-Aware AST Context Daemon & Hybrid Retrieval Engine",
    thesis: "Diagonals = AST Tree Branches. Traverses syntax scopes before vector synthesis.",
    from: "c4",
    to: "f7",
    fenAfter: "r1bqk2r/pppp1Bpp/2n5/4p3/4n3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 4",
  },
  {
    moveNumber: 2,
    notation: "2. Rxf6+",
    pieceName: "ROOK",
    pieceSymbol: "♜",
    pieceRole: "LLM Pipelines & Concurrency",
    projectName: "DocAnalyzer",
    projectSlug: "docanalyzer",
    tagline: "Grounded Multi-Document RAG with PostgreSQL Queue Locks",
    thesis: "Linear Files & Ranks = Durable Queues. Zero double-processing via FOR UPDATE SKIP LOCKED.",
    from: "f1",
    to: "f6",
    fenAfter: "r1bq3r/pppp1kpp/2n2R2/4p3/8/5N2/PPPP1PPP/RNBQK3 b Q - 0 5",
  },
  {
    moveNumber: 3,
    notation: "3. Ne6",
    pieceName: "KNIGHT",
    pieceSymbol: "♞",
    pieceRole: "Production Edge Systems",
    projectName: "Hera Billing",
    projectSlug: "herabilling",
    tagline: "Offline-First Android ERP, Daily Google Drive Sync & Wholesale Math",
    thesis: "Jumps Over Obstacles = Physical production reliability despite Android 14 sandboxing and power loss.",
    from: "f3",
    to: "e6",
    fenAfter: "r1bq3r/pppp2pp/2n1NR2/4p3/8/8/PPPP1PPP/RNBQK3 b Q - 1 6",
  },
  {
    moveNumber: 4,
    notation: "4. e8=Q#",
    pieceName: "PAWN → QUEEN",
    pieceSymbol: "♟ ➔ ♛",
    pieceRole: "Developer Tooling & Checkmate",
    projectName: "LeetSync",
    projectSlug: "leetsync",
    tagline: "Shadow DOM Browser Extension & Automated GitHub Vault Synchronizer",
    thesis: "Small Daily Steps Promote to Queen = Relentless engineering consistency and automated pipelines.",
    from: "e7",
    to: "e8",
    fenAfter: "r1b1Q2r/pppp2pp/2n11R2/4p3/8/8/PPPP1PPP/RNBQK3 b Q - 0 7",
  },
];

export interface ProjectCaseStudy {
  id: string;
  moveNumber: number;
  piece: string;
  pieceSymbol: string;
  title: string;
  subtitle: string;
  problem: string;
  constraints: string[];
  architecture: {
    summary: string;
    flow: string[];
  };
  keyTradeoff: {
    decision: string;
    rationale: string;
    alternativeDiscarded: string;
  };
  evaluation: {
    metricLabel: string;
    metricValue: string;
    baseline: string;
    howTested: string;
  };
  results: { label: string; value: string; desc: string }[];
  blunderFixed: {
    incident: string;
    rootCause: string;
    productionFix: string;
  };
  stack: string[];
  links: { label: string; url: string }[];
}

export const CASE_STUDIES: ProjectCaseStudy[] = [
  {
    id: "synapse",
    moveNumber: 1,
    piece: "BISHOP",
    pieceSymbol: "♝",
    title: "Synapse",
    subtitle: "AST-Grounded Code Intelligence & Model Context Protocol Server",
    problem:
      "Modern AI coding agents (Claude, Cursor) hallucinate function signatures and callers when indexing large codebases (>50,000 symbols) because traditional vector chunking splits classes across arbitrary line boundaries.",
    constraints: [
      "Sub-2s index latency on local developer machines without GPU.",
      "Strict token budget envelope (<4,096 tokens) to prevent context window exhaustion.",
      "Zero process-crash data corruption on unexpected IDE restarts.",
    ],
    architecture: {
      summary: "3-Lane Hybrid Retrieval Prism combining Lexical FTS5, Concrete Syntax Trees, and Semantic Vectors via Reciprocal Rank Fusion.",
      flow: [
        "1. Tree-sitter incrementally parses multi-language CSTs (Python, TypeScript, Go).",
        "2. Symbol table and call hierarchy references committed to SQLite Write-Ahead Log (WAL).",
        "3. Reciprocal Rank Fusion (RRF) formula: RRF(d) = Σ 1 / (60 + rank(d)) merges sparse BM25 and dense cosine vectors.",
        "4. Model Context Protocol (MCP) server streams token-budget-bounded payloads to AI agents.",
      ],
    },
    keyTradeoff: {
      decision: "SQLite WAL over ChromaDB / Pinecone",
      rationale: "Zero-dependency local persistence, atomic transaction guarantees, and instantaneous cold starts (<15ms).",
      alternativeDiscarded: "Heavy vector databases requiring Python daemon bloat and 200MB+ memory overhead.",
    },
    evaluation: {
      metricLabel: "Top-5 Recall Hit Rate",
      metricValue: "94.2%",
      baseline: "71.8% (pure vector cosine search)",
      howTested: "Benchmarked across 12 open-source repositories against 500 ground-truth symbol queries.",
    },
    results: [
      { label: "Index Latency", value: "< 1.84s", desc: "Parallel Tree-sitter parse on 50k symbols" },
      { label: "Token Overflow", value: "0.00%", desc: "Strict budget envelope enforcement" },
      { label: "Deployment", value: "PyPI Package", desc: "Published as synap-git on PyPI" },
    ],
    blunderFixed: {
      incident: "Tree-sitter native C-binding memory leak causing daemon RSS to balloon to 1.8GB during large monorepo indexing.",
      rootCause: "Tree-sitter `Tree` objects retained circular pointer references in Python runtime without explicit deallocation.",
      productionFix: "Implemented explicit `tree.root_node` scoped lifecycle hooks and batched garbage collection every 250 files.",
    },
    stack: ["Python 3.11", "Tree-sitter", "SQLite WAL", "Model Context Protocol", "AsyncIO", "PyPI"],
    links: [
      { label: "PyPI Package", url: "https://pypi.org/project/synap-git/" },
      { label: "GitHub Repository", url: "https://github.com/saahilpal/synapse" },
    ],
  },
  {
    id: "docanalyzer",
    moveNumber: 2,
    piece: "ROOK",
    pieceSymbol: "♜",
    title: "DocAnalyzer",
    subtitle: "High-Throughput Grounded RAG with PostgreSQL Worker Queue Locks",
    problem:
      "Multi-page enterprise PDF documents cause worker starvation, duplicated embedding passes, and hallucinations when users query fine-grained contractual paragraphs.",
    constraints: [
      "Zero race conditions when multiple background ingestion workers poll the job table.",
      "Exact spatial coordinate grounding for every generated answer citation.",
      "Real-time Server-Sent Events (SSE) token streaming.",
    ],
    architecture: {
      summary: "Durable PostgreSQL row-locked asynchronous ingestion pipeline paired with HNSW vector indexing and citation coordinate streaming.",
      flow: [
        "1. Express / Multer ingests multi-page documents with SHA-256 deduplication.",
        "2. Worker pool polls queue table using `FOR UPDATE SKIP LOCKED LIMIT 1`.",
        "3. Documents chunked via 512-token sliding window with 64-token stride overlap.",
        "4. Gemini 768-dim embeddings stored in pgvector columns with HNSW cosine indexing.",
        "5. SSE stream yields grounded answers containing exact document page and paragraph offsets.",
      ],
    },
    keyTradeoff: {
      decision: "PostgreSQL FOR UPDATE SKIP LOCKED over Redis BullMQ",
      rationale: "Kept queue state in the same ACID database as document chunks, eliminating distributed transaction rollbacks.",
      alternativeDiscarded: "Separate Redis queue broker introducing cache-database desynchronization during worker crashes.",
    },
    evaluation: {
      metricLabel: "Worker Ingestion Throughput",
      metricValue: "18.4 pages/s",
      baseline: "4.2 pages/s (synchronous REST)",
      howTested: "Stress-tested with 100 concurrent 50-page legal contracts across 4 parallel worker threads.",
    },
    results: [
      { label: "Double Chunking", value: "0 Instances", desc: "Atomic row lock guarantees" },
      { label: "Vector Recall p95", value: "< 24ms", desc: "HNSW index distance retrieval" },
      { label: "Citation Accuracy", value: "100%", desc: "Direct bounding box spatial references" },
    ],
    blunderFixed: {
      incident: "Supabase connection pool exhaustion during concurrent 20-file PDF upload bursts.",
      rootCause: "Express endpoints opened distinct database connections per chunk rather than pooling client sessions.",
      productionFix: "Introduced PgBouncer connection pooling and throttled batch vector inserts to 16 chunks per transaction.",
    },
    stack: ["TypeScript", "Node.js", "Express", "PostgreSQL", "pgvector (HNSW)", "Gemini Embeddings", "SSE"],
    links: [
      { label: "Live Application", url: "https://www.docanalyzer.app/" },
      { label: "GitHub Repository", url: "https://github.com/saahilpal/RAG-DOCAnalyzer" },
    ],
  },
  {
    id: "herabilling",
    moveNumber: 3,
    piece: "KNIGHT",
    pieceSymbol: "♞",
    title: "Hera Billing",
    subtitle: "Production Wholesale Android ERP, Google Drive Cloud Sync & Parity Math",
    problem:
      "Wholesale garment manufacturers operate in chaotic, dust-heavy shop floors with intermittent cellular connectivity, losing sales records and facing 1-paise tax discrepancies on negotiated targets.",
    constraints: [
      "100% offline-first execution with crash-resilient Room v13 local database.",
      "Android 14 (API 34) Scoped Storage compliance with zero permission crash popups.",
      "Automated daily cloud backups to Google Drive AppFolder without user intervention.",
    ],
    architecture: {
      summary: "Jetpack Compose MVI architecture with Room WAL database, Android WorkManager cloud sync daemon, and Hare-Niemeyer integer factorization engine.",
      flow: [
        "1. Rapid 30-second checkout flow utilizing 48dp tactile touch targets and debounced catalog search.",
        "2. Room v13 database writes sales orders with foreign key RESTRICT constraints.",
        "3. Hare-Niemeyer Largest Remainder engine forces subtotal `(rate * qty) % 2 == 0` for exact 2.5% CGST/SGST split.",
        "4. DailyDriveBackupWorker executes daily at 23:59: serializes 5 tables and Base-64 logo into encrypted JSON on Google Drive.",
        "5. FileOrganizer uses internal app cache (`files.cacheFile`) + FileProvider for instant Bluetooth thermal printing.",
      ],
    },
    keyTradeoff: {
      decision: "Room v13 with WorkManager over Cloud-first Firebase/Supabase",
      rationale: "Wholesale counter transactions cannot fail when cellular signals drop during peak dispatch hours.",
      alternativeDiscarded: "Cloud-first mobile databases causing UI freeze and dropped cart items on poor 4G connectivity.",
    },
    evaluation: {
      metricLabel: "Checkout Transaction Speed",
      metricValue: "< 30s",
      baseline: "3.5 minutes (manual paper book ledger)",
      howTested: "Measured across 300+ wholesale customer transactions at Hera Hosiery Wholesale.",
    },
    results: [
      { label: "Tax Discrepancy", value: "₹0.00", desc: "Hare-Niemeyer even parity algorithm" },
      { label: "Data Loss Incidents", value: "0", desc: "Automated Google Drive daily backups" },
      { label: "Android 14 Crashes", value: "0.00%", desc: "Internal cache FileProvider adapter" },
    ],
    blunderFixed: {
      incident: "Android 14 Samsung Galaxy test devices throwing fatal `SecurityException` crashes when generating A4 PDF invoices.",
      rootCause: "Android 14 API 34 eliminated write access to `/Documents/HeraBilling/` without Scoped Storage user permission prompts.",
      productionFix: "Re-engineered export to write to `context.cacheDir`, streaming via `ParcelFileDescriptor` to Android `PrintManager`.",
    },
    stack: ["Kotlin 2.0", "Jetpack Compose", "Room DB v13", "WorkManager", "Google Drive API v3", "AES-GCM"],
    links: [
      { label: "Repository Spec", url: "https://github.com/saahilpal" },
    ],
  },
  {
    id: "leetsync",
    moveNumber: 4,
    piece: "PAWN → QUEEN",
    pieceSymbol: "♟ ➔ ♛",
    title: "LeetSync",
    subtitle: "Manifest V3 Isolated Shadow DOM Extension & GitHub Contents API Pipeline",
    problem:
      "Competitive programmers waste hours manually copying code and problem statements from competitive platforms into Git repositories for review.",
    constraints: [
      "Zero CSS style pollution on host web pages (LeetCode, Monaco Editor).",
      "Strict compliance with Manifest V3 service worker lifecycle constraints.",
      "Atomic git commit tree creation directly via GitHub REST Contents API.",
    ],
    architecture: {
      summary: "Isolated Shadow DOM browser overlay intercepting DOM submission events and dispatching structured Markdown vaults via Octokit REST.",
      flow: [
        "1. Content script listens to Monaco submission response events in the DOM.",
        "2. Mounts `#leetsync-root` inside a closed Shadow Root, ensuring 100% CSS encapsulation.",
        "3. Extracts runtime speed, memory percentiles, tags, and problem statement constraints.",
        "4. Formats clean Markdown documentation and dispatches PUT commit directly to user's GitHub vault repo.",
      ],
    },
    keyTradeoff: {
      decision: "Shadow DOM injection over standard iframe overlay",
      rationale: "Seamless user experience within existing page tab with zero iframe cross-origin authentication headaches.",
      alternativeDiscarded: "Un-isolated DOM injection which broke LeetCode's syntax highlighting CSS classes.",
    },
    evaluation: {
      metricLabel: "Sync Automation Rate",
      metricValue: "100%",
      baseline: "Manual copy-paste (5-8 mins per problem)",
      howTested: "Tested across 200+ accepted submissions across Easy, Medium, and Hard problem categories.",
    },
    results: [
      { label: "CSS Pollution", value: "0.00%", desc: "Enforced Shadow Root isolation" },
      { label: "Extension Spec", value: "Manifest V3", desc: "Compliant service worker lifecycle" },
      { label: "Companion Web App", value: "Vite + TS", desc: "Token verification dashboard" },
    ],
    blunderFixed: {
      incident: "Manifest V3 background service worker terminated mid-upload during multi-file GitHub commit payloads.",
      rootCause: "Chrome MV3 kills background workers after 30 seconds of inactivity if asynchronous fetches are un-awaited.",
      productionFix: "Implemented chained `chrome.storage.session` state checkpoints with immediate keep-alive heartbeat pings.",
    },
    stack: ["TypeScript", "Vite", "Manifest V3", "Shadow DOM", "GitHub Contents API", "Tailwind CSS"],
    links: [
      { label: "Live Companion", url: "https://leetsync-web.vercel.app/" },
      { label: "GitHub Repository", url: "https://github.com/saahilpal/LeetSync" },
    ],
  },
];
