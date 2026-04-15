import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Sahil Pal | Software Engineer",
  description: "Portfolio of Sahil Pal - Backend-Focused Full Stack Engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${mono.variable} font-sans bg-[#0a0a0a] text-[#ededed] antialiased overflow-x-hidden selection:bg-[#00ff41]/30 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
