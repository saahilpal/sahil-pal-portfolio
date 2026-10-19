"use client";

import { Award, Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export function EditorialJourney() {
  const experiences = [
    {
      period: "JUNE 2025 — JULY 2025",
      role: "Software Engineering Intern",
      organization: "Kristu Jayanti Software Development Centre",
      location: "Bengaluru, India",
      stamp: "ENTERPRISE JAVA",
      stampColor: "stamp-blue",
      bullets: [
        "Architected and deployed high-throughput RESTful services using Java 17 and Eclipse Vert.x event loops.",
        "Engineered production-grade authentication and authorization: JWT sessions, email verification, and Redis token blacklisting.",
        "Constructed MongoDB workflows with automated scheduled cleanup jobs and asynchronous event handlers coordinating database, cache, and email layers.",
      ],
    },
    {
      period: "2023 — 2026 (GRADUATING)",
      role: "Bachelor of Computer Applications (BCA)",
      organization: "Kristu Jayanti College (Autonomous)",
      location: "Bengaluru, India",
      stamp: "CGPA: 7.9 / 10.0",
      stampColor: "stamp-green",
      bullets: [
        "Rigorous academic focus on Data Structures & Algorithms, Operating Systems, Database Management Internals, and Computer Networks.",
        "Applied theoretical concepts to physical systems: building SQLite WAL state engines, AST compilers with Tree-sitter, and offline-first mobile databases.",
        "Achieved cumulative CGPA of 7.9/10 across all semesters.",
      ],
    },
  ];

  return (
    <section id="journey" className="py-16 border-b border-[var(--border-paper-strong)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border-paper)] pb-4 gap-2">
          <div>
            <div className="font-mono text-xs text-[var(--text-ink-muted)] uppercase tracking-wider">
              SECTION 04 // CHRONICLE
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-ink)] tracking-tight">
              Work &amp; Academic Journey
            </h2>
          </div>
          <div className="font-mono text-xs text-[var(--text-ink-muted)]">
            HISTORICAL RECORD // 2023 — 2026
          </div>
        </div>

        {/* Timeline Records */}
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="paper-sheet p-6 sm:p-8 rounded-sm space-y-4 relative"
            >
              {/* Corner crosshair */}
              <div className="absolute top-3 right-3 font-mono text-[9px] text-[var(--text-ink-faint)]">+</div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-paper)] pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-ink-muted)]">
                    <Calendar size={12} />
                    <span>{exp.period}</span>
                    <span>•</span>
                    <MapPin size={12} />
                    <span>{exp.location}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[var(--text-ink)]">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-medium text-[var(--text-ink-secondary)]">
                    {exp.organization}
                  </div>
                </div>

                <span className={`stamp-seal ${exp.stampColor} text-[9px] py-1 px-2.5 self-start sm:self-auto`}>
                  {exp.stamp}
                </span>
              </div>

              {/* Bullets */}
              <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-ink-secondary)] font-sans">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[var(--text-ink-muted)] font-mono text-xs">•</span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
