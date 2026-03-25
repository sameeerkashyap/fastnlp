import Link from "next/link";
import { concepts, ALL_CATEGORIES, DIFFICULTY_ORDER } from "@/data/concepts";
import { DIFFICULTY_COLORS } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NLP Concepts",
  description: "Every NLP concept you need — from n-grams to SimCSE, clearly explained with code and intuition.",
};

const WEEK_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: "Week 1", color: "#E8571A" },
  2: { label: "Week 2", color: "#0891B2" },
  3: { label: "Week 3", color: "#7C3AED" },
  4: { label: "Week 4", color: "#059669" },
};

export default function ConceptsPage() {
  const byCategory = ALL_CATEGORIES.map((cat) => ({
    category: cat,
    concepts: concepts
      .filter((c) => c.category === cat)
      .sort((a, b) => DIFFICULTY_ORDER.indexOf(a.difficulty) - DIFFICULTY_ORDER.indexOf(b.difficulty)),
  })).filter((g) => g.concepts.length > 0);

  const beginnerCount = concepts.filter((c) => c.difficulty === "beginner").length;
  const intermediateCount = concepts.filter((c) => c.difficulty === "intermediate").length;
  const advancedCount = concepts.filter((c) => c.difficulty === "advanced").length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-mono font-medium text-[var(--ember)] uppercase tracking-widest mb-3">Concepts</p>
        <h1 className="font-display text-4xl font-bold text-[var(--ink)] mb-4">{concepts.length} NLP Concepts</h1>
        <p className="text-[var(--ink-2)] max-w-2xl">
          Every concept comes with plain-English intuition, the math formula, working Python code, and a TensorTonic problem to implement it from scratch.
        </p>

        {/* Difficulty summary */}
        <div className="mt-6 flex flex-wrap gap-3">
          {[
            { label: "Beginner", count: beginnerCount, ...DIFFICULTY_COLORS.beginner },
            { label: "Intermediate", count: intermediateCount, ...DIFFICULTY_COLORS.intermediate },
            { label: "Advanced", count: advancedCount, ...DIFFICULTY_COLORS.advanced },
          ].map((d) => (
            <div key={d.label} className={`flex items-center gap-2 rounded-full px-3 py-1.5 border text-xs font-medium ${d.bg} ${d.text} ${d.border}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${d.dot}`} />
              {d.count} {d.label}
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-12">
        {byCategory.map(({ category, concepts: cats }) => (
          <section key={category}>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="font-display font-bold text-lg text-[var(--ink)]">{category}</h2>
              <span className="text-xs text-[var(--ink-3)] bg-cream-200 px-2 py-0.5 rounded-full">{cats.length}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cats.map((concept) => {
                const colors = DIFFICULTY_COLORS[concept.difficulty];
                const weekInfo = WEEK_LABELS[concept.week];
                return (
                  <Link
                    key={concept.slug}
                    href={`/concepts/${concept.slug}`}
                    className="group rounded-xl border border-[var(--border)] bg-white p-5 card-hover no-underline flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{concept.emoji}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                          style={{ backgroundColor: weekInfo?.color + "15", color: weekInfo?.color }}>
                          {weekInfo?.label}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${colors.bg} ${colors.text}`}>
                          {concept.difficulty.slice(0, 3)}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-display font-semibold text-sm text-[var(--ink)] mb-1 group-hover:text-[var(--ember)] transition-colors">
                      {concept.title}
                    </h3>
                    <p className="text-xs text-[var(--ink-3)] leading-relaxed flex-1">{concept.tagline}</p>

                    {concept.tensortonic && (
                      <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center gap-1.5 text-[10px] text-violet-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                        TensorTonic: {concept.tensortonic}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
