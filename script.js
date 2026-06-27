const STORAGE_KEYS = {
  profiles: "kisanMargProfiles",
  currentUser: "kisanMargCurrentUser",
  language: "kisanMargLanguage",
  pendingVoicePrompt: "kisanMargPendingVoicePrompt"
};

function ensureSeedData() {
  if (!localStorage.getItem(STORAGE_KEYS.profiles)) {
    localStorage.setItem(STORAGE_KEYS.profiles, JSON.stringify(KISAN_MARG_DATA.profiles));
  }
  if (!localStorage.getItem(STORAGE_KEYS.currentUser)) {
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(KISAN_MARG_DATA.profiles[0]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.language)) {
    localStorage.setItem(STORAGE_KEYS.language, "en");
  }
}

function getProfiles() {
  ensureSeedData();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.profiles) || "[]");
}

function saveProfiles(profiles) {
  localStorage.setItem(STORAGE_KEYS.profiles, JSON.stringify(profiles));
}

function getCurrentUser() {
  ensureSeedData();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.currentUser) || "null");
}

function setCurrentUser(user) {
  localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
}

function getLanguage() {
  ensureSeedData();
  return localStorage.getItem(STORAGE_KEYS.language) || "en";
}

function setLanguage(lang) {
  localStorage.setItem(STORAGE_KEYS.language, lang);
}

function applyLanguage() {
  const lang = getLanguage();
  const dict = KISAN_MARG_I18N[lang] || KISAN_MARG_I18N.en;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (dict[key]) {
      if (node.tagName === "INPUT" || node.tagName === "TEXTAREA") {
        node.placeholder = dict[key];
      } else {
        node.textContent = dict[key];
      }
    }
  });
  document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.langBtn === lang);
  });
}

function getDict() {
  return KISAN_MARG_I18N[getLanguage()] || KISAN_MARG_I18N.en;
}

function wireLanguageButtons() {
  document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.langBtn);
      applyLanguage();
      rerenderLocalizedContent();
    });
  });
}

function markActiveNav() {
  const page = document.body.dataset.page;
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.page === page);
  });
}

function fillCurrentUser() {
  const user = getCurrentUser();
  document.querySelectorAll("[data-user-name]").forEach((node) => {
    node.textContent = user ? user.name : "Kisan User";
  });
}

function weatherText(info) {
  const lang = getLanguage();
  const dict = WEATHER_TRANSLATIONS[lang] || WEATHER_TRANSLATIONS.en;
  if (!info) return "--";
  return dict[info.key] || WEATHER_TRANSLATIONS.en[info.key] || "--";
}

function renderMarketSample() {
  const dict = getDict();
  const cropSelect = document.getElementById("marketCropSelect");
  const stateSelect = document.getElementById("marketStateSelect");
  const body = document.getElementById("marketTableBody");
  const best = document.getElementById("bestRateValue");
  const bestSub = document.getElementById("bestRateSub");
  const bars = document.getElementById("trendBars");
  const cardTitle = document.getElementById("market-card-title");
  if (!cropSelect || !body || !best || !bestSub || !bars || !cardTitle) return;

  const crop = cropSelect.value;
  const data = MARKET_SAMPLE_DATA[crop] || MARKET_SAMPLE_DATA.Wheat;
  const selectedState = stateSelect?.value || "";
  const location = selectedState || data.location;

  body.innerHTML = `
    <tr>
      <td>${dict.marketMandi}<span class="market-note">${crop}</span></td>
      <td>${location}</td>
      <td><span class="market-rate">₹${Math.max(1, data.mandi - 2)}/qtl</span></td>
      <td><span class="market-rate">₹${data.mandi}/qtl</span></td>
      <td><span class="market-rate">₹${data.direct}/qtl</span></td>
    </tr>
    <tr>
      <td>${dict.marketMandi}<span class="market-note">Secondary market</span></td>
      <td>${data.location}</td>
      <td><span class="market-rate">₹${Math.max(1, data.trader - 1)}/qtl</span></td>
      <td><span class="market-rate">₹${data.trader}/qtl</span></td>
      <td><span class="market-rate">₹${Math.max(data.trader + 2, data.mandi - 1)}/qtl</span></td>
    </tr>
  `;

  best.textContent = `₹${data.direct}/qtl`;
  bestSub.textContent = `${location} currently shows the strongest modal return for ${crop.toLowerCase()}. ${dict.marketFallbackNote}`;
  cardTitle.textContent = crop;

  const max = Math.max(...data.trend);
  bars.innerHTML = data.trend.map((value, index) => {
    const height = Math.max(8, Math.round((value / max) * 82));
    const className = index === data.trend.length - 1 ? "bar current" : "bar";
    return `
      <div class="bar-wrap">
        <div class="bar-value">₹${value}</div>
        <div class="${className}" style="height:${height}px;"></div>
        <div class="bar-label">D${index + 1}</div>
      </div>
    `;
  }).join("");
}

function marketElements() {
  return {
    cropSelect: document.getElementById("marketCropSelect"),
    stateSelect: document.getElementById("marketStateSelect"),
    body: document.getElementById("marketTableBody"),
    best: document.getElementById("bestRateValue"),
    bestSub: document.getElementById("bestRateSub"),
    bars: document.getElementById("trendBars"),
    cardTitle: document.getElementById("market-card-title"),
    status: document.getElementById("market-status"),
    error: document.getElementById("market-error")
  };
}

const RUNTIME_CONFIG = window.KISAN_MARG_RUNTIME || {};
const MARKET_SAMPLE_DATA = {
  Wheat: { location: "Nashik", direct: 32, mandi: 30, trader: 27, trend: [25, 27, 27, 28, 30, 31, 32] },
  Rice: { location: "Nagpur", direct: 46, mandi: 43, trader: 39, trend: [37, 39, 40, 41, 43, 44, 46] },
  Soyabean: { location: "Amravati", direct: 52, mandi: 48, trader: 44, trend: [42, 44, 45, 46, 47, 49, 52] },
  Cotton: { location: "Akola", direct: 74, mandi: 69, trader: 63, trend: [58, 60, 61, 64, 66, 70, 74] },
  Onion: { location: "Lasalgaon", direct: 18, mandi: 15, trader: 12, trend: [10, 11, 12, 13, 14, 15, 18] },
  Tomato: { location: "Pune", direct: 22, mandi: 19, trader: 16, trend: [13, 15, 16, 17, 18, 20, 22] },
  Maize: { location: "Indore", direct: 24, mandi: 21, trader: 18, trend: [16, 17, 18, 19, 20, 22, 24] },
  Potato: { location: "Agra", direct: 17, mandi: 15, trader: 13, trend: [11, 12, 13, 14, 15, 16, 17] }
};

const WEATHER_TRANSLATIONS = {
  en: {
    clear_sky: "Clear sky",
    mostly_clear: "Mostly clear",
    partly_cloudy: "Partly cloudy",
    overcast: "Overcast",
    fog: "Fog",
    rime_fog: "Rime fog",
    light_drizzle: "Light drizzle",
    drizzle: "Drizzle",
    heavy_drizzle: "Heavy drizzle",
    freezing_drizzle: "Freezing drizzle",
    heavy_freezing_drizzle: "Heavy freezing drizzle",
    light_rain: "Light rain",
    rain: "Rain",
    heavy_rain: "Heavy rain",
    freezing_rain: "Freezing rain",
    heavy_freezing_rain: "Heavy freezing rain",
    light_snow: "Light snow",
    snow: "Snow",
    heavy_snow: "Heavy snow",
    snow_grains: "Snow grains",
    rain_showers: "Rain showers",
    heavy_showers: "Heavy showers",
    violent_rain: "Violent rain",
    snow_showers: "Snow showers",
    heavy_snow_showers: "Heavy snow showers",
    thunderstorm: "Thunderstorm",
    thunder_with_hail: "Thunder with hail",
    severe_thunder: "Severe thunder",
    rain_unit: "mm rain",
    wind_unit: "km/h wind"
  },
  hi: {
    clear_sky: "साफ आसमान",
    mostly_clear: "अधिकतर साफ",
    partly_cloudy: "आंशिक बादल",
    overcast: "घना बादल",
    fog: "कोहरा",
    rime_fog: "जमा हुआ कोहरा",
    light_drizzle: "हल्की फुहार",
    drizzle: "फुहार",
    heavy_drizzle: "तेज फुहार",
    freezing_drizzle: "जमी हुई फुहार",
    heavy_freezing_drizzle: "तेज जमी हुई फुहार",
    light_rain: "हल्की बारिश",
    rain: "बारिश",
    heavy_rain: "तेज बारिश",
    freezing_rain: "जमी हुई बारिश",
    heavy_freezing_rain: "तेज जमी हुई बारिश",
    light_snow: "हल्की बर्फबारी",
    snow: "बर्फबारी",
    heavy_snow: "तेज बर्फबारी",
    snow_grains: "बर्फ कण",
    rain_showers: "बारिश की बौछारें",
    heavy_showers: "तेज बौछारें",
    violent_rain: "भारी वर्षा",
    snow_showers: "बर्फ की बौछारें",
    heavy_snow_showers: "तेज बर्फ की बौछारें",
    thunderstorm: "आंधी-तूफान",
    thunder_with_hail: "ओलों सहित तूफान",
    severe_thunder: "गंभीर तूफान",
    rain_unit: "मिमी बारिश",
    wind_unit: "किमी/घं हवा"
  },
  mr: {
    clear_sky: "स्वच्छ आकाश",
    mostly_clear: "बहुतेक स्वच्छ",
    partly_cloudy: "अंशतः ढगाळ",
    overcast: "पूर्ण ढगाळ",
    fog: "धुके",
    rime_fog: "थंड धुके",
    light_drizzle: "हलकी रिमझिम",
    drizzle: "रिमझिम",
    heavy_drizzle: "जोरदार रिमझिम",
    freezing_drizzle: "गोठणारी रिमझिम",
    heavy_freezing_drizzle: "जोरदार गोठणारी रिमझिम",
    light_rain: "हलका पाऊस",
    rain: "पाऊस",
    heavy_rain: "जोरदार पाऊस",
    freezing_rain: "गोठणारा पाऊस",
    heavy_freezing_rain: "जोरदार गोठणारा पाऊस",
    light_snow: "हलका हिमवर्षाव",
    snow: "हिमवर्षाव",
    heavy_snow: "जोरदार हिमवर्षाव",
    snow_grains: "हिमकण",
    rain_showers: "पावसाच्या सरी",
    heavy_showers: "जोरदार सरी",
    violent_rain: "मुसळधार पाऊस",
    snow_showers: "हिमसरी",
    heavy_snow_showers: "जोरदार हिमसरी",
    thunderstorm: "मेघगर्जना",
    thunder_with_hail: "गारांसह मेघगर्जना",
    severe_thunder: "तीव्र मेघगर्जना",
    rain_unit: "मिमी पाऊस",
    wind_unit: "किमी/ता वारा"
  }
};

const marketState = {
  initialized: false
};

function showMarketStatus(message) {
  const { status } = marketElements();
  if (!status) return;
  status.classList.remove("hidden");
  status.innerHTML = `<div class="spinner"></div><span>${message}</span>`;
}

function hideMarketStatus() {
  const { status } = marketElements();
  if (status) status.classList.add("hidden");
}

function showMarketError(message) {
  const { error } = marketElements();
  if (!error) return;
  error.classList.remove("hidden");
  error.textContent = message;
}

function clearMarketError() {
  const { error } = marketElements();
  if (error) error.classList.add("hidden");
}

function normalizeCropName(crop) {
  const map = {
    Wheat: "Wheat",
    Rice: "Rice",
    Soyabean: "Soyabean",
    Cotton: "Cotton",
    Onion: "Onion",
    Tomato: "Tomato",
    Maize: "Maize",
    Potato: "Potato"
  };
  return map[crop] || crop;
}

function formatMarketPrice(value) {
  const num = Number(value);
  return Number.isFinite(num) ? `₹${num}/qtl` : "--";
}

function marketPriceValue(record) {
  return Number(record.modal_price || record.modalPrice || record.max_price || record.min_price || 0);
}

function renderLiveMarket(records, crop) {
  const { body, best, bestSub, bars, cardTitle } = marketElements();
  if (!body || !best || !bestSub || !bars || !cardTitle) return;

  body.innerHTML = records.map((record) => `
    <tr>
      <td>${record.market || "--"}<span class="market-note">${record.variety || normalizeCropName(record.commodity || crop)}</span></td>
      <td>${[record.district, record.state].filter(Boolean).join(", ") || "--"}<span class="market-note">${record.arrival_date || ""}</span></td>
      <td><span class="market-rate">${formatMarketPrice(record.min_price)}</span></td>
      <td><span class="market-rate">${formatMarketPrice(record.modal_price)}</span></td>
      <td><span class="market-rate">${formatMarketPrice(record.max_price)}</span></td>
    </tr>
  `).join("");

  const sorted = [...records].sort((a, b) => marketPriceValue(b) - marketPriceValue(a));
  const topRecord = sorted[0];
  best.textContent = formatMarketPrice(topRecord?.modal_price);
  bestSub.textContent = topRecord
    ? `${topRecord.market} in ${topRecord.state} is currently showing the strongest modal price for ${crop.toLowerCase()} on ${topRecord.arrival_date || "the latest update"}.`
    : getDict().marketNoData;
  cardTitle.textContent = crop;

  const max = Math.max(...records.map((record) => marketPriceValue(record)), 1);
  bars.innerHTML = records.slice(0, 6).map((record, index) => {
    const value = marketPriceValue(record);
    const height = Math.max(8, Math.round((value / max) * 82));
    const className = index === 0 ? "bar current" : "bar";
    return `
      <div class="bar-wrap">
        <div class="bar-value">₹${value || 0}</div>
        <div class="${className}" style="height:${height}px;"></div>
        <div class="bar-label">${record.market || "Market"}</div>
      </div>
    `;
  }).join("");
}

async function fetchLiveMarketRecords(crop, state) {
  const config = RUNTIME_CONFIG.market || {};
  if (!config.apiKey || !config.resourceId) {
    throw new Error("market_config_missing");
  }

  const params = new URLSearchParams({
    "api-key": config.apiKey,
    format: "json",
    limit: String(config.limit || 12)
  });
  params.append("filters[commodity]", normalizeCropName(crop));
  if (state) params.append("filters[state]", state);

  const url = `${config.apiBaseUrl}/${config.resourceId}?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("market_fetch_failed");
  const payload = await response.json();
  return (payload.records || []).filter((record) => {
    const cropMatch = !crop || String(record.commodity || "").toLowerCase() === normalizeCropName(crop).toLowerCase();
    const stateMatch = !state || String(record.state || "").toLowerCase() === state.toLowerCase();
    return cropMatch && stateMatch;
  });
}

const WEATHER_RECENT_KEY = "kisanMargWeatherRecents";
const WEATHER_WMO_MAP = {
  0: { key: "clear_sky", icon: "sun" },
  1: { key: "mostly_clear", icon: "sun-cloud" },
  2: { key: "partly_cloudy", icon: "sun-cloud" },
  3: { key: "overcast", icon: "cloud" },
  45: { key: "fog", icon: "fog" },
  48: { key: "rime_fog", icon: "fog" },
  51: { key: "light_drizzle", icon: "drizzle" },
  53: { key: "drizzle", icon: "drizzle" },
  55: { key: "heavy_drizzle", icon: "drizzle" },
  56: { key: "freezing_drizzle", icon: "sleet" },
  57: { key: "heavy_freezing_drizzle", icon: "sleet" },
  61: { key: "light_rain", icon: "rain" },
  63: { key: "rain", icon: "rain" },
  65: { key: "heavy_rain", icon: "rain" },
  66: { key: "freezing_rain", icon: "sleet" },
  67: { key: "heavy_freezing_rain", icon: "sleet" },
  71: { key: "light_snow", icon: "snow" },
  73: { key: "snow", icon: "snow" },
  75: { key: "heavy_snow", icon: "snow" },
  77: { key: "snow_grains", icon: "snow" },
  80: { key: "rain_showers", icon: "rain" },
  81: { key: "heavy_showers", icon: "rain" },
  82: { key: "violent_rain", icon: "rain" },
  85: { key: "snow_showers", icon: "snow" },
  86: { key: "heavy_snow_showers", icon: "snow" },
  95: { key: "thunderstorm", icon: "storm" },
  96: { key: "thunder_with_hail", icon: "storm" },
  99: { key: "severe_thunder", icon: "storm" }
};

const weatherState = {
  initialized: false,
  lastPlace: null,
  lastData: null
};

function defaultWeatherPlace() {
  const configured = RUNTIME_CONFIG.weather?.defaultPlace;
  if (configured && configured.latitude && configured.longitude) {
    return configured;
  }
  return {
    id: "20.9374,77.7796",
    label: "Amravati, Maharashtra",
    latitude: 20.9374,
    longitude: 77.7796,
    timezone: "Asia/Kolkata"
  };
}

function weatherPageElements() {
  return {
    form: document.getElementById("weather-search-form"),
    input: document.getElementById("weather-city-input"),
    clearBtn: document.getElementById("weather-clear-btn"),
    suggestions: document.getElementById("weather-suggestions"),
    status: document.getElementById("weather-status"),
    error: document.getElementById("weather-error"),
    result: document.getElementById("weather-result"),
    placeTitle: document.getElementById("weather-place-title"),
    placeSub: document.getElementById("weather-place-sub"),
    localTime: document.getElementById("weather-local-time"),
    currentTemp: document.getElementById("weather-current-temp"),
    currentDesc: document.getElementById("weather-current-desc"),
    currentFeels: document.getElementById("weather-current-feels"),
    currentWind: document.getElementById("weather-current-wind"),
    currentPrecip: document.getElementById("weather-current-precip"),
    currentClouds: document.getElementById("weather-current-clouds"),
    currentIsDay: document.getElementById("weather-current-isday"),
    currentIcon: document.getElementById("weather-current-icon"),
    tz: document.getElementById("weather-tz"),
    lat: document.getElementById("weather-lat"),
    lon: document.getElementById("weather-lon"),
    elev: document.getElementById("weather-elev"),
    dailyGrid: document.getElementById("weather-daily-grid"),
    recentsRow: document.getElementById("weather-recents-row"),
    recents: document.getElementById("weather-recents")
  };
}

function weatherDict() {
  return getDict();
}

function weatherDebounce(fn, wait = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

function weatherIconSVG(kind, isDay = true) {
  const sun = `
    <defs>
      <radialGradient id="weatherSun" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#fff3b0"></stop>
        <stop offset="100%" stop-color="#f59e0b"></stop>
      </radialGradient>
      <radialGradient id="weatherMoon" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#e5e7eb"></stop>
        <stop offset="100%" stop-color="#94a3b8"></stop>
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="14" fill="url(#weatherSun)"></circle>
  `;
  const moon = `<path d="M32 16a14 14 0 1014 24 16 16 0 11-14-24z" fill="url(#weatherMoon)"></path>`;
  const cloud = `<g opacity="${isDay ? 1 : 0.95}"><path d="M44 46c8 0 14-4 14-10s-6-10-14-10c-2 0-3 .1-5 .7A13 13 0 0016 30c0 1.2.2 2.4.5 3.4C12 35 8 38 8 42c0 6 6 10 14 10h22z" fill="#e6f1ff"></path></g>`;
  const rain = `<g>${cloud}<g stroke="#60a5fa" stroke-width="2" stroke-linecap="round"><line x1="26" y1="48" x2="22" y2="56"></line><line x1="36" y1="48" x2="32" y2="56"></line><line x1="46" y1="48" x2="42" y2="56"></line></g></g>`;
  const snow = `<g>${cloud}<g fill="#93c5fd"><circle cx="26" cy="51" r="2"></circle><circle cx="36" cy="54" r="2"></circle><circle cx="46" cy="51" r="2"></circle></g></g>`;
  const storm = `<g>${cloud}<polygon points="34,46 28,58 40,50 34,62 48,46" fill="#fde68a" stroke="#f59e0b" stroke-width="1"></polygon></g>`;
  const drizzle = `<g>${cloud}<g stroke="#93c5fd" stroke-width="2" stroke-linecap="round"><line x1="30" y1="48" x2="28" y2="52"></line><line x1="40" y1="48" x2="38" y2="52"></line></g></g>`;
  const fog = `<g>${cloud}<g stroke="#dbe3ea" stroke-width="2" stroke-linecap="round"><line x1="18" y1="54" x2="50" y2="54"></line><line x1="14" y1="58" x2="46" y2="58"></line></g></g>`;
  const sleet = `<g>${cloud}<g stroke="#93c5fd" stroke-width="2" stroke-linecap="round"><line x1="28" y1="48" x2="25" y2="54"></line><line x1="42" y1="48" x2="39" y2="54"></line></g><g fill="#dbeafe"><circle cx="35" cy="54" r="2"></circle></g></g>`;
  const icons = {
    sun: isDay ? sun : moon,
    "sun-cloud": `<g>${isDay ? sun : moon}${cloud}</g>`,
    cloud,
    rain,
    snow,
    storm,
    drizzle,
    fog,
    sleet
  };
  return `<svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">${icons[kind] || cloud}</svg>`;
}

function weatherCompass(degrees) {
  const points = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return points[Math.floor((degrees / 22.5) + 0.5) % 16];
}

function weatherFormatTemp(value) {
  return `${Math.round(value)}°C`;
}

function weatherFormatDate(date, options) {
  return new Intl.DateTimeFormat(undefined, options).format(date);
}

function weatherSummaryText(place, data) {
  const info = WEATHER_WMO_MAP[data.current?.weather_code];
  const placeName = place.label.split(",")[0];
  return `${placeName} · ${weatherFormatTemp(data.current.temperature_2m)} · ${weatherText(info)}`;
}

function dashboardWeatherHelpText(data) {
  const info = WEATHER_WMO_MAP[data.current?.weather_code];
  const wind = Math.round(data.current?.wind_speed_10m || 0);
  const lang = getLanguage();
  const dict = WEATHER_TRANSLATIONS[lang] || WEATHER_TRANSLATIONS.en;
  return `${weatherText(info)} • ${wind} ${dict.wind_unit}`;
}

async function loadMarketData() {
  const dict = getDict();
  const { cropSelect, stateSelect, cardTitle } = marketElements();
  if (!cropSelect) return;
  const crop = cropSelect.value;
  const state = stateSelect?.value || "";

  clearMarketError();
  showMarketStatus(dict.marketLoading);
  if (cardTitle) cardTitle.textContent = crop;

  try {
    const records = await fetchLiveMarketRecords(crop, state);
    hideMarketStatus();
    if (!records.length) {
      showMarketError(dict.marketNoData);
      renderMarketSample();
      return;
    }
    renderLiveMarket(records, crop);
  } catch {
    hideMarketStatus();
    showMarketError(dict.marketErrorLoad);
    renderMarketSample();
  }
}

function renderMarket() {
  const { cropSelect, stateSelect } = marketElements();
  if (!cropSelect) return;
  loadMarketData();
  if (!marketState.initialized) {
    marketState.initialized = true;
    cropSelect.addEventListener("change", loadMarketData);
    if (stateSelect) stateSelect.addEventListener("change", loadMarketData);
  }
}

function weatherRecents() {
  try {
    return JSON.parse(localStorage.getItem(WEATHER_RECENT_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveWeatherRecent(place) {
  const list = weatherRecents().filter((item) => item.id !== place.id);
  list.unshift(place);
  localStorage.setItem(WEATHER_RECENT_KEY, JSON.stringify(list.slice(0, 6)));
}

async function geocodeWeatherCity(name) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=8&language=en&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("geocode_failed");
  return response.json();
}

async function fetchWeatherForecast(place) {
  const params = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    current: "temperature_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum",
    timezone: place.timezone || "auto",
    windspeed_unit: "kmh",
    forecast_days: "7"
  });
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
  if (!response.ok) throw new Error("forecast_failed");
  return response.json();
}

function weatherStatus(message) {
  const elements = weatherPageElements();
  if (!elements.status) return;
  elements.status.classList.remove("hidden");
  elements.status.textContent = message;
}

function hideWeatherStatus() {
  const elements = weatherPageElements();
  if (elements.status) elements.status.classList.add("hidden");
}

function showWeatherError(message) {
  const elements = weatherPageElements();
  if (!elements.error) return;
  elements.error.classList.remove("hidden");
  elements.error.textContent = message;
}

function clearWeatherError() {
  const elements = weatherPageElements();
  if (elements.error) elements.error.classList.add("hidden");
}

function renderWeatherRecents() {
  const elements = weatherPageElements();
  if (!elements.recents || !elements.recentsRow) return;
  const list = weatherRecents();
  elements.recents.innerHTML = "";
  if (!list.length) {
    elements.recentsRow.classList.add("hidden");
    return;
  }
  list.forEach((place) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "weather-chip";
    button.textContent = place.label;
    button.addEventListener("click", () => loadWeatherByPlace(place));
    elements.recents.appendChild(button);
  });
  elements.recentsRow.classList.remove("hidden");
}

function renderWeatherSuggestions(results) {
  const elements = weatherPageElements();
  if (!elements.suggestions) return;
  elements.suggestions.innerHTML = "";
  if (!results.length) {
    elements.suggestions.classList.add("hidden");
    return;
  }

  results.forEach((place) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "weather-suggestion-btn";
    const label = [place.name, place.admin1, place.country_code || place.country].filter(Boolean).join(", ");
    button.innerHTML = `<strong>${label}</strong><span>Lat ${place.latitude.toFixed(2)} • Lon ${place.longitude.toFixed(2)}</span>`;
    button.addEventListener("click", () => {
      elements.suggestions.classList.add("hidden");
      loadWeatherByPlace({
        id: `${place.latitude},${place.longitude}`,
        label,
        latitude: place.latitude,
        longitude: place.longitude,
        timezone: place.timezone
      }, place.name);
    });
    elements.suggestions.appendChild(button);
  });
  elements.suggestions.classList.remove("hidden");
}

function renderWeatherMeta(data) {
  const elements = weatherPageElements();
  const currentTime = new Date(data.current?.time || Date.now());
  elements.tz.textContent = data.timezone || "--";
  elements.lat.textContent = data.latitude?.toFixed?.(2) || "--";
  elements.lon.textContent = data.longitude?.toFixed?.(2) || "--";
  elements.elev.textContent = data.elevation != null ? `${Math.round(data.elevation)} m` : "--";
  elements.localTime.textContent = weatherFormatDate(currentTime, { hour: "2-digit", minute: "2-digit", weekday: "short" });
}

function renderWeatherCurrent(data) {
  const elements = weatherPageElements();
  const dict = weatherDict();
  const current = data.current;
  const info = WEATHER_WMO_MAP[current.weather_code] || { key: "overcast", icon: "cloud" };
  elements.currentTemp.textContent = weatherFormatTemp(current.temperature_2m);
  elements.currentDesc.textContent = weatherText(info);
  elements.currentFeels.textContent = `${dict.weatherFeelsLike} ${weatherFormatTemp(current.apparent_temperature)}`;
  elements.currentWind.textContent = `${Math.round(current.wind_speed_10m)} km/h • ${weatherCompass(current.wind_direction_10m || 0)}`;
  elements.currentPrecip.textContent = `${(current.precipitation ?? 0).toFixed(1)} mm`;
  elements.currentClouds.textContent = `${current.cloud_cover ?? 0}%`;
  elements.currentIsDay.textContent = current.is_day ? dict.weatherDay : dict.weatherNight;
  elements.currentIcon.innerHTML = weatherIconSVG(info.icon, !!current.is_day);
}

function renderWeatherDaily(data) {
  const elements = weatherPageElements();
  const lang = getLanguage();
  const weatherDictText = WEATHER_TRANSLATIONS[lang] || WEATHER_TRANSLATIONS.en;
  const daily = data.daily;
  elements.dailyGrid.innerHTML = "";
  daily.time.forEach((item, index) => {
    const date = new Date(item);
    const info = WEATHER_WMO_MAP[daily.weather_code[index]] || { key: "overcast", icon: "cloud" };
    const card = document.createElement("article");
    card.className = "weather-day-card";
    card.innerHTML = `
      <div class="weather-day-name">${weatherFormatDate(date, { weekday: "short" })}</div>
      <div class="weather-day-date">${weatherFormatDate(date, { month: "short", day: "numeric" })}</div>
      <div class="weather-day-icon">${weatherIconSVG(info.icon, true)}</div>
      <div class="weather-day-desc">${weatherText(info)}</div>
      <div class="weather-day-temps">
        <span class="weather-temp-pill max">${weatherFormatTemp(daily.temperature_2m_max[index])}</span>
        <span class="weather-temp-pill min">${weatherFormatTemp(daily.temperature_2m_min[index])}</span>
      </div>
      <div class="weather-day-rain">${(daily.precipitation_sum[index] ?? 0).toFixed(1)} ${weatherDictText.rain_unit}</div>
    `;
    elements.dailyGrid.appendChild(card);
  });
}

async function loadWeatherByPlace(place, inputLabel) {
  const dict = weatherDict();
  const elements = weatherPageElements();
  clearWeatherError();
  weatherStatus(dict.weatherLoading);

  try {
    const forecast = await fetchWeatherForecast(place);
    weatherState.lastPlace = place;
    weatherState.lastData = forecast;
    updateSharedWeatherSurfaces(place, forecast);
    saveWeatherRecent(place);
    renderWeatherRecents();
    if (inputLabel && elements.input) elements.input.value = inputLabel;
    elements.placeTitle.textContent = place.label;
    elements.placeSub.textContent = dict.weatherResultSub;
    renderWeatherMeta(forecast);
    renderWeatherCurrent(forecast);
    renderWeatherDaily(forecast);
    elements.result.classList.remove("hidden");
    hideWeatherStatus();
  } catch {
    hideWeatherStatus();
    showWeatherError(dict.weatherErrorLoad);
  }
}

async function searchWeatherCity(name) {
  const dict = weatherDict();
  if (!name || name.trim().length < 2) {
    showWeatherError(dict.weatherErrorShort);
    return;
  }
  clearWeatherError();
  weatherStatus(dict.weatherLoadingSearch);
  try {
    const data = await geocodeWeatherCity(name.trim());
    const results = data.results || [];
    hideWeatherStatus();
    if (!results.length) {
      showWeatherError(dict.weatherErrorNoMatch);
      return;
    }
    if (results.length === 1) {
      const place = results[0];
      const label = [place.name, place.admin1, place.country_code || place.country].filter(Boolean).join(", ");
      loadWeatherByPlace({
        id: `${place.latitude},${place.longitude}`,
        label,
        latitude: place.latitude,
        longitude: place.longitude,
        timezone: place.timezone
      }, place.name);
      return;
    }
    renderWeatherSuggestions(results);
  } catch {
    hideWeatherStatus();
    showWeatherError(dict.weatherErrorSearch);
  }
}

function wireWeatherPage() {
  const elements = weatherPageElements();
  if (!elements.form || weatherState.initialized) return;
  weatherState.initialized = true;

  elements.form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (elements.suggestions) elements.suggestions.classList.add("hidden");
    searchWeatherCity(elements.input.value);
  });

  elements.clearBtn.addEventListener("click", () => {
    elements.input.value = "";
    if (elements.suggestions) {
      elements.suggestions.innerHTML = "";
      elements.suggestions.classList.add("hidden");
    }
    clearWeatherError();
    elements.input.focus();
  });

  document.querySelectorAll("[data-weather-city]").forEach((button) => {
    button.addEventListener("click", () => searchWeatherCity(button.dataset.weatherCity));
  });

  elements.input.addEventListener("input", weatherDebounce(async () => {
    const query = elements.input.value.trim();
    if (query.length < 2) {
      elements.suggestions.classList.add("hidden");
      elements.suggestions.innerHTML = "";
      return;
    }
    try {
      const data = await geocodeWeatherCity(query);
      renderWeatherSuggestions((data.results || []).slice(0, 6));
    } catch {
      elements.suggestions.classList.add("hidden");
    }
  }, 350));

  document.addEventListener("click", (event) => {
    if (!elements.suggestions || !elements.input) return;
    if (!elements.suggestions.contains(event.target) && event.target !== elements.input) {
      elements.suggestions.classList.add("hidden");
    }
  });

  renderWeatherRecents();
  loadWeatherByPlace({
    id: "20.9374,77.7796",
    label: "Amravati, Maharashtra",
    latitude: 20.9374,
    longitude: 77.7796,
    timezone: "Asia/Kolkata"
  }, "Amravati");
}

function renderWeather() {
  if (document.getElementById("weather-search-form")) {
    wireWeatherPage();
  }
}

function updateSharedWeatherSurfaces(place, data) {
  const strip = document.querySelector("[data-i18n='weatherStrip']");
  if (strip) {
    strip.textContent = weatherSummaryText(place, data);
  }

  const dashTemp = document.getElementById("dashboard-weather-temp");
  const dashHelp = document.getElementById("dashboard-weather-help");
  if (dashTemp) {
    dashTemp.textContent = weatherFormatTemp(data.current.temperature_2m);
  }
  if (dashHelp) {
    dashHelp.textContent = dashboardWeatherHelpText(data);
  }
}

async function syncLiveWeatherSummary() {
  const hasHomeStrip = document.querySelector("[data-i18n='weatherStrip']");
  const hasDashboardStat = document.getElementById("dashboard-weather-temp");
  if (!hasHomeStrip && !hasDashboardStat) return;

  try {
    const place = defaultWeatherPlace();
    const data = await fetchWeatherForecast(place);
    updateSharedWeatherSurfaces(place, data);
  } catch {
    // Keep existing static fallback copy if live weather fails.
  }
}

function renderSchemes() {
  const dict = getDict();
  const container = document.getElementById("schemeList");
  if (!container) return;
  container.innerHTML = dict.schemeItems.map((scheme) => `
    <div class="list-item">
      <div>
        <h4>${scheme.name}</h4>
        <p>${scheme.desc}</p>
      </div>
      <span class="badge green">${dict.schemeBadge}</span>
    </div>
  `).join("");
}

function renderCommunity() {
  const dict = getDict();
  const container = document.getElementById("communityList");
  if (!container) return;
  container.innerHTML = dict.communityItems.map((post) => `
    <div class="list-item">
      <div>
        <h4>${post.title}</h4>
        <p>${post.meta}</p>
      </div>
      <span class="badge green">${dict.forumBadge}</span>
    </div>
  `).join("");
}

function renderProfile() {
  const dict = getDict();
  const user = getCurrentUser();
  const container = document.getElementById("profileList");
  if (!user || !container) return;
  container.innerHTML = `
    <div class="profile-row"><div><h4>${dict.farmerId}</h4><p>${user.id}</p></div><span class="badge green">${user.status === "Active" ? dict.activeStatus : dict.pendingStatus}</span></div>
    <div class="profile-row"><div><h4>${dict.villageDistrict}</h4><p>${user.village}, ${user.district}</p></div></div>
    <div class="profile-row"><div><h4>${dict.phoneLabel}</h4><p>${user.phone}</p></div></div>
    <div class="profile-row"><div><h4>${dict.preferredLanguage}</h4><p>${user.language}</p></div></div>
    <div class="profile-row"><div><h4>${dict.landHolding}</h4><p>${user.land}</p></div></div>
    <div class="profile-row"><div><h4>${dict.currentCrops}</h4><p>${user.crops}</p></div></div>
  `;
}

function renderAdmin() {
  const dict = getDict();
  const container = document.getElementById("adminList");
  const input = document.getElementById("adminSearch");
  if (!container) return;

  function draw(filter = "") {
    const profiles = getProfiles().filter((profile) => {
      const haystack = `${profile.name} ${profile.role} ${profile.district} ${profile.crops}`.toLowerCase();
      return haystack.includes(filter.toLowerCase());
    });
    container.innerHTML = profiles.map((profile) => `
      <div class="admin-row">
        <div>
          <h4>${profile.name} · ${profile.role}</h4>
          <p>${profile.id} · ${profile.district} · ${profile.crops}</p>
          <p>${profile.phone} · ${profile.language}</p>
        </div>
        <span class="badge ${profile.status === "Active" ? "green" : "gold"}">${profile.status === "Active" ? dict.activeStatus : dict.pendingStatus}</span>
      </div>
    `).join("");
  }

  draw("");
  if (input) input.addEventListener("input", () => draw(input.value));
}

function appendAiMessage(text, who) {
  const list = document.getElementById("aiMessages");
  if (!list) return;
  const item = document.createElement("div");
  item.className = `message ${who}`;
  item.innerHTML = `<div class="bubble">${text}</div>`;
  list.appendChild(item);
  list.scrollTop = list.scrollHeight;
}

function getAiReply(message) {
  if (window.KISAN_CHATBOT_ENGINE?.respond) {
    return window.KISAN_CHATBOT_ENGINE.respond(message);
  }
  if (typeof classifyIntent === "function" && typeof getIntentResponse === "function") {
    const intent = classifyIntent(message);
    return getIntentResponse(intent);
  }
  return "I understood your message, but the chatbot engine is not ready yet. Please ask again.";
}

async function getAiReplyFromServer(message) {
  const port = window.KISAN_MARG_RUNTIME?.chatbotPort || 3000;
  const response = await fetch(`http://127.0.0.1:${port}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "Chatbot server request failed");
  }

  return payload.reply || "";
}

function setVoiceStatus(node, key, active = false) {
  if (!node) return;
  const dict = getDict();
  node.textContent = dict[key] || key || "";
  node.classList.toggle("active", active);
}

function resetVoiceStatus(node) {
  if (!node) return;
  if (node.id === "cropVoiceStatus") {
    setVoiceStatus(node, "voiceCropPrompt");
    return;
  }
  setVoiceStatus(node, "");
}

function setMicButtonsState(buttons, isRecording) {
  buttons.forEach((button) => {
    button.classList.toggle("recording", isRecording);
    button.setAttribute("aria-pressed", isRecording ? "true" : "false");
  });
}

function speechLocale() {
  const lang = getLanguage();
  if (lang === "hi") return "hi-IN";
  if (lang === "mr") return "mr-IN";
  return "en-IN";
}

let activeVoiceRecognition = null;

function wireVoiceRecorder(buttons, statusNode, onTranscript) {
  const usableButtons = buttons.filter(Boolean);
  if (!usableButtons.length) return;

  function stopRecognition() {
    if (!activeVoiceRecognition) return;
    const current = activeVoiceRecognition;
    activeVoiceRecognition = null;
    setMicButtonsState(usableButtons, false);
    try {
      current.stop();
    } catch (error) {
      // Ignore stop errors from already-closed recognizers.
    }
  }

  async function startRecording() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceStatus(statusNode, "voiceUnsupported");
      return;
    }

    if (activeVoiceRecognition) {
      stopRecognition();
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = speechLocale();
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;

      recognition.onresult = async (event) => {
        const transcript = String(event.results?.[0]?.[0]?.transcript || "").trim();
        setMicButtonsState(usableButtons, false);
        setVoiceStatus(statusNode, "voiceTranscribing", true);
        activeVoiceRecognition = null;
        try {
          if (!transcript) throw new Error("Transcript was empty");
          await onTranscript(transcript);
        } catch (error) {
          setVoiceStatus(statusNode, "voiceError");
        }
      };

      recognition.onerror = (event) => {
        activeVoiceRecognition = null;
        setMicButtonsState(usableButtons, false);
        if (event.error === "no-speech" || event.error === "aborted") {
          resetVoiceStatus(statusNode);
          return;
        }
        setVoiceStatus(statusNode, "voiceError");
      };

      recognition.onend = () => {
        if (activeVoiceRecognition === recognition) {
          activeVoiceRecognition = null;
          setMicButtonsState(usableButtons, false);
          if (!statusNode.textContent || statusNode.textContent === getDict().voiceRecording) {
            resetVoiceStatus(statusNode);
          }
        }
      };

      activeVoiceRecognition = recognition;
      setMicButtonsState(usableButtons, true);
      setVoiceStatus(statusNode, "voiceRecording", true);
      recognition.start();
    } catch (error) {
      setMicButtonsState(usableButtons, false);
      setVoiceStatus(statusNode, "voiceError");
      activeVoiceRecognition = null;
    }
  }

  usableButtons.forEach((button) => {
    button.addEventListener("click", startRecording);
  });
}

function wireAi() {
  const input = document.getElementById("aiInput");
  const send = document.getElementById("aiSend");
  const mic = document.getElementById("aiMic");
  const miniMic = document.getElementById("aiMicMini");
  const voiceStatus = document.getElementById("aiVoiceStatus");
  if (!input || !send) return;

  async function submit(text) {
    const value = (text || input.value).trim();
    if (!value) return;
    appendAiMessage(value, "user");
    input.value = "";
    send.disabled = true;

    setTimeout(async () => {
      try {
        const reply = await getAiReplyFromServer(value);
        appendAiMessage(reply || getAiReply(value), "bot");
      } catch (error) {
        appendAiMessage(getAiReply(value), "bot");
      } finally {
        send.disabled = false;
      }
    }, 250);
  }

  window.KISAN_MARG_AI_SUBMIT = submit;

  send.addEventListener("click", () => {
    submit();
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") submit();
  });
  document.querySelectorAll("[data-ai-prompt]").forEach((btn) => {
    btn.addEventListener("click", () => {
      submit(btn.dataset.aiPrompt);
    });
  });

  wireVoiceRecorder([mic, miniMic], voiceStatus, async (transcript) => {
    setVoiceStatus(voiceStatus, transcript);
    input.value = transcript;
    submit(transcript);
  });

  const pendingVoicePrompt = sessionStorage.getItem(STORAGE_KEYS.pendingVoicePrompt);
  if (pendingVoicePrompt) {
    sessionStorage.removeItem(STORAGE_KEYS.pendingVoicePrompt);
    setVoiceStatus(voiceStatus, "voiceReady", true);
    input.value = pendingVoicePrompt;
    submit(pendingVoicePrompt);
  }
}

function wireCropVoice() {
  const mic = document.getElementById("cropVoiceMic");
  const status = document.getElementById("cropVoiceStatus");
  if (!mic || !status) return;

  wireVoiceRecorder([mic], status, async (transcript) => {
    sessionStorage.setItem(STORAGE_KEYS.pendingVoicePrompt, transcript);
    setVoiceStatus(status, "voiceReady", true);
    setTimeout(() => {
      window.location.href = "ai-assistant.html";
    }, 600);
  });
}

function closePopup(id) {
  const node = document.getElementById(id);
  if (node) node.style.display = "none";
}

function wireAuth() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const role = loginForm.querySelector("[name='role']").value;
      const profiles = getProfiles();
      const user = profiles.find((profile) => profile.role === role) || profiles[0];
      setCurrentUser(user);
      window.location.href = "dashboard.html";
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(signupForm);
      const profile = {
        id: `KM-${Date.now().toString().slice(-4)}`,
        name: formData.get("name"),
        role: "Farmer",
        village: formData.get("village"),
        district: formData.get("district"),
        phone: formData.get("phone"),
        language: formData.get("language"),
        land: formData.get("land"),
        crops: formData.get("crops"),
        status: "Active"
      };
      const profiles = getProfiles();
      profiles.unshift(profile);
      saveProfiles(profiles);
      setCurrentUser(profile);
      window.location.href = "dashboard.html";
    });
  }
}

function wireLogout() {
  document.querySelectorAll("[data-logout]").forEach((node) => {
    node.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem(STORAGE_KEYS.currentUser);
      window.location.href = "login.html";
    });
  });
}

function rerenderLocalizedContent() {
  applyLanguage();
  renderMarket();
  renderWeather();
  renderSchemes();
  renderCommunity();
  renderProfile();
  renderAdmin();
}

function initPage() {
  ensureSeedData();
  rerenderLocalizedContent();
  wireLanguageButtons();
  markActiveNav();
  fillCurrentUser();
  wireAi();
  wireCropVoice();
  wireAuth();
  wireLogout();
  renderWeather();
  syncLiveWeatherSummary();
}

document.addEventListener("DOMContentLoaded", initPage);
