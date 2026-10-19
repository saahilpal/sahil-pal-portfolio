"use client";

import { architecturalPillars } from "@/lib/portfolio-data";
import { Workflow, Lock, Cpu, CheckCircle } from "lucide-react";

export function MindsetBento() {
  const icons = [Workflow, Lock, Cpu];

  return (
    <section id="architecture" className="space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>[02] // SYSTEMS ARCHITECTURE &amp; MINDSET</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--text-primary)]">
            How I Build Systems
          </h2>
        </div>
        <p className="font-mono text-xs text-[var(--text-secondary)] max-w-sm">
          Core engineering principles governing my technical decisions across AI context retrieval, concurrency, and persistent state.
        </p>
      </div>

      {/* 3 Pillars Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {architecturalPillars.map((pillar, idx) => {
          const Icon = icons[idx] || Workflow;
          return (
            <div
              key={pillar.number}
              className="p-6 sm:p-7 rounded-3xl glass-card flex flex-col justify-between space-y-6 group hover:border-cyan-400/40 transition-all duration-300 relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-2xl font-black text-cyan-400/40 group-hover:text-cyan-400 transition-colors">
                    {pillar.number}
                  </span>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-[var(--text-dim)] uppercase tracking-wider">
                    {pillar.badge}
                  </span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400/50 transition-all duration-300">
                  <Icon size={22} />
                </div>

                <h3 className="text-lg font-bold text-[var(--text-primary)] leading-snug group-hover:text-cyan-300 transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center gap-2 font-mono text-[10px] text-[var(--text-dim)]">
                <CheckCircle size={12} className="text-emerald-400" />
                <span>Verified in active production codebase</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
