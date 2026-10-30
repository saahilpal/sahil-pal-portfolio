"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function LenisScroller() {
  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;

    if (!isReduced) {
      lenis = new Lenis({
        duration: 0.85,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.2,
        infinite: false,
      });

      let rafId: number;
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        lenis?.destroy();
      };
    }
  }, []);

  useEffect(() => {
    // Dynamic Page Background Tone Transition as sections cross the viewport midpoint
    const sections = [
      { id: "hero", canvas: "#121315", surface: "#1B1D20" },
      { id: "projects", canvas: "#17191C", surface: "#212428" },
      { id: "tech-stack", canvas: "#0E0F11", surface: "#16181A" },
      { id: "experience", canvas: "#151719", surface: "#1E2024" },
      { id: "education", canvas: "#121315", surface: "#1B1D20" },
      { id: "contact", canvas: "#101113", surface: "#181A1D" },
    ];

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sec = sections.find((s) => s.id === entry.target.id);
            if (sec) {
              document.documentElement.style.setProperty("--canvas", sec.canvas);
              document.documentElement.style.setProperty("--surface", sec.surface);
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    // Native C++ IntersectionObserver for Text Illumination: lights up as text moves into view, darkens when scrolled away
    const lightObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("text-illuminated");
          } else {
            entry.target.classList.remove("text-illuminated");
          }
        });
      },
      { rootMargin: "-8% 0px -15% 0px", threshold: 0.1 }
    );

    const lightElements = document.querySelectorAll(".lightup-heading, .lightup-text");
    lightElements.forEach((el) => lightObserver.observe(el));

    // Smooth Anchor Navigation Integration
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!target) return;
      const hash = target.getAttribute("href");
      if (!hash || hash === "#") return;
      const element = document.querySelector(hash);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      sectionObserver.disconnect();
      lightObserver.disconnect();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return null;
}
