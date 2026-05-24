// ═══════════════════════════════════════════════════════════════════
// DATA.JS — Daily French 🥖
// LESSONS_DATA (1-20) + QUESTIONS_DB (1-20)
// NOTE: SUBJECT_CONFIG est dans config.js — NE PAS redéclarer ici
// ═══════════════════════════════════════════════════════════════════

// ── LESSONS DATA ──────────────────────────────────────────────────
const LESSONS_DATA = [

{num:1, title:"Greetings & Introductions 🙋", content:`
<div class="lesson-rule">
<h4>👋 Basic greetings</h4>
<table class="lesson-table">
<tr><th>French</th><th>Phonetics</th><th>English</th></tr>
<tr><td><strong>Bonjour</strong></td><td><em>*bon-ZHOOR*</em></td><td>Hello / Good morning</td></tr>
<tr><td><strong>Bonsoir</strong></td><td><em>*bon-SWAHR*</em></td><td>Good evening</td></tr>
<tr><td><strong>Bonne nuit</strong></td><td><em>*bun NWEE*</em></td><td>Good night</td></tr>
<tr><td><strong>Au revoir</strong></td><td><em>*oh ruh-VWAHR*</em></td><td>Goodbye</td></tr>
<tr><td><strong>Salut</strong></td><td><em>*sa-LUE*</em></td><td>Hi / Bye (informal)</td></tr>
</table>
</div>
<div class="lesson-rule">
<h4>🤝 Introducing yourself</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>Je m'appelle Marie.</td><td>My name is Marie.</td></tr>
<tr><td>Je suis anglais / anglaise.</td><td>I am English (m/f).</td></tr>
<tr><td>J'habite à Lyon.</td><td>I live in Lyon.</td></tr>
<tr><td>Enchanté(e) !</td><td>Nice to meet you!</td></tr>
</table>
</div>
<div class="lesson-warning">⚠️ Always use <strong>vous</strong> (formal) with strangers, shopkeepers and officials. <strong>Tu</strong> is for friends and children only.</div>
<div class="lesson-example">
<strong>Dialogue :</strong><br>
— Bonjour Madame, je m'appelle John. <button class="lesson-ex-btn" onclick="toggleLessonEx(this,event)">🇬🇧 English</button>
<span class="lesson-ex-en">Good morning, my name is John.</span><br>
— Bonjour ! Enchanté. Vous habitez ici ? <button class="lesson-ex-btn" onclick="toggleLessonEx(this,event)">🇬🇧 English</button>
<span class="lesson-ex-en">Hello! Nice to meet you. Do you live here?</span>
</div>
`},

{num:2, title:"At the Market 🛒", content:`
<div class="lesson-rule">
<h4>🥖 Useful phrases at the market</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>Je voudrais...</td><td>I would like...</td></tr>
<tr><td>Avez-vous... ?</td><td>Do you have... ?</td></tr>
<tr><td>C'est combien ?</td><td>How much is it?</td></tr>
<tr><td>Un kilo de..., s'il vous plaît.</td><td>One kilo of..., please.</td></tr>
<tr><td>C'est tout, merci.</td><td>That's all, thank you.</td></tr>
</table>
</div>
<div class="lesson-rule">
<h4>🔢 Numbers for quantities</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>un / une</td><td>one</td></tr>
<tr><td>deux / trois</td><td>two / three</td></tr>
<tr><td>un demi-kilo</td><td>half a kilo</td></tr>
<tr><td>une tranche de</td><td>a slice of</td></tr>
</table>
</div>
<div class="lesson-warning">⚠️ Always say <strong>s'il vous plaît</strong> — being polite is essential in French shops and markets!</div>
<div class="lesson-example">
<strong>Dialogue :</strong><br>
— Bonjour ! Je voudrais un kilo de tomates, s'il vous plaît. <button class="lesson-ex-btn" onclick="toggleLessonEx(this,event)">🇬🇧 English</button>
<span class="lesson-ex-en">Hello! I would like a kilo of tomatoes, please.</span><br>
— Voilà ! C'est tout ? <button class="lesson-ex-btn" onclick="toggleLessonEx(this,event)">🇬🇧 English</button>
<span class="lesson-ex-en">Here you go! Is that everything?</span>
</div>
`},

{num:3, title:"In the Garden 🌿", content:`
<div class="lesson-rule">
<h4>🌱 Garden vocabulary</h4>
<table class="lesson-table">
<tr><th>French</th><th>Phonetics</th><th>English</th></tr>
<tr><td>le jardin</td><td><em>*le zhar-DAN*</em></td><td>the garden</td></tr>
<tr><td>arroser</td><td><em>*a-ro-ZAY*</em></td><td>to water</td></tr>
<tr><td>tondre la pelouse</td><td><em>*tondre la pe-LOOZ*</em></td><td>to mow the lawn</td></tr>
<tr><td>planter</td><td><em>*plan-TAY*</em></td><td>to plant</td></tr>
<tr><td>désherber</td><td><em>*day-zair-BAY*</em></td><td>to weed</td></tr>
</table>
</div>
<div class="lesson-rule">
<h4>🌸 Flowers & plants</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>une fleur / les fleurs</td><td>a flower / flowers</td></tr>
<tr><td>un légume</td><td>a vegetable</td></tr>
<tr><td>un arbre</td><td>a tree</td></tr>
<tr><td>la terre</td><td>the soil / earth</td></tr>
</table>
</div>
<div class="lesson-example">
<strong>Exemple :</strong> J'arrose le jardin ce matin. <button class="lesson-ex-btn" onclick="toggleLessonEx(this,event)">🇬🇧 English</button>
<span class="lesson-ex-en">I water the garden this morning.</span>
</div>
`},

{num:4, title:"Neighbours & Community 🏘️", content:`
<div class="lesson-rule">
<h4>🤝 Meeting your neighbours</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>mon voisin / ma voisine</td><td>my neighbour (m/f)</td></tr>
<tr><td>la mairie</td><td>the town hall</td></tr>
<tr><td>le marché</td><td>the market</td></tr>
<tr><td>tout près d'ici</td><td>very near here</td></tr>
</table>
</div>
<div class="lesson-rule">
<h4>💬 Useful phrases</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>Vous habitez ici depuis longtemps ?</td><td>Have you lived here long?</td></tr>
<tr><td>Je suis nouveau / nouvelle ici.</td><td>I'm new here (m/f).</td></tr>
<tr><td>C'est par où, le marché ?</td><td>Which way is the market?</td></tr>
<tr><td>Vous connaissez un bon médecin ?</td><td>Do you know a good doctor?</td></tr>
</table>
</div>
<div class="lesson-warning">⚠️ French neighbours love to chat! Saying <strong>bonjour</strong> first is essential — skipping it is considered rude.</div>
`},

{num:5, title:"Tastes & Desires ❤️", content:`
<div class="lesson-rule">
<h4>❤️ Expressing likes and dislikes</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>J'aime...</td><td>I like...</td></tr>
<tr><td>J'adore...</td><td>I love...</td></tr>
<tr><td>Je n'aime pas...</td><td>I don't like...</td></tr>
<tr><td>Je préfère...</td><td>I prefer...</td></tr>
<tr><td>Ça me plaît.</td><td>I like it. (lit: it pleases me)</td></tr>
</table>
</div>
<div class="lesson-rule">
<h4>🍽️ Food preferences</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>C'est délicieux !</td><td>It's delicious!</td></tr>
<tr><td>C'est trop salé / sucré.</td><td>It's too salty / sweet.</td></tr>
<tr><td>Je suis végétarien(ne).</td><td>I'm vegetarian (m/f).</td></tr>
<tr><td>Je suis allergique à...</td><td>I'm allergic to...</td></tr>
</table>
</div>
<div class="lesson-example">
<strong>Exemple :</strong> J'adore le fromage mais je n'aime pas les huîtres. <button class="lesson-ex-btn" onclick="toggleLessonEx(this,event)">🇬🇧 English</button>
<span class="lesson-ex-en">I love cheese but I don't like oysters.</span>
</div>
`},

{num:6, title:"At the Shops 🏬", content:`
<div class="lesson-rule">
<h4>🏬 Shops vocabulary</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>la boulangerie</td><td>the bakery</td></tr>
<tr><td>la pharmacie</td><td>the pharmacy</td></tr>
<tr><td>la poste</td><td>the post office</td></tr>
<tr><td>la banque</td><td>the bank</td></tr>
<tr><td>le supermarché</td><td>the supermarket</td></tr>
</table>
</div>
<div class="lesson-rule">
<h4>💳 Paying</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>Je paie par carte.</td><td>I'm paying by card.</td></tr>
<tr><td>Vous acceptez les chèques ?</td><td>Do you accept cheques?</td></tr>
<tr><td>Avez-vous la monnaie ?</td><td>Do you have change?</td></tr>
<tr><td>Un ticket de caisse, s'il vous plaît.</td><td>A receipt, please.</td></tr>
</table>
</div>
<div class="lesson-warning">⚠️ Many small French shops close at lunch (12h-14h). Always check opening hours!</div>
`},

{num:7, title:"Friends & Going Out 👫", content:`
<div class="lesson-rule">
<h4>👫 Social invitations</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>Ça vous dit de... ?</td><td>Would you like to... ?</td></tr>
<tr><td>On se retrouve où ?</td><td>Where shall we meet?</td></tr>
<tr><td>À quelle heure ?</td><td>At what time?</td></tr>
<tr><td>Je suis libre samedi.</td><td>I'm free on Saturday.</td></tr>
<tr><td>Avec plaisir !</td><td>With pleasure!</td></tr>
</table>
</div>
<div class="lesson-rule">
<h4>🎉 Places to go</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>au restaurant</td><td>to a restaurant</td></tr>
<tr><td>au café</td><td>to a café</td></tr>
<tr><td>en balade</td><td>for a walk / drive</td></tr>
<tr><td>au cinéma</td><td>to the cinema</td></tr>
</table>
</div>
<div class="lesson-example">
<strong>Exemple :</strong> Ça vous dit d'aller au restaurant samedi soir ? <button class="lesson-ex-btn" onclick="toggleLessonEx(this,event)">🇬🇧 English</button>
<span class="lesson-ex-en">Would you like to go to a restaurant on Saturday evening?</span>
</div>
`},

{num:8, title:"Weather 🌤️", content:`
<div class="lesson-rule">
<h4>☀️ Weather expressions</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>Il fait beau.</td><td>The weather is nice.</td></tr>
<tr><td>Il fait chaud / froid.</td><td>It's hot / cold.</td></tr>
<tr><td>Il pleut.</td><td>It's raining.</td></tr>
<tr><td>Il neige.</td><td>It's snowing.</td></tr>
<tr><td>Il y a du vent.</td><td>It's windy.</td></tr>
<tr><td>Il y a du brouillard.</td><td>It's foggy.</td></tr>
</table>
</div>
<div class="lesson-rule">
<h4>🌡️ Temperature & seasons</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>Il fait 25 degrés.</td><td>It's 25 degrees.</td></tr>
<tr><td>le printemps / l'été / l'automne / l'hiver</td><td>spring / summer / autumn / winter</td></tr>
</table>
</div>
<div class="lesson-example">
<strong>Exemple :</strong> Il fait beau aujourd'hui mais demain il va pleuvoir. <button class="lesson-ex-btn" onclick="toggleLessonEx(this,event)">🇬🇧 English</button>
<span class="lesson-ex-en">The weather is nice today but tomorrow it's going to rain.</span>
</div>
`},

{num:9, title:"Essential Verbs ⚡", content:`
<div class="lesson-rule">
<h4>⚡ The 6 key verbs</h4>
<table class="lesson-table">
<tr><th>Verb</th><th>Je</th><th>Vous</th><th>English</th></tr>
<tr><td><strong>être</strong></td><td>je suis</td><td>vous êtes</td><td>to be</td></tr>
<tr><td><strong>avoir</strong></td><td>j'ai</td><td>vous avez</td><td>to have</td></tr>
<tr><td><strong>aller</strong></td><td>je vais</td><td>vous allez</td><td>to go</td></tr>
<tr><td><strong>faire</strong></td><td>je fais</td><td>vous faites</td><td>to do/make</td></tr>
<tr><td><strong>vouloir</strong></td><td>je veux</td><td>vous voulez</td><td>to want</td></tr>
<tr><td><strong>pouvoir</strong></td><td>je peux</td><td>vous pouvez</td><td>can / to be able</td></tr>
</table>
</div>
<div class="lesson-warning">⚠️ These 6 verbs cover 70% of everyday French conversations. Master these first!</div>
<div class="lesson-example">
<strong>Exemples :</strong><br>
Je vais faire les courses. <button class="lesson-ex-btn" onclick="toggleLessonEx(this,event)">🇬🇧 English</button>
<span class="lesson-ex-en">I'm going to do the shopping.</span><br>
Je veux un café mais je ne peux pas. <button class="lesson-ex-btn" onclick="toggleLessonEx(this,event)">🇬🇧 English</button>
<span class="lesson-ex-en">I want a coffee but I can't.</span>
</div>
`},

{num:10, title:"Politeness 🎩", content:`
<div class="lesson-rule">
<h4>🎩 Essential polite phrases</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>S'il vous plaît</td><td>Please (formal)</td></tr>
<tr><td>Merci (beaucoup)</td><td>Thank you (very much)</td></tr>
<tr><td>De rien</td><td>You're welcome</td></tr>
<tr><td>Excusez-moi</td><td>Excuse me / Sorry (formal)</td></tr>
<tr><td>Pardon</td><td>Sorry / Pardon</td></tr>
<tr><td>Je suis désolé(e)</td><td>I'm sorry (m/f)</td></tr>
</table>
</div>
<div class="lesson-rule">
<h4>🗣️ Asking for help politely</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>Pourriez-vous m'aider ?</td><td>Could you help me?</td></tr>
<tr><td>Je ne comprends pas.</td><td>I don't understand.</td></tr>
<tr><td>Pouvez-vous répéter, s'il vous plaît ?</td><td>Can you repeat, please?</td></tr>
<tr><td>Parlez-vous anglais ?</td><td>Do you speak English?</td></tr>
</table>
</div>
<div class="lesson-warning">⚠️ <strong>Merci</strong> alone can sound abrupt. <strong>Merci beaucoup</strong> or <strong>merci bien</strong> is warmer.</div>
`},

{num:11, title:"Daily Life in France 🇫🇷", content:`
<div class="lesson-rule">
<h4>🏛️ Administrative vocabulary</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>la mairie</td><td>town hall</td></tr>
<tr><td>la préfecture</td><td>prefecture (admin centre)</td></tr>
<tr><td>la Sécurité Sociale</td><td>French health insurance</td></tr>
<tr><td>la carte Vitale</td><td>health insurance card</td></tr>
<tr><td>le médecin traitant</td><td>GP / family doctor</td></tr>
</table>
</div>
<div class="lesson-rule">
<h4>🌐 Useful services</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>la box internet</td><td>internet router/package</td></tr>
<tr><td>EDF (électricité)</td><td>electricity provider</td></tr>
<tr><td>la déchetterie</td><td>recycling/waste centre</td></tr>
<tr><td>le contrôle technique</td><td>MOT / vehicle inspection</td></tr>
</table>
</div>
<div class="lesson-example">
<strong>Exemple :</strong> Je dois aller à la mairie pour ma carte de séjour. <button class="lesson-ex-btn" onclick="toggleLessonEx(this,event)">🇬🇧 English</button>
<span class="lesson-ex-en">I need to go to the town hall for my residency card.</span>
</div>
`},

{num:12, title:"My Routine 🌅 — Passé composé", content:`
<div class="lesson-rule">
<h4>🌅 Talking about what you did today</h4>
<p>Use <strong>passé composé</strong> = <em>avoir/être + past participle</em> to say what you've done.</p>
<table class="lesson-table">
<tr><th>French</th><th>Phonetics</th><th>English</th></tr>
<tr><td>J'ai nettoyé</td><td><em>*zhay net-wa-YAY*</em></td><td>I cleaned</td></tr>
<tr><td>J'ai arrosé</td><td><em>*zhay a-ro-ZAY*</em></td><td>I watered</td></tr>
<tr><td>J'ai fait les courses</td><td><em>*zhay fay lay KOORS*</em></td><td>I did the shopping</td></tr>
<tr><td>J'ai préparé</td><td><em>*zhay pray-pa-RAY*</em></td><td>I prepared</td></tr>
<tr><td>J'ai rangé</td><td><em>*zhay ran-ZHAY*</em></td><td>I tidied up</td></tr>
</table>
</div>
<div class="lesson-rule">
<h4>⏰ Time expressions</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>ce matin</td><td>this morning</td></tr>
<tr><td>cet après-midi</td><td>this afternoon</td></tr>
<tr><td>ce soir</td><td>this evening</td></tr>
<tr><td>demain</td><td>tomorrow</td></tr>
<tr><td>hier</td><td>yesterday</td></tr>
</table>
</div>
<div class="lesson-warning">⚠️ Most verbs use <strong>avoir</strong> as auxiliary. Movement verbs (aller, venir, partir, arriver) use <strong>être</strong>.</div>
<div class="lesson-example">
Ce matin j'ai nettoyé la maison et j'ai arrosé le jardin. <button class="lesson-ex-btn" onclick="toggleLessonEx(this,event)">🇬🇧 English</button>
<span class="lesson-ex-en">This morning I cleaned the house and watered the garden.</span>
</div>
`},

{num:13, title:"My Emotions ❤️ — être + adjectives", content:`
<div class="lesson-rule">
<h4>❤️ How do you feel? — Je suis + adjective</h4>
<table class="lesson-table">
<tr><th>French (m / f)</th><th>Phonetics</th><th>English</th></tr>
<tr><td>fatigué / fatiguée</td><td><em>*fa-tee-GAY*</em></td><td>tired</td></tr>
<tr><td>content / contente</td><td><em>*kon-TON*</em></td><td>happy / pleased</td></tr>
<tr><td>stressé / stressée</td><td><em>*stress-AY*</em></td><td>stressed</td></tr>
<tr><td>inquiet / inquiète</td><td><em>*an-kee-AY*</em></td><td>worried</td></tr>
<tr><td>motivé / motivée</td><td><em>*mo-tee-VAY*</em></td><td>motivated</td></tr>
<tr><td>triste</td><td><em>*TREEST*</em></td><td>sad</td></tr>
</table>
</div>
<div class="lesson-rule">
<h4>💬 Useful emotion phrases</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>Je me sens bien / mal.</td><td>I feel good / bad.</td></tr>
<tr><td>Je suis un peu fatigué(e).</td><td>I'm a little tired.</td></tr>
<tr><td>Ça va mieux.</td><td>It's getting better.</td></tr>
</table>
</div>
<div class="lesson-warning">⚠️ Always use <strong>être</strong> for emotions: Je SUIS fatigué. Never "J'AI fatigué"!</div>
<div class="lesson-example">
Je suis fatigué mais content — j'ai fait beaucoup aujourd'hui ! <button class="lesson-ex-btn" onclick="toggleLessonEx(this,event)">🇬🇧 English</button>
<span class="lesson-ex-en">I'm tired but happy — I did a lot today!</span>
</div>
`},

{num:14, title:"My Needs 🍽️ — avoir + noun", content:`
<div class="lesson-rule">
<h4>🍽️ Expressing needs with AVOIR</h4>
<p>In French, hunger/thirst/sleep are expressed with <strong>avoir</strong> (to have) — not être!</p>
<table class="lesson-table">
<tr><th>French</th><th>Phonetics</th><th>English</th></tr>
<tr><td>J'ai faim</td><td><em>*zhay FAN*</em></td><td>I am hungry (lit: I have hunger)</td></tr>
<tr><td>J'ai soif</td><td><em>*zhay SWAF*</em></td><td>I am thirsty</td></tr>
<tr><td>J'ai sommeil</td><td><em>*zhay so-MAY*</em></td><td>I am sleepy</td></tr>
<tr><td>J'ai besoin de...</td><td><em>*zhay buh-ZWAN duh*</em></td><td>I need...</td></tr>
<tr><td>J'ai envie de...</td><td><em>*zhay on-VEE duh*</em></td><td>I feel like...</td></tr>
</table>
</div>
<div class="lesson-rule">
<h4>🎩 Polite vs direct</h4>
<table class="lesson-table">
<tr><th>Direct</th><th>Polite</th></tr>
<tr><td>Je veux un café.</td><td>Je voudrais un café, s'il vous plaît.</td></tr>
<tr><td>I want a coffee.</td><td>I would like a coffee, please.</td></tr>
</table>
</div>
<div class="lesson-example">
J'ai faim et j'ai envie de faire une omelette. <button class="lesson-ex-btn" onclick="toggleLessonEx(this,event)">🇬🇧 English</button>
<span class="lesson-ex-en">I'm hungry and I feel like making an omelette.</span>
</div>
`},

{num:15, title:"My House 🏡 — Household tasks", content:`
<div class="lesson-rule">
<h4>🏡 Household chores</h4>
<table class="lesson-table">
<tr><th>French</th><th>Phonetics</th><th>English</th></tr>
<tr><td>faire le ménage</td><td><em>*fair le may-NAZH*</em></td><td>do the housework</td></tr>
<tr><td>faire la vaisselle</td><td><em>*fair la vay-SELL*</em></td><td>do the dishes</td></tr>
<tr><td>faire le lit</td><td><em>*fair le LEE*</em></td><td>make the bed</td></tr>
<tr><td>passer l'aspirateur</td><td><em>*pass-ay las-peer-a-TUR*</em></td><td>vacuum</td></tr>
<tr><td>ranger</td><td><em>*ran-ZHAY*</em></td><td>tidy up</td></tr>
<tr><td>nettoyer</td><td><em>*net-wa-YAY*</em></td><td>clean</td></tr>
<tr><td>sortir les poubelles</td><td><em>*sor-TEER lay poo-BELL*</em></td><td>take out the bins</td></tr>
</table>
</div>
<div class="lesson-warning">⚠️ Note: <strong>faire</strong> is used with many household tasks — faire le ménage, faire la vaisselle, faire le lit. It's not "do" or "make" literally!</div>
<div class="lesson-example">
Le lundi, je fais le ménage et je passe l'aspirateur dans tout la maison. <button class="lesson-ex-btn" onclick="toggleLessonEx(this,event)">🇬🇧 English</button>
<span class="lesson-ex-en">On Mondays, I do the housework and vacuum the whole house.</span>
</div>
`},

{num:16, title:"My Family 👨‍👩‍👧 — Possessives", content:`
<div class="lesson-rule">
<h4>👨‍👩‍👧 Family vocabulary</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>mon mari / ma femme</td><td>my husband / my wife</td></tr>
<tr><td>mon fils / ma fille</td><td>my son / my daughter</td></tr>
<tr><td>mes enfants</td><td>my children</td></tr>
<tr><td>mon frère / ma sœur</td><td>my brother / my sister</td></tr>
<tr><td>mon père / ma mère</td><td>my father / my mother</td></tr>
<tr><td>mes petits-enfants</td><td>my grandchildren</td></tr>
</table>
</div>
<div class="lesson-rule">
<h4>📝 Possessives: mon / ma / mes</h4>
<table class="lesson-table">
<tr><th>Masculine</th><th>Feminine</th><th>Plural</th></tr>
<tr><td>mon (mari, fils)</td><td>ma (femme, fille)</td><td>mes (enfants)</td></tr>
</table>
</div>
<div class="lesson-warning">⚠️ Exception: use <strong>mon</strong> before feminine words starting with a vowel — <em>mon amie</em> (not "ma amie").</div>
<div class="lesson-example">
Mon mari et mes enfants vivent en Angleterre. <button class="lesson-ex-btn" onclick="toggleLessonEx(this,event)">🇬🇧 English</button>
<span class="lesson-ex-en">My husband and my children live in England.</span>
</div>
`},

{num:17, title:"My Plans 📅 — Futur proche", content:`
<div class="lesson-rule">
<h4>📅 Near future: aller + infinitive</h4>
<p><strong>Formula: sujet + aller + infinitive</strong></p>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>Je vais cuisiner.</td><td>I'm going to cook.</td></tr>
<tr><td>Elle va téléphoner.</td><td>She's going to phone.</td></tr>
<tr><td>Nous allons au marché.</td><td>We're going to the market.</td></tr>
<tr><td>Je vais faire les courses.</td><td>I'm going to do the shopping.</td></tr>
</table>
</div>
<div class="lesson-rule">
<h4>⏰ Time expressions for plans</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>demain</td><td>tomorrow</td></tr>
<tr><td>ce week-end</td><td>this weekend</td></tr>
<tr><td>la semaine prochaine</td><td>next week</td></tr>
<tr><td>le mois prochain</td><td>next month</td></tr>
<tr><td>bientôt</td><td>soon</td></tr>
</table>
</div>
<div class="lesson-example">
Ce week-end je vais nettoyer la maison et nous allons au restaurant dimanche. <button class="lesson-ex-btn" onclick="toggleLessonEx(this,event)">🇬🇧 English</button>
<span class="lesson-ex-en">This weekend I'm going to clean the house and we're going to a restaurant on Sunday.</span>
</div>
`},

{num:18, title:"My Health 💊 — At the doctor", content:`
<div class="lesson-rule">
<h4>💊 Pain & symptoms: J'ai mal à...</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>J'ai mal à la tête.</td><td>I have a headache.</td></tr>
<tr><td>J'ai mal au dos.</td><td>I have back pain.</td></tr>
<tr><td>J'ai mal à la gorge.</td><td>I have a sore throat.</td></tr>
<tr><td>J'ai mal aux dents.</td><td>I have toothache.</td></tr>
<tr><td>J'ai mal au ventre.</td><td>I have stomach ache.</td></tr>
</table>
</div>
<div class="lesson-rule">
<h4>🏥 At the doctor / pharmacy</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>Je voudrais prendre rendez-vous.</td><td>I would like to make an appointment.</td></tr>
<tr><td>J'ai mal depuis trois jours.</td><td>I have been in pain for three days.</td></tr>
<tr><td>Je suis malade.</td><td>I am ill / sick.</td></tr>
<tr><td>Je prends un médicament.</td><td>I take a medication.</td></tr>
<tr><td>les urgences</td><td>the emergency room / A&E</td></tr>
</table>
</div>
<div class="lesson-warning">⚠️ Grammar: à + le = <strong>au</strong> (au dos, au ventre) | à + les = <strong>aux</strong> (aux dents) | à + la = <strong>à la</strong> (à la tête)</div>
`},

{num:19, title:"My Cooking 🍳 — Kitchen verbs", content:`
<div class="lesson-rule">
<h4>🍳 Essential cooking verbs</h4>
<table class="lesson-table">
<tr><th>French</th><th>Phonetics</th><th>English</th></tr>
<tr><td>couper</td><td><em>*koo-PAY*</em></td><td>to cut / chop</td></tr>
<tr><td>mélanger</td><td><em>*may-lan-ZHAY*</em></td><td>to mix</td></tr>
<tr><td>faire chauffer</td><td><em>*fair sho-FAY*</em></td><td>to heat up</td></tr>
<tr><td>ajouter</td><td><em>*a-zhoo-TAY*</em></td><td>to add</td></tr>
<tr><td>remuer</td><td><em>*ruh-moo-AY*</em></td><td>to stir</td></tr>
<tr><td>goûter</td><td><em>*goo-TAY*</em></td><td>to taste</td></tr>
<tr><td>servir</td><td><em>*sair-VEER*</em></td><td>to serve</td></tr>
</table>
</div>
<div class="lesson-rule">
<h4>📖 Recipe language</h4>
<table class="lesson-table">
<tr><th>French</th><th>English</th></tr>
<tr><td>une recette</td><td>a recipe</td></tr>
<tr><td>les ingrédients</td><td>the ingredients</td></tr>
<tr><td>faire revenir</td><td>to fry / sauté</td></tr>
<tr><td>laisser mijoter</td><td>to let simmer</td></tr>
</table>
</div>
<div class="lesson-example">
Je coupe les légumes, j'ajoute de l'huile et je fais chauffer à feu doux. <button class="lesson-ex-btn" onclick="toggleLessonEx(this,event)">🇬🇧 English</button>
<span class="lesson-ex-en">I chop the vegetables, add some oil and heat on a low heat.</span>
</div>
`},

{num:20, title:"Living French 🗣️ — Real expressions", content:`
<div class="lesson-rule">
<h4>🗣️ Expressions every French person uses</h4>
<table class="lesson-table">
<tr><th>Expression</th><th>Literal</th><th>Real meaning</th></tr>
<tr><td><strong>Ça marche !</strong></td><td>It walks!</td><td>OK! / That works!</td></tr>
<tr><td><strong>Bof...</strong></td><td>—</td><td>Meh / Not really / So-so</td></tr>
<tr><td><strong>Nickel !</strong></td><td>Nickel!</td><td>Perfect! / Spotless!</td></tr>
<tr><td><strong>Pas terrible.</strong></td><td>Not terrible.</td><td>Not great / Disappointing</td></tr>
<tr><td><strong>En fait</strong></td><td>In fact</td><td>Actually / Well...</td></tr>
<tr><td><strong>Du coup</strong></td><td>From the blow</td><td>So / Therefore / As a result</td></tr>
<tr><td><strong>Franchement</strong></td><td>Frankly</td><td>Honestly / To be honest</td></tr>
<tr><td><strong>Ça dépend.</strong></td><td>It depends.</td><td>It depends.</td></tr>
<tr><td><strong>Quand même</strong></td><td>Even so</td><td>Still / Anyway / Come on</td></tr>
<tr><td><strong>Comme d'habitude</strong></td><td>As usual</td><td>As usual</td></tr>
</table>
</div>
<div class="lesson-warning">⚠️ <strong>Pas terrible</strong> is a TRAP — it sounds like "not terrible" but it actually means "not great"!</div>
<div class="lesson-example">
— Tu aimes ce restaurant ? <br>
— Bof... pas terrible. Mais le service, nickel ! <button class="lesson-ex-btn" onclick="toggleLessonEx(this,event)">🇬🇧 English</button>
<span class="lesson-ex-en">— Do you like this restaurant? — Meh... not great. But the service, perfect!</span>
</div>
`}

]; // END LESSONS_DATA


// ── QUESTIONS DB ──────────────────────────────────────────────────
const QUESTIONS_DB = {

1: {
  title:"Greetings & Introductions 🙋",
  objective:"Say hello, introduce yourself, use vous vs tu",
  hint:"Always use 'vous' with strangers — 'tu' is for friends only!",
  qcm:[
    {q:"How do you say 'Good evening' in French?", options:["Bonsoir","Bonjour","Bonne nuit","Salut"], correct:"Bonsoir", explanation:"Bonsoir = Good evening. Use it from around 6pm onwards."},
    {q:"Which is the FORMAL way to say goodbye?", options:["Au revoir","Salut","Ciao","À plus"], correct:"Au revoir", explanation:"Au revoir (*oh ruh-VWAHR*) is always safe. Salut/Ciao/À plus are informal only."},
    {q:"You meet your new neighbour. You should say:", options:["Bonjour, je m'appelle...","Salut mec !","Yo !","Hé toi !"], correct:"Bonjour, je m'appelle...", explanation:"Always start with Bonjour and introduce yourself formally with strangers."},
    {q:"'My name is John' in French:", options:["Je m'appelle John","Je suis John","Mon nom John","J'appelle John"], correct:"Je m'appelle John", explanation:"Je m'appelle (*zhuh ma-PELL*) = My name is. Literally 'I call myself'."},
    {q:"'I live in Lyon' in French:", options:["J'habite à Lyon","Je vis Lyon","J'ai Lyon","Je suis à Lyon"], correct:"J'habite à Lyon", explanation:"J'habite (*zha-BEET*) = I live. Always followed by 'à' + city."},
    {q:"'Nice to meet you!' in French:", options:["Enchanté !","Merci !","Désolé !","Bonsoir !"], correct:"Enchanté !", explanation:"Enchanté(e) (*on-shon-TAY*) = Nice to meet you! Add -e if you're a woman: Enchantée."},
    {q:"Which greeting is INFORMAL (for friends only)?", options:["Salut","Bonjour","Bonsoir","Bonne nuit"], correct:"Salut", explanation:"Salut (*sa-LUE*) is casual. Use Bonjour/Bonsoir with anyone you don't know well."},
    {q:"'I am English' (man speaking) in French:", options:["Je suis anglais","Je suis anglaise","J'ai anglais","Je suis england"], correct:"Je suis anglais", explanation:"Je suis anglais (m) / anglaise (f). The nationality adjective agrees with gender."},
    {q:"'Good night' in French:", options:["Bonne nuit","Bonsoir","Au revoir","Dormez bien"], correct:"Bonne nuit", explanation:"Bonne nuit (*bun NWEE*) is said when someone goes to bed. Bonsoir is for 'good evening'."},
    {q:"'See you tomorrow' in French:", options:["À demain","Au revoir","À bientôt","Salut"], correct:"À demain", explanation:"À demain = See you tomorrow. À bientôt = See you soon. Both are useful!"}
  ],
  libre:[
    {q:"Translate: 'Hello, my name is Sarah.'", answer:"Bonjour, je m'appelle Sarah.", explanation:"Bonjour = Hello. Je m'appelle = My name is."},
    {q:"How do you say 'I live in Paris'?", answer:"J'habite à Paris.", alternatives:["J'habite Paris"], explanation:"J'habite à + city. The 'à' is required."},
    {q:"What is the formal word for 'you' in French?", answer:"vous", explanation:"Vous is formal. Tu is informal (friends and children only)."},
    {q:"Complete: 'Bonjour, je ___ anglais.'", answer:"suis", explanation:"Je suis = I am. This is the present tense of 'être' (to be)."},
    {q:"How do you say 'Nice to meet you'?", answer:"Enchanté", alternatives:["Enchantée","Enchanté !","Enchantée !"], explanation:"Enchanté(e) — add -e if the speaker is a woman."},
    {q:"Translate: 'Good evening, Madame Dupont.'", answer:"Bonsoir, Madame Dupont.", explanation:"Bonsoir for evening. Always use title (Madame/Monsieur) with surname."},
    {q:"What does 'Au revoir' mean?", answer:"Goodbye", alternatives:["goodbye","au revoir"], explanation:"Au revoir (*oh ruh-VWAHR*) = Goodbye. Literally 'until we see again'."},
    {q:"How do you say 'I am new here' (man speaking)?", answer:"Je suis nouveau ici.", alternatives:["Je suis nouveau"], explanation:"Nouveau (m) / nouvelle (f). Je suis = I am."},
    {q:"Translate: 'Do you speak English?'", answer:"Parlez-vous anglais ?", alternatives:["Vous parlez anglais ?"], explanation:"Parlez-vous anglais ? is the formal inversion form. Very useful!"},
    {q:"Complete: '___ m'appelle Pierre.'", answer:"Je", explanation:"Je m'appelle = My name is. Je = I (subject pronoun)."}
  ]
},

2: {
  title:"At the Market 🛒",
  objective:"Buy food at a French market, ask prices, use polite requests",
  hint:"Always add 's'il vous plaît' — French market vendors appreciate politeness!",
  qcm:[
    {q:"'I would like a kilo of tomatoes, please.' in French:", options:["Je voudrais un kilo de tomates, s'il vous plaît.","Je veux tomates un kilo.","Un kilo tomates merci.","J'ai un kilo de tomates."], correct:"Je voudrais un kilo de tomates, s'il vous plaît.", explanation:"Je voudrais (*zhuh voo-DRAY*) = I would like. Much more polite than 'Je veux' (I want)."},
    {q:"How do you ask 'How much is it?'", options:["C'est combien ?","Quel prix ?","Combien vous ?","C'est cher ?"], correct:"C'est combien ?", explanation:"C'est combien ? (*say kom-BYAN*) = How much is it? Very common at markets."},
    {q:"'That's all, thank you.' in French:", options:["C'est tout, merci.","Tout fini merci.","C'est bon au revoir.","Fin merci."], correct:"C'est tout, merci.", explanation:"C'est tout (*say too*) = That's all. Say this to end your shopping transaction politely."},
    {q:"'Do you have tomatoes?' in French:", options:["Avez-vous des tomates ?","Vous avez tomates ?","J'ai des tomates ?","Aimez-vous tomates ?"], correct:"Avez-vous des tomates ?", explanation:"Avez-vous ? (*a-vay-VOO*) = Do you have? Very polite formal question form."},
    {q:"'Half a kilo' in French:", options:["Un demi-kilo","Une demi-kilo","Demi kilogram","Moitié kilo"], correct:"Un demi-kilo", explanation:"Un demi-kilo = half a kilo. Demi (*duh-MEE*) = half."},
    {q:"'A slice of ham, please.' in French:", options:["Une tranche de jambon, s'il vous plaît.","Un morceau jambon.","Du jambon tranche.","Un jambon coupe."], correct:"Une tranche de jambon, s'il vous plaît.", explanation:"Une tranche de = a slice of. Une tranche (*tronshe*) is used for bread, ham, cheese."},
    {q:"Which phrase means 'It's too expensive'?", options:["C'est trop cher.","C'est combien ?","Pas trop merci.","C'est bon prix."], correct:"C'est trop cher.", explanation:"C'est trop cher (*say tro shair*) = It's too expensive. Trop = too much."},
    {q:"'I'll take it.' at the market:", options:["Je le prends.","J'ai ça.","Je veux ça.","Donnez-moi."], correct:"Je le prends.", explanation:"Je le prends = I'll take it. This is the natural way to say you'll buy something."},
    {q:"The polite word for 'please' (formal) in French:", options:["S'il vous plaît","Merci","De rien","Excusez-moi"], correct:"S'il vous plaît", explanation:"S'il vous plaît (*seel voo PLAY*) = please (formal). Use s'il te plaît with friends."},
    {q:"'Three hundred grams of cheese' in French:", options:["Trois cents grammes de fromage","300 fromage","Trois fromage cents","Du fromage 300"], correct:"Trois cents grammes de fromage", explanation:"Trois cents grammes = 300g. At French markets, always specify weight clearly."}
  ],
  libre:[
    {q:"How do you say 'I would like some apples'?", answer:"Je voudrais des pommes.", explanation:"Des pommes = some apples. Use 'des' for plural uncountable."},
    {q:"Ask the vendor 'Do you have local honey?'", answer:"Avez-vous du miel local ?", alternatives:["Vous avez du miel local ?"], explanation:"Avez-vous = do you have (formal). Du miel = some honey."},
    {q:"Translate: 'Two kilos of potatoes, please.'", answer:"Deux kilos de pommes de terre, s'il vous plaît.", explanation:"Pommes de terre = potatoes (literally 'apples of the earth')."},
    {q:"How do you say 'How much is the cheese?'", answer:"C'est combien le fromage ?", alternatives:["Le fromage, c'est combien ?"], explanation:"C'est combien = how much is it. Le fromage = the cheese."},
    {q:"Say 'That's everything, thank you' to end a transaction.", answer:"C'est tout, merci.", explanation:"Always end politely — vendors appreciate it!"},
    {q:"Complete: 'Je voudrais une ___ de pain.'", answer:"tranche", explanation:"Une tranche de pain = a slice of bread."},
    {q:"Translate: 'It's too expensive.'", answer:"C'est trop cher.", explanation:"Trop = too / too much. Cher = expensive."},
    {q:"How do you say 'I'll take a kilo'?", answer:"Je prends un kilo.", alternatives:["Je le prends"], explanation:"Je prends = I take / I'll take."},
    {q:"What does 'Avez-vous...' mean in English?", answer:"Do you have", alternatives:["do you have...?"], explanation:"Avez-vous (*a-vay-VOO*) = Do you have... (formal)"},
    {q:"Translate: 'A hundred grams of butter, please.'", answer:"Cent grammes de beurre, s'il vous plaît.", explanation:"Cent grammes = 100g. Beurre (*burr*) = butter."}
  ]
},

3: {
  title:"In the Garden 🌿",
  objective:"Talk about garden tasks and plants",
  hint:"Garden chat is great for connecting with French neighbours!",
  qcm:[
    {q:"'To water the garden' in French:", options:["Arroser le jardin","Faire le jardin","Nettoyer le jardin","Planter le jardin"], correct:"Arroser le jardin", explanation:"Arroser (*a-ro-ZAY*) = to water. Je dois arroser = I need to water."},
    {q:"'To mow the lawn' in French:", options:["Tondre la pelouse","Couper la pelouse","Faire la pelouse","Arroser la pelouse"], correct:"Tondre la pelouse", explanation:"Tondre la pelouse (*tondre*) = to mow the lawn. La pelouse = the lawn."},
    {q:"What is 'une fleur' in English?", options:["A flower","A leaf","A tree","A vegetable"], correct:"A flower", explanation:"Une fleur (*flerr*) = a flower. Les fleurs = the flowers."},
    {q:"'To weed' in French:", options:["Désherber","Arroser","Planter","Tailler"], correct:"Désherber", explanation:"Désherber (*day-zair-BAY*) = to weed. Les mauvaises herbes = weeds."},
    {q:"'The vegetable garden' in French:", options:["Le potager","Le jardin","Le verger","La pelouse"], correct:"Le potager", explanation:"Le potager (*poh-ta-ZHAY*) = vegetable garden. Very common in France!"},
    {q:"'To prune / trim' in French:", options:["Tailler","Planter","Arroser","Récolter"], correct:"Tailler", explanation:"Tailler (*tie-YAY*) = to prune, trim or cut back plants."},
    {q:"'I need to water the flowers' in French:", options:["Je dois arroser les fleurs.","Je fais les fleurs.","Les fleurs ont soif.","J'arrose demain."], correct:"Je dois arroser les fleurs.", explanation:"Je dois (*zhuh DWAH*) = I must / I need to. Followed by infinitive."},
    {q:"'The soil / earth' in French:", options:["La terre","La pelouse","Le jardin","Le sol"], correct:"La terre", explanation:"La terre (*tair*) = the earth / soil. Also means 'the world'."},
    {q:"'A tree' in French:", options:["Un arbre","Une plante","Une fleur","Un arbuste"], correct:"Un arbre", explanation:"Un arbre (*an-ARBruh*) = a tree. Les arbres = the trees."},
    {q:"'To harvest / pick' in French:", options:["Récolter","Planter","Arroser","Désherber"], correct:"Récolter", explanation:"Récolter (*ray-kol-TAY*) = to harvest / pick. La récolte = the harvest."}
  ],
  libre:[
    {q:"Translate: 'I watered the garden this morning.'", answer:"J'ai arrosé le jardin ce matin.", explanation:"Passé composé: j'ai + arrosé (past participle of arroser)."},
    {q:"How do you say 'the vegetable garden'?", answer:"le potager", explanation:"Le potager is a specifically French institution — kitchen garden."},
    {q:"What is 'tondre la pelouse'?", answer:"to mow the lawn", alternatives:["mow the lawn"], explanation:"Tondre = to mow/clip. La pelouse = the lawn."},
    {q:"Complete: 'Je dois ___ les mauvaises herbes.'", answer:"désherber", explanation:"Désherber = to weed. Les mauvaises herbes = weeds (bad herbs)."},
    {q:"How do you say 'to plant seeds'?", answer:"planter des graines", alternatives:["planter les graines"], explanation:"Planter = to plant. Des graines = seeds."},
    {q:"Translate: 'The garden is beautiful this year.'", answer:"Le jardin est beau cette année.", explanation:"Beau (m) / belle (f) = beautiful. Cette année = this year."},
    {q:"How do you say 'It needs watering'?", answer:"Il faut arroser.", alternatives:["Ça a besoin d'eau"], explanation:"Il faut (*eel foh*) + infinitive = it is necessary to / one must."},
    {q:"What does 'la récolte' mean?", answer:"the harvest", alternatives:["harvest"], explanation:"La récolte = harvest. Récolter = to harvest."},
    {q:"Translate: 'I need to prune the roses.'", answer:"Je dois tailler les rosiers.", explanation:"Tailler = to prune. Les rosiers = the rose bushes."},
    {q:"Complete: 'J'ai planté des ___ ce printemps.'", answer:"fleurs", alternatives:["légumes","tomates"], explanation:"Des fleurs = some flowers. Ce printemps = this spring."}
  ]
},

4: {
  title:"Neighbours & Community 🏘️",
  objective:"Chat with neighbours, ask for information, be sociable",
  hint:"Saying 'bonjour' first is obligatory in French social life — never skip it!",
  qcm:[
    {q:"'My neighbour (female)' in French:", options:["Ma voisine","Mon voisin","Ma voisin","La voisine de moi"], correct:"Ma voisine", explanation:"Voisin (m) / voisine (f). Ma = my (with feminine nouns)."},
    {q:"'Have you lived here long?' in French:", options:["Vous habitez ici depuis longtemps ?","Vous êtes ici long ?","Depuis quand vous êtes ?","Ça fait combien ici ?"], correct:"Vous habitez ici depuis longtemps ?", explanation:"Depuis longtemps (*duh-pwee long-TON*) = for a long time. Depuis = since/for."},
    {q:"'I'm new here' (woman speaking) in French:", options:["Je suis nouvelle ici.","Je suis nouveau ici.","Je suis nouvelle.","Moi suis nouvelle."], correct:"Je suis nouvelle ici.", explanation:"Nouveau (m) / nouvelle (f). The adjective agrees with the speaker's gender."},
    {q:"'Which way is the town hall?' in French:", options:["C'est par où, la mairie ?","Où est la mairie ?","La mairie, comment ?","Par là mairie ?"], correct:"C'est par où, la mairie ?", explanation:"C'est par où ? (*say par OO*) = Which way is it? Very natural French."},
    {q:"'Do you know a good plumber?' in French:", options:["Vous connaissez un bon plombier ?","Vous savez plombier ?","Avez-vous plombier ?","Un plombier vous connaissez ?"], correct:"Vous connaissez un bon plombier ?", explanation:"Connaître (*kon-ETRE*) = to know (a person/place). Savoir = to know (a fact)."},
    {q:"How do you say 'the town hall'?", options:["La mairie","La préfecture","La maison","Le bureau"], correct:"La mairie", explanation:"La mairie (*la may-REE*) = the town hall. Essential for admin in France!"},
    {q:"'The market is on Thursdays.' in French:", options:["Le marché est le jeudi.","Le marché est jeudi.","Marché est le jeudi.","Jeudi le marché."], correct:"Le marché est le jeudi.", explanation:"Le jeudi = on Thursdays (habitual). Jeudi (no article) = this Thursday specifically."},
    {q:"'The rubbish bins go out on Tuesday' in French:", options:["Les poubelles sortent le mardi.","Les poubelles sont mardi.","Le mardi poubelles.","Poubelles sortir mardi."], correct:"Les poubelles sortent le mardi.", explanation:"Sortent le mardi = go out on Tuesdays (habitual). Useful for settling in!"},
    {q:"'It's very quiet here.' in French:", options:["C'est très calme ici.","Ici est très silence.","C'est trop calme.","Très calme est ici."], correct:"C'est très calme ici.", explanation:"C'est très calme (*say tray KALM*) = It's very quiet / peaceful."},
    {q:"'We've lived here for 2 years.' in French:", options:["Nous habitons ici depuis deux ans.","Nous sommes ici deux ans.","Ici nous deux ans.","Depuis deux ans nous."], correct:"Nous habitons ici depuis deux ans.", explanation:"Depuis + duration = for (how long). Nous habitons = we live (present, ongoing)."}
  ],
  libre:[
    {q:"Translate: 'My neighbour is very kind.'", answer:"Mon voisin est très gentil.", alternatives:["Ma voisine est très gentille."], explanation:"Gentil (m) / gentille (f) = kind. Très = very."},
    {q:"How do you ask 'Is there a market nearby?'", answer:"Il y a un marché près d'ici ?", alternatives:["Y a-t-il un marché près d'ici ?"], explanation:"Il y a = there is. Près d'ici = nearby."},
    {q:"Complete: 'Vous habitez ici ___ longtemps ?'", answer:"depuis", explanation:"Depuis (*duh-PWEE*) = since / for (with ongoing present tense)."},
    {q:"Translate: 'I'm new here.'", answer:"Je suis nouveau ici.", alternatives:["Je suis nouvelle ici."], explanation:"Nouveau (m) / nouvelle (f). Use the form matching your gender."},
    {q:"How do you say 'Do you know a good doctor?'", answer:"Vous connaissez un bon médecin ?", explanation:"Connaître = to know (a person). Médecin = doctor."},
    {q:"What is 'la mairie'?", answer:"the town hall", alternatives:["town hall"], explanation:"La mairie is where you register your address, get forms, etc."},
    {q:"Translate: 'The rubbish goes out on Monday.'", answer:"Les poubelles sortent le lundi.", explanation:"Le lundi = on Mondays (habitual). Sortent = go out."},
    {q:"Complete: 'C'est par ___, la pharmacie ?'", answer:"où", explanation:"C'est par où = which way is it / how do I get to..."},
    {q:"How do you say 'We are very happy here'?", answer:"Nous sommes très contents ici.", alternatives:["Nous sommes très heureux ici."], explanation:"Contents / heureux = happy. Both work here."},
    {q:"Translate: 'The market is on Wednesdays.'", answer:"Le marché est le mercredi.", explanation:"Le mercredi = on Wednesdays (habitual pattern)."}
  ]
},

5: {
  title:"Tastes & Desires ❤️",
  objective:"Express likes, dislikes and preferences in French",
  hint:"'J'adore' is stronger than 'J'aime' — use it for real enthusiasm!",
  qcm:[
    {q:"'I love cheese!' in French:", options:["J'adore le fromage !","J'aime bien fromage !","Je veux le fromage !","J'ai le fromage !"], correct:"J'adore le fromage !", explanation:"J'adore (*zhah-DOR*) = I love (stronger than j'aime). Use for genuine enthusiasm!"},
    {q:"'I don't like olives.' in French:", options:["Je n'aime pas les olives.","J'aime pas olive.","Je veux pas olives.","Pas les olives."], correct:"Je n'aime pas les olives.", explanation:"Je n'aime pas (*zhuh nem PAH*) = I don't like. Always use definite article (les/le/la) after aimer."},
    {q:"'I prefer red wine.' in French:", options:["Je préfère le vin rouge.","J'aime mieux rouge vin.","Je veux vin rouge.","Le vin rouge j'aime."], correct:"Je préfère le vin rouge.", explanation:"Je préfère (*zhuh pray-FAIR*) = I prefer. Same structure as English!"},
    {q:"'It's delicious!' in French:", options:["C'est délicieux !","C'est bon !","C'est très bien !","J'aime ça !"], correct:"C'est délicieux !", explanation:"C'est délicieux (*say day-lee-SYUH*) = It's delicious! C'est bon = It's good (less enthusiastic)."},
    {q:"'I'm vegetarian.' in French:", options:["Je suis végétarien.","Je veux pas viande.","Je n'ai pas viande.","Je mange pas bête."], correct:"Je suis végétarien.", explanation:"Végétarien (m) / végétarienne (f). Je suis + adjective for describing yourself."},
    {q:"'I'm allergic to nuts.' in French:", options:["Je suis allergique aux noix.","J'ai allergie noix.","Je suis malade noix.","Les noix je suis mal."], correct:"Je suis allergique aux noix.", explanation:"Allergique à (*a-lair-ZHEEK a*). À + les = aux. À + le = au."},
    {q:"'It pleases me.' (I like it) in French:", options:["Ça me plaît.","J'aime ça bien.","Ça est bien.","Je veux ça."], correct:"Ça me plaît.", explanation:"Ça me plaît (*sa muh PLAY*) = I like it (literally 'it pleases me'). Very French!"},
    {q:"'It's too salty.' in French:", options:["C'est trop salé.","C'est trop salt.","Trop de sel.","C'est très salé."], correct:"C'est trop salé.", explanation:"Trop (*troh*) = too much. Salé = salty. Sucré = sweet. Acide = sour."},
    {q:"'I really like this market.' in French:", options:["J'aime beaucoup ce marché.","J'aime très ce marché.","Ce marché est bien.","J'adore bien ce marché."], correct:"J'aime beaucoup ce marché.", explanation:"J'aime beaucoup = I really like. Beaucoup (*boh-KOO*) intensifies the feeling."},
    {q:"'What do you like?' in French:", options:["Qu'est-ce que vous aimez ?","Vous aimez quoi ?","Quoi vous voulez ?","Qu'aimez-vous faire ?"], correct:"Qu'est-ce que vous aimez ?", explanation:"Qu'est-ce que vous aimez ? (*kess-kuh voo-zay-MAY*) = What do you like?"}
  ],
  libre:[
    {q:"Say 'I love the French countryside.'", answer:"J'adore la campagne française.", explanation:"Campagne = countryside. J'adore = I love (strong)."},
    {q:"Translate: 'I don't like cold weather.'", answer:"Je n'aime pas le froid.", alternatives:["Je n'aime pas le temps froid."], explanation:"Le froid = the cold. Je n'aime pas = I don't like."},
    {q:"How do you say 'It's delicious!'?", answer:"C'est délicieux !", explanation:"A classic compliment for French hosts!"},
    {q:"Complete: 'Je préfère le café ___ le thé.'", answer:"à", explanation:"Préférer A à B = to prefer A to B. Je préfère le café au thé."},
    {q:"Translate: 'I am allergic to gluten.'", answer:"Je suis allergique au gluten.", explanation:"Au = à + le. Gluten is the same in French!"},
    {q:"How do you say 'I really like this village'?", answer:"J'aime beaucoup ce village.", alternatives:["J'adore ce village."], explanation:"Beaucoup intensifies j'aime. J'adore is even stronger."},
    {q:"Translate: 'It's a bit sweet for me.'", answer:"C'est un peu sucré pour moi.", explanation:"Un peu = a little. Sucré = sweet. Pour moi = for me."},
    {q:"Complete: 'Je ___ les huîtres.'", answer:"n'aime pas", explanation:"Je n'aime pas = I don't like. The most useful negative for food!"},
    {q:"How do you say 'What do you like to eat?'", answer:"Qu'est-ce que vous aimez manger ?", alternatives:["Vous aimez quoi manger ?"], explanation:"Aimer + infinitive = to like doing something."},
    {q:"Translate: 'I prefer the local market.'", answer:"Je préfère le marché local.", explanation:"Local = local (same word!). Marché = market."}
  ]
},

6: {
  title:"At the Shops 🏬",
  objective:"Navigate French shops, pay, ask for help",
  hint:"Many French shops close 12h-14h and often all day Monday!",
  qcm:[
    {q:"'The bakery' in French:", options:["La boulangerie","La pharmacie","La boucherie","La fromagerie"], correct:"La boulangerie", explanation:"La boulangerie (*boo-lon-zhuh-REE*) = bakery. Le boulanger = the baker."},
    {q:"'I'm paying by card.' in French:", options:["Je paie par carte.","Je paye carte.","J'ai une carte.","Carte s'il vous plaît."], correct:"Je paie par carte.", explanation:"Je paie par carte (*zhuh pay par KART*) = I'm paying by card. Espèces = cash."},
    {q:"'Do you have change?' in French:", options:["Avez-vous la monnaie ?","Avez-vous de l'argent ?","Vous avez change ?","La monnaie vous ?"], correct:"Avez-vous la monnaie ?", explanation:"La monnaie (*la mo-NAY*) = change (coins). La pièce = a coin."},
    {q:"'A receipt please.' in French:", options:["Un ticket de caisse, s'il vous plaît.","Un reçu s'il vous plaît.","La note s'il vous plaît.","Le papier s'il vous plaît."], correct:"Un ticket de caisse, s'il vous plaît.", explanation:"Un ticket de caisse (*teekay de kess*) = receipt. Un reçu is also accepted."},
    {q:"'The pharmacy' in French:", options:["La pharmacie","La boulangerie","La droguerie","La clinique"], correct:"La pharmacie", explanation:"La pharmacie (*far-ma-SEE*) = pharmacy/chemist. Look for the green cross!"},
    {q:"'Is it open on Sundays?' in French:", options:["C'est ouvert le dimanche ?","Ouvert dimanche ?","Vous ouvrez dimanche ?","Le dimanche c'est quand ?"], correct:"C'est ouvert le dimanche ?", explanation:"Ouvert (*oo-VAIR*) = open. Fermé = closed. Le dimanche = on Sundays."},
    {q:"'What time do you close?' in French:", options:["Vous fermez à quelle heure ?","Quelle heure fermer ?","C'est quand la fermeture ?","Vous êtes quand fermé ?"], correct:"Vous fermez à quelle heure ?", explanation:"Vous fermez (*voo fair-MAY*) = you close. À quelle heure = at what time."},
    {q:"'The post office' in French:", options:["La poste","Le courrier","La lettre","Le bureau"], correct:"La poste", explanation:"La poste (*la POST*) = the post office. To send: envoyer (*on-vwa-YAY*)."},
    {q:"'Excuse me, where is the till?' in French:", options:["Excusez-moi, où est la caisse ?","Pardon, caisse où ?","S'il vous plaît caisse.","Où payer ?"], correct:"Excusez-moi, où est la caisse ?", explanation:"La caisse (*la KESS*) = the till / checkout. Excusez-moi to get attention politely."},
    {q:"'It's closed today.' in French:", options:["C'est fermé aujourd'hui.","Aujourd'hui fermé.","C'est pas ouvert.","Fermé est aujourd'hui."], correct:"C'est fermé aujourd'hui.", explanation:"Fermé (*fair-MAY*) = closed. Aujourd'hui = today. Demain = tomorrow."}
  ],
  libre:[
    {q:"Translate: 'I'm looking for the supermarket.'", answer:"Je cherche le supermarché.", explanation:"Chercher = to look for / search for."},
    {q:"How do you say 'Is there a bakery nearby?'", answer:"Il y a une boulangerie près d'ici ?", alternatives:["Y a-t-il une boulangerie près d'ici ?"], explanation:"Il y a = there is. Près d'ici = nearby."},
    {q:"Complete: 'Je paie ___ espèces.'", answer:"en", explanation:"Payer en espèces = to pay in cash. Payer par carte = to pay by card."},
    {q:"Translate: 'A receipt please.'", answer:"Un ticket de caisse, s'il vous plaît.", explanation:"Ticket de caisse is the most common term for receipt at a shop."},
    {q:"How do you ask 'What time do you open?'", answer:"Vous ouvrez à quelle heure ?", alternatives:["À quelle heure vous ouvrez ?"], explanation:"Ouvrir = to open. Vous ouvrez = you open."},
    {q:"What is 'la pharmacie'?", answer:"the pharmacy", alternatives:["pharmacy","chemist"], explanation:"Recognised by the green cross. Open even during lunch in many towns!"},
    {q:"Translate: 'The bank is closed today.'", answer:"La banque est fermée aujourd'hui.", explanation:"Fermée = closed (feminine, agrees with 'la banque')."},
    {q:"Complete: 'Avez-vous ___ monnaie pour 20 euros ?'", answer:"la", explanation:"La monnaie = change. Avez-vous la monnaie pour 20 euros = do you have change for 20 euros?"},
    {q:"How do you say 'I'm looking for a chemist'?", answer:"Je cherche une pharmacie.", explanation:"Chercher = to look for. Une pharmacie = a pharmacy."},
    {q:"Translate: 'Where is the post office, please?'", answer:"Où est la poste, s'il vous plaît ?", explanation:"Où est = where is. La poste = the post office."}
  ]
},

7: {
  title:"Friends & Going Out 👫",
  objective:"Make and accept social invitations, arrange to meet",
  hint:"'Ça vous dit de...' is the most natural way to invite someone in French!",
  qcm:[
    {q:"'Would you like to go to a restaurant?' in French:", options:["Ça vous dit d'aller au restaurant ?","Voulez-vous restaurant ?","Vous aimez restaurant ?","On va restaurant ?"], correct:"Ça vous dit d'aller au restaurant ?", explanation:"Ça vous dit de... (*sa voo dee*) = Would you like to... / Fancy...? Very natural French."},
    {q:"'I'm free on Saturday.' in French:", options:["Je suis libre samedi.","J'ai libre samedi.","Je peux samedi.","Samedi je veux."], correct:"Je suis libre samedi.", explanation:"Libre (*LEE-bruh*) = free / available. Je suis libre + day."},
    {q:"'Where shall we meet?' in French:", options:["On se retrouve où ?","Où on va ?","On se voit comment ?","Où se rencontrer ?"], correct:"On se retrouve où ?", explanation:"On se retrouve (*on suh ruh-TROOV*) = we meet up / where shall we meet?"},
    {q:"'With pleasure!' in French:", options:["Avec plaisir !","Oui bien sûr !","Pourquoi pas !","D'accord !"], correct:"Avec plaisir !", explanation:"Avec plaisir (*a-vek play-ZEER*) = With pleasure! A warm, enthusiastic yes."},
    {q:"'I'm sorry, I can't on Friday.' in French:", options:["Je suis désolé(e), je ne peux pas vendredi.","Je peux pas vendredi.","Vendredi non.","Désolé vendredi."], correct:"Je suis désolé(e), je ne peux pas vendredi.", explanation:"Je ne peux pas (*zhuh nuh puh PAH*) = I can't. Je suis désolé(e) = I'm sorry."},
    {q:"'At what time?' in French:", options:["À quelle heure ?","Quelle heure est ?","Quand heure ?","C'est l'heure ?"], correct:"À quelle heure ?", explanation:"À quelle heure (*a kell urr*) = at what time? Very useful for arrangements!"},
    {q:"'Let's go for a walk.' in French:", options:["On va se promener.","On fait promenade.","Allons promenade.","On marche."], correct:"On va se promener.", explanation:"On va + infinitive = we're going to. Se promener = to go for a walk."},
    {q:"'Maybe next time.' in French:", options:["Peut-être la prochaine fois.","Peut-être après.","Prochain temps.","Une autre fois peut-être."], correct:"Peut-être la prochaine fois.", explanation:"Peut-être (*puh-TARE*) = maybe. La prochaine fois = the next time."},
    {q:"'Good idea!' in French:", options:["Bonne idée !","Bon idée !","C'est idée !","Idée bien !"], correct:"Bonne idée !", explanation:"Bonne idée (*bon ee-DAY*) = Good idea! Note: idée is feminine, so 'bonne' not 'bon'."},
    {q:"'See you Saturday!' in French:", options:["À samedi !","Samedi à vous !","Bonjour samedi !","Samedi voir !"], correct:"À samedi !", explanation:"À + day = see you on [day]. À demain = see you tomorrow. À bientôt = see you soon."}
  ],
  libre:[
    {q:"Invite your neighbour for coffee. ('Would you like...')", answer:"Ça vous dit de prendre un café ?", alternatives:["Ça vous dirait de prendre un café ?"], explanation:"Ça vous dit de + infinitive = would you like to..."},
    {q:"Translate: 'I'm free this weekend.'", answer:"Je suis libre ce week-end.", explanation:"Ce week-end = this weekend. Libre = free/available."},
    {q:"How do you say 'See you tomorrow'?", answer:"À demain !", explanation:"À + time/day = see you [then]. Very common French farewell."},
    {q:"Complete: 'On se retrouve ___ quelle heure ?'", answer:"à", explanation:"On se retrouve à quelle heure = what time shall we meet?"},
    {q:"Translate: 'Sorry, I can't on Sunday.'", answer:"Désolé(e), je ne peux pas dimanche.", alternatives:["Je suis désolé, je ne peux pas dimanche."], explanation:"Je ne peux pas = I can't. Dimanche = Sunday."},
    {q:"How do you say 'Good idea!'?", answer:"Bonne idée !", explanation:"Bonne = good (feminine). Idée = idea. Classic enthusiastic response."},
    {q:"Translate: 'Let's go for a walk in the village.'", answer:"On va se promener dans le village.", explanation:"On va + infinitive = let's go. Se promener = to go for a walk."},
    {q:"Complete: 'Je suis ___ jeudi.'", answer:"libre", explanation:"Je suis libre = I'm free / available."},
    {q:"How do you say 'With pleasure!'?", answer:"Avec plaisir !", explanation:"Avec plaisir — a warm, enthusiastic acceptance of an invitation."},
    {q:"Translate: 'What time shall we meet?'", answer:"On se retrouve à quelle heure ?", explanation:"On se retrouve = we meet up. À quelle heure = at what time."}
  ]
},

8: {
  title:"Weather 🌤️",
  objective:"Talk about the weather, understand forecasts",
  hint:"Il fait + adjective for general weather. Il pleut/neige use verbs directly.",
  qcm:[
    {q:"'It's raining.' in French:", options:["Il pleut.","Il fait de pluie.","Il pleuve.","C'est la pluie."], correct:"Il pleut.", explanation:"Il pleut (*eel pluh*) = It's raining. Irregular verb pleuvoir. Very useful in France!"},
    {q:"'The weather is nice.' in French:", options:["Il fait beau.","Il fait bien.","C'est beau dehors.","Le temps est beau."], correct:"Il fait beau.", explanation:"Il fait beau (*eel fay BOH*) = The weather is nice. Il fait + adjective for weather."},
    {q:"'It's cold.' in French:", options:["Il fait froid.","Il est froid.","C'est froid dehors.","Le temps est froid."], correct:"Il fait froid.", explanation:"Il fait froid (*eel fay FRWAH*) = It's cold. Il fait chaud = It's hot."},
    {q:"'It's snowing.' in French:", options:["Il neige.","Il fait neige.","La neige tombe.","Il snows."], correct:"Il neige.", explanation:"Il neige (*eel nezh*) = It's snowing. La neige = snow."},
    {q:"'It's windy.' in French:", options:["Il y a du vent.","Il fait vent.","Il vente.","Le vent est fort."], correct:"Il y a du vent.", explanation:"Il y a du vent (*eel ee a du VON*) = It's windy. Du vent = some wind."},
    {q:"'What's the weather like today?' in French:", options:["Quel temps fait-il aujourd'hui ?","Comment est le temps ?","C'est quoi le temps ?","Le temps aujourd'hui ?"], correct:"Quel temps fait-il aujourd'hui ?", explanation:"Quel temps fait-il ? (*kell ton fay-TEEL*) = What's the weather like? Classic question."},
    {q:"'It's foggy.' in French:", options:["Il y a du brouillard.","Il fait sombre.","Il y a brouillard.","Le brouillard est là."], correct:"Il y a du brouillard.", explanation:"Il y a du brouillard (*broo-ee-YARD*) = It's foggy. Brouillard = fog."},
    {q:"'It's 28 degrees.' in French:", options:["Il fait 28 degrés.","C'est 28 degrés.","Il y a 28 degrés.","28 degrés il fait."], correct:"Il fait 28 degrés.", explanation:"Il fait X degrés = It's X degrees. The most natural French weather temperature phrase."},
    {q:"'It's going to rain tomorrow.' in French:", options:["Il va pleuvoir demain.","Il pleuvra demain.","Demain il pleut.","Il va pleuvoir après."], correct:"Il va pleuvoir demain.", explanation:"Il va + infinitive = it's going to. Pleuvoir = to rain. Near future for forecasts!"},
    {q:"'Spring' in French:", options:["Le printemps","L'été","L'automne","L'hiver"], correct:"Le printemps", explanation:"Le printemps (*pran-TON*) = spring. L'été = summer. L'automne = autumn. L'hiver = winter."}
  ],
  libre:[
    {q:"Translate: 'The weather is nice today.'", answer:"Il fait beau aujourd'hui.", explanation:"Il fait beau = nice weather. Aujourd'hui = today."},
    {q:"How do you say 'It's raining'?", answer:"Il pleut.", explanation:"Il pleut from the irregular verb pleuvoir. Very common in France!"},
    {q:"Complete: 'Il fait ___ aujourd'hui, vous ne trouvez pas ?'", answer:"beau", alternatives:["chaud","froid","froid"], explanation:"Il fait beau / chaud / froid = nice / hot / cold weather."},
    {q:"Translate: 'It's going to snow tomorrow.'", answer:"Il va neiger demain.", explanation:"Il va + infinitive. Neiger = to snow."},
    {q:"How do you say 'It's very hot'?", answer:"Il fait très chaud.", explanation:"Très = very. Il fait chaud = it's hot."},
    {q:"What is 'le brouillard'?", answer:"fog", alternatives:["the fog"], explanation:"Le brouillard = fog. Il y a du brouillard = it's foggy."},
    {q:"Translate: 'What is the weather like tomorrow?'", answer:"Quel temps va-t-il faire demain ?", alternatives:["Quel temps fera-t-il demain ?","Il fait quel temps demain ?"], explanation:"Quel temps = what weather. Demain = tomorrow."},
    {q:"Complete: 'Il y a du ___ aujourd'hui.'", answer:"vent", explanation:"Il y a du vent = it's windy. Le vent = the wind."},
    {q:"Translate: 'It's beautiful weather for a walk.'", answer:"Il fait beau pour se promener.", explanation:"Il fait beau = nice weather. Pour + infinitive = for / in order to."},
    {q:"How do you say 'It's cold this morning'?", answer:"Il fait froid ce matin.", explanation:"Ce matin = this morning. Il fait froid = it's cold."}
  ]
},

9: {
  title:"Essential Verbs ⚡",
  objective:"Use the 6 most important French verbs in everyday situations",
  hint:"These 6 verbs cover 70% of daily French — master them first!",
  qcm:[
    {q:"'I am tired.' in French:", options:["Je suis fatigué.","J'ai fatigué.","Je fais fatigué.","Je suis fatigue."], correct:"Je suis fatigué.", explanation:"ÊTRE: Je suis = I am. For states, identity, emotions. NEVER 'j'ai fatigué'."},
    {q:"'I have a headache.' in French:", options:["J'ai mal à la tête.","Je suis mal à la tête.","J'ai tête mal.","Je fais mal tête."], correct:"J'ai mal à la tête.", explanation:"AVOIR: J'ai = I have. J'ai mal à... = I have pain in / it hurts."},
    {q:"'We are going to the market.' in French:", options:["Nous allons au marché.","Nous sommes au marché.","Nous avons le marché.","Nous faisons le marché."], correct:"Nous allons au marché.", explanation:"ALLER: Nous allons = we are going. Au = à + le (masculine)."},
    {q:"'I do the housework.' in French:", options:["Je fais le ménage.","Je suis le ménage.","J'ai le ménage.","Je vais le ménage."], correct:"Je fais le ménage.", explanation:"FAIRE: Je fais = I do / I make. Le ménage = housework."},
    {q:"'I want to go home.' in French:", options:["Je veux rentrer à la maison.","Je suis vouloir rentrer.","J'ai envie rentrer.","Je peux rentrer."], correct:"Je veux rentrer à la maison.", explanation:"VOULOIR: Je veux = I want. Followed by infinitive. Rentrer = to go home."},
    {q:"'Can you help me?' in French:", options:["Pouvez-vous m'aider ?","Voulez-vous m'aider ?","Faites-vous m'aider ?","Allez-vous m'aider ?"], correct:"Pouvez-vous m'aider ?", explanation:"POUVOIR: Pouvez-vous ? = Can you? / Are you able to? M'aider = help me."},
    {q:"'She is French.' in French:", options:["Elle est française.","Elle a française.","Elle fait française.","Elle suis française."], correct:"Elle est française.", explanation:"ÊTRE: Elle est = she is. Nationality adjectives are lowercase in French!"},
    {q:"'I have two cats.' in French:", options:["J'ai deux chats.","Je suis deux chats.","Je fais deux chats.","Deux chats j'ai."], correct:"J'ai deux chats.", explanation:"AVOIR: J'ai = I have. For possession, age, and many physical states."},
    {q:"'They can't come tonight.' in French:", options:["Ils ne peuvent pas venir ce soir.","Ils sont pas venir.","Ils veulent pas ce soir.","Ils ne font pas."], correct:"Ils ne peuvent pas venir ce soir.", explanation:"POUVOIR: Ils ne peuvent pas = they can't. Ne...pas = negative."},
    {q:"Which verb means 'to do / make'?", options:["Faire","Être","Avoir","Aller"], correct:"Faire", explanation:"Faire (*fair*) = to do or to make. Je fais = I do/make. One of the most versatile French verbs."}
  ],
  libre:[
    {q:"Conjugate ÊTRE: 'She is...' (elle)", answer:"Elle est", explanation:"Être: je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont."},
    {q:"Conjugate AVOIR: 'We have...' (nous)", answer:"Nous avons", explanation:"Avoir: j'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont."},
    {q:"Conjugate ALLER: 'You go...' (formal, vous)", answer:"Vous allez", explanation:"Aller: je vais, tu vas, il/elle va, nous allons, vous allez, ils/elles vont."},
    {q:"Translate: 'I want a coffee.'", answer:"Je veux un café.", explanation:"Vouloir: je veux. But je voudrais is more polite in a café!"},
    {q:"Translate: 'Can you repeat, please?'", answer:"Pouvez-vous répéter, s'il vous plaît ?", explanation:"Pouvoir: Pouvez-vous = can you (formal). Essential phrase for language learners!"},
    {q:"Conjugate FAIRE: 'He does...' (il)", answer:"Il fait", explanation:"Faire: je fais, tu fais, il/elle fait, nous faisons, vous faites, ils/elles font."},
    {q:"Translate: 'I'm going to do the shopping.'", answer:"Je vais faire les courses.", explanation:"Aller + infinitive = near future. Je vais + faire = I'm going to do."},
    {q:"Complete: 'Je ___ besoin d'aide.'", answer:"ai", explanation:"Avoir besoin de = to need. J'ai besoin d'aide = I need help."},
    {q:"Translate: 'They are very kind.'", answer:"Ils sont très gentils.", alternatives:["Elles sont très gentilles."], explanation:"ÊTRE: Ils/elles sont = they are. Gentils (m.pl.) / gentilles (f.pl.)."},
    {q:"Complete: 'Je ___ aller à la pharmacie.'", answer:"dois", explanation:"Devoir: je dois = I must / I have to. Essential to know for daily life!"}
  ]
},

10: {
  title:"Politeness 🎩",
  objective:"Use polite French in any situation, ask for help graciously",
  hint:"French politeness is non-negotiable — always use it and you'll be well received!",
  qcm:[
    {q:"'Could you help me?' (very polite) in French:", options:["Pourriez-vous m'aider ?","Pouvez-vous aider ?","Aidez-moi.","Help me please."], correct:"Pourriez-vous m'aider ?", explanation:"Pourriez-vous (*poo-ryay-VOO*) = could you (conditional = extra polite). More polite than pouvez-vous."},
    {q:"'I don't understand.' in French:", options:["Je ne comprends pas.","Je comprends pas.","Je sais pas.","Je ne sais pas."], correct:"Je ne comprends pas.", explanation:"Je ne comprends pas (*zhuh nuh kom-PRON PAH*). Always use the full ne...pas in formal situations."},
    {q:"'Can you speak more slowly?' in French:", options:["Pouvez-vous parler plus lentement ?","Parlez lent.","Parlez doucement.","Vous parlez lentement ?"], correct:"Pouvez-vous parler plus lentement ?", explanation:"Plus lentement (*plue lon-tuh-MON*) = more slowly. Absolutely essential for learners!"},
    {q:"'You're welcome.' (most common) in French:", options:["De rien.","Pas de quoi.","Avec plaisir.","C'est normal."], correct:"De rien.", explanation:"De rien (*duh RYAN*) = You're welcome. Pas de quoi / Avec plaisir are also correct."},
    {q:"'I'm sorry.' in French:", options:["Je suis désolé(e).","Je suis sorry.","Pardon.","Excusez-moi."], correct:"Je suis désolé(e).", explanation:"Je suis désolé(e) = I'm sorry (sincere apology). Pardon/Excusez-moi are for minor things."},
    {q:"'Excuse me' to get someone's attention:", options:["Excusez-moi","Pardon","S'il vous plaît","Attention"], correct:"Excusez-moi", explanation:"Excusez-moi (*ex-kue-ZAY mwah*) to get attention. Pardon to say sorry for bumping into someone."},
    {q:"Which phrase asks someone to repeat?", options:["Pouvez-vous répéter, s'il vous plaît ?","Parlez encore.","Encore une fois.","Dites encore."], correct:"Pouvez-vous répéter, s'il vous plaît ?", explanation:"Répéter (*ray-pay-TAY*) = to repeat. Essential for all language learners!"},
    {q:"'Do you speak English?' (formal) in French:", options:["Parlez-vous anglais ?","Vous parlez anglais ?","Savez-vous l'anglais ?","L'anglais vous ?"], correct:"Parlez-vous anglais ?", explanation:"Parlez-vous ? (*par-lay-VOO*) = Do you speak? Formal inversion question."},
    {q:"'Thank you very much.' in French:", options:["Merci beaucoup.","Merci très.","Grand merci.","Beaucoup merci."], correct:"Merci beaucoup.", explanation:"Merci beaucoup (*mair-see boh-KOO*) = Thank you very much. Merci mille fois = thanks a thousand times."},
    {q:"The most important word to say first in any French interaction:", options:["Bonjour","Merci","S'il vous plaît","Excusez-moi"], correct:"Bonjour", explanation:"ALWAYS start with Bonjour. Going straight to your request without it is considered very rude in France."}
  ],
  libre:[
    {q:"Translate: 'Can you repeat more slowly, please?'", answer:"Pouvez-vous répéter plus lentement, s'il vous plaît ?", explanation:"Répéter = to repeat. Plus lentement = more slowly."},
    {q:"How do you say 'I don't understand'?", answer:"Je ne comprends pas.", explanation:"Comprendre = to understand. Ne...pas = negation."},
    {q:"Translate: 'I'm sorry, I'm late.'", answer:"Je suis désolé(e), je suis en retard.", explanation:"En retard = late. Je suis désolé(e) = I'm sorry."},
    {q:"How do you say 'You're welcome'?", answer:"De rien.", alternatives:["Pas de quoi.","Avec plaisir."], explanation:"De rien is most common. Pas de quoi / Avec plaisir also work."},
    {q:"What is the FIRST thing to say when entering any French shop?", answer:"Bonjour !", explanation:"ALWAYS say Bonjour when entering. Not doing so is considered rude."},
    {q:"Complete: 'Pouvez-vous parler ___ lentement ?'", answer:"plus", explanation:"Plus lentement = more slowly. Plus = more in comparisons."},
    {q:"Translate: 'Excuse me, I don't understand French very well.'", answer:"Excusez-moi, je ne comprends pas très bien le français.", explanation:"Je ne comprends pas bien = I don't understand well. Honest and useful!"},
    {q:"How do you say 'Thank you very much, goodbye'?", answer:"Merci beaucoup, au revoir.", explanation:"Always end interactions with merci + au revoir. It matters!"},
    {q:"Translate: 'Could you help me please?'", answer:"Pourriez-vous m'aider, s'il vous plaît ?", explanation:"Pourriez-vous = could you (conditional, very polite)."},
    {q:"What does 'je ne comprends pas' mean?", answer:"I don't understand", alternatives:["I do not understand"], explanation:"Je ne comprends pas — one of the most important phrases for a learner!"}
  ]
},

11: {
  title:"Daily Life in France 🇫🇷",
  objective:"Handle admin, services and practical French daily life",
  hint:"Bring your ID (CNI/passport) and carte Vitale to all admin appointments!",
  qcm:[
    {q:"Where do you go to change your address officially?", options:["La mairie","La pharmacie","La poste","Le supermarché"], correct:"La mairie", explanation:"La mairie (town hall) handles address changes, civil records, local permits, and much more."},
    {q:"What is the 'carte Vitale'?", options:["French health insurance card","A debit card","A driving licence","A library card"], correct:"French health insurance card", explanation:"La carte Vitale is your French health insurance card. Keep it with you at all times!"},
    {q:"'I need to make an appointment with my doctor.' in French:", options:["Je dois prendre rendez-vous avec mon médecin.","Je dois voir le docteur.","J'ai besoin docteur.","Je vais docteur."], correct:"Je dois prendre rendez-vous avec mon médecin.", explanation:"Prendre rendez-vous (*pron-druh ron-day-VOO*) = to make an appointment."},
    {q:"What is 'la déchetterie'?", options:["The recycling/waste centre","The bakery","The police station","The supermarket"], correct:"The recycling/waste centre", explanation:"La déchetterie is where you take large waste, electronics, old paint. There's usually one per town."},
    {q:"'The internet is not working.' in French:", options:["Internet ne marche pas.","La box est cassée.","Je n'ai pas internet.","Internet est mort."], correct:"Internet ne marche pas.", explanation:"Marcher (*mar-SHAY*) in French means to work (for machines). La box internet = your router."},
    {q:"'The electricity bill' in French:", options:["La facture d'électricité","Le billet électrique","La note de courant","Le papier EDF"], correct:"La facture d'électricité", explanation:"Une facture (*fak-TUER*) = a bill/invoice. EDF is the main French electricity provider."},
    {q:"'I need to register at the town hall.' in French:", options:["Je dois m'inscrire à la mairie.","Je vais mairie.","Je dois mairie.","Je m'inscris mairie."], correct:"Je dois m'inscrire à la mairie.", explanation:"S'inscrire (*san-SKREER*) = to register. M'inscrire = to register myself."},
    {q:"'The rubbish collection is on Thursday.' in French:", options:["La collecte des ordures est le jeudi.","Les poubelles jeudi.","Ramassage poubelle jeudi.","Collecte jeudi ordures."], correct:"La collecte des ordures est le jeudi.", explanation:"La collecte (*kol-EKT*) = collection. Des ordures = of rubbish/waste."},
    {q:"How do you say 'My car needs a service'?", options:["Ma voiture a besoin d'une révision.","Mon voiture réparation.","Ma voiture est cassée.","Je dois garage."], correct:"Ma voiture a besoin d'une révision.", explanation:"Une révision (*ray-vee-ZYON*) = a car service. Besoin de = need."},
    {q:"'I need to renew my residency card.' in French:", options:["Je dois renouveler ma carte de séjour.","Je dois carte nouveau.","Ma carte est vieille.","Renouveler séjour."], correct:"Je dois renouveler ma carte de séjour.", explanation:"Renouveler (*ruh-noo-vuh-LAY*) = to renew. La carte de séjour = residency permit."}
  ],
  libre:[
    {q:"Translate: 'I need to go to the town hall.'", answer:"Je dois aller à la mairie.", explanation:"Je dois + infinitive = I must/need to. La mairie = town hall."},
    {q:"How do you say 'My internet isn't working'?", answer:"Mon internet ne marche pas.", alternatives:["Ma box ne marche pas."], explanation:"Ne marche pas = doesn't work (for machines/services)."},
    {q:"What is 'la carte Vitale' used for?", answer:"French health insurance", alternatives:["health insurance card","Sécurité Sociale"], explanation:"Always carry it to doctor, pharmacy and hospital appointments."},
    {q:"Complete: 'Je dois prendre ___ avec mon médecin.'", answer:"rendez-vous", explanation:"Prendre rendez-vous = to make an appointment. Essential phrase!"},
    {q:"Translate: 'The electricity bill arrived today.'", answer:"La facture d'électricité est arrivée aujourd'hui.", explanation:"La facture = the bill. Arrivée = arrived (feminine agreement with la facture)."},
    {q:"How do you say 'I need to register my car'?", answer:"Je dois immatriculer ma voiture.", alternatives:["Je dois faire la carte grise."], explanation:"La carte grise = vehicle registration document. Immatriculer = to register (a vehicle)."},
    {q:"Translate: 'Is there a recycling centre nearby?'", answer:"Il y a une déchetterie près d'ici ?", explanation:"La déchetterie = recycling/waste centre. Près d'ici = nearby."},
    {q:"What does 'ça ne marche pas' mean?", answer:"it doesn't work", alternatives:["it's not working"], explanation:"Marcher = to work (for machines, services). Ça ne marche pas = it's not working."},
    {q:"Complete: 'Je dois m'___ à la mairie.'", answer:"inscrire", explanation:"S'inscrire = to register. Je dois m'inscrire = I need to register myself."},
    {q:"Translate: 'My residency card expires next month.'", answer:"Ma carte de séjour expire le mois prochain.", explanation:"Expirer = to expire. Le mois prochain = next month."}
  ]
},

12: {
  title:"My Routine 🌅",
  objective:"Talk about what you did today using passé composé",
  hint:"Passé composé = avoir/être + past participle. Most verbs use avoir!",
  qcm:[
    {q:"'I cleaned the house' in French:", options:["J'ai nettoyé la maison.","Je suis nettoyé.","J'ai nettoyer.","Je nettoyais."], correct:"J'ai nettoyé la maison.", explanation:"Passé composé with avoir: j'ai + nettoyé (past participle). Never 'Je suis nettoyé'!"},
    {q:"'This morning' in French:", options:["Ce matin","Cet matin","Cette matin","Ce matinée"], correct:"Ce matin", explanation:"Ce matin (*suh ma-TAN*) = this morning. Cet is used before vowels: cet après-midi."},
    {q:"Past participle of FAIRE:", options:["fait","fais","faite","faire"], correct:"fait", explanation:"Faire → fait (*fay*). J'ai fait les courses = I did the shopping."},
    {q:"'I watered the garden' in French:", options:["J'ai arrosé le jardin.","Je suis arrosé.","J'ai arroser.","J'arrosais."], correct:"J'ai arrosé le jardin.", explanation:"Arroser → arrosé. Always with avoir for this verb."},
    {q:"'This afternoon' in French:", options:["Cet après-midi","Ce après-midi","Cette après-midi","L'après-midi"], correct:"Cet après-midi", explanation:"Après-midi starts with a vowel, so use cet (not ce). Cet après-midi = this afternoon."},
    {q:"'I did the shopping' in French:", options:["J'ai fait les courses.","Je suis fait les courses.","J'ai faites les courses.","Je faisais courses."], correct:"J'ai fait les courses.", explanation:"Faire → fait (past participle doesn't change with avoir auxiliary!)."},
    {q:"'Yesterday' in French:", options:["Hier","Demain","Ce matin","Ce soir"], correct:"Hier", explanation:"Hier (*ee-AIR*) = yesterday. Demain = tomorrow. Avant-hier = the day before yesterday."},
    {q:"'I tidied up' in French:", options:["J'ai rangé.","Je suis rangé.","J'ai ranger.","Je rangeais."], correct:"J'ai rangé.", explanation:"Ranger → rangé. Passé composé: j'ai + rangé."},
    {q:"'I just finished' in French:", options:["Je viens de finir.","J'ai venu finir.","Je suis de finir.","J'ai juste fini."], correct:"Je viens de finir.", explanation:"Je viens de + infinitive = I just [did something]. Very useful!"},
    {q:"'This evening' in French:", options:["Ce soir","Ce soirée","Cette soir","Le soir"], correct:"Ce soir", explanation:"Ce soir (*suh SWAHR*) = this evening / tonight."}
  ],
  libre:[
    {q:"Past participle of 'nettoyer' (to clean):", answer:"nettoyé", explanation:"Nettoyer → nettoyé. All -er verbs: drop -er, add -é."},
    {q:"Translate: 'This morning I did the shopping.'", answer:"Ce matin j'ai fait les courses.", explanation:"Ce matin = this morning. J'ai fait = I did (passé composé)."},
    {q:"How do you say 'I watered the garden'?", answer:"J'ai arrosé le jardin.", explanation:"Arroser → arrosé. J'ai + arrosé."},
    {q:"Translate: 'This evening I'm going to rest.'", answer:"Ce soir je vais me reposer.", explanation:"Ce soir = this evening. Je vais + infinitive = near future."},
    {q:"Complete: 'J'ai ___ la vaisselle ce matin.'", answer:"fait", explanation:"Faire la vaisselle = do the dishes. Passé composé: j'ai fait."},
    {q:"How do you say 'I just arrived'?", answer:"Je viens d'arriver.", explanation:"Je viens de + infinitive = I just [did]. Je viens d'arriver = I just arrived."},
    {q:"Translate: 'Yesterday I cleaned the whole house.'", answer:"Hier j'ai nettoyé toute la maison.", explanation:"Hier = yesterday. Toute la maison = the whole house."},
    {q:"What does 'ce soir' mean?", answer:"this evening", alternatives:["tonight"], explanation:"Ce soir = this evening / tonight. Ce matin = this morning."},
    {q:"Complete: 'J'ai ___ le jardin ce matin.'", answer:"arrosé", explanation:"Arroser → arrosé. J'ai arrosé = I watered."},
    {q:"Translate: 'I need to tidy up tomorrow.'", answer:"Je dois ranger demain.", explanation:"Je dois + infinitive = I need to. Ranger = to tidy up."}
  ]
},

13: {
  title:"My Emotions ❤️",
  objective:"Express how you feel using être + adjectives",
  hint:"Use ÊTRE for emotions — NEVER 'j'ai fatigué', always 'je suis fatigué'!",
  qcm:[
    {q:"'I am tired' (man speaking) in French:", options:["Je suis fatigué.","J'ai fatigué.","Je fais fatigué.","Je me fatigue."], correct:"Je suis fatigué.", explanation:"ÊTRE for emotions! Je suis fatigué. Woman: je suis fatiguée (add -e)."},
    {q:"'I am happy' (woman speaking) in French:", options:["Je suis contente.","Je suis content.","J'ai contente.","Je fais contente."], correct:"Je suis contente.", explanation:"Content (m) / contente (f). Add -e for feminine. Je SUIS — not j'ai!"},
    {q:"'Stressed' in French:", options:["Stressé","Stressant","Stresseur","Stressable"], correct:"Stressé", explanation:"Stressé (*stress-AY*) (m) / stressée (f). Je suis stressé(e) = I am stressed."},
    {q:"'I am worried' (man speaking) in French:", options:["Je suis inquiet.","Je suis inquiète.","J'ai inquiet.","Je me suis inquiet."], correct:"Je suis inquiet.", explanation:"Inquiet (m) / inquiète (f). Je suis inquiet = I'm worried (man)."},
    {q:"'I feel good' in French:", options:["Je me sens bien.","Je suis bien.","J'ai bien.","Je fais bien."], correct:"Je me sens bien.", explanation:"Je me sens bien (*zhuh muh son BYAN*) = I feel good. Se sentir = to feel."},
    {q:"'I am sad' in French:", options:["Je suis triste.","J'ai triste.","Je fais triste.","Je me suis triste."], correct:"Je suis triste.", explanation:"Triste (*treest*) = sad. Same form for masculine and feminine!"},
    {q:"Which is WRONG?", options:["J'ai fatigué","Je suis content","Je me sens bien","Je suis un peu stressée"], correct:"J'ai fatigué", explanation:"NEVER j'ai fatigué. Always Je SUIS fatigué. Avoir is not used for emotional states."},
    {q:"'I am a little worried' (woman) in French:", options:["Je suis un peu inquiète.","Je suis un peu inquiet.","J'ai un peu inquiet.","Je me sens inquiète."], correct:"Je suis un peu inquiète.", explanation:"Un peu = a little. Inquiète (f) = worried. Je suis is correct."},
    {q:"'I feel better today.' in French:", options:["Je me sens mieux aujourd'hui.","Je suis mieux.","J'ai mieux.","Ça va mieux pour moi."], correct:"Je me sens mieux aujourd'hui.", explanation:"Je me sens mieux = I feel better. Mieux = better."},
    {q:"'I am motivated' (man) in French:", options:["Je suis motivé.","Je suis motivée.","J'ai motivé.","Je me motive."], correct:"Je suis motivé.", explanation:"Motivé (m) / motivée (f). Always with être: je suis motivé."}
  ],
  libre:[
    {q:"Translate: 'I am tired but happy.'", answer:"Je suis fatigué mais content.", alternatives:["Je suis fatiguée mais contente."], explanation:"Mais = but. Both adjectives agree with the speaker's gender."},
    {q:"How do you say 'I feel good today'?", answer:"Je me sens bien aujourd'hui.", explanation:"Se sentir = to feel. Je me sens = I feel."},
    {q:"Translate: 'She is a little worried.'", answer:"Elle est un peu inquiète.", explanation:"Un peu = a little. Inquiète (f) = worried."},
    {q:"Complete: 'Je suis ___ mais motivé.'", answer:"fatigué", alternatives:["stressé","triste"], explanation:"Je suis fatigué mais motivé = I'm tired but motivated."},
    {q:"How do you say 'I am stressed' (woman)?", answer:"Je suis stressée.", explanation:"Add -e for feminine: stressée."},
    {q:"What is the French for 'sad'?", answer:"triste", explanation:"Triste = sad. Same form for masculine and feminine!"},
    {q:"Translate: 'I feel better now.'", answer:"Je me sens mieux maintenant.", explanation:"Mieux = better. Maintenant = now."},
    {q:"Complete: 'Je ___ un peu triste ce soir.'", answer:"suis", explanation:"Je suis = I am. Always être for emotional states."},
    {q:"How do you say 'He is happy'?", answer:"Il est content.", explanation:"Il est = he is. Content = happy (masculine)."},
    {q:"Translate: 'I am a little tired today.'", answer:"Je suis un peu fatigué aujourd'hui.", alternatives:["Je suis un peu fatiguée aujourd'hui."], explanation:"Un peu = a little. Fatigué(e) = tired."}
  ]
},

14: {
  title:"My Needs 🍽️",
  objective:"Express hunger, thirst, tiredness and desires using avoir",
  hint:"In French, hunger and thirst use AVOIR (to have), not être!",
  qcm:[
    {q:"'I am hungry' in French:", options:["J'ai faim.","Je suis faim.","J'ai famine.","Je fais faim."], correct:"J'ai faim.", explanation:"J'ai faim (*zhay FAN*) = I am hungry. Literally 'I have hunger'. Always avoir!"},
    {q:"'I am thirsty' in French:", options:["J'ai soif.","Je suis soif.","J'ai soife.","Je soif."], correct:"J'ai soif.", explanation:"J'ai soif (*zhay SWAF*) = I am thirsty. Soif = thirst."},
    {q:"'I am sleepy' in French:", options:["J'ai sommeil.","Je suis sommeil.","J'ai dormi.","Je me dors."], correct:"J'ai sommeil.", explanation:"J'ai sommeil (*zhay so-MAY*) = I am sleepy. Literally 'I have sleepiness'."},
    {q:"'I need to rest' in French:", options:["J'ai besoin de me reposer.","Je besoin reposer.","J'ai need reposer.","J'ai besoin repose."], correct:"J'ai besoin de me reposer.", explanation:"J'ai besoin de + infinitive = I need to. Me reposer = to rest (myself)."},
    {q:"'I feel like going for a walk' in French:", options:["J'ai envie de me promener.","Je veux me promener.","J'ai envie promener.","Je me promène."], correct:"J'ai envie de me promener.", explanation:"J'ai envie de + infinitive = I feel like / I fancy. Me promener = to go for a walk."},
    {q:"The POLITE way to say 'I want a coffee' in French:", options:["Je voudrais un café, s'il vous plaît.","Je veux un café.","Donnez-moi un café.","Un café !"], correct:"Je voudrais un café, s'il vous plaît.", explanation:"Je voudrais (*zhuh voo-DRAY*) = I would like (conditional). Much more polite than je veux."},
    {q:"'I need some rest.' in French:", options:["J'ai besoin de repos.","Je besoin repos.","J'ai repos.","Je suis besoin repos."], correct:"J'ai besoin de repos.", explanation:"J'ai besoin de = I need. Repos = rest (noun). De + noun works too."},
    {q:"'I don't feel like going out.' in French:", options:["Je n'ai pas envie de sortir.","Je veux pas sortir.","J'ai pas envie.","Je ne veux pas."], correct:"Je n'ai pas envie de sortir.", explanation:"Je n'ai pas envie de = I don't feel like. Negative: n'ai pas envie de."},
    {q:"'I need help.' in French:", options:["J'ai besoin d'aide.","Je besoin aide.","J'ai aide.","Je dois aide."], correct:"J'ai besoin d'aide.", explanation:"J'ai besoin d'aide (*buh-ZWAN daid*) = I need help. D'aide = de + aide (elision)."},
    {q:"'Would you like some water?' (polite) in French:", options:["Voudriez-vous de l'eau ?","Voulez-vous eau ?","Avez-vous soif ?","De l'eau vous plaît ?"], correct:"Voudriez-vous de l'eau ?", explanation:"Voudriez-vous ? = Would you like? De l'eau = some water."}
  ],
  libre:[
    {q:"Translate: 'I am hungry.'", answer:"J'ai faim.", explanation:"J'ai faim — use avoir (have), not être!"},
    {q:"Translate: 'I am thirsty.'", answer:"J'ai soif.", explanation:"J'ai soif — hunger and thirst both use avoir in French."},
    {q:"How do you say 'I need to call the doctor'?", answer:"J'ai besoin d'appeler le médecin.", explanation:"J'ai besoin de + infinitive = I need to."},
    {q:"Complete: 'J'ai ___ de dormir.'", answer:"besoin", explanation:"J'ai besoin de dormir = I need to sleep."},
    {q:"Translate: 'I feel like a coffee.'", answer:"J'ai envie d'un café.", explanation:"J'ai envie de = I feel like. D'un = de + un."},
    {q:"How do you say 'I would like some bread, please'?", answer:"Je voudrais du pain, s'il vous plaît.", explanation:"Je voudrais = I would like (polite). Du pain = some bread."},
    {q:"Complete: 'Je ___ pas envie de cuisiner ce soir.'", answer:"n'ai", explanation:"Je n'ai pas envie de = I don't feel like. Negative with avoir."},
    {q:"Translate: 'I need some help.'", answer:"J'ai besoin d'aide.", explanation:"J'ai besoin d'aide — simple and direct. Very useful phrase!"},
    {q:"What's the polite way to say 'I want'?", answer:"Je voudrais", explanation:"Je voudrais (conditional) = I would like. Much politer than je veux."},
    {q:"Translate: 'I am not hungry.'", answer:"Je n'ai pas faim.", explanation:"Negative: Je n'ai pas faim. N'ai pas = have not."}
  ]
},

15: {
  title:"My House 🏡",
  objective:"Talk about household chores and tasks around the home",
  hint:"Faire + household task is the key pattern: faire le ménage, faire la vaisselle...",
  qcm:[
    {q:"'I do the housework' in French:", options:["Je fais le ménage.","Je suis le ménage.","Je nettoie le ménage.","Je fais la maison."], correct:"Je fais le ménage.", explanation:"Faire le ménage (*fair le may-NAZH*) = do the housework. Very common expression!"},
    {q:"'I do the dishes' in French:", options:["Je fais la vaisselle.","Je lave la vaisselle.","Je nettoie la vaisselle.","Je range la vaisselle."], correct:"Je fais la vaisselle.", explanation:"Faire la vaisselle = do the dishes. La vaisselle = dishes/crockery."},
    {q:"'I vacuum' in French:", options:["Je passe l'aspirateur.","Je fais l'aspirateur.","J'aspire.","Je nettoie avec l'aspirateur."], correct:"Je passe l'aspirateur.", explanation:"Passer l'aspirateur (*pass-ay las-pee-ra-TEUR*) = to vacuum. Not faire — it's passer!"},
    {q:"'I make the bed' in French:", options:["Je fais le lit.","Je prépare le lit.","J'arrange le lit.","Je mets le lit."], correct:"Je fais le lit.", explanation:"Faire le lit = make the bed. Le lit (*lee*) = bed."},
    {q:"'I tidy up' in French:", options:["Je range.","Je nettoie.","Je fais.","J'ordre."], correct:"Je range.", explanation:"Ranger (*ran-ZHAY*) = to tidy up, to put away. Je range = I tidy up."},
    {q:"'I take out the bins' in French:", options:["Je sors les poubelles.","Je jette les poubelles.","Je fais les poubelles.","Je mets les poubelles."], correct:"Je sors les poubelles.", explanation:"Sortir les poubelles (*soor-TEER*) = take out the bins. Les poubelles = the bins."},
    {q:"'I clean the kitchen' in French:", options:["Je nettoie la cuisine.","Je fais la cuisine.","Je lave la cuisine.","Je range la cuisine."], correct:"Je nettoie la cuisine.", explanation:"Nettoyer (*net-wa-YAY*) = to clean. La cuisine = the kitchen."},
    {q:"'I do the cooking' in French:", options:["Je fais la cuisine.","Je cuisine.","Je prépare à manger.","Je fais à manger."], correct:"Je fais la cuisine.", explanation:"Faire la cuisine = do the cooking. Also: je cuisine (I cook)."},
    {q:"Which is WRONG: 'Je ___ le lit.'?", options:["Je suis le lit","Je fais le lit","J'ai fait le lit","Je vais faire le lit"], correct:"Je suis le lit", explanation:"Je suis le lit makes no sense! Je fais le lit = I make the bed."},
    {q:"'I'll clean the house tomorrow.' in French:", options:["Je vais nettoyer la maison demain.","Je nettoierai demain.","Demain nettoie.","Je dois nettoyer demain."], correct:"Je vais nettoyer la maison demain.", explanation:"Je vais + infinitive = I'm going to (near future). Demain = tomorrow."}
  ],
  libre:[
    {q:"Translate: 'I do the housework on Mondays.'", answer:"Je fais le ménage le lundi.", explanation:"Le lundi = on Mondays (habitual). Faire le ménage = do the housework."},
    {q:"How do you say 'I vacuum the whole house'?", answer:"Je passe l'aspirateur dans toute la maison.", explanation:"Toute la maison = the whole house. Passer l'aspirateur = to vacuum."},
    {q:"Translate: 'I made the bed this morning.'", answer:"J'ai fait le lit ce matin.", explanation:"Passé composé: j'ai fait. Ce matin = this morning."},
    {q:"Complete: 'Je sors les ___ le mardi.'", answer:"poubelles", explanation:"Les poubelles = the bins. Je sors les poubelles = I take out the bins."},
    {q:"How do you say 'I need to clean the bathroom'?", answer:"Je dois nettoyer la salle de bain.", explanation:"La salle de bain = the bathroom. Nettoyer = to clean."},
    {q:"Translate: 'I tidied up the living room.'", answer:"J'ai rangé le salon.", explanation:"Ranger → rangé. Le salon = living room."},
    {q:"Complete: 'Ce matin j'ai fait la ___.'", answer:"vaisselle", explanation:"Faire la vaisselle = do the dishes."},
    {q:"How do you say 'I do the cooking every evening'?", answer:"Je fais la cuisine tous les soirs.", explanation:"Tous les soirs = every evening."},
    {q:"Translate: 'I need to take out the bins.'", answer:"Je dois sortir les poubelles.", explanation:"Je dois + infinitive = I need to / I must."},
    {q:"What does 'faire le ménage' mean?", answer:"do the housework", alternatives:["housework","do housework"], explanation:"Le ménage = housework. Faire le ménage = do the housework."}
  ]
},

16: {
  title:"My Family 👨‍👩‍👧",
  objective:"Talk about family members and use possessives correctly",
  hint:"Mon before masculine, ma before feminine, mes for plural — except before vowels: mon amie!",
  qcm:[
    {q:"'My husband' in French:", options:["Mon mari","Ma mari","Mon homme","Le mari mien"], correct:"Mon mari", explanation:"Mon mari (*mon ma-REE*) = my husband. Mon is used with masculine nouns."},
    {q:"'My wife' in French:", options:["Ma femme","Mon femme","Ma wife","La femme moi"], correct:"Ma femme", explanation:"Ma femme (*ma FAM*) = my wife. Ma is used with feminine nouns."},
    {q:"'My son' in French:", options:["Mon fils","Ma fils","Mon fiston","Le fils mien"], correct:"Mon fils", explanation:"Mon fils (*mon feece*) = my son. Careful: fils is pronounced like 'feece'."},
    {q:"'My daughter' in French:", options:["Ma fille","Mon fille","Ma girl","La fille mien"], correct:"Ma fille", explanation:"Ma fille (*ma FEE*) = my daughter. La fille = the girl/daughter."},
    {q:"'My grandchildren' in French:", options:["Mes petits-enfants","Mon petit-enfant","Ma petits-enfants","Les petits-enfants miens"], correct:"Mes petits-enfants", explanation:"Mes (*may*) = my (plural). Petits-enfants = grandchildren."},
    {q:"'I have two children' in French:", options:["J'ai deux enfants.","Je suis deux enfants.","J'ai deux enfants miens.","Deux enfants j'ai."], correct:"J'ai deux enfants.", explanation:"J'ai = I have (avoir). Deux enfants = two children. No article needed after avoir + number!"},
    {q:"'My brother' in French:", options:["Mon frère","Ma frère","Mon brother","Le frère mien"], correct:"Mon frère", explanation:"Mon frère (*mon FRAIR*) = my brother. Ma sœur = my sister."},
    {q:"'My female friend' — why is it 'mon amie' not 'ma amie'?", options:["Because amie starts with a vowel","Because amie is masculine","Because it's wrong","No reason"], correct:"Because amie starts with a vowel", explanation:"Before vowels, use mon/ton/son even with feminine nouns: mon amie, mon école."},
    {q:"'My parents' in French:", options:["Mes parents","Mon parent","Ma parents","Les parents miens"], correct:"Mes parents", explanation:"Mes parents (*may pa-RON*) = my parents. Always plural."},
    {q:"'We have three grandchildren' in French:", options:["Nous avons trois petits-enfants.","Nous sommes trois petits-enfants.","On a trois petits-enfants.","Nos petits-enfants sont trois."], correct:"Nous avons trois petits-enfants.", explanation:"Nous avons = we have. On a = we have (informal). Both correct."}
  ],
  libre:[
    {q:"Translate: 'My husband is retired.'", answer:"Mon mari est retraité.", explanation:"Retraité(e) = retired. Mon mari = my husband."},
    {q:"How do you say 'I have two daughters'?", answer:"J'ai deux filles.", explanation:"Deux filles = two daughters. J'ai = I have."},
    {q:"Complete: '___ mère habite en Angleterre.'", answer:"Ma", explanation:"Ma mère = my mother. Mère is feminine."},
    {q:"Translate: 'My children live in France.'", answer:"Mes enfants habitent en France.", explanation:"Mes = my (plural). En France = in France."},
    {q:"How do you say 'my sister'?", answer:"ma sœur", explanation:"Ma sœur (*ma SURR*) = my sister. Ma = my (feminine)."},
    {q:"Complete: '___ amie s'appelle Helen.' (my female friend)", answer:"Mon", explanation:"Mon amie — use mon before any noun starting with a vowel, even feminine ones!"},
    {q:"Translate: 'I have four grandchildren.'", answer:"J'ai quatre petits-enfants.", explanation:"Quatre = four. Petits-enfants = grandchildren."},
    {q:"What is 'mes parents' in English?", answer:"my parents", explanation:"Mes = my (plural). Parents = parents."},
    {q:"Translate: 'My son is a doctor.'", answer:"Mon fils est médecin.", explanation:"Mon fils = my son. Médecin = doctor (no article in French!)."},
    {q:"Complete: 'J'ai ___ enfants.'", answer:"deux", alternatives:["trois","quatre","cinq"], explanation:"J'ai X enfants = I have X children. No article after avoir + number."}
  ]
},

17: {
  title:"My Plans 📅",
  objective:"Talk about future plans using futur proche (aller + infinitive)",
  hint:"Futur proche = aller (conjugated) + infinitive. Simpler and more common than future tense!",
  qcm:[
    {q:"'I am going to cook' in French:", options:["Je vais cuisiner.","Je suis cuisiner.","J'ai cuisiné.","Je cuisine."], correct:"Je vais cuisiner.", explanation:"Futur proche: je vais + infinitive. Je vais cuisiner = I'm going to cook."},
    {q:"'She is going to phone' in French:", options:["Elle va téléphoner.","Elle est téléphoner.","Elle va téléphone.","Elle ira téléphoner."], correct:"Elle va téléphoner.", explanation:"Elle va + infinitive. Téléphoner = to phone."},
    {q:"'Next week' in French:", options:["La semaine prochaine","La prochaine semaine","Semaine prochaine","Next week"], correct:"La semaine prochaine", explanation:"La semaine prochaine (*pro-SHEN*) = next week. Le mois prochain = next month."},
    {q:"'This weekend' in French:", options:["Ce week-end","Ce fin de semaine","Ce weekend","Ce we"], correct:"Ce week-end", explanation:"Ce week-end = this weekend. The word week-end is used in French!"},
    {q:"'We are going to the restaurant' in French:", options:["Nous allons au restaurant.","Nous allons à restaurant.","Nous allons le restaurant.","Nous sommes restaurant."], correct:"Nous allons au restaurant.", explanation:"Au = à + le. Nous allons = we are going (also futur proche when with infinitive)."},
    {q:"Which is an example of futur proche?", options:["Je vais manger","J'ai mangé","Je mange","Je mangerai"], correct:"Je vais manger", explanation:"Futur proche = aller + infinitive. Je vais manger = I'm going to eat."},
    {q:"'I am going to do the shopping' in French:", options:["Je vais faire les courses.","Je vais les courses faire.","Je faire les courses.","Je vais les courses."], correct:"Je vais faire les courses.", explanation:"Je vais + faire + les courses. The infinitive always comes after aller."},
    {q:"'Soon' in French:", options:["Bientôt","Vite","Prochain","Après"], correct:"Bientôt", explanation:"Bientôt (*byan-TOH*) = soon. À bientôt = see you soon!"},
    {q:"'Next month' in French:", options:["Le mois prochain","Le prochain mois","Mois prochain","Le prochain mois"], correct:"Le mois prochain", explanation:"Le mois prochain = next month. La semaine prochaine = next week."},
    {q:"'They are going to visit us' in French:", options:["Ils vont nous rendre visite.","Ils sont nous visiter.","Ils vont nous visit.","Ils allons visiter."], correct:"Ils vont nous rendre visite.", explanation:"Ils vont + infinitive = they are going to. Nous rendre visite = visit us."}
  ],
  libre:[
    {q:"Translate: 'I'm going to clean the house tomorrow.'", answer:"Je vais nettoyer la maison demain.", explanation:"Je vais + infinitive + demain."},
    {q:"How do you say 'she is going to'?", answer:"elle va", explanation:"Aller conjugated: je vais, tu vas, il/elle va, nous allons, vous allez, ils/elles vont."},
    {q:"Translate: 'Next week I'm going to visit my family.'", answer:"La semaine prochaine je vais rendre visite à ma famille.", alternatives:["La semaine prochaine je vais voir ma famille."], explanation:"Rendre visite à = to visit (a person). Voir = to see."},
    {q:"Complete: 'Je vais ___ la vaisselle ce soir.'", answer:"faire", explanation:"Faire la vaisselle = do the dishes. Je vais faire = I'm going to do."},
    {q:"Translate: 'This weekend we're going to the market.'", answer:"Ce week-end nous allons au marché.", explanation:"Au marché = to the market. Au = à + le."},
    {q:"How do you say 'soon'?", answer:"bientôt", explanation:"Bientôt = soon. À bientôt = see you soon!"},
    {q:"Translate: 'I'm going to rest this afternoon.'", answer:"Je vais me reposer cet après-midi.", explanation:"Me reposer = to rest (myself). Cet après-midi = this afternoon."},
    {q:"Complete: 'Nous ___ aller au restaurant samedi.'", answer:"allons", explanation:"Nous allons = we are going. Futur proche with nous."},
    {q:"Translate: 'She's going to call next week.'", answer:"Elle va téléphoner la semaine prochaine.", explanation:"Elle va + téléphoner. La semaine prochaine = next week."},
    {q:"How do you say 'next month'?", answer:"le mois prochain", explanation:"Le mois prochain. Note: prochain comes AFTER the noun in French!"}
  ]
},

18: {
  title:"My Health 💊",
  objective:"Explain symptoms, make a doctor's appointment, go to the pharmacy",
  hint:"J'ai mal à la/au/aux + body part = I have pain in / it hurts",
  qcm:[
    {q:"'I have a headache' in French:", options:["J'ai mal à la tête.","J'ai mal la tête.","Je suis mal tête.","Ma tête fait mal."], correct:"J'ai mal à la tête.", explanation:"J'ai mal à (*zhay mal a*) + body part = I have pain in... À + la tête (feminine)."},
    {q:"'I have back pain' in French:", options:["J'ai mal au dos.","J'ai mal le dos.","J'ai dos mal.","Mon dos a mal."], correct:"J'ai mal au dos.", explanation:"Au = à + le (masculine). Le dos = the back. J'ai mal au dos."},
    {q:"'I have a sore throat' in French:", options:["J'ai mal à la gorge.","J'ai mal la gorge.","Ma gorge est mal.","J'ai la gorge."], correct:"J'ai mal à la gorge.", explanation:"À la gorge — la gorge is feminine, so 'à la'. The throat."},
    {q:"'I have toothache' in French:", options:["J'ai mal aux dents.","J'ai mal les dents.","Mes dents ont mal.","J'ai les dents mal."], correct:"J'ai mal aux dents.", explanation:"Aux = à + les (plural). Les dents = teeth. J'ai mal aux dents."},
    {q:"'I would like to make an appointment' in French:", options:["Je voudrais prendre rendez-vous.","Je dois faire rendez-vous.","Je veux rendez-vous.","Prenez rendez-vous."], correct:"Je voudrais prendre rendez-vous.", explanation:"Prendre rendez-vous (*pron-druh ron-day-VOO*) = make an appointment. Je voudrais = I would like."},
    {q:"'The emergency room' in French:", options:["Les urgences","Les urgents","L'urgence","Le service urgent"], correct:"Les urgences", explanation:"Les urgences (*lay zure-ZHONS*) = A&E / emergency room. Always plural in French."},
    {q:"'I've been ill for 3 days' in French:", options:["Je suis malade depuis trois jours.","J'ai malade trois jours.","Je suis malade pour trois jours.","Depuis je suis malade trois jours."], correct:"Je suis malade depuis trois jours.", explanation:"Depuis (*duh-PWEE*) = since / for (ongoing). Je suis malade = I am ill."},
    {q:"'I take medication' in French:", options:["Je prends un médicament.","J'ai un médicament.","Je suis médicament.","Je fais médicament."], correct:"Je prends un médicament.", explanation:"Prendre (*PRON-druh*) = to take. Je prends = I take."},
    {q:"'I am feeling ill' in French:", options:["Je suis malade.","J'ai malade.","Je fais malade.","Je me suis malade."], correct:"Je suis malade.", explanation:"Je suis malade (*zhuh swee ma-LAD*) = I am ill/sick. Être for states."},
    {q:"Which is correct: 'My back hurts'?", options:["J'ai mal au dos.","J'ai mal le dos.","Mon dos a mal.","Je suis mal au dos."], correct:"J'ai mal au dos.", explanation:"J'ai mal au dos — the only correct form. Au = à + le."}
  ],
  libre:[
    {q:"Translate: 'I have a headache.'", answer:"J'ai mal à la tête.", explanation:"À la tête — la tête is feminine."},
    {q:"Translate: 'I have back pain.'", answer:"J'ai mal au dos.", explanation:"Au dos — au = à + le (masculine)."},
    {q:"How do you say 'I have toothache'?", answer:"J'ai mal aux dents.", explanation:"Aux dents — aux = à + les (plural)."},
    {q:"Complete: 'J'ai mal ___ gorge.'", answer:"à la", explanation:"La gorge (feminine) → à la gorge."},
    {q:"Translate: 'I would like to make an appointment for tomorrow.'", answer:"Je voudrais prendre rendez-vous pour demain.", explanation:"Pour demain = for tomorrow."},
    {q:"How do you say 'I am ill'?", answer:"Je suis malade.", explanation:"Être + malade. Je suis malade."},
    {q:"Translate: 'I've had a headache for two days.'", answer:"J'ai mal à la tête depuis deux jours.", explanation:"Depuis = for (ongoing). Deux jours = two days."},
    {q:"What is 'les urgences'?", answer:"the emergency room", alternatives:["A&E","emergency room"], explanation:"Les urgences = A&E / ER. Always plural in French."},
    {q:"Complete: 'Je ___ un médicament contre la douleur.'", answer:"prends", explanation:"Prendre = to take. Je prends = I take."},
    {q:"Translate: 'I have a stomach ache.'", answer:"J'ai mal au ventre.", explanation:"Le ventre = stomach/belly. Au ventre — masculine."}
  ]
},

19: {
  title:"My Cooking 🍳",
  objective:"Follow a French recipe, talk about cooking techniques",
  hint:"French cooking uses lots of specific verbs — learn them for recipe conversations!",
  qcm:[
    {q:"'To cut / chop' in French:", options:["Couper","Mélanger","Ajouter","Remuer"], correct:"Couper", explanation:"Couper (*koo-PAY*) = to cut, chop. Je coupe les légumes = I chop the vegetables."},
    {q:"'To mix' in French:", options:["Mélanger","Couper","Ajouter","Faire chauffer"], correct:"Mélanger", explanation:"Mélanger (*may-lan-ZHAY*) = to mix. Mélangez bien = mix well."},
    {q:"'To heat up' in French:", options:["Faire chauffer","Mélanger","Ajouter","Remuer"], correct:"Faire chauffer", explanation:"Faire chauffer (*fair sho-FAY*) = to heat up. Faites chauffer l'huile = heat up the oil."},
    {q:"'To add' in French:", options:["Ajouter","Couper","Servir","Goûter"], correct:"Ajouter", explanation:"Ajouter (*a-zhoo-TAY*) = to add. Ajoutez le sel = add the salt."},
    {q:"'To taste' in French:", options:["Goûter","Ajouter","Remuer","Servir"], correct:"Goûter", explanation:"Goûter (*goo-TAY*) = to taste. Goûtez et ajustez l'assaisonnement = taste and adjust the seasoning."},
    {q:"'To serve' in French:", options:["Servir","Couper","Remuer","Préparer"], correct:"Servir", explanation:"Servir (*sair-VEER*) = to serve. Servez chaud = serve hot."},
    {q:"'A recipe' in French:", options:["Une recette","Un recette","Une recipe","Un recit"], correct:"Une recette", explanation:"Une recette (*ruh-SET*) = a recipe. Les recettes = the recipes."},
    {q:"'To stir' in French:", options:["Remuer","Couper","Ajouter","Faire cuire"], correct:"Remuer", explanation:"Remuer (*ruh-mue-AY*) = to stir. Remuez doucement = stir gently."},
    {q:"'I chop the vegetables' in French:", options:["Je coupe les légumes.","Je mélange les légumes.","Je prépare légumes.","Je coupes légumes."], correct:"Je coupe les légumes.", explanation:"Je coupe = I chop/cut. Les légumes = the vegetables."},
    {q:"'To let simmer' in French:", options:["Laisser mijoter","Faire chauffer","Faire bouillir","Faire cuire"], correct:"Laisser mijoter", explanation:"Laisser mijoter (*mee-zho-TAY*) = to let simmer. Laissez mijoter 20 minutes = let simmer 20 minutes."}
  ],
  libre:[
    {q:"Translate: 'I chop the onions.'", answer:"Je coupe les oignons.", explanation:"Couper = to chop/cut. Les oignons = onions."},
    {q:"How do you say 'I mix well'?", answer:"Je mélange bien.", explanation:"Mélanger = to mix. Bien = well."},
    {q:"Translate: 'Heat up the olive oil.'", answer:"Faites chauffer l'huile d'olive.", explanation:"Faire chauffer = to heat up. L'huile d'olive = olive oil."},
    {q:"Complete: 'J'___ du sel et du poivre.'", answer:"ajoute", explanation:"Ajouter = to add. J'ajoute = I add."},
    {q:"How do you say 'a recipe'?", answer:"une recette", explanation:"La recette = the recipe. Une recette = a recipe."},
    {q:"Translate: 'I stir gently.'", answer:"Je remue doucement.", explanation:"Remuer = to stir. Doucement = gently."},
    {q:"Complete: 'Je ___ les légumes avant de les cuire.'", answer:"coupe", explanation:"Couper = to cut/chop. Je coupe = I chop."},
    {q:"How do you say 'let simmer for 30 minutes'?", answer:"Laissez mijoter 30 minutes.", explanation:"Laisser mijoter = let simmer. Minutes = minutes (same word!)."},
    {q:"Translate: 'I taste and I add some salt.'", answer:"Je goûte et j'ajoute du sel.", explanation:"Goûter = to taste. Ajouter = to add. Du sel = some salt."},
    {q:"How do you say 'serve hot'?", answer:"Servez chaud.", explanation:"Servir = to serve. Chaud = hot. Classic recipe instruction!"}
  ]
},

20: {
  title:"Living French 🗣️",
  objective:"Understand and use everyday French expressions naturally",
  hint:"Pas terrible is a TRAP — it means NOT GREAT, not 'not terrible'!",
  qcm:[
    {q:"'Ça marche !' means:", options:["OK! / That works!","It walks!","Let's go!","No problem!"], correct:"OK! / That works!", explanation:"Ça marche (*sa MARSH*) = OK! / That works! Despite literally meaning 'it walks'!"},
    {q:"What does 'Bof...' express?", options:["Indifference / meh / so-so","Happiness","Surprise","Agreement"], correct:"Indifference / meh / so-so", explanation:"Bof = meh / so-so / not really. Used for mild disappointment or indifference."},
    {q:"'Nickel !' in spoken French means:", options:["Perfect! / Spotless!","A coin","Not great","It's OK"], correct:"Perfect! / Spotless!", explanation:"Nickel (*nee-KEL*) = perfect / spotless / brilliant! Very colloquial but very common."},
    {q:"WARNING: 'Pas terrible' really means:", options:["Not great / disappointing","Not terrible","Quite good","Rather good"], correct:"Not great / disappointing", explanation:"TRAP! Pas terrible = NOT great. It's the opposite of what English speakers assume!"},
    {q:"'En fait' translates as:", options:["Actually / in fact","In effect","The fact is","Indeed"], correct:"Actually / in fact", explanation:"En fait (*on FAY*) = actually / in fact. Used constantly in French speech."},
    {q:"'Du coup' means:", options:["So / therefore / as a result","From the start","All of a sudden","At once"], correct:"So / therefore / as a result", explanation:"Du coup (*due KOO*) = so / therefore. Hugely popular in modern French."},
    {q:"'Ça dépend.' means:", options:["It depends.","That's expensive.","It doesn't matter.","So much the better."], correct:"It depends.", explanation:"Ça dépend (*sa day-PON*) = It depends. A very French way to avoid committing!"},
    {q:"'Franchement' means:", options:["Frankly / honestly","In French","Freely","Actually"], correct:"Frankly / honestly", explanation:"Franchement (*fron-SHE-mon*) = frankly / honestly. Franchement, c'était pas terrible!"},
    {q:"'Quand même' is best translated as:", options:["Still / anyway / come on!","When even","Same time","Just the same"], correct:"Still / anyway / come on!", explanation:"Quand même (*kon MEM*) = still / anyway / even so. Very versatile French expression."},
    {q:"'Comme d'habitude' means:", options:["As usual","As a habit","Like always","Just in case"], correct:"As usual", explanation:"Comme d'habitude (*kom da-bee-TUDE*) = as usual. Il est en retard, comme d'habitude!"}
  ],
  libre:[
    {q:"How do French people say 'OK' informally?", answer:"Ça marche !", alternatives:["D'accord","OK"], explanation:"Ça marche is the most natural informal 'OK' in French."},
    {q:"How do you say 'actually' in French?", answer:"en fait", explanation:"En fait = actually / in fact. Used constantly in spoken French."},
    {q:"Translate: 'So I went to the market.'", answer:"Du coup je suis allé au marché.", explanation:"Du coup = so / therefore. Very natural in French conversation."},
    {q:"How do you say 'frankly'?", answer:"franchement", explanation:"Franchement = frankly / honestly. Franchement, c'est pas terrible!"},
    {q:"What does 'Bof' express?", answer:"indifference", alternatives:["meh","so-so","not really"], explanation:"Bof = mild indifference or disappointment. Very French!"},
    {q:"How do you say 'it depends'?", answer:"ça dépend", explanation:"Ça dépend — the quintessentially French non-answer!"},
    {q:"Translate: 'He's late, as usual.'", answer:"Il est en retard, comme d'habitude.", explanation:"Comme d'habitude = as usual. En retard = late."},
    {q:"What is the REAL meaning of 'pas terrible'?", answer:"not great", alternatives:["not good","disappointing","mediocre"], explanation:"TRAP: pas terrible = not great/good, NOT 'not terrible'!"},
    {q:"How do you say 'still / anyway'?", answer:"quand même", explanation:"Quand même — very versatile. C'est quand même sympa = it's still nice."},
    {q:"Translate: 'It works, perfect!'", answer:"Ça marche, nickel !", explanation:"Ça marche = it works / OK. Nickel = perfect."}
  ]
}

}; // END QUESTIONS_DB
