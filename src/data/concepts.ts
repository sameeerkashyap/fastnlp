export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Category =
  | "Text Representation"
  | "Probability & Loss"
  | "Neural Networks"
  | "Sequence Models"
  | "Attention & Transformers"
  | "Pretrained Models"
  | "Training Techniques"
  | "Search & Retrieval"
  | "Production";

export interface Resource {
  name: string;
  url: string;
  type: "article" | "paper" | "video" | "docs";
}

export interface Concept {
  slug: string;
  title: string;
  difficulty: Difficulty;
  category: Category;
  week: number;
  emoji: string;
  tagline: string;
  description: string;
  intuition: string;
  formula?: string;
  formulaExplained?: string;
  pythonCode?: string;
  keyPoints: string[];
  resources: Resource[];
  tensortonic?: string;
  relatedConcepts: string[];
}

export const concepts: Concept[] = [
  {
    slug: "n-grams",
    title: "N-grams",
    difficulty: "beginner",
    category: "Text Representation",
    week: 1,
    emoji: "🔤",
    tagline: "Splitting text into overlapping windows of n words",
    description:
      "An n-gram is a contiguous sequence of n items from a text. Unigrams are single words. Bigrams are pairs of consecutive words. Trigrams are triples. N-grams are one of the oldest and still-useful representations in NLP — they capture local word patterns without any learning.",
    intuition:
      "Imagine sliding a window of width n across your text. At each position, you record whatever's in the window. A bigram model for 'the cat sat' produces: ('the','cat'), ('cat','sat'). The frequency of these pairs tells you about common word patterns in your corpus. It's crude but surprisingly powerful for tasks like spam detection and language identification.",
    formula: "P(w_n | w_{n-1}, ..., w_1) ≈ P(w_n | w_{n-1}, ..., w_{n-k+1})",
    formulaExplained:
      "An n-gram language model approximates the probability of a word given all prior words by only looking at the previous k words (the Markov assumption). This makes computation tractable.",
    pythonCode: `from collections import Counter

def get_ngrams(text: str, n: int) -> list[tuple]:
    tokens = text.lower().split()
    return [tuple(tokens[i:i+n]) for i in range(len(tokens) - n + 1)]

def ngram_frequencies(text: str, n: int) -> dict:
    ngrams = get_ngrams(text, n)
    return dict(Counter(ngrams))

# Example
text = "the cat sat on the mat"
print(get_ngrams(text, 2))
# [('the', 'cat'), ('cat', 'sat'), ('sat', 'on'), ('on', 'the'), ('the', 'mat')]

print(ngram_frequencies(text, 1))
# {'the': 2, 'cat': 1, 'sat': 1, 'on': 1, 'mat': 1}`,
    keyPoints: [
      "Unigrams (n=1) are just word frequency counts — the simplest possible text representation",
      "Bigrams capture simple word-pair patterns — 'New York' is meaningless as unigrams but meaningful as a bigram",
      "Larger n captures more context but causes data sparsity: most trigrams never appear in training",
      "Character n-grams are language-agnostic and useful for detecting language, author style, and typos",
      "Used in: spam detection, language identification, simple text classification, autocomplete",
    ],
    resources: [
      {
        name: "Speech and Language Processing — Chapter 3 (Jurafsky & Martin)",
        url: "https://web.stanford.edu/~jurafsky/slp3/",
        type: "article",
      },
    ],
    tensortonic: "N-gram Frequency Counter",
    relatedConcepts: ["tf-idf", "word2vec", "tokenization"],
  },
  {
    slug: "tf-idf",
    title: "TF-IDF",
    difficulty: "beginner",
    category: "Text Representation",
    week: 1,
    emoji: "📊",
    tagline: "Weighting words by how unique they are to a document",
    description:
      "TF-IDF (Term Frequency — Inverse Document Frequency) scores words by two factors: how often they appear in a document (TF) and how rarely they appear across all documents (IDF). Common words like 'the' get low scores. Rare, specific words get high scores.",
    intuition:
      "If the word 'transformer' appears 10 times in an NLP paper but only in 2 out of 10,000 papers, it's very diagnostic of that paper's topic. But if 'the' appears 100 times in the same paper, it tells you nothing. TF-IDF multiplies these intuitions together: reward words that are frequent in this document AND rare across all documents.",
    formula: "TF-IDF(t,d) = TF(t,d) × IDF(t) = (count(t,d)/|d|) × log(N / df(t))",
    formulaExplained:
      "TF = term frequency in this document. IDF = log(total documents / documents containing the term). The log dampens the effect of very rare terms. The division by |d| normalizes for document length.",
    pythonCode: `import numpy as np
from collections import Counter

def compute_tfidf(corpus: list[str]) -> tuple[np.ndarray, list[str]]:
    # Tokenize
    tokenized = [doc.lower().split() for doc in corpus]
    
    # Build vocabulary
    vocab = sorted(set(word for doc in tokenized for word in doc))
    word_to_idx = {w: i for i, w in enumerate(vocab)}
    
    N = len(corpus)
    tfidf_matrix = np.zeros((N, len(vocab)))
    
    for doc_idx, tokens in enumerate(tokenized):
        tf = Counter(tokens)
        doc_len = len(tokens)
        
        for word, count in tf.items():
            if word in word_to_idx:
                # TF: normalized term frequency
                term_freq = count / doc_len
                
                # IDF: log(N / df(t)) — df = docs containing term
                df = sum(1 for d in tokenized if word in d)
                inv_doc_freq = np.log(N / df)
                
                tfidf_matrix[doc_idx, word_to_idx[word]] = term_freq * inv_doc_freq
    
    return tfidf_matrix, vocab

corpus = [
    "the cat sat on the mat",
    "the dog sat on the log", 
    "cats and dogs are common pets"
]
matrix, vocab = compute_tfidf(corpus)`,
    keyPoints: [
      "TF alone rewards documents that repeat words — dividing by document length normalizes this",
      "IDF penalizes stopwords (the, a, is) that appear in almost every document",
      "The result is a sparse vector — most words are 0 for any given document",
      "Cosine similarity between TF-IDF vectors measures document topic similarity",
      "Limitation: completely ignores word order and word meaning ('bank' the financial institution vs 'bank' the river)",
    ],
    resources: [
      {
        name: "sklearn TfidfVectorizer docs",
        url: "https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html",
        type: "docs",
      },
    ],
    tensortonic: "TF-IDF Vectorizer",
    relatedConcepts: ["n-grams", "cosine-similarity", "word2vec"],
  },
  {
    slug: "cosine-similarity",
    title: "Cosine Similarity",
    difficulty: "beginner",
    category: "Text Representation",
    week: 1,
    emoji: "📐",
    tagline: "Measuring similarity as the angle between vectors, not their magnitude",
    description:
      "Cosine similarity measures the cosine of the angle between two vectors. Unlike Euclidean distance, it's scale-invariant — a short and long document about the same topic will have high cosine similarity even though their TF-IDF vectors have very different magnitudes.",
    intuition:
      "Two vectors pointing in the same direction have cosine similarity 1 (perfectly similar). Perpendicular vectors have similarity 0 (completely unrelated). Opposite vectors have similarity -1. In NLP, two documents about the same topic will have their TF-IDF or embedding vectors pointing in roughly the same direction in high-dimensional space, regardless of document length.",
    formula: "cos(θ) = (A · B) / (||A|| × ||B||)",
    formulaExplained:
      "Dot product A·B divided by the product of the vector magnitudes. This normalizes for vector length, measuring only direction. Output is in [-1, 1] — higher is more similar.",
    pythonCode: `import numpy as np

def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    dot_product = np.dot(a, b)
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)
    
    if norm_a == 0 or norm_b == 0:
        return 0.0
    
    return dot_product / (norm_a * norm_b)

# With unit-normalized vectors, dot product == cosine similarity
# This is why FAISS uses inner product (IndexFlatIP) with normalized vectors
def cosine_similarity_normalized(a: np.ndarray, b: np.ndarray) -> float:
    a_norm = a / np.linalg.norm(a)
    b_norm = b / np.linalg.norm(b)
    return np.dot(a_norm, b_norm)  # == cosine similarity`,
    keyPoints: [
      "Scale-invariant: a 1-page and 10-page document about the same topic get the same score",
      "Used everywhere: TF-IDF similarity, embedding similarity, FAISS with inner product",
      "Normalizing vectors to unit length turns inner product into cosine similarity — FAISS does this",
      "Works in high-dimensional spaces where Euclidean distance becomes unreliable (curse of dimensionality)",
    ],
    resources: [],
    tensortonic: "Cosine Similarity",
    relatedConcepts: ["tf-idf", "sentence-embeddings", "faiss"],
  },
  {
    slug: "word2vec",
    title: "Word2Vec",
    difficulty: "beginner",
    category: "Text Representation",
    week: 1,
    emoji: "🧭",
    tagline: "Learning word meanings from surrounding context",
    description:
      "Word2Vec learns dense word embeddings by predicting a word from its context (CBOW) or predicting context from a word (Skip-gram). The key insight: words that appear in similar contexts have similar meanings. 'Cat' and 'dog' appear near words like 'pet', 'vet', 'food' — so they end up close in embedding space.",
    intuition:
      "You are what you eat — or in NLP, you are the company you keep. Word2Vec trains a small neural network to predict context words from a center word. The hidden layer weights become the word embeddings. Famous result: king - man + woman ≈ queen. The vector arithmetic works because embeddings capture semantic relationships as directions in space.",
    pythonCode: `from gensim.models import Word2Vec

# Train word2vec on your corpus
sentences = [
    ["the", "cat", "sat", "on", "the", "mat"],
    ["the", "dog", "sat", "on", "the", "rug"],
]

model = Word2Vec(sentences, vector_size=100, window=5, min_count=1, workers=4)

# Get embedding for a word
cat_vector = model.wv["cat"]  # shape: (100,)

# Find similar words
similar = model.wv.most_similar("cat", topn=5)

# Vector arithmetic
# king - man + woman ≈ queen
result = model.wv.most_similar(
    positive=["king", "woman"],
    negative=["man"]
)`,
    keyPoints: [
      "Limitation: static embeddings — 'bank' has one vector regardless of context (financial or river)",
      "This limitation is what motivated BERT's contextual embeddings",
      "Training is unsupervised — you just need raw text, no labels",
      "Embedding size (100–300d) is much smaller than vocabulary — that's the compression insight",
      "Word2Vec embeddings are still used in production for low-latency applications",
    ],
    resources: [
      {
        name: "The Illustrated Word2Vec (Jay Alammar)",
        url: "https://jalammar.github.io/illustrated-word2vec/",
        type: "article",
      },
    ],
    relatedConcepts: ["n-grams", "tf-idf", "bert", "sentence-embeddings"],
  },
  {
    slug: "softmax",
    title: "Softmax",
    difficulty: "beginner",
    category: "Probability & Loss",
    week: 1,
    emoji: "🎲",
    tagline: "Turning raw scores into probabilities that sum to 1",
    description:
      "Softmax converts a vector of raw scores (logits) into a probability distribution. Every output is positive and they all sum to 1. It's used as the final layer in classifiers and inside attention mechanisms to weight the values.",
    intuition:
      "Imagine you have 3 candidate answers with scores [2.0, 1.0, 0.1]. Softmax exponentiates each score (making them positive) and normalizes by the sum. High scores get amplified, low scores get suppressed. The output is a valid probability distribution you can use for cross-entropy loss.",
    formula: "σ(z)_i = e^{z_i} / Σ_{j=1}^{K} e^{z_j}",
    formulaExplained:
      "Exponentiate each score, then divide by the sum of all exponentiated scores. The temperature parameter T can be added: e^{z_i/T}. High T → flat (uncertain) distribution. Low T → peaked (confident) distribution. Attention uses softmax with T = √d_k.",
    pythonCode: `import numpy as np

def softmax(z: np.ndarray) -> np.ndarray:
    # Subtract max for numerical stability (avoids overflow)
    z_stable = z - np.max(z)
    exp_z = np.exp(z_stable)
    return exp_z / np.sum(exp_z)

# Example
logits = np.array([2.0, 1.0, 0.1])
probs = softmax(logits)
print(probs)  # [0.659, 0.242, 0.099] — sums to 1.0

# In attention: softmax(QK^T / sqrt(d_k))
# Temperature = sqrt(d_k) prevents the dot products from 
# growing too large in high dimensions, which would 
# push softmax into saturation (near-zero gradients)`,
    keyPoints: [
      "Always subtract the max before exponentiating — prevents numerical overflow (standard practice)",
      "Differentiable everywhere — necessary for backpropagation",
      "The temperature parameter controls how peaked or flat the distribution is",
      "In attention: softmax normalizes the attention weights so they sum to 1 (a weighted average)",
      "Softmax + cross-entropy loss has a clean gradient: ŷ - y (predicted - true)",
    ],
    resources: [],
    tensortonic: "Softmax Function",
    relatedConcepts: ["cross-entropy", "self-attention", "gradient-descent"],
  },
  {
    slug: "cross-entropy",
    title: "Cross-Entropy Loss",
    difficulty: "beginner",
    category: "Probability & Loss",
    week: 1,
    emoji: "📉",
    tagline: "Measuring how wrong a probability distribution prediction is",
    description:
      "Cross-entropy loss measures the difference between the predicted probability distribution and the true distribution. For classification, the true distribution is a one-hot vector. The loss is low when the model assigns high probability to the correct class and high when it assigns low probability.",
    intuition:
      "Log probability is the key. If the model predicts 90% chance of the correct class, loss = -log(0.9) ≈ 0.1. If it predicts 10% chance, loss = -log(0.1) ≈ 2.3. The log function penalizes confident wrong predictions extremely harshly — which is exactly what you want.",
    formula: "L = -Σ y_i log(ŷ_i) = -log(ŷ_{true class})",
    formulaExplained:
      "For one-hot true labels, only the true class contributes to the loss. So the loss is simply -log(probability assigned to the correct class). Minimizing this maximizes the model's probability on the correct class.",
    pythonCode: `import numpy as np

def cross_entropy_loss(y_true: np.ndarray, y_pred: np.ndarray, eps: float = 1e-8) -> float:
    """
    y_true: one-hot vector, shape (num_classes,)
    y_pred: probability vector from softmax, shape (num_classes,)
    """
    # Clip to avoid log(0)
    y_pred = np.clip(y_pred, eps, 1 - eps)
    return -np.sum(y_true * np.log(y_pred))

def cross_entropy_batch(y_true: np.ndarray, y_pred: np.ndarray) -> float:
    """Average loss over a batch"""
    batch_size = y_true.shape[0]
    losses = [-np.log(y_pred[i, y_true[i]]) for i in range(batch_size)]
    return np.mean(losses)

# PyTorch (what you'll actually use)
import torch
import torch.nn as nn

criterion = nn.CrossEntropyLoss()  # applies softmax internally
logits = torch.tensor([[2.0, 1.0, 0.1]])
target = torch.tensor([0])  # index of correct class
loss = criterion(logits, target)`,
    keyPoints: [
      "Cross-entropy + softmax is the standard combination for multi-class classification",
      "PyTorch's nn.CrossEntropyLoss takes raw logits, not probabilities — it applies softmax internally",
      "The gradient of (softmax + cross-entropy) is simply (ŷ - y): predicted minus true. Elegant.",
      "Binary cross-entropy is used for multi-label classification (each class independently yes/no)",
    ],
    resources: [],
    tensortonic: "Cross Entropy Loss",
    relatedConcepts: ["softmax", "gradient-descent", "neural-networks"],
  },
  {
    slug: "gradient-descent",
    title: "Gradient Descent",
    difficulty: "beginner",
    category: "Probability & Loss",
    week: 1,
    emoji: "⛰️",
    tagline: "Iteratively moving model weights downhill on the loss surface",
    description:
      "Gradient descent updates model parameters in the direction that reduces the loss. Compute the gradient of the loss with respect to each parameter, then step in the opposite direction (downhill). Repeat until loss stops improving.",
    intuition:
      "Imagine standing on a hilly landscape (the loss surface) blindfolded. You can feel the slope under your feet (the gradient). Take a small step in the direction that goes downhill. Repeat. You'll eventually reach a valley (local minimum). The step size is the learning rate — too large and you overshoot, too small and you never arrive.",
    formula: "θ ← θ - α × ∇_θ L(θ)",
    formulaExplained:
      "θ = parameters, α = learning rate, ∇_θ L = gradient of the loss with respect to parameters. Adam adapts the learning rate per-parameter using first and second moment estimates of the gradients.",
    pythonCode: `import numpy as np

# Vanilla SGD
def sgd_update(params: dict, grads: dict, lr: float) -> dict:
    return {k: params[k] - lr * grads[k] for k in params}

# Adam optimizer (what you'll actually use)
class Adam:
    def __init__(self, lr=1e-3, beta1=0.9, beta2=0.999, eps=1e-8):
        self.lr = lr
        self.beta1 = beta1
        self.beta2 = beta2
        self.eps = eps
        self.m = {}  # first moment (mean)
        self.v = {}  # second moment (variance)
        self.t = 0   # time step
    
    def update(self, params: dict, grads: dict) -> dict:
        self.t += 1
        updated = {}
        for k in params:
            if k not in self.m:
                self.m[k] = np.zeros_like(params[k])
                self.v[k] = np.zeros_like(params[k])
            
            # Update biased moments
            self.m[k] = self.beta1 * self.m[k] + (1 - self.beta1) * grads[k]
            self.v[k] = self.beta2 * self.v[k] + (1 - self.beta2) * grads[k]**2
            
            # Bias correction
            m_hat = self.m[k] / (1 - self.beta1**self.t)
            v_hat = self.v[k] / (1 - self.beta2**self.t)
            
            updated[k] = params[k] - self.lr * m_hat / (np.sqrt(v_hat) + self.eps)
        return updated`,
    keyPoints: [
      "SGD uses one sample at a time (noisy), batch GD uses all samples (slow), mini-batch is the standard compromise",
      "Adam is the de facto standard optimizer for NLP — it adapts the learning rate per parameter",
      "Learning rate is the most important hyperparameter — too high causes divergence, too low is slow",
      "Learning rate schedulers (warmup + cosine decay) are standard in transformer fine-tuning",
    ],
    resources: [],
    tensortonic: "Gradient Descent + Adam Optimizer",
    relatedConcepts: ["cross-entropy", "neural-networks", "batch-normalization"],
  },
  {
    slug: "neural-networks",
    title: "Feedforward Neural Networks",
    difficulty: "beginner",
    category: "Neural Networks",
    week: 1,
    emoji: "🧠",
    tagline: "Stacked linear transformations with non-linear activations",
    description:
      "A feedforward neural network is a function f(x) = activation(Wx + b) stacked multiple times. Each layer transforms the representation — early layers detect simple patterns, deeper layers detect complex combinations of simpler patterns.",
    intuition:
      "Think of each layer as a feature extractor. Layer 1 might detect 'is there a capital letter?'. Layer 2 might detect 'does it start with a capital AND contain numbers?'. Layer 3 detects combinations of layer-2 patterns. By the final layer, you've built up a rich, task-specific representation from raw inputs.",
    formula: "h^{(l)} = activation(W^{(l)} h^{(l-1)} + b^{(l)})",
    pythonCode: `import torch
import torch.nn as nn

class FeedForward(nn.Module):
    """The FFN sublayer used inside every transformer block"""
    def __init__(self, d_model: int, d_ff: int, dropout: float = 0.1):
        super().__init__()
        self.linear1 = nn.Linear(d_model, d_ff)
        self.linear2 = nn.Linear(d_ff, d_model)
        self.dropout = nn.Dropout(dropout)
        self.activation = nn.GELU()  # BERT uses GELU, original transformer uses ReLU
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.linear2(self.dropout(self.activation(self.linear1(x))))

# In transformers: d_model=768, d_ff=3072 (4x expansion then compress back)
ffn = FeedForward(d_model=768, d_ff=3072)`,
    keyPoints: [
      "Without non-linear activations, stacking layers is equivalent to one linear layer (trivially collapsible)",
      "ReLU (max(0,x)) is simple and fast. GELU (used in BERT) is smoother and performs slightly better for NLP",
      "The transformer's FFN sublayer expands to 4× the model dimension then compresses back — a bottleneck architecture",
      "Universal Approximation Theorem: a wide enough 1-hidden-layer network can approximate any function",
    ],
    resources: [],
    tensortonic: "MLP Forward Pass",
    relatedConcepts: ["gradient-descent", "batch-normalization", "dropout", "transformer-motivation"],
  },
  {
    slug: "batch-normalization",
    title: "Batch Normalization",
    difficulty: "intermediate",
    category: "Neural Networks",
    week: 1,
    emoji: "⚖️",
    tagline: "Normalizing activations across a batch to stabilize training",
    description:
      "Batch normalization normalizes the activations of each layer to have zero mean and unit variance across the batch dimension, then applies learned scale (γ) and shift (β) parameters. This dramatically stabilizes training and allows much higher learning rates.",
    intuition:
      "Without normalization, activations drift as training progresses — later layers get wildly different input distributions than they were trained on (internal covariate shift). BatchNorm pins the distribution at each layer, letting each layer train independently of upstream changes. Note: transformers use Layer Norm (normalizes across features, not batch) for sequential/variable-length inputs.",
    formula: "BN(x) = γ × (x - μ_B) / √(σ²_B + ε) + β",
    pythonCode: `import torch
import torch.nn as nn

# Batch Normalization: normalizes across the batch dimension
# Used in: CNNs, feedforward networks
bn = nn.BatchNorm1d(num_features=768)

# Layer Normalization: normalizes across the feature dimension
# Used in: Transformers (BERT, GPT, etc.)
# Key difference: doesn't depend on batch size — works for sequences of any length
ln = nn.LayerNorm(normalized_shape=768)

# Why transformers use LayerNorm, not BatchNorm:
# - Batch sizes are small (GPU memory)
# - Sequence lengths vary
# - LayerNorm normalizes each token's features independently`,
    keyPoints: [
      "Transformers use Layer Normalization, not Batch Normalization — normalize across features, not batch",
      "Post-LN (original transformer) vs Pre-LN (GPT-2, more stable training) — different layer placement",
      "The learnable γ and β let the model undo normalization if needed",
      "At inference time, BatchNorm uses running statistics from training — LayerNorm uses the current sample only",
    ],
    resources: [],
    tensortonic: "Batch Normalization",
    relatedConcepts: ["neural-networks", "dropout", "layer-normalization"],
  },
  {
    slug: "dropout",
    title: "Dropout",
    difficulty: "intermediate",
    category: "Neural Networks",
    week: 1,
    emoji: "🎯",
    tagline: "Randomly zeroing neurons during training to prevent overfitting",
    description:
      "Dropout randomly sets a fraction p of neuron outputs to zero during training. This prevents neurons from co-adapting (becoming too dependent on each other) and acts as an implicit ensemble of exponentially many thinned networks.",
    intuition:
      "A team that occasionally loses random members learns to be robust — each member must be able to do the job without relying on specific teammates. Similarly, dropout forces each neuron to learn useful features independently. At inference time, all neurons are active and outputs are scaled by (1-p) to match expected training behavior.",
    pythonCode: `import torch
import torch.nn as nn

class Dropout(nn.Module):
    def __init__(self, p: float = 0.1):
        super().__init__()
        self.p = p
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        if not self.training:
            return x  # No dropout at inference
        
        # Create binary mask: keep with probability (1-p)
        mask = (torch.rand_like(x) > self.p).float()
        
        # Scale to maintain expected value
        return x * mask / (1 - self.p)

# SimCSE uses dropout as data augmentation:
# Pass the same sentence twice through the encoder with different dropout masks
# → two slightly different embeddings = a positive pair for contrastive learning`,
    keyPoints: [
      "Standard dropout rates: 0.1 for transformers, 0.5 for fully-connected layers",
      "SimCSE uses dropout as data augmentation for contrastive learning — the key innovation of that paper",
      "At inference, dropout is disabled (model.eval()) — this is a common bug to forget",
      "Inverted dropout (scale by 1/(1-p) at training) is the standard implementation — no scaling at test time",
    ],
    resources: [],
    tensortonic: "Dropout",
    relatedConcepts: ["neural-networks", "batch-normalization", "simcse"],
  },
  {
    slug: "rnn",
    title: "Recurrent Neural Networks",
    difficulty: "intermediate",
    category: "Sequence Models",
    week: 1,
    emoji: "🔄",
    tagline: "Processing sequences by passing hidden state from step to step",
    description:
      "RNNs process sequences token-by-token, maintaining a hidden state that accumulates information from all previous tokens. At each step: h_t = tanh(W_h × h_{t-1} + W_x × x_t + b).",
    intuition:
      "An RNN reads a sentence like a human reading one word at a time, building up a mental model (hidden state) as they go. The problem: by the time you read the last word, the hidden state has been transformed so many times that information from early words has effectively vanished. This is the vanishing gradient problem — and it's why transformers replaced RNNs.",
    formula: "h_t = tanh(W_h · h_{t-1} + W_x · x_t + b_h)",
    pythonCode: `import torch
import torch.nn as nn

# Why we don't use vanilla RNNs anymore
rnn = nn.RNN(input_size=256, hidden_size=512, batch_first=True)

# LSTMs (Long Short-Term Memory) partially solved vanishing gradients
lstm = nn.LSTM(input_size=256, hidden_size=512, batch_first=True)

# Key problems RNNs have that transformers don't:
# 1. Sequential processing — can't parallelize (slow to train)
# 2. Vanishing gradients — information from early tokens fades
# 3. Fixed-size hidden state — information bottleneck

# Transformers solve all 3:
# 1. Parallel attention — all positions computed simultaneously
# 2. Direct connections — any token can attend to any other directly
# 3. Full sequence preserved — no bottleneck`,
    keyPoints: [
      "RNNs are O(n) sequential — transformers are O(n²) but massively parallelizable on GPUs",
      "LSTMs and GRUs partially solve vanishing gradients with gating mechanisms — but transformers are better",
      "The vanishing gradient problem: gradients multiply through time steps, shrink to zero for early tokens",
      "Bidirectional RNNs (BiLSTM) read forward and backward — this insight led directly to BERT's bidirectional attention",
    ],
    resources: [],
    tensortonic: "RNN Forward Pass",
    relatedConcepts: ["vanishing-gradients", "transformer-motivation", "self-attention"],
  },
  {
    slug: "vanishing-gradients",
    title: "Vanishing Gradients",
    difficulty: "intermediate",
    category: "Sequence Models",
    week: 1,
    emoji: "💨",
    tagline: "Why gradient signals fade in deep networks and long sequences",
    description:
      "During backpropagation through a deep network or long sequence, gradients are repeatedly multiplied by weight matrices. If these multiplications consistently produce values < 1, the gradient shrinks exponentially — vanishing. This means early layers/tokens receive nearly zero learning signal.",
    intuition:
      "Imagine playing a game of telephone across 100 people. Each person slightly distorts the message. By the time it reaches person 1 (the first layer/token), the message is unrecognizable. Vanishing gradients are the same thing: the learning signal from the final loss gets distorted and shrunk at each layer until it's essentially zero. Transformers solve this with residual connections — shortcuts that let gradients flow directly through.",
    keyPoints: [
      "Solution for deep networks: residual connections (ResNet, transformers) + layer normalization",
      "Solution for sequences: attention (direct connection from any token to any other)",
      "Gradient clipping is also used: if gradient norm exceeds a threshold, scale it down",
      "The 1/√d_k scaling in attention prevents dot products from growing large (which would saturate softmax and cause vanishing gradients)",
    ],
    resources: [],
    relatedConcepts: ["rnn", "transformer-motivation", "self-attention", "layer-normalization"],
  },
  {
    slug: "transformer-motivation",
    title: "Why Transformers?",
    difficulty: "intermediate",
    category: "Sequence Models",
    week: 1,
    emoji: "⚡",
    tagline: "The three problems transformers solved that RNNs couldn't",
    description:
      "The transformer architecture (Vaswani et al., 2017) replaced RNNs by solving three fundamental problems: sequential computation, vanishing gradients, and fixed-size information bottlenecks — all at once, through the attention mechanism.",
    intuition:
      "RNNs read left-to-right, one token at a time. To understand 'The animal didn't cross the street because it was too tired', an RNN has to hold 'The animal' in its hidden state while processing 'cross', 'street', 'because' — by the time it reaches 'it', the animal information has faded. Attention lets 'it' directly look at 'animal', regardless of distance. No information loss.",
    keyPoints: [
      "Problem 1: Sequential → Parallel. RNNs compute h_t from h_{t-1} — inherently sequential. Attention is O(n²) but all positions computed simultaneously on GPU.",
      "Problem 2: Vanishing gradients. RNNs: gradient × weight × ... × weight (shrinks). Transformers: residual connections = gradient highway straight through.",
      "Problem 3: Information bottleneck. RNNs compress the whole history into a fixed-size h_t. Attention keeps the full sequence — every token can attend to every other.",
      "Cost: O(n²) attention complexity — GPT-3 with 2048 context length computes 2048×2048 = 4M attention weights per layer per head.",
    ],
    resources: [
      {
        name: "The Illustrated Transformer (Jay Alammar)",
        url: "https://jalammar.github.io/illustrated-transformer/",
        type: "article",
      },
    ],
    relatedConcepts: ["rnn", "vanishing-gradients", "self-attention", "multi-head-attention"],
  },
  {
    slug: "self-attention",
    title: "Self-Attention",
    difficulty: "intermediate",
    category: "Attention & Transformers",
    week: 2,
    emoji: "🔭",
    tagline: "Every token attending to every other token to build contextual representations",
    description:
      "Self-attention computes a new representation for each token by taking a weighted average of all other tokens' values, where weights are determined by query-key compatibility. Tokens that are 'relevant' to each other get high weights.",
    intuition:
      "For each word, self-attention asks: 'Which other words in the sentence should I pay attention to when computing my meaning?' For 'it' in 'The animal crossed the street because it was tired', the answer is 'animal'. The query (what am I looking for?), key (what do I offer?), value (what information do I carry?) decomposition allows soft matching across all positions simultaneously.",
    formula: "Attention(Q, K, V) = softmax(QKᵀ / √d_k) V",
    formulaExplained:
      "Q = query matrix (what am I looking for?), K = key matrix (what do I offer?), V = value matrix (what information do I carry?). The QKᵀ dot product scores compatibility. √d_k prevents saturation. Softmax normalizes to weights. V is then averaged by these weights.",
    pythonCode: `import torch
import torch.nn as nn
import torch.nn.functional as F
import math

def scaled_dot_product_attention(
    Q: torch.Tensor,  # (batch, seq, d_k)
    K: torch.Tensor,  # (batch, seq, d_k)
    V: torch.Tensor,  # (batch, seq, d_v)
    mask: torch.Tensor = None
) -> tuple[torch.Tensor, torch.Tensor]:
    d_k = Q.shape[-1]
    
    # Compute attention scores: (batch, seq, seq)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
    
    # Apply mask (for decoder: mask future positions)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))
    
    # Softmax to get attention weights
    attn_weights = F.softmax(scores, dim=-1)
    
    # Weighted sum of values
    output = torch.matmul(attn_weights, V)
    
    return output, attn_weights`,
    keyPoints: [
      "Q, K, V are all linear projections of the same input sequence (self-attention) — that's the 'self' part",
      "The √d_k scaling is critical: without it, dot products grow large in high dimensions, pushing softmax into saturation",
      "O(n²) complexity — every token attends to every other. This is the bottleneck for long contexts.",
      "Cross-attention (in decoders) uses Q from decoder, K and V from encoder — that's how it 'looks at' the source",
    ],
    resources: [
      {
        name: "Attention Is All You Need (Vaswani et al., 2017)",
        url: "https://arxiv.org/abs/1706.03762",
        type: "paper",
      },
    ],
    tensortonic: "Scaled Dot-Product Attention",
    relatedConcepts: ["multi-head-attention", "positional-encoding", "transformer-motivation"],
  },
  {
    slug: "multi-head-attention",
    title: "Multi-Head Attention",
    difficulty: "intermediate",
    category: "Attention & Transformers",
    week: 2,
    emoji: "🎪",
    tagline: "Running attention in parallel with different learned projections",
    description:
      "Multi-head attention runs h attention operations in parallel, each with its own learned Q, K, V projection matrices. The outputs are concatenated and projected. Each head can focus on different types of relationships simultaneously.",
    intuition:
      "A single attention head might focus on syntactic relationships (subject-verb agreement). Another might focus on semantic relationships (co-reference). Another might focus on positional relationships (nearby words). Running h heads in parallel lets the model capture all these relationship types simultaneously, then combine them.",
    formula: "MultiHead(Q,K,V) = Concat(head_1,...,head_h) W^O  where head_i = Attention(Q W_i^Q, K W_i^K, V W_i^V)",
    pythonCode: `import torch
import torch.nn as nn
import torch.nn.functional as F
import math

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model: int, num_heads: int, dropout: float = 0.1):
        super().__init__()
        assert d_model % num_heads == 0
        
        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads
        
        # Project Q, K, V for all heads at once
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)
        self.dropout = nn.Dropout(dropout)
    
    def split_heads(self, x: torch.Tensor) -> torch.Tensor:
        B, T, _ = x.shape
        # (B, T, d_model) -> (B, h, T, d_k)
        return x.view(B, T, self.num_heads, self.d_k).transpose(1, 2)
    
    def forward(self, Q, K, V, mask=None):
        B = Q.shape[0]
        
        # Project and split into heads
        Q = self.split_heads(self.W_q(Q))  # (B, h, T, d_k)
        K = self.split_heads(self.W_k(K))
        V = self.split_heads(self.W_v(V))
        
        # Scaled dot-product attention for all heads
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)
        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))
        attn = F.softmax(scores, dim=-1)
        
        # Combine heads
        out = torch.matmul(self.dropout(attn), V)  # (B, h, T, d_k)
        out = out.transpose(1, 2).reshape(B, -1, self.d_model)  # (B, T, d_model)
        
        return self.W_o(out)

# BERT-base: 12 heads, d_model=768, so d_k=64 per head`,
    keyPoints: [
      "BERT-base: 12 heads, 768 dimensions → 64 dimensions per head",
      "GPT-3: 96 heads, 12288 dimensions → 128 dimensions per head",
      "Each head sees the full sequence but in a lower-dimensional subspace",
      "The output projection W^O combines information from all heads",
    ],
    resources: [],
    tensortonic: "Multi-Head Attention",
    relatedConcepts: ["self-attention", "positional-encoding", "bert", "layer-normalization"],
  },
  {
    slug: "positional-encoding",
    title: "Positional Encoding",
    difficulty: "intermediate",
    category: "Attention & Transformers",
    week: 2,
    emoji: "📍",
    tagline: "Injecting sequence order information into position-agnostic attention",
    description:
      "Attention has no inherent sense of position — it treats all tokens as an unordered set. Positional encoding adds position information to the token embeddings before attention. The original transformer uses sinusoidal functions; BERT uses learned positional embeddings.",
    intuition:
      "'The dog bit the man' and 'The man bit the dog' have the same tokens but different meanings. Without positional encoding, a transformer would compute the same representation for both. Sinusoidal PE encodes position as a unique pattern of sine and cosine values at different frequencies — like a musical chord that uniquely identifies each position.",
    formula: "PE(pos, 2i) = sin(pos / 10000^{2i/d_model})    PE(pos, 2i+1) = cos(pos / 10000^{2i/d_model})",
    pythonCode: `import torch
import math

def sinusoidal_positional_encoding(seq_len: int, d_model: int) -> torch.Tensor:
    pe = torch.zeros(seq_len, d_model)
    position = torch.arange(0, seq_len).unsqueeze(1).float()
    
    div_term = torch.exp(
        torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model)
    )
    
    pe[:, 0::2] = torch.sin(position * div_term)  # even dimensions
    pe[:, 1::2] = torch.cos(position * div_term)  # odd dimensions
    
    return pe  # shape: (seq_len, d_model)

# BERT uses learned positional embeddings instead:
# nn.Embedding(max_position_embeddings=512, embedding_dim=768)
# Learned PEs can perform slightly better on specific tasks
# but don't generalize beyond the training sequence length`,
    keyPoints: [
      "Sinusoidal PE: deterministic, no training needed, generalizes to longer sequences than seen in training",
      "Learned PE (BERT): better task performance but fixed maximum sequence length (512 for BERT-base)",
      "RoPE (Rotary Position Embedding): used in LLaMA, Mistral — encodes relative positions, better length generalization",
      "ALiBi: bias attention scores by distance instead of adding to embeddings — very efficient for long contexts",
    ],
    resources: [],
    tensortonic: "Positional Encoding",
    relatedConcepts: ["self-attention", "tokenization", "bert"],
  },
  {
    slug: "tokenization",
    title: "Tokenization & BPE",
    difficulty: "intermediate",
    category: "Attention & Transformers",
    week: 2,
    emoji: "✂️",
    tagline: "Splitting text into subword units that balance vocabulary size and coverage",
    description:
      "Tokenization converts raw text into integer IDs that models can process. Byte-Pair Encoding (BPE) — used by GPT and XLM-R — starts with characters and merges the most frequent pairs iteratively, building a vocabulary of common subwords.",
    intuition:
      "Word-level tokenization fails on unseen words ('transformerization' → [UNK]). Character-level creates very long sequences. BPE finds the sweet spot: common words get single tokens ('the', 'is'), rare words are split into subwords ('transformerization' → 'transform', '##er', '##ization'). This handles any word, in any language, with a fixed vocabulary.",
    pythonCode: `# BPE tokenization (what XLM-R uses, via sentencepiece)
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("xlm-roberta-base")

# XLM-R uses SentencePiece BPE with 250k vocab, 100 languages
text_en = "Revenue Operations Manager"
text_fr = "Directeur des Ventes"
text_de = "Vertriebsleiter"

print(tokenizer.tokenize(text_en))
# ['▁Revenue', '▁Operations', '▁Manager']

print(tokenizer.tokenize(text_fr))
# ['▁Directeur', '▁des', '▁Ventes']

print(tokenizer.tokenize(text_de))
# ['▁Vert', 'riebs', 'leiter']  # subword splits for German compound

# The shared multilingual vocabulary is why XLM-R can transfer across languages
# 'Revenue' and 'Revenu' (French income) share the '▁Rev' subword token`,
    keyPoints: [
      "The '##' prefix (BERT) or '▁' prefix (XLM-R/SentencePiece) marks continuation tokens",
      "Vocabulary size tradeoff: large vocab → fewer tokens per sentence but more parameters; small vocab → more tokens, slower",
      "XLM-R's shared multilingual vocabulary is key to cross-lingual transfer — languages share subword representations",
      "Special tokens: [CLS] (classification), [SEP] (separator), [PAD] (padding), [MASK] (for MLM pretraining)",
    ],
    resources: [],
    tensortonic: "BPE Tokenizer",
    relatedConcepts: ["bert", "xlm-r", "positional-encoding"],
  },
  {
    slug: "encoder-decoder",
    title: "Encoder-Only vs Decoder-Only vs Encoder-Decoder",
    difficulty: "intermediate",
    category: "Pretrained Models",
    week: 2,
    emoji: "🏗️",
    tagline: "Three transformer architectures for three different jobs",
    description:
      "The transformer architecture comes in three variants depending on what you need to do: understand text (encoder-only, like BERT), generate text (decoder-only, like GPT), or translate/summarize (encoder-decoder, like T5).",
    intuition:
      "Encoder-only models read the full sequence bidirectionally — they see the whole sentence at once, making them great for understanding. Decoder-only models can only see past tokens (causal masking) — this is what makes them generate text autoregressively. Encoder-decoders combine both: the encoder reads the source, the decoder generates the target.",
    keyPoints: [
      "Encoder-only (BERT, XLM-R): bidirectional attention, best for classification, NER, embeddings — your Week 3 model",
      "Decoder-only (GPT, LLaMA, Mistral): causal attention, best for text generation, few-shot learning",
      "Encoder-decoder (T5, BART): source → target, best for translation, summarization, question answering",
      "The masking is the only difference: encoders have no mask, decoders have a causal mask, cross-attention has no mask",
      "For the Crustdata role: you want encoder models for producing embeddings — decoder models produce one token at a time, bad for retrieval",
    ],
    resources: [],
    relatedConcepts: ["bert", "self-attention", "multi-head-attention", "masked-language-modeling"],
  },
  {
    slug: "bert",
    title: "BERT",
    difficulty: "intermediate",
    category: "Pretrained Models",
    week: 2,
    emoji: "🤗",
    tagline: "Bidirectional encoder pretrained on Masked Language Modeling",
    description:
      "BERT (Bidirectional Encoder Representations from Transformers) introduced the pretrain-then-fine-tune paradigm. Pretrained on two tasks — Masked Language Modeling (predict masked tokens) and Next Sentence Prediction — on 3.3B words. Fine-tuned on downstream tasks by adding a task-specific head.",
    intuition:
      "BERT is like a student who read every page of Wikipedia and BookCorpus. Now you can give them a new task (sentiment analysis, NER, QA) and they only need a small amount of new labeled data to become expert — because they already have a deep understanding of language. The [CLS] token aggregates a whole-sentence representation used for classification.",
    pythonCode: `from transformers import AutoTokenizer, AutoModel
import torch

model_name = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

# Encode a sentence
text = "Revenue Operations Manager"
inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)

with torch.no_grad():
    outputs = model(**inputs)

# Option 1: Use [CLS] token as sentence representation
cls_embedding = outputs.last_hidden_state[:, 0, :]  # (1, 768)

# Option 2: Mean pooling over all tokens (better for semantic similarity)
token_embeddings = outputs.last_hidden_state  # (1, seq_len, 768)
attention_mask = inputs['attention_mask']
mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
mean_embedding = (token_embeddings * mask_expanded).sum(1) / mask_expanded.sum(1)`,
    keyPoints: [
      "BERT-base: 12 layers, 12 attention heads, 768 hidden size, 110M parameters",
      "BERT-large: 24 layers, 16 heads, 1024 hidden size, 340M parameters",
      "MLM pretraining: randomly mask 15% of tokens, predict them — forces bidirectional understanding",
      "RoBERTa improved BERT by: more data, longer training, no NSP task, dynamic masking",
      "Key insight: BERT's contextual embeddings mean 'bank' in 'river bank' ≠ 'bank' in 'bank account'",
    ],
    resources: [
      {
        name: "The Illustrated BERT (Jay Alammar)",
        url: "https://jalammar.github.io/illustrated-bert/",
        type: "article",
      },
    ],
    relatedConcepts: ["masked-language-modeling", "sentence-embeddings", "sentence-bert", "xlm-r"],
  },
  {
    slug: "masked-language-modeling",
    title: "Masked Language Modeling",
    difficulty: "intermediate",
    category: "Pretrained Models",
    week: 2,
    emoji: "🎭",
    tagline: "Pretraining by predicting randomly masked tokens",
    description:
      "MLM is BERT's pretraining objective: randomly mask 15% of tokens, ask the model to predict them. This forces bidirectional understanding — to predict [MASK], the model must understand the full context on both sides.",
    intuition:
      "If I give you 'The [MASK] chased the mouse', you immediately know it's 'cat' (or 'dog', or 'owl'). To predict this, you need to understand both 'The' (before) and 'chased the mouse' (after). This is how MLM forces BERT to learn deep bidirectional language understanding — from raw text, with no human labels.",
    keyPoints: [
      "15% of tokens are masked: 80% replaced with [MASK], 10% replaced with random word, 10% kept unchanged",
      "The 10/10 split prevents the model from learning to always predict based on the [MASK] token",
      "At inference, there are no [MASK] tokens — only the embeddings from the encoder are used",
      "GPT's causal language modeling (predict next token) is simpler but only unidirectional — worse for embeddings",
    ],
    resources: [],
    relatedConcepts: ["bert", "tokenization", "encoder-decoder"],
  },
  {
    slug: "sentence-embeddings",
    title: "Sentence Embeddings",
    difficulty: "intermediate",
    category: "Pretrained Models",
    week: 2,
    emoji: "📦",
    tagline: "Compressing whole sentences into fixed-size vectors for comparison",
    description:
      "Sentence embeddings map entire sentences to fixed-size vectors such that semantically similar sentences are close in the embedding space. They enable efficient large-scale similarity search — the core of semantic search systems.",
    intuition:
      "You want 'RevOps professionals' to return 'Head of Revenue Department', 'VP Sales Operations', and 'Revenue Operations Lead' — not 'Software Engineer'. Sentence embeddings encode meaning, not just words. If you train them right (with contrastive learning), the embedding space becomes a map where proximity means semantic similarity.",
    pythonCode: `from sentence_transformers import SentenceTransformer
import numpy as np

# Load a multilingual model
model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

# Encode sentences (English and French)
sentences = [
    "Revenue Operations Manager",
    "Head of Revenue Department",
    "VP Sales Operations",
    "Directeur des Ventes",      # French: Sales Director
    "Software Engineer",
    "Ingénieur Logiciel",        # French: Software Engineer
]

embeddings = model.encode(sentences, normalize_embeddings=True)
# Shape: (6, 384) — 384-dimensional embeddings, unit-normalized

# Compute similarity matrix
similarity = np.dot(embeddings, embeddings.T)
# Revenue Operations Manager ↔ Head of Revenue Department: ~0.82
# Revenue Operations Manager ↔ Software Engineer: ~0.31
# Revenue Operations Manager ↔ Directeur des Ventes: ~0.71 (cross-lingual!)`,
    keyPoints: [
      "Mean pooling over token embeddings outperforms [CLS] for semantic similarity tasks",
      "Unit normalization before inner product = cosine similarity (needed for FAISS IndexFlatIP)",
      "Off-the-shelf models work surprisingly well — fine-tuning improves domain-specific performance by 10-20%",
      "Multilingual models share an embedding space across languages — 'cat' and 'chat' (French) are close",
    ],
    resources: [],
    tensortonic: "Sentence Embeddings",
    relatedConcepts: ["bert", "sentence-bert", "faiss", "contrastive-learning"],
  },
  {
    slug: "sentence-bert",
    title: "Sentence-BERT",
    difficulty: "intermediate",
    category: "Pretrained Models",
    week: 2,
    emoji: "🔗",
    tagline: "Siamese BERT networks for efficient sentence similarity",
    description:
      "Sentence-BERT (SBERT) adapts BERT for efficient semantic textual similarity using a Siamese network architecture with triplet loss or cosine-similarity loss. Key insight: vanilla BERT requires O(n²) comparisons for n sentences; SBERT is O(n).",
    intuition:
      "Vanilla BERT compares sentences by concatenating them and computing joint attention. To find the most similar sentence among 10,000, you'd need 10,000 forward passes. SBERT instead encodes each sentence independently into an embedding. Then you just compute cosine similarities — 10,000 → 1 forward passes. This makes large-scale search feasible.",
    keyPoints: [
      "Siamese network: two identical BERT encoders sharing weights, trained together",
      "The O(n²) → O(n) improvement makes search over millions of sentences feasible",
      "Fine-tuned on NLI (entailment/contradiction/neutral) and STS (semantic textual similarity) tasks",
      "This is Paper 2 in the FastNLP project — implement the siamese training loop from scratch",
      "Modern sentence-transformers library by the original SBERT authors: pip install sentence-transformers",
    ],
    resources: [
      {
        name: "Sentence-BERT paper (Reimers & Gurevych, 2019)",
        url: "https://arxiv.org/abs/1908.10084",
        type: "paper",
      },
    ],
    relatedConcepts: ["bert", "sentence-embeddings", "contrastive-learning", "siamese-network"],
  },
  {
    slug: "siamese-network",
    title: "Siamese Networks",
    difficulty: "intermediate",
    category: "Training Techniques",
    week: 2,
    emoji: "👯",
    tagline: "Two identical networks with shared weights trained to measure similarity",
    description:
      "A Siamese network runs two identical subnetworks with shared weights on two inputs and computes a similarity/distance score between their outputs. Sharing weights enforces symmetry: f(A,B) = f(B,A), and ensures both inputs are encoded in the same embedding space.",
    intuition:
      "Think of two identical scales with shared calibration. If you put 'RevOps Manager' on one and 'Head of Revenue' on the other, both are measured by the same yardstick — so their output vectors can be meaningfully compared. Sharing weights is crucial: without it, one tower might learn to encode 'RevOps' while the other encodes something different entirely.",
    keyPoints: [
      "Weight sharing is essential — both encoders must use the same representation space",
      "Training objective: pull positive pairs close, push negative pairs apart in embedding space",
      "Used in: SBERT, face verification (FaceNet), signature verification, duplicate detection",
      "Contrast with cross-encoder: concatenate both inputs, attend jointly, get one score — more accurate but O(n²)",
    ],
    resources: [],
    relatedConcepts: ["sentence-bert", "contrastive-learning", "triplet-loss"],
  },
  {
    slug: "xlm-r",
    title: "XLM-RoBERTa",
    difficulty: "intermediate",
    category: "Pretrained Models",
    week: 2,
    emoji: "🌍",
    tagline: "Massively multilingual encoder pretrained on 100 languages",
    description:
      "XLM-RoBERTa is a multilingual encoder pretrained on 2.5TB of filtered CommonCrawl text across 100 languages using the RoBERTa training procedure. It creates a single embedding space shared across all languages — enabling zero-shot cross-lingual transfer.",
    intuition:
      "XLM-R reads so much text in so many languages that it discovers language-agnostic concepts. 'Cat', 'chat' (French), 'Katze' (German) all activate the same region of the embedding space — because they appear near 'pet', 'meow', 'vet' in their respective languages. You train on English data and test on French — it just works.",
    pythonCode: `from transformers import AutoTokenizer, AutoModel
from sentence_transformers import SentenceTransformer

# Option 1: Use directly
model = SentenceTransformer('paraphrase-multilingual-mpnet-base-v2')

# Option 2: Fine-tune xlm-roberta-base with sentence-transformers
from sentence_transformers import SentenceTransformer, losses
from torch.utils.data import DataLoader
from sentence_transformers import InputExample

# Load base multilingual model
model = SentenceTransformer('xlm-roberta-base')

# Training pairs: (raw_title, canonical_title)
train_examples = [
    InputExample(texts=["Head of Rev Dept", "Revenue Operations Manager"]),
    InputExample(texts=["Directeur Commercial", "Sales Director"]),
    InputExample(texts=["VP Sales Ops", "VP Revenue Operations"]),
]

train_dataloader = DataLoader(train_examples, shuffle=True, batch_size=32)

# MultipleNegativesRankingLoss = SimCSE-style in-batch negatives
train_loss = losses.MultipleNegativesRankingLoss(model)

model.fit(
    train_objectives=[(train_dataloader, train_loss)],
    epochs=5,
    warmup_steps=100,
    output_path='models/xlmr-job-titles-v1'
)`,
    keyPoints: [
      "Trained on 100 languages — includes English, French, German, Spanish, Portuguese, and 95 others",
      "SentencePiece BPE tokenizer with 250,000 shared vocabulary tokens across all languages",
      "Zero-shot cross-lingual transfer: train on English labeled data, test on French with no French training",
      "Outperforms mBERT significantly on cross-lingual tasks — better at transfer, better multilingual coverage",
      "This is the backbone model for the FastNLP project — xlm-roberta-base is your starting point",
    ],
    resources: [
      {
        name: "XLM-R paper (Conneau et al., 2020)",
        url: "https://arxiv.org/abs/1911.02116",
        type: "paper",
      },
    ],
    relatedConcepts: ["bert", "multilingual-nlp", "cross-lingual-transfer", "tokenization"],
  },
  {
    slug: "multilingual-nlp",
    title: "Multilingual NLP",
    difficulty: "advanced",
    category: "Pretrained Models",
    week: 2,
    emoji: "🗺️",
    tagline: "Building NLP systems that work across multiple languages",
    description:
      "Multilingual NLP covers techniques for building models that process text in multiple languages — through shared multilingual models, cross-lingual transfer, or language-specific adaptation.",
    keyPoints: [
      "Translate-train: translate all data to English, train English-only model. Simple but loses nuance.",
      "Native multilingual: train directly on multilingual data. Requires more training data per language.",
      "Zero-shot transfer: train on high-resource language (English), test on low-resource (Swahili). Works surprisingly well with XLM-R.",
      "The curse of multilinguality: a fixed model capacity split across 100 languages → worse per-language than dedicated models",
      "For job titles: ~30 languages needed for global professional data. XLM-R covers all of them.",
    ],
    resources: [],
    relatedConcepts: ["xlm-r", "cross-lingual-transfer", "tokenization"],
  },
  {
    slug: "cross-lingual-transfer",
    title: "Cross-Lingual Transfer",
    difficulty: "advanced",
    category: "Pretrained Models",
    week: 2,
    emoji: "🔀",
    tagline: "Transferring knowledge learned in one language to another",
    description:
      "Cross-lingual transfer is the ability of a multilingual model to apply knowledge learned in one language (typically English, which has the most training data) to tasks in other languages without any language-specific training.",
    intuition:
      "XLM-R discovers that 'Revenue' and 'Revenu' (French) both appear near words like 'annual', 'fiscal', 'growth'. This shared context creates aligned representations. When you fine-tune on English job title pairs, the model updates the shared representation — and French/German tokens that share the same semantic neighborhood automatically benefit.",
    keyPoints: [
      "Works best for typologically similar languages (Spanish → Portuguese > Spanish → Japanese)",
      "XLM-R achieves ~70-75% of supervised performance in target languages with zero training data",
      "The shared SentencePiece vocabulary is key: 'Revenue' and 'Revenu' share the '▁Rev' subword",
      "Negative transfer is possible: adding too many very different languages can hurt performance on all",
    ],
    resources: [],
    relatedConcepts: ["xlm-r", "multilingual-nlp", "sentence-embeddings"],
  },
  {
    slug: "layer-normalization",
    title: "Layer Normalization",
    difficulty: "intermediate",
    category: "Attention & Transformers",
    week: 2,
    emoji: "📏",
    tagline: "Normalizing across features per token — the transformer's normalization of choice",
    description:
      "Layer normalization normalizes the activations across the feature dimension (rather than batch dimension), computing mean and variance over each token's features independently. This makes it invariant to batch size and sequence length.",
    formula: "LN(x) = γ × (x - μ) / √(σ² + ε) + β",
    keyPoints: [
      "Pre-LN (normalize before sublayers — GPT-2 style) trains more stably than Post-LN (original transformer)",
      "Works for any batch size including 1 — critical for autoregressive generation",
      "γ (scale) and β (shift) are learned per-feature — let the model undo normalization if needed",
      "RMS Norm (LLaMA) removes the mean subtraction for simplicity and speed",
    ],
    resources: [],
    relatedConcepts: ["batch-normalization", "multi-head-attention", "bert"],
  },
  {
    slug: "contrastive-learning",
    title: "Contrastive Learning",
    difficulty: "advanced",
    category: "Training Techniques",
    week: 3,
    emoji: "🧲",
    tagline: "Training by pulling similar pairs together and pushing dissimilar pairs apart",
    description:
      "Contrastive learning trains an encoder by minimizing distance between positive pairs (semantically similar) and maximizing distance between negative pairs (dissimilar). It learns a geometry of the embedding space rather than predicting specific outputs.",
    intuition:
      "Imagine organizing a library where similar books must be on the same shelf and different books must be in different sections. Contrastive learning trains the encoder to be the librarian — learning what 'similar' means purely from examples of similar and different pairs, without explicit labels for every possible book.",
    keyPoints: [
      "Positive pairs: augmented views of the same example (SimCSE), paraphrase pairs (SBERT), or manually labeled pairs",
      "Negative pairs: in-batch negatives are free — every other example in the batch is a negative",
      "Larger batch size = more negatives = better signal (but more memory)",
      "Hard negatives: negatives that are semantically close but not positive — hardest and most informative",
      "In-batch negatives assumption: random pairs in a batch are unlikely to be actually positive",
    ],
    resources: [],
    relatedConcepts: ["triplet-loss", "simcse", "sentence-bert", "in-batch-negatives"],
  },
  {
    slug: "triplet-loss",
    title: "Triplet Loss",
    difficulty: "advanced",
    category: "Training Techniques",
    week: 3,
    emoji: "🔺",
    tagline: "Training embeddings with anchor-positive-negative triplets",
    description:
      "Triplet loss trains embeddings using triplets (anchor, positive, negative). It minimizes the distance between anchor and positive while maximizing the distance between anchor and negative, subject to a margin.",
    formula: "L = max(0, d(a, p) - d(a, n) + margin)",
    formulaExplained:
      "d = distance (e.g., 1 - cosine_similarity). The loss is 0 when d(a,n) > d(a,p) + margin — the negative is already far enough away. Otherwise, we penalize proportionally.",
    pythonCode: `import torch
import torch.nn.functional as F

def triplet_loss(anchor, positive, negative, margin: float = 0.5) -> torch.Tensor:
    """
    anchor, positive, negative: (batch, embedding_dim)
    All should be L2-normalized
    """
    # Cosine distance = 1 - cosine_similarity
    d_pos = 1 - F.cosine_similarity(anchor, positive)  # want this small
    d_neg = 1 - F.cosine_similarity(anchor, negative)  # want this large
    
    # Triplet loss: max(0, d_pos - d_neg + margin)
    loss = F.relu(d_pos - d_neg + margin)
    
    return loss.mean()

# Hard negative mining: don't pick random negatives —
# pick the hardest ones (closest to anchor that aren't positives)
# This dramatically speeds up training convergence`,
    keyPoints: [
      "Margin controls how far apart positives and negatives must be — typically 0.3-0.5",
      "Easy triplets (loss=0) waste training time — hard negative mining selects the most informative triplets",
      "Semi-hard negatives (further than positive, but within margin) often train better than the hardest",
      "MultipleNegativesRankingLoss (SBERT library) is more efficient: uses in-batch negatives, no triplet construction needed",
    ],
    resources: [],
    tensortonic: "Triplet Loss",
    relatedConcepts: ["contrastive-learning", "simcse", "siamese-network"],
  },
  {
    slug: "simcse",
    title: "SimCSE",
    difficulty: "advanced",
    category: "Training Techniques",
    week: 3,
    emoji: "🎯",
    tagline: "Contrastive sentence embeddings using dropout as data augmentation",
    description:
      "SimCSE (Simple Contrastive Learning of Sentence Embeddings) dramatically improves sentence embeddings by using dropout as data augmentation. Pass the same sentence through the encoder twice with different dropout masks — the two resulting embeddings are positive pairs. No extra data needed.",
    intuition:
      "Dropout randomly drops 10% of neurons each forward pass. Pass 'Revenue Operations Manager' through the encoder twice — you get two slightly different embeddings from the same sentence. These are your positive pair. In-batch negatives are all other sentences. Training makes the model invariant to small perturbations (dropout noise) while distinguishing different sentences.",
    keyPoints: [
      "Unsupervised SimCSE: only needs raw text (positive = dropout augmentation, no labels)",
      "Supervised SimCSE: uses NLI datasets (entailment = positive, contradiction = hard negative)",
      "Dropout as augmentation is elegant — two forward passes of the same sentence with standard dropout",
      "Uses in-batch negatives with NT-Xent loss (same as used in SimCLR for vision)",
      "This is Paper 3 in the FastNLP project — the technique you apply via MultipleNegativesRankingLoss",
    ],
    resources: [
      {
        name: "SimCSE paper (Gao et al., EMNLP 2021)",
        url: "https://arxiv.org/abs/2104.08821",
        type: "paper",
      },
    ],
    relatedConcepts: ["contrastive-learning", "triplet-loss", "dropout", "sentence-bert"],
  },
  {
    slug: "fine-tuning",
    title: "Fine-Tuning Pretrained Models",
    difficulty: "intermediate",
    category: "Training Techniques",
    week: 3,
    emoji: "🎛️",
    tagline: "Adapting a pretrained model to a specific task with task-specific data",
    description:
      "Fine-tuning starts from a pretrained model's weights (like XLM-R) and continues training on task-specific data. The model's general language understanding transfers, so you need much less data and training time than training from scratch.",
    pythonCode: `from sentence_transformers import SentenceTransformer, losses, InputExample
from torch.utils.data import DataLoader

# Load pretrained multilingual model
model = SentenceTransformer('xlm-roberta-base')

# Prepare training data
train_examples = [
    InputExample(texts=["raw title", "canonical title"]),
    # ... 1000 more pairs
]

train_dataloader = DataLoader(train_examples, shuffle=True, batch_size=32)

# SimCSE-style loss: treats each (raw, canonical) pair as positive
# All other pairs in the batch are negatives
train_loss = losses.MultipleNegativesRankingLoss(model)

# Training with warmup and learning rate scheduling
model.fit(
    train_objectives=[(train_dataloader, train_loss)],
    epochs=5,
    warmup_steps=int(len(train_dataloader) * 0.1),  # 10% warmup
    optimizer_params={'lr': 2e-5},  # standard fine-tuning LR for transformers
    output_path='models/xlmr-finetuned'
)`,
    keyPoints: [
      "Learning rate for fine-tuning (1e-5 to 5e-5) is much lower than training from scratch (1e-3)",
      "Warmup: linearly increase LR for first 10% of steps, then decay — prevents early catastrophic forgetting",
      "Catastrophic forgetting: fine-tuning can destroy pretrained knowledge — lower LR and fewer epochs mitigate this",
      "Domain-specific fine-tuning (job titles) will outperform general models by 10-20% on domain data",
    ],
    resources: [],
    relatedConcepts: ["sentence-bert", "xlm-r", "contrastive-learning", "simcse"],
  },
  {
    slug: "in-batch-negatives",
    title: "In-Batch Negatives",
    difficulty: "advanced",
    category: "Training Techniques",
    week: 3,
    emoji: "⚡",
    tagline: "Using other examples in the batch as free negative samples",
    description:
      "In-batch negative sampling treats all other examples in a training batch as negative samples for each anchor. In a batch of 32 pairs, each anchor has 31 negatives for free — no extra data or labeling needed.",
    intuition:
      "In a batch containing 'RevOps Manager', 'Software Engineer', 'HR Director', 'Finance Analyst'... each title is a natural negative for every other title. This is efficient: a batch of 32 gives each example 31 negatives simultaneously. Larger batches = more negatives = better contrastive signal. This is why SimCSE and SBERT recommend batch sizes of 64+.",
    keyPoints: [
      "The false negative problem: in a large batch, two 'negative' pairs might actually be semantically similar",
      "Deduplication and hard negative filtering are important for high-quality training",
      "GPU memory is the bottleneck — batch size 128 with XLM-R requires significant VRAM",
      "MultipleNegativesRankingLoss in sentence-transformers implements this efficiently",
    ],
    resources: [],
    relatedConcepts: ["contrastive-learning", "simcse", "triplet-loss"],
  },
  {
    slug: "multi-task-learning",
    title: "Multi-Task Learning",
    difficulty: "advanced",
    category: "Training Techniques",
    week: 3,
    emoji: "🎭",
    tagline: "Training one model on multiple tasks simultaneously for better generalization",
    description:
      "Multi-task learning trains a shared encoder on multiple objectives simultaneously. The shared representations benefit from each task — seniority classification regularizes the embeddings learned for semantic similarity, and vice versa.",
    pythonCode: `import torch
import torch.nn as nn

class JobTitleModel(nn.Module):
    def __init__(self, encoder, d_model=768, num_seniority=6, num_function=8):
        super().__init__()
        self.encoder = encoder
        
        # Task-specific heads
        self.seniority_head = nn.Linear(d_model, num_seniority)
        self.function_head = nn.Linear(d_model, num_function)
        
        self.dropout = nn.Dropout(0.1)
    
    def forward(self, input_ids, attention_mask):
        # Shared encoder
        outputs = self.encoder(input_ids=input_ids, attention_mask=attention_mask)
        pooled = outputs.last_hidden_state[:, 0]  # [CLS] token
        pooled = self.dropout(pooled)
        
        # Task-specific predictions
        seniority_logits = self.seniority_head(pooled)
        function_logits = self.function_head(pooled)
        
        return seniority_logits, function_logits

# Combined loss
def compute_loss(model, batch, alpha=0.5):
    sen_logits, fn_logits = model(**batch['inputs'])
    
    sen_loss = F.cross_entropy(sen_logits, batch['seniority_labels'])
    fn_loss = F.cross_entropy(fn_logits, batch['function_labels'])
    
    # L_total = L_contrastive + alpha * L_seniority + alpha * L_function
    total_loss = sen_loss + alpha * fn_loss
    return total_loss`,
    keyPoints: [
      "Regularization effect: secondary tasks prevent the encoder from overfitting to the primary task",
      "Task weighting: balance tasks with α coefficients — equal weighting is a good starting point",
      "Related tasks help most: seniority and function classification both use job title semantics",
      "Gradient conflicts: gradients from different tasks may conflict — gradient surgery or PCGrad mitigate this",
    ],
    resources: [],
    relatedConcepts: ["fine-tuning", "contrastive-learning", "sentence-bert"],
  },
  {
    slug: "faiss",
    title: "FAISS — Vector Similarity Search",
    difficulty: "advanced",
    category: "Search & Retrieval",
    week: 3,
    emoji: "🔍",
    tagline: "Facebook's library for billion-scale nearest neighbor search",
    description:
      "FAISS (Facebook AI Similarity Search) enables efficient similarity search over large collections of dense vectors. It supports exact and approximate nearest neighbor search with various index types that trade accuracy for speed.",
    pythonCode: `import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('your-finetuned-model')

# Encode all canonical titles
canonical_titles = ["Revenue Operations Manager", "Sales Director", ...]
embeddings = model.encode(canonical_titles, normalize_embeddings=True)
embeddings = np.array(embeddings, dtype=np.float32)

d = embeddings.shape[1]  # embedding dimension (e.g., 768)

# IndexFlatIP: exact search using inner product (= cosine sim for normalized vectors)
index = faiss.IndexFlatIP(d)
index.add(embeddings)

# Query: semantic search
query = "RevOps professionals"
query_embedding = model.encode([query], normalize_embeddings=True)
query_embedding = np.array(query_embedding, dtype=np.float32)

# Search: returns (distances, indices) for top-k nearest neighbors
k = 10
distances, indices = index.search(query_embedding, k)

# Results
for i, (dist, idx) in enumerate(zip(distances[0], indices[0])):
    print(f"{i+1}. {canonical_titles[idx]} (similarity: {dist:.3f})")`,
    keyPoints: [
      "IndexFlatIP: exact search — O(n) per query, use for datasets up to ~1M vectors",
      "IndexIVFFlat: approximate search with inverted file index — 10-100x faster, ~1-2% accuracy loss",
      "IndexHNSW: graph-based approximate search — very fast queries, higher memory usage",
      "Always L2-normalize vectors before IndexFlatIP to get cosine similarity from inner product",
      "For Crustdata's scale (100M+ profiles): HNSW or IVF is necessary — flat search won't scale",
    ],
    resources: [
      {
        name: "FAISS documentation",
        url: "https://faiss.ai/",
        type: "docs",
      },
    ],
    relatedConcepts: ["dense-retrieval", "ann-search", "sentence-embeddings", "cosine-similarity"],
  },
  {
    slug: "dense-retrieval",
    title: "Dense Retrieval",
    difficulty: "advanced",
    category: "Search & Retrieval",
    week: 3,
    emoji: "🎯",
    tagline: "Retrieval using dense neural embeddings instead of sparse term matching",
    description:
      "Dense retrieval uses neural embeddings for search — encode queries and documents into the same vector space, retrieve by nearest neighbor. Contrasts with sparse retrieval (BM25, TF-IDF) which matches on exact term overlap.",
    keyPoints: [
      "BM25 (sparse): exact term match, very fast, no semantic understanding. 'RevOps' won't match 'Revenue Operations'.",
      "Dense retrieval: semantic matching, requires GPU encoding, finds synonyms and paraphrases",
      "Hybrid search: BM25 + dense retrieval combined — outperforms either alone on most benchmarks",
      "DPR (Dense Passage Retrieval): the foundational paper for dense retrieval in QA",
      "ColBERT: late interaction — keep token embeddings, compute MaxSim at query time. Better quality, more storage.",
    ],
    resources: [],
    relatedConcepts: ["faiss", "ann-search", "sentence-bert", "sentence-embeddings"],
  },
  {
    slug: "ann-search",
    title: "Approximate Nearest Neighbor Search",
    difficulty: "advanced",
    category: "Search & Retrieval",
    week: 3,
    emoji: "⚡",
    tagline: "Trading small accuracy losses for massive speed gains in vector search",
    description:
      "Approximate Nearest Neighbor (ANN) search finds near-optimal neighbors orders of magnitude faster than exact search by accepting a small accuracy loss. Essential for billion-scale retrieval.",
    keyPoints: [
      "Exact search (IndexFlatIP): O(nd) per query — works for millions, fails for billions",
      "IVF (Inverted File): partition space into Voronoi cells, search only nearby cells — 10-100x speedup",
      "HNSW (Hierarchical Navigable Small World): graph-based, excellent recall/speed tradeoff, 5-10x memory overhead",
      "LSH (Locality Sensitive Hashing): hash similar vectors to same buckets — theoretical guarantees, practical underperformer",
      "Benchmark: ANN-Benchmarks.com compares FAISS, ScaNN, NMSLIB, hnswlib across datasets",
    ],
    resources: [],
    relatedConcepts: ["faiss", "dense-retrieval", "sentence-embeddings"],
  },
  {
    slug: "evaluation-metrics",
    title: "IR Evaluation Metrics",
    difficulty: "advanced",
    category: "Search & Retrieval",
    week: 3,
    emoji: "📊",
    tagline: "Measuring the quality of your retrieval and classification system",
    description:
      "Information retrieval evaluation metrics measure how well a system returns relevant results. The key metrics for the FastNLP project: accuracy@k, MRR, and NDCG.",
    pythonCode: `import numpy as np

def accuracy_at_k(predictions: list[list[int]], targets: list[int], k: int) -> float:
    """What fraction of queries have the correct answer in the top-k results?"""
    correct = sum(1 for pred, target in zip(predictions, targets) if target in pred[:k])
    return correct / len(targets)

def mean_reciprocal_rank(predictions: list[list[int]], targets: list[int]) -> float:
    """Average of 1/rank for the first correct result. Penalizes results ranked lower."""
    reciprocal_ranks = []
    for pred, target in zip(predictions, targets):
        if target in pred:
            rank = pred.index(target) + 1  # 1-indexed
            reciprocal_ranks.append(1 / rank)
        else:
            reciprocal_ranks.append(0)
    return np.mean(reciprocal_ranks)

# Example: for the job title project
# accuracy@1: what % of raw titles map directly to the right canonical?
# MRR: on average, how far down the ranked list is the correct canonical?
# A good system: accuracy@1 > 0.85, MRR > 0.90`,
    keyPoints: [
      "Accuracy@1: strictest — exact match to top-1 result. Report this as your headline number.",
      "Accuracy@3: is the correct answer in the top 3? Useful for reranking scenarios.",
      "MRR: penalizes results lower in the ranking — 1st place gets 1.0, 2nd gets 0.5, 3rd gets 0.33",
      "NDCG: handles graded relevance (very relevant / somewhat relevant / irrelevant) — overkill for binary relevance",
    ],
    resources: [],
    relatedConcepts: ["faiss", "dense-retrieval", "ann-search"],
  },
  {
    slug: "embedding-visualization",
    title: "Embedding Visualization with UMAP",
    difficulty: "intermediate",
    category: "Production",
    week: 3,
    emoji: "🗺️",
    tagline: "Visualizing high-dimensional embedding spaces in 2D",
    description:
      "UMAP (Uniform Manifold Approximation and Projection) reduces high-dimensional embeddings (768d) to 2D or 3D for visualization while preserving local structure. Use it to see whether your fine-tuning is creating meaningful clusters.",
    pythonCode: `import umap
import numpy as np
import plotly.express as px

# Encode all your job titles
embeddings = model.encode(all_titles, normalize_embeddings=True)

# Reduce to 2D with UMAP
reducer = umap.UMAP(n_neighbors=15, min_dist=0.1, metric='cosine', random_state=42)
embedding_2d = reducer.fit_transform(embeddings)

# Visualize with Plotly — color by job function
fig = px.scatter(
    x=embedding_2d[:, 0],
    y=embedding_2d[:, 1],
    color=job_functions,
    hover_data={'title': all_titles},
    title="Job Title Embeddings — Fine-tuned XLM-R"
)
fig.show()

# Before fine-tuning: scattered, no clear clusters
# After fine-tuning: tight clusters by job function with seniority gradients within each cluster
# This before/after comparison is your demo's hero image`,
    keyPoints: [
      "UMAP preserves local structure better than t-SNE and is much faster on large datasets",
      "n_neighbors controls local vs global structure tradeoff — 15-50 is typical",
      "Random initialization means every run looks slightly different — set random_state for reproducibility",
      "The before/after comparison is the most compelling single visualization for your demo",
    ],
    resources: [],
    relatedConcepts: ["sentence-embeddings", "fine-tuning", "evaluation-metrics"],
  },
  {
    slug: "llm-as-labeler",
    title: "LLM as Weak Supervisor",
    difficulty: "intermediate",
    category: "Production",
    week: 1,
    emoji: "🤖",
    tagline: "Using LLMs to generate training labels cheaply at scale",
    description:
      "Instead of manual annotation, use a capable LLM (GPT-4o, Claude) to generate training labels. For job title normalization: prompt the LLM to generate 20 noisy variants of each canonical title, including translations. Cost: ~$2 for 1,000 labeled examples.",
    pythonCode: `import anthropic
import json

client = anthropic.Anthropic()

def generate_title_variants(canonical_title: str, n_variants: int = 20) -> list[dict]:
    prompt = f"""Generate {n_variants} real-world job title variants for '{canonical_title}'.
    
Include:
- Common abbreviations (VP, Dir, Mgr, Sr., etc.)
- Alternative naming conventions  
- LinkedIn-style informal titles
- French translations (5 variants)
- German translations (3 variants)
- Spanish translations (2 variants)

Return ONLY a JSON array of objects with fields: raw_title, language.
Example: [{{"raw_title": "Head of Rev Dept", "language": "en"}}]"""

    message = client.messages.create(
        model="claude-3-haiku-20240307",  # cheap + fast
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )
    
    return json.loads(message.content[0].text)

# Generate for 50 canonical titles
canonicals = ["Revenue Operations Manager", "Sales Director", ...]
all_examples = []

for canonical in canonicals:
    variants = generate_title_variants(canonical)
    for v in variants:
        all_examples.append({
            "raw_title": v["raw_title"],
            "canonical": canonical,
            "language": v["language"]
        })

# ~1000 examples for ~$1-2 with claude-3-haiku`,
    keyPoints: [
      "Use cheaper models (Claude Haiku, GPT-4o mini) for data generation — quality is good enough",
      "Always validate a sample of generated labels — LLMs occasionally hallucinate plausible-but-wrong variants",
      "Programmatic generation (templates + rules) can supplement LLM generation for more control",
      "This approach scales to any labeling task: NER, classification, translation, QA pair generation",
    ],
    resources: [],
    relatedConcepts: ["fine-tuning", "contrastive-learning"],
  },
];

export function getConceptBySlug(slug: string): Concept | undefined {
  return concepts.find((c) => c.slug === slug);
}

export function getConceptsByWeek(week: number): Concept[] {
  return concepts.filter((c) => c.week === week);
}

export function getConceptsByCategory(category: Category): Concept[] {
  return concepts.filter((c) => c.category === category);
}

export const DIFFICULTY_ORDER: Difficulty[] = ["beginner", "intermediate", "advanced"];

export const ALL_CATEGORIES: Category[] = [
  "Text Representation",
  "Probability & Loss",
  "Neural Networks",
  "Sequence Models",
  "Attention & Transformers",
  "Pretrained Models",
  "Training Techniques",
  "Search & Retrieval",
  "Production",
];
