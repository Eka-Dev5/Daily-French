// ═══════════════════════════════════════════════════════════════════
// GAME ENGINE — Daily French 🥖
// Quiz logic only — players: players.js | ui: ui-utils.js
// ═══════════════════════════════════════════════════════════════════

let gameState = {
  currentPlayer: null,
  currentLevel: 1,
  currentMode: "mixte",
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  answers: [],
  selectedOption: null
};

// ── NAVIGATION ────────────────────────────────────────────────────
function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
  if (id === "levels") renderLevels();
  if (id === "home") updatePlayerDisplay();
  if (id === "lecons") renderLessons();
}

// ── LEÇONS ────────────────────────────────────────────────────────
function renderLessons() {
  const c = document.getElementById("lessonsContainer");
  if (!c) return;
  c.innerHTML = LESSONS_DATA.map(l => `
    <div class="lesson-card" onclick="toggleLesson(${l.num})">
      <div class="lesson-header">
        <div class="lesson-title">📘 Level ${l.num} — ${l.title}
          ${QUESTIONS_DB[l.num] ? `<span style="display:block;font-size:.78em;color:#718096;font-weight:normal;margin-top:2px">🎯 ${QUESTIONS_DB[l.num].objective}</span>` : ""}
        </div>
        <span class="lesson-tag" id="lessonTag${l.num}">▼ open</span>
      </div>
      <div class="lesson-body" id="lessonBody${l.num}">${l.content}</div>
    </div>`).join("");
}

function toggleLesson(num) {
  const body = document.getElementById("lessonBody" + num);
  const tag  = document.getElementById("lessonTag" + num);
  if (!body) return;
  const open = body.classList.contains("open");
  body.classList.toggle("open", !open);
  body.parentElement.classList.toggle("open", !open);
  tag.textContent = open ? "▼ open" : "▲ close";
  if (!open && typeof highlightVocabularyWords === "function") highlightLessonsContent();
}

// ── NIVEAUX ───────────────────────────────────────────────────────
function selectMode(mode) {
  gameState.currentMode = mode;
  document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("selected"));
  const btn = document.getElementById("btn" + mode.charAt(0).toUpperCase() + mode.slice(1));
  if (btn) btn.classList.add("selected");
}

function renderLevels() {
  const c = document.getElementById("levelsContainer");
  if (!c) return;
  const players  = getPlayers();
  const p        = gameState.currentPlayer ? players[gameState.currentPlayer] : null;
  const current  = p ? p.currentLevel : 1;
  const done     = p ? (p.completed || []) : [];
  const maxLevel = SUBJECT_CONFIG.maxLevel || 20;
  let h = "";
  for (let i = 1; i <= maxLevel; i++) {
    const lv = QUESTIONS_DB[i];
    if (!lv) continue;
    const locked  = i > current && !done.includes(i);
    const isDone  = done.includes(i);
    const isCur   = i === current;
    let cls = "level-card";
    let icon = "▶️";
    if (locked)  { cls += " locked";    icon = "🔒"; }
    else if (isDone) { cls += " completed"; icon = "✅"; }
    else if (isCur)  { cls += " current";   icon = "🎯"; }
    const lesson = LESSONS_DATA.find(l => l.num === i);
    h += `<div class="${cls}" onclick="${locked ? "" : "startLevel(" + i + ")"}">
      <div class="level-header"><span class="level-number">Level ${i}</span><span>${icon}</span></div>
      <div class="level-title">${lv.title}${lesson ? `<span style="display:block;font-size:.78em;color:var(--primary);font-style:italic;font-weight:normal;margin-top:2px">— ${lesson.title}</span>` : ""}</div>
      <div class="level-obj">${lv.objective}</div>
      <div style="font-size:.75em;color:#718096;margin-top:8px">${isDone ? "✅ Completed" : locked ? "🔒 Locked" : "▶️ Available"}</div>
      ${lv.hint ? `<div style="font-size:.72em;color:var(--secondary);margin-top:4px;font-style:italic">💡 ${lv.hint}</div>` : ""}
    </div>`;
  }
  c.innerHTML = h;
}

// ── JEU — DÉMARRAGE ───────────────────────────────────────────────
function startLevel(levelNum) {
  if (!gameState.currentPlayer) {
    const names = Object.keys(getPlayers());
    if (names.length > 0) switchPlayer(names[0]);
    else { showToast("Please create a player first!"); return; }
  }
  gameState.currentLevel = levelNum;
  const players = getPlayers();
  const p = players[gameState.currentPlayer];

  // Reprendre session en cours ?
  if (p && p.activeSession && p.activeSession.level === levelNum &&
      p.activeSession.answers && p.activeSession.answers.length > 0) {
    if (confirm("Continue where you left off? (" + p.activeSession.answers.length + "/" + p.activeSession.questions.length + " done)")) {
      gameState.questions            = p.activeSession.questions;
      gameState.currentQuestionIndex = p.activeSession.currentQuestionIndex;
      gameState.answers              = p.activeSession.answers;
      gameState.selectedOption       = null;
      document.getElementById("gameTitle").textContent = "Level " + levelNum + " — " + QUESTIONS_DB[levelNum].title;
      showSection("jeu");
      renderQuestion();
      return;
    }
  }

  gameState.currentQuestionIndex = 0;
  gameState.answers = [];
  gameState.selectedOption = null;

  const lv = QUESTIONS_DB[levelNum];
  const allQcm   = lv.qcm.map(q  => ({...q,  type:"qcm"}));
  const allLibre = lv.libre.map(q => ({...q, type:"libre"}));
  const mode = gameState.currentMode;
  if      (mode === "qcm")   gameState.questions = shuffle(allQcm).slice(0, 10);
  else if (mode === "libre") gameState.questions = shuffle(allLibre).slice(0, 10);
  else                       gameState.questions = shuffle([...shuffle(allQcm).slice(0,5), ...shuffle(allLibre).slice(0,5)]);

  document.getElementById("gameTitle").textContent = "Level " + levelNum + " — " + lv.title;
  showSection("jeu");
  showLessonIntro(levelNum);
}

function showLessonIntro(levelNum) {
  const lv     = QUESTIONS_DB[levelNum];
  const lesson = LESSONS_DATA.find(l => l.num === levelNum);
  const set    = (id,v) => { const el=document.getElementById(id); if(el) el.textContent=v; };
  set("questionCounter","📚 Lesson");
  set("scoreDisplay","");
  document.getElementById("progressFill").style.width = "0%";
  document.querySelector(".question-box").style.display = "none";
  document.querySelector(".game-actions").style.display = "none";
  const intro = document.getElementById("lessonIntro");
  intro.style.display = "block";
  set("lessonIntroTitle", lesson ? lesson.title : lv.title);
  set("lessonIntroObj", lv.objective);
  const contentDiv = document.getElementById("lessonIntroContent");
  contentDiv.innerHTML = lesson ? lesson.content : "<p>" + lv.objective + "</p>";
  const vocabLink = document.getElementById("lessonIntroVocabulary");
  if (vocabLink) vocabLink.href = SUBJECT_CONFIG.vocabularyFile + "?level=" + levelNum;
  if (typeof highlightLessonsContent === "function") highlightLessonsContent();
}

function startQuestions() {
  document.getElementById("lessonIntro").style.display = "none";
  document.querySelector(".question-box").style.display = "block";
  document.querySelector(".game-actions").style.display = "flex";
  renderQuestion();
}

function shuffle(a) {
  const arr = [...a];
  for (let i = arr.length-1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ── QUESTIONS ─────────────────────────────────────────────────────
function renderQuestion() {
  const q     = gameState.questions[gameState.currentQuestionIndex];
  const total = gameState.questions.length;
  const idx   = gameState.currentQuestionIndex;
  const set   = (id,v) => { const el=document.getElementById(id); if(el) el.textContent=v; };
  set("questionCounter","Q"+(idx+1)+"/"+total);
  set("scoreDisplay", gameState.answers.filter(a=>a.isCorrect).length+" ✓");
  document.getElementById("progressFill").style.width = (idx/total*100)+"%";
  set("questionNum",(idx+1)+". "+q.type.toUpperCase());
  const qText = document.getElementById("questionText");
  qText.innerHTML = (typeof highlightVocabularyWords==="function") ? highlightVocabularyWords(q.q) : q.q;
  document.getElementById("feedback").style.display = "none";
  document.getElementById("feedback").className = "feedback";
  document.getElementById("validateBtn").style.display = "inline-block";
  document.getElementById("nextBtn").style.display = "none";
  gameState.selectedOption = null;

  const hintBox = document.getElementById("hintBox");
  if (hintBox) { hintBox.style.display = q.hint ? "block" : "none"; if(q.hint) hintBox.textContent = "💡 "+q.hint; }

  if (q.type === "qcm") {
    document.getElementById("qcmOptions").style.display = "grid";
    document.getElementById("libreInput").style.display = "none";
    document.getElementById("qcmOptions").innerHTML =
      q.options.map((opt,i) => `<button class="option-btn" onclick="selectOption(this,${i})"> ${opt}</button>`).join("");
  } else {
    document.getElementById("qcmOptions").style.display = "none";
    document.getElementById("libreInput").style.display = "block";
    const inp = document.getElementById("answerInput");
    inp.value=""; inp.className="answer-input"; inp.disabled=false;
    inp.autocapitalize="none"; inp.autocorrect="off";
    setTimeout(()=>inp.focus(), 100);
  }
}

function selectOption(btn, idx) {
  document.querySelectorAll(".option-btn").forEach(b=>b.classList.remove("selected"));
  btn.classList.add("selected");
  gameState.selectedOption = idx;
}

function validateAnswer() {
  const q = gameState.questions[gameState.currentQuestionIndex];
  let isCorrect=false, userAnswer="";

  if (q.type === "qcm") {
    if (gameState.selectedOption === null || gameState.selectedOption === undefined) { showToast("Please choose an answer!"); return; }
    userAnswer = q.options[gameState.selectedOption];
    isCorrect  = userAnswer === q.correct;
    document.querySelectorAll(".option-btn").forEach((btn,i)=>{
      btn.disabled=true;
      if (q.options[i]===q.correct) btn.classList.add("correct");
      else if (i===gameState.selectedOption && !isCorrect) btn.classList.add("wrong");
    });
  } else {
    const inp = document.getElementById("answerInput");
    userAnswer = inp.value.trim();
    if (!userAnswer) { showToast("Please write your answer!"); return; }
    const clean = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[.,;:!?''\u2019]/g,"").replace(/\s+/g," ").trim();
    isCorrect = clean(userAnswer)===clean(q.answer);
    if (!isCorrect && q.alternatives) isCorrect = q.alternatives.some(a=>clean(userAnswer)===clean(a));
    inp.disabled=true;
    inp.className="answer-input "+(isCorrect?"correct":"wrong");
  }

  // Feedback
  const fb = document.getElementById("feedback");
  fb.style.display="block";
  fb.className="feedback show "+(isCorrect?"correct-fb":"wrong-fb");
  document.getElementById("feedbackTitle").textContent = isCorrect ? "✅ Correct!" : "❌ Not quite…";
  document.getElementById("feedbackCorrect").textContent = isCorrect ? "" : "Correct answer: "+(q.correct||q.answer);
  const vocabUrl = SUBJECT_CONFIG.vocabularyFile+"?level="+gameState.currentLevel;
  document.getElementById("feedbackExplanation").innerHTML =
    (q.explanation||"") + `<br><br><a href="${vocabUrl}" target="_blank" style="color:var(--primary);font-size:.9em;font-weight:bold;text-decoration:none;border-bottom:1px dashed var(--primary)">📖 Level ${gameState.currentLevel} vocabulary</a>`;

  // Stats joueur
  gameState.answers.push({question:q.q, userAnswer, correct:q.correct||q.answer, isCorrect, explanation:q.explanation});
  if (isCorrect) gameState.score += 10;
  else trackError(q, userAnswer);

  const players = getPlayers();
  if (gameState.currentPlayer && players[gameState.currentPlayer]) {
    const pp = players[gameState.currentPlayer];
    pp.totalQuestions = (pp.totalQuestions||0)+1;
    if (isCorrect) { pp.totalCorrect=(pp.totalCorrect||0)+1; pp.streak=(pp.streak||0)+1; }
    else pp.streak=0;
    savePlayers(players);
  }

  document.getElementById("validateBtn").style.display="none";
  document.getElementById("nextBtn").style.display="inline-block";
  document.getElementById("nextBtn").textContent =
    gameState.currentQuestionIndex===gameState.questions.length-1 ? "See results →" : "Next →";
  saveActiveSession();
}

function trackError(question, userAnswer) {
  if (!gameState.currentPlayer) return;
  const players = getPlayers();
  const p = players[gameState.currentPlayer];
  if (!p.errorHistory) p.errorHistory=[];
  p.errorHistory.push({
    question: question.q,
    userAnswer,
    correctAnswer: question.correct||question.answer,
    explanation:   question.explanation||"",
    date:  new Date().toISOString(),
    level: gameState.currentLevel
  });
  if (p.errorHistory.length>50) p.errorHistory=p.errorHistory.slice(-50);
  savePlayers(players);
}

function saveActiveSession() {
  if (!gameState.currentPlayer) return;
  const players = getPlayers();
  const p = players[gameState.currentPlayer];
  p.activeSession = {
    level:                gameState.currentLevel,
    questions:            gameState.questions,
    currentQuestionIndex: gameState.currentQuestionIndex,
    answers:              gameState.answers,
    mode:                 gameState.currentMode,
    date:                 new Date().toISOString()
  };
  savePlayers(players);
}

function nextQuestion() {
  if (gameState.currentQuestionIndex >= gameState.questions.length-1) showResults();
  else { gameState.currentQuestionIndex++; renderQuestion(); }
}

// ── RÉSULTATS ─────────────────────────────────────────────────────
function showResults() {
  const total   = gameState.questions.length;
  const correct = gameState.answers.filter(a=>a.isCorrect).length;
  const pct     = Math.round(correct/total*100);
  const maxLevel= SUBJECT_CONFIG.maxLevel||20;

  document.getElementById("resultPct").textContent = pct+"%";
  document.getElementById("resultMsg").textContent =
    (pct>=80 ? "🎉 Excellent! Level unlocked!" : pct>=50 ? "👍 Not bad! Keep practising." : "💪 Keep going! Read the lesson again.")
    + " ("+correct+"/"+total+")";

  const players = getPlayers();
  const p = players[gameState.currentPlayer];
  if (p) {
    if (!p.sessionHistory) p.sessionHistory=[];
    p.sessionHistory.push({
      date:       new Date().toISOString(),
      level:      gameState.currentLevel,
      levelTitle: QUESTIONS_DB[gameState.currentLevel].title,
      correct, total, pct, passed:pct>=80,
      mode: gameState.currentMode
    });
    if (p.sessionHistory.length>50) p.sessionHistory=p.sessionHistory.slice(-50);
    p.activeSession=null;
    p.lastPlayed=new Date().toISOString();
    if (pct>=80) {
      if (!p.completed.includes(gameState.currentLevel)) p.completed.push(gameState.currentLevel);
      if (p.currentLevel<=gameState.currentLevel && gameState.currentLevel<maxLevel)
        p.currentLevel=gameState.currentLevel+1;
      p.score=(p.score||0)+correct*10;
    }
    savePlayers(players);
  }
  document.getElementById("nextLevelBtn").style.display = pct>=80 ? "inline-block" : "none";
  updatePlayerDisplay();
  showSection("resultats");
}

function retryLevel()    { startLevel(gameState.currentLevel); }
function startNextLevel() {
  const p = getPlayers()[gameState.currentPlayer];
  const next = p ? p.currentLevel : 1;
  if (next <= (SUBJECT_CONFIG.maxLevel||20)) startLevel(next);
  else showToast("Congratulations! All levels completed! 🏆");
}
function quitGame() {
  if (confirm("Quit? Your progress is saved.")) { saveActiveSession(); showSection("levels"); }
}

// ── VOICE ─────────────────────────────────────────────────────────
function playQuestionAudio() {
  const q = gameState.questions[gameState.currentQuestionIndex];
  if (!q) return;
  // Fallback TTS natif
  if ('speechSynthesis' in window) {
    const text = q.q.replace(/<[^>]*>/g,"");
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'fr-FR'; u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }
}

function startSpeechCheck() {
  const q      = gameState.questions[gameState.currentQuestionIndex];
  const target = q.correct || q.answer;
  if (!target) return;
  const btn    = document.getElementById("btnSpeak");
  const result = document.getElementById("speechResult");
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    result.textContent = "Speech recognition not supported in this browser."; return;
  }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new SR();
  rec.lang="fr-FR"; rec.interimResults=false; rec.maxAlternatives=1;
  btn.classList.add("listening"); btn.disabled=true; btn.innerHTML="🎤 Listening…";
  result.textContent="";
  rec.onresult = function(e) {
    const said  = e.results[0][0].transcript.trim().toLowerCase();
    const clean = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[.,;:!?]/g,"").trim();
    const match = clean(said)===clean(target);
    result.textContent = match ? '✅ Perfect: "'+said+'"' : '❌ You said: "'+said+'" — Expected: "'+target+'"';
    result.className = match ? "speech-result success" : "speech-result error";
    btn.classList.remove("listening"); btn.disabled=false; btn.innerHTML="🎤 Speak";
  };
  rec.onerror = function(e) {
    result.textContent="❌ Error: "+e.error;
    btn.classList.remove("listening"); btn.disabled=false; btn.innerHTML="🎤 Speak";
  };
  rec.start();
}

function slugify(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").substring(0,40);
}

// ── INIT ──────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function() {
  updatePlayerDisplay();
  renderLevels();

  // Auto-select premier joueur
  const players = getPlayers();
  const names   = Object.keys(players);
  if (names.length===1 && !gameState.currentPlayer) switchPlayer(names[0]);

  // URL params
  const params  = new URLSearchParams(window.location.search);

  // ?level=N → lance directement ce niveau
  const lvlParam = params.get("level");
  if (lvlParam) {
    const lvl = parseInt(lvlParam);
    if (lvl>=1 && lvl<=(SUBJECT_CONFIG.maxLevel||20)) {
      showSection("levels");
      setTimeout(()=>startLevel(lvl), 300);
      return;
    }
  }

  // ?section=X → affiche la section
  const secParam = params.get("section");
  const validSections = ["home","lecons","levels","jeu","resultats"];
  if (secParam && validSections.includes(secParam)) {
    showSection(secParam);
    return;
  }

  showSection("home");

  // Listeners clavier
  const answerInput = document.getElementById("answerInput");
  if (answerInput) {
    answerInput.addEventListener("keypress", function(e) {
      if (e.key==="Enter") {
        const next = document.getElementById("nextBtn");
        const val  = document.getElementById("validateBtn");
        if (next && next.style.display!=="none") nextQuestion();
        else if (val) validateAnswer();
      }
    });
  }
});
