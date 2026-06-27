window.KISAN_CHATBOT_DATA = {
  stopWords: {
    en: ["a", "an", "the", "is", "am", "are", "was", "were", "i", "me", "my", "for", "to", "of", "in", "on", "at", "and", "or", "with", "about", "please", "tell", "give"],
    hi: ["का", "की", "के", "को", "से", "में", "पर", "और", "या", "है", "हैं", "था", "थी", "थे", "मुझे", "मेरी", "मेरे", "बताओ", "कृपया"],
    mr: ["चा", "ची", "चे", "ला", "मध्ये", "वर", "आणि", "किंवा", "आहे", "आहेत", "माझा", "माझी", "माझे", "सांगा", "कृपया"]
  },


  synonyms: {
    gehun: "wheat",
    wheat: "wheat",
    dhan: "rice",
    chawal: "rice",
    rice: "rice",
    kapus: "cotton",
    cotton: "cotton",
    pyaj: "onion",
    pyaaz: "onion",
    onion: "onion",
    soyabean: "soyabean",
    soybean: "soyabean",
    soyabin: "soyabean",
    jowar: "jowar",
    jawar: "jowar",
    sorghum: "jowar",
    makka: "maize",
    maize: "maize",
    bajra: "bajra",
    pearlmillet: "bajra",
    pearl: "bajra",
    ragi: "ragi",
    nachni: "ragi",
    tomato: "tomato",
    tamatar: "tomato",
    aloo: "potato",
    potato: "potato",
    chana: "gram",
    chickpea: "gram",
    arhar: "pigeonpea",
    tur: "pigeonpea",
    pigeonpea: "pigeonpea",
    moong: "moong",
    mung: "moong",
    urad: "urad",
    blackgram: "urad",
    groundnut: "groundnut",
    peanut: "groundnut",
    sugarcane: "sugarcane",
    mustard: "mustard",
    sarson: "mustard",
    sunflower: "sunflower",
    barley: "barley",
    masoor: "lentil",
    lentil: "lentil",
    rog: "disease",
    bimari: "disease",
    disease: "disease",
    pest: "pest",
    keeda: "pest",
    insects: "pest",
    spray: "spray",
    dawa: "spray",
    barish: "rain",
    rain: "rain",
    mausam: "weather",
    weather: "weather",
    mandi: "market",
    bhav: "market",
    भाव: "market",
    price: "market",
    bazar: "market",
    बाजार: "market",
    pani: "irrigation",
    सिंचाई: "irrigation",
    irrigation: "irrigation",
    khaad: "fertilizer",
    fertilizer: "fertilizer",
    खाद: "fertilizer",
    mitti: "soil",
    soil: "soil",
    yojana: "scheme",
    scheme: "scheme",
    subsidy: "scheme",
    suitable: "best",
    ideal: "best",
    recommend: "best",
    good: "best",
    control: "treat",
    prevent: "treat",
    remedy: "treat",
    treatment: "treat",
    insect: "pest",
    bug: "pest",
    watering: "irrigation",
    water: "irrigation",
    ph: "soil",
    land: "soil",
    dhaan: "rice",
    kapas: "cotton",
    nimbu: "lemon",
    nariyal: "coconut",
    shakarkand: "sweet potato",
    lauki: "bottle gourd",
    turai: "ridge gourd",
    karela: "bitter gourd",
    kaddu: "pumpkin",
    tinda: "round gourd",
    parwal: "pointed gourd",
    sem: "broad beans",
    rajma: "kidney beans",
    til: "sesame",
    alsi: "linseed",
    surajmukhi: "sunflower",
    jau: "barley",
    jai: "oats",
    ganna: "sugarcane",
    amrud: "guava",
    sitaphal: "custard apple",
    chikoo: "sapota",
    nashpati: "pear",
    aadu: "peach",
    kharbuza: "muskmelon",
    ropai: "transplant",
    katai: "harvest",
    chhidkav: "spray",
    dawai: "medicine",
    ped_lagao: "plant tree",
    utpadan: "production",
    paidavar: "yield",
    bikri: "sell",
    keemat: "price"
  },


  intents: {
    greeting: {
      keywords: ["hello", "hi", "namaste", "namaskar", "hey", "morning", "evening"],
      prompts: ["hi", "hello", "namaste", "good morning", "good evening", "hey there"]
    },

    farewell: {
      keywords: ["bye", "goodbye", "thanks", "thank", "thankyou", "later"],
      prompts: ["thanks", "bye", "thank you", "see you", "see you later"]
    },

    // 🔥 MAIN DATA ACCESS INTENT (MOST IMPORTANT)
    agri_query: {
      keywords: [
        // CROPS
        "wheat","rice","maize","cotton","onion","potato","tomato","soybean","groundnut","sugarcane",
        "gehun","dhan","chawal","makka","kapas","pyaj","aloo","tamatar",

        // PROBLEMS
        "disease","pest","infection","fungal","virus","bacteria","issue","problem","attack",
        "rog","bimari","samasy","problem",

        // SYMPTOMS
        "yellow","leaf","spots","wilting","rot","root","fungus","dry","damage",
        "peela","patta","daag","sukhna","galna","jad","safed daag",

        // ACTION WORDS
        "control","prevent","solution","treatment","kaise","kya kare","how","fix","remedy","ilaj",

        // YIELD / GROWTH
        "low yield","poor germination","growth problem","kam utpadan","ankuran problem"
      ],

      prompts: [
        "tomato me leaf spots kaise control kare",
        "why rice has yellow leaves",
        "cotton pest attack solution",
        "wheat me bimari ka ilaj",
        "maize root rot treatment",
        "soybean me problem kya hai",
        "groundnut me wilting ka solution",
        "onion yellow leaves kaise thik kare",
        "potato fungal disease solution",
        "crop me problem kaise solve kare"
      ]
    },

    // 🔥 SUB-INTENTS (HELP BOOST MATCHING)
    pest_control: {
      keywords: [
        "pest","keeda","insect","attack","spray","pesticide","control","treat","fungus","disease"
      ],
      prompts: [
        "pest control kaise kare",
        "keede ka ilaj",
        "fungus problem solution",
        "crop disease ka treatment"
      ]
    },

    crop_advice: {
      keywords: [
        "crop","grow","season","kharif","rabi","best","suitable","yield","profit","fasal",
        "seed","beej","sowing","bowaai","planting","harvest","germination","poor germination",
        "low yield","cultivation","variety","hybrid","certified"
      ],
      prompts: [
        "kaunsi fasal ugaye",
        "best crop for season",
        "high yield crop",
        "profitable crop kya hai",
        "best seed for crop",
        "sowing time for soybean"
      ]
    },

    fertilizer: {
      keywords: [
        "fertilizer","urea","npk","compost","khaad","poshak","nutrient deficiency",
        "deficiency","manure","organic","micronutrient","dap","potash"
      ],
      prompts: [
        "khaad kaunsa use kare",
        "npk kya hai",
        "fertilizer kitna dale",
        "nutrient deficiency ka solution"
      ]
    },

    irrigation: {
      keywords: [
        "water","pani","irrigation","drip","sprinkler","watering","moisture",
        "drainage","waterlogging","canal","tubewell"
      ],
      prompts: [
        "pani kitna dena",
        "irrigation kaise kare",
        "drip irrigation kya hai",
        "waterlogging kaise roke"
      ]
    },

    market: {
      keywords: [
        "market","mandi","price","rate","bhav","sell","demand"
      ],
      prompts: [
        "mandi bhav kya hai",
        "price today",
        "market rate batao"
      ]
    },

    weather: {
      keywords: [
        "weather","rain","temperature","forecast","mausam","barish",
        "humidity","climate","wind","monsoon","hailstorm"
      ],
      prompts: [
        "weather today",
        "barish hogi kya",
        "forecast batao",
        "humidity kitni hai"
      ]
    },

    soil_info: {
      keywords: [
        "soil","mitti","land","ph","fertility","soil test","loam","black soil","red soil","clay"
      ],
      prompts: [
        "mitti ka type kaise pata kare",
        "soil ph kitna hona chahiye",
        "soil test kaise kare"
      ]
    },

    app_help: {
      keywords: [
        "app","application","dashboard","home","feature","how to use","help","screen","page","settings"
      ],
      prompts: [
        "app kaise use kare",
        "dashboard ka use batao",
        "market page kaise khole"
      ]
    },

    schemes: {
      keywords: [
        "scheme","yojana","subsidy","loan","insurance","pm kisan","kcc"
      ],
      prompts: [
        "government scheme",
        "loan kaise milega",
        "subsidy kya hai"
      ]
    },

    fallback: {
      keywords: [],
      prompts: []
    }
  },





  entities: {
    crops: [
      "wheat", "rice", "paddy", "cotton", "soyabean", "soybean", "onion", "tomato",
      "maize", "corn", "potato", "gram", "chickpea", "bajra", "pearl millet", "jowar",
      "sorghum", "ragi", "finger millet", "groundnut", "peanut", "sugarcane", "mustard",
      "sarson", "sunflower", "barley", "pigeonpea", "tur", "arhar", "moong", "green gram",
      "urad", "black gram", "lentil", "masoor", "oats", "linseed", "flax", "safflower",
      "field pea", "pea", "horse gram", "fenugreek", "methi", "coriander", "cumin",
      "isabgol", "lucerne", "alfalfa", "toria", "rapeseed", "fennel", "ajwain", "dill",
      "celery", "lettuce", "broccoli", "asparagus", "parsley", "sesame", "til", "castor",
      "castor seed", "jute", "mesta", "tobacco", "arecanut", "coconut", "tea", "coffee",
      "rubber", "banana", "mango", "papaya", "guava", "watermelon", "muskmelon", "melon",
      "cucumber", "pumpkin", "bottle gourd", "ridge gourd", "sponge gourd", "bitter gourd",
      "pointed gourd", "ash gourd", "snake gourd", "ivy gourd", "brinjal", "eggplant",
      "okra", "bhindi", "chilli", "capsicum", "bell pepper", "garlic", "ginger", "turmeric",
      "spinach", "palak", "amaranthus", "methi leaves", "cabbage", "cauliflower", "carrot",
      "radish", "beetroot", "turnip", "sweet potato", "tapioca", "cassava", "yam",
      "elephant foot yam", "colocasia", "drumstick", "moringa", "cluster bean", "guar",
      "cowpea", "french bean", "broad bean", "hyacinth bean", "lablab", "green pea",
      "onion seed", "shallot", "spring onion", "leek", "apple", "orange", "mandarin",
      "sweet orange", "lemon", "lime", "mosambi", "grapes", "pomegranate", "pineapple",
      "litchi", "sapota", "chikoo", "custard apple", "jackfruit", "pear", "plum", "peach",
      "apricot", "kiwi", "passion fruit", "dragon fruit", "fig", "aonla", "amla", "ber",
      "jamun", "date palm", "citrus", "strawberry", "mulberry", "cashew", "almond",
      "walnut", "nutmeg", "clove", "black pepper", "cardamom", "vanilla", "cocoa",
      "betel vine", "sago", "kodo millet", "little millet", "foxtail millet", "barnyard millet",
      "proso millet", "samai", "kutki", "niger", "hemp", "cluster fig", "roselle",
      "sena", "henna", "marigold", "rose", "jasmine", "chrysanthemum", "gerbera"
    ],

    symptoms: [
      "yellow", "yellowing", "chlorosis", "spots", "leaf spots", "brown spots", "black spots",
      "wilt", "wilting", "drying", "dry", "curl", "leaf curl", "curling", "rot", "root rot",
      "stem rot", "fruit rot", "fungus", "fungal", "mildew", "powdery mildew", "downy mildew",
      "blight", "late blight", "early blight", "blast", "rust", "smut", "scab", "canker",
      "gall", "mosaic", "streak", "necrosis", "dieback", "stunting", "lodging", "shedding",
      "flower drop", "fruit drop", "leaf drop", "premature drop", "poor germination",
      "no germination", "low yield", "poor yield", "small fruits", "small pods", "shrivelling",
      "shriveling", "cracking", "sunburn", "burn", "leaf burn", "tip burn", "hopper burn",
      "whitefly", "aphid", "aphids", "thrips", "jassid", "mites", "red spider mite",
      "mealybug", "bollworm", "fruit borer", "stem borer", "shoot borer", "pod borer",
      "cutworm", "armyworm", "termite", "nematode", "grasshopper", "locust", "sucking pest",
      "chewing pest", "holes", "leaf miner", "webbing", "sticky leaves", "sooty mold",
      "honeydew", "water stress", "waterlogging", "lodging", "weak stem", "patches",
      "discoloration", "discolouration", "whitening", "reddening", "bronzing", "leaf folding",
      "leaf rolling", "twisting", "deformed leaves", "rotting", "damping off", "seedling death"
    ],

    seasons: [
      "kharif", "rabi", "zaid", "summer", "winter", "monsoon", "pre monsoon", "post monsoon",
      "spring", "autumn", "rainy season", "dry season", "harvest season", "sowing season",
      "transplanting season", "flowering stage", "vegetative stage", "seedling stage",
      "tillering stage", "grain filling stage", "maturity stage", "nursery stage"
    ],

    states: [
      "andhra pradesh", "arunachal pradesh", "assam", "bihar", "chhattisgarh", "goa",
      "gujarat", "haryana", "himachal pradesh", "jharkhand", "karnataka", "kerala",
      "madhya pradesh", "maharashtra", "manipur", "meghalaya", "mizoram", "nagaland",
      "odisha", "orissa", "punjab", "rajasthan", "sikkim", "tamil nadu", "telangana",
      "tripura", "uttar pradesh", "uttarakhand", "west bengal", "andaman and nicobar",
      "chandigarh", "dadra and nagar haveli", "daman and diu", "delhi", "jammu and kashmir",
      "ladakh", "lakshadweep", "puducherry", "pondicherry"
    ],

    soils: [
      "black soil", "black cotton soil", "red soil", "red loam", "loamy soil", "loam",
      "sandy soil", "sandy loam", "clay soil", "clay loam", "silty soil", "silt loam",
      "alluvial soil", "laterite soil", "saline soil", "alkaline soil", "acidic soil",
      "calcareous soil", "peaty soil", "marshy soil", "gravelly soil", "shallow soil",
      "deep soil", "well drained soil", "poorly drained soil", "fertile soil", "light soil",
      "heavy soil", "coastal soil", "delta soil", "mountain soil", "forest soil"
    ],

    pests: [
      "aphid", "aphids", "whitefly", "thrips", "jassid", "leafhopper", "planthopper",
      "brown planthopper", "green leafhopper", "stem borer", "shoot borer",
      "fruit borer", "pod borer", "bollworm", "armyworm", "cutworm",
      "fall armyworm", "pink bollworm", "spodoptera", "leaf miner",
      "leaf folder", "gall midge", "mites", "red spider mite",
      "mealybug", "scale insect", "termite", "grasshopper",
      "locust", "weevil", "beetle", "chafer", "wireworm",
      "root grub", "nematode", "snail", "slug"
    ],

    diseases: [
      "leaf spot", "leaf blight", "early blight", "late blight",
      "powdery mildew", "downy mildew", "rust", "stem rust",
      "stripe rust", "loose smut", "covered smut", "blast",
      "bacterial blight", "bacterial wilt", "fusarium wilt",
      "verticillium wilt", "root rot", "stem rot", "fruit rot",
      "damping off", "anthracnose", "scab", "canker",
      "mosaic virus", "yellow mosaic", "leaf curl virus",
      "tikka disease", "sooty mold", "dieback", "leaf streak",
      "black rot", "white rot", "red rot", "charcoal rot"
    ],

    fertilizers: [
      "urea", "dap", "npk", "mop", "ssp", "ammonium sulfate",
      "calcium ammonium nitrate", "potash", "zinc sulfate",
      "boron", "magnesium sulfate", "gypsum", "lime",
      "rock phosphate", "vermicompost", "compost",
      "farmyard manure", "fym", "green manure",
      "biofertilizer", "azotobacter", "azospirillum",
      "rhizobium", "phosphate solubilizing bacteria",
      "psb", "neem coated urea", "liquid fertilizer",
      "foliar spray", "micronutrient mix", "organic manure",
      "seaweed extract", "humic acid", "bone meal"
    ],
    
    irrigation_methods: [
      "drip irrigation", "sprinkler irrigation", "flood irrigation",
      "furrow irrigation", "basin irrigation", "check basin",
      "border irrigation", "subsurface irrigation", "manual watering",
      "hose irrigation", "tank irrigation", "canal irrigation",
      "well irrigation", "tube well irrigation", "rainfed farming",
      "micro irrigation", "overhead irrigation", "center pivot",
      "lateral move irrigation", "bucket irrigation",
      "alternate furrow irrigation", "ridge and furrow",
      "mulch irrigation", "precision irrigation"
    ],

    weather_conditions: [
      "rain", "heavy rain", "light rain", "drizzle", "monsoon",
      "dry weather", "drought", "heat", "heatwave",
      "cold", "cold wave", "frost", "humidity",
      "high humidity", "low humidity", "wind", "strong wind",
      "storm", "cyclone", "hailstorm", "cloudy",
      "sunny", "overcast", "temperature rise",
      "temperature drop", "fog", "mist"
    ],

    market_prices: [
      "mandi price", "market rate", "crop price",
      "today price", "current price", "daily rate",
      "minimum support price", "msp", "wholesale price",
      "retail price", "auction price", "arrival rate",
      "demand", "supply", "price trend",
      "price fluctuation", "high price", "low price",
      "best selling price", "commodity price",
      "vegetable rate", "fruit rate", "grain price",
      "export price", "import price"
    ],

    farming_practices: [
      "ploughing", "tilling", "harrowing",
      "sowing", "seed drilling", "broadcasting",
      "transplanting", "weeding", "mulching",
      "crop rotation", "intercropping", "mixed cropping",
      "monocropping", "pruning", "thinning",
      "earthing up", "fertilizer application",
      "pesticide spraying", "irrigation scheduling",
      "harvesting", "post harvest", "storage",
      "soil testing", "land preparation",
      "nursery raising", "grafting", "layering"
    ],

    crop_stages: [
      "seed stage", "germination", "sprouting", "seedling stage",
      "early vegetative stage", "vegetative stage", "leaf development",
      "tillering stage", "branching stage", "rosette stage",
      "stem elongation", "booting stage", "flowering stage",
      "pollination", "fruit setting", "pod formation",
      "grain filling", "bulking stage", "maturity stage",
      "ripening", "harvest stage", "post harvest stage"
    ],

    tools_equipment: [
      "tractor", "plough", "harrow", "cultivator",
      "rotavator", "seed drill", "planter",
      "sprayer", "knapsack sprayer", "power sprayer",
      "fertilizer spreader", "thresher", "combine harvester",
      "harvester", "reaper", "weeder",
      "hoe", "sickle", "spade", "shovel",
      "irrigation pump", "water pump", "drip system",
      "sprinkler system", "mulcher", "transplanter"
    ],

    seed_types: [
      "hybrid seeds", "open pollinated seeds", "opv",
      "certified seeds", "foundation seeds", "breeder seeds",
      "truthful labeled seeds", "gmo seeds", "non gmo seeds",
      "treated seeds", "untreated seeds", "high yielding variety",
      "local variety", "improved variety", "drought resistant seeds",
      "disease resistant seeds", "early maturing seeds",
      "late maturing seeds", "short duration seeds",
      "long duration seeds", "organic seeds",
      "biofortified seeds"
    ],

    yield_factors: [
      "soil fertility", "soil health", "nutrient availability",
      "water availability", "irrigation management", "rainfall",
      "temperature", "climate conditions", "sunlight",
      "seed quality", "seed rate", "sowing time",
      "plant spacing", "weed control", "pest control",
      "disease management", "fertilizer use",
      "crop variety", "farming practices",
      "soil moisture", "drainage", "salinity",
      "crop rotation", "timely harvesting"
    ],

    government_schemes: [
      "pm kisan", "pm kisan samman nidhi", "pmfby", "crop insurance",
      "pradhan mantri fasal bima yojana", "soil health card scheme",
      "kisan credit card", "kcc", "pmksy", "pradhan mantri krishi sinchai yojana",
      "national agriculture market", "e nam", "paramparagat krishi vikas yojana",
      "pkvy", "rashtriya krishi vikas yojana", "rkvy",
      "national food security mission", "nfsm",
      "mission for integrated development of horticulture", "midh",
      "sub mission on seeds and planting material",
      "sub mission on agricultural mechanization",
      "dairy entrepreneurship development scheme",
      "national livestock mission", "soil health management",
      "agri infrastructure fund", "pm kusum", "solar pump scheme"
    ],

    storage_methods: [
      "cold storage", "warehouse storage", "godown storage",
      "grain storage", "airtight storage", "hermetic storage",
      "metal bins", "plastic bins", "jute bags",
      "silos", "warehouse stacking", "pallet storage",
      "dry storage", "controlled atmosphere storage",
      "modified atmosphere storage", "refrigerated storage",
      "ventilated storage", "stack storage",
      "fumigation", "pest proof storage",
      "moisture control", "temperature control",
      "shade storage", "traditional storage"
    ],

    harvesting_methods: [
      "manual harvesting", "mechanical harvesting",
      "hand picking", "cutting with sickle",
      "machine harvesting", "combine harvesting",
      "reaping", "threshing", "winnowing",
      "strip harvesting", "selective harvesting",
      "bulk harvesting", "early harvesting",
      "late harvesting", "timely harvesting",
      "harvesting at maturity", "harvesting at ripening",
      "digging", "uprooting", "plucking",
      "shaking method", "clipping method"
    ],

    soil_management: [
      "soil testing", "soil health", "soil fertility",
      "ph management", "liming", "gypsum application",
      "organic matter addition", "composting",
      "green manuring", "crop rotation",
      "mulching", "cover cropping",
      "soil aeration", "tillage management",
      "minimum tillage", "zero tillage",
      "drainage management", "salinity management",
      "erosion control", "contour farming",
      "terracing", "nutrient management",
      "micronutrient management", "soil amendment"
    ],

    irrigation: [
      "irrigation", "watering", "water management",
      "irrigation schedule", "watering schedule",
      "irrigation frequency", "watering frequency",
      "irrigation timing", "critical irrigation stage",
      "water requirement", "crop water requirement",
      "soil moisture", "moisture level",
      "drip irrigation", "sprinkler irrigation",
      "flood irrigation", "furrow irrigation",
      "basin irrigation", "canal irrigation",
      "well irrigation", "tube well irrigation",
      "rainfed", "rainfed farming",
      "over irrigation", "under irrigation",
      "water stress", "drought stress",
      "waterlogging", "drainage",
      "mulching for moisture", "micro irrigation",
      "irrigation efficiency", "water conservation"
    ]

  },


  harvestingMethods: {
    manual_harvesting: {
      en: "Manual harvesting is a traditional method where crops are cut by hand using tools like sickles. It is suitable for small farms and delicate crops, ensures careful handling, but requires more labor and time.",
      hi: "मैनुअल हार्वेस्टिंग एक पारंपरिक विधि है जिसमें दरांती जैसे औजारों से हाथ से फसल काटी जाती है। यह छोटे खेतों और नाजुक फसलों के लिए उपयुक्त है, सावधानीपूर्वक कटाई होती है लेकिन इसमें अधिक श्रम और समय लगता है।"
    },

    mechanical_harvesting: {
      en: "Mechanical harvesting uses machines like combine harvesters to cut, thresh, and clean crops efficiently. It is suitable for large farms and saves time and labor costs.",
      hi: "मैकेनिकल हार्वेस्टिंग में कंबाइन हार्वेस्टर जैसी मशीनों का उपयोग किया जाता है जो कटाई, मड़ाई और सफाई एक साथ करती हैं। यह बड़े खेतों के लिए उपयुक्त है और समय व श्रम बचाती है।"
    },

    combine_harvesting: {
      en: "Combine harvesting is an advanced method where a single machine performs cutting, threshing, and cleaning of crops like wheat and rice. It increases efficiency and reduces post-harvest losses.",
      hi: "कंबाइन हार्वेस्टिंग एक उन्नत विधि है जिसमें एक ही मशीन कटाई, मड़ाई और सफाई करती है। यह गेहूं और धान जैसी फसलों के लिए उपयोगी है और नुकसान कम करती है।"
    },

    selective_harvesting: {
      en: "Selective harvesting involves picking only mature crops while leaving the rest to grow. It is commonly used in fruits and vegetables to ensure better quality.",
      hi: "सेलेक्टिव हार्वेस्टिंग में केवल पकी हुई फसल को चुना जाता है और बाकी को बढ़ने के लिए छोड़ दिया जाता है। यह फल और सब्जियों में गुणवत्ता बनाए रखने के लिए उपयोगी है।"
    },

    strip_harvesting: {
      en: "Strip harvesting involves removing only the grain portion while leaving the straw standing in the field. It is used in certain cereals to reduce residue handling.",
      hi: "स्ट्रिप हार्वेस्टिंग में केवल अनाज को निकाला जाता है और भूसा खेत में ही छोड़ दिया जाता है। यह कुछ अनाज फसलों में उपयोगी होती है।"
    },

    reaper_harvesting: {
      en: "Reaper harvesting uses a machine to cut crops quickly and lay them in rows for drying and further processing. It is useful for medium-sized farms.",
      hi: "रीपर हार्वेस्टिंग में मशीन से फसल को काटकर कतारों में रखा जाता है ताकि वह सूख सके और आगे की प्रक्रिया हो सके। यह मध्यम आकार के खेतों के लिए उपयुक्त है।"
    },

    threshing: {
      en: "Threshing is the process of separating grains from the harvested crop using manual or mechanical methods. It is an important step after harvesting.",
      hi: "मड़ाई वह प्रक्रिया है जिसमें कटाई के बाद अनाज को फसल से अलग किया जाता है। यह मैनुअल या मशीन से की जा सकती है और कटाई के बाद महत्वपूर्ण चरण है।"
    },

    winnowing: {
      en: "Winnowing is the process of separating grain from chaff using air or wind. It helps in cleaning harvested produce.",
      hi: "विन्नोइंग वह प्रक्रिया है जिसमें हवा की मदद से अनाज और भूसे को अलग किया जाता है। यह फसल की सफाई में मदद करता है।"
    },

    post_harvest_handling: {
      en: "Post-harvest handling includes cleaning, drying, grading, and storing crops properly to maintain quality and reduce losses.",
      hi: "कटाई के बाद की प्रक्रिया में सफाई, सुखाना, ग्रेडिंग और भंडारण शामिल होता है जिससे गुणवत्ता बनी रहती है और नुकसान कम होता है।"
    },

    harvesting_time: {
      en: "Harvesting time depends on crop maturity, weather conditions, and moisture content. Timely harvesting ensures better yield and quality.",
      hi: "कटाई का समय फसल की परिपक्वता, मौसम और नमी पर निर्भर करता है। सही समय पर कटाई से उत्पादन और गुणवत्ता बेहतर होती है।"
    },

    moisture_content_harvest: {
      en: "Proper moisture content at harvesting is important to avoid spoilage and ensure safe storage. Excess moisture can lead to fungal growth.",
      hi: "कटाई के समय सही नमी होना जरूरी है ताकि खराबी न हो और भंडारण सुरक्षित रहे। अधिक नमी से फफूंद लग सकती है।"
    },

    drying_crops: {
      en: "Drying crops after harvesting helps reduce moisture and prevents spoilage during storage. Sun drying is commonly used in India.",
      hi: "कटाई के बाद फसल को सुखाने से नमी कम होती है और भंडारण के दौरान खराबी से बचाव होता है। भारत में धूप में सुखाना आम है।"
    },

    storage_preparation: {
      en: "Proper storage preparation after harvesting includes cleaning, drying, and using pest-free storage structures to protect grains.",
      hi: "कटाई के बाद भंडारण की तैयारी में सफाई, सुखाना और कीट-मुक्त भंडारण का उपयोग शामिल है।"
    },

    harvesting_tools: {
      en: "Common harvesting tools include sickles, knives, and mechanical harvesters. Tool selection depends on crop type and farm size.",
      hi: "सामान्य कटाई के उपकरणों में दरांती, चाकू और हार्वेस्टर मशीन शामिल हैं। उपकरण का चयन फसल और खेत के आकार पर निर्भर करता है।"
    },

    crop_maturity: {
      en: "Crop maturity is the stage when crops are ready for harvesting with maximum yield and quality. Identifying this stage is crucial.",
      hi: "फसल की परिपक्वता वह अवस्था है जब फसल कटाई के लिए तैयार होती है और अधिकतम उत्पादन व गुणवत्ता मिलती है।"
    },

    lodging_management: {
      en: "Lodging management involves harvesting crops carefully when plants fall due to wind or rain to reduce losses.",
      hi: "लॉजिंग प्रबंधन में तेज हवा या बारिश से गिरी हुई फसलों की सावधानी से कटाई की जाती है ताकि नुकसान कम हो।"
    },

    harvest_losses: {
      en: "Harvest losses occur due to improper timing, handling, or storage. Using proper techniques reduces these losses.",
      hi: "कटाई में नुकसान गलत समय, खराब हैंडलिंग या भंडारण के कारण होता है। सही तकनीक से इसे कम किया जा सकता है।"
    },

    grain_collection: {
      en: "Grain collection involves gathering harvested grains efficiently to avoid losses and contamination.",
      hi: "अनाज संग्रह में कटाई के बाद अनाज को सही तरीके से इकट्ठा किया जाता है ताकि नुकसान और मिलावट से बचा जा सके।"
    },

    transport_after_harvest: {
      en: "Transporting harvested crops carefully helps prevent damage and quality loss before storage or market sale.",
      hi: "कटाई के बाद फसल को सावधानी से ले जाने से नुकसान और गुणवत्ता में गिरावट से बचा जा सकता है।"
    },

    harvest_weather: {
      en: "Dry weather during harvesting is ideal as it reduces moisture and prevents spoilage or fungal infections.",
      hi: "कटाई के समय सूखा मौसम सबसे अच्छा होता है क्योंकि इससे नमी कम रहती है और फफूंद से बचाव होता है।"
    }
  },

 
 
  irrigationMethods: {
    irrigation: {
      en: "Irrigation is the process of supplying water to crops at the right time and in the right quantity to support proper growth. It depends on crop type, soil condition, and weather, and helps improve yield and crop quality.",
      hi: "सिंचाई वह प्रक्रिया है जिसमें फसलों को सही समय और सही मात्रा में पानी दिया जाता है ताकि उनकी वृद्धि अच्छी हो सके। यह फसल, मिट्टी और मौसम पर निर्भर करती है और उत्पादन बढ़ाने में मदद करती है।"
        },
    drip_irrigation: {
      en: "Drip irrigation is a water-efficient method that delivers water directly to plant roots through pipes and emitters. It reduces water wastage, controls weeds, and is ideal for crops like fruits, vegetables, and sugarcane.",
      hi: "ड्रिप सिंचाई एक जल-कुशल विधि है जिसमें पाइप और ड्रिपर के माध्यम से पानी सीधे जड़ों तक पहुंचाया जाता है। इससे पानी की बचत होती है, खरपतवार कम होते हैं और यह फलों, सब्जियों और गन्ने के लिए उपयुक्त है।"
        },

    sprinkler_irrigation: {
          en: "Sprinkler irrigation distributes water over crops like rainfall using pipes and rotating nozzles. It is suitable for uneven land and crops like wheat, vegetables, and fodder.",
          hi: "स्प्रिंकलर सिंचाई पाइप और घूमने वाले नोजल के माध्यम से पानी को बारिश की तरह फैलाती है। यह असमान जमीन और गेहूं, सब्जियों व चारे वाली फसलों के लिए उपयुक्त है।"
        },

      flood_irrigation: {
          en: "Flood irrigation is a traditional method where water is allowed to flow over the field surface. It is simple but can lead to water wastage and uneven distribution.",
          hi: "फ्लड सिंचाई पारंपरिक विधि है जिसमें खेत में पानी बहाया जाता है। यह सरल है लेकिन इसमें पानी की बर्बादी और असमान वितरण हो सकता है।"
        },

    furrow_irrigation: {
          en: "Furrow irrigation involves supplying water through small channels between crop rows. It helps reduce water contact with plant stems and is suitable for row crops.",
          hi: "फरो सिंचाई में फसल की कतारों के बीच छोटे नालों से पानी दिया जाता है। इससे तनों पर पानी कम पड़ता है और यह कतार वाली फसलों के लिए उपयुक्त है।"
        },

    basin_irrigation: {
          en: "Basin irrigation involves creating small basins around plants to hold water. It is commonly used for trees and orchards.",
          hi: "बेसिन सिंचाई में पौधों के आसपास छोटे गड्ढे बनाए जाते हैं ताकि पानी जमा रहे। यह पेड़ों और बागों के लिए उपयोगी है।"
        },

    micro_irrigation: {
          en: "Micro irrigation includes systems like drip and sprinkler that provide controlled water supply directly to crops. It improves efficiency and saves water.",
          hi: "माइक्रो सिंचाई में ड्रिप और स्प्रिंकलर जैसी प्रणालियाँ शामिल होती हैं जो फसलों को नियंत्रित तरीके से पानी देती हैं। यह पानी बचाने में मदद करती है।"
        },

    canal_irrigation: {
          en: "Canal irrigation uses water supplied through canals from rivers or reservoirs. It is widely used in large agricultural areas but depends on water availability.",
          hi: "नहर सिंचाई में नदियों या जलाशयों से नहरों के माध्यम से पानी दिया जाता है। यह बड़े क्षेत्रों में उपयोगी है लेकिन पानी की उपलब्धता पर निर्भर करता है।"
        },

    well_irrigation: {
          en: "Well irrigation uses water drawn from wells to irrigate crops. It is common in rural areas and depends on groundwater levels.",
          hi: "कुएं की सिंचाई में भूजल का उपयोग किया जाता है। यह ग्रामीण क्षेत्रों में सामान्य है और भूजल स्तर पर निर्भर करता है।"
        },

        tube_well_irrigation: {
          en: "Tube well irrigation uses deep bore wells and pumps to supply water to fields. It is efficient but requires electricity or fuel.",
          hi: "ट्यूबवेल सिंचाई में गहरे बोरवेल और पंप का उपयोग किया जाता है। यह प्रभावी है लेकिन बिजली या ईंधन की आवश्यकता होती है।"
        },

        rainfed_farming: {
          en: "Rainfed farming depends on natural rainfall without artificial irrigation. Crop success depends on timely and sufficient rainfall.",
          hi: "वर्षा आधारित खेती में सिंचाई के लिए केवल प्राकृतिक बारिश पर निर्भरता होती है। फसल की सफलता बारिश पर निर्भर करती है।"
        },

        irrigation_schedule: {
          en: "Irrigation scheduling means supplying water at the right time based on crop stage, soil moisture, and weather conditions.",
          hi: "सिंचाई अनुसूची का मतलब है फसल के चरण, मिट्टी की नमी और मौसम के अनुसार सही समय पर पानी देना।"
        },

        water_logging: {
          en: "Waterlogging occurs when excess water accumulates in soil, reducing oxygen and damaging roots. Proper drainage is necessary.",
          hi: "जलभराव तब होता है जब मिट्टी में अधिक पानी जमा हो जाता है, जिससे जड़ों को नुकसान होता है। उचित जल निकासी जरूरी है।"
        },

        drought_stress: {
          en: "Drought stress happens when crops do not receive enough water, leading to reduced growth and yield.",
          hi: "सूखा तनाव तब होता है जब फसलों को पर्याप्त पानी नहीं मिलता, जिससे वृद्धि और उत्पादन कम हो जाता है।"
        },

        mulching_moisture: {
          en: "Mulching helps retain soil moisture, reduce evaporation, and improve water efficiency in crops.",
          hi: "मल्चिंग मिट्टी में नमी बनाए रखने, वाष्पीकरण कम करने और पानी की दक्षता बढ़ाने में मदद करती है।"
        },

        irrigation_efficiency: {
          en: "Irrigation efficiency refers to how effectively water is used by crops with minimal wastage.",
          hi: "सिंचाई दक्षता का मतलब है पानी का कम बर्बादी के साथ प्रभावी उपयोग।"
        },

        water_conservation: {
          en: "Water conservation in farming involves using techniques like drip irrigation, mulching, and proper scheduling to save water.",
          hi: "खेती में जल संरक्षण के लिए ड्रिप सिंचाई, मल्चिंग और सही समय पर सिंचाई जैसी तकनीकों का उपयोग किया जाता है।"
        },

        critical_irrigation_stage: {
          en: "Critical irrigation stages are growth phases like germination, flowering, and grain filling where water is most important.",
          hi: "महत्वपूर्ण सिंचाई चरण वे होते हैं जैसे अंकुरण, फूल आना और दाना भरना, जब पानी सबसे जरूरी होता है।"
        },

        soil_moisture: {
          en: "Soil moisture refers to the amount of water present in soil, which directly affects plant growth.",
          hi: "मिट्टी की नमी का मतलब है मिट्टी में मौजूद पानी की मात्रा, जो पौधों की वृद्धि को प्रभावित करती है।"
        },

        over_irrigation: {
          en: "Over irrigation means supplying excess water, which can cause root rot and nutrient loss.",
          hi: "अधिक सिंचाई का मतलब है जरूरत से ज्यादा पानी देना, जिससे जड़ सड़न और पोषक तत्वों की कमी हो सकती है।"
        },

        under_irrigation: {
          en: "Under irrigation means insufficient water supply, leading to poor plant growth and low yield.",
          hi: "कम सिंचाई का मतलब है पर्याप्त पानी न देना, जिससे फसल की वृद्धि और उत्पादन कम हो जाता है।"
        }
  },


  cropSummaries: {
    wheat: {
      en: "Wheat is a major Rabi cereal crop grown widely in Punjab, Haryana, Uttar Pradesh, Madhya Pradesh, and Rajasthan. It grows best in cool, dry winter conditions with fertile loam to clay loam soil. The crop usually takes about 110 to 140 days, needs timely irrigation at key stages, and is mainly used for flour, chapati, and other staple foods.",
      hi: "गेहूँ रबी की एक प्रमुख अनाज फसल है जिसकी व्यापक खेती पंजाब, हरियाणा, उत्तर प्रदेश, मध्य प्रदेश और राजस्थान में होती है। यह ठंडी और शुष्क सर्दियों की जलवायु तथा उपजाऊ दोमट से चिकनी दोमट मिट्टी में सबसे अच्छी बढ़ती है। इस फसल को सामान्यतः 110 से 140 दिन लगते हैं, महत्वपूर्ण अवस्थाओं पर समय पर सिंचाई चाहिए, और इसका मुख्य उपयोग आटा, चपाती तथा अन्य मुख्य खाद्य पदार्थों के लिए होता है।"
    },
    rice: {
      en: "Rice is one of India’s most important food crops and is widely grown in West Bengal, Uttar Pradesh, Punjab, Telangana, Andhra Pradesh, Tamil Nadu, Chhattisgarh, and Odisha. It prefers warm, humid climate, reliable water supply, and clayey to loamy soil with good water-holding capacity. Most rice is grown in Kharif season and usually takes around 100 to 150 days depending on the variety.",
      hi: "धान भारत की सबसे महत्वपूर्ण खाद्य फसलों में से एक है और इसकी खेती पश्चिम बंगाल, उत्तर प्रदेश, पंजाब, तेलंगाना, आंध्र प्रदेश, तमिलनाडु, छत्तीसगढ़ और ओडिशा में बड़े पैमाने पर होती है। इसे गर्म और आर्द्र जलवायु, भरोसेमंद पानी की उपलब्धता तथा अच्छी जलधारण क्षमता वाली चिकनी से दोमट मिट्टी पसंद है। अधिकांश धान खरीफ मौसम में उगाया जाता है और किस्म के अनुसार लगभग 100 से 150 दिन लेता है।"
    },
    jowar: {
      en: "Jowar, also called sorghum, is a hardy millet crop grown in Maharashtra, Karnataka, Telangana, Madhya Pradesh, and parts of Rajasthan. It performs well in semi-arid climates, tolerates drought better than many cereals, and suits medium to deep black soils and well-drained loams. Depending on the season and variety, jowar usually takes about 100 to 120 days and is used for grain, fodder, and rotis.",
      hi: "ज्वार, जिसे सोरघम भी कहा जाता है, एक मजबूत मोटा अनाज है जिसकी खेती महाराष्ट्र, कर्नाटक, तेलंगाना, मध्य प्रदेश और राजस्थान के कुछ भागों में होती है। यह अर्ध-शुष्क जलवायु में अच्छा प्रदर्शन करता है, कई अन्य अनाजों की तुलना में सूखे को बेहतर सहन करता है, और मध्यम से गहरी काली मिट्टी तथा अच्छी जलनिकासी वाली दोमट मिट्टी में उपयुक्त रहता है। मौसम और किस्म के अनुसार ज्वार सामान्यतः 100 से 120 दिन लेता है और इसका उपयोग दाना, चारा और रोटियों के लिए होता है।"
    },
    bajra: {
      en: "Bajra, or pearl millet, is a drought-tolerant cereal widely grown in Rajasthan, Gujarat, Haryana, Uttar Pradesh, and Maharashtra. It is suited to hot, dry climates and can grow in light sandy soils where other cereals struggle. The crop generally matures in about 75 to 100 days and is valued for grain, fodder, and climate resilience.",
      hi: "बाजरा एक सूखा-सहनशील अनाज फसल है जिसकी खेती राजस्थान, गुजरात, हरियाणा, उत्तर प्रदेश और महाराष्ट्र में व्यापक रूप से होती है। यह गर्म और शुष्क जलवायु के लिए उपयुक्त है और हल्की रेतीली मिट्टी में भी उग सकता है जहाँ अन्य अनाजों को कठिनाई होती है। यह फसल सामान्यतः 75 से 100 दिन में तैयार हो जाती है और दाने, चारे तथा जलवायु सहनशीलता के लिए महत्वपूर्ण मानी जाती है।"
    },
    maize: {
      en: "Maize is a versatile cereal crop grown in Karnataka, Madhya Pradesh, Maharashtra, Bihar, Telangana, and Andhra Pradesh. It prefers warm weather, good sunlight, and well-drained fertile loam soil. Depending on the hybrid and season, it usually takes around 90 to 120 days and is used for food, feed, starch, and poultry industries.",
      hi: "मक्का एक बहुउपयोगी अनाज फसल है जिसकी खेती कर्नाटक, मध्य प्रदेश, महाराष्ट्र, बिहार, तेलंगाना और आंध्र प्रदेश में की जाती है। इसे गर्म मौसम, अच्छी धूप और जलनिकासी वाली उपजाऊ दोमट मिट्टी पसंद है। संकर और मौसम के अनुसार यह सामान्यतः 90 से 120 दिन में तैयार होती है और भोजन, पशु आहार, स्टार्च तथा पोल्ट्री उद्योग में उपयोग की जाती है।"
    },
    cotton: {
      en: "Cotton is a major fibre crop grown in Maharashtra, Gujarat, Telangana, Andhra Pradesh, Karnataka, Punjab, and Haryana. It needs a warm climate, long frost-free period, moderate rainfall, and deep black cotton soil or well-drained loam. Cotton usually takes around 150 to 180 days and requires careful pest monitoring, especially for sucking pests and bollworms.",
      hi: "कपास एक प्रमुख रेशा फसल है जिसकी खेती महाराष्ट्र, गुजरात, तेलंगाना, आंध्र प्रदेश, कर्नाटक, पंजाब और हरियाणा में होती है। इसे गर्म जलवायु, लंबी पाला-रहित अवधि, मध्यम वर्षा और गहरी काली कपास मिट्टी या अच्छी जलनिकासी वाली दोमट मिट्टी चाहिए। कपास सामान्यतः 150 से 180 दिन लेती है और विशेषकर रस चूसने वाले कीटों तथा बॉलवर्म के लिए सावधानीपूर्वक निगरानी जरूरी होती है।"
    },
    soyabean: {
      en: "Soyabean is a major oilseed and protein crop grown mainly in Madhya Pradesh, Maharashtra, and Rajasthan. It grows best in warm Kharif conditions with moderate rainfall and well-drained loam to clay loam soils. The crop typically matures in about 90 to 110 days and is important for edible oil, feed, and processing industries.",
      hi: "सोयाबीन एक प्रमुख तिलहनी और प्रोटीन फसल है जिसकी खेती मुख्य रूप से मध्य प्रदेश, महाराष्ट्र और राजस्थान में होती है। यह मध्यम वर्षा वाली गर्म खरीफ परिस्थितियों और अच्छी जलनिकासी वाली दोमट से चिकनी दोमट मिट्टी में बेहतर बढ़ती है। यह फसल सामान्यतः 90 से 110 दिन में पकती है और खाद्य तेल, पशु आहार तथा प्रसंस्करण उद्योग के लिए महत्वपूर्ण है।"
    },
    groundnut: {
      en: "Groundnut is an important oilseed crop cultivated in Gujarat, Andhra Pradesh, Tamil Nadu, Karnataka, Telangana, and Maharashtra. It prefers warm weather, moderate rainfall, and sandy loam to red loam soils with good drainage. Groundnut usually takes about 100 to 130 days and needs good weed control and proper moisture during pegging and pod formation.",
      hi: "मूंगफली एक महत्वपूर्ण तिलहनी फसल है जिसकी खेती गुजरात, आंध्र प्रदेश, तमिलनाडु, कर्नाटक, तेलंगाना और महाराष्ट्र में होती है। इसे गर्म मौसम, मध्यम वर्षा और अच्छी जलनिकासी वाली बलुई दोमट से लाल दोमट मिट्टी पसंद है। मूंगफली सामान्यतः 100 से 130 दिन में तैयार होती है और पेगिंग तथा फली बनने के समय उचित नमी तथा अच्छे खरपतवार नियंत्रण की आवश्यकता होती है।"
    },
    mustard: {
      en: "Mustard is a key Rabi oilseed crop grown in Rajasthan, Uttar Pradesh, Haryana, Madhya Pradesh, and West Bengal. It prefers cool dry weather, light to medium loam soils, and moderate irrigation. The crop generally takes about 110 to 140 days and is valued for oil, condiments, and some green fodder use.",
      hi: "सरसों एक महत्वपूर्ण रबी तिलहनी फसल है जिसकी खेती राजस्थान, उत्तर प्रदेश, हरियाणा, मध्य प्रदेश और पश्चिम बंगाल में होती है। इसे ठंडा और शुष्क मौसम, हल्की से मध्यम दोमट मिट्टी तथा मध्यम सिंचाई पसंद है। यह फसल सामान्यतः 110 से 140 दिन लेती है और तेल, मसाले तथा कुछ हद तक हरे चारे के लिए उपयोगी है।"
    },
    sugarcane: {
      en: "Sugarcane is a long-duration cash crop grown widely in Uttar Pradesh, Maharashtra, Karnataka, Tamil Nadu, and Bihar. It needs warm humid climate, deep fertile soil, and good irrigation management because of its long growth period. Depending on region and variety, sugarcane can take about 10 to 18 months and requires regular nutrient and water planning.",
      hi: "गन्ना एक लंबी अवधि की नकदी फसल है जिसकी व्यापक खेती उत्तर प्रदेश, महाराष्ट्र, कर्नाटक, तमिलनाडु और बिहार में होती है। इसकी लंबी वृद्धि अवधि के कारण इसे गर्म और आर्द्र जलवायु, गहरी उपजाऊ मिट्टी तथा अच्छी सिंचाई प्रबंधन की आवश्यकता होती है। क्षेत्र और किस्म के अनुसार गन्ना लगभग 10 से 18 महीने ले सकता है और नियमित पोषण तथा पानी की योजना जरूरी होती है।"
    },
    gram: {
      en: "Gram, or chickpea, is a major pulse crop grown in Madhya Pradesh, Maharashtra, Rajasthan, Uttar Pradesh, and Andhra Pradesh. It performs well in cool dry Rabi conditions and prefers well-drained loam to black soils with low to moderate residual moisture. The crop usually matures in about 95 to 120 days and is valued for dal, protein, and soil fertility support.",
      hi: "चना एक प्रमुख दलहनी फसल है जिसकी खेती मध्य प्रदेश, महाराष्ट्र, राजस्थान, उत्तर प्रदेश और आंध्र प्रदेश में होती है। यह ठंडी और शुष्क रबी परिस्थितियों में अच्छा प्रदर्शन करती है और कम से मध्यम अवशिष्ट नमी वाली अच्छी जलनिकासी की दोमट से काली मिट्टी पसंद करती है। यह फसल सामान्यतः 95 से 120 दिन में तैयार होती है और दाल, प्रोटीन तथा मिट्टी की उर्वरता बनाए रखने के लिए महत्वपूर्ण है।"
    },
    pigeonpea: {
      en: "Pigeonpea, also known as tur or arhar, is an important pulse crop cultivated in Maharashtra, Karnataka, Madhya Pradesh, Uttar Pradesh, and Gujarat. It is suited to warm climates, moderate rainfall, and well-drained soils, and it can tolerate short dry spells. Depending on the variety, the crop may take about 140 to 180 days and is used for dal and intercropping systems.",
      hi: "अरहर, जिसे तूर भी कहा जाता है, एक महत्वपूर्ण दलहनी फसल है जिसकी खेती महाराष्ट्र, कर्नाटक, मध्य प्रदेश, उत्तर प्रदेश और गुजरात में होती है। यह गर्म जलवायु, मध्यम वर्षा और अच्छी जलनिकासी वाली मिट्टी के लिए उपयुक्त है तथा अल्पकालिक सूखे को सहन कर सकती है। किस्म के अनुसार यह फसल लगभग 140 से 180 दिन ले सकती है और दाल तथा अंतरफसली प्रणालियों में उपयोगी है।"
    },
    moong: {
      en: "Moong, or green gram, is a short-duration pulse grown in Rajasthan, Maharashtra, Karnataka, Andhra Pradesh, and Uttar Pradesh. It prefers warm weather, light to medium well-drained soil, and relatively low waterlogging risk. The crop often matures in about 60 to 80 days and is useful in crop rotation because it helps improve soil fertility.",
      hi: "मूंग एक कम अवधि वाली दलहनी फसल है जिसकी खेती राजस्थान, महाराष्ट्र, कर्नाटक, आंध्र प्रदेश और उत्तर प्रदेश में होती है। इसे गर्म मौसम, हल्की से मध्यम अच्छी जलनिकासी वाली मिट्टी और कम जलभराव जोखिम पसंद है। यह फसल अक्सर 60 से 80 दिन में तैयार हो जाती है और फसल चक्र में उपयोगी है क्योंकि यह मिट्टी की उर्वरता सुधारने में मदद करती है।"
    },
    urad: {
      en: "Urad, or black gram, is a pulse crop grown in Madhya Pradesh, Uttar Pradesh, Maharashtra, Andhra Pradesh, and Tamil Nadu. It does well in warm conditions and grows on well-drained loam to clay loam soils. The crop generally takes around 70 to 100 days and is popular for dal, batter-based foods, and mixed cropping.",
      hi: "उड़द एक दलहनी फसल है जिसकी खेती मध्य प्रदेश, उत्तर प्रदेश, महाराष्ट्र, आंध्र प्रदेश और तमिलनाडु में होती है। यह गर्म परिस्थितियों में अच्छा बढ़ता है और अच्छी जलनिकासी वाली दोमट से चिकनी दोमट मिट्टी में उगाया जाता है। यह फसल सामान्यतः 70 से 100 दिन लेती है और दाल, बैटर आधारित खाद्य पदार्थों तथा मिश्रित खेती में लोकप्रिय है।"
    },
    onion: {
      en: "Onion is a major vegetable crop grown in Maharashtra, Karnataka, Madhya Pradesh, Gujarat, and Rajasthan. It prefers mild climate during bulb development, fertile well-drained loam soil, and careful irrigation scheduling to avoid bulb rot and cracking. Depending on the season, onion usually takes about 90 to 150 days and is important for both fresh market and storage.",
      hi: "प्याज एक प्रमुख सब्जी फसल है जिसकी खेती महाराष्ट्र, कर्नाटक, मध्य प्रदेश, गुजरात और राजस्थान में होती है। गांठ बनने के समय इसे मध्यम जलवायु, उपजाऊ और अच्छी जलनिकासी वाली दोमट मिट्टी तथा सावधानीपूर्वक सिंचाई प्रबंधन की जरूरत होती है ताकि गलन और फटने की समस्या न हो। मौसम के अनुसार प्याज सामान्यतः 90 से 150 दिन लेता है और ताज़ा बाजार तथा भंडारण दोनों के लिए महत्वपूर्ण है।"
    },
    tomato: {
      en: "Tomato is a widely grown vegetable in Karnataka, Andhra Pradesh, Maharashtra, Madhya Pradesh, and Odisha. It grows best in mild to warm climate with good drainage and fertile loam soil rich in organic matter. The crop often starts harvest in about 70 to 90 days, but it needs regular pest and disease observation, especially for wilt, fruit borer, and leaf problems.",
      hi: "टमाटर एक व्यापक रूप से उगाई जाने वाली सब्जी फसल है जिसकी खेती कर्नाटक, आंध्र प्रदेश, महाराष्ट्र, मध्य प्रदेश और ओडिशा में होती है। यह हल्की से गर्म जलवायु, अच्छी जलनिकासी और जैविक पदार्थों से भरपूर उपजाऊ दोमट मिट्टी में सबसे अच्छा बढ़ता है। इसकी तुड़ाई सामान्यतः 70 से 90 दिन में शुरू हो जाती है, लेकिन मुरझान, फल छेदक और पत्ती संबंधी समस्याओं के लिए नियमित रोग-कीट निगरानी जरूरी होती है।"
    },
    potato: {
      en: "Potato is an important tuber crop grown in Uttar Pradesh, West Bengal, Bihar, Punjab, and Gujarat. It prefers cool weather, loose well-drained soil, and careful moisture balance during tuber development. The crop usually takes around 90 to 120 days and responds well to timely earthing up, irrigation, and disease management.",
      hi: "आलू एक महत्वपूर्ण कंद फसल है जिसकी खेती उत्तर प्रदेश, पश्चिम बंगाल, बिहार, पंजाब और गुजरात में होती है। इसे ठंडा मौसम, भुरभुरी और अच्छी जलनिकासी वाली मिट्टी तथा कंद बनने के समय संतुलित नमी चाहिए। यह फसल सामान्यतः 90 से 120 दिन लेती है और समय पर मिट्टी चढ़ाना, सिंचाई तथा रोग प्रबंधन से अच्छा प्रतिसाद देती है।"
    },
    ragi: {
      en: "Ragi, or finger millet, is grown in Karnataka, Tamil Nadu, Uttarakhand, Andhra Pradesh, and Odisha. It is a nutritious millet that tolerates relatively dry conditions and can grow on red loam and light soils with modest fertility. Depending on the season, ragi usually takes about 100 to 120 days and is valued for grain, nutrition, and resilience.",
      hi: "रागी, जिसे फिंगर मिलेट भी कहा जाता है, कर्नाटक, तमिलनाडु, उत्तराखंड, आंध्र प्रदेश और ओडिशा में उगाई जाती है। यह एक पौष्टिक मोटा अनाज है जो अपेक्षाकृत शुष्क परिस्थितियों को सहन करता है और कम उर्वरता वाली लाल दोमट तथा हल्की मिट्टियों में भी उग सकता है। मौसम के अनुसार रागी सामान्यतः 100 से 120 दिन लेती है और दाने, पोषण तथा सहनशीलता के लिए महत्वपूर्ण है।"
    },
    sunflower: {
      en: "Sunflower is an oilseed crop cultivated in Karnataka, Maharashtra, Andhra Pradesh, Telangana, and parts of Tamil Nadu. It prefers warm sunny weather, good drainage, and medium-textured fertile soil. The crop generally matures in about 80 to 110 days and needs attention to nutrient balance and moisture during flowering and seed filling.",
      hi: "सूरजमुखी एक तिलहनी फसल है जिसकी खेती कर्नाटक, महाराष्ट्र, आंध्र प्रदेश, तेलंगाना और तमिलनाडु के कुछ भागों में होती है। इसे गर्म और धूप वाला मौसम, अच्छी जलनिकासी तथा मध्यम बनावट वाली उपजाऊ मिट्टी पसंद है। यह फसल सामान्यतः 80 से 110 दिन में तैयार होती है और फूल आने तथा दाना भरने के समय पोषण संतुलन और नमी पर विशेष ध्यान चाहिए।"
    },
    barley: {
      en: "Barley is a Rabi cereal grown in Rajasthan, Uttar Pradesh, Haryana, Punjab, and Madhya Pradesh. It can tolerate relatively poor soils better than wheat and performs well in cool, dry conditions with limited irrigation. The crop usually matures in about 120 to 140 days and is used for feed, malt, and food products.",
      hi: "जौ एक रबी अनाज फसल है जिसकी खेती राजस्थान, उत्तर प्रदेश, हरियाणा, पंजाब और मध्य प्रदेश में होती है। यह गेहूँ की तुलना में अपेक्षाकृत कमजोर मिट्टियों को बेहतर सहन कर सकता है और सीमित सिंचाई वाली ठंडी व शुष्क परिस्थितियों में अच्छा प्रदर्शन करता है। यह फसल सामान्यतः 120 से 140 दिन में तैयार होती है और पशु आहार, माल्ट तथा खाद्य उत्पादों में उपयोग की जाती है।"
    },
    lentil: {
      en: "Lentil, also called masoor, is a Rabi pulse grown in Madhya Pradesh, Uttar Pradesh, Bihar, West Bengal, and Jharkhand. It prefers cool dry climate, well-drained loam soils, and moderate residual moisture. The crop generally takes around 100 to 120 days and is valued for dal, crop rotation, and low-input cultivation.",
      hi: "मसूर एक रबी दलहनी फसल है जिसकी खेती मध्य प्रदेश, उत्तर प्रदेश, बिहार, पश्चिम बंगाल और झारखंड में होती है। इसे ठंडी और शुष्क जलवायु, अच्छी जलनिकासी वाली दोमट मिट्टी तथा मध्यम अवशिष्ट नमी पसंद है। यह फसल सामान्यतः 100 से 120 दिन लेती है और दाल, फसल चक्र तथा कम लागत वाली खेती के लिए महत्वपूर्ण है।"
    },
    rabi: {
      en: "Rabi crops are crops that are sown in winter (October to December) and harvested in spring (March to April). They require cool climate during growth and warm conditions for maturity, and examples include wheat, mustard, gram, and barley.",
      hi: "रबी फसलें वे फसलें हैं जिन्हें सर्दियों में, सामान्यतः अक्टूबर से दिसंबर के बीच बोया जाता है और वसंत ऋतु, यानी मार्च से अप्रैल के बीच काटा जाता है। इनके विकास के समय ठंडी जलवायु और पकने के समय अपेक्षाकृत गर्म परिस्थितियाँ चाहिए होती हैं। गेहूँ, सरसों, चना और जौ इसके प्रमुख उदाहरण हैं।"
    },
    cabbage: {
      en: "Cabbage is a cool-season vegetable grown in states like West Bengal, Bihar, Uttar Pradesh, and Maharashtra. It prefers cool temperatures, fertile well-drained loam soil, and regular irrigation. The crop usually matures in about 80 to 120 days and is widely used for fresh consumption and cooking.",
      hi: "पत्तागोभी एक ठंडे मौसम की सब्जी है जिसकी खेती पश्चिम बंगाल, बिहार, उत्तर प्रदेश और महाराष्ट्र जैसे राज्यों में होती है। इसे ठंडा तापमान, उपजाऊ व अच्छी जलनिकासी वाली दोमट मिट्टी और नियमित सिंचाई पसंद है। यह फसल सामान्यतः 80 से 120 दिन में तैयार होती है और ताज़ा उपयोग तथा पकाने दोनों में व्यापक रूप से काम आती है।"
    },
    cauliflower: {
      en: "Cauliflower is a popular vegetable grown in Uttar Pradesh, Bihar, West Bengal, and Madhya Pradesh. It requires cool climate, high organic matter soil, and proper moisture management. The crop typically takes about 90 to 120 days and is sensitive to temperature fluctuations.",
      hi: "फूलगोभी एक लोकप्रिय सब्जी है जिसकी खेती उत्तर प्रदेश, बिहार, पश्चिम बंगाल और मध्य प्रदेश में होती है। इसे ठंडी जलवायु, जैविक पदार्थों से भरपूर मिट्टी और उचित नमी प्रबंधन की आवश्यकता होती है। यह फसल सामान्यतः 90 से 120 दिन लेती है और तापमान में उतार-चढ़ाव के प्रति संवेदनशील होती है।"
    },
    brinjal: {
      en: "Brinjal, or eggplant, is grown widely in West Bengal, Odisha, Maharashtra, and Karnataka. It prefers warm climate, well-drained fertile soil, and regular irrigation. The crop usually starts yielding in about 70 to 90 days and requires pest management for fruit borers.",
      hi: "बैंगन की खेती पश्चिम बंगाल, ओडिशा, महाराष्ट्र और कर्नाटक में व्यापक रूप से होती है। इसे गर्म जलवायु, अच्छी जलनिकासी वाली उपजाऊ मिट्टी और नियमित सिंचाई पसंद है। यह फसल सामान्यतः 70 से 90 दिन में उत्पादन देना शुरू करती है और फल छेदक कीटों के लिए अच्छे प्रबंधन की जरूरत होती है।"
    },
    okra: {
      en: "Okra, also known as bhindi, is grown in Maharashtra, Gujarat, Uttar Pradesh, and Karnataka. It thrives in warm climates, well-drained soil, and moderate irrigation. The crop matures in about 50 to 70 days and is sensitive to pests like aphids and fruit borers.",
      hi: "भिंडी की खेती महाराष्ट्र, गुजरात, उत्तर प्रदेश और कर्नाटक में होती है। यह गर्म जलवायु, अच्छी जलनिकासी वाली मिट्टी और मध्यम सिंचाई में अच्छी बढ़ती है। यह फसल 50 से 70 दिन में तैयार हो जाती है और एफिड तथा फल छेदक जैसे कीटों के प्रति संवेदनशील होती है।"
    },
    chilli: {
      en: "Chilli is a major spice crop grown in Andhra Pradesh, Telangana, Karnataka, and Maharashtra. It prefers warm climate, fertile well-drained soil, and careful water management. The crop usually takes about 90 to 120 days and requires pest and disease monitoring.",
      hi: "मिर्च एक प्रमुख मसाला फसल है जिसकी खेती आंध्र प्रदेश, तेलंगाना, कर्नाटक और महाराष्ट्र में होती है। इसे गर्म जलवायु, उपजाऊ और अच्छी जलनिकासी वाली मिट्टी तथा सावधानीपूर्वक जल प्रबंधन पसंद है। यह फसल सामान्यतः 90 से 120 दिन लेती है और रोग-कीट की नियमित निगरानी की आवश्यकता होती है।"
    },
    garlic: {
      en: "Garlic is grown in Madhya Pradesh, Gujarat, Rajasthan, and Uttar Pradesh. It prefers cool climate during growth, well-drained loam soil, and moderate irrigation. The crop typically matures in about 120 to 150 days and is used for culinary and medicinal purposes.",
      hi: "लहसुन की खेती मध्य प्रदेश, गुजरात, राजस्थान और उत्तर प्रदेश में होती है। इसकी बढ़वार के समय ठंडी जलवायु, अच्छी जलनिकासी वाली दोमट मिट्टी और मध्यम सिंचाई उपयुक्त रहती है। यह फसल सामान्यतः 120 से 150 दिन में तैयार होती है और भोजन तथा औषधीय उपयोग दोनों के लिए महत्वपूर्ण है।"
    },
    ginger: {
      en: "Ginger is a spice crop grown in Kerala, Karnataka, Meghalaya, and Assam. It prefers warm humid climate, rich organic soil, and good drainage. The crop takes about 200 to 250 days and requires careful moisture and shade management.",
      hi: "अदरक एक मसाला फसल है जिसकी खेती केरल, कर्नाटक, मेघालय और असम में होती है। इसे गर्म और आर्द्र जलवायु, जैविक पदार्थों से भरपूर मिट्टी और अच्छी जलनिकासी पसंद है। यह फसल लगभग 200 से 250 दिन लेती है और नमी तथा छाया के सावधानीपूर्वक प्रबंधन की जरूरत होती है।"
    },
    turmeric: {
      en: "Turmeric is widely grown in Telangana, Maharashtra, Tamil Nadu, and Odisha. It requires warm humid conditions, fertile soil rich in organic matter, and regular irrigation. The crop matures in about 7 to 9 months and is valued for spice and medicinal use.",
      hi: "हल्दी की व्यापक खेती तेलंगाना, महाराष्ट्र, तमिलनाडु और ओडिशा में होती है। इसे गर्म और आर्द्र परिस्थितियाँ, जैविक पदार्थों से समृद्ध उपजाऊ मिट्टी और नियमित सिंचाई चाहिए। यह फसल लगभग 7 से 9 महीने में तैयार होती है और मसाले तथा औषधीय उपयोग के लिए महत्वपूर्ण है।"
    },
    banana: {
      en: "Banana is a major fruit crop grown in Tamil Nadu, Maharashtra, Gujarat, Andhra Pradesh, and Karnataka. It needs warm climate, rich fertile soil, and continuous water supply. The crop takes about 9 to 12 months and requires good nutrient and irrigation management.",
      hi: "केला एक प्रमुख फल फसल है जिसकी खेती तमिलनाडु, महाराष्ट्र, गुजरात, आंध्र प्रदेश और कर्नाटक में होती है। इसे गर्म जलवायु, उपजाऊ मिट्टी और निरंतर पानी की उपलब्धता चाहिए। यह फसल लगभग 9 से 12 महीने लेती है और अच्छे पोषण तथा सिंचाई प्रबंधन की मांग करती है।"
    },
    mango: {
      en: "Mango is a popular fruit crop grown in Uttar Pradesh, Andhra Pradesh, Maharashtra, and Karnataka. It prefers tropical climate, well-drained soil, and seasonal rainfall. Mango trees take several years to bear fruit but provide long-term yield and income.",
      hi: "आम एक लोकप्रिय फल फसल है जिसकी खेती उत्तर प्रदेश, आंध्र प्रदेश, महाराष्ट्र और कर्नाटक में होती है। इसे उष्णकटिबंधीय जलवायु, अच्छी जलनिकासी वाली मिट्टी और मौसमी वर्षा पसंद है। आम के पेड़ों को फल देने में कुछ वर्ष लगते हैं, लेकिन वे लंबे समय तक उत्पादन और आय देते हैं।"
    },
    papaya: {
      en: "Papaya is grown in Andhra Pradesh, Gujarat, Karnataka, and Maharashtra. It prefers warm climate, well-drained fertile soil, and regular watering. The crop starts yielding within 6 to 9 months and requires pest and disease monitoring.",
      hi: "पपीता की खेती आंध्र प्रदेश, गुजरात, कर्नाटक और महाराष्ट्र में होती है। इसे गर्म जलवायु, उपजाऊ और अच्छी जलनिकासी वाली मिट्टी तथा नियमित सिंचाई पसंद है। यह फसल 6 से 9 महीने में फल देना शुरू कर देती है और रोग-कीट की निगरानी आवश्यक होती है।"
    },
    guava: {
      en: "Guava is widely cultivated in Uttar Pradesh, Bihar, Maharashtra, and Andhra Pradesh. It grows well in tropical and subtropical climates with moderate irrigation. The crop is hardy, tolerant to different soils, and produces fruits within 2 to 3 years.",
      hi: "अमरूद की खेती उत्तर प्रदेश, बिहार, महाराष्ट्र और आंध्र प्रदेश में व्यापक रूप से होती है। यह उष्णकटिबंधीय और उपोष्णकटिबंधीय जलवायु में मध्यम सिंचाई के साथ अच्छी तरह बढ़ता है। यह एक मजबूत फसल है, विभिन्न मिट्टियों को सहन कर सकती है, और 2 से 3 वर्षों में फल देना शुरू कर देती है।"
    },
    watermelon: {
      en: "Watermelon is a summer fruit grown in Karnataka, Andhra Pradesh, Tamil Nadu, and Maharashtra. It prefers warm climate, sandy loam soil, and good drainage. The crop matures in about 70 to 90 days and needs proper irrigation during fruit development.",
      hi: "तरबूज एक गर्मियों का फल है जिसकी खेती कर्नाटक, आंध्र प्रदेश, तमिलनाडु और महाराष्ट्र में होती है। इसे गर्म जलवायु, बलुई दोमट मिट्टी और अच्छी जलनिकासी पसंद है। यह फसल 70 से 90 दिन में तैयार हो जाती है और फल विकास के समय उचित सिंचाई की जरूरत होती है।"
    },
    muskmelon: {
      en: "Muskmelon is grown in Uttar Pradesh, Punjab, Haryana, and Rajasthan. It thrives in warm dry climate, sandy loam soil, and requires proper irrigation. The crop usually takes about 70 to 85 days and is popular for its sweet fruits.",
      hi: "खरबूजा की खेती उत्तर प्रदेश, पंजाब, हरियाणा और राजस्थान में होती है। यह गर्म और शुष्क जलवायु, बलुई दोमट मिट्टी और उचित सिंचाई में अच्छी तरह बढ़ता है। यह फसल सामान्यतः 70 से 85 दिन लेती है और अपने मीठे फलों के लिए लोकप्रिय है।"
    },
    spinach: {
      en: "Spinach is a leafy vegetable grown in almost all states of India. It prefers cool climate, fertile soil, and regular irrigation. The crop grows quickly and can be harvested within 25 to 40 days, making it ideal for short-duration farming.",
      hi: "पालक एक पत्तेदार सब्जी है जो भारत के लगभग सभी राज्यों में उगाई जाती है। इसे ठंडी जलवायु, उपजाऊ मिट्टी और नियमित सिंचाई पसंद है। यह फसल बहुत तेजी से बढ़ती है और 25 से 40 दिन के भीतर काटी जा सकती है, इसलिए अल्पावधि खेती के लिए उपयुक्त है।"
    },
    carrot: {
      en: "Carrot is a root vegetable grown in Punjab, Haryana, Uttar Pradesh, and Karnataka. It prefers cool climate, loose sandy loam soil, and proper moisture. The crop matures in about 70 to 100 days and is widely used for fresh and processed products.",
      hi: "गाजर एक जड़ वाली सब्जी है जिसकी खेती पंजाब, हरियाणा, उत्तर प्रदेश और कर्नाटक में होती है। इसे ठंडी जलवायु, भुरभुरी बलुई दोमट मिट्टी और उचित नमी पसंद है। यह फसल 70 से 100 दिन में तैयार होती है और ताज़ा तथा प्रसंस्कृत उत्पादों में व्यापक उपयोग होती है।"
    },
    radish: {
      en: "Radish is a fast-growing root crop cultivated in Uttar Pradesh, Bihar, Punjab, and Haryana. It prefers cool climate, well-drained soil, and regular watering. The crop matures quickly in about 30 to 60 days.",
      hi: "मूली एक तेज़ी से बढ़ने वाली जड़ फसल है जिसकी खेती उत्तर प्रदेश, बिहार, पंजाब और हरियाणा में होती है। इसे ठंडी जलवायु, अच्छी जलनिकासी वाली मिट्टी और नियमित सिंचाई पसंद है। यह फसल 30 से 60 दिन में जल्दी तैयार हो जाती है।"
    },
    beetroot: {
      en: "Beetroot is grown in Maharashtra, Karnataka, and Tamil Nadu. It prefers cool climate, fertile well-drained soil, and consistent moisture. The crop usually matures in about 60 to 90 days and is valued for its nutritional benefits.",
      hi: "चुकंदर की खेती महाराष्ट्र, कर्नाटक और तमिलनाडु में होती है। इसे ठंडी जलवायु, उपजाऊ अच्छी जलनिकासी वाली मिट्टी और लगातार नमी पसंद है। यह फसल सामान्यतः 60 से 90 दिन में तैयार होती है और अपने पोषण लाभों के लिए महत्वपूर्ण मानी जाती है।"
    },
    peas: {
      en: "Peas are a Rabi pulse crop grown in Uttar Pradesh, Punjab, Haryana, and Madhya Pradesh. They prefer cool climate, well-drained soil, and moderate irrigation. The crop matures in about 80 to 100 days and is used for vegetables and pulses.",
      hi: "मटर एक रबी दलहनी फसल है जिसकी खेती उत्तर प्रदेश, पंजाब, हरियाणा और मध्य प्रदेश में होती है। इसे ठंडी जलवायु, अच्छी जलनिकासी वाली मिट्टी और मध्यम सिंचाई पसंद है। यह फसल 80 से 100 दिन में तैयार होती है और सब्जी तथा दाल दोनों रूपों में उपयोग होती है।"
    },
    cucumber: {
      en: "Cucumber is a summer vegetable grown in Karnataka, Maharashtra, Uttar Pradesh, and Andhra Pradesh. It prefers warm climate, well-drained soil, and regular watering. The crop matures in about 50 to 70 days and is widely used for fresh consumption.",
      hi: "खीरा एक गर्मियों की सब्जी है जिसकी खेती कर्नाटक, महाराष्ट्र, उत्तर प्रदेश और आंध्र प्रदेश में होती है। इसे गर्म जलवायु, अच्छी जलनिकासी वाली मिट्टी और नियमित सिंचाई पसंद है। यह फसल 50 से 70 दिन में तैयार होती है और ताज़ा उपयोग में व्यापक रूप से काम आती है।"
    },

    apple: {
      en: "Apple is a temperate fruit crop grown mainly in Himachal Pradesh, Jammu & Kashmir, and Uttarakhand. It requires cold winters, well-drained loamy soil, and chilling hours for proper flowering. The trees take a few years to bear fruit and need careful pruning and pest management.",
      hi: "सेब एक समशीतोष्ण फल फसल है जिसकी खेती मुख्य रूप से हिमाचल प्रदेश, जम्मू-कश्मीर और उत्तराखंड में होती है। इसे ठंडी सर्दियाँ, अच्छी जलनिकासी वाली दोमट मिट्टी और सही फूल आने के लिए पर्याप्त ठंडे घंटे चाहिए होते हैं। पेड़ों को फल देने में कुछ वर्ष लगते हैं और सावधानीपूर्वक छँटाई तथा रोग-कीट प्रबंधन की आवश्यकता होती है।"
    },
    orange: {
      en: "Orange is widely grown in Maharashtra, Madhya Pradesh, Punjab, and Rajasthan. It prefers warm climate, well-drained soil, and moderate irrigation. The crop takes about 3 to 4 years to start bearing fruit and requires proper nutrient management.",
      hi: "संतरे की खेती महाराष्ट्र, मध्य प्रदेश, पंजाब और राजस्थान में व्यापक रूप से होती है। इसे गर्म जलवायु, अच्छी जलनिकासी वाली मिट्टी और मध्यम सिंचाई पसंद है। फल देना शुरू करने में लगभग 3 से 4 वर्ष लगते हैं और उचित पोषण प्रबंधन आवश्यक होता है।"
    },
    grapes: {
      en: "Grapes are cultivated mainly in Maharashtra, Karnataka, Tamil Nadu, and Andhra Pradesh. They require warm dry climate, well-drained soil, and proper training and pruning systems. The crop yields fruit in about 2 to 3 years and is used for fresh consumption and processing.",
      hi: "अंगूर की खेती मुख्य रूप से महाराष्ट्र, कर्नाटक, तमिलनाडु और आंध्र प्रदेश में होती है। इसे गर्म और शुष्क जलवायु, अच्छी जलनिकासी वाली मिट्टी तथा उचित सहारा और छँटाई प्रणाली की आवश्यकता होती है। यह फसल 2 से 3 वर्ष में फल देना शुरू करती है और ताज़ा उपयोग तथा प्रसंस्करण दोनों के लिए उपयोगी है।"
    },
    pomegranate: {
      en: "Pomegranate is grown in Maharashtra, Karnataka, Gujarat, and Andhra Pradesh. It thrives in semi-arid conditions, requires well-drained soil, and moderate irrigation. The crop starts yielding in about 2 to 3 years and is valued for export and health benefits.",
      hi: "अनार की खेती महाराष्ट्र, कर्नाटक, गुजरात और आंध्र प्रदेश में होती है। यह अर्ध-शुष्क परिस्थितियों में अच्छी तरह बढ़ता है, अच्छी जलनिकासी वाली मिट्टी और मध्यम सिंचाई चाहता है। यह फसल लगभग 2 से 3 वर्ष में फल देना शुरू करती है और निर्यात तथा स्वास्थ्य लाभों के लिए महत्वपूर्ण मानी जाती है।"
    },
    pineapple: {
      en: "Pineapple is grown in Assam, West Bengal, Kerala, and Tripura. It prefers warm humid climate, well-drained sandy loam soil, and moderate rainfall. The crop usually matures in about 18 to 24 months and requires good drainage.",
      hi: "अनानास की खेती असम, पश्चिम बंगाल, केरल और त्रिपुरा में होती है। इसे गर्म और आर्द्र जलवायु, अच्छी जलनिकासी वाली बलुई दोमट मिट्टी और मध्यम वर्षा पसंद है। यह फसल सामान्यतः 18 से 24 महीने में तैयार होती है और अच्छी जलनिकासी आवश्यक होती है।"
    },
    litchi: {
      en: "Litchi is cultivated in Bihar, West Bengal, Uttar Pradesh, and Jharkhand. It requires warm humid climate, deep fertile soil, and regular irrigation. The trees take several years to bear fruit and need protection from extreme weather.",
      hi: "लीची की खेती बिहार, पश्चिम बंगाल, उत्तर प्रदेश और झारखंड में होती है। इसे गर्म और आर्द्र जलवायु, गहरी उपजाऊ मिट्टी और नियमित सिंचाई चाहिए। पेड़ों को फल देने में कई वर्ष लगते हैं और अत्यधिक मौसम से सुरक्षा की जरूरत होती है।"
    },
    sapota: {
      en: "Sapota, also known as chikoo, is grown in Maharashtra, Gujarat, Karnataka, and Tamil Nadu. It prefers warm climate, well-drained soil, and moderate irrigation. The crop starts yielding in about 2 to 3 years and is suitable for long-term orchards.",
      hi: "सपोटा, जिसे चीकू भी कहा जाता है, महाराष्ट्र, गुजरात, कर्नाटक और तमिलनाडु में उगाया जाता है। इसे गर्म जलवायु, अच्छी जलनिकासी वाली मिट्टी और मध्यम सिंचाई पसंद है। यह फसल लगभग 2 से 3 वर्ष में फल देना शुरू करती है और दीर्घकालिक बागानों के लिए उपयुक्त है।"
    },
    custard_apple: {
      en: "Custard apple is grown in Maharashtra, Andhra Pradesh, and Madhya Pradesh. It is suited to dry climates, requires minimal irrigation, and grows well in light soils. The crop is hardy and begins yielding in a few years.",
      hi: "सीताफल की खेती महाराष्ट्र, आंध्र प्रदेश और मध्य प्रदेश में होती है। यह शुष्क जलवायु के लिए उपयुक्त है, कम सिंचाई में भी बढ़ सकता है और हल्की मिट्टियों में अच्छा उगता है। यह एक मजबूत फसल है और कुछ वर्षों में फल देना शुरू कर देती है।"
    },
    jackfruit: {
      en: "Jackfruit is widely grown in Kerala, Karnataka, Tamil Nadu, and Assam. It thrives in warm humid climates and well-drained soil. The tree produces large fruits after several years and requires minimal maintenance.",
      hi: "कटहल की खेती केरल, कर्नाटक, तमिलनाडु और असम में व्यापक रूप से होती है। यह गर्म और आर्द्र जलवायु तथा अच्छी जलनिकासी वाली मिट्टी में अच्छी तरह बढ़ता है। पेड़ कुछ वर्षों बाद बड़े फल देना शुरू करता है और इसकी देखभाल अपेक्षाकृत कम होती है।"
    },
    pear: {
      en: "Pear is cultivated in Himachal Pradesh, Jammu & Kashmir, and Uttarakhand. It requires cool climate, well-drained soil, and proper chilling for fruit development. The crop takes a few years to bear fruit.",
      hi: "नाशपाती की खेती हिमाचल प्रदेश, जम्मू-कश्मीर और उत्तराखंड में होती है। इसे ठंडी जलवायु, अच्छी जलनिकासी वाली मिट्टी और फल विकास के लिए पर्याप्त ठंड की आवश्यकता होती है। फल देने में कुछ वर्ष लगते हैं।"
    },
    plum: {
      en: "Plum is grown in Himachal Pradesh, Uttarakhand, and Jammu & Kashmir. It prefers cool climate, fertile soil, and moderate irrigation. The crop starts yielding in about 3 to 4 years.",
      hi: "प्लम की खेती हिमाचल प्रदेश, उत्तराखंड और जम्मू-कश्मीर में होती है। इसे ठंडी जलवायु, उपजाऊ मिट्टी और मध्यम सिंचाई पसंद है। यह फसल लगभग 3 से 4 वर्ष में फल देना शुरू करती है।"
    },
    peach: {
      en: "Peach is grown in Himachal Pradesh, Uttarakhand, and Jammu & Kashmir. It requires cool climate, good sunlight, and well-drained soil. The crop matures in about 3 to 4 years and needs regular pruning.",
      hi: "आड़ू की खेती हिमाचल प्रदेश, उत्तराखंड और जम्मू-कश्मीर में होती है। इसे ठंडी जलवायु, अच्छी धूप और अच्छी जलनिकासी वाली मिट्टी चाहिए। यह फसल लगभग 3 से 4 वर्ष में फल देने लगती है और नियमित छँटाई की आवश्यकता होती है।"
    },
    apricot: {
      en: "Apricot is cultivated in Himachal Pradesh, Ladakh, and Jammu & Kashmir. It prefers dry temperate climate, well-drained soil, and low humidity. The crop starts yielding after a few years.",
      hi: "खुबानी की खेती हिमाचल प्रदेश, लद्दाख और जम्मू-कश्मीर में होती है। इसे शुष्क समशीतोष्ण जलवायु, अच्छी जलनिकासी वाली मिट्टी और कम आर्द्रता पसंद है। यह फसल कुछ वर्षों बाद फल देना शुरू करती है।"
    },
    kiwi: {
      en: "Kiwi is grown in Arunachal Pradesh, Himachal Pradesh, and Nagaland. It requires cool climate, fertile soil, and proper support structures for vines. The crop takes about 3 to 5 years to bear fruit.",
      hi: "कीवी की खेती अरुणाचल प्रदेश, हिमाचल प्रदेश और नागालैंड में होती है। इसे ठंडी जलवायु, उपजाऊ मिट्टी और बेलों के लिए उचित सहारा संरचना चाहिए। यह फसल लगभग 3 से 5 वर्ष में फल देना शुरू करती है।"
    },
    passion_fruit: {
      en: "Passion fruit is cultivated in Kerala, Karnataka, and northeastern states. It prefers warm climate, well-drained soil, and support for climbing vines. The crop starts yielding within 1 to 2 years.",
      hi: "पैशन फ्रूट की खेती केरल, कर्नाटक और उत्तर-पूर्वी राज्यों में होती है। इसे गर्म जलवायु, अच्छी जलनिकासी वाली मिट्टी और चढ़ने वाली बेलों के लिए सहारे की आवश्यकता होती है। यह फसल 1 से 2 वर्षों के भीतर फल देना शुरू कर देती है।"
    },
    dragon_fruit: {
      en: "Dragon fruit is gaining popularity in Gujarat, Maharashtra, Karnataka, and Andhra Pradesh. It grows well in warm climates, requires minimal water, and thrives in well-drained soil. The crop yields within 1 to 2 years.",
      hi: "ड्रैगन फ्रूट गुजरात, महाराष्ट्र, कर्नाटक और आंध्र प्रदेश में तेजी से लोकप्रिय हो रहा है। यह गर्म जलवायु में अच्छी तरह बढ़ता है, कम पानी चाहता है और अच्छी जलनिकासी वाली मिट्टी में अच्छा प्रदर्शन करता है। यह फसल 1 से 2 वर्षों में फल देना शुरू कर देती है।"
    },
    fig: {
      en: "Fig is grown in Maharashtra, Karnataka, and Tamil Nadu. It prefers dry warm climate, well-drained soil, and minimal irrigation. The crop starts yielding within 2 to 3 years.",
      hi: "अंजीर की खेती महाराष्ट्र, कर्नाटक और तमिलनाडु में होती है। इसे गर्म और शुष्क जलवायु, अच्छी जलनिकासी वाली मिट्टी और कम सिंचाई पसंद है। यह फसल 2 से 3 वर्ष के भीतर फल देना शुरू कर देती है।"
    },
    aonla: {
      en: "Aonla, or Indian gooseberry, is grown in Uttar Pradesh, Madhya Pradesh, and Rajasthan. It is hardy, drought-tolerant, and grows well in poor soils. The tree yields fruit after a few years and is valued for medicinal use.",
      hi: "आँवला, जिसे इंडियन गूसबेरी भी कहते हैं, उत्तर प्रदेश, मध्य प्रदेश और राजस्थान में उगाया जाता है। यह एक मजबूत और सूखा-सहनशील वृक्ष है जो अपेक्षाकृत कमजोर मिट्टियों में भी बढ़ सकता है। कुछ वर्षों बाद फल देता है और औषधीय उपयोग के लिए बहुत महत्वपूर्ण माना जाता है।"
    },
    ber: {
      en: "Ber is grown in Rajasthan, Gujarat, Maharashtra, and Uttar Pradesh. It thrives in arid climates, requires minimal care, and grows in poor soils. The crop is highly drought-tolerant and produces fruit within a few years.",
      hi: "बेर की खेती राजस्थान, गुजरात, महाराष्ट्र और उत्तर प्रदेश में होती है। यह शुष्क जलवायु में अच्छी तरह बढ़ता है, कम देखभाल चाहता है और कमजोर मिट्टियों में भी उग सकता है। यह अत्यधिक सूखा-सहनशील है और कुछ वर्षों में फल देना शुरू कर देता है।"
    },
    jamun: {
      en: "Jamun is grown in Uttar Pradesh, Maharashtra, Karnataka, and Bihar. It prefers warm climate, deep soil, and moderate rainfall. The tree takes several years to bear fruit but is valued for nutrition and medicinal benefits.",
      hi: "जामुन की खेती उत्तर प्रदेश, महाराष्ट्र, कर्नाटक और बिहार में होती है। इसे गर्म जलवायु, गहरी मिट्टी और मध्यम वर्षा पसंद है। पेड़ को फल देने में कई वर्ष लगते हैं, लेकिन यह पोषण और औषधीय लाभों के लिए बहुत महत्वपूर्ण है।"
    },

    oats: {
      en: "Oats is a Rabi fodder and cereal crop grown in Punjab, Haryana, Uttar Pradesh, and Rajasthan. It prefers cool climate, fertile loam soil, and moderate irrigation. The crop matures in about 100 to 120 days and is mainly used for fodder and health foods.",
      hi: "ओट्स एक रबी चारा और अनाज फसल है जिसकी खेती पंजाब, हरियाणा, उत्तर प्रदेश और राजस्थान में होती है। इसे ठंडी जलवायु, उपजाऊ दोमट मिट्टी और मध्यम सिंचाई पसंद है। यह फसल 100 से 120 दिन में तैयार होती है और मुख्य रूप से चारे तथा स्वास्थ्यवर्धक खाद्य पदार्थों के लिए उपयोग की जाती है।"
    },
    linseed: {
      en: "Linseed, or flaxseed, is a Rabi oilseed crop grown in Madhya Pradesh, Uttar Pradesh, and Maharashtra. It prefers cool climate, well-drained soil, and low to moderate irrigation. The crop matures in about 120 to 140 days and is valued for oil and fiber.",
      hi: "अलसी एक रबी तिलहनी फसल है जिसकी खेती मध्य प्रदेश, उत्तर प्रदेश और महाराष्ट्र में होती है। इसे ठंडी जलवायु, अच्छी जलनिकासी वाली मिट्टी और कम से मध्यम सिंचाई पसंद है। यह फसल 120 से 140 दिन में तैयार होती है और तेल तथा रेशे दोनों के लिए महत्वपूर्ण है।"
    },
    safflower: {
      en: "Safflower is a drought-tolerant Rabi oilseed crop grown in Maharashtra, Karnataka, and Andhra Pradesh. It prefers dry climate, well-drained soil, and minimal irrigation. The crop takes about 110 to 140 days and is used for edible oil.",
      hi: "कुसुम एक सूखा-सहनशील रबी तिलहनी फसल है जिसकी खेती महाराष्ट्र, कर्नाटक और आंध्र प्रदेश में होती है। इसे शुष्क जलवायु, अच्छी जलनिकासी वाली मिट्टी और बहुत कम सिंचाई पसंद है। यह फसल 110 से 140 दिन लेती है और खाद्य तेल के लिए उपयोग की जाती है।"
    },
    field_pea: {
      en: "Field pea is a Rabi pulse grown in Uttar Pradesh, Madhya Pradesh, and Bihar. It prefers cool climate, fertile well-drained soil, and moderate irrigation. The crop matures in about 90 to 120 days and is used for food and fodder.",
      hi: "फील्ड पी एक रबी दलहनी फसल है जिसकी खेती उत्तर प्रदेश, मध्य प्रदेश और बिहार में होती है। इसे ठंडी जलवायु, उपजाऊ अच्छी जलनिकासी वाली मिट्टी और मध्यम सिंचाई पसंद है। यह फसल 90 से 120 दिन में तैयार होती है और भोजन तथा चारे दोनों के लिए उपयोगी है।"
    },
    horse_gram: {
      en: "Horse gram is a hardy pulse grown in Karnataka, Andhra Pradesh, and Tamil Nadu. It tolerates poor soils and low rainfall, making it suitable for dry regions. The crop matures in about 100 to 120 days and is valued for nutrition and fodder.",
      hi: "कुल्थी एक मजबूत दलहनी फसल है जिसकी खेती कर्नाटक, आंध्र प्रदेश और तमिलनाडु में होती है। यह कमजोर मिट्टी और कम वर्षा को सहन करती है, इसलिए शुष्क क्षेत्रों के लिए उपयुक्त है। यह फसल 100 से 120 दिन में तैयार होती है और पोषण तथा चारे के लिए उपयोगी है।"
    },
    fenugreek: {
      en: "Fenugreek, or methi, is a Rabi crop grown in Rajasthan, Gujarat, and Uttar Pradesh. It prefers cool climate, well-drained soil, and light irrigation. The crop matures in about 90 to 110 days and is used as a leafy vegetable and spice.",
      hi: "मेथी एक रबी फसल है जिसकी खेती राजस्थान, गुजरात और उत्तर प्रदेश में होती है। इसे ठंडी जलवायु, अच्छी जलनिकासी वाली मिट्टी और हल्की सिंचाई पसंद है। यह फसल 90 से 110 दिन में तैयार होती है और पत्तेदार सब्जी तथा मसाले दोनों के रूप में उपयोग की जाती है।"
    },
    coriander: {
      en: "Coriander is a Rabi spice crop grown in Rajasthan, Madhya Pradesh, and Gujarat. It prefers cool dry climate, fertile soil, and moderate irrigation. The crop matures in about 90 to 110 days and is used for leaves and seeds.",
      hi: "धनिया एक रबी मसाला फसल है जिसकी खेती राजस्थान, मध्य प्रदेश और गुजरात में होती है। इसे ठंडी और शुष्क जलवायु, उपजाऊ मिट्टी और मध्यम सिंचाई पसंद है। यह फसल 90 से 110 दिन में तैयार होती है और इसकी पत्तियाँ तथा बीज दोनों उपयोगी हैं।"
    },
    cumin: {
      en: "Cumin is a Rabi spice crop grown in Gujarat and Rajasthan. It requires cool dry climate, well-drained sandy soil, and low humidity. The crop matures in about 100 to 120 days and is highly valued as a spice.",
      hi: "जीरा एक रबी मसाला फसल है जिसकी खेती गुजरात और राजस्थान में होती है। इसे ठंडी और शुष्क जलवायु, अच्छी जलनिकासी वाली रेतीली मिट्टी और कम आर्द्रता चाहिए। यह फसल 100 से 120 दिन में तैयार होती है और एक मूल्यवान मसाले के रूप में जानी जाती है।"
    },
    isabgol: {
      en: "Isabgol, or psyllium, is grown in Gujarat, Rajasthan, and Madhya Pradesh. It prefers cool dry climate, light soil, and low irrigation. The crop matures in about 110 to 130 days and is used for medicinal purposes.",
      hi: "इसबगोल की खेती गुजरात, राजस्थान और मध्य प्रदेश में होती है। इसे ठंडी और शुष्क जलवायु, हल्की मिट्टी और कम सिंचाई पसंद है। यह फसल 110 से 130 दिन में तैयार होती है और मुख्य रूप से औषधीय उपयोग में आती है।"
    },
    lucerne: {
      en: "Lucerne, also called alfalfa, is a Rabi fodder crop grown in Punjab, Haryana, and Uttar Pradesh. It prefers cool climate, fertile soil, and regular irrigation. It provides multiple cuts and is highly nutritious for livestock.",
      hi: "ल्यूसर्न, जिसे अल्फाल्फा भी कहते हैं, एक रबी चारा फसल है जिसकी खेती पंजाब, हरियाणा और उत्तर प्रदेश में होती है। इसे ठंडी जलवायु, उपजाऊ मिट्टी और नियमित सिंचाई पसंद है। इसमें कई कटिंग मिलती हैं और यह पशुओं के लिए अत्यधिक पौष्टिक चारा है।"
    },
    toria: {
      en: "Toria is an early Rabi oilseed crop grown in Assam, West Bengal, and Bihar. It prefers cool climate, well-drained soil, and moderate irrigation. The crop matures in about 75 to 90 days and is used for oil production.",
      hi: "तोरिया एक जल्दी तैयार होने वाली रबी तिलहनी फसल है जिसकी खेती असम, पश्चिम बंगाल और बिहार में होती है। इसे ठंडी जलवायु, अच्छी जलनिकासी वाली मिट्टी और मध्यम सिंचाई पसंद है। यह फसल 75 से 90 दिन में तैयार हो जाती है और तेल उत्पादन के लिए उपयोगी है।"
    },
    rapeseed: {
      en: "Rapeseed is a Rabi oilseed crop grown in Rajasthan, Uttar Pradesh, and Haryana. It prefers cool climate, fertile soil, and moderate irrigation. The crop matures in about 110 to 140 days and is used for edible oil.",
      hi: "रेपसीड एक रबी तिलहनी फसल है जिसकी खेती राजस्थान, उत्तर प्रदेश और हरियाणा में होती है। इसे ठंडी जलवायु, उपजाऊ मिट्टी और मध्यम सिंचाई पसंद है। यह फसल 110 से 140 दिन में तैयार होती है और खाद्य तेल के लिए उपयोग की जाती है।"
    },
    fennel: {
      en: "Fennel is a Rabi spice crop grown in Gujarat, Rajasthan, and Uttar Pradesh. It prefers cool climate, well-drained soil, and regular irrigation. The crop matures in about 110 to 130 days and is used for seeds and flavoring.",
      hi: "सौंफ एक रबी मसाला फसल है जिसकी खेती गुजरात, राजस्थान और उत्तर प्रदेश में होती है। इसे ठंडी जलवायु, अच्छी जलनिकासी वाली मिट्टी और नियमित सिंचाई पसंद है। यह फसल 110 से 130 दिन में तैयार होती है और बीज तथा स्वाद बढ़ाने के लिए उपयोगी है।"
    },
    ajwain: {
      en: "Ajwain is a Rabi spice crop grown in Rajasthan and Gujarat. It prefers dry climate, well-drained soil, and minimal irrigation. The crop matures in about 120 to 140 days and is valued for medicinal and culinary uses.",
      hi: "अजवाइन एक रबी मसाला फसल है जिसकी खेती राजस्थान और गुजरात में होती है। इसे शुष्क जलवायु, अच्छी जलनिकासी वाली मिट्टी और बहुत कम सिंचाई पसंद है। यह फसल 120 से 140 दिन में तैयार होती है और औषधीय तथा पाक उपयोगों के लिए महत्वपूर्ण है।"
    },
    dill: {
      en: "Dill is a Rabi herb crop grown in Rajasthan, Gujarat, and Punjab. It prefers cool climate, light soil, and moderate irrigation. The crop matures in about 100 to 120 days and is used for seeds and leaves.",
      hi: "डिल एक रबी हर्ब फसल है जिसकी खेती राजस्थान, गुजरात और पंजाब में होती है। इसे ठंडी जलवायु, हल्की मिट्टी और मध्यम सिंचाई पसंद है। यह फसल 100 से 120 दिन में तैयार होती है और इसके बीज तथा पत्तियाँ दोनों उपयोगी हैं।"
    },
    celery: {
      en: "Celery is a Rabi vegetable grown in Punjab, Haryana, and Uttar Pradesh. It prefers cool climate, fertile soil, and regular watering. The crop matures in about 120 to 150 days and is used for leaves and stems.",
      hi: "सेलेरी एक रबी सब्जी है जिसकी खेती पंजाब, हरियाणा और उत्तर प्रदेश में होती है। इसे ठंडी जलवायु, उपजाऊ मिट्टी और नियमित सिंचाई पसंद है। यह फसल 120 से 150 दिन में तैयार होती है और इसकी पत्तियाँ तथा डंठल दोनों उपयोग किए जाते हैं।"
    },
    lettuce: {
      en: "Lettuce is a leafy Rabi vegetable grown in many parts of India. It prefers cool climate, fertile soil, and regular irrigation. The crop matures quickly in about 45 to 60 days and is used in salads.",
      hi: "लेट्यूस एक पत्तेदार रबी सब्जी है जो भारत के कई हिस्सों में उगाई जाती है। इसे ठंडी जलवायु, उपजाऊ मिट्टी और नियमित सिंचाई पसंद है। यह फसल 45 से 60 दिन में जल्दी तैयार हो जाती है और सलाद में उपयोग होती है।"
    },
    broccoli: {
      en: "Broccoli is a Rabi vegetable grown in Himachal Pradesh, Uttar Pradesh, and Karnataka. It prefers cool climate, fertile soil, and proper moisture. The crop matures in about 80 to 100 days and is valued for nutrition.",
      hi: "ब्रोकली एक रबी सब्जी है जिसकी खेती हिमाचल प्रदेश, उत्तर प्रदेश और कर्नाटक में होती है। इसे ठंडी जलवायु, उपजाऊ मिट्टी और उचित नमी पसंद है। यह फसल 80 से 100 दिन में तैयार होती है और पोषण के लिए मूल्यवान मानी जाती है।"
    },
    asparagus: {
      en: "Asparagus is a perennial vegetable grown in cool regions with fertile soil and good drainage. It requires proper care and irrigation and starts yielding after a few years of planting.",
      hi: "एस्पैरागस एक बहुवर्षीय सब्जी है जो ठंडे क्षेत्रों में उपजाऊ और अच्छी जलनिकासी वाली मिट्टी में उगाई जाती है। इसे उचित देखभाल और सिंचाई की आवश्यकता होती है तथा रोपण के कुछ वर्षों बाद उत्पादन देना शुरू करती है।"
    },
    parsley: {
      en: "Parsley is a Rabi herb grown in cool climates with fertile well-drained soil. It requires regular watering and matures in about 70 to 90 days, mainly used for flavoring and garnishing.",
      hi: "पार्सले एक रबी हर्ब है जो ठंडी जलवायु और उपजाऊ अच्छी जलनिकासी वाली मिट्टी में उगाई जाती है। इसे नियमित सिंचाई चाहिए और यह लगभग 70 से 90 दिन में तैयार हो जाती है। इसका उपयोग मुख्य रूप से स्वाद बढ़ाने और सजावट के लिए किया जाता है।"
    }

  },


  knowledgeBase: [
    {
      intent: "greeting",
      tags: ["greeting", "hello", "hi", "namaste"],
      response: {
        en: "Namaste! I am KisanBot. You can ask me about crops, pests, fertilizer, irrigation, weather, mandi prices, or government schemes.",
        hi: "नमस्ते! मैं किसानबॉट हूँ। आप मुझसे फसल, कीट, खाद, सिंचाई, मौसम, मंडी भाव या सरकारी योजनाओं के बारे में पूछ सकते हैं।",
        mr: "नमस्कार! मी किसानबॉट आहे. तुम्ही मला पीक, किडी, खत, सिंचन, हवामान, मंडी दर किंवा सरकारी योजनांबद्दल विचारू शकता."
      },
      followUp: {
        en: "Tell me your question in simple words and I will try to help.",
        hi: "अपना सवाल आसान शब्दों में लिखिए, मैं मदद करने की कोशिश करूँगा।",
        mr: "तुमचा प्रश्न सोप्या शब्दांत लिहा, मी मदत करण्याचा प्रयत्न करीन."
      }
    },
    {
      intent: "crop_advice",
      tags: ["crop_advice", "wheat", "rabi", "black soil"],
      response: {
        en: "Wheat is a strong Rabi option when temperatures stay cool and soil moisture is manageable. If your land has medium fertility, prepare fine seedbed, use timely sowing, and check irrigation stages at crown root initiation and grain filling.",
        hi: "गेहूं रबी मौसम के लिए अच्छा विकल्प है, खासकर जब तापमान ठंडा हो और मिट्टी में संतुलित नमी हो। समय पर बुवाई करें, खेत की अच्छी तैयारी करें और महत्वपूर्ण सिंचाई चरणों पर ध्यान दें।",
        mr: "गहू रबी हंगाम्यासाठी चांगला पर्याय आहे, विशेषतः थंड हवामान आणि योग्य मातीतील ओलावा असेल तर. वेळेवर पेरणी, चांगली जमीन तयारी आणि महत्त्वाच्या सिंचन टप्प्यांवर लक्ष द्या."
      },
      followUp: {
        en: "Tell me your crop, season, and state for a more exact recommendation.",
        hi: "अधिक सही सलाह के लिए अपनी फसल, मौसम और राज्य बताइए।",
        mr: "अधिक अचूक सल्ल्यासाठी तुमचे पीक, हंगाम आणि राज्य सांगा."
      }
    },
    {
      intent: "pest_control",
      tags: ["pest_control", "yellow", "leaf", "disease", "pest"],
      response: {
        en: "Yellow leaves can come from nutrient deficiency, sucking pests, or fungal stress. First check whether only lower leaves are yellow, whether insects are visible under the leaf, and whether the field stayed wet after rain.",
        hi: "पीली पत्तियाँ पोषक कमी, रस चूसने वाले कीट या फफूंद तनाव की वजह से हो सकती हैं। पहले देखें कि पीली पत्तियाँ नीचे की हैं या नहीं, पत्तों के नीचे कीट हैं या नहीं, और बारिश के बाद खेत ज्यादा गीला तो नहीं रहा।",
        mr: "पिवळी पाने ही अन्नद्रव्यांची कमतरता, रस शोषक किडी किंवा बुरशीजन्य ताणामुळे येऊ शकतात. प्रथम पाहा की पिवळी पाने खालच्या बाजूची आहेत का, पानांच्या खाली किडी दिसतात का, आणि पावसानंतर शेत जास्त ओले राहिले का."
      },
      followUp: {
        en: "Tell me the crop name and the exact symptom like yellow leaves, spots, wilting, or insects.",
        hi: "फसल का नाम और सही लक्षण बताइए जैसे पीली पत्तियाँ, धब्बे, मुरझाना या कीट।",
        mr: "पीकाचे नाव आणि नेमकी लक्षणे सांगा जसे पिवळी पाने, डाग, कोमेजणे किंवा किडी."
      }
    },
    {
      intent: "fertilizer",
      tags: ["fertilizer", "urea", "npk", "compost"],
      response: {
        en: "Fertilizer advice should depend on crop, stage, and soil status. As a safe basic rule, do not apply extra urea blindly; first identify crop stage and whether the issue is actually nitrogen deficiency.",
        hi: "खाद की सलाह फसल, अवस्था और मिट्टी की स्थिति पर निर्भर होनी चाहिए। एक सुरक्षित सामान्य नियम यह है कि बिना जांच अतिरिक्त यूरिया न डालें; पहले फसल की अवस्था और नाइट्रोजन कमी की पुष्टि करें।",
        mr: "खताचा सल्ला पीक, वाढीचा टप्पा आणि मातीच्या स्थितीवर अवलंबून असतो. सुरक्षित मूलभूत नियम असा की तपासणीशिवाय अतिरिक्त युरिया देऊ नका; प्रथम वाढीचा टप्पा आणि नायट्रोजन कमतरता तपासा."
      },
      followUp: {
        en: "Tell me the crop and growth stage so I can narrow the fertilizer advice.",
        hi: "फसल और उसकी अवस्था बताइए ताकि मैं खाद की सलाह बेहतर दे सकूँ।",
        mr: "पीक आणि वाढीचा टप्पा सांगा म्हणजे मी खताचा सल्ला अधिक अचूक देऊ शकेन."
      }
    },
    {
      intent: "market",
      tags: ["market", "mandi", "price", "sell"],
      response: {
        en: "For live mandi pricing, compare modal price, not just maximum price. Check arrival date, nearby state markets, and whether quality or variety is different before deciding when to sell.",
        hi: "लाइव मंडी भाव देखते समय केवल अधिकतम भाव नहीं, बल्कि मोडल भाव की तुलना करें। बेचने से पहले आगमन तिथि, पास के बाजार और गुणवत्ता/किस्म का फर्क भी देखें।",
        mr: "लाइव्ह मंडी दर पाहताना फक्त कमाल दर न पाहता मोडल दराची तुलना करा. विक्रीपूर्वी आगमन तारीख, जवळच्या बाजारातील दर आणि दर्जा/जात यांतील फरकही पाहा."
      },
      followUp: {
        en: "Tell me the commodity name and state if you want a selling suggestion.",
        hi: "अगर बिक्री सुझाव चाहिए तो फसल/कमोडिटी का नाम और राज्य बताइए।",
        mr: "विक्रीचा सल्ला हवा असेल तर कमोडिटीचे नाव आणि राज्य सांगा."
      }
    },
    {
      intent: "weather",
      tags: ["weather", "rain", "forecast", "humidity"],
      response: {
        en: "Weather decisions are most useful when linked to farming action. Use rain forecast for spray timing, humidity for disease risk, and wind speed before any spraying or irrigation planning.",
        hi: "मौसम की जानकारी तभी सबसे उपयोगी होती है जब उसे खेती के फैसलों से जोड़ा जाए। बारिश का पूर्वानुमान स्प्रे समय के लिए, नमी रोग जोखिम के लिए और हवा की गति छिड़काव/सिंचाई योजना के लिए देखें।",
        mr: "हवामानाची माहिती तेव्हाच जास्त उपयोगी ठरते जेव्हा ती शेतीच्या निर्णयांशी जोडली जाते. पावसाचा अंदाज फवारणीसाठी, आर्द्रता रोगधोक्यासाठी आणि वाऱ्याचा वेग फवारणी/सिंचन नियोजनासाठी वापरा."
      },
      followUp: {
        en: "Tell me your crop and whether you are deciding about spraying, irrigation, or sowing.",
        hi: "अपनी फसल और यह बताइए कि निर्णय स्प्रे, सिंचाई या बुवाई के लिए चाहिए।",
        mr: "तुमचे पीक आणि निर्णय फवारणी, सिंचन की पेरणीसाठी आहे ते सांगा."
      }
    },
    {
      intent: "app_help",
      tags: ["app_help", "app", "dashboard", "market", "weather"],
      response: {
        en: "I can help you use this app too. The Home page is for quick access, Weather gives live forecast, Market shows mandi prices, and Dashboard shows your key updates in one place.",
        hi: "मैं इस ऐप का उपयोग समझाने में भी मदद कर सकता हूँ। होम पेज त्वरित पहुँच के लिए है, मौसम पेज लाइव पूर्वानुमान देता है, बाजार पेज मंडी भाव दिखाता है और डैशबोर्ड मुख्य अपडेट एक जगह दिखाता है।",
        mr: "मी या अॅपचा वापर समजावून सांगू शकतो. होम पेज जलद प्रवेशासाठी आहे, हवामान पेज लाइव्ह अंदाज देते, बाजार पेज मंडी दर दाखवते आणि डॅशबोर्ड मुख्य अपडेट्स एकाच ठिकाणी दाखवतो."
      },
      followUp: {
        en: "Tell me which page or feature you want help with.",
        hi: "बताइए कि किस पेज या फीचर में मदद चाहिए।",
        mr: "कोणत्या पेज किंवा फीचरमध्ये मदत हवी ते सांगा."
      }
    },
    {
      intent: "soil_info",
      tags: ["soil", "mitti", "ph", "black soil", "red soil", "loam"],
      response: {
        en: "Suitable soil depends on the crop, drainage, and water-holding capacity. In general, loam or clay loam works well for many field crops, while pH and local rainfall should also be checked before sowing.",
        hi: "उपयुक्त मिट्टी फसल, जल निकास और नमी रोकने की क्षमता पर निर्भर करती है। सामान्य रूप से दोमट या चिकनी दोमट मिट्टी कई फसलों के लिए अच्छी रहती है, लेकिन बुवाई से पहले pH और स्थानीय वर्षा भी देखनी चाहिए।",
        mr: "योग्य माती पीक, निचरा आणि ओलावा धरण्याच्या क्षमतेवर अवलंबून असते. सर्वसाधारणपणे लोम किंवा चिकण लोम माती अनेक पिकांसाठी चांगली असते, पण पेरणीपूर्वी pH आणि स्थानिक पावसाचाही विचार करावा."
      },
      followUp: {
        en: "Tell me the crop name if you want the best soil type for that crop.",
        hi: "अगर किसी खास फसल के लिए उपयुक्त मिट्टी चाहिए तो फसल का नाम बताइए।",
        mr: "विशिष्ट पिकासाठी योग्य माती हवी असल्यास पीकाचे नाव सांगा."
      }
    },
    {
      intent: "schemes",
      tags: ["scheme", "subsidy", "pm-kisan", "insurance", "loan", "kcc"],
      response: {
        en: "Government scheme advice depends on whether you need income support, insurance, irrigation subsidy, or credit. Start by checking eligibility, land records, Aadhaar linkage, and the last application date.",
        hi: "सरकारी योजना की सलाह इस बात पर निर्भर करती है कि आपको आय सहायता, बीमा, सिंचाई सब्सिडी या ऋण में क्या चाहिए। पहले पात्रता, भूमि रिकॉर्ड, आधार लिंक और आवेदन की अंतिम तिथि जांचें।",
        mr: "सरकारी योजनेचा सल्ला तुम्हाला उत्पन्न सहाय्य, विमा, सिंचन अनुदान की कर्ज यापैकी काय हवे आहे यावर अवलंबून असतो. प्रथम पात्रता, जमिनीची कागदपत्रे, आधार लिंक आणि अर्जाची शेवटची तारीख तपासा."
      },
      followUp: {
        en: "Tell me whether you need help with PM-Kisan, insurance, subsidy, or loan.",
        hi: "बताइए कि मदद PM-Kisan, बीमा, सब्सिडी या ऋण में चाहिए।",
        mr: "मदत PM-Kisan, विमा, अनुदान की कर्ज यापैकी कशात हवी ते सांगा."
      }
    },
    {
      intent: "farewell",
      tags: ["bye", "thanks", "thank you", "farewell"],
      response: {
        en: "You are welcome. Ask again anytime if you need help with farming or with the app.",
        hi: "आपका स्वागत है। खेती या ऐप से जुड़ी मदद चाहिए तो कभी भी फिर पूछिए।",
        mr: "तुमचे स्वागत आहे. शेती किंवा अॅपबद्दल मदत हवी असेल तर पुन्हा कधीही विचारा."
      },
      followUp: {
        en: "Take care and all the best for your crop.",
        hi: "ध्यान रखिए और आपकी फसल के लिए शुभकामनाएँ।",
        mr: "काळजी घ्या आणि तुमच्या पिकासाठी शुभेच्छा."
      }
    },



  {
    intent: "crop_advice",
    tags: ["harvest", "cutting", "time", "crop ready", "wheat", "rice"],
    response: {
      en: "Harvest crops when they are fully mature and dry for best yield.",
      hi: "फसल को पूरी तरह पकने पर ही काटना चाहिए।",
      mr: "पीक पूर्णपणे पिकल्यावर काढणी करावी."
    },
    followUp: {
      en: "Which crop are you harvesting?",
      hi: "आप कौनसी फसल काट रहे हैं?",
      mr: "तुम्ही कोणते पीक काढत आहात?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["yield", "production", "increase", "output", "crop"],
    response: {
      en: "Use good seeds, proper irrigation, and balanced fertilizers to improve yield.",
      hi: "अच्छे बीज और सही खाद से पैदावार बढ़ती है।",
      mr: "चांगले बियाणे आणि खत वापरल्याने उत्पादन वाढते."
    },
    followUp: {
      en: "Do you use fertilizers regularly?",
      hi: "क्या आप नियमित खाद यूज करते हैं?",
      mr: "तुम्ही नियमित खत वापरता का?"
    }
  },
  {
    intent: "schemes",
    tags: ["storage", "godown", "store", "safety", "grain"],
    response: {
      en: "Store crops in dry and ventilated places to prevent spoilage.",
      hi: "फसल को सूखी और हवा दार जगह पर रखें।",
      mr: "पीक कोरड्या आणि हवेशीर ठिकाणी साठवा."
    },
    followUp: {
      en: "Which crop do you want to store?",
      hi: "आप कौनसी फसल स्टोर करना चाहते हैं?",
      mr: "तुम्ही कोणते पीक साठवणार आहात?"
    }
  },
  {
    intent: "market",
    tags: ["transport", "delivery", "market", "logistics", "market"],
    response: {
      en: "Use proper packaging and timely transport to avoid losses.",
      hi: "सही पैकिंग और समय पर ट्रांसपोर्ट जरूरी है।",
      mr: "योग्य पॅकिंग आणि वेळेवर वाहतूक करा."
    },
    followUp: {
      en: "Where do you want to send your crop?",
      hi: "आप फसल कहाँ भेजना चाहते हैं?",
      mr: "तुम्ही पीक कुठे पाठवणार आहात?"
    }
  },
  {
    intent: "fertilizer",
    tags: ["tools", "machine", "tractor", "equipment", "tractor"],
    response: {
      en: "Use appropriate farm tools and maintain them regularly for efficiency.",
      hi: "सही टूल्स यूज करें और उनकी देखभाल करें।",
      mr: "योग्य साधने वापरा आणि त्यांची देखभाल करा."
    },
    followUp: {
      en: "Which equipment do you use?",
      hi: "आप कौनसा इक्विपमेंट यूज करते हैं?",
      mr: "तुम्ही कोणती साधने वापरता?"
    }
  },
  {
    intent: "fertilizer",
    tags: ["organic", "natural", "chemical free", "farming", "compost"],
    response: {
      en: "Organic farming uses natural inputs like compost and avoids chemicals.",
      hi: "जैविक खेती में नैसर्गिक खाद यूज होता है।",
      mr: "सेंद्रिय शेतीत नैसर्गिक खतांचा वापर होतो."
    },
    followUp: {
      en: "Do you want organic fertilizer advice?",
      hi: "क्या आप ऑर्गेनिक खाद के बारे में जानना चाहते हैं?",
      mr: "तुम्हाला सेंद्रिय खताबद्दल माहिती हवी आहे का?"
    }
  },
  {
    intent: "pest_control",
    tags: ["weed", "grass", "nindai", "removal", "weed"],
    response: {
      en: "Remove weeds manually or use herbicides for better crop growth.",
      hi: "घास को हाथ से या दवा से हटाएँ।",
      mr: "तण काढण्यासाठी हाताने किंवा औषध वापरा."
    },
    followUp: {
      en: "Are weeds heavy in your field?",
      hi: "क्या आपके खेत में ज्यादा घास है?",
      mr: "तुमच्या शेतात तण जास्त आहे का?"
    }
  },
  {
    intent: "soil_info",
    tags: ["rotation", "crop cycle", "soil health", "soil"],
    response: {
      en: "Crop rotation helps maintain soil fertility and reduces pests.",
      hi: "क्रॉप रोटेशन से मिट्टी और फसल दोनों बेहतर होते हैं।",
      mr: "पीक बदलामुळे मातीची सुपीकता टिकते."
    },
    followUp: {
      en: "Do you practice crop rotation?",
      hi: "क्या आप क्रॉप रोटेशन करते हैं?",
      mr: "तुम्ही पीक बदल पद्धत वापरता का?"
    }
  },
  {
    intent: "weather",
    tags: ["climate", "weather change", "effect", "weather"],
    response: {
      en: "Climate changes can affect crop growth and yield significantly.",
      hi: "मौसम बदलाव फसल पर असर डालता है।",
      mr: "हवामान बदलामुळे पिकांवर परिणाम होतो."
    },
    followUp: {
      en: "Have you noticed weather changes recently?",
      hi: "क्या आपने मौसम में बदलाव देखा है?",
      mr: "तुम्ही हवामानात बदल पाहिला आहे का?"
    }
  },
  {
    intent: "schemes",
    tags: ["subsidy", "scheme", "support", "scheme"],
    response: {
      en: "Subsidy is financial support provided by the government to farmers.",
      hi: "सब्सिडी सरकार की तरफ से मदद होती है।",
      mr: "अनुदान म्हणजे सरकारकडून दिलेली मदत."
    },
    followUp: {
      en: "Do you want details of any specific scheme?",
      hi: "क्या आप किसी स्पेसिफिक योजना के बारे में जानना चाहते हैं?",
      mr: "तुम्हाला कोणत्या योजनेची माहिती हवी आहे?"
    }
  },
  {
    intent: "schemes",
    tags: ["loan", "credit", "bank", "finance", "bank"],
    response: {
      en: "Farmers can get loans from banks under various agricultural schemes.",
      hi: "किसान बैंक से लोन ले सकते हैं सरकारी योजना के तहत।",
      mr: "शेतकरी बँकेतून कर्ज घेऊ शकतात."
    },
    followUp: {
      en: "Do you have a Kisan Credit Card?",
      hi: "क्या आपके पास किसान क्रेडिट कार्ड है?",
      mr: "तुमच्याकडे किसान क्रेडिट कार्ड आहे का?"
    }
  },
  {
    intent: "schemes",
    tags: ["insurance", "bima", "protection", "insurance"],
    response: {
      en: "Crop insurance protects farmers from losses due to natural disasters.",
      hi: "फसल बीमा से नुकसान से सुरक्षा मिलती है।",
      mr: "पीक विमा नुकसानापासून संरक्षण देतो."
    },
    followUp: {
      en: "Have you applied for crop insurance?",
      hi: "क्या आपने फसल बीमा लिया है?",
      mr: "तुम्ही पीक विमा घेतला आहे का?"
    }
  },



  {
    intent: "crop_advice",
    tags: ["best crop", "season crop", "suitable crop", "farming choice", "wheat", "rice", "maize"],
    response: {
      en: "Choose crops based on season and soil; wheat in rabi and rice in kharif are common.",
      hi: "फसल सीजन और मिट्टी के हिसाब से चुनें; रबी में गेहूं और खरीफ में धान उगाया जाता है।",
      mr: "हंगाम आणि मातीप्रमाणे पिके निवडा; रबीत गहू आणि खरीपात भात घेतला जातो."
    },
    followUp: {
      en: "Which season are you planning for?",
      hi: "आप कौनसे सीजन के लिए पूछ रहे हैं?",
      mr: "तुम्ही कोणत्या हंगामासाठी विचारत आहात?"
    }
  },
  {
    intent: "fertilizer",
    tags: ["fertilizer", "khaad", "nutrients", "npk", "urea", "compost"],
    response: {
      en: "Use balanced NPK and organic compost for better soil health and yield.",
      hi: "बेहतर पैदावार के लिए NPK और ऑर्गेनिक खाद का यूज करें।",
      mr: "उत्पादन वाढवण्यासाठी NPK आणि सेंद्रिय खत वापरा."
    },
    followUp: {
      en: "Which crop are you growing?",
      hi: "आप कौनसी फसल उगा रहे हैं?",
      mr: "तुम्ही कोणते पीक घेत आहात?"
    }
  },
  {
    intent: "pest_control",
    tags: ["pest", "keeda", "insects", "control", "spray"],
    response: {
      en: "Use recommended pesticides and monitor crops regularly to control pests.",
      hi: "कीड़े कंट्रोल के लिए सही पेस्टीसाइड और नियमित मॉनिटरिंग जरूरी है।",
      mr: "कीड नियंत्रणासाठी योग्य कीटकनाशक आणि नियमित निरीक्षण करा."
    },
    followUp: {
      en: "What pest are you seeing?",
      hi: "कौनसा कीड़ा दिख रहा है?",
      mr: "कोणती कीड दिसत आहे?"
    }
  },
  {
    intent: "irrigation",
    tags: ["irrigation", "water", "paani", "watering", "drip"],
    response: {
      en: "Provide irrigation based on crop stage and soil moisture; avoid overwatering.",
      hi: "पानी फसल और मिट्टी के हिसाब से दें, ज्यादा पानी से बचें।",
      mr: "पाणी पिक आणि मातीप्रमाणे द्या, जास्त पाणी टाळा."
    },
    followUp: {
      en: "What soil type do you have?",
      hi: "आपकी मिट्टी का टाइप क्या है?",
      mr: "तुमची माती कोणत्या प्रकारची आहे?"
    }
  },
  {
    intent: "pest_control",
    tags: ["disease", "rog", "bimari", "plant health", "fungus"],
    response: {
      en: "Identify symptoms early and use proper fungicides or treatments.",
      hi: "लक्षण पहचान कर सही दवा का इस्तेमाल करें।",
      mr: "लक्षणे ओळखून योग्य औषध वापरा."
    },
    followUp: {
      en: "What symptoms do you see?",
      hi: "कौनसे लक्षण दिख रहे हैं?",
      mr: "कोणती लक्षणे दिसत आहेत?"
    }
  },
  {
    intent: "weather",
    tags: ["weather", "rain", "forecast", "temperature", "mausam"],
    response: {
      en: "Check local weather updates for rainfall and temperature before planning farm activities.",
      hi: "खेती के लिए मौसम की जानकारी लेना जरूरी है।",
      mr: "शेतीसाठी हवामानाची माहिती महत्त्वाची आहे."
    },
    followUp: {
      en: "Which location are you in?",
      hi: "आप किस जगह पर हैं?",
      mr: "तुम्ही कुठे आहात?"
    }
  },
  {
    intent: "market",
    tags: ["mandi", "price", "rate", "bhav", "market"],
    response: {
      en: "Prices change daily; check your nearest mandi for accurate rates.",
      hi: "भाव रोज बदलते हैं, नजदीकी मंडी चेक करें।",
      mr: "भाव दररोज बदलतात, जवळची बाजारपेठ तपासा."
    },
    followUp: {
      en: "Which crop price do you want?",
      hi: "किस फसल का भाव चाहिए?",
      mr: "कोणत्या पिकाचा भाव हवा आहे?"
    }
  },
  {
    intent: "soil_info",
    tags: ["soil", "mitti", "land", "ph", "fertility"],
    response: {
      en: "Healthy soil with balanced pH improves crop growth and yield.",
      hi: "सही pH वाली मिट्टी फसल के लिए अच्छी होती है।",
      mr: "योग्य pH असलेली माती पिकासाठी चांगली असते."
    },
    followUp: {
      en: "Have you tested your soil?",
      hi: "क्या आपने सॉइल टेस्ट किया है?",
      mr: "तुम्ही माती चाचणी केली आहे का?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["seed", "beej", "hybrid", "quality", "certified"],
    response: {
      en: "Use certified and high-quality seeds for better germination and yield.",
      hi: "अच्छी पैदावार के लिए सर्टिफाइड बीज यूज करें।",
      mr: "चांगल्या उत्पादनासाठी प्रमाणित बियाणे वापरा."
    },
    followUp: {
      en: "Which crop seed do you need?",
      hi: "आपको किस फसल का बीज चाहिए?",
      mr: "तुम्हाला कोणत्या पिकाचे बियाणे हवे आहे?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["sowing", "planting", "time", "season", "bowaai"],
    response: {
      en: "Sowing time depends on season; kharif crops are sown before monsoon.",
      hi: "बुआई का समय सीजन पर डिपेंड करता है।",
      mr: "पेरणीचा वेळ हंगामावर अवलंबून असतो."
    },
    followUp: {
      en: "Which crop are you asking about?",
      hi: "आप किस फसल के बारे में पूछ रहे हैं?",
      mr: "तुम्ही कोणत्या पिकाबद्दल विचारत आहात?"
    }
  },



  {
    intent: "crop_advice",
    tags: ["best crop", "season crop", "farming choice", "suitable crop", "maize", "tomato", "summer"],
    response: {
      en: "Maize and vegetables like tomato and cucumber are good crops for the summer season.",
      hi: "गर्मी के लिए मक्का और सब्जियाँ जैसे टमाटर और खीरा अच्छी फसल हैं।",
      mr: "उन्हाळ्यासाठी मका आणि टोमॅटो, काकडीसारख्या भाज्या चांगल्या पिके आहेत."
    },
    followUp: {
      en: "Which crop are you planning to grow?",
      hi: "आप कौनसी फसल उगाना चाहते हैं?",
      mr: "तुम्ही कोणती पिके घेण्याचा विचार करत आहात?"
    }
  },
  {
    intent: "fertilizer",
    tags: ["fertilizer", "khaad", "nutrients", "npk", "urea", "wheat"],
    response: {
      en: "Nitrogen-rich fertilizers like urea and balanced NPK fertilizers are good for wheat.",
      hi: "गेहूं के लिए नाइट्रोजन वाले खाद जैसे यूरिया और NPK सही होते हैं।",
      mr: "गव्हासाठी युरिया आणि NPK सारखे नायट्रोजनयुक्त खत चांगले असतात."
    },
    followUp: {
      en: "Do you want organic or chemical fertilizer advice?",
      hi: "क्या आप ऑर्गेनिक या केमिकल खाद के बारे में जानना चाहते हैं?",
      mr: "तुम्हाला सेंद्रिय की रासायनिक खताबद्दल माहिती हवी आहे का?"
    }
  },
  {
    intent: "pest_control",
    tags: ["pest", "keeda", "insects", "control", "spray", "rice"],
    response: {
      en: "Use recommended pesticides and maintain proper water levels to control pests in rice.",
      hi: "धान में कीड़े कंट्रोल करने के लिए सही पेस्टीसाइड और पानी का लेवल मेंटेन करें।",
      mr: "भातामध्ये कीड नियंत्रणासाठी योग्य कीटकनाशक आणि पाण्याचे व्यवस्थापन करा."
    },
    followUp: {
      en: "Which pest are you seeing in your crop?",
      hi: "आपकी फसल में कौनसा कीड़ा है?",
      mr: "तुमच्या पिकात कोणती कीड दिसते?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["sowing", "bowaai", "planting time", "crop timing", "soybean", "kharif"],
    response: {
      en: "Soybean is usually sown during June to July at the start of the monsoon.",
      hi: "सोयाबीन की बुआई आम तौर पर जून-जुलाई में की जाती है।",
      mr: "सोयाबीनची पेरणी सहसा जून-जुलै महिन्यात केली जाते."
    },
    followUp: {
      en: "Do you want region-specific sowing dates?",
      hi: "क्या आप अपने रीजन के हिसाब से डेट्स जानना चाहते हैं?",
      mr: "तुम्हाला तुमच्या भागानुसार पेरणीची तारीख हवी आहे का?"
    }
  },
  {
    intent: "irrigation",
    tags: ["irrigation", "water", "paani", "watering", "drip", "cotton"],
    response: {
      en: "Cotton requires moderate irrigation at regular intervals depending on soil and weather.",
      hi: "कपास को मिट्टी और मौसम के हिसाब से समय-समय पर मध्यम पानी चाहिए।",
      mr: "कापसाला माती आणि हवामानानुसार मध्यम प्रमाणात पाणी द्यावे."
    },
    followUp: {
      en: "What type of irrigation system are you using?",
      hi: "आप कौनसा इरिगेशन सिस्टम यूज कर रहे हैं?",
      mr: "तुम्ही कोणती सिंचन पद्धत वापरत आहात?"
    }
  },
  {
    intent: "pest_control",
    tags: ["disease", "rog", "bimari", "infection", "plant health", "tomato"],
    response: {
      en: "Common tomato diseases include blight and leaf curl which affect leaves and yield.",
      hi: "टमाटर में ब्लाइट और लीफ कर्ल जैसे रोग आम होते हैं।",
      mr: "टोमॅटोमध्ये ब्लाइट आणि लीफ कर्ल सारखे रोग सामान्य आहेत."
    },
    followUp: {
      en: "What symptoms are you seeing on your crop?",
      hi: "आपको कौनसे लक्षण दिख रहे हैं?",
      mr: "तुम्हाला कोणती लक्षणे दिसत आहेत?"
    }
  },
  {
    intent: "soil_info",
    tags: ["soil", "mitti", "land", "ph", "fertility", "compost"],
    response: {
      en: "Improve soil fertility by adding organic compost and practicing crop rotation.",
      hi: "मिट्टी की फर्टिलिटी बढ़ाने के लिए कंपोस्ट और क्रॉप रोटेशन का यूज करें।",
      mr: "मातीची सुपीकता वाढवण्यासाठी कंपोस्ट आणि पिक बदल पद्धत वापरा."
    },
    followUp: {
      en: "Have you done a soil test recently?",
      hi: "क्या आपने रीसेंट सॉइल टेस्ट किया है?",
      mr: "तुम्ही अलीकडे माती चाचणी केली आहे का?"
    }
  },
  {
    intent: "market",
    tags: ["mandi", "price", "bhav", "market rate", "onion"],
    response: {
      en: "Mandi prices change daily, so it is best to check your nearest market for accurate rates.",
      hi: "मंडी के भाव रोज बदलते हैं, इसलिए नजदीकी मंडी चेक करें।",
      mr: "मंडीचे भाव दररोज बदलतात, त्यामुळे जवळच्या बाजारात तपासा."
    },
    followUp: {
      en: "Which crop price do you want to check?",
      hi: "आप किस फसल का भाव देखना चाहते हैं?",
      mr: "तुम्हाला कोणत्या पिकाचा भाव पाहायचा आहे?"
    }
  },



{
  intent: "pest_control",
  tags: ["rice", "disease", "pest_disease", "root rot"],
  response: {
    question: "What is the solution for root rot in Rice?",
    answer: "To manage root rot in Rice, apply organic compost or manure to improve soil fertility."
  }
},
{
  intent: "pest_control",
  tags: ["maize", "symptom", "symptom_query", "yellow leaves"],
  response: {
    question: "What causes yellow leaves in Maize?",
    answer: "To manage yellow leaves in Maize, spray appropriate fungicides at early stages."
  }
},
{
  intent: "fertilizer",
  tags: ["sugarcane", "fertilizer", "nutrient deficiency"],
  response: {
    question: "What is the solution for nutrient deficiency in Sugarcane?",
    answer: "To manage nutrient deficiency in Sugarcane, perform regular weeding and use mulching techniques."
  }
},
{
  intent: "pest_control",
  tags: ["wheat", "disease", "wilting"],
  response: {
    question: "What causes wilting in Wheat?",
    answer: "To manage wilting in Wheat, apply balanced fertilizers like NPK and maintain proper irrigation."
  }
},
{
  intent: "pest_control",
  tags: ["soybean", "weed", "weed_control"],
  response: {
    question: "What causes weed growth in Soybean?",
    answer: "To manage weed growth in Soybean, conduct soil testing and adjust nutrients accordingly."
  }
},
{
  intent: "pest_control",
  tags: ["groundnut", "disease", "wilting"],
  response: {
    question: "How can I prevent wilting in Groundnut?",
    answer: "To manage wilting in Groundnut, spray appropriate fungicides at early stages."
  }
},
{
  intent: "pest_control",
  tags: ["groundnut", "disease", "root rot"],
  response: {
    question: "Why does my Groundnut show root rot?",
    answer: "Perform regular weeding and use mulching techniques to control root rot."
  }
},
{
  intent: "pest_control",
  tags: ["sugarcane", "symptom", "yellow leaves"],
  response: {
    question: "What causes yellow leaves in Sugarcane?",
    answer: "Ensure proper drainage and avoid waterlogging."
  }
},
{
  intent: "pest_control",
  tags: ["cotton", "disease", "leaf spots"],
  response: {
    question: "How can I prevent leaf spots in Cotton?",
    answer: "Perform regular weeding and use mulching techniques."
  }
},
{
  intent: "pest_control",
  tags: ["tomato", "pest", "pest attack"],
  response: {
    question: "How to improve pest attack problem in Tomato?",
    answer: "Apply balanced fertilizers like NPK and maintain proper irrigation."
  }
},
  {
    intent: "pest_control",
    tags: ["tomato", "pest control", "pest_disease", "pest attack"],
    response: {
      question: "How to improve pest attack problem in Tomato?",
      answer: "To manage pest attack in Tomato, apply balanced fertilizers like NPK and maintain proper irrigation."
    }
  },
  {
    intent: "pest_control",
    tags: ["cotton", "disease", "pest_disease", "root rot"],
    response: {
      question: "What causes root rot in Cotton?",
      answer: "Perform regular weeding and use mulching techniques to control root rot in Cotton."
    }
  },
  {
    intent: "pest_control",
    tags: ["soybean", "disease", "pest_disease", "leaf spots"],
    response: {
      question: "What is the solution for leaf spots in Soybean?",
      answer: "Use certified seeds and follow proper sowing techniques to manage leaf spots in Soybean."
    }
  },
  {
    intent: "pest_control",
    tags: ["onion", "disease", "pest_disease", "wilting"],
    response: {
      question: "What causes wilting in Onion?",
      answer: "Perform regular weeding and use mulching techniques to manage wilting in Onion."
    }
  },
  {
    intent: "pest_control",
    tags: ["potato", "disease", "pest_disease", "leaf spots"],
    response: {
      question: "What causes leaf spots in Potato?",
      answer: "Ensure proper drainage and avoid waterlogging to manage leaf spots in Potato."
    }
  },
  {
    intent: "pest_control",
    tags: ["groundnut", "disease", "pest_disease", "root rot"],
    response: {
      question: "How to improve root rot problem in Groundnut?",
      answer: "Conduct soil testing and adjust nutrients accordingly to solve root rot in Groundnut."
    }
  },
  {
    intent: "crop_advice",
    tags: ["groundnut", "crop advice", "cultivation", "yellow leaves"],
    response: {
      question: "How can I prevent yellow leaves in Groundnut?",
      answer: "Use neem oil or recommended pesticides to control pests and prevent yellow leaves in Groundnut."
    }
  },
  {
    intent: "pest_control",
    tags: ["tomato", "disease", "pest_disease", "wilting"],
    response: {
      question: "What is the solution for wilting in Tomato?",
      answer: "Use neem oil or recommended pesticides to control wilting in Tomato."
    }
  },
  {
    intent: "pest_control",
    tags: ["soybean", "disease", "pest_disease", "wilting"],
    response: {
      question: "How to control wilting in Soybean?",
      answer: "Spray appropriate fungicides at early stages to control wilting in Soybean."
    }
  },
  {
    intent: "fertilizer",
    tags: ["wheat", "fertilizer", "nutrient deficiency"],
    response: {
      question: "How to control nutrient deficiency in Wheat?",
      answer: "Use suitable fertilizers and nutrient supplements to manage deficiency in Wheat."
    }
  },
  {
    intent: "pest_control",
    tags: ["maize", "disease", "pest_disease", "root rot"],
    response: {
      question: "Best treatment for root rot in Maize?",
      answer: "Apply balanced fertilizers like NPK and maintain proper irrigation to manage root rot in Maize."
    }
  },
  {
    intent: "crop_advice",
    tags: ["cotton", "yield", "yield prediction", "low yield"],
    response: {
      question: "What causes low yield in Cotton?",
      answer: "Perform regular weeding and use mulching techniques to improve yield in Cotton."
    }
  },
  {
    intent: "pest_control",
    tags: ["potato", "weed", "weed_control", "weed growth"],
    response: {
      question: "How to control weed growth in Potato?",
      answer: "Apply balanced fertilizers like NPK and maintain proper irrigation to control weeds in Potato."
    }
  },
  {
    intent: "crop_advice",
    tags: ["maize", "yield prediction", "poor germination"],
    response: {
      question: "What is the solution for poor germination in Maize?",
      answer: "Use certified seeds and follow proper sowing techniques to improve germination in Maize."
    }
  },
  {
    intent: "pest_control",
    tags: ["potato", "disease", "fungal", "pest_disease"],
    response: {
      question: "Why does my Potato show fungal disease?",
      answer: "Use neem oil or recommended pesticides to control fungal disease in Potato."
    }
  },
  {
    intent: "pest_control",
    tags: ["groundnut", "disease", "pest_disease", "leaf spots"],
    response: {
      question: "How to control leaf spots in Groundnut?",
      answer: "Perform regular weeding and use mulching techniques to manage leaf spots in Groundnut."
    }
  },
  {
    intent: "pest_control",
    tags: ["onion", "symptom", "symptom_query", "yellow leaves"],
    response: {
      question: "What is the solution for yellow leaves in Onion?",
      answer: "Use certified seeds and follow proper sowing techniques to solve yellow leaves in Onion."
    }
  },
  {
    intent: "pest_control",
    tags: ["cotton", "weed", "weed_control", "weed growth"],
    response: {
      question: "How to control weed growth in Cotton?",
      answer: "Use certified seeds and follow proper sowing techniques to control weed growth in Cotton."
    }
  },
  {
    intent: "pest_control",
    tags: ["tomato", "disease", "pest_disease", "wilting"],
    response: {
      question: "Why does my Tomato show wilting?",
      answer: "Apply organic compost or manure to improve soil fertility and manage wilting in Tomato."
    }
  },
  {
    intent: "pest_control",
    tags: ["rice", "disease", "fungal", "pest_disease"],
    response: {
      question: "How can I prevent fungal disease in Rice?",
      answer: "Perform regular weeding and use mulching techniques to prevent fungal disease in Rice."
    }
  },


  {
    intent: "crop_advice",
    tags: ["groundnut", "yield", "yield prediction", "low yield"],
    response: {
      question: "Best treatment for low yield in Groundnut?",
      answer: "Apply organic compost or manure to improve soil fertility and increase yield in Groundnut."
    }
  },
  {
    intent: "pest_control",
    tags: ["maize", "disease", "pest_disease", "root rot"],
    response: {
      question: "Why does my Maize show root rot?",
      answer: "Use certified seeds and follow proper sowing techniques to prevent root rot in Maize."
    }
  },
  {
    intent: "crop_advice",
    tags: ["groundnut", "yield prediction", "poor germination"],
    response: {
      question: "How to improve poor germination problem in Groundnut?",
      answer: "Apply balanced fertilizers like NPK and maintain proper irrigation to improve germination in Groundnut."
    }
  },
  {
    intent: "pest_control",
    tags: ["tomato", "weed", "weed_control", "weed growth"],
    response: {
      question: "How to improve weed growth problem in Tomato?",
      answer: "Apply balanced fertilizers like NPK and maintain proper irrigation to control weed growth in Tomato."
    }
  },
  {
    intent: "pest_control",
    tags: ["cotton", "disease", "pest_disease", "wilting"],
    response: {
      question: "What is the solution for wilting in Cotton?",
      answer: "Conduct soil testing and adjust nutrients accordingly to manage wilting in Cotton."
    }
  },
  {
    intent: "pest_control",
    tags: ["tomato", "disease", "pest_disease", "leaf spots"],
    response: {
      question: "What is the solution for leaf spots in Tomato?",
      answer: "Use certified seeds and follow proper sowing techniques to manage leaf spots in Tomato."
    }
  },
  {
    intent: "pest_control",
    tags: ["wheat", "disease", "fungal", "pest_disease"],
    response: {
      question: "What is the solution for fungal disease in Wheat?",
      answer: "Use neem oil or recommended pesticides to control fungal disease in Wheat."
    }
  },
  {
    intent: "pest_control",
    tags: ["wheat", "disease", "pest_disease", "root rot"],
    response: {
      question: "How to improve root rot problem in Wheat?",
      answer: "Perform regular weeding and use mulching techniques to manage root rot in Wheat."
    }
  },
  {
    intent: "crop_advice",
    tags: ["tomato", "yield", "yield prediction", "low yield"],
    response: {
      question: "What is the solution for low yield in Tomato?",
      answer: "Apply balanced fertilizers like NPK and maintain proper irrigation to improve yield in Tomato."
    }
  },
  {
    intent: "pest_control",
    tags: ["tomato", "disease", "fungal", "pest_disease"],
    response: {
      question: "Why does my Tomato show fungal disease?",
      answer: "Ensure proper drainage and avoid waterlogging to control fungal disease in Tomato."
    }
  },









  {
    intent: "pest_control",
    tags: ["maize", "weed_control", "weed"],
    response: {
      en: "To manage weed growth in Maize, spray appropriate fungicides at early stages."
    },
    followUp: {
      en: "Why does my Maize show weed growth?"
    }
  },
  {
    intent: "pest_control",
    tags: ["onion", "pest_disease", "disease"],
    response: {
      en: "You can solve root rot in Onion by following this: apply balanced fertilizers like NPK and maintain proper irrigation."
    },
    followUp: {
      en: "Best treatment for root rot in Onion?"
    }
  },
  {
    intent: "pest_control",
    tags: ["wheat", "pest_disease", "pest control", "pest"],
    response: {
      en: "To manage pest attack in Wheat, ensure proper drainage and avoid waterlogging."
    },
    followUp: {
      en: "Best treatment for pest attack in Wheat?"
    }
  },
  {
    intent: "pest_control",
    tags: ["maize", "pest_disease", "disease", "fungal"],
    response: {
      en: "To manage fungal disease in Maize, conduct soil testing and adjust nutrients accordingly."
    },
    followUp: {
      en: "What is the solution for fungal disease in Maize?"
    }
  },
  {
    intent: "pest_control",
    tags: ["rice", "pest_disease", "disease"],
    response: {
      en: "To manage leaf spots in Rice, apply balanced fertilizers like NPK and maintain proper irrigation."
    },
    followUp: {
      en: "What is the solution for leaf spots in Rice?"
    }
  },
  {
    intent: "pest_control",
    tags: ["potato", "symptom_query", "symptom"],
    response: {
      en: "To manage yellow leaves in Potato, use neem oil or recommended pesticides to control pests."
    },
    followUp: {
      en: "What is the solution for yellow leaves in Potato?"
    }
  },
  {
    intent: "pest_control",
    tags: ["sugarcane", "pest_disease", "pest control", "pest"],
    response: {
      en: "You can solve pest attack in Sugarcane by following this: apply balanced fertilizers like NPK and maintain proper irrigation."
    },
    followUp: {
      en: "What causes pest attack in Sugarcane?"
    }
  },
  {
    intent: "pest_control",
    tags: ["maize", "symptom_query", "symptom"],
    response: {
      en: "To manage yellow leaves in Maize, ensure proper drainage and avoid waterlogging."
    },
    followUp: {
      en: "How to control yellow leaves in Maize?"
    }
  },
  {
    intent: "pest_control",
    tags: ["wheat", "pest_disease", "disease", "fungal"],
    response: {
      en: "To manage fungal disease in Wheat, conduct soil testing and adjust nutrients accordingly."
    },
    followUp: {
      en: "What causes fungal disease in Wheat?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["soybean", "yield", "yield prediction"],
    response: {
      en: "You can solve low yield in Soybean by following this: apply organic compost or manure to improve soil fertility."
    },
    followUp: {
      en: "What causes low yield in Soybean?"
    }
  },
  {
    intent: "pest_control",
    tags: ["sugarcane", "weed_control", "weed"],
    response: {
      en: "To manage weed growth in Sugarcane, ensure proper drainage and avoid waterlogging."
    },
    followUp: {
      en: "How can I prevent weed growth in Sugarcane?"
    }
  },
  {
    intent: "pest_control",
    tags: ["rice", "pest_disease", "disease"],
    response: {
      en: "To manage root rot in Rice, use certified seeds and follow proper sowing techniques."
    },
    followUp: {
      en: "How to control root rot in Rice?"
    }
  },
  {
    intent: "pest_control",
    tags: ["maize", "pest_disease", "disease"],
    response: {
      en: "To manage root rot in Maize, spray appropriate fungicides at early stages."
    },
    followUp: {
      en: "How to improve root rot problem in Maize?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["potato", "yield", "yield prediction"],
    response: {
      en: "You can solve low yield in Potato by following this: apply organic compost or manure to improve soil fertility."
    },
    followUp: {
      en: "Why does my Potato show low yield?"
    }
  },
  {
    intent: "pest_control",
    tags: ["groundnut", "pest_disease", "pest control", "pest"],
    response: {
      en: "To manage pest attack in Groundnut, spray appropriate fungicides at early stages."
    },
    followUp: {
      en: "What is the solution for pest attack in Groundnut?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["cotton", "yield", "yield prediction"],
    response: {
      en: "To manage low yield in Cotton, spray appropriate fungicides at early stages."
    },
    followUp: {
      en: "How to improve low yield problem in Cotton?"
    }
  },
  {
    intent: "pest_control",
    tags: ["onion", "weed_control", "weed"],
    response: {
      en: "To manage weed growth in Onion, perform regular weeding and use mulching techniques."
    },
    followUp: {
      en: "What causes weed growth in Onion?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["wheat", "yield", "yield prediction"],
    response: {
      en: "To manage poor germination in Wheat, spray appropriate fungicides at early stages."
    },
    followUp: {
      en: "Best treatment for poor germination in Wheat?"
    }
  },
  {
    intent: "pest_control",
    tags: ["maize", "pest_disease", "disease", "fungal"],
    response: {
      en: "To manage fungal disease in Maize, apply balanced fertilizers like NPK and maintain proper irrigation."
    },
    followUp: {
      en: "Why does my Maize show fungal disease?"
    }
  },
  {
    intent: "fertilizer",
    tags: ["groundnut", "fertilizer"],
    response: {
      en: "To manage nutrient deficiency in Groundnut, conduct soil testing and adjust nutrients accordingly."
    },
    followUp: {
      en: "How to control nutrient deficiency in Groundnut?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["rice", "yield", "yield prediction"],
    response: {
      en: "To manage low yield in Rice, ensure proper drainage and avoid waterlogging."
    },
    followUp: {
      en: "Why does my Rice show low yield?"
    }
  },
  {
    intent: "fertilizer",
    tags: ["soybean", "fertilizer"],
    response: {
      en: "To manage nutrient deficiency in Soybean, use certified seeds and follow proper sowing techniques."
    },
    followUp: {
      en: "What is the solution for nutrient deficiency in Soybean?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["soybean", "yield", "yield prediction"],
    response: {
      en: "To manage poor germination in Soybean, ensure proper drainage and avoid waterlogging."
    },
    followUp: {
      en: "Why does my Soybean show poor germination?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["sugarcane", "yield", "yield prediction"],
    response: {
      en: "You can solve poor germination in Sugarcane by following this: conduct soil testing and adjust nutrients accordingly."
    },
    followUp: {
      en: "What is the solution for poor germination in Sugarcane?"
    }
  },
  {
    intent: "pest_control",
    tags: ["groundnut", "pest_disease", "disease", "fungal"],
    response: {
      en: "To manage fungal disease in Groundnut, ensure proper drainage and avoid waterlogging."
    },
    followUp: {
      en: "How to control fungal disease in Groundnut?"
    }
  },
  {
    intent: "pest_control",
    tags: ["sugarcane", "pest_disease", "disease", "fungal"],
    response: {
      en: "You can solve fungal disease in Sugarcane by following this: use certified seeds and follow proper sowing techniques."
    },
    followUp: {
      en: "Why does my Sugarcane show fungal disease?"
    }
  },
  {
    intent: "pest_control",
    tags: ["groundnut", "pest_disease", "disease"],
    response: {
      en: "To manage wilting in Groundnut, ensure proper drainage and avoid waterlogging."
    },
    followUp: {
      en: "How to improve wilting problem in Groundnut?"
    }
  },
  {
    intent: "pest_control",
    tags: ["wheat", "pest_disease", "disease"],
    response: {
      en: "You can solve root rot in Wheat by following this: apply balanced fertilizers like NPK and maintain proper irrigation."
    },
    followUp: {
      en: "What causes root rot in Wheat?"
    }
  },
  {
    intent: "pest_control",
    tags: ["tomato", "pest_disease", "disease"],
    response: {
      en: "You can solve wilting in Tomato by following this: apply organic compost or manure to improve soil fertility."
    },
    followUp: {
      en: "How can I prevent wilting in Tomato?"
    }
  },
  {
    intent: "fertilizer",
    tags: ["onion", "fertilizer"],
    response: {
      en: "To manage nutrient deficiency in Onion, apply organic compost or manure to improve soil fertility."
    },
    followUp: {
      en: "How to improve nutrient deficiency problem in Onion?"
    }
  },
  {
    intent: "pest_control",
    tags: ["potato", "weed_control", "weed"],
    response: {
      en: "You can solve weed growth in Potato by following this: use certified seeds and follow proper sowing techniques."
    },
    followUp: {
      en: "How to improve weed growth problem in Potato?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["wheat", "yield", "yield prediction"],
    response: {
      en: "To manage poor germination in Wheat, use neem oil or recommended pesticides to control pests."
    },
    followUp: {
      en: "How to control poor germination in Wheat?"
    }
  },
  {
    intent: "pest_control",
    tags: ["tomato", "pest_disease", "disease", "fungal"],
    response: {
      en: "To manage fungal disease in Tomato, conduct soil testing and adjust nutrients accordingly."
    },
    followUp: {
      en: "What is the solution for fungal disease in Tomato?"
    }
  },
  {
    intent: "pest_control",
    tags: ["cotton", "pest_disease", "disease"],
    response: {
      en: "You can solve wilting in Cotton by following this: use certified seeds and follow proper sowing techniques."
    },
    followUp: {
      en: "Best treatment for wilting in Cotton?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["groundnut", "yield", "yield prediction"],
    response: {
      en: "You can solve poor germination in Groundnut by following this: apply organic compost or manure to improve soil fertility."
    },
    followUp: {
      en: "Best treatment for poor germination in Groundnut?"
    }
  },
  {
    intent: "pest_control",
    tags: ["potato", "pest_disease", "disease", "fungal"],
    response: {
      en: "To manage fungal disease in Potato, spray appropriate fungicides at early stages."
    },
    followUp: {
      en: "How to improve fungal disease problem in Potato?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["tomato", "yield", "yield prediction"],
    response: {
      en: "To manage low yield in Tomato, use neem oil or recommended pesticides to control pests."
    },
    followUp: {
      en: "Why does my Tomato show low yield?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["maize", "yield", "yield prediction"],
    response: {
      en: "To manage poor germination in Maize, apply organic compost or manure to improve soil fertility."
    },
    followUp: {
      en: "What causes poor germination in Maize?"
    }
  },
  {
    intent: "pest_control",
    tags: ["wheat", "pest_disease", "disease", "fungal"],
    response: {
      en: "To manage fungal disease in Wheat, spray appropriate fungicides at early stages."
    },
    followUp: {
      en: "Best treatment for fungal disease in Wheat?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["rice", "yield", "yield prediction"],
    response: {
      en: "You can solve poor germination in Rice by following this: perform regular weeding and use mulching techniques."
    },
    followUp: {
      en: "What is the solution for poor germination in Rice?"
    }
  },
  {
    intent: "pest_control",
    tags: ["sugarcane", "pest_disease", "disease", "fungal"],
    response: {
      en: "To manage fungal disease in Sugarcane, spray appropriate fungicides at early stages."
    },
    followUp: {
      en: "What is the solution for fungal disease in Sugarcane?"
    }
  },
  {
    intent: "pest_control",
    tags: ["sugarcane", "pest_disease", "pest control", "pest"],
    response: {
      en: "You can solve pest attack in Sugarcane by following this: perform regular weeding and use mulching techniques."
    },
    followUp: {
      en: "What is the solution for pest attack in Sugarcane?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["sugarcane", "yield", "yield prediction"],
    response: {
      en: "To manage poor germination in Sugarcane, apply organic compost or manure to improve soil fertility."
    },
    followUp: {
      en: "What causes poor germination in Sugarcane?"
    }
  },
  {
    intent: "pest_control",
    tags: ["potato", "weed_control", "weed"],
    response: {
      en: "You can solve weed growth in Potato by following this: use certified seeds and follow proper sowing techniques."
    },
    followUp: {
      en: "Why does my Potato show weed growth?"
    }
  },
  {
    intent: "pest_control",
    tags: ["soybean", "weed_control", "weed"],
    response: {
      en: "To manage weed growth in Soybean, apply balanced fertilizers like NPK and maintain proper irrigation."
    },
    followUp: {
      en: "How can I prevent weed growth in Soybean?"
    }
  },
  {
    intent: "pest_control",
    tags: ["rice", "weed_control", "weed"],
    response: {
      en: "To manage weed growth in Rice, use neem oil or recommended pesticides to control pests."
    },
    followUp: {
      en: "Why does my Rice show weed growth?"
    }
  },
  {
    intent: "pest_control",
    tags: ["onion", "pest_disease", "disease", "fungal"],
    response: {
      en: "To manage fungal disease in Onion, apply balanced fertilizers like NPK and maintain proper irrigation."
    },
    followUp: {
      en: "How to improve fungal disease problem in Onion?"
    }
  },
  {
    intent: "pest_control",
    tags: ["cotton", "pest_disease", "disease"],
    response: {
      en: "To manage wilting in Cotton, conduct soil testing and adjust nutrients accordingly."
    },
    followUp: {
      en: "How can I prevent wilting in Cotton?"
    }
  },
  {
    intent: "pest_control",
    tags: ["sugarcane", "pest_disease", "disease", "fungal"],
    response: {
      en: "To manage fungal disease in Sugarcane, conduct soil testing and adjust nutrients accordingly."
    },
    followUp: {
      en: "What causes fungal disease in Sugarcane?"
    }
  },
  {
    intent: "pest_control",
    tags: ["groundnut", "symptom_query", "symptom"],
    response: {
      en: "You can solve yellow leaves in Groundnut by following this: apply organic compost or manure to improve soil fertility."
    },
    followUp: {
      en: "Best treatment for yellow leaves in Groundnut?"
    }
  },
  {
    intent: "pest_control",
    tags: ["potato", "weed_control", "weed"],
    response: {
      en: "To manage weed growth in Potato, perform regular weeding and use mulching techniques."
    },
    followUp: {
      en: "What causes weed growth in Potato?"
    }
  },
  {
    intent: "pest_control",
    tags: ["soybean", "weed_control", "weed"],
    response: {
      en: "You can solve weed growth in Soybean by following this: use certified seeds and follow proper sowing techniques."
    },
    followUp: {
      en: "Why does my Soybean show weed growth?"
    }
  },
  {
    intent: "fertilizer",
    tags: ["groundnut", "fertilizer"],
    response: {
      en: "You can solve nutrient deficiency in Groundnut by following this: apply organic compost or manure to improve soil fertility."
    },
    followUp: {
      en: "How can I prevent nutrient deficiency in Groundnut?"
    }
  },
  {
    intent: "pest_control",
    tags: ["tomato", "weed_control", "weed"],
    response: {
      en: "You can solve weed growth in Tomato by following this: ensure proper drainage and avoid waterlogging."
    },
    followUp: {
      en: "Best treatment for weed growth in Tomato?"
    }
  },
  {
    intent: "pest_control",
    tags: ["sugarcane", "weed_control", "weed"],
    response: {
      en: "To manage weed growth in Sugarcane, spray appropriate fungicides at early stages."
    },
    followUp: {
      en: "How to control weed growth in Sugarcane?"
    }
  },
  {
    intent: "fertilizer",
    tags: ["rice", "fertilizer"],
    response: {
      en: "To manage nutrient deficiency in Rice, use neem oil or recommended pesticides to control pests."
    },
    followUp: {
      en: "Why does my Rice show nutrient deficiency?"
    }
  },
  {
    intent: "pest_control",
    tags: ["soybean", "pest_disease", "disease"],
    response: {
      en: "You can solve leaf spots in Soybean by following this: perform regular weeding and use mulching techniques."
    },
    followUp: {
      en: "How to improve leaf spots problem in Soybean?"
    }
  },
  {
    intent: "pest_control",
    tags: ["groundnut", "weed_control", "weed"],
    response: {
      en: "You can solve weed growth in Groundnut by following this: use certified seeds and follow proper sowing techniques."
    },
    followUp: {
      en: "What causes weed growth in Groundnut?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["groundnut", "yield", "yield prediction"],
    response: {
      en: "To manage low yield in Groundnut, spray appropriate fungicides at early stages."
    },
    followUp: {
      en: "How to control low yield in Groundnut?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["sugarcane", "yield", "yield prediction"],
    response: {
      en: "You can solve poor germination in Sugarcane by following this: ensure proper drainage and avoid waterlogging."
    },
    followUp: {
      en: "How can I prevent poor germination in Sugarcane?"
    }
  },
  {
    intent: "pest_control",
    tags: ["cotton", "pest_disease", "disease"],
    response: {
      en: "You can solve leaf spots in Cotton by following this: use certified seeds and follow proper sowing techniques."
    },
    followUp: {
      en: "How to control leaf spots in Cotton?"
    }
  },
  {
    intent: "pest_control",
    tags: ["rice", "pest_disease", "pest control", "pest"],
    response: {
      en: "To manage pest attack in Rice, ensure proper drainage and avoid waterlogging."
    },
    followUp: {
      en: "What causes pest attack in Rice?"
    }
  },
  {
    intent: "fertilizer",
    tags: ["maize", "fertilizer"],
    response: {
      en: "You can solve nutrient deficiency in Maize by following this: apply balanced fertilizers like NPK and maintain proper irrigation."
    },
    followUp: {
      en: "How can I prevent nutrient deficiency in Maize?"
    }
  },
  {
    intent: "fertilizer",
    tags: ["potato", "fertilizer"],
    response: {
      en: "To manage nutrient deficiency in Potato, use certified seeds and follow proper sowing techniques."
    },
    followUp: {
      en: "What causes nutrient deficiency in Potato?"
    }
  },
  {
    intent: "pest_control",
    tags: ["onion", "pest_disease", "disease", "fungal"],
    response: {
      en: "You can solve fungal disease in Onion by following this: perform regular weeding and use mulching techniques."
    },
    followUp: {
      en: "How to control fungal disease in Onion?"
    }
  },
  {
    intent: "fertilizer",
    tags: ["rice", "fertilizer"],
    response: {
      en: "You can solve nutrient deficiency in Rice by following this: use neem oil or recommended pesticides to control pests."
    },
    followUp: {
      en: "What causes nutrient deficiency in Rice?"
    }
  },
  {
    intent: "pest_control",
    tags: ["cotton", "weed_control", "weed"],
    response: {
      en: "You can solve weed growth in Cotton by following this: apply balanced fertilizers like NPK and maintain proper irrigation."
    },
    followUp: {
      en: "What causes weed growth in Cotton?"
    }
  },
  {
    intent: "pest_control",
    tags: ["maize", "pest_disease", "disease", "fungal"],
    response: {
      en: "You can solve fungal disease in Maize by following this: use neem oil or recommended pesticides to control pests."
    },
    followUp: {
      en: "Best treatment for fungal disease in Maize?"
    }
  },
  {
    intent: "pest_control",
    tags: ["tomato", "pest_disease", "disease", "fungal"],
    response: {
      en: "To manage fungal disease in Tomato, use certified seeds and follow proper sowing techniques."
    },
    followUp: {
      en: "How to improve fungal disease problem in Tomato?"
    }
  },
  {
    intent: "pest_control",
    tags: ["onion", "pest_disease", "pest control", "pest"],
    response: {
      en: "You can solve pest attack in Onion by following this: use certified seeds and follow proper sowing techniques."
    },
    followUp: {
      en: "What is the solution for pest attack in Onion?"
    }
  },
  {
    intent: "pest_control",
    tags: ["tomato", "pest_disease", "disease"],
    response: {
      en: "To manage wilting in Tomato, ensure proper drainage and avoid waterlogging."
    },
    followUp: {
      en: "Best treatment for wilting in Tomato?"
    }
  },
  {
    intent: "pest_control",
    tags: ["maize", "pest_disease", "disease"],
    response: {
      en: "You can solve leaf spots in Maize by following this: perform regular weeding and use mulching techniques."
    },
    followUp: {
      en: "How can I prevent leaf spots in Maize?"
    }
  },
  {
    intent: "pest_control",
    tags: ["tomato", "pest_disease", "disease"],
    response: {
      en: "To manage leaf spots in Tomato, ensure proper drainage and avoid waterlogging."
    },
    followUp: {
      en: "Why does my Tomato show leaf spots?"
    }
  },
  {
    intent: "pest_control",
    tags: ["wheat", "symptom_query", "symptom"],
    response: {
      en: "You can solve yellow leaves in Wheat by following this: conduct soil testing and adjust nutrients accordingly."
    },
    followUp: {
      en: "What is the solution for yellow leaves in Wheat?"
    }
  },
  {
    intent: "pest_control",
    tags: ["sugarcane", "pest_disease", "disease"],
    response: {
      en: "You can solve root rot in Sugarcane by following this: conduct soil testing and adjust nutrients accordingly."
    },
    followUp: {
      en: "What is the solution for root rot in Sugarcane?"
    }
  },
  {
    intent: "pest_control",
    tags: ["onion", "pest_disease", "disease"],
    response: {
      en: "You can solve leaf spots in Onion by following this: use certified seeds and follow proper sowing techniques."
    },
    followUp: {
      en: "Best treatment for leaf spots in Onion?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["cotton", "yield", "yield prediction"],
    response: {
      en: "You can solve poor germination in Cotton by following this: perform regular weeding and use mulching techniques."
    },
    followUp: {
      en: "How can I prevent poor germination in Cotton?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["cotton", "yield", "yield prediction"],
    response: {
      en: "To manage low yield in Cotton, use neem oil or recommended pesticides to control pests."
    },
    followUp: {
      en: "How can I prevent low yield in Cotton?"
    }
  },
  {
    intent: "pest_control",
    tags: ["maize", "pest_disease", "disease"],
    response: {
      en: "To manage wilting in Maize, spray appropriate fungicides at early stages."
    },
    followUp: {
      en: "How to improve wilting problem in Maize?"
    }
  },
  {
    intent: "pest_control",
    tags: ["onion", "weed_control", "weed"],
    response: {
      en: "You can solve weed growth in Onion by following this: use certified seeds and follow proper sowing techniques."
    },
    followUp: {
      en: "Best treatment for weed growth in Onion?"
    }
  },
  {
    intent: "pest_control",
    tags: ["maize", "pest_disease", "disease"],
    response: {
      en: "To manage root rot in Maize, use certified seeds and follow proper sowing techniques."
    },
    followUp: {
      en: "What is the solution for root rot in Maize?"
    }
  },
  {
    intent: "pest_control",
    tags: ["tomato", "pest_disease", "disease"],
    response: {
      en: "To manage root rot in Tomato, use certified seeds and follow proper sowing techniques."
    },
    followUp: {
      en: "Why does my Tomato show root rot?"
    }
  },
  {
    intent: "fertilizer",
    tags: ["groundnut", "fertilizer"],
    response: {
      en: "You can solve nutrient deficiency in Groundnut by following this: spray appropriate fungicides at early stages."
    },
    followUp: {
      en: "How to improve nutrient deficiency problem in Groundnut?"
    }
  },
  {
    intent: "pest_control",
    tags: ["wheat", "weed_control", "weed"],
    response: {
      en: "To manage weed growth in Wheat, spray appropriate fungicides at early stages."
    },
    followUp: {
      en: "What causes weed growth in Wheat?"
    }
  },
  {
    intent: "fertilizer",
    tags: ["wheat", "fertilizer"],
    response: {
      en: "You can solve nutrient deficiency in Wheat by following this: perform regular weeding and use mulching techniques."
    },
    followUp: {
      en: "What causes nutrient deficiency in Wheat?"
    }
  },
  {
    intent: "pest_control",
    tags: ["maize", "pest_disease", "disease"],
    response: {
      en: "To manage leaf spots in Maize, apply organic compost or manure to improve soil fertility."
    },
    followUp: {
      en: "Why does my Maize show leaf spots?"
    }
  },
  {
    intent: "fertilizer",
    tags: ["maize", "fertilizer"],
    response: {
      en: "To manage nutrient deficiency in Maize, spray appropriate fungicides at early stages."
    },
    followUp: {
      en: "What is the solution for nutrient deficiency in Maize?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["tomato", "yield", "yield prediction"],
    response: {
      en: "To manage poor germination in Tomato, conduct soil testing and adjust nutrients accordingly."
    },
    followUp: {
      en: "How to control poor germination in Tomato?"
    }
  },
  {
    intent: "pest_control",
    tags: ["soybean", "pest_disease", "disease"],
    response: {
      en: "To manage leaf spots in Soybean, use neem oil or recommended pesticides to control pests."
    },
    followUp: {
      en: "Best treatment for leaf spots in Soybean?"
    }
  },
  {
    intent: "pest_control",
    tags: ["potato", "pest_disease", "disease"],
    response: {
      en: "You can solve leaf spots in Potato by following this: ensure proper drainage and avoid waterlogging."
    },
    followUp: {
      en: "What is the solution for leaf spots in Potato?"
    }
  },
  {
    intent: "pest_control",
    tags: ["soybean", "pest_disease", "disease"],
    response: {
      en: "You can solve leaf spots in Soybean by following this: conduct soil testing and adjust nutrients accordingly."
    },
    followUp: {
      en: "How to control leaf spots in Soybean?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["cotton", "cultivation", "crop advice"],
    response: {
      en: "To manage yellow leaves in Cotton, use neem oil or recommended pesticides to control pests."
    },
    followUp: {
      en: "How can I prevent yellow leaves in Cotton?"
    }
  },
  {
    intent: "pest_control",
    tags: ["soybean", "pest_disease", "pest control", "pest"],
    response: {
      en: "To manage pest attack in Soybean, spray appropriate fungicides at early stages."
    },
    followUp: {
      en: "How can I prevent pest attack in Soybean?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["tomato", "yield", "yield prediction"],
    response: {
      en: "You can solve low yield in Tomato by following this: perform regular weeding and use mulching techniques."
    },
    followUp: {
      en: "Best treatment for low yield in Tomato?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["wheat", "yield", "yield prediction"],
    response: {
      en: "To manage low yield in Wheat, perform regular weeding and use mulching techniques."
    },
    followUp: {
      en: "What causes low yield in Wheat?"
    }
  },
  {
    intent: "pest_control",
    tags: ["maize", "pest_disease", "pest control", "pest"],
    response: {
      en: "To manage pest attack in Maize, use neem oil or recommended pesticides to control pests."
    },
    followUp: {
      en: "Why does my Maize show pest attack?"
    }
  },
  {
    intent: "pest_control",
    tags: ["onion", "symptom_query", "symptom"],
    response: {
      en: "To manage yellow leaves in Onion, conduct soil testing and adjust nutrients accordingly."
    },
    followUp: {
      en: "Why does my Onion show yellow leaves?"
    }
  },
  {
    intent: "fertilizer",
    tags: ["cotton", "fertilizer"],
    response: {
      en: "You can solve nutrient deficiency in Cotton by following this: apply balanced fertilizers like NPK and maintain proper irrigation."
    },
    followUp: {
      en: "How to control nutrient deficiency in Cotton?"
    }
  },
  {
    intent: "pest_control",
    tags: ["soybean", "symptom_query", "symptom"],
    response: {
      en: "To manage yellow leaves in Soybean, perform regular weeding and use mulching techniques."
    },
    followUp: {
      en: "How to control yellow leaves in Soybean?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["groundnut", "yield", "yield prediction"],
    response: {
      en: "You can solve low yield in Groundnut by following this: ensure proper drainage and avoid waterlogging."
    },
    followUp: {
      en: "How can I prevent low yield in Groundnut?"
    }
  },
  {
    intent: "pest_control",
    tags: ["onion", "pest_disease", "pest control", "pest"],
    response: {
      en: "To manage pest attack in Onion, perform regular weeding and use mulching techniques."
    },
    followUp: {
      en: "Why does my Onion show pest attack?"
    }
  },
  {
    intent: "fertilizer",
    tags: ["sugarcane", "fertilizer"],
    response: {
      en: "You can solve nutrient deficiency in Sugarcane by following this: ensure proper drainage and avoid waterlogging."
    },
    followUp: {
      en: "How to control nutrient deficiency in Sugarcane?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["groundnut", "yield", "yield prediction"],
    response: {
      en: "To manage poor germination in Groundnut, conduct soil testing and adjust nutrients accordingly."
    },
    followUp: {
      en: "What causes poor germination in Groundnut?"
    }
  },
  {
    intent: "crop_advice",
    tags: ["groundnut", "yield", "yield prediction"],
    response: {
      en: "You can solve low yield in Groundnut by following this: ensure proper drainage and avoid waterlogging."
    },
    followUp: {
      en: "How to improve low yield problem in Groundnut?"
    }
  },
  {
    intent: "fertilizer",
    tags: ["sugarcane", "fertilizer"],
    response: {
      en: "You can solve nutrient deficiency in Sugarcane by following this: ensure proper drainage and avoid waterlogging."
    },
    followUp: {
      en: "How to improve nutrient deficiency problem in Sugarcane?"
    }
  },
  {
    intent: "fertilizer",
    tags: ["onion", "fertilizer"],
    response: {
      en: "You can solve nutrient deficiency in Onion by following this: use certified seeds and follow proper sowing techniques."
    },
    followUp: {
      en: "How can I prevent nutrient deficiency in Onion?"
    }
  },



  {
    intent: "crop_advice",
    tags: ["onion", "yield", "yield prediction", "low yield"],
    response: {
      question: "What causes low yield in Onion?",
      answer: "Apply balanced fertilizers like NPK and maintain proper irrigation to improve yield in Onion."
    }
  },
  {
    intent: "pest_control",
    tags: ["sugarcane", "disease", "fungal", "pest_disease"],
    response: {
      question: "How can I prevent fungal disease in Sugarcane?",
      answer: "Ensure proper drainage and avoid waterlogging to prevent fungal disease in Sugarcane."
    }
  },
  {
    intent: "pest_control",
    tags: ["onion", "weed", "weed_control", "weed growth"],
    response: {
      question: "What is the solution for weed growth in Onion?",
      answer: "Use neem oil or recommended pesticides to control weed growth in Onion."
    }
  },
  {
    intent: "pest_control",
    tags: ["soybean", "symptom", "symptom_query", "yellow leaves"],
    response: {
      question: "How to improve yellow leaves problem in Soybean?",
      answer: "Conduct soil testing and adjust nutrients accordingly to solve yellow leaves in Soybean."
    }
  },
  {
    intent: "pest_control",
    tags: ["rice", "disease", "pest_disease", "root rot"],
    response: {
      question: "How can I prevent root rot in Rice?",
      answer: "Apply organic compost or manure to improve soil fertility and prevent root rot in Rice."
    }
  },
  {
    intent: "pest_control",
    tags: ["groundnut", "weed", "weed_control", "weed growth"],
    response: {
      question: "How to improve weed growth problem in Groundnut?",
      answer: "Perform regular weeding and use mulching techniques to control weeds in Groundnut."
    }
  },
  {
    intent: "pest_control",
    tags: ["sugarcane", "disease", "pest_disease", "wilting"],
    response: {
      question: "How to control wilting in Sugarcane?",
      answer: "Perform regular weeding and use mulching techniques to manage wilting in Sugarcane."
    }
  },
  {
    intent: "crop_advice",
    tags: ["potato", "yield", "yield prediction", "low yield"],
    response: {
      question: "How can I prevent low yield in Potato?",
      answer: "Apply balanced fertilizers like NPK and maintain proper irrigation to improve yield in Potato."
    }
  },
  {
    intent: "pest_control",
    tags: ["groundnut", "pest control", "pest", "pest_disease"],
    response: {
      question: "How can I prevent pest attack in Groundnut?",
      answer: "Use certified seeds and follow proper sowing techniques to prevent pest attack in Groundnut."
    }
  },
  {
    intent: "crop_advice",
    tags: ["maize", "yield prediction", "poor germination"],
    response: {
      question: "Why does my Maize show poor germination?",
      answer: "Use quality seeds and proper sowing practices to improve germination in Maize."
    }
  },



  {
    intent: "pest_control",
    tags: ["onion", "weed", "weed_control", "weed growth"],
    response: {
      question: "Why does my Onion show weed growth?",
      answer: "Use neem oil or recommended pesticides to control weed growth in Onion."
    }
  },
  {
    intent: "crop_advice",
    tags: ["potato", "yield prediction", "poor germination"],
    response: {
      question: "How can I prevent poor germination in Potato?",
      answer: "Apply organic compost or manure to improve soil fertility and germination in Potato."
    }
  },
  {
    intent: "crop_advice",
    tags: ["potato", "yield prediction", "poor germination"],
    response: {
      question: "Best treatment for poor germination in Potato?",
      answer: "Use neem oil or recommended pesticides along with proper practices to improve germination in Potato."
    }
  },
  {
    intent: "crop_advice",
    tags: ["onion", "yield", "yield prediction", "low yield"],
    response: {
      question: "How to control low yield in Onion?",
      answer: "Spray appropriate fungicides at early stages and maintain proper crop care to improve yield in Onion."
    }
  },
  {
    intent: "pest_control",
    tags: ["onion", "symptom", "symptom_query", "yellow leaves"],
    response: {
      question: "How to control yellow leaves in Onion?",
      answer: "Use certified seeds and follow proper sowing techniques to manage yellow leaves in Onion."
    }
  },
  {
    intent: "pest_control",
    tags: ["maize", "disease", "fungal", "pest_disease"],
    response: {
      question: "How to control fungal disease in Maize?",
      answer: "Apply organic compost or manure to improve soil health and manage fungal disease in Maize."
    }
  },
  {
    intent: "crop_advice",
    tags: ["soybean", "yield prediction", "poor germination"],
    response: {
      question: "Best treatment for poor germination in Soybean?",
      answer: "Spray appropriate fungicides at early stages and ensure proper sowing conditions to improve germination in Soybean."
    }
  },
  {
    intent: "pest_control",
    tags: ["soybean", "disease", "fungal", "pest_disease"],
    response: {
      question: "Best treatment for fungal disease in Soybean?",
      answer: "Use certified seeds and follow proper sowing techniques to control fungal disease in Soybean."
    }
  },
  {
    intent: "pest_control",
    tags: ["cotton", "pest control", "pest", "pest_disease"],
    response: {
      question: "How can I prevent pest attack in Cotton?",
      answer: "Use neem oil or recommended pesticides to prevent pest attack in Cotton."
    }
  },
  {
    intent: "pest_control",
    tags: ["onion", "disease", "fungal", "pest_disease"],
    response: {
      question: "How can I prevent fungal disease in Onion?",
      answer: "Ensure proper drainage and avoid waterlogging to prevent fungal disease in Onion."
    }
  },


  {
    intent: "pest_control",
    tags: ["potato", "disease", "pest_disease", "wilting"],
    response: {
      question: "What is the solution for wilting in Potato?",
      answer: "Apply balanced fertilizers like NPK and maintain proper irrigation to manage wilting in Potato."
    }
  },
  {
    intent: "crop_advice",
    tags: ["tomato", "yield prediction", "poor germination"],
    response: {
      question: "How can I prevent poor germination in Tomato?",
      answer: "Ensure proper drainage and avoid waterlogging to improve germination in Tomato."
    }
  },
  {
    intent: "pest_control",
    tags: ["potato", "pest control", "pest", "pest_disease"],
    response: {
      question: "How can I prevent pest attack in Potato?",
      answer: "Spray appropriate fungicides at early stages to prevent pest attack in Potato."
    }
  },
  {
    intent: "fertilizer",
    tags: ["soybean", "fertilizer", "nutrient deficiency"],
    response: {
      question: "Best treatment for nutrient deficiency in Soybean?",
      answer: "Apply balanced fertilizers like NPK and maintain proper irrigation to manage nutrient deficiency in Soybean."
    }
  },
  {
    intent: "pest_control",
    tags: ["sugarcane", "disease", "pest_disease", "wilting"],
    response: {
      question: "Best treatment for wilting in Sugarcane?",
      answer: "Spray appropriate fungicides at early stages to control wilting in Sugarcane."
    }
  },
  {
    intent: "crop_advice",
    tags: ["potato", "crop advice", "cultivation", "yellow leaves"],
    response: {
      question: "How can I prevent yellow leaves in Potato?",
      answer: "Ensure proper drainage and avoid waterlogging to prevent yellow leaves in Potato."
    }
  },
  {
    intent: "fertilizer",
    tags: ["groundnut", "fertilizer", "nutrient deficiency"],
    response: {
      question: "What causes nutrient deficiency in Groundnut?",
      answer: "Conduct soil testing and adjust nutrients accordingly to manage deficiency in Groundnut."
    }
  },
  {
    intent: "pest_control",
    tags: ["sugarcane", "disease", "pest_disease", "wilting"],
    response: {
      question: "What causes wilting in Sugarcane?",
      answer: "Perform regular weeding and use mulching techniques to manage wilting in Sugarcane."
    }
  },
  {
    intent: "pest_control",
    tags: ["groundnut", "disease", "pest_disease", "wilting"],
    response: {
      question: "What is the solution for wilting in Groundnut?",
      answer: "Apply organic compost or manure to improve soil fertility and manage wilting in Groundnut."
    }
  },
  {
    intent: "pest_control",
    tags: ["groundnut", "disease", "fungal", "pest_disease"],
    response: {
      question: "What is the solution for fungal disease in Groundnut?",
      answer: "Conduct soil testing and adjust nutrients accordingly to control fungal disease in Groundnut."
    }
  },


  {
    intent: "pest_control",
    tags: ["tomato", "disease", "pest_disease", "leaf spots"],
    response: {
      question: "Best treatment for leaf spots in Tomato?",
      answer: "Apply balanced fertilizers like NPK and maintain proper irrigation to manage leaf spots in Tomato."
    }
  },
  {
    intent: "pest_control",
    tags: ["onion", "disease", "pest_disease", "root rot"],
    response: {
      question: "Why does my Onion show root rot?",
      answer: "Spray appropriate fungicides at early stages to control root rot in Onion."
    }
  },
  {
    intent: "pest_control",
    tags: ["wheat", "symptom", "symptom_query", "yellow leaves"],
    response: {
      question: "How to improve yellow leaves problem in Wheat?",
      answer: "Conduct soil testing and adjust nutrients accordingly to manage yellow leaves in Wheat."
    }
  },
  {
    intent: "fertilizer",
    tags: ["tomato", "fertilizer", "nutrient deficiency"],
    response: {
      question: "How to improve nutrient deficiency problem in Tomato?",
      answer: "Apply organic compost or manure to improve soil fertility and manage nutrient deficiency in Tomato."
    }
  },
  {
    intent: "pest_control",
    tags: ["onion", "disease", "pest_disease", "root rot"],
    response: {
      question: "What is the solution for root rot in Onion?",
      answer: "Perform regular weeding and use mulching techniques to manage root rot in Onion."
    }
  },
  {
    intent: "pest_control",
    tags: ["cotton", "symptom", "symptom_query", "yellow leaves"],
    response: {
      question: "How to improve yellow leaves problem in Cotton?",
      answer: "Spray appropriate fungicides at early stages to manage yellow leaves in Cotton."
    }
  },
  {
    intent: "pest_control",
    tags: ["groundnut", "disease", "pest_disease", "root rot"],
    response: {
      question: "What is the solution for root rot in Groundnut?",
      answer: "Apply organic compost or manure to improve soil fertility and manage root rot in Groundnut."
    }
  },
  {
    intent: "crop_advice",
    tags: ["potato", "yield prediction", "poor germination"],
    response: {
      question: "How to control poor germination in Potato?",
      answer: "Spray appropriate fungicides at early stages and ensure proper conditions to improve germination in Potato."
    }
  },
  {
    intent: "pest_control",
    tags: ["soybean", "pest control", "pest", "pest_disease"],
    response: {
      question: "Why does my Soybean show pest attack?",
      answer: "Conduct soil testing and adjust nutrients accordingly to reduce pest attack in Soybean."
    }
  },
  {
    intent: "crop_advice",
    tags: ["potato", "yield", "yield prediction", "low yield"],
    response: {
      question: "What is the solution for low yield in Potato?",
      answer: "Ensure proper drainage and avoid waterlogging to improve yield in Potato."
    }
  },



  {
    intent: "crop_advice",
    tags: ["maize", "yield prediction", "poor germination"],
    response: {
      question: "How to control poor germination in Maize?",
      answer: "Use certified seeds and follow proper sowing techniques to improve germination in Maize."
    }
  },
  {
    intent: "pest_control",
    tags: ["maize", "disease", "pest_disease", "wilting"],
    response: {
      question: "How to control wilting in Maize?",
      answer: "Spray appropriate fungicides at early stages to control wilting in Maize."
    }
  },
  {
    intent: "pest_control",
    tags: ["sugarcane", "symptom", "symptom_query", "yellow leaves"],
    response: {
      question: "How to improve yellow leaves problem in Sugarcane?",
      answer: "Apply balanced fertilizers like NPK and maintain proper irrigation to manage yellow leaves in Sugarcane."
    }
  },
  {
    intent: "pest_control",
    tags: ["cotton", "symptom", "symptom_query", "yellow leaves"],
    response: {
      question: "Best treatment for yellow leaves in Cotton?",
      answer: "Apply balanced fertilizers like NPK and maintain proper irrigation to manage yellow leaves in Cotton."
    }
  },
  {
    intent: "pest_control",
    tags: ["soybean", "disease", "fungal", "pest_disease"],
    response: {
      question: "How to control fungal disease in Soybean?",
      answer: "Use certified seeds and follow proper sowing techniques to manage fungal disease in Soybean."
    }
  },
  {
    intent: "fertilizer",
    tags: ["cotton", "fertilizer", "nutrient deficiency"],
    response: {
      question: "Best treatment for nutrient deficiency in Cotton?",
      answer: "Ensure proper drainage and avoid waterlogging to manage nutrient deficiency in Cotton."
    }
  },
  {
    intent: "pest_control",
    tags: ["cotton", "pest control", "pest", "pest_disease"],
    response: {
      question: "What causes pest attack in Cotton?",
      answer: "Apply balanced fertilizers like NPK and maintain proper irrigation to manage pest attack in Cotton."
    }
  },
  {
    intent: "crop_advice",
    tags: ["potato", "yield", "yield prediction", "low yield"],
    response: {
      question: "What causes low yield in Potato?",
      answer: "Use certified seeds and follow proper sowing techniques to improve yield in Potato."
    }
  },
  {
    intent: "pest_control",
    tags: ["maize", "disease", "pest_disease", "wilting"],
    response: {
      question: "Best treatment for wilting in Maize?",
      answer: "Ensure proper drainage and avoid waterlogging to manage wilting in Maize."
    }
  },
  {
    intent: "pest_control",
    tags: ["cotton", "disease", "pest_disease", "leaf spots"],
    response: {
      question: "What causes leaf spots in Cotton?",
      answer: "Use neem oil or recommended pesticides to control leaf spots in Cotton."
    }
  },



  {
    intent: "fertilizer",
    tags: ["rice", "fertilizer", "nutrient deficiency"],
    response: {
      question: "Best treatment for nutrient deficiency in Rice?",
      answer: "Apply organic compost or manure to improve soil fertility and manage nutrient deficiency in Rice."
    }
  },
  {
    intent: "crop_advice",
    tags: ["sugarcane", "yield prediction", "poor germination"],
    response: {
      question: "Why does my Sugarcane show poor germination?",
      answer: "Apply balanced fertilizers like NPK and maintain proper irrigation to improve germination in Sugarcane."
    }
  },
  {
    intent: "crop_advice",
    tags: ["rice", "yield", "yield prediction", "low yield"],
    response: {
      question: "How to improve low yield problem in Rice?",
      answer: "Apply organic compost or manure to improve soil fertility and increase yield in Rice."
    }
  },
  {
    intent: "pest_control",
    tags: ["wheat", "symptom", "symptom_query", "yellow leaves"],
    response: {
      question: "What causes yellow leaves in Wheat?",
      answer: "Ensure proper drainage and avoid waterlogging to manage yellow leaves in Wheat."
    }
  },
  {
    intent: "pest_control",
    tags: ["cotton", "disease", "fungal", "pest_disease"],
    response: {
      question: "What is the solution for fungal disease in Cotton?",
      answer: "Perform regular weeding and use mulching techniques to control fungal disease in Cotton."
    }
  },
  {
    intent: "pest_control",
    tags: ["maize", "weed", "weed_control", "weed growth"],
    response: {
      question: "What is the solution for weed growth in Maize?",
      answer: "Use neem oil or recommended pesticides to control weed growth in Maize."
    }
  },
  {
    intent: "pest_control",
    tags: ["cotton", "disease", "pest_disease", "wilting"],
    response: {
      question: "What causes wilting in Cotton?",
      answer: "Perform regular weeding and use mulching techniques to manage wilting in Cotton."
    }
  },
  {
    intent: "pest_control",
    tags: ["maize", "pest control", "pest", "pest_disease"],
    response: {
      question: "How to control pest attack in Maize?",
      answer: "Use neem oil or recommended pesticides to control pest attack in Maize."
    }
  },
  {
    intent: "pest_control",
    tags: ["tomato", "pest control", "pest", "pest_disease"],
    response: {
      question: "Best treatment for pest attack in Tomato?",
      answer: "Ensure proper drainage and avoid waterlogging to manage pest attack in Tomato."
    }
  },
  {
    intent: "pest_control",
    tags: ["wheat", "symptom", "symptom_query", "yellow leaves"],
    response: {
      question: "Why does my Wheat show yellow leaves?",
      answer: "Spray appropriate fungicides at early stages to manage yellow leaves in Wheat."
    }
  },

    {
    intent: "irrigation",
    tags: ["irrigation", "water", "watering", "schedule"],
    response: {
      en: "Proper irrigation depends on crop type, soil, and weather conditions. Avoid overwatering and ensure moisture is maintained at critical growth stages.",
      hi: "सही सिंचाई फसल, मिट्टी और मौसम पर निर्भर करती है। अधिक पानी से बचें और महत्वपूर्ण विकास चरणों में नमी बनाए रखें।",
      mr: "योग्य सिंचन पिक, माती आणि हवामानावर अवलंबून असते. जास्त पाणी टाळा आणि महत्त्वाच्या वाढीच्या टप्प्यांवर ओलावा ठेवा."
    },
    followUp: {
      en: "Which crop and stage are you asking about for irrigation advice?",
      hi: "आप किस फसल और किस चरण के लिए सिंचाई की जानकारी चाहते हैं?",
      mr: "तुम्ही कोणत्या पिकासाठी आणि टप्प्यासाठी सिंचन माहिती हवी आहे?"
    }
  },
  {
    intent: "irrigation",
    tags: ["drip irrigation", "micro irrigation", "water saving"],
    response: {
      en: "Drip irrigation delivers water directly to the roots, saving water and improving efficiency. It is ideal for crops like vegetables, fruits, and sugarcane.",
      hi: "ड्रिप सिंचाई जड़ों तक सीधे पानी पहुंचाती है, जिससे पानी की बचत होती है और दक्षता बढ़ती है। यह सब्जियों, फलों और गन्ने के लिए उपयुक्त है।",
      mr: "ठिबक सिंचनामुळे पाणी थेट मुळांपर्यंत पोहोचते, ज्यामुळे पाणी वाचते आणि कार्यक्षमता वाढते. हे भाजीपाला, फळे आणि ऊसासाठी योग्य आहे."
    },
    followUp: {
      en: "Do you want installation cost or crop-wise drip recommendation?",
      hi: "क्या आपको लागत या फसल के अनुसार ड्रिप सलाह चाहिए?",
      mr: "तुम्हाला खर्च किंवा पिकानुसार ठिबक सल्ला हवा आहे का?"
    }
  },
  {
    intent: "irrigation",
    tags: ["sprinkler irrigation", "spray water", "overhead irrigation"],
    response: {
      en: "Sprinkler irrigation spreads water like rainfall and works well for crops like wheat, vegetables, and lawns. It helps maintain uniform moisture.",
      hi: "स्प्रिंकलर सिंचाई बारिश की तरह पानी फैलाती है और गेहूं व सब्जियों के लिए उपयुक्त है। यह समान नमी बनाए रखने में मदद करती है।",
      mr: "स्प्रिंकलर सिंचन पावसासारखे पाणी पसरवते आणि गहू व भाजीपाला यासाठी योग्य आहे. हे समान ओलावा राखण्यास मदत करते."
    },
    followUp: {
      en: "Do you want to compare sprinkler with drip irrigation?",
      hi: "क्या आप स्प्रिंकलर और ड्रिप की तुलना जानना चाहते हैं?",
      mr: "तुम्हाला स्प्रिंकलर आणि ठिबक यांची तुलना हवी आहे का?"
    }
  },
  {
    intent: "irrigation",
    tags: ["over irrigation", "waterlogging", "excess water"],
    response: {
      en: "Over irrigation can cause root rot, nutrient loss, and poor plant growth. Ensure proper drainage and avoid standing water in the field.",
      hi: "अधिक सिंचाई से जड़ सड़न, पोषक तत्वों की कमी और खराब वृद्धि हो सकती है। खेत में पानी जमा न होने दें।",
      mr: "जास्त सिंचनामुळे मुळांची कुज, पोषक तत्वांची कमतरता आणि वाढ कमी होते. शेतात पाणी साचू देऊ नका."
    },
    followUp: {
      en: "Are you seeing symptoms like yellowing or wilting in your crop?",
      hi: "क्या आपकी फसल में पीले पत्ते या मुरझाना दिख रहा है?",
      mr: "तुमच्या पिकात पिवळेपणा किंवा वाळणे दिसत आहे का?"
    }
  },
  {
    intent: "irrigation",
    tags: ["under irrigation", "water stress", "low water"],
    response: {
      en: "Under irrigation leads to water stress, reduced growth, and low yield. Ensure timely watering especially during flowering and fruiting stages.",
      hi: "कम सिंचाई से पानी की कमी, कम वृद्धि और कम उत्पादन होता है। फूल और फल बनने के समय पानी देना जरूरी है।",
      mr: "कमी सिंचनामुळे पाण्याची कमतरता, कमी वाढ आणि उत्पादन घटते. फुलोरा आणि फळधारणा टप्प्यावर पाणी देणे आवश्यक आहे."
    },
    followUp: {
      en: "Tell me your crop so I can suggest exact watering intervals.",
      hi: "अपनी फसल बताइए, मैं सही सिंचाई अंतर बता दूँगा।",
      mr: "तुमचे पीक सांगा, मी योग्य पाणी देण्याचे अंतर सांगतो."
    }
  },
  {
    intent: "irrigation",
    tags: ["irrigation schedule", "watering time", "frequency"],
    response: {
      en: "Irrigation scheduling depends on crop stage, soil type, and weather. Critical stages like germination, flowering, and grain filling need proper watering.",
      hi: "सिंचाई का समय फसल के चरण, मिट्टी और मौसम पर निर्भर करता है। अंकुरण, फूल और दाना बनने के समय पानी जरूरी है।",
      mr: "सिंचन वेळ पिकाच्या टप्प्यावर, माती आणि हवामानावर अवलंबून असतो. उगवण, फुलोरा आणि दाणे भरण्याच्या टप्प्यावर पाणी आवश्यक आहे."
    },
    followUp: {
      en: "Do you want a crop-specific irrigation schedule?",
      hi: "क्या आप फसल के अनुसार सिंचाई समय जानना चाहते हैं?",
      mr: "तुम्हाला पिकानुसार सिंचन वेळ हवा आहे का?"
    }
  }

  ]
};
