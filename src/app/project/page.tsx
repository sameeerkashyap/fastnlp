import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capstone Project",
  description: "Build a multilingual job title intelligence engine with XLM-R, contrastive learning, and FAISS semantic search.",
};

const STACK = [
  { name: "PyTorch", role: "Deep learning framework", emoji: "🔥" },
  { name: "sentence-transformers", role: "SBERT + fine-tuning library", emoji: "🤗" },
  { name: "XLM-RoBERTa", role: "Multilingual encoder backbone", emoji: "🌍" },
  { name: "FAISS", role: "Billion-scale vector search", emoji: "🔍" },
  { name: "Gradio", role: "Demo UI", emoji: "🖥️" },
  { name: "Weights & Biases", role: "Experiment tracking", emoji: "📊" },
  { name: "HuggingFace Spaces", role: "Deployment", emoji: "🚀" },
];

const MILESTONES = [
  { week: 1, color: "#E8571A", title: "TF-IDF baseline live", description: "50 canonical titles × 20 variants generated. Baseline accuracy measured. README seeded with 'Before: X%'." },
  { week: 2, color: "#0891B2", title: "SBERT baseline replaces TF-IDF", description: "Off-the-shelf multilingual SBERT scores ~80%. Zero-shot French/German transfer demonstrated." },
  { week: 3, color: "#7C3AED", title: "Fine-tuned XLM-R hits 90%+", description: "SimCSE-style contrastive fine-tuning. FAISS search index built. UMAP before/after visualized. W&B run public." },
  { week: 4, color: "#059669", title: "Live demo shipped", description: "Gradio app deployed on HuggingFace Spaces. 90-second Loom recorded. Cold DM sent." },
];

const EVALUATION_TABLE = [
  { model: "TF-IDF + Cosine Similarity", acc1: "~52%", mrr: "~0.61", multilingual: "❌", note: "Your Week 1 baseline" },
  { model: "SBERT (all-MiniLM-L6-v2)", acc1: "~78%", mrr: "~0.85", multilingual: "❌", note: "Off-the-shelf English" },
  { model: "Multilingual MiniLM", acc1: "~74%", mrr: "~0.82", multilingual: "~70%", note: "Zero-shot cross-lingual" },
  { model: "Fine-tuned XLM-R (yours)", acc1: "~91%", mrr: "~0.95", multilingual: "~87%", note: "Your final model 🎯" },
];

const LOOM_SCRIPT = [
  { time: "0:00–0:10", text: "\"Crustdata's ML intern JD mentions job title normalization across languages as a core problem. I built a mini version of that.\"" },
  { time: "0:10–0:30", text: "Show Tab 1: type 'Head of Rev Dept' → canonical output. Then type 'Responsable Ventes' (French) → correctly maps to Sales Manager. Zero training on French." },
  { time: "0:30–0:55", text: "Show Tab 2: type 'RevOps professionals' → top matching titles. 'This is the semantic search problem from your JD — finding everyone titled differently but doing the same role.'" },
  { time: "0:55–1:10", text: "Show Tab 3: comparison table. 'Fine-tuned XLM-R hits 91% vs 52% for TF-IDF. SimCSE-style contrastive fine-tuning. Training data generated with Claude for ~$2.'" },
  { time: "1:10–1:30", text: "\"Repo, W&B training run, and model on HuggingFace are all in the description. Would love to talk.\"" },
];

export default function ProjectPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-mono font-medium text-[var(--ember)] uppercase tracking-widest mb-3">Capstone Project</p>
        <h1 className="font-display text-4xl font-bold text-[var(--ink)] mb-4">
          Job Title Intelligence Engine
        </h1>
        <p className="text-lg text-[var(--ink-2)] max-w-2xl leading-relaxed">
          Map noisy, multilingual job titles to canonical forms using a fine-tuned XLM-R encoder 
          with contrastive learning and FAISS semantic search. Built across 4 weeks as you learn.
        </p>
      </div>

      {/* Problem statement */}
      <section className="mb-10">
        <h2 className="font-display font-bold text-xl mb-4 text-[var(--ink)]">The problem</h2>
        <div className="rounded-xl bg-[var(--ink)] text-cream-100 p-7">
          <p className="text-sm leading-relaxed mb-4">
            A people intelligence company has 500 million professional profiles. Each person entered 
            their own job title. The result:
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              "Revenue Operations Manager",
              "Head of Rev Dept",
              "RevOps Lead",
              "VP Revenue Ops",
              "Responsable Ventes (French)",
              "Vertriebsleiter (German)",
              "Director of Revenue Operations",
              "Revenue Ops & Strategy",
            ].map((title) => (
              <div key={title} className="rounded-lg bg-white/10 px-3 py-2 text-xs font-mono text-cream-200">
                {title}
              </div>
            ))}
          </div>
          <p className="text-sm text-cream-200">
            All of these mean the same thing. A TF-IDF search for "Revenue Operations Manager" misses half of them. 
            Your job: train a model that maps all of them to the same canonical representation.
          </p>
        </div>
      </section>

      {/* Architecture */}
      <section className="mb-10">
        <h2 className="font-display font-bold text-xl mb-4 text-[var(--ink)]">Architecture</h2>
        <div className="rounded-xl border border-[var(--border)] bg-white p-6">
          <div className="flex flex-col gap-3">
            {[
              { step: "Input", content: "Raw job title (any language)", color: "#E8571A" },
              { step: "Tokenize", content: "XLM-R SentencePiece BPE — 250k vocab, 100 languages", color: "#0891B2" },
              { step: "Encode", content: "12-layer XLM-R encoder → 768-dim contextual embedding", color: "#7C3AED" },
              { step: "Pool", content: "Mean pooling over token embeddings → 768-dim sentence vector", color: "#7C3AED" },
              { step: "Search", content: "FAISS IndexFlatIP — cosine similarity over canonical title index", color: "#059669" },
              { step: "Output", content: "Canonical title + seniority + function + top-k similar titles", color: "#059669" },
            ].map((row, i, arr) => (
              <div key={row.step} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: row.color }}>
                    {i + 1}
                  </div>
                  {i < arr.length - 1 && <div className="w-px h-3 bg-[var(--border)]" />}
                </div>
                <div className="flex-1 rounded-lg border border-[var(--border)] px-4 py-2.5">
                  <span className="text-xs font-mono font-medium text-[var(--ink-3)]">{row.step}</span>
                  <p className="text-sm text-[var(--ink-2)] mt-0.5">{row.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="mb-10">
        <h2 className="font-display font-bold text-xl mb-4 text-[var(--ink)]">Tech stack</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {STACK.map((tech) => (
            <div key={tech.name} className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-white px-4 py-3">
              <span className="text-xl">{tech.emoji}</span>
              <div>
                <p className="text-sm font-medium text-[var(--ink)]">{tech.name}</p>
                <p className="text-xs text-[var(--ink-3)]">{tech.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Data generation */}
      <section className="mb-10">
        <h2 className="font-display font-bold text-xl mb-4 text-[var(--ink)]">Data generation</h2>
        <p className="text-[var(--ink-2)] mb-4 leading-relaxed">
          Use Claude or GPT-4o mini to generate 1,000 labeled training examples for ~$2. 
          The LLM-as-labeler approach is a startup-critical skill — you're not buying a dataset, 
          you're bootstrapping one.
        </p>
        <pre><code>{`# Generate 20 noisy variants per canonical title
prompt = """
Given the canonical job title '{title}', generate 20 real-world 
messy variants as they appear on LinkedIn profiles.

Include:
- Abbreviations (VP, Dir, Mgr, Sr.)
- Alternative naming conventions  
- French translations (5 variants)
- German translations (3 variants)

Return ONLY a JSON array: [{"raw_title": "...", "language": "en"}]
"""

# 50 canonical titles × 20 variants = 1,000 examples
# Cost with claude-3-haiku: ~$1–2 total`}</code></pre>
      </section>

      {/* Milestones */}
      <section className="mb-10">
        <h2 className="font-display font-bold text-xl mb-4 text-[var(--ink)]">Weekly milestones</h2>
        <div className="space-y-3">
          {MILESTONES.map((m) => (
            <div key={m.week} className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-white p-5">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-white font-display font-bold text-sm"
                style={{ backgroundColor: m.color }}>
                {m.week}
              </div>
              <div>
                <p className="font-semibold text-sm text-[var(--ink)] mb-1">{m.title}</p>
                <p className="text-xs text-[var(--ink-2)] leading-relaxed">{m.description}</p>
              </div>
              <Link href={`/week/${m.week}`}
                className="flex-shrink-0 text-xs no-underline hover:underline"
                style={{ color: m.color }}>
                W{m.week} plan →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Results table */}
      <section className="mb-10">
        <h2 className="font-display font-bold text-xl mb-4 text-[var(--ink)]">Expected results</h2>
        <div className="rounded-xl border border-[var(--border)] bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-cream-50">
                  <th className="text-left px-5 py-3 font-display font-semibold text-xs text-[var(--ink)]">Model</th>
                  <th className="text-center px-4 py-3 font-display font-semibold text-xs text-[var(--ink)]">Acc@1</th>
                  <th className="text-center px-4 py-3 font-display font-semibold text-xs text-[var(--ink)]">MRR</th>
                  <th className="text-center px-4 py-3 font-display font-semibold text-xs text-[var(--ink)]">Multilingual</th>
                  <th className="text-left px-4 py-3 font-display font-semibold text-xs text-[var(--ink)]">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {EVALUATION_TABLE.map((row, i) => (
                  <tr key={i} className={i === EVALUATION_TABLE.length - 1 ? "bg-emerald-50" : ""}>
                    <td className="px-5 py-3 text-xs font-medium text-[var(--ink)]">{row.model}</td>
                    <td className="px-4 py-3 text-xs text-center text-[var(--ink-2)]">{row.acc1}</td>
                    <td className="px-4 py-3 text-xs text-center text-[var(--ink-2)]">{row.mrr}</td>
                    <td className="px-4 py-3 text-xs text-center text-[var(--ink-2)]">{row.multilingual}</td>
                    <td className="px-4 py-3 text-xs text-[var(--ink-3)]">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Loom script */}
      <section className="mb-10">
        <h2 className="font-display font-bold text-xl mb-2 text-[var(--ink)]">90-second Loom script</h2>
        <p className="text-sm text-[var(--ink-3)] mb-4">Write this out before hitting record. One take is fine — authentic beats polished.</p>
        <div className="space-y-3">
          {LOOM_SCRIPT.map((line, i) => (
            <div key={i} className="flex items-start gap-4 rounded-lg border border-[var(--border)] bg-white px-5 py-4">
              <span className="flex-shrink-0 w-20 font-mono text-xs text-[var(--ember)] pt-0.5">{line.time}</span>
              <p className="text-sm text-[var(--ink-2)] leading-relaxed">{line.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cold DM template */}
      <section className="mb-10">
        <h2 className="font-display font-bold text-xl mb-4 text-[var(--ink)]">Cold DM template</h2>
        <div className="rounded-xl bg-[var(--ink)] text-cream-100 p-6 font-mono text-sm leading-relaxed">
          <p className="text-cream-300 text-xs mb-3">// Under 150 words. Send to @thechowdhary and @ManmohitG on X.</p>
          <p>Hey [name] — built a mini version of the entity resolution problem from your ML intern JD.</p>
          <p className="mt-3">Fine-tuned XLM-R with SimCSE-style contrastive learning to map noisy job titles → canonical form across 100 languages. Hit 91% accuracy vs 52% TF-IDF baseline.</p>
          <p className="mt-3">Demo: [HF Spaces URL]<br />W&B run: [link]<br />Repo: [GitHub URL]<br />90s Loom: [Loom URL]</p>
          <p className="mt-3">Training data was LLM-generated (~$2). Happy to walk through the architecture.</p>
        </div>
      </section>

      {/* Start CTA */}
      <div className="rounded-2xl border border-[var(--border)] bg-white p-8 text-center">
        <h2 className="font-display font-bold text-xl mb-3">Ready to build?</h2>
        <p className="text-sm text-[var(--ink-2)] mb-6">Start with Week 1 — Monday. You'll have a baseline by Thursday.</p>
        <Link href="/week/1"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--ember)] text-white font-medium rounded-lg hover:bg-ember-600 transition-colors no-underline text-sm">
          Start Week 1 →
        </Link>
      </div>
    </div>
  );
}
