/**
 * dashboard.js — Logique tableau de bord
 * Dépendances : core.js (PlayerManager), ui-utils.js
 */

// ─── 1. INIT ────────────────────────────────────────────────────────
function initDashboard() {
  const current = (typeof PlayerManager !== 'undefined') ? PlayerManager.getCurrent() : null;
  if (!current) { if (typeof openModal === 'function') openModal(); return; }
  updateDashboard();
}

function updateDashboard() {
  const name = (typeof PlayerManager !== 'undefined') ? PlayerManager.getCurrent() : null;
  if (!name) return;
  const players = (typeof getPlayers === 'function') ? getPlayers() : {};
  const p = players[name];
  if (!p) return;
  if (typeof fillSelect === 'function') fillSelect(name);
  renderJourneyMap(p);
  renderBadges(p);
  renderCameleon(p);
  renderHistory(p);
  renderGenius();
}

// ─── 2. JOURNEY MAP ─────────────────────────────────────────────────
function renderJourneyMap(p) {
  const container = document.getElementById('journeyMap');
  if (!container || typeof LEVEL_NAMES === 'undefined') return;
  container.innerHTML = '';
  const max     = SUBJECT_CONFIG?.maxLevel || 20;
  const current = p.currentLevel || 1;
  const done    = p.completed || [];
  for (let i = 1; i <= max; i++) {
    const tile = document.createElement('div');
    tile.className = 'journey-tile';
    tile.title = LEVEL_NAMES[i] || 'Level ' + i;
    tile.innerHTML = i + (done.includes(i) ? '<span class="check">✓</span>' : '');
    if (done.includes(i))    tile.classList.add('completed');
    else if (i === current)  tile.classList.add('active');
    else if (i > current)    tile.classList.add('locked');
    tile.addEventListener('click', () => {
      if (!tile.classList.contains('locked'))
        window.location.href = 'quiz.html?section=levels&level=' + i;
    });
    container.appendChild(tile);
  }
}

// ─── 3. BADGES ──────────────────────────────────────────────────────
const BADGES_DEF = [
  {id:1, icon:'🙋',label:'First Step',     test:p=>(p.completed||[]).length>=1},
  {id:2, icon:'🛒',label:'Shopper',        test:p=>(p.completed||[]).includes(2)},
  {id:3, icon:'🌿',label:'Gardener',       test:p=>(p.completed||[]).includes(3)},
  {id:4, icon:'🏘️',label:'Neighbour',      test:p=>(p.completed||[]).includes(4)},
  {id:5, icon:'❤️',label:'Tasteful',       test:p=>(p.completed||[]).includes(5)},
  {id:6, icon:'🏬',label:'Mall Rat',       test:p=>(p.completed||[]).includes(6)},
  {id:7, icon:'👫',label:'Socialite',      test:p=>(p.completed||[]).includes(7)},
  {id:8, icon:'🌤️',label:'Météo',          test:p=>(p.completed||[]).includes(8)},
  {id:9, icon:'⚡', label:'Verb Master',   test:p=>(p.completed||[]).includes(9)},
  {id:10,icon:'🎩',label:'Polite',         test:p=>(p.completed||[]).includes(10)},
  {id:11,icon:'🇫🇷',label:'Local',          test:p=>(p.completed||[]).includes(11)},
  {id:12,icon:'🌅',label:'Early Bird',     test:p=>(p.completed||[]).includes(12)},
  {id:13,icon:'💭',label:'Emotional',      test:p=>(p.completed||[]).includes(13)},
  {id:14,icon:'🍽️',label:'Fed',            test:p=>(p.completed||[]).includes(14)},
  {id:15,icon:'🏡',label:'Home Owner',     test:p=>(p.completed||[]).includes(15)},
  {id:16,icon:'👨‍👩‍👧',label:'Family',    test:p=>(p.completed||[]).includes(16)},
  {id:17,icon:'📅',label:'Planner',        test:p=>(p.completed||[]).includes(17)},
  {id:18,icon:'💊',label:'Healthy',        test:p=>(p.completed||[]).includes(18)},
  {id:19,icon:'👨‍🍳',label:'Chef',       test:p=>(p.completed||[]).includes(19)},
  {id:20,icon:'🗣️',label:'Fluent',         test:p=>(p.completed||[]).includes(20)},
  {id:21,icon:'🔥',label:'Streak 3',       test:p=>(p.streak||0)>=3},
  {id:22,icon:'🔥',label:'Streak 7',       test:p=>(p.streak||0)>=7},
  {id:23,icon:'💯',label:'Perfectionist',  test:p=>p.totalQuestions>0&&p.totalCorrect===p.totalQuestions},
  {id:24,icon:'📚',label:'Bookworm',       test:p=>(p.sessionHistory||[]).length>=10},
  {id:25,icon:'🎯',label:'Sharpshooter',   test:p=>(p.completed||[]).length>=10},
  {id:26,icon:'🏆',label:'Halfway',        test:p=>(p.completed||[]).length>=10},
  {id:27,icon:'👑',label:'Champion',       test:p=>(p.completed||[]).length>=20},
  {id:28,icon:'🦎',label:'Cameleon',       test:p=>(p.cameleonHelped||0)>=1},
  {id:29,icon:'🪔',label:'Genius',         test:p=>{
    try{return(JSON.parse(localStorage.getItem('dailyFrench_genius'))||[]).length>=5;}catch{return false;}
  }},
  {id:30,icon:'🚀',label:'Explorer',       test:p=>(p.completed||[]).length>=5}
];

function renderBadges(p) {
  const c = document.getElementById('badgesGrid');
  if (!c) return;
  c.innerHTML = '';
  BADGES_DEF.forEach(b => {
    const ok  = b.test(p);
    const el  = document.createElement('div');
    el.className = 'badge-item' + (ok ? ' unlocked' : ' locked');
    el.innerHTML = '<div class="badge-icon">' + b.icon + '</div><div class="badge-label">' + b.label + '</div>';
    c.appendChild(el);
  });
}

// ─── 4. CAMELEON ────────────────────────────────────────────────────
const CAM_STAGES = [
  {icon:'🥚',name:'Egg',     msg:'Wake me up with your first session!'},
  {icon:'🦎',name:'Baby',    msg:"I'm hungry for more words!"},
  {icon:'🐉',name:'Youth',   msg:"We're making great progress!"},
  {icon:'🦕',name:'Adult',   msg:"You're becoming a true master!"},
  {icon:'🐲',name:'Sage',    msg:'Together we are unstoppable!'}
];
function renderCameleon(p) {
  const c = document.getElementById('cameleonStage');
  if (!c) return;
  const n  = (p.sessionHistory||[]).length;
  const st = n>=30?4:n>=15?3:n>=5?2:n>=1?1:0;
  const s  = CAM_STAGES[st];
  c.innerHTML = `
    <div class="cameleon-avatar">${s.icon}</div>
    <div class="cameleon-name">${s.name}</div>
    <div class="cameleon-msg">${s.msg}</div>
    <div class="cameleon-bar"><div class="cameleon-fill" style="width:${Math.min(100,(n/30)*100)}%"></div></div>
    <div class="cameleon-count">${n} session${n!==1?'s':''}</div>`;
}

// ─── 5. HISTORIQUE ──────────────────────────────────────────────────
function renderHistory(p) {
  const c = document.getElementById('historyList');
  if (!c) return;
  const sessions = (p.sessionHistory||[]).slice().reverse();
  if (!sessions.length) {
    c.innerHTML = '<div class="empty-state">No sessions yet — go play!</div>'; return;
  }
  c.innerHTML = '';
  sessions.forEach(s => {
    const row  = document.createElement('div');
    row.className = 'history-row';
    const d    = s.date ? new Date(s.date).toLocaleDateString('en-GB') : '—';
    const pct  = s.total > 0 ? Math.round((s.correct/s.total)*100) : 0;
    row.innerHTML = `<span class="h-date">${d}</span><span class="h-level">Lvl ${s.level||'?'}</span><span class="h-score">${s.correct||0}/${s.total||0}</span><span class="h-pct">${pct}%</span>`;
    c.appendChild(row);
  });
}

// ─── 6. MON GÉNIE ───────────────────────────────────────────────────
function renderGenius() {
  const c = document.getElementById('geniusPanel');
  if (!c) return;
  let words = [];
  try { words = JSON.parse(localStorage.getItem('dailyFrench_genius')) || []; } catch {}
  if (!words.length) {
    c.innerHTML = '<div class="empty-state">No words saved yet. Tap a highlighted word during a lesson to save it here.</div>'; return;
  }
  const list = document.createElement('div');
  list.className = 'genius-list';
  words.forEach(w => {
    const chip = document.createElement('span');
    chip.className = 'genius-chip';
    chip.textContent = w.fr || w;
    chip.title = w.en || '';
    list.appendChild(chip);
  });
  const btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  btn.style.marginTop = '1rem';
  btn.textContent = '🎯 Quiz me on my words!';
  btn.addEventListener('click', () => {
    sessionStorage.setItem('dailyFrench_geniusQuiz', JSON.stringify(words.slice(0,5)));
    window.location.href = 'quiz.html?section=levels&mode=genius';
  });
  c.innerHTML = '';
  c.appendChild(list);
  c.appendChild(btn);
}

// ─── 7. DOM READY ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (typeof initCore === 'function') initCore();
  initDashboard();
});
