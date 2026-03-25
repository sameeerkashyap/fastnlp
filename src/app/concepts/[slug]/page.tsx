import { notFound } from "next/navigation";
import Link from "next/link";
import { concepts, getConceptBySlug } from "@/data/concepts";
import { DIFFICULTY_COLORS } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return concepts.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const concept = getConceptBySlug(params.slug);
  if (!concept) return {};
  return {
    title: concept.title,
    description: concept.tagline,
  };
}

const RESOURCE_ICONS: Record<string, string> = {
  article: "📖",
  paper: "📄",
  video: "🎥",
  docs: "📚",
};

export default function ConceptPage({ params }: Props) {
  const concept = getConceptBySlug(params.slug);
  if (!concept) notFound();

  const colors = DIFFICULTY_COLORS[concept.difficulty];
  const related = concept.relatedConcepts
    .map((slug) => concepts.find((c) => c.slug === slug))
    .filter(Boolean);

  const weekColors: Record<number, string> = {
    1: "#E8571A", 2: "#0891B2", 3: "#7C3AED", 4: "#059669",
  };
  const weekColor = weekColors[concept.week] || "#E8571A";

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[var(--ink-3)] mb-8">
        <Link href="/concepts" className="hover:text-[var(--ink)] no-underline">Concepts</Link>
        <span>/</span>
        <span style={{ color: weekColor }}>{concept.category}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{concept.emoji}</span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.bg} ${colors.text}`}>
                {concept.difficulty}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: weekColor + "15", color: weekColor }}>
                Week {concept.week}
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold text-[var(--ink)]">{concept.title}</h1>
          </div>
        </div>
        <p className="text-lg text-[var(--ink-2)] italic">{concept.tagline}</p>
      </div>

      {/* TensorTonic callout */}
      {concept.tensortonic && (
        <div className="mb-8 flex items-center gap-3 rounded-xl bg-violet-50 border border-violet-200 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600 flex-shrink-0">
            ⌨️
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-violet-800">Implement this on TensorTonic</p>
            <p className="text-xs text-violet-600 mt-0.5">Problem: <strong>{concept.tensortonic}</strong></p>
          </div>
          <a href="https://tensortonic.com" target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 text-xs font-medium text-violet-700 no-underline hover:underline">
            Open ↗
          </a>
        </div>
      )}

      {/* Description */}
      <section className="mb-8">
        <h2 className="font-display font-bold text-lg mb-3 text-[var(--ink)]">What is it?</h2>
        <p className="text-[var(--ink-2)] leading-relaxed">{concept.description}</p>
      </section>

      {/* Intuition */}
      <section className="mb-8">
        <h2 className="font-display font-bold text-lg mb-3 text-[var(--ink)]">The intuition</h2>
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-5">
          <p className="text-[var(--ink-2)] leading-relaxed">{concept.intuition}</p>
        </div>
      </section>

      {/* Formula */}
      {concept.formula && (
        <section className="mb-8">
          <h2 className="font-display font-bold text-lg mb-3 text-[var(--ink)]">The math</h2>
          <div className="rounded-xl bg-[#1c1917] px-6 py-5 mb-3">
            <code className="font-mono text-amber-300 text-base">{concept.formula}</code>
          </div>
          {concept.formulaExplained && (
            <p className="text-sm text-[var(--ink-2)] leading-relaxed">{concept.formulaExplained}</p>
          )}
        </section>
      )}

      {/* Python code */}
      {concept.pythonCode && (
        <section className="mb-8">
          <h2 className="font-display font-bold text-lg mb-3 text-[var(--ink)]">Python implementation</h2>
          <pre><code>{concept.pythonCode}</code></pre>
        </section>
      )}

      {/* Key points */}
      <section className="mb-8">
        <h2 className="font-display font-bold text-lg mb-3 text-[var(--ink)]">Key points</h2>
        <ul className="space-y-3">
          {concept.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--ember-light)] text-[var(--ember)] text-xs font-bold mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-[var(--ink-2)] leading-relaxed">{point}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Resources */}
      {concept.resources.length > 0 && (
        <section className="mb-8">
          <h2 className="font-display font-bold text-lg mb-3 text-[var(--ink)]">Learn more</h2>
          <div className="space-y-2">
            {concept.resources.map((resource, i) => (
              <a key={i} href={resource.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-white px-4 py-3 no-underline hover:border-[var(--ember)] transition-colors group">
                <span className="text-lg">{RESOURCE_ICONS[resource.type]}</span>
                <span className="flex-1 text-sm text-[var(--ink-2)] group-hover:text-[var(--ink)] transition-colors">{resource.name}</span>
                <span className="text-xs text-[var(--ink-3)]">↗</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Related concepts */}
      {related.length > 0 && (
        <section className="mb-8">
          <h2 className="font-display font-bold text-lg mb-3 text-[var(--ink)]">Related concepts</h2>
          <div className="flex flex-wrap gap-2">
            {related.map((rel) => rel && (
              <Link key={rel.slug} href={`/concepts/${rel.slug}`}
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm no-underline hover:border-[var(--ember)] transition-colors">
                <span>{rel.emoji}</span>
                <span className="text-[var(--ink-2)]">{rel.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Bottom nav */}
      <div className="border-t border-[var(--border)] pt-8 flex justify-between">
        <Link href="/concepts" className="text-sm text-[var(--ink-3)] hover:text-[var(--ink)] no-underline">
          ← All concepts
        </Link>
        <Link href={`/week/${concept.week}`} className="text-sm no-underline" style={{ color: weekColor }}>
          Week {concept.week} curriculum →
        </Link>
      </div>
    </div>
  );
}
