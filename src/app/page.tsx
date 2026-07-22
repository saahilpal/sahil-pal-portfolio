"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  profile,
  projects,
  experience,
  skills,
  education,
} from "@/lib/portfolio-data";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Terminal,
  FileText,
  ChevronRight,
  Brain,
  Code2,
  Sun,
  Moon,
} from "lucide-react";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NeuralGraph } from "@/components/neural-graph";

// ── Lazy-load terminal for bundle splitting ──────────────────────────
const LazyTerminal = lazy(() =>
  import("@/components/portfolio/terminal-portfolio").then((m) => ({
    default: m.TerminalPortfolio,
  }))
);

// ═══════════════════════════════════════════════════════════════
// Custom Cursor & Spotlight (ref-based, zero re-renders)
// ═══════════════════════════════════════════════════════════════
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    let isMoving = false;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (!isMoving) {
        isMoving = true;
        dotRef.current?.classList.remove("opacity-0");
        ringRef.current?.classList.remove("opacity-0");
        spotlightRef.current?.classList.remove("opacity-0");
      }
      
      const transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
      if (dotRef.current) dotRef.current.style.transform = transform;
      if (ringRef.current) ringRef.current.style.transform = transform;
      if (spotlightRef.current) spotlightRef.current.style.transform = transform;
    };

    const handleMouseLeaveWindow = () => {
      dotRef.current?.classList.add("opacity-0");
      ringRef.current?.classList.add("opacity-0");
      spotlightRef.current?.classList.add("opacity-0");
      isMoving = false;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const isInteractive =
        target.closest(
          'a, button, [role="button"], .group, input, textarea'
        ) !== null;
      if (isInteractive) {
        const isSynapCard =
          target.closest(".project-card-synap") !== null;
        ringRef.current?.setAttribute(
          "data-cursor",
          isSynapCard ? "interactive-synap" : "interactive"
        );
      } else if (
        target.closest("p, h1, h2, h3, h4, li, span") &&
        !isInteractive
      ) {
        ringRef.current?.setAttribute("data-cursor", "text");
      } else {
        ringRef.current?.setAttribute("data-cursor", "default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[5] opacity-0 mix-blend-soft-light transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle, rgba(var(--accent-rgb), 0.15) 0%, transparent 70%)",
        }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring fixed top-0 left-0 rounded-full pointer-events-none z-[9999] opacity-0 transition-[transform,width,height,background-color,border-radius,border-color] duration-[80ms,250ms,250ms,250ms,250ms,250ms] ease-out"
        data-cursor="default"
      />
      <div
        ref={dotRef}
        className="custom-cursor fixed top-0 left-0 w-1.5 h-1.5 bg-accent rounded-full pointer-events-none z-[10000] opacity-0 transition-opacity duration-200"
      />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// Magnetic (spring-pull hover for social links)
// ═══════════════════════════════════════════════════════════════
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    if (distance < 60) {
      setPosition({ x: mouseX * 0.35, y: mouseY * 0.35 });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Theme Toggle (dark ↔ light) with circular transition
// ═══════════════════════════════════════════════════════════════
function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggle = (event: React.MouseEvent) => {
    const isNextLight = !isLight;

    // Check if browser supports View Transitions API
    if (
      !(document as any).startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      applyTheme(isNextLight);
      return;
    }

    const transition = (document as any).startViewTransition(() => {
      applyTheme(isNextLight);
    });

    transition.ready.then(() => {
      // Sunrise: Expansion from bottom center
      // Sunset: Expansion from top center
      const sunrisePath = [
        "circle(0% at 50% 100%)",
        "circle(150% at 50% 100%)",
      ];
      const sunsetPath = [
        "circle(0% at 50% 0%)",
        "circle(150% at 50% 0%)",
      ];

      document.documentElement.animate(
        {
          clipPath: isNextLight ? sunrisePath : sunsetPath,
        },
        {
          duration: 800,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: isNextLight
            ? "::view-transition-new(root)"
            : "::view-transition-old(root)",
        }
      );
    });
  };

  const applyTheme = (light: boolean) => {
    setIsLight(light);
    document.documentElement.classList.toggle("light", light);
    localStorage.setItem("theme", light ? "light" : "dark");
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-accent hover:border-accent transition-all duration-300 relative z-50"
      title="Toggle theme"
      aria-label="Toggle light/dark theme"
    >
      {isLight ? (
        <Moon size={14} strokeWidth={1.5} />
      ) : (
        <Sun size={14} strokeWidth={1.5} />
      )}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// Sticky Navigation with active section indicator
// ═══════════════════════════════════════════════════════════════
function Navbar({ onToggleTerminal }: { onToggleTerminal: () => void }) {
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Skills", id: "skills" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 inset-x-0 z-45 transition-all duration-500",
          scrolled
            ? "bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)] py-2 shadow-lg"
            : "bg-transparent border-b border-transparent py-4"
        )}
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="#about"
              className="font-mono text-sm font-bold tracking-tight text-[var(--color-text)] hover:text-accent transition-colors flex items-center gap-2 group relative"
            >
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse group-hover:scale-125 transition-transform" />
              <span className="relative">
                sahil<span className="text-accent">.</span>pal
                <span className="absolute inset-0 text-accent opacity-0 group-hover:opacity-100 group-hover:animate-glitch-1 pointer-events-none select-none">sahil.pal</span>
                <span className="absolute inset-0 text-violet opacity-0 group-hover:opacity-100 group-hover:animate-glitch-2 pointer-events-none select-none">sahil.pal</span>
              </span>
            </a>
            
            <div className="hidden md:flex items-center gap-4 border-l border-[var(--color-border)] pl-6 font-mono text-[10px] text-[var(--color-text-dim)] uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2 px-2.5 py-1 bg-accent/5 border border-accent/20 rounded-md">
                <span className="w-1.5 h-1.5 bg-[#00ff41] rounded-full animate-pulse shadow-[0_0_5px_#00ff41]" />
                <span className="text-accent font-semibold tracking-widest text-[9px] drop-shadow-sm">AVAILABLE FOR HIRE</span>
              </div>
              <div className="hidden lg:flex items-center gap-2">
                <span className="w-1 h-1 bg-accent/40 rounded-full" />
                <span>{time}</span>
              </div>
            </div>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8 font-mono text-xs">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={cn(
                  "relative py-1 transition-all duration-300 hover:text-accent group/nav",
                  activeSection === link.id
                    ? "text-accent font-semibold"
                    : "text-[var(--color-text-muted)]"
                )}
              >
                <span className="opacity-0 group-hover/nav:opacity-50 mr-1 text-accent transition-opacity">/</span>
                {link.name.toLowerCase()}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="active-nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Right-side buttons */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <button
              onClick={onToggleTerminal}
              className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-muted)] hover:text-accent transition-colors bg-[var(--color-surface)] px-3 py-1.5 rounded-md border border-[var(--color-border)] hover:border-accent group shadow-sm relative overflow-hidden"
              title="Toggle Terminal (Ctrl + ~)"
            >
              <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Terminal size={14} strokeWidth={1.5} className="relative z-10" />
              <span className="hidden sm:flex items-center gap-1 relative z-10">
                <span className="opacity-50">EXE</span>
              </span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden flex-col items-center justify-center gap-1.5 w-8 h-8 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-accent hover:border-accent transition-colors z-50"
              aria-label="Toggle menu"
            >
              <span
                className={cn(
                  "w-4 h-[1.5px] bg-current transition-transform duration-300",
                  mobileMenuOpen && "translate-y-[4.5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "w-4 h-[1.5px] bg-current transition-opacity duration-300",
                  mobileMenuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "w-4 h-[1.5px] bg-current transition-transform duration-300",
                  mobileMenuOpen && "-translate-y-[4.5px] -rotate-45"
                )}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[var(--color-bg)] md:hidden flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8 font-mono text-xl">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: idx * 0.08, ease: "easeOut" }}
                  className={cn(
                    "text-[var(--color-text-muted)] hover:text-accent transition-colors py-2 relative",
                    activeSection === link.id && "text-accent"
                  )}
                >
                  <span className="opacity-50 mr-2 text-accent">//</span>
                  {link.name.toLowerCase()}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// Project Card (3D tilt + glow, ref-based for zero re-renders)
// ═══════════════════════════════════════════════════════════════
function ProjectCard({ project, idx }: { project: any; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const Icon = project.name.includes("RAG") ? Brain : Code2;
  const isSynap = project.name === "Synap";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const rX = -((mouseY - rect.height / 2) / (rect.height / 2)) * 4;
    const rY = ((mouseX - rect.width / 2) / (rect.width / 2)) * 4;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) translateY(-6px)`;
    cardRef.current.style.boxShadow = isSynap
      ? `0 20px 50px rgba(var(--violet-rgb), 0.1)`
      : `0 20px 50px rgba(var(--accent-rgb), 0.05)`;

    if (glowRef.current) {
      glowRef.current.style.background = isSynap
        ? `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(var(--violet-rgb), 0.08), transparent 40%)`
        : `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(var(--accent-rgb), 0.04), transparent 40%)`;
      glowRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
      cardRef.current.style.boxShadow = "";
    }
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative p-6 md:p-8 rounded-xl bg-[var(--color-surface-50)] border transition-all duration-300 overflow-hidden z-10",
        isSynap
          ? "border-violet/20 hover:border-violet/40 project-card-synap"
          : "border-[var(--color-border)] hover:border-[var(--color-border-hover)]",
        "shadow-sm hover:shadow-xl light:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      )}
      style={{
        transform:
          "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition:
          "transform 0.1s ease-out, box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Left accent wipe */}
      <span
        className={cn(
          "absolute left-0 top-0 bottom-0 w-[2px] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-200 ease-out z-20",
          isSynap ? "bg-violet" : "bg-accent"
        )}
      />

      {/* Mouse-tracking glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
      />

      {/* Translucent index */}
      <div className="absolute right-4 bottom-4 font-mono font-black text-8xl select-none pointer-events-none z-0 leading-none text-[var(--color-text)] opacity-[0.04]">
        {`0${idx + 1}`}
      </div>

      {/* Featured badge (Synap only) */}
      {isSynap && (
        <div className="absolute top-4 right-4 md:top-6 md:right-8 z-20">
          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider bg-violet/15 text-violet-soft border border-violet/30 uppercase">
            Featured Project
          </span>
        </div>
      )}

      {/* Background icon */}
      <div className="absolute -top-4 -right-4 p-4 opacity-[0.02] pointer-events-none transition-transform group-hover:scale-105 group-hover:-rotate-3 duration-700 z-0">
        <Icon size={180} strokeWidth={1} />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <div
              className={cn(
                "font-mono text-xs mb-2 tracking-wide uppercase",
                isSynap ? "text-violet-soft" : "text-accent"
              )}
            >
              {project.type}
            </div>
            <h3
              className={cn(
                "text-2xl font-bold text-[var(--color-text)] transition-colors",
                isSynap
                  ? "group-hover:text-violet-soft"
                  : "group-hover:text-accent"
              )}
            >
              {project.name}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            {project.links.map((link: any, lIdx: number) => (
              <a
                key={lIdx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 text-[var(--color-text-muted)] rounded-md transition-all duration-300 hover:bg-[var(--color-surface-hover)] group/link",
                  isSynap
                    ? "hover:text-violet-soft"
                    : "hover:text-accent"
                )}
                title={link.label}
              >
                {link.label === "GitHub" ? (
                  <Github
                    size={20}
                    strokeWidth={1.5}
                    className="transition-transform group-hover/link:-translate-y-0.5"
                  />
                ) : (
                  <ExternalLink
                    size={20}
                    strokeWidth={1.5}
                    className="transition-transform group-hover/link:rotate-45 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  />
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Highlights box — no backdrop-blur for performance */}
        <div className="bg-[var(--color-bg)] p-5 rounded-lg border border-[var(--color-border)] mb-6 text-[var(--color-text-muted)] text-sm leading-relaxed space-y-3 relative z-10 group-hover:border-[var(--color-border-hover)] transition-colors duration-300">
          {project.highlights.map((highlight: string, hIdx: number) => (
            <div key={hIdx} className="flex items-start gap-3">
              <ChevronRight
                size={16}
                strokeWidth={1.5}
                className={cn(
                  "shrink-0 mt-0.5 opacity-70",
                  isSynap ? "text-violet-soft" : "text-accent"
                )}
              />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-2.5 font-mono text-[11px] text-[var(--color-text-dim)]">
          {project.stack.map((tech: string, tIdx: number) => (
            <span
              key={tIdx}
              className="px-2 py-1 rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)] hover:scale-105 hover:bg-[var(--color-border)] hover:text-[var(--color-text)] transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Text Scramble Effect (High-tech decryption feel)
// ═══════════════════════════════════════════════════════════════
function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const [isScrambling, setIsScrambling] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
      scramble();
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, []);

  const scramble = async () => {
    if (isScrambling) return;
    setIsScrambling(true);
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span 
      onMouseEnter={() => !isScrambling && scramble()}
      className="cursor-default"
    >
      {displayText}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════
// Main Portfolio Page
// ═══════════════════════════════════════════════════════════════
export default function Portfolio() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  // Console Easter Egg
  useEffect(() => {
    console.log(
      `%c 🚀 SAHIL.OS LOADED %c\n\n%c  _____       _     _ _ \n / ____|     | |   (_) |\n| (___   __ _| |__  _| |\n \\___ \\ / _\` | '_ \\| | |\n ____) | (_| | | | | | |\n|_____/ \\__,_|_| |_|_|_|\n\n%cGreetings, curious dev! 👋\nFeel free to explore the kernel.`,
      "background: #007aff; color: white; padding: 4px 12px; border-radius: 4px; font-weight: bold;",
      "",
      "color: #007aff; font-weight: bold;",
      "color: #888;"
    );
  }, []);

  // Keyboard shortcut for terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "`" || e.key === "~")) {
        e.preventDefault();
        setShowTerminal((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Scroll indicator hide
  useEffect(() => {
    const handleScroll = () => setScrolledPastHero(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP ScrollTrigger for experience timeline
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-active-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".experience-timeline",
            start: "top 70%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );
      gsap.utils.toArray(".timeline-dot").forEach((dot: any) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: "sine.out",
            scrollTrigger: {
              trigger: dot,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  // ── Animation variants ──
  const titleCharVariants: any = {
    hidden: { y: "100%", opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2 + i * 0.025,
      },
    }),
  };

  const socialItemVariants: any = {
    hidden: { y: "20px", opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: 1.1 + i * 0.07,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] relative">
      {/* ── Inline styles (orbs, cursor, shimmer) ── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .gradient-shimmer {
            background: linear-gradient(
              120deg,
              var(--color-text) 0%,
              var(--color-text) 35%,
              #3b82f6 50%,
              var(--t-violet) 65%,
              var(--color-text) 80%,
              var(--color-text) 100%
            );
            background-size: 200% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer-sweep 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: 0.2s;
          }
          @keyframes shimmer-sweep {
            0% { background-position: 150% 0; }
            100% { background-position: -50% 0; }
          }

          /* Ambient orbs — NO blur filter for GPU perf */
          .bg-orb {
            position: absolute;
            border-radius: 50%;
            opacity: 0.06;
            pointer-events: none;
          }
          html.light .bg-orb {
            opacity: 0.03;
          }
          .orb-blue {
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(59,130,246,0.12) 40%, transparent 70%);
            animation: drift-blue 20s ease-in-out infinite alternate;
          }
          .orb-violet {
            width: 650px;
            height: 650px;
            background: radial-gradient(circle, rgba(var(--violet-rgb),0.5) 0%, rgba(var(--violet-rgb),0.12) 40%, transparent 70%);
            animation: drift-violet 25s ease-in-out infinite alternate;
          }
          @keyframes drift-blue {
            0% { transform: translate3d(-10%, -10%, 0) scale(1); }
            100% { transform: translate3d(30%, 20%, 0) scale(1.15); }
          }
          @keyframes drift-violet {
            0% { transform: translate3d(20%, 30%, 0) scale(1.1); }
            100% { transform: translate3d(-20%, -10%, 0) scale(0.9); }
          }

          /* Custom cursor ring states */
          .custom-cursor-ring {
            width: 32px;
            height: 32px;
            border: 1px solid var(--t-accent);
            background-color: transparent;
            border-radius: 50%;
          }
          html.light .custom-cursor-ring {
            border-width: 1.5px;
          }
          .custom-cursor-ring[data-cursor="interactive"] {
            width: 56px;
            height: 56px;
            background-color: rgba(var(--accent-rgb), 0.15);
            border-color: transparent;
          }
          html.light .custom-cursor-ring[data-cursor="interactive"] {
            background-color: rgba(var(--accent-rgb), 0.08);
            border: 1px solid rgba(var(--accent-rgb), 0.2);
          }
          .custom-cursor-ring[data-cursor="interactive-synap"] {
            width: 56px;
            height: 56px;
            background-color: rgba(var(--violet-rgb), 0.25);
            border-color: transparent;
          }
          html.light .custom-cursor-ring[data-cursor="interactive-synap"] {
            background-color: rgba(var(--violet-rgb), 0.12);
            border: 1px solid rgba(var(--violet-rgb), 0.2);
          }
          .custom-cursor-ring[data-cursor="text"] {
            width: 24px;
            height: 2px;
            border-radius: 0;
            background-color: var(--t-accent);
            border-color: transparent;
          }

          @keyframes glitch-1 {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
          }
          @keyframes glitch-2 {
            0% { transform: translate(0); }
            20% { transform: translate(2px, -2px); }
            40% { transform: translate(2px, 2px); }
            60% { transform: translate(-2px, -2px); }
            80% { transform: translate(-2px, 2px); }
            100% { transform: translate(0); }
          }
          .animate-glitch-1 {
            animation: glitch-1 0.2s infinite linear;
          }
          .animate-glitch-2 {
            animation: glitch-2 0.2s infinite linear reverse;
          }
        `,
        }}
      />

      {/* Neural Graph background canvas */}
      <NeuralGraph />

      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="bg-orb orb-blue absolute top-[10%] left-[5%] md:left-[15%]" />
        <div className="bg-orb orb-violet absolute top-[40%] right-[5%] md:right-[15%]" />
      </div>

      {/* Custom cursor */}
      <CustomCursor />

      {/* Terminal overlay (lazy loaded) */}
      {showTerminal && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-50 bg-[#0a0a0a]/95" />
          }
        >
          <div className="fixed inset-0 z-50 bg-[#0a0a0a]/95 transition-all duration-300">
            <button
              onClick={() => setShowTerminal(false)}
              className="absolute top-4 right-4 z-[60] p-2 bg-[#222] hover:bg-[#333] rounded-md border border-[#333] text-sm text-[#a1a1aa] hover:text-white transition-colors font-mono flex items-center gap-2 shadow-lg"
            >
              <span className="text-[#00ff41]">exit</span> terminal
            </button>
            <LazyTerminal onExit={() => setShowTerminal(false)} />
          </div>
        </Suspense>
      )}

      {/* Navigation */}
      <Navbar onToggleTerminal={() => setShowTerminal(true)} />

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24 space-y-32 relative z-10">
        {/* ────────────────────────────────────────
            HERO SECTION
            ──────────────────────────────────────── */}
        <motion.section
          id="about"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 min-h-[75vh] flex flex-col justify-center scroll-mt-32 relative"
        >
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-accent font-mono text-sm mb-4 tracking-wide"
            >
              Hi, my name is
            </motion.div>

            {/* Name — character-by-character reveal */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--color-text)] flex flex-wrap leading-tight">
              {Array.from(profile.name).map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={titleCharVariants}
                  className={cn(
                    "inline-block whitespace-pre",
                    char !== " " && "gradient-shimmer"
                  )}
                >
                  {char}
                </motion.span>
              ))}
            </h1>

            {/* Role — word-level animation (perf: fewer DOM nodes) */}
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text-muted)] leading-tight flex flex-wrap">
              {profile.role.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.4 + i * 0.1,
                  }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          </div>

          {/* Bio — single fade-in (perf: 1 element vs 30+) */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
            className="text-lg leading-relaxed max-w-xl text-[var(--color-text-muted)]"
          >
            {profile.summary}
          </motion.p>

          {/* Social CTAs */}
          <div className="flex flex-wrap gap-4 pt-6">
            <SocialLink
              idx={0}
              href={profile.links.github}
              icon={<Github size={18} strokeWidth={1.5} />}
              label="GitHub"
              variants={socialItemVariants}
            />
            <SocialLink
              idx={1}
              href={profile.links.linkedin}
              icon={<Linkedin size={18} strokeWidth={1.5} />}
              label="LinkedIn"
              variants={socialItemVariants}
            />
            <SocialLink
              idx={2}
              href={`mailto:${profile.links.email}`}
              icon={<Mail size={18} strokeWidth={1.5} />}
              label="Email"
              variants={socialItemVariants}
            />
            <SocialLink
              idx={3}
              href={profile.links.resume}
              icon={<FileText size={18} strokeWidth={1.5} />}
              label="Resume"
              variants={socialItemVariants}
            />
          </div>

          {/* Bouncing scroll indicator */}
          <AnimatePresence>
            {!scrolledPastHero && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 0.6, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="absolute bottom-[-10vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[9px] text-[var(--color-text-muted)] tracking-widest pointer-events-none"
              >
                <span className="w-5 h-8 border border-[var(--color-border)] rounded-full flex justify-center p-1">
                  <motion.span
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-1 h-1.5 bg-accent rounded-full"
                  />
                </span>
                <span>SCROLL</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* ────────────────────────────────────────
            PROJECTS
            ──────────────────────────────────────── */}
        <motion.section
          id="projects"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10 scroll-mt-32"
        >
          <div className="flex items-baseline gap-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-baseline gap-3 text-[var(--color-text)]">
              <motion.span
                initial={{ scale: 1 }}
                whileInView={{ scale: [1, 1.04, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="text-accent font-mono text-lg md:text-xl font-normal"
              >
                01.
              </motion.span>
              <motion.span
                initial={{
                  clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                }}
                whileInView={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <ScrambleText text="Projects" delay={0.2} />
              </motion.span>
            </h2>
            <div className="h-px bg-[var(--color-border)] flex-grow mb-2" />
          </div>

          <div className="grid gap-8">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} idx={idx} project={project} />
            ))}
          </div>
        </motion.section>

        {/* ────────────────────────────────────────
            EXPERIENCE
            ──────────────────────────────────────── */}
        <motion.section
          id="experience"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10 scroll-mt-32"
        >
          <div className="flex items-baseline gap-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-baseline gap-3 text-[var(--color-text)]">
              <span className="text-accent font-mono text-lg md:text-xl font-normal">
                02.
              </span>
              <span><ScrambleText text="Experience" delay={0.2} /></span>
            </h2>
            <div className="h-px bg-[var(--color-border)] flex-grow mb-2" />
          </div>

          <div className="relative pl-4 md:pl-8 experience-timeline">
            {/* Timeline track */}
            <div className="absolute left-[16px] md:left-[32px] top-1.5 bottom-4 w-px bg-[var(--color-border-hover)] z-0">
              <div className="timeline-active-line w-full h-full bg-accent origin-top scale-y-0" />
            </div>

            <div className="space-y-12 relative z-10">
              {experience.map((job, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative pl-8 pb-4 group"
                >
                  {/* Timeline dot */}
                  <div className="timeline-dot absolute w-3.5 h-3.5 bg-[var(--color-bg)] border-2 border-accent rounded-full -left-[7px] top-1.5 z-10 scale-0 transition-shadow duration-500"
                    style={{ boxShadow: "var(--shadow-glow)" }}
                  />

                  <div className="space-y-2 mb-5">
                    <h3 className="text-xl font-bold text-[var(--color-text)] group-hover:text-accent transition-colors">
                      {job.role}
                    </h3>
                    <div className="text-md text-accent font-medium tracking-wide">
                      {job.company}
                    </div>
                    <div className="text-sm text-[var(--color-text-dim)] font-mono">
                      {job.date}
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-[var(--color-text-muted)] leading-relaxed mb-5">
                    {job.highlights.map(
                      (highlight: string, hIdx: number) => (
                        <motion.div
                          key={hIdx}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: hIdx * 0.06 }}
                          className="flex items-start gap-3"
                        >
                          <ChevronRight
                            size={16}
                            strokeWidth={1.5}
                            className="text-accent shrink-0 mt-0.5 opacity-70"
                          />
                          <span>{highlight}</span>
                        </motion.div>
                      )
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2.5 font-mono text-[11px] text-[var(--color-text-dim)]">
                    {job.stack.map((tech: string, tIdx: number) => (
                      <span
                        key={tIdx}
                        className="px-2 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)] hover:scale-105 hover:bg-[var(--color-border)] hover:text-[var(--color-text)] transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ────────────────────────────────────────
            SKILLS & EDUCATION
            ──────────────────────────────────────── */}
        <motion.section
          id="skills"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10 scroll-mt-32"
        >
          <div className="flex items-baseline gap-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-baseline gap-3 text-[var(--color-text)]">
              <span className="text-accent font-mono text-lg md:text-xl font-normal">
                03.
              </span>
              <span><ScrambleText text="Skills & Education" delay={0.2} /></span>
            </h2>
            <div className="h-px bg-[var(--color-border)] flex-grow mb-2" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Skills */}
            <div className="space-y-8">
              {skills.map((skillGroup, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="relative inline-block pb-1">
                    <h4 className="text-sm font-mono text-accent uppercase tracking-wider">
                      {skillGroup.category}
                    </h4>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute bottom-0 left-0 right-0 h-px bg-accent origin-left"
                    />
                  </div>

                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                      hidden: {},
                      visible: {
                        transition: { staggerChildren: 0.04 },
                      },
                    }}
                    className="flex flex-wrap gap-2"
                  >
                    {skillGroup.items.map((skill: string, sIdx: number) => (
                      <motion.span
                        key={sIdx}
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: 0.4,
                              ease: "easeOut",
                            },
                          },
                        }}
                        className="text-xs font-mono text-[var(--color-text-muted)] bg-[var(--color-surface-50)] px-3 py-1.5 rounded-full border border-[var(--color-border)] hover:border-accent hover:bg-accent/5 hover:text-[var(--color-text)] hover:scale-105 transition-all duration-150 ease-out"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-6">
              {education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="p-6 rounded-xl bg-[var(--color-surface-50)] border border-[var(--color-border)] hover:border-accent transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                  <div className="relative z-10">
                    <div className="text-accent font-mono text-xs mb-2 font-semibold">
                      {edu.date}
                    </div>
                    <h3 className="font-bold text-lg text-[var(--color-text)] mb-1 group-hover:text-accent transition-colors">
                      {edu.degree}
                    </h3>
                    <div className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {edu.school}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ────────────────────────────────────────
            FOOTER
            ──────────────────────────────────────── */}
        <footer className="relative pt-20 pb-12 mt-32 z-10">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent"
          />

          <div className="grid md:grid-cols-2 gap-12 items-end">
            <div className="space-y-6">
              <div className="font-mono">
                <div className="text-accent text-xs mb-2 tracking-widest uppercase">Contact</div>
                <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">Let&apos;s build the future.</h2>
                <p className="text-[var(--color-text-muted)] max-w-sm leading-relaxed">
                  Always open to discussing high-impact projects, innovative architectures, or technical collaborations.
                </p>
              </div>
              
              <div className="flex gap-3">
                <a
                  href={`mailto:${profile.links.email}`}
                  className="px-6 py-3 border border-accent/40 bg-accent/5 text-accent font-mono text-xs uppercase tracking-[0.2em] rounded-lg hover:bg-accent/10 hover:border-accent hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.15)] transition-all duration-300 active:scale-95"
                >
                  Get in touch
                </a>
                <button
                   onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                   className="p-3 border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-accent hover:border-accent rounded-lg transition-all group"
                   aria-label="Back to top"
                >
                  <ChevronRight size={20} className="-rotate-90 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="space-y-8 md:text-right">
              <div className="flex md:justify-end gap-6">
                {[
                  { icon: <Github size={20} />, href: profile.links.github, label: "GitHub" },
                  { icon: <Linkedin size={20} />, href: profile.links.linkedin, label: "LinkedIn" },
                  { icon: <Mail size={20} />, href: `mailto:${profile.links.email}`, label: "Email" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-text-dim)] hover:text-accent hover:-translate-y-1 transition-all duration-300 p-2"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              
              <div className="font-mono text-[10px] text-[var(--color-text-dim)] uppercase tracking-[0.3em] space-y-2">
                <p>© {new Date().getFullYear()} Sahil Pal — All Systems Nominal</p>
                <p>Built with Precision &amp; Intent</p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Social Link Helper
// ═══════════════════════════════════════════════════════════════
interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  variants: any;
  idx: number;
}
function SocialLink({ href, icon, label, variants, idx }: SocialLinkProps) {
  return (
    <motion.div
      custom={idx}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      <Magnetic>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-accent hover:bg-accent/5 rounded-lg text-sm text-[var(--color-text-muted)] hover:text-accent transition-all duration-300 group shadow-sm relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-accent/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10 transition-transform group-hover:scale-110 duration-300">{icon}</span>
          <span className="font-mono text-[10px] uppercase tracking-wider relative z-10">{label}</span>
          <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-accent/20 group-hover:bg-accent transition-colors" />
        </a>
      </Magnetic>
    </motion.div>
  );
}
