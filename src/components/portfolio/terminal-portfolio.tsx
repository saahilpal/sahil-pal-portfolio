"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { profile, projects, experience, skills, education } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// ──────────────────────────────────────────────
// Terminal Engine Adapting Data
// ──────────────────────────────────────────────
type ViewKey = "help" | "about" | "projects" | "experience" | "skills" | "education" | "contact" | "clear";

const commandMap: Record<string, ViewKey> = {
  help: "help",
  about: "about",
  whoami: "about",
  projects: "projects",
  ls: "projects",
  skills: "skills",
  experience: "experience",
  history: "experience",
  education: "education",
  contact: "contact",
  ping: "contact",
  clear: "clear",
  exit: "clear"
};

const commandSuggestions = Object.keys(commandMap);

const bootSequenceLines = [
  { ts: "0.001", text: "Initializing SahilOS Kernel v2.0.0...", color: "white" },
  { ts: "0.042", text: "Loading core drivers: NEURAL_INTERFACE, ASYNC_IO...", color: "white" },
  { ts: "0.120", text: "Mounting file systems...", color: "white" },
  { ts: "0.250", text: `User AUTH_VERIFIED: ${profile.name} [Software Engineer]`, color: "cyan" },
  { ts: "0.400", text: "Welcome to the terminal environment.", color: "green" },
];

function generateTerminalOutput(view: ViewKey): string[] {
  switch (view) {
    case "help":
      return [
        "COMMAND_REGISTRY:",
        "--------------------------------------------------",
        "about       -> Display identity and engineering focus",
        "projects    -> List high-impact system architectures",
        "skills      -> Dump capability graph and tech stack",
        "experience  -> View professional run-logs",
        "education   -> Access academic history",
        "contact     -> Establish a direct communication link",
        "clear       -> Reset the terminal buffer",
        "exit        -> Return to GUI mode",
        "--------------------------------------------------",
      ];
    case "about":
      return [
        `USER: ${profile.name}`,
        `TITLE: ${profile.role}`,
        "--------------------------------------------------",
        profile.summary,
      ];
    case "projects":
      const projLines = ["DIRECTORY: /root/projects", "--------------------------------------------------"];
      projects.forEach(p => {
        projLines.push(`-> ${p.name} [${p.type}]`);
        projLines.push(`   Stack: ${p.stack.join(", ")}`);
        projLines.push("");
      });
      return projLines;
    case "skills":
      const skillLines = ["CAPABILITY_GRAPH:", "--------------------------------------------------"];
      skills.forEach(s => {
        skillLines.push(`${s.category.toUpperCase()}: ${s.items.join(", ")}`);
      });
      return skillLines;
    case "experience":
      const expLines = ["RUN_LOGS:", "--------------------------------------------------"];
      experience.forEach(e => {
        expLines.push(`ROLE: ${e.role}`);
        expLines.push(`COMPANY: ${e.company} [${e.date}]`);
        e.highlights.forEach(h => expLines.push(`-> ${h}`));
        expLines.push("");
      });
      return expLines;
    case "education":
      const eduLines = ["ACADEMIC_HISTORY:", "--------------------------------------------------"];
      education.forEach(e => {
        eduLines.push(`DEGREE: ${e.degree}`);
        eduLines.push(`INSTITUTION: ${e.school} [${e.date}]`);
        eduLines.push("");
      });
      return eduLines;
    case "contact":
      return [
        "COMM_CHANNEL_ESTABLISHED:",
        "--------------------------------------------------",
        `EMAIL: ${profile.links.email}`,
        `GITHUB: ${profile.links.github}`,
        `LINKEDIN: ${profile.links.linkedin}`,
        "--------------------------------------------------",
      ];
    default:
      return [];
  }
}

interface LogEntry {
  id: string;
  type: "CMD" | "SYS" | "ERR";
  content: string[];
}

function uid() {
  return Math.random().toString(36).slice(2, 11);
}

function TerminalPrompt() {
  return (
    <span className="prompt whitespace-nowrap text-[#00ff41] font-bold mr-3 drop-shadow-[0_0_8px_rgba(0,255,65,0.3)]">
      guest@sahil-os:~$
    </span>
  );
}

export function TerminalPortfolio({ onExit }: { onExit?: () => void }) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isBooting, setIsBooting] = useState(true);
  const [bootLine, setBootLine] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs, isBooting, bootLine]);

  // Scroll Lock & Focus Management
  useEffect(() => {
    // Lock scroll on background
    document.body.style.overflow = "hidden";
    
    // Focus input on mount
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, []);

  // Handle global key events for exit
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onExit) {
        onExit();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [onExit]);

  // Focus input on click anywhere
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  // Boot Sequence Logic
  useEffect(() => {
    if (isBooting) {
      if (bootLine < bootSequenceLines.length) {
        const timer = setTimeout(() => {
          setBootLine(prev => prev + 1);
        }, 40); // fast boot sequence
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setIsBooting(false);
          setLogs([{
            id: uid(),
            type: "SYS",
            content: ["Type 'help' to see available commands. Press ESC or type 'exit' to return to GUI."]
          }]);
        }, 150); // Wait briefly before prompt appears
        return () => clearTimeout(timer);
      }
    }
  }, [isBooting, bootLine]);

  // Command Execution
  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setHistory(prev => [cmd, ...prev].slice(0, 50));
    setHistoryIndex(-1);

    const newLogs: LogEntry[] = [
      { id: uid(), type: "CMD", content: [cmd] }
    ];

    if (trimmed === "clear") {
      setLogs([]);
      return;
    }
    
    if (trimmed === "exit" && onExit) {
      onExit();
      return;
    }

    const commandKey = commandMap[trimmed];
    
    if (commandKey) {
      const content = generateTerminalOutput(commandKey);
      newLogs.push({
        id: uid(),
        type: "SYS",
        content: content
      });
    } else {
      if (trimmed === "sudo hire-me") {
         newLogs.push({
           id: uid(),
           type: "SYS",
           content: [
             "✓ AUTH_BYPASS: Elevated privileges",
             "→ Action: Initiating recruitment sequence...",
             `→ Target: ${profile.links.email}`,
             "✓ Mission accomplished. Have a great day!"
           ]
         });
      } else {
        newLogs.push({
          id: uid(),
          type: "ERR",
          content: [`-bash: ${trimmed}: command not found. Type 'help' for assistance.`]
        });
      }
    }

    setLogs(prev => [...prev, ...newLogs]);
  }, [onExit]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = commandSuggestions.find(s => s.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <div 
      className="terminal-container h-full w-full p-6 overflow-y-auto font-mono text-sm md:text-base selection:bg-[#00ff41]/30 selection:text-white text-[#ededed] relative"
      onClick={handleContainerClick}
      ref={containerRef}
    >
      {/* CRT Overlays */}
      <div className="crt-overlay"></div>
      <div className="crt-scanline"></div>

      {/* Terminal Content */}
      <div className="relative z-50">
        <AnimatePresence mode="popLayout">
          {/* Boot Sequence */}
          {isBooting ? (
            <motion.div 
              key="boot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-1"
            >
              {bootSequenceLines.slice(0, bootLine).map((line, i) => (
                <div key={i} className="mb-1 flex gap-4">
                  <span className="text-[#a1a1aa]">[{line.ts}]</span>
                  <span style={{ color: line.color === 'green' ? '#00ff41' : line.color === 'cyan' ? '#00d1ff' : 'white' }}>
                    {line.text}
                  </span>
                </div>
              ))}
              {bootLine < bootSequenceLines.length && <span className="inline-block w-2 h-[18px] bg-white align-middle animate-pulse ml-1" />}
            </motion.div>
          ) : (
            <motion.div 
              key="terminal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 pb-20"
            >
              <div className="text-[#a1a1aa] italic opacity-50 border-b border-white/10 pb-2 mb-6">
                SahilOS [Version 2.0.0] - A high-performance production build.
              </div>
              
              <div className="space-y-4">
                {logs.map((log) => (
                  <div key={log.id} className="space-y-2">
                    {log.type === "CMD" && (
                      <div className="flex items-start">
                        <TerminalPrompt />
                        <span className="text-white break-all drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">{log.content[0]}</span>
                      </div>
                    )}
                    {log.type !== "CMD" && (
                      <div className="pl-0 md:pl-4 space-y-1">
                        {log.content.map((line, i) => (
                          <motion.div 
                            key={i} 
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.02 }}
                            className={cn(
                              "mb-1 whitespace-pre-wrap break-words",
                              log.type === "ERR" ? "text-red-400" : "text-[#d4d4d8]"
                            )}
                          >
                            {line}
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Active Prompt */}
              <div className="flex items-start">
                <TerminalPrompt />
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    className="bg-transparent border-none outline-none text-transparent font-inherit w-full absolute inset-0 cursor-default"
                    style={{ fontSize: "16px" }} /* Prevents iOS mobile zoom on focus */
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  <div className="flex items-center pointer-events-none">
                    <span className="text-white break-all drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">{input}</span>
                    <span className="inline-block w-2 h-[18px] bg-[#00ff41] align-middle ml-1 drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]" style={{ animation: 'blink 1s step-end infinite' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `
      }} />
    </div>
  );
}
} />
    </div>
  );
}
