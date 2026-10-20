"use client";

import { BookOpen, Award, Briefcase, Calendar, MapPin, CheckCircle2, ShieldCheck, Compass } from "lucide-react";

export function OpeningBook() {
  return (
    <section id="opening-book" className="py-16 border-b border-[var(--border-hairline)] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border-hairline)] pb-4 gap-2">
          <div>
            <div className="font-mono text-xs text-[var(--accent-copper)] uppercase tracking-wider">
              SECTION 04 // THE OPENING BOOK
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-pure)] tracking-tight">
              How I Think, Debug, and Decide
            </h2>
          </div>
          <div className="font-mono text-xs text-[var(--text-muted)]">
            PHILOSOPHICAL &amp; ARCHITECTURAL FOUNDATIONS
          </div>
        </div>

        {/* 3 Core Engineering Invariants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-6 rounded-sm bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] space-y-3">
            <div className="text-[var(--accent-copper)] text-[10px] uppercase font-bold flex items-center gap-1.5">
              <span>PRINCIPLE 01 //</span>
              <span>STATE INVARIANTS</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-[var(--text-pure)]">
              Crash-Resilient State Over Optimistic Memory
            </h3>
            <p className="text-[var(--text-muted)] font-sans text-xs sm:text-sm leading-relaxed">
              Every system I build assumes the process will be terminated unexpectedly mid-write. Synapse uses SQLite WAL journaling with <code className="text-[var(--text-ivory)]">PRAGMA synchronous = NORMAL</code>. Hera Billing uses Room v13 with foreign key RESTRICT constraints and daily Google Drive snapshots.
            </p>
          </div>

          <div className="p-6 rounded-sm bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] space-y-3">
            <div className="text-[var(--accent-cyan)] text-[10px] uppercase font-bold flex items-center gap-1.5">
              <span>PRINCIPLE 02 //</span>
              <span>SYNTACTIC GROUNDING</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-[var(--text-pure)]">
              Deterministic ASTs Over Probabilistic Fuzzy Guesses
            </h3>
            <p className="text-[var(--text-muted)] font-sans text-xs sm:text-sm leading-relaxed">
              LLMs hallucinate when asked to guess class inheritance hierarchies. Synapse forces agent queries through Tree-sitter abstract syntax trees and exact BM25 inverted indexes before vector synthesis, eliminating context overflow.
            </p>
          </div>

          <div className="p-6 rounded-sm bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] space-y-3">
            <div className="text-[var(--accent-emerald)] text-[10px] uppercase font-bold flex items-center gap-1.5">
              <span>PRINCIPLE 03 //</span>
              <span>ATOMIC CONCURRENCY</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-[var(--text-pure)]">
              Row-Level Queue Locks Over Fragile Brokers
            </h3>
            <p className="text-[var(--text-muted)] font-sans text-xs sm:text-sm leading-relaxed">
              Distributed task queues often suffer from cache desynchronization during worker crashes. In DocAnalyzer, I leverage PostgreSQL <code className="text-[var(--text-ivory)]">FOR UPDATE SKIP LOCKED</code> directly inside the relational database, guaranteeing zero double-processing.
            </p>
          </div>
        </div>

        {/* Education & Experience Chronicle */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
          {/* Work Experience */}
          <div className="p-6 rounded-sm bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-2.5">
              <span className="font-bold text-[var(--text-pure)] text-[11px] flex items-center gap-1.5">
                <Briefcase size={13} className="text-[var(--accent-copper)]" />
                <span>PRODUCTION EXPERIENCE</span>
              </span>
              <span className="text-[10px] text-[var(--accent-copper)] font-semibold">JUNE 2025 – JULY 2025</span>
            </div>

            <div>
              <div className="text-sm font-bold text-[var(--text-pure)]">Software Engineering Intern</div>
              <div className="text-xs text-[var(--text-muted)] font-sans">Kristu Jayanti Software Development Centre • Bengaluru, India</div>
            </div>

            <ul className="space-y-2 text-xs text-[var(--text-muted)] font-sans leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent-copper)] font-mono">•</span>
                <span>Engineered high-throughput asynchronous RESTful services using Java 17 and Eclipse Vert.x event loops.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent-copper)] font-mono">•</span>
                <span>Architected enterprise authentication and session management with JWT tokens, email verification, and Redis token blacklisting.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent-copper)] font-mono">•</span>
                <span>Constructed MongoDB document pipelines with automated scheduled maintenance routines.</span>
              </li>
            </ul>
          </div>

          {/* Academic Foundation */}
          <div className="p-6 rounded-sm bg-[var(--bg-obsidian-card)] border border-[var(--border-hairline)] space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-2.5">
              <span className="font-bold text-[var(--text-pure)] text-[11px] flex items-center gap-1.5">
                <Award size={13} className="text-[var(--accent-emerald)]" />
                <span>ACADEMIC FOUNDATION</span>
              </span>
              <span className="text-[10px] text-[var(--accent-emerald)] font-semibold">2023 – 2026 (GRADUATING)</span>
            </div>

            <div>
              <div className="text-sm font-bold text-[var(--text-pure)]">Bachelor of Computer Applications (BCA)</div>
              <div className="text-xs text-[var(--text-muted)] font-sans">Kristu Jayanti College (Autonomous) • Bengaluru, India</div>
            </div>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xs bg-[var(--accent-emerald)]/10 border border-[var(--accent-emerald)]/30 text-[var(--accent-emerald)] font-bold text-xs">
              <CheckCircle2 size={12} />
              <span>CUMULATIVE CGPA: 7.9 / 10.0</span>
            </div>

            <p className="text-xs text-[var(--text-muted)] font-sans leading-relaxed">
              Rigorous coursework in Data Structures &amp; Algorithms (C++), Operating Systems &amp; Concurrency, Database Management Systems, and Compiler Design. Applied academic theory directly to physical production engines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
