"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workExperience, WorkItem } from "@/lib/portfolio-data";
import { TactileCard, TactilePill } from "./tactile-card";
import { ScrubStatement } from "./scrub-statement";

export function ExperienceSection() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    if (lineRef.current && containerRef.current) {
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 65%",
        end: "bottom 80%",
        scrub: true,
        animation: gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          { scaleY: 1, ease: "none" }
        ),
      });

      return () => {
        trigger.kill();
      };
    }
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      aria-label="Work Experience"
      className="relative z-20 py-20 sm:py-32 border-b border-[var(--line)] bg-[var(--surface)] text-[var(--ink-primary)] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[var(--accent-move)] tracking-widest uppercase">
              {"// 03 • INDUSTRY & INTERNSHIP"}
            </span>
            <span className="h-[1px] w-16 bg-[var(--line-strong)]" aria-hidden="true" />
          </div>
          <h2 className="lightup-heading text-[10vw] sm:text-[8vw] lg:text-[6.5vw] font-[family-name:var(--font-heading)] font-black tracking-[-0.03em] leading-[0.9] uppercase text-[var(--ink-primary)]">
            WORK EXPERIENCE
          </h2>
        </div>

        {/* Scroll-scrub Statement: Lights up word by word as you scroll */}
        <div className="max-w-4xl py-6 border-y border-[var(--line)]">
          <ScrubStatement text="Production software engineering contributions across reactive microservices, non-blocking APIs, and low-latency distributed storage." />
        </div>

        {/* Experience Rows with Sticky Left and Scroll-Drawn Center Guide Line */}
        <div className="space-y-12">
          {workExperience.map((item: WorkItem, idx: number) => (
            <div
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative"
            >
              {/* Left Column: Sticky Company & Role on Desktop */}
              <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start space-y-3">
                <span className="text-xs font-mono text-[var(--accent-move)] uppercase tracking-wider block font-bold">
                  {item.role}
                </span>
                <h3 className="text-2xl sm:text-3xl font-[family-name:var(--font-heading)] font-bold text-[var(--ink-primary)]">
                  {item.company}
                </h3>
                <TactilePill>
                  <div className="inline-block text-xs font-mono text-[var(--ink-muted)] px-3 py-1.5 rounded-lg bg-[var(--canvas)] border border-[var(--line)]">
                    {item.dates}
                  </div>
                </TactilePill>
              </div>

              {/* Center Scroll-Drawn Vertical Line (Desktop only) */}
              <div className="hidden lg:block lg:col-span-1 relative">
                <div className="absolute top-0 bottom-0 left-1/2 -ml-[1px] w-[2px] bg-[var(--line)]" />
                <div
                  ref={lineRef}
                  className="absolute top-0 bottom-0 left-1/2 -ml-[1px] w-[2px] bg-[var(--accent-move)] origin-top will-change-transform"
                />
              </div>

              {/* Right Column: Detailed Deliverables & Results inside Tactile Card */}
              <div className="lg:col-span-6 space-y-6">
                <TactileCard className="p-6 sm:p-8 bg-[var(--canvas)] space-y-6 cursor-default">
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-move)] font-semibold">
                      Core Technical Deliverables
                    </span>
                    <span className="text-xs font-mono text-[var(--ink-muted)]">
                      VERIFIED PRODUCTION
                    </span>
                  </div>

                  <ul className="space-y-4">
                    {item.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-4 text-base sm:text-lg leading-relaxed text-[var(--ink-secondary)]"
                      >
                        <span className="text-[var(--accent-move)] font-mono text-sm shrink-0 pt-1 font-bold">
                          0{bIdx + 1}
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </TactileCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
