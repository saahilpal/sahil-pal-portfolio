import { education, EducationItem } from "@/lib/portfolio-data";

export function CollegeSection() {
  return (
    <section
      id="education"
      aria-label="Education"
      className="py-14 sm:py-20 border-b border-[var(--line)]"
    >
      <div className="space-y-6 max-w-4xl">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink-primary)]">
            Education
          </h2>
          <p className="text-sm text-[var(--ink-secondary)]">
            Undergraduate foundation in computer science and applications.
          </p>
        </div>

        <div className="space-y-4">
          {education.map((item: EducationItem, idx: number) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <h3 className="text-base font-bold text-[var(--ink-primary)]">
                  {item.degree}
                </h3>
                <p className="text-sm text-[var(--ink-secondary)]">
                  {item.college}
                </p>
              </div>
              <div className="text-xs font-mono text-[var(--ink-muted)]">
                {item.years}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
