import { techStack, TechStackGroup } from "@/lib/portfolio-data";

export function TechStackSection() {
  return (
    <section
      id="tech-stack"
      aria-label="Tech Stack"
      className="py-14 sm:py-20 border-b border-[var(--line)]"
    >
      <div className="space-y-8 max-w-4xl">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink-primary)]">
            Tech Stack
          </h2>
          <p className="text-sm text-[var(--ink-secondary)]">
            Tools, runtimes, and libraries I use to build systems.
          </p>
        </div>

        {/* Grouped Plain Text Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {techStack.map((group: TechStackGroup) => (
            <div key={group.category} className="space-y-1.5">
              <h3 className="text-sm font-bold text-[var(--ink-primary)]">
                {group.category}
              </h3>
              <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
                {group.skills}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
