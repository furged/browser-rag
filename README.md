# Browser RAG — Version 6

> A browser is no longer just the interface. It is now the vector database.

Version 6 solves one of the biggest inefficiencies in the previous iterations.

Until now, every page refresh meant rebuilding the entire retrieval pipeline.

```text
Upload PDF
    ↓
Extract Text
    ↓
Chunk
    ↓
Generate Embeddings
    ↓
Search
```

That worked, but only as long as the page stayed alive.

The moment the browser refreshed, every embedding disappeared and the entire indexing process had to be repeated.

This version changes that.

---

## The Architectural Shift

The browser now persists embeddings locally using **IndexedDB**, allowing the retrieval pipeline to survive page refreshes without relying on any backend, vector database, or cloud storage.

The browser itself becomes the vector store.

```text
                First Upload

          PDF
           │
           ▼
     Text Extraction
           │
           ▼
        Chunking
           │
           ▼
 Local Embedding Generation
           │
           ▼
       IndexedDB Storage

──────────────────────────────────────────────

             Next Browser Launch

           IndexedDB
               │
               ▼
      Load Stored Embeddings
               │
               ▼
      Semantic Search Ready
```

---

## What Changed

Instead of treating embeddings as temporary application state, they are now persisted as browser data.

Every indexed chunk is stored together with its embedding and restored automatically when the application starts.

The retrieval system no longer depends on the indexing pipeline after the first upload.

---

## Browser Database

The project now includes a lightweight persistence layer built directly on top of IndexedDB.

Current schema:

```text
BrowserRAG
│
└── chunks
      ├── id
      ├── text
      └── embedding
```

The database layer exposes a minimal API:

```javascript
openDatabase()
saveChunks(chunks)
loadChunks()
clearChunks()
```

No wrappers.

No abstraction libraries.

Just the browser API.

---

## Why IndexedDB?

Embeddings are numerical vectors.

Persisting thousands of vectors inside LocalStorage is neither practical nor scalable.

IndexedDB allows structured objects, asynchronous operations, and significantly larger storage capacity while remaining entirely client-side.

---

## Current Pipeline

```text
PDF
 │
 ▼
Extract Text
 │
 ▼
Sentence-aware Chunking
 │
 ▼
Generate Embeddings
 │
 ▼
Persist in IndexedDB
 │
 ▼
User Query
 │
 ▼
Query Embedding
 │
 ▼
Cosine Similarity
 │
 ▼
Top-K Retrieval
```

---

## What This Version Does Not Solve

Version 6 intentionally supports a **single indexed document**.

Uploading another PDF replaces the previously indexed knowledge base.

Supporting multiple documents requires document metadata, relationships between documents and chunks, and selective retrieval.

That evolution is intentionally postponed for the next version.

---

## Why This Matters

Most RAG demos stop after generating embeddings.

Version 6 focuses on what production systems actually do:

- avoid recomputing embeddings
- persist vector representations
- restore retrieval state instantly
- keep everything local to the user's machine

The result is a browser-native retrieval system that no longer loses its memory after every refresh.

---

Version 6 completes the transition from an in-memory prototype to a persistent browser-side retrieval engine.