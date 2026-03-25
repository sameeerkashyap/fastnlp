export interface PaperModule {
  title: string;
  description: string;
  tensortonic?: boolean;
}

export interface Paper {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  url: string;
  week: number;
  emoji: string;
  tagline: string;
  whyItMatters: string;
  keyInsight: string;
  keyContributions: string[];
  limitations: string[];
  projectConnection: string;
  interviewQuestions: string[];
  modules: PaperModule[];
  codeSnippet: string;
}

export const papers: Paper[] = [
  {
    id: "attention-is-all-you-need",
    title: "Attention Is All You Need",
    authors: "Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin",
    venue: "NeurIPS",
    year: 2017,
    url: "https://arxiv.org/abs/1706.03762",
    week: 2,
    emoji: "🔭",
    tagline: "The paper that replaced RNNs with attention and changed everything",
    whyItMatters:
      "Every modern NLP model — BERT, GPT-4, XLM-R, LLaMA — is built on the transformer architecture introduced in this paper. Understanding it from first principles means you can reason about any model built since 2017. Crustdata's encoder models are stacks of transformer blocks.",
    keyInsight:
      "You don't need recurrence or convolution to achieve state-of-the-art sequence modeling. Attention alone — computing weighted averages over all positions simultaneously — is sufficient. This enables full parallelism (no sequential bottleneck) and direct long-range connections (no information fading).",
    keyContributions: [
      "Scaled dot-product attention: Attention(Q,K,V) = softmax(QKᵀ/√d_k)V — simple, parallelizable, effective",
      "Multi-head attention: run h attention operations in parallel with different projections, concatenate",
      "Positional encoding: sinusoidal functions inject position information into position-agnostic attention",
      "Encoder-decoder architecture: encoder processes the full input, decoder generates output autoregressively",
      "Residual connections + layer normalization around every sublayer — enable training of deep networks",
    ],
    limitations: [
      "O(n²) attention complexity — quadratic in sequence length. Expensive for long documents.",
      "Fixed context window — no native mechanism for sequences longer than the trained maximum",
      "No built-in position bias — words at distance 1 and distance 100 are treated identically except via learned PE",
      "Much larger than LSTM equivalents — requires GPU, not practical on edge devices at the time",
    ],
    projectConnection:
      "Every encoder you use in the FastNLP project — BERT, SBERT, XLM-R — is a stack of transformer blocks from this paper. Implementing it via TensorTonic means you understand exactly what happens inside model.encode().",
    interviewQuestions: [
      "Derive the attention formula from scratch. Explain each component.",
      "Why do we scale by √d_k? What happens without it?",
      "What's the difference between self-attention and cross-attention?",
      "Why does multi-head attention perform better than single-head with the same parameter count?",
      "How would you modify this architecture to handle sequences of length 100,000?",
    ],
    modules: [
      { title: "Tokenization", description: "BPE tokenizer — converting text to integer IDs", tensortonic: true },
      { title: "Embeddings + Positional Encoding", description: "Token embeddings + sinusoidal position signals", tensortonic: true },
      { title: "Scaled Dot-Product Attention", description: "QKV projection, scaling, softmax, weighted sum", tensortonic: true },
      { title: "Multi-Head Attention", description: "h parallel attention heads, concatenate, project", tensortonic: true },
      { title: "Layer Normalization", description: "Add & norm sublayer with residual connection", tensortonic: true },
      { title: "Feed Forward Sublayer", description: "Two linear layers with GELU activation", tensortonic: true },
      { title: "Output Projection", description: "Final linear + softmax for token prediction", tensortonic: true },
    ],
    codeSnippet: `import torch
import torch.nn as nn
import torch.nn.functional as F
import math

class TransformerBlock(nn.Module):
    """One transformer block: multi-head attention + FFN, each with residual + LN"""
    def __init__(self, d_model=768, num_heads=12, d_ff=3072, dropout=0.1):
        super().__init__()
        self.attention = MultiHeadAttention(d_model, num_heads, dropout)
        self.ffn = nn.Sequential(
            nn.Linear(d_model, d_ff),
            nn.GELU(),
            nn.Dropout(dropout),
            nn.Linear(d_ff, d_model),
        )
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)
    
    def forward(self, x, mask=None):
        # Pre-LN: normalize before sublayer (more stable than original Post-LN)
        attn_out = self.attention(self.norm1(x), self.norm1(x), self.norm1(x), mask)
        x = x + self.dropout(attn_out)   # residual connection
        
        ffn_out = self.ffn(self.norm2(x))
        x = x + self.dropout(ffn_out)    # residual connection
        return x`,
  },
  {
    id: "sentence-bert",
    title: "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks",
    authors: "Nils Reimers, Iryna Gurevych",
    venue: "EMNLP",
    year: 2019,
    url: "https://arxiv.org/abs/1908.10084",
    week: 2,
    emoji: "🔗",
    tagline: "Making BERT practical for large-scale similarity search",
    whyItMatters:
      "Vanilla BERT can't be used for semantic search at scale — comparing 10,000 sentences requires 10,000 forward passes (49 million for all pairs). SBERT solves this by producing fixed-size embeddings that can be compared with a single dot product. This is the architecture behind every modern semantic search system.",
    keyInsight:
      "Instead of feeding sentence pairs into BERT (concatenated, O(n²) comparisons), encode each sentence independently with weight-sharing (Siamese) networks. The resulting embeddings can be compared with cosine similarity — one matrix multiplication instead of n² forward passes.",
    keyContributions: [
      "Siamese network architecture: two BERT towers with shared weights, trained with triplet loss",
      "Mean pooling over token embeddings outperforms [CLS] for semantic similarity",
      "Fine-tuning on NLI (entailment/contradiction) and STS datasets creates strong semantic embeddings",
      "The sentence-transformers library (by the same authors) makes this practical: pip install sentence-transformers",
      "Demonstrated that fine-tuned BERT outperforms InferSent and Universal Sentence Encoder significantly",
    ],
    limitations: [
      "Cross-encoder (concatenated pair) still beats bi-encoder on accuracy — SBERT trades accuracy for speed",
      "Fine-tuning on NLI/STS data may not transfer well to domain-specific tasks (like job titles)",
      "Maximum sequence length of 512 tokens — long documents must be chunked",
      "Training requires paired data (positive/negative pairs) — harder to bootstrap than unsupervised methods",
    ],
    projectConnection:
      "This is the architecture your job title model is based on. You implement the siamese training loop from scratch (Thursday Week 2), then replace the [CLS] pooling with mean pooling and observe the improvement. The sentence-transformers library you use wraps this paper's ideas.",
    interviewQuestions: [
      "Why is the bi-encoder O(n) instead of O(n²)?",
      "When would you use a cross-encoder over a bi-encoder?",
      "Why does mean pooling outperform [CLS] pooling for semantic similarity?",
      "How does the triplet loss training objective work for SBERT?",
      "How would you build a semantic search system for 1 million documents using SBERT?",
    ],
    modules: [
      { title: "Siamese Architecture", description: "Two BERT towers with shared weights processing each sentence independently" },
      { title: "Pooling Strategies", description: "Mean pooling vs [CLS] — why averaging token embeddings beats the [CLS] shortcut" },
      { title: "Triplet Loss Training", description: "Anchor-positive-negative triplets with cosine margin loss" },
      { title: "NLI Fine-tuning", description: "Entailment = positive pair, contradiction = hard negative" },
      { title: "Semantic Textual Similarity", description: "STS benchmarks: Spearman correlation with human similarity scores" },
    ],
    codeSnippet: `from sentence_transformers import SentenceTransformer, losses, InputExample
from torch.utils.data import DataLoader

# Load base model
model = SentenceTransformer('xlm-roberta-base')

# Prepare training pairs (anchor, positive)
# In-batch negatives: all other pairs in the batch serve as negatives
train_examples = [
    InputExample(texts=["Head of Rev Dept", "Revenue Operations Manager"]),
    InputExample(texts=["Directeur Commercial", "Sales Director"]),
    InputExample(texts=["VP Sales Ops", "VP Revenue Operations"]),
    # ... 997 more pairs
]

train_dataloader = DataLoader(train_examples, shuffle=True, batch_size=32)

# MultipleNegativesRankingLoss = SimCSE-style in-batch negatives
# More efficient than triplet loss: no triplet construction needed
train_loss = losses.MultipleNegativesRankingLoss(model)

# Train
model.fit(
    train_objectives=[(train_dataloader, train_loss)],
    epochs=5,
    warmup_steps=100,
    optimizer_params={'lr': 2e-5},
    show_progress_bar=True,
    output_path='models/sbert-job-titles'
)

# Evaluate
query = "RevOps professionals"
canonical_titles = ["Revenue Operations Manager", "Sales Director", ...]

query_emb = model.encode([query], normalize_embeddings=True)
title_embs = model.encode(canonical_titles, normalize_embeddings=True)

similarities = query_emb @ title_embs.T  # (1, n_titles)
top_k = similarities.argsort()[0][::-1][:5]`,
  },
  {
    id: "simcse",
    title: "SimCSE: Simple Contrastive Learning of Sentence Embeddings",
    authors: "Gao, Yao, Chen",
    venue: "EMNLP",
    year: 2021,
    url: "https://arxiv.org/abs/2104.08821",
    week: 3,
    emoji: "🎯",
    tagline: "Dramatically better sentence embeddings from a surprisingly simple trick",
    whyItMatters:
      "SimCSE achieved state-of-the-art sentence embedding quality with a surprisingly simple insight: use dropout as data augmentation for contrastive learning. No extra data, no complex pipeline — just pass each sentence through twice with different dropout masks. The resulting embeddings are significantly better than SBERT on standard benchmarks.",
    keyInsight:
      "Dropout creates a minimal data augmentation: two forward passes of the same sentence produce slightly different embeddings due to different dropout masks. These are perfect positive pairs — same semantic content, slightly different representation. Everything else in the batch is a negative. This unsupervised approach rivals supervised methods.",
    keyContributions: [
      "Unsupervised SimCSE: dropout as data augmentation — no labeled data needed for strong embeddings",
      "Supervised SimCSE: NLI entailment = positive, contradiction = hard negative — better than unsupervised",
      "In-batch negatives with NT-Xent loss: large batch = more negatives = better training signal",
      "Analysis: showed that anisotropy (embeddings clustered in a narrow cone) is the key problem with vanilla BERT embeddings",
      "Uniformity and alignment metrics: formalized what makes good sentence embeddings measurable",
    ],
    limitations: [
      "Unsupervised version requires very large batch sizes for good performance (512+) — memory intensive",
      "Domain-specific fine-tuning on labeled pairs still outperforms SimCSE on specialized tasks",
      "NT-Xent loss has a temperature hyperparameter (typically 0.05) that requires tuning",
      "Performance gains plateau — later methods (E5, GTE) combine more data/scale rather than better objectives",
    ],
    projectConnection:
      "This is the training objective you use in Week 3. MultipleNegativesRankingLoss in sentence-transformers implements SimCSE's in-batch negative approach. Your (raw_title, canonical_title) pairs are the positive pairs, and all other titles in the batch are negatives. The result: your fine-tuned model hits ~91% vs ~52% for TF-IDF.",
    interviewQuestions: [
      "Explain how dropout serves as data augmentation in SimCSE.",
      "What is anisotropy and why is it a problem for sentence embeddings?",
      "What's the difference between unsupervised and supervised SimCSE?",
      "How does NT-Xent loss differ from triplet loss? What are the tradeoffs?",
      "Why does larger batch size improve SimCSE training?",
    ],
    modules: [
      { title: "Dropout as Data Augmentation", description: "Two forward passes of the same sentence = positive pair" },
      { title: "In-Batch Negative Sampling", description: "Every other sentence in the batch is a free negative" },
      { title: "NT-Xent Loss", description: "Normalized temperature-scaled cross-entropy for contrastive learning" },
      { title: "Anisotropy Analysis", description: "Why vanilla BERT embeddings cluster in a narrow cone — and how SimCSE fixes it" },
      { title: "Alignment + Uniformity Metrics", description: "Quantifying what makes good sentence embeddings" },
    ],
    codeSnippet: `import torch
import torch.nn.functional as F

def nt_xent_loss(embeddings_a: torch.Tensor, embeddings_b: torch.Tensor, 
                  temperature: float = 0.05) -> torch.Tensor:
    """
    NT-Xent (Normalized Temperature-scaled Cross-Entropy) loss.
    
    embeddings_a, embeddings_b: (batch_size, dim) — unit normalized
    Each i-th pair (a_i, b_i) is a positive pair.
    All other pairs are negatives (in-batch negatives).
    """
    batch_size = embeddings_a.shape[0]
    
    # Compute all pairwise similarities
    # (2N, 2N) similarity matrix
    embeddings = torch.cat([embeddings_a, embeddings_b], dim=0)  # (2N, dim)
    similarity = torch.matmul(embeddings, embeddings.T) / temperature  # (2N, 2N)
    
    # Mask out self-similarity (diagonal)
    mask = torch.eye(2 * batch_size, dtype=torch.bool, device=embeddings.device)
    similarity = similarity.masked_fill(mask, float('-inf'))
    
    # Labels: for row i, the positive is at index i+N (or i-N for the second half)
    labels = torch.cat([
        torch.arange(batch_size, 2 * batch_size),
        torch.arange(0, batch_size)
    ]).to(embeddings.device)
    
    loss = F.cross_entropy(similarity, labels)
    return loss

# In practice: use MultipleNegativesRankingLoss from sentence-transformers
# It implements the same idea more efficiently
from sentence_transformers import losses
loss_fn = losses.MultipleNegativesRankingLoss(model)`,
  },
];

export function getPaperById(id: string): Paper | undefined {
  return papers.find((p) => p.id === id);
}
