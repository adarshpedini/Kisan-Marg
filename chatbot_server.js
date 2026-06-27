const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");
const SearchEngine = require("./chatbot-search");

const APP_DIR = __dirname;
const ENV_FILES = [path.join(APP_DIR, ".env"), path.join(APP_DIR, "chatbot.env")];
const DATA_DIR = path.join(APP_DIR, "chatbot-data-store");
const DEFAULT_MODEL = "gpt-4.1-mini";
const DEFAULT_TRANSCRIBE_MODEL = "gpt-4o-mini-transcribe";
const DEFAULT_PORT = 3000;
const DEFAULT_DATASET_MODE = "primary";
const MIN_QA_SCORE = 8;
const PRIMARY_STRUCTURED_SOURCES = new Set([
  "agricultural_qna_cleaned",
  "agroqa_cleaned",
  "crop_profiles"
]);
const SECONDARY_STRUCTURED_SOURCES = new Set([
  "chatbot_5000_cleaned",
  "chatbot_data_cleaned"
]);

const INTENT_HINTS = {
  greeting: ["hi", "hello", "namaste", "hey"],
  farewell: ["bye", "thanks", "thankyou"],
  crop_advice: ["crop", "grow", "sowing", "harvest", "season", "yield", "cultivation"],
  pest_control: ["pest", "disease", "aphid", "insect", "yellow", "leaf", "spot", "wilt", "weed", "rot"],
  fertilizer: ["fertilizer", "fertiliser", "urea", "compost", "manure", "npk", "nutrient", "khaad"],
  irrigation: ["irrigation", "water", "drip", "sprinkler", "watering", "moisture"],
  soil_info: ["soil", "mitti", "ph", "loam", "clay", "sandy", "black", "red"],
  weather: ["weather", "rain", "temperature", "forecast", "humidity", "wind", "climate"],
  market: ["market", "mandi", "price", "rate", "sell", "buyer"],
  schemes: ["scheme", "yojana", "subsidy", "insurance", "loan", "pm", "kisan", "pm-kisan"],
  app_help: ["app", "page", "dashboard", "feature"]
};

const DATA_FILES = {
  manifest: path.join(DATA_DIR, "manifest.json"),
  qaPrimary: path.join(DATA_DIR, "qa-primary.json"),
  qaSecondary: path.join(DATA_DIR, "qa-secondary.json"),
  cropProfiles: path.join(DATA_DIR, "crop-profiles.json"),
  intentExamples: path.join(DATA_DIR, "intent-examples.json"),
  wordTags: path.join(DATA_DIR, "word-tags.json"),
  searchChunks: path.join(DATA_DIR, "search-chunks.json")
};

function loadEnv() {
  const values = {};
  for (const envFile of ENV_FILES) {
    if (!fs.existsSync(envFile)) continue;
    const raw = fs.readFileSync(envFile, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
      const [key, ...rest] = trimmed.split("=");
      values[key.trim()] = rest.join("=").trim().replace(/^['"]|['"]$/g, "");
    }
  }
  return values;
}

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s,-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text) {
  return SearchEngine.tokenize(normalizeText(text));
}

function overlapScore(sourceTokens, queryTokens, weight = 2) {
  if (!sourceTokens.length || !queryTokens.length) return 0;
  const sourceSet = new Set(sourceTokens);
  return queryTokens.reduce((sum, token) => sum + (sourceSet.has(token) ? weight : 0), 0);
}

function jaccardSimilarity(leftTokens, rightTokens) {
  if (!leftTokens.length || !rightTokens.length) return 0;
  const left = new Set(leftTokens);
  const right = new Set(rightTokens);
  let intersection = 0;
  for (const token of right) {
    if (left.has(token)) intersection += 1;
  }
  const union = new Set([...left, ...right]).size;
  return union ? intersection / union : 0;
}

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    return fallback;
  }
}

function prepareQaEntry(entry) {
  const tags = Array.isArray(entry.tags) ? entry.tags : [];
  return {
    ...entry,
    normQuestion: normalizeText(entry.question),
    questionTokens: tokenize(entry.question),
    answerTokens: tokenize(entry.answer),
    tagTokens: tags.flatMap((tag) => tokenize(tag)),
    cropNorm: normalizeText(entry.crop),
    topicNorm: normalizeText(entry.topic),
    intentNorm: normalizeText(entry.intent),
    priority: entry.priority || "primary"
  };
}

function prepareCropProfile(profile) {
  return {
    ...profile,
    cropNorm: normalizeText(profile.crop),
    varietyNorm: normalizeText(profile.variety),
    cropTokens: tokenize(`${profile.crop || ""} ${profile.variety || ""}`),
    tagTokens: (Array.isArray(profile.tags) ? profile.tags : []).flatMap((tag) => tokenize(tag)),
    profileTokens: tokenize([
      profile.crop,
      profile.variety,
      profile.soil,
      profile.irrigation,
      profile.fertilizer,
      profile.pesticide,
      profile.state_focus
    ].join(" "))
  };
}

function prepareIntentExample(example) {
  return {
    ...example,
    queryNorm: normalizeText(example.query),
    queryTokens: tokenize(example.query),
    intentNorm: normalizeText(example.intent),
    cropNorm: normalizeText(example.crop)
  };
}

function prepareWordTag(tag) {
  return {
    ...tag,
    wordNorm: normalizeText(tag.word),
    labelNorm: normalizeText(tag.label),
    labelFullNorm: normalizeText(tag.label_full)
  };
}

function loadDataStore() {
  const manifest = readJson(DATA_FILES.manifest, {});
  const qaPrimary = readJson(DATA_FILES.qaPrimary, []).map(prepareQaEntry);
  const qaSecondary = readJson(DATA_FILES.qaSecondary, []).map(prepareQaEntry);
  const cropProfiles = readJson(DATA_FILES.cropProfiles, []).map(prepareCropProfile);
  const intentExamples = readJson(DATA_FILES.intentExamples, []).map(prepareIntentExample);
  const wordTags = readJson(DATA_FILES.wordTags, []).map(prepareWordTag);
  const searchChunks = readJson(DATA_FILES.searchChunks, []).map((chunk) => ({
    ...chunk,
    cropNorm: normalizeText(chunk.crop),
    intentNorm: normalizeText(chunk.intent),
    topicNorm: normalizeText(chunk.topic),
    tokens: SearchEngine.tokenize(chunk.text || "")
  }));
  const wordTagMap = new Map(wordTags.map((tag) => [tag.wordNorm, tag]));
  const knownCrops = new Set([
    ...qaPrimary.map((entry) => entry.cropNorm).filter(Boolean),
    ...qaSecondary.map((entry) => entry.cropNorm).filter(Boolean),
    ...cropProfiles.map((profile) => profile.cropNorm).filter(Boolean),
    ...intentExamples.map((entry) => entry.cropNorm).filter(Boolean)
  ]);
  const searchIndex = SearchEngine.buildIndex(searchChunks);

  return {
    manifest,
    qaPrimary,
    qaSecondary,
    cropProfiles,
    intentExamples,
    wordTags,
    wordTagMap,
    knownCrops,
    searchChunks,
    searchIndex
  };
}

const DATA_STORE = loadDataStore();

function detectLikelyIntents(queryTokens) {
  const scored = new Map();

  for (const [intent, hints] of Object.entries(INTENT_HINTS)) {
    let score = 0;
    for (const hint of hints) {
      const hintNorm = normalizeText(hint);
      if (queryTokens.includes(hintNorm)) score += 6;
    }
    if (score) scored.set(intent, (scored.get(intent) || 0) + score);
  }

  for (const example of DATA_STORE.intentExamples) {
    const overlap = overlapScore(example.queryTokens, queryTokens, 2);
    const similarity = jaccardSimilarity(example.queryTokens, queryTokens);
    let score = overlap + Math.round(similarity * 10);
    if (!score) continue;
    score += example.cropNorm && queryTokens.includes(example.cropNorm) ? 2 : 0;
    scored.set(example.intentNorm, (scored.get(example.intentNorm) || 0) + score);
  }

  return [...scored.entries()]
    .sort((left, right) => right[1] - left[1])
    .slice(0, 3)
    .map(([intent]) => intent);
}

function detectQueryLabels(queryTokens) {
  const labels = new Set();
  for (const token of queryTokens) {
    const tag = DATA_STORE.wordTagMap.get(token);
    if (!tag) continue;
    labels.add(tag.labelNorm);
    labels.add(tag.labelFullNorm);
  }
  return labels;
}

function detectQueryCrops(queryTokens) {
  return queryTokens.filter((token) => DATA_STORE.knownCrops.has(token));
}

function sourceTier(entry) {
  if (entry.kind === "crop_profile" || PRIMARY_STRUCTURED_SOURCES.has(entry.source)) return "primary_structured";
  if (SECONDARY_STRUCTURED_SOURCES.has(entry.source) || entry.priority === "secondary") return "secondary_structured";
  if (entry.kind === "document" || entry.priority === "reference") return "reference_document";
  return "other";
}

function rankQaEntries(question, datasetMode = DEFAULT_DATASET_MODE) {
  const queryTokens = tokenize(question);
  const likelyIntents = detectLikelyIntents(queryTokens);
  const queryCrops = detectQueryCrops(queryTokens);
  const includeSecondary = datasetMode === "all" || datasetMode === "secondary";
  const rawResults = SearchEngine.search(DATA_STORE.searchIndex, question, includeSecondary ? 20 : 12);

  return rawResults
    .map((result) => {
      let score = result.score * 100;
      const chunk = result;
      const tier = sourceTier(chunk);
      if (chunk.kind === "crop_profile") score += 4;
      if (chunk.priority === "secondary") score -= 10;
      if (tier === "primary_structured") score += 18;
      if (tier === "secondary_structured") score += 6;
      if (tier === "reference_document") score -= 18;
      if (queryCrops.length && chunk.cropNorm && queryCrops.includes(chunk.cropNorm)) score += 18;
      if (queryCrops.length && chunk.cropNorm && !queryCrops.includes(chunk.cropNorm)) score -= 25;
      if (queryCrops.length && !chunk.cropNorm) score -= 8;
      if (chunk.intentNorm && likelyIntents.includes(chunk.intentNorm)) score += 14;
      if (likelyIntents.length && chunk.intentNorm && !likelyIntents.includes(chunk.intentNorm)) score -= 14;
      if (!includeSecondary && chunk.priority === "secondary") score = -999;
      return {
        entry: chunk,
        score,
        similarity: result.score,
        tier
      };
    })
    .filter((item) => item.score >= MIN_QA_SCORE);
}

function rankCropProfiles(question) {
  const queryNorm = normalizeText(question);
  const queryTokens = tokenize(question);
  const queryCrops = detectQueryCrops(queryTokens);
  const likelyIntents = detectLikelyIntents(queryTokens);

  return DATA_STORE.cropProfiles
    .map((profile) => {
      let score = 0;
      score += overlapScore(profile.cropTokens, queryTokens, 3);
      score += overlapScore(profile.tagTokens, queryTokens, 2);
      score += overlapScore(profile.profileTokens, queryTokens, 1);
      if (profile.cropNorm && queryTokens.includes(profile.cropNorm)) score += 5;
      if (profile.varietyNorm && queryNorm.includes(profile.varietyNorm)) score += 4;
      if (queryCrops.length && profile.cropNorm && !queryCrops.includes(profile.cropNorm)) score = -999;
      if (likelyIntents.includes("market") || likelyIntents.includes("schemes")) score -= 8;
      return { profile, score };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score);
}

function buildContext(question, options = {}) {
  const datasetMode = options.datasetMode || DEFAULT_DATASET_MODE;
  const qaLimit = options.qaLimit || 4;
  const cropLimit = options.cropLimit || 1;
  const queryTokens = tokenize(question);
  const queryCrops = detectQueryCrops(queryTokens);
  const likelyIntents = detectLikelyIntents(queryTokens);
  let rankedQa = rankQaEntries(question, datasetMode);
  if (likelyIntents.length) {
    rankedQa = rankedQa.filter((item) => {
      if (item.entry.intentNorm && likelyIntents.includes(item.entry.intentNorm)) return true;
      return item.score >= 35;
    });
  }
  if (queryCrops.length) {
    rankedQa = rankedQa.filter((item) => {
      if (item.entry.cropNorm && queryCrops.includes(item.entry.cropNorm)) return true;
      if (!item.entry.cropNorm) return item.score >= 14 && item.similarity >= 0.2;
      return false;
    });
  }
  const structuredHits = rankedQa.filter((item) => item.tier !== "reference_document");
  if (structuredHits.length >= Math.max(1, qaLimit - 1)) {
    rankedQa = structuredHits;
  }
  rankedQa = rankedQa.filter((item, index, list) => {
    if (item.tier !== "reference_document") return true;
    return !list.some((other) => other.tier === "primary_structured" && other.score >= item.score + 8);
  });
  rankedQa = rankedQa.slice(0, qaLimit);
  let rankedProfiles = rankCropProfiles(question);
  if (likelyIntents.includes("market") || likelyIntents.includes("schemes")) {
    rankedProfiles = [];
  }
  rankedProfiles = rankedProfiles.slice(0, cropLimit);
  const sections = [];

  if (rankedQa.length) {
    sections.push(
      "Retrieved search references:\n" +
      rankedQa.map(({ entry }, index) => [
        `Reference ${index + 1}`,
        `Type: ${entry.kind || "dataset_chunk"}`,
        `Source: ${entry.source || "dataset"}`,
        `Priority: ${entry.priority || "primary"}`,
        `Intent: ${entry.intent || "general"}`,
        `Crop: ${entry.crop || "general"}`,
        `Topic: ${entry.topic || "general"}`,
        `Text: ${entry.text || ""}`
      ].join("\n")).join("\n\n")
    );
  }

  if (rankedProfiles.length) {
    sections.push(
      "Crop profile references:\n" +
      rankedProfiles.map(({ profile }, index) => [
        `Profile ${index + 1}`,
        `Crop: ${profile.crop || "general"}`,
        `Variety: ${profile.variety || "general"}`,
        `Soil: ${profile.soil || "not available"}`,
        `Irrigation: ${profile.irrigation || "not available"}`,
        `Fertilizer: ${profile.fertilizer || "not available"}`,
        `Location: ${profile.location || "not available"}`
      ].join("\n")).join("\n\n")
    );
  }

  return sections.join("\n\n");
}

function postJson(url, payload, headers = {}) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const request = https.request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
        ...headers
      }
    }, (response) => {
      let data = "";
      response.on("data", (chunk) => { data += chunk; });
      response.on("end", () => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(new Error("OpenAI response was not valid JSON"));
          }
          return;
        }
        reject(new Error(`OpenAI API error: ${response.statusCode} ${data}`));
      });
    });

    request.on("error", reject);
    request.write(body);
    request.end();
  });
}

async function callOpenAI(message, context) {
  const env = loadEnv();
  const apiKey = (env.OPENAI_API_KEY || "").trim();
  const model = (env.OPENAI_MODEL || DEFAULT_MODEL).trim() || DEFAULT_MODEL;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing in .env or chatbot.env");
  }

  const systemPrompt = [
    "You are Kisan Marg AI, a practical agriculture assistant for Indian farmers.",
    "Answer in simple, helpful language.",
    "Use the provided agriculture reference context when relevant.",
    "Prefer high-confidence agricultural guidance and avoid overclaiming.",
    "Do not mention internal references, datasets, or that you are using OpenAI.",
    "If details are missing, ask one short follow-up question."
  ].join(" ");

  const userPrompt = [
    `Farmer question:\n${message}`,
    `Reference context:\n${context || "No direct reference found."}`,
    "Write the best answer for the farmer."
  ].join("\n\n");

  const response = await postJson("https://api.openai.com/v1/responses", {
    model,
    input: [
      { role: "system", content: [{ type: "input_text", text: systemPrompt }] },
      { role: "user", content: [{ type: "input_text", text: userPrompt }] }
    ]
  }, {
    Authorization: `Bearer ${apiKey}`
  });

  if (response.output_text) {
    return response.output_text.trim();
  }

  const outputs = response.output || [];
  for (const item of outputs) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) {
        return content.text.trim();
      }
    }
  }

  throw new Error("OpenAI response did not include text output");
}

function fileExtensionForMimeType(mimeType) {
  if (mimeType.includes("webm")) return "webm";
  if (mimeType.includes("wav")) return "wav";
  if (mimeType.includes("mp4")) return "mp4";
  if (mimeType.includes("mpeg") || mimeType.includes("mp3")) return "mp3";
  if (mimeType.includes("ogg")) return "ogg";
  return "webm";
}

function postMultipart(url, fields, file) {
  return new Promise((resolve, reject) => {
    const boundary = `----KisanMargBoundary${Date.now()}`;
    const chunks = [];

    for (const [key, value] of Object.entries(fields)) {
      if (key.startsWith("__")) continue;
      chunks.push(Buffer.from(
        `--${boundary}\r\n` +
        `Content-Disposition: form-data; name="${key}"\r\n\r\n` +
        `${value}\r\n`
      ));
    }

    chunks.push(Buffer.from(
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="${file.fieldName}"; filename="${file.filename}"\r\n` +
      `Content-Type: ${file.mimeType}\r\n\r\n`
    ));
    chunks.push(file.buffer);
    chunks.push(Buffer.from(`\r\n--${boundary}--\r\n`));

    const body = Buffer.concat(chunks);
    const request = https.request(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${fields.__apiKey}`,
        "Content-Type": `multipart/form-data; boundary=${boundary}`,
        "Content-Length": body.length
      }
    }, (response) => {
      let data = "";
      response.on("data", (chunk) => { data += chunk; });
      response.on("end", () => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(new Error("OpenAI transcription response was not valid JSON"));
          }
          return;
        }
        reject(new Error(`OpenAI transcription error: ${response.statusCode} ${data}`));
      });
    });

    request.on("error", reject);
    request.write(body);
    request.end();
  });
}

async function transcribeAudio(audioBase64, mimeType = "audio/webm") {
  const env = loadEnv();
  const apiKey = (env.OPENAI_API_KEY || "").trim();
  const model = (env.OPENAI_TRANSCRIBE_MODEL || DEFAULT_TRANSCRIBE_MODEL).trim() || DEFAULT_TRANSCRIBE_MODEL;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing in .env or chatbot.env");
  }

  const cleanBase64 = String(audioBase64 || "").split(",").pop();
  const buffer = Buffer.from(cleanBase64, "base64");
  if (!buffer.length) {
    throw new Error("Audio payload is empty");
  }

  const response = await postMultipart("https://api.openai.com/v1/audio/transcriptions", {
    model,
    __apiKey: apiKey
  }, {
    fieldName: "file",
    filename: `voice-input.${fileExtensionForMimeType(mimeType)}`,
    mimeType,
    buffer
  });

  return (response.text || "").trim();
}

function sendJson(response, statusCode, payload) {
  const body = JSON.stringify(payload);
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  response.end(body);
}

const server = http.createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
    response.end();
    return;
  }

  if (request.method !== "POST" || !["/api/chat", "/api/transcribe"].includes(request.url)) {
    sendJson(response, 404, { error: "Not found" });
    return;
  }

  let rawBody = "";
  request.on("data", (chunk) => {
    rawBody += chunk;
  });

  request.on("end", async () => {
    try {
      const payload = JSON.parse(rawBody || "{}");
      if (request.url === "/api/chat") {
        const message = String(payload.message || "").trim();
        if (!message) {
          sendJson(response, 400, { error: "Message is required" });
          return;
        }

        const env = loadEnv();
        const datasetMode = (env.CHATBOT_DATASET_MODE || DEFAULT_DATASET_MODE).trim() || DEFAULT_DATASET_MODE;
        const context = buildContext(message, { datasetMode });
        const reply = await callOpenAI(message, context);
        sendJson(response, 200, { reply, source: "openai" });
        return;
      }

      const transcript = await transcribeAudio(payload.audio, payload.mimeType);
      if (!transcript) {
        sendJson(response, 500, { error: "No transcript returned from speech-to-text" });
        return;
      }
      sendJson(response, 200, { transcript });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Unknown server error" });
    }
  });
});

if (require.main === module) {
  const env = loadEnv();
  const port = Number(env.PORT || DEFAULT_PORT) || DEFAULT_PORT;
  server.listen(port, "127.0.0.1", () => {
    const counts = DATA_STORE.manifest || {};
    console.log(`Kisan Marg chatbot server running on http://127.0.0.1:${port}`);
    console.log(`Loaded backend data: primary=${counts.qa_primary || 0}, secondary=${counts.qa_secondary || 0}, crops=${counts.crop_profiles || 0}`);
  });
}

module.exports = {
  server,
  buildContext,
  callOpenAI,
  rankQaEntries,
  rankCropProfiles
};
