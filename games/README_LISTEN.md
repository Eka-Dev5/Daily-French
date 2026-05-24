<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>README — Listen & Repeat 🎧</title>
<style>
:root{--primary:#667eea;--secondary:#764ba2;--bg:#f7fafc;--text:#2d3748;--muted:#718096;--border:#e2e8f0}
*{box-sizing:border-box;margin:0;padding:0;font-family:"Segoe UI",system-ui,sans-serif}
body{background:linear-gradient(135deg,#06b6d4,#3b82f6);min-height:100vh;padding:20px}
.card{max-width:850px;margin:0 auto;background:white;border-radius:20px;padding:30px;box-shadow:0 20px 60px rgba(0,0,0,.25)}
h1{font-size:2em;font-weight:800;background:linear-gradient(135deg,#06b6d4,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:6px}
.subtitle{color:var(--muted);margin-bottom:25px;font-size:.95em}
h2{color:#06b6d4;font-size:1.3em;margin:25px 0 12px;padding-bottom:8px;border-bottom:2px solid var(--border)}
h3{color:#3b82f6;font-size:1.05em;margin:18px 0 8px}
p,li{color:var(--text);line-height:1.7;margin:8px 0;font-size:.92em}
ul,ol{margin:10px 0 10px 25px}
li{margin:5px 0}
code{background:#e0f2fe;padding:2px 8px;border-radius:6px;font-family:monospace;font-size:.85em;color:#0369a1}
pre{background:#1a202c;color:#e2e8f0;padding:16px;border-radius:12px;overflow-x:auto;font-size:.85em;line-height:1.5;margin:12px 0}
table{width:100%;border-collapse:collapse;margin:15px 0;font-size:.88em}
th{background:linear-gradient(135deg,#06b6d4,#3b82f6);color:white;padding:10px;text-align:left;font-weight:600}
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

<h1>🎧 README — Listen & Repeat</h1>
<div class="subtitle">Documentation développeur — Mini-jeu prononciation</div>

<h2>🎯 Vue d'ensemble</h2>
<p><strong>Projet</strong> : Daily French — Listen & Repeat 🎧</p>
<p><strong>Type</strong> : Mini-jeu autonome (dossier games/)</p>
<p><strong>Cible</strong> : Anglophones 40+ apprenant le français oral</p>
<p><strong>Technologie</strong> : Web Speech API (TTS + STT), vanilla JS</p>
<p><strong>Emplacement</strong> : <code>/daily-french/games/listen.html</code></p>

<h2>📁 Structure du fichier</h2>
<pre>
games/listen.html
├── &lt;head&gt;
│   ├── CSS intégré (~400 lignes, design ultra-moderne)
│   └── Google Fonts : Inter
├── &lt;body&gt;
│   ├── Orbes animés en fond (bg-orb)
│   ├── Container confetti (confetti-container)
│   ├── Popup badges (badge-popup)
│   ├── Header + Stats bar (streak, accuracy, badges)
│   ├── Navigation bar (liens vers ../pages racine)
│   ├── Sélecteur de niveau (level-bar)
│   ├── Main card
│   │   ├── Category tag
│   │   ├── Voice circle (cercle micro pulsing)
│   │   ├── Phrase words (karaoké pills)
│   │   ├── Phonetic + Translation
│   │   ├── Wave visualizer (9 barres animées)
│   │   ├── Action buttons (Listen, Record, Next)
│   │   └── Result panel (score, anneau, tip)
│   └── Footer
└── &lt;script&gt;
    ├── ListenApp (objet principal)
    │   ├── pronunciationPhrases[] (20 phrases dédiées)
    │   ├── badgeDefs[] (6 badges prononciation)
    │   ├── init()
    │   ├── loadPhrases() (extrait QUESTIONS_DB + phrases dédiées)
    │   ├── nextPhrase()
    │   ├── listen() / speakText() / speakWord()
    │   ├── record() (STT avec SpeechRecognition)
    │   ├── matchWordsInRealTime()
    │   ├── evaluatePronunciation()
    │   ├── normalize() + calculateSimilarity() (Levenshtein)
    │   ├── startWaveAnimation() / stopWaveAnimation()
    │   ├── launchConfetti()
    │   ├── checkBadges() / showBadgeNotification()
    │   └── loadStats() / saveStats() / updateUI()
    └── DOMContentLoaded → ListenApp.init()
</pre>

<h2>🔗 Dépendances</h2>
<table>
<tr><th>Fichier</th><th>Chemin</th><th>Usage</th></tr>
<tr><td><code>../js/config.js</code></td><td>Relatif</td><td>SUBJECT_CONFIG</td></tr>
<tr><td><code>../js/data.js</code></td><td>Relatif</td><td>QUESTIONS_DB</td></tr>
<tr><td><code>../js/audio-data.js</code></td><td>Relatif</td><td>AUDIO_PHRASES</td></tr>
<tr><td>Web Speech API</td><td>Navigateur</td><td>TTS + STT</td></tr>
</table>
<p><span class="badge badge-yellow">⚠️</span> PAS besoin de speech-engine.js ni voice-engine.js — le moteur est intégré.</p>

<h2>🔑 Clés localStorage</h2>
<table>
<tr><th>Clé</th><th>Contenu</th><th>Format</th></tr>
<tr><td><code>dailyFrench_listenStats</code></td><td>Stats + badges</td><td><code>{stats: {total, good, partial, streak, bestStreak}, badges: ['id1', ...]}</code></td></tr>
</table>
<p><span class="badge badge-red">⚠️</span> Ne JAMAIS utiliser dailyFrench_v1 ou dailyFrench_players.</p>

<h2>🎯 Fonctionnalités</h2>

<h3>Mode Shadowing</h3>
<ol>
<li><span style="font-size:1.3em">🔊</span> <strong>Listen</strong> : TTS lit la phrase (rate: 0.85, lang: fr-FR)</li>
<li><span style="font-size:1.3em">🎤</span> <strong>Record</strong> : STT écoute la répétition</li>
<li><span style="font-size:1.3em">✅</span> <strong>Score</strong> : Similarité Levenshtein</li>
<li><span style="font-size:1.3em">💡</span> <strong>Feedback</strong> : Tip pédagogique spécifique</li>
</ol>

<h3>Karaoké Vocal</h3>
<ul>
<li>Gris = à prononcer</li>
<li>Vert néon = correct (seuil 60%)</li>
<li>Rouge pulse = incorrect</li>
<li>Violet glow = mot en cours TTS</li>
</ul>

<h3>Sons difficiles couverts</h3>
<table>
<tr><th>Catégorie</th><th>Exemple</th><th>Tip</th></tr>
<tr><td>R français</td><td>"La rue est rouge"</td><td>Guttural, arrière gorge</td></tr>
<tr><td>Liaisons</td><td>"Les amis arrivent"</td><td>S → Z devant voyelle</td></tr>
<tr><td>Voyelles nasales</td><td>"Le pain est bon"</td><td>Air par le nez, pas le N</td></tr>
<tr><td>U français</td><td>"Tu es sur la lune"</td><td>Lèvres rondes + langue haute</td></tr>
<tr><td>Enchaînements</td><td>"Il est arrivé"</td><td>Pas de pause entre mots</td></tr>
</table>

<h2>🎨 Design System</h2>
<table>
<tr><th>Élément</th><th>Valeur</th></tr>
<tr><td>Police</td><td>Inter (Google Fonts)</td></tr>
<tr><td>Fond</td><td>Dégradé animé violet→rose→bleu</td></tr>
<tr><td>Carte</td><td>Glassmorphism, radius 24px</td></tr>
<tr><td>Pills</td><td>Border-radius 9999px</td></tr>
<tr><td>Vert succès</td><td>#10b981 + glow</td></tr>
<tr><td>Rouge erreur</td><td>#ef4444 + glow</td></tr>
<tr><td>Cercle micro</td><td>180px, pulse animation</td></tr>
</table>

<h2>🔧 Modification</h2>
<h3>Ajouter une phrase</h3>
<pre>
// Dans ListenApp.pronunciationPhrases :
{
  fr: "Ta phrase ici.",
  phon: "*phonétique*",
  en: "Traduction anglaise.",
  cat: "🎯 Catégorie",
  tip: "Conseil spécifique."
}
</pre>

<h3>Ajouter un badge</h3>
<pre>
// Dans ListenApp.badgeDefs :
{
  id: 'mon_badge',
  name: '🏅 Nom du Badge',
  condition: (s) => s.total >= X && (s.good/s.total) >= Y,
  desc: 'Description'
}
</pre>

<h3>Modifier les seuils</h3>
<pre>
// matchWordsInRealTime() : seuil = 0.7
// evaluatePronunciation() : correct = 0.6, excellent = 0.85
</pre>

<h2>🐛 Compatibilité</h2>
<table>
<tr><th>Navigateur</th><th>TTS</th><th>STT</th><th>Notes</th></tr>
<tr><td>Chrome</td><td>✅</td><td>✅</td><td>Recommandé</td></tr>
<tr><td>Edge</td><td>✅</td><td>✅</td><td>Recommandé</td></tr>
<tr><td>Safari</td><td>✅</td><td>⚠️</td><td>STT limité</td></tr>
<tr><td>Firefox</td><td>✅</td><td>❌</td><td>STT non supporté</td></tr>
</table>
<p>HTTPS requis en production pour le micro.</p>

<h2>📋 Checklist</h2>
<pre>
# Chemins relatifs
grep -c "../js/" games/listen.html    # → 3
grep -c "../" games/listen.html       # → liens nav

# Pas de conflit localStorage
grep "localStorage" games/listen.html  # → dailyFrench_listenStats

# Web Speech API
grep -c "speechSynthesis\|SpeechRecognition" games/listen.html
</pre>

<h2>🗺️ Roadmap</h2>
<h3>Court terme</h3>
<ul>
<li><span class="badge badge-yellow">⏳</span> Test micro + qualité reco</li>
<li><span class="badge badge-yellow">⏳</span> Ajuster seuils</li>
<li><span class="badge badge-yellow">⏳</span> Mode "Mot par mot"</li>
</ul>

<h3>Moyen terme</h3>
<ul>
<li><span class="badge badge-blue">🔮</span> Quiz inverse EN→FR</li>
<li><span class="badge badge-blue">🔮</span> Dialogues "vie de village"</li>
<li><span class="badge badge-blue">🔮</span> Export audio hors-ligne</li>
</ul>

<h3>Long terme</h3>
<ul>
<li><span class="badge badge-green">🚀</span> Pitch/mélodie</li>
<li><span class="badge badge-green">🚀</span> IA phonème par phonème</li>
<li><span class="badge badge-green">🚀</span> Mode duel familial</li>
</ul>

</div>
</body>
</html>
