"use client";

import { useState, useEffect } from "react";
import { profile } from "@/lib/portfolio-data";

export function PortfolioNav() {
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "projects", "tech-stack", "experience", "education", "contact"];
      const scrollPosition = window.scrollY + 120;

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
    <header className="sticky top-0 z-40 w-full bg-[var(--canvas)] border-b border-[var(--line)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left: Name with tiny chess knight mark */}
        <a
          href="#hero"
          className="text-sm font-semibold tracking-tight text-[var(--ink-primary)] hover:text-white flex items-center gap-2 group"
        >
          <span>{profile.name}</span>
          <span className="text-xs text-[var(--accent-move)] select-none opacity-80 group-hover:opacity-100" aria-hidden="true">
            ♞
          </span>
        </a>

        {/* Right: 5 Section Text Links */}
        <nav aria-label="Main Navigation" className="flex items-center gap-4 sm:gap-6 text-xs font-medium">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`py-1 relative transition-colors ${
                  isActive
                    ? "text-[var(--ink-primary)]"
                    : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--accent-move)]"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
