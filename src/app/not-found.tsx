import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[var(--ink-primary)] flex flex-col items-center justify-center p-6 text-center font-mono">
      <div className="brutalist-card max-w-lg p-8 sm:p-10 space-y-6 bg-[var(--surface)] border-2 border-[var(--border-frame)] shadow-[6px_6px_0px_var(--accent-red)]">
        <div className="inline-block px-3 py-1 bg-[var(--accent-red)] text-white text-xs font-bold tracking-widest uppercase">
          404 // ILLEGAL MOVE
        </div>

        <h1 className="text-3xl sm:text-4xl font-[family-name:var(--font-heading)] font-black tracking-tight text-[var(--ink-primary)] uppercase">
          STALEMATE // ARTIFACT NOT FOUND
        </h1>

        <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
          The requested coordinate lies beyond the board geometry. The piece was captured, the file was unindexed, or the turn was invalidated by the arbiter.
        </p>

        <div className="pt-2">
          <Link
            href="/"
            className="brutalist-btn brutalist-btn-primary px-6 py-3 text-xs gap-2"
          >
            <span>♔ RETURN TO BOARD (MAIN ARCHITECTURE)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
