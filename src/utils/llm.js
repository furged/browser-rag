import { pipeline } from "@huggingface/transformers";

let generator = null;

export async function initializeLLM() {
    if (generator) return;

    generator = await pipeline(
        "text-generation",
        "HuggingFaceTB/SmolLM2-360M-Instruct"
    );

    console.log("LLM loaded");
    console.log(generator);
    console.log(typeof generator);
}

export async function generateAnswer(question, context) {
    console.log("Entered generateAnswer");

    const messages = [
        {
            role: "system",
            content:
                "You answer questions only using the provided context. Give a complete answer. Finish your last sentence before stopping. If the answer is not in the context, say: I couldn't find the answer in the uploaded document.",
        },
        {
            role: "user",
            content: `Context:\n${context}\n\nQuestion: ${question}`,
        },
    ];

    console.log("Before generator");

    const output = await generator(messages, {
        max_new_tokens: 128,
    });

    console.log("After generator");
    console.log(output);

    return output[0].generated_text.at(-1).content;
}