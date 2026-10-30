"use client";

import { projects, ProjectItem } from "@/lib/portfolio-data";
import { TactileCard, TactilePill } from "./tactile-card";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-label="Projects"
      className="relative z-20 py-20 sm:py-32 border-b border-[var(--line)] bg-[var(--surface)] text-[var(--ink-primary)] transition-colors duration-500 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 space-y-16 sm:space-y-24">
        {/* Section Heading with Big Display Scale (6 to 9vw) */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[var(--accent-move)] tracking-widest uppercase">
              {"// 01 • SELECTED WORK"}
            </span>
            <span className="h-[1px] w-16 bg-[var(--line-strong)]" aria-hidden="true" />
          </div>
          <h2 className="lightup-heading text-[10vw] sm:text-[8vw] lg:text-[6.5vw] font-[family-name:var(--font-heading)] font-black tracking-[-0.03em] leading-[0.9] uppercase text-[var(--ink-primary)]">
            PROJECTS
          </h2>
          <p className="lightup-text text-base sm:text-lg text-[var(--ink-secondary)] max-w-2xl">
            Core systems I designed, implemented, and benchmarked. Structured engineering specifications with direct live links and verifiable benchmarks.
          </p>
        </div>

        {/* Structured Editorial Projects (Bullet Points & Live Links, No Images) */}
        <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {projects.map((project: ProjectItem, index: number) => {
            return (
              <article
                key={project.id}
                className="py-12 sm:py-16 space-y-8 group transition-colors duration-300"
              >
                {/* Project Header Row: Index, Name, One-liner, Live Links */}
                <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-6">
                  <div className="space-y-3 max-w-3xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[var(--accent-move)] font-bold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="h-[1px] w-8 bg-[var(--line-strong)]" aria-hidden="true" />
                      <span className="text-xs font-mono text-[var(--ink-muted)] uppercase tracking-wider">
                        {project.toolsUsed[0]} &bull; {project.toolsUsed[1]}
                      </span>
                    </div>

                    <h3 className="lightup-heading text-2xl sm:text-4xl lg:text-[2.65rem] font-[family-name:var(--font-heading)] font-bold tracking-tight text-[var(--ink-primary)] group-hover:text-white transition-colors">
                      {project.name}
                    </h3>

                    <p className="text-base sm:text-lg text-[var(--ink-secondary)] leading-relaxed">
                      {project.whatItDoes}
                    </p>
                  </div>

                  {/* Prominent Live Links Bar with Tactile Anime.js Pills */}
                  <div className="flex flex-wrap items-center gap-3 shrink-0 pt-2 lg:pt-0">
                    {project.links.map((link) => (
                      <TactilePill key={link.label}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-semibold bg-[var(--canvas)] border border-[var(--line)] text-[var(--ink-primary)] hover:border-[var(--accent-move)] hover:text-[var(--accent-move)] transition-all duration-200 shadow-sm min-h-[44px]"
                        >
                          <span>{link.label}</span>
                          <span className="text-xs text-[var(--accent-move)]" aria-hidden="true">
                            ↗
                          </span>
                        </a>
                      </TactilePill>
                    ))}
                  </div>
                </div>

                {/* Animated Tactile Specification Card */}
                <TactileCard className="p-6 sm:p-8 bg-[var(--canvas)] cursor-default">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-sm sm:text-base">
                      {/* Bullet 1: The Problem */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-move)]" />
                          <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--accent-move)] font-bold">
                            The Problem
                          </h4>
                        </div>
                        <p className="text-[var(--ink-secondary)] leading-relaxed pl-3.5 border-l border-[var(--line)]">
                          {project.problem}
                        </p>
                      </div>

                      {/* Bullet 2: What I Built */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-move)]" />
                          <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--accent-move)] font-bold">
                            What I Built
                          </h4>
                        </div>
                        <p className="text-[var(--ink-secondary)] leading-relaxed pl-3.5 border-l border-[var(--line)]">
                          {project.whatIBuilt}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Row: Tools Used + Measurable Benchmark */}
                    <div className="pt-6 border-t border-[var(--line)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      {/* Tools Used Pills with anime.js hover/touch bounce */}
                      <div className="space-y-2">
                        <span className="text-xs font-mono uppercase text-[var(--ink-muted)] block">
                          Tools &amp; Stack
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
                  </div>
                </TactileCard>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
