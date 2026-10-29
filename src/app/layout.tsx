import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sahil Pal — AI Systems, Grounded Retrieval & Evaluation Engineer",
  description:
    "Sahil Pal — AI Systems, Grounded Retrieval & Evaluation Engineer. Architect of PatchBound v1.1 (deterministic agent verification) and creator of Synapse (PyPI synap-git, AST context engine). Production RAG pipelines, lock-free PostgreSQL queues, and reactive event-loop microservices.",
  keywords: [
    "Sahil Pal",
    "AI Systems Engineer",
    "Grounded Retrieval",
    "RAG",
    "Evaluation Engineer",
    "PatchBound",
    "Synapse",
    "synap-git",
    "Tree-sitter",
    "LangGraph",
    "Model Context Protocol",
    "MCP",
    "PostgreSQL",
    "SKIP LOCKED",
    "pgvector",
    "DocAnalyzer",
    "Hera Billing",
    "LeetSync",
  ],
  authors: [{ name: "Sahil Pal", url: "https://github.com/saahilpal" }],
  creator: "Sahil Pal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/saahilpal",
    title: "Sahil Pal — AI Systems, Grounded Retrieval & Evaluation Engineer",
    description:
      "Deterministic Agent Verification, AST Context Engines, and High-Throughput Distributed Backends. Shipped systems: PatchBound v1.1, DocAnalyzer, Synapse, Hera Billing, LeetSync.",
    siteName: "Sahil Pal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Pal — AI Systems, Grounded Retrieval & Evaluation Engineer",
    description:
      "Deterministic Agent Verification, AST Context Engines, and High-Throughput Distributed Backends.",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
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
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${mono.variable} font-sans antialiased bg-[var(--bg-canvas)] text-[var(--text-primary)]`}
      >
        {children}
      </body>
    </html>
  );
}
