import { workExperience, WorkItem } from "@/lib/portfolio-data";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-label="Work Experience"
      className="py-14 sm:py-20 border-b border-[var(--line)]"
    >
      <div className="space-y-8 max-w-4xl">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink-primary)]">
            Work Experience
          </h2>
          <p className="text-sm text-[var(--ink-secondary)]">
            Professional software engineering work.
          </p>
        </div>

        <div className="space-y-8">
          {workExperience.map((item: WorkItem, idx: number) => (
            <div key={idx} className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h3 className="text-base font-bold text-[var(--ink-primary)]">
                    {item.company}
                  </h3>
                  <p className="text-sm text-[var(--accent-move)] font-medium">
                    {item.role}
                  </p>
                </div>
                <div className="text-xs font-mono text-[var(--ink-muted)]">
                  {item.dates}
                </div>
              </div>

              <ul className="space-y-1.5 text-sm text-[var(--ink-secondary)] list-disc list-inside">
                {item.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
