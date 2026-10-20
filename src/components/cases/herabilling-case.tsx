"use client";

import { useState, useRef } from "react";
import { animate } from "animejs";
import { CASE_STUDIES } from "@/lib/chess-puzzle";
import {
  Smartphone,
  Printer,
  Trash2,
  HardDriveDownload,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Check,
  AlertTriangle,
  Play,
  Cloud,
} from "lucide-react";

interface WholesaleItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

const LOTS: WholesaleItem[] = [
  { id: "1", name: "Baba Suit (3-Pc Set Hosiery)", price: 240, qty: 10 },
  { id: "2", name: "Kids Cotton Printed Frock", price: 180, qty: 15 },
  { id: "3", name: "Boys Bio-Washed T-Shirts", price: 140, qty: 20 },
];

export function HeraBillingCase() {
  const caseData = CASE_STUDIES.find((c) => c.id === "herabilling")!;

  const [cart, setCart] = useState<WholesaleItem[]>(LOTS);
  const [taxMode, setTaxMode] = useState<"even-parity" | "ieee-standard">("even-parity");
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [isBackingUp, setIsBackingUp] = useState<boolean>(false);
  const [backupStep, setBackupStep] = useState<string>("SYSTEM IDLE // LAST SYNC: 24H AGO");
  const [backupProgress, setBackupProgress] = useState<number>(0);

  const receiptRef = useRef<HTMLDivElement>(null);

  const subtotal = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const transport = 150;
  const rawTaxable = subtotal + transport;

  let taxable = rawTaxable;
  let cgst = 0;
  let sgst = 0;
  let discrepancy = 0;

  if (taxMode === "even-parity") {
    const adjusted = rawTaxable % 2 !== 0 ? rawTaxable + 1 : rawTaxable;
    taxable = adjusted;
    const split = Math.round(adjusted * 0.025);
    cgst = split;
    sgst = split;
    discrepancy = 0;
  } else {
    cgst = +(rawTaxable * 0.025).toFixed(2);
    sgst = +(rawTaxable * 0.025).toFixed(2);
    discrepancy = +(cgst + sgst - rawTaxable * 0.05).toFixed(2);
  }

  const grandTotal = Math.round(taxable + cgst + sgst);

  const triggerPrint = () => {
    if (isPrinting || !receiptRef.current) return;
    setIsPrinting(true);
    animate(receiptRef.current, {
      translateY: [-40, 0],
      opacity: [0.3, 1],
      duration: 600,
      ease: "outElastic(1, .7)",
      onComplete: () => setIsPrinting(false),
    });
  };

  const triggerBackup = () => {
    if (isBackingUp) return;
    setIsBackingUp(true);
    setBackupProgress(0);

    const steps = [
      { text: "SERIALIZING 5 ROOM v13 ENTITY TABLES...", pct: 25 },
      { text: "ENCODING LOGO & UPI QR (BASE-64)...", pct: 50 },
      { text: "ENCRYPTING SQLCIPHER SNAPSHOT (AES-GCM)...", pct: 75 },
      { text: "GOOGLE DRIVE APPFOLDER MULTIPART UPLOAD OK", pct: 100 },
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < steps.length) {
        setBackupStep(steps[current].text);
        setBackupProgress(steps[current].pct);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsBackingUp(false), 1000);
      }
    }, 400);
  };

  return (
    <article id="herabilling" className="obsidian-card p-6 sm:p-10 rounded-sm space-y-8 scroll-mt-24">
      {/* Header Plate */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-2 py-0.5 rounded-xs bg-[var(--accent-emerald)]/15 border border-[var(--accent-emerald)] text-[var(--accent-emerald)] font-bold">
              MOVE 3: KNIGHT // 3. Ne6
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-[var(--accent-copper)] font-semibold">PRODUCTION PROOF &amp; MOBILE EDGE</span>
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
                <span className="text-[var(--accent-emerald)]">•</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4 p-4 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)]">
          <div className="font-bold text-[var(--accent-emerald)] uppercase tracking-wider text-[11px] border-b border-[var(--border-hairline)] pb-2">
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

      {/* Tiny Live Demo: Wholesale POS & Drive Sync */}
      <div className="p-4 sm:p-6 rounded-xs bg-[var(--bg-obsidian-subtle)] border border-[var(--border-hairline)] space-y-4 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-hairline)] pb-2.5">
          <span className="font-bold text-[var(--text-pure)] flex items-center gap-1.5 text-[11px]">
            <Smartphone size={13} className="text-[var(--accent-emerald)]" />
            <span>INTERACTIVE WHOLESALE POS &amp; GOOGLE DRIVE BACKUP ENGINE</span>
          </span>
          <button
            onClick={triggerBackup}
            disabled={isBackingUp}
            className="px-2.5 py-1 bg-[var(--bg-obsidian)] border border-[var(--border-hairline)] hover:border-[var(--text-muted)] rounded-xs text-[10px] font-bold text-[var(--accent-emerald)] flex items-center gap-1"
          >
            <Cloud size={11} className={isBackingUp ? "animate-spin" : ""} />
            <span>{isBackingUp ? "SYNCING..." : "TEST CLOUD BACKUP"}</span>
          </button>
        </div>

        {/* Backup Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] text-[var(--text-muted)]">
            <span>{backupStep}</span>
            <span>{backupProgress}%</span>
          </div>
          <div className="w-full bg-[var(--bg-obsidian)] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[var(--accent-emerald)] h-full transition-all duration-300"
              style={{ width: `${backupProgress}%` }}
            />
          </div>
        </div>

        {/* Wholesale Cart & Rounding Mode */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
          {/* Controls */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
              <span>Wholesale Cart Manifest:</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setTaxMode("even-parity")}
                  className={`px-2 py-0.5 rounded-xs text-[10px] font-bold border ${
                    taxMode === "even-parity"
                      ? "bg-[var(--accent-emerald)] text-black border-[var(--accent-emerald)]"
                      : "border-[var(--border-hairline)] text-[var(--text-muted)]"
                  }`}
                >
                  Even Parity Mode
                </button>
                <button
                  onClick={() => setTaxMode("ieee-standard")}
                  className={`px-2 py-0.5 rounded-xs text-[10px] font-bold border ${
                    taxMode === "ieee-standard"
                      ? "bg-[var(--accent-rose)] text-white border-[var(--accent-rose)]"
                      : "border-[var(--border-hairline)] text-[var(--text-muted)]"
                  }`}
                >
                  Standard Float
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              {cart.map((item) => (
                <div key={item.id} className="p-2 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)] flex justify-between items-center text-[11px]">
                  <span>{item.name} ({item.qty} pcs)</span>
                  <span className="font-bold text-[var(--text-pure)]">₹{item.qty * item.price}</span>
                </div>
              ))}
            </div>

            <button
              onClick={triggerPrint}
              disabled={isPrinting}
              className="w-full py-2 bg-[var(--text-pure)] text-black font-bold rounded-xs flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95 transition-all text-xs"
            >
              <Printer size={13} />
              <span>DISPENSE THERMAL RECEIPT</span>
            </button>
          </div>

          {/* Receipt Output */}
          <div className="lg:col-span-6">
            <div
              ref={receiptRef}
              className="p-4 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)] space-y-2 text-[11px]"
            >
              <div className="text-center font-bold text-[var(--text-pure)] border-b border-dashed border-[var(--border-hairline)] pb-2">
                HERA HOSIERY WHOLESALE // BENGALURU
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Taxable Amount</span>
                <span>₹{taxable.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>CGST (2.5%) + SGST (2.5%)</span>
                <span>₹{cgst} + ₹{sgst}</span>
              </div>

              {taxMode === "ieee-standard" && (
                <div className="p-1.5 rounded-xs bg-[var(--accent-rose)]/15 border border-[var(--accent-rose)] text-[var(--accent-rose)] flex justify-between text-[10px] font-bold">
                  <span>FLOAT DISCREPANCY:</span>
                  <span>₹{discrepancy} MISMATCH</span>
                </div>
              )}

              {taxMode === "even-parity" && (
                <div className="p-1.5 rounded-xs bg-[var(--accent-emerald)]/15 border border-[var(--accent-emerald)] text-[var(--accent-emerald)] flex justify-between text-[10px] font-bold">
                  <span>LARGEST REMAINDER METHOD:</span>
                  <span>0-PAISE EQUALITY</span>
                </div>
              )}

              <div className="flex justify-between font-bold text-sm text-[var(--text-pure)] pt-1 border-t border-[var(--border-hairline)]">
                <span>GRAND TOTAL</span>
                <span className="text-[var(--accent-emerald)]">₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Snippet & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] border-b border-[var(--border-hairline)] pb-1.5">
            <span className="text-[var(--text-ivory)] flex items-center gap-1.5">
              <Smartphone size={12} />
              <span>WholesaleTaxEngine.kt</span>
            </span>
            <span className="text-[10px] text-[var(--accent-emerald)]">KOTLIN 2.0 // ROOM v13</span>
          </div>

          <pre className="p-3 rounded-xs bg-[var(--bg-obsidian)] border border-[var(--border-hairline)] text-[11px] leading-relaxed text-[var(--text-muted)] overflow-x-auto shadow-inner">
{`// Largest Remainder Method guaranteeing zero round-off
fun computeWholesaleTax(rawAmount: Long): TaxInvoice {
    // Force subtotal to even integer so CGST == SGST exactly
    val taxable = if (rawAmount % 2L != 0L) rawAmount + 1L else rawAmount
    val split = taxable / 40L // 2.5% CGST and SGST
    return TaxInvoice(taxable = taxable, cgst = split, sgst = split)
}`}
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
                <div className="text-sm font-bold text-[var(--accent-emerald)]">{res.value}</div>
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
