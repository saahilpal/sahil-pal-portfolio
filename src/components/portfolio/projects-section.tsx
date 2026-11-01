"use client";

import { useState } from "react";
import { projects, ProjectItem } from "@/lib/portfolio-data";
import { TactileCard, TactilePill } from "./tactile-card";
import { ScrubStatement } from "./scrub-statement";
import { ArrowUpRight, Github, ExternalLink, Cpu, Database, Smartphone, Chrome } from "lucide-react";

export function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getProjectIcon = (id: string) => {
    switch (id) {
      case "synapse":
        return <Cpu className="w-4 h-4 text-[var(--accent-move)]" />;
      case "docanalyzer":
        return <Database className="w-4 h-4 text-[var(--accent-move)]" />;
      case "herabilling":
        return <Smartphone className="w-4 h-4 text-[var(--accent-move)]" />;
      case "leetsync":
        return <Chrome className="w-4 h-4 text-[var(--accent-move)]" />;
      default:
        return <ExternalLink className="w-4 h-4 text-[var(--accent-move)]" />;
    }
  };

  const getLinkIcon = (label: string) => {
    if (label.toLowerCase().includes("github")) {
      return <Github className="w-3.5 h-3.5 shrink-0" />;
    }
    return <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />;
  };

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="relative z-20 py-20 sm:py-32 border-b border-[var(--line)] bg-[var(--surface)] text-[var(--ink-primary)] transition-colors duration-500 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 space-y-12 sm:space-y-16">
        {/* Section Heading with Big Display Scale (No Kicker Eyebrow per Craft Floor) */}
        <div className="space-y-4">
          <h2 className="lightup-heading text-[10vw] sm:text-[8vw] lg:text-[6.5vw] font-[family-name:var(--font-heading)] font-black tracking-[-0.03em] leading-[0.9] uppercase text-[var(--ink-primary)]">
            PROJECTS
          </h2>
        </div>

        {/* Scroll-Scrub Statement: Lights up word by word as you scroll */}
        <div className="max-w-4xl py-6 border-y border-[var(--line)]">
          <ScrubStatement text="Core systems I designed, built, and benchmarked — replacing fragile prompt heuristics with grounded context engines, parallel AST parsers, and verifiable evaluation." />
        </div>

        {/* Unified Architectural Dossiers (Zero Nested Cards, Full Tactile Responsiveness) */}
        <div className="space-y-8 sm:space-y-10">
          {projects.map((project: ProjectItem, index: number) => {
            const isHovered = hoveredIndex === index;
            const isDimmed = hoveredIndex !== null && !isHovered;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`transition-opacity duration-300 ${
                  isDimmed ? "opacity-35" : "opacity-100"
                }`}
              >
                <TactileCard
                  className={`p-6 sm:p-8 lg:p-10 bg-[var(--canvas)] space-y-6 sm:space-y-8 cursor-default transition-all duration-300 border-[var(--line)] hover:border-[var(--accent-move)] ${
                    isHovered ? "border-[var(--accent-move)] shadow-2xl" : ""
                  }`}
                >
                  {/* Header Row: Index, Category Icon, Title, One-liner, and Live Action Links */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[var(--line)]">
                    <div className="space-y-3 max-w-3xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-[var(--accent-move)] px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--line)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--ink-muted)]">
                          {getProjectIcon(project.id)}
                          <span>{project.toolsUsed[0]}</span>
                          <span>•</span>
                          <span>{project.toolsUsed[1]}</span>
                        </div>
                      </div>

                      <h3 className="lightup-heading text-2xl sm:text-3xl lg:text-4xl font-[family-name:var(--font-heading)] font-bold tracking-tight text-[var(--ink-primary)]">
                        {project.name}
                      </h3>

                      <p className="text-base sm:text-lg text-[var(--ink-secondary)] leading-relaxed">
                        {project.whatItDoes}
                      </p>
                    </div>

                    {/* Live Links with Lucide SVGs */}
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
                      {project.links.map((link) => (
                        <TactilePill key={link.label}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-semibold bg-[var(--surface)] border border-[var(--line)] text-[var(--ink-primary)] hover:border-[var(--accent-move)] hover:text-white transition-all shadow-sm min-h-[44px]"
                          >
                            <span className="text-[var(--accent-move)]">
                              {getLinkIcon(link.label)}
                            </span>
                            <span>{link.label}</span>
                          </a>
                        </TactilePill>
                      ))}
                    </div>
                  </div>

                  {/* Specification Breakdown: The Problem vs What I Built */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-sm sm:text-base">
                    {/* The Problem */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-move)]" />
                        <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-move)] font-bold">
                          The Problem
                        </span>
                      </div>
                      <p className="text-[var(--ink-secondary)] leading-relaxed pl-3.5 border-l border-[var(--line)]">
                        {project.problem}
                      </p>
                    </div>

                    {/* What I Built */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                          System Architecture &amp; Solution
                        </span>
                      </div>
                      <p className="text-[var(--ink-secondary)] leading-relaxed pl-3.5 border-l border-[var(--line)]">
                        {project.whatIBuilt}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Row: Stack Pills + Measurable Benchmark */}
                  <div className="pt-6 border-t border-[var(--line)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Stack Pills with anime.js tactile press */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase text-[var(--ink-muted)] block">
                        Technologies &amp; Protocols
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.toolsUsed.map((tool) => (
                          <TactilePill key={tool}>
                            <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-[var(--surface)] border border-[var(--line)] text-[var(--ink-primary)] hover:border-[var(--accent-move)] hover:text-white transition-colors cursor-pointer select-none">
                              {tool}
                            </span>
                          </TactilePill>
                        ))}
                      </div>
                    </div>

                    {/* Measurable Benchmark / Result */}
                    <div className="space-y-1.5 lg:max-w-md lg:text-right">
                      <span className="text-xs font-mono uppercase text-[var(--accent-move)] font-semibold block">
                        Measurable Benchmark / Result
                      </span>
                      <p className="text-sm font-semibold text-[var(--ink-primary)] leading-normal">
                        {project.result}
                      </p>
                    </div>
                  </div>
                </TactileCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
