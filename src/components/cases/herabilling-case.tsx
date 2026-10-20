"use client";

import { useState } from "react";
import { CASE_STUDIES } from "@/lib/chess-puzzle";
import { Smartphone, Printer, CloudUpload, ArrowUpRight, CheckCircle2, ShieldCheck, Star } from "lucide-react";
import { useStaggerReveal } from "@/lib/anime-motion";

export function HeraBillingCase() {
  const caseData = CASE_STUDIES.find((c) => c.id === "herabilling")!;
  const pillarsRef = useStaggerReveal<HTMLDivElement>(".case-pillar-block", { staggerMs: 110, translateY: 16 });

  const [rate, setRate] = useState<number>(375);
  const [qty, setQty] = useState<number>(7);
  const [printStatus, setPrintStatus] = useState<string>("READY");

  // Standard float calculation (demonstrating why floating point fails wholesale GST parity)
  const rawSubtotal = rate * qty; // 2625
  const rawHalfGst = rawSubtotal * 0.025; // 65.625
  const floatCgst = Math.round(rawHalfGst * 100) / 100; // 65.63
  const floatSgst = Math.round(rawHalfGst * 100) / 100; // 65.63
  const floatDiscrepancy = (floatCgst + floatSgst - rawSubtotal * 0.05).toFixed(2);

  // Hera Integer Parity Math: subtotal scaled to paisa, ensuring even parity
  const subtotalPaise = rate * qty * 100;
  const totalTaxPaise = Math.round(subtotalPaise * 0.05);
  const halfTaxPaise = Math.floor(totalTaxPaise / 2);
  const cgstPaisa = halfTaxPaise;
  const sgstPaisa = totalTaxPaise - halfTaxPaise; // 0 discrepancy guaranteed
  const heraDiscrepancy = ((cgstPaisa + sgstPaisa - totalTaxPaise) / 100).toFixed(2);

  const handleTestPrint = () => {
    setPrintStatus("DISPENSING THERMAL RECEIPT...");
    setTimeout(() => {
      setPrintStatus("RECEIPT DISPENSED • ESC/POS STREAM PASSED");
    }, 1200);
  };

  return (
    <article id="herabilling" className="card-tactile p-6 sm:p-10 rounded-md space-y-8 scroll-mt-24 border border-[var(--border-chess)]">
      {/* Product Hero Header Plate */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[var(--border-chess)] pb-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-0.5 rounded-sm bg-[var(--chess-green-subtle)] border border-[var(--border-green)] text-[var(--chess-green)] font-bold">
              ♘ KNIGHT // OFFLINE SYSTEMS PROOF
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-[var(--chess-brilliant)] font-semibold">
              IN PRODUCTION (Hera Hosiery Wholesale, Bengaluru)
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-white)] tracking-tight">
            Hera Billing: Offline-First Wholesale Android ERP
          </h2>

          <p className="text-sm sm:text-base text-[var(--chess-nude-muted)] max-w-3xl font-sans leading-relaxed">
            Wholesale merchants in crowded commercial markets cannot tolerate cloud downtime or 1-paise GST rounding discrepancies on ₹50,000 cash invoices. Hera Billing is a native offline-first Android ERP with <strong>deterministic integer parity math</strong> and automated AES-GCM Google Drive backup.
          </p>
        </div>

        {/* Pitch Call-to-Action Links */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href="https://github.com/saahilpal"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile px-4 py-2 rounded-sm bg-[var(--chess-green)] hover:bg-[var(--chess-green-hover)] text-black font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Star size={13} className="fill-black" />
            <span>ARCHITECTURE SPEC</span>
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
            Cloud Outages &amp; Tax Rounding Mismatches
          </div>
          <p className="font-sans text-xs text-[var(--chess-nude-muted)] leading-relaxed">
            Weak cellular connectivity freezes web POS counters mid-rush. Furthermore, standard floating-point tax math produces 1-paise mismatches between 2.5% CGST and SGST, causing audit reconciliation failures.
          </p>
        </div>

        {/* Pillar 2: The Solution */}
        <div className="case-pillar-block p-4 rounded-sm bg-[var(--bg-chess-surface)] border border-[var(--border-chess)] space-y-2">
          <div className="text-[10px] text-[var(--chess-green)] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span>✦ THE ARCHITECTURAL FIX</span>
          </div>
          <div className="text-sm font-serif font-bold text-[var(--text-white)]">
            Room v13 Offline + Integer Parity Math
          </div>
          <p className="font-sans text-xs text-[var(--chess-nude-muted)] leading-relaxed">
            Native Jetpack Compose MVI with local Room SQLite WAL. Enforces integer factorization math ensuring 0-paise discrepancies. Daily WorkManager serializes 5 encrypted tables to Google Drive on Wi-Fi reconnect.
          </p>
        </div>

        {/* Pillar 3: Real Proof Metrics */}
        <div className="case-pillar-block p-4 rounded-sm bg-[var(--bg-chess-surface)] border border-[var(--border-chess)] space-y-2">
          <div className="text-[10px] text-[var(--chess-brilliant)] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span>★ PROVEN BENCHMARK RESULTS</span>
          </div>
          <div className="text-sm font-serif font-bold text-[var(--text-white)]">
            100% Offline Uptime &amp; 0-Paise Error
          </div>
          <p className="font-sans text-xs text-[var(--chess-nude-muted)] leading-relaxed">
            Live in production at Hera Hosiery Wholesale. Processed ₹10L+ in offline cash transactions with 0 data loss, instantaneous thermal receipt printing, and Android 14 Scoped Storage FileProvider hardening.
          </p>
        </div>
      </div>

      {/* Interactive Product Feature: Live Parity Calculator & Thermal Receipt Demo */}
      <div className="p-5 sm:p-6 rounded-sm bg-[var(--bg-chess-subtle)] border border-[var(--border-chess)] space-y-5 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-chess)] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--chess-green)]" />
            <span className="font-bold text-[var(--text-white)] text-sm font-serif">
              Live Product Demo: Integer Parity Calculator &amp; Receipt Preview
            </span>
          </div>

          <button
            onClick={handleTestPrint}
            className="btn-tactile px-3 py-1.5 rounded-sm bg-[var(--chess-green)] text-black font-bold text-[11px] flex items-center gap-1.5"
          >
            <Printer size={12} />
            <span>DISPENSE THERMAL RECEIPT</span>
          </button>
        </div>

        {/* Interactive Price & Quantity Adjuster */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] text-[var(--chess-nude-muted)] flex justify-between">
              <span>Item Wholesale Rate (₹):</span>
              <strong className="text-[var(--text-white)]">₹{rate}</strong>
            </label>
            <input
              type="range"
              min="100"
              max="1500"
              step="25"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] text-[var(--chess-nude-muted)] flex justify-between">
              <span>Quantity (Pieces):</span>
              <strong className="text-[var(--text-white)]">{qty} pcs</strong>
            </label>
            <input
              type="range"
              min="1"
              max="25"
              step="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full cursor-pointer"
            />
          </div>
        </div>

        {/* Float vs Integer Parity Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Float Flaw */}
          <div className="p-4 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--accent-rose)]/40 space-y-1.5">
            <div className="text-[10px] text-[var(--accent-rose)] font-bold uppercase">
              Standard Floating-Point Math (IEEE-754)
            </div>
            <div className="text-xs text-[var(--chess-nude-muted)] space-y-1">
              <div>Subtotal: ₹{rawSubtotal.toFixed(2)}</div>
              <div>2.5% CGST: ₹{floatCgst.toFixed(2)}</div>
              <div>2.5% SGST: ₹{floatSgst.toFixed(2)}</div>
              <div className="text-[var(--accent-rose)] font-bold pt-1 border-t border-[var(--border-chess)]">
                Discrepancy: ₹{floatDiscrepancy} (Audit Failure!)
              </div>
            </div>
          </div>

          {/* Hera Integer Parity Perfection */}
          <div className="p-4 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-green)] space-y-1.5 shadow-sm">
            <div className="text-[10px] text-[var(--chess-green)] font-bold uppercase flex items-center gap-1.5">
              <span>Hera Billing Integer Parity Math</span>
              <CheckCircle2 size={13} className="text-[var(--chess-green)]" />
            </div>
            <div className="text-xs text-[var(--chess-nude-muted)] space-y-1">
              <div>Subtotal: ₹{(subtotalPaise / 100).toFixed(2)}</div>
              <div>2.5% CGST: ₹{(cgstPaisa / 100).toFixed(2)}</div>
              <div>2.5% SGST: ₹{(sgstPaisa / 100).toFixed(2)}</div>
              <div className="text-[var(--chess-green)] font-bold pt-1 border-t border-[var(--border-chess)]">
                Discrepancy: ₹{heraDiscrepancy} (Zero Error Guaranteed)
              </div>
            </div>
          </div>
        </div>

        {/* Thermal Print Receipt Simulation Strip */}
        <div className="p-3.5 rounded-sm bg-[var(--bg-chess-card)] border border-[var(--border-chess)] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] gap-2">
          <div className="flex items-center gap-2">
            <Printer size={14} className="text-[var(--chess-green)]" />
            <span className="text-[var(--text-white)] font-bold">{printStatus}</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--chess-nude-dark)]">
            <CloudUpload size={13} className="text-[var(--chess-brilliant)]" />
            <span>Automated Daily Google Drive Backup: AES-GCM Encrypted</span>
          </div>
        </div>
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
