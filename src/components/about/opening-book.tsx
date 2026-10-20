"use client";

import { Award, Briefcase, CheckCircle2 } from "lucide-react";
import { useAnimeReveal } from "@/lib/anime-motion";

export function OpeningBook() {
  const sectionRef = useAnimeReveal<HTMLElement>({ translateY: 24, duration: 750 });

  return (
    <section ref={sectionRef} id="opening-book" className="py-16 sm:py-24 border-b border-[var(--border-chess)] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border-chess)] pb-5 gap-3">
          <div className="space-y-1.5">
            <div className="font-mono text-xs text-[var(--chess-green)] uppercase tracking-wider font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--chess-green)]" />
              <span>SECTION 04 // THE OPENING BOOK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-white)] tracking-tight">
              How I Think, Debug, and Decide
            </h2>
            <p className="text-sm text-[var(--chess-nude-muted)] max-w-2xl">
              Architectural principles, engineering philosophy, and real educational foundations behind the engines.
            </p>
          </div>
          <div className="font-mono text-xs text-[var(--chess-nude-dark)] sm:text-right">
            <span>ENGINEERING INVARIANTS</span>
            <div>BENGALURU, INDIA</div>
          </div>
        </div>

        {/* 3 Core Engineering Invariants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="card-tactile p-6 rounded-md bg-[var(--bg-chess-card)] border border-[var(--border-chess)] space-y-3 shadow-sm">
            <div className="text-[var(--chess-green)] text-[11px] uppercase font-bold flex items-center gap-1.5">
              <span>PRINCIPLE 01 //</span>
              <span>STATE INVARIANTS</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-[var(--text-white)]">
              Crash-Resilient State Over Optimistic Memory
            </h3>
            <p className="text-[var(--chess-nude-muted)] font-sans text-xs sm:text-sm leading-relaxed">
              Every system I build assumes the process will terminate mid-write. Synapse uses SQLite WAL journaling with <code className="text-[var(--text-white)]">PRAGMA synchronous = NORMAL</code>. Hera Billing uses Room v13 with foreign key RESTRICT constraints and automated daily Google Drive backups.
            </p>
          </div>

          <div className="card-tactile p-6 rounded-md bg-[var(--bg-chess-card)] border border-[var(--border-chess)] space-y-3 shadow-sm">
            <div className="text-[var(--chess-brilliant)] text-[11px] uppercase font-bold flex items-center gap-1.5">
              <span>PRINCIPLE 02 //</span>
              <span>SYNTACTIC GROUNDING</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-[var(--text-white)]">
              Deterministic ASTs Over Probabilistic Fuzzy Guesses
            </h3>
            <p className="text-[var(--chess-nude-muted)] font-sans text-xs sm:text-sm leading-relaxed">
              LLMs hallucinate when asked to infer function boundaries from raw text chunks. Synapse forces agent queries through Tree-sitter abstract syntax trees and exact BM25 inverted indexes before vector synthesis, eliminating hallucinated context.
            </p>
          </div>

          <div className="card-tactile p-6 rounded-md bg-[var(--bg-chess-card)] border border-[var(--border-chess)] space-y-3 shadow-sm">
            <div className="text-[var(--chess-green)] text-[11px] uppercase font-bold flex items-center gap-1.5">
              <span>PRINCIPLE 03 //</span>
              <span>ATOMIC CONCURRENCY</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-[var(--text-white)]">
              Row-Level Queue Locks Over Fragile External Brokers
            </h3>
            <p className="text-[var(--chess-nude-muted)] font-sans text-xs sm:text-sm leading-relaxed">
              Distributed task queues often suffer from desynchronization during worker crashes. In DocAnalyzer, I leverage PostgreSQL <code className="text-[var(--text-white)]">FOR UPDATE SKIP LOCKED</code> directly inside the database, guaranteeing zero double-processing.
            </p>
          </div>
        </div>

        {/* Education & Experience Chronicle */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
          {/* Work Experience */}
          <div className="card-tactile p-6 rounded-md bg-[var(--bg-chess-card)] border border-[var(--border-chess)] space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[var(--border-chess)] pb-3">
              <span className="font-bold text-[var(--text-white)] text-xs flex items-center gap-2">
                <Briefcase size={14} className="text-[var(--chess-green)]" />
                <span>PRODUCTION EXPERIENCE</span>
              </span>
              <span className="text-[10px] text-[var(--chess-green)] font-bold">JUNE 2025 – JULY 2025</span>
            </div>

            <div>
              <div className="text-sm font-bold text-[var(--text-white)] font-serif">Software Engineering Intern</div>
              <div className="text-xs text-[var(--chess-nude-muted)] font-sans mt-0.5">Kristu Jayanti Software Development Centre • Bengaluru, India</div>
            </div>

            <ul className="space-y-2 text-xs text-[var(--chess-nude-muted)] font-sans leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[var(--chess-green)] font-mono">•</span>
                <span>Engineered high-throughput asynchronous RESTful services using Java 17 and Eclipse Vert.x event loops.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--chess-green)] font-mono">•</span>
                <span>Architected enterprise authentication and session management with JWT tokens, email verification, and Redis token blacklisting.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--chess-green)] font-mono">•</span>
                <span>Constructed MongoDB document pipelines with automated scheduled maintenance routines.</span>
              </li>
            </ul>
          </div>

          {/* Academic Foundation */}
          <div className="card-tactile p-6 rounded-md bg-[var(--bg-chess-card)] border border-[var(--border-chess)] space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[var(--border-chess)] pb-3">
              <span className="font-bold text-[var(--text-white)] text-xs flex items-center gap-2">
                <Award size={14} className="text-[var(--chess-green)]" />
                <span>ACADEMIC FOUNDATION</span>
              </span>
              <span className="text-[10px] text-[var(--chess-green)] font-bold">2023 – 2026 (GRADUATING)</span>
            </div>

            <div>
              <div className="text-sm font-bold text-[var(--text-white)] font-serif">Bachelor of Computer Applications (BCA)</div>
              <div className="text-xs text-[var(--chess-nude-muted)] font-sans mt-0.5">Kristu Jayanti College (Autonomous) • Bengaluru, India</div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--chess-green-subtle)] border border-[var(--border-green)] text-[var(--chess-green)] font-bold text-xs">
              <CheckCircle2 size={13} />
              <span>CUMULATIVE CGPA: 7.9 / 10.0</span>
            </div>

            <p className="text-xs text-[var(--chess-nude-muted)] font-sans leading-relaxed">
              Rigorous coursework in Data Structures &amp; Algorithms (C++), Operating Systems &amp; Concurrency, Database Management Systems, and Compiler Design. Applied academic theory directly to physical production engines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
