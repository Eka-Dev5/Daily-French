/**
 * vocabulary-engine.js — Moteur de surlignement et grille lexicale
 * 
 * Fournit :
 *   • highlightVocabularyWords(element) : transforme les mots connus en spans cliquables
 *   • renderVocabularyList(container, filters) : affiche la grille filtrable
 *   • getVocabCategories() / getVocabLevels() : extracteurs de métadonnées
 * 
 * Dépendances : vocabulary-data.js (VOCABULARY_BDD), ui-utils.js (openVocabPopup)
 */

// ═══════════════════════════════════════════════════════════════════
// 1. SURLIGNEMENT — Parcours récursif des nœuds texte
// ═══════════════════════════════════════════════════════════════════

// Parcourt tous les nœuds texte d'un élément DOM. Pour chaque occurrence
// d'un mot présent dans VOCABULARY_BDD, remplace le texte brut par un
// <span class="vocab-word" onclick="openVocabPopup('mot')">mot</span>.
// Préserve les balises existantes ; ignore <script>, <style>, et les
// spans déjà surlignés pour éviter les boucles infinies.
function highlightVocabularyWords(rootElement) {
  if (!rootElement || typeof VOCABULARY_BDD === 'undefined') return;

  // Extraction et tri par longueur décroissante : "aujourd'hui" avant "hui"
  const words = VOCABULARY_BDD.map(v => v.fr).filter(Boolean);
  words.sort((a, b) => b.length - a.length);
  if (words.length === 0) return;

  // Échappement des caractères spéciaux regex pour chaque mot
  const escaped = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  // Pattern : mot entier uniquement, insensitive, unicode
  const pattern = new RegExp('(^|[^\\p{L}\'])(' + escaped.join('|') + ')(?![\\p{L}\'])', 'giu');

  // Collecte des nœuds texte via TreeWalker (live iterator)
  const walker = document.createTreeWalker(rootElement, NodeFilter.SHOW_TEXT, null, false);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  // Traitement de chaque nœud texte
  nodes.forEach(node => {
    const parent = node.parentNode;
    if (!parent) return;
    // Protection : ne pas toucher aux scripts, styles, ou spans déjà traités
    if (parent.closest('.vocab-word, script, style, [data-no-highlight]')) return;

    const text = node.textContent;
    if (!pattern.test(text)) return;
    pattern.lastIndex = 0; // Reset obligatoire après test()

    const frag = document.createDocumentFragment();
    let lastIndex = 0;
    let match;

    while ((match = pattern.exec(text)) !== null) {
      const before = text.slice(lastIndex, match.index + match[1].length);
      const word = match[2];

      if (before) frag.appendChild(document.createTextNode(before));

      const span = document.createElement('span');
      span.className = 'vocab-word';
      span.textContent = word;
      span.onclick = (e) => {
        e.stopPropagation();
        if (typeof openVocabPopup === 'function') openVocabPopup(word);
      };
      frag.appendChild(span);

      lastIndex = pattern.lastIndex;
    }

    if (lastIndex < text.length) {
      frag.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    parent.replaceChild(frag, node);
  });
}

// ═══════════════════════════════════════════════════════════════════
// 2. GRILLE VOCABULAIRE — Rendu filtrable dans un conteneur
// ═══════════════════════════════════════════════════════════════════

// Construit les cartes de mots dans le conteneur ciblé.
// Si filters est fourni {query, level, category}, applique le filtrage
// avant le rendu et met à jour le compteur #vocabCount.
function renderVocabularyList(container, filters) {
  if (!container || typeof VOCABULARY_BDD === 'undefined') return;

  let list = VOCABULARY_BDD.slice();

  // Application des filtres
  if (filters) {
    const q = (filters.query || '').trim().toLowerCase();
    const lvl = filters.level;
    const cat = filters.category;

    if (q) {
      list = list.filter(v =>
        (v.fr && v.fr.toLowerCase().includes(q)) ||
        (v.en && v.en.toLowerCase().includes(q)) ||
        (v.def && v.def.toLowerCase().includes(q))
      );
    }
    if (lvl) list = list.filter(v => v.level === parseInt(lvl, 10));
    if (cat) list = list.filter(v => v.cat === cat);
  }

  // Mise à jour du compteur
  const countEl = document.getElementById('vocabCount');
  if (countEl) countEl.textContent = list.length;

  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = '<div class="empty-state">No words match your search.</div>';
    return;
  }

  // Génération des cartes
  list.forEach(entry => {
    const card = document.createElement('div');
    card.className = 'vocab-card';
    card.innerHTML = `
      <div class="vocab-fr">${escapeHtml(entry.fr || '')}</div>
      <div class="vocab-en">${escapeHtml(entry.en || '')}</div>
      ${entry.phon ? '<div class="vocab-phon">/' + escapeHtml(entry.phon) + '/</div>' : ''}
      <div>
        ${entry.cat ? '<span class="vocab-cat">' + escapeHtml(entry.cat) + '</span>' : ''}
        ${entry.level ? '<span class="vocab-lvl">Lvl ' + entry.level + '</span>' : ''}
      </div>
    `;
    card.addEventListener('click', () => {
      if (typeof openVocabPopup === 'function') openVocabPopup(entry.fr);
    });
    container.appendChild(card);
  });
}

// ═══════════════════════════════════════════════════════════════════
// 3. EXTRACTEURS DE MÉTADONNÉES — Pour peupler les <select> filtres
// ═══════════════════════════════════════════════════════════════════

// Retourne un tableau trié des catégories uniques présentes dans la BDD.
function getVocabCategories() {
  if (typeof VOCABULARY_BDD === 'undefined') return [];
  const cats = new Set(VOCABULARY_BDD.map(v => v.cat).filter(Boolean));
  return Array.from(cats).sort((a, b) => a.localeCompare(b));
}

// Retourne un tableau trié numériquement des niveaux uniques.
function getVocabLevels() {
  if (typeof VOCABULARY_BDD === 'undefined') return [];
  const lvls = new Set(VOCABULARY_BDD.map(v => v.level).filter(Boolean));
  return Array.from(lvls).sort((a, b) => a - b);
}

// ═══════════════════════════════════════════════════════════════════
// 4. UTILITAIRE — Échappement HTML basique (prévention XSS)
// ═══════════════════════════════════════════════════════════════════

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
