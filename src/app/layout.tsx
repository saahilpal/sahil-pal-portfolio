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
  title: "Sahil Pal — Software Engineer | AI Systems & Backend Architect",
  description:
    "Portfolio of Sahil Pal — BCA graduate and software engineer building Git-aware code intelligence (Synapse), grounded RAG systems (DocAnalyzer), and high-throughput offline-first applications (Hera Billing).",
  keywords: [
    "Sahil Pal",
    "Software Engineer",
    "AI Systems",
    "Retrieval Augmented Generation",
    "Synapse",
    "DocAnalyzer",
    "Hera Billing",
    "Code Intelligence",
    "Model Context Protocol",
    "Tree-sitter",
    "PostgreSQL pgvector",
    "Backend Engineer",
    "Bengaluru",
  ],
  authors: [{ name: "Sahil Pal", url: "https://github.com/saahilpal" }],
  creator: "Sahil Pal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/saahilpal",
    title: "Sahil Pal — Software Engineer | AI Systems & Backend Architect",
    description:
      "Architecting code intelligence engines, deterministic RAG pipelines, and high-throughput backend services.",
    siteName: "Sahil Pal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Pal — Software Engineer",
    description:
      "Architecting code intelligence engines, deterministic RAG pipelines, and high-throughput backend services.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Anti-FOUC script: synchronously apply stored theme before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme")==="light")document.documentElement.classList.add("light")}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${mono.variable} font-sans antialiased overflow-x-hidden`}
        style={{
          backgroundColor: "var(--bg-paper)",
          color: "var(--text-ink)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
