<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>README — Phrase Builder 🧩</title>
<style>
:root{--primary:#667eea;--secondary:#764ba2;--bg:#f7fafc;--text:#2d3748;--muted:#718096;--border:#e2e8f0}
*{box-sizing:border-box;margin:0;padding:0;font-family:"Segoe UI",system-ui,sans-serif}
body{background:linear-gradient(135deg,#f59e0b,#ef4444);min-height:100vh;padding:20px}
.card{max-width:850px;margin:0 auto;background:white;border-radius:20px;padding:30px;box-shadow:0 20px 60px rgba(0,0,0,.25)}
h1{font-size:2em;font-weight:800;background:linear-gradient(135deg,#f59e0b,#ef4444);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:6px}
.subtitle{color:var(--muted);margin-bottom:25px;font-size:.95em}
h2{color:#f59e0b;font-size:1.3em;margin:25px 0 12px;padding-bottom:8px;border-bottom:2px solid var(--border)}
h3{color:#ef4444;font-size:1.05em;margin:18px 0 8px}
p,li{color:var(--text);line-height:1.7;margin:8px 0;font-size:.92em}
ul,ol{margin:10px 0 10px 25px}
li{margin:5px 0}
code{background:#fef3c7;padding:2px 8px;border-radius:6px;font-family:monospace;font-size:.85em;color:#92400e}
pre{background:#1a202c;color:#e2e8f0;padding:16px;border-radius:12px;overflow-x:auto;font-size:.85em;line-height:1.5;margin:12px 0}
table{width:100%;border-collapse:collapse;margin:15px 0;font-size:.88em}
th{background:linear-gradient(135deg,#f59e0b,#ef4444);color:white;padding:10px;text-align:left;font-weight:600}
td{padding:10px;border-bottom:1px solid var(--border)}
tr:nth-child(even){background:#f8fafc}
.badge{display:inline-block;padding:3px 10px;border-radius:12px;font-size:.75em;font-weight:700;margin:2px}
.badge-green{background:#c6f6d5;color:#276749}
.badge-red{background:#fed7d7;color:#c53030}
.badge-yellow{background:#fefcbf;color:#744210}
</style>
</head>
<body>
<div class="card">

<h1>🧩 README — Phrase Builder</h1>
<div class="subtitle">Documentation développeur — Mini-jeu construction</div>

<h2>🎯 Vue d'ensemble</h2>
<p><strong>Projet</strong> : Daily French — Phrase Builder 🧩</p>
<p><strong>Type</strong> : Mini-jeu autonome (dossier games/)</p>
<p><strong>Cible</strong> : Anglophones 40+ apprenant la grammaire par construction</p>
<p><strong>Technologie</strong> : Drag & Drop HTML5 + Touch Events, vanilla JS</p>
<p><strong>Emplacement</strong> : <code>/daily-french/games/phrase-builder.html</code></p>

<h2>📁 Structure du fichier</h2>
<pre>
games/phrase-builder.html
├── &lt;head&gt;
│   ├── CSS intégré (~350 lignes)
│   └── Google Fonts : Inter
├── &lt;body&gt;
│   ├── Header + Score board
│   ├── Navigation bar
│   ├── Sélecteur de niveau
│   ├── Mission box
│   ├── Blocks pool (draggables)
│   ├── Drop zone
│   ├── Controls
│   ├── Feedback
│   ├── Collection
│   └── Mnemonic popup
└── &lt;script&gt;
    ├── PhraseApp
    │   ├── PHRASE_BLOCKS[]
    │   ├── mnemos[]
    │   ├── init()
    │   ├── renderLevels()
    │   ├── loadLevel() / loadMission()
    │   ├── createBlock()
    │   ├── checkPhrase()
    │   ├── speakPhrase()
    │   └── savePhraseProgress()
    └── DOMContentLoaded → PhraseApp.init()
</pre>

<h2>🔗 Dépendances</h2>
<table>
<tr><th>Fichier</th><th>Chemin</th><th>Usage</th></tr>
<tr><td><code>../js/config.js</code></td><td>Relatif</td><td>SUBJECT_CONFIG</td></tr>
<tr><td><code>../js/phrase-data.js</code></td><td>Relatif</td><td>PHRASE_BLOCKS</td></tr>
<tr><td><code>../js/vocabulary-data.js</code></td><td>Relatif</td><td>VOCABULARY_BDD</td></tr>
<tr><td>Web Speech API</td><td>Navigateur</td><td>TTS</td></tr>
</table>

<h2>🔑 Clés localStorage</h2>
<table>
<tr><th>Clé</th><th>Contenu</th><th>Format</th></tr>
<tr><td><code>dailyFrench_phraseStats</code></td><td>Stats + badges + collection</td><td><code>{stats: {...}, badges: [...], collection: [...]}</code></td></tr>
</table>
<p><span class="badge badge-red">⚠️</span> Ne JAMAIS utiliser dailyFrench_v1 ou dailyFrench_players.</p>

<h2>🎮 Fonctionnalités</h2>

<h3>Mode Shu (守) — Copier</h3>
<p>Blocs pré-faits à assembler. Feedback immédiat (vert/rouge). Pas de règle affichée.</p>

<h3>Mode Ha (破) — Comprendre</h3>
<p>Tooltips après 3 erreurs. Mode "Réparation". Mnémoniques visuelles.</p>

<h3>Mode Ri (離) — Créer</h3>
<p>Mode "Libre" sans contraintes. Collection personnelle. Partage possible.</p>

<h3>Types de blocs colorés</h3>
<table>
<tr><th>Type</th><th>Couleur</th><th>Exemples</th></tr>
<tr><td>Sujet</td><td>🔵 Bleu</td><td>Je, Tu, Il, Elle, Nous, Vous</td></tr>
<tr><td>Verbe</td><td>🟢 Vert</td><td>suis, ai, vais, fais, prends</td></tr>
<tr><td>Complément</td><td>🟡 Jaune</td><td>fatigué, à Paris, demain</td></tr>
<tr><td>Négation</td><td>🔴 Rouge</td><td>ne, pas, plus, jamais</td></tr>
<tr><td>Auxiliaire</td><td>🟣 Violet</td><td>ai, as, a, suis, es, est</td></tr>
<tr><td>Participe passé</td><td>🟣 Violet clair</td><td>mangé, fini, allé, pris</td></tr>
<tr><td>Conjonction</td><td>🟢 Turquoise</td><td>quand, parce que, si, mais</td></tr>
</table>

<h2>🎨 Design System</h2>
<table>
<tr><th>Élément</th><th>Valeur</th></tr>
<tr><td>Police</td><td>Inter</td></tr>
<tr><td>Fond</td><td>Dégradé violet→rose</td></tr>
<tr><td>Carte</td><td>Blanc, radius 20px</td></tr>
<tr><td>Blocs</td><td>Border-radius 10px, cursor grab</td></tr>
<tr><td>Drop zone</td><td>Dashed border, highlight au drag</td></tr>
</table>

<h2>🔧 Modification</h2>
<h3>Ajouter un niveau</h3>
<pre>
// js/phrase-data.js
const PHRASE_BLOCKS = {
  11: {
    title: "Le conditionnel",
    sujets: ["Je", "Tu", "Il"],
    verbes: ["voudrais", "aimerais", "pourrais"],
    complements: ["un café", "de l'aide"],
    specials: [{text: "si", type: "conj"}],
    missions: [
      { target: "Je voudrais un café", hint: "🎩 Politesse", en: "I would like a coffee" }
    ]
  }
};
</pre>

<h3>Ajouter une mnémonique</h3>
<pre>
// phrase-builder.html, dans mnemos :
11: {
  emoji: "🎩",
  title: "Le conditionnel",
  text: "🎩 = chapeau de gentleman (politesse)"
}
</pre>

<h2>🐛 Compatibilité</h2>
<table>
<tr><th>Navigateur</th><th>Drag & Drop</th><th>Touch</th><th>TTS</th></tr>
<tr><td>Chrome</td><td>✅</td><td>✅</td><td>✅</td></tr>
<tr><td>Edge</td><td>✅</td><td>✅</td><td>✅</td></tr>
<tr><td>Safari</td><td>✅</td><td>✅</td><td>✅</td></tr>
<tr><td>Firefox</td><td>✅</td><td>✅</td><td>✅</td></tr>
</table>

<h2>📋 Checklist</h2>
<pre>
# Chemins
grep -c "../js/" games/phrase-builder.html

# localStorage
grep "localStorage" games/phrase-builder.html

# TTS
grep -c "SpeechSynthesisUtterance" games/phrase-builder.html
</pre>

<h2>🗺️ Roadmap</h2>
<h3>Court terme</h3>
<ul>
<li><span class="badge badge-yellow">⏳</span> Test drag & drop mobile</li>
<li><span class="badge badge-yellow">⏳</span> Ajuster difficulté</li>
<li><span class="badge badge-yellow">⏳</span> Mode "Réparation"</li>
</ul>

<h3>Moyen terme</h3>
<ul>
<li><span class="badge badge-blue">🔮</span> Niveaux 11-20</li>
<li><span class="badge badge-blue">🔮</span> Mode "Tétris grammatical"</li>
<li><span class="badge badge-blue">🔮</span> Export collection</li>
</ul>

<h3>Long terme</h3>
<ul>
<li><span class="badge badge-green">🚀</span> IA génération personnalisée</li>
<li><span class="badge badge-green">🚀</span> Mode duel</li>
<li><span class="badge badge-green">🚀</span> Intégration SRS</li>
</ul>

</div>
</body>
</html>
