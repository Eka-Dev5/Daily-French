/**
 * game-engine.js — Moteur de quiz Daily French
 * 
 * Gère le cycle complet d'un niveau : sélection, intro, questions,
 * validation, feedback, résultats, progression joueur.
 * 
 * Dépendances : config.js (gameState, SUBJECT_CONFIG, LEVEL_NAMES),
 * data.js (LESSONS_DATA, QUESTIONS_DB), core.js (PlayerManager),
 * ui-utils.js (showToast, normalizeForMatch, savePlayers, getPlayers)
 */

// ═══════════════════════════════════════════════════════════════════
// 1. NAVIGATION INTERNE — Affiche une section, masque les autres
// ═══════════════════════════════════════════════════════════════════

function showSection(id) {
  document.querySelectorAll('.section').forEach(el => {
    el.style.display = 'none';
    el.classList.remove('active');
  });
  const target = document.getElementById(id);
  if (target) {
    target.style.display = 'block';
    target.classList.add('active');
  }
}

// ═══════════════════════════════════════════════════════════════════
// 2. GRILLE DES NIVEAUX — Rendu dans #levelsContainer
// ═══════════════════════════════════════════════════════════════════

function renderLevels() {
  const container = document.getElementById('levelsContainer');
  if (!container || typeof LEVEL_NAMES === 'undefined') return;

  container.innerHTML = '';
  const max = SUBJECT_CONFIG?.maxLevel || 20;
  const players = (typeof getPlayers === 'function') ? getPlayers() : {};
  const currentName = (typeof PlayerManager !== 'undefined')
    ? PlayerManager.getCurrent()
    : (gameState?.currentPlayer || null);
  const p = currentName ? players[currentName] : null;
  const currentLvl = p?.currentLevel || 1;
  const done = p?.completed || [];

  for (let i = 1; i <= max; i++) {
    const tile = document.createElement('div');
    tile.className = 'level-tile';
    tile.textContent = i;

    const title = document.createElement('div');
    title.className = 'level-title';
    title.textContent = LEVEL_NAMES[i] || 'Level ' + i;

    if (done.includes(i)) {
      tile.classList.add('completed');
    } else if (i === currentLvl) {
      tile.classList.add('active');
    } else if (i > currentLvl) {
      tile.classList.add('locked');
      tile.style.pointerEvents = 'none';
    }

    tile.addEventListener('click', () => startLevel(i));
    tile.appendChild(title);
    container.appendChild(tile);
  }
}

// ═══════════════════════════════════════════════════════════════════
// 3. DÉMARRAGE D'UN NIVEAU — Charge les données et affiche l'intro
// ═══════════════════════════════════════════════════════════════════

function startLevel(levelNum) {
  if (!QUESTIONS_DB || !QUESTIONS_DB[levelNum]) {
    if (typeof showToast === 'function') showToast('Level data missing');
    return;
  }

  gameState.currentLevel = levelNum;
  gameState.score = 0;
  gameState.currentQuestionIndex = 0;
  gameState.answers = [];
  gameState.selectedOption = null;

  showSection('jeu');
  showLessonIntro(levelNum);
}

// Remplit le bloc d'introduction avant les questions
function showLessonIntro(levelNum) {
  const intro = document.getElementById('lessonIntro');
  const title = document.getElementById('lessonIntroTitle');
  const obj = document.getElementById('lessonIntroObj');
  const content = document.getElementById('lessonIntroContent');
  const vocab = document.getElementById('lessonIntroVocabulary');
  const btn = document.getElementById('startLevelBtn');

  const data = QUESTIONS_DB[levelNum];
  const lesson = LESSONS_DATA?.[levelNum - 1];

  if (title) title.textContent = (lesson?.title || 'Level ' + levelNum);
  if (obj) obj.textContent = data?.objective || '';
  if (content) content.innerHTML = lesson?.content || '';
  if (vocab && data?.vocabulary?.length) {
    vocab.innerHTML = '<strong>Vocabulary:</strong> ' + data.vocabulary.join(', ');
  } else if (vocab) {
    vocab.innerHTML = '';
  }

  if (intro) intro.style.display = 'block';
  if (btn) {
    btn.onclick = () => {
      intro.style.display = 'none';
      startQuestions();
    };
  }
}

// ═══════════════════════════════════════════════════════════════════
// 4. PRÉPARATION DES QUESTIONS — Mélange et filtre selon le mode
// ═══════════════════════════════════════════════════════════════════

function startQuestions() {
  const levelNum = gameState.currentLevel;
  const data = QUESTIONS_DB[levelNum];
  const mode = gameState.currentMode || 'mixte';

  let pool = [];
  if (mode === 'qcm' && data?.qcm) {
    pool = data.qcm.slice();
  } else if (mode === 'libre' && data?.libre) {
    pool = data.libre.slice();
  } else if (mode === 'mixte') {
    const qcm = (data?.qcm || []).slice(0, 5);
    const libre = (data?.libre || []).slice(0, 5);
    pool = [...qcm, ...libre];
  }

  if (pool.length === 0) {
    if (typeof showToast === 'function') showToast('No questions for this level');
    return;
  }

  gameState.questions = shuffle(pool);
  gameState.currentQuestionIndex = 0;
  gameState.score = 0;
  gameState.answers = [];

  const gameTitle = document.getElementById('gameTitle');
  if (gameTitle) gameTitle.textContent = 'Level ' + levelNum;

  renderQuestion();
}

// Algorithme de Fisher-Yates pour mélanger un tableau en place
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ═══════════════════════════════════════════════════════════════════
// 5. AFFICHAGE D'UNE QUESTION — QCM ou champ écrit
// ═══════════════════════════════════════════════════════════════════

function renderQuestion() {
  const q = gameState.questions[gameState.currentQuestionIndex];
  if (!q) return;

  gameState.selectedOption = null;

  const questionText = document.getElementById('questionText');
  const qcmOptions = document.getElementById('qcmOptions');
  const libreInput = document.getElementById('libreInput');
  const answerInput = document.getElementById('answerInput');
  const feedbackArea = document.getElementById('feedbackArea');
  const validateBtn = document.getElementById('validateBtn');
  const nextBtn = document.getElementById('nextBtn');
  const hintBox = document.getElementById('hintBox');

  if (feedbackArea) feedbackArea.style.display = 'none';
  if (validateBtn) validateBtn.style.display = 'inline-flex';
  if (nextBtn) nextBtn.style.display = 'none';
  if (hintBox) hintBox.style.display = 'none';

  const counter = document.getElementById('questionCounter');
  const progress = document.getElementById('progressFill');
  const total = gameState.questions.length;
  const current = gameState.currentQuestionIndex + 1;

  if (counter) counter.textContent = current + ' / ' + total;
  if (progress) progress.style.width = (current / total * 100) + '%';

  if (questionText) questionText.innerHTML = q.question || '';

  if (q.type === 'qcm' || q.options) {
    if (qcmOptions) {
      qcmOptions.innerHTML = '';
      qcmOptions.style.display = 'block';
      (q.options || []).forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => selectOption(btn, idx));
        qcmOptions.appendChild(btn);
      });
    }
    if (libreInput) libreInput.style.display = 'none';
  } else {
    if (qcmOptions) qcmOptions.style.display = 'none';
    if (libreInput) libreInput.style.display = 'block';
    if (answerInput) {
      answerInput.value = '';
      answerInput.focus();
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// 6. SÉLECTION QCM — Mémorise l'index et met en surbrillance
// ═══════════════════════════════════════════════════════════════════

function selectOption(btn, idx) {
  gameState.selectedOption = idx;
  const qcmOptions = document.getElementById('qcmOptions');
  if (qcmOptions) {
    qcmOptions.querySelectorAll('.option-btn').forEach(b => {
      b.classList.remove('selected');
    });
  }
  btn.classList.add('selected');
}

// ═══════════════════════════════════════════════════════════════════
// 7. VALIDATION — Compare la réponse, affiche le feedback, score
// ═══════════════════════════════════════════════════════════════════

function validateAnswer() {
  const q = gameState.questions[gameState.currentQuestionIndex];
  if (!q) return;

  let userAnswer = '';
  let isCorrect = false;

  if (q.type === 'qcm' || q.options) {
    if (gameState.selectedOption === null) {
      if (typeof showToast === 'function') showToast('Please select an answer');
      return;
    }
    userAnswer = q.options[gameState.selectedOption];
    isCorrect = gameState.selectedOption === q.correctIndex;
  } else {
    const answerInput = document.getElementById('answerInput');
    userAnswer = answerInput ? answerInput.value : '';
    if (typeof normalizeForMatch === 'function') {
      isCorrect = normalizeForMatch(userAnswer) === normalizeForMatch(q.correct);
    } else {
      isCorrect = userAnswer.trim().toLowerCase() === (q.correct || '').trim().toLowerCase();
    }
  }

  gameState.answers.push({
    question: q.question,
    userAnswer: userAnswer,
    correct: isCorrect,
    correctAnswer: q.type === 'qcm' ? q.options[q.correctIndex] : q.correct
  });

  if (isCorrect) {
    gameState.score += 10;
  } else {
    trackError(q, userAnswer);
  }

  showFeedback(isCorrect, q);

  const validateBtn = document.getElementById('validateBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (validateBtn) validateBtn.style.display = 'none';
  if (nextBtn) nextBtn.style.display = 'inline-flex';

  saveActiveSession();
}

// ═══════════════════════════════════════════════════════════════════
// 8. FEEDBACK — Couleur, texte et explication post-validation
// ═══════════════════════════════════════════════════════════════════

function showFeedback(isCorrect, q) {
  const feedbackArea = document.getElementById('feedbackArea');
  const feedbackTitle = document.getElementById('feedbackTitle');
  const feedbackCorrect = document.getElementById('feedbackCorrect');
  const feedbackExplanation = document.getElementById('feedbackExplanation');

  if (!feedbackArea) return;

  feedbackArea.style.display = 'block';
  feedbackArea.className = 'feedback-area ' + (isCorrect ? 'feedback-success' : 'feedback-error');

  if (feedbackTitle) feedbackTitle.textContent = isCorrect ? 'Correct!' : 'Wrong';
  if (feedbackCorrect) {
    feedbackCorrect.textContent = 'Answer: ' + (q.type === 'qcm' ? q.options[q.correctIndex] : q.correct);
  }
  if (feedbackExplanation) feedbackExplanation.textContent = q.explanation || '';

  const scoreDisplay = document.getElementById('scoreDisplay');
  if (scoreDisplay) scoreDisplay.textContent = gameState.score + ' pts';
}

// ═══════════════════════════════════════════════════════════════════
// 9. TRACKING ERREURS — Stockage dans le profil joueur (max 50)
// ═══════════════════════════════════════════════════════════════════

function trackError(q, userAnswer) {
  const currentName = (typeof PlayerManager !== 'undefined')
    ? PlayerManager.getCurrent()
    : gameState.currentPlayer;
  if (!currentName) return;

  const players = (typeof getPlayers === 'function') ? getPlayers() : {};
  const p = players[currentName];
  if (!p) return;

  if (!p.errorHistory) p.errorHistory = [];
  p.errorHistory.unshift({
    question: q.question,
    yourAnswer: userAnswer,
    correctAnswer: q.type === 'qcm' ? q.options[q.correctIndex] : q.correct,
    level: gameState.currentLevel,
    date: new Date().toISOString()
  });
  if (p.errorHistory.length > 50) p.errorHistory = p.errorHistory.slice(0, 50);

  if (typeof savePlayers === 'function') savePlayers(players);
}

// ═══════════════════════════════════════════════════════════════════
// 10. SAUVEGARDE SESSION ACTIVE — Récupération possible si crash
// ═══════════════════════════════════════════════════════════════════

function saveActiveSession() {
  const currentName = (typeof PlayerManager !== 'undefined')
    ? PlayerManager.getCurrent()
    : gameState.currentPlayer;
  if (!currentName) return;

  const players = (typeof getPlayers === 'function') ? getPlayers() : {};
  const p = players[currentName];
  if (!p) return;

  p.activeSession = {
    level: gameState.currentLevel,
    mode: gameState.currentMode,
    questionIndex: gameState.currentQuestionIndex,
    score: gameState.score,
    answers: gameState.answers,
    savedAt: new Date().toISOString()
  };

  if (typeof savePlayers === 'function') savePlayers(players);
}

// ═══════════════════════════════════════════════════════════════════
// 11. QUESTION SUIVANTE — Incrémente ou termine le niveau
// ═══════════════════════════════════════════════════════════════════

function nextQuestion() {
  gameState.currentQuestionIndex++;
  if (gameState.currentQuestionIndex >= gameState.questions.length) {
    showResults();
  } else {
    renderQuestion();
  }
}

// ═══════════════════════════════════════════════════════════════════
// 12. RÉSULTATS — Pourcentage, message, mise à jour profil, déblocage
// ═══════════════════════════════════════════════════════════════════

function showResults() {
  showSection('resultats');

  const total = gameState.questions.length;
  const correctCount = gameState.answers.filter(a => a.correct).length;
  const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  const resultPct = document.getElementById('resultPct');
  const resultMsg = document.getElementById('resultMsg');
  const nextLevelBtn = document.getElementById('nextLevelBtn');

  if (resultPct) resultPct.textContent = pct + '%';
  if (resultMsg) {
    if (pct >= 80) {
      resultMsg.textContent = 'Excellent! Level unlocked!';
      if (nextLevelBtn) nextLevelBtn.style.display = 'inline-flex';
    } else if (pct >= 50) {
      resultMsg.textContent = 'Not bad! Keep practising.';
      if (nextLevelBtn) nextLevelBtn.style.display = 'none';
    } else {
      resultMsg.textContent = 'Keep going! Read the lesson again.';
      if (nextLevelBtn) nextLevelBtn.style.display = 'none';
    }
  }

  const currentName = (typeof PlayerManager !== 'undefined')
    ? PlayerManager.getCurrent()
    : gameState.currentPlayer;
  if (!currentName) return;

  const players = (typeof getPlayers === 'function') ? getPlayers() : {};
  const p = players[currentName];
  if (!p) return;

  p.score = (p.score || 0) + gameState.score;
  p.totalQuestions = (p.totalQuestions || 0) + total;
  p.totalCorrect = (p.totalCorrect || 0) + correctCount;

  if (pct >= 80) {
    p.streak = (p.streak || 0) + 1;
    if (!p.completed.includes(gameState.currentLevel)) {
      p.completed.push(gameState.currentLevel);
    }
    if (p.currentLevel <= gameState.currentLevel) {
      p.currentLevel = Math.min((SUBJECT_CONFIG?.maxLevel || 20), gameState.currentLevel + 1);
    }
  } else {
    p.streak = 0;
  }

  p.lastPlayed = new Date().toISOString();

  if (!p.sessionHistory) p.sessionHistory = [];
  p.sessionHistory.push({
    level: gameState.currentLevel,
    score: gameState.score,
    total: total,
    correct: correctCount,
    pct: pct,
    date: new Date().toISOString()
  });
  if (p.sessionHistory.length > 50) p.sessionHistory = p.sessionHistory.slice(-50);

  p.activeSession = null;

  if (typeof savePlayers === 'function') savePlayers(players);
  if (typeof loadPlayer === 'function') loadPlayer(currentName);
}

// ═══════════════════════════════════════════════════════════════════
// 13. ACTIONS POST-RÉSULTATS — Réessayer, niveau suivant, quitter
// ═══════════════════════════════════════════════════════════════════

function retryLevel() {
  startLevel(gameState.currentLevel);
}

function startNextLevel() {
  const next = gameState.currentLevel + 1;
  const max = SUBJECT_CONFIG?.maxLevel || 20;
  if (next <= max) {
    startLevel(next);
  } else {
    if (typeof showToast === 'function') showToast('All levels completed!');
    showSection('home');
  }
}

function quitGame() {
  const currentName = (typeof PlayerManager !== 'undefined')
    ? PlayerManager.getCurrent()
    : gameState.currentPlayer;
  if (currentName) {
    const players = (typeof getPlayers === 'function') ? getPlayers() : {};
    if (players[currentName]) {
      players[currentName].activeSession = null;
      if (typeof savePlayers === 'function') savePlayers(players);
    }
  }
  showSection('home');
}

// ═══════════════════════════════════════════════════════════════════
// 14. STUBS EXTENSIBILITÉ — Audio et reconnaissance vocale
// ═══════════════════════════════════════════════════════════════════

function playQuestionAudio() {
  console.log('[Audio] play question');
}

function startSpeechCheck() {
  console.log('[Speech] start check');
}

// ═══════════════════════════════════════════════════════════════════
// 15. UTILITAIRE — Chaîne URL-friendly
// ═══════════════════════════════════════════════════════════════════

function slugify(str) {
  if (!str) return '';
  return str.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ═══════════════════════════════════════════════════════════════════
// 16. ATTACHEMENT DES ÉCOUTEURS — Au chargement du DOM
// ═══════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  const validateBtn = document.getElementById('validateBtn');
  if (validateBtn) validateBtn.addEventListener('click', validateAnswer);

  const nextBtn = document.getElementById('nextBtn');
  if (nextBtn) nextBtn.addEventListener('click', nextQuestion);

  const retryBtn = document.getElementById('retryBtn');
  if (retryBtn) retryBtn.addEventListener('click', retryLevel);

  const nextLevelBtn = document.getElementById('nextLevelBtn');
  if (nextLevelBtn) nextLevelBtn.addEventListener('click', startNextLevel);

  const quitBtn = document.getElementById('quitBtn');
  if (quitBtn) quitBtn.addEventListener('click', quitGame);

  const answerInput = document.getElementById('answerInput');
  if (answerInput) {
    answerInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') validateAnswer();
    });
  }
});
