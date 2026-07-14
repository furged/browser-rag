# Browser RAG

A fully browser-side Retrieval-Augmented Generation (RAG) system built completely from scratch.

No backend.

No vector database.

No OpenAI API.

No LangChain.

No LlamaIndex.

Everything—from document ingestion to semantic retrieval—runs locally inside the browser.

The purpose of this project is educational: understand how modern RAG systems work by implementing each component manually.

---

## Pipeline

```text
Upload PDF
      ↓
Extract Text
      ↓
Sentence-aware Chunking
      ↓
Chunk Overlap
      ↓
Local Embeddings
      ↓
Semantic Search
      ↓
Cosine Similarity
      ↓
Top-K Retrieval
      ↓
(Local LLM - WIP)
```

---

## Current Features

- Browser-side PDF upload
- PDF text extraction
- Sentence-aware chunking
- Chunk overlap
- Local embedding generation (`Supabase/gte-small`)
- Manual cosine similarity implementation
- Semantic search
- Top-K retrieval
- Interactive search interface
- 100% browser-side execution

---

## Tech Stack

- React
- Vite
- Transformers.js (`@huggingface/transformers`)
- PDF.js (`pdfjs-dist`)

---

## Project Structure

```text
src
├── utils/
│   ├── embeddings.js
│   ├── pdfParser.js
│   ├── chunkText.js
│   ├── similarity.js
│   └── semanticSearch.js
└── App.jsx
```

---

## Current Architecture

```text
User Uploads PDF
        ↓
Extract Text
        ↓
Chunk Text
        ↓
Generate Embeddings
        ↓
Store Processed Chunks

────────────────────────────

User Query
        ↓
Generate Query Embedding
        ↓
Cosine Similarity
        ↓
Top-K Chunks
        ↓
Display Results
```

---

## Roadmap

- [x] Keyword search
- [x] Fuzzy search
- [x] Local embedding generation
- [x] Semantic retrieval
- [x] PDF ingestion
- [x] Sentence-aware chunking
- [x] Chunk overlap
- [x] Top-K retrieval
- [ ] Browser vector store (IndexedDB)
- [ ] Local LLM inference
- [ ] Streaming responses
- [ ] Multi-document support

---

## Why build this?

Most RAG tutorials rely on frameworks that hide the retrieval pipeline behind a few API calls.

This project intentionally implements the individual components manually to understand how retrieval actually works:

- Embedding generation
- Chunking strategies
- Vector similarity
- Semantic retrieval
- Browser-side inference

The long-term goal is to build a complete browser-native RAG system where every stage runs locally without external AI services.