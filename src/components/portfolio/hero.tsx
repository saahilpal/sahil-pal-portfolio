"use client";

import { useEffect, useRef } from "react";
import {
  FileText,
  Github,
  Linkedin,
  Mail,
  Code2,
  ArrowUpRight,
} from "lucide-react";
import { animate, stagger } from "animejs";
import { profile } from "@/lib/portfolio-data";

export function PortfolioHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    // Smooth entry reveal
    if (containerRef.current) {
      animate(containerRef.current.children, {
        opacity: [0, 1],
        translateY: [24, 0],
        delay: stagger(120),
        duration: 700,
        ease: "outCubic",
      });
    }

    if (metricsRef.current) {
      animate(metricsRef.current.children, {
        opacity: [0, 1],
        scale: [0.95, 1],
        delay: stagger(100, { start: 400 }),
        duration: 600,
        ease: "outQuad",
      });
    }
  }, []);

  return (
    <section id="about" className="relative pt-16 sm:pt-24 pb-16 sm:pb-24 border-b border-[var(--border-subtle)] overflow-hidden">
      {/* Background Graphic */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: "url('/media/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[var(--bg-canvas)]/70 to-[var(--bg-canvas)] pointer-events-none" />

      <div ref={containerRef} className="relative z-10 space-y-10 max-w-5xl mx-auto">
        {/* Availability & Chess Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--accent-emerald-soft)] border border-[var(--border-subtle)] text-[var(--accent-emerald)] text-xs font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] animate-pulse" />
            <span>{profile.status}</span>
          </div>

          <a
            href="#stack"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-canvas)] border border-[var(--border-subtle)] hover:border-amber-400 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group cursor-pointer"
          >
            <span className="text-amber-400 group-hover:scale-110 transition-transform">♞</span>
            <span className="font-semibold text-[var(--text-primary)]">~1000 ELO (Rapid)</span>
            <span className="text-[var(--text-muted)] text-[11px] hidden sm:inline">&bull; 0 Blunders in Code</span>
            <span className="text-[10px] text-amber-400 underline decoration-dotted">Play Move &darr;</span>
          </a>
        </div>

        {/* Hero Title & Identity */}
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[var(--accent-emerald)] font-semibold">
              Software Engineer // Code Intelligence &amp; Distributed Backends
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text-primary)]">
              {profile.name}
            </h1>
          </div>
          <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-[var(--text-secondary)] tracking-tight max-w-4xl leading-snug">
            {profile.headline}
          </p>
        </div>

        {/* Concise About Me Summary */}
        <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed">
          {profile.summary}
        </p>

        {/* Social Links & Resume Button Row */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
          {/* Primary Resume Button */}
          <a
            href={profile.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-emerald text-sm py-2.5 px-5 shadow-lg group"
          >
            <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Download Résumé (PDF)</span>
          </a>

          {/* GitHub */}
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-surface text-sm py-2.5 px-4 group"
          >
            <Github className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* LinkedIn */}
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-surface text-sm py-2.5 px-4 group"
          >
            <Linkedin className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] transition-colors" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* LeetCode */}
          <a
            href={profile.links.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-surface text-sm py-2.5 px-4 group"
          >
            <Code2 className="w-4 h-4 text-[var(--text-muted)] group-hover:text-amber-400 transition-colors" />
            <span>LeetCode</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Email */}
          <a
            href={`mailto:${profile.links.email}`}
            className="btn-surface text-sm py-2.5 px-4 group"
          >
            <Mail className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-emerald)] transition-colors" />
            <span>Email Me</span>
          </a>
        </div>

        {/* 4 Key Verified Proof Metrics Bento */}
        <div
          ref={metricsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6"
        >
          {profile.keyMetrics.map((metric) => (
            <div
              key={metric.label}
              className="craft-card p-4 sm:p-5 flex flex-col justify-between space-y-2 group hover:border-[var(--accent-emerald)]"
            >
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[var(--accent-emerald)] tracking-tight">
                {metric.value}
              </div>
              <div className="space-y-1">
                <div className="text-xs font-semibold text-[var(--text-primary)]">
                  {metric.label}
                </div>
                <div className="text-[11px] text-[var(--text-muted)] leading-tight">
                  {metric.subtext}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
