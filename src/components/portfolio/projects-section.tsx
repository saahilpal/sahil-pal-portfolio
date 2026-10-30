"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Cpu,
  CheckCircle2,
  ArrowUpRight,
  Database,
  Smartphone,
  Chrome,
  Maximize2,
  X,
  FileCode2,
  Monitor,
  Terminal,
} from "lucide-react";
import { animate } from "animejs";
import { projects, Project } from "@/lib/portfolio-data";

export function ProjectsSection() {
  const [activeViews, setActiveViews] = useState<Record<string, "specs" | "preview">>({});
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggleView = (projectId: string, view: "specs" | "preview") => {
    setActiveViews((prev) => ({
      ...prev,
      [projectId]: view,
    }));

    // Trigger smooth Anime.js transition on content change
    const el = contentRefs.current[projectId];
    if (el) {
      animate(el, {
        opacity: [0, 1],
        translateY: [6, 0],
        duration: 250,
        ease: "outQuad",
      });
    }
  };

  const handleCardHover = (el: HTMLElement) => {
    if (typeof window === "undefined") return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    animate(el, {
      translateY: -3,
      duration: 200,
      ease: "outQuad",
    });
  };

  const handleCardLeave = (el: HTMLElement) => {
    if (typeof window === "undefined") return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    animate(el, {
      translateY: 0,
      duration: 200,
      ease: "outQuad",
    });
  };

  const getProjectIcon = (category: string) => {
    if (category.includes("AI Systems") || category.includes("Agents")) {
      return <Cpu className="w-4 h-4 text-[var(--accent-emerald)]" />;
    }
    if (category.includes("Context Engine") || category.includes("Infrastructure")) {
      return <Terminal className="w-4 h-4 text-[var(--accent-emerald)]" />;
    }
    if (category.includes("Grounded RAG")) {
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
            Deterministic code intelligence engines, AST-driven context retrieval, automated patch verification, and high-concurrency offline-first systems.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="space-y-10">
          {projects.map((project: Project) => {
            const currentView = activeViews[project.id] ?? "specs";

            return (
              <article
                key={project.id}
                onMouseEnter={(e) => handleCardHover(e.currentTarget)}
                onMouseLeave={(e) => handleCardLeave(e.currentTarget)}
                className="craft-card p-6 sm:p-8 space-y-6 transition-all duration-200"
              >
                {/* Card Top: Category, Title, Status & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="pill-badge">
                        {getProjectIcon(project.category)}
                        <span>{project.category}</span>
                      </span>

                      {/* Prominent ONGOING PROJECT or Production Badge */}
                      {project.isOngoing ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                          </span>
                          ACTIVE • ONGOING PROJECT
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accent-emerald-soft)] text-[var(--accent-emerald)] font-semibold border border-[var(--border-subtle)]">
                          {project.status}
                        </span>
                      )}

                      {project.version && (
                        <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-canvas)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                          {project.version}
                        </span>
                      )}

                      {project.chessRole && (
                        <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {project.chessRole}
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

                  {/* Actions & Tab Mode Toggle */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {/* View Switcher: Specs vs UI Preview */}
                    {project.image && (
                      <div className="flex items-center rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] p-0.5 text-xs font-mono">
                        <button
                          onClick={() => toggleView(project.id, "specs")}
                          className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                            currentView === "specs"
                              ? "bg-[var(--accent-emerald)] text-black font-semibold shadow-sm"
                              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                          }`}
                        >
                          <FileCode2 className="w-3.5 h-3.5" />
                          <span>Specs</span>
                        </button>
                        <button
                          onClick={() => toggleView(project.id, "preview")}
                          className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                            currentView === "preview"
                              ? "bg-[var(--accent-emerald)] text-black font-semibold shadow-sm"
                              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                          }`}
                        >
                          <Monitor className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </button>
                      </div>
                    )}

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

                {/* Animated Dynamic Content Container */}
                <div
                  ref={(el) => {
                    contentRefs.current[project.id] = el;
                  }}
                  className="space-y-6"
                >
                  {/* TAB 1: SPECIFICATION & ARCHITECTURAL INVARIANTS */}
                  {currentView === "specs" && (
                    <div className="space-y-6">
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
                    </div>
                  )}

                  {/* TAB 2: AUTHENTIC SYSTEM INTERFACE PREVIEW */}
                  {currentView === "preview" && project.image && (
                    <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-medium)] space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-[var(--text-muted)] border-b border-[var(--border-subtle)] pb-2.5">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                          </div>
                          <span className="font-semibold text-[var(--text-primary)] pl-1 truncate">
                            {project.name} &bull; System Interface View
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            setLightboxImage({
                              src: project.image!,
                              title: `${project.name} — High-Resolution Inspection`,
                            })
                          }
                          className="inline-flex items-center gap-1 text-[11px] text-[var(--accent-emerald)] hover:underline shrink-0"
                        >
                          <Maximize2 className="w-3 h-3" />
                          <span>Inspect Full Resolution</span>
                        </button>
                      </div>

                      <div
                        onClick={() =>
                          setLightboxImage({
                            src: project.image!,
                            title: `${project.name} — High-Resolution Inspection`,
                          })
                        }
                        className="relative w-full rounded-lg overflow-hidden bg-black/60 border border-[var(--border-subtle)] cursor-zoom-in group"
                      >
                        <div className="relative w-full h-52 sm:h-72 md:h-96">
                          <Image
                            src={project.image}
                            alt={`${project.name} Interface Screenshot`}
                            fill
                            className="object-contain p-2 group-hover:scale-[1.01] transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, 900px"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-black/80 text-white border border-white/20 backdrop-blur-sm shadow-lg inline-flex items-center gap-1.5">
                            <Maximize2 className="w-3.5 h-3.5 text-[var(--accent-emerald)]" />
                            Click to Inspect Fullscreen
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer: Tech Stack Pills & Verified Metrics */}
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
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal for Full-Resolution Screenshot Inspection */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[var(--bg-surface)] border border-[var(--border-medium)] rounded-2xl overflow-hidden shadow-2xl space-y-3 p-4"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 px-1">
              <span className="text-sm font-mono font-bold text-[var(--text-primary)]">
                {lightboxImage.title}
              </span>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative w-full h-[65vh] sm:h-[75vh] bg-black/60 rounded-xl overflow-hidden">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
