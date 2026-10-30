import { PortfolioNav } from "@/components/portfolio/navbar";
import { PortfolioHero } from "@/components/portfolio/hero";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { TechStackSection } from "@/components/portfolio/tech-stack-section";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import { CollegeSection } from "@/components/portfolio/college-section";
import { ContactSection } from "@/components/portfolio/contact-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[var(--ink-primary)]">
      {/* Fixed/Sticky Top Navigation with real header and nav */}
      <PortfolioNav />

      {/* Main Content Area following the exact 5-section sequence */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* 1. Hero */}
        <PortfolioHero />

        {/* 2. Projects */}
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
