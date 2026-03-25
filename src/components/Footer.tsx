import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] mt-24">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[var(--ember)] text-white">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M2 11L7 3L12 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 8.5H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-display font-bold text-sm">FastNLP</span>
            </div>
            <p className="text-sm text-[var(--ink-3)] leading-relaxed">
              NeetCode for NLP. Zero to hero in 4 weeks with a real project.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-3">Learn</h4>
            <ul className="space-y-2">
              {[
                { href: "/curriculum", label: "4-Week Curriculum" },
                { href: "/week/1", label: "Week 1: Foundations" },
                { href: "/week/2", label: "Week 2: Attention" },
                { href: "/week/3", label: "Week 3: Fine-tuning" },
                { href: "/week/4", label: "Week 4: Ship It" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[var(--ink-3)] hover:text-[var(--ink)] no-underline transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reference */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-3">Reference</h4>
            <ul className="space-y-2">
              {[
                { href: "/concepts", label: "All Concepts" },
                { href: "/papers", label: "Papers" },
                { href: "/project", label: "Capstone Project" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[var(--ink-3)] hover:text-[var(--ink)] no-underline transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-3">Resources</h4>
            <ul className="space-y-2">
              {[
                { href: "https://tensortonic.com", label: "TensorTonic" },
                { href: "https://jalammar.github.io", label: "Jay Alammar's Blog" },
                { href: "https://huggingface.co", label: "HuggingFace" },
                { href: "https://arxiv.org", label: "arXiv" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--ink-3)] hover:text-[var(--ink)] no-underline transition-colors"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--ink-3)]">
            FastNLP — Open source NLP curriculum. MIT License.
          </p>
          <p className="text-xs text-[var(--ink-3)]">
            Built for humans. No paywalls, no ads.
          </p>
        </div>
      </div>
    </footer>
  );
}
