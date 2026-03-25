# FastNLP — NeetCode for NLP

**Go from zero to shipping an NLP system in 4 weeks.** FastNLP is a structured, project-driven curriculum for anyone with basic Python and math who wants to understand modern Natural Language Processing — from n-grams to transformers to production-ready semantic search.

## What is this?

FastNLP is a self-paced learning guide structured like NeetCode — clear progression, tracked concepts, and a real project you ship at the end. By week 4 you'll have:

- Implemented 3 landmark papers (Attention Is All You Need, Sentence-BERT, SimCSE)
- Fine-tuned a multilingual encoder model (XLM-R) with contrastive learning
- Built a semantic search system powered by FAISS
- Shipped a live demo on HuggingFace Spaces

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Fonts**: Syne (display), Plus Jakarta Sans (body), JetBrains Mono (code)
- **Progress tracking**: localStorage (no backend required)

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── page.tsx      # Home / landing
│   ├── curriculum/   # Full 4-week overview
│   ├── week/[week]/  # Week detail pages
│   ├── concepts/     # Concept index + detail pages
│   ├── papers/       # Paper implementations guide
│   └── project/      # The capstone project guide
├── components/       # Shared UI components
├── data/             # All curriculum, concept, and paper data
└── lib/              # Utility functions
```

## Contributing

This site is designed to grow. Planned additions:
- `/solutions` — working code for each TensorTonic problem
- `/blog` — deep dives on individual concepts  
- `/implementations` — full paper implementations in PyTorch

To add a concept, edit `src/data/concepts.ts`.  
To add a week or day, edit `src/data/curriculum.ts`.

## License

MIT
