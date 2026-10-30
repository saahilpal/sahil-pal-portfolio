"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/portfolio-data";
import { TactilePill } from "./tactile-card";

export function PortfolioNav() {
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const sections = ["hero", "projects", "tech-stack", "experience", "education", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Tech Stack", href: "#tech-stack", id: "tech-stack" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Education", href: "#education", id: "education" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--canvas)]/90 backdrop-blur-md border-b border-[var(--line)] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 h-16 flex items-center justify-between gap-4">
        {/* Left: Name with Chess Rating 1000 Elo badge */}
        <a
          href="#hero"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-[var(--ink-primary)] hover:text-white shrink-0 min-h-[44px]"
        >
          <span className="font-[family-name:var(--font-heading)] font-bold tracking-tight">
            {profile.name}
          </span>
          <TactilePill>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[var(--surface)] border border-[var(--line)] text-[var(--accent-move)] group-hover:border-[var(--accent-move)] group-hover:shadow-[0_0_12px_rgba(229,169,60,0.25)] transition-all">
              <span className="text-xs">♞</span>
              <span className="font-bold text-[var(--ink-primary)]">1000</span>
              <span className="text-[10px] text-[var(--ink-muted)]">RAPID</span>
            </span>
          </TactilePill>
        </a>

        {/* Right: 5 Section Text Links with sliding active indicator */}
        <nav
          aria-label="Main Navigation"
          className="relative flex items-center gap-1 sm:gap-4 overflow-x-auto no-scrollbar text-xs font-mono uppercase tracking-wider py-1"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <TactilePill key={item.id}>
                <a
                  href={item.href}
                  className={`relative px-2.5 py-2 rounded transition-colors duration-200 min-h-[44px] flex items-center ${
                    isActive
                      ? "text-[var(--accent-move)] font-bold"
                      : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-[var(--accent-move)] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </TactilePill>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
