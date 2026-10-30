"use client";

import { useState } from "react";
import { techStack, TechStackGroup } from "@/lib/portfolio-data";
import { TactileCard, TactilePill } from "./tactile-card";
import { ScrubStatement } from "./scrub-statement";

export function TechStackSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="tech-stack"
      aria-label="Tech Stack"
      className="relative z-20 py-20 sm:py-32 border-b border-[var(--line)] bg-[var(--canvas)] text-[var(--ink-primary)] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[var(--accent-move)] tracking-widest uppercase">
              {"// 02 • RUNTIME & FOUNDATIONS"}
            </span>
            <span className="h-[1px] w-16 bg-[var(--line-strong)]" aria-hidden="true" />
          </div>
          <h2 className="lightup-heading text-[10vw] sm:text-[8vw] lg:text-[6.5vw] font-[family-name:var(--font-heading)] font-black tracking-[-0.03em] leading-[0.9] uppercase text-[var(--ink-primary)]">
            TECH STACK
          </h2>
        </div>

        {/* Scroll-scrub Statement: Lights up word by word as you scroll */}
        <div className="max-w-4xl py-6 border-y border-[var(--line)]">
          <ScrubStatement text="I engineer deterministic systems — choosing robust runtimes, explicit schema contracts, and verifiable data flows over speculative hype." />
        </div>

        {/* Grouped Plain Text with Tactile Anime.js Cards & Skill Pills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {techStack.map((group: TechStackGroup, idx: number) => {
            const isHovered = hoveredIndex === idx;
            const isDimmed = hoveredIndex !== null && !isHovered;
            const skillTokens = group.skills.split(", ");

            return (
              <div
                key={group.category}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`transition-opacity duration-300 ${isDimmed ? "opacity-35" : "opacity-100"}`}
              >
                <TactileCard className={`p-6 sm:p-8 space-y-5 cursor-default transition-all duration-300 ${isHovered ? "border-[var(--accent-move)] shadow-2xl" : ""}`}>
                  {/* Corner Crosshairs */}
                  <span
                    className={`absolute top-3 left-3 text-[10px] font-mono transition-colors ${
                      isHovered ? "text-[var(--accent-move)]" : "text-[var(--line-strong)]"
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                  <span
                    className={`absolute top-3 right-3 text-[10px] font-mono transition-colors ${
                      isHovered ? "text-[var(--accent-move)]" : "text-[var(--line-strong)]"
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>

                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[var(--accent-move)] font-bold">
                      {group.category}
                    </h3>
                    <span className="text-xs font-mono text-[var(--ink-muted)]">
                      {"// 0" + (idx + 1)}
                    </span>
                  </div>

                  {/* Tactile Anime.js Pills for each skill token */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {skillTokens.map((token) => (
                      <TactilePill key={token}>
                        <span className="inline-block px-3 py-1.5 rounded-lg text-sm sm:text-base font-semibold bg-[var(--canvas)] border border-[var(--line)] text-[var(--ink-primary)] hover:border-[var(--accent-move)] hover:text-white transition-colors cursor-pointer select-none">
                          {token}
                        </span>
                      </TactilePill>
                    ))}
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
