/**
 * dashboard.js — Logique spécifique au tableau de bord
 * 
 * Ce fichier s'occupe de :
 *   • Afficher la carte des niveaux (journey map) avec états verrouillé/actif/fait
 *   • Rendre la grille des 30 badges selon les progrès du joueur
 *   • Animer le caméléon à 5 stades selon l'assiduité
 *   • Lister l'historique des sessions avec score et date
 *   • Gérer "Mon Génie" : mots favoris + mini-quiz personnalisé
 * 
 * Dépendances : core.js (joueur, hero, bento), ui-utils.js (toast)
 */

// ═══════════════════════════════════════════════════════════════════
// 1. INITIALISATION DU DASHBOARD
// ═══════════════════════════════════════════════════════════════════

// Lancé après initCore() une fois le DOM prêt.
// Récupère le joueur courant et rafraîchit les 5 sections du dashboard.
// Si aucun joueur n'existe, le modal de création s'ouvre via core.js.
function initDashboard() {
  const current = PlayerManager.getCurrent();
  if (!current) {
    if (typeof openModal === 'function') openModal();
    return;
  }
  updateDashboard();
}

// Rafraîchit l'ensemble des sections à partir des données du joueur courant.
// Appelée après chaque action (création, changement, retour de quiz).
function updateDashboard() {
  const p = PlayerManager.load(PlayerManager.getCurrent());
  if (!p) return;

  // Hero et bento sont mis à jour par loadPlayer() de core.js,
  // mais on s'assure ici que le select est synchronisé.
  if (typeof fillSelect === 'function') fillSelect(p.name);

  renderJourneyMap(p);
  renderBadges(p);
  renderCameleon(p);
  renderHistory(p);
  renderGenius(p);
}

// ═══════════════════════════════════════════════════════════════════
// 2. JOURNEY MAP — Carte des 20 niveaux
// ═══════════════════════════════════════════════════════════════════

// Construit une grille visuelle des 20 niveaux.
// Chaque cellule affiche le numéro et le titre court depuis LEVEL_NAMES.
// Trois états CSS : .locked (gris, verrou), .active (bordure animée),
// .completed (couleur pleine, coche).
function renderJourneyMap(p) {
  const container = document.getElementById('journeyMap');
  if (!container || typeof LEVEL_NAMES === 'undefined') return;

  container.innerHTML = '';
  const max = SUBJECT_CONFIG?.maxLevel || 20;
  const current = p.currentLevel || 1;
  const done = p.completed || [];

  for (let i = 1; i <= max; i++) {
    const tile = document.createElement('div');
    tile.className = 'journey-tile';
    tile.textContent = i;

    // Tooltip avec le nom complet du niveau
    tile.title = LEVEL_NAMES[i] || 'Level ' + i;

    if (done.includes(i)) {
      tile.classList.add('completed');
      tile.innerHTML = i + '<span class="check">✓</span>';
    } else if (i === current) {
      tile.classList.add('active');
    } else if (i > current) {
      tile.classList.add('locked');
    }

    // Clic : redirige vers le quiz sur ce niveau
    tile.addEventListener('click', () => {
      if (!tile.classList.contains('locked')) {
        window.location.href = 'quiz.html?section=levels&level=' + i;
      }
    });

    container.appendChild(tile);
  }
}

// ═══════════════════════════════════════════════════════════════════
// 3. BADGES — Grille des 30 réussites
// ═══════════════════════════════════════════════════════════════════

// Tableau des 30 badges avec condition d'obtention (fonction qui reçoit le joueur).
// Le badge est grisé si la condition retourne false.
const BADGES_DEF = [
  { id: 1,  icon: '🙋', label: 'First Step',       test: p => (p.completed || []).length >= 1 },
  { id: 2,  icon: '🛒', label: 'Shopper',          test: p => (p.completed || []).includes(2) },
  { id: 3,  icon: '🌿', label: 'Gardener',         test: p => (p.completed || []).includes(3) },
  { id: 4,  icon: '🏘️', label: 'Neighbour',        test: p => (p.completed || []).includes(4) },
  { id: 5,  icon: '❤️', label: 'Tasteful',         test: p => (p.completed || []).includes(5) },
  { id: 6,  icon: '🏬', label: 'Mall Rat',         test: p => (p.completed || []).includes(6) },
  { id: 7,  icon: '👫', label: 'Socialite',        test: p => (p.completed || []).includes(7) },
  { id: 8,  icon: '🌤️', label: 'Meteorologist',    test: p => (p.completed || []).includes(8) },
  { id: 9,  icon: '⚡',  label: 'Verb Master',      test: p => (p.completed || []).includes(9) },
  { id: 10, icon: '🎩', label: 'Polite',           test: p => (p.completed || []).includes(10) },
  { id: 11, icon: '🇫🇷', label: 'Local',            test: p => (p.completed || []).includes(11) },
  { id: 12, icon: '🌅', label: 'Early Bird',       test: p => (p.completed || []).includes(12) },
  { id: 13, icon: '💭', label: 'Emotional',        test: p => (p.completed || []).includes(13) },
  { id: 14, icon: '🍽️', label: 'Fed',              test: p => (p.completed || []).includes(14) },
  { id: 15, icon: '🏡', label: 'Home Owner',       test: p => (p.completed || []).includes(15) },
  { id: 16, icon: '👨‍👩‍👧', label: 'Family',      test: p => (p.completed || []).includes(16) },
  { id: 17, icon: '📅', label: 'Planner',          test: p => (p.completed || []).includes(17) },
  { id: 18, icon: '💊', label: 'Healthy',          test: p => (p.completed || []).includes(18) },
  { id: 19, icon: '👨‍🍳', label: 'Chef',         test: p => (p.completed || []).includes(19) },
  { id: 20, icon: '🗣️', label: 'Fluent',           test: p => (p.completed || []).includes(20) },
  { id: 21, icon: '🔥', label: 'Streak 3',         test: p => (p.streak || 0) >= 3 },
  { id: 22, icon: '🔥', label: 'Streak 7',         test: p => (p.streak || 0) >= 7 },
  { id: 23, icon: '💯', label: 'Perfectionist',    test: p => p.totalQuestions > 0 && p.totalCorrect === p.totalQuestions },
  { id: 24, icon: '📚', label: 'Bookworm',         test: p => (p.sessionHistory || []).length >= 10 },
  { id: 25, icon: '🎯', label: 'Sharpshooter',     test: p => (p.completed || []).length >= 10 },
  { id: 26, icon: '🏆', label: 'Halfway',          test: p => (p.completed || []).length >= 10 },
  { id: 27, icon: '👑', label: 'Champion',         test: p => (p.completed || []).length >= 20 },
  { id: 28, icon: '🦎', label: 'Cameleon Friend',  test: p => (p.cameleonHelped || 0) >= 1 },
  { id: 29, icon: '🧠', label: 'Genius',           test: p => ((p.genius || {}).words || []).length >= 10 },
  { id: 30, icon: '🚀', label: 'Explorer',        test: p => (p.completed || []).length >= 5 }
];

function renderBadges(p) {
  const container = document.getElementById('badgesGrid');
  if (!container) return;

  container.innerHTML = '';
  const earned = p.badges || [];

  BADGES_DEF.forEach(badge => {
    const unlocked = earned.includes(badge.id) || badge.test(p);
    const el = document.createElement('div');
    el.className = 'badge-item' + (unlocked ? ' unlocked' : ' locked');
    el.innerHTML = '<div class="badge-icon">' + badge.icon + '</div><div class="badge-label">' + badge.label + '</div>';
    container.appendChild(el);
  });
}

// ═══════════════════════════════════════════════════════════════════
// 4. CAMELEON — Assistant personnel 5 stades
// ═══════════════════════════════════════════════════════════════════

// Le caméléon évolue selon le nombre de sessions jouées.
// Stade 0 = œuf, 1 = bébé, 2 = jeune, 3 = adulte, 4 = sage.
// Affiche une phrase d'encouragement adaptée au stade.
const CAMELEON_STAGES = [
  { icon: '🥚', name: 'Egg',      msg: 'Wake me up with your first session!' },
  { icon: '🦎', name: 'Baby',     msg: 'I\'m hungry for more words!' },
  { icon: '🐉', name: 'Youth',    msg: 'We\'re making great progress!' },
  { icon: '🦕', name: 'Adult',    msg: 'You\'re becoming a true master!' },
  { icon: '🐲', name: 'Sage',     msg: 'Together we are unstoppable!' }
];

function renderCameleon(p) {
  const container = document.getElementById('cameleonStage');
  if (!container) return;

  const sessions = (p.sessionHistory || []).length;
  // Seuil par stade : 0, 1, 5, 15, 30 sessions
  let stage = 0;
  if (sessions >= 30) stage = 4;
  else if (sessions >= 15) stage = 3;
  else if (sessions >= 5) stage = 2;
  else if (sessions >= 1) stage = 1;

  const c = CAMELEON_STAGES[stage];
  container.innerHTML = `
    <div class="cameleon-avatar">${c.icon}</div>
    <div class="cameleon-name">${c.name}</div>
    <div class="cameleon-msg">${c.msg}</div>
    <div class="cameleon-bar">
      <div class="cameleon-fill" style="width:${Math.min(100, (sessions/30)*100)}%"></div>
    </div>
    <div class="cameleon-count">${sessions} session${sessions !== 1 ? 's' : ''}</div>
  `;
}

// ═══════════════════════════════════════════════════════════════════
// 5. HISTORIQUE — Sessions passées
// ═══════════════════════════════════════════════════════════════════

// Affiche les 50 dernières sessions sous forme de liste inversée (plus récente en haut).
// Chaque ligne montre la date, le niveau, le score et le pourcentage.
function renderHistory(p) {
  const container = document.getElementById('historyList');
  if (!container) return;

  const sessions = (p.sessionHistory || []).slice().reverse();
  if (sessions.length === 0) {
    container.innerHTML = '<div class="empty-state">No sessions yet — go play!</div>';
    return;
  }

  container.innerHTML = '';
  sessions.forEach((sess, idx) => {
    const row = document.createElement('div');
    row.className = 'history-row';
    const date = sess.date ? new Date(sess.date).toLocaleDateString() : '—';
    const pct = sess.total > 0 ? Math.round((sess.correct / sess.total) * 100) : 0;
    row.innerHTML = `
      <span class="h-date">${date}</span>
      <span class="h-level">Lvl ${sess.level || '?'}</span>
      <span class="h-score">${sess.correct || 0}/${sess.total || 0}</span>
      <span class="h-pct">${pct}%</span>
    `;
    container.appendChild(row);
  });
}

// ═══════════════════════════════════════════════════════════════════
// 6. MON GÉNIE — Mots favoris et mini-quiz
// ═══════════════════════════════════════════════════════════════════

// Le Génie stocke les mots que le joueur a sauvegardés depuis le popup vocabulaire.
// Cette section affiche la liste et un bouton pour se tester sur ces mots.
function renderGenius(p) {
  const container = document.getElementById('geniusPanel');
  if (!container) return;

  const words = (p.genius || {}).words || [];
  if (words.length === 0) {
    container.innerHTML = '<div class="empty-state">No words saved yet. Tap a highlighted word during a lesson to add it here.</div>';
    return;
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

  const actions = document.createElement('div');
  actions.className = 'genius-actions';
  const btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  btn.textContent = 'Quiz me on my words!';
  btn.addEventListener('click', () => startGeniusQuiz(words));
  actions.appendChild(btn);

  container.innerHTML = '';
  container.appendChild(list);
  container.appendChild(actions);
}

// Lance un mini-quiz de 5 questions tirées aléatoirement dans les mots du Génie.
// Réutilise la logique d'affichage du quiz principal (redirection vers quiz.html).
function startGeniusQuiz(words) {
  if (!words || words.length === 0) return;
  // Stocke temporairement la sélection pour que quiz.js/game-engine.js puissent l'exploiter
  sessionStorage.setItem('dailyFrench_geniusQuiz', JSON.stringify(words.slice(0, 5)));
  window.location.href = 'quiz.html?section=levels&mode=genius';
}

// ═══════════════════════════════════════════════════════════════════
// 7. ÉCOUTEUR DOM — Lancement au chargement
// ═══════════════════════════════════════════════════════════════════

// Attend que core.js ait initialisé la langue, le thème et le joueur,
// puis construit le dashboard spécifique.
document.addEventListener('DOMContentLoaded', () => {
  if (typeof initCore === 'function') {
    initCore();
  }
  initDashboard();
});
