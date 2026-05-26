// ══════════════════════════════════════════════════════
// DAILY FRENCH — Dashboard JS
// v3.1 — séparé du HTML et CSS
// ══════════════════════════════════════════════════════
// ═══ MENU LATÉRAL ═══
function toggleMenu(){
  document.getElementById('sideMenu').classList.toggle('open');
  document.getElementById('menuOverlay').classList.toggle('open');
}

// Modifier showTab pour mettre à jour le menu aussi
function showTab(id){
  ["badges","history","fiches","cameleon"].forEach(t=>{
    document.getElementById("tc-"+t).style.display=t===id?"block":"none";
    document.getElementById("tab-"+t)?.classList?.toggle("on",t===id);
    document.getElementById("mi-"+t)?.classList?.toggle("on",t===id);
  });
}

// ─── THÈMES ───
const THEMES = {
  ardoise: { primary:'#334155', mid:'#475569', light:'#F1F5F9', hero:'linear-gradient(135deg,#1E293B 0%,#334155 40%,#475569 70%,#64748B 100%)' },
  mauve:   { primary:'#7C3AED', mid:'#8B5CF6', light:'#EDE9FE', hero:'linear-gradient(135deg,#581C87 0%,#7C3AED 40%,#A855F7 70%,#C084FC 100%)' },
  terra:   { primary:'#9A3412', mid:'#C2410C', light:'#FFF7ED', hero:'linear-gradient(135deg,#7C2D12 0%,#9A3412 40%,#C2410C 70%,#EA580C 100%)' }
};

function applyTheme(name){
  const t=THEMES[name]||THEMES.ardoise;
  localStorage.setItem('dailyFrench_theme',name);
  const root=document.documentElement;
  root.style.setProperty('--primary',t.primary);
  root.style.setProperty('--primary-mid',t.mid);
  root.style.setProperty('--primary-light',t.light);
  document.querySelectorAll('.hero').forEach(h=>h.style.background=t.hero);
}

function loadTheme(){
  const saved=localStorage.getItem('dailyFrench_theme');
  applyTheme(THEMES[saved]?saved:'ardoise');
}

function toggleTheme(){
  document.getElementById('themeDrop').classList.toggle('open');
}

document.addEventListener('click',e=>{
  const drop=document.getElementById('themeDrop');
  const btn=document.querySelector('.theme-btn');
  if(drop&&!drop.contains(e.target)&&!btn.contains(e.target))drop.classList.remove('open');
});

// ─── DATA ───
const PK="dailyFrench_players", GK="dailyFrench_genius";
const LN={1:"Greetings 🙋",2:"Market 🛒",3:"Garden 🌿",4:"Neighbours 🏘️",5:"Tastes ❤️",6:"Shops 🏬",7:"Friends 👫",8:"Weather 🌤️",9:"Verbs ⚡",10:"Politeness 🎩",11:"Daily life 🇫🇷",12:"Routine 🌅",13:"Emotions ❤️",14:"Needs 🍽️",15:"House 🏡",16:"Family 👨‍👩‍👧",17:"Plans 📅",18:"Health 💊",19:"Cooking 🍳",20:"Living French 🗣️"};

const BD=[
  {id:1,icon:"🙋",name:"First Step",d:"Level 1",lv:1},{id:2,icon:"🛒",name:"Shopper",d:"Level 2",lv:2},
  {id:3,icon:"🌿",name:"Gardener",d:"Level 3",lv:3},{id:4,icon:"🏘️",name:"Neighbour",d:"Level 4",lv:4},
  {id:5,icon:"❤️",name:"Foodie",d:"Level 5",lv:5},{id:6,icon:"🏬",name:"Customer",d:"Level 6",lv:6},
  {id:7,icon:"👫",name:"Social",d:"Level 7",lv:7},{id:8,icon:"🌤️",name:"Météo",d:"Level 8",lv:8},
  {id:9,icon:"⚡",name:"Verb Master",d:"Level 9",lv:9},{id:10,icon:"🎩",name:"Polite",d:"Level 10",lv:10},
  {id:11,icon:"🇫🇷",name:"Local",d:"Level 11",lv:11},{id:12,icon:"🌅",name:"Early Bird",d:"Level 12",lv:12},
  {id:13,icon:"❤️",name:"Emotional",d:"Level 13",lv:13},{id:14,icon:"🍽️",name:"Well-fed",d:"Level 14",lv:14},
  {id:15,icon:"🏡",name:"Homebody",d:"Level 15",lv:15},{id:16,icon:"👨‍👩‍👧",name:"Family",d:"Level 16",lv:16},
  {id:17,icon:"📅",name:"Planner",d:"Level 17",lv:17},{id:18,icon:"💊",name:"Healthy",d:"Level 18",lv:18},
  {id:19,icon:"🍳",name:"Chef",d:"Level 19",lv:19},{id:20,icon:"🗣️",name:"True French",d:"Level 20",lv:20},
  {id:21,icon:"🔥",name:"On Fire",d:"5-day streak",lv:null,c:p=>p.streak>=5},
  {id:22,icon:"🔥🔥",name:"Unstoppable",d:"10-day streak",lv:null,c:p=>p.streak>=10},
  {id:23,icon:"🎯",name:"Perfectionist",d:"100% on a level",lv:null,c:p=>p.sessionHistory&&p.sessionHistory.some(s=>s.pct===100)},
  {id:24,icon:"⭐",name:"Rising Star",d:"5 levels done",lv:null,c:p=>p.completed&&p.completed.length>=5},
  {id:25,icon:"🌟",name:"Star",d:"10 levels done",lv:null,c:p=>p.completed&&p.completed.length>=10},
  {id:26,icon:"👑",name:"Legend",d:"15 levels done",lv:null,c:p=>p.completed&&p.completed.length>=15},
  {id:27,icon:"🏆",name:"Champion",d:"All 20 done!",lv:null,c:p=>p.completed&&p.completed.length>=20},
  {id:28,icon:"💎",name:"Diamond",d:"500+ points",lv:null,c:p=>p.score>=500},
  {id:29,icon:"🌈",name:"Polyglot",d:"1000+ points",lv:null,c:p=>p.score>=1000},
  {id:30,icon:"🥖",name:"Vrai Français",d:"Everything done!",lv:null,c:p=>p.completed&&p.completed.length>=20&&p.score>=1000}
];

const CAM=[
  {min:0,e:"🦎",n:"Beginner Cameleon",d:"Keep practising to transform!"},
  {min:3,e:"🐸",n:"Green Cameleon",d:"You're growing stronger!"},
  {min:6,e:"🦜",n:"Colourful Cameleon",d:"Halfway there — wonderful!"},
  {min:10,e:"🦚",n:"Proud Cameleon",d:"Almost a master!"},
  {min:15,e:"🐉",n:"Dragon Cameleon",d:"You are absolutely legendary! 🏆"}
];

// ─── UTILS (fallback si utils.js absent) ───
function normalizeAnswer(str){
  if(!str||typeof str!=='string')return'';
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[.,!?'"«»""''\-–—]/g,'').replace(/\s+/g,' ').trim();
}

// ─── STORAGE ───
const gP=()=>{try{return JSON.parse(localStorage.getItem(PK))||{};}catch{return {}}};
const sP=d=>localStorage.setItem(PK,JSON.stringify(d));
const gG=()=>{try{return JSON.parse(localStorage.getItem(GK))||[];}catch{return []}};
const sG=d=>localStorage.setItem(GK,JSON.stringify(d));

// ─── TOAST ───
function toast(m){const t=document.getElementById("toast");t.textContent=m;t.classList.add("on");setTimeout(()=>t.classList.remove("on"),3e3);}

// ─── MODAL ───
function openModal(){document.getElementById("modalWrap").classList.add("open");const i=document.getElementById("mInput");i.value="";setTimeout(()=>i.focus(),80);}
function closeModal(){document.getElementById("modalWrap").classList.remove("open");}
function doCreate(){
  const n=document.getElementById("mInput").value.trim();if(!n)return;
  const p=gP();if(p[n]){toast("Player already exists!");return;}
  p[n]={name:n,currentLevel:1,score:0,completed:[],totalQuestions:0,totalCorrect:0,streak:0,lastPlayed:null,errorHistory:[],sessionHistory:[],activeSession:null};
  sP(p);closeModal();loadPlayer(n);toast("Welcome, "+n+"! 🎉");
}

// ─── LOAD + RENDER ───
function fillSelect(active){
  const s=document.getElementById("selPlayer"),p=gP();
  s.innerHTML="<option value=''>— Choose a player —</option>";
  Object.keys(p).forEach(n=>{const o=document.createElement("option");o.value=n;o.textContent=n+" (Lvl."+p[n].currentLevel+")";if(n===active)o.selected=true;s.appendChild(o);});
}
function loadPlayer(name){if(!name)return;fillSelect(name);const p=gP()[name];if(!p)return;render(p);}

function render(p){
  const done=p.completed||[],score=p.score||0,lvl=p.currentLevel||1;
  document.getElementById("heroAv").innerHTML=p.name.charAt(0).toUpperCase()+'<<span class="hero-lvl-badge" id="heroLvl">'+lvl+'</span>';
  document.getElementById("heroName").textContent=p.name;
  document.getElementById("heroTag").textContent="Level "+lvl+" · "+score+" pts · "+done.length+"/20 levels done";
  const ms=Math.ceil(score/100)*100;const pct=Math.round((score%100));
  document.getElementById("xpNow").textContent=score+" pts";
  document.getElementById("xpGoal").textContent="Next: "+ms+" pts";
  document.getElementById("xpBar").style.width=pct+"%";
  document.getElementById("p_streak").textContent=p.streak||0;
  const acc=p.totalQuestions>0?Math.round(p.totalCorrect/p.totalQuestions*100)+"%":"—";
  document.getElementById("p_acc").textContent=acc;
  document.getElementById("p_sess").textContent=(p.sessionHistory||[]).length;
  document.getElementById("b1").textContent=lvl;
  document.getElementById("b2").textContent=score;
  document.getElementById("b3").textContent=done.length+"/20";
  renderMap(p);renderBadges(p);renderHistory(p);renderFiches(p);renderCameleon(p);
}

// ─── JOURNEY MAP ───
function renderMap(p){
  const done=p.completed||[],cur=p.currentLevel||1;
  let h='<div class="j-grid">';
  for(let lv=1;lv<=20;lv++){
    const isDone=done.includes(lv),isCur=lv===cur,isLk=!isDone&&!isCur&&lv>cur;
    let cls="node";
    if(isDone)cls+=" done";else if(isCur)cls+=" current";else if(isLk)cls+=" locked";
    const oc=isLk?"":"onclick=\"nodeClick("+lv+","+isDone+")\"";
    const lvlIco=LN[lv]?LN[lv].split(" ").pop():"";
    h+=`<div class="${cls}" ${oc}>
      <div class="node-num">${isDone?"✓":isCur?"▶":lv}</div>
      <div class="node-ico">${isDone||isCur?lvlIco:""}</div>
      <div class="node-tip">${isDone?"📖 Vocab — ":"🎮 Play — "}Lvl ${lv}: ${LN[lv]||""}</div>
    </div>`;
  }
  h+='</div>';
  h+=`<div class="j-legend">
    <div class="j-legend-item"><div class="j-dot done"></div>Completed → vocabulary</div>
    <div class="j-legend-item"><div class="j-dot current"></div>Your level → play</div>
    <div class="j-legend-item"><div class="j-dot locked"></div>Locked</div>
  </div>`;
  document.getElementById("jMap").innerHTML=h;
}
function nodeClick(lv,isDone){window.location.href=isDone?"vocabulary.html?level="+lv:"quiz.html?level="+lv;}

// ─── TABS ───
function showTab(id){
  ["badges","history","fiches","cameleon"].forEach(t=>{
    document.getElementById("tc-"+t).style.display=t===id?"block":"none";
    document.getElementById("tab-"+t).classList.toggle("on",t===id);
  });
}

// ─── BADGES ───
function renderBadges(p){
  let earned=0,h="";
  BD.forEach(b=>{
    const ok=b.lv?(p.completed&&p.completed.includes(b.lv)):(b.c?b.c(p):false);
    if(ok)earned++;
    const link=ok&&b.lv?"vocabulary.html?level="+b.lv:"quiz.html?section=levels";
    h+=`<a href="${link}" class="badge ${ok?"won":""}" title="${b.d}">
      <div class="badge-icon">${ok?b.icon:"🔒"}</div>
      <div class="badge-name">${b.name}</div>
      <div class="badge-desc">${b.d}</div>
      ${ok&&b.lv?`<div class="badge-cta">📖 Lvl ${b.lv} vocab</div>`:""}
    </a>`;
  });
  document.getElementById("badgeGrid").innerHTML=h;
  document.getElementById("badgeCt").textContent=`🏅 Badges — ${earned} / ${BD.length}`;
  document.getElementById("tab-badges").textContent=`🏅 Badges (${earned})`;
}

// ─── HISTORY ───
function renderHistory(p){
  const el=document.getElementById("histList"),hist=(p.sessionHistory||[]).slice().reverse().slice(0,20);
  if(!hist.length){el.innerHTML='<div class="empty"><span class="empty-i">📜</span>No sessions yet — go play!</div>';return;}
  el.innerHTML=hist.map(s=>{
    const d=new Date(s.date);
    return `<div class="hist-item">
      <div><div class="hist-t">Level ${s.level}: ${LN[s.level]||""}</div>
      <div class="hist-s">${d.toLocaleDateString("en-GB")} · ${d.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})} · ${s.mode||"mixed"}</div></div>
      <div class="${s.passed?"pass":"fail"}">${s.correct}/${s.total} — ${s.pct}%</div>
    </div>`;
  }).join("");
}

// ─── FICHES ───
function renderFiches(p){
  const el=document.getElementById("ficheList"),errs=(p.errorHistory||[]).slice().reverse().slice(0,30);
  if(!errs.length){el.innerHTML='<div class="empty"><span class="empty-i">🎉</span>No errors — you\'re doing brilliantly!</div>';return;}
  el.innerHTML=errs.map(e=>`<div class="fiche">
    <div class="fiche-q">❓ ${e.question}</div>
    <div class="fiche-a">✅ ${e.correctAnswer}</div>
    ${e.explanation?`<div class="fiche-m">💡 ${e.explanation}</div>`:""}
    <div class="fiche-m">Level ${e.level} · ${new Date(e.date).toLocaleDateString("en-GB")}</div>
  </div>`).join("");
}

// ─── CAMELEON ───
function renderCameleon(p){
  const done=(p.completed||[]).length,s=CAM.slice().reverse().find(x=>done>=x.min)||CAM[0];
  document.getElementById("camE").textContent=s.e;
  document.getElementById("camN").textContent=s.n;
  document.getElementById("camD").textContent=s.d+" ("+done+"/20)";
  document.getElementById("camS").innerHTML=CAM.map(x=>`<div class="cam-stage ${done>=x.min?"lit":""}">${x.e}</div>`).join("");
}

// ─── EXPORT / IMPORT ───
function doExport(){
  const p=gP();if(!Object.keys(p).length){toast("No save data yet.");return;}
  const b=new Blob([JSON.stringify(p,null,2)],{type:"application/json"});
  const u=URL.createObjectURL(b);const a=document.createElement("a");
  a.href=u;a.download="DailyFrench-"+new Date().toISOString().slice(0,10)+".json";
  a.click();URL.revokeObjectURL(u);toast("Exported! ✅");
}
function doImport(ev){
  const f=ev.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=e=>{
    try{const d=JSON.parse(e.target.result);if(typeof d==="object"&&d){sP(d);const n=Object.keys(d);if(n.length)loadPlayer(n[0]);toast("Imported! ✅");}else toast("Invalid file.");}
    catch{toast("Error reading file.");}
  };
  r.readAsText(f);ev.target.value="";
}

// ─── GÉNIE ───
let gOpen=false;
function updateFabBadge(){
  const c=gG().length,b=document.getElementById("fabCount");
  b.style.display=c>0?"flex":"none";b.textContent=c;
}
function toggleGenius(){
  gOpen=!gOpen;
  document.getElementById("gPanel").classList.toggle("open",gOpen);
  if(gOpen)renderGenius();
}
function renderGenius(){
  const words=gG(),el=document.getElementById("gBody");
  if(!words.length){
    el.innerHTML=`<div class="g-empty"><span class="g-empty-i">🪔</span>No words saved yet.<br>Go to <a href="vocabulary.html" style="color:var(--primary);font-weight:700">Vocabulary</a> and tap ⭐ on any word to save it here.</div>`;
    return;
  }
  el.innerHTML=words.map((w,i)=>`
    <div class="g-word">
      <div style="flex:1">
        <div class="g-fr">${w.fr} <span class="g-phon">${w.phon||""}</span></div>
        <div class="g-en">${w.en}</div>
      </div>
      <button class="g-del" onclick="removeW(${i})" title="Remove">✕</button>
    </div>
  `).join("");
}
function removeW(i){const w=gG();w.splice(i,1);sG(w);renderGenius();updateFabBadge();toast("Word removed");}
function quizMe(){
  const w=gG();if(!w.length){toast("Add some words first!");return;}
  const word=w[Math.floor(Math.random()*w.length)];
  const ans=prompt(`🪔 Génie Quiz!\n\nHow do you say in French:\n"${word.en}"\n\n(Hint: ${word.phon||"think carefully!"})`);
  if(ans===null)return;
  if(normalizeAnswer(ans)===normalizeAnswer(word.fr)){toast("✅ Brilliant! "+word.fr+" = "+word.en);}
  else toast("❌ Answer: "+word.fr+" ("+word.en+")");
}

// ─── INIT ───
document.addEventListener("DOMContentLoaded",()=>{
  loadTheme();
  updateFabBadge();
  document.addEventListener("click",e=>{
    if(gOpen&&!document.getElementById("gPanel").contains(e.target)&&!document.getElementById("fabBtn").contains(e.target)){
      gOpen=false;document.getElementById("gPanel").classList.remove("open");
    }
  });
  document.getElementById("modalWrap").addEventListener("click",e=>{if(e.target===document.getElementById("modalWrap"))closeModal();});
  const params=new URLSearchParams(window.location.search);
  const pname=params.get("player");
  const players=gP(),names=Object.keys(players);
  const target=pname||(names.length?names[0]:null);
  if(target)loadPlayer(target);else fillSelect(null);
});
