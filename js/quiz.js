/**
 * quiz.js — Logique page quiz
 * Dépendances : core.js, game-engine.js, vocabulary-engine.js
 */

function handleRoute() {
  const params  = new URLSearchParams(window.location.search);
  const section = params.get('section') || 'home';
  if (typeof showSection === 'function') showSection(section);
  if (section === 'lecons') renderLessons();
  if (section === 'levels' && typeof renderLevels === 'function') renderLevels();
}

function renderLessons() {
  const container = document.getElementById('lessonsContainer');
  if (!container || typeof LESSONS_DATA === 'undefined') return;
  container.innerHTML = '';
  LESSONS_DATA.forEach((lesson, index) => {
    const num  = index + 1;
    const card = document.createElement('div');
    card.className = 'lesson-card';
    card.dataset.num = num;
    const header = document.createElement('div');
    header.className = 'lesson-header';
    header.innerHTML = `
      <span class="lesson-num">${num}</span>
      <span class="lesson-title">${lesson.title}</span>
      <span class="lesson-chevron">▼</span>`;
    header.addEventListener('click', () => toggleLesson(num));
    const body = document.createElement('div');
    body.className = 'lesson-body';
    body.id = 'lesson-body-' + num;
    body.style.display = 'none';
    body.innerHTML = lesson.content || '';
    if (typeof highlightVocabularyWords === 'function') highlightVocabularyWords(body);
    card.appendChild(header);
    card.appendChild(body);
    container.appendChild(card);
  });
}

function toggleLesson(num) {
  const body   = document.getElementById('lesson-body-' + num);
  const card   = document.querySelector('.lesson-card[data-num="' + num + '"]');
  if (!body) return;
  const isOpen = body.style.display === 'block';
  body.style.display = isOpen ? 'none' : 'block';
  if (card) {
    const ch = card.querySelector('.lesson-chevron');
    if (ch) ch.textContent = isOpen ? '▼' : '▲';
    card.classList.toggle('open', !isOpen);
  }
}

function selectMode(mode) {
  if (typeof gameState !== 'undefined') gameState.currentMode = mode;
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof initCore === 'function') initCore();
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => selectMode(btn.dataset.mode));
  });
  handleRoute();
});
