(function () {
  const DATA = window.KISAN_CHATBOT_DATA;

  function currentLang() {
    return (window.getLanguage && window.getLanguage()) || "en";
  }

  function normalizeText(text) {
    let value = String(text || "").toLowerCase();
    value = value.replace(/[^\p{L}\p{N}\s]/gu, " ");
    value = value.replace(/\s+/g, " ").trim();
    return value;
  }

  function stemToken(token) {
    return token
      .replace(/(ing|ed|ly|es|s)$/i, "")
      .replace(/(karna|karne|karta|karte|kar|chi|cha|che)$/i, "");
  }

  function tokenize(text) {
    const lang = currentLang();
    const stopWords = new Set([
      ...(DATA.stopWords.en || []),
      ...(DATA.stopWords.hi || []),
      ...(DATA.stopWords.mr || []),
      ...(DATA.stopWords[lang] || [])
    ]);

    return normalizeText(text)
      .split(" ")
      .filter(Boolean)
      .map((token) => DATA.synonyms[token] || token)
      .filter((token) => !stopWords.has(token))
      .map(stemToken)
      .filter((token) => token.length > 1);
  }

  function extractEntities(tokens) {
    const entities = Object.fromEntries(
      Object.keys(DATA.entities || {}).map((type) => [type, []])
    );
    const joinedTokens = ` ${tokens.join(" ")} `;

    Object.entries(DATA.entities || {}).forEach(([type, values]) => {
      if (!Array.isArray(values)) return;
      const matchedNormalized = [];
      const sortedValues = [...values].sort((left, right) => {
        const leftNorm = normalizeText(left);
        const rightNorm = normalizeText(right);
        return rightNorm.length - leftNorm.length;
      });

      sortedValues.forEach((value) => {
        const normalized = stemToken(normalizeText(value));
        if (!normalized) return;
        const exactTokenMatch = tokens.includes(normalized);
        const exactPhraseMatch = joinedTokens.includes(` ${normalized} `);
        if (!exactTokenMatch && !exactPhraseMatch) return;

        const overshadowedByLongerMatch = matchedNormalized.some((matchedValue) => {
          if (matchedValue === normalized) return false;
          return ` ${matchedValue} `.includes(` ${normalized} `);
        });

        if (!overshadowedByLongerMatch) {
          if (!entities[type].includes(value)) entities[type].push(value);
          matchedNormalized.push(normalized);
        }
      });
    });

    return entities;
  }

  function inferExplicitIntent(tokens, entities, normalized) {
    const tokenSet = new Set(tokens);
    const hasAny = (values) => values.some((value) => tokenSet.has(value));

    if (hasAny(["hello", "hi", "namaste", "namaskar", "hey"])) return "greeting";
    if (hasAny(["bye", "goodbye", "thank", "thanks", "thankyou"])) return "farewell";
    if (hasAny(["scheme", "yojana", "subsidy", "insurance", "loan", "pm", "kisan", "kcc"]) || normalized.includes("pm kisan")) {
      return "schemes";
    }
    if (hasAny(["market", "mandi", "price", "rate", "sell", "buyer"])) return "market";
    if (hasAny(["weather", "rain", "temperature", "forecast", "humidity", "wind", "climate"])) return "weather";
    if (hasAny(["fertilizer", "urea", "npk", "compost", "manure", "nutrient", "khaad"])) return "fertilizer";
    if (hasAny(["irrigation", "drip", "sprinkler", "watering", "moisture"]) || (tokenSet.has("water") && entities.crops.length)) {
      return "irrigation";
    }
    if (hasAny(["soil", "mitti", "ph", "loam", "clay", "sandy"]) || entities.soils.length) {
      return "soil_info";
    }
    if (entities.symptoms.length || hasAny(["disease", "pest", "aphid", "yellow", "spot", "wilt", "fungus", "treat", "remedy", "solution", "control"])) {
      return "pest_control";
    }
    if (entities.crops.length || hasAny(["crop", "grow", "season", "kharif", "rabi", "yield", "sow", "harvest", "best"])) {
      return "crop_advice";
    }
    return null;
  }

  function scoreIntent(tokens, entities, normalized) {
    const scores = {};
    Object.entries(DATA.intents).forEach(([intent, spec]) => {
      let score = 0;
      spec.keywords.forEach((keyword) => {
        const normalized = stemToken(normalizeText(keyword));
        if (tokens.includes(normalized)) score += 3;
        else if (tokens.join(" ").includes(normalized)) score += 2;
      });
      scores[intent] = score;
    });

    const explicitIntent = inferExplicitIntent(tokens, entities, normalized);
    if (explicitIntent) {
      scores[explicitIntent] = (scores[explicitIntent] || 0) + 6;
    }

    if (scores.agri_query) {
      const specificIntents = ["soil_info", "irrigation", "fertilizer", "pest_control", "crop_advice", "market", "weather", "schemes"];
      const strongestSpecific = Math.max(...specificIntents.map((intent) => scores[intent] || 0), 0);
      if (strongestSpecific > 0) {
        scores.agri_query = Math.max(0, scores.agri_query - strongestSpecific - 1);
      }
    }

    const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [topIntent, topScore] = ranked[0] || ["fallback", 0];
    return {
      intent: topScore > 0 ? topIntent : "fallback",
      confidence: topScore >= 6 ? "high" : topScore >= 3 ? "medium" : "low",
      scores
    };
  }

  function analyze(text) {
    const normalized = normalizeText(text);
    const tokens = tokenize(text);
    const entities = extractEntities(tokens);
    const intentResult = scoreIntent(tokens, entities, normalized);
    return {
      original: text,
      normalized,
      tokens,
      entities,
      ...intentResult
    };
  }

  function jaccardSimilarity(leftTokens, rightTokens) {
    const left = new Set(leftTokens);
    const right = new Set(rightTokens);
    if (!left.size || !right.size) return 0;
    let intersection = 0;
    left.forEach((token) => {
      if (right.has(token)) intersection += 1;
    });
    const union = new Set([...left, ...right]).size;
    return union ? intersection / union : 0;
  }

  window.KISAN_CHATBOT_NLP = {
    normalizeText,
    tokenize,
    extractEntities,
    scoreIntent,
    analyze,
    jaccardSimilarity
  };
})();
