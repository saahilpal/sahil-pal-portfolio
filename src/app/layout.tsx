import type { Metadata, Viewport } from "next";
import { Archivo, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#121315",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Sahil Pal — AI / Gen AI Engineer",
  description:
    "Sahil Pal — AI / Gen AI Engineer. Building deterministic context engines, grounded retrieval systems, and offline-first backends.",
  authors: [{ name: "Sahil Pal", url: "https://github.com/saahilpal" }],
  creator: "Sahil Pal",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${schibsted.variable}`}>
      <body className="bg-[var(--canvas)] text-[var(--ink-primary)] antialiased font-[family-name:var(--font-body)] overflow-x-hidden selection:bg-[var(--accent-move)] selection:text-[#121315]">
        {children}
      </body>
    </html>
  );
}
