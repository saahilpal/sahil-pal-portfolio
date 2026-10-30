import { profile } from "@/lib/portfolio-data";

export function PortfolioHero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="pt-16 sm:pt-24 pb-14 sm:pb-20 border-b border-[var(--line)]"
    >
      <div className="space-y-8 max-w-3xl">
        {/* Title & Name */}
        <div className="space-y-2">
          <p className="text-xs sm:text-sm font-mono text-[var(--accent-move)] tracking-normal">
            {profile.title} &bull; {profile.location}
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--ink-primary)] leading-none">
            {profile.name}
          </h1>
        </div>

        {/* 2 to 3 simple lines on who I am and what I build */}
        <div className="space-y-2 text-base sm:text-lg text-[var(--ink-secondary)] leading-relaxed">
          {profile.summaryLines.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>

        {/* Action Row: Working Download Resume Button + Text-labeled links (not icon-only) */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href={profile.resumePath}
            download="Sahil_Pal_Resume.pdf"
            className="spec-button"
          >
            Download resume (PDF)
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="spec-button-secondary"
          >
            {profile.email}
          </a>

          <div className="flex items-center gap-4 text-xs font-medium sm:pl-2">
            {profile.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
