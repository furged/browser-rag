# Browser RAG

A browser-side Retrieval-Augmented Generation (RAG) project built from scratch.

No backend.
No vector database.
No external AI APIs.

The goal is to understand the retrieval pipeline by implementing every step manually instead of hiding it behind frameworks.

## Pipeline

```text
Documents
    ↓
Embeddings
    ↓
Local Vector Store
    ↓
Query Embedding
    ↓
Cosine Similarity
    ↓
Top-K Retrieval
    ↓
(Local LLM - WIP)
```

## Current

- Local embedding generation (`Supabase/gte-small`)
- Cosine similarity search
- Semantic document retrieval
- All processing runs inside the browser

## Project Structure

```
src
├── data/
├── utils/
│   ├── embeddings.js
│   ├── similarity.js
│   └── semanticSearch.js
└── App.jsx
```

## Roadmap

- [x] Keyword search
- [x] Fuzzy search
- [x] Local embeddings
- [x] Semantic retrieval
- [ ] Top-K retrieval
- [ ] PDF ingestion
- [ ] Chunking
- [ ] Browser vector store
- [ ] Local LLM inference

---

This isn't meant to compete with production RAG frameworks.

It's an implementation project built to understand what happens between a user query and a retrieved document.