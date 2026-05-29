// ═══════════════════════════════════════════════════════════════════
// UI-UTILS.JS — Daily French 🥖
// Toast, export/import, popup vocabulaire, navigation
// ═══════════════════════════════════════════════════════════════════

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}

// ── NAVIGATION ──
function goToVocabulary() {
  window.location.href = SUBJECT_CONFIG.vocabularyFile;
}

function goToDashboard() {
  const url = gameState && gameState.currentPlayer
    ? "dashboard.html?player=" + encodeURIComponent(gameState.currentPlayer)
    : "dashboard.html";
  window.location.href = url;
}

// ── EXPORT / IMPORT SAUVEGARDE ──
function exportSave() {
  const players = getPlayers();
  if (Object.keys(players).length === 0) { showToast("No save data to export."); return; }
  const blob = new Blob([JSON.stringify(players, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "DailyFrench-save-" + new Date().toISOString().slice(0, 10) + ".json";
  a.click();
  URL.revokeObjectURL(url);
  showToast("Save downloaded!");
}

function importSave(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (typeof data === "object" && data !== null) {
        savePlayers(data);
        updatePlayerDisplay();
        renderLevels();
        const names = Object.keys(data);
        if (names.length > 0) switchPlayer(names[0]);
        showToast("Save imported! Welcome " + names[0] + "!");
      } else { showToast("Invalid file."); }
    } catch(err) { showToast("Error: unrecognised file."); }
  };
  reader.readAsText(file);
  event.target.value = "";
}

// ── VOCABULAIRE POPUP ──
function openVocabPopup(fr) {
  if (typeof VOCABULARY_BDD === "undefined") return;
  const w = VOCABULARY_BDD.find(x => x.fr === fr);
  if (!w) return;
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v || ""; };
  set("vocabPopupFr", w.fr);
  set("vocabPopupPhon", w.phon || "");
  set("vocabPopupEn", w.en);
  set("vocabPopupDef", w.def || "");
  set("vocabPopupEx", w.ex || "");
  set("vocabPopupCat", (w.cat || "") + (w.level ? " • Level " + w.level : ""));
  const modal = document.getElementById("vocabulary-popup-modal");
  if (modal) modal.style.display = "flex";
}

function closeVocabPopup(e) {
  if (e && e.target && !e.target.closest(".vocab-modal-content") && !e.target.classList.contains("vocab-modal-close")) {
    // clic sur overlay
  }
  const modal = document.getElementById("vocabulary-popup-modal");
  if (modal) modal.style.display = "none";
}

// ── TOGGLE TRADUCTION LEÇONS ──
function toggleLessonEx(btn, ev) {
  if (ev) { ev.stopPropagation(); ev.preventDefault(); }
  const span = btn.parentElement ? btn.parentElement.querySelector(".lesson-ex-en") : null;
  if (!span) return;
  const show = span.style.display !== "block";
  span.style.display = show ? "block" : "none";
  btn.textContent = show ? "🇫🇷 Hide" : "🇬🇧 English";
}
