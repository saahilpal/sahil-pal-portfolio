"use client";

import { useState } from "react";
import { CASE_STUDIES } from "@/lib/chess-puzzle";
import { Code2, FolderGit2, ArrowUpRight, Play, CheckCircle2, ShieldCheck, Check } from "lucide-react";

export function LeetSyncCase() {
  const caseData = CASE_STUDIES.find((c) => c.id === "leetsync")!;

  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [synced, setSynced] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string>("EXTENSION LISTENING ON DOM");
  const [sha, setSha] = useState<string>("7f8a92b");

  const triggerSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSynced(false);
    setSyncStatus("INTERCEPTING MONACO SUBMISSION...");

    setTimeout(() => {
      setSyncStatus("ISOLATING SHADOW ROOT (#leetsync-root)...");
    }, 400);

    setTimeout(() => {
      setSyncStatus("PUSHING COMMIT TO GITHUB CONTENTS API...");
    }, 800);

    setTimeout(() => {
      const randomSha = Math.random().toString(16).substring(2, 9);
      setSha(randomSha);
      setSyncStatus(`COMMIT VERIFIED // SHA: ${randomSha}`);
      setSynced(true);
      setIsSyncing(false);
    }, 1200);
  };

  return (
    <article id="leetsync" className="obsidian-card p-6 sm:p-10 rounded-sm space-y-8 scroll-mt-24">
      {/* Header Plate */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-2 py-0.5 rounded-xs bg-[var(--accent-copper)]/15 border border-[var(--accent-copper)] text-[var(--accent-copper)] font-bold">
              MOVE 4: PAWN ➔ QUEEN // 4. e8=Q#
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-[var(--accent-rose)] font-semibold">CHECKMATE // DEVELOPER TOOLING</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-pure)]">
            {caseData.title}
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-3xl font-sans">
            {caseData.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {caseData.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xs border border-[var(--border-hairline)] hover:border-[var(--text-pure)] bg-[var(--bg-obsidian-subtle)] text-[var(--text-ivory)] font-mono text-xs flex items-center gap-1.5 transition-all shadow-xs"
            >
              <span>{link.label}</span>
              <ArrowUpRight size={12} />
            </a>
          ))}
        </div>
      </div>

      {/* Grid: Problem & Constraints vs Tradeoffs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs font-mono">
        <div className="lg:col-span-6 space-y-4 p-4 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)]">
          <div className="font-bold text-[var(--text-pure)] uppercase tracking-wider text-[11px] border-b border-[var(--border-hairline)] pb-2">
            THE PRODUCTION PROBLEM &amp; CONSTRAINTS
          </div>
          <p className="text-[var(--text-muted)] leading-relaxed font-sans text-sm">
            {caseData.problem}
          </p>
          <div className="space-y-1.5 pt-1">
            <div className="text-[var(--text-ivory)] font-bold text-[10.5px]">CONSTRAINTS:</div>
            {caseData.constraints.map((c, i) => (
              <div key={i} className="flex items-start gap-2 text-[var(--text-muted)]">
                <span className="text-[var(--accent-copper)]">•</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4 p-4 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)]">
          <div className="font-bold text-[var(--accent-copper)] uppercase tracking-wider text-[11px] border-b border-[var(--border-hairline)] pb-2">
            KEY ARCHITECTURAL TRADEOFF
          </div>
          <div className="space-y-2 text-xs font-sans">
            <div>
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block">Decision</span>
              <strong className="text-[var(--text-pure)]">{caseData.keyTradeoff.decision}</strong>
            </div>
            <div>
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block">Rationale</span>
              <p className="text-[var(--text-muted)] leading-relaxed">{caseData.keyTradeoff.rationale}</p>
            </div>
            <div>
              <span className="font-mono text-[10px] text-[var(--accent-rose)] uppercase block">Alternative Discarded</span>
              <p className="text-[var(--text-muted)] leading-relaxed">{caseData.keyTradeoff.alternativeDiscarded}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tiny Live Demo: Shadow DOM Sandbox & GitHub Sync */}
      <div className="p-4 sm:p-6 rounded-xs bg-[var(--bg-obsidian-subtle)] border border-[var(--border-hairline)] space-y-4 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-hairline)] pb-2.5">
          <span className="font-bold text-[var(--text-pure)] flex items-center gap-1.5 text-[11px]">
            <FolderGit2 size={13} className="text-[var(--accent-copper)]" />
            <span>SHADOW DOM ISOLATION SANDBOX &amp; GITHUB CONTENTS API</span>
          </span>
          <button
            onClick={triggerSync}
            disabled={isSyncing}
            className="px-2.5 py-1 bg-[var(--bg-obsidian)] border border-[var(--border-hairline)] hover:border-[var(--text-muted)] rounded-xs text-[10px] font-bold text-[var(--accent-copper)] flex items-center gap-1"
          >
            <Play size={10} className={isSyncing ? "animate-spin" : ""} />
            <span>{isSyncing ? "COMMITTING..." : "SIMULATE GITHUB AUTO-SYNC"}</span>
          </button>
        </div>

        {/* Shadow DOM Simulation Window */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)] space-y-2">
            <div className="flex justify-between text-[10px] text-[var(--text-muted)] border-b border-[var(--border-hairline)] pb-1">
              <span>INJECTED SHADOW ROOT (#leetsync-root)</span>
              <span className="text-[var(--accent-emerald)] font-bold">100% ISOLATED</span>
            </div>
            <div className="text-[11px] text-[var(--text-ivory)] leading-relaxed">
              Problem #42: Trapping Rain Water [Hard]
            </div>
            <div className="text-[10px] text-[var(--text-muted)] flex justify-between">
              <span>Speed: 4ms (Beats 98.4%)</span>
              <span>Memory: 16.2 MB (Beats 89.1%)</span>
            </div>
          </div>

          <div className="p-3 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-copper)] space-y-2">
            <div className="flex justify-between text-[10px] text-[var(--accent-copper)] font-bold border-b border-[var(--border-hairline)] pb-1">
              <span>OCTOKIT CONTENTS REST API</span>
              <span>201 CREATED</span>
            </div>
            <div className="text-[10.5px] text-[var(--text-muted)]">
              {syncStatus}
            </div>
            {synced && (
              <div className="text-[10px] text-[var(--accent-emerald)] font-bold flex items-center gap-1">
                <Check size={11} className="stroke-[3]" />
                <span>VAULT REPO SYNC COMPLETE // SHA: {sha}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Code Snippet & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] border-b border-[var(--border-hairline)] pb-1.5">
            <span className="text-[var(--text-ivory)] flex items-center gap-1.5">
              <Code2 size={12} />
              <span>shadow_dom_injector.ts</span>
            </span>
            <span className="text-[10px] text-[var(--accent-copper)]">MANIFEST V3 // TS</span>
          </div>

          <pre className="p-3 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)] text-[11px] leading-relaxed text-[var(--text-muted)] overflow-x-auto shadow-inner">
{`// Attaches closed Shadow Root avoiding Monaco style conflicts
const hostElement = document.createElement("div");
hostElement.id = "leetsync-container";
const shadowRoot = hostElement.attachShadow({ mode: "closed" });

// Push directly via GitHub Contents API
await octokit.rest.repos.createOrUpdateFileContents({
    owner: userConfig.owner,
    repo: userConfig.vaultRepo,
    path: \`leetcode/\${difficulty}/\${slug}.md\`,
    message: \`sync: \${title} (\${runtime}ms, beats \${percentile}%)\`,
    content: btoa(solutionMarkdown),
});`}
          </pre>
        </div>

        <div className="lg:col-span-5 space-y-3 font-mono text-xs">
          <div className="text-[11px] text-[var(--text-muted)] uppercase border-b border-[var(--border-hairline)] pb-1.5 font-bold">
            EVALUATION &amp; NUMERICAL PROOFS
          </div>

          <div className="space-y-2">
            {caseData.results.map((res) => (
              <div key={res.label} className="p-2.5 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)] flex justify-between items-center">
                <div>
                  <div className="font-bold text-[var(--text-pure)]">{res.label}</div>
                  <div className="text-[10px] text-[var(--text-muted)]">{res.desc}</div>
                </div>
                <div className="text-sm font-bold text-[var(--accent-copper)]">{res.value}</div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[10.5px] text-[var(--text-muted)]">
            <strong className="text-[var(--text-ivory)]">Stack:</strong> {caseData.stack.join(" • ")}
          </div>
        </div>
      </div>
    </article>
  );
}
