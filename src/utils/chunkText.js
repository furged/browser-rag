export function chunkText(text, chunkSize = 500, overlap = 1) {
    const sentences =
        text.match(/[^.!?]+[.!?]*\s*/g) || [];

    const chunks = [];

    let currentSentences = [];
    let currentLength = 0;

    for (const sentence of sentences) {
        if (currentLength + sentence.length <= chunkSize) {
            currentSentences.push(sentence.trim());
            currentLength += sentence.length;
        } else {
            chunks.push(currentSentences.join(" "));

            currentSentences = currentSentences.slice(-overlap);

            currentLength = currentSentences.reduce(
                (sum, s) => sum + s.length,
                0
            );

            currentSentences.push(sentence.trim());
            currentLength += sentence.length;
        }
    }

    if (currentSentences.length > 0) {
        chunks.push(currentSentences.join(" "));
    }

    // temporary debug logs
    console.log("Number of chunks:", chunks.length);

    const lengths = chunks.map(chunk => chunk.length);

    console.log(
        "Average chunk length:",
        Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length)
    );

    console.log("Smallest chunk:", Math.min(...lengths));
    console.log("Largest chunk:", Math.max(...lengths));

    console.log("First chunk:");
    console.log(chunks[0]);

    console.log("Last chunk:");
    console.log(chunks[chunks.length - 1]);
    // ---

    return chunks;
}