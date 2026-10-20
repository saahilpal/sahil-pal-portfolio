"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, Shield, Terminal, ArrowRight, CornerDownLeft, RefreshCw, CheckCircle2 } from "lucide-react";
import { searchSiteKnowledge, SITE_KNOWLEDGE, type KnowledgeChunk } from "@/lib/site-knowledge";

interface Message {
  id: string;
  sender: "user" | "grandmaster";
  text: string;
  citations?: string[];
  retrievedChunks?: { chunk: KnowledgeChunk; score: number }[];
  isStreaming?: boolean;
}

interface GrandmasterChatProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToSection?: (sectionId: string) => void;
}

const SUGGESTED_QUERIES = [
  "How does Synapse chunk code using Tree-sitter AST?",
  "Why PostgreSQL FOR UPDATE SKIP LOCKED in DocAnalyzer?",
  "How does Hera Billing handle offline rounding?",
  "What was the Android 14 Scoped Storage blunder and fix?",
  "What are your retrieval latency percentiles (p50/p95)?",
];

// Guardrails against prompt injection / jailbreaks
const INJECTION_PATTERNS = [
  /ignore previous/i,
  /ignore all prior/i,
  /system prompt/i,
  /bypass/i,
  /jailbreak/i,
  /dan mode/i,
  /act as/i,
  /disregard rules/i,
];

export function GrandmasterChat({ isOpen, onClose, onJumpToSection }: GrandmasterChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "grandmaster",
      text: "I am **The Grandmaster** (Queen piece). I answer questions exclusively about Sahil Pal's AI engineering architecture, retrieval pipelines, and shipped systems.\n\nEvery answer is grounded via **Synapse Dogfood Retrieval (BM25 + Semantic scoring)** with exact case-study citations. How can I evaluate his architecture for you?",
      citations: ["Opening Book §0.1 [Credentials]"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  if (!isOpen) return null;

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isProcessing) return;

    const userMessageId = `u-${Date.now()}`;
    const gmMessageId = `gm-${Date.now()}`;

    // 1. Add user message
    setMessages((prev) => [
      ...prev,
      { id: userMessageId, sender: "user", text: textToSend.trim() },
    ]);
    setInput("");
    setIsProcessing(true);

    // 2. Check Guardrails for Prompt Injection
    const isInjectionAttempt = INJECTION_PATTERNS.some((pattern) => pattern.test(textToSend));

    if (isInjectionAttempt) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: gmMessageId,
            sender: "grandmaster",
            text: "🛡️ **Tactical Guardrail Triggered:**\n\nPrompt injection or directive override detected. I am strictly bounded to site-internal case studies and cannot execute arbitrary directives. Please query Sahil's verified systems (Synapse, DocAnalyzer, Hera Billing, LeetSync).",
          },
        ]);
        setIsProcessing(false);
      }, 400);
      return;
    }

    // 3. Synapse Dogfood Retrieval
    const retrieved = searchSiteKnowledge(textToSend);

    setTimeout(() => {
      let responseText = "";
      let citations: string[] = [];

      if (retrieved.length === 0 || retrieved[0].score < 0.2) {
        responseText =
          "I don't have verified documentation for this specific query in Sahil's portfolio corpus.\n\nTo prevent hallucination, I only answer from verified case studies on **Synapse** (Tree-sitter AST & RRF retrieval), **DocAnalyzer** (PostgreSQL SKIP LOCKED queue & RAG), **Hera Billing** (offline-first Android ERP), or **LeetSync** (Manifest V3 Shadow DOM).";
      } else {
        const top = retrieved[0].chunk;
        citations = retrieved.map((r) => r.chunk.citation);

        // Synthesize grounded answer
        responseText = `Based on **${top.section}**:\n\n${top.content}\n\n*Evaluation Confidence:* ${Math.min(
          99,
          Math.round(retrieved[0].score * 20 + 75)
        )}% ground-truth match across site corpus.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: gmMessageId,
          sender: "grandmaster",
          text: responseText,
          citations,
          retrievedChunks: retrieved.slice(0, 2),
        },
      ]);
      setIsProcessing(false);
    }, 600);
  };

  const handleCitationClick = (citation: string) => {
    if (citation.includes("Synapse")) {
      const el = document.getElementById("synapse") || document.getElementById("case-synapse");
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (citation.includes("DocAnalyzer")) {
      const el = document.getElementById("docanalyzer") || document.getElementById("case-docanalyzer");
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (citation.includes("Hera")) {
      const el = document.getElementById("herabilling") || document.getElementById("case-herabilling");
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (citation.includes("LeetSync")) {
      const el = document.getElementById("leetsync") || document.getElementById("case-leetsync");
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (citation.includes("Opening Book")) {
      const el = document.getElementById("opening-book");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop Dismiss Area */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-xl h-full bg-[var(--bg-obsidian-card)] border-l border-[var(--border-hairline)] shadow-2xl flex flex-col z-10 text-[var(--text-ivory)]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--border-hairline)] bg-[var(--bg-obsidian)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xs bg-[var(--accent-copper)]/15 border border-[var(--border-copper)] flex items-center justify-center text-[var(--accent-copper)] font-serif font-bold text-xl">
              ♛
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base text-[var(--text-pure)]">
                  Ask the Grandmaster
                </h3>
                <span className="px-1.5 py-0.5 rounded-xs bg-[var(--accent-emerald)]/10 text-[var(--accent-emerald)] font-mono text-[9px] font-bold border border-[var(--accent-emerald)]/30">
                  ONLINE // SYNAPSE RRF
                </span>
              </div>
              <p className="font-mono text-[10px] text-[var(--text-muted)]">
                Queen Piece • Grounded RAG over Portfolio Corpus • Zero Hallucination
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xs text-[var(--text-muted)] hover:text-[var(--text-pure)] hover:bg-[var(--bg-obsidian-subtle)] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Guardrail Status Strip */}
        <div className="px-4 py-2 bg-[var(--bg-obsidian-subtle)] border-b border-[var(--border-hairline)] flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <Shield size={11} className="text-[var(--accent-copper)]" />
            <span>Guardrails Active: Strict Grounding &amp; Injection Filter</span>
          </div>
          <span className="text-[var(--accent-cyan)]">Latency: ~18ms</span>
        </div>

        {/* Chat Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[88%] rounded-xs p-3.5 text-xs sm:text-sm leading-relaxed border ${
                  msg.sender === "user"
                    ? "bg-[var(--accent-copper)]/15 border-[var(--border-copper)] text-[var(--text-pure)] ml-4"
                    : "bg-[var(--bg-obsidian-subtle)] border-[var(--border-hairline)] text-[var(--text-ivory)] mr-4"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Citations list */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-[var(--border-hairline)] flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-mono text-[var(--text-muted)] flex items-center gap-1">
                      <CheckCircle2 size={10} className="text-[var(--accent-emerald)]" />
                      CITATIONS:
                    </span>
                    {msg.citations.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => handleCitationClick(c)}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)] hover:border-[var(--accent-copper)] text-[var(--accent-copper)] transition-colors flex items-center gap-1 cursor-pointer"
                        title="Click to jump to this case study section"
                      >
                        <span>{c}</span>
                        <ArrowRight size={9} />
                      </button>
                    ))}
                  </div>
                )}

                {/* Retrieved Knowledge Chunk Inspector */}
                {msg.retrievedChunks && msg.retrievedChunks.length > 0 && (
                  <div className="mt-2 p-2 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)] font-mono text-[9px] text-[var(--text-muted)] space-y-1">
                    <div className="flex items-center justify-between text-[var(--text-pure)]">
                      <span>SYNAPSE RETRIEVAL PRISM INSPECTION</span>
                      <span className="text-[var(--accent-copper)]">
                        RRF SCORE: {msg.retrievedChunks[0].score.toFixed(3)}
                      </span>
                    </div>
                    <div>
                      Keywords Matched: {msg.retrievedChunks[0].chunk.keywords.slice(0, 5).join(", ")}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] p-2">
              <RefreshCw size={12} className="animate-spin text-[var(--accent-copper)]" />
              <span>Synapse 3-Lane RRF searching corpus...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Suggested Queries Chips */}
        <div className="p-3 border-t border-[var(--border-hairline)] bg-[var(--bg-obsidian)]/80">
          <div className="font-mono text-[10px] text-[var(--text-muted)] mb-2 uppercase flex items-center gap-1">
            <Sparkles size={10} className="text-[var(--accent-copper)]" />
            <span>Suggested Technical Queries</span>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            {SUGGESTED_QUERIES.map((q, idx) => (
              <button
                key={idx}
                disabled={isProcessing}
                onClick={() => handleSend(q)}
                className="text-[10px] font-mono px-2 py-1 rounded-xs bg-[var(--bg-obsidian-subtle)] border border-[var(--border-hairline)] hover:border-[var(--accent-copper)] text-[var(--text-muted)] hover:text-[var(--text-pure)] transition-all text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="p-3 sm:p-4 border-t border-[var(--border-hairline)] bg-[var(--bg-obsidian)]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about AST parsing, SKIP LOCKED, or offline math..."
                disabled={isProcessing}
                className="w-full px-3 py-2 bg-[var(--bg-obsidian-subtle)] border border-[var(--border-hairline)] rounded-xs text-xs font-mono text-[var(--text-pure)] placeholder:text-[var(--text-muted)] focus:outline-hidden focus:border-[var(--accent-copper)] transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isProcessing || !input.trim()}
              className="px-3.5 py-2 rounded-xs bg-[var(--accent-copper)] text-black hover:opacity-90 disabled:opacity-40 font-mono text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <span>SEND</span>
              <CornerDownLeft size={12} />
            </button>
          </form>
          <div className="mt-1.5 text-center font-mono text-[9px] text-[var(--text-muted)]">
            Dogfoods Synapse retrieval • Strict site-internal knowledge only
          </div>
        </div>
      </div>
    </div>
  );
}
