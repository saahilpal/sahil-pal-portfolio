"use client";

import { Briefcase, CheckCircle2, Calendar, MapPin } from "lucide-react";
import { experience } from "@/lib/portfolio-data";

export function ExperienceSection() {
  return (
    <section id="work" className="py-16 sm:py-24 border-b border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-emerald)] uppercase tracking-wider font-semibold">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)]" />
            <span>03 // PROFESSIONAL EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Work Experience
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl">
            Engineering reactive non-blocking microservices, in-memory cache security, and concurrent backend infrastructure.
          </p>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-6">
          {experience.map((item, idx) => (
            <div
              key={idx}
              className="craft-card p-6 sm:p-8 space-y-6 hover:border-[var(--accent-emerald)] transition-all"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-5">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[var(--accent-emerald-soft)] text-[var(--accent-emerald)] border border-[var(--border-subtle)] mt-1">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">
                      {item.role}
                    </h3>
                    <div className="text-sm text-[var(--accent-emerald)] font-medium">
                      {item.company}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-[var(--text-muted)]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                  Key Technical Deliverables:
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {item.highlights.map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent-emerald)] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Decisions Notes */}
              {item.architectureNotes && (
                <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2">
                  <div className="font-mono text-xs text-[var(--accent-emerald)] uppercase tracking-wider font-semibold">
                    Architecture Rationale:
                  </div>
                  <div className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                    {item.architectureNotes.map((note, nIdx) => (
                      <div key={nIdx} className="flex items-start gap-2">
                        <span className="text-[var(--accent-emerald)] font-mono">→</span>
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stack Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
