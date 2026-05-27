// ═══════════════════════════════════════════════════════════════════
// DAILY FRENCH — quiz.js
// Init page quiz + leçons + routing URL + patch vocabulaire
// Dépend de : config.js, data.js, vocabulary-engine.js, game-engine.js
// ═══════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────
// 1. SURCHARGE selectMode → supporte data-mode (plusieurs groupes de boutons)
// ─────────────────────────────────────────────────────────────────
selectMode = function(mode) {
  gameState.currentMode = mode;
  document.querySelectorAll(".mode-btn").forEach(b => {
    b.classList.toggle("selected", b.getAttribute("data-mode") === mode);
  });
};

// ─────────────────────────────────────────────────────────────────
// 2. RENDER LESSONS — Affiche les 20 leçons depuis LESSONS_DATA
// ─────────────────────────────────────────────────────────────────
function renderLessons() {
  const container = document.getElementById("lessonsList");
  if (!container) return;
  if (typeof LESSONS_DATA === "undefined" || !LESSONS_DATA.length) {
    container.innerHTML = '<div class="empty"><span class="empty-i">📚</span>No lessons available.</div>';
    return;
  }
  
  container.innerHTML = LESSONS_DATA.map(l => {
    const hasVocab = (typeof highlightVocabularyWords === "function");
    const contentHtml = l.content 
      ? (hasVocab ? highlightVocabularyWords(l.content) : l.content) 
      : "";
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
          <div class="lesson-ex-en" id="lesson-ex-${l.num}">Translation loading...</div>
        </div>
      </div>
    `;
  }).join("");
}

// ─────────────────────────────────────────────────────────────────
// 3. TOGGLE LESSON — Ouvre/ferme une leçon
// ─────────────────────────────────────────────────────────────────
function toggleLesson(num) {
  const body = document.getElementById("lesson-body-" + num);
  const card = document.getElementById("lesson-" + num);
  if (!body) return;
  const isOpen = body.classList.contains("open");
  
  // Ferme toutes les autres
  document.querySelectorAll(".lesson-body.open").forEach(b => {
    if (b.id !== "lesson-body-" + num) {
      b.classList.remove("open");
      b.style.display = "none";
    }
  });
  document.querySelectorAll(".lesson-card.open").forEach(c => c.classList.remove("open"));
  
  if (isOpen) {
    body.classList.remove("open");
    body.style.display = "none";
    card.classList.remove("open");
  } else {
    body.classList.add("open");
    body.style.display = "block";
    card.classList.add("open");
  }
}

// ─────────────────────────────────────────────────────────────────
// 4. ROUTING URL ?section=X — Route vers la bonne section au chargement
// ─────────────────────────────────────────────────────────────────
function routeSection() {
  const params = new URLSearchParams(window.location.search);
  const section = params.get("section");
  const lvlParam = params.get("level");
  
  // Si ?level=X, game-engine.js gère le lancement du niveau
  if (lvlParam) return;
  
  if (section === "lecons") {
    showSection("lecons");
    renderLessons();
  } else if (section === "levels") {
    showSection("levels"); // renderLevels() est appelé par showSection
  } else {
    // Par défaut : home
    showSection("home");
  }
}

// ─────────────────────────────────────────────────────────────────
// 5. PATCH renderQuestion — Surligne le vocabulaire dans les questions
// ─────────────────────────────────────────────────────────────────
const _origRenderQuestion = renderQuestion;
renderQuestion = function() {
  _origRenderQuestion();
  const qText = document.getElementById("qText");
  if (qText && typeof highlightVocabularyWords === "function") {
    const raw = qText.textContent;
    qText.innerHTML = highlightVocabularyWords(raw);
  }
};

// ─────────────────────────────────────────────────────────────────
// 6. INIT — Au chargement de la page
// ─────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Laisse game-engine.js faire son init d'abord (joueur, level)
  setTimeout(() => {
    routeSection();
    
    // Ferme le modal si clic sur l'overlay
    const modalWrap = document.getElementById("modalWrap");
    if (modalWrap) {
      modalWrap.addEventListener("click", e => {
        if (e.target === modalWrap) closeModal();
      });
    }
    
    // Ferme popup vocab si clic sur l'overlay
    const vocabModal = document.getElementById("vocabulary-popup-modal");
    if (vocabModal) {
      vocabModal.addEventListener("click", e => {
        if (e.target === vocabModal) closeVocabPopup();
      });
    }
  }, 150);
});
