"use client";

import { useTextDecode } from "@/lib/anime-motion";

interface DecodeTextProps {
  text: string;
  className?: string;
}

export function DecodeText({ text, className = "" }: DecodeTextProps) {
  const ref = useTextDecode<HTMLSpanElement>(text);
  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
