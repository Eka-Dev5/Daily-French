/**
 * quiz.js — Logique spécifique à la page quiz
 * 
 * Ce fichier s'occupe de :
 *   • Lire l'URL pour afficher la bonne section (home, leçons, niveaux, jeu, résultats)
 *   • Générer les cartes de leçons avec surlignement vocabulaire
 *   • Gérer les boutons de mode (mixte / QCM / écrit)
 *   • Enrichir l'affichage des questions avec les mots du lexique
 * 
 * Dépendances déjà chargées : core.js, game-engine.js, vocabulary-engine.js
 */

// ═══════════════════════════════════════════════════════════════════
// 1. ROUTING PAR URL — Affiche la section demandée par ?section=
// ═══════════════════════════════════════════════════════════════════

// La page quiz.html contient 5 sections : #home, #lecons, #levels, #jeu, #resultats.
// Cette fonction lit le paramètre d'URL et appelle showSection() (game-engine.js)
// pour n'en afficher qu'une à la fois. Si aucun paramètre, on reste sur l'accueil.
function handleRoute() {
  const params = new URLSearchParams(window.location.search);
  const section = params.get('section') || 'home';

  // showSection() masque toutes les .section puis révèle celle ciblée
  if (typeof showSection === 'function') {
    showSection(section);
  }

  // Si on arrive directement sur les leçons, on les construit immédiatement
  if (section === 'lecons') {
    renderLessons();
  }

  // Si on arrive sur les niveaux, on rend la grille (game-engine.js)
  if (section === 'levels' && typeof renderLevels === 'function') {
    renderLevels();
  }
}

// ═══════════════════════════════════════════════════════════════════
// 2. RENDU DES LEÇONS — Cartes collapsibles avec vocabulaire surligné
// ═══════════════════════════════════════════════════════════════════

// Construit les 20 cartes de leçons dans #lessonsContainer à partir de LESSONS_DATA.
// Chaque carte a un en-tête cliquable et un corps masqué par défaut.
// Le contenu de chaque leçon est injecté en HTML, puis highlightVocabularyWords()
// parcourt le texte et transforme les mots connus en liens cliquables.
function renderLessons() {
  const container = document.getElementById('lessonsContainer');
  if (!container || typeof LESSONS_DATA === 'undefined') return;

  container.innerHTML = '';

  LESSONS_DATA.forEach((lesson, index) => {
    const num = index + 1;

    // Carte principale
    const card = document.createElement('div');
    card.className = 'lesson-card';
    card.dataset.num = num;

    // En-tête cliquable : numéro + titre + flèche
    const header = document.createElement('div');
    header.className = 'lesson-header';
    header.innerHTML = `
      <span class="lesson-num">${num}</span>
      <span class="lesson-title">${lesson.title}</span>
      <span class="lesson-chevron">▼</span>
    `;
    header.addEventListener('click', () => toggleLesson(num));

    // Corps de la leçon, caché par défaut
    const body = document.createElement('div');
    body.className = 'lesson-body';
    body.id = 'lesson-body-' + num;
    body.style.display = 'none';
    body.innerHTML = lesson.content;

    // Surlignement des mots du lexique dans cette leçon
    if (typeof highlightVocabularyWords === 'function') {
      highlightVocabularyWords(body);
    }

    card.appendChild(header);
    card.appendChild(body);
    container.appendChild(card);
  });
}

// ═══════════════════════════════════════════════════════════════════
// 3. BASCULE D'UNE LEÇON — Ouvre ou ferme une carte
// ═══════════════════════════════════════════════════════════════════

// Change le display du corps de la leçon et pivote la flèche ▼ / ▲.
// Ajoute/retire la classe .open sur la carte pour le style CSS.
function toggleLesson(num) {
  const body = document.getElementById('lesson-body-' + num);
  const card = document.querySelector('.lesson-card[data-num="' + num + '"]');
  if (!body) return;

  const isOpen = body.style.display === 'block';
  body.style.display = isOpen ? 'none' : 'block';

  if (card) {
    const chevron = card.querySelector('.lesson-chevron');
    if (chevron) chevron.textContent = isOpen ? '▼' : '▲';
    card.classList.toggle('open', !isOpen);
  }
}

// ═══════════════════════════════════════════════════════════════════
// 4. MODE DE JEU — Sélection mixte / QCM / écrit
// ═══════════════════════════════════════════════════════════════════

// Met à jour gameState.currentMode et bascule la classe .active sur les boutons.
// Les boutons HTML portent l'attribut data-mode="mixte|qcm|libre".
function selectMode(mode) {
  if (typeof gameState !== 'undefined') {
    gameState.currentMode = mode;
  }

  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
}

// ═══════════════════════════════════════════════════════════════════
// 5. PATCH VOCABULAIRE — Surlignement dans les questions du quiz
// ═══════════════════════════════════════════════════════════════════

// game-engine.js possède renderQuestion() qui écrit le texte dans #questionText.
// On intercepte cet affichage pour enrichir le HTML généré : après que la question
// soit posée, on relance highlightVocabularyWords() sur le bloc de texte.
// Ainsi, chaque mot français condu du lexique devient cliquable pendant le jeu.
const _originalRenderQuestion = window.renderQuestion;

window.renderQuestion = function() {
  // Exécute la fonction d'origine qui remplit les options, le compteur, etc.
  if (typeof _originalRenderQuestion === 'function') {
    _originalRenderQuestion();
  }

  // Enrichit le texte de la question avec les liens vocabulaires
  const questionEl = document.getElementById('questionText');
  if (questionEl && typeof highlightVocabularyWords === 'function') {
    highlightVocabularyWords(questionEl);
  }
};

// ═══════════════════════════════════════════════════════════════════
// 6. INITIALISATION — Au chargement complet du DOM
// ═══════════════════════════════════════════════════════════════════

// Écouteur unique lancé dès que le HTML est prêt :
//   1. core.js initialise langue, thème, joueur courant, modal, toast
//   2. On attache les clics sur les 3 boutons de mode de la page d'accueil
//   3. On résout le routing initial (?section=...)
document.addEventListener('DOMContentLoaded', () => {
  if (typeof initCore === 'function') {
    initCore();
  }

  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => selectMode(btn.dataset.mode));
  });

  handleRoute();
});
