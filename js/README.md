# 🥖 Daily French — Documentation Développeur

> App quiz de français quotidien pour anglophones 40+ vivant en France.  
> Philosophie : **la vie réelle avant la grammaire**. Parler vite, bien, avec confiance.

-----

## 📁 Structure des fichiers

```
/
├── index.html              # Page d'accueil (landing)
├── quiz.html               # Moteur de quiz principal ← FICHIER CENTRAL
├── dashboard.html          # Espace personnel (stats, badges, progression)
├── vocabulary.html         # Lexique interactif FR⇆EN avec phonétique
│
├── games/
│   ├── listen.html         # 🎧 Listen & Repeat (prononciation, STT/TTS)
│   └── phrase-builder.html # 🧩 Phrase Builder (construction drag & drop)
│
├── js/
│   ├── config.js           # SUBJECT_CONFIG + LEVEL_NAMES (20 niveaux)
│   ├── data.js             # LESSONS_DATA + QUESTIONS_DB (1-20) ← 113Ko
│   ├── vocabulary-data.js  # VOCABULARY_BDD (= ancien BDDlexique.js renommé)
│   ├── vocabulary-engine.js# Surlignement vocab + popup modale
│   ├── players.js          # Gestion profils joueurs (getPlayers, switchPlayer…)
│   ├── ui-utils.js         # Toast, export/import, popup, navigation
│   ├── game-engine.js      # Logique quiz pure (renderQuestion, validateAnswer…)
│   ├── phrase-data.js      # PHRASE_BLOCKS (5 niveaux pour Phrase Builder)
│   └── audio-data.js       # AUDIO_PHRASES (5 séries pour Listen & Repeat)
│
├── css/
│   └── styles.css          # CSS global pour quiz.html (= ancien styles.js renommé!)
│
└── assets/
    ├── audio/              # Fichiers MP3 (optionnel, fallback TTS si absent)
    ├── icons/
    └── pictures/
```

-----

## 🔑 LocalStorage — clés utilisées

|Clé                      |Fichier                  |Contenu                                          |
|-------------------------|-------------------------|-------------------------------------------------|
|`dailyFrench_players`    |config.js                |Profils joueurs (progression, scores, historique)|
|`dailyFrench_v1`         |config.js                |Session active                                   |
|`dailyFrench_listenStats`|games/listen.html        |Stats prononciation                              |
|`dailyFrench_phraseStats`|games/phrase-builder.html|Stats construction                               |
|`dailyFrench_genius`     |*(à créer)*              |Mots favoris personnels (feature Génie)          |


> ⚠️ Ne JAMAIS utiliser `francaisMaster_*` — ancienne clé, supprimée.

-----

## 🚨 Ordre de chargement des scripts (quiz.html)

```html
<!-- OBLIGATOIRE dans cet ordre -->
<script src="js/config.js"></script>        <!-- 1. SUBJECT_CONFIG -->
<script src="js/data.js"></script>          <!-- 2. LESSONS_DATA + QUESTIONS_DB -->
<script src="js/vocabulary-data.js"></script><!-- 3. VOCABULARY_BDD -->
<script src="js/vocabulary-engine.js"></script><!-- 4. highlightVocabularyWords() -->
<script src="js/players.js"></script>       <!-- 5. getPlayers(), switchPlayer()… -->
<script src="js/ui-utils.js"></script>      <!-- 6. showToast(), exportSave()… -->
<script src="js/game-engine.js"></script>   <!-- 7. startLevel(), validateAnswer()… -->
```

> ⚠️ game-engine.js dépend de players.js et ui-utils.js. Ne pas inverser.

-----

## 🐛 Bugs connus / Corrections apportées

### ✅ Corrigés dans cette session

|Bug                                       |Fichier             |Fix                                       |
|------------------------------------------|--------------------|------------------------------------------|
|`SUBJECT_CONFIG` déclaré 2x → crash JS    |data.js             |Supprimé de data.js (reste dans config.js)|
|`(?<<![` regex lookbehind double `<`      |vocabulary-engine.js|Corrigé → `(?<![`                         |
|`politetetetete` / `masculineeeee`        |data.js             |Suppressions, contenu nettoyé             |
|`vocabulary-envgine.js` (typo nom fichier)|GitHub              |À renommer → `vocabulary-engine.js`       |
|`css/styles.js` (mauvaise extension)      |GitHub              |À renommer → `css/styles.css`             |
|Niveaux 12-20 sans questions              |data.js             |10 QCM + 10 écrit créés pour chaque       |
|Nav inconsistante entre pages             |tous                |Nav unifiée 7 boutons sur toutes les pages|
|`?section=niveaux` URL non gérée          |game-engine.js      |Handler `?section=X` ajouté               |
|Badges 31-40 dupliquaient 12-20           |dashboard.html      |Refait avec 30 badges uniques             |

### ⚠️ À faire sur GitHub (renommage)

```
css/styles.js         → css/styles.css       ← critique, sans ça pas de CSS
js/vocabulary-envgine.js → js/vocabulary-engine.js ← critique, fichier introuvable
```

### 🗑️ Fichiers à supprimer sur GitHub

```
dashboardd.html       (doublon)
quizzz.html           (doublon)
lexique.html          (remplacé par vocabulary.html)
lexique-engine.js     (remplacé par vocabulary-engine.js)
BDDlexique.js         (renommé vocabulary-data.js)
```

-----

## 📐 Règles impératives (ne jamais casser)

1. **Toujours commencer avec Bonjour** — la politesse est pédagogiquement fondamentale
1. **localStorage key = `dailyFrench_players`** — ne jamais changer
1. **SUBJECT_CONFIG uniquement dans config.js** — jamais redéclaré ailleurs
1. **Les jeux (games/) chargent `../js/` avec chemin relatif** — ne pas déplacer le dossier js/
1. **vocabulary-data.js = VOCABULARY_BDD** — variable globale, pas de module ES
1. **Pas de dépendances externes** (sauf Google Fonts optionnel) — tout doit marcher offline
1. **iOS autocapitalize/autocorrect off** sur tous les inputs de réponse libre
1. **Ne jamais réduire maxLevel** en dessous de 20

-----

## 🗺️ Niveaux — structure QUESTIONS_DB

```javascript
QUESTIONS_DB[N] = {
  title: "Title with emoji",
  objective: "What the player learns",
  hint: "Pedagogical reminder tip",
  qcm: [
    { q: "Question text", options: ["A","B","C","D"], correct: "A", explanation: "Why A is correct" }
    // × 10 questions
  ],
  libre: [
    { q: "Question text", answer: "Correct answer", alternatives: ["also ok"], explanation: "..." }
    // × 10 questions
  ]
}
```

-----

## 🎓 Niveaux 1-20 — thèmes

|# |Thème                 |Focus pédagogique                            |
|--|----------------------|---------------------------------------------|
|1 |Greetings 🙋           |Bonjour, vous/tu, se présenter               |
|2 |At the market 🛒       |Je voudrais, c’est combien, s’il vous plaît  |
|3 |In the garden 🌿       |Verbes jardinage, vocabulary nature          |
|4 |Neighbours 🏘️          |Depuis, s’inscrire, voisinage                |
|5 |Tastes & desires ❤️    |J’aime/j’adore/je n’aime pas                 |
|6 |At the shops 🏬        |Boulangerie, pharmacie, payer                |
|7 |Friends & going out 👫 |Invitations, ça vous dit de, libre           |
|8 |Weather 🌤️             |Il fait, il pleut, saisons                   |
|9 |Essential verbs ⚡     |être/avoir/aller/faire/vouloir/pouvoir       |
|10|Politeness 🎩          |S’il vous plaît, excusez-moi, pourriez-vous  |
|11|Daily life in France 🇫🇷|Mairie, carte Vitale, factures               |
|12|My Routine 🌅          |Passé composé (avoir + participe)            |
|13|My Emotions ❤️         |Être + adjectifs émotionnels                 |
|14|My Needs 🍽️            |Avoir faim/soif/sommeil/besoin/envie         |
|15|My House 🏡            |Faire le ménage, passer l’aspirateur         |
|16|My Family 👨‍👩‍👧           |mon/ma/mes, famille vocab                    |
|17|My Plans 📅            |Futur proche : aller + infinitif             |
|18|My Health 💊           |J’ai mal à la/au/aux, rendez-vous médecin    |
|19|My Cooking 🍳          |Couper, mélanger, faire chauffer, servir     |
|20|Living French 🗣️       |Ça marche, bof, nickel, pas terrible, en fait|

-----

## 🎮 Mini-jeux (games/)

### 🎧 Listen & Repeat (`games/listen.html`)

- Web Speech API : TTS (lecture) + STT (reconnaissance)
- 5 séries × 5 phrases = 25 phrases avec phonétique et tips
- localStorage : `dailyFrench_listenStats`
- Dépendances : `../js/config.js`, `../js/audio-data.js`
- ⚠️ HTTPS requis pour le micro en production

### 🧩 Phrase Builder (`games/phrase-builder.html`)

- Drag & Drop (HTML5 + Touch Events)
- 5 niveaux : être/avoir → aller/faire → vouloir/devoir → passé composé → futur proche
- localStorage : `dailyFrench_phraseStats`
- Dépendances : `../js/config.js`, `../js/phrase-data.js`

-----

## 💡 Features à créer — Roadmap

### 🔮 Court terme (prêtes à coder)

#### 🪔 “Mon Génie” — lexique personnel

- Bouton flottant 🪔 sur toutes les pages
- Clic sur ⭐ dans vocabulary.html → ajoute le mot au Génie
- localStorage : `dailyFrench_genius`
- Page dédiée ou panneau latéral : mots favoris + difficiles
- Permet de créer un mini-quiz sur SES mots à soi

#### 🗺️ Dashboard “Parcours” (à refaire)

- Carte visuelle du parcours (pas de tabs ennuyeux)
- 20 nœuds reliés par un chemin = niveaux
- Chaque nœud = complété ✅ / en cours 🎯 / verrouillé 🔒
- Clic nœud → ouvre vocab du niveau OU lance le quiz
- Inspiration : carte de jeu vidéo, pas Duolingo

#### 📍 Parcours thématiques

- Regroupements de niveaux par situation de vie :
  - 🏥 “Chez le médecin” (niveaux 18 + 14 + 10)
  - 🛒 “Au marché” (niveaux 2 + 5 + 6)
  - 🏠 “Ma maison” (niveaux 15 + 12 + 3)
  - 👥 “Vie sociale” (niveaux 4 + 7 + 1)
  - 🏛️ “Admin française” (niveaux 11 + 16 + 17)

### 🚀 Moyen terme

- Mode SRS (révision espacée intelligente)
- Export PDF “ma fiche de révision personnelle”
- Mode “dialogue” — conversations simulées
- PWA (Progressive Web App) — installable sur iPhone

### 🌟 Long terme

- Vocabulaire personnel : l’utilisateur ajoute ses propres mots
- Mode “ma semaine” — 7 sessions planifiées adaptées
- Export/partage de fiches d’erreurs (PDF)

-----

## 🎨 Direction artistique

### Actuelle (quiz.html / dashboard)

- Gradient violet → indigo
- Cartes blanches arrondies
- Sobre et fonctionnel

### Moderne (listen.html / phrase-builder.html / vocabulary.html)

- Glassmorphism (backdrop-filter: blur)
- Orbes de couleur animés en fond
- Police Inter (Google Fonts)
- Gradient dynamique 3 couleurs
- Ombres profondes, border inset blanc

### Inspiration graphique recommandée (hors apps de langues)

- **Jeux mobiles RPG** : carte de progression, nœuds reliés
- **Nike Training Club** : fiches exercices épurées, progression linéaire
- **Headspace** : illustrations douces, couleurs chaudes, zen
- **Notion** : hiérarchie claire, icônes significatives
- **Linear.app** : interface ultramoderne, micro-animations

-----

## 🔧 Checklists de déploiement

### Avant de pousser sur GitHub Pages

```
✅ Renommer css/styles.js → css/styles.css
✅ Renommer vocabulary-envgine.js → vocabulary-engine.js
✅ Vérifier que games/ est au même niveau que quiz.html
✅ Tester les liens games/listen.html et games/phrase-builder.html
✅ Vérifier que vocabulary-data.js contient VOCABULARY_BDD
✅ Supprimer les fichiers doublon (dashboardd, quizzz, lexique, BDDlexique)
```

### Test rapide (console navigateur)

```javascript
// Vérifier que tout est chargé
console.log('Config:', typeof SUBJECT_CONFIG)    // 'object'
console.log('Data:', LESSONS_DATA.length)         // 20
console.log('Questions:', Object.keys(QUESTIONS_DB).length) // 20
console.log('Vocab:', VOCABULARY_BDD.length)      // X mots
```

-----

## 📞 Contacts & contexte

- **Hébergement** : GitHub Pages (eka-dev5.github.io)
- **Cible** : Anglophones 40-70 ans vivant en France (rural, village)
- **Philosophie** : vie réelle > grammaire | confiance > perfection
- **Stack** : HTML + CSS + vanilla JS | zéro framework | zéro backend
- **Compatibilité** : Chrome ✅ Safari ✅ Firefox ✅ iOS ✅
- **HTTPS** : requis pour micro (Listen & Repeat)

-----

*README généré le 24/05/2026 — Daily French v3*