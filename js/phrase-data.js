// ═══════════════════════════════════════════════════════════════════
// PHRASE-DATA.JS — Daily French 🥖
// Données pour le jeu Phrase Builder
// ═══════════════════════════════════════════════════════════════════
const PHRASE_BLOCKS = {
  1:{title:"Je suis / J'ai",
    sujets:["Je","Tu","Il","Elle","Nous","Vous","Ils","Elles"],
    verbes:["suis","es","est","sommes","êtes","sont","ai","as","a","avons","avez","ont"],
    complements:["fatigué","fatiguée","content","contente","triste","faim","soif","froid","chaud","60 ans","de Paris","un chien","un chat","de la chance"],
    missions:[
      {target:"Je suis fatigué",hint:"🧍 état",en:"I am tired"},
      {target:"J'ai faim",hint:"👜 ressenti",en:"I am hungry"},
      {target:"Tu es de Paris",hint:"origine = être",en:"You are from Paris"},
      {target:"Il a un chat",hint:"possession = avoir",en:"He has a cat"},
      {target:"Nous sommes contents",hint:"pluriel + état",en:"We are happy"}
    ]},
  2:{title:"Je vais / Je fais",
    sujets:["Je","Tu","Il","Elle","Nous","Vous"],
    verbes:["vais","vas","va","allons","allez","vont","fais","fais","fait","faisons","faites","font","prends","prend","prenons"],
    complements:["à Paris","au marché","au café","du sport","la cuisine","le ménage","les courses","du jardinage","un café","une promenade","la vaisselle","le lit"],
    missions:[
      {target:"Je vais au marché",hint:"🦶 direction",en:"I go to the market"},
      {target:"Tu fais du sport",hint:"👐 action",en:"You do sport"},
      {target:"Il va à Paris",hint:"🚶 mouvement",en:"He goes to Paris"},
      {target:"Nous faisons la cuisine",hint:"👐 activité",en:"We cook"},
      {target:"Je prends un café",hint:"🫳 consommation",en:"I have a coffee"}
    ]},
  3:{title:"Je veux / Je peux / Je dois",
    sujets:["Je","Tu","Il","Elle","Nous","Vous"],
    verbes:["veux","veut","voulons","voulez","peux","peut","pouvons","pouvez","dois","doit","devons","devez"],
    complements:["partir","rester","manger","dormir","aider","comprendre","répéter","appeler","sortir","rentrer","travailler","me reposer"],
    missions:[
      {target:"Je veux partir",hint:"désir",en:"I want to leave"},
      {target:"Tu dois appeler",hint:"obligation",en:"You must call"},
      {target:"Il peut rester",hint:"capacité",en:"He can stay"},
      {target:"Nous voulons comprendre",hint:"désir pluriel",en:"We want to understand"},
      {target:"Je dois me reposer",hint:"obligation",en:"I need to rest"}
    ]},
  4:{title:"Passé composé — J'ai fait",
    sujets:["Je","Tu","Il","Elle","Nous","Vous"],
    verbes:["ai nettoyé","ai rangé","ai préparé","ai arrosé","ai fait","ai mangé","ai appelé","ai travaillé","suis allé","suis venue","avons fini"],
    complements:["la maison","le jardin","le dîner","les courses","la vaisselle","le lit","mon médecin","ce matin","hier","ce soir"],
    missions:[
      {target:"J'ai nettoyé la maison",hint:"passé composé",en:"I cleaned the house"},
      {target:"Tu as rangé le jardin",hint:"avoir + participe",en:"You tidied the garden"},
      {target:"Il a préparé le dîner",hint:"passé",en:"He prepared dinner"},
      {target:"Nous avons fait les courses",hint:"faire → fait",en:"We did the shopping"},
      {target:"Je suis allé au marché",hint:"aller → être",en:"I went to the market"}
    ]},
  5:{title:"Futur proche — Je vais...",
    sujets:["Je","Tu","Il","Elle","Nous","Vous"],
    verbes:["vais","vas","va","allons","allez","vont"],
    complements:["cuisiner","nettoyer","appeler","partir","rentrer","travailler","sortir","me reposer","faire les courses","aller au marché","prendre rendez-vous"],
    missions:[
      {target:"Je vais cuisiner",hint:"futur proche",en:"I'm going to cook"},
      {target:"Elle va partir",hint:"aller + infinitif",en:"She's going to leave"},
      {target:"Nous allons nettoyer",hint:"pluriel futur",en:"We're going to clean"},
      {target:"Tu vas appeler",hint:"action future",en:"You're going to call"},
      {target:"Il va prendre rendez-vous",hint:"planification",en:"He's going to make an appointment"}
    ]}
};
