// ═══════════════════════════════════════════════════════════════════
// AUDIO-DATA.JS — Daily French 🥖
// Phrases pour le jeu Listen & Repeat
// ═══════════════════════════════════════════════════════════════════
const AUDIO_PHRASES = {
  1:[
    {fr:"Bonjour !",phon:"*bon-ZHOOR*",en:"Hello!",cat:"👋 Greeting",tip:"The 'r' is soft — not like English. Try it at the back of your throat."},
    {fr:"Comment allez-vous ?",phon:"*ko-mahn-ta-lay-VOO*",en:"How are you?",cat:"👋 Greeting",tip:"Listen for the liaison: 'allez-vous' connects to 'co-mahn-ta-lay-VOO'."},
    {fr:"Je suis fatigué.",phon:"*zhuh swee fa-tee-GAY*",en:"I am tired.",cat:"❤️ Emotion",tip:"The 'je' is very short — almost 'zh'. The final -é sounds like 'ay'."},
    {fr:"La rue est rouge.",phon:"*la RUE eh ROOZH*",en:"The street is red.",cat:"🔊 R sound",tip:"This is for practising the French R — guttural, from the back of your throat."},
    {fr:"Les amis arrivent.",phon:"*lay-za-mee za-REEV*",en:"The friends are arriving.",cat:"🔗 Liaison",tip:"Liaison: 'les amis' → 'lay-za-mee'. The S sounds like Z before a vowel."}
  ],
  2:[
    {fr:"Le pain est bon.",phon:"*luh PAN eh bon*",en:"The bread is good.",cat:"👃 Nasal",tip:"'Pain' rhymes with the English 'pan' — the N is swallowed into the nose, not spoken."},
    {fr:"Tu es sur la lune.",phon:"*tue eur la LUNE*",en:"You are on the moon.",cat:"👄 French U",tip:"French 'u' (lune, rue, tu): round your lips as if to say 'oo' but say 'ee'."},
    {fr:"Il est arrivé.",phon:"*eel-ay-ta-ree-VAY*",en:"He has arrived.",cat:"🔗 Flow",tip:"No pause between words: 'il-est-arrivé' flows as one breath."},
    {fr:"J'ai faim.",phon:"*zhay FAN*",en:"I am hungry.",cat:"🍽️ Daily life",tip:"'Faim' — the 'm' is not pronounced. The vowel is nasal: 'FAN' without the N sound."},
    {fr:"S'il vous plaît.",phon:"*seel voo PLAY*",en:"Please.",cat:"🎩 Politeness",tip:"'Plaît' — the T is silent. This is French's most essential polite phrase!"}
  ],
  3:[
    {fr:"Je voudrais un café.",phon:"*zhuh voo-DRAY an ka-FAY*",en:"I would like a coffee.",cat:"☕ At the café",tip:"'Voudrais' = would like. Much more polite than 'je veux'. Use this in every shop!"},
    {fr:"C'est combien ?",phon:"*say kom-BYAN*",en:"How much is it?",cat:"🛒 Shopping",tip:"'Combien' — the N is nasal. 'Byan' not 'bee-en'."},
    {fr:"Je ne comprends pas.",phon:"*zhuh nuh kom-PRON PAH*",en:"I don't understand.",cat:"💬 Essential",tip:"In fast speech: 'chuh comprends pas'. The 'ne' often disappears in spoken French!"},
    {fr:"Où est la pharmacie ?",phon:"*oo ay la far-ma-SEE*",en:"Where is the pharmacy?",cat:"🏥 Practical",tip:"'Où' = where. Short and clear. The liaison: 'est' sounds like 'ay'."},
    {fr:"Merci beaucoup !",phon:"*mair-see boh-KOO*",en:"Thank you very much!",cat:"🎩 Politeness",tip:"'Beaucoup' — 'eau' sounds like 'oh'. Always use this rather than just 'merci'."}
  ],
  4:[
    {fr:"Il fait beau aujourd'hui.",phon:"*eel fay BOH oh-zhoor-DWEE*",en:"The weather is nice today.",cat:"🌤️ Weather",tip:"'Aujourd'hui' is tricky — say it as one word: oh-zhoor-DWEE."},
    {fr:"Je dois aller à la mairie.",phon:"*zhuh dwah a-lay a la may-REE*",en:"I need to go to the town hall.",cat:"🏛️ Admin",tip:"'Dois' = must. Then aller (to go) + location. Very useful pattern!"},
    {fr:"Pouvez-vous répéter ?",phon:"*poo-vay-VOO ray-pay-TAY*",en:"Can you repeat?",cat:"💬 Essential",tip:"Learn this one! Say it confidently when you don't catch something."},
    {fr:"J'ai besoin d'aide.",phon:"*zhay buh-ZWAN daid*",en:"I need help.",cat:"🆘 Essential",tip:"'Besoin de' = need. D'aide = of help (elision: de + aide = d'aide)."},
    {fr:"Bonne journée !",phon:"*bun zhoor-NAY*",en:"Have a good day!",cat:"👋 Farewell",tip:"Say this when leaving a shop or ending a conversation. Very appreciated!"}
  ],
  5:[
    {fr:"Je m'appelle Sophie.",phon:"*zhuh ma-PELL so-FEE*",en:"My name is Sophie.",cat:"🙋 Intro",tip:"'Je m'appelle' — I call myself. The M is linked to appelle."},
    {fr:"J'habite en France depuis deux ans.",phon:"*zha-beet on FRONS duh-PWEE duh ZON*",en:"I have lived in France for two years.",cat:"🏡 Life",tip:"'Depuis' = since / for (ongoing). Key word for talking about how long you've been here!"},
    {fr:"Ça marche, nickel !",phon:"*sa MARSH, nee-KEL*",en:"Perfect, great!",cat:"🗣️ Colloquial",tip:"'Ça marche' = OK / that works. 'Nickel' = perfect. Pure French slang!"},
    {fr:"Du coup, je suis arrivé en retard.",phon:"*due KOO, zhuh swee za-ree-VAY on ruh-TAR*",en:"So I arrived late.",cat:"🗣️ Colloquial",tip:"'Du coup' = so / as a result. Used constantly in French conversation."},
    {fr:"Excusez-moi, je ne comprends pas très bien le français.",phon:"*ex-kue-ZAY mwah...*",en:"Excuse me, I don't understand French very well.",cat:"💬 Essential",tip:"This is your magic sentence! Say it with confidence and French people will slow down."}
  ]
};
