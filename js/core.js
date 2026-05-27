// ═══════════════════════════════════════════════════════════════════
// DAILY FRENCH — core.js
// Fonctions partagées par TOUTES les pages
// Joueur, Hero, Bento, Modal, Export/Import, Thème, Navigation
// ═══════════════════════════════════════════════════════════════════

const PK = "dailyFrench_players";
const GK = "dailyFrench_genius";

// ── LOCALSTORAGE ──────────────────────────────────────────────────
function gP() { try { return JSON.parse(localStorage.getItem(PK)) || {}; } catch { return {}; } }
function sP(d) { localStorage.setItem(PK, JSON.stringify(d)); }
function gG() { try { return JSON.parse(localStorage.getItem(GK)) || []; } catch { return []; } }
function sG(d) { localStorage.setItem(GK, JSON.stringify(d)); }

// ── TOAST ─────────────────────────────────────────────────────────
function toast(m) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = m;
  t.classList.add("on");
  setTimeout(() => t.classList.remove("on"), 3000);
}

// ── MODAL NEW PLAYER ──────────────────────────────────────────────
function openModal() {
  const wrap = document.getElementById("modalWrap");
  if (wrap) wrap.classList.add("open");
  const inp = document.getElementById("mInput");
  if (inp) { inp.value = ""; setTimeout(() => inp.focus(), 80); }
}

function closeModal() {
  const wrap = document.getElementById("modalWrap");
  if (wrap) wrap.classList.remove("open");
}

function doCreate() {
  const inp = document.getElementById("mInput");
  if (!inp) { console.error("mInput not found"); return; }
  const n = inp.value.trim();
  if (!n) { toast("Please enter a name!"); return; }
  
  const players = gP();
  if (players[n]) { toast("Player already exists!"); return; }
  
  players[n] = {
    name: n, currentLevel: 1, score: 0, completed: [],
    totalQuestions: 0, totalCorrect: 0, streak: 0,
    lastPlayed: null, errorHistory: [], sessionHistory: [], activeSession: null,
    cameleonHelped: 0
  };
  sP(players);
  
  closeModal();
  fillSelect(n);
  loadPlayer(n);
  toast("Welcome, " + n + "! 🎉");
}

// ── SÉLECTEUR JOUEUR ──────────────────────────────────────────────
function fillSelect(active) {
  const s = document.getElementById("selPlayer");
  if (!s) return;
  const p = gP();
  s.innerHTML = "<option value=''>— Choose a player —</option>";
  Object.keys(p).forEach(n => {
    const o = document.createElement("option");
    o.value = n;
    o.textContent = n + " (Lvl." + (p[n].currentLevel || 1) + ")";
    if (n === active) o.selected = true;
    s.appendChild(o);
  });
}

function loadPlayer(name) {
  if (!name) return;
  const players = gP();
  const p = players[name];
  if (!p) return;
  
  // Met à jour gameState si présent
  if (typeof gameState !== "undefined") gameState.currentPlayer = name;
  
  renderHero(p);
  renderBento(p);
  fillSelect(name);
}

// ── HERO ──────────────────────────────────────────────────────────
function renderHero(p) {
  const done = p.completed || [];
  const score = p.score || 0;
  const lvl = p.currentLevel || 1;
  
  const heroAv = document.getElementById("heroAv");
  const heroName = document.getElementById("heroName");
  const heroTag = document.getElementById("heroTag");
  const xpNow = document.getElementById("xpNow");
  const xpGoal = document.getElementById("xpGoal");
  const xpBar = document.getElementById("xpBar");
  const p_streak = document.getElementById("p_streak");
  const p_acc = document.getElementById("p_acc");
  const p_sess = document.getElementById("p_sess");
  
  if (heroAv) heroAv.innerHTML = p.name.charAt(0).toUpperCase() + '<span class="hero-lvl-badge" id="heroLvl">' + lvl + '</span>';
  if (heroName) heroName.textContent = p.name;
  if (heroTag) heroTag.textContent = "Level " + lvl + " · " + score + " pts · " + done.length + "/20 done";
  if (xpNow) xpNow.textContent = score + " pts";
  const ms = Math.ceil(score / 100) * 100;
  if (xpGoal) xpGoal.textContent = "Next: " + ms + " pts";
  if (xpBar) xpBar.style.width = Math.round(score % 100) + "%";
  if (p_streak) p_streak.textContent = p.streak || 0;
  const acc = p.totalQuestions > 0 ? Math.round(p.totalCorrect / p.totalQuestions * 100) + "%" : "—";
  if (p_acc) p_acc.textContent = acc;
  if (p_sess) p_sess.textContent = (p.sessionHistory || []).length;
}

// ── BENTO ─────────────────────────────────────────────────────────
function renderBento(p) {
  const b1 = document.getElementById("b1");
  const b2 = document.getElementById("b2");
  const b3 = document.getElementById("b3");
  if (b1) b1.textContent = p.currentLevel || 1;
  if (b2) b2.textContent = p.score || 0;
  if (b3) b3.textContent = (p.completed || []).length + "/20";
}

// ── EXPORT / IMPORT ─────────────────────────────────────────────
function doExport() {
  const p = gP();
  if (!Object.keys(p).length) { toast("No data to export."); return; }
  const b = new Blob([JSON.stringify(p, null, 2)], { type: "application/json" });
  const u = URL.createObjectURL(b);
  const a = document.createElement("a");
  a.href = u;
  a.download = "DailyFrench-" + new Date().toISOString().slice(0, 10) + ".json";
  a.click();
  URL.revokeObjectURL(u);
  toast("Exported! ✅");
}

function doImport(ev) {
  const f = ev.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = e => {
    try {
      const d = JSON.parse(e.target.result);
      if (typeof d !== "object" || !d) { toast("Invalid file."); return; }
      sP(d);
      const n = Object.keys(d);
      if (n.length) loadPlayer(n[0]);
      toast("Imported! ✅");
    } catch { toast("Error reading file."); }
  };
  r.readAsText(f);
  ev.target.value = "";
}

// ── THÈMES ───────────────────────────────────────────────────────
const THEMES = {
  ardoise: {
    primary: '#4A5568', mid: '#64748B', light: '#F1F5F9',
    hero: 'linear-gradient(135deg,#475569 0%,#64748B 40%,#94A3B8 70%,#CBD5E1 100%)'
  },
  mauve: {
    primary: '#7C3AED', mid: '#8B5CF6', light: '#EDE9FE',
    hero: 'linear-gradient(135deg,#581C87 0%,#7C3AED 40%,#A855F7 70%,#C084FC 100%)'
  },
  terra: {
    primary: '#9A3412', mid: '#C2410C', light: '#FFF7ED',
    hero: 'linear-gradient(135deg,#7C2D12 0%,#9A3412 40%,#C2410C 70%,#EA580C 100%)'
  }
};

function applyTheme(name) {
  const t = THEMES[name] || THEMES.ardoise;
  localStorage.setItem('dailyFrench_theme', name);
  const root = document.documentElement;
  root.style.setProperty('--primary', t.primary);
  root.style.setProperty('--primary-mid', t.mid);
  root.style.setProperty('--primary-light', t.light);
  document.querySelectorAll('.hero').forEach(h => h.style.background = t.hero);
}

function loadTheme() {
  const saved = localStorage.getItem('dailyFrench_theme');
  applyTheme(THEMES[saved] ? saved : 'ardoise');
}

// ── NAVIGATION ────────────────────────────────────────────────────
function goToQuiz() {
  const url = gameState && gameState.currentPlayer
    ? "quiz.html?player=" + encodeURIComponent(gameState.currentPlayer)
    : "quiz.html";
  window.location.href = url;
}

function goToDashboard() {
  const url = gameState && gameState.currentPlayer
    ? "dashboard.html?player=" + encodeURIComponent(gameState.currentPlayer)
    : "dashboard.html";
  window.location.href = url;
}

// ── INIT MODAL LISTENERS (appelé par chaque page) ────────────────
function initCore() {
  // Modal listeners
  const btnCreate = document.getElementById("btnCreatePlayer");
  const btnCancel = document.getElementById("btnCancelModal");
  const inpModal = document.getElementById("mInput");
  const modalWrap = document.getElementById("modalWrap");
  
  if (btnCreate) {
    btnCreate.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      doCreate();
    });
  }
  
  if (btnCancel) {
    btnCancel.addEventListener("click", function(e) {
      e.preventDefault();
      closeModal();
    });
  }
  
  if (inpModal) {
    inpModal.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        doCreate();
      }
    });
  }
  
  if (modalWrap) {
    modalWrap.addEventListener("click", function(e) {
      if (e.target === modalWrap) closeModal();
    });
  }
  
  // Vocab popup overlay
  const vocabModal = document.getElementById("vocabulary-popup-modal");
  if (vocabModal) {
    vocabModal.addEventListener("click", function(e) {
      if (e.target === vocabModal) closeVocabPopup();
    });
  }
  
  // Thème
  loadTheme();
  
  // Joueur par défaut
  const players = gP();
  const names = Object.keys(players);
  const current = (typeof gameState !== "undefined" && gameState.currentPlayer) 
    ? gameState.currentPlayer 
    : (names.length ? names[0] : null);
  
  if (current) {
    fillSelect(current);
    loadPlayer(current);
  } else {
    fillSelect(null);
  }
}
