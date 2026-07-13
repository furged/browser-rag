
import { generateEmbedding } from "./embeddings";
import { cosineSimilarity } from "./similarity";

export async function semanticSearch(query, processedDocuments) {
    const queryEmbedding = await generateEmbedding(query); // await tells js that pause this fn until the promise finishes, then giv me the result
    const results = [];
    for (const document of processedDocuments) {
        const similarity = cosineSimilarity(
            queryEmbedding, 
            document.embedding
        );
        results.push({
            ...document,
            similarity,
        });
    }

    results.sort((a, b) => b.similarity - a.similarity);
    return results.slice(0, 3);
}