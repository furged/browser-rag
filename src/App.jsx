import { chunkText } from "./utils/chunkText";
import { extractTextFromPDF } from "./utils/pdfParser";
import { semanticSearch } from "./utils/semanticSearch";
import { useEffect, useState } from "react";
import {
    initializeModel,
    generateEmbedding,
} from "./utils/embeddings";

function App() {
    const [processedChunks, setProcessedChunks] = useState([]);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    // Load embedding model once
    useEffect(() => {
        async function initialize() {
            await initializeModel();
        }

        initialize();
    }, []);

    async function handlePDFUpload(event) {
        const file = event.target.files[0];

        if (!file) return;

        try {
            // Extract text
            const text = await extractTextFromPDF(file);

            // Split into chunks
            const chunks = chunkText(text);

            // Generate embeddings
            const processed = [];

            for (let i = 0; i < chunks.length; i++) {
                const embedding = await generateEmbedding(chunks[i]);

                processed.push({
                    id: i,
                    text: chunks[i],
                    embedding,
                });
            }

            setProcessedChunks(processed);

            console.log("PDF indexed successfully!");
        } catch (error) {
            console.error("Error processing PDF:", error);
        }
    }

    async function handleSearch() {
        if (!query.trim()) return;

        if (processedChunks.length === 0) {
            alert("Please upload a PDF first.");
            return;
        }

        const searchResults = await semanticSearch(
            query,
            processedChunks
        );

        setResults(searchResults.slice(0, 5));
    }

    return (
        <div>
            <h1>Browser RAG V5</h1>

            <p>Upload a PDF to build a local knowledge base.</p>

            <input
                type="file"
                accept=".pdf"
                onChange={handlePDFUpload}
            />

            <br />
            <br />

            <input
                type="text"
                placeholder="Ask your PDF..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <button
                onClick={handleSearch}
                disabled={processedChunks.length === 0}
            >
                Search
            </button>

            <hr />

            {results.map((chunk) => (
                <div key={chunk.id}>
                    <h3>
                        Similarity: {chunk.similarity.toFixed(3)}
                    </h3>

                    <p>{chunk.text}</p>

                    <hr />
                </div>
            ))}
        </div>
    );
}

export default App;