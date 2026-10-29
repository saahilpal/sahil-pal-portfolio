"use client";

import {
  Cpu,
  CheckCircle2,
  ArrowUpRight,
  Database,
  Smartphone,
  Chrome,
} from "lucide-react";
import { animate } from "animejs";
import { projects } from "@/lib/portfolio-data";

export function ProjectsSection() {
  const handleCardHover = (el: HTMLElement) => {
    if (typeof window === "undefined") return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    animate(el, {
      translateY: -4,
      duration: 250,
      ease: "outQuad",
    });
  };

  const handleCardLeave = (el: HTMLElement) => {
    if (typeof window === "undefined") return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    animate(el, {
      translateY: 0,
      duration: 250,
      ease: "outQuad",
    });
  };

  const getProjectIcon = (category: string) => {
    if (category.includes("AI Systems") || category.includes("Agents")) {
      return <Cpu className="w-4 h-4 text-[var(--accent-emerald)]" />;
    }
    if (category.includes("Grounded RAG") || category.includes("Infrastructure")) {
      return <Database className="w-4 h-4 text-[var(--accent-cyan)]" />;
    }
    if (category.includes("Mobile")) {
      return <Smartphone className="w-4 h-4 text-amber-400" />;
    }
    return <Chrome className="w-4 h-4 text-[var(--accent-violet)]" />;
  };

  return (
    <section id="projects" className="py-16 sm:py-24 border-b border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-emerald)] uppercase tracking-wider font-semibold">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)]" />
            <span>01 // PRODUCTION SYSTEMS &amp; ARCHITECTURES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl">
            AI agents, grounded retrieval pipelines, context engines, and high-throughput systems engineered with formal verification and mathematical boundaries.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="space-y-8">
          {projects.map((project) => (
            <article
              key={project.id}
              onMouseEnter={(e) => handleCardHover(e.currentTarget)}
              onMouseLeave={(e) => handleCardLeave(e.currentTarget)}
              className="craft-card p-6 sm:p-8 space-y-6 transition-all duration-200"
            >
              {/* Card Header: Category, Title, Status & Links */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="pill-badge">
                      {getProjectIcon(project.category)}
                      <span>{project.category}</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accent-emerald-soft)] text-[var(--accent-emerald)] font-semibold border border-[var(--border-subtle)]">
                      {project.status}
                    </span>
                    {project.version && (
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">
                        {project.version}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--accent-emerald)] font-mono font-medium">
                    {project.tagline}
                  </p>
                </div>

                {/* Direct Action Links */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs py-1.5 px-3 rounded-lg font-medium inline-flex items-center gap-1.5 transition-colors ${
                        link.primary
                          ? "btn-emerald !py-1.5 !px-3 !text-xs"
                          : "btn-surface !py-1.5 !px-3 !text-xs"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Problem & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2">
                  <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                    <span className="text-red-400">●</span> Problem
                  </div>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2">
                  <div className="font-mono text-xs text-[var(--accent-emerald)] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                    <span className="text-[var(--accent-emerald)]">●</span> Engineering Solution
                  </div>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Architecture Highlights */}
              {project.architecture.highlights && (
                <div className="space-y-2.5">
                  <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                    Architectural Invariants &amp; Guarantees:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.architecture.highlights.map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-2 text-xs text-[var(--text-secondary)]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-emerald)] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer: Tech Stack & Metrics */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)]">
                {/* Stack Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-medium)] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metrics Badges */}
                {project.metrics && (
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="px-2.5 py-1 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-right"
                      >
                        <div className="text-[10px] text-[var(--text-muted)] font-mono">
                          {m.label}
                        </div>
                        <div className="text-xs font-bold text-[var(--accent-emerald)] font-mono">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
