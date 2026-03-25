export type TaskType = "tensortonic" | "project" | "paper" | "study" | "ship" | "buffer";

export interface Task {
  category: string;
  items: string[];
}

export interface Day {
  day: string;
  slug: string;
  title: string;
  type: TaskType[];
  summary: string;
  tasks: Task[];
  insight?: string;
  concepts: string[];
}

export interface Week {
  week: number;
  title: string;
  subtitle: string;
  focus: string;
  tensortonic: string;
  milestone: string;
  accent: string;
  accentLight: string;
  days: Day[];
}

export const curriculum: Week[] = [
  {
    week: 1,
    title: "NLP Foundations",
    subtitle: "From raw text to numbers",
    focus: "How text becomes math — n-grams, TF-IDF, and the building blocks every model is built on.",
    tensortonic: "8–10 problems (n-grams, TF-IDF, softmax, cross-entropy, gradient descent, neural nets, RNN)",
    milestone: "TF-IDF baseline pipeline live with measured accuracy",
    accent: "#E8571A",
    accentLight: "#FFF4EE",
    days: [
      {
        day: "Monday",
        slug: "w1-mon",
        title: "Text representation from scratch",
        type: ["tensortonic"],
        summary: "Understand how raw text becomes vectors. Implement n-grams, TF-IDF, and cosine similarity from scratch — these are the primitives every NLP system is built on.",
        tasks: [
          {
            category: "TensorTonic (2 hrs)",
            items: [
              "Implement unigram / bigram / n-gram frequency counters from scratch — understand how raw text becomes numbers",
              "Implement TF-IDF vectorizer from scratch — understand why rare words matter more than common ones (term frequency × inverse document frequency)",
              "Implement cosine similarity — this is how every NLP similarity score works at its core: cos(θ) = (A·B) / (|A| × |B|)",
            ],
          },
          {
            category: "Project (1 hr)",
            items: [
              "Create repo: job-title-intelligence. Set up /data, /models, /notebooks folders",
              "Write 20 job titles by hand — 5 canonical titles, 4 raw variants each. This is your first dataset seed.",
            ],
          },
        ],
        insight:
          "TF-IDF + cosine is your 'dumb baseline.' You'll use the same cosine similarity later with learned embeddings — understanding it here makes the improvement measurable and explainable.",
        concepts: ["n-grams", "tf-idf", "cosine-similarity"],
      },
      {
        day: "Tuesday",
        slug: "w1-tue",
        title: "Probability + language model intuition",
        type: ["tensortonic", "study"],
        summary: "Implement the math that makes models learn. Softmax turns raw scores into probabilities. Cross-entropy tells the model how wrong it is. Gradient descent makes it less wrong.",
        tasks: [
          {
            category: "TensorTonic (2 hrs)",
            items: [
              "Implement Softmax from scratch — understand it as a probability distribution over tokens: σ(z)_i = e^z_i / Σ e^z_j",
              "Implement Cross-Entropy Loss — understand why log-probability is the right loss for classification: L = -Σ y_i log(ŷ_i)",
              "Implement Gradient Descent (and Adam if available) — understand how models actually learn via ∂L/∂θ",
            ],
          },
          {
            category: "Study (1 hr)",
            items: [
              "Read: The Illustrated Word2Vec (Jay Alammar blog) — the first real 'learned' text representation. This is what TF-IDF misses: context.",
            ],
          },
        ],
        insight:
          "Cross-entropy is the loss you'll use in Week 3 for the seniority classifier. Understanding the math now means you won't be confused by the PyTorch training loop later.",
        concepts: ["softmax", "cross-entropy", "gradient-descent", "word2vec"],
      },
      {
        day: "Wednesday",
        slug: "w1-wed",
        title: "Build the data generation pipeline",
        type: ["project"],
        summary: "Use an LLM to bootstrap 1,000 labeled training examples for ~$2. This LLM-as-labeler approach is a startup-critical skill — building training data from scratch cheaply.",
        tasks: [
          {
            category: "Project (3 hrs) — heaviest build day of the week",
            items: [
              "Use Claude or GPT-4o mini API to generate noisy job title variants. Prompt: 'Given the canonical job title {title}, generate 20 real-world messy variants including abbreviations, alternative naming, and French/German translations. Return JSON.'",
              "Target: 50 canonical titles × 20 variants = 1,000 training examples. Cost: ~$1–2 total.",
              "Define your taxonomy: 6 seniority levels (Analyst, Associate, Manager, Director, VP, C-Suite) and 8 job functions (Sales, Engineering, Product, Marketing, Finance, HR, Legal, Ops)",
              "Save as data/titles.jsonl with fields: raw_title, canonical, seniority, function",
            ],
          },
        ],
        insight:
          "This is the demo's data foundation. Every future training step depends on this file. The LLM-as-labeler approach is itself a talking point — mention it explicitly in your DM to the founder.",
        concepts: ["llm-as-labeler"],
      },
      {
        day: "Thursday",
        slug: "w1-thu",
        title: "Neural network fundamentals",
        type: ["tensortonic", "project"],
        summary: "Implement a feedforward neural network from scratch. Then build the TF-IDF baseline and measure its accuracy. This is your 'before' number — you'll spend the next 3 weeks beating it.",
        tasks: [
          {
            category: "TensorTonic (2 hrs)",
            items: [
              "Implement a feedforward neural network (MLP) from scratch in NumPy — forward pass, backprop, weight update",
              "Implement Batch Normalization — understand why training is unstable without it",
              "Implement Dropout — understand it as regularization, not just a trick",
            ],
          },
          {
            category: "Project (1 hr)",
            items: [
              "Build the TF-IDF baseline: load titles.jsonl, fit sklearn TF-IDF on all raw titles, find nearest canonical by cosine similarity",
              "Measure accuracy: what % of raw titles map to correct canonical? Expect 40–60% — this is your 'before' number.",
            ],
          },
        ],
        concepts: ["neural-networks", "batch-normalization", "dropout"],
      },
      {
        day: "Friday",
        slug: "w1-fri",
        title: "RNNs and why they fail — motivation for transformers",
        type: ["tensortonic", "study"],
        summary: "Spend one day on RNNs not to use them, but to understand what problem the transformer was invented to solve. The vanishing gradient problem is the 'why' behind attention.",
        tasks: [
          {
            category: "TensorTonic (2 hrs)",
            items: [
              "Implement RNN forward pass from scratch — understand sequential processing and hidden state",
              "Study vanishing gradients — why RNNs fail on long sequences (this is the problem attention solves)",
            ],
          },
          {
            category: "Study (1 hr)",
            items: [
              "Read: The Illustrated Transformer (Jay Alammar). Read slowly, draw the diagram yourself on paper. Don't proceed until you can explain: query, key, value, and why they're different from each other.",
            ],
          },
        ],
        insight:
          "The interview question 'why transformers over RNNs?' has a specific answer: parallelism and direct long-range dependencies. Now you can give it from first principles.",
        concepts: ["rnn", "vanishing-gradients", "transformer-motivation"],
      },
      {
        day: "Saturday",
        slug: "w1-sat",
        title: "Buffer + Week 1 review",
        type: ["buffer"],
        summary: "Finish any TensorTonic problems you didn't complete. Make sure your baseline script runs cleanly and produces an accuracy number. Set up your README.",
        tasks: [
          {
            category: "2–3 hrs",
            items: [
              "Finish any TensorTonic problems you didn't complete during the week",
              "Make sure your baseline script runs cleanly and produces an accuracy number",
              "Write a README.md section: 'Baseline (TF-IDF): X% accuracy' — you'll update this each week",
              "Re-read The Illustrated Transformer if anything is still unclear",
            ],
          },
        ],
        concepts: [],
      },
    ],
  },
  {
    week: 2,
    title: "Attention + Encoders",
    subtitle: "Implement the transformer from scratch",
    focus: "Implement the full transformer architecture via TensorTonic. Understand BERT, SBERT, and XLM-R. Replace your TF-IDF baseline with sentence embeddings.",
    tensortonic: "Full 'Attention Is All You Need' paper implementation track (7 modules)",
    milestone: "Sentence-BERT baseline live — multilingual zero-shot transfer demonstrated",
    accent: "#0891B2",
    accentLight: "#ECFEFF",
    days: [
      {
        day: "Monday",
        slug: "w2-mon",
        title: "Implement scaled dot-product attention",
        type: ["tensortonic", "paper"],
        summary: "The core of everything. Implement tokenization, positional encoding, and scaled dot-product attention via TensorTonic's guided paper track. Paper 1 of 3 begins.",
        tasks: [
          {
            category: "TensorTonic — 'Attention Is All You Need' track (3 hrs)",
            items: [
              "Module 1: Tokenization — implement a simple BPE tokenizer. Understand why subword tokenization beats word-level for multilingual text.",
              "Module 2: Embeddings + Positional Encoding — implement sinusoidal PE. Without this, the model has no sense of word order.",
              "Module 3: Scaled Dot-Product Attention — implement QKV projection, scaling by √d_k, softmax, weighted sum",
            ],
          },
        ],
        insight:
          "Write the formula from memory before looking: Attention(Q,K,V) = softmax(QKᵀ / √d_k) · V. If you can derive this and explain each term, you've passed the attention question.",
        concepts: ["self-attention", "positional-encoding", "tokenization"],
      },
      {
        day: "Tuesday",
        slug: "w2-tue",
        title: "Multi-head attention + full transformer block",
        type: ["tensortonic", "paper"],
        summary: "Complete the full transformer implementation. Understand why multiple attention heads attend to different types of relationships simultaneously.",
        tasks: [
          {
            category: "TensorTonic — continue paper track (3 hrs)",
            items: [
              "Module 4: Multi-Head Attention — implement h parallel attention heads, concatenate, project. Each head attends to different relationship types.",
              "Module 5: Layer Normalization — implement add & norm. Understand why residual connections prevent vanishing gradients.",
              "Module 6: Feed Forward sublayer + Module 7: Output Projection",
            ],
          },
        ],
        insight:
          "The difference between a decoder-only (GPT) and encoder-only (BERT) model is just masking. Decoders mask future positions so the model can't cheat. Encoders see the full sequence bidirectionally — that's why they make better embeddings.",
        concepts: ["multi-head-attention", "layer-normalization", "encoder-decoder"],
      },
      {
        day: "Wednesday",
        slug: "w2-wed",
        title: "BERT internals + the encoder-only insight",
        type: ["study", "project"],
        summary: "Understand what makes BERT different from the original transformer. Then replace your TF-IDF baseline with off-the-shelf SBERT and measure the accuracy jump.",
        tasks: [
          {
            category: "Study + TensorTonic (2 hrs)",
            items: [
              "Read: The Illustrated BERT (Jay Alammar) — understand pre-training tasks (MLM + NSP), [CLS] token as sentence representation, [SEP] tokens",
              "Understand: why does BERT produce better embeddings than Word2Vec? Context. 'Bank' in 'river bank' vs 'bank account' has different BERT embeddings, same Word2Vec embedding.",
            ],
          },
          {
            category: "Project (1 hr)",
            items: [
              "Install sentence-transformers. Load all-MiniLM-L6-v2 (lightweight). Replace TF-IDF with SBERT embeddings.",
              "Re-measure accuracy on your dataset. Expected jump: from ~50% (TF-IDF) to ~75–85% (off-the-shelf SBERT). Record this number.",
            ],
          },
        ],
        concepts: ["bert", "masked-language-modeling", "sentence-embeddings"],
      },
      {
        day: "Thursday",
        slug: "w2-thu",
        title: "Sentence-BERT — bi-encoder vs cross-encoder",
        type: ["paper", "project"],
        summary: "Read and implement Paper 2: Sentence-BERT. The key insight is that vanilla BERT requires O(n²) forward passes to compare n sentences. SBERT's bi-encoder makes it O(n).",
        tasks: [
          {
            category: "Study + implement (3 hrs)",
            items: [
              "Read: Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks (Reimers & Gurevych, 2019) — focus on Section 3 (architecture) and Section 5 (results)",
              "Key insight: vanilla BERT requires O(n²) forward passes to compare n sentences. SBERT's bi-encoder makes it O(n). This is why real search systems use bi-encoders.",
              "Implement from scratch: siamese network — two identical BERT towers sharing weights, mean-pooled output, cosine similarity loss. Use PyTorch + HuggingFace.",
              "Train for a few steps on your title dataset — you're not optimizing accuracy yet, just understanding the training loop.",
            ],
          },
        ],
        insight:
          "You can now say in the interview: 'I implemented the Sentence-BERT siamese architecture from the original paper.' That's a concrete, verifiable claim — not 'I read about it.'",
        concepts: ["sentence-bert", "siamese-network", "bi-encoder"],
      },
      {
        day: "Friday",
        slug: "w2-fri",
        title: "XLM-R + multilingual transfer intuition",
        type: ["study", "project"],
        summary: "Swap to a multilingual model and test zero-shot cross-lingual transfer. Can it map 'Directeur Commercial' (French) to the correct English canonical title with zero French training data?",
        tasks: [
          {
            category: "Study + Project (3 hrs)",
            items: [
              "Read: XLM-R paper abstract + Section 2. Key difference from mBERT: trained on 2.5TB of filtered CommonCrawl across 100 languages with a shared vocabulary.",
              "Swap all-MiniLM-L6-v2 for paraphrase-multilingual-MiniLM-L12-v2. Feed it the French and German variants in your dataset.",
              "Measure: can it map 'Directeur Commercial' (French for Sales Director) to the correct canonical English title? Expect ~70%+ with zero training.",
              "This zero-shot cross-lingual transfer result is a demo-worthy finding — screenshot it for your Loom.",
            ],
          },
        ],
        insight:
          "Zero-shot cross-lingual transfer is the 'nice to have' that very few candidates will actually demonstrate. Showing it working live in your demo is worth more than describing it.",
        concepts: ["xlm-r", "multilingual-nlp", "cross-lingual-transfer"],
      },
      {
        day: "Saturday",
        slug: "w2-sat",
        title: "Buffer — solidify transformer understanding",
        type: ["buffer"],
        summary: "Test yourself on the transformer fundamentals. If you can answer these questions cold, you're ready for the technical deep-dive interview.",
        tasks: [
          {
            category: "2–3 hrs",
            items: [
              "Can you derive the attention formula without looking? Can you explain why √d_k is in the denominator? (Dot products grow with dimension — dividing stabilizes the softmax gradients)",
              "Can you explain the difference between encoder-only (BERT), decoder-only (GPT), and encoder-decoder (T5/BART) — and when you'd use each?",
              "Update README.md: 'Sentence-BERT baseline: X% accuracy | Multilingual (zero-shot): Y%'",
            ],
          },
        ],
        concepts: [],
      },
    ],
  },
  {
    week: 3,
    title: "Fine-tune + Semantic Search",
    subtitle: "Contrastive learning, FAISS, and shipping results",
    focus: "Fine-tune XLM-R with contrastive loss. Add classification heads. Build the FAISS semantic search index. Visualize embeddings. Evaluate rigorously.",
    tensortonic: "Triplet loss, NT-Xent, ANN search, multi-label classification",
    milestone: "Fine-tuned model beating baseline by 15%+, FAISS search live, UMAP visualization done",
    accent: "#7C3AED",
    accentLight: "#F5F3FF",
    days: [
      {
        day: "Monday",
        slug: "w3-mon",
        title: "Contrastive learning theory + triplet loss",
        type: ["tensortonic", "paper"],
        summary: "Paper 3 begins: SimCSE. Implement triplet loss and NT-Xent from scratch. Understand how contrastive learning pulls similar pairs together and pushes dissimilar pairs apart in embedding space.",
        tasks: [
          {
            category: "TensorTonic (2 hrs)",
            items: [
              "Implement Triplet Loss from scratch: L = max(d(anchor, positive) - d(anchor, negative) + margin, 0). Understand the margin hyperparameter.",
              "Implement NT-Xent loss (used in SimCSE) — understand how in-batch negatives work: every other example in the batch is a negative",
            ],
          },
          {
            category: "Study (1 hr)",
            items: [
              "Read SimCSE paper (Gao et al., EMNLP 2021) — Sections 1–3 only. Focus on Figure 1 (the dropout-as-augmentation insight) and Table 1 (the performance jump).",
            ],
          },
        ],
        insight:
          "Contrastive learning is like a magnet in embedding space: it pulls 'RevOps Manager' and 'Revenue Operations Lead' together, and pushes 'RevOps Manager' and 'Software Engineer' apart. That's the entire idea.",
        concepts: ["contrastive-learning", "triplet-loss", "simcse"],
      },
      {
        day: "Tuesday",
        slug: "w3-tue",
        title: "Implement SimCSE-style fine-tuning",
        type: ["project", "paper"],
        summary: "The most important coding day of the project. Fine-tune XLM-R on your job title dataset using contrastive loss. Log everything to Weights & Biases. This is the model that goes in the demo.",
        tasks: [
          {
            category: "Build (3 hrs) — most important coding day",
            items: [
              "Use sentence-transformers with MultipleNegativesRankingLoss — the practical SimCSE implementation. Construct training pairs: (raw_title, canonical_title) as positive pairs.",
              "Load xlm-roberta-base as the base model. Fine-tune for 3–5 epochs. Batch size 32+ (larger batch = more in-batch negatives = better contrastive signal).",
              "Log training loss to Weights & Biases (free tier). You'll share the W&B run link in your demo — it shows you know how to track experiments.",
              "Save checkpoint: models/xlmr-job-titles-v1",
            ],
          },
        ],
        insight:
          "Expected outcome: fine-tuned model hits 88–95% accuracy on your test set vs ~75–85% for off-the-shelf SBERT. Document the delta — that's your headline result.",
        concepts: ["simcse", "fine-tuning", "in-batch-negatives"],
      },
      {
        day: "Wednesday",
        slug: "w3-wed",
        title: "Multi-task classification head",
        type: ["project"],
        summary: "Add two classification heads for seniority and job function. Train jointly. The multi-task regularization effect should improve embedding quality — measure it.",
        tasks: [
          {
            category: "Build (3 hrs)",
            items: [
              "Add two classification heads on top of the fine-tuned encoder: one for seniority level (6 classes) and one for job function (8 classes)",
              "Train jointly: L_total = L_contrastive + 0.5 × L_seniority + 0.5 × L_function",
              "The multi-task regularization effect should improve embedding quality slightly — measure and record",
              "TensorTonic: implement multi-label classification loss to understand the math",
            ],
          },
        ],
        concepts: ["multi-task-learning", "classification-heads"],
      },
      {
        day: "Thursday",
        slug: "w3-thu",
        title: "FAISS semantic search index",
        type: ["project"],
        summary: "Build the semantic search system. Embed all canonical titles, index with FAISS, and implement the query pipeline. Test: type 'RevOps professionals' → get back every relevant title variant across all languages.",
        tasks: [
          {
            category: "Build (3 hrs)",
            items: [
              "Embed all 50 canonical titles + 1,000 variants using your fine-tuned model. Build a faiss.IndexFlatIP (inner product = cosine similarity with normalized vectors)",
              "Implement the semantic search query: input text → encode → nearest-neighbor search → return top-10 matching canonical titles",
              "Test multilingual search: 'directeur commercial' (French) → should return 'Sales Director' and nearby titles",
              "TensorTonic: read about nearest neighbor search / ANN — understand the brute-force vs approximate tradeoff",
            ],
          },
        ],
        insight:
          "This is the demo's centerpiece. A live semantic search box where you type 'Head of Revenue' and get back every matching title variant across all languages is immediately impressive to a founder.",
        concepts: ["faiss", "dense-retrieval", "ann-search"],
      },
      {
        day: "Friday",
        slug: "w3-fri",
        title: "Embedding visualization + evaluation",
        type: ["project"],
        summary: "Run UMAP on all 1,000 title embeddings before and after fine-tuning. Before: messy. After: tight clusters by function and seniority. This before/after plot is your demo's hero image.",
        tasks: [
          {
            category: "Build (2 hrs)",
            items: [
              "Run UMAP on all 1,000 title embeddings (before and after fine-tuning). Plot with Plotly — color by job function.",
              "Before: messy clusters. After: tight clusters. This before/after UMAP plot is a screenshot-worthy result for your Loom and LinkedIn post.",
            ],
          },
          {
            category: "Evaluation (1 hr)",
            items: [
              "Compute: accuracy@1, accuracy@3, and MRR on a held-out test set of 100 titles",
              "Build the final comparison table: TF-IDF → SBERT off-shelf → Fine-tuned XLM-R. This table goes in your README and demo UI.",
            ],
          },
        ],
        concepts: ["umap", "evaluation-metrics", "embedding-visualization"],
      },
      {
        day: "Saturday",
        slug: "w3-sat",
        title: "Buffer — debugging + W&B cleanup",
        type: ["buffer"],
        summary: "Get all model metrics clean. Publish W&B training curves. Do error analysis on your 10 most-wrong predictions — that analysis is good interview content.",
        tasks: [
          {
            category: "2–3 hrs",
            items: [
              "Get all model metrics clean and documented in README",
              "Make sure W&B training curves are public (share link)",
              "Error analysis: look at the 10 most-wrong predictions. Can you explain why they failed? That analysis becomes good interview content.",
            ],
          },
        ],
        concepts: [],
      },
    ],
  },
  {
    week: 4,
    title: "Ship It",
    subtitle: "Deploy, record, send the DM",
    focus: "Build the Gradio demo UI, deploy to HuggingFace Spaces, record a 90-second Loom, polish the README, and send the cold DM to the founder.",
    tensortonic: "Interview prep mode — solve Adam, Batch Norm, Dropout from memory",
    milestone: "Live demo URL + cold DM sent by Friday EOD",
    accent: "#059669",
    accentLight: "#ECFDF5",
    days: [
      {
        day: "Monday",
        slug: "w4-mon",
        title: "Build the Gradio demo UI",
        type: ["ship", "project"],
        summary: "Build a three-tab Gradio interface: Title Normalizer, Semantic People Search, and Model Comparison. Keep it minimal — founders care about what the model does, not the styling.",
        tasks: [
          {
            category: "Build (3 hrs)",
            items: [
              "Tab 1 — Title Normalizer: text input → canonical title, seniority, function, confidence score. Example inputs: 'Head of Rev Dept', 'Responsable Ventes', 'VP Sales Ops'",
              "Tab 2 — Semantic People Search: text query → top-5 matching canonical titles with similarity scores. Pre-populate with 'RevOps professionals' as demo query.",
              "Tab 3 — Model Comparison: static table showing TF-IDF vs SBERT vs Fine-tuned XLM-R accuracy numbers",
              "Keep the UI minimal — founders don't care about styling, they care about what the model does",
            ],
          },
        ],
        concepts: [],
      },
      {
        day: "Tuesday",
        slug: "w4-tue",
        title: "Deploy to HuggingFace Spaces",
        type: ["ship"],
        summary: "Get a permanent public URL for your demo. Upload your fine-tuned model to HuggingFace Model Hub. Test inference works on HF's servers, not just your laptop.",
        tasks: [
          {
            category: "Deploy (2 hrs)",
            items: [
              "Create HuggingFace account. Create a new Space with Gradio runtime. Push your app code.",
              "Upload your fine-tuned model to HuggingFace Model Hub (free) — gives you a permanent shareable model link",
              "Test the live URL — make sure inference works end-to-end on HF's servers, not just your laptop",
              "Note: free tier may be slow (CPU only) — that's fine for a demo, just add a note",
            ],
          },
          {
            category: "TensorTonic (1 hr) — interview prep mode",
            items: [
              "Practice: Adam Optimizer problem — implement from memory. It will come up.",
            ],
          },
        ],
        concepts: [],
      },
      {
        day: "Wednesday",
        slug: "w4-wed",
        title: "Record the 90-second Loom",
        type: ["ship"],
        summary: "Script your Loom before recording. One take is fine. Authentic > polished. They're evaluating your thinking, not your video production quality.",
        tasks: [
          {
            category: "Script (write this before recording)",
            items: [
              "0:00–0:10 — 'Crustdata's ML intern JD mentions job title normalization across languages as a core problem. I built a mini version of that.'",
              "0:10–0:30 — Show Tab 1: type 'Head of Rev Dept' → canonical output. Type 'Responsable Ventes' (French) → correctly maps to Sales Manager. Zero training on French.",
              "0:30–0:55 — Show Tab 2: type 'RevOps professionals' → top matching titles. 'This is the semantic search problem from your JD.'",
              "0:55–1:10 — Show Tab 3: comparison table. 'Fine-tuned XLM-R hits 91% vs 52% TF-IDF. Used SimCSE-style contrastive fine-tuning, training data generated with Claude for ~$2.'",
              "1:10–1:30 — 'Repo link, W&B training run, and model on HuggingFace are all in the description. Would love to talk.'",
            ],
          },
        ],
        insight: "One take is fine. Don't over-edit. Authentic > polished. They're evaluating your thinking, not your video production.",
        concepts: [],
      },
      {
        day: "Thursday",
        slug: "w4-thu",
        title: "Polish repo + write the README",
        type: ["ship"],
        summary: "A great README is part of the signal. Structure it clearly: problem statement, results table, papers implemented, data generation approach, live demo link at the top.",
        tasks: [
          {
            category: "README structure (2 hrs)",
            items: [
              "Problem statement — 'Mapping noisy, multilingual job titles to canonical forms at scale'",
              "Results table — TF-IDF / SBERT / Fine-tuned XLM-R with accuracy@1 and MRR",
              "Architecture diagram — simple text diagram: raw title → XLM-R encoder → embedding → FAISS → canonical",
              "Papers implemented — list all 3 with one-line summaries",
              "Data generation — explain the LLM-as-labeler approach and cost (~$2 for 1,000 examples)",
              "Live demo link — prominent, at the very top",
            ],
          },
        ],
        concepts: [],
      },
      {
        day: "Friday",
        slug: "w4-fri",
        title: "Send the DM — apply through portal",
        type: ["ship"],
        summary: "Ship day. Send the cold DM to the founders on X/LinkedIn. Apply through the official YC portal as a parallel track. Post on LinkedIn with the UMAP before/after image as the visual hook.",
        tasks: [
          {
            category: "Today's only goal",
            items: [
              "Send the cold DM to Abhilash (@thechowdhary on X) and Manmohit (@ManmohitG) — same message, both channels",
              "Apply through the official YC portal as a parallel track",
              "Post the demo on LinkedIn — tag @Crustdata — with the UMAP before/after image as the visual hook",
            ],
          },
          {
            category: "Checklist before sending",
            items: [
              "HuggingFace Space is live and returning results",
              "GitHub repo is public with clean README",
              "Loom link works in incognito mode",
              "W&B run is public and shows training curves",
              "DM is under 150 words",
            ],
          },
        ],
        concepts: [],
      },
      {
        day: "Saturday",
        slug: "w4-sat",
        title: "Interview prep — start now, don't wait",
        type: ["tensortonic", "buffer"],
        summary: "Practice ML systems design out loud. Solve TensorTonic problems from memory. Be ready to discuss all 3 papers you implemented in depth.",
        tasks: [
          {
            category: "Interview prep (3 hrs)",
            items: [
              "TensorTonic: solve 3 problems from scratch — Adam Optimizer, Batch Normalization, Dropout. These are likely to appear in a technical screen.",
              "Practice out loud: 'Design a people search system that handles 500M profiles across 30 languages' — sketch the full pipeline: blocking → encoding → FAISS → reranking → evaluation",
              "You've now implemented 3 papers. Be ready to discuss any of them: what problem it solved, the key innovation, and its limitations.",
            ],
          },
        ],
        concepts: [],
      },
    ],
  },
];

export const WEEK_COLORS: Record<number, { accent: string; light: string; label: string }> = {
  1: { accent: "#E8571A", light: "#FFF4EE", label: "Foundations" },
  2: { accent: "#0891B2", light: "#ECFEFF", label: "Attention" },
  3: { accent: "#7C3AED", light: "#F5F3FF", label: "Fine-tuning" },
  4: { accent: "#059669", light: "#ECFDF5", label: "Ship It" },
};
