"use client";

import { experience, education } from "@/lib/portfolio-data";
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export function JourneyTimeline() {
  return (
    <section id="journey" className="space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[var(--color-border)]">
        <div>
          <div className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-wider mb-1">
            [04] // RUNTIME LOGS &amp; FOUNDATIONS
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
            Engineering Journey &amp; Education
          </h2>
        </div>
        <p className="font-mono text-xs text-[var(--color-text-dim)] max-w-sm">
          Chronological record of production software engineering experience, backend architecture roles, and academic foundations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Professional Experience */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-text-dim)] uppercase tracking-wider">
            <Briefcase size={14} className="text-[var(--color-accent)]" />
            <span>PRODUCTION SOFTWARE EXPERIENCE</span>
          </div>

          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-4 hover:border-[var(--color-border-active)] transition-colors shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-[var(--color-border)] pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-text)]">
                      {exp.role}
                    </h3>
                    <div className="text-xs text-[var(--color-accent)] font-mono font-medium mt-0.5">
                      {exp.company}
                    </div>
                  </div>
                  <div className="font-mono text-[11px] text-[var(--color-text-dim)] flex items-center gap-1.5 self-start sm:self-auto">
                    <Calendar size={12} />
                    <span>{exp.date}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-2.5 text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {exp.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5">
                      <span className="text-[var(--color-accent)] font-mono shrink-0 mt-0.5">&gt;</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--color-border)] font-mono text-[10px]">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-dim)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Academic Foundation */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-text-dim)] uppercase tracking-wider">
            <GraduationCap size={14} className="text-[var(--color-accent-secondary)]" />
            <span>ACADEMIC FOUNDATION</span>
          </div>

          <div className="space-y-6">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-4 hover:border-[var(--color-border-active)] transition-colors shadow-sm"
              >
                <div className="border-b border-[var(--color-border)] pb-3">
                  <div className="font-mono text-[10px] text-[var(--color-accent-secondary)] font-semibold uppercase">
                    {edu.date}
                  </div>
                  <h3 className="text-base font-bold text-[var(--color-text)] mt-1">
                    {edu.degree}
                  </h3>
                  <div className="text-xs text-[var(--color-text-muted)] mt-0.5 flex items-center gap-1.5">
                    <MapPin size={12} className="text-[var(--color-text-dim)]" />
                    <span>{edu.school}, {edu.location}</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-[var(--color-text-dim)] uppercase tracking-wider mb-2">
                    CORE ENGINEERING CURRICULUM:
                  </div>
                  <div className="space-y-1.5 font-mono text-[11px] text-[var(--color-text-muted)]">
                    {edu.focus.map((item, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-[var(--color-accent-secondary)] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[var(--color-border)] font-mono text-[10px] text-[var(--color-text-dim)]">
                  <span>Graduation Year: <strong>2026</strong></span>
                  <span className="mx-2">•</span>
                  <span className="text-[var(--color-accent)] font-semibold">Immediate Availability</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
