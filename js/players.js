// ═══════════════════════════════════════════════════════════════════
// PLAYERS.JS — Daily French 🥖
// Gestion des profils joueurs (extrait de game-engine.js)
// Dépend de : config.js
// ═══════════════════════════════════════════════════════════════════

function getPlayers() {
  try { return JSON.parse(localStorage.getItem(SUBJECT_CONFIG.playersKey)) || {}; }
  catch(e) { return {}; }
}

function savePlayers(p) {
  localStorage.setItem(SUBJECT_CONFIG.playersKey, JSON.stringify(p));
}

function getPlayerData(name) {
  const p = getPlayers();
  if (!p[name]) {
    p[name] = {
      name: name, currentLevel: 1, score: 0, completed: [],
      totalQuestions: 0, totalCorrect: 0, streak: 0,
      lastPlayed: null, errorHistory: [], sessionHistory: [], activeSession: null
    };
    savePlayers(p);
  }
  return p[name];
}

function switchPlayer(name) {
  if (!name) return;
  gameState.currentPlayer = name;
  const p = getPlayerData(name);
  gameState.currentLevel = p.currentLevel || 1;
  gameState.score = p.score || 0;
  updatePlayerDisplay();
  renderLevels();
  showToast("Player: " + name);
}

function showNewPlayerModal() {
  const m = document.getElementById("newPlayerModal");
  if (m) { m.style.display = "flex"; }
  const inp = document.getElementById("newPlayerNameModal");
  if (inp) { inp.value = ""; setTimeout(() => inp.focus(), 100); }
}

function closeNewPlayerModal() {
  const m = document.getElementById("newPlayerModal");
  if (m) m.style.display = "none";
}

function confirmNewPlayer() {
  const inp = document.getElementById("newPlayerNameModal");
  if (!inp || !inp.value.trim()) { closeNewPlayerModal(); return; }
  const n = inp.value.trim();
  const players = getPlayers();
  if (players[n]) { showToast("This player already exists!"); return; }
  players[n] = {
    name: n, currentLevel: 1, score: 0, completed: [],
    totalQuestions: 0, totalCorrect: 0, streak: 0,
    lastPlayed: null, errorHistory: [], sessionHistory: [], activeSession: null
  };
  savePlayers(players);
  switchPlayer(n);
  closeNewPlayerModal();
  showToast("Welcome " + n + "! 🎉");
}

function deleteCurrentPlayer() {
  if (!gameState.currentPlayer) { showToast("No player selected"); return; }
  if (!confirm("Delete " + gameState.currentPlayer + "? All progress will be lost.")) return;
  const p = getPlayers();
  delete p[gameState.currentPlayer];
  savePlayers(p);
  gameState.currentPlayer = null;
  updatePlayerDisplay();
  renderLevels();
  showToast("Player deleted");
}

function updatePlayerDisplay() {
  const players = getPlayers();
  const sel = document.getElementById("playerSelect");
  if (sel) {
    sel.innerHTML = "<option value=''>-- Player --</option>";
    Object.keys(players).forEach(n => {
      const o = document.createElement("option");
      o.value = n;
      o.textContent = n + " (Lvl." + players[n].currentLevel + ")";
      if (n === gameState.currentPlayer) o.selected = true;
      sel.appendChild(o);
    });
  }
  if (gameState.currentPlayer && players[gameState.currentPlayer]) {
    const p = players[gameState.currentPlayer];
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set("playerNameDisplay", p.name);
    set("playerStats", "Lvl." + p.currentLevel + " • " + p.score + " pts");
    set("headerScore", p.score + " pts");
    set("homeLevel", p.currentLevel);
    set("homeScore", p.score);
    set("homeStreak", p.streak || 0);
    const rate = p.totalQuestions > 0 ? Math.round((p.totalCorrect / p.totalQuestions) * 100) : 0;
    set("homeRate", rate + "%");
    const av = document.getElementById("playerAvatar");
    if (av) av.textContent = p.name.charAt(0).toUpperCase();
  }
}
