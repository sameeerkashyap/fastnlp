import Link from "next/link";
import { curriculum } from "@/data/curriculum";
import { TASK_TYPE_META } from "@/lib/utils";
import { GlobalProgressBar } from "@/components/ProgressTracker";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "4-Week NLP Curriculum",
  description: "The complete FastNLP curriculum — from n-grams to shipping a fine-tuned multilingual encoder model.",
};

export default function CurriculumPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-mono font-medium text-[var(--ember)] uppercase tracking-widest mb-3">
          Curriculum
        </p>
        <h1 className="font-display text-4xl font-bold text-[var(--ink)] mb-4">
          4 Weeks to NLP Fluency
        </h1>
        <p className="text-[var(--ink-2)] max-w-2xl text-lg">
          A daily plan covering NLP fundamentals, transformer architecture, fine-tuning, and deployment. 
          Every week ends with a measurable milestone on the capstone project.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
        {/* Main curriculum */}
        <div className="space-y-10">
          {curriculum.map((week) => (
            <div key={week.week} className="rounded-2xl border border-[var(--border)] bg-white overflow-hidden">
              {/* Week header */}
              <div
                className="px-7 py-6 border-b border-[var(--border)]"
                style={{ backgroundColor: week.accentLight }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-white font-display font-bold text-sm"
                        style={{ backgroundColor: week.accent }}
                      >
                        {week.week}
                      </span>
                      <h2 className="font-display font-bold text-xl text-[var(--ink)]">
                        Week {week.week}: {week.title}
                      </h2>
                    </div>
                    <p className="text-sm text-[var(--ink-2)] max-w-lg">{week.focus}</p>
                  </div>
                  <Link
                    href={`/week/${week.week}`}
                    className="flex-shrink-0 text-sm font-medium no-underline transition-colors"
                    style={{ color: week.accent }}
                  >
                    See all days →
                  </Link>
                </div>

                {/* Metadata row */}
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-[var(--ink-2)]">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium">TensorTonic:</span>
                    <span>{week.tensortonic}</span>
                  </div>
                </div>

                {/* Milestone */}
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium" style={{ borderColor: week.accent, color: week.accent }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                    <path d="M5 0.5L6.12 3.38H9.19L6.77 5.12L7.64 8L5 6.3L2.36 8L3.23 5.12L0.81 3.38H3.88L5 0.5Z" />
                  </svg>
                  Milestone: {week.milestone}
                </div>
              </div>

              {/* Day list */}
              <div className="divide-y divide-[var(--border)]">
                {week.days.map((day, i) => (
                  <Link
                    key={day.slug}
                    href={`/week/${week.week}#${day.slug}`}
                    className="flex items-center gap-4 px-7 py-4 hover:bg-cream-50 transition-colors no-underline group"
                  >
                    {/* Day indicator */}
                    <div className="flex-shrink-0 w-20 text-xs text-[var(--ink-3)] font-medium">
                      {day.day.slice(0, 3)}
                    </div>

                    {/* Title */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--ink)] group-hover:text-[var(--ember)] transition-colors truncate">
                        {day.title}
                      </p>
                    </div>

                    {/* Type badges */}
                    <div className="flex-shrink-0 flex gap-1.5">
                      {day.type.slice(0, 2).map((t) => {
                        const meta = TASK_TYPE_META[t];
                        return (
                          <span
                            key={t}
                            className={`text-xs px-2 py-0.5 rounded-md font-medium ${meta.color}`}
                          >
                            {meta.label}
                          </span>
                        );
                      })}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
          <GlobalProgressBar />

          {/* Prerequisite card */}
          <div className="rounded-xl border border-[var(--border)] bg-white p-5">
            <h3 className="font-display font-semibold text-sm mb-3">Prerequisites</h3>
            <ul className="space-y-2">
              {[
                "Python — functions, loops, dicts",
                "Basic calculus — what a derivative is",
                "Basic linear algebra — vectors, dot products",
                "No ML experience needed",
              ].map((req) => (
                <li key={req} className="flex items-start gap-2 text-xs text-[var(--ink-2)]">
                  <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* TensorTonic */}
          <div className="rounded-xl border border-[var(--border)] bg-white p-5">
            <h3 className="font-display font-semibold text-sm mb-2">
              TensorTonic integration
            </h3>
            <p className="text-xs text-[var(--ink-2)] leading-relaxed mb-3">
              FastNLP uses TensorTonic for hands-on implementation of every algorithm. Each day 
              references specific problems to solve there.
            </p>
            <a
              href="https://tensortonic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[var(--ember)] no-underline hover:underline"
            >
              Open TensorTonic ↗
            </a>
          </div>

          {/* Weekly legend */}
          <div className="rounded-xl border border-[var(--border)] bg-white p-5">
            <h3 className="font-display font-semibold text-sm mb-3">Day types</h3>
            <div className="space-y-2">
              {Object.entries(TASK_TYPE_META).map(([key, meta]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${meta.color}`}>
                    {meta.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
