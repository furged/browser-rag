import { pipeline } from "@huggingface/transformers";

let extractor = null;
const MODEL_NAME = "Supabase/gte-small";
// Load the embedding model once
export async function initializeModel() {
    if (extractor) {
        return extractor;
    }

    console.log("Loading embedding model...");

    extractor = await pipeline(
        "feature-extraction",
        MODEL_NAME
    );

    console.log("Embedding model loaded!");

    return extractor;
}

// Generate an embedding for one piece of text
export async function generateEmbedding(text) {
    const model = await initializeModel();

    const output = await model(text, {
        pooling: "mean",
        normalize: true,
    });

    return Array.from(output.data);
}