// lexique-engine.js — Français Master
// Moteur de surlignement des mots du lexique dans les questions et leçons
// Dépend de BDDlexique.js (LEXIQUE_BDD doit être chargé avant)

/**
 * Surligne les mots du lexique présents dans un texte HTML.
 * Ajoute un tooltip au survol (desktop) + clic pour popup modale.
 */
function highlightLexiqueWords(text) {
  if (typeof LEXIQUE_BDD === "undefined") return text;
  let result = text;
  const sorted = [...LEXIQUE_BDD].sort((a, b) => b.fr.length - a.fr.length);

  sorted.forEach(word => {
    const escaped = word.fr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(
      "(?<![\\w'\\u00C0-\\u024F])(" + escaped + ")(?![\\w'\\u00C0-\\u024F])",
      "gi"
    );
    if (regex.test(result)) {
      result = result.replace(regex, function(match) {
        const safeKey = word.fr.replace(/'/g, "\\'");
        const tooltip = (word.phon || "") + " " + word.en;
        return (
          "<span class=\"lex-highlight\" onclick=\"event.stopPropagation();openLexPopup('" +
          safeKey + "')\">" +
          match +
          "<span class=\"lex-tooltip\">" + tooltip +
          "<br><em style=\"font-size:.8em;color:#a0aec0\">" + word.def + "</em></span>" +
          "</span>"
        );
      });
    }
  });
  return result;
}

/**
 * Surligne les mots dans le contenu des leçons déjà affichées.
 * Sécurisé : ne traite pas deux fois le même élément.
 */
function highlightLessonsContent() {
  if (typeof LEXIQUE_BDD === "undefined") return;
  document.querySelectorAll(
    ".lesson-rule p, .lesson-example, .lesson-warning, #lessonIntroContent p, #lessonIntroContent div"
  ).forEach(function(el) {
    if (!el.querySelector(".lex-highlight")) {
      el.innerHTML = highlightLexiqueWords(el.innerHTML);
    }
  });
}
