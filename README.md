# Browser RAG

A retrieval-augmented generation (RAG) system built entirely in the browser.

No backend. No vector database. No external APIs.

The goal of this project is to understand how modern RAG systems work by implementing each component from scratch instead of relying on frameworks.

Current pipeline:

```text
Documents
    ↓
Embedding Model
    ↓
Document Embeddings
    ↓
User Query
    ↓
Query Embedding
    ↓
Cosine Similarity
    ↓
Rank Results
```

## Features

- Local embedding generation using `@huggingface/transformers`
- `Supabase/gte-small` embedding model
- Cosine similarity based semantic retrieval
- No OpenAI or external inference APIs
- All document vectors generated and stored in-browser

## Tech Stack

- React
- Vite
- JavaScript
- Transformers.js (`@huggingface/transformers`)
- Supabase/gte-small

## Project Structure

```
src
├── data
│   └── documents.js
├── utils
│   ├── embeddings.js
│   ├── similarity.js
│   └── semanticSearch.js
└── App.jsx
```

## How It Works

### 1. Model Initialization

The embedding model is loaded once when the application starts.

```text
App
 ↓
Load embedding model
 ↓
Reuse model for all future embeddings
```

### 2. Document Processing

Each document is converted into a 384-dimensional embedding.

```text
Document
    ↓
Embedding Model
    ↓
Vector
```

The original documents remain unchanged. Embeddings are stored separately alongside document metadata.

### 3. Query Processing

When a user searches, the query is embedded using the same model.

```text
Query
    ↓
Embedding Model
    ↓
Query Vector
```

### 4. Semantic Retrieval

Each document embedding is compared with the query embedding using cosine similarity.

```text
Query Vector
       ↓
Cosine Similarity
       ↓
Rank Documents
       ↓
Most Relevant Results
```

Unlike keyword search, retrieval is based on semantic similarity rather than exact word matches.

## Current Status

Implemented

- Document preprocessing
- Local embedding generation
- Cosine similarity
- Semantic search
- Ranked retrieval

In Progress

- Top-K retrieval
- PDF ingestion
- Text chunking
- Browser-side vector indexing
- Local LLM inference

## Why?

Most RAG tutorials abstract away the interesting parts behind libraries.

This project intentionally does the opposite.

Every stage of the retrieval pipeline is implemented manually to understand what actually happens between a user query and the retrieved context.

Eventually the entire pipeline—including the language model—will run locally in the browser.

## Roadmap

- [x] Keyword search
- [x] Fuzzy search (Fuse.js)
- [x] Local embeddings
- [x] Cosine similarity search
- [ ] Top-K retrieval
- [ ] PDF parsing
- [ ] Text chunking
- [ ] Local vector store
- [ ] Browser-side LLM inference