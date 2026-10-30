import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[var(--ink-primary)] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-5">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink-primary)]">
          Stalemate. This page does not exist.
        </h1>
        <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
          The requested coordinate is empty or has moved off the board.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="spec-button"
          >
            Return to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
