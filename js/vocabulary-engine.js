/**
 * vocabulary-engine.js — Moteur de surlignement et grille lexicale
 * Dépendances : vocabulary-data.js (VOCABULARY_BDD), ui-utils.js (openVocabPopup)
 */

// ─── 1. SURLIGNEMENT — TreeWalker sur les nœuds texte ───────────────
function highlightVocabularyWords(rootElement) {
  if (!rootElement || typeof VOCABULARY_BDD === 'undefined') return;
  const words = VOCABULARY_BDD.map(v => v.fr).filter(Boolean);
  words.sort((a, b) => b.length - a.length);
  if (!words.length) return;
  const escaped = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(
    '(^|[^\\p{L}\'])(' + escaped.join('|') + ')(?![\\p{L}\'])',
    'giu'
  );
  const walker = document.createTreeWalker(rootElement, NodeFilter.SHOW_TEXT, null, false);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    const parent = node.parentNode;
    if (!parent) return;
    if (parent.closest('.vocab-word, script, style, [data-no-highlight]')) return;
    const text = node.textContent;
    if (!pattern.test(text)) return;
    pattern.lastIndex = 0;
    const frag = document.createDocumentFragment();
    let lastIndex = 0, match;
    while ((match = pattern.exec(text)) !== null) {
      const before = text.slice(lastIndex, match.index + match[1].length);
      const word   = match[2];
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
    if (lastIndex < text.length) frag.appendChild(document.createTextNode(text.slice(lastIndex)));
    parent.replaceChild(frag, node);
  });
}

// ─── 2. GRILLE VOCABULAIRE ───────────────────────────────────────────
function renderVocabularyList(container, filters) {
  if (!container || typeof VOCABULARY_BDD === 'undefined') return;
  let list = VOCABULARY_BDD.slice();
  if (filters) {
    const q   = (filters.query    || '').trim().toLowerCase();
    const lvl = filters.level;
    const cat = filters.category;
    if (q)   list = list.filter(v => (v.fr||'').toLowerCase().includes(q) || (v.en||'').toLowerCase().includes(q) || (v.def||'').toLowerCase().includes(q));
    if (lvl) list = list.filter(v => v.level === parseInt(lvl, 10));
    if (cat) list = list.filter(v => v.cat === cat);
  }
  const countEl = document.getElementById('vocabCount');
  if (countEl) countEl.textContent = list.length;
  container.innerHTML = '';
  if (!list.length) {
    container.innerHTML = '<div class="empty-state">No words match your search.</div>';
    return;
  }
  list.forEach(entry => {
    const card = document.createElement('div');
    card.className = 'vocab-card';
    card.innerHTML = `
      <div class="vocab-fr">${_esc(entry.fr||'')}</div>
      <div class="vocab-en">${_esc(entry.en||'')}</div>
      ${entry.phon ? '<div class="vocab-phon">' + _esc(entry.phon) + '</div>' : ''}
      <div>
        ${entry.cat   ? '<span class="vocab-cat">'  + _esc(entry.cat)         + '</span>' : ''}
        ${entry.level ? '<span class="vocab-lvl">Lvl ' + entry.level + '</span>' : ''}
      </div>`;
    card.addEventListener('click', () => { if (typeof openVocabPopup === 'function') openVocabPopup(entry.fr); });
    container.appendChild(card);
  });
}

// ─── 3. EXTRACTEURS ─────────────────────────────────────────────────
function getVocabCategories() {
  if (typeof VOCABULARY_BDD === 'undefined') return [];
  return [...new Set(VOCABULARY_BDD.map(v => v.cat).filter(Boolean))].sort((a,b) => a.localeCompare(b));
}
function getVocabLevels() {
  if (typeof VOCABULARY_BDD === 'undefined') return [];
  return [...new Set(VOCABULARY_BDD.map(v => v.level).filter(Boolean))].sort((a,b) => a-b);
}

// ─── 4. UTILITAIRE ──────────────────────────────────────────────────
function _esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
