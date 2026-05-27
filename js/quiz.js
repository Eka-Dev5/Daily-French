// ═══════════════════════════════════════════════════════════════════
// DAILY FRENCH — quiz.js
// Spécifique à quiz.html : leçons, routing, patchs game-engine
// Dépend de : core.js (joueur, hero, modal déjà gérés)
// ═══════════════════════════════════════════════════════════════════

// ── SURCHARGE selectMode ─────────────────────────────────────────
if (typeof selectMode === "function") {
  const _origSelectMode = selectMode;
  selectMode = function(mode) {
    gameState.currentMode = mode;
    document.querySelectorAll(".mode-btn").forEach(b => {
      b.classList.toggle("selected", b.getAttribute("data-mode") === mode);
    });
  };
}

// ── RENDER LESSONS ────────────────────────────────────────────────
function renderLessons() {
  const container = document.getElementById("lessonsContainer");
  if (!container) return;
  if (typeof LESSONS_DATA === "undefined" || !LESSONS_DATA.length) {
    container.innerHTML = '<div class="empty">📚 No lessons available.</div>';
    return;
  }
  
  container.innerHTML = LESSONS_DATA.map(l => {
    const hasVocab = (typeof highlightVocabularyWords === "function");
    const contentHtml = l.content ? (hasVocab ? highlightVocabularyWords(l.content) : l.content) : "";
    let trans = "";
    if (l.content && l.content.includes("🇬🇧")) {
      const parts = l.content.split("🇬🇧");
      if (parts[1]) trans = parts[1].split(/<\/p>|<\/div>|<br>/)[0].replace(/<[^>]*>/g,"").trim();
    }
    return `
      <div class="lesson-card" id="lesson-${l.num}">
        <div class="lesson-header" onclick="toggleLesson(${l.num})">
          <div class="lesson-title">
            <span class="lesson-tag">Lvl ${l.num}</span>
            <span>${l.title || ("Lesson " + l.num)}</span>
          </div>
          <button class="lesson-ex-btn" onclick="event.stopPropagation();toggleLessonEx(this,event)">🇬🇧 English</button>
        </div>
        <div class="lesson-body" id="lesson-body-${l.num}">
          <div class="lesson-rule">${contentHtml}</div>
          <div class="lesson-ex-en" id="lesson-ex-${l.num}">${trans || "Translation not available."}</div>
        </div>
      </div>
    `;
  }).join("");
}

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

// ── ROUTING ───────────────────────────────────────────────────────
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
  } else {
    showSection("home");
  }
}

// ── PATCH renderQuestion ──────────────────────────────────────────
if (typeof renderQuestion === "function") {
  const _origRenderQuestion = renderQuestion;
  renderQuestion = function() {
    _origRenderQuestion();
    const qText = document.getElementById("questionText");
    if (qText && typeof highlightVocabularyWords === "function") {
      if (!qText.querySelector(".vocab-highlight")) {
        qText.innerHTML = highlightVocabularyWords(qText.textContent);
      }
    }
  };
}

// ── INIT ─────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initCore(); // ← Appelle core.js (joueur, hero, modal, theme)
  setTimeout(() => {
    routeSection();
  }, 100);
});
