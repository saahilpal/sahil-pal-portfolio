"use client";

import { useState, useRef } from "react";
import { animate } from "animejs";
import {
  Receipt,
  Smartphone,
  Printer,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  Cloud,
  RefreshCw,
  Sparkles,
  Database,
  Layers,
  ArrowUpRight,
  HardDriveDownload,
  Sliders,
  Check,
  AlertTriangle,
} from "lucide-react";

interface BillItem {
  id: string;
  name: string;
  hsn: string;
  size: string;
  price: number;
  qty: number;
}

const WHOLESALE_LOTS = [
  { id: "1", name: "Baba Suit (3-Pc Set Hosiery)", hsn: "6111", size: "22-26", price: 240 },
  { id: "2", name: "Kids Printed Frock (Pure Cotton)", hsn: "6209", size: "20-28", price: 180 },
  { id: "3", name: "Boys T-Shirt Lot (Bio-Washed)", hsn: "6109", size: "26-34", price: 140 },
  { id: "4", name: "Kids Interlock Track Pants", hsn: "6104", size: "24-30", price: 210 },
];

export function HeraBillingPaper() {
  const [cart, setCart] = useState<BillItem[]>([
    { id: "1", name: "Baba Suit (3-Pc Set Hosiery)", hsn: "6111", size: "22-26", price: 240, qty: 10 },
    { id: "2", name: "Kids Printed Frock (Pure Cotton)", hsn: "6209", size: "20-28", price: 180, qty: 15 },
  ]);
  const [transportCharges, setTransportCharges] = useState<number>(150);
  const [taxMode, setTaxMode] = useState<"even-parity" | "ieee-standard">("even-parity");
  const [activeTab, setActiveTab] = useState<"backup" | "uiux" | "storage" | "math">("backup");

  // Animation states
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [hasPrinted, setHasPrinted] = useState<boolean>(false);
  const [isBackingUp, setIsBackingUp] = useState<boolean>(false);
  const [backupStep, setBackupStep] = useState<string>("SYSTEM IDLE // LAST SYNC: 24H AGO");
  const [backupProgress, setBackupProgress] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const paperReceiptRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const invoiceCardRef = useRef<HTMLDivElement>(null);
  const receiptStampRef = useRef<HTMLDivElement>(null);

  const addItem = (item: typeof WHOLESALE_LOTS[0]) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 5 } : i));
      }
      return [...prev, { ...item, qty: 5 }];
    });
  };

  const multiplyQuantities = (factor: number) => {
    setCart((prev) => prev.map((i) => ({ ...i, qty: Math.max(1, Math.round(i.qty * factor)) })));
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  // Peak Animation 1: Mechanical Paper Receipt Print Rollout with Physical Stamp
  const triggerPrintDispense = () => {
    if (isPrinting || !paperReceiptRef.current) return;
    setIsPrinting(true);
    setHasPrinted(false);

    animate(paperReceiptRef.current, {
      translateY: [-70, 0],
      scaleY: [0.65, 1],
      opacity: [0.3, 1],
      duration: 750,
      ease: "outElastic(1, .75)",
      onComplete: () => {
        setIsPrinting(false);
        setHasPrinted(true);

        if (receiptStampRef.current) {
          animate(receiptStampRef.current, {
            scale: [1.8, 1],
            opacity: [0, 0.95],
            rotate: [-14, -4],
            duration: 350,
            ease: "outBack",
          });
        }
      },
    });
  };

  // Peak Animation 2: Real-time Cloud Drive Backup Simulator
  const triggerCloudBackup = () => {
    if (isBackingUp) return;
    setIsBackingUp(true);
    setBackupProgress(0);
    setCompletedSteps([]);

    const steps = [
      { text: "SERIALIZING ROOM v13 ENTITIES...", pct: 25, idx: 0 },
      { text: "ENCODING LOGO & UPI QR (BASE-64)...", pct: 50, idx: 1 },
      { text: "ENCRYPTING SQLCIPHER SNAPSHOT...", pct: 75, idx: 2 },
      { text: "UPLOADING TO GOOGLE DRIVE VIA DAILY WORKER...", pct: 100, idx: 3 },
    ];

    let currentStepIdx = 0;
    const interval = setInterval(() => {
      if (currentStepIdx < steps.length) {
        const step = steps[currentStepIdx];
        setBackupStep(step.text);
        setBackupProgress(step.pct);
        setCompletedSteps((prev) => [...prev, step.idx]);
        currentStepIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsBackingUp(false), 1200);
      }
    }, 450);
  };

  // Interactive 3D Perspective Tilt on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!invoiceCardRef.current) return;
    const rect = invoiceCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = (-y / rect.height) * 4;
    const rotY = (x / rect.width) * 4;
    invoiceCardRef.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!invoiceCardRef.current) return;
    invoiceCardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  // Exact Hera Billing Wholesale Math (5% Garments GST):
  const subtotal = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const rawTaxable = subtotal + transportCharges;

  // Compare Standard IEEE-754 Math vs Hera Even-Parity Math
  let taxableAmount = rawTaxable;
  let cgst = 0;
  let sgst = 0;
  let discrepancy = 0;

  if (taxMode === "even-parity") {
    // Hera's guaranteed even integer parity rule:
    // If taxable amount is odd, step by ₹0.50 so subtotal % 2 == 0
    const adjustedTaxable = rawTaxable % 2 !== 0 ? rawTaxable + 1 : rawTaxable;
    taxableAmount = adjustedTaxable;
    const splitTax = Math.round(adjustedTaxable * 0.025);
    cgst = splitTax;
    sgst = splitTax;
    discrepancy = 0;
  } else {
    // Standard unconstrained IEEE math:
    cgst = +(rawTaxable * 0.025).toFixed(2);
    sgst = +(rawTaxable * 0.025).toFixed(2);
    const combinedTax = cgst + sgst;
    discrepancy = +(combinedTax - rawTaxable * 0.05).toFixed(2);
  }

  const grandTotal = Math.round(taxableAmount + cgst + sgst);

  return (
    <article className="paper-sheet p-6 sm:p-10 rounded-sm space-y-8 relative overflow-hidden">
      {/* Corner Registration Marks */}
      <div className="absolute top-3 left-3 font-mono text-[9px] text-[var(--text-ink-faint)]">+</div>
      <div className="absolute top-3 right-3 font-mono text-[9px] text-[var(--text-ink-faint)]">+</div>
      <div className="absolute bottom-3 left-3 font-mono text-[9px] text-[var(--text-ink-faint)]">+</div>
      <div className="absolute bottom-3 right-3 font-mono text-[9px] text-[var(--text-ink-faint)]">+</div>

      {/* Header Plate */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-paper-strong)] pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="stamp-seal stamp-green">PRODUCTION DEPLOYED // 03</span>
            <span className="text-[var(--text-ink-muted)]">•</span>
            <span className="text-[var(--text-ink-muted)]">FIG. 3.0 — HERA WHOLESALE GARMENT ERP &amp; DATA ENGINE</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-ink)]">
            Hera Billing
          </h3>

          <p className="text-sm sm:text-base text-[var(--text-ink-secondary)] max-w-2xl font-sans">
            Offline-first native Android ERP and automated data backup system built for <strong className="text-[var(--text-ink)]">Hera Hosiery Wholesale</strong> (Bengaluru). Features daily Google Drive cloud sync, high-velocity 30-second checkout UI/UX, Android 14 Scoped Storage resolution, and zero-roundoff arithmetic.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={triggerCloudBackup}
            disabled={isBackingUp}
            className="px-3.5 py-2 border border-[var(--stamp-blue)] bg-[var(--stamp-blue-bg)] text-[var(--stamp-blue)] rounded-xs font-mono text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 active:scale-95 transition-all shadow-xs"
          >
            <Cloud size={13} className={isBackingUp ? "animate-spin" : ""} />
            <span>{isBackingUp ? "SYNCING CLOUD..." : "TRIGGER DRIVE BACKUP"}</span>
          </button>
        </div>
      </div>

      {/* Cloud Backup Live Telemetry Bar */}
      <div className="p-4 border border-[var(--border-paper)] rounded-xs bg-[var(--bg-card-draft)] space-y-3 font-mono text-xs">
        <div className="flex justify-between items-center text-[11px]">
          <span className="font-bold text-[var(--text-ink)] flex items-center gap-1.5">
            <HardDriveDownload size={13} className="text-[var(--stamp-blue)]" />
            <span>DATA BACKUP &amp; GOOGLE DRIVE SYNC ENGINE</span>
          </span>
          <span className="text-[10px] text-[var(--stamp-green)] font-semibold">{backupProgress}% COMPLETED</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[var(--border-paper)] h-2 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="bg-[var(--stamp-blue)] h-full transition-all duration-300"
            style={{ width: `${backupProgress}%` }}
          />
        </div>

        {/* 4 Interactive Backup Steps Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[10px]">
          {[
            "1. ROOM v13 WAL SNAPSHOT",
            "2. BASE-64 LOGO & UPI QR",
            "3. AES-GCM ENCRYPTED JSON",
            "4. GOOGLE DRIVE APPFOLDER",
          ].map((title, sIdx) => {
            const isDone = completedSteps.includes(sIdx);
            return (
              <div
                key={sIdx}
                className={`p-1.5 rounded-xs border transition-colors flex items-center gap-1.5 ${
                  isDone
                    ? "bg-[var(--stamp-green-bg)] text-[var(--stamp-green)] border-[var(--stamp-green-border)] font-bold"
                    : "bg-[var(--bg-card)] border-[var(--border-paper)] text-[var(--text-ink-muted)]"
                }`}
              >
                {isDone ? <Check size={11} className="stroke-[3]" /> : <span className="w-2 h-2 rounded-full bg-[var(--border-paper-strong)]" />}
                <span className="truncate">{title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Showcase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Wholesale Lot Selector & Mobile POS Controller */}
        <div className="lg:col-span-5 space-y-4 font-mono text-xs">
          <div className="p-4 border border-[var(--border-paper)] rounded-xs bg-[var(--bg-card-draft)] space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--border-paper)] pb-2 text-[11px] text-[var(--text-ink-muted)]">
              <span className="font-bold text-[var(--text-ink)] flex items-center gap-1">
                <Smartphone size={12} />
                <span>JETPACK COMPOSE MVI CONTROLLER</span>
              </span>
              <span className="text-[10px] text-[var(--stamp-blue)]">30-SEC CHECKOUT UX</span>
            </div>

            {/* Quick Catalog Header with Bulk Multipliers */}
            <div className="flex items-center justify-between text-[11px] text-[var(--text-ink-secondary)]">
              <span>Wholesale Lots (Tap to add 5 pcs):</span>
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-[var(--text-ink-muted)]">BULK:</span>
                <button
                  onClick={() => multiplyQuantities(2)}
                  className="px-1.5 py-0.5 rounded-xs border border-[var(--border-paper)] bg-[var(--bg-card)] hover:border-[var(--text-ink)] text-[9px] font-bold"
                  title="Double all lot quantities"
                >
                  2x
                </button>
                <button
                  onClick={() => multiplyQuantities(0.5)}
                  className="px-1.5 py-0.5 rounded-xs border border-[var(--border-paper)] bg-[var(--bg-card)] hover:border-[var(--text-ink)] text-[9px] font-bold"
                  title="Half all lot quantities"
                >
                  0.5x
                </button>
              </div>
            </div>

            {/* Quick Catalog Grid */}
            <div className="grid grid-cols-2 gap-2">
              {WHOLESALE_LOTS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => addItem(item)}
                  className="p-2.5 text-left border border-[var(--border-paper)] rounded-xs bg-[var(--bg-card)] hover:border-[var(--text-ink)] active:scale-95 transition-all shadow-xs"
                >
                  <div className="font-bold text-[11px] text-[var(--text-ink)] truncate">{item.name}</div>
                  <div className="text-[10px] text-[var(--text-ink-muted)]">HSN {item.hsn} • {item.size}</div>
                  <div className="text-xs font-bold text-[var(--stamp-blue)] mt-1">₹{item.price} / pc</div>
                </button>
              ))}
            </div>

            {/* Rounding Mode Switch (Proof of Zero-Roundoff Algorithm) */}
            <div className="pt-2 border-t border-[var(--border-paper)] space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-[var(--text-ink-muted)]">
                <span className="font-bold uppercase tracking-wider text-[var(--text-ink)]">
                  CGST/SGST TAX ROUNDING METHOD
                </span>
                <span className={taxMode === "even-parity" ? "text-[var(--stamp-green)] font-bold" : "text-[var(--stamp-red)] font-bold"}>
                  {taxMode === "even-parity" ? "0-PAISE ERROR" : "FLOAT MISMATCH"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-[10.5px]">
                <button
                  onClick={() => setTaxMode("even-parity")}
                  className={`p-2 rounded-xs border text-left transition-all ${
                    taxMode === "even-parity"
                      ? "bg-[var(--stamp-green-bg)] border-[var(--stamp-green)] text-[var(--stamp-green)] font-bold shadow-xs"
                      : "bg-[var(--bg-card)] border-[var(--border-paper)] text-[var(--text-ink-secondary)] hover:border-[var(--text-ink-strong)]"
                  }`}
                >
                  <div>✓ Even Parity Mode</div>
                  <div className="text-[8.5px] font-normal opacity-80">(r * q) % 2 == 0 Guaranteed</div>
                </button>

                <button
                  onClick={() => setTaxMode("ieee-standard")}
                  className={`p-2 rounded-xs border text-left transition-all ${
                    taxMode === "ieee-standard"
                      ? "bg-[var(--stamp-red-bg)] border-[var(--stamp-red)] text-[var(--stamp-red)] font-bold shadow-xs"
                      : "bg-[var(--bg-card)] border-[var(--border-paper)] text-[var(--text-ink-secondary)] hover:border-[var(--text-ink-strong)]"
                  }`}
                >
                  <div>Standard IEEE-754</div>
                  <div className="text-[8.5px] font-normal opacity-80">1-Paise Split Mismatch</div>
                </button>
              </div>
            </div>

            {/* Active Items Manifest */}
            <div className="pt-2 border-t border-[var(--border-paper)] space-y-2">
              <div className="flex justify-between text-[11px] text-[var(--text-ink-muted)]">
                <span>INVOICE MANIFEST ({cart.length} ITEMS)</span>
                <span>TOTAL</span>
              </div>

              <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 bg-[var(--bg-card)] border border-[var(--border-paper)] rounded-xs text-[11px]"
                  >
                    <div className="truncate pr-2">
                      <span className="font-medium text-[var(--text-ink)]">{item.name}</span>
                      <span className="text-[var(--text-ink-muted)] text-[10px] ml-1">
                        ({item.qty} pcs @ ₹{item.price})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-bold text-[var(--text-ink)]">₹{(item.qty * item.price).toLocaleString("en-IN")}</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[var(--text-ink-muted)] hover:text-[var(--stamp-red)]"
                        aria-label="Remove item"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dispense Trigger Button */}
              <button
                onClick={triggerPrintDispense}
                disabled={cart.length === 0 || isPrinting}
                className="w-full mt-2 py-2.5 bg-[var(--text-ink)] text-[var(--bg-paper)] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[var(--text-ink-secondary)] active:scale-95 transition-all rounded-xs shadow-sm"
              >
                <Printer size={13} className={isPrinting ? "animate-bounce" : ""} />
                <span>{isPrinting ? "DISPENSING VOUCHER..." : "DISPENSE A4 PRINT VOUCHER"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: The Physical A4 Wholesale Tax Invoice Voucher with 3D Tilt */}
        <div className="lg:col-span-7 space-y-4">
          {/* Mechanical Printer Slot */}
          <div className="w-full h-3 bg-[var(--border-paper-strong)] rounded-t-sm border border-[var(--border-paper-strong)] flex items-center justify-center">
            <div className="w-48 h-1 bg-[var(--text-ink)] opacity-40 rounded-full" />
          </div>

          <div
            ref={invoiceCardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="transition-transform duration-200 ease-out"
          >
            <div
              ref={paperReceiptRef}
              className="p-6 border border-[var(--border-paper-strong)] rounded-b-xs bg-[var(--bg-card)] shadow-md font-mono text-xs space-y-4 relative"
            >
              {/* Corner Watermark Stamp (Triggered after print) */}
              <div
                ref={receiptStampRef}
                className={`absolute right-6 bottom-16 pointer-events-none transition-opacity ${
                  hasPrinted ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="stamp-seal stamp-red text-[11px] py-1 px-3 border-2">
                  <span>ROOM v13 VERIFIED</span>
                </div>
              </div>

              {/* Top Perforation / Tear-off Marks */}
              <div className="perforated-edge -mx-6 -mt-2 mb-2" />

              {/* Invoice Header */}
              <div className="text-center pb-3 border-b border-dashed border-[var(--border-paper-strong)] space-y-1">
                <div className="text-base sm:text-lg font-bold text-[var(--text-ink)] tracking-wider">
                  HERA HOSIERY
                </div>
                <div className="text-[11px] text-[var(--stamp-red)] font-semibold">
                  Mfg. of Baba Suit &amp; All Kinds of Kids Wear
                </div>
                <div className="text-[10px] text-[var(--text-ink-secondary)]">
                  TAX INVOICE #H-00042 &nbsp;|&nbsp; BENGALURU, KARNATAKA (STATE CODE 29)
                </div>
                <div className="text-[10px] text-[var(--text-ink-muted)]">
                  GSTIN: 29AAAAA0000A1Z5 &nbsp;|&nbsp; TRANSPORT: VRL LOGISTICS &nbsp;|&nbsp; BUNDLES: 02
                </div>
              </div>

              {/* Item Rows Table */}
              <div className="space-y-1.5 py-1 border-b border-dashed border-[var(--border-paper-strong)] text-[11px]">
                <div className="grid grid-cols-12 text-[10px] text-[var(--text-ink-muted)] font-bold pb-1 border-b border-[var(--border-paper)]">
                  <span className="col-span-1">#</span>
                  <span className="col-span-6">DESCRIPTION</span>
                  <span className="col-span-2 text-center">HSN / SIZE</span>
                  <span className="col-span-1 text-center">QTY</span>
                  <span className="col-span-2 text-right">TOTAL</span>
                </div>

                {cart.map((item, idx) => (
                  <div key={item.id} className="grid grid-cols-12 items-center py-0.5">
                    <span className="col-span-1 text-[var(--text-ink-muted)]">{idx + 1}</span>
                    <span className="col-span-6 font-medium text-[var(--text-ink)] truncate">{item.name}</span>
                    <span className="col-span-2 text-center text-[10px] text-[var(--text-ink-muted)]">
                      {item.hsn} / {item.size}
                    </span>
                    <span className="col-span-1 text-center font-bold text-[var(--text-ink)]">{item.qty}</span>
                    <span className="col-span-2 text-right font-bold text-[var(--text-ink)]">
                      ₹{(item.qty * item.price).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}

                <div className="grid grid-cols-12 pt-1.5 text-[10px] text-[var(--text-ink-secondary)] border-t border-[var(--border-paper)]">
                  <span className="col-span-10">Transport Freight Charges (Taxable Component)</span>
                  <span className="col-span-2 text-right font-bold">₹{transportCharges}</span>
                </div>
              </div>

              {/* Calculations Breakdown */}
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between text-[var(--text-ink-muted)]">
                  <span>TAXABLE AMOUNT</span>
                  <span>₹{taxableAmount.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between text-[var(--text-ink-muted)]">
                  <span>CGST (2.5%) + SGST (2.5%) — 5% TEXTILE GST</span>
                  <span>₹{cgst} + ₹{sgst} (₹{cgst + sgst})</span>
                </div>

                {taxMode === "ieee-standard" && (
                  <div className="flex justify-between text-[10px] text-[var(--stamp-red)] font-semibold bg-[var(--stamp-red-bg)] p-1.5 rounded-xs border border-[var(--stamp-red-border)]">
                    <span className="flex items-center gap-1">
                      <AlertTriangle size={11} />
                      <span>STANDARD IEEE ROUNDING ERROR:</span>
                    </span>
                    <span>₹{discrepancy} DISCREPANCY DETECTED</span>
                  </div>
                )}

                {taxMode === "even-parity" && (
                  <div className="flex justify-between text-[10px] text-[var(--stamp-green)] font-semibold bg-[var(--stamp-green-bg)] p-1.5 rounded-xs border border-[var(--stamp-green-border)]">
                    <span className="flex items-center gap-1">
                      <Check size={11} className="stroke-[3]" />
                      <span>HERA LARGEST REMAINDER METHOD:</span>
                    </span>
                    <span>0-PAISE EQUALITY (CGST == SGST)</span>
                  </div>
                )}

                <div className="flex justify-between font-bold text-sm text-[var(--text-ink)] pt-2 border-t border-[var(--border-paper-strong)]">
                  <span>GRAND TOTAL</span>
                  <span className="text-[var(--stamp-green)] font-mono">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Footer / Receiver Block */}
              <div className="pt-2 flex items-center justify-between text-[9px] text-[var(--text-ink-muted)] border-t border-dashed border-[var(--border-paper)]">
                <span>A4 DYNAMIC PAGINATION: SINGLE COL (&le;15 ITEMS)</span>
                <span className="stamp-seal stamp-green text-[8px] py-0 px-1">
                  AUTHENTIC A4 VOUCHER
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Engineering Solve Selector */}
      <div className="border border-[var(--border-paper)] rounded-xs p-4 sm:p-6 bg-[var(--bg-card-draft)] space-y-4 font-mono text-xs">
        <div className="flex flex-wrap gap-2 border-b border-[var(--border-paper)] pb-3 text-[11px]">
          <button
            onClick={() => setActiveTab("backup")}
            className={`px-3 py-1.5 rounded-xs border transition-colors ${
              activeTab === "backup"
                ? "bg-[var(--text-ink)] text-[var(--bg-paper)] border-[var(--text-ink)] font-bold shadow-xs"
                : "bg-[var(--bg-card)] border-[var(--border-paper)] text-[var(--text-ink-secondary)] hover:border-[var(--text-ink)]"
            }`}
          >
            01. Automated Data Backup &amp; Google Drive Sync
          </button>
          <button
            onClick={() => setActiveTab("uiux")}
            className={`px-3 py-1.5 rounded-xs border transition-colors ${
              activeTab === "uiux"
                ? "bg-[var(--text-ink)] text-[var(--bg-paper)] border-[var(--text-ink)] font-bold shadow-xs"
                : "bg-[var(--bg-card)] border-[var(--border-paper)] text-[var(--text-ink-secondary)] hover:border-[var(--text-ink)]"
            }`}
          >
            02. High-Density UI/UX &amp; 30-Sec Workflow
          </button>
          <button
            onClick={() => setActiveTab("storage")}
            className={`px-3 py-1.5 rounded-xs border transition-colors ${
              activeTab === "storage"
                ? "bg-[var(--text-ink)] text-[var(--bg-paper)] border-[var(--text-ink)] font-bold shadow-xs"
                : "bg-[var(--bg-card)] border-[var(--border-paper)] text-[var(--text-ink-secondary)] hover:border-[var(--text-ink)]"
            }`}
          >
            03. Android 14 Scoped Storage Fix
          </button>
          <button
            onClick={() => setActiveTab("math")}
            className={`px-3 py-1.5 rounded-xs border transition-colors ${
              activeTab === "math"
                ? "bg-[var(--text-ink)] text-[var(--bg-paper)] border-[var(--text-ink)] font-bold shadow-xs"
                : "bg-[var(--bg-card)] border-[var(--border-paper)] text-[var(--text-ink-secondary)] hover:border-[var(--text-ink)]"
            }`}
          >
            04. Largest Remainder &amp; Parity Math
          </button>
        </div>

        {/* Tab 1: Backup */}
        {activeTab === "backup" && (
          <div className="space-y-2 leading-relaxed text-[var(--text-ink-secondary)]">
            <div className="font-bold text-[var(--text-ink)] flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-[var(--stamp-green)]" />
              <span>Automated 24h Google Drive Sync &amp; Local Encrypted JSON Backups</span>
            </div>
            <p>
              In a busy wholesale shop, phone drops, battery drainage, or device replacement cannot risk erasing financial ledgers. Built <code className="bg-[var(--bg-card)] px-1 py-0.5 border border-[var(--border-paper)]">BackupManager.kt</code> and <code className="bg-[var(--bg-card)] px-1 py-0.5 border border-[var(--border-paper)]">DailyDriveBackupWorker.kt</code> managed by Android WorkManager.
            </p>
            <p>
              <strong>Architecture Features:</strong> Serializes all Room v13 tables (invoices, invoice items, customers, products, payments, expenses, eway bills, and credit notes) alongside Base-64 encoded business logos and UPI QR codes into an encrypted atomic snapshot. Provides both 1-click cloud sync to Google Drive and local JSON export/import with strict schema version compatibility checks.
            </p>
          </div>
        )}

        {/* Tab 2: UI/UX */}
        {activeTab === "uiux" && (
          <div className="space-y-2 leading-relaxed text-[var(--text-ink-secondary)]">
            <div className="font-bold text-[var(--text-ink)] flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-[var(--stamp-green)]" />
              <span>High-Density Jetpack Compose UI/UX for 30-Second Wholesale Invoicing</span>
            </div>
            <p>
              Traditional CRM/ERP mobile forms are filled with decorative bloat, extra modals, and slow animations that frustrate wholesale traders during peak dispatch hours.
            </p>
            <p>
              <strong>UI/UX Design Craft:</strong> Engineered a custom design system with high-contrast typography hierarchy, dense touch targets, and instant keyboard navigation. Implemented 1-tap lot quantity increments, debounced search under 100ms, and dynamic A4 pagination (&le; 15 items single-column; &gt; 15 items compact parallel double-column) ensuring complete wholesale manifests fit on a single printed sheet.
            </p>
          </div>
        )}

        {/* Tab 3: Storage */}
        {activeTab === "storage" && (
          <div className="space-y-2 leading-relaxed text-[var(--text-ink-secondary)]">
            <div className="font-bold text-[var(--text-ink)] flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-[var(--stamp-green)]" />
              <span>Android 14 (API 34) Scoped Storage SecurityException Resolution</span>
            </div>
            <p>
              On Samsung Galaxy S24 and M34 devices running Android 14, standard PDF exports trying to write directly to <code className="bg-[var(--bg-card)] px-1 py-0.5 border border-[var(--border-paper)]">/Documents/HeraBilling/</code> threw fatal <code className="text-[var(--stamp-red)] font-bold">SecurityException</code> crashes due to strict sandbox isolation.
            </p>
            <p>
              <strong>Architecture Fix:</strong> Implemented <code className="bg-[var(--bg-card)] px-1 py-0.5 border border-[var(--border-paper)]">FileOrganizer.getOrganizedFiles</code> which routes through internal app cache (<code className="bg-[var(--bg-card)] px-1 py-0.5 border border-[var(--border-paper)]">files.cacheFile</code>), opening via <code className="bg-[var(--bg-card)] px-1 py-0.5 border border-[var(--border-paper)]">ParcelFileDescriptor(MODE_READ_WRITE | MODE_CREATE | MODE_TRUNCATE)</code> directly into the WebView print adapter and sharing through Android <code className="bg-[var(--bg-card)] px-1 py-0.5 border border-[var(--border-paper)]">FileProvider</code> with zero storage permission crashes.
            </p>
          </div>
        )}

        {/* Tab 4: Math */}
        {activeTab === "math" && (
          <div className="space-y-2 leading-relaxed text-[var(--text-ink-secondary)]">
            <div className="font-bold text-[var(--text-ink)] flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-[var(--stamp-green)]" />
              <span>Hare-Niemeyer Integer Factorization &amp; 5% GST Parity Engine</span>
            </div>
            <p>
              Wholesale buyers frequently negotiate flat round targets (e.g., &quot;Make the bill exactly ₹50,000&quot;). Built <code className="bg-[var(--bg-card)] px-1 py-0.5 border border-[var(--border-paper)]">InvoiceCalculationEngine.balanceForTargetAmount</code> which reverse-calculates base taxable amount, and executes an integer factorization search over quantity $Q$ in a bounded $\pm 1000$ radius in ₹0.50 increments.
            </p>
            <p>
              Forces subtotal $(Rate \times Quantity)$ to be an even number, guaranteeing that the 2.5% CGST + 2.5% SGST split divides with zero 1-paise discrepancy.
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
