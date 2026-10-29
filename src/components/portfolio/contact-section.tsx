"use client";

import { useState } from "react";
import {
  Mail,
  Copy,
  Check,
  Phone,
  MapPin,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import { profile } from "@/lib/portfolio-data";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.links.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="py-20 sm:py-28">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Main CTA Card */}
        <div className="craft-card p-8 sm:p-12 space-y-8 bg-gradient-to-b from-[var(--bg-surface)] to-[var(--bg-canvas)] border-[var(--border-medium)]">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-emerald)] uppercase tracking-wider font-semibold">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)]" />
              <span>05 // DISPATCH &amp; GET IN TOUCH</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Let&apos;s Build Systems That Don&apos;t Hallucinate.
            </h2>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              I am actively looking for engineering roles and collaborations in **AI Systems**, **Grounded Retrieval (RAG)**, **Evaluation Frameworks**, and **High-Throughput Backends**.
            </p>
          </div>

          {/* Contact Dispatch Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={`mailto:${profile.links.email}?subject=Engineering%20Opportunity%20%E2%80%94%20AI%20Systems`}
              className="btn-emerald text-sm py-3 px-6 shadow-xl"
            >
              <Mail className="w-4 h-4" />
              <span>Send Direct Email</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="btn-surface text-sm py-3 px-5 group"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[var(--accent-emerald)]" />
                  <span className="text-[var(--accent-emerald)]">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
                  <span>Copy: {profile.links.email}</span>
                </>
              )}
            </button>

            <a
              href={profile.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-surface text-sm py-3 px-5 group"
            >
              <FileText className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
              <span>Download Résumé</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            </a>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[var(--accent-emerald)]" />
              <span className="font-mono">{profile.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--accent-cyan)]" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2 sm:justify-end">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)]" />
              <span className="font-mono text-[var(--accent-emerald)]">Immediate Availability</span>
            </div>
          </div>
        </div>

        {/* Bottom Colophon / Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-[var(--text-muted)] border-t border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Sahil Pal. Built with Next.js, Anime.js &amp; Tailwind CSS.</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              GitHub
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={profile.links.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              LeetCode
            </a>
            <a
              href={`mailto:${profile.links.email}`}
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
