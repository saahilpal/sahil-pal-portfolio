import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Sahil Pal — Grandmaster Systems Lab",
  description:
    "Sahil Pal. I love solving problems, exploring how AI systems work under the hood, and building fast, reliable software with verified benchmarks.",
  authors: [{ name: "Sahil Pal", url: "https://github.com/saahilpal" }],
  creator: "Sahil Pal",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Sahil Pal — Grandmaster Systems Lab",
    description:
      "I love solving problems and exploring how AI systems work under the hood. Building fast, practical tools with verified benchmarks.",
    url: "https://sahil-pal-portfolio-d147.vercel.app",
    siteName: "Sahil Pal Systems Lab",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="void">
      <body className="bg-[var(--canvas)] text-[var(--ink-primary)] antialiased font-[family-name:var(--font-body)] overflow-x-clip selection:bg-[var(--accent-lime)] selection:text-[#050507]">
        {children}
      </body>
    </html>
  );
}
