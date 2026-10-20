"use client";

import { useEffect, useState } from "react";
import { Terminal, Shield, Layers, FileText, ChevronRight } from "lucide-react";

interface MarginTab {
  id: string;
  sectionId: string;
  label: string;
  short: string;
  color: string;
  num: string;
}

const TABS: MarginTab[] = [
  { id: "hero", sectionId: "top", label: "00. DRAFTING DESK", short: "DESK", color: "var(--stamp-red)", num: "00" },
  { id: "systems", sectionId: "systems", label: "01. 4 SYSTEMS", short: "SYS", color: "var(--stamp-blue)", num: "01" },
  { id: "architecture", sectionId: "architecture", label: "02. DOCTRINE", short: "DOC", color: "var(--stamp-green)", num: "02" },
  { id: "index", sectionId: "index", label: "03. SKILLS INDEX", short: "SKL", color: "var(--text-ink)", num: "03" },
  { id: "journey", sectionId: "journey", label: "04. JOURNEY", short: "JRN", color: "var(--stamp-red)", num: "04" },
];

export function BlueprintMarginTabs() {
  const [activeTab, setActiveTab] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const systemsEl = document.getElementById("systems");
      const archEl = document.getElementById("architecture");
      const indexEl = document.getElementById("index");
      const journeyEl = document.getElementById("journey");

      if (journeyEl && scrollPos >= journeyEl.offsetTop) {
        setActiveTab("journey");
      } else if (indexEl && scrollPos >= indexEl.offsetTop) {
        setActiveTab("index");
      } else if (archEl && scrollPos >= archEl.offsetTop) {
        setActiveTab("architecture");
      } else if (systemsEl && scrollPos >= systemsEl.offsetTop) {
        setActiveTab("systems");
      } else {
        setActiveTab("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-2 pointer-events-auto select-none"
      aria-label="Blueprint Section Quick Flags"
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => scrollToSection(tab.sectionId)}
            className={`group flex items-center transition-all duration-200 ease-out font-mono text-[10px] ${
              isActive ? "translate-x-0" : "translate-x-12 hover:translate-x-0"
            }`}
          >
            {/* Extended Label (Visible on hover or when active) */}
            <span
              className={`px-2 py-1 rounded-l-xs bg-[var(--bg-card)] border-y border-l border-[var(--border-paper-strong)] text-[var(--text-ink)] shadow-md transition-opacity duration-150 ${
                isActive ? "opacity-100 font-bold" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              {tab.label}
            </span>

            {/* Tactile Edge Flag */}
            <div
              style={{
                backgroundColor: isActive ? tab.color : "var(--bg-paper-secondary)",
                color: isActive ? "#ffffff" : "var(--text-ink-secondary)",
                borderColor: "var(--border-paper-strong)",
              }}
              className="w-10 h-7 border-y border-l rounded-l-xs flex items-center justify-center font-bold tracking-tighter shadow-sm cursor-pointer"
            >
              {tab.short}
            </div>
          </button>
        );
      })}
    </aside>
  );
}
