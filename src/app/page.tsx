"use client";

import { PortfolioNav } from "@/components/portfolio/navbar";
import { PortfolioHero } from "@/components/portfolio/hero";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { TechStackSection } from "@/components/portfolio/tech-stack-section";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import { CollegeSection } from "@/components/portfolio/college-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { SmoothScroll } from "@/components/effects/smooth-scroll";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] antialiased transition-colors relative selection:bg-[var(--accent-emerald)] selection:text-black overflow-x-hidden w-full max-w-full">
      {/* 60FPS Inertial Smooth Scrolling */}
      <SmoothScroll />

      {/* 00. Top Navigation (Zero Overlap Guaranteed) */}
      <PortfolioNav />

      {/* Main Technical Portfolio Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-0">
        {/* 01. Heroic About Summary + Social Links + Resume Button + 4 Metrics */}
        <PortfolioHero />

        {/* 02. Featured Projects (AI Systems First, then Billing, then Tooling) */}
        <ProjectsSection />

        {/* 03. AI Tech Stack & Creative LangGraph State Graph Showcase */}
        <TechStackSection />

        {/* 04. Work Experience (Kristu Jayanti SDC) */}
        <ExperienceSection />

        {/* 05. College / Education (BCA, Kristu Jayanti College) */}
        <CollegeSection />

        {/* 06. Contact & Direct Mailto */}
        <ContactSection />
      </main>
    </div>
  );
}
