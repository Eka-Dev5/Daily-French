
/**
 * ═══════════════════════════════════════════════════════════════════
 * DAILY FRENCH — core.js
 * Cœur de l'application : joueur, i18n, thème, modal, navigation, stockage
 * Compatible : toutes les matières, tous les alphabets, iOS/Android
 * Version : 1.0.0 — 28 mai 2026
 * ═══════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════
// 0. CONSTANTES & CONFIGURATION
// ═══════════════════════════════════════════════════════════════════

const CORE_VERSION = '1.0.0';
const STORAGE_PREFIX = 'dailyFrench_';

// Clés localStorage (compatibilité ascendante)
const KEYS = {
  players: 'dailyFrench_players',
  theme: 'dailyFrench_theme',
  lang: 'dailyFrench_lang',
  genius: 'dailyFrench_genius',
  session: 'dailyFrench_v1',
  analytics: 'dailyFrench_analytics_opt_out'
};

// ═══════════════════════════════════════════════════════════════════
// 1. STORAGE ADAPTER — localStorage robuste avec gestion quota
// ═══════════════════════════════════════════════════════════════════

const Storage = {
  /** Teste si localStorage est disponible */
  isAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },

  /** Récupère une valeur (avec fallback) */
  get(key, fallback = null) {
    if (!this.isAvailable()) return fallback;
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  },

  /** Sauvegarde une valeur (gère quota exceeded) */
  set(key, value) {
    if (!this.isAvailable()) {
      console.warn('localStorage not available');
      return false;
    }
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        this.handleQuotaExceeded();
      }
      console.error('Storage error:', e);
      return false;
    }
  },

  /** Supprime une clé */
  remove(key) {
    if (!this.isAvailable()) return;
    try { localStorage.removeItem(key); } catch {}
  },

  /** Gestion quota dépassé (iOS limite ~5Mo) */
  handleQuotaExceeded() {
    toast('⚠️ Storage full! Export your save, then clear history.');
    // Priorité de suppression : anciennes sessions > anciens joueurs inactifs
    const players = this.get(KEYS.players, {});
    // TODO : implémenter nettoyage intelligent si besoin
  },

  /** Vérifie l'espace utilisé (approximatif) */
  getUsage() {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length * 2; // UTF-16 = 2 bytes/char
      }
    }
    return (total / 1024 / 1024).toFixed(2) + ' MB';
  },

  /** Exporte TOUT en JSON */
  exportAll() {
    const data = {};
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.startsWith(STORAGE_PREFIX)) {
        data[key] = this.get(key);
      }
    }
    return data;
  },

  /** Importe depuis JSON (fusion intelligente) */
  importAll(data) {
    if (!data || typeof data !== 'object') return false;
    let imported = 0;
    for (let key in data) {
      if (key.startsWith(STORAGE_PREFIX)) {
        this.set(key, data[key]);
        imported++;
      }
    }
    return imported;
  }
};

// ═══════════════════════════════════════════════════════════════════
// 2. PLAYER MANAGER — CRUD joueur, migration, validation
// ═══════════════════════════════════════════════════════════════════

const PlayerManager = {
  /** Structure par défaut d'un joueur */
  defaultPlayer(name) {
    return {
      name: name,
      currentLevel: 1,
      score: 0,
      completed: [],
      totalQuestions: 0,
      totalCorrect: 0,
      streak: 0,
      lastPlayed: null,
      errorHistory: [],
      sessionHistory: [],
      activeSession: null,
      badges: [],
      phraseProgress: { completed: [], score: 0, streak: 0 },
      cameleonHelped: 0,
      createdAt: new Date().toISOString(),
      version: CORE_VERSION
    };
  },

  /** Récupère tous les joueurs */
  getAll() {
    return Storage.get(KEYS.players, {});
  },

  /** Sauvegarde tous les joueurs */
  saveAll(players) {
    return Storage.set(KEYS.players, players);
  },

  /** Vérifie si un nom est valide */
  validateName(name) {
    if (!name || typeof name !== 'string') return { ok: false, msg: 'Name required' };
    const trimmed = name.trim();
    if (trimmed.length === 0) return { ok: false, msg: 'Name cannot be empty' };
    if (trimmed.length > 30) return { ok: false, msg: 'Name too long (max 30)' };
    if (!/^[\p{L}\p{N}\s\-'_]+$/u.test(trimmed)) {
      return { ok: false, msg: 'Invalid characters in name' };
    }
    return { ok: true, name: trimmed };
  },

  /** Crée un joueur */
  create(name) {
    const validation = this.validateName(name);
    if (!validation.ok) return { success: false, error: validation.msg };

    const players = this.getAll();
    if (players[validation.name]) {
      return { success: false, error: 'Player already exists!' };
    }

    players[validation.name] = this.defaultPlayer(validation.name);
    this.saveAll(players);
    this.setCurrent(validation.name);
    return { success: true, player: players[validation.name] };
  },

  /** Charge un joueur */
  load(name) {
    const players = this.getAll();
    return players[name] || null;
  },

  /** Sauvegarde un joueur spécifique */
  save(name, data) {
    const players = this.getAll();
    if (!players[name]) return false;
    players[name] = { ...players[name], ...data, lastPlayed: new Date().toISOString() };
    return this.saveAll(players);
  },

  /** Supprime un joueur */
  delete(name) {
    const players = this.getAll();
    if (!players[name]) return false;
    delete players[name];
    this.saveAll(players);
    // Si c'était le joueur courant, réinitialiser
    if (this.getCurrent() === name) {
      Storage.remove(KEYS.session);
    }
    return true;
  },

  /** Définit le joueur courant (session active) */
  setCurrent(name) {
    Storage.set(KEYS.session, { currentPlayer: name, timestamp: new Date().toISOString() });
    if (typeof gameState !== 'undefined') {
      gameState.currentPlayer = name;
    }
  },

  /** Récupère le joueur courant */
  getCurrent() {
    const session = Storage.get(KEYS.session, {});
    return session.currentPlayer || null;
  },

  /** Auto-détection : joueur courant ou premier disponible */
  autoDetect() {
    const current = this.getCurrent();
    if (current && this.load(current)) return current;
    const players = this.getAll();
    const names = Object.keys(players);
    if (names.length === 1) {
      this.setCurrent(names[0]);
      return names[0];
    }
    return null;
  },

  /** Migration de données anciennes */
  migrate() {
    const players = this.getAll();
    let migrated = 0;
    for (let name in players) {
      const p = players[name];
      if (!p.version || p.version !== CORE_VERSION) {
        // Ajoute les champs manquants sans perdre les existants
        players[name] = { ...this.defaultPlayer(name), ...p, version: CORE_VERSION };
        migrated++;
      }
    }
    if (migrated > 0) this.saveAll(players);
    return migrated;
  }
};

// ═══════════════════════════════════════════════════════════════════
// 3. I18N ENGINE — Traductions FR/EN, extensible, localization
// ═══════════════════════════════════════════════════════════════════

const I18N = {
  en: {
    home: 'Home', lessons: 'Lessons', play: 'Play', vocab: 'Vocab',
    mySpace: 'My Space', newPlayer: 'New player', create: 'Create',
    cancel: 'Cancel', welcome: 'Welcome', choosePlayer: 'Choose a player',
    streak: 'streak', accuracy: 'accuracy', sessions: 'sessions',
    currentLevel: 'Current level', points: 'Points', levelsDone: 'Levels done',
    badges: 'Badges', history: 'History', errors: 'Errors', cameleon: 'Cameleon',
    playNow: 'Play now', noSessions: 'No sessions yet — go play!',
    noErrors: 'No errors — you\'re doing brilliantly!',
    geniusTitle: 'Mon Génie', geniusSub: 'Your personal word collection',
    geniusEmpty: 'No words saved yet.', geniusQuiz: 'Quiz me on my words!',
    remove: 'Remove', playerExists: 'Player already exists!',
    welcomePlayer: 'Welcome', exported: 'Exported!', imported: 'Imported!',
    noData: 'No save data yet.', invalidFile: 'Invalid file.',
    readError: 'Error reading file.', modeMixed: 'Mixed',
    modeQcm: 'QCM', modeLibre: 'Written', validate: 'Validate',
    next: 'Next', seeResults: 'See results', quit: 'Quit',
    retry: 'Retry', excellent: 'Excellent! Level unlocked!',
    goodEffort: 'Not bad! Keep practising.', keepGoing: 'Keep going! Read the lesson again.',
    level: 'Level', of: 'of', correct: 'Correct', wrong: 'Wrong',
    hint: 'Hint', vocabulary: 'Vocabulary', loading: 'Loading...',
    error: 'Error', success: 'Success', warning: 'Warning',
    confirmQuit: 'Quit? Your progress is saved.',
    continueSession: 'Continue where you left off?',
    sessionProgress: 'done'
  },
  fr: {
    home: 'Accueil', lessons: 'Leçons', play: 'Jouer', vocab: 'Vocab',
    mySpace: 'Mon Espace', newPlayer: 'Nouveau joueur', create: 'Créer',
    cancel: 'Annuler', welcome: 'Bienvenue', choosePlayer: 'Choisir un joueur',
    streak: 'série', accuracy: 'précision', sessions: 'sessions',
    currentLevel: 'Niveau actuel', points: 'Points', levelsDone: 'Faits',
    badges: 'Badges', history: 'Historique', errors: 'Erreurs', cameleon: 'Caméléon',
    playNow: 'Jouer', noSessions: 'Pas encore de sessions — va jouer !',
    noErrors: 'Pas d\'erreurs — tu es brillante !',
    geniusTitle: 'Mon Génie', geniusSub: 'Ta collection personnelle',
    geniusEmpty: 'Pas encore de mots sauvegardés.', geniusQuiz: 'Teste-moi sur mes mots !',
    remove: 'Retirer', playerExists: 'Ce joueur existe déjà !',
    welcomePlayer: 'Bienvenue', exported: 'Exporté !', imported: 'Importé !',
    noData: 'Pas de données.', invalidFile: 'Fichier invalide.',
    readError: 'Erreur de lecture.', modeMixed: 'Mixte',
    modeQcm: 'QCM', modeLibre: 'Écrit', validate: 'Valider',
    next: 'Suivant', seeResults: 'Voir les résultats', quit: 'Quitter',
    retry: 'Réessayer', excellent: 'Excellent ! Niveau débloqué !',
    goodEffort: 'Pas mal ! Continue à pratiquer.', keepGoing: 'Continue ! Relis la leçon.',
    level: 'Niveau', of: 'sur', correct: 'Correct', wrong: 'Faux',
    hint: 'Indice', vocabulary: 'Vocabulaire', loading: 'Chargement...',
    error: 'Erreur', success: 'Succès', warning: 'Attention',
    confirmQuit: 'Quitter ? Ta progression est sauvegardée.',
    continueSession: 'Continuer où tu en étais ?',
    sessionProgress: 'fait'
  }
};

const I18n = {
  /** Langue actuelle (détectée ou stockée) */
  current: 'en',

  /** Détecte la langue du navigateur */
  detect() {
    const saved = Storage.get(KEYS.lang);
    if (saved && I18N[saved]) return saved;
    const browser = navigator.language || navigator.userLanguage || 'en';
    const code = browser.split('-')[0];
    return I18N[code] ? code : 'en';
  },

  /** Initialise la langue */
  init() {
    this.current = this.detect();
  },

  /** Change la langue */
  set(lang) {
    if (I18N[lang]) {
      this.current = lang;
      Storage.set(KEYS.lang, lang);
      return true;
    }
    return false;
  },

  /** Récupère une traduction */
  t(key, fallback) {
    const str = I18N[this.current]?.[key];
    return str !== undefined ? str : (fallback || key);
  },

  /** Formate une date selon la locale */
  formatDate(date, options = {}) {
    const d = typeof date === 'string' ? new Date(date) : date;
    const opts = { day: 'numeric', month: 'short', ...options };
    return d.toLocaleDateString(this.current === 'fr' ? 'fr-FR' : 'en-GB', opts);
  },

  /** Formate un nombre (ex: 80% vs 80 %) */
  formatPercent(num) {
    return this.current === 'fr' ? num + ' %' : num + '%';
  }
};

// ═══════════════════════════════════════════════════════════════════
// 4. THEME ENGINE — Ardoise / Mauve / Terra + détection OS
// ═══════════════════════════════════════════════════════════════════

const THEMES = {
  ardoise: {
    name: 'Ardoise',
    primary: '#4A5568', primaryMid: '#64748B', primaryLight: '#F1F5F9',
    heroFrom: '#475569', heroVia: '#64748B', heroTo: '#94A3B8',
    shadow: 'rgba(51,65,85,0.12)', shadowLg: 'rgba(51,65,85,0.18)',
    label: 'Ardoise'
  },
  mauve: {
    name: 'Mauve',
    primary: '#7C3AED', primaryMid: '#8B5CF6', primaryLight: '#EDE9FE',
    heroFrom: '#581C87', heroVia: '#7C3AED', heroTo: '#A855F7',
    shadow: 'rgba(124,58,237,0.12)', shadowLg: 'rgba(124,58,237,0.18)',
    label: 'Mauve'
  },
  terra: {
    name: 'Terra',
    primary: '#9A3412', primaryMid: '#C2410C', primaryLight: '#FFF7ED',
    heroFrom: '#7C2D12', heroVia: '#9A3412', heroTo: '#EA580C',
    shadow: 'rgba(154,52,18,0.12)', shadowLg: 'rgba(154,52,18,0.18)',
    label: 'Terra'
  }
};

const Theme = {
  /** Applique un thème */
  apply(name) {
    const t = THEMES[name] || THEMES.ardoise;
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

    Storage.set(KEYS.theme, name);
  },

  /** Charge le thème sauvegardé ou détecté */
  load() {
    const saved = Storage.get(KEYS.theme);
    const osDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Par défaut ardoise, sauf si utilisateur a choisi
    this.apply(THEMES[saved] ? saved : 'ardoise');
  },

  /** Bascule entre thèmes */
  toggle() {
    const current = Storage.get(KEYS.theme, 'ardoise');
    const names = Object.keys(THEMES);
    const idx = names.indexOf(current);
    const next = names[(idx + 1) % names.length];
    this.apply(next);
    return next;
  }
};

// ═══════════════════════════════════════════════════════════════════
// 5. MODAL SYSTEM — Accessibilité, focus trap, Escape
// ═══════════════════════════════════════════════════════════════════

const Modal = {
  openCallback: null,
  closeCallback: null,
  lastFocus: null,

  /** Ouvre le modal */
  open(options = {}) {
    const wrap = document.getElementById('modalWrap');
    if (!wrap) return;

    this.lastFocus = document.activeElement;
    this.openCallback = options.onOpen;
    this.closeCallback = options.onClose;

    wrap.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Focus sur le premier input
    const input = wrap.querySelector('input, button');
    if (input) setTimeout(() => input.focus(), 50);

    // Trap focus
    this.trapFocus(wrap);

    if (this.openCallback) this.openCallback();
  },

  /** Ferme le modal */
  close() {
    const wrap = document.getElementById('modalWrap');
    if (!wrap) return;

    wrap.classList.remove('open');
    document.body.style.overflow = '';

    if (this.lastFocus) this.lastFocus.focus();
    if (this.closeCallback) this.closeCallback();
  },

  /** Piège le focus dans le modal (accessibilité) */
  trapFocus(element) {
    const focusable = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    element.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  },

  /** Gère la touche Escape */
  handleEscape(e) {
    if (e.key === 'Escape') this.close();
  }
};

// ═══════════════════════════════════════════════════════════════════
// 6. TOAST SYSTEM — File d'attente, auto-dismiss, non-intrusif
// ═══════════════════════════════════════════════════════════════════

const Toast = {
  queue: [],
  active: false,
  defaultDuration: 3000,

  /** Affiche un toast */
  show(message, duration) {
    this.queue.push({ message, duration: duration || this.defaultDuration });
    if (!this.active) this.process();
  },

  /** Traite la file d'attente */
  process() {
    if (this.queue.length === 0) {
      this.active = false;
      return;
    }

    this.active = true;
    const { message, duration } = this.queue.shift();
    const el = document.getElementById('toast');

    if (!el) {
      // Fallback si pas de toast HTML
      console.log('Toast:', message);
      setTimeout(() => this.process(), duration);
      return;
    }

    el.textContent = message;
    el.classList.add('on');

    setTimeout(() => {
      el.classList.remove('on');
      setTimeout(() => this.process(), 300); // Attendre animation
    }, duration);
  },

  /** Vide la file */
  clear() {
    this.queue = [];
    const el = document.getElementById('toast');
    if (el) el.classList.remove('on');
  }
};

// Fonction globale pour compatibilité
function toast(msg, duration) {
  Toast.show(msg, duration);
}

// ═══════════════════════════════════════════════════════════════════
// 7. ROUTER — Navigation typée, params URL, historique
// ═══════════════════════════════════════════════════════════════════

const Router = {
  /** Navigation vers une page */
  goTo(page, params = {}) {
    let url = page;
    const query = new URLSearchParams();

    // Ajoute le joueur courant automatiquement
    const current = PlayerManager.getCurrent();
    if (current && !params.player) {
      query.set('player', current);
    }

    // Ajoute les autres params
    for (let key in params) {
      if (params[key] !== undefined && params[key] !== null) {
        query.set(key, params[key]);
      }
    }

    const qString = query.toString();
    if (qString) url += (url.includes('?') ? '&' : '?') + qString;

    window.location.href = url;
  },

  /** Récupère les params de l'URL actuelle */
  getParams() {
    return new URLSearchParams(window.location.search);
  },

  /** Construit une URL propre */
  buildUrl(base, params = {}) {
    const query = new URLSearchParams();
    for (let key in params) {
      if (params[key] !== undefined) query.set(key, params[key]);
    }
    const qString = query.toString();
    return qString ? `${base}?${qString}` : base;
  }
};

// ═══════════════════════════════════════════════════════════════════
// 8. EVENT BUS — Découplage entre modules
// ═══════════════════════════════════════════════════════════════════

const EventBus = {
  events: {},

  /** S'abonne à un événement */
  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  },

  /** Se désabonne */
  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  },

  /** Émet un événement */
  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(cb => {
      try { cb(data); } catch (e) { console.error('EventBus error:', e); }
    });
  }
};

// ═══════════════════════════════════════════════════════════════════
// 9. ANALYTICS STUB — Prêt pour stats, respect RGPD
// ═══════════════════════════════════════════════════════════════════

const Analytics = {
  enabled: true,

  /** Active/désactive */
  setEnabled(val) {
    this.enabled = val;
    Storage.set(KEYS.analytics, !val);
  },

  /** Vérifie si activé */
  isEnabled() {
    const optOut = Storage.get(KEYS.analytics, false);
    return this.enabled && !optOut;
  },

  /** Track un événement (stub, prêt pour Matomo/Plausible) */
  track(event, data = {}) {
    if (!this.isEnabled()) return;
    // TODO: envoyer vers service d'analytics si configuré
    console.log('[Analytics]', event, data);
  }
};

// ═══════════════════════════════════════════════════════════════════
// 10. FONCTIONS UI PARTAGÉES — Hero, Bento, Select
// ═══════════════════════════════════════════════════════════════════

function fillSelect(active) {
  const s = document.getElementById('selPlayer');
  if (!s) return;
  const players = PlayerManager.getAll();
  s.innerHTML = '<option value="">' + I18n.t('choosePlayer') + '</option>';
  Object.keys(players).forEach(n => {
    const o = document.createElement('option');
    o.value = n;
    o.textContent = n + ' (Lvl.' + (players[n].currentLevel || 1) + ')';
    if (n === active) o.selected = true;
    s.appendChild(o);
  });
}

function renderHero(p) {
  if (!p) return;
  const done = p.completed || [];
  const score = p.score || 0;
  const lvl = p.currentLevel || 1;

  const els = {
    av: document.getElementById('heroAv'),
    name: document.getElementById('heroName'),
    tag: document.getElementById('heroTag'),
    xpNow: document.getElementById('xpNow'),
    xpGoal: document.getElementById('xpGoal'),
    xpBar: document.getElementById('xpBar'),
    streak: document.getElementById('p_streak'),
    acc: document.getElementById('p_acc'),
    sess: document.getElementById('p_sess')
  };

  if (els.av) els.av.innerHTML = p.name.charAt(0).toUpperCase();
  if (els.name) els.name.textContent = p.name;
  if (els.tag) els.tag.textContent = I18n.t('level') + ' ' + lvl + ' · ' + score + ' pts · ' + done.length + '/20 ' + I18n.t('levelsDone').toLowerCase();
  
  if (els.xpNow) els.xpNow.textContent = score;
  const ms = Math.ceil(score / 100) * 100;
  if (els.xpGoal) els.xpGoal.textContent = ms;
  if (els.xpBar) els.xpBar.style.width = Math.round(score % 100) + '%';
  
  if (els.streak) els.streak.textContent = p.streak || 0;
  const acc = p.totalQuestions > 0 ? Math.round(p.totalCorrect / p.totalQuestions * 100) + '%' : '—';
  if (els.acc) els.acc.textContent = acc;
  if (els.sess) els.sess.textContent = (p.sessionHistory || []).length;
}

function renderBento(p) {
  if (!p) return;
  const b1 = document.getElementById('b1');
  const b2 = document.getElementById('b2');
  const b3 = document.getElementById('b3');
  if (b1) b1.textContent = p.currentLevel || 1;
  if (b2) b2.textContent = p.score || 0;
  if (b3) b3.textContent = (p.completed || []).length + '/20';
}

function loadPlayer(name) {
  if (!name) return;
  const p = PlayerManager.load(name);
  if (!p) return;
  PlayerManager.setCurrent(name);
  renderHero(p);
  renderBento(p);
  fillSelect(name);
  EventBus.emit('playerLoaded', { name, player: p });
}

// ═══════════════════════════════════════════════════════════════════
// 11. EXPORT / IMPORT — Sauvegarde JSON complète
// ═══════════════════════════════════════════════════════════════════

function doExport() {
  const data = Storage.exportAll();
  if (Object.keys(data).length === 0) {
    toast(I18n.t('noData'));
    return;
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'DailyFrench-backup-' + new Date().toISOString().slice(0, 10) + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast(I18n.t('exported'));
}

function doImport(ev) {
  const file = ev.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      const count = Storage.importAll(data);
      if (count > 0) {
        PlayerManager.migrate();
        const names = Object.keys(PlayerManager.getAll());
        if (names.length > 0) loadPlayer(names[0]);
        toast(I18n.t('imported'));
      } else {
        toast(I18n.t('invalidFile'));
      }
    } catch {
      toast(I18n.t('readError'));
    }
  };
  reader.readAsText(file);
  ev.target.value = '';
}

// ═══════════════════════════════════════════════════════════════════
// 12. INITIALISATION GLOBALE — Appelée par chaque page
// ═══════════════════════════════════════════════════════════════════

function initCore() {
  // 1. Langue
  I18n.init();

  // 2. Thème
  Theme.load();

  // 3. Migration données
  PlayerManager.migrate();

  // 4. Modal listeners
  const btnCreate = document.getElementById('btnCreatePlayer');
  const btnCancel = document.getElementById('btnCancelModal');
  const inpModal = document.getElementById('mInput');
  const modalWrap = document.getElementById('modalWrap');

  if (btnCreate) {
    btnCreate.addEventListener('click', (e) => {
      e.preventDefault();
      const name = inpModal ? inpModal.value : '';
      const result = PlayerManager.create(name);
      if (result.success) {
        Modal.close();
        loadPlayer(result.player.name);
        toast(I18n.t('welcomePlayer') + ', ' + result.player.name + '! 🎉');
      } else {
        toast(result.error);
      }
    });
  }

  if (btnCancel) {
    btnCancel.addEventListener('click', (e) => {
      e.preventDefault();
      Modal.close();
    });
  }

  if (inpModal) {
    inpModal.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        btnCreate ? btnCreate.click() : null;
      }
    });
  }

  if (modalWrap) {
    modalWrap.addEventListener('click', (e) => {
      if (e.target === modalWrap) Modal.close();
    });
    document.addEventListener('keydown', (e) => Modal.handleEscape(e));
  }

  // 5. Vocab popup overlay
  const vocabModal = document.getElementById('vocabulary-popup-modal');
  if (vocabModal) {
    vocabModal.addEventListener('click', (e) => {
      if (e.target === vocabModal) {
        // Appelle closeVocabPopup si défini (vocabulary-engine.js)
        if (typeof closeVocabPopup === 'function') closeVocabPopup();
        else vocabModal.style.display = 'none';
      }
    });
  }

  // 6. Joueur par défaut
  const current = PlayerManager.autoDetect();
  if (current) {
    loadPlayer(current);
  } else {
    fillSelect(null);
  }

  // 7. Émettre événement ready
  EventBus.emit('coreReady', { version: CORE_VERSION });
}

// ═══════════════════════════════════════════════════════════════════
// 13. COMPATIBILITÉ ASCENDANTE — Fonctions anciennes redirigées
// ═══════════════════════════════════════════════════════════════════

// Ancien système gP()/sP() → nouveau PlayerManager
function gP() { return PlayerManager.getAll(); }
function sP(d
) { return PlayerManager.saveAll(d); }

// ═══════════════════════════════════════════════════════════════════
// 13-bis. BRIDGE API — Compatibilité avec l'ancien players.js
// ═══════════════════════════════════════════════════════════════════

function getPlayers() { return PlayerManager.getAll(); }
function savePlayers(data) { return PlayerManager.saveAll(data); }
function getPlayerData(name) { return PlayerManager.load(name); }
function switchPlayer(name) {
  PlayerManager.setCurrent(name);
  if (typeof loadPlayer === 'function') loadPlayer(name);
  return PlayerManager.load(name);
}
function updatePlayerDisplay() {
  const current = PlayerManager.getCurrent();
  if (current && typeof loadPlayer === 'function') loadPlayer(current);
}
function deleteCurrentPlayer() {
  const current = PlayerManager.getCurrent();
  if (!current) return;
  PlayerManager.delete(current);
  const remaining = Object.keys(PlayerManager.getAll());
  if (remaining.length > 0) {
    if (typeof loadPlayer === 'function') loadPlayer(remaining[0]);
  } else {
    location.reload();
  }
}
function showNewPlayerModal() { Modal.open(); }
function confirmNewPlayer() {
  const inp = document.getElementById('mInput');
  if (!inp) return;
  const result = PlayerManager.create(inp.value);
  if (result.success) {
    Modal.close();
    if (typeof loadPlayer === 'function') loadPlayer(result.player.name);
    toast(I18n.t('welcomePlayer') + ', ' + result.player.name + '! 🎉');
    inp.value = '';
  } else {
    toast(result.error);
  }
}

// ═══════════════════════════════════════════════════════════════════
// 14. ALIASES GLOBALES — Pour onclick inline dans HTML ancien
// ═══════════════════════════════════════════════════════════════════

function doCreate() { confirmNewPlayer(); }
function openModal() { Modal.open(); }
function closeModal() { Modal.close(); }
function applyTheme(name) { Theme.apply(name); }
function loadTheme() { Theme.load(); }

// ═══════════════════════════════════════════════════════════════════
// 15. NAVIGATION HELPERS
// ═══════════════════════════════════════════════════════════════════

function goToQuiz() { window.location.href = 'quiz.html'; }
function goToDashboard() { window.location.href = 'dashboard.html'; }
function goToVocabulary() { window.location.href = 'vocabulary.html'; }

// ═══════════════════════════════════════════════════════════════════
// FIN DE core.js — Version 1.0.0 — 28 mai 2026
// ═══════════════════════════════════════════════════════════════════
