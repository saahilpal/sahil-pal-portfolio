"use client";

import { motion } from "framer-motion";
import { profile, projects, experience, skills, education } from "@/lib/portfolio-data";
import { Github, Linkedin, Mail, ExternalLink, Terminal, FileText, ChevronRight, Brain, Code2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { TerminalPortfolio } from "@/components/portfolio/terminal-portfolio";

// --- Extracted Navbar for Performance ---
function Navbar({ onToggleTerminal }: { onToggleTerminal: () => void }) {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" } // Adjusted for stable triggering without jumping
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
    <nav className="fixed top-0 inset-x-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#222] shadow-sm">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#about" className="font-mono text-sm font-bold tracking-tight text-white hover:text-[#00ff41] transition-colors">
          sahil<span className="text-[#00ff41]">.</span>pal
        </a>
        
        <div className="hidden md:flex items-center gap-8 font-mono text-xs">
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href={`#${link.id}`}
              className={`transition-all duration-300 hover:text-[#00ff41] ${activeSection === link.id ? "text-[#00ff41] font-semibold" : "text-[#a1a1aa]"}`}
            >
              <span className="opacity-50 mr-1 text-[#00ff41]">//</span>{link.name.toLowerCase()}
            </a>
          ))}
        </div>

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
      </div>
    </nav>
  );
}

// --- Project Card with Mouse-Tracking Glow ---
function ProjectCard({ project }: { project: any }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Assign a unique icon based on project name
  const Icon = project.name.includes("RAG") ? Brain : Code2;

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative p-6 md:p-8 rounded-xl bg-[#121212]/50 border border-[#222] transition-all duration-300 overflow-hidden"
    >
      {/* Mouse-Tracking Glow Effect */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 65, 0.04), transparent 40%)`
        }}
      />
      
      {/* Dynamic Background Icon */}
      <div className="absolute -top-4 -right-4 p-4 opacity-[0.02] pointer-events-none transition-transform group-hover:scale-105 group-hover:-rotate-3 duration-700 z-0">
         <Icon size={180} strokeWidth={1} />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <div className="text-[#00ff41] font-mono text-xs mb-2 tracking-wide uppercase">{project.type}</div>
            <h3 className="text-2xl font-bold text-[#ededed] group-hover:text-[#00ff41] transition-colors">{project.name}</h3>
          </div>
          <div className="flex items-center gap-3">
            {project.links.map((link: any, lIdx: number) => (
              <a key={lIdx} href={link.url} target="_blank" rel="noopener noreferrer" className="p-2 text-[#a1a1aa] hover:text-[#00ff41] hover:bg-[#00ff41]/10 rounded-md transition-colors" title={link.label}>
                {link.label === 'GitHub' ? <Github size={20} strokeWidth={1.5} /> : <ExternalLink size={20} strokeWidth={1.5} />}
              </a>
            ))}
          </div>
        </div>
        
        <div className="bg-[#0a0a0a]/60 backdrop-blur-sm p-5 rounded-lg border border-[#222] mb-6 text-[#a1a1aa] text-sm leading-relaxed space-y-3 relative z-10 group-hover:border-[#333] transition-colors duration-300">
          {project.highlights.map((highlight: string, hIdx: number) => (
            <div key={hIdx} className="flex items-start gap-3">
              <ChevronRight size={16} strokeWidth={1.5} className="text-[#00ff41] shrink-0 mt-0.5 opacity-70" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2.5 font-mono text-[11px] text-[#71717a]">
          {project.stack.map((tech: string, tIdx: number) => (
            <span key={tIdx} className="px-2 py-1 rounded bg-[#1a1a1a] border border-[#222]">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [showTerminal, setShowTerminal] = useState(false);

  // Global Keyboard Shortcut for Terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow Ctrl+~ or Cmd+~ (or backtick ` since it shares the same key usually)
      if ((e.ctrlKey || e.metaKey) && (e.key === "`" || e.key === "~")) {
        e.preventDefault();
        setShowTerminal(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
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

      <Navbar onToggleTerminal={() => setShowTerminal(true)} />

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24 space-y-32 relative z-0">
        
        {/* Hero Section */}
        <motion.section 
          id="about"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 scroll-mt-32"
        >
          <div className="space-y-3">
            <div className="text-[#00ff41] font-mono text-sm mb-4 tracking-wide">Hi, my name is</div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#ededed]">{profile.name}.</h1>
            <h2 className="text-3xl md:text-5xl font-bold text-[#a1a1aa] leading-tight">{profile.role}.</h2>
          </div>
          
          <p className="text-lg leading-relaxed max-w-xl text-[#a1a1aa]">
            {profile.summary}
          </p>

          <div className="flex flex-wrap gap-4 pt-6">
            <SocialLink href={profile.links.github} icon={<Github size={18} strokeWidth={1.5} />} label="GitHub" />
            <SocialLink href={profile.links.linkedin} icon={<Linkedin size={18} strokeWidth={1.5} />} label="LinkedIn" />
            <SocialLink href={`mailto:${profile.links.email}`} icon={<Mail size={18} strokeWidth={1.5} />} label="Email" />
            <SocialLink href={profile.links.resume} icon={<FileText size={18} strokeWidth={1.5} />} label="Resume" />
          </div>
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
              <span className="text-[#00ff41] font-mono text-lg md:text-xl font-normal">01.</span> 
              <span>Projects</span>
            </h2>
            <div className="h-px bg-[#222] flex-grow mb-2"></div>
          </div>

          <div className="grid gap-8">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
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

          <div className="space-y-12 pl-2 md:pl-4">
            {experience.map((job, idx) => (
              <div key={idx} className="relative border-l border-[#333] pl-8 pb-4 hover:border-[#00ff41]/50 transition-colors duration-500 group">
                <div className="absolute w-3.5 h-3.5 bg-[#0a0a0a] border-2 border-[#00ff41] rounded-full -left-[7.5px] top-1.5 shadow-[0_0_8px_rgba(0,255,65,0)] group-hover:shadow-[0_0_12px_rgba(0,255,65,0.4)] transition-shadow duration-500"></div>
                <div className="space-y-2 mb-5">
                  <h3 className="text-xl font-bold text-[#ededed] group-hover:text-[#00ff41] transition-colors">{job.role}</h3>
                  <div className="text-md text-[#00ff41] font-medium tracking-wide">{job.company}</div>
                  <div className="text-sm text-[#71717a] font-mono">{job.date}</div>
                </div>
                <div className="space-y-3 text-sm text-[#a1a1aa] leading-relaxed mb-5">
                  {job.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-3">
                      <ChevronRight size={16} strokeWidth={1.5} className="text-[#00ff41] shrink-0 mt-0.5 opacity-70" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2.5 font-mono text-[11px] text-[#71717a]">
                  {job.stack.map((tech, tIdx) => (
                    <span key={tIdx} className="px-2 py-1 rounded bg-[#121212] border border-[#222]">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
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
                  <h4 className="text-sm font-mono text-[#00ff41] uppercase tracking-wider">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, sIdx) => (
                      <span key={sIdx} className="text-sm text-[#a1a1aa] bg-[#121212] px-3 py-1.5 rounded border border-[#222] hover:border-[#00ff41]/50 hover:text-white transition-colors duration-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-[#121212]/50 border border-[#222] hover:border-[#00ff41]/30 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00ff41]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                  <div className="relative z-10">
                    <div className="text-[#00ff41] font-mono text-xs mb-2">{edu.date}</div>
                    <h3 className="font-bold text-lg text-[#ededed] mb-1 group-hover:text-[#00ff41] transition-colors">{edu.degree}</h3>
                    <div className="text-sm text-[#a1a1aa] leading-relaxed">{edu.school}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="pt-24 pb-8 text-center text-sm text-[#71717a] font-mono space-y-2">
          <p>Built with <span className="text-[#a1a1aa]">Next.js</span>, <span className="text-[#a1a1aa]">Tailwind</span>, and <span className="text-[#a1a1aa]">Precision</span>.</p>
          <p className="text-xs opacity-50">© {new Date().getFullYear()} Sahil Pal. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}

function SocialLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-5 py-2.5 bg-[#121212] border border-[#222] hover:border-[#00ff41]/50 hover:bg-[#00ff41]/5 rounded-lg text-sm text-[#ededed] hover:text-[#00ff41] transition-all duration-300 group shadow-sm"
    >
      {icon}
      <span className="font-medium">{label}</span>
    </a>
  );
}
