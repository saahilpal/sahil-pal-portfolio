"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrubStatementProps {
  text: string;
  className?: string;
  start?: string;
  end?: string;
}

export function ScrubStatement({
  text,
  className = "text-xl sm:text-3xl lg:text-[2.25rem] font-[family-name:var(--font-heading)] font-bold leading-snug tracking-tight",
  start = "top 85%",
  end = "bottom 48%",
}: ScrubStatementProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll(".scrub-word");
    if (!words.length) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      end,
      scrub: 0.6,
      animation: gsap.to(words, {
        opacity: 1,
        color: "#FFFFFF",
        stagger: 0.04,
        ease: "none",
      }),
    });

    return () => {
      trigger.kill();
    };
  }, [start, end]);

  const words = text.split(" ");

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, idx) => (
        <span
          key={idx}
          className="scrub-word inline-block mr-[0.28em] text-[#636875] opacity-30 transition-colors will-change-[opacity,color]"
        >
          {word}
        </span>
      ))}
    </p>
  );
}
