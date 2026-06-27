(function () {
  const DATA = window.KISAN_CHATBOT_DATA;
  const NLP = window.KISAN_CHATBOT_NLP;

  const memory = {
    crop: null,
    state: null,
    symptom: null,
    lastIntent: null
  };

  function lang() {
    return (window.getLanguage && window.getLanguage()) || "en";
  }

  function textByLang(map) {
    return map?.[lang()] || map?.en || "";
  }

  function pickKnowledge(intent, analysis) {
    const ranked = DATA.knowledgeBase
      .filter((entry) => entry.intent === intent)
      .map((entry) => {
        const tags = entry.tags || [];
        const score = tags.reduce((sum, tag) => {
          const normalized = NLP.normalizeText(tag);
          if (!normalized) return sum;
          if (analysis.normalized === normalized) return sum + 6;
          if (analysis.normalized.includes(normalized)) return sum + 5;
          if (analysis.tokens.includes(normalized)) return sum + 4;
          return sum;
        }, 0);
        const crop = analysis.entities.crops[0];
        const cropBoost = crop && tags.some((tag) => NLP.normalizeText(tag) === NLP.normalizeText(crop)) ? 4 : 0;
        return { entry, score: score + cropBoost };
      })
      .sort((a, b) => (b.score - a.score) || ((textByLang(b.entry.response || {}).length) - (textByLang(a.entry.response || {}).length)));

    return ranked[0]?.entry || DATA.knowledgeBase.find((entry) => entry.intent === intent) || null;
  }

  function updateMemory(analysis) {
    if (analysis.entities.crops[0]) memory.crop = analysis.entities.crops[0];
    if (analysis.entities.states[0]) memory.state = analysis.entities.states[0];
    if (analysis.entities.symptoms[0]) memory.symptom = analysis.entities.symptoms[0];
    memory.lastIntent = analysis.intent;
  }

  function fallbackMessage() {
    const messages = {
      en: "I understood this is farming-related, but I need a little more detail. Tell me the crop, symptom or topic like weather, market, fertilizer, or scheme.",
      hi: "मुझे लग रहा है कि आपका सवाल खेती से जुड़ा है, लेकिन थोड़ा और विवरण चाहिए। फसल, लक्षण या विषय बताइए जैसे मौसम, बाजार, खाद या योजना।",
      mr: "तुमचा प्रश्न शेतीशी संबंधित वाटतो, पण मला थोडी अधिक माहिती हवी आहे. पीक, लक्षण किंवा विषय सांगा जसे हवामान, बाजार, खत किंवा योजना."
    };
    return messages[lang()] || messages.en;
  }

  function conversationalIntent(intent) {
    return ["greeting", "farewell", "app_help", "weather", "market", "schemes"].includes(intent);
  }

  function buildReply(text) {
    return String(text || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .join("<br>");
  }

  function shouldUseCropSummary(analysis) {
    const crop = analysis.entities.crops[0];
    if (!crop) return false;
    if (analysis.intent !== "crop_advice" && analysis.intent !== "soil_info" && analysis.intent !== "fallback") {
      return false;
    }
    const query = analysis.normalized;
    const cropNorm = NLP.normalizeText(crop);
    if (query === cropNorm) return true;
    if (query === `what is ${cropNorm}`) return true;
    if (query === `about ${cropNorm}`) return true;
    if (query.includes(`what is ${cropNorm}`)) return true;
    if (query.includes(`tell me about ${cropNorm}`)) return true;
    if (query.includes(`${cropNorm} crop`)) return true;
    return analysis.tokens.length <= 4;
  }

  function cropSummaryReply(analysis) {
    const crop = analysis.entities.crops[0];
    if (!crop) return "";
    const cropKey = NLP.normalizeText(crop);
    const summary = DATA.cropSummaries?.[cropKey] || DATA.cropSummaries?.[cropKey.replace(/\s+/g, "_")];
    if (!summary) return "";
    const body = textByLang(summary);
    if (!body) return "";
    const suffix = {
      en: `If you want, I can also tell you the soil, sowing season, irrigation, fertilizer, or pest risks for ${crop}.`,
      hi: "अगर चाहें तो मैं इस फसल के लिए मिट्टी, बुवाई मौसम, सिंचाई, खाद या रोग-कीट जोखिम भी बता सकता हूँ।",
      mr: "हवे असल्यास मी या पिकासाठी माती, पेरणी हंगाम, सिंचन, खत किंवा रोग-किडींचा धोका देखील सांगू शकतो."
    };
    return `${body}\n${suffix[lang()] || suffix.en}`;
  }

  function contextualKnowledgeReply(analysis, knowledge) {
    if (!knowledge) return "";
    const crop = analysis.entities.crops[0] || memory.crop;
    const state = analysis.entities.states[0] || memory.state;
    const followUp = textByLang(knowledge.followUp || {});
    const response = textByLang(knowledge.response || {});

    if (analysis.intent === "soil_info" && crop) {
      return `${response}\nFor ${crop}, tell me your state if you want a more local soil recommendation.`;
    }
    if (analysis.intent === "irrigation" && crop) {
      return [
        `Irrigation for ${crop} should depend on soil type, growth stage, and current weather.`,
        `Avoid overwatering, and give more attention during establishment and other sensitive growth stages.`,
        `Tell me whether ${crop} is in rainfed or irrigated conditions if you want a more exact suggestion.`
      ].join("\n");
    }
    if (analysis.intent === "pest_control" && crop) {
      const symptom = analysis.entities.symptoms[0];
      return [
        `Pest or disease control in ${crop} should start with correct identification before spraying anything.`,
        symptom ? `This looks related to ${symptom} symptoms in ${crop}. Check the leaves, stems, and the underside of leaves closely.` : `Tell me the exact symptom in ${crop}, like yellow leaves, spots, wilting, or insects.`,
        `If you can, share whether the problem appeared after rain, heat stress, or visible insect attack.`
      ].join("\n");
    }
    if (analysis.intent === "fertilizer" && crop) {
      return [
        `Fertilizer advice for ${crop} depends on the crop stage and soil condition.`,
        `Do not add extra urea or fertilizer blindly. Check whether the issue is nutrient deficiency, water stress, or pest damage first.`,
        `Tell me the growth stage of ${crop} if you want a more specific fertilizer suggestion.`
      ].join("\n");
    }
    if (analysis.intent === "schemes" && analysis.normalized.includes("pm kisan")) {
      return "PM-Kisan is an income-support scheme for eligible farmer families. Check Aadhaar linkage, land record details, and your registration status on the official PM-Kisan portal.";
    }

    if (!crop && !state) {
      return response;
    }

    const contextParts = [];
    if (crop) contextParts.push(`crop: ${crop}`);
    if (state) contextParts.push(`state: ${state}`);

    return [response, followUp && contextParts.length ? followUp : ""]
      .filter(Boolean)
      .join("\n");
  }

  function respond(message) {
    const analysis = NLP.analyze(message);
    updateMemory(analysis);

    if (shouldUseCropSummary(analysis)) {
      const summary = cropSummaryReply(analysis);
      if (summary) return buildReply(summary);
    }

    if (analysis.intent === "greeting" || analysis.intent === "farewell") {
      const knowledge = pickKnowledge(analysis.intent, analysis);
      return buildReply(textByLang(knowledge?.response || { en: "Namaste!" }));
    }

    if (analysis.intent === "fallback" || analysis.confidence === "low") {
      return buildReply(fallbackMessage());
    }

    const knowledge = pickKnowledge(analysis.intent, analysis);
    if (!knowledge && !conversationalIntent(analysis.intent)) {
      return buildReply(fallbackMessage());
    }

    if (knowledge) {
      return buildReply(contextualKnowledgeReply(analysis, knowledge));
    }

    return buildReply(fallbackMessage());
  }

  window.KISAN_CHATBOT_ENGINE = {
    respond,
    memory
  };
})();
