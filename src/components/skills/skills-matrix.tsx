"use client";

import { useState } from "react";
import { skills } from "@/lib/portfolio-data";
import { CheckCircle2, Info } from "lucide-react";

export function SkillsMatrix() {
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    category: string;
    context: string;
  }>({
    name: "Model Context Protocol (MCP)",
    category: "AI Systems & Context Engineering",
    context: "Writing native MCP servers for Cursor, Claude, and IDE agents",
  });

  return (
    <section id="skills" className="space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[var(--color-border)]">
        <div>
          <div className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-wider mb-1">
            [03] // CAPABILITY GRAPH &amp; RUNTIMES
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
            Technical Stack &amp; Systems Radar
          </h2>
        </div>
        <p className="font-mono text-xs text-[var(--color-text-dim)] max-w-sm">
          Granular toolchain &amp; system capabilities verified through production implementations. Click any capability to view application context.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Columns: Categorized Skill Matrix */}
        <div className="lg:col-span-8 space-y-6">
          {skills.map((category) => (
            <div
              key={category.category}
              className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[var(--color-border)] pb-2.5 font-mono text-xs">
                <span className="font-bold text-[var(--color-text)] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                  {category.category.toUpperCase()}
                </span>
                <span className="text-[10px] text-[var(--color-text-dim)]">
                  {category.headline}
                </span>
              </div>

              {/* Items Grid */}
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                {category.items.map((item) => {
                  const isSelected = selectedSkill.name === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() =>
                        setSelectedSkill({
                          name: item.name,
                          category: category.category,
                          context: item.context,
                        })
                      }
                      className={`px-3 py-1.5 rounded border text-left transition-all ${
                        isSelected
                          ? "border-[var(--color-accent)] bg-[var(--color-surface-elevated)] text-[var(--color-accent)] font-semibold shadow-sm"
                          : "border-[var(--color-border)] bg-[var(--color-bg)]/60 text-[var(--color-text-muted)] hover:border-[var(--color-border-active)] hover:text-[var(--color-text)]"
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Context Inspector Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-4 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-[var(--color-border)] font-mono text-xs text-[var(--color-text-dim)]">
              <Info size={14} className="text-[var(--color-accent)]" />
              <span>CAPABILITY INSPECTOR</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="font-mono text-[10px] text-[var(--color-text-dim)] uppercase tracking-wider">
                  SELECTED TOOL / RUNTIME
                </div>
                <div className="text-base font-bold text-[var(--color-text)] mt-0.5">
                  {selectedSkill.name}
                </div>
                <div className="font-mono text-[10px] text-[var(--color-accent)] mt-0.5">
                  CATEGORY: {selectedSkill.category}
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] font-mono text-xs space-y-2">
                <div className="text-[10px] text-[var(--color-text-dim)] uppercase">
                  PRACTICAL IMPLEMENTATION CONTEXT:
                </div>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {selectedSkill.context}
                </p>
              </div>

              <div className="font-mono text-[10px] text-[var(--color-text-dim)] space-y-1 pt-2 border-t border-[var(--color-border)]">
                <div className="flex items-center gap-1.5 text-[var(--color-text)] font-semibold">
                  <CheckCircle2 size={12} className="text-[var(--color-accent)]" />
                  <span>Production-Grade Integration</span>
                </div>
                <p>
                  Applied directly across Synapse AST daemon, DocAnalyzer RAG workers, and Hera Billing offline database pipelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
