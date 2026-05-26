/* ════════════════════════════════════════════════════════
   DAILY FRENCH — utils.js
   Normes globales : réponses, thèmes, i18n, helpers
   v1.0 — 26 mai 2026
   ════════════════════════════════════════════════════════ */

// ─── 1. NORMALISATION DES RÉPONSES ───
function normalizeAnswer(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,!?;:'"«»()\-–—]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// ─── 2. THÈMES ───
const THEMES = {
  ardoise: {
    primary: '#334155', primaryMid: '#475569', primaryLight: '#F1F5F9',
    heroFrom: '#1E293B', heroVia: '#334155', heroTo: '#475569',
    shadow: 'rgba(51,65,85,0.12)', shadowLg: 'rgba(51,65,85,0.18)',
    label: 'Ardoise'
  },
  mauve: {
    primary: '#7C3AED', primaryMid: '#8B5CF6', primaryLight: '#EDE9FE',
    heroFrom: '#581C87', heroVia: '#7C3AED', heroTo: '#A855F7',
    shadow: 'rgba(124,58,237,0.12)', shadowLg: 'rgba(124,58,237,0.18)',
    label: 'Mauve'
  },
  terra: {
    primary: '#9A3412', primaryMid: '#C2410C', primaryLight: '#FFF7ED',
    heroFrom: '#7C2D12', heroVia: '#9A3412', heroTo: '#EA580C',
    shadow: 'rgba(154,52,18,0.12)', shadowLg: 'rgba(154,52,18,0.18)',
    label: 'Terra'
  }
};

const THEME_KEY = 'dailyFrench_theme';

function saveTheme(themeName) {
  if (!THEMES[themeName]) themeName = 'ardoise';
  localStorage.setItem(THEME_KEY, themeName);
  applyTheme(themeName);
}

function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const themeName = THEMES[saved] ? saved : 'ardoise';
  applyTheme(themeName);
  return themeName;
}

function applyTheme(name) {
  const t = THEMES[name];
  if (!t) return;
  const root = document.documentElement;
  root.style.setProperty('--primary', t.primary);
  root.style.setProperty('--primary-mid', t.primaryMid);
  root.style.setProperty('--primary-light', t.primaryLight);
  root.style.setProperty('--shadow', `0 4px 16px ${t.shadow}`);
  root.style.setProperty('--shadow-lg', `0 16px 48px ${t.shadowLg}`);
  document.querySelectorAll('.hero').forEach(h => {
    h.style.background = `linear-gradient(135deg,${t.heroFrom} 0%,${t.heroVia} 50%,${t.heroTo} 100%)`;
  });
  document.querySelectorAll('.theme-dot').forEach(dot => {
    dot.classList.toggle('active', dot.dataset.theme === name);
  });
}

// ─── 3. I18N ───
const I18N = {
  en: {
    home: 'Home', lessons: 'Lessons', play: 'Play', vocab: 'Vocab',
    mySpace: 'My Space', listen: 'Listen', phrases: 'Phrases',
    newPlayer: 'New player', export: 'Export', import: 'Import',
    choosePlayer: 'Choose a player', welcome: 'Welcome',
    streak: 'streak', accuracy: 'accuracy', sessions: 'sessions',
    currentLevel: 'Current level', points: 'Points', levelsDone: 'Levels done',
    badges: 'Badges', history: 'History', errors: 'Errors', cameleon: 'Cameleon',
    playNow: 'Play now', noSessions: 'No sessions yet — go play!',
    noErrors: 'No errors — you\'re doing brilliantly!',
    geniusTitle: 'Mon Génie', geniusSub: 'Your personal word collection',
    geniusEmpty: 'No words saved yet.',
    geniusQuiz: 'Quiz me on my words!', remove: 'Remove',
    playerExists: 'Player already exists!', welcomePlayer: 'Welcome',
    exported: 'Exported!', imported: 'Imported!', noData: 'No save data yet.',
    invalidFile: 'Invalid file.', readError: 'Error reading file.'
  },
  fr: {
    home: 'Accueil', lessons: 'Leçons', play: 'Jouer', vocab: 'Vocab',
    mySpace: 'Mon Espace', listen: 'Écouter', phrases: 'Phrases',
    newPlayer: 'Nouveau joueur', export: 'Exporter', import: 'Importer',
    choosePlayer: 'Choisir un joueur', welcome: 'Bienvenue',
    streak: 'série', accuracy: 'précision', sessions: 'sessions',
    currentLevel: 'Niveau actuel', points: 'Points', levelsDone: 'Faits',
    badges: 'Badges', history: 'Historique', errors: 'Erreurs', cameleon: 'Caméléon',
    playNow: 'Jouer', noSessions: 'Pas encore de sessions — va jouer !',
    noErrors: 'Pas d\'erreurs — tu es brillante !',
    geniusTitle: 'Mon Génie', geniusSub: 'Ta collection personnelle',
    geniusEmpty: 'Pas encore de mots sauvegardés.',
    geniusQuiz: 'Teste-moi sur mes mots !', remove: 'Retirer',
    playerExists: 'Ce joueur existe déjà !', welcomePlayer: 'Bienvenue',
    exported: 'Exporté !', imported: 'Importé !', noData: 'Pas de données.',
    invalidFile: 'Fichier invalide.', readError: 'Erreur de lecture.'
  }
};

const LANG_KEY = 'dailyFrench_lang';

function setLang(lang) {
  const available = Object.keys(I18N);
  if (!available.includes(lang)) lang = 'en';
  localStorage.setItem(LANG_KEY, lang);
  return lang;
}

function getLang() {
  const saved = localStorage.getItem(LANG_KEY);
  const available = Object.keys(I18N);
  return available.includes(saved) ? saved : 'en';
}

function t(key, lang) {
  const l = lang || getLang();
  return (I18N[l] && I18N[l][key]) || I18N['en'][key] || key;
}

// ─── 4. HELPERS ───
function toast(msg, duration = 3000) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('on');
  setTimeout(() => t.classList.remove('on'), duration);
}

function exportData(key, filenamePrefix) {
  const data = localStorage.getItem(key);
  if (!data) { toast('No data to export.'); return false; }
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filenamePrefix}-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  return true;
}

function importFile(file, key, callback) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (typeof parsed !== 'object' || !parsed) throw new Error('Invalid');
      localStorage.setItem(key, JSON.stringify(parsed));
      if (callback) callback(parsed);
      toast('Imported! ✅');
    } catch {
      toast('Invalid file.');
    }
  };
  reader.readAsText(file);
}

function safeJSON(key, fallback = {}) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; }
  catch { return fallback; }
}

// ─── 5. INIT ───
function initUtils() {
  loadTheme();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initUtils);
} else {
  initUtils();
}
