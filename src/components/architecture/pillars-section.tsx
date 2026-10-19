"use client";

import { architecturalPillars } from "@/lib/portfolio-data";
import { Cpu, Lock, Workflow, CheckCircle } from "lucide-react";

export function PillarsSection() {
  const icons = [Workflow, Lock, Cpu];

  return (
    <section id="architecture" className="space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[var(--color-border)]">
        <div>
          <div className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-wider mb-1">
            [02] // ENGINEERING RUNTIME &amp; MINDSET
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
            How I Build Systems
          </h2>
        </div>
        <p className="font-mono text-xs text-[var(--color-text-dim)] max-w-sm">
          Core architectural principles governing my engineering decisions across AI context engines, databases, and runtimes.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {architecturalPillars.map((pillar, idx) => {
          const Icon = icons[idx] || Workflow;
          return (
            <div
              key={pillar.number}
              className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-active)] transition-all duration-300 flex flex-col justify-between group corner-bracket shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs mb-4">
                  <span className="text-[var(--color-accent)] font-bold text-sm">
                    {pillar.number}.
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-dim)] uppercase">
                    {pillar.badge}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] mb-4 group-hover:border-[var(--color-accent)] transition-colors">
                  <Icon size={20} />
                </div>

                <h3 className="text-base font-bold text-[var(--color-text)] mb-3 leading-snug group-hover:text-[var(--color-accent)] transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--color-border)] flex items-center gap-1.5 font-mono text-[10px] text-[var(--color-text-dim)]">
                <CheckCircle size={12} className="text-[var(--color-accent)]" />
                <span>Verified in production codebase</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
