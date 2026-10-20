import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sahil Pal — AI Engineer | Mate in 4",
  description:
    "Mate in 4 — Interactive chess-themed portfolio of Sahil Pal, an AI Engineer in Bengaluru building AST context daemons (Synapse), durable PostgreSQL worker queues (DocAnalyzer), offline-first Android ERPs (Hera Billing), and developer tools (LeetSync).",
  keywords: [
    "Sahil Pal",
    "AI Engineer",
    "Tree-sitter",
    "Model Context Protocol",
    "MCP",
    "Reciprocal Rank Fusion",
    "RRF",
    "PostgreSQL",
    "SKIP LOCKED",
    "pgvector",
    "Offline-first Android",
    "Bengaluru",
  ],
  authors: [{ name: "Sahil Pal", url: "https://github.com/saahilpal" }],
  creator: "Sahil Pal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/saahilpal",
    title: "Sahil Pal — AI Engineer | Mate in 4",
    description:
      "I build engines that evaluate, retrieve, and decide. Four shipped systems: Synapse, DocAnalyzer, Hera Billing, LeetSync.",
    siteName: "Sahil Pal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Pal — AI Engineer | Mate in 4",
    description:
      "I build engines that evaluate, retrieve, and decide. Four shipped systems: Synapse, DocAnalyzer, Hera Billing, LeetSync.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${mono.variable} font-sans antialiased overflow-x-hidden bg-[#08090A] text-[#F3EFE6]`}
      >
        {children}
      </body>
    </html>
  );
}
