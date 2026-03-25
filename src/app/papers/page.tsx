import Link from "next/link";
import { papers } from "@/data/papers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Papers",
  description: "Implement 3 landmark NLP papers from scratch: Attention Is All You Need, Sentence-BERT, and SimCSE.",
};

const WEEK_COLORS: Record<number, string> = {
  2: "#0891B2",
  3: "#7C3AED",
};

export default function PapersPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-mono font-medium text-[var(--ember)] uppercase tracking-widest mb-3">Papers</p>
        <h1 className="font-display text-4xl font-bold text-[var(--ink)] mb-4">
          3 Papers to Implement
        </h1>
        <p className="text-[var(--ink-2)] max-w-2xl">
          Don't just read papers — implement them. Each paper is broken into modules with working code. 
          By Week 4 you can say "I implemented these" and mean it.
        </p>
      </div>

      {/* Philosophy callout */}
      <div className="mb-10 rounded-xl bg-[var(--ink)] px-7 py-6 text-cream-100">
        <h2 className="font-display font-semibold text-base mb-2">Why implement papers?</h2>
        <p className="text-sm text-cream-200 leading-relaxed">
          Reading a paper gives you a mental model. Implementing it gives you understanding. 
          When you've written the scaled dot-product attention formula from scratch, you'll never again 
          be confused by a diagram of a transformer block. The implementation <em>is</em> the understanding.
        </p>
      </div>

      {/* Papers */}
      <div className="space-y-6">
        {papers.map((paper, idx) => {
          const weekColor = WEEK_COLORS[paper.week] || "#E8571A";
          return (
            <Link key={paper.id} href={`/papers/${paper.id}`}
              className="group block rounded-2xl border border-[var(--border)] bg-white overflow-hidden card-hover no-underline">
              <div className="flex items-start gap-6 p-7">
                {/* Number */}
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl text-white font-display font-bold text-xl"
                    style={{ backgroundColor: weekColor }}>
                    {idx + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded font-medium"
                      style={{ backgroundColor: weekColor + "15", color: weekColor }}>
                      Week {paper.week}
                    </span>
                    <span className="text-xs text-[var(--ink-3)]">{paper.venue} {paper.year}</span>
                  </div>

                  <h2 className="font-display font-bold text-lg text-[var(--ink)] mb-1 group-hover:text-[var(--ember)] transition-colors">
                    {paper.emoji} {paper.title}
                  </h2>
                  <p className="text-xs text-[var(--ink-3)] mb-3">{paper.authors}</p>
                  <p className="text-sm text-[var(--ink-2)] leading-relaxed mb-4">{paper.tagline}</p>

                  {/* Key insight */}
                  <div className="rounded-lg bg-cream-100 border border-[var(--border)] px-4 py-3 text-xs text-[var(--ink-2)] leading-relaxed">
                    <strong className="text-[var(--ink)]">Key insight: </strong>{paper.keyInsight.slice(0, 160)}...
                  </div>
                </div>

                {/* Modules count + arrow */}
                <div className="flex-shrink-0 flex flex-col items-end gap-3">
                  <span className="text-xs text-[var(--ink-3)]">{paper.modules.length} modules</span>
                  <span className="text-[var(--ink-3)] group-hover:text-[var(--ember)] transition-colors text-lg">→</span>
                </div>
              </div>

              {/* Modules strip */}
              <div className="px-7 pb-5 flex flex-wrap gap-2">
                {paper.modules.map((mod, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--ink-2)] bg-cream-50">
                    {mod.tensortonic ? "⌨️ " : ""}{mod.title}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="mt-16 rounded-xl border border-[var(--border)] bg-white p-7">
        <h2 className="font-display font-bold text-base mb-5">Implementation timeline</h2>
        <div className="space-y-4">
          {[
            { week: 2, day: "Mon–Tue", paper: "Attention Is All You Need", note: "Full 7-module TensorTonic track" },
            { week: 2, day: "Thu", paper: "Sentence-BERT", note: "Siamese network + triplet loss from scratch" },
            { week: 3, day: "Mon–Tue", paper: "SimCSE", note: "NT-Xent loss + fine-tuning XLM-R" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 text-sm">
              <div className="w-14 flex-shrink-0">
                <span className="text-xs font-mono font-medium px-1.5 py-0.5 rounded text-white"
                  style={{ backgroundColor: WEEK_COLORS[item.week] || "#E8571A" }}>
                  W{item.week}
                </span>
              </div>
              <span className="w-16 flex-shrink-0 text-xs text-[var(--ink-3)] font-mono">{item.day}</span>
              <span className="font-medium text-[var(--ink)]">{item.paper}</span>
              <span className="text-xs text-[var(--ink-3)] hidden md:block">— {item.note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
