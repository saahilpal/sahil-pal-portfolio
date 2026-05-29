"use client";

import { motion, AnimatePresence } from "framer-motion";
import { profile, projects, experience, skills, education } from "@/lib/portfolio-data";
import { Github, Linkedin, Mail, ExternalLink, Terminal, FileText, ChevronRight, Brain, Code2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { TerminalPortfolio } from "@/components/portfolio/terminal-portfolio";
import { cn } from "@/lib/utils";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// --- Custom Cursor Component ---
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState<"default" | "interactive" | "text">("default");

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let mouse = { x: 0, y: 0 };
    let ringPos = { x: 0, y: 0 };
    let isMoving = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isMoving) {
        isMoving = true;
        dotRef.current?.classList.remove("opacity-0");
        ringRef.current?.classList.remove("opacity-0");
      }
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate3d(-50%, -50%, 0)`;
      }
    };

    const handleMouseLeaveWindow = () => {
      dotRef.current?.classList.add("opacity-0");
      ringRef.current?.classList.add("opacity-0");
      isMoving = false;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive = target.closest('a, button, [role="button"], .group, input, textarea') !== null;
      if (isInteractive) {
        setCursorType("interactive");
      } else if (target.closest('p, h1, h2, h3, h4, li, span') && !isInteractive) {
        setCursorType("text");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    window.addEventListener("mouseover", handleMouseOver);

    let animationFrameId: number;
    const updateRing = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.12;
      ringPos.y += (mouse.y - ringPos.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate3d(-50%, -50%, 0)`;
      }
      animationFrameId = requestAnimationFrame(updateRing);
    };
    animationFrameId = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className={cn(
          "custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-[9999] opacity-0 transition-[width,height,background-color,border-radius,border-color] duration-300 ease-out will-change-transform",
          cursorType === "default" && "w-8 h-8 border border-[#00ff41] bg-transparent",
          cursorType === "interactive" && "w-14 h-14 bg-[#00ff41]/15 border border-transparent",
          cursorType === "text" && "w-6 h-[2px] rounded-none bg-[#00ff41] border border-transparent"
        )}
      />
      <div
        ref={dotRef}
        className="custom-cursor fixed top-0 left-0 w-1.5 h-1.5 bg-[#00ff41] rounded-full pointer-events-none z-[10000] opacity-0 transition-opacity duration-200 will-change-transform"
      />
    </>
  );
}

// --- Magnetic Component for social links ---
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    if (distance < 60) {
      setPosition({ x: mouseX * 0.35, y: mouseY * 0.35 });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

// --- Sticky Navigation with active section indicator ---
function Navbar({ onToggleTerminal }: { onToggleTerminal: () => void }) {
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
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
      <nav className={cn(
        "fixed top-0 inset-x-0 z-45 transition-all duration-300",
        scrolled 
          ? "bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#222] py-3 shadow-sm" 
          : "bg-transparent border-b border-transparent py-5"
      )}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <a href="#about" className="font-mono text-sm font-bold tracking-tight text-white hover:text-[#00ff41] transition-colors">
            sahil<span className="text-[#00ff41]">.</span>pal
          </a>
          
          <div className="hidden md:flex items-center gap-8 font-mono text-xs">
            {navLinks.map((link) => (
              <a 
                key={link.id} 
                href={`#${link.id}`}
                className={cn(
                  "relative py-1 transition-all duration-300 hover:text-[#00ff41]",
                  activeSection === link.id ? "text-[#00ff41] font-semibold" : "text-[#a1a1aa]"
                )}
              >
                <span className="opacity-50 mr-1 text-[#00ff41]">//</span>{link.name.toLowerCase()}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="active-nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00ff41]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onToggleTerminal}
              className="flex items-center gap-2 text-xs font-mono text-[#a1a1aa] hover:text-[#00ff41] transition-colors bg-[#121212] px-3 py-1.5 rounded-md border border-[#222] hover:border-[#00ff41]/50 group shadow-sm"
              title="Toggle Terminal (Ctrl + ~)"
            >
              <Terminal size={14} strokeWidth={1.5} />
              <span className="hidden sm:flex items-center gap-1">
                <kbd className="bg-[#1a1a1a] border border-[#333] rounded-md px-1.5 py-0.5 shadow-[0_1px_0_rgba(255,255,255,0.1)_inset] text-[#ededed] group-hover:border-[#00ff41]/30 transition-colors font-sans text-[10px] uppercase font-semibold tracking-wider">ctrl</kbd> 
                <span className="opacity-50">+</span> 
                <kbd className="bg-[#1a1a1a] border border-[#333] rounded-md px-1.5 py-0.5 shadow-[0_1px_0_rgba(255,255,255,0.1)_inset] text-[#ededed] group-hover:border-[#00ff41]/30 transition-colors font-sans text-[10px] font-semibold">~</kbd>
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden flex-col items-center justify-center gap-1.5 w-8 h-8 rounded-md border border-[#222] bg-[#121212] text-[#a1a1aa] hover:text-[#00ff41] hover:border-[#00ff41]/50 transition-colors z-50"
              aria-label="Toggle menu"
            >
              <span className={cn("w-4 h-[1.5px] bg-current transition-transform duration-300", mobileMenuOpen && "translate-y-[4.5px] rotate-45")} />
              <span className={cn("w-4 h-[1.5px] bg-current transition-opacity duration-300", mobileMenuOpen && "opacity-0")} />
              <span className={cn("w-4 h-[1.5px] bg-current transition-transform duration-300", mobileMenuOpen && "-translate-y-[4.5px] -rotate-45")} />
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
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md md:hidden flex flex-col items-center justify-center"
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
                    "text-[#a1a1aa] hover:text-[#00ff41] transition-colors py-2 relative",
                    activeSection === link.id && "text-[#00ff41]"
                  )}
                >
                  <span className="opacity-50 mr-2 text-[#00ff41]">//</span>
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

// --- Project Card with 3D Mouse-Tracking Tilt & Glow ---
function ProjectCard({ project, idx }: { project: any; idx: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Rotate ±4deg max
    const rX = -(mouseY / (height / 2)) * 4;
    const rY = (mouseX / (width / 2)) * 4;
    
    setTilt({ x: rX, y: rY });
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const Icon = project.name.includes("RAG") ? Brain : Code2;
  const isSynap = project.name === "Synap";

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
        "group relative p-6 md:p-8 rounded-xl bg-[#121212]/50 border transition-all duration-300 overflow-hidden z-10 will-change-transform",
        isSynap ? "border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40" : "border-[#222] hover:border-[#333]",
        (tilt.x || tilt.y) && (isSynap ? "shadow-[0_20px_50px_rgba(139,92,246,0.1)]" : "shadow-[0_20px_50px_rgba(0,255,65,0.05)]")
      )}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${tilt.x || tilt.y ? -6 : 0}px)`,
        transition: "transform 0.1s ease-out, box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Left border bottom-to-top height wipe */}
      <span className={cn(
        "absolute left-0 top-0 bottom-0 w-[2px] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-200 ease-out z-20",
        isSynap ? "bg-[#8b5cf6]" : "bg-[#00ff41]"
      )} />

      {/* Mouse-Tracking Glow Effect */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
        style={{
          background: isSynap 
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.08), transparent 40%)`
            : `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 65, 0.04), transparent 40%)`
        }}
      />
      
      {/* Large translucent index behind */}
      <div className="absolute right-4 bottom-4 font-mono font-black text-8xl text-white/5 select-none pointer-events-none z-0 leading-none">
        {`0${idx + 1}`}
      </div>

      {/* Featured Badge for Synap */}
      {isSynap && (
        <div className="absolute top-4 right-4 md:top-6 md:right-8 z-20">
          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider bg-[#8b5cf6]/15 text-[#c084fc] border border-[#8b5cf6]/30 uppercase">
            Featured Project
          </span>
        </div>
      )}

      {/* Dynamic Background Icon */}
      <div className="absolute -top-4 -right-4 p-4 opacity-[0.02] pointer-events-none transition-transform group-hover:scale-105 group-hover:-rotate-3 duration-700 z-0">
         <Icon size={180} strokeWidth={1} />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <div className={cn(
              "font-mono text-xs mb-2 tracking-wide uppercase",
              isSynap ? "text-[#c084fc]" : "text-[#00ff41]"
            )}>{project.type}</div>
            <h3 className={cn(
              "text-2xl font-bold text-[#ededed] transition-colors",
              isSynap ? "group-hover:text-[#c084fc]" : "group-hover:text-[#00ff41]"
            )}>{project.name}</h3>
          </div>
          <div className="flex items-center gap-3">
            {project.links.map((link: any, lIdx: number) => (
              <a 
                key={lIdx} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={cn(
                  "p-2 text-[#a1a1aa] rounded-md transition-all duration-300 hover:bg-white/5 group/link",
                  isSynap ? "hover:text-[#c084fc]" : "hover:text-[#00ff41]"
                )}
                title={link.label}
              >
                {link.label === 'GitHub' 
                  ? <Github size={20} strokeWidth={1.5} className="transition-transform group-hover/link:-translate-y-0.5" /> 
                  : <ExternalLink size={20} strokeWidth={1.5} className="transition-transform group-hover/link:rotate-45 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                }
              </a>
            ))}
          </div>
        </div>
        
        <div className="bg-[#0a0a0a]/60 backdrop-blur-sm p-5 rounded-lg border border-[#222] mb-6 text-[#a1a1aa] text-sm leading-relaxed space-y-3 relative z-10 group-hover:border-[#333] transition-colors duration-300">
          {project.highlights.map((highlight: string, hIdx: number) => (
            <div key={hIdx} className="flex items-start gap-3">
              <ChevronRight size={16} strokeWidth={1.5} className={cn("shrink-0 mt-0.5 opacity-70", isSynap ? "text-[#c084fc]" : "text-[#00ff41]")} />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2.5 font-mono text-[11px] text-[#71717a]">
          {project.stack.map((tech: string, tIdx: number) => (
            <span 
              key={tIdx} 
              className="px-2 py-1 rounded bg-[#1a1a1a] border border-[#222] hover:scale-105 hover:bg-[#222] hover:text-white transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// --- Main Portfolio Component ---
export default function Portfolio() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  // Global Keyboard Shortcut for Terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "`" || e.key === "~")) {
        e.preventDefault();
        setShowTerminal(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Monitor scroll height to hide scroll mouse icon
  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize Lenis + GSAP ScrollTrigger
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // If prefers-reduced-motion is on, we skip standard smooth scroll
      // but ensure dots and timeline active line are fully styled/expanded
      gsap.registerPlugin(ScrollTrigger);
      gsap.set(".timeline-active-line", { scaleY: 1 });
      gsap.set(".timeline-dot", { scale: 1, opacity: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    const tlCtx = gsap.context(() => {
      // Timeline active drawing line
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
          }
        }
      );

      // Timeline nodes scale-in
      gsap.utils.toArray(".timeline-dot").forEach((dot: any) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: dot,
              start: "top 70%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
      tlCtx.revert();
    };
  }, []);

  // Framer Motion Variants for Staggered Line Entrance
  const titleCharVariants: any = {
    hidden: { y: "100%", opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2 + i * 0.025,
      }
    })
  };

  const bioWordVariants: any = {
    hidden: { y: "15px", opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: 0.8 + i * 0.008,
      }
    })
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
      }
    })
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative select-none">
      {/* Styles Injection */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .gradient-shimmer {
            background: linear-gradient(
              120deg,
              #ededed 0%,
              #ededed 35%,
              #3b82f6 50%,
              #8b5cf6 65%,
              #ededed 80%,
              #ededed 100%
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
          
          .bg-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(140px);
            opacity: 0.04;
            pointer-events: none;
          }
          .orb-blue {
            width: 450px;
            height: 450px;
            background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
            animation: drift-blue 20s ease-in-out infinite alternate;
          }
          .orb-violet {
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
            animation: drift-violet 25s ease-in-out infinite alternate;
          }
          @keyframes drift-blue {
            0% { transform: translate(-10%, -10%) scale(1); }
            100% { transform: translate(30%, 20%) scale(1.15); }
          }
          @keyframes drift-violet {
            0% { transform: translate(20%, 30%) scale(1.1); }
            100% { transform: translate(-20%, -10%) scale(0.9); }
          }
        `
      }} />

      {/* Ambient Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="bg-orb orb-blue absolute top-[10%] left-[5%] md:left-[15%]" />
        <div className="bg-orb orb-violet absolute top-[40%] right-[5%] md:right-[15%]" />
      </div>

      {/* Custom Cursor Dot + Ring */}
      <CustomCursor />

      {/* Terminal Overlay */}
      {showTerminal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-all duration-300">
          <button 
            onClick={() => setShowTerminal(false)}
            className="absolute top-4 right-4 z-[60] p-2 bg-[#222] hover:bg-[#333] rounded-md border border-[#333] text-sm text-[#a1a1aa] hover:text-white transition-colors font-mono flex items-center gap-2 shadow-lg"
          >
            <span className="text-[#00ff41]">exit</span> terminal
          </button>
          <TerminalPortfolio onExit={() => setShowTerminal(false)} />
        </div>
      )}

      {/* Header Navigation */}
      <Navbar onToggleTerminal={() => setShowTerminal(true)} />

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24 space-y-32 relative z-10">
        
        {/* Hero Section */}
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
              className="text-[#00ff41] font-mono text-sm mb-4 tracking-wide"
            >
              Hi, my name is
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#ededed] flex flex-wrap leading-tight">
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

            <h2 className="text-3xl md:text-5xl font-bold text-[#a1a1aa] leading-tight flex flex-wrap">
              {Array.from(profile.role).map((char, i) => (
                <motion.span
                  key={i}
                  custom={i + profile.name.length}
                  initial="hidden"
                  animate="visible"
                  variants={titleCharVariants}
                  className="inline-block whitespace-pre"
                >
                  {char}
                </motion.span>
              ))}
            </h2>
          </div>
          
          <p className="text-lg leading-relaxed max-w-xl text-[#a1a1aa] flex flex-wrap">
            {profile.summary.split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] py-0.5">
                <motion.span
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={bioWordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </p>

          <div className="flex flex-wrap gap-4 pt-6">
            <SocialLink idx={0} href={profile.links.github} icon={<Github size={18} strokeWidth={1.5} />} label="GitHub" variants={socialItemVariants} />
            <SocialLink idx={1} href={profile.links.linkedin} icon={<Linkedin size={18} strokeWidth={1.5} />} label="LinkedIn" variants={socialItemVariants} />
            <SocialLink idx={2} href={`mailto:${profile.links.email}`} icon={<Mail size={18} strokeWidth={1.5} />} label="Email" variants={socialItemVariants} />
            <SocialLink idx={3} href={profile.links.resume} icon={<FileText size={18} strokeWidth={1.5} />} label="Resume" variants={socialItemVariants} />
          </div>

          {/* Bouncing Scroll Mouse Icon */}
          <AnimatePresence>
            {!scrolledPastHero && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 0.6, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="absolute bottom-[-10vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[9px] text-[#a1a1aa] tracking-widest pointer-events-none"
              >
                <span className="w-5 h-8 border border-[#a1a1aa]/50 rounded-full flex justify-center p-1">
                  <motion.span
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1 h-1.5 bg-[#00ff41] rounded-full"
                  />
                </span>
                <span>SCROLL</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          id="projects"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10 scroll-mt-32"
        >
          <div className="flex items-baseline gap-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-baseline gap-3 text-[#ededed]">
              <motion.span 
                initial={{ scale: 1 }}
                whileInView={{ scale: [1, 1.04, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="text-[#00ff41] font-mono text-lg md:text-xl font-normal"
              >
                01.
              </motion.span> 
              <motion.span
                initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Projects
              </motion.span>
            </h2>
            <div className="h-px bg-[#222] flex-grow mb-2"></div>
          </div>

          <div className="grid gap-8">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} idx={idx} project={project} />
            ))}
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section 
          id="experience"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10 scroll-mt-32"
        >
          <div className="flex items-baseline gap-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-baseline gap-3 text-[#ededed]">
              <span className="text-[#00ff41] font-mono text-lg md:text-xl font-normal">02.</span> 
              <span>Experience</span>
            </h2>
            <div className="h-px bg-[#222] flex-grow mb-2"></div>
          </div>

          <div className="relative pl-4 md:pl-8 experience-timeline">
            {/* Timeline center line */}
            <div className="absolute left-[16px] md:left-[32px] top-1.5 bottom-4 w-px bg-[#333] z-0">
              <div className="timeline-active-line w-full h-full bg-[#00ff41] origin-top scale-y-0" />
            </div>

            <div className="space-y-12 relative z-10">
              {experience.map((job, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-8 pb-4 group"
                >
                  {/* Timeline Dot centered on line */}
                  <div className="timeline-dot absolute w-3.5 h-3.5 bg-[#0a0a0a] border-2 border-[#00ff41] rounded-full -left-[7px] top-1.5 z-10 scale-0 shadow-[0_0_8px_rgba(0,255,65,0)] group-hover:shadow-[0_0_12px_rgba(0,255,65,0.4)] transition-shadow duration-500" />
                  
                  <div className="space-y-2 mb-5">
                    <h3 className="text-xl font-bold text-[#ededed] group-hover:text-[#00ff41] transition-colors">{job.role}</h3>
                    <div className="text-md text-[#00ff41] font-medium tracking-wide">{job.company}</div>
                    <div className="text-sm text-[#71717a] font-mono">{job.date}</div>
                  </div>
                  
                  <div className="space-y-3 text-sm text-[#a1a1aa] leading-relaxed mb-5">
                    {job.highlights.map((highlight, hIdx) => (
                      <motion.div 
                        key={hIdx} 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: hIdx * 0.06 }}
                        className="flex items-start gap-3"
                      >
                        <ChevronRight size={16} strokeWidth={1.5} className="text-[#00ff41] shrink-0 mt-0.5 opacity-70" />
                        <span>{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2.5 font-mono text-[11px] text-[#71717a]">
                    {job.stack.map((tech, tIdx) => (
                      <span key={tIdx} className="px-2 py-1 rounded bg-[#121212] border border-[#222] hover:scale-105 hover:bg-[#222] hover:text-white transition-all duration-200">{tech}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Skills & Education Section */}
        <motion.section 
          id="skills"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10 scroll-mt-32"
        >
          <div className="flex items-baseline gap-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-baseline gap-3 text-[#ededed]">
              <span className="text-[#00ff41] font-mono text-lg md:text-xl font-normal">03.</span> 
              <span>Skills & Education</span>
            </h2>
            <div className="h-px bg-[#222] flex-grow mb-2"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              {skills.map((skillGroup, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="relative inline-block pb-1">
                    <h4 className="text-sm font-mono text-[#00ff41] uppercase tracking-wider">{skillGroup.category}</h4>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute bottom-0 left-0 right-0 h-px bg-[#00ff41] origin-left"
                    />
                  </div>
                  
                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.04 } }
                    }}
                    className="flex flex-wrap gap-2"
                  >
                    {skillGroup.items.map((skill, sIdx) => (
                      <motion.span 
                        key={sIdx} 
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                        }}
                        className="text-xs font-mono text-[#a1a1aa] bg-[#121212]/50 px-3 py-1.5 rounded-full border border-[#222] hover:border-[#00ff41]/50 hover:bg-[#00ff41]/5 hover:text-white hover:scale-105 transition-all duration-150 ease-out"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {education.map((edu, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 rounded-xl bg-[#121212]/50 border border-[#222] hover:border-[#00ff41]/30 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00ff41]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                  <div className="relative z-10">
                    <div className="text-[#00ff41] font-mono text-xs mb-2 font-semibold">{edu.date}</div>
                    <h3 className="font-bold text-lg text-[#ededed] mb-1 group-hover:text-[#00ff41] transition-colors">{edu.degree}</h3>
                    <div className="text-sm text-[#a1a1aa] leading-relaxed">{edu.school}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="relative pt-12 pb-8 mt-24 text-center md:text-left text-sm text-[#71717a] font-mono z-10">
          {/* Subtle top border growing from center */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#222] to-transparent origin-center"
          />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="space-y-1 text-center md:text-left">
              <p>Built with <span className="text-[#a1a1aa]">Next.js</span>, <span className="text-[#a1a1aa]">Tailwind</span>, <span className="text-[#a1a1aa]">Framer Motion</span>, and <span className="text-[#a1a1aa]">Precision</span>.</p>
              <p className="text-xs opacity-50">© {new Date().getFullYear()} Sahil Pal. All rights reserved.</p>
            </div>
            
            <div className="flex gap-4">
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="p-2 text-[#71717a] hover:text-[#00ff41] hover:-translate-y-1 transition-all duration-200">
                <Github size={18} />
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-[#71717a] hover:text-[#00ff41] hover:-translate-y-1 transition-all duration-200">
                <Linkedin size={18} />
              </a>
              <a href={`mailto:${profile.links.email}`} className="p-2 text-[#71717a] hover:text-[#00ff41] hover:-translate-y-1 transition-all duration-200">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

// --- Helper Link Components ---
interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  variants: any;
  idx: number;
}
function SocialLink({ href, icon, label, variants, idx }: SocialLinkProps) {
  return (
    <motion.div custom={idx} variants={variants}>
      <Magnetic>
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#121212] border border-[#222] hover:border-[#00ff41]/50 hover:bg-[#00ff41]/5 rounded-lg text-sm text-[#ededed] hover:text-[#00ff41] transition-all duration-300 group shadow-sm"
        >
          {icon}
          <span className="font-medium">{label}</span>
        </a>
      </Magnetic>
    </motion.div>
  );
}
