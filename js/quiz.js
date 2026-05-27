// ═══════════════════════════════════════════════════════════════════
// DAILY FRENCH — Quiz Engine
// Compatible dashboard.html (clé dailyFrench_players)
// ═══════════════════════════════════════════════════════════════════

const PK = "dailyFrench_players";
const GK = "dailyFrench_genius";

const LN = {
  1:"Greetings 🙋", 2:"Market 🛒", 3:"Garden 🌿", 4:"Neighbours 🏘️",
  5:"Tastes ❤️", 6:"Shops 🏬", 7:"Friends 👫", 8:"Weather 🌤️",
  9:"Verbs ⚡", 10:"Politeness 🎩", 11:"Daily life 🇫🇷", 12:"Routine 🌅",
  13:"Emotions ❤️", 14:"Needs 🍽️", 15:"House 🏡", 16:"Family 👨‍👩‍👧",
  17:"Plans 📅", 18:"Health 💊", 19:"Cooking 🍳", 20:"Living French 🗣️"
};

// ═══════════════════════════════════════════════════════════════════
// UTILITAIRES
// ═══════════════════════════════════════════════════════════════════

function normalizeAnswer(str){
  if(!str || typeof str !== 'string') return '';
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[.,!?'"«»""''\-–—]/g,'').replace(/\s+/g,' ').trim();
}

function gP(){ try{return JSON.parse(localStorage.getItem(PK))||{};}catch{return {}} }
function sP(d){ localStorage.setItem(PK, JSON.stringify(d)); }
function toast(m){
  const t=document.getElementById("toast");
  t.textContent=m; t.classList.add("on");
  setTimeout(()=>t.classList.remove("on"),3000);
}

// ═══════════════════════════════════════════════════════════════════
// ÉTAT JEU
// ═══════════════════════════════════════════════════════════════════

let gameState = {
  currentPlayer:null, currentLevel:1, currentMode:"mixte",
  questions:[], currentQuestionIndex:0, score:0, answers:[], selectedOption:null
};

// ═══════════════════════════════════════════════════════════════════
// JOUEURS
// ═══════════════════════════════════════════════════════════════════

function fillSelect(active){
  const s=document.getElementById("selPlayer");
  const p=gP();
  s.innerHTML="<option value=''>— Choose a player —</option>";
  Object.keys(p).forEach(n=>{
    const o=document.createElement("option");
    o.value=n; o.textContent=n+" (Lvl."+(p[n].currentLevel||1)+")";
    if(n===active) o.selected=true;
    s.appendChild(o);
  });
}

function loadPlayer(name){
  if(!name) return;
  fillSelect(name);
  const p=gP()[name];
  if(!p) return;
  gameState.currentPlayer=name;
  renderHero(p);
  renderBento(p);
}

function renderHero(p){
  const done=p.completed||[];
  const score=p.score||0;
  const lvl=p.currentLevel||1;
  document.getElementById("heroAv").innerHTML=
    p.name.charAt(0).toUpperCase()+
    '<span class="hero-lvl-badge" id="heroLvl">'+lvl+'</span>';
  document.getElementById("heroName").textContent=p.name;
  document.getElementById("heroTag").textContent=
    "Level "+lvl+" · "+score+" pts · "+done.length+"/20 done";
  const ms=Math.ceil(score/100)*100;
  const pct=Math.round(score%100);
  document.getElementById("xpNow").textContent=score+" pts";
  document.getElementById("xpGoal").textContent="Next: "+ms+" pts";
  document.getElementById("xpBar").style.width=pct+"%";
  document.getElementById("p_streak").textContent=p.streak||0;
  const acc=p.totalQuestions>0
    ? Math.round(p.totalCorrect/p.totalQuestions*100)+"%"
    : "—";
  document.getElementById("p_acc").textContent=acc;
  document.getElementById("p_sess").textContent=(p.sessionHistory||[]).length;
}

function renderBento(p){
  document.getElementById("b1").textContent=p.currentLevel||1;
  document.getElementById("b2").textContent=p.score||0;
  document.getElementById("b3").textContent=(p.completed||[]).length+"/20";
}

function openModal(){
  document.getElementById("modalWrap").classList.add("open");
  const i=document.getElementById("mInput");
  i.value=""; setTimeout(()=>i.focus(),80);
}
function closeModal(){ document.getElementById("modalWrap").classList.remove("open"); }

function doCreate(){
  const n=document.getElementById("mInput").value.trim();
  if(!n) return;
  const p=gP();
  if(p[n]){ toast("Player already exists!"); return; }
  p[n]={
    name:n, currentLevel:1, score:0, completed:[],
    totalQuestions:0, totalCorrect:0, streak:0,
    lastPlayed:null, errorHistory:[], sessionHistory:[], activeSession:null
  };
  sP(p); closeModal(); loadPlayer(n);
  toast("Welcome, "+n+"! 🎉");
}

// ═══════════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════════

function showSection(id){
  document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  if(id==="levels") renderLevels();
}

// ═══════════════════════════════════════════════════════════════════
// MODE
// ═══════════════════════════════════════════════════════════════════

function selectMode(mode){
  gameState.currentMode=mode;
  document.querySelectorAll(".mode-btn").forEach(b=>b.classList.remove("selected"));
  document.getElementById("btn"+mode.charAt(0).toUpperCase()+mode.slice(1)).classList.add("selected");
}

// ═══════════════════════════════════════════════════════════════════
// NIVEAUX
// ═══════════════════════════════════════════════════════════════════

function renderLevels(){
  const c=document.getElementById("levelsGrid");
  const players=gP();
  const p=gameState.currentPlayer?players[gameState.currentPlayer]:null;
  const cur=p?p.currentLevel:1;
  const done=p?p.completed||[]:[];
  let h="";
  for(let lv=1; lv<=20; lv++){
    const isDone=done.includes(lv);
    const isCur=lv===cur;
    const isLk=!isDone&&!isCur&&lv>cur;
    let cls="level-card";
    if(isDone) cls+=" done";
    else if(isCur) cls+=" current";
    else if(isLk) cls+=" locked";
    const oc=isLk?"":'onclick="startLevel('+lv+')"';
    const st=isDone?"✅ Completed":isCur?"🎯 Current":"🔒 Locked";
    h+='<div class="'+cls+'" '+oc+'>'+
      '<div class="level-header">'+
        '<span class="level-num">Level '+lv+'</span>'+
        '<span>'+(isDone?"✓":isCur?"▶":"🔒")+'</span>'+
      '</div>'+
      '<div class="level-title">'+LN[lv]+'</div>'+
      '<div class="level-obj">'+(QUESTIONS_DB[lv]?QUESTIONS_DB[lv].objective:"")+'</div>'+
      '<div class="level-status">'+st+'</div>'+
    '</div>';
  }
  c.innerHTML=h;
}

// ═══════════════════════════════════════════════════════════════════
// DÉMARRER NIVEAU
// ═══════════════════════════════════════════════════════════════════

function startLevel(lv){
  if(!gameState.currentPlayer){
    const players=gP();
    const names=Object.keys(players);
    if(names.length>0){ loadPlayer(names[0]); }
    else { toast("Create a player first!"); openModal(); return; }
  }
  gameState.currentLevel=lv;
  gameState.currentQuestionIndex=0;
  gameState.answers=[];
  gameState.selectedOption=null;
  const db=QUESTIONS_DB[lv];
  if(!db){ toast("Level not ready yet!"); return; }
  const allQcm=(db.qcm||[]).map(q=>({...q,type:"qcm"}));
  const allLibre=(db.libre||[]).map(q=>({...q,type:"libre"}));
  const mode=gameState.currentMode;
  if(mode==="qcm") gameState.questions=shuffle(allQcm).slice(0,10);
  else if(mode==="libre") gameState.questions=shuffle(allLibre).slice(0,10);
  else gameState.questions=shuffle([...shuffle(allQcm).slice(0,5),...shuffle(allLibre).slice(0,5)]);
  document.getElementById("gameTitle").textContent="Level "+lv+": "+LN[lv];
  showSection("game");
  renderQuestion();
}

function shuffle(a){
  const arr=[...a];
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

// ═══════════════════════════════════════════════════════════════════
// QUESTION
// ═══════════════════════════════════════════════════════════════════

function renderQuestion(){
  const q=gameState.questions[gameState.currentQuestionIndex];
  const total=gameState.questions.length;
  const idx=gameState.currentQuestionIndex;
  document.getElementById("qCounter").textContent="Q"+(idx+1)+"/"+total;
  document.getElementById("qScore").textContent=gameState.answers.filter(a=>a.isCorrect).length+" ✓";
  document.getElementById("qProgress").style.width=(idx/total*100)+"%";
  document.getElementById("qNum").textContent=(idx+1)+". "+(q.type==="qcm"?"Multiple Choice":"Written");
  document.getElementById("qText").textContent=q.q;
  const fb=document.getElementById("feedback");
  fb.style.display="none"; fb.className="feedback";
  document.getElementById("validateBtn").style.display="inline-flex";
  document.getElementById("nextBtn").style.display="none";
  gameState.selectedOption=null;
  if(q.hint){
    document.getElementById("hintBox").style.display="block";
    document.getElementById("hintBox").textContent="💡 "+q.hint;
  } else {
    document.getElementById("hintBox").style.display="none";
  }
  if(q.type==="qcm"){
    document.getElementById("qcmGrid").style.display="grid";
    document.getElementById("libreBox").style.display="none";
    const g=document.getElementById("qcmGrid");
    g.innerHTML=q.options.map((opt,i)=>
      '<button class="option-btn" onclick="selectOption(this,'+i+')">'+opt+'</button>'
    ).join("");
  } else {
    document.getElementById("qcmGrid").style.display="none";
    document.getElementById("libreBox").style.display="block";
    const inp=document.getElementById("answerInput");
    inp.value=""; inp.className="answer-input"; inp.disabled=false;
    setTimeout(()=>inp.focus(),100);
  }
}

function selectOption(btn,idx){
  document.querySelectorAll(".option-btn").forEach(b=>b.classList.remove("selected"));
  btn.classList.add("selected");
  gameState.selectedOption=idx;
}

// ═══════════════════════════════════════════════════════════════════
// VALIDER
// ═══════════════════════════════════════════════════════════════════

function validateAnswer(){
  const q=gameState.questions[gameState.currentQuestionIndex];
  let isCorrect=false; let userAns="";
  if(q.type==="qcm"){
    if(gameState.selectedOption===null){ toast("Choose an answer!"); return; }
    userAns=q.options[gameState.selectedOption];
    isCorrect=userAns===q.correct;
    document.querySelectorAll(".option-btn").forEach((btn,i)=>{
      btn.disabled=true;
      if(q.options[i]===q.correct) btn.classList.add("correct");
      else if(i===gameState.selectedOption&&!isCorrect) btn.classList.add("wrong");
    });
  } else {
    const inp=document.getElementById("answerInput");
    userAns=inp.value.trim();
    if(!userAns){ toast("Write your answer!"); return; }
    const clean=normalizeAnswer(userAns);
    const cc=normalizeAnswer(q.answer);
    isCorrect=clean===cc;
    if(!isCorrect&&q.alternatives){
      isCorrect=q.alternatives.some(a=>clean===normalizeAnswer(a));
    }
    inp.disabled=true;
    inp.className="answer-input "+(isCorrect?"correct":"wrong");
  }
  // Feedback
  const fb=document.getElementById("feedback");
  fb.style.display="block";
  fb.className="feedback show "+(isCorrect?"correct-fb":"wrong-fb");
  document.getElementById("fbTitle").textContent=isCorrect?"✅ Correct!":"❌ Not quite...";
  document.getElementById("fbCorrect").textContent=isCorrect?"":"Correct: "+(q.correct||q.answer);
  document.getElementById("fbExp").textContent=q.explanation||"";
  // Stats
  gameState.answers.push({question:q.q,userAnswer:userAns,correct:q.correct||q.answer,isCorrect,explanation:q.explanation});
  if(!isCorrect) trackError(q,userAns);
  const players=gP();
  if(gameState.currentPlayer&&players[gameState.currentPlayer]){
    const pp=players[gameState.currentPlayer];
    pp.totalQuestions=(pp.totalQuestions||0)+1;
    if(isCorrect){
      pp.totalCorrect=(pp.totalCorrect||0)+1;
      pp.streak=(pp.streak||0)+1;
      gameState.score+=10;
    } else {
      pp.streak=0;
    }
    sP(players);
  }
  document.getElementById("validateBtn").style.display="none";
  document.getElementById("nextBtn").style.display="inline-flex";
  document.getElementById("nextBtn").textContent=
    gameState.currentQuestionIndex===gameState.questions.length-1?"See results →":"Next →";
}

function trackError(q,userAns){
  if(!gameState.currentPlayer) return;
  const players=gP();
  const p=players[gameState.currentPlayer];
  if(!p.errorHistory) p.errorHistory=[];
  p.errorHistory.push({
    question:q.q, userAnswer:userAns,
    correctAnswer:q.correct||q.answer,
    explanation:q.explanation||"",
    date:new Date().toISOString(),
    level:gameState.currentLevel
  });
  if(p.errorHistory.length>50) p.errorHistory=p.errorHistory.slice(-50);
  sP(players);
}

function nextQuestion(){
  if(gameState.currentQuestionIndex>=gameState.questions.length-1) showResults();
  else { gameState.currentQuestionIndex++; renderQuestion(); }
}

// ═══════════════════════════════════════════════════════════════════
// RÉSULTATS
// ═══════════════════════════════════════════════════════════════════

function showResults(){
  const total=gameState.questions.length;
  const correct=gameState.answers.filter(a=>a.isCorrect).length;
  const pct=Math.round(correct/total*100);
  document.getElementById("resPct").textContent=pct+"%";
  const msg=pct>=80?"🎉 Excellent! Level unlocked!"
    :pct>=50?"👍 Good effort! Keep practising."
    :"💪 Keep going! Read the lesson and try again.";
  document.getElementById("resMsg").textContent=msg+" ("+correct+"/"+total+")";
  const players=gP();
  const p=players[gameState.currentPlayer];
  if(p){
    if(!p.sessionHistory) p.sessionHistory=[];
    p.sessionHistory.push({
      date:new Date().toISOString(),
      level:gameState.currentLevel,
      levelTitle:LN[gameState.currentLevel],
      correct:correct, total:total, pct:pct,
      passed:pct>=80, mode:gameState.currentMode
    });
    if(p.sessionHistory.length>50) p.sessionHistory=p.sessionHistory.slice(-50);
    p.lastPlayed=new Date().toISOString();
    if(pct>=80){
      if(!p.completed.includes(gameState.currentLevel)) p.completed.push(gameState.currentLevel);
      if(p.currentLevel<=gameState.currentLevel&&gameState.currentLevel<20)
        p.currentLevel=gameState.currentLevel+1;
      p.score=(p.score||0)+correct*10;
    }
    sP(players);
  }
  document.getElementById("nextLvlBtn").style.display=pct>=80?"inline-flex":"none";
  showSection("results");
}

function retryLevel(){ startLevel(gameState.currentLevel); }
function startNextLevel(){
  const players=gP();
  const nl=players[gameState.currentPlayer]?players[gameState.currentPlayer].currentLevel:1;
  if(nl<=20) startLevel(nl);
  else toast("🏆 All levels completed! You're amazing!");
}
function quitGame(){ showSection("levels"); }

// ═══════════════════════════════════════════════════════════════════
// EXPORT / IMPORT
// ═══════════════════════════════════════════════════════════════════

function doExport(){
  const p=gP();
  if(!Object.keys(p).length){ toast("No data to export."); return; }
  const b=new Blob([JSON.stringify(p,null,2)],{type:"application/json"});
  const u=URL.createObjectURL(b);
  const a=document.createElement("a");
  a.href=u;
  a.download="DailyFrench-"+new Date().toISOString().slice(0,10)+".json";
  a.click(); URL.revokeObjectURL(u);
  toast("Exported! ✅");
}

function doImport(ev){
  const f=ev.target.files[0];
  if(!f) return;
  const r=new FileReader();
  r.onload=e=>{
    try{
      const d=JSON.parse(e.target.result);
      if(typeof d!=="object"||!d){ toast("Invalid file."); return; }
      sP(d);
      const n=Object.keys(d);
      if(n.length) loadPlayer(n[0]);
      toast("Imported! ✅");
    } catch{ toast("Error reading file."); }
  };
  r.readAsText(f); ev.target.value="";
}

// ═══════════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════════

document.addEventListener("DOMContentLoaded",()=>{
  const params=new URLSearchParams(window.location.search);
  const pname=params.get("player");
  const lvlParam=params.get("level");
  const players=gP();
  const names=Object.keys(players);
  const target=pname||(names.length?names[0]:null);
  if(target) loadPlayer(target);
  else fillSelect(null);
  renderLevels();
  if(lvlParam){
    const lv=parseInt(lvlParam);
    if(lv>=1&&lv<=20) setTimeout(()=>startLevel(lv),300);
  }
});
