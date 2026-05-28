/**
 * ui-utils.js — Utilitaires d'interface Daily French
 * 
 * Fournit : notifications toast, navigation rapide, export/import JSON,
 * popup vocabulaire, toggle exercices, et fonctions de normalisation
 * textuelle pour la comparaison de réponses.
 * 
 * Dépendances : core.js (Toast, Storage, PlayerManager), vocabulary-data.js
 */

// ═══════════════════════════════════════════════════════════════════
// 1. TOAST — Notification éphémère en bas d'écran
// ═══════════════════════════════════════════════════════════════════

// Affiche un message temporaire. Utilise le système de file de core.js
// si disponible, sinon manipule directement l'élément #toast.
function showToast(msg, duration) {
  if (typeof Toast !== 'undefined' && Toast.show) {
    Toast.show(msg, duration);
    return;
  }
  const el = document.getElementById('toast');
  if (!el) {
    console.log('Toast:', msg);
    return;
  }
  el.textContent = msg;
  el.classList.add('on');
  setTimeout(() => el.classList.remove('on'), duration || 3000);
}

// ═══════════════════════════════════════════════════════════════════
// 2. NAVIGATION — Raccourcis vers les pages principales
// ═══════════════════════════════════════════════════════════════════

function goToVocabulary() {
  window.location.href = 'vocabulary.html';
}

function goToDashboard() {
  window.location.href = 'dashboard.html';
}

function goToQuiz() {
  window.location.href = 'quiz.html';
}

// ═══════════════════════════════════════════════════════════════════
// 3. EXPORT / IMPORT — Sauvegarde JSON complète du localStorage
// ═══════════════════════════════════════════════════════════════════

// Exporte toutes les clés dailyFrench_* dans un fichier JSON téléchargeable.
function exportSave() {
  let data = {};
  if (typeof Storage !== 'undefined' && Storage.exportAll) {
    data = Storage.exportAll();
  } else {
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.startsWith('dailyFrench_')) {
        try { data[key] = JSON.parse(localStorage.getItem(key)); } catch {}
      }
    }
  }

  if (Object.keys(data).length === 0) {
    showToast('No save data yet.');
    return;
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'DailyFrench-backup-' + new Date().toISOString().slice(0, 10) + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Exported!');
}

// Lit un fichier JSON et restaure les données dans localStorage.
function importSave(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      let count = 0;

      if (typeof Storage !== 'undefined' && Storage.importAll) {
        count = Storage.importAll(data);
      } else {
        for (let key in data) {
          if (key.startsWith('dailyFrench_')) {
            localStorage.setItem(key, JSON.stringify(data[key]));
            count++;
          }
        }
      }

      if (count > 0) {
        if (typeof PlayerManager !== 'undefined' && PlayerManager.migrate) {
          PlayerManager.migrate();
        }
        const players = (typeof getPlayers === 'function') ? getPlayers() : {};
        const names = Object.keys(players);
        if (names.length > 0 && typeof loadPlayer === 'function') {
          loadPlayer(names[0]);
        }
        showToast('Imported!');
      } else {
        showToast('Invalid file.');
      }
    } catch {
      showToast('Error reading file.');
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

// ═══════════════════════════════════════════════════════════════════
// 4. POPUP VOCABULAIRE — Définition d'un mot surligné
// ═══════════════════════════════════════════════════════════════════

// Ouvre le modal de définition en cherchant le mot dans VOCABULARY_BDD.
// Affiche : français, anglais, phonétique, définition, catégorie, niveau.
function openVocabPopup(fr) {
  const modal = document.getElementById('vocabulary-popup-modal');
  const body = document.getElementById('vocab-popup-body');
  if (!modal || !body) return;

  const entry = (typeof VOCABULARY_BDD !== 'undefined')
    ? VOCABULARY_BDD.find(v => normalizeAnswer(v.fr) === normalizeAnswer(fr))
    : null;

  if (entry) {
    body.innerHTML = `
      <div class="vocab-popup-fr">${entry.fr}</div>
      <div class="vocab-popup-en">${entry.en || '—'}</div>
      <div class="vocab-popup-phon">${entry.phon || ''}</div>
      <div class="vocab-popup-def">${entry.def || ''}</div>
      <div class="vocab-popup-meta">
        <span class="vocab-cat">${entry.cat || ''}</span>
        <span class="vocab-lvl">Level ${entry.level || '?'}</span>
      </div>
    `;
  } else {
    body.innerHTML = '<div class="vocab-popup-empty">No definition found.</div>';
  }

  modal.style.display = 'flex';
}

// Ferme le popup vocabulaire. Accepte un événement click pour vérifier
// si le clic est sur l'overlay (fermeture) ou sur le contenu (garde ouvert).
function closeVocabPopup(e) {
  const modal = document.getElementById('vocabulary-popup-modal');
  if (!modal) return;
  if (e && e.target !== modal && !e.target.classList.contains('vocab-popup-close')) return;
  modal.style.display = 'none';
}

// ═══════════════════════════════════════════════════════════════════
// 5. TOGGLE EXERCICE — Bascule l'affichage d'un bloc leçon / exercice
// ═══════════════════════════════════════════════════════════════════

function toggleLessonEx(btn, ev) {
  if (ev) ev.stopPropagation();
  const target = btn?.dataset?.target;
  if (!target) return;
  const el = document.getElementById(target);
  if (el) {
    const isHidden = el.style.display === 'none';
    el.style.display = isHidden ? 'block' : 'none';
    btn.classList.toggle('open', isHidden);
  }
}

// ═══════════════════════════════════════════════════════════════════
// 6. NORMALISATION UNIVERSELLE — Nettoyage des réponses écrites
// ═══════════════════════════════════════════════════════════════════

// Étape 1 : suppression accents, ponctuation, espaces multiples, lower case.
function normalizeAnswer(str) {
  if (!str) return '';
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,;:!?«»""''\-_–—\[\]\{\}\(\)]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Étape 2 : normalisation + élision automatique (l → l', je → j', d → d').
// Appliquée DES DEUX CÔTÉS (réponse utilisateur ET réponse attendue).
function normalizeForMatch(str) {
  return normalizeAnswer(str)
    .replace(/\bl\b/g, "l'")
    .replace(/\bje\b/g, "j'")
    .replace(/\bd\b/g, "d'")
    .trim();
}
