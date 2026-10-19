"use client";

import { useState } from "react";
import { Smartphone, Receipt, Printer, Trash2, ShieldCheck, Database, CheckCircle2, AlertCircle } from "lucide-react";

interface BillItem {
  id: string;
  name: string;
  hsn: string;
  size: string;
  price: number;
  qty: number;
}

const WHOLESALE_CATALOG = [
  { id: "1", name: "Baba Suit (3-Pc Set, Hosiery)", hsn: "6111", size: "22-26", price: 240 },
  { id: "2", name: "Kids Printed Frock (Pure Cotton)", hsn: "6209", size: "20-28", price: 180 },
  { id: "3", name: "Boys T-Shirt Lot (Bio-Washed)", hsn: "6109", size: "26-34", price: 140 },
  { id: "4", name: "Kids Interlock Track Pants", hsn: "6104", size: "24-30", price: 210 },
];

export function HeraBillingStudio() {
  const [cart, setCart] = useState<BillItem[]>([
    { id: "1", name: "Baba Suit (3-Pc Set, Hosiery)", hsn: "6111", size: "22-26", price: 240, qty: 10 },
    { id: "2", name: "Kids Printed Frock (Pure Cotton)", hsn: "6209", size: "20-28", price: 180, qty: 15 },
  ]);
  const [transportCharges, setTransportCharges] = useState(150);
  const [invoiceReady, setInvoiceReady] = useState(false);
  const [activeEngineeringTab, setActiveEngineeringTab] = useState<"calculator" | "storage" | "rounding">("calculator");

  const addItem = (item: typeof WHOLESALE_CATALOG[0]) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 5 } : i));
      }
      return [...prev, { ...item, qty: 5 }];
    });
    setInvoiceReady(false);
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    setInvoiceReady(false);
  };

  // Real Hera Billing calculations:
  // Subtotal = Σ (Qty * Rate)
  const subtotal = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  // Transport is a taxable component in Normal Invoices
  const taxableAmount = subtotal + transportCharges;
  // Textile GST is 5%: split strictly into 2.5% CGST and 2.5% SGST with Math.round() parity
  const cgst = Math.round(taxableAmount * 0.025);
  const sgst = Math.round(taxableAmount * 0.025);
  const rawTotal = taxableAmount + cgst + sgst;
  const grandTotal = Math.round(rawTotal);
  const roundOff = (grandTotal - rawTotal).toFixed(2);

  return (
    <div className="w-full rounded-3xl glass-card overflow-hidden border border-white/[0.12] shadow-2xl space-y-0">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 border-b border-white/[0.08] flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-emerald-950/20 via-transparent to-amber-950/20">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 font-bold uppercase tracking-wider text-[10px]">
              PRODUCTION SYSTEM // 03
            </span>
            <span className="text-[var(--text-dim)]">•</span>
            <span className="text-[var(--text-dim)] uppercase">
              WHOLESALE GARMENTS ERP &amp; HTML-TO-PDF ENGINE
            </span>
          </div>

          <h3 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            Hera Billing
          </h3>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Production Android ERP and HTML-to-PDF invoice engine built for a real wholesale garments manufacturer (Hera Hosiery / Kids Wear, Bengaluru). Solves Android 14 Scoped Storage crashes, 1-paise GST parity, and arithmetic rounding distortion across wholesale orders.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-300">
            <ShieldCheck size={14} />
            <span>DEPLOYED ON SAMSUMG S24 / M34</span>
          </div>
        </div>
      </div>

      {/* Simulator Stage */}
      <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Modern Phone Mockup */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-[380px] rounded-[32px] border-4 border-slate-700/80 bg-[#090d18] shadow-2xl overflow-hidden font-sans">
            {/* Phone Top Notch */}
            <div className="px-5 py-2.5 bg-black/80 flex items-center justify-between text-[11px] font-mono text-[var(--text-dim)]">
              <span>09:41</span>
              <div className="w-16 h-3.5 bg-black rounded-full" />
              <span>100%</span>
            </div>

            {/* Android Compose App Bar */}
            <div className="px-4 py-3 bg-black/40 border-b border-white/[0.08] flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">Hera Hosiery Wholesale</div>
                <div className="text-[10px] font-mono text-emerald-400">MVI • ROOM DB v13 (WAL)</div>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.08] text-slate-300">
                INVOICE #H-00042
              </span>
            </div>

            {/* Interactive Screen Body */}
            <div className="p-4 space-y-4">
              {/* Quick Add Catalog */}
              <div>
                <div className="text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-wider mb-2">
                  Wholesale Lot Catalog (Tap to Add 5 pcs):
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {WHOLESALE_CATALOG.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => addItem(item)}
                      className="p-2 text-left rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-emerald-400/50 transition-colors"
                    >
                      <div className="text-[11px] font-medium text-white truncate">{item.name}</div>
                      <div className="text-[10px] text-[var(--text-dim)] font-mono">
                        HSN {item.hsn} • {item.size}
                      </div>
                      <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">₹{item.price}/pc</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cart Items */}
              <div className="border-t border-white/[0.08] pt-3 space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-[var(--text-dim)]">
                  <span>ACTIVE INVOICE ITEMS ({cart.length})</span>
                  <span>QUANTITY</span>
                </div>
                <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-black/40 font-mono text-xs"
                    >
                      <div className="truncate pr-2">
                        <span className="text-white text-[11px]">{item.name}</span>
                        <span className="text-[var(--text-dim)] text-[10px] ml-1.5">
                          ({item.qty} pcs @ ₹{item.price})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-bold text-emerald-400 text-xs">₹{item.price * item.qty}</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[var(--text-dim)] hover:text-red-400 p-0.5"
                          aria-label="Remove item"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real Calculation Summary (5% Garments GST + Transport) */}
              <div className="border-t border-white/[0.08] pt-3 font-mono text-xs space-y-1">
                <div className="flex justify-between text-[var(--text-dim)] text-[11px]">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-[var(--text-dim)] text-[11px]">
                  <span>Transport Freight (Taxable)</span>
                  <span>₹{transportCharges}</span>
                </div>
                <div className="flex justify-between text-slate-300 text-[11px]">
                  <span>Taxable Base</span>
                  <span className="font-semibold">₹{taxableAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-[var(--text-dim)] text-[11px]">
                  <span>CGST (2.5%) + SGST (2.5%)</span>
                  <span>₹{cgst} + ₹{sgst} (5% GST)</span>
                </div>
                <div className="flex justify-between text-[var(--text-dim)] text-[10px]">
                  <span>Round Off (Hare-Niemeyer)</span>
                  <span>₹{roundOff}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-1.5 border-t border-white/[0.08]">
                  <span>Grand Total</span>
                  <span className="text-emerald-400">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>

                <button
                  onClick={() => setInvoiceReady(true)}
                  disabled={cart.length === 0}
                  className="w-full mt-2 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 disabled:opacity-30 disabled:pointer-events-none hover:bg-emerald-400 active:scale-95 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  <Printer size={13} />
                  <span>COMPILE WHOLESALE A4 INVOICE</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Verified Wholesale A4 Invoice Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
              <Receipt size={14} className="text-emerald-400" />
              <span>HERA HOSIERY A4 TAX INVOICE</span>
            </span>
            <span className="text-[10px] text-emerald-400">
              {invoiceReady ? "PRINT COMPILED" : "READY TO COMPILE"}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#050814]/90 border border-white/[0.1] font-mono text-xs space-y-3 shadow-inner">
            <div className="text-center pb-3 border-b border-dashed border-white/20">
              <div className="font-bold text-sm text-white tracking-wide">HERA HOSIERY</div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                Mfg. of Baba Suit &amp; All Kinds of Kids Wear
              </div>
              <div className="text-[10px] text-[var(--text-dim)] mt-0.5">
                TAX INVOICE #H-00042 &nbsp;|&nbsp; BENGALURU
              </div>
              <div className="text-[9px] text-[var(--text-dim)]">GSTIN: 29AAAAA0000A1Z5 &nbsp;|&nbsp; STATE: 29</div>
            </div>

            <div className="space-y-1.5 py-2 border-b border-dashed border-white/20 text-[11px]">
              {cart.map((item, idx) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div>
                    <div className="text-white font-medium">
                      {idx + 1}. {item.name}
                    </div>
                    <div className="text-[9px] text-[var(--text-dim)]">
                      HSN {item.hsn} • {item.size} • {item.qty} pcs @ ₹{item.price}
                    </div>
                  </div>
                  <span className="text-white font-semibold">₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
                </div>
              ))}
              <div className="flex justify-between pt-1 text-[10px] text-[var(--text-dim)]">
                <span>Transport Freight Charges</span>
                <span>₹{transportCharges}</span>
              </div>
            </div>

            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between text-[var(--text-dim)]">
                <span>TAXABLE BASE</span>
                <span>₹{taxableAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-[var(--text-dim)]">
                <span>CGST 2.5% + SGST 2.5%</span>
                <span>₹{cgst + sgst}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-white pt-1.5 border-t border-white/20">
                <span>GRAND TOTAL</span>
                <span className="text-emerald-400">₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Sequence & A4 Pagination Badge */}
            <div className="pt-2 flex items-center justify-between text-[9px] text-[var(--text-dim)] border-t border-dashed border-white/10">
              <span>PAGINATION: SINGLE-COL (&le;15 items)</span>
              <span>FINANCIAL YEAR RESETS: APRIL 1ST</span>
            </div>
          </div>

          {/* Deep Engineering Breakdown Tabs */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] font-mono text-xs space-y-2.5">
            <div className="flex gap-1.5 border-b border-white/[0.08] pb-2 text-[10px]">
              <button
                onClick={() => setActiveEngineeringTab("storage")}
                className={`px-2 py-0.5 rounded transition-colors ${
                  activeEngineeringTab === "storage" ? "bg-emerald-500 text-slate-950 font-bold" : "text-[var(--text-dim)] hover:text-white"
                }`}
              >
                Android 14 Scoped Storage
              </button>
              <button
                onClick={() => setActiveEngineeringTab("rounding")}
                className={`px-2 py-0.5 rounded transition-colors ${
                  activeEngineeringTab === "rounding" ? "bg-emerald-500 text-slate-950 font-bold" : "text-[var(--text-dim)] hover:text-white"
                }`}
              >
                Largest Remainder Method
              </button>
              <button
                onClick={() => setActiveEngineeringTab("calculator")}
                className={`px-2 py-0.5 rounded transition-colors ${
                  activeEngineeringTab === "calculator" ? "bg-emerald-500 text-slate-950 font-bold" : "text-[var(--text-dim)] hover:text-white"
                }`}
              >
                1-Paise Parity
              </button>
            </div>

            {activeEngineeringTab === "storage" && (
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                <strong className="text-white">Android 14 (API 34) Storage Exception:</strong> Writing directly to <code className="text-emerald-300">Documents/HeraBilling</code> threw uncaught <code className="text-emerald-300">SecurityException</code> on Samsung S24 devices due to Scoped Storage enforcement. Fixed by returning the internal app cache file descriptor (<code className="text-emerald-300">files.cacheFile</code>), guaranteeing zero-crash PDF exports.
              </p>
            )}

            {activeEngineeringTab === "rounding" && (
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                <strong className="text-white">Zero Round-Off Optimizer:</strong> Replaced the naive &quot;last-item absorber&quot; (which dumped leftover paise onto the final item, skewing its rate) with an iterative optimizer distributing fractional paise in exact ₹0.50 increments across up to 1,000 loops.
              </p>
            )}

            {activeEngineeringTab === "calculator" && (
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                <strong className="text-white">GST 5% Textile Parity:</strong> Solved the odd-rupee taxable discrepancy by computing <code className="text-emerald-300">(Taxable * 0.025) HALF_UP</code> added twice, ensuring that CGST + SGST mathematically reconciles with the tax invoice voucher.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
