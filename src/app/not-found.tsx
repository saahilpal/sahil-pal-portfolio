"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[var(--accent-emerald-soft)] text-[var(--accent-emerald)] border border-[var(--border-subtle)]">
            ERROR 404
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Page Not Found
          </h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            The requested page does not exist or has been moved. Return to the home portfolio to explore systems and engineering architectures.
          </p>
        </div>

        <div>
          <Link
            href="/"
            className="btn-emerald text-xs py-2 px-4 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
