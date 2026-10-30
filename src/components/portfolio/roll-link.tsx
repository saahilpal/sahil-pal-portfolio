"use client";

import React from "react";

interface RollLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  label: string;
  className?: string;
  accentColor?: string;
}

export function RollLink({
  href,
  label,
  className = "",
  ...props
}: RollLinkProps) {
  return (
    <a
      href={href}
      className={`group relative inline-flex flex-col overflow-hidden text-xs font-semibold py-1 focus-visible:outline-2 focus-visible:outline-[var(--accent-move)] ${className}`}
      {...props}
    >
      <span className="sr-only">{label}</span>
      {/* Top Text Line (rolls up on hover) */}
      <span
        aria-hidden="true"
        className="block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full text-[var(--ink-secondary)]"
      >
        {label}
      </span>
      {/* Bottom Text Line (rolls into place on hover) */}
      <span
        aria-hidden="true"
        className="absolute top-1 left-0 block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-[var(--accent-move)]"
      >
        {label}
      </span>
      {/* Underline base + active draw-in */}
      <span className="absolute bottom-0 left-0 h-[1px] w-full bg-[var(--line)]" aria-hidden="true" />
      <span
        className="absolute bottom-0 left-0 h-[1px] w-full bg-[var(--accent-move)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        aria-hidden="true"
      />
    </a>
  );
}

