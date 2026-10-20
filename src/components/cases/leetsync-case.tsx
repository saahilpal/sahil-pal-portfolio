"use client";

import { useState } from "react";
import { CASE_STUDIES } from "@/lib/chess-puzzle";
import { Shield, GitCommit, ArrowUpRight, CheckCircle2, Star, Eye, Code } from "lucide-react";
import { useStaggerReveal } from "@/lib/anime-motion";

export function LeetSyncCase() {
  const caseData = CASE_STUDIES.find((c) => c.id === "leetsync")!;
  const pillarsRef = useStaggerReveal<HTMLDivElement>(".case-pillar-block", { staggerMs: 110, translateY: 16 });
  const [activeTab, setActiveTab] = useState<"payload" | "shadow">("payload");
  const [isCopied, setIsCopied] = useState(false);

  const sampleMarkdown = `## 206. Reverse Linked List
**Difficulty:** Easy | **Runtime:** 0 ms (100.00%) | **Memory:** 11.2 MB (89.4%)

### Solution (C++)
\`\`\`cpp
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode *prev = nullptr, *curr = head;
        while (curr) {
            ListNode* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
};
\`\`\`
*Committed automatically by LeetSync via GitHub Contents API.*`;

  return (
    <article id="leetsync" className="card-tactile p-4 sm:p-8 lg:p-10 rounded-md space-y-6 sm:space-y-8 scroll-mt-24 border border-[var(--border-chess)] max-w-full overflow-hidden">
      {/* Product Hero Header Plate */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 border-b border-[var(--border-chess)] pb-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-0.5 rounded-sm bg-[var(--chess-green-subtle)] border border-[var(--border-green)] text-[var(--chess-green)] font-bold flex items-center">
              <span className="piece-icon-rotate mr-1.5 text-sm">♙</span>
              <span>PAWN ➔ QUEEN // DEVELOPER TOOLING</span>
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-[var(--chess-brilliant)] font-semibold">
              MANIFEST V3 &amp; SHADOW DOM
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[var(--text-white)] tracking-tight">
            LeetSync: Automated DSA Portfolio Vault &amp; GitHub Sync Engine
          </h2>

          <p className="text-sm sm:text-base text-[var(--chess-nude-muted)] max-w-3xl font-sans leading-relaxed">
            Developers waste hours manually copying code and percentiles into GitHub to prove engineering consistency. LeetSync intercepts accepted submissions in a <strong>closed Shadow DOM sandbox</strong>, formats structured Markdown, and commits directly to user repositories via the GitHub Contents API.
          </p>
        </div>

        {/* Pitch Call-to-Action Links */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href="https://github.com/saahilpal/LeetSync"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile px-4 py-2 rounded-sm bg-[var(--chess-green)] hover:bg-[var(--chess-green-hover)] text-black font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Star size={13} className="fill-black" />
            <span>GITHUB REPO</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      {/* The 3-Pillar Product Pitch Story (Scannable in 15 seconds) */}
      <div ref={pillarsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {/* Pillar 1: The Bottleneck */}
        <div className="case-pillar-block p-4 rounded-sm bg-[var(--bg-chess-surface)] border border-[var(--border-chess)] space-y-2">
          <div className="text-[10px] text-[var(--accent-rose)] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span>● THE BOTTLE-NECK</span>
          </div>
          <div className="text-sm font-serif font-bold text-[var(--text-white)]">
            Manual Copy-Pasting &amp; Monaco DOM Collisions
          </div>
          <p className="font-sans text-xs text-[var(--chess-nude-muted)] leading-relaxed">
            Logging daily DSA solutions by hand is tedious. Worse, browser extensions that inject styles into LeetCode break its complex Monaco Editor layout and cause Content Security Policy (CSP) rejections.
          </p>
        </div>

        {/* Pillar 2: The Solution */}
        <div className="case-pillar-block p-4 rounded-sm bg-[var(--bg-chess-surface)] border border-[var(--border-chess)] space-y-2">
          <div className="text-[10px] text-[var(--chess-green)] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span>✦ THE ARCHITECTURAL FIX</span>
          </div>
          <div className="text-sm font-serif font-bold text-[var(--text-white)]">
            Closed Shadow DOM + Octokit Sync
          </div>
          <p className="font-sans text-xs text-[var(--chess-nude-muted)] leading-relaxed">
            Mounts inside a closed Shadow Root (`mode: &quot;closed&quot;`), creating an impenetrable CSS boundary. Intercepts submission responses, converts metrics to markdown, and pushes commits via the Octokit GitHub API.
          </p>
        </div>

        {/* Pillar 3: Real Proof Metrics */}
        <div className="case-pillar-block p-4 rounded-sm bg-[var(--bg-chess-surface)] border border-[var(--border-chess)] space-y-2">
          <div className="text-[10px] text-[var(--chess-brilliant)] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span>★ PROVEN BENCHMARK RESULTS</span>
          </div>
          <div className="text-sm font-serif font-bold text-[var(--text-white)]">
            0% Style Leakage &amp; 1-Click Vault
          </div>
          <p className="font-sans text-xs text-[var(--chess-nude-muted)] leading-relaxed">
            Zero style collisions with LeetCode SPA. Automatically populates GitHub repositories with categorized difficulty folders, runtime percentiles, and clean documentation with zero manual friction.
          </p>
        </div>
      </div>

      {/* Interactive Product Feature: Shadow DOM Sandbox & Generated Commit Preview */}
      <div className="p-5 sm:p-6 rounded-sm bg-[var(--bg-chess-subtle)] border border-[var(--border-chess)] space-y-5 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-chess)] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--chess-green)]" />
            <span className="font-bold text-[var(--text-white)] text-sm font-serif">
              Live Product Demo: Shadow DOM Isolation &amp; Auto-Commit Vault
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab("payload")}
              className={`btn-tactile px-3 py-1.5 rounded-sm text-[11px] font-bold ${
                activeTab === "payload"
                  ? "bg-[var(--chess-green)] text-black"
                  : "bg-[var(--bg-chess-card)] text-[var(--text-nude)] border border-[var(--border-chess)]"
              }`}
            >
              <span>GITHUB COMMIT PAYLOAD</span>
            </button>
            <button
              onClick={() => setActiveTab("shadow")}
              className={`btn-tactile px-3 py-1.5 rounded-sm text-[11px] font-bold ${
                activeTab === "shadow"
                  ? "bg-[var(--chess-green)] text-black"
                  : "bg-[var(--bg-chess-card)] text-[var(--text-nude)] border border-[var(--border-chess)]"
              }`}
            >
              <span>SHADOW DOM BOUNDARY</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Structured Commit Payload */}
        {activeTab === "payload" ? (
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[11px] text-[var(--chess-nude-dark)]">
              <span>FORMATTED MARKDOWN GENERATED FOR REPOSITORY:</span>
              <span className="text-[var(--chess-green)] font-semibold flex items-center gap-1 self-start sm:self-auto">
                <GitCommit size={13} />
                <span>Pushed via Octokit Contents API</span>
              </span>
            </div>
            <pre className="p-4 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-chess)] text-[var(--text-nude)] font-mono text-[11px] overflow-x-auto whitespace-pre-wrap break-words max-w-full leading-relaxed">
              {sampleMarkdown}
            </pre>
          </div>
        ) : (
          /* Tab 2: Shadow DOM Isolation Inspection */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-chess)] space-y-2">
              <div className="text-[11px] font-bold text-[var(--text-white)] flex items-center gap-1.5">
                <Shield size={13} className="text-[var(--chess-green)]" />
                <span>Inside #leetsync-root (Closed Shadow Root)</span>
              </div>
              <p className="font-sans text-xs text-[var(--chess-nude-muted)] leading-relaxed">
                Styles are 100% encapsulated. Button styles, tooltips, and sync spinners cannot leak into or mutate LeetCode&apos;s parent document.
              </p>
              <div className="px-2.5 py-1 rounded-xs bg-[var(--chess-green-subtle)] text-[var(--chess-green)] font-bold text-[10px] inline-block border border-[var(--border-green)]">
                CSS ISOLATION: COMPLETE
              </div>
            </div>

            <div className="p-4 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-chess)] space-y-2">
              <div className="text-[11px] font-bold text-[var(--text-white)] flex items-center gap-1.5">
                <Code size={13} className="text-[var(--chess-brilliant)]" />
                <span>Host Page (Monaco Editor DOM)</span>
              </div>
              <p className="font-sans text-xs text-[var(--chess-nude-muted)] leading-relaxed">
                LeetCode&apos;s syntax highlighter, line gutter, and theme listeners remain completely untouched. Zero flickering, zero layout thrashing.
              </p>
              <div className="px-2.5 py-1 rounded-xs bg-[var(--chess-surface)] text-[var(--chess-nude)] font-bold text-[10px] inline-block border border-[var(--border-chess)]">
                HOST MONACO HEALTH: 100% CLEAN
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tech Stack Pills */}
      <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
        <span className="text-[11px] text-[var(--chess-nude-dark)] mr-1">TECH STACK:</span>
        {caseData.stack.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 rounded-sm bg-[var(--bg-chess-surface)] border border-[var(--border-chess)] text-[var(--text-nude)]"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
