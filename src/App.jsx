


import { cosineSimilarity } from "./utils/similarity";
import documents from "./data/documents";
import { useEffect, useState } from "react";
import {
    initializeModel,
    generateEmbedding,
} from "./utils/embeddings";

function App() {
    const [processedDocuments, setProcessedDocuments] = useState([]);
    useEffect(() => {
        

        async function test() {
            

            await initializeModel();

            const cat = await generateEmbedding("Cats are mammals.");
            const dog = await generateEmbedding("Dogs are loyal animals.");
            const fish = await generateEmbedding("Fish live in water.");

            console.log(cosineSimilarity(cat, cat));
            console.log(cosineSimilarity(cat, dog));
            console.log(cosineSimilarity(cat, fish));

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

        test();

    }, []);
    
    useEffect(() => {
        console.log(processedDocuments);
    }, [processedDocuments]);

    return (
        <div>
            <h1>Browser RAG V4</h1>
            <p>Generating embeddings...</p>
        </div>
    );
}

export default App;