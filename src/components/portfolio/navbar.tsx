"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Github,
  Linkedin,
  Menu,
  X,
} from "lucide-react";
import { profile } from "@/lib/portfolio-data";

export function PortfolioNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Tech Stack", href: "#stack" },
    { label: "Work", href: "#work" },
    { label: "College", href: "#college" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-[var(--bg-canvas)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Identity & Status Indicator */}
        <a
          href="#about"
          className="flex items-center gap-2.5 group shrink-0"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-emerald)] shrink-0" />
            <span className="absolute w-2.5 h-2.5 rounded-full bg-[var(--accent-emerald)] animate-ping opacity-75" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-emerald)] transition-colors">
              {profile.name}
            </span>
            <span className="text-[10px] text-[var(--accent-emerald)] font-mono tracking-wider hidden sm:inline">
              SOFTWARE ENGINEER // SYSTEMS
            </span>
          </div>
        </a>

        {/* Center: In-page Navigation (Desktop - guaranteed no overlap) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs text-[var(--text-secondary)] font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[var(--text-primary)] transition-colors py-1 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Social & Resume CTA (Desktop) */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--bg-surface-elevated)]"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--bg-surface-elevated)]"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={profile.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-emerald text-xs py-1.5 px-3.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Résumé</span>
          </a>
        </div>

        {/* Mobile Menu Button (< md) */}
        <div className="flex md:hidden items-center gap-2 shrink-0">
          <a
            href={profile.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-emerald text-xs py-1 px-2.5"
          >
            <FileText className="w-3 h-3" />
            <span>Résumé</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]/98 backdrop-blur-xl px-4 py-5 space-y-4 shadow-xl">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] font-medium transition-colors border border-[var(--border-subtle)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)]">
            <div className="flex items-center gap-3">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <a
              href={`mailto:${profile.links.email}`}
              className="text-xs font-mono text-[var(--accent-emerald)]"
            >
              {profile.links.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
