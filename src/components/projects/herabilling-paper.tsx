"use client";

import { useState } from "react";
import { Receipt, Smartphone, Printer, Trash2, Plus, ShieldCheck, CheckCircle2, FileText, ChevronRight } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<"storage" | "math" | "parity" | "pagination">("storage");

  const addItem = (item: typeof WHOLESALE_LOTS[0]) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 5 } : i));
      }
      return [...prev, { ...item, qty: 5 }];
    });
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  // Exact Hera Billing Wholesale Math (5% Garments GST):
  const subtotal = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const taxableAmount = subtotal + transportCharges;
  const splitTax = Math.round(taxableAmount * 0.025);
  const cgst = splitTax;
  const sgst = splitTax;
  const grandTotal = taxableAmount + cgst + sgst;

  return (
    <article className="paper-sheet p-6 sm:p-10 rounded-sm space-y-8 relative">
      {/* Corner Registration Mark */}
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
            <span className="text-[var(--text-ink-muted)]">FIG. 3.0 — WHOLESALE GARMENT ERP &amp; A4 ENGINE</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-ink)]">
            Hera Billing
          </h3>

          <p className="text-sm sm:text-base text-[var(--text-ink-secondary)] max-w-2xl font-sans">
            Offline-first native Android ERP and HTML-to-PDF invoice printing engine built for <strong className="text-[var(--text-ink)]">Hera Hosiery Wholesale</strong> (Bengaluru). Hardened against Android 14 Scoped Storage exceptions, 1-paise GST parity paradoxes, and fractional rounding errors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 border border-[var(--border-paper-strong)] rounded-xs font-mono text-xs text-[var(--text-ink)] bg-[var(--bg-card-draft)] flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-[var(--stamp-green)]" />
            <span>SAMSUNG S24 / M34 VERIFIED</span>
          </span>
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
              <span className="text-[10px] text-[var(--stamp-blue)]">ROOM v13 (WAL)</span>
            </div>

            <div className="text-[11px] text-[var(--text-ink-secondary)]">
              Wholesale Lots Catalog (Tap to add 5 pcs):
            </div>

            {/* Quick Catalog Grid */}
            <div className="grid grid-cols-2 gap-2">
              {WHOLESALE_LOTS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => addItem(item)}
                  className="p-2.5 text-left border border-[var(--border-paper)] rounded-xs bg-[var(--bg-card)] hover:border-[var(--text-ink)] transition-colors"
                >
                  <div className="font-bold text-[11px] text-[var(--text-ink)] truncate">{item.name}</div>
                  <div className="text-[10px] text-[var(--text-ink-muted)]">HSN {item.hsn} • {item.size}</div>
                  <div className="text-xs font-bold text-[var(--stamp-blue)] mt-1">₹{item.price} / pc</div>
                </button>
              ))}
            </div>

            {/* Active Items Tray */}
            <div className="pt-2 border-t border-[var(--border-paper)] space-y-2">
              <div className="flex justify-between text-[11px] text-[var(--text-ink-muted)]">
                <span>INVOICE MANIFEST ({cart.length} ITEMS)</span>
                <span>TOTAL</span>
              </div>

              <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
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
                      <span className="font-bold text-[var(--text-ink)]">₹{item.qty * item.price}</span>
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
            </div>
          </div>
        </div>

        {/* Right Side: The Physical A4 Wholesale Tax Invoice Voucher */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 border border-[var(--border-paper-strong)] rounded-xs bg-[var(--bg-card)] shadow-sm font-mono text-xs space-y-4 relative">
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
              <div className="flex justify-between text-[10px] text-[var(--text-ink-muted)]">
                <span>ROUND OFF (HARE-NIEMEYER LARGEST REMAINDER)</span>
                <span>₹0.00 (Zero Paiese Discrepancy)</span>
              </div>
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

      {/* Deep Engineering Solve Selector */}
      <div className="border border-[var(--border-paper)] rounded-xs p-4 sm:p-6 bg-[var(--bg-card-draft)] space-y-4 font-mono text-xs">
        <div className="flex flex-wrap gap-2 border-b border-[var(--border-paper)] pb-3 text-[11px]">
          <button
            onClick={() => setActiveTab("storage")}
            className={`px-3 py-1.5 rounded-xs border transition-colors ${
              activeTab === "storage"
                ? "bg-[var(--text-ink)] text-[var(--bg-paper)] border-[var(--text-ink)] font-bold"
                : "bg-[var(--bg-card)] border-[var(--border-paper)] text-[var(--text-ink-secondary)] hover:border-[var(--text-ink)]"
            }`}
          >
            01. Android 14 Scoped Storage Fix
          </button>
          <button
            onClick={() => setActiveTab("math")}
            className={`px-3 py-1.5 rounded-xs border transition-colors ${
              activeTab === "math"
                ? "bg-[var(--text-ink)] text-[var(--bg-paper)] border-[var(--text-ink)] font-bold"
                : "bg-[var(--bg-card)] border-[var(--border-paper)] text-[var(--text-ink-secondary)] hover:border-[var(--text-ink)]"
            }`}
          >
            02. Largest Remainder Zero-Roundoff
          </button>
          <button
            onClick={() => setActiveTab("parity")}
            className={`px-3 py-1.5 rounded-xs border transition-colors ${
              activeTab === "parity"
                ? "bg-[var(--text-ink)] text-[var(--bg-paper)] border-[var(--text-ink)] font-bold"
                : "bg-[var(--bg-card)] border-[var(--border-paper)] text-[var(--text-ink-secondary)] hover:border-[var(--text-ink)]"
            }`}
          >
            03. Odd-Rupee 5% GST Parity
          </button>
          <button
            onClick={() => setActiveTab("pagination")}
            className={`px-3 py-1.5 rounded-xs border transition-colors ${
              activeTab === "pagination"
                ? "bg-[var(--text-ink)] text-[var(--bg-paper)] border-[var(--text-ink)] font-bold"
                : "bg-[var(--bg-card)] border-[var(--border-paper)] text-[var(--text-ink-secondary)] hover:border-[var(--text-ink)]"
            }`}
          >
            04. Dynamic A4 Single/Dual Pagination
          </button>
        </div>

        {/* Tab 1: Storage */}
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

        {/* Tab 2: Math */}
        {activeTab === "math" && (
          <div className="space-y-2 leading-relaxed text-[var(--text-ink-secondary)]">
            <div className="font-bold text-[var(--text-ink)] flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-[var(--stamp-green)]" />
              <span>Hare-Niemeyer (Largest Remainder) Integer Factorization</span>
            </div>
            <p>
              Wholesale buyers frequently negotiate flat round targets (e.g., &quot;Make the bill exactly ₹50,000&quot;). The naive approach of dumping leftover paise onto the final item distorted unit prices.
            </p>
            <p>
              <strong>Algorithm Fix:</strong> Built <code className="bg-[var(--bg-card)] px-1 py-0.5 border border-[var(--border-paper)]">InvoiceCalculationEngine.balanceForTargetAmount</code> which subtracts freight first, reverse-calculates base taxable amount, and executes an integer factorization search over quantity $Q$ in a bounded $\pm 1000$ radius with a score penalty <code className="bg-[var(--bg-card)] px-1 py-0.5 border border-[var(--border-paper)]">diff + abs(q - origQ) * 1.0</code>, distributing paise across up to 1,000 iterations for clean integer rates.
            </p>
          </div>
        )}

        {/* Tab 3: Parity */}
        {activeTab === "parity" && (
          <div className="space-y-2 leading-relaxed text-[var(--text-ink-secondary)]">
            <div className="font-bold text-[var(--text-ink)] flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-[var(--stamp-green)]" />
              <span>Odd-Rupee 5% Textile GST Mathematical Parity</span>
            </div>
            <p>
              In garment wholesale, dividing an odd taxable amount by $2.5\%$ CGST and $2.5\%$ SGST independently often produces a 1-paise divergence against the total $5\%$ GST due to standard decimal truncation.
            </p>
            <p>
              <strong>Engine Fix:</strong> The engine forces subtotal $(Rate \times Quantity)$ to be an even number (<code className="bg-[var(--bg-card)] px-1 py-0.5 border border-[var(--border-paper)]">if ((r * q) % 2 != 0)</code>). It calculates CGST as <code className="bg-[var(--bg-card)] px-1 py-0.5 border border-[var(--border-paper)]">taxable * 0.025</code> with <code className="bg-[var(--bg-card)] px-1 py-0.5 border border-[var(--border-paper)]">HALF_UP</code> and assigns SGST as <code className="bg-[var(--bg-card)] px-1 py-0.5 border border-[var(--border-paper)]">totalTax - cgstAmount</code>, guaranteeing 100% statutory equilibrium.
            </p>
          </div>
        )}

        {/* Tab 4: Pagination */}
        {activeTab === "pagination" && (
          <div className="space-y-2 leading-relaxed text-[var(--text-ink-secondary)]">
            <div className="font-bold text-[var(--text-ink)] flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-[var(--stamp-green)]" />
              <span>Dynamic A4 Single vs. Dual-Column Auto-Packing</span>
            </div>
            <p>
              Wholesale orders regularly contain 20 to 30 items (different lot sizes of Baba Suits and Frocks). Standard templates push item #16 onto a 2nd A4 page, leaving the remaining page 90% blank.
            </p>
            <p>
              <strong>Layout Fix:</strong> <code className="bg-[var(--bg-card)] px-1 py-0.5 border border-[var(--border-paper)]">InvoiceHtmlDataMapper</code> dynamically inspects item counts: &le; 15 items activates <code className="bg-[var(--bg-card)] px-1 py-0.5 border border-[var(--border-paper)]">layout-med</code> (single column, 25px row height); &gt; 15 items switches automatically to <code className="bg-[var(--bg-card)] px-1 py-0.5 border border-[var(--border-paper)]">layout-high / double-column-mode</code> (parallel 7-column sub-tables side-by-side), fitting up to 30 items on a single A4 sheet without spilling.
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
