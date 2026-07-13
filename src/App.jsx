import { semanticSearch } from "./utils/semanticSearch";
import documents from "./data/documents";
import { useEffect, useState } from "react";
import {
    initializeModel,
    generateEmbedding,
} from "./utils/embeddings";

function App() {
    const [processedDocuments, setProcessedDocuments] = useState([]);

    // Generate document embeddings once
    useEffect(() => {
        async function initialize() {
            await initializeModel();

            const processed = [];

            for (const document of documents) {
                const embedding = await generateEmbedding(document.text);

                processed.push({
                    ...document,
                    embedding,
                });
            }

            setProcessedDocuments(processed);
        }

        initialize();
    }, []);

    // Debug: See processed documents
    useEffect(() => {
        console.log(processedDocuments);
    }, [processedDocuments]);

    // Test semantic search
    useEffect(() => {
        if (processedDocuments.length === 0) return;

        async function search() {
            const results = await semanticSearch(
                "Tell me about domestic animals",
                processedDocuments
            );

            console.table(
                results.map((doc) => ({
                    title: doc.title,
                    similarity: doc.similarity,
                }))
            );
        }

        search();
    }, [processedDocuments]);

    return (
        <div>
            <h1>Browser RAG V4</h1>
            <p>Generating embeddings...</p>
        </div>
    );
}

export default App;