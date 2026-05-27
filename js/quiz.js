// ═══════════════════════════════════════════════════════════════════
// DAILY FRENCH — quiz.js
// Wrappers Dashboard + Leçons + Routing + Patchs pour game-engine.js
// ═══════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════
// 1. WRAPPERS DASHBOARD — Pour que le hero, le select et le modal fonctionnent
//    exactement comme dans dashboard.html
// ═══════════════════════════════════════════════════════════════════

function fillSelect(active) {
  const s = document.getElementById("selPlayer");
  if (!s) return;
  const p = getPlayers();
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
  switchPlayer(name);
  const p = getPlayers()[name];
  if (!p) return;
  renderHero(p);
  renderBento(p);
  fillSelect(name);
}

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

function renderBento(p) {
  const b1 = document.getElementById("b1");
  const b2 = document.getElementById("b2");
  const b3 = document.getElementById("b3");
  if (b1) b1.textContent = p.currentLevel || 1;
  if (b2) b2.textContent = p.score || 0;
  if (b3) b3.textContent = (p.completed || []).length + "/20";
}

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
  const n = document.getElementById("mInput").value.trim();
  if (!n) return;
  const players = getPlayers();
  if (players[n]) { showToast("Player already exists!"); return; }
  players[n] = {
    name: n, currentLevel: 1, score: 0, completed: [],
    totalQuestions: 0, totalCorrect: 0, streak: 0,
    lastPlayed: null, errorHistory: [], sessionHistory: [], activeSession: null
  };
  savePlayers(players);
  closeModal();
  switchPlayer(n);
  loadPlayer(n);
  showToast("Welcome, " + n + "! 🎉");
}

function doExport() { exportSave(); }
function doImport(ev) { importSave(ev); }

// Surcharge updatePlayerDisplay (de players.js) pour utiliser le hero dashboard
const _origUpdatePlayerDisplay = (typeof updatePlayerDisplay === "function") ? updatePlayerDisplay : function(){};
updatePlayerDisplay = function() {
  const players = getPlayers();
  const current = gameState.currentPlayer;
  if (!current || !players[current]) {
    const heroAv = document.getElementById("heroAv");
    const heroName = document.getElementById("heroName");
    if (heroAv) heroAv.innerHTML = '?<<span class="hero-lvl-badge" id="heroLvl">1</span>';
    if (heroName) heroName.textContent = "Welcome";
    fillSelect(null);
    return;
  }
  loadPlayer(current);
};

// ═══════════════════════════════════════════════════════════════════
// 2. SURCHARGE selectMode — Supporte data-mode (plusieurs groupes de boutons)
// ═══════════════════════════════════════════════════════════════════
selectMode = function(mode) {
  gameState.currentMode = mode;
  document.querySelectorAll(".mode-btn").forEach(b => {
    b.classList.toggle("selected", b.getAttribute("data-mode") === mode);
  });
};

// ═══════════════════════════════════════════════════════════════════
// 3. RENDER LESSONS — 20 leçons avec highlight vocab + bouton English
// ═══════════════════════════════════════════════════════════════════
function renderLessons() {
  const container = document.getElementById("lessonsContainer");
  if (!container) return;
  if (typeof LESSONS_DATA === "undefined" || !LESSONS_DATA.length) {
    container.innerHTML = '<div class="empty"><span class="empty-i">📚</span>No lessons available.</div>';
    return;
  }
  
  container.innerHTML = LESSONS_DATA.map(l => {
    const hasVocab = (typeof highlightVocabularyWords === "function");
    const contentHtml = l.content ? (hasVocab ? highlightVocabularyWords(l.content) : l.content) : "";
    // Extraction traduction si présente (🇬🇧)
    let trans = "";
    if (l.content && l.content.includes("🇬🇧")) {
      const parts = l.content.split("🇬🇧");
      if (parts[1]) trans = parts[1].split(/<<\/p>|<\/div>|<br>/)[0].replace(/<<[^>]*>/g,"").trim();
    }
    return `
      <div class="lesson-card" id="lesson-${l.num}">
        <div class="lesson-header" onclick="toggleLesson(${l.num})">
          <div class="lesson-title">
            <span class="lesson-tag">Lvl ${l.num}</span>
            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${l.title || ("Lesson " + l.num)}</span>
          </div>
          <button class="lesson-ex-btn" onclick="event.stopPropagation();toggleLessonEx(this,event)" data-num="${l.num}">🇬🇧 English</button>
        </div>
        <div class="lesson-body" id="lesson-body-${l.num}">
          <div class="lesson-rule">${contentHtml}</div>
          <div class="lesson-ex-en" id="lesson-ex-${l.num}">${trans || "Translation not available."}</div>
        </div>
      </div>
    `;
  }).join("");
}

// ═══════════════════════════════════════════════════════════════════
// 4. TOGGLE LESSON — Ouvre/ferme une leçon
// ═══════════════════════════════════════════════════════════════════
function toggleLesson(num) {
  const body = document.getElementById("lesson-body-" + num);
  const card = document.getElementById("lesson-" + num);
  if (!body) return;
  const isOpen = body.classList.contains("open");
  
  document.querySelectorAll(".lesson-body.open").forEach(b => {
    if (b.id !== "lesson-body-" + num) { b.classList.remove("open"); b.style.display = "none"; }
  });
  document.querySelectorAll(".lesson-card.open").forEach(c => c.classList.remove("open"));
  
  if (isOpen) {
    body.classList.remove("open"); body.style.display = "none"; card.classList.remove("open");
  } else {
    body.classList.add("open"); body.style.display = "block"; card.classList.add("open");
  }
}

// ═══════════════════════════════════════════════════════════════════
// 5. ROUTING URL ?section=X
// ═══════════════════════════════════════════════════════════════════
function routeSection() {
  const params = new URLSearchParams(window.location.search);
  const section = params.get("section");
  const lvlParam = params.get("level");
  
  if (lvlParam) return; // game-engine.js gère ?level=X
  
  if (section === "lecons") {
    showSection("lecons");
    renderLessons();
  } else if (section === "levels") {
    showSection("levels");
  } else if (section === "home") {
    showSection("home");
  } else {
    showSection("home");
  }
}

// ═══════════════════════════════════════════════════════════════════
// 6. PATCH renderQuestion — Force le highlight vocab + fallback
// ═══════════════════════════════════════════════════════════════════
const _origRenderQuestion = renderQuestion;
renderQuestion = function() {
  _origRenderQuestion();
  const qText = document.getElementById("questionText");
  if (qText && typeof highlightVocabularyWords === "function") {
    if (!qText.querySelector(".vocab-highlight")) {
      const raw = qText.textContent;
      qText.innerHTML = highlightVocabularyWords(raw);
    }
  } else if (qText && typeof highlightVocabularyWords !== "function") {
    console.warn("vocabulary-engine.js not loaded — highlight disabled");
  }
};

// ═══════════════════════════════════════════════════════════════════
// 7. INIT — Au chargement de la page
// ═══════════════════════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const players = getPlayers();
    const names = Object.keys(players);
    const current = gameState.currentPlayer || (names.length ? names[0] : null);
    
    if (current) loadPlayer(current);
    else fillSelect(null);
    
    routeSection();
    
    // Modal overlay click
    const modalWrap = document.getElementById("modalWrap");
    if (modalWrap) {
      modalWrap.addEventListener("click", e => { if (e.target === modalWrap) closeModal(); });
    }
    // Vocab popup overlay click
    const vocabModal = document.getElementById("vocabulary-popup-modal");
    if (vocabModal) {
      vocabModal.addEventListener("click", e => { if (e.target === vocabModal) closeVocabPopup(); });
    }
  }, 150);
});
