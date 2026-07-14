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

    return chunks;
}