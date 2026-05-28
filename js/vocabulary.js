/**
 * vocabulary.js — Logique spécifique à la page lexique
 * 
 * Initialise la page, peuple les filtres dynamiques, attache les écouteurs
 * de recherche avec debounce, et lance le rendu initial de la grille.
 * 
 * Dépendances : core.js (initCore), vocabulary-engine.js (renderVocabularyList,
 * getVocabCategories, getVocabLevels)
 */

// ═══════════════════════════════════════════════════════════════════
// 1. INITIALISATION — Au chargement complet du DOM
// ═══════════════════════════════════════════════════════════════════

// Lance l'initialisation core (langue, thème, joueur, hero, bento),
// puis peuple les filtres et affiche la grille complète.
function initVocabulary() {
  if (typeof initCore === 'function') initCore();

  populateFilters();

  const grid = document.getElementById('vocabGrid');
  if (grid && typeof renderVocabularyList === 'function') {
    renderVocabularyList(grid);
  }

  attachListeners();
}

// ═══════════════════════════════════════════════════════════════════
// 2. PEUPLEMENT DES FILTRES — Options dynamiques depuis la BDD
// ═══════════════════════════════════════════════════════════════════

// Remplit les <select> #vocabFilterLevel et #vocabFilterCat avec les
// valeurs uniques réellement présentes dans VOCABULARY_BDD.
function populateFilters() {
  const levelSel = document.getElementById('vocabFilterLevel');
  const catSel = document.getElementById('vocabFilterCat');

  if (levelSel && typeof getVocabLevels === 'function') {
    const levels = getVocabLevels();
    levels.forEach(l => {
      const opt = document.createElement('option');
      opt.value = l;
      opt.textContent = 'Level ' + l;
      levelSel.appendChild(opt);
    });
  }

  if (catSel && typeof getVocabCategories === 'function') {
    const cats = getVocabCategories();
    cats.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c.charAt(0).toUpperCase() + c.slice(1);
      catSel.appendChild(opt);
    });
  }
}

// ═══════════════════════════════════════════════════════════════════
// 3. ÉCOUTEURS — Recherche avec debounce, filtres instantanés
// ═══════════════════════════════════════════════════════════════════

// Attache les événements input/change sur la barre de recherche et les
// deux selects. La recherche textuelle est débouncée à 200 ms pour
// ne pas ralentir la saisie sur mobile.
function attachListeners() {
  const search = document.getElementById('vocabSearch');
  const levelSel = document.getElementById('vocabFilterLevel');
  const catSel = document.getElementById('vocabFilterCat');
  const grid = document.getElementById('vocabGrid');

  const refresh = () => {
    if (!grid || typeof renderVocabularyList !== 'function') return;
    renderVocabularyList(grid, {
      query: search ? search.value : '',
      level: levelSel ? levelSel.value : '',
      category: catSel ? catSel.value : ''
    });
  };

  if (search) {
    search.addEventListener('input', () => {
      clearTimeout(search._debounce);
      search._debounce = setTimeout(refresh, 200);
    });
  }
  if (levelSel) levelSel.addEventListener('change', refresh);
  if (catSel) catSel.addEventListener('change', refresh);
}

// ═══════════════════════════════════════════════════════════════════
// 4. LANCEMENT
// ═══════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', initVocabulary);
