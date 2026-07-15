import { chunkText } from "./utils/chunkText";
import { extractTextFromPDF } from "./utils/pdfParser";
import { semanticSearch } from "./utils/semanticSearch";
import { useEffect, useState } from "react";
import {
    initializeModel,
    generateEmbedding,
} from "./utils/embeddings";
import { 
    saveChunks,
    loadChunks,
    clearChunks,
    saveDocument,
    loadDocuments,
    deleteChunks,
    deleteDocument
 } from "./utils/database";

function App() {
    const [processedChunks, setProcessedChunks] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);

    // Load embedding model once
    useEffect(() => {
        async function initialize() {
            await initializeModel();

            const savedDocuments = await loadDocuments();
            setDocuments(savedDocuments);

            if (savedDocuments.length > 0) {
                const latestDocument = savedDocuments[savedDocuments.length - 1];

                setSelectedDocument(latestDocument);

                const savedChunks = await loadChunks(latestDocument.id);
                setProcessedChunks(savedChunks);
            }

            
        }

        initialize();
    }, []);

    async function handlePDFUpload(event) {
        console.log("handlePDFUpload called");

        const file = event.target.files[0];
        console.log("1. File selected");

        if (!file) return;

        const document = {
            id: crypto.randomUUID(),
            filename: file.name,
            uploadTime: Date.now(),
        };

        try {
            // Save document metadata
            await saveDocument(document);

            const updatedDocuments = await loadDocuments();

            console.log(updatedDocuments);

            setDocuments(updatedDocuments);

            // Extract text
            const text = await extractTextFromPDF(file);
            console.log("2. PDF parsed");

            // Split into chunks
            const chunks = chunkText(text);
            console.log("3. Chunks:", chunks.length);

            // Generate embeddings
            const processed = [];

            for (let i = 0; i < chunks.length; i++) {
                const embedding = await generateEmbedding(chunks[i]);

                processed.push({
                    id: crypto.randomUUID(),
                    documentId: document.id,
                    text: chunks[i],
                    embedding,
                });
            }

            console.log("4. Embeddings generated");

            // Save chunks
            await saveChunks(processed);
            console.log("Saved:", processed.length);

            

            // Display the newly uploaded document
            setProcessedChunks(processed);
            setSelectedDocument(document);

            console.log("PDF indexed successfully!");
        } catch (error) {
            console.error("Error processing PDF:", error);
        }
    }

    async function handleDocumentSelect(document) {
        console.log("Selected:", document.filename);

        setSelectedDocument(document);

        const chunks = await loadChunks(document.id);

        console.log("Loaded chunks:", chunks);

        setProcessedChunks(chunks);
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

    async function handleDeleteDocument(document) {
        try {
            await deleteChunks(document.id);

            await deleteDocument(document.id);

            const updatedDocuments = await loadDocuments();
            setDocuments(updatedDocuments);

            if (updatedDocuments.length === 0) {
                setSelectedDocument(null);
                setProcessedChunks([]);
                return;
            }

            const nextDocument = updatedDocuments[0];

            setSelectedDocument(nextDocument);

            const chunks = await loadChunks(nextDocument.id);
            setProcessedChunks(chunks);

        } catch (error) {
            console.error("Error deleting document:", error);
        }
    }

    return (
        <div>
            <h1>Browser RAG V6</h1>

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

            <h3>Documents</h3>

                {documents.map((document) => (
                    <div
                        key={document.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "8px",
                        }}
                    >
                        <button
                            onClick={() => handleDocumentSelect(document)}
                            style={{
                                fontWeight:
                                    selectedDocument?.id === document.id
                                        ? "bold"
                                        : "normal",
                            }}
                        >
                            {document.filename}
                        </button>

                        <button
                            onClick={() => handleDeleteDocument(document)}
                        >
                            🗑
                        </button>
                    </div>
                ))}

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