"use client";

import { useState } from "react";
import { skills } from "@/lib/portfolio-data";
import { Info, CheckCircle2, Cpu } from "lucide-react";

export function CapabilityDock() {
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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-purple-400 uppercase tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span>[03] // CAPABILITY RADAR &amp; TECH STACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--text-primary)]">
            Systems Capability Graph
          </h2>
        </div>
        <p className="font-mono text-xs text-[var(--text-secondary)] max-w-sm">
          Granular toolchains and runtime competencies verified through active repositories. Tap any capability to view practical implementation context.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Skills Bento Grid */}
        <div className="lg:col-span-8 space-y-5">
          {skills.map((cat) => (
            <div
              key={cat.category}
              className="p-5 sm:p-6 rounded-3xl glass-card space-y-3.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/[0.08] pb-3 font-mono text-xs">
                <span className="font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  {cat.category.toUpperCase()}
                </span>
                <span className="text-[11px] text-[var(--text-dim)]">{cat.headline}</span>
              </div>

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                {cat.items.map((item) => {
                  const isSelected = selectedSkill.name === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() =>
                        setSelectedSkill({
                          name: item.name,
                          category: cat.category,
                          context: item.context,
                        })
                      }
                      className={`px-3.5 py-1.5 rounded-full border text-left transition-all ${
                        isSelected
                          ? "border-cyan-400 bg-cyan-400/10 text-cyan-300 font-semibold shadow-[0_0_15px_rgba(0,242,254,0.2)]"
                          : "border-white/[0.08] bg-white/[0.03] text-[var(--text-secondary)] hover:border-white/20 hover:text-white"
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

        {/* Right Side: Interactive Inspector Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 p-6 rounded-3xl glass-card space-y-5 shadow-2xl border border-white/[0.12]">
            <div className="flex items-center gap-2 pb-3 border-b border-white/[0.08] font-mono text-xs text-[var(--text-dim)]">
              <Info size={14} className="text-cyan-400" />
              <span>CAPABILITY INSPECTOR</span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="font-mono text-[10px] text-[var(--text-dim)] uppercase tracking-wider">
                  ACTIVE SELECTION
                </div>
                <div className="text-xl font-bold text-[var(--text-primary)] mt-1">
                  {selectedSkill.name}
                </div>
                <div className="font-mono text-xs text-purple-400 mt-1">
                  {selectedSkill.category}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-white/[0.08] font-mono text-xs space-y-2">
                <div className="text-[10px] text-[var(--text-dim)] uppercase tracking-wider">
                  PRACTICAL IMPLEMENTATION CONTEXT:
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {selectedSkill.context}
                </p>
              </div>

              <div className="font-mono text-xs text-[var(--text-dim)] space-y-1.5 pt-3 border-t border-white/[0.08]">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
                  <CheckCircle2 size={13} />
                  <span>Production-Grade Verification</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Directly architected in Synapse AST indexing daemon, DocAnalyzer RAG worker queues, and Hera Wholesale billing ERP.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
