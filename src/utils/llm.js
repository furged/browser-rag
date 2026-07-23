console.log("llm.js module loaded");

import { pipeline } from "@huggingface/transformers";

let generator = null;

export async function initializeLLM() {
    if (generator) return;

    generator = await pipeline(
        "text-generation",
        "onnx-community/Llama-3.2-1B-Instruct",
        {
            device: "wasm",
            dtype: "q8",
        }
    );

    console.log("LLM loaded");
    console.log(generator);
    console.log(typeof generator);
}

export async function generateAnswer(question, context) {
    console.log("Entered generateAnswer");

    await initializeLLM();

    const messages = [
        {
            role: "system",
            content:
                "You answer questions only using the provided context. Give a complete answer. Finish your last sentence before stopping. If the answer is not in the context, say: I couldn't find the answer in the uploaded document.",
        },
        {
            role: "user",
            content: `Use ONLY the information below to answer the question.

        === CONTEXT ===
        ${context}

        === QUESTION ===
        ${question}

        === ANSWER ===`,
        },
            ];

    console.log("========== PROMPT ==========");
    console.log(messages);
    console.log("============================");
    console.log("Before generator");
    console.log("typeof generator:", typeof generator);
    console.log("generator value:", generator);

    const output = await generator(messages, {
        max_new_tokens: 128,
    });

    console.log("After generator");

    console.log("Full output:");
    console.dir(output, { depth: null });

    console.log("Generated text:");
    console.log(output[0].generated_text);

    return output[0].generated_text.at(-1).content;
}