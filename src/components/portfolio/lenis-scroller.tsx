"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function LenisScroller() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;

    if (!isReduced) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential decel
        touchMultiplier: 1.5,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const updateTicker = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);
    }

    // Dynamic Page Background Tone Transition as sections cross the viewport midpoint
    const sections = [
      { id: "hero", canvas: "#121315", surface: "#1B1D20" },
      { id: "projects", canvas: "#17191C", surface: "#212428" },
      { id: "tech-stack", canvas: "#0E0F11", surface: "#16181A" },
      { id: "experience", canvas: "#151719", surface: "#1E2024" },
      { id: "education", canvas: "#121315", surface: "#1B1D20" },
      { id: "contact", canvas: "#101113", surface: "#181A1D" },
    ];

    sections.forEach(({ id, canvas, surface }) => {
      const el = document.getElementById(id);
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => {
          document.documentElement.style.setProperty("--canvas", canvas);
          document.documentElement.style.setProperty("--surface", surface);
        },
        onEnterBack: () => {
          document.documentElement.style.setProperty("--canvas", canvas);
          document.documentElement.style.setProperty("--surface", surface);
        },
      });
    });

    // Smooth Anchor Navigation Integration
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!target) return;
      const hash = target.getAttribute("href");
      if (!hash || hash === "#") return;
      const element = document.querySelector(hash);
      if (element) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(element as HTMLElement, { offset: -64 });
        } else {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    // Initial Hash & Query Parameter Scroll Support
    const urlParams = new URLSearchParams(window.location.search);
    const scrollYParam = urlParams.get("scrollY");
    if (scrollYParam) {
      const y = parseInt(scrollYParam, 10);
      window.scrollTo(0, y);
      if (lenis) {
        lenis.scrollTo(y, { immediate: true });
      }
    } else {
      const targetSection = urlParams.get("section") || window.location.hash.replace("#", "");
      if (targetSection) {
        const targetEl = document.getElementById(targetSection);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "instant" });
          if (lenis) {
            lenis.scrollTo(targetEl, { immediate: true, offset: -64 });
          }
        }
      }
    }

    // Refresh after fonts load to ensure accurate pinning & heights
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return null;
}
