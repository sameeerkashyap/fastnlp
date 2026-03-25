import { notFound } from "next/navigation";
import Link from "next/link";
import { curriculum } from "@/data/curriculum";
import { concepts } from "@/data/concepts";
import { TASK_TYPE_META, DIFFICULTY_COLORS } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  params: { week: string };
}

export function generateStaticParams() {
  return [1, 2, 3, 4].map((w) => ({ week: String(w) }));
}

export function generateMetadata({ params }: Props): Metadata {
  const week = curriculum.find((w) => w.week === Number(params.week));
  if (!week) return {};
  return {
    title: `Week ${week.week}: ${week.title}`,
    description: week.focus,
  };
}

export default function WeekPage({ params }: Props) {
  const weekNum = Number(params.week);
  const week = curriculum.find((w) => w.week === weekNum);
  if (!week) notFound();

  const prevWeek = curriculum.find((w) => w.week === weekNum - 1);
  const nextWeek = curriculum.find((w) => w.week === weekNum + 1);
  const weekConcepts = concepts.filter((c) => c.week === weekNum);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[var(--ink-3)] mb-8">
        <Link href="/curriculum" className="hover:text-[var(--ink)] no-underline">Curriculum</Link>
        <span>/</span>
        <span style={{ color: week.accent }}>Week {week.week}</span>
      </nav>

      {/* Week header */}
      <div className="rounded-2xl p-8 mb-10 border border-[var(--border)]" style={{ backgroundColor: week.accentLight }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white font-display font-bold text-lg"
            style={{ backgroundColor: week.accent }}>
            {week.week}
          </div>
          <div>
            <p className="text-xs font-mono font-medium uppercase tracking-widest" style={{ color: week.accent }}>Week {week.week} of 4</p>
            <h1 className="font-display text-3xl font-bold text-[var(--ink)]">{week.title}</h1>
          </div>
        </div>
        <p className="text-[var(--ink-2)] max-w-2xl mb-6">{week.focus}</p>

        {/* Meta chips */}
        <div className="flex flex-wrap gap-3">
          <div className="rounded-lg border bg-white px-4 py-2 text-xs">
            <span className="font-medium text-[var(--ink)]">TensorTonic: </span>
            <span className="text-[var(--ink-2)]">{week.tensortonic}</span>
          </div>
          <div className="rounded-lg border px-4 py-2 text-xs font-medium"
            style={{ borderColor: week.accent, color: week.accent, backgroundColor: "white" }}>
            ★ Milestone: {week.milestone}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_260px]">
        {/* Days */}
        <div className="space-y-6">
          {week.days.map((day) => (
            <div key={day.slug} id={day.slug}
              className="rounded-xl border border-[var(--border)] bg-white overflow-hidden">
              {/* Day header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-cream-50">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-medium text-[var(--ink-3)] w-10">{day.day.slice(0,3)}</span>
                  <h2 className="font-display font-semibold text-base text-[var(--ink)]">{day.title}</h2>
                </div>
                <div className="flex gap-1.5">
                  {day.type.map((t) => {
                    const meta = TASK_TYPE_META[t];
                    return (
                      <span key={t} className={`text-xs px-2 py-0.5 rounded-md font-medium ${meta.color}`}>
                        {meta.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="px-6 py-5">
                {/* Summary */}
                <p className="text-sm text-[var(--ink-2)] leading-relaxed mb-5">{day.summary}</p>

                {/* Tasks */}
                <div className="space-y-5">
                  {day.tasks.map((task, i) => (
                    <div key={i}>
                      <p className="text-xs font-mono font-medium text-[var(--ink-3)] uppercase tracking-wider mb-2">{task.category}</p>
                      <ul className="space-y-2">
                        {task.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm text-[var(--ink-2)]">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--border-strong)] flex-shrink-0" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Insight */}
                {day.insight && (
                  <div className="mt-5 rounded-lg px-4 py-3 text-sm leading-relaxed"
                    style={{ backgroundColor: week.accentLight, color: week.accent }}>
                    <span className="font-semibold">💡 Why this matters: </span>
                    <span style={{ color: "var(--ink-2)" }}>{day.insight}</span>
                  </div>
                )}

                {/* Related concepts */}
                {day.concepts.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs text-[var(--ink-3)]">Concepts:</span>
                    {day.concepts.map((slug) => {
                      const concept = concepts.find((c) => c.slug === slug);
                      return concept ? (
                        <Link key={slug} href={`/concepts/${slug}`}
                          className="text-xs px-2 py-0.5 rounded border border-[var(--border)] bg-cream-100 text-[var(--ink-2)] hover:text-[var(--ember)] no-underline transition-colors">
                          {concept.emoji} {concept.title}
                        </Link>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
          {/* Week nav */}
          <div className="rounded-xl border border-[var(--border)] bg-white p-5">
            <h3 className="font-display font-semibold text-sm mb-3">Jump to day</h3>
            <nav className="space-y-1">
              {week.days.map((day) => (
                <a key={day.slug} href={`#${day.slug}`}
                  className="flex items-center gap-2 text-xs text-[var(--ink-2)] hover:text-[var(--ember)] no-underline py-1 transition-colors">
                  <span className="w-8 text-[var(--ink-3)] font-mono">{day.day.slice(0,3)}</span>
                  <span className="truncate">{day.title}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Concepts this week */}
          {weekConcepts.length > 0 && (
            <div className="rounded-xl border border-[var(--border)] bg-white p-5">
              <h3 className="font-display font-semibold text-sm mb-3">Concepts this week</h3>
              <div className="space-y-2">
                {weekConcepts.slice(0, 8).map((concept) => {
                  const colors = DIFFICULTY_COLORS[concept.difficulty];
                  return (
                    <Link key={concept.slug} href={`/concepts/${concept.slug}`}
                      className="flex items-center gap-2 text-xs text-[var(--ink-2)] hover:text-[var(--ember)] no-underline group">
                      <span>{concept.emoji}</span>
                      <span className="flex-1 truncate group-hover:text-[var(--ember)] transition-colors">{concept.title}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${colors.bg} ${colors.text}`}>
                        {concept.difficulty.slice(0,3)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Prev / Next */}
          <div className="grid grid-cols-2 gap-2">
            {prevWeek ? (
              <Link href={`/week/${prevWeek.week}`}
                className="rounded-lg border border-[var(--border)] bg-white p-3 text-center no-underline hover:border-[var(--ember)] transition-colors">
                <p className="text-xs text-[var(--ink-3)]">← Week {prevWeek.week}</p>
                <p className="text-xs font-medium text-[var(--ink)] mt-1 truncate">{prevWeek.title}</p>
              </Link>
            ) : <div />}
            {nextWeek ? (
              <Link href={`/week/${nextWeek.week}`}
                className="rounded-lg border border-[var(--border)] bg-white p-3 text-center no-underline hover:border-[var(--ember)] transition-colors">
                <p className="text-xs text-[var(--ink-3)]">Week {nextWeek.week} →</p>
                <p className="text-xs font-medium text-[var(--ink)] mt-1 truncate">{nextWeek.title}</p>
              </Link>
            ) : <div />}
          </div>
        </aside>
      </div>
    </div>
  );
}
