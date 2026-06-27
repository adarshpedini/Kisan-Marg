const DEFAULT_STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by",
  "from", "up", "about", "into", "through", "during", "before", "after", "above", "below",
  "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", "does",
  "did", "will", "would", "could", "should", "may", "might", "can", "this", "that", "these",
  "those", "i", "me", "my", "we", "our", "you", "your", "he", "she", "it", "its", "they",
  "them", "their", "what", "which", "who", "whom", "not", "no", "nor", "so", "yet",
  "as", "if", "then", "than", "also", "just", "only", "even", "such", "when", "where", "how",
  "all", "both", "each", "few", "more", "most", "other", "some", "any", "between", "however",
  "therefore", "thus", "hence", "while", "although", "please", "tell", "give", "need"
]);

function tokenize(text, extraStopwords = []) {
  const stopwords = extraStopwords.length
    ? new Set([...DEFAULT_STOPWORDS, ...extraStopwords])
    : DEFAULT_STOPWORDS;

  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .split(/\s+/)
    .map((token) => token.replace(/^['-]+|['-]+$/g, ""))
    .filter((token) => token.length > 1 && !stopwords.has(token));
}

function computeTF(tokens) {
  const tf = {};
  const size = tokens.length || 1;
  for (const token of tokens) {
    tf[token] = (tf[token] || 0) + 1;
  }
  for (const token in tf) {
    tf[token] = tf[token] / size;
  }
  return tf;
}

function buildIndex(chunks) {
  const df = {};
  const idf = {};
  const tfidfMatrix = [];
  const preparedChunks = chunks.map((chunk) => ({
    ...chunk,
    tokens: Array.isArray(chunk.tokens) && chunk.tokens.length
      ? chunk.tokens
      : tokenize(chunk.text || "")
  }));

  const total = preparedChunks.length;
  if (!total) {
    return { chunks: preparedChunks, idf, docFreq: df, tfidfMatrix };
  }

  for (const chunk of preparedChunks) {
    const terms = new Set(chunk.tokens);
    for (const term of terms) {
      df[term] = (df[term] || 0) + 1;
    }
  }

  for (const term in df) {
    idf[term] = Math.log((total + 1) / (df[term] + 1)) + 1;
  }

  for (const chunk of preparedChunks) {
    const tf = computeTF(chunk.tokens);
    const vec = {};
    for (const term in tf) {
      if (idf[term]) vec[term] = tf[term] * idf[term];
    }
    tfidfMatrix.push(vec);
  }

  return {
    chunks: preparedChunks,
    idf,
    docFreq: df,
    tfidfMatrix
  };
}

function cosineSimilarity(vecA, vecB) {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (const term in vecA) {
    normA += vecA[term] * vecA[term];
    if (vecB[term]) dot += vecA[term] * vecB[term];
  }
  for (const term in vecB) {
    normB += vecB[term] * vecB[term];
  }
  if (!normA || !normB) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function buildQueryVector(query, index) {
  const tokens = tokenize(query);
  if (!tokens.length) {
    return { tokens, vector: {} };
  }

  const tf = computeTF(tokens);
  const vector = {};
  for (const term in tf) {
    const idfScore = index.idf[term];
    vector[term] = tf[term] * (idfScore || 0.5);
  }
  return { tokens, vector };
}

function search(index, query, topK = 10) {
  const { tokens, vector } = buildQueryVector(query, index);
  if (!tokens.length) return [];

  const results = [];
  for (let i = 0; i < index.tfidfMatrix.length; i += 1) {
    const score = cosineSimilarity(vector, index.tfidfMatrix[i]);
    if (score > 0) {
      results.push({
        score,
        chunkIdx: i,
        ...index.chunks[i]
      });
    }
  }

  results.sort((left, right) => right.score - left.score);
  return results.slice(0, topK);
}

module.exports = {
  tokenize,
  computeTF,
  buildIndex,
  cosineSimilarity,
  buildQueryVector,
  search
};
