import Link from "next/link";
import { curriculum } from "@/data/curriculum";
import { concepts } from "@/data/concepts";
import { DIFFICULTY_COLORS } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FastNLP — NeetCode for NLP",
};

const STATS = [
  { value: "4", label: "weeks" },
  { value: "3", label: "papers" },
  { value: "27+", label: "concepts" },
  { value: "1", label: "project shipped" },
];

export default function HomePage() {
  const beginnerConcepts = concepts.filter((c) => c.difficulty === "beginner").slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs text-[var(--ink-2)] mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Open source NLP curriculum
          </div>

          <div className="max-w-3xl">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-[var(--ink)] mb-6" style={{ letterSpacing: "-0.03em" }}>
              Learn NLP the{" "}
              <span className="text-[var(--ember)]">right way.</span>
              <br />
              Zero to hero in 4 weeks.
            </h1>
            <p className="text-xl text-[var(--ink-2)] leading-relaxed max-w-2xl mb-10">
              FastNLP is a structured, project-driven curriculum for anyone with basic Python and math.
              No tutorials, no fluff — you implement 3 landmark papers and ship a real NLP system.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/curriculum"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--ember)] text-white font-medium rounded-lg hover:bg-ember-600 transition-colors no-underline text-sm"
              >
                View curriculum →
              </Link>
              <Link
                href="/week/1"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] bg-white text-[var(--ink)] font-medium rounded-lg hover:bg-cream-200 transition-colors no-underline text-sm"
              >
                Start Week 1
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap gap-10 border-t border-[var(--border)] pt-10">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display font-bold text-3xl text-[var(--ink)]">{stat.value}</p>
                <p className="text-sm text-[var(--ink-3)] mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12">
            <p className="text-xs font-mono font-medium text-[var(--ember)] uppercase tracking-widest mb-3">
              How it works
            </p>
            <h2 className="font-display text-3xl font-bold text-[var(--ink)]">
              Like NeetCode, but for NLP
            </h2>
            <p className="text-[var(--ink-2)] mt-3 max-w-xl">
              Every concept has a TensorTonic problem to implement from scratch, a project component to build, and a paper to understand. Theory and practice in lockstep.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "📐",
                title: "Learn the math",
                description:
                  "Every concept starts with the formula. TF-IDF, attention, contrastive loss — understand it from first principles, not from API docs.",
              },
              {
                icon: "⌨️",
                title: "Implement from scratch",
                description:
                  "Use TensorTonic to implement each algorithm. Not copy-paste — write it out line by line until you can derive it from memory.",
              },
              {
                icon: "🚀",
                title: "Ship a real project",
                description:
                  "Every week you add to the capstone: a multilingual job title normalization engine with semantic search, deployed on HuggingFace.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[var(--border)] bg-white p-6 card-hover"
              >
                <div className="text-2xl mb-4">{item.icon}</div>
                <h3 className="font-display font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--ink-2)] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Week Overview */}
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12">
            <p className="text-xs font-mono font-medium text-[var(--ember)] uppercase tracking-widest mb-3">
              The curriculum
            </p>
            <h2 className="font-display text-3xl font-bold text-[var(--ink)]">4 weeks. 1 shipped system.</h2>
          </div>

          <div className="space-y-4">
            {curriculum.map((week) => (
              <Link
                key={week.week}
                href={`/week/${week.week}`}
                className="group flex items-center gap-6 rounded-xl border border-[var(--border)] bg-white p-6 card-hover no-underline"
              >
                {/* Week number */}
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-white font-display font-bold text-lg"
                  style={{ backgroundColor: week.accent }}
                >
                  {week.week}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-semibold text-base text-[var(--ink)]">
                      Week {week.week}: {week.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--ink-2)] line-clamp-1">{week.focus}</p>
                </div>

                {/* Milestone chip */}
                <div className="hidden md:flex flex-shrink-0">
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
                    style={{ backgroundColor: week.accentLight, color: week.accent }}
                  >
                    {week.milestone.split(" ").slice(0, 4).join(" ")}...
                  </span>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 text-[var(--ink-3)] group-hover:text-[var(--ember)] transition-colors">
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Concepts preview */}
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-mono font-medium text-[var(--ember)] uppercase tracking-widest mb-3">
                Concepts
              </p>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">
                {concepts.length} concepts, clearly explained
              </h2>
            </div>
            <Link
              href="/concepts"
              className="text-sm text-[var(--ember)] hover:underline no-underline"
            >
              Browse all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {beginnerConcepts.map((concept) => {
              const colors = DIFFICULTY_COLORS[concept.difficulty];
              return (
                <Link
                  key={concept.slug}
                  href={`/concepts/${concept.slug}`}
                  className="group rounded-xl border border-[var(--border)] bg-white p-5 card-hover no-underline"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl">{concept.emoji}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.bg} ${colors.text}`}
                    >
                      {concept.difficulty}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-sm text-[var(--ink)] mb-1">
                    {concept.title}
                  </h3>
                  <p className="text-xs text-[var(--ink-3)] leading-relaxed">
                    {concept.tagline}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-2xl bg-[var(--ink)] p-12 text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              Ready to start?
            </h2>
            <p className="text-cream-200 mb-8 max-w-lg mx-auto">
              Week 1 starts with n-grams and TF-IDF. By Friday you'll have a working baseline. 
              No setup required beyond Python and curiosity.
            </p>
            <Link
              href="/week/1"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--ember)] text-white font-medium rounded-lg hover:bg-ember-600 transition-colors no-underline"
            >
              Start Week 1 — Free →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
