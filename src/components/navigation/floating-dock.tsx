"use client";

import { useState, useEffect } from "react";
import { Command, Sun, Moon, FileText, Send, Sparkles } from "lucide-react";

interface FloatingDockProps {
  onOpenCommandPalette: () => void;
}

export function FloatingDock({ onOpenCommandPalette }: FloatingDockProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [isLight, setIsLight] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLight(document.documentElement.classList.contains("light"));
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scrollspy
      const sections = ["hero", "projects", "architecture", "skills", "journey", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextLight = !isLight;
    setIsLight(nextLight);
    document.documentElement.classList.toggle("light", nextLight);
    localStorage.setItem("theme", nextLight ? "light" : "dark");
  };

  const navItems = [
    { id: "projects", label: "Work" },
    { id: "architecture", label: "Systems" },
    { id: "skills", label: "Stack" },
    { id: "journey", label: "Journey" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <div
        className={`pointer-events-auto flex items-center gap-1.5 sm:gap-3 p-1.5 sm:p-2 rounded-full border transition-all duration-500 shadow-2xl ${
          scrolled
            ? "bg-[#030712]/80 dark:bg-[#030712]/85 light:bg-white/85 backdrop-blur-2xl border-white/[0.12] light:border-black/[0.08] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]"
            : "bg-[#030712]/50 dark:bg-[#030712]/60 light:bg-white/70 backdrop-blur-xl border-white/[0.08] light:border-black/[0.05]"
        }`}
      >
        {/* Brand / Name Tag */}
        <a
          href="#"
          className="flex items-center gap-2 pl-3 pr-2 py-1 text-xs font-bold tracking-tight text-[var(--text-primary)] hover:text-cyan-400 transition-colors group"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="absolute w-4 h-4 rounded-full bg-cyan-400/30 animate-ping pointer-events-none" />
          </div>
          <span className="font-mono text-sm hidden sm:inline">
            sahil<span className="text-cyan-400">.</span>pal
          </span>
        </a>

        {/* Divider */}
        <div className="h-4 w-px bg-white/10 light:bg-black/10 mx-0.5" />

        {/* Navigation Links */}
        <nav className="flex items-center gap-0.5 sm:gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                  isActive
                    ? "text-white light:text-slate-900 font-semibold"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.04] light:hover:bg-black/[0.04]"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-white/[0.12] light:bg-black/[0.08] border border-white/[0.15] light:border-black/[0.1] -z-10 shadow-sm" />
                )}
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="h-4 w-px bg-white/10 light:bg-black/10 mx-0.5" />

        {/* Tools Array */}
        <div className="flex items-center gap-1">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] light:bg-black/[0.05] hover:bg-white/[0.12] light:hover:bg-black/[0.09] border border-white/[0.08] light:border-black/[0.06] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
            title="Open Command Palette (⌘K)"
          >
            <Command size={12} className="text-cyan-400" />
            <span className="hidden md:inline text-[11px]">⌘K</span>
          </button>

          {/* Technical CV */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.06] light:hover:bg-black/[0.05] transition-all"
            title="Download Verified Resume"
          >
            <FileText size={12} />
            <span className="text-[11px]">CV</span>
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full hover:bg-white/[0.08] light:hover:bg-black/[0.06] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            title="Toggle Light/Dark Theme"
            aria-label="Toggle Theme"
          >
            {isLight ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </div>
      </div>
    </header>
  );
}
