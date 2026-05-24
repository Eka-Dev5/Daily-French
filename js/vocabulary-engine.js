// ═══════════════════════════════════════════════════════════════════
// VOCABULARY ENGINE — Daily French 🥖
// Surlignement + popup modale (dépend de vocabulary-data.js)
// ═══════════════════════════════════════════════════════════════════

/**
 * Surligne les mots du vocabulaire dans un texte HTML.
 * Retourne le HTML modifié avec spans cliquables.
 */
function highlightVocabularyWords(text) {
  if (typeof VOCABULARY_BDD === "undefined" || !text) return text;

  // Trier par longueur DESC pour éviter collisions (ex: "je" avant "je suis")
  const sorted = [...VOCABULARY_BDD].sort((a, b) => b.fr.length - a.fr.length);
  let result = text;

  sorted.forEach(word => {
    const escaped = word.fr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // FIX: lookbehind correct — un seul < (pas deux)
    const regex = new RegExp(
      "(?<![\\w'\\u00C0-\\u024F])(" + escaped + ")(?![\\w'\\u00C0-\\u024F])",
      "gi"
    );
    if (!regex.test(result)) return;
    regex.lastIndex = 0;
    result = result.replace(regex, function(match) {
      const safeKey = word.fr.replace(/'/g, "\\'");
      const tooltip = (word.phon ? word.phon + " — " : "") + word.en;
      return (
        '<span class="vocab-highlight" onclick="event.stopPropagation();openVocabPopup(\'' +
        safeKey + '\')">' +
        match +
        '<span class="vocab-tooltip">' + tooltip +
        (word.def ? '<br><em style="font-size:.8em;color:#a0aec0">' + word.def + '</em>' : '') +
        '</span></span>'
      );
    });
  });

  return result;
}

/**
 * Surligne les mots dans le contenu des leçons déjà affichées.
 * Sécurisé : ne traite pas deux fois le même élément.
 */
function highlightLessonsContent() {
  if (typeof VOCABULARY_BDD === "undefined") return;
  document.querySelectorAll(
    ".lesson-rule p, .lesson-example, .lesson-warning, " +
    "#lessonIntroContent p, #lessonIntroContent div, " +
    ".lesson-body p, .lesson-body li"
  ).forEach(function(el) {
    if (!el.querySelector(".vocab-highlight")) {
      el.innerHTML = highlightVocabularyWords(el.innerHTML);
    }
  });
}
