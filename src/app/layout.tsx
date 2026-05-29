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
  title: "Sahil Pal | Software Engineer",
  description:
    "Portfolio of Sahil Pal — Backend-Focused Full Stack Engineer building production-grade systems and developer tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Anti-FOUC: apply saved theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme")==="light")document.documentElement.classList.add("light")}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${mono.variable} font-sans antialiased overflow-x-hidden`}
        style={{
          background: "var(--color-bg)",
          color: "var(--color-text)",
        }}
      >
        {/* Subtle Noise Texture Overlay (Performance Optimized via cached Data URI) */}
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
