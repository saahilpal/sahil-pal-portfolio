"use client";

import { useState } from "react";
import { Smartphone, Receipt, Trash2, Printer, ShieldCheck, Database } from "lucide-react";

interface BillItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

const SAMPLE_ITEMS = [
  { id: "1", name: "Thermal Paper Roll (80mm)", price: 65 },
  { id: "2", name: "Laser Barcode Scanner 1D", price: 1450 },
  { id: "3", name: "Retail POS Paper Ribbon", price: 120 },
  { id: "4", name: "Cash Drawer Interface Cable", price: 280 },
];

export function HeraBillingPreview() {
  const [activeTab, setActiveTab] = useState<"pos" | "report">("pos");
  const [cart, setCart] = useState<BillItem[]>([
    { id: "1", name: "Thermal Paper Roll (80mm)", price: 65, qty: 2 },
    { id: "3", name: "Retail POS Paper Ribbon", price: 120, qty: 1 },
  ]);
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);
  const [invoiceNumber] = useState("INV-2026-0894");

  const addItem = (item: typeof SAMPLE_ITEMS[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setInvoiceGenerated(false);
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    setInvoiceGenerated(false);
  };

  const subtotal = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const cgst = Math.round(subtotal * 0.09);
  const sgst = Math.round(subtotal * 0.09);
  const grandTotal = subtotal + cgst + sgst;

  return (
    <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-xs">
          <Smartphone size={14} className="text-[var(--color-accent)]" />
          <span className="font-bold text-[var(--color-text)]">HERA BILLING // ANDROID ERP INTERACTIVE SIMULATOR</span>
        </div>
        <div className="font-mono text-[10px] text-[var(--color-text-dim)] flex items-center gap-2">
          <span className="flex items-center gap-1 text-[var(--color-accent)]">
            <ShieldCheck size={12} /> ROOM DB ENCRYPTED
          </span>
          <span>•</span>
          <span>OFFLINE-FIRST</span>
        </div>
      </div>

      {/* Simulator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Side: Android Phone Frame */}
        <div className="lg:col-span-7 p-4 md:p-6 border-b lg:border-b-0 lg:border-r border-[var(--color-border)] bg-[var(--color-bg)]/40 flex justify-center">
          <div className="w-full max-w-[360px] rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl overflow-hidden flex flex-col font-sans">
            {/* Android Status Bar */}
            <div className="px-4 py-1.5 bg-[var(--color-surface-elevated)] border-b border-[var(--color-border)] flex items-center justify-between font-mono text-[10px] text-[var(--color-text-dim)]">
              <span>09:41 AM</span>
              <div className="flex items-center gap-2">
                <span>LTE</span>
                <span>100%</span>
              </div>
            </div>

            {/* Android App Bar */}
            <div className="px-4 py-2.5 bg-[var(--color-surface-elevated)] flex items-center justify-between border-b border-[var(--color-border)]">
              <div>
                <div className="text-xs font-bold text-[var(--color-text)]">Hera Retail POS</div>
                <div className="text-[9px] font-mono text-[var(--color-accent)]">STORE #01 • OFFLINE SYNC ON</div>
              </div>
              <div className="flex rounded p-0.5 bg-[var(--color-bg)] border border-[var(--color-border)] font-mono text-[10px]">
                <button
                  onClick={() => setActiveTab("pos")}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    activeTab === "pos" ? "bg-[var(--color-accent)] text-[#050608] font-bold" : "text-[var(--color-text-dim)]"
                  }`}
                >
                  BILLING
                </button>
                <button
                  onClick={() => setActiveTab("report")}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    activeTab === "report" ? "bg-[var(--color-accent)] text-[#050608] font-bold" : "text-[var(--color-text-dim)]"
                  }`}
                >
                  REPORTS
                </button>
              </div>
            </div>

            {/* Phone Screen Body */}
            {activeTab === "pos" ? (
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3 min-h-[380px]">
                {/* Catalog Quick Add */}
                <div>
                  <div className="text-[10px] font-mono text-[var(--color-text-dim)] uppercase tracking-wider mb-1.5">
                    Catalog Items (Tap to Add)
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {SAMPLE_ITEMS.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => addItem(item)}
                        className="p-1.5 text-left rounded bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[10px] transition-colors"
                      >
                        <div className="font-medium text-[var(--color-text)] truncate">{item.name}</div>
                        <div className="text-[var(--color-accent)] font-mono font-bold mt-0.5">₹{item.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Invoice Cart */}
                <div className="flex-1 flex flex-col justify-between border-t border-[var(--color-border)] pt-2.5">
                  <div className="text-[10px] font-mono text-[var(--color-text-dim)] uppercase tracking-wider mb-1">
                    Current Bill ({cart.length} items)
                  </div>
                  <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-1.5 rounded bg-[var(--color-bg)]/80 font-mono text-[10px]"
                      >
                        <div className="truncate pr-2">
                          <span className="text-[var(--color-text)]">{item.name}</span>
                          <span className="text-[var(--color-text-dim)] ml-1">x{item.qty}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-bold text-[var(--color-text)]">₹{item.price * item.qty}</span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[var(--color-text-dim)] hover:text-red-400"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {cart.length === 0 && (
                      <div className="text-center py-4 text-xs font-mono text-[var(--color-text-dim)]">
                        No items added yet. Tap catalog above.
                      </div>
                    )}
                  </div>

                  {/* Calculations */}
                  <div className="border-t border-[var(--color-border)] pt-2 space-y-1 font-mono text-[10px]">
                    <div className="flex justify-between text-[var(--color-text-dim)]">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-[var(--color-text-dim)]">
                      <span>Tax (CGST 9% + SGST 9%)</span>
                      <span>₹{cgst + sgst}</span>
                    </div>
                    <div className="flex justify-between font-bold text-xs text-[var(--color-text)] pt-1 border-t border-[var(--color-border)]">
                      <span>TOTAL PAYABLE</span>
                      <span className="text-[var(--color-accent)]">₹{grandTotal}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => setInvoiceGenerated(true)}
                    disabled={cart.length === 0}
                    className="w-full py-2 bg-[var(--color-accent)] text-[#050608] rounded font-mono font-bold text-xs flex items-center justify-center gap-1.5 disabled:opacity-30 disabled:pointer-events-none hover:brightness-105 active:scale-[0.98] transition-all"
                  >
                    <Printer size={13} />
                    <span>GENERATE INVOICE PDF</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Reports Tab */
              <div className="p-4 flex-1 space-y-4 font-mono text-xs">
                <div className="p-3 rounded bg-[var(--color-bg)] border border-[var(--color-border)]">
                  <div className="text-[10px] text-[var(--color-text-dim)] uppercase">Today&apos;s Gross Sales</div>
                  <div className="text-xl font-bold text-[var(--color-accent)] mt-0.5">₹48,290.00</div>
                  <div className="text-[10px] text-[var(--color-text-dim)] mt-1">42 Invoices Generated</div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[10px] text-[var(--color-text-dim)] uppercase">Hourly Transaction Velocity</div>
                  <div className="h-20 flex items-end gap-1.5 pt-2 border-b border-[var(--color-border)]">
                    {[35, 60, 45, 80, 95, 70, 85].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t bg-[var(--color-accent)] opacity-80"
                          style={{ height: `${h}%` }}
                        />
                        <span className="text-[8px] text-[var(--color-text-dim)]">{i + 10}h</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[10px] text-[var(--color-text-dim)]">
                  <Database size={13} className="text-[var(--color-accent)] shrink-0" />
                  <span>Room SQLite: 10,480 items indexed. Next backup scheduled via WorkManager.</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Generated Tax Invoice Voucher Preview */}
        <div className="lg:col-span-5 p-4 md:p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between font-mono text-xs mb-2">
              <span className="font-bold text-[var(--color-text)] flex items-center gap-1.5">
                <Receipt size={14} className="text-[var(--color-accent)]" />
                <span>NATIVE CANVAS PDF OUTPUT</span>
              </span>
              <span className="text-[10px] text-[var(--color-accent)] font-mono">
                {invoiceGenerated ? "RENDER READY" : "AWAITING ACTION"}
              </span>
            </div>

            {/* Simulated Printed Voucher Paper */}
            <div className="p-4 rounded border border-[var(--color-border)] bg-[var(--color-bg)] font-mono text-[11px] space-y-2 shadow-inner">
              <div className="text-center pb-2 border-b border-dashed border-[var(--color-border)]">
                <div className="font-bold text-xs text-[var(--color-text)]">HERA RETAIL ENTERPRISES</div>
                <div className="text-[10px] text-[var(--color-text-dim)]">GSTIN: 29AAAAA0000A1Z5 • BENGALURU</div>
                <div className="text-[9px] text-[var(--color-text-dim)] mt-0.5">TAX INVOICE #{invoiceNumber}</div>
              </div>

              <div className="py-2 border-b border-dashed border-[var(--color-border)] space-y-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-[10px]">
                    <span className="text-[var(--color-text)]">
                      {item.name} x{item.qty}
                    </span>
                    <span className="text-[var(--color-text)] font-semibold">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="pt-1 space-y-1 text-[10px]">
                <div className="flex justify-between text-[var(--color-text-dim)]">
                  <span>SUBTOTAL</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[var(--color-text-dim)]">
                  <span>TAX TOTAL (18%)</span>
                  <span>₹{cgst + sgst}</span>
                </div>
                <div className="flex justify-between font-bold text-xs text-[var(--color-text)] pt-1 border-t border-[var(--color-border)]">
                  <span>NET TOTAL</span>
                  <span className="text-[var(--color-accent)]">₹{grandTotal}</span>
                </div>
              </div>

              {/* Barcode representation */}
              <div className="pt-2 text-center">
                <div className="h-6 flex justify-center items-stretch gap-0.5 py-1">
                  {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 3, 1, 2, 4].map((w, idx) => (
                    <div
                      key={idx}
                      className="bg-[var(--color-text)] opacity-70"
                      style={{ width: `${w}px` }}
                    />
                  ))}
                </div>
                <div className="text-[8px] text-[var(--color-text-dim)] tracking-widest">{invoiceNumber}</div>
              </div>
            </div>
          </div>

          <div className="font-mono text-[10px] text-[var(--color-text-dim)] leading-relaxed bg-[var(--color-surface-elevated)] p-3 rounded border border-[var(--color-border)]">
            <strong className="text-[var(--color-text)]">Engineering Highlights:</strong> Built using Android Jetpack
            (MVVM), Room SQLite for zero-latency offline POS checkout, and native Android Canvas graphics for immediate
            thermal Bluetooth receipt printing and PDF generation without cloud latency.
          </div>
        </div>
      </div>
    </div>
  );
}
