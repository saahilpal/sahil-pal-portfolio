import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#F4F3EC",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Sahil Pal — AI & Backend Systems",
  description:
    "Sahil Pal. I build backend systems and AI applications. I love solving hard engineering problems and building fast, reliable software that actually works.",
  authors: [{ name: "Sahil Pal", url: "https://github.com/saahilpal" }],
  creator: "Sahil Pal",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Sahil Pal — AI & Backend Systems",
    description:
      "I build backend systems and AI applications. I love solving hard engineering problems and building fast, reliable software that actually works.",
    url: "https://sahil-pal-portfolio-d147.vercel.app",
    siteName: "Sahil Pal",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="blueprint">
      <body className="bg-[var(--canvas)] text-[var(--ink-primary)] antialiased font-[family-name:var(--font-body)] overflow-x-clip selection:bg-[var(--accent-lime)] selection:text-[#050507]">
        {children}
      </body>
    </html>
  );
}
