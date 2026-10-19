"use client";

import { useEffect, useState, useRef } from "react";
import { Search, X, ArrowRight, ExternalLink } from "lucide-react";

interface CommandItem {
  id: string;
  category: "PROJECTS" | "NAVIGATION" | "LINKS" | "ACTIONS";
  title: string;
  detail: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleClose = () => {
    setQuery("");
    setSelectedIndex(0);
    onClose();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("saahilpal17@gmail.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      handleClose();
    }, 1200);
  };

  const toggleTheme = () => {
    const isLight = document.documentElement.classList.contains("light");
    document.documentElement.classList.toggle("light", !isLight);
    localStorage.setItem("theme", !isLight ? "light" : "dark");
    handleClose();
  };

  const scrollTo = (id: string) => {
    handleClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const allItems: CommandItem[] = [
    {
      id: "synapse",
      category: "PROJECTS",
      title: "Synapse — AI Code Intelligence & AST Indexer",
      detail: "Git-aware code indexing engine & MCP server",
      action: () => scrollTo("project-synapse"),
    },
    {
      id: "docanalyzer",
      category: "PROJECTS",
      title: "DocAnalyzer — High-Fidelity RAG Pipeline",
      detail: "Multi-document QA with pgvector & worker queue",
      action: () => scrollTo("project-docanalyzer"),
    },
    {
      id: "herabilling",
      category: "PROJECTS",
      title: "Hera Billing — Offline Android POS ERP",
      detail: "High-speed retail billing & native Canvas PDF generator",
      action: () => scrollTo("project-herabilling"),
    },
    {
      id: "leetsync",
      category: "PROJECTS",
      title: "LeetSync — DSA Problem Vault & Extension",
      detail: "Manifest V3 GitHub sync automation tool",
      action: () => scrollTo("project-leetsync"),
    },
    {
      id: "nav-arch",
      category: "NAVIGATION",
      title: "Systems Architecture & Mindset",
      detail: "How I think about deterministic grounding & runtimes",
      action: () => scrollTo("architecture"),
    },
    {
      id: "nav-skills",
      category: "NAVIGATION",
      title: "Capability Graph & Skill Matrix",
      detail: "Python, Java 17, Kotlin, MCP, Tree-sitter, SQL",
      action: () => scrollTo("skills"),
    },
    {
      id: "nav-journey",
      category: "NAVIGATION",
      title: "Engineering Journey & Education",
      detail: "Internship run-logs & BCA graduation details",
      action: () => scrollTo("journey"),
    },
    {
      id: "nav-contact",
      category: "NAVIGATION",
      title: "Dispatch & Contact Channel",
      detail: "Send inquiry or schedule engineering discussion",
      action: () => scrollTo("contact"),
    },
    {
      id: "action-copy-email",
      category: "ACTIONS",
      title: "Copy Email: saahilpal17@gmail.com",
      detail: copied ? "Copied to clipboard!" : "Copy primary engineering contact email",
      action: copyEmail,
    },
    {
      id: "action-theme",
      category: "ACTIONS",
      title: "Toggle Theme (Dark / Light Blueprint)",
      detail: "Switch between architectural dark and technical light modes",
      action: toggleTheme,
    },
    {
      id: "link-github",
      category: "LINKS",
      title: "GitHub Profile",
      detail: "Explore public repositories & commit history",
      action: () => {
        window.open("https://github.com/saahilpal", "_blank");
        handleClose();
      },
    },
    {
      id: "link-linkedin",
      category: "LINKS",
      title: "LinkedIn Profile",
      detail: "Connect professionally on LinkedIn",
      action: () => {
        window.open("https://www.linkedin.com/in/sahiilpal", "_blank");
        handleClose();
      },
    },
    {
      id: "link-resume",
      category: "LINKS",
      title: "Download Technical Resume (PDF)",
      detail: "Access verified academic & engineering credentials",
      action: () => {
        window.open("/resume.pdf", "_blank");
        handleClose();
      },
    },
  ];

  const filteredItems = query.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.detail.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].action();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-xl rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden flex flex-col font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
          <Search size={16} className="text-[var(--color-accent)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type command, project name, or keyword..."
            className="w-full bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] focus:outline-none"
            aria-label="Command search input"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="text-[var(--color-text-dim)] hover:text-[var(--color-text)]"
            >
              <X size={15} />
            </button>
          ) : (
            <kbd className="hidden sm:inline text-[9px] px-1.5 py-0.5 rounded bg-[var(--color-bg)] text-[var(--color-text-dim)] border border-[var(--color-border)]">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-[340px] overflow-y-auto p-2 space-y-1">
          {filteredItems.map((item, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={item.id}
                onClick={item.action}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full text-left px-3 py-2.5 rounded flex items-center justify-between text-xs transition-colors ${
                  isSelected
                    ? "bg-[var(--color-surface-elevated)] border border-[var(--color-accent)]/50 text-[var(--color-text)]"
                    : "border border-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-surface-elevated)]/60"
                }`}
              >
                <div className="pr-3 truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-dim)]">
                      {item.category}
                    </span>
                    <span className="font-semibold text-[var(--color-text)] truncate">{item.title}</span>
                  </div>
                  <div className="text-[10px] text-[var(--color-text-dim)] truncate mt-0.5">{item.detail}</div>
                </div>
                <div className="shrink-0 text-[var(--color-text-dim)]">
                  {isSelected ? (
                    <ArrowRight size={13} className="text-[var(--color-accent)]" />
                  ) : item.category === "LINKS" ? (
                    <ExternalLink size={12} />
                  ) : null}
                </div>
              </button>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="py-8 text-center text-xs text-[var(--color-text-dim)]">
              No matching commands or projects found for &quot;{query}&quot;.
            </div>
          )}
        </div>

        {/* Palette Footer Help */}
        <div className="px-4 py-2 border-t border-[var(--color-border)] bg-[var(--color-surface-elevated)]/60 flex items-center justify-between text-[10px] text-[var(--color-text-dim)]">
          <div className="flex items-center gap-3">
            <span>&uarr;&darr; Navigate</span>
            <span>&crarr; Execute</span>
            <span>ESC Close</span>
          </div>
          <div>SAHIL.PAL // DISPATCH SYSTEM</div>
        </div>
      </div>
    </div>
  );
}
