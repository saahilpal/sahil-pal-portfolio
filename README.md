# Sahil Pal — Systems Lab & Portfolio

> I build backend systems and AI applications. I love solving hard engineering problems and building fast, reliable software that actually works.

[![Live Production](https://img.shields.io/badge/Production-Live%20Demo-00E5FF?style=for-the-badge&logo=vercel)](https://sahil-pal-portfolio-d147.vercel.app/)
[![PyPI Package](https://img.shields.io/badge/PyPI-synap--git-3776AB?style=for-the-badge&logo=pypi&logoColor=white)](https://pypi.org/project/synap-git/)
[![GitHub Profile](https://img.shields.io/badge/GitHub-saahilpal-181717?style=for-the-badge&logo=github)](https://github.com/saahilpal)
[![Chess.com](https://img.shields.io/badge/Chess.com-sahill17-7FA650?style=for-the-badge&logo=chess.com&logoColor=white)](https://www.chess.com/member/sahill17)

---

## 🏛️ System Overview

A high-performance portfolio and systems engineering workbench built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and the **Web Audio API**. Designed with a Neo-Brutalist architectural aesthetic, high-contrast typography, zero speculative wrappers, and verified benchmark metrics.

- **Live URL:** [https://sahil-pal-portfolio-d147.vercel.app/](https://sahil-pal-portfolio-d147.vercel.app/)
- **Visual Design:** Void (`#050507`) and Blueprint (`#FAF9F5`) dual-polarity color themes with high-contrast architectural framing.
- **Rhythmic Audio Engine:** Pure Web Audio API mechanical switch synthesis and D-minor pentatonic cadence on interactive elements (zero external audio libraries).
- **Interactive Chess Arena:** Playable chess engine featuring forced Mate-in-2 tactical puzzles (Philidor's Smothered Mate, Anastasia's Mate, and Boden's Criss-Cross Mate) with high-contrast Staunton pieces and Stockfish evaluation telemetry.

---

## 🛠️ The 3 Flagship Systems

### 01 // ♔ Synapse (`synap-git`)
*Git-Aware Structural Context Engine & MCP Daemon for AI Coding Agents*
- **Problem:** LLM coding agents exhaust context budgets and repeat reverted mistakes when grepping raw file trees across large repositories.
- **Mechanism:** Builds an offline-first Tree-sitter AST symbol graph, computes Git blast radius, and serves token-budgeted context packs over Model Context Protocol (MCP) backed by SQLite WAL and FTS5.
- **Verified Proof:** Published on PyPI as `synap-git`. Benchmarked 85.2% token reduction via AST skeletons. P95 symbol lookup: 2.1ms. P95 graph query: 0.8ms. Incremental re-index: 14ms.
- **Stack:** Python 3.12, Tree-sitter, MCP, SQLite WAL, FTS5, PageRank.
- **Links:** [PyPI Package](https://pypi.org/project/synap-git/) • [GitHub Repository](https://github.com/saahilpal/synapse) • [Documentation](https://synapse-six-eta.vercel.app/)

---

### 02 // ♖ Disha AI
*Voice-Enabled Clinical Health Coach & Emergency Breaker*
- **Problem:** Multilingual health coaching across Hindi and Hinglish cannot risk hallucinated clinical guidance or missed acute emergencies.
- **Mechanism:** Compiled Aho-Corasick emergency breaker trips under 10µs to escalate acute events to emergency services (112) before any model inference. Clinical retrieval uses PostgreSQL `tsvector` and `pg_trgm` reciprocal rank fusion.
- **Verified Proof:** Zero-ML emergency breaker executes in under 10µs. Curated corpus of 960 ICMR-NIN guideline chunks. Cryptographic SHA-256 Merkle audit ledger.
- **Stack:** FastAPI, PostgreSQL 16, Aho-Corasick, Reciprocal Rank Fusion, Groq Whisper, Edge-TTS.
- **Links:** [GitHub Repository](https://github.com/saahilpal/disha-ai)

---

### 03 // ♘ RAG-DOCAnalyzer
*PostgreSQL pgvector Euclidean Distance Multi-Document Retrieval Platform*
- **Problem:** Enterprise document retrieval hallucinating when concurrent multi-page PDF ingestion blocks workers and distance metrics lack paragraph attribution.
- **Mechanism:** Asynchronous worker queue with PostgreSQL row locks, Gemini 768d embeddings, and `pgvector` L2 (`<->`) Euclidean distance ordering with chunk-level citations and full-text search fallback.
- **Verified Proof:** Verified `c.embedding <-> $3::vector` Euclidean ordering. Exact chunk-level citation coordinates `[Source N | file | chunk K]`. Bit-level SHA-256 upload deduplication.
- **Stack:** Next.js, Express, PostgreSQL, pgvector L2, Gemini Embeddings, SSE Streaming.
- **Links:** [Live Application](https://www.docanalyzer.app/) • [GitHub Repository](https://github.com/saahilpal/RAG-DOCAnalyzer)

---

## ♟️ Interactive Chess Arena

The portfolio features a playable chess arena with forced **Mate-in-2 tactical combinations**:

1. **Philidor's Smothered Mate:** Queen sacrifice lure (`1. Qg8+!! Rxg8 2. Nf7#`)
2. **Anastasia's Mate:** Knight block and Queen sacrifice opening the h-file (`1. Qxh7+!! Kxh7 2. Rh3#`)
3. **Boden's Criss-Cross Mate:** Queen sacrifice clearing diagonal bishops (`1. Qxc6+!! bxc6 2. Ba6#`)

Features:
- Dual-theme high-contrast Staunton vector pieces (light squares: `#2A3142`, dark squares: `#11131B`).
- Automatic forced opponent reply with 320ms pacing.
- Live algebraic move tape, step indicator, and Brilliant Move (`!!`) indicator.
- Mechanical rank-pitched wooden thock sound effects.

---

## 🗂️ Project Structure

```text
sahil-pal-portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css              # Color tokens, themes (Void / Blueprint), Staunton styling
│   │   ├── layout.tsx               # Root layout & OpenGraph metadata
│   │   ├── page.tsx                 # Single-page systems portfolio
│   │   └── not-found.tsx            # Custom 404 handler
│   ├── components/
│   │   └── portfolio/
│   │       ├── hero.tsx             # 01 // About — Summary & cursor-reactive 3D mesh
│   │       ├── systems-workbench.tsx# 02 // Projects — 4 featured systems workbench
│   │       ├── chess-arena.tsx      # 03 // Chess — Forced Mate-in-2 tactical chess arena
│   │       ├── chess-piece.tsx      # High-contrast Staunton vector SVG piece set
│   │       ├── doctrine-and-signal.tsx # 04 // Contact — Engineering principles & contact footer
│   │       ├── eval-bar.tsx         # Stockfish evaluation bar
│   │       ├── header.tsx           # Sticky command bar, IST timecode, theme turnstile
│   │       ├── easter-eggs.tsx      # Interactive terminal, command palette, and discovery
│   │       ├── ticker-tape.tsx      # Kinetic ticker tape
│   │       └── logo.tsx             # Sahil geometric logo
│   └── lib/
│       ├── audio.ts                 # Pure Web Audio API rhythmic button synthesis
│       ├── portfolio-data.ts        # Verified project data, benchmarks, and profiles
│       └── utils.ts                 # Helper utilities
├── scripts/
│   └── verify-upgrades.mjs          # Playwright test suite verifying 4 viewports
├── public/                          # Static assets and icons
├── package.json
└── tsconfig.json
```

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+ (tested on Node 20 & 22)
- npm or pnpm

### Getting Started

```bash
# Clone the repository
git clone https://github.com/saahilpal/sahil-pal-portfolio.git
cd sahil-pal-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Automated Verification

```bash
# Build optimized static production bundle
npm run build

# Run automated multi-viewport Playwright verification suite
# Tests 1440x900, 1024x768, 768x1024, and 390x844 with 0 errors
node scripts/verify-upgrades.mjs
```

---

## 📬 Contact & Links

- **Engineer:** Sahil Pal
- **Email:** [saahilpal17@gmail.com](mailto:saahilpal17@gmail.com)
- **GitHub:** [github.com/saahilpal](https://github.com/saahilpal)
- **LinkedIn:** [linkedin.com/in/sahiilpal](https://www.linkedin.com/in/sahiilpal)
- **Chess.com:** [chess.com/member/sahill17](https://www.chess.com/member/sahill17)
- **Live Portfolio:** [sahil-pal-portfolio-d147.vercel.app](https://sahil-pal-portfolio-d147.vercel.app/)
