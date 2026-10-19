"use client";

import { experience, education } from "@/lib/portfolio-data";
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export function JourneyCard() {
  return (
    <section id="journey" className="space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>[04] // RUNTIME LOGS &amp; FOUNDATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--text-primary)]">
            Engineering Journey
          </h2>
        </div>
        <p className="font-mono text-xs text-[var(--text-secondary)] max-w-sm">
          Chronological record of production software engineering experience, backend architecture roles, and academic foundations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Work History */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider">
            <Briefcase size={14} className="text-cyan-400" />
            <span>PRODUCTION ENGINEERING RUN-LOGS</span>
          </div>

          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl glass-card space-y-4 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-white/[0.08] pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">
                      {exp.role}
                    </h3>
                    <div className="text-xs text-cyan-400 font-mono font-medium mt-1">
                      {exp.company}
                    </div>
                  </div>
                  <div className="font-mono text-xs text-[var(--text-dim)] flex items-center gap-1.5 self-start sm:self-auto px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
                    <Calendar size={12} />
                    <span>{exp.date}</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-[var(--text-secondary)] leading-relaxed">
                  {exp.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono shrink-0 mt-0.5">&gt;</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.08] font-mono text-[11px]">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[var(--text-dim)]"
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
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider">
            <GraduationCap size={14} className="text-purple-400" />
            <span>ACADEMIC FOUNDATION</span>
          </div>

          <div className="space-y-6">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl glass-card space-y-4 shadow-xl"
              >
                <div className="border-b border-white/[0.08] pb-4">
                  <div className="font-mono text-xs text-purple-400 font-semibold uppercase tracking-wider">
                    {edu.date}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mt-1">
                    {edu.degree}
                  </h3>
                  <div className="text-xs text-[var(--text-secondary)] mt-1 flex items-center gap-1.5">
                    <MapPin size={12} className="text-[var(--text-dim)]" />
                    <span>{edu.school}, {edu.location}</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-wider mb-2.5">
                    SYSTEMS CURRICULUM:
                  </div>
                  <div className="space-y-2 font-mono text-xs text-[var(--text-secondary)]">
                    {edu.focus.map((item, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-purple-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.08] font-mono text-xs text-[var(--text-dim)] flex items-center justify-between">
                  <span>Graduation Year: <strong>2026</strong></span>
                  <span className="text-emerald-400 font-semibold">Immediate Availability</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
