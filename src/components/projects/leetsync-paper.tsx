"use client";

import { useState, useRef } from "react";
import { animate } from "animejs";
import {
  GitBranch,
  ArrowUpRight,
  Play,
  CheckCircle2,
  Code2,
  FolderGit2,
  Cpu,
  Layers,
  Terminal,
  ExternalLink,
  ShieldCheck,
  Check,
} from "lucide-react";

interface LeetCodeProblem {
  id: number;
  title: string;
  slug: string;
  difficulty: "Hard" | "Medium" | "Easy";
  difficultyColor: string;
  lang: string;
  runtime: string;
  runtimePercentile: string;
  memory: string;
  memoryPercentile: string;
  codeSnippet: string;
}

const PROBLEMS: LeetCodeProblem[] = [
  {
    id: 42,
    title: "Trapping Rain Water",
    slug: "0042-trapping-rain-water",
    difficulty: "Hard",
    difficultyColor: "var(--stamp-red)",
    lang: "C++20",
    runtime: "4 ms",
    runtimePercentile: "98.4%",
    memory: "16.2 MB",
    memoryPercentile: "89.1%",
    codeSnippet: `int trap(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxLeft = 0, maxRight = 0, water = 0;
    while (left < right) {
        if (height[left] <= height[right]) {
            if (height[left] >= maxLeft) maxLeft = height[left];
            else water += maxLeft - height[left];
            left++;
        } else {
            if (height[right] >= maxRight) maxRight = height[right];
            else water += maxRight - height[right];
            right--;
        }
    }
    return water;
}`,
  },
  {
    id: 146,
    title: "LRU Cache",
    slug: "0146-lru-cache",
    difficulty: "Medium",
    difficultyColor: "var(--stamp-amber)",
    lang: "Java 17",
    runtime: "42 ms",
    runtimePercentile: "94.6%",
    memory: "118.4 MB",
    memoryPercentile: "91.2%",
    codeSnippet: `class LRUCache {
    private final int capacity;
    private final Map<Integer, Node> map = new HashMap<>();
    private final Node head = new Node(0, 0), tail = new Node(0, 0);

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        insert(node);
        return node.val;
    }
}`,
  },
  {
    id: 206,
    title: "Reverse Linked List",
    slug: "0206-reverse-linked-list",
    difficulty: "Easy",
    difficultyColor: "var(--stamp-green)",
    lang: "TypeScript",
    runtime: "52 ms",
    runtimePercentile: "99.1%",
    memory: "44.8 MB",
    memoryPercentile: "82.5%",
    codeSnippet: `function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let curr = head;
    while (curr !== null) {
        const nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,
  },
];

export function LeetSyncPaper() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStep, setSyncStep] = useState<string>("SYSTEM READY // EXTENSION LISTENING ON DOM");
  const [commitSha, setCommitSha] = useState<string>("7f8a92b");
  const [synced, setSynced] = useState<boolean>(false);

  const shadowBoxRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const activeProblem = PROBLEMS[selectedIdx];

  const triggerSimulation = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSynced(false);

    const steps = [
      "1. INTERCEPTING 'ACCEPTED' SUBMISSION EVENT IN DOM...",
      "2. ISOLATING STYLES INSIDE SHADOW ROOT (#leetsync-root)...",
      "3. SERIALIZING BENCHMARKS & MARKDOWN METADATA...",
      "4. EXECUTING GITHUB API CONTENTS COMMIT...",
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < steps.length) {
        setSyncStep(steps[current]);
        current++;
      } else {
        clearInterval(interval);
        const randomHex = Math.random().toString(16).substring(2, 9);
        setCommitSha(randomHex);
        setSyncStep(`COMMIT VERIFIED // SHA: ${randomHex}`);
        setSynced(true);
        setIsSyncing(false);

        // Shadow DOM slide-in animation
        if (shadowBoxRef.current) {
          animate(shadowBoxRef.current, {
            translateY: [-15, 0],
            opacity: [0, 1],
            duration: 400,
            ease: "outBack",
          });
        }
      }
    }, 400);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = (-y / rect.height) * 3;
    const rotY = (x / rect.width) * 3;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="paper-sheet p-6 sm:p-10 rounded-sm space-y-8 relative overflow-hidden transition-transform duration-200 ease-out"
    >
      {/* Corner Registration Marks */}
      <div className="absolute top-3 left-3 font-mono text-[9px] text-[var(--text-ink-faint)]">+</div>
      <div className="absolute top-3 right-3 font-mono text-[9px] text-[var(--text-ink-faint)]">+</div>
      <div className="absolute bottom-3 left-3 font-mono text-[9px] text-[var(--text-ink-faint)]">+</div>
      <div className="absolute bottom-3 right-3 font-mono text-[9px] text-[var(--text-ink-faint)]">+</div>

      {/* Header Plate */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-paper-strong)] pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="stamp-seal stamp-blue">DEVELOPER TOOLING // 04</span>
            <span className="text-[var(--text-ink-muted)]">•</span>
            <span className="text-[var(--text-ink-muted)]">FIG. 4.0 — SHADOW DOM &amp; GITHUB CONTENTS API SYNCHRONIZER</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-ink)]">
            LeetSync
          </h3>

          <p className="text-sm sm:text-base text-[var(--text-ink-secondary)] max-w-2xl font-sans">
            Manifest V3 browser extension and companion dashboard that intercepts accepted algorithmic submissions on LeetCode. Formats structured Markdown vaults with runtime/memory percentiles and pushes directly to GitHub via the Octokit Contents API.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://leetsync-web.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 border border-[var(--border-paper)] hover:border-[var(--text-ink)] rounded-xs font-mono text-xs text-[var(--text-ink)] flex items-center gap-1.5 transition-colors bg-[var(--bg-card)] shadow-xs"
          >
            <span>Live Companion</span>
            <ArrowUpRight size={12} />
          </a>
          <a
            href="https://github.com/saahilpal/LeetSync"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-[var(--text-ink)] text-[var(--bg-paper)] rounded-xs font-mono text-xs flex items-center gap-1.5 hover:bg-[var(--text-ink-secondary)] active:scale-95 transition-all shadow-xs"
          >
            <span>GitHub Spec</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>

      {/* Simulation Stage: Problem Selector */}
      <div className="p-3 bg-[var(--bg-card-draft)] border border-[var(--border-paper)] rounded-xs flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-[var(--text-ink-muted)] text-[11px]">
          <Code2 size={12} className="text-[var(--stamp-blue)]" />
          <span className="font-bold text-[var(--text-ink)]">SELECT DSA PROBLEM SUBMISSION:</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {PROBLEMS.map((prob, idx) => (
            <button
              key={prob.id}
              onClick={() => {
                setSelectedIdx(idx);
                setSynced(false);
              }}
              className={`px-2.5 py-1 rounded-xs border text-[11px] transition-all flex items-center gap-1.5 ${
                selectedIdx === idx
                  ? "bg-[var(--text-ink)] text-[var(--bg-paper)] border-[var(--text-ink)] font-bold shadow-xs"
                  : "bg-[var(--bg-card)] border-[var(--border-paper)] text-[var(--text-ink-secondary)] hover:border-[var(--border-paper-strong)]"
              }`}
            >
              <span>#{prob.id}</span>
              <span className="truncate max-w-[140px]">{prob.title}</span>
              <span
                style={{ color: prob.difficultyColor }}
                className="text-[9px] font-bold uppercase"
              >
                [{prob.difficulty}]
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Technical Schematic Stage: Dual Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Accepted Submission Interceptor & Shadow DOM Container */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border border-[var(--border-paper)] rounded-xs p-4 sm:p-6 bg-[var(--bg-card-draft)] space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[var(--border-paper)] pb-2 text-[11px] text-[var(--text-ink-muted)]">
              <span className="flex items-center gap-1.5 font-bold text-[var(--text-ink)]">
                <Terminal size={12} />
                <span>MONACO SUBMISSION INTERCEPTOR ({activeProblem.lang})</span>
              </span>
              <span className="text-[10px] text-[var(--stamp-green)] font-semibold flex items-center gap-1">
                <CheckCircle2 size={11} />
                <span>ACCEPTED (BEATS {activeProblem.runtimePercentile})</span>
              </span>
            </div>

            {/* Code Snippet Box */}
            <pre className="p-3 bg-[var(--bg-card)] border border-[var(--border-paper)] rounded-xs text-[11px] leading-relaxed text-[var(--text-ink-secondary)] overflow-x-auto shadow-inner max-h-[160px]">
              {activeProblem.codeSnippet}
            </pre>

            {/* Interactive Shadow DOM Overlay Card */}
            <div
              ref={shadowBoxRef}
              className="p-3.5 bg-[var(--bg-card)] border border-[var(--border-paper-strong)] rounded-xs space-y-2 shadow-sm"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-[var(--text-ink)] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--stamp-blue)]" />
                  <span>INJECTED SHADOW DOM CONTAINER (#leetsync-root)</span>
                </span>
                <span className="text-[10px] text-[var(--text-ink-muted)]">
                  CSS ISOLATION: 100%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="p-2 border border-[var(--border-paper)] rounded-xs bg-[var(--bg-card-draft)]">
                  <div className="text-[var(--text-ink-muted)] text-[10px]">EXECUTION SPEED</div>
                  <div className="font-bold text-[var(--text-ink)] mt-0.5">
                    {activeProblem.runtime} <span className="text-[var(--stamp-green)] text-[10px]">(Beats {activeProblem.runtimePercentile})</span>
                  </div>
                </div>

                <div className="p-2 border border-[var(--border-paper)] rounded-xs bg-[var(--bg-card-draft)]">
                  <div className="text-[var(--text-ink-muted)] text-[10px]">MEMORY USAGE</div>
                  <div className="font-bold text-[var(--text-ink)] mt-0.5">
                    {activeProblem.memory} <span className="text-[var(--stamp-blue)] text-[10px]">(Beats {activeProblem.memoryPercentile})</span>
                  </div>
                </div>
              </div>

              {/* Action Trigger */}
              <button
                onClick={triggerSimulation}
                disabled={isSyncing}
                className="w-full mt-2 py-2 bg-[var(--text-ink)] text-[var(--bg-paper)] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[var(--text-ink-secondary)] active:scale-95 disabled:opacity-50 transition-all rounded-xs shadow-xs"
              >
                <Play size={11} className={isSyncing ? "animate-spin" : ""} />
                <span>{isSyncing ? "COMMITTING TO GITHUB..." : "SIMULATE GITHUB AUTO-SYNC"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: GitHub Contents API Vault Push */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border border-[var(--border-paper)] p-5 rounded-xs bg-[var(--bg-card)] space-y-4 shadow-sm font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[var(--border-paper)] pb-2">
              <span className="font-bold text-[var(--text-ink)] flex items-center gap-1.5">
                <FolderGit2 size={13} className="text-[var(--stamp-blue)]" />
                <span>GITHUB VAULT STRUCTURE</span>
              </span>
              <span className="text-[10px] text-[var(--text-ink-muted)]">
                BRANCH: MAIN
              </span>
            </div>

            {/* Tree File View */}
            <div className="p-3 bg-[var(--bg-card-draft)] border border-[var(--border-paper)] rounded-xs space-y-1.5 text-[11px] leading-relaxed">
              <div className="flex items-center gap-1.5 text-[var(--text-ink-secondary)]">
                <span>📁</span>
                <span>leetcode/</span>
              </div>
              <div className="flex items-center gap-1.5 text-[var(--text-ink-secondary)] pl-4">
                <span>📁</span>
                <span>{activeProblem.difficulty.toLowerCase()}/</span>
              </div>
              <div className="flex items-center gap-1.5 text-[var(--text-ink)] font-bold pl-8 bg-[var(--border-paper)]/50 p-1 rounded-xs">
                <span>📄</span>
                <span className="truncate">{activeProblem.slug}.md</span>
              </div>
            </div>

            {/* Live Commit Telemetry Card */}
            <div className="p-3 border border-[var(--border-paper-strong)] rounded-xs bg-[var(--bg-paper-secondary)] space-y-2">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-[var(--text-ink-muted)]">OCTOKIT CONTENTS API</span>
                <span className="font-bold text-[var(--text-ink)]">STATUS: 201 CREATED</span>
              </div>

              <div className="text-[10.5px] text-[var(--text-ink-secondary)] leading-relaxed">
                {syncStep}
              </div>

              {synced && (
                <div className="pt-2 border-t border-dashed border-[var(--border-paper)] flex items-center justify-between text-[10px] text-[var(--stamp-green)] font-bold">
                  <span className="flex items-center gap-1">
                    <Check size={11} className="stroke-[3]" />
                    <span>VAULT SYNCHRONIZED</span>
                  </span>
                  <span className="text-[var(--text-ink-muted)] font-normal">SHA: {commitSha}</span>
                </div>
              )}
            </div>

            {/* Architectural Highlights */}
            <div className="space-y-1.5 text-[11px] text-[var(--text-ink-muted)] pt-1 border-t border-dashed border-[var(--border-paper)]">
              <div>• Zero interference with LeetCode Monaco editor.</div>
              <div>• Automated README documentation per solution.</div>
              <div>• Direct personal access token OAuth sync.</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
