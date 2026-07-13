
import documents from "./data/documents";
import { useEffect } from "react";
import {
    initializeModel,
    generateEmbedding,
} from "./utils/embeddings";

function App() {
    useEffect(() => {
        

        async function test() {
            await initializeModel();

            const processedDocuments = [];

            for (const document of documents) {
                const embedding = await generateEmbedding(document.text);

                processedDocuments.push({
                    ...document,
                    embedding,
                });
            }

            console.log(processedDocuments);
        }

        test();
    }, []);

    return (
        <div>
            <h1>Browser RAG V3</h1>
            <p>Generating embeddings...</p>
        </div>
    );
}

export default App;