export function dotProduct(a, b) {
    let sum = 0;
    for (let i =0; i < a.length; i++) {
        sum += a[i] * b[i];
    }
    return sum;
}

export function magnitude(vector) {
    let sum = 0; 
    for (let i = 0; i < vector.length; i++) {
        sum += vector[i] * vector[i];
    }
    return Math.sqrt(sum);
}

export function cosineSimilarity(a, b) {
    const dot = dotProduct(a, b);
    const magnitudeA = magnitude(a);
    const magnitudeB = magnitude(b);

    return dot / (magnitudeA * magnitudeB);
}