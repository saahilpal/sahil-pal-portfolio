"use client";

import { useState, useEffect } from "react";
import { FileDown, Menu, X, ArrowUpRight, Github, Mail, FileText, CheckCircle2 } from "lucide-react";

export function ChessMasthead() {
  const [timeStr, setTimeStr] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeStr(`${now.toLocaleTimeString("en-GB", options)} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navSections = [
    { id: "moves", label: "01. ENGINES", desc: "4 Shipped Systems" },
    { id: "evals", label: "02. EVALS", desc: "Retrieval Accuracy & Latency" },
    { id: "blunders", label: "03. BLUNDERS", desc: "Production Incident Fixes" },
    { id: "skills", label: "04. STACK", desc: "Piece Values & Competencies" },
    { id: "opening-book", label: "05. ABOUT", desc: "Kristu Jayanti & Philosophy" },
    { id: "contact", label: "06. CONTACT", desc: "Email & Collaboration" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-chess-dark)]/95 backdrop-blur-md border-b border-[var(--border-chess)] transition-colors">
      {/* Top Telemetry Strip (Responsive: clean 1-line on both mobile & desktop) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 py-1.5 sm:py-2 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[var(--chess-nude-dark)] border-b border-[var(--border-chess)]/60">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-bold text-[var(--text-white)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--chess-green)] ring-2 ring-[var(--chess-green)]/20" />
            <span className="hidden sm:inline">SAHIL PAL //</span>
            <span>AI SYSTEMS &amp; BACKEND</span>
          </span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">{timeStr || "18:00:00 IST"}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-[var(--chess-green)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--chess-green)]" />
            <span>OPEN TO WORK</span>
          </span>
          <a
            href="mailto:saahilpal17@gmail.com"
            className="hover:text-[var(--text-white)] transition-colors hidden md:inline"
          >
            saahilpal17@gmail.com
          </a>
        </div>
      </div>

      {/* Main Navigation Banner */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <a
          href="#"
          className="group flex items-baseline gap-2 text-[var(--text-white)] btn-tactile shrink-0"
        >
          <span className="text-lg sm:text-2xl font-serif font-bold tracking-tight group-hover:text-[var(--chess-green)] transition-colors">
            SAHIL PAL
          </span>
          <span className="text-xs font-mono text-[var(--chess-green)] font-normal tracking-wider hidden lg:inline">
            / AI SYSTEMS
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 sm:gap-3 font-mono text-xs text-[var(--chess-nude-muted)]">
          {navSections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="btn-tactile animated-link-underline px-2 py-1 hover:text-[var(--text-white)] transition-colors"
            >
              {s.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons: Creative Resume CTA + Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Creative Top Resume Download CTA */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Sahil Pal Technical Resume (PDF, 75KB, ATS Verified)"
            className="group relative inline-flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3 py-1.5 rounded-sm bg-gradient-to-r from-[var(--bg-chess-card)] via-[#262420] to-[var(--bg-chess-surface)] hover:from-[#2e2b26] hover:to-[#35322b] border border-[var(--chess-green)]/45 hover:border-[var(--chess-green)] shadow-[0_0_12px_rgba(129,182,76,0.18)] hover:shadow-[0_0_24px_rgba(129,182,76,0.45)] transition-all duration-200 cursor-pointer overflow-hidden btn-tactile focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--chess-green)]"
          >
            {/* Shimmer light sweep */}
            <span
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"
              aria-hidden="true"
            />

            {/* Tactical Green Icon Badge */}
            <span className="relative flex items-center justify-center w-5 sm:w-6 h-5 sm:h-6 rounded-xs bg-[var(--chess-green)] text-black font-bold shadow-xs group-hover:scale-105 group-hover:bg-[var(--chess-green-hover)] transition-all duration-200 shrink-0">
              <FileDown size={13} className="stroke-[2.5] transition-transform duration-200 group-hover:translate-y-0.5" />
            </span>

            {/* Label & Metadata */}
            <div className="flex flex-col text-left leading-tight">
              <div className="flex items-center gap-1 font-mono font-bold text-[11px] sm:text-xs text-[var(--text-white)] group-hover:text-[var(--chess-green)] transition-colors tracking-wide">
                <span>RESUME</span>
                <span className="text-[9px] text-[var(--chess-green)] font-semibold">.PDF</span>
              </div>
              <span className="font-mono text-[9px] text-[var(--chess-nude-dark)] tracking-tight hidden sm:inline">
                ATS Verified • 75KB
              </span>
            </div>

            {/* Live Indicator Pill */}
            <span className="hidden xl:inline-flex items-center gap-1 pl-1.5 pr-1 py-0.5 rounded-xs bg-[var(--chess-green-subtle)] border border-[var(--border-green)] text-[9px] font-mono font-bold text-[var(--chess-green)] tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--chess-green)] animate-ping" />
              <span>GET</span>
            </span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden btn-tactile px-2.5 py-1.5 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-chess)] text-[var(--text-nude)] hover:text-white hover:border-[var(--chess-green)] transition-colors flex items-center gap-1.5 font-mono text-xs"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <>
                <X size={15} className="text-[var(--chess-green)]" />
                <span className="text-[11px] font-bold">CLOSE</span>
              </>
            ) : (
              <>
                <Menu size={15} />
                <span className="text-[11px] font-bold">MENU</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu (Smooth slide-down overlay) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--border-chess)] bg-[var(--bg-chess-card)]/98 backdrop-blur-xl px-4 py-5 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="font-mono text-[10px] text-[var(--chess-green)] font-bold uppercase tracking-wider flex items-center justify-between border-b border-[var(--border-chess)] pb-2">
            <span>PORTFOLIO SECTIONS</span>
            <span>NNUE // 60FPS</span>
          </div>

          {/* Navigation Links Grid */}
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
            {navSections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="w-full text-left p-2.5 rounded-sm bg-[var(--bg-chess-surface)] hover:bg-[var(--bg-chess-hover)] border border-[var(--border-chess)] hover:border-[var(--chess-green)] text-[var(--text-white)] transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-xs group-hover:text-[var(--chess-green)] transition-colors">
                    {s.label}
                  </div>
                  <div className="text-[10px] text-[var(--chess-nude-dark)] font-sans">
                    {s.desc}
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-[var(--chess-nude-dark)] group-hover:text-[var(--chess-green)] group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </nav>

          {/* Direct Resume Download & External Links for Mobile */}
          <div className="pt-2 border-t border-[var(--border-chess)] space-y-2">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-tactile py-2.5 px-4 rounded-sm bg-[var(--chess-green)] hover:bg-[var(--chess-green-hover)] text-black font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[var(--chess-green)]/20"
            >
              <FileDown size={14} className="stroke-[2.5]" />
              <span>DOWNLOAD RESUME (PDF • 75KB)</span>
            </a>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
              <a
                href="https://github.com/saahilpal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-sm bg-[var(--bg-chess-surface)] border border-[var(--border-chess)] text-[var(--chess-nude)] hover:text-white flex items-center justify-center gap-1.5"
              >
                <Github size={13} />
                <span>GITHUB</span>
              </a>
              <a
                href="mailto:saahilpal17@gmail.com"
                className="p-2 rounded-sm bg-[var(--bg-chess-surface)] border border-[var(--border-chess)] text-[var(--chess-nude)] hover:text-white flex items-center justify-center gap-1.5"
              >
                <Mail size={13} />
                <span>EMAIL ME</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
