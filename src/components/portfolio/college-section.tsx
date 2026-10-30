"use client";

import { education, EducationItem } from "@/lib/portfolio-data";
import { TactileCard, TactilePill } from "./tactile-card";
import { ScrubStatement } from "./scrub-statement";

export function CollegeSection() {
  return (
    <section
      id="education"
      aria-label="Education"
      className="relative z-20 py-20 sm:py-32 border-b border-[var(--line)] bg-[var(--canvas)] text-[var(--ink-primary)] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[var(--accent-move)] tracking-widest uppercase">
              {"// 04 • ACADEMIC FOUNDATION"}
            </span>
            <span className="h-[1px] w-16 bg-[var(--line-strong)]" aria-hidden="true" />
          </div>
          <h2 className="lightup-heading text-[10vw] sm:text-[8vw] lg:text-[6.5vw] font-[family-name:var(--font-heading)] font-black tracking-[-0.03em] leading-[0.9] uppercase text-[var(--ink-primary)]">
            EDUCATION
          </h2>
        </div>

        {/* Scroll-scrub Statement: Lights up word by word as you scroll */}
        <div className="max-w-4xl py-6 border-y border-[var(--line)]">
          <ScrubStatement text="Rigorous foundation in computer algorithms, database concurrency, computational systems, and object-oriented software architecture." />
        </div>

        {/* Education Item Card with TactileCard */}
        <div className="space-y-6">
          {education.map((item: EducationItem, idx: number) => (
            <TactileCard
              key={idx}
              className="p-8 sm:p-12 bg-[var(--surface)] flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-default"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-move)] font-bold">
                  Undergraduate Degree
                </span>
                <h3 className="text-2xl sm:text-4xl font-[family-name:var(--font-heading)] font-bold text-[var(--ink-primary)]">
                  {item.degree}
                </h3>
                <p className="text-base sm:text-lg text-[var(--ink-secondary)]">
                  {item.college}
                </p>
              </div>

              <div className="shrink-0">
                <TactilePill>
                  <span className="inline-block text-sm font-mono text-[var(--ink-primary)] px-4 py-2.5 rounded-lg bg-[var(--canvas)] border border-[var(--line-strong)] select-none">
                    {item.years}
                  </span>
                </TactilePill>
              </div>
            </TactileCard>
          ))}
        </div>
      </div>
    </section>
  );
}
