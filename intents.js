/* Kisan Marg Intent Classifier - Trained on 100+ farming patterns */

// Training data from training_data.py (converted to JS)
const trainingData = [
  // 🌱 GREETINGS
  {"intent": "greeting", "text": "hi"},
  {"intent": "greeting", "text": "hello"},
  {"intent": "greeting", "text": "hey"},
  {"intent": "greeting", "text": "good morning"},
  {"intent": "greeting", "text": "good evening"},
  {"intent": "greeting", "text": "namaste"},
  {"intent": "greeting", "text": "yo"},
  {"intent": "greeting", "text": "hey there"},
  {"intent": "greeting", "text": "hii"},
  {"intent": "greeting", "text": "hello bhai"},

  // 🌾 CROP ADVICE
  {"intent": "crop_advice", "text": "which crop should I grow"},
  {"intent": "crop_advice", "text": "best crop for summer"},
  {"intent": "crop_advice", "text": "what crop in winter"},
  {"intent": "crop_advice", "text": "suggest crops for rainy season"},
  {"intent": "crop_advice", "text": "what to grow in monsoon"},
  {"intent": "crop_advice", "text": "best cash crop"},
  {"intent": "crop_advice", "text": "crop for high profit"},
  {"intent": "crop_advice", "text": "low water crops"},
  {"intent": "crop_advice", "text": "which crop needs less water"},
  {"intent": "crop_advice", "text": "fast growing crops"},

  // 🌍 SOIL INFORMATION
  {"intent": "soil_info", "text": "what are soil types"},
  {"intent": "soil_info", "text": "best soil for farming"},
  {"intent": "soil_info", "text": "how to test soil"},
  {"intent": "soil_info", "text": "soil fertility improvement"},
  {"intent": "soil_info", "text": "how to improve soil quality"},
  {"intent": "soil_info", "text": "soil ph level"},
  {"intent": "soil_info", "text": "loamy soil benefits"},
  {"intent": "soil_info", "text": "difference between clay and sandy soil"},
  {"intent": "soil_info", "text": "soil nutrients"},
  {"intent": "soil_info", "text": "soil health tips"},

  // 💧 IRRIGATION
  {"intent": "irrigation", "text": "irrigation methods"},
  {"intent": "irrigation", "text": "drip irrigation benefits"},
  {"intent": "irrigation", "text": "sprinkler irrigation"},
  {"intent": "irrigation", "text": "how to save water in farming"},
  {"intent": "irrigation", "text": "best irrigation technique"},
  {"intent": "irrigation", "text": "water management in agriculture"},
  {"intent": "irrigation", "text": "irrigation system types"},
  {"intent": "irrigation", "text": "how often to water crops"},
  {"intent": "irrigation", "text": "watering schedule"},
  {"intent": "irrigation", "text": "low water irrigation methods"},

  // 🌿 FERTILIZERS
  {"intent": "fertilizer", "text": "best fertilizer"},
  {"intent": "fertilizer", "text": "organic fertilizer"},
  {"intent": "fertilizer", "text": "how to use urea"},
  {"intent": "fertilizer", "text": "natural fertilizers"},
  {"intent": "fertilizer", "text": "compost making"},
  {"intent": "fertilizer", "text": "difference between organic and chemical fertilizer"},
  {"intent": "fertilizer", "text": "bio fertilizers"},
  {"intent": "fertilizer", "text": "npk fertilizer"},
  {"intent": "fertilizer", "text": "fertilizer schedule"},
  {"intent": "fertilizer", "text": "how much fertilizer to use"},

// 🐛 PEST & DISEASE
  {"intent": "pest_control", "text": "how to control pests"},
  {"intent": "pest_control", "text": "crop disease treatment"},
  {"intent": "pest_control", "text": "natural pest control"},
  {"intent": "pest_control", "text": "fungus in plants"},
  {"intent": "pest_control", "text": "insects damaging crops"},
  {"intent": "pest_control", "text": "how to identify plant disease"},
  {"intent": "pest_control", "text": "leaf spots disease"},
  {"intent": "pest_control", "text": "pesticide usage"},
  {"intent": "pest_control", "text": "organic pest control"},
  {"intent": "pest_control", "text": "how to prevent crop disease"},

  // 🌦️ WEATHER
  {"intent": "weather", "text": "weather today"},
  {"intent": "weather", "text": "rain forecast"},
  {"intent": "weather", "text": "temperature today"},
  {"intent": "weather", "text": "will it rain"},
  {"intent": "weather", "text": "climate conditions"},
  {"intent": "weather", "text": "humidity level"},
  {"intent": "weather", "text": "weather for farming"},
  {"intent": "weather", "text": "best weather for crops"},
  {"intent": "weather", "text": "monsoon prediction"},
  {"intent": "weather", "text": "weather impact on crops"},

  // 💰 MARKET & PRICES
  {"intent": "market", "text": "crop price today"},
  {"intent": "market", "text": "market rate for wheat"},
  {"intent": "market", "text": "vegetable price"},
  {"intent": "market", "text": "mandi rates"},
  {"intent": "market", "text": "sell crops price"},
  {"intent": "market", "text": "profit crops"},
  {"intent": "market", "text": "high demand crops"},
  {"intent": "market", "text": "market trends"},
  {"intent": "market", "text": "best crop for selling"},
  {"intent": "market", "text": "agriculture market news"},

  // 🇮🇳 GOVERNMENT SCHEMES
  {"intent": "schemes", "text": "government schemes for farmers"},
  {"intent": "schemes", "text": "pm kisan scheme"},
  {"intent": "schemes", "text": "subsidy for farming"},
  {"intent": "schemes", "text": "loan for farmers"},
  {"intent": "schemes", "text": "insurance for crops"},
  {"intent": "schemes", "text": "farmer benefits"},
  {"intent": "schemes", "text": "government support agriculture"},
  {"intent": "schemes", "text": "crop insurance scheme"},
  {"intent": "schemes", "text": "financial help farmers"},
  {"intent": "schemes", "text": "agriculture subsidy india"},

  // 🚜 EQUIPMENT
  {"intent": "equipment", "text": "farming tools"},
  {"intent": "equipment", "text": "tractor usage"},
  {"intent": "equipment", "text": "modern farming equipment"},
  {"intent": "equipment", "text": "cheap farming tools"},
  {"intent": "equipment", "text": "machinery for farming"},
  {"intent": "equipment", "text": "harvesting machine"},
  {"intent": "equipment", "text": "plough tools"},
  {"intent": "equipment", "text": "drone in agriculture"},
  {"intent": "equipment", "text": "smart farming tools"},
  {"intent": "equipment", "text": "equipment for small farmers"},

  // 👋 FAREWELL
  {"intent": "farewell", "text": "bye"},
  {"intent": "farewell", "text": "goodbye"},
  {"intent": "farewell", "text": "see you"},
  {"intent": "farewell", "text": "thank you"},
  {"intent": "farewell", "text": "thanks"},
  {"intent": "farewell", "text": "ok bye"},
  {"intent": "farewell", "text": "see you later"},
  {"intent": "farewell", "text": "thank you so much"}
];

// Responses per intent (practical farming advice, Hindi/English mix)
const intentResponses = {
  greeting: [
    "Namaste Kisan ji! Kaise madad kar sakta hoon aaj? 🌾",
    "Hello! Crop advice, market rates ya koi farming sawal?",
    "Namaskar! Aapke liye Kisan Marg AI ready hai!"
  ],
  crop_advice: [
    "Monsoon mein dhaincha ya bajra achha. Low water ke liye jowar/millets.",
    "Summer: Groundnut/cotton. Winter: Wheat/gram. Location bataiye for better suggestion.",
    "High profit: Soybean, onion (Lasalgaon). Fast growing: Radish in 30 days."
  ],
  soil_info: [
    "Test soil pH (6.5-7.5 best). Loamy soil sabse achha farming ke liye.",
    "Improve fertility: Add compost + green manure. Avoid continuous same crop.",
    "Clay: Holds water, poor drainage. Sandy: Drains fast, low nutrients."
  ],
  irrigation: [
    "Drip irrigation best - 60% water save. Sprinkler for orchards.",
    "Water morning/evening. Check soil moisture before watering.",
    "Mulching + drip = water saving technique for dry areas."
  ],
  fertilizer: [
    "Organic best: Compost (10 ton/ha) + vermicompost. Urea: 50kg basal.",
    "NPK 120:60:40 for most crops. Biofertilizer with seeds.",
    "Compost banaye: Cow dung + crop waste + leave 45 days."
  ],
  pest_control: [
    "Neem oil spray natural pest control. Early detection key.",
    "Leaf spots: Remove infected leaves + copper fungicide.",
    "Integrated Pest Management: Traps + biological control + minimal chemicals.",
    "Yellow leaves: Nitrogen deficiency OR aphids. Check undersides.",
    "White spots: Powdery mildew - Sulfur spray 2g/L.",
    "Brown spots: Bacterial blight - Copper oxychloride.",
    "Plants drying: Root rot - Trichoderma 5g/L soil drench.",
    "Aphids/Whitefly: Imidacloprid 0.3ml/L OR Neem 5ml/L.",
    "Caterpillar: Spinosad 0.5ml/L. Holes = chewing pests.",
    "Cotton bollworm: Pheromone traps. Tomato wilt: Pseudomonas.",
    "Organic: Neem + Garlic-Chili spray. Cow urine 20%.",
    "Prevention: Crop rotation + sticky traps."
  ],
  weather: [
    "Aaj 28°C, light rain evening. Check local weather app.",
    "Monsoon prediction: Normal rainfall expected. Prepare drainage.",
    "Humidity high = fungal risk. Space crops properly."
  ],
  market: [
    "Wheat ₹32/kg direct buyer Nashik. Check Kisan Marg market page.",
    "High demand: Onion, tomato. Sell direct for ₹4-6/kg extra.",
    "Trend up: Soybean ₹52/kg. Wait 2 days if possible."
  ],
  schemes: [
    "PM Kisan: ₹6000/year, Aadhaar link. Apply online.",
    "PMFBY crop insurance: Premium low, full loss cover.",
    "Soil Health Card free: Test at local KVK."
  ],
  equipment: [
    "Small farmers: Power weeder ₹25k + drip kit.",
    "Tractor: 20HP for 2-5 acres. Rent if occasional.",
    "Drone spraying: ₹5/acre, contact local service."
  ],
  farewell: [
    "Dhanyawad Kisan ji! Happy farming! 🌾",
    "Alvida! Koi sawal ho toh wapas aaiye.",
    "Thanks! Good luck with your crops!"
  ]
};

// Fuse.js CDN (lightweight fuzzy matching for intent classification)
const fuseOptions = {
  includeScore: true,
  threshold: 0.3, // Match threshold
  keys: ['text']
};

let fuse;

// Initialize Fuse on load
function initIntents() {
  fuse = new Fuse(trainingData, fuseOptions);
}

// Classify user message to intent
function classifyIntent(message) {
  if (!fuse) initIntents();
  
  const results = fuse.search(message.toLowerCase());
  
  if (results.length > 0 && results[0].score < 0.3) {
    return results[0].item.intent;
  }
  
  // Keyword fallback for unknown
  const msg = message.toLowerCase();
  if (msg.includes('disease') || msg.includes('pest') || msg.includes('रोग')) return 'pest_control';
  if (msg.includes('market') || msg.includes('price') || msg.includes('भाव')) return 'market';
  if (msg.includes('weather') || msg.includes('मौसम')) return 'weather';
  if (msg.includes('scheme') || msg.includes('pm-kisan') || msg.includes('योजना')) return 'schemes';
  
  return 'greeting'; // Default
}

// Get random response for given intent
function getIntentResponse(intent) {
  const responses = intentResponses[intent] || intentResponses.greeting;
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

// Export for use in script.js
window.classifyIntent = classifyIntent;
window.getIntentResponse = getIntentResponse;
window.initIntents = initIntents;

// Auto-init when script loads
initIntents();

