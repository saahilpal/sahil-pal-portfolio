"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Command, Menu, X, FileText } from "lucide-react";

interface SiteHeaderProps {
  onOpenCommandPalette: () => void;
}

export function SiteHeader({ onOpenCommandPalette }: SiteHeaderProps) {
  const [time, setTime] = useState("");
  const [isLight, setIsLight] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "light";
    }
    return false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Real-time clock in IST/local
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextIsLight = !isLight;
    setIsLight(nextIsLight);

    const doc = document as unknown as {
      startViewTransition?: (cb: () => void) => void;
    };

    if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      applyTheme(nextIsLight);
      return;
    }

    doc.startViewTransition(() => {
      applyTheme(nextIsLight);
    });
  };

  const applyTheme = (light: boolean) => {
    document.documentElement.classList.toggle("light", light);
    localStorage.setItem("theme", light ? "light" : "dark");
  };

  const navLinks = [
    { label: "WORK", href: "#projects", num: "01" },
    { label: "ARCHITECTURE", href: "#architecture", num: "02" },
    { label: "SKILLS", href: "#skills", num: "03" },
    { label: "JOURNEY", href: "#journey", num: "04" },
    { label: "CONTACT", href: "#contact", num: "05" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--color-bg)]/85 backdrop-blur-md border-b border-[var(--color-border)] py-2.5 shadow-sm"
            : "bg-transparent border-b border-transparent py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Left Brand & Telemetry */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="#"
              className="font-mono text-xs sm:text-sm font-bold tracking-tight text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-2 group"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <span>
                sahil<span className="text-[var(--color-accent)]">.</span>pal
              </span>
            </a>

            <div className="hidden md:flex items-center gap-3 pl-4 border-l border-[var(--color-border)] font-mono text-[10px] text-[var(--color-text-dim)]">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-accent)] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-ping" />
                SYS: NOMINAL
              </span>
              <span className="hidden lg:inline text-[var(--color-text-dim)]">
                {time ? `${time} IST` : "UTC+5:30"}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 font-mono text-xs">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors flex items-baseline gap-1 group py-1"
              >
                <span className="text-[9px] text-[var(--color-text-dim)] group-hover:text-[var(--color-accent)] transition-colors">
                  [{item.num}]
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] font-mono text-xs transition-all shadow-sm"
              title="Open Command Palette (Cmd+K)"
              aria-label="Open Command Palette"
            >
              <Command size={13} className="text-[var(--color-accent)]" />
              <span className="text-[11px]">DISPATCH</span>
              <kbd className="text-[9px] px-1 py-0.5 rounded bg-[var(--color-surface-elevated)] text-[var(--color-text-dim)] border border-[var(--color-border)]">
                ⌘K
              </kbd>
            </button>

            {/* Resume Button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border-active)] font-mono text-[11px] transition-colors"
              title="Download Sahil Pal Resume (PDF)"
            >
              <FileText size={13} className="text-[var(--color-text-dim)]" />
              <span>CV</span>
            </a>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
              title={`Switch to ${isLight ? "dark" : "light"} mode`}
              aria-label="Toggle theme"
            >
              {isLight ? <Moon size={14} /> : <Sun size={14} />}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 lg:hidden rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-[var(--color-bg)]/98 backdrop-blur-md pt-20 px-6 pb-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="font-mono text-xs text-[var(--color-text-dim)] uppercase tracking-wider pb-2 border-b border-[var(--color-border)] flex items-center justify-between">
              <span>NAVIGATION DIRECTORY</span>
              <span className="text-[var(--color-accent)]">SYS: NOMINAL</span>
            </div>
            <nav className="space-y-3 font-mono">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 text-base text-[var(--color-text)] hover:text-[var(--color-accent)] border-b border-[var(--color-border)]/50 transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[var(--color-accent)]">[{item.num}]</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-[var(--color-border)] font-mono text-xs">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="w-full py-2.5 px-3 rounded border border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-semibold flex items-center justify-center gap-2"
            >
              <Command size={14} />
              <span>LAUNCH COMMAND PALETTE</span>
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] flex items-center justify-center gap-2"
            >
              <FileText size={14} />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
