import { CreateMLCEngine } from "@mlc-ai/web-llm";

let engine = null;

export async function initializeLLM() {
    if (engine) return;

    engine = await CreateMLCEngine(
        "Qwen2.5-0.5B-Instruct-q4f16_1-MLC",
        {
            initProgressCallback: (progress) => {
                console.log(progress);
            },
        }
    );

    console.log("WebLLM loaded");
}

export async function generateAnswer(query, context) {
    await initializeLLM();

    const response = await engine.chat.completions.create({
        messages: [
            {
                role: "system",
                content:
                    "Answer ONLY from the provided context. If the answer is not present, reply exactly: I couldn't find the answer in the uploaded document."
            },
            {
                role: "user",
                content: `Context:
${context}

Question:
${query}`
            }
        ],
        temperature: 0,
    });

    return response.choices[0].message.content;
}