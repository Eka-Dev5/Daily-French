// ═══════════════════════════════════════════════════════════════════
// CONFIG.JS — Daily French 🥖
// Point d'entrée de configuration — DOIT être chargé EN PREMIER
// Contient : SUBJECT_CONFIG, FEATURES, LEVEL_NAMES, gameState
// ═══════════════════════════════════════════════════════════════════

// ─── 1. CONFIGURATION MATIÈRE ───────────────────────────────────────
const SUBJECT_CONFIG = {
  name:          "Daily French",
  emoji:         "🥖",
  lang:          "fr",           // langue enseignée
  interfaceLang: "en",           // langue de l'interface
  storageKey:    "dailyFrench_v1",
  playersKey:    "dailyFrench_players",
  dashboardFile: "dashboard.html",
  vocabularyFile:"vocabulary.html",
  maxLevel:      20
};

// ─── 2. FONCTIONNALITÉS ACTIVÉES ────────────────────────────────────
const FEATURES = {
  voice: {
    enabled:           true,
    tts:               true,
    stt:               true,
    pronunciationCheck:true,
    serialMode:        false
  },
  pictures: {
    enabled:  true,
    lazyLoad: true
  },
  offline: {
    serviceWorker: false
  }
};

// ─── 3. NOMS DES NIVEAUX ────────────────────────────────────────────
const LEVEL_NAMES = {
  1: "Greetings 🙋",
  2: "At the market 🛒",
  3: "In the garden 🌿",
  4: "Neighbours 🏘️",
  5: "Tastes & desires ❤️",
  6: "At the shops 🏬",
  7: "Friends & going out 👫",
  8: "Weather 🌤️",
  9: "Essential verbs ⚡",
  10:"Politeness 🎩",
  11:"Daily life in France 🇫🇷",
  12:"My Routine 🌅",
  13:"My Emotions ❤️",
  14:"My Needs 🍽️",
  15:"My House 🏡",
  16:"My Family 👨‍👩‍👧",
  17:"My Plans 📅",
  18:"My Health 💊",
  19:"My Cooking 🍳",
  20:"Living French 🗣️"
};

// ─── 4. ÉTAT DU JEU ─────────────────────────────────────────────────
// ⚠️ OBLIGATOIRE : utilisé par game-engine.js, players.js, quiz.js
// Ne jamais supprimer ni renommer ces propriétés
let gameState = {
  currentPlayer:        null,    // Prénom du joueur actif
  currentLevel:         1,       // Niveau en cours
  currentMode:          "mixte", // "mixte" | "qcm" | "libre"
  questions:            [],      // Questions tirées pour la session
  currentQuestionIndex: 0,       // Index de la question affichée
  score:                0,       // Score de la session en cours
  answers:              [],      // Historique des réponses de la session
  selectedOption:       null     // Option QCM sélectionnée (non validée)
};
