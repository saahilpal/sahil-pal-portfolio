"use client";

import { GraduationCap, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { education } from "@/lib/portfolio-data";

export function CollegeSection() {
  const item = education[0];

  return (
    <section id="college" className="py-16 sm:py-24 border-b border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-emerald)] uppercase tracking-wider font-semibold">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)]" />
            <span>04 // EDUCATION &amp; FOUNDATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Education
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl">
            Formal foundations in computer science, distributed database theory, systems programming, and algorithms.
          </p>
        </div>

        {/* Education Card */}
        <div className="craft-card p-6 sm:p-8 space-y-6 hover:border-[var(--accent-emerald)] transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-5">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[var(--accent-emerald-soft)] text-[var(--accent-emerald)] border border-[var(--border-subtle)] mt-1">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">
                    {item.degree}
                  </h3>
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[var(--accent-emerald-soft)] text-[var(--accent-emerald)] border border-[var(--border-subtle)]">
                    {item.grade}
                  </span>
                </div>
                <div className="text-sm text-[var(--accent-emerald)] font-medium">
                  {item.school}
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

          {/* Core Foundations */}
          <div className="space-y-3">
            <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
              Core Coursework &amp; Technical Areas:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {item.focus.map((course, cIdx) => (
                <div
                  key={cIdx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-emerald)] shrink-0 mt-0.5" />
                  <span>{course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
