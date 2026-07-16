# NativeRAG

> A Retrieval-Augmented Generation system built completely inside the browser.
>
> No backend. No APIs. No vector database. No LangChain. No LlamaIndex.
>
> Just JavaScript, React, IndexedDB, local embeddings, local LLMs, and a lot of curiosity.

---

## So.. Why does this exist?

Most RAG tutorials skip straight to frameworks.

This project does the opposite.

Every major component is implemented manually to understand what actually happens behind libraries like LangChain, LlamaIndex, Pinecone, or ChromaDB.

Instead of treating RAG as a black box, NativeRAG builds every layer from scratch.

```text
PDF
 ↓
Text Extraction
 ↓
Sentence Chunking
 ↓
Local Embedding Generation
 ↓
IndexedDB Vector Store
 ↓
Cosine Similarity Search
 ↓
Top-K Retrieval
 ↓
Local LLM Inference
 ↓
Grounded Answer
```

---

## What it can do (so far)

NativeRAG is currently capable of:

- Uploading multiple PDFs
- Extracting text entirely in the browser
- Sentence-aware chunking with overlap
- Local embedding generation
- Persistent browser-side vector storage
- Semantic search using cosine similarity
- Retrieval-Augmented Generation (RAG)
- Browser-side LLM inference
- Context-aware answer generation
- Multi-document management
- Individual document deletion
- Zero backend infrastructure

No server is involved.

Everything happens locally.

The browser acts as both the application server and the inference engine, making the project completely self-contained after the initial model download.

---

## Engineering decisions

### Browser-side only

The project intentionally avoids cloud services.

There is:

- No Express server
- No FastAPI
- No Supabase database
- No OpenAI API
- No hosted embedding service
- No hosted inference endpoint

The browser performs every operation itself.

---

### Manual Retrieval

Cosine similarity isn't imported from a library.

The project implements:

- Dot Product
- Vector Magnitude
- Cosine Similarity

from scratch before retrieval.

---

### PDFs are weird

Character-based chunking was rejected.

Paragraph chunking was also rejected because PDFs frequently lose formatting.

Instead, NativeRAG performs sentence-aware chunking with configurable overlap to preserve context across neighboring chunks.

---

### Browser Vector Database

Instead of introducing Pinecone or ChromaDB, embeddings are stored inside IndexedDB.

Current architecture:

```text
NativeRAG

documents
    id
    filename
    uploadTime

chunks
    id
    documentId
    text
    embedding
```

Each chunk belongs to exactly one document through `documentId`, creating a one-to-many relationship similar to a relational database.

---

### Local Language Model

The generation stage also runs completely inside the browser.

Instead of calling an external API, NativeRAG executes a local transformer model using Hugging Face Transformers.js.

The retrieval pipeline first finds the most relevant document chunks, then injects them as context for the language model, producing grounded answers without sending user data to any external service.

---

## Evolution

| Version | Focus |
|---------|-------|
| V1 | Manual keyword search |
| V2 | Fuzzy retrieval using Fuse.js |
| V3 | Local embedding generation |
| V4 | Semantic retrieval with cosine similarity |
| V5 | PDF ingestion + intelligent chunking |
| V6 | IndexedDB persistence |
| **V6.5** | Multi-document browser vector database |
| **V7** | Local LLM inference + end-to-end RAG |

Every version builds on the previous one rather than replacing it.

---

## Why this project exists

The goal isn't simply to build another chatbot.

The goal is to understand every layer that modern Retrieval-Augmented Generation systems depend on before relying on abstraction frameworks.

That means implementing:

- PDF parsing
- Chunking
- Embeddings
- Vector storage
- Retrieval
- Local inference
- Document management

manually.

Only after understanding those pieces was a local language model introduced, completing the first end-to-end Retrieval-Augmented Generation pipeline for the project.

---

## Crew

<p>

<img src="https://img.shields.io/badge/React-19-61DAFB?style=plastic&logo=react&logoColor=black"/>

<img src="https://img.shields.io/badge/Vite-7-646CFF?style=plastic&logo=vite&logoColor=white"/>

<img src="https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=plastic&logo=javascript&logoColor=black"/>

<img src="https://img.shields.io/badge/PDF.js-pdfjs--dist-B30B00?style=plastic"/>

<img src="https://img.shields.io/badge/HuggingFace-Transformers-FFD21E?style=plastic"/>

<img src="https://img.shields.io/badge/Embedding-Supabase%2Fgte--small-3ECF8E?style=plastic"/>

<img src="https://img.shields.io/badge/LLM-SmolLM2--360M-FF6B6B?style=plastic"/>

<img src="https://img.shields.io/badge/IndexedDB-Browser%20Storage-4A90E2?style=plastic"/>

</p>

---

## What comes next

Version 7.1 focuses on improving answer quality rather than adding new features.

Planned improvements:

- Better chunk retrieval
- Chunk reranking
- Improved prompting
- Better citations for generated answers
- Faster browser-side inference
- Higher quality grounded responses

After that:

- Hybrid search (keyword + semantic)
- Streaming responses
- Conversation memory
- Better vector indexing
- Swappable local language models

---

> The project intentionally grows one architectural layer at a time. Every feature is implemented first, optimized later, and abstracted only after understanding how it works internally.