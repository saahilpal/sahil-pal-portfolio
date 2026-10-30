import { CustomCursor } from "@/components/portfolio/custom-cursor";
import { LenisScroller } from "@/components/portfolio/lenis-scroller";
import { KineticTicker } from "@/components/portfolio/kinetic-ticker";
import { PortfolioNav } from "@/components/portfolio/navbar";
import { PortfolioHero } from "@/components/portfolio/hero";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { TechStackSection } from "@/components/portfolio/tech-stack-section";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import { CollegeSection } from "@/components/portfolio/college-section";
import { ContactSection } from "@/components/portfolio/contact-section";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--canvas)] text-[var(--ink-primary)] selection:bg-[var(--accent-move)] selection:text-[#121315]">
      {/* Subtle Living Film Grain Canvas Overlay */}
      <div className="grain-canvas fixed inset-0 pointer-events-none z-[99]" aria-hidden="true" />

      {/* Desktop Spotlight & Kinetic Cursor with Contextual States */}
      <CustomCursor />

      {/* Smooth Scroll + Dynamic Midpoint Background Shifts */}
      <LenisScroller />

      {/* Top Navigation with Sliding Active Indicator & System Status */}
      <PortfolioNav />

      {/* Main Content Area following the exact 5-section sequence */}
      <main className="w-full">
        {/* 1. Hero */}
        <PortfolioHero />

        {/* Ambient Engineering Loop Ribbon */}
        <KineticTicker />

        {/* 2. Projects (Slides over pinned Hero) */}
        <ProjectsSection />

        {/* 3. Tech Stack */}
        <TechStackSection />

        {/* 4. Work Experience */}
        <ExperienceSection />

        {/* 5. Education */}
        <CollegeSection />

        {/* Footer: email and links again */}
        <ContactSection />
      </main>
    </div>
  );
}
