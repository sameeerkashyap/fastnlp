import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capstone Project — FastNLP",
  description:
    "Build a multilingual semantic normalization engine with XLM-R, contrastive learning, and FAISS vector search.",
};

const STACK = [
  { name: "PyTorch", role: "Deep learning framework", emoji: "🔥" },
  { name: "sentence-transformers", role: "SBERT + fine-tuning library", emoji: "🤗" },
  { name: "XLM-RoBERTa", role: "Multilingual encoder backbone", emoji: "🌍" },
  { name: "FAISS", role: "Billion-scale vector search", emoji: "🔍" },
  { name: "Gradio", role: "Interactive demo UI", emoji: "🖥️" },
  { name: "Weights & Biases", role: "Experiment tracking", emoji: "📊" },
  { name: "HuggingFace Spaces", role: "Deployment", emoji: "🚀" },
];

const MILESTONES = [
  {
    week: 1,
    color: "#E8571A",
    title: "TF-IDF baseline live",
    description:
      "50 canonical titles × 20 variants generated. Baseline accuracy measured. README seeded with 'Before: X%'.",
  },
  {
    week: 2,
    color: "#0891B2",
    title: "SBERT baseline replaces TF-IDF",
    description:
      "Off-the-shelf multilingual SBERT scores ~80%. Zero-shot French/German transfer demonstrated.",
  },
  {
    week: 3,
    color: "#7C3AED",
    title: "Fine-tuned XLM-R hits 90%+",
    description:
      "SimCSE-style contrastive fine-tuning. FAISS search index built. UMAP before/after visualized. W&B run public.",
  },
  {
    week: 4,
    color: "#059669",
    title: "Live demo shipped",
    description:
      "Gradio app deployed on HuggingFace Spaces. Model card written. Public GitHub repo with reproducible training script.",
  },
];

const EVALUATION_TABLE = [
  {
    model: "TF-IDF + Cosine Similarity",
    acc1: "~52%",
    mrr: "~0.61",
    multilingual: "❌",
    note: "Your Week 1 baseline",
  },
  {
    model: "SBERT (all-MiniLM-L6-v2)",
    acc1: "~78%",
    mrr: "~0.85",
    multilingual: "❌",
    note: "Off-the-shelf English",
  },
  {
    model: "Multilingual MiniLM",
    acc1: "~74%",
    mrr: "~0.82",
    multilingual: "~70%",
    note: "Zero-shot cross-lingual",
  },
  {
    model: "Fine-tuned XLM-R (yours)",
    acc1: "~91%",
    mrr: "~0.95",
    multilingual: "~87%",
    note: "Your final model 🎯",
  },
];

const PROBLEM_EXAMPLES = [
  {
    raw: "Head of Rev Dept",
    canonical: "Revenue Operations Manager",
    why: "Extreme abbreviation — no standard form",
  },
  {
    raw: "Responsable Ventes",
    canonical: "Sales Manager",
    why: "French language, zero training data",
  },
  {
    raw: "Vertriebsleiter",
    canonical: "Sales Director",
    why: "German compound noun, different seniority signal",
  },
  {
    raw: "IC5 – SWE",
    canonical: "Senior Software Engineer",
    why: "Internal level code, company-specific jargon",
  },
  {
    raw: "MERN Stack Dev",
    canonical: "Full Stack Engineer",
    why: "Technology stack used instead of role name",
  },
  {
    raw: "Growth & Demand Gen",
    canonical: "Growth Marketing Manager",
    why: "Compound role, slash-separated functions",
  },
];

// Architecture steps with correct concept slugs
const ARCH_STEPS = [
  {
    step: "Input",
    content: "Raw free-text label (any language, any format)",
    color: "#E8571A",
    concept: null,
    conceptLabel: null,
  },
  {
    step: "Tokenize",
    content:
      "XLM-R uses SentencePiece BPE over a 250k token vocabulary covering 100 languages. Every input — regardless of language — maps to the same token space.",
    color: "#0891B2",
    concept: "tokenization",
    conceptLabel: "Tokenization →",
  },
  {
    step: "Encode",
    content:
      "12 stacked Transformer encoder layers with multi-head self-attention. Each token attends to every other token, building up a rich contextual representation.",
    color: "#7C3AED",
    concept: "self-attention",
    conceptLabel: "Self-Attention →",
  },
  {
    step: "Pool",
    content:
      "Mean-pool all token hidden states into a single 768-dim sentence vector. This is the sentence embedding that captures the full meaning of the input.",
    color: "#7C3AED",
    concept: "sentence-embeddings",
    conceptLabel: "Sentence Embeddings →",
  },
  {
    step: "Index",
    content:
      "All canonical form embeddings are pre-computed and stored in a FAISS flat index. At query time, FAISS finds the nearest neighbor in <1ms using dot-product similarity.",
    color: "#059669",
    concept: "faiss",
    conceptLabel: "FAISS →",
  },
  {
    step: "Output",
    content:
      "Top-k canonical matches ranked by cosine similarity, with scores. The closest vector wins.",
    color: "#059669",
    concept: "cosine-similarity",
    conceptLabel: "Cosine Similarity →",
  },
];

// Core concept cards with correct slugs
const CORE_CONCEPTS = [
  { label: "TF-IDF", slug: "tf-idf", week: 1 },
  { label: "Word2Vec / Embeddings", slug: "word2vec", week: 1 },
  { label: "Transformer Motivation", slug: "transformer-motivation", week: 1 },
  { label: "Self-Attention", slug: "self-attention", week: 2 },
  { label: "Multi-Head Attention", slug: "multi-head-attention", week: 2 },
  { label: "Tokenization (BPE)", slug: "tokenization", week: 2 },
  { label: "BERT", slug: "bert", week: 2 },
  { label: "Sentence Embeddings", slug: "sentence-embeddings", week: 2 },
  { label: "Sentence-BERT", slug: "sentence-bert", week: 2 },
  { label: "XLM-RoBERTa", slug: "xlm-r", week: 2 },
  { label: "Contrastive Learning", slug: "contrastive-learning", week: 3 },
  { label: "SimCSE", slug: "simcse", week: 3 },
  { label: "Fine-tuning", slug: "fine-tuning", week: 3 },
  { label: "In-Batch Negatives", slug: "in-batch-negatives", week: 3 },
  { label: "FAISS & Vector Search", slug: "faiss", week: 3 },
  { label: "Dense Retrieval", slug: "dense-retrieval", week: 3 },
];

const WEEK_COLORS: Record<number, string> = {
  1: "#E8571A",
  2: "#0891B2",
  3: "#7C3AED",
  4: "#059669",
};

export default function ProjectPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-mono font-medium text-[var(--ember)] uppercase tracking-widest mb-3">
          Capstone Project
        </p>
        <h1 className="font-display text-4xl font-bold text-[var(--ink)] mb-4">
          Multilingual Semantic Normalization Engine
        </h1>
        <p className="text-lg text-[var(--ink-2)] max-w-2xl leading-relaxed">
          Map noisy, free-text labels to canonical forms across languages — using a fine-tuned
          XLM-R encoder, contrastive learning, and FAISS vector search. You build this
          incrementally across all 4 weeks.
        </p>
      </div>

      {/* Problem statement */}
      <section className="mb-12">
        <h2 className="font-display font-bold text-xl mb-2 text-[var(--ink)]">The problem</h2>
        <p className="text-[var(--ink-2)] mb-5 leading-relaxed">
          In any large-scale system where humans enter free-text labels — professional profiles,
          product catalogs, medical records, support tickets — the same underlying concept gets
          written hundreds of different ways. Normalization is the task of{" "}
          <strong>mapping surface variation back to a single canonical representation</strong>.
        </p>

        {/* Why lexical search fails */}
        <div className="rounded-xl bg-[var(--ink)] text-cream-100 p-7 mb-6">
          <p className="text-sm font-mono text-[var(--ember)] mb-3 uppercase tracking-widest">
            Why lexical search fails
          </p>
          <p className="text-sm leading-relaxed mb-4">
            A bag-of-words system like{" "}
            <Link
              href="/concepts/tf-idf"
              className="text-[var(--ember)] hover:underline no-underline"
            >
              TF-IDF
            </Link>{" "}
            can only match strings that share tokens. All of the examples below describe the{" "}
            <em>same role</em> — but a keyword search for "Revenue Operations Manager" returns
            zero results for most of them:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
              <div
                key={title}
                className="rounded-lg bg-white/10 px-3 py-2 text-xs font-mono text-cream-200"
              >
                {title}
              </div>
            ))}
          </div>
          <p className="text-sm text-cream-300 mt-4">
            At scale this isn't a curiosity — it directly breaks search, deduplication, analytics,
            and any downstream ML that relies on clean labels.
          </p>
        </div>

        {/* Examples table */}
        <h3 className="font-display font-semibold text-base mb-3 text-[var(--ink)]">
          Representative examples across domains
        </h3>
        <div className="rounded-xl border border-[var(--border)] bg-white overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-cream-50">
                  <th className="text-left px-5 py-3 font-display font-semibold text-xs text-[var(--ink)]">
                    Raw input
                  </th>
                  <th className="text-left px-5 py-3 font-display font-semibold text-xs text-[var(--ink)]">
                    Canonical form
                  </th>
                  <th className="text-left px-5 py-3 font-display font-semibold text-xs text-[var(--ink)]">
                    Why it's hard
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {PROBLEM_EXAMPLES.map((ex) => (
                  <tr key={ex.raw}>
                    <td className="px-5 py-3 font-mono text-xs text-[var(--ember)]">{ex.raw}</td>
                    <td className="px-5 py-3 text-xs text-[var(--ink-2)]">{ex.canonical}</td>
                    <td className="px-5 py-3 text-xs text-[var(--ink-3)]">{ex.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Why this is an NLP problem */}
        <div className="rounded-xl border border-[var(--border)] bg-white p-6">
          <p className="text-sm font-semibold text-[var(--ink)] mb-3">
            Why this is a core NLP problem
          </p>
          <ul className="space-y-2.5 text-sm text-[var(--ink-2)] leading-relaxed">
            <li>
              <strong>Lexical gap:</strong> synonyms, abbreviations, and translations share no
              surface tokens — you need{" "}
              <Link
                href="/concepts/sentence-embeddings"
                className="text-[var(--ember)] no-underline hover:underline"
              >
                semantic embeddings
              </Link>{" "}
              to bridge them.
            </li>
            <li>
              <strong>Multilingual transfer:</strong> annotating every language is infeasible; a
              good multilingual encoder (
              <Link
                href="/concepts/xlm-r"
                className="text-[var(--ember)] no-underline hover:underline"
              >
                XLM-R
              </Link>
              ) must generalize <em>zero-shot</em> to unseen languages.
            </li>
            <li>
              <strong>Few-shot supervision:</strong> you only have ~1,000 labeled pairs — so you
              need{" "}
              <Link
                href="/concepts/contrastive-learning"
                className="text-[var(--ember)] no-underline hover:underline"
              >
                contrastive fine-tuning
              </Link>{" "}
              to learn an efficient metric space, not a 500-class classifier.
            </li>
            <li>
              <strong>Retrieval at inference:</strong> the canonical set can grow — you need a
              vector index (
              <Link
                href="/concepts/faiss"
                className="text-[var(--ember)] no-underline hover:underline"
              >
                FAISS
              </Link>
              ) that answers nearest-neighbor queries in milliseconds without retraining.
            </li>
          </ul>
        </div>
      </section>

      {/* Architecture — explainer */}
      <section className="mb-12">
        <h2 className="font-display font-bold text-xl mb-2 text-[var(--ink)]">Architecture</h2>
        <p className="text-[var(--ink-2)] mb-6 leading-relaxed">
          The system is a{" "}
          <Link
            href="/concepts/sentence-bert"
            className="text-[var(--ember)] no-underline hover:underline"
          >
            bi-encoder retrieval pipeline
          </Link>
          . The same encoder is used to embed both the query and every canonical label offline.
          At inference time, a{" "}
          <Link
            href="/concepts/faiss"
            className="text-[var(--ember)] no-underline hover:underline"
          >
            FAISS index
          </Link>{" "}
          finds the nearest canonical vector — no classifier retraining needed when you add new
          classes.
        </p>

        {/* Architecture cards */}
        <div className="rounded-xl border border-[var(--border)] bg-white p-6 mb-6">
          <div className="flex flex-col gap-3">
            {ARCH_STEPS.map((row, i, arr) => (
              <div key={row.step} className="flex items-stretch gap-3">
                {/* connector column */}
                <div className="flex flex-col items-center">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: row.color }}
                  >
                    {i + 1}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-px flex-1 min-h-3 bg-[var(--border)] my-1" />
                  )}
                </div>
                {/* card */}
                <div className="flex-1 rounded-lg border border-[var(--border)] px-4 py-3 flex items-start justify-between gap-4 mb-1">
                  <div>
                    <span className="text-xs font-mono font-semibold text-[var(--ink-3)] uppercase tracking-wide">
                      {row.step}
                    </span>
                    <p className="text-sm text-[var(--ink-2)] mt-1 leading-relaxed">
                      {row.content}
                    </p>
                  </div>
                  {row.concept && (
                    <Link
                      href={`/concepts/${row.concept}`}
                      className="flex-shrink-0 text-xs font-medium text-[var(--ember)] no-underline hover:underline whitespace-nowrap pt-0.5"
                    >
                      {row.conceptLabel}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training vs Inference distinction */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[var(--border)] bg-white p-5">
            <p className="text-xs font-mono font-semibold text-[#7C3AED] uppercase tracking-wide mb-2">
              Training (offline)
            </p>
            <ul className="space-y-1.5 text-sm text-[var(--ink-2)] leading-relaxed">
              <li>
                Sample{" "}
                <Link
                  href="/concepts/in-batch-negatives"
                  className="text-[var(--ember)] no-underline hover:underline"
                >
                  in-batch negatives
                </Link>{" "}
                from the label set
              </li>
              <li>
                Compute{" "}
                <Link
                  href="/concepts/simcse"
                  className="text-[var(--ember)] no-underline hover:underline"
                >
                  SimCSE-style contrastive loss
                </Link>
              </li>
              <li>Pull matching pairs together, push non-matches apart</li>
              <li>Fine-tune XLM-R encoder weights end-to-end</li>
              <li>Re-embed all canonicals → rebuild FAISS index</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-white p-5">
            <p className="text-xs font-mono font-semibold text-[#059669] uppercase tracking-wide mb-2">
              Inference (online, &lt;5ms)
            </p>
            <ul className="space-y-1.5 text-sm text-[var(--ink-2)] leading-relaxed">
              <li>Tokenize raw input with SentencePiece</li>
              <li>Forward pass through fine-tuned XLM-R</li>
              <li>Mean-pool token embeddings → sentence vector</li>
              <li>
                FAISS{" "}
                <Link
                  href="/concepts/ann-search"
                  className="text-[var(--ember)] no-underline hover:underline"
                >
                  approximate nearest-neighbor
                </Link>{" "}
                lookup
              </li>
              <li>Return top-k canonical matches + scores</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core concepts you'll apply */}
      <section className="mb-10">
        <h2 className="font-display font-bold text-xl mb-2 text-[var(--ink)]">
          Building blocks — concepts you'll apply
        </h2>
        <p className="text-[var(--ink-2)] mb-5 leading-relaxed">
          Every piece of the system maps to a concept in the curriculum. Use these as your
          reference guides as you build each week.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CORE_CONCEPTS.map((c) => (
            <Link
              key={c.slug}
              href={`/concepts/${c.slug}`}
              className="flex flex-col gap-1.5 rounded-lg border border-[var(--border)] bg-white px-3 py-3 no-underline hover:border-[var(--ember)] transition-colors group"
            >
              <span
                className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded self-start"
                style={{
                  backgroundColor: WEEK_COLORS[c.week] + "20",
                  color: WEEK_COLORS[c.week],
                }}
              >
                Week {c.week}
              </span>
              <span className="text-xs font-medium text-[var(--ink)] group-hover:text-[var(--ember)] transition-colors leading-snug">
                {c.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section className="mb-10">
        <h2 className="font-display font-bold text-xl mb-4 text-[var(--ink)]">Tech stack</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {STACK.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-white px-4 py-3"
            >
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
          Use an LLM (Claude Haiku or GPT-4o mini) to generate 1,000 labeled training pairs for
          ~$2. This is the{" "}
          <Link
            href="/concepts/llm-as-labeler"
            className="text-[var(--ember)] no-underline hover:underline"
          >
            LLM-as-labeler
          </Link>{" "}
          pattern — bootstrap a contrastive training set without any manual annotation.
        </p>
        <pre><code>{`# Generate 20 noisy variants per canonical label
prompt = """
Given the canonical form '{label}', generate 20 real-world
noisy variants as a human might type them.

Include:
- Abbreviations (VP, Dir, Mgr, Sr.)
- Alternative naming conventions
- French translations (5 variants)
- German translations (3 variants)
- Common typos or informal shorthand

Return ONLY a JSON array: [{"raw": "...", "lang": "en"}]
"""

# 50 canonical labels × 20 variants = 1,000 training pairs
# Cost with claude-3-haiku: ~$1–2 total`}</code></pre>
      </section>

      {/* Milestones */}
      <section className="mb-10">
        <h2 className="font-display font-bold text-xl mb-4 text-[var(--ink)]">
          Weekly milestones
        </h2>
        <div className="space-y-3">
          {MILESTONES.map((m) => (
            <div
              key={m.week}
              className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-white p-5"
            >
              <div
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-white font-display font-bold text-sm"
                style={{ backgroundColor: m.color }}
              >
                {m.week}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-[var(--ink)] mb-1">{m.title}</p>
                <p className="text-xs text-[var(--ink-2)] leading-relaxed">{m.description}</p>
              </div>
              <Link
                href={`/week/${m.week}`}
                className="flex-shrink-0 text-xs no-underline hover:underline"
                style={{ color: m.color }}
              >
                W{m.week} plan →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Results table */}
      <section className="mb-10">
        <h2 className="font-display font-bold text-xl mb-4 text-[var(--ink)]">
          Expected results
        </h2>
        <div className="rounded-xl border border-[var(--border)] bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-cream-50">
                  <th className="text-left px-5 py-3 font-display font-semibold text-xs text-[var(--ink)]">
                    Model
                  </th>
                  <th className="text-center px-4 py-3 font-display font-semibold text-xs text-[var(--ink)]">
                    Acc@1
                  </th>
                  <th className="text-center px-4 py-3 font-display font-semibold text-xs text-[var(--ink)]">
                    MRR
                  </th>
                  <th className="text-center px-4 py-3 font-display font-semibold text-xs text-[var(--ink)]">
                    Multilingual
                  </th>
                  <th className="text-left px-4 py-3 font-display font-semibold text-xs text-[var(--ink)]">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {EVALUATION_TABLE.map((row, i) => (
                  <tr
                    key={i}
                    className={i === EVALUATION_TABLE.length - 1 ? "bg-emerald-50" : ""}
                  >
                    <td className="px-5 py-3 text-xs font-medium text-[var(--ink)]">
                      {row.model}
                    </td>
                    <td className="px-4 py-3 text-xs text-center text-[var(--ink-2)]">
                      {row.acc1}
                    </td>
                    <td className="px-4 py-3 text-xs text-center text-[var(--ink-2)]">
                      {row.mrr}
                    </td>
                    <td className="px-4 py-3 text-xs text-center text-[var(--ink-2)]">
                      {row.multilingual}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--ink-3)]">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Start CTA */}
      <div className="rounded-2xl border border-[var(--border)] bg-white p-8 text-center">
        <h2 className="font-display font-bold text-xl mb-3">Ready to build?</h2>
        <p className="text-sm text-[var(--ink-2)] mb-6">
          Start with Week 1 — you'll have a working TF-IDF baseline by Thursday and understand
          exactly what you need to improve next.
        </p>
        <Link
          href="/week/1"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--ember)] text-white font-medium rounded-lg hover:bg-ember-600 transition-colors no-underline text-sm"
        >
          Start Week 1 →
        </Link>
      </div>
    </div>
  );
}
