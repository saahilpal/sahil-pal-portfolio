import { profile } from "@/lib/portfolio-data";

export function ContactSection() {
  return (
    <footer
      id="contact"
      aria-label="Contact and Links"
      className="py-16 sm:py-24 space-y-10 max-w-4xl"
    >
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink-primary)]">
          Contact
        </h2>
        <p className="text-sm text-[var(--ink-secondary)]">
          Open to full-time engineering roles, research collaboration, and systems projects.
        </p>

        {/* Email with tiny sign-off */}
        <div className="pt-2 space-y-1">
          <a
            href={`mailto:${profile.email}`}
            className="text-lg sm:text-xl font-bold text-[var(--ink-primary)] hover:text-[var(--accent-move)] transition-colors"
          >
            {profile.email}
          </a>
          <p className="text-xs font-mono text-[var(--ink-muted)]">
            Your move.
          </p>
        </div>
      </div>

      {/* Links repeated with text labels */}
      <div className="pt-6 border-t border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-5 font-medium">
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
          <a
            href={profile.resumePath}
            download="Sahil_Pal_Resume.pdf"
            className="text-link text-[var(--accent-move)]"
          >
            Download resume (PDF)
          </a>
        </div>

        <div className="text-[var(--ink-muted)] font-mono text-[11px]">
          Sahil Pal &bull; AI / Gen AI Engineer
        </div>
      </div>
    </footer>
  );
}
