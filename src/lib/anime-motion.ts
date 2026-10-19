"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface AnimationControls {
  pause?: () => void;
}

/**
 * Hook to animate an element into view using IntersectionObserver and Anime.js v4.
 */
export function useAnimeReveal<T extends HTMLElement = HTMLDivElement>(
  options: {
    delay?: number;
    duration?: number;
    translateY?: number;
    translateX?: number;
    scale?: number;
    threshold?: number;
    once?: boolean;
  } = {}
) {
  const ref = useRef<T>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isReducedMotion()) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    // Initial hidden state
    el.style.opacity = "0";
    const initialTranslateY = options.translateY ?? 24;
    const initialTranslateX = options.translateX ?? 0;
    el.style.transform = `translate3d(${initialTranslateX}px, ${initialTranslateY}px, 0)`;

    let animInstance: AnimationControls | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!options.once || !animatedRef.current)) {
            animatedRef.current = true;
            if (animInstance && typeof animInstance.pause === "function") {
              animInstance.pause();
            }

            animInstance = animate(el, {
              opacity: [0, 1],
              translateX: [initialTranslateX, 0],
              translateY: [initialTranslateY, 0],
              duration: options.duration ?? 750,
              delay: options.delay ?? 50,
              ease: "outCubic",
            }) as unknown as AnimationControls;

            if (options.once ?? true) {
              observer.unobserve(el);
            }
          }
        });
      },
      { threshold: options.threshold ?? 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animInstance && typeof animInstance.pause === "function") {
        animInstance.pause();
      }
    };
  }, [options.delay, options.duration, options.translateY, options.translateX, options.threshold, options.once]);

  return ref;
}

/**
 * Hook to trigger staggered entrance of children matching a selector.
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  selector: string,
  options: {
    staggerMs?: number;
    duration?: number;
    translateY?: number;
    threshold?: number;
  } = {}
) {
  const containerRef = useRef<T>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(selector);
    if (!items.length) return;

    if (isReducedMotion()) {
      items.forEach((item) => {
        const el = item as HTMLElement;
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    items.forEach((item) => {
      const el = item as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = `translate3d(0, ${options.translateY ?? 18}px, 0)`;
    });

    let animInstance: AnimationControls | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;

            animInstance = animate(items, {
              opacity: [0, 1],
              translateY: [options.translateY ?? 18, 0],
              delay: stagger(options.staggerMs ?? 70),
              duration: options.duration ?? 650,
              ease: "outCubic",
            }) as unknown as AnimationControls;

            observer.unobserve(container);
          }
        });
      },
      { threshold: options.threshold ?? 0.1 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (animInstance && typeof animInstance.pause === "function") {
        animInstance.pause();
      }
    };
  }, [selector, options.staggerMs, options.duration, options.translateY, options.threshold]);

  return containerRef;
}

/**
 * Hook for animated numerical telemetry readouts (e.g., latency, symbols count).
 */
export function useTelemetryCounter(
  targetValue: number,
  options: { duration?: number; prefix?: string; suffix?: string } = {}
) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isReducedMotion()) {
      el.textContent = `${options.prefix ?? ""}${targetValue}${options.suffix ?? ""}`;
      return;
    }

    const state = { val: 0 };
    const anim = animate(state, {
      val: targetValue,
      duration: options.duration ?? 1200,
      ease: "outCubic",
      onUpdate: () => {
        if (el) {
          el.textContent = `${options.prefix ?? ""}${Math.round(state.val)}${options.suffix ?? ""}`;
        }
      },
    }) as unknown as AnimationControls;

    return () => {
      if (anim && typeof anim.pause === "function") anim.pause();
    };
  }, [targetValue, options.duration, options.prefix, options.suffix]);

  return ref;
}
