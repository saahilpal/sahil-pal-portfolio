"use client";

import { useState } from "react";
import { Workflow, Cpu } from "lucide-react";
import { skills, langGraphPipeline } from "@/lib/portfolio-data";

export function TechStackSection() {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(3); // Investigator loop by default

  const activeStage = langGraphPipeline[activeStageIndex];

  return (
    <section id="stack" className="py-16 sm:py-24 border-b border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-emerald)] uppercase tracking-wider font-semibold">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)]" />
            <span>02 // AI SYSTEMS &amp; CORE TECH STACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Technical Stack &amp; LangGraph Architecture
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl">
            Deterministic multi-agent state machines, AST-driven context engineering, grounded retrieval, and high-concurrency systems.
          </p>
        </div>

        {/* 1. CREATIVE LANGGRAPH STATE MACHINE SHOWCASE */}
        <div className="craft-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[var(--accent-emerald-soft)] text-[var(--accent-emerald)] border border-[var(--border-subtle)]">
                <Workflow className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  LangGraph 9-Stage Deterministic State Graph
                </h3>
                <p className="text-xs text-[var(--accent-emerald)] font-mono">
                  State reducers, pinned test oracles, and bounded agent loops (PatchBound Core)
                </p>
              </div>
            </div>
            <div className="text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-canvas)] px-3 py-1.5 rounded-lg border border-[var(--border-subtle)]">
              CLICK NODES TO INSPECT INVARIANTS
            </div>
          </div>

          {/* Interactive Node Sequence Strip */}
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
            {langGraphPipeline.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`p-2.5 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between h-20 ${
                    isActive
                      ? "bg-[var(--accent-emerald-soft)] border-[var(--accent-emerald)] text-[var(--text-primary)] ring-1 ring-[var(--accent-emerald)] shadow-md"
                      : "bg-[var(--bg-canvas)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-medium)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <div className="font-mono text-[10px] font-bold text-[var(--accent-emerald)]">
                    {stage.step}
                  </div>
                  <div className="text-[11px] font-semibold leading-tight line-clamp-2">
                    {stage.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Stage Detail Panel */}
          {activeStage && (
            <div className="p-5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-[var(--accent-emerald-soft)] text-[var(--accent-emerald)] font-bold">
                    STAGE {activeStage.step}
                  </span>
                  <span className="font-bold text-sm text-[var(--text-primary)]">
                    {activeStage.name}
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-mono">
                    [{activeStage.role}]
                  </span>
                </div>
                <span className="text-xs font-mono text-[var(--accent-cyan)] bg-[var(--bg-surface)] px-2.5 py-0.5 rounded border border-[var(--border-subtle)]">
                  {activeStage.tech}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="space-y-1">
                  <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                    State Action &amp; Transition:
                  </span>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {activeStage.action}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-xs text-[var(--accent-emerald)] uppercase tracking-wider font-semibold">
                    Deterministic Safety Invariant:
                  </span>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {activeStage.invariant}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. CATEGORIZED SKILLS & RUNTIMES GRID */}
        <div className="space-y-6">
          <div className="font-mono text-xs text-[var(--accent-emerald)] uppercase tracking-wider font-semibold flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>CORE ENGINEERING DOMAINS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((category) => (
              <div
                key={category.category}
                className="craft-card p-6 space-y-4 hover:border-[var(--border-medium)]"
              >
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    {category.category}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    {category.headline}
                  </p>
                </div>

                <div className="space-y-2.5">
                  {category.items.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-1 group hover:border-[var(--accent-emerald)] transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-xs text-[var(--text-primary)] group-hover:text-[var(--accent-emerald)] transition-colors">
                          {skill.name}
                        </span>
                        {skill.level && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-surface-elevated)] text-[var(--text-muted)]">
                            {skill.level}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                        {skill.context}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
