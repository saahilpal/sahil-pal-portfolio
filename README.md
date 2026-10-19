# Sahil Pal — Personal Portfolio & Systems Engineering Laboratory

> An architectural, distinctive, and technically grounded portfolio built with Next.js App Router, Tailwind CSS v4, Anime.js v4, and TypeScript. Designed to reflect systems depth, AI engineering, deterministic RAG, and production software execution.

---

## 🏛️ Creative Direction & Architectural Concept

**"The Engineer's Digital Laboratory / Architectural Blueprint & Precision Workshop"**

Rather than imitating standard SaaS templates or relying on generic neon glows and terminal gimmicks, this portfolio is structured as an editorial systems workshop:
- **Technical Precision Grid:** Fine blueprint grid lines with coordinates, system status telemetry, and corner brackets.
- **Dual Architectural Theme System:**
  - **Dark Mode (Default):** Deep obsidian carbon (`#090a0f`), tactile slate surface (`#10121a`), phosphor mint accent (`#0df2a6`), and neural violet (`#8567ff`).
  - **Light Mode (Technical Blueprint):** Clean engineering drafting paper (`#f5f7fb`), crisp surface cards (`#ffffff`), and high-contrast deep cobalt accent (`#0958d9`).
- **Anime.js v4 Motion Engine:** Reusable hooks (`useAnimeReveal`, `useStaggerReveal`, `useTelemetryCounter`) coordinating smooth typography reveals, interactive SVG animations, and timeline transitions, with strict adherence to `prefers-reduced-motion: reduce`.
- **First-Class Responsiveness:** Designed specifically for viewports from 320px (compact mobile) up to 1440px+ (large desktop displays) with zero horizontal overflow, touch-friendly hit targets, and responsive typography.

---

## 🛠️ Featured Systems & Case Studies

### 1. Synapse (AI Code Intelligence & Structural Context Engine)
- **Problem:** LLM coding agents exhaust context windows or hallucinate when searching across 50k+ symbol codebases using naive grep or vector-only search.
- **Solution:** O(1) streaming memory daemon with Tree-sitter AST parsing, WAL-mode SQLite state engine, and an MCP (Model Context Protocol) server.
- **Interactive Visualizer:** Real-time 3-Lane Retrieval emulator running Lexical FTS5 (BM25), Structural AST graphs, and Semantic Vector similarity fused via Reciprocal Rank Fusion ($k=60$).
- **Links:** [Live Documentation & Demo](https://synapse-six-eta.vercel.app/) | [GitHub Repository](https://github.com/saahilpal/synapse)

### 2. DocAnalyzer (Grounded Document Intelligence & RAG Pipeline)
- **Problem:** Enterprise document QA systems suffer from ungrounded hallucinations, slow synchronous ingestion queues, and redundant embedding generation.
- **Solution:** Asynchronous pipeline pairing Gemini embeddings with PostgreSQL `pgvector`, FTS fallback, and PostgreSQL `FOR UPDATE SKIP LOCKED` worker queues.
- **Interactive Visualizer:** 5-stage interactive dataflow: `01. INGEST (SHA-256)` &rarr; `02. CHUNK (Sliding Window)` &rarr; `03. EMBED (Gemini)` &rarr; `04. RETRIEVE (pgvector)` &rarr; `05. STREAM (SSE)`.
- **Links:** [Live Production Platform](https://www.docanalyzer.app/) | [GitHub Repository](https://github.com/saahilpal/RAG-DOCAnalyzer)

### 3. Hera Billing (Offline-First Android ERP & Retail POS)
- **Problem:** Retail storefronts in bandwidth-constrained regions experience POS downtime and lost sales when cloud-only billing loses connectivity.
- **Solution:** Offline-first Android application built with Kotlin, MVVM, Room Database (SQLite), Coroutines/Flow, and native Android Canvas graphics for immediate thermal Bluetooth receipt printing and PDF invoice compilation.
- **Interactive Visualizer:** Interactive Android POS simulator with live catalog addition, real-time CGST/SGST tax calculation, and thermal tax invoice voucher generation.
- **Links:** [Repository Spec](https://github.com/saahilpal)

### 4. LeetSync (Developer Tooling & Vault Sync)
- **Overview:** Manifest V3 Chrome extension utilizing isolated Shadow DOM injection to capture accepted submissions, format metadata into structured Markdown, and push to GitHub via the Contents API.
- **Links:** [Live Companion Site](https://leetsync-web.vercel.app/) | [GitHub Repository](https://github.com/saahilpal/LeetSync)

---

## 🗂️ Project Anatomy

```text
sahil-pal-portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css         # Architectural theme variables, blueprint grid, noise
│   │   ├── layout.tsx          # Root layout with Anti-FOUC script & full SEO OpenGraph metadata
│   │   └── page.tsx            # Redesigned single-page systems portfolio
│   ├── components/
│   │   ├── architecture/
│   │   │   └── pillars-section.tsx   # Core engineering principles ("How I Think")
│   │   ├── experience/
│   │   │   └── journey-timeline.tsx  # Production work history & academic foundations
│   │   ├── footer/
│   │   │   └── site-footer.tsx       # Transmission callout, email dispatch, social channels
│   │   ├── hero/
│   │   │   └── ast-canvas.tsx        # Interactive AST & retrieval canvas visualizer
│   │   ├── navigation/
│   │   │   ├── command-palette.tsx   # ⌘K / Ctrl+K accessible quick command palette
│   │   │   └── site-header.tsx       # Telemetry status bar, clock, theme toggle, mobile drawer
│   │   ├── projects/
│   │   │   ├── docanalyzer-pipeline.tsx # Interactive 5-stage RAG pipeline emulator
│   │   │   ├── herabilling-preview.tsx  # Interactive Android POS & Canvas PDF preview
│   │   │   └── synapse-visualizer.tsx   # Interactive 3-lane RRF retrieval emulator
│   │   └── skills/
│   │       └── skills-matrix.tsx     # Capability radar with interactive context inspector
│   └── lib/
│       ├── anime-motion.ts           # Anime.js v4 hooks (useAnimeReveal, useStaggerReveal)
│       ├── portfolio-data.ts         # Verified project, capability, and background data
│       └── utils.ts                  # Utility functions
├── public/
│   ├── resume.pdf                    # Verified technical resume
│   └── media/                        # Project media assets
├── package.json
└── tsconfig.json
```

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+ (tested with Node 20 / 22)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/saahilpal/sahil-pal-portfolio.git
cd sahil-pal-portfolio

# Switch to the redesign branch
git checkout feat/portfolio-redesign-animejs

# Install dependencies
npm install
```

### Running Locally
```bash
# Start Next.js development server
npm run dev

# Open in browser: http://localhost:3000
```

### Production Build & Verification
```bash
# Compile optimized static bundle
npm run build

# Run production server
npm run start

# Run strict ESLint verification
npx eslint .
```

---

## ⚡ Verification & Quality Assurance

- **Build:** Static pre-rendering (`○ /`) validated via Turbopack (`npm run build`).
- **TypeScript:** Strict type checks passing with zero errors.
- **Linting:** Validated via `npx eslint .` with zero errors and zero warnings.
- **Motion & Accessibility:** Anime.js v4 animations seamlessly disable when `prefers-reduced-motion: reduce` is detected.
- **Anti-FOUC:** Synchronous inline head script applies stored theme (`localStorage`) before first layout paint.

---

## 📬 Contact & Dispatch

- **Engineer:** Sahil Pal
- **Role:** Software Engineer — AI Systems & Backend
- **Email:** [saahilpal17@gmail.com](mailto:saahilpal17@gmail.com)
- **LinkedIn:** [linkedin.com/in/sahiilpal](https://www.linkedin.com/in/sahiilpal)
- **GitHub:** [github.com/saahilpal](https://github.com/saahilpal)
- **LeetCode:** [leetcode.com/u/saahiilpal/](https://leetcode.com/u/saahiilpal/)
