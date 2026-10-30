"use client";

import { useState } from "react";
import { projects, ProjectItem } from "@/lib/portfolio-data";

export function ProjectsSection() {
  const [expandedId, setExpandedId] = useState<string | null>("synapse");

  const toggleProject = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="py-14 sm:py-20 border-b border-[var(--line)]"
    >
      <div className="space-y-8 max-w-4xl">
        {/* Section Heading */}
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink-primary)]">
            Projects
          </h2>
          <p className="text-sm text-[var(--ink-secondary)]">
            Core systems I designed, implemented, and deployed.
          </p>
        </div>

        {/* Project List */}
        <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {projects.map((project: ProjectItem) => {
            const isExpanded = expandedId === project.id;

            return (
              <article key={project.id} className="py-6 space-y-4">
                {/* Header Row: Title, One-line summary, Expand button */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="space-y-1 max-w-2xl">
                    <h3 className="text-lg font-bold text-[var(--ink-primary)] tracking-tight">
                      {project.name}
                    </h3>
                    <p className="text-sm text-[var(--ink-secondary)]">
                      {project.whatItDoes}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0">
                    <button
                      onClick={() => toggleProject(project.id)}
                      aria-expanded={isExpanded}
                      className="text-xs font-semibold text-[var(--ink-primary)] hover:text-white underline text-underline-offset-4 cursor-pointer"
                    >
                      {isExpanded ? "Hide details" : "Read details"}
                    </button>

                    {project.links[0] && (
                      <a
                        href={project.links[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[var(--accent-move)] hover:underline"
                      >
                        {project.links[0].label}
                      </a>
                    )}
                  </div>
                </div>

                {/* Quick Tools Line */}
                <div className="text-xs font-mono text-[var(--ink-muted)]">
                  {project.toolsUsed.join(" / ")}
                </div>

                {/* Expanded Detailed Specification Sheet */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 rounded bg-[var(--surface)] border border-[var(--line)] space-y-4 mt-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-[var(--ink-primary)]">
                          The Problem
                        </div>
                        <p className="text-[var(--ink-secondary)] leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs font-bold text-[var(--ink-primary)]">
                          What I Built
                        </div>
                        <p className="text-[var(--ink-secondary)] leading-relaxed">
                          {project.whatIBuilt}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-bold text-[var(--ink-primary)]">Result: </span>
                        <span className="text-[var(--ink-secondary)]">{project.result}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 shrink-0">
                        {project.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-link"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
