import { notFound } from "next/navigation";
import Link from "next/link";
import { papers, getPaperById } from "@/data/papers";
import type { Metadata } from "next";

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return papers.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const paper = getPaperById(params.id);
  if (!paper) return {};
  return {
    title: paper.title,
    description: paper.tagline,
  };
}

const WEEK_COLORS: Record<number, string> = {
  2: "#0891B2",
  3: "#7C3AED",
};
const WEEK_LIGHT: Record<number, string> = {
  2: "#ECFEFF",
  3: "#F5F3FF",
};

export default function PaperPage({ params }: Props) {
  const paper = getPaperById(params.id);
  if (!paper) notFound();

  const weekColor = WEEK_COLORS[paper.week] || "#E8571A";
  const weekLight = WEEK_LIGHT[paper.week] || "#FFF4EE";
  const paperIndex = papers.findIndex((p) => p.id === params.id);
  const nextPaper = papers[paperIndex + 1];

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[var(--ink-3)] mb-8">
        <Link href="/papers" className="hover:text-[var(--ink)] no-underline">Papers</Link>
        <span>/</span>
        <span style={{ color: weekColor }}>Paper {paperIndex + 1}</span>
      </nav>

      {/* Header */}
      <div className="mb-10 p-7 rounded-2xl border border-[var(--border)]" style={{ backgroundColor: weekLight }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs px-2 py-0.5 rounded font-medium"
            style={{ backgroundColor: weekColor + "20", color: weekColor }}>
            Week {paper.week} · Paper {paperIndex + 1} of 3
          </span>
          <span className="text-xs text-[var(--ink-3)]">{paper.venue} {paper.year}</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-[var(--ink)] mb-2">
          {paper.emoji} {paper.title}
        </h1>
        <p className="text-sm text-[var(--ink-3)] mb-4">{paper.authors}</p>
        <p className="text-[var(--ink-2)] leading-relaxed mb-5 max-w-2xl">{paper.tagline}</p>
        <a href={paper.url} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium no-underline hover:underline"
          style={{ color: weekColor }}>
          Read on arXiv ↗
        </a>
      </div>

      {/* Why it matters */}
      <section className="mb-8">
        <h2 className="font-display font-bold text-xl mb-3 text-[var(--ink)]">Why this paper matters</h2>
        <p className="text-[var(--ink-2)] leading-relaxed">{paper.whyItMatters}</p>
      </section>

      {/* Key insight */}
      <section className="mb-8">
        <h2 className="font-display font-bold text-xl mb-3 text-[var(--ink)]">The key insight</h2>
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-5">
          <p className="text-[var(--ink-2)] leading-relaxed">{paper.keyInsight}</p>
        </div>
      </section>

      {/* Implementation modules */}
      <section className="mb-8">
        <h2 className="font-display font-bold text-xl mb-4 text-[var(--ink)]">
          Implementation modules
        </h2>
        <div className="space-y-3">
          {paper.modules.map((mod, i) => (
            <div key={i} className="flex items-start gap-4 rounded-lg border border-[var(--border)] bg-white px-5 py-4">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: weekColor }}>
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-semibold text-sm text-[var(--ink)]">{mod.title}</h3>
                  {mod.tensortonic && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 font-medium">
                      ⌨️ TensorTonic
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--ink-2)]">{mod.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Code snippet */}
      <section className="mb-8">
        <h2 className="font-display font-bold text-xl mb-4 text-[var(--ink)]">Code — the core implementation</h2>
        <pre><code>{paper.codeSnippet}</code></pre>
      </section>

      {/* Key contributions */}
      <section className="mb-8">
        <h2 className="font-display font-bold text-xl mb-4 text-[var(--ink)]">Key contributions</h2>
        <ul className="space-y-3">
          {paper.keyContributions.map((contrib, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[var(--ink-2)]">
              <span className="mt-0.5 h-5 w-5 flex-shrink-0 flex items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: weekColor }}>✓</span>
              <span className="leading-relaxed">{contrib}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Limitations */}
      <section className="mb-8">
        <h2 className="font-display font-bold text-xl mb-4 text-[var(--ink)]">Limitations to know</h2>
        <ul className="space-y-3">
          {paper.limitations.map((limit, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[var(--ink-2)]">
              <span className="mt-0.5 text-amber-500 flex-shrink-0">⚠</span>
              <span className="leading-relaxed">{limit}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Project connection */}
      <section className="mb-8">
        <h2 className="font-display font-bold text-xl mb-3 text-[var(--ink)]">Connection to the project</h2>
        <div className="rounded-xl border px-5 py-4 text-sm text-[var(--ink-2)] leading-relaxed"
          style={{ borderColor: weekColor, backgroundColor: weekLight }}>
          {paper.projectConnection}
        </div>
      </section>

      {/* Interview questions */}
      <section className="mb-10">
        <h2 className="font-display font-bold text-xl mb-4 text-[var(--ink)]">Interview questions</h2>
        <p className="text-sm text-[var(--ink-3)] mb-4">
          If you've implemented this paper, you should be able to answer these cold.
        </p>
        <div className="space-y-3">
          {paper.interviewQuestions.map((q, i) => (
            <div key={i} className="rounded-lg border border-[var(--border)] bg-white px-5 py-4 text-sm text-[var(--ink-2)]">
              <span className="font-mono text-xs text-[var(--ink-3)] mr-2">Q{i + 1}.</span>
              {q}
            </div>
          ))}
        </div>
      </section>

      {/* Nav */}
      <div className="border-t border-[var(--border)] pt-8 flex justify-between items-center">
        <Link href="/papers" className="text-sm text-[var(--ink-3)] hover:text-[var(--ink)] no-underline">
          ← All papers
        </Link>
        {nextPaper && (
          <Link href={`/papers/${nextPaper.id}`} className="text-sm font-medium no-underline"
            style={{ color: WEEK_COLORS[nextPaper.week] || "#E8571A" }}>
            Next: {nextPaper.emoji} {nextPaper.title.split(":")[0]} →
          </Link>
        )}
      </div>
    </div>
  );
}
