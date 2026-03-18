// ── STATE ─────────────────────────────────────────────
let state = {
  cash: 10000,
  positions: {},
  trades: [],
  currentLesson: null,
  chapitresValides: [], // indices des chapitres validés (base 1)
};

// ── NIVEAUX ───────────────────────────────────────────
const NIVEAUX = [
  { nom: 'Rookie',           icon: '🌱', requis: 0,  desc: 'Tu poses les premières pierres de ta culture financière.' },
  { nom: 'Apprenti',         icon: '📖', requis: 3,  desc: 'Tu maîtrises les bases des marchés et commences à lire les graphiques.' },
  { nom: 'Analyste',         icon: '📊', requis: 6,  desc: 'Tu sais analyser un actif avec les outils de l\'analyse technique.' },
  { nom: 'Trader',           icon: '⚡', requis: 8,  desc: 'Tu construis et appliques des stratégies de swing trading.' },
  { nom: 'Trader Confirmé',  icon: '🏆', requis: 10, desc: 'Tu maîtrises l\'ensemble du cursus et gères ton risque en professionnel.' },
];

const CHAPITRES = [
  { id: 1,  titre: 'Les marchés financiers & leurs acteurs',  module: 'M1 — Fondamentaux',           icon: '🏛️' },
  { id: 2,  titre: 'Bid/Ask, carnet d\'ordres, spreads',      module: 'M1 — Fondamentaux',           icon: '📋' },
  { id: 3,  titre: 'Introduction à l\'analyse technique',     module: 'M2 — Lire les marchés',       icon: '📈' },
  { id: 4,  titre: 'Chandeliers japonais',                    module: 'M2 — Lire les marchés',       icon: '🕯️' },
  { id: 5,  titre: 'Supports, résistances & tendances',       module: 'M2 — Lire les marchés',       icon: '📐' },
  { id: 6,  titre: 'Indicateurs : RSI, MACD, Bollinger',      module: 'M2 — Lire les marchés',       icon: '🔬' },
  { id: 7,  titre: 'Position sizing & ratio R/R',             module: 'M3 — Stratégies & Risk',      icon: '⚖️' },
  { id: 8,  titre: 'Stop-loss, take-profit & gestion du trade', module: 'M3 — Stratégies & Risk',   icon: '🛡️' },
  { id: 9,  titre: 'Stratégies de swing trading',             module: 'M3 — Stratégies & Risk',      icon: '🎯' },
  { id: 10, titre: 'Psychologie du trader',                   module: 'M3 — Stratégies & Risk',      icon: '🧠' },
  { id: 11, titre: 'Options & Futures',                       module: 'M4 — Produits dérivés 🔒',    icon: '🔮', verrou: 4 },
  { id: 12, titre: 'CFD & produits structurés',               module: 'M4 — Produits dérivés 🔒',    icon: '🏗️', verrou: 4 },
];

function getNiveauActuel() {
  const n = state.chapitresValides.length;
  let niveauIdx = 0;
  for (let i = NIVEAUX.length - 1; i >= 0; i--) {
    if (n >= NIVEAUX[i].requis) { niveauIdx = i; break; }
  }
  return niveauIdx;
}

function updateNiveauUI() {
  const idx = getNiveauActuel();
  const niveau = NIVEAUX[idx];
  const n = state.chapitresValides.length;
  const total = 10; // chapitres hors dérivés

  // Sidebar
  const pct = Math.min(100, Math.round((n / total) * 100));
  document.getElementById('xp-fill').style.width = pct + '%';
  document.getElementById('xp-display').textContent = n + ' / ' + total + ' chapitres';
  document.getElementById('level-name').textContent = niveau.nom;

  // Topbar
  document.getElementById('top-level').textContent = niveau.nom;
  document.getElementById('top-xp').textContent = n + ' / ' + total + ' ch.';

  // Dashboard
  const dashNiveau = document.getElementById('dash-niveau');
  if (dashNiveau) {
    dashNiveau.textContent = niveau.icon + ' ' + niveau.nom;
    document.getElementById('dash-niveau-sub').textContent = n + ' chapitre' + (n > 1 ? 's' : '') + ' validé' + (n > 1 ? 's' : '');
    document.getElementById('dash-chapitres').textContent = n;
  }

  // Dashboard — aperçu prochains chapitres
  const apercu = document.getElementById('dash-chapitres-apercu');
  if (apercu) {
    const prochains = CHAPITRES.filter(ch => !state.chapitresValides.includes(ch.id) && !ch.verrou).slice(0, 3);
    apercu.innerHTML = `<div class="lesson-list">${prochains.map(ch => {
      const contenu = CONTENU_CHAPITRES[ch.id];
      const accessible = ch.id === 1 || state.chapitresValides.includes(ch.id - 1);
      const onclick = accessible && contenu ? `onclick="showPage('cours');ouvrirChapitre(${ch.id})"` : '';
      return `<div class="lesson-item ${accessible && contenu ? 'clickable' : ''}" ${onclick}>
        <span class="lesson-num">${String(ch.id).padStart(2,'0')}</span>
        <div class="lesson-info"><div class="lesson-title">${ch.icon} ${ch.titre}</div><div class="lesson-meta">${ch.module}</div></div>
        <span class="lesson-status ${accessible && contenu ? 'status-todo' : 'status-lock'}">${accessible && contenu ? 'Commencer →' : '🔒'}</span>
      </div>`;
    }).join('')}</div>`;
  }

  // Hero card page Niveaux
  const heroIcon = document.getElementById('niveau-hero-icon');
  const heroName = document.getElementById('niveau-hero-name');
  const heroSub  = document.getElementById('niveau-hero-sub');
  const heroVal  = document.getElementById('niveau-chapitres-val');
  const heroNext = document.getElementById('niveau-hero-next');
  const nextName = document.getElementById('niveau-next-name');
  const nextRem  = document.getElementById('niveau-next-remaining');
  if (!heroIcon) return;

  heroIcon.textContent = niveau.icon;
  heroName.textContent = niveau.nom;
  heroSub.textContent  = niveau.desc;
  heroVal.textContent  = n;

  if (idx < NIVEAUX.length - 1) {
    const next = NIVEAUX[idx + 1];
    const manquants = next.requis - n;
    nextName.textContent = next.nom;
    nextRem.textContent  = '— encore ' + manquants + ' chapitre' + (manquants > 1 ? 's' : '');
    heroNext.style.display = 'flex';
  } else {
    heroNext.style.display = 'none';
  }
}

function renderNiveauTrack() {
  const track = document.getElementById('niveau-track');
  if (!track) return;
  const idx = getNiveauActuel();

  track.innerHTML = NIVEAUX.map((nv, i) => {
    const done    = i < idx;
    const current = i === idx;
    const locked  = i > idx;
    const cls = done ? 'done' : current ? 'current' : 'locked';
    const chapReqText = nv.requis === 0 ? 'Point de départ' : nv.requis + ' chapitres requis';
    return `
      <div class="niveau-card ${cls}">
        <div class="niveau-card-icon">${nv.icon}</div>
        <div class="niveau-card-body">
          <div class="niveau-card-name">${nv.nom}</div>
          <div class="niveau-card-req">${chapReqText}</div>
          <div class="niveau-card-desc">${nv.desc}</div>
        </div>
        <div class="niveau-card-status">
          ${done    ? '<span class="nv-badge nv-done">✓ Atteint</span>'    : ''}
          ${current ? '<span class="nv-badge nv-current">● En cours</span>' : ''}
          ${locked  ? '<span class="nv-badge nv-locked">🔒</span>'          : ''}
        </div>
      </div>`;
  }).join('');
}

function renderChapitresGrid() {
  const grid = document.getElementById('chapitres-grid');
  if (!grid) return;
  const niveauIdx = getNiveauActuel();

  grid.innerHTML = CHAPITRES.map(ch => {
    const valide = state.chapitresValides.includes(ch.id);
    const verrou = ch.verrou && niveauIdx < ch.verrou - 1;
    const cls = verrou ? 'chapitre-locked' : valide ? 'chapitre-done' : 'chapitre-todo';
    return `
      <div class="chapitre-item ${cls}">
        <div class="chapitre-icon">${ch.icon}</div>
        <div class="chapitre-body">
          <div class="chapitre-module">${ch.module}</div>
          <div class="chapitre-titre">${ch.titre}</div>
        </div>
        <div class="chapitre-etat">
          ${valide ? '<span class="ch-badge ch-done">✓ Validé</span>'    : ''}
          ${!valide && !verrou ? '<span class="ch-badge ch-todo">À faire</span>' : ''}
          ${verrou  ? '<span class="ch-badge ch-lock">🔒 Niveau 4</span>' : ''}
        </div>
      </div>`;
  }).join('');
}

// ── NAVIGATION ────────────────────────────────────────
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  const titles = {
    dashboard: 'Tableau de bord',
    cours: 'Cours & Leçons',
    quiz: 'Quiz interactif',
    simulator: 'Simulateur de Trading',
    niveaux: 'Niveaux',
  };
  document.getElementById('page-title').textContent = titles[name] || name;
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.getAttribute('onclick') && item.getAttribute('onclick').includes(name)) {
      item.classList.add('active');
    }
  });
  if (name === 'quiz') startQuiz();
  if (name === 'simulator') initSimulator();
  if (name === 'niveaux') { renderNiveauTrack(); renderChapitresGrid(); }
  if (name === 'cours') { showCoursView('list'); renderChapitresList(); }
}

// ── VALIDER UN CHAPITRE ───────────────────────────────
function validerChapitre(id, titreCourt) {
  if (state.chapitresValides.includes(id)) return;
  const niveauAvant = getNiveauActuel();
  state.chapitresValides.push(id);
  updateNiveauUI();
  const niveauApres = getNiveauActuel();
  if (niveauApres > niveauAvant) {
    showToast('🏆', 'Niveau atteint !', NIVEAUX[niveauApres].nom);
  } else {
    showToast('✓', 'Chapitre validé', titreCourt);
  }
}

// ── TOAST ─────────────────────────────────────────────
function showToast(icon, title, sub) {
  const t = document.getElementById('toast');
  document.getElementById('toast-icon').textContent = icon;
  document.getElementById('toast-title').textContent = title;
  document.getElementById('toast-sub').textContent = sub;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── CONTENU DES CHAPITRES ─────────────────────────────
const CONTENU_CHAPITRES = {
  1: {
    titre: 'Les marchés financiers & leurs acteurs',
    module: 'Module 1 — Fondamentaux · ~15 min',
    sections: [
      'Les grandes familles de marchés',
      'Les acteurs : qui achète et qui vend ?',
      'Comment s\'organise un marché ?',
      'Le rôle des bourses et brokers',
    ],
    cours: `
      <h1>Les marchés financiers & leurs acteurs</h1>
      <div class="lesson-sub">Module 1 — Fondamentaux · 15 min de lecture</div>

      <h2>Les grandes familles de marchés</h2>
      <p>Un <strong>marché financier</strong> est un lieu — physique ou électronique — où des acheteurs et des vendeurs échangent des actifs financiers. Il en existe quatre grandes familles, chacune avec ses propres instruments et ses propres dynamiques.</p>
      <p><strong>Le marché actions</strong> permet d'acheter des parts de propriété dans des entreprises cotées. Quand tu achètes une action Apple, tu deviens actionnaire d'Apple — tu participes à sa croissance (ou à ses pertes).</p>
      <p><strong>Le marché obligataire</strong> est le marché de la dette. Les États et les entreprises y empruntent de l'argent en émettant des obligations. C'est le marché le plus grand au monde en volume, mais le moins visible pour le grand public.</p>
      <p><strong>Le marché des changes (Forex)</strong> est l'endroit où les devises s'échangent — euro contre dollar, dollar contre yen... Avec plus de 7 000 milliards de dollars échangés chaque jour, c'est le marché le plus liquide de la planète.</p>
      <p><strong>Le marché des matières premières</strong> regroupe l'or, le pétrole, le blé, le cuivre... Ces actifs physiques sont traités via des contrats standardisés appelés <span class="term">futures</span>.</p>
      <div class="highlight-box">💡 <strong>Pourquoi plusieurs marchés ?</strong> Chaque classe d'actif répond à un besoin différent : financer une entreprise (actions), emprunter à long terme (obligations), couvrir un risque de change (forex), sécuriser un approvisionnement (matières premières). En tant que swing trader, tu te concentreras principalement sur les actions et, plus tard, le forex.</div>

      <h2>Les acteurs : qui achète et qui vend ?</h2>
      <p>Un marché ne fonctionne que parce que différents types d'acteurs y participent, avec des objectifs souvent opposés — ce qui crée le flux d'échanges.</p>
      <p><strong>Les investisseurs particuliers</strong> (retail traders) — c'est toi et moi. Nous représentons une part minoritaire des volumes, mais notre influence collective est croissante, comme le montre l'épisode GameStop de 2021.</p>
      <p><strong>Les investisseurs institutionnels</strong> — fonds de pension, compagnies d'assurance, fonds souverains. Ils gèrent des milliards et pensent à long terme (5-20 ans). Leur force de frappe est telle qu'ils peuvent faire bouger les prix à eux seuls.</p>
      <p><strong>Les hedge funds</strong> — fonds spéculatifs qui cherchent à générer des rendements absolus dans toutes les conditions de marché. Certains utilisent des algorithmes ultra-rapides (<span class="term">HFT</span> — High Frequency Trading).</p>
      <p><strong>Les banques d'investissement</strong> jouent plusieurs rôles : elles placent des titres pour leurs clients, font du <span class="term">market making</span> (elles achètent ET vendent pour assurer la liquidité), et tradent pour leur propre compte.</p>
      <p><strong>Les banques centrales</strong> (BCE, Fed, Banque du Japon...) sont les acteurs les plus puissants. Leur politique monétaire — taux directeurs, rachats d'actifs — influence l'ensemble des marchés mondiaux.</p>
      <div class="highlight-box">⚠️ <strong>Comprendre les acteurs, c'est comprendre le marché.</strong> Quand une grande institution achète massivement une action, le prix monte — pas parce que l'entreprise vaut soudainement plus, mais parce que la demande excède l'offre. L'analyse technique capte précisément ces déséquilibres dans le graphique.</div>

      <h2>Comment s'organise un marché ?</h2>
      <p>La plupart des marchés modernes fonctionnent via un système de <span class="term">carnet d'ordres</span> (order book). Le principe est simple : d'un côté les acheteurs affichent leur prix maximum (<span class="term">Bid</span>), de l'autre les vendeurs affichent leur prix minimum (<span class="term">Ask</span>). Une transaction se produit quand un Bid rejoint un Ask.</p>
      <div class="formula">Bid  = prix maximum qu'un acheteur accepte de payer
Ask  = prix minimum qu'un vendeur accepte de recevoir
Spread = Ask − Bid  →  coût implicite de chaque transaction</div>
      <p>Plus un marché est <strong>liquide</strong> (beaucoup de participants, beaucoup de volume), plus le spread est faible et plus il est facile d'entrer ou sortir d'une position sans impact sur le prix.</p>

      <h2>Le rôle des bourses et brokers</h2>
      <p>Une <strong>bourse</strong> (NYSE, Euronext, NASDAQ...) est l'infrastructure qui centralise les échanges, garantit leur exécution et publie les prix en temps réel. Elle assure la transparence et l'égalité d'accès à l'information.</p>
      <p>Un <strong>broker</strong> (courtier) est l'intermédiaire entre toi et la bourse. Il transmet tes ordres, tient ton compte, et se rémunère via des commissions ou le spread. Il est crucial de choisir un broker régulé — en France, vérifier l'agrément <span class="term">AMF</span> (Autorité des Marchés Financiers).</p>
      <div class="highlight-box">💡 <strong>Conseil terrain :</strong> Pour débuter en swing trading, les ETF sur indices (CAC 40, S&P 500) sont idéaux. Ils sont très liquides, peu coûteux, et te permettent de pratiquer sans le risque spécifique d'une entreprise individuelle.</div>
    `,
    qcm: [
      {
        q: "Quel est le marché financier le plus liquide au monde en termes de volume quotidien ?",
        opts: ["Le marché actions (NYSE + NASDAQ)", "Le marché obligataire", "Le marché des changes (Forex)", "Le marché des matières premières"],
        correct: 2,
        expl: "Le Forex échange plus de 7 000 milliards de dollars par jour, ce qui en fait de très loin le marché le plus liquide au monde. Cette liquidité extrême permet d'entrer et sortir de positions à n'importe quelle heure, avec des spreads très faibles."
      },
      {
        q: "Qu'est-ce que le 'spread' sur un marché financier ?",
        opts: ["Le rendement annuel d'une obligation", "La différence entre le prix Bid (achat) et le prix Ask (vente)", "La commission fixe prélevée par le broker", "La volatilité historique d'un actif sur 20 jours"],
        correct: 1,
        expl: "Le spread est la différence entre le prix auquel un vendeur accepte de vendre (Ask) et le prix qu'un acheteur est prêt à payer (Bid). C'est un coût implicite à chaque transaction — même sans commission visible, tu 'paies' le spread à l'entrée de chaque trade."
      },
      {
        q: "Quel acteur financier a le plus d'influence sur les marchés mondiaux ?",
        opts: ["Les hedge funds spéculatifs", "Les investisseurs particuliers (retail)", "Les banques centrales (BCE, Fed...)", "Les fonds de pension"],
        correct: 2,
        expl: "Les banques centrales sont les acteurs les plus puissants car elles contrôlent les taux directeurs et peuvent créer ou détruire de la monnaie. Une décision de la Fed sur ses taux peut faire bouger tous les marchés mondiaux simultanément en quelques secondes."
      },
      {
        q: "Quand tu achètes une action d'une entreprise cotée, tu deviens…",
        opts: ["Créancier de l'entreprise (elle te doit de l'argent)", "Actionnaire, donc copropriétaire de l'entreprise", "Client prioritaire de l'entreprise", "Partenaire commercial de l'entreprise"],
        correct: 1,
        expl: "Une action représente une part de propriété dans une entreprise. En achetant des actions Apple, tu deviens actionnaire d'Apple — tu participes à sa croissance via la hausse du cours et les dividendes éventuels, mais aussi à ses pertes si l'entreprise va mal."
      },
      {
        q: "Quel organisme réglemente les marchés financiers en France ?",
        opts: ["La Banque de France", "L'AMF (Autorité des Marchés Financiers)", "Le Ministère de l'Économie", "La BCE (Banque Centrale Européenne)"],
        correct: 1,
        expl: "L'AMF est le régulateur des marchés financiers français. Elle agrée les brokers, surveille les marchés, protège les investisseurs et sanctionne les abus de marché. Avant d'ouvrir un compte chez un broker, vérifier toujours qu'il figure sur la liste blanche de l'AMF."
      },
    ],
    exercice: {
      type: 'qcm_analyse',
      titre: 'Exercice — Identifier les acteurs et les marchés',
      consigne: 'Pour chaque situation décrite, identifie le type d\'acteur et/ou le marché concerné. Tu peux consulter le cours à tout moment via le bouton ci-dessus.',
      questions: [
        {
          q: "La BCE annonce qu'elle baisse ses taux directeurs de 0,25%. Sur quel(s) marché(s) cela aura-t-il un impact direct et immédiat ?",
          opts: [
            "Uniquement sur le marché obligataire européen",
            "Sur tous les marchés : actions, obligations, forex et matières premières",
            "Uniquement sur le marché actions de la zone euro",
            "Uniquement sur le marché des changes EUR/USD"
          ],
          correct: 1,
          expl: "Une décision de taux d'une banque centrale a un impact systémique sur tous les marchés : les obligations montent (taux bas = prix obligataires hauts), les actions réagissent (argent moins cher → croissance des entreprises), l'euro se déprécie par rapport aux autres devises, et les matières premières libellées en euros deviennent plus chères."
        },
        {
          q: "Un fonds de pension gère les retraites de 2 millions de fonctionnaires. Quelle est sa principale contrainte d'investissement ?",
          opts: [
            "Maximiser les gains à court terme pour battre le marché",
            "Investir uniquement dans les cryptomonnaies à fort potentiel",
            "Sécuriser le capital sur le long terme pour honorer les futures retraites",
            "Spéculer sur les devises exotiques pour maximiser le rendement"
          ],
          correct: 2,
          expl: "Un fonds de pension a des engagements à très long terme (payer des retraites dans 20-30 ans). Il privilégie donc la sécurité et la stabilité — obligations d'État, grandes capitalisations boursières, immobilier. Cette contrainte explique pourquoi ces acteurs sont des 'mains fortes' qui ne paniqueront pas lors d'une correction temporaire."
        },
        {
          q: "Tu veux acheter 100 actions d'un ETF sur le CAC 40. Le Bid est à 52,40€ et l'Ask à 52,45€. Quel sera ton coût total de transaction (hors commission broker) ?",
          opts: [
            "5 240 € — tu achètes au prix Bid",
            "5 245 € — tu achètes au prix Ask, le spread de 5€ est ton coût d'entrée",
            "5 242,50 € — tu achètes au prix médian",
            "5 240 € + 0,05€ de spread = 5 240,05 €"
          ],
          correct: 1,
          expl: "En achetant, tu es 'preneur de liquidité' : tu achètes au prix Ask (52,45€ × 100 = 5 245€). Le Bid (52,40€) est le prix auquel tu pourrais vendre immédiatement. Le spread de 0,05€ × 100 = 5€ est ton coût implicite d'entrée — si tu revendais aussitôt, tu perdrais ces 5€."
        },
      ],
    },
  },

  2: {
    titre: 'Bid/Ask, carnet d\'ordres & spreads',
    module: 'Module 1 — Fondamentaux · ~12 min',
    sections: ['Le prix Bid et le prix Ask', 'Le spread : coût invisible du trading', 'Le carnet d\'ordres (order book)', 'Types d\'ordres : Market, Limit, Stop'],
    cours: `
<h1>Bid/Ask, carnet d'ordres & spreads</h1>
<p class="module-tag">Module 1 — Fondamentaux</p>

<h2>1. Le prix Bid et le prix Ask</h2>
<p>Quand tu regardes un cours sur ton terminal, tu vois toujours <strong>deux prix</strong>, jamais un seul. C'est la réalité du marché :</p>
<ul>
  <li><strong>Bid</strong> (prix acheteur) : le prix maximum qu'un acheteur est prêt à payer. C'est le prix auquel <em>tu vends</em>.</li>
  <li><strong>Ask</strong> (prix vendeur) : le prix minimum auquel un vendeur accepte de céder. C'est le prix auquel <em>tu achètes</em>.</li>
</ul>
<div class="highlight-box">
  💡 Moyen mnémotechnique : le marché "demande" (Ask) toujours un peu plus cher qu'il n'offre. Si tu achètes et revends immédiatement, tu perds le spread — c'est le coût d'entrée/sortie implicite.
</div>

<h2>2. Le spread : coût invisible du trading</h2>
<p>Le <span class="term">spread</span> est la différence entre Ask et Bid. C'est la rémunération du teneur de marché (market maker) qui assure la liquidité.</p>
<div class="formula">Spread = Ask − Bid</div>
<p>Exemple : BNP Paribas cote Bid 52,40 € / Ask 52,45 €. Spread = 0,05 €.</p>
<p>Le spread varie selon :</p>
<ul>
  <li><strong>La liquidité</strong> : un titre très échangé (CAC 40, Apple…) aura un spread serré (quelques centimes). Un titre illiquide peut avoir un spread de plusieurs euros.</li>
  <li><strong>La volatilité</strong> : lors d'une publication de résultats ou d'une crise, le spread s'élargit — le teneur de marché se protège.</li>
  <li><strong>L'heure</strong> : à l'ouverture et la clôture, le spread est souvent plus large. En pleine séance, il est plus étroit.</li>
</ul>
<div class="highlight-box">
  🎯 <strong>Implication concrète :</strong> si tu scalpes (trades très courts), le spread te coûte énormément. En swing trading (positions de quelques jours), le spread est marginal face au mouvement visé.
</div>

<h2>3. Le carnet d'ordres (order book)</h2>
<p>Le <span class="term">carnet d'ordres</span> est la liste en temps réel de tous les ordres en attente d'exécution. Il est structuré en deux colonnes :</p>
<ul>
  <li><strong>Côté Bid (gauche)</strong> : les ordres d'achat triés du plus offrant au moins offrant.</li>
  <li><strong>Côté Ask (droite)</strong> : les ordres de vente triés du moins cher au plus cher.</li>
</ul>
<p>Le meilleur Bid et le meilleur Ask se font face au centre — c'est le <span class="term">top of book</span>. Quand ils se croisent, une transaction se produit.</p>
<div class="highlight-box">
  📊 <strong>Lecture du carnet :</strong> un carnet déséquilibré (beaucoup d'acheteurs, peu de vendeurs) indique une pression haussière. Mais attention aux "iceberg orders" — de gros acteurs cachent la taille réelle de leurs ordres.
</div>

<h2>4. Types d'ordres : Market, Limit, Stop</h2>
<p>Trois ordres fondamentaux à maîtriser :</p>
<ul>
  <li><span class="term">Ordre Market</span> : exécuté immédiatement au meilleur prix disponible. Rapide mais tu subis le spread. À utiliser sur des titres très liquides uniquement.</li>
  <li><span class="term">Ordre Limit</span> : tu fixes le prix maximum (achat) ou minimum (vente). Exécuté seulement si le marché atteint ton prix. Pas de garantie d'exécution, mais maîtrise du prix.</li>
  <li><span class="term">Ordre Stop (Stop-Market)</span> : se déclenche quand un seuil est atteint, puis s'exécute au marché. Utilisé pour les stop-loss automatiques.</li>
</ul>
<div class="highlight-box">
  ⚡ <strong>Conseil terrain :</strong> en swing trading, j'utilise quasi exclusivement des ordres Limit à l'entrée (je fixe mon prix) et des ordres Stop-Market pour les stop-loss (exécution garantie en cas de retournement brutal).
</div>
    `,
    qcm: [
      {
        q: "Quand tu passes un ordre d'achat au marché sur une action, à quel prix es-tu exécuté ?",
        opts: ["Au prix Bid", "Au prix médian (Bid+Ask)/2", "Au prix Ask", "Au dernier prix de transaction"],
        correct: 2,
        expl: "Un achat au marché t'exécute au prix Ask — le prix minimum auquel les vendeurs acceptent de céder. Le Bid est le prix auquel tu vends. Ce mécanisme garantit que chaque transaction trouve une contrepartie."
      },
      {
        q: "Le spread d'une action est de 0,10 €. Tu achètes 200 actions. Quel est ton coût implicite lié au spread ?",
        opts: ["0,10 €", "0,20 €", "20 €", "10 €"],
        correct: 2,
        expl: "Le coût spread = 0,10 € × 200 actions = 20 €. C'est le montant que tu 'perdrais' si tu revendais immédiatement après l'achat. Ce coût est invisible (pas de commission explicite) mais bien réel."
      },
      {
        q: "Un spread large sur un titre indique généralement...",
        opts: ["Une forte liquidité", "Une faible liquidité ou une forte volatilité", "Un titre surévalué", "Un marché fermé"],
        correct: 1,
        expl: "Le spread s'élargit quand la liquidité est faible (peu d'acheteurs/vendeurs) ou la volatilité forte (le teneur de marché se protège du risque). Sur le CAC 40, les spreads sont très serrés. Sur des small caps, ils peuvent être de plusieurs %.)"
      },
      {
        q: "Quel type d'ordre garantit l'exécution mais pas le prix ?",
        opts: ["Ordre Limit", "Ordre Stop-Limit", "Ordre Market", "Ordre GTC (Good Till Cancelled)"],
        correct: 2,
        expl: "L'ordre Market est exécuté immédiatement au meilleur prix disponible — exécution garantie, mais le prix exact dépend de la liquidité disponible. Sur un titre illiquide ou en période de forte volatilité, le prix d'exécution peut différer significativement du dernier cours affiché."
      },
      {
        q: "Dans un carnet d'ordres, le 'top of book' désigne :",
        opts: ["Le plus gros ordre en attente", "Le meilleur Bid face au meilleur Ask", "Le dernier ordre exécuté", "Le prix d'ouverture de la séance"],
        correct: 1,
        expl: "Le top of book est la ligne de front du carnet : le Bid le plus élevé (acheteur le plus agressif) face au Ask le plus bas (vendeur le moins cher). C'est là que se forment les transactions. La différence entre ces deux prix, c'est le spread."
      }
    ],
    exercice: {
      type: 'qcm_analyse',
      titre: 'Analyse d\'une situation de marché réelle',
      consigne: `Tu regardes le carnet d'ordres d'une action Tech française. Le Bid est à 148,20 € et l'Ask à 148,35 €. Tu veux acheter 150 actions. Réponds aux questions suivantes.`,
      questions: [
        {
          q: "Quel est le spread en euros et en pourcentage (arrondi) ?",
          opts: ["0,05 € / 0,03%", "0,15 € / 0,10%", "0,15 € / 0,15%", "0,35 € / 0,24%"],
          correct: 1,
          expl: "Spread = 148,35 − 148,20 = 0,15 €. En % = (0,15 / 148,20) × 100 ≈ 0,10%. Ce spread est raisonnable pour une action de mid-cap française en pleine séance."
        },
        {
          q: "Tu passes un ordre Market d'achat de 150 actions. Quel est ton prix d'exécution probable et ton coût de spread total ?",
          opts: ["148,20 € — coût spread : 22,50 €", "148,35 € — coût spread : 22,50 €", "148,275 € — coût spread : 0 €", "148,35 € — coût spread : 0 €"],
          correct: 1,
          expl: "Ordre Market achat → exécution au Ask = 148,35 €. Coût spread = 0,15 € × 150 = 22,50 €. Si tu revendais immédiatement au Bid (148,20 €), tu perdrais exactement 22,50 €. C'est le 'ticket d'entrée' que le marché prélève."
        },
        {
          q: "Tu préfères un ordre Limit à 148,25 €. Qu'est-ce que cela implique ?",
          opts: [
            "L'ordre s'exécute immédiatement à 148,25 €",
            "L'ordre n'est pas valide car 148,25 € est entre Bid et Ask",
            "L'ordre attend que le Ask descende à 148,25 € — exécution non garantie",
            "L'ordre s'exécute au Bid actuel (148,20 €)"
          ],
          correct: 2,
          expl: "Un ordre Limit d'achat à 148,25 € ne sera exécuté que si le Ask descend à ce niveau. En pratique, il rejoindra le carnet côté Bid en améliorant le meilleur Bid. Il ne sera exécuté que si un vendeur accepte ce prix. Avantage : meilleur prix. Risque : l'action peut repartir à la hausse sans t'exécuter."
        }
      ]
    }
  },

  3: {
    titre: 'Introduction à l\'analyse technique',
    module: 'Module 2 — Lire les marchés · ~15 min',
    sections: ['Qu\'est-ce que l\'analyse technique ?', 'La notion de tendance', 'Supports et résistances (intro)', 'Les volumes : le carburant du mouvement', 'Limites de l\'AT'],
    cours: `
<h1>Introduction à l'analyse technique</h1>
<p class="module-tag">Module 2 — Lire les marchés</p>

<h2>1. Qu'est-ce que l'analyse technique ?</h2>
<p>L'<span class="term">analyse technique (AT)</span> consiste à étudier les graphiques de prix pour anticiper les mouvements futurs. Elle repose sur trois postulats fondateurs :</p>
<ol>
  <li><strong>Le marché escompte tout</strong> : le prix intègre déjà toutes les informations disponibles (fondamentaux, news, psychologie).</li>
  <li><strong>Les prix évoluent en tendances</strong> : un mouvement en cours a plus de chances de continuer que de s'inverser.</li>
  <li><strong>L'histoire se répète</strong> : les configurations de prix se reproduisent car la psychologie humaine est constante.</li>
</ol>
<div class="highlight-box">
  🆚 <strong>AT vs Analyse Fondamentale :</strong> l'analyste fondamental cherche la "vraie valeur" d'une entreprise (bilans, DCF…). L'analyste technique dit : "peu importe la valeur intrinsèque, le prix EST le marché." Pour le swing trading court terme, l'AT est l'outil de référence.
</div>

<h2>2. La notion de tendance</h2>
<p>La <span class="term">tendance</span> est la direction principale du mouvement de prix sur une période donnée :</p>
<ul>
  <li><strong>Tendance haussière (uptrend)</strong> : succession de plus hauts et de plus bas ascendants (Higher Highs + Higher Lows).</li>
  <li><strong>Tendance baissière (downtrend)</strong> : succession de plus hauts et de plus bas descendants (Lower Highs + Lower Lows).</li>
  <li><strong>Consolidation (range)</strong> : le prix oscille entre deux niveaux sans direction claire. Ni haussier, ni baissier.</li>
</ul>
<div class="formula">Uptrend : HH + HL — Downtrend : LH + LL — Range : oscillation horizontale</div>
<div class="highlight-box">
  📏 <strong>Multi-timeframe :</strong> une tendance haussière en hebdomadaire peut contenir des corrections baissières en journalier. En swing trading, on trade dans le sens de la tendance principale (hebdo/journalier) et on cherche des points d'entrée sur des unités de temps inférieures.
</div>

<h2>3. Supports et résistances (introduction)</h2>
<p>Un <span class="term">support</span> est un niveau de prix où la demande historiquement arrête ou inverse une baisse. Une <span class="term">résistance</span> est un niveau où l'offre stoppe ou inverse une hausse.</p>
<p>Ces niveaux sont des zones de "mémoire du marché" : les acteurs se souviennent des niveaux auxquels des transactions importantes ont eu lieu.</p>
<div class="highlight-box">
  🔄 <strong>Inversion des rôles :</strong> quand un support est cassé avec conviction, il devient une résistance (et vice versa). C'est l'une des règles les plus fiables de l'AT.
</div>

<h2>4. Les volumes : le carburant du mouvement</h2>
<p>Le <span class="term">volume</span> mesure le nombre de titres échangés sur une période. C'est le "carburant" qui valide ou invalide un mouvement de prix.</p>
<ul>
  <li><strong>Hausse + volumes forts</strong> = mouvement sain, les acheteurs sont convaincus.</li>
  <li><strong>Hausse + volumes faibles</strong> = signal de faiblesse, la hausse manque de conviction.</li>
  <li><strong>Cassure d'un niveau + volumes forts</strong> = cassure validée, fiable.</li>
  <li><strong>Cassure + volumes faibles</strong> = possible faux signal (fakeout).</li>
</ul>

<h2>5. Limites de l'AT</h2>
<p>L'analyse technique n'est pas une boule de cristal. Ses limites :</p>
<ul>
  <li><strong>Subjectivité</strong> : deux analystes ne dessinent pas exactement les mêmes supports/résistances.</li>
  <li><strong>Auto-réalisation partielle</strong> : si tout le monde surveille le même niveau, la réaction est parfois "trop belle" puis se retourne.</li>
  <li><strong>Événements exogènes</strong> : aucun graphique n'anticipe un cygne noir (faillite soudaine, catastrophe, décision de banque centrale surprise).</li>
</ul>
<div class="highlight-box">
  🎯 <strong>Bonne pratique :</strong> utiliser l'AT comme outil de probabilités, pas de certitudes. "Si le prix tient ce support avec des volumes normaux, la probabilité de rebond est élevée." Toujours protéger sa position avec un stop-loss.
</div>
    `,
    qcm: [
      {
        q: "Quel postulat de l'analyse technique affirme que toutes les informations disponibles sont déjà intégrées dans le prix ?",
        opts: ["L'histoire se répète", "Les prix évoluent en tendances", "Le marché escompte tout", "La loi de l'offre et de la demande"],
        correct: 2,
        expl: "« Le marché escompte tout » est le premier postulat de l'AT (Dow Theory). Cela signifie que le prix actuel reflète déjà les fondamentaux, les anticipations, la psychologie et toutes les informations connues. L'analyste technique n'a donc pas besoin d'éplucher les bilans — le graphique dit tout."
      },
      {
        q: "Une tendance haussière se caractérise par :",
        opts: [
          "Des plus hauts descendants et des plus bas ascendants",
          "Des plus hauts et des plus bas ascendants (HH + HL)",
          "Un prix oscillant entre deux niveaux fixes",
          "Des volumes en constante augmentation"
        ],
        correct: 1,
        expl: "En uptrend, chaque sommet (Higher High) est plus élevé que le précédent, et chaque creux (Higher Low) aussi. C'est la définition Dow de la tendance haussière. Dès qu'un Higher Low est cassé, on commence à questionner la tendance."
      },
      {
        q: "Un ancien support cassé à la baisse devient :",
        opts: ["Un nouveau point d'entrée à l'achat", "Une résistance", "Un signal de continuation de hausse", "Un niveau neutre sans signification"],
        correct: 1,
        expl: "L'inversion des rôles est une règle fondamentale : support cassé = résistance. Les acheteurs piégés au support cassé souhaiteront vendre au point d'entrée (break-even), créant une pression vendeuse naturelle au niveau qui était auparavant un support."
      },
      {
        q: "Une cassure de résistance avec de faibles volumes signifie :",
        opts: [
          "La cassure est d'autant plus solide car les vendeurs ont capitulé",
          "Signal potentiellement non fiable — possible faux signal (fakeout)",
          "Le marché est illiquide, ignorer le signal",
          "Signe d'un retournement de tendance confirmé"
        ],
        correct: 1,
        expl: "Les volumes valident les mouvements de prix. Une cassure sans volumes manque de conviction — les gros acheteurs ne participent pas. Souvent, le prix « fakeout » (fausse cassure) puis revient en-dessous de la résistance. Toujours attendre une confirmation volumétrique sur les cassures."
      },
      {
        q: "En swing trading, quelle est la bonne approche multi-timeframe ?",
        opts: [
          "Trader exclusivement sur le timeframe 1 minute pour plus de précision",
          "Ignorer la tendance long terme et chercher des trades contre-tendance",
          "Identifier la tendance sur timeframe hebdo/journalier, chercher des entrées sur timeframe inférieur",
          "Utiliser uniquement l'analyse fondamentale pour le swing trading"
        ],
        correct: 2,
        expl: "L'approche top-down est la plus solide : tendance hebdomadaire donne le biais directionnel, journalier structure les trades, H4/H1 affine les entrées. Trader dans le sens de la tendance principale augmente statistiquement le taux de réussite."
      }
    ],
    exercice: {
      type: 'qcm_analyse',
      titre: 'Lecture de tendance et validation de cassure',
      consigne: `Sur un graphique journalier d'une action, tu observes la séquence suivante : sommet à 85 €, puis creux à 78 €, puis nouveau sommet à 88 €, puis creux à 81 €, puis nouveau sommet à 91 €. Le volume lors de la montée vers 91 € est 3× supérieur à la moyenne. Réponds aux questions suivantes.`,
      questions: [
        {
          q: "Quelle est la structure de tendance observée ?",
          opts: [
            "Tendance baissière — les sommets descendent",
            "Range — le prix oscille sans direction",
            "Tendance haussière — HH (85→88→91) et HL (78→81)",
            "Retournement baissier imminent"
          ],
          correct: 2,
          expl: "La séquence montre des Higher Highs (85 → 88 → 91 €) et des Higher Lows (78 → 81 €). C'est la définition exacte d'une tendance haussière selon la théorie de Dow. Le volume fort lors de la montée vers 91 € confirme la conviction des acheteurs."
        },
        {
          q: "Le niveau 85 € (premier sommet) joue maintenant quel rôle ?",
          opts: [
            "Résistance majeure — le prix ne peut pas dépasser 85 €",
            "Support — niveau où les acheteurs pourraient réintervenir en cas de repli",
            "Niveau neutre — dépassé, il n'a plus de signification",
            "Objectif de cours à la baisse"
          ],
          correct: 1,
          expl: "85 € était une résistance. Maintenant que le prix l'a dépassé (et l'a transformé en support), c'est un niveau où les acheteurs qui avaient raté la cassure pourront potentiellement intervenir lors d'un repli. L'inversion des rôles : résistance dépassée → support."
        },
        {
          q: "Quelle conclusion tirer du volume 3× supérieur à la moyenne lors de la montée vers 91 € ?",
          opts: [
            "Signal négatif — trop de volume signifie un sommet de distribution",
            "Signal positif — le mouvement haussier est validé par une forte participation",
            "Information non significative pour l'AT",
            "Signifie que les institutionnels vendent massivement"
          ],
          correct: 1,
          expl: "Volume fort + hausse = signal bullish. Les gros acteurs (institutionnels, fonds) participent au mouvement — il est sain et a de la conviction. Un volume 3× la moyenne sur une cassure ou un nouveau sommet est un signal de continuation très positif."
        }
      ]
    }
  },

  4: {
    titre: 'Chandeliers japonais',
    module: 'Module 2 — Lire les marchés · ~15 min',
    sections: ['Anatomie d\'un chandelier', 'Les chandeliers de retournement haussier', 'Les chandeliers de retournement baissier', 'Les chandeliers de continuation', 'Pièges et bonnes pratiques'],
    cours: `
<h1>Chandeliers japonais</h1>
<p class="module-tag">Module 2 — Lire les marchés</p>

<h2>1. Anatomie d'un chandelier</h2>
<p>Le <span class="term">chandelier japonais</span> (candlestick) représente le mouvement de prix sur une période donnée (1 jour, 1 heure, etc.) avec quatre informations clés :</p>
<ul>
  <li><strong>Open (O)</strong> : prix d'ouverture</li>
  <li><strong>High (H)</strong> : plus haut atteint</li>
  <li><strong>Low (L)</strong> : plus bas atteint</li>
  <li><strong>Close (C)</strong> : prix de clôture</li>
</ul>
<div class="formula">Corps (body) = |Close − Open| — Mèches (wicks/shadows) = extensions vers High et Low</div>
<p><strong>Chandelier haussier (vert/blanc)</strong> : Close &gt; Open. Les acheteurs ont dominé la session.<br>
<strong>Chandelier baissier (rouge/noir)</strong> : Close &lt; Open. Les vendeurs ont dominé.</p>
<div class="highlight-box">
  💡 Un grand corps avec de petites mèches = conviction forte dans la direction. Un petit corps avec de grandes mèches = indécision, lutte acheteurs/vendeurs.
</div>

<h2>2. Chandeliers de retournement haussier</h2>
<p><span class="term">Marteau (Hammer)</span> : petit corps en haut, longue mèche basse (≥ 2× le corps). Apparaît après une tendance baissière. Signifie que les vendeurs ont poussé fort mais les acheteurs ont repris le contrôle avant la clôture.</p>
<p><span class="term">Marteau inversé / Shooting Star inversé (Inverted Hammer)</span> : petit corps en bas, longue mèche haute. Après une baisse, signale une tentative des acheteurs. Moins fiable que le Hammer — attendre confirmation.</p>
<p><span class="term">Englobant haussier (Bullish Engulfing)</span> : chandelier rouge suivi d'un vert dont le corps englobe entièrement le précédent. Signal de retournement fort, surtout sur un support ou après une forte baisse.</p>
<p><span class="term">Doji</span> : Open ≈ Close, corps quasi inexistant. Indécision totale. Sur un support ou résistance, il peut annoncer un retournement. En isolation, il est neutre.</p>
<div class="highlight-box">
  🎯 <strong>Règle d'or :</strong> aucun chandelier ne se lit seul. Le contexte (tendance, niveau de support/résistance, volumes) est indispensable pour interpréter correctement le signal.
</div>

<h2>3. Chandeliers de retournement baissier</h2>
<p><span class="term">Étoile filante (Shooting Star)</span> : petit corps en bas, longue mèche haute (≥ 2× le corps). Apparaît après une tendance haussière. Les acheteurs ont poussé fort en intraday mais les vendeurs ont dominé à la clôture.</p>
<p><span class="term">Pendu (Hanging Man)</span> : identique au Hammer en forme, mais apparaît après une hausse. Les vendeurs commencent à montrer leur force. Signal d'alerte.</p>
<p><span class="term">Englobant baissier (Bearish Engulfing)</span> : chandelier vert suivi d'un rouge dont le corps englobe entièrement le précédent. Signal de retournement fort sur une résistance.</p>

<h2>4. Chandeliers de continuation</h2>
<p><span class="term">Marubozu</span> : grand corps sans mèches (ou très petites). Représente une séance de pure conviction dans une direction. Haussier = acheteurs ont dominé du début à la fin. Baissier = vendeurs totalement aux commandes.</p>
<p><span class="term">Spinning Top</span> : petit corps, mèches des deux côtés. Indécision mais corps visible — légère tendance dans la direction du corps. En contexte de tendance forte, peut signaler une pause avant continuation.</p>

<h2>5. Pièges et bonnes pratiques</h2>
<ul>
  <li><strong>Ne pas surtrader les patterns</strong> : un Hammer isolé au milieu d'une tendance n'a que peu de valeur. La même formation sur un support majeur est potentiellement très puissante.</li>
  <li><strong>Attendre la confirmation</strong> : le chandelier suivant doit confirmer le signal (clôture au-dessus du Hammer, par exemple).</li>
  <li><strong>Timeframe = fiabilité</strong> : un Engulfing en journalier vaut infiniment plus qu'en 5 minutes.</li>
  <li><strong>Volumes</strong> : un retournement sur fort volume = signal de qualité.</li>
</ul>
    `,
    qcm: [
      {
        q: "Un Marteau (Hammer) est caractérisé par :",
        opts: [
          "Un grand corps rouge avec une longue mèche haute",
          "Un petit corps en haut de la bougie, longue mèche basse ≥ 2× le corps",
          "Deux bougies, la seconde englobant la première",
          "Un corps quasi inexistant avec des mèches égales"
        ],
        correct: 1,
        expl: "Le Hammer : petit corps en haut (Open et Close proches et en haut de la bougie), mèche basse longue (les vendeurs ont poussé fort mais les acheteurs ont repris le contrôle). La mèche basse doit être au moins 2× la taille du corps pour qualifier le pattern."
      },
      {
        q: "Un Doji signifie :",
        opts: [
          "Fort signal haussier immédiat",
          "Fort signal baissier immédiat",
          "Indécision entre acheteurs et vendeurs — signal contextuel",
          "La séance a été suspendue"
        ],
        correct: 2,
        expl: "Le Doji (Open ≈ Close) représente une équilibre parfait entre acheteurs et vendeurs. Seul, il est neutre. Sa valeur vient du contexte : sur un support après une tendance baissière → potentiel retournement. Sur une résistance après une hausse → possible épuisement. Toujours attendre confirmation."
      },
      {
        q: "Un Englobant Haussier (Bullish Engulfing) apparaît :",
        opts: [
          "Deux bougies vertes consécutives",
          "Une bougie rouge suivie d'une verte dont le corps englobe la précédente",
          "Une bougie verte suivie d'une rouge dont le corps englobe la précédente",
          "Une grande bougie verte isolée"
        ],
        correct: 1,
        expl: "L'Engulfing Haussier : bougie rouge (baisse), puis bougie verte dont le CORPS (pas les mèches) est plus grand et englobe entièrement le corps de la bougie précédente. Signal de force des acheteurs qui prennent le contrôle. Plus fiable sur un support ou après une tendance baissière prolongée."
      },
      {
        q: "Un Marubozu haussier signifie :",
        opts: [
          "Les vendeurs ont dominé toute la séance",
          "Indécision totale en séance",
          "Les acheteurs ont dominé du début à la fin de la séance, sans mèches significatives",
          "Ouverture en gap haussier"
        ],
        correct: 2,
        expl: "Marubozu = 'tête rasée' en japonais. Pas de mèches (ou quasi). Le prix a ouvert au plus bas et clôturé au plus haut (haussier) — les acheteurs n'ont jamais cédé de terrain. C'est le signe d'une conviction maximale. En continuation de tendance haussière, c'est très bullish."
      },
      {
        q: "Sur quel timeframe un pattern de chandelier est-il le plus fiable ?",
        opts: [
          "1 minute — plus de données",
          "5 minutes — équilibre signal/bruit",
          "Journalier ou hebdomadaire — le bruit est filtré",
          "La fiabilité est identique sur tous les timeframes"
        ],
        correct: 2,
        expl: "Plus le timeframe est élevé, plus chaque chandelier représente d'activité de marché agrégée et plus les patterns sont fiables. Un Engulfing journalier implique une séance entière de lutte entre acheteurs et vendeurs. En 1 minute, un pattern similaire peut être du bruit aléatoire."
      }
    ],
    exercice: {
      type: 'qcm_analyse',
      titre: 'Identification de patterns en contexte',
      consigne: `Tu observes trois situations graphiques sur un graphique journalier. Identifie les patterns et leur signification.`,
      questions: [
        {
          q: "Situation A : Après 8 jours de baisse, tu vois une bougie avec un petit corps vert en haut et une mèche basse représentant 70% de la bougie totale. Les volumes sont 2× la moyenne. Quel pattern et quelle action ?",
          opts: [
            "Étoile filante baissière — envisager une vente",
            "Marteau haussier sur support — signal de retournement potentiel, attendre confirmation J+1",
            "Doji — aucun signal, ignorer",
            "Marubozu haussier — achat immédiat"
          ],
          correct: 1,
          expl: "Hammer classique (petit corps en haut, longue mèche basse) après une tendance baissière = signal de retournement haussier potentiel. Le volume 2× la moyenne renforce la qualité du signal. Bonne pratique : attendre que le lendemain clôture au-dessus du Hammer avant d'entrer. Le stop se place sous la mèche basse."
        },
        {
          q: "Situation B : En sommet de tendance haussière, une bougie verte est suivie d'une rouge dont le corps englobe entièrement la précédente. Volumes normaux. Quel pattern ?",
          opts: [
            "Englobant haussier — signal d'achat",
            "Englobant baissier — possible retournement à surveiller",
            "Marteau — continuation haussière probable",
            "Pattern non significatif"
          ],
          correct: 1,
          expl: "Bearish Engulfing en sommet de tendance = signal de retournement baissier potentiel. Les vendeurs ont repris le contrôle d'une séance entière. En contexte (sommet de tendance, résistance visible), ce signal mérite attention. Avec volumes normaux, il est moins fort qu'avec volumes élevés — surveiller la confirmation."
        },
        {
          q: "Situation C : En milieu de tendance haussière forte, une bougie de type Spinning Top (petit corps, mèches des deux côtés). Comment l'interpréter ?",
          opts: [
            "Retournement baissier immédiat confirmé",
            "Pause/consolidation possible dans la tendance, mais continuation probable si la tendance est forte",
            "Fort signal haussier — doubler la position",
            "Signal de vente immédiate"
          ],
          correct: 1,
          expl: "Spinning Top en milieu de tendance = indécision temporaire, pas nécessairement un retournement. En tendance forte, c'est souvent juste une pause respiratoire avant la continuation. Le contexte (pas de résistance majeure proche, volumes normaux) indique que les vendeurs n'ont pas vraiment pris le contrôle. Maintenir la position, surveiller la bougie suivante."
        }
      ]
    }
  },

  5: {
    titre: 'Supports, résistances & tendances',
    module: 'Module 2 — Lire les marchés · ~15 min',
    sections: ['Identifier les supports et résistances', 'Tracer les droites de tendance', 'Figures chartistes classiques', 'La zone de valeur', 'Gérer les faux signaux'],
    cours: `
<h1>Supports, résistances & tendances</h1>
<p class="module-tag">Module 2 — Lire les marchés</p>

<h2>1. Identifier les supports et résistances</h2>
<p>Un <span class="term">support</span> est un niveau de prix où la demande est historiquement plus forte que l'offre — le prix "rebondit" dessus. Une <span class="term">résistance</span> est l'inverse : l'offre domine, le prix "bute" contre ce plafond.</p>
<p><strong>Comment les identifier :</strong></p>
<ul>
  <li><strong>Anciens sommets/creux significatifs</strong> : les niveaux qui ont été testés plusieurs fois.</li>
  <li><strong>Niveaux psychologiques ronds</strong> : 100 €, 50 $, 10 000 points. Les ordres s'agrègent naturellement sur ces chiffres.</li>
  <li><strong>Gaps</strong> : les zones laissées vides par un saut de prix jouent souvent le rôle de support/résistance.</li>
  <li><strong>Plus on a de "touches", plus le niveau est fort</strong> — et plus sa cassure sera significative.</li>
</ul>
<div class="highlight-box">
  📐 <strong>Zones plutôt que lignes :</strong> en pratique, un support/résistance est une zone (quelques pourcents) plutôt qu'un prix exact. Le marché est imprécis — dessiner des rectangles plutôt que des lignes fines.
</div>

<h2>2. Tracer les droites de tendance</h2>
<p>La <span class="term">droite de tendance haussière</span> relie les creux ascendants (Higher Lows). Elle représente la dynamique d'achat minimum. Tant que le prix est au-dessus, la tendance est intacte.</p>
<p>La <span class="term">droite de tendance baissière</span> relie les sommets descendants (Lower Highs). Cassure = potentiel retournement.</p>
<div class="formula">Règle des 3 touches : une droite de tendance n'est validée qu'après au moins 3 contacts</div>
<p><strong>Canal de tendance</strong> : en traçant une parallèle à la droite de tendance côté opposé, on crée un canal. Le bas du canal = zone d'achat. Le haut = zone de vente partielle ou de prudence.</p>
<div class="highlight-box">
  ⚠️ <strong>Attention aux droites trop pentues :</strong> une tendance très abrupte (45°+) n'est pas tenable longtemps. Elle finira par casser. Préférer les tendances régulières et sostenibles.
</div>

<h2>3. Figures chartistes classiques</h2>
<p><span class="term">Double sommet (Double Top)</span> : deux sommets à des niveaux similaires séparés par un creux. Confirmation à la cassure du creux intermédiaire (ligne de cou). Signal baissier.</p>
<p><span class="term">Double creux (Double Bottom)</span> : inverse. Deux creux + cassure du sommet intermédiaire. Signal haussier. Figure très fiable.</p>
<p><span class="term">Épaule-Tête-Épaule (Head & Shoulders)</span> : trois sommets, celui du milieu plus haut. Cassure de la "ligne de cou" = retournement baissier majeur. L'une des figures les plus célèbres.</p>
<p><span class="term">Triangle ascendant</span> : sommets horizontaux + creux ascendants. Compression haussière — cassure vers le haut probable.</p>
<p><span class="term">Drapeau (Flag)</span> : forte impulsion suivie d'une consolidation en contre-tendance légère. Figure de continuation — la tendance devrait reprendre dans la direction initiale.</p>

<h2>4. La zone de valeur</h2>
<p>En swing trading, on cherche à acheter dans la <span class="term">zone de valeur</span> : une zone où de multiples éléments techniques convergent.</p>
<ul>
  <li>Support horizontal</li>
  <li>Droite de tendance haussière</li>
  <li>Niveau de retracement (Fibonacci)</li>
  <li>Chandelier de retournement</li>
  <li>Volumes importants historiquement</li>
</ul>
<p>Plus les éléments convergent, plus la probabilité de rebond est élevée — et plus le rapport risque/récompense est favorable.</p>

<h2>5. Gérer les faux signaux (fakeouts)</h2>
<p>Un <span class="term">fakeout</span> est une fausse cassure : le prix dépasse brièvement un niveau clé puis revient de l'autre côté. C'est l'un des pièges les plus courants.</p>
<p>Comment les limiter :</p>
<ul>
  <li><strong>Attendre la clôture</strong> au-delà du niveau (pas juste un wick).</li>
  <li><strong>Vérifier les volumes</strong> : une vraie cassure a des volumes forts.</li>
  <li><strong>Laisser un retest</strong> : souvent, après une cassure, le prix revient "tester" le niveau cassé, offrant une entrée plus sûre.</li>
</ul>
    `,
    qcm: [
      {
        q: "Combien de contacts minimum faut-il pour valider une droite de tendance ?",
        opts: ["1 contact suffit", "2 contacts", "3 contacts minimum", "5 contacts"],
        correct: 2,
        expl: "La règle des 3 touches : 2 points définissent une ligne mais ne la valident pas. Le 3ème contact prouve que les acteurs reconnaissent ce niveau et réagissent. Plus on a de contacts, plus la droite est significative. Sa cassure sera d'autant plus forte."
      },
      {
        q: "Un Double Bottom (double creux) est un signal :",
        opts: [
          "Baissier — deux tentatives de hausse qui ont échoué",
          "Neutre — pattern de continuation de tendance",
          "Haussier — deux tentatives de baisse rejetées, cassure de la ligne de cou attendue",
          "Impossible à interpréter sans volumes"
        ],
        correct: 2,
        expl: "Double Bottom : le prix teste deux fois un support (creux similaires) sans parvenir à le casser. Les vendeurs s'épuisent. La confirmation vient avec la cassure du sommet intermédiaire (ligne de cou) — à ce moment, les acheteurs prennent le contrôle et l'objectif de cours est la hauteur du double creux reportée à la hausse."
      },
      {
        q: "Comment différencier une vraie cassure de support d'un fakeout ?",
        opts: [
          "Un fakeout dure toujours plus de 3 jours",
          "Attendre une clôture journalière en-dessous + volumes forts confirment la cassure",
          "Les fakeouts ne se produisent que sur les résistances, jamais les supports",
          "Seul le RSI peut confirmer une cassure"
        ],
        correct: 1,
        expl: "Deux éléments clés : (1) clôture journalière (pas juste un wick) en-dessous du support, (2) volumes élevés validant que de vrais vendeurs participent. Un fakeout a souvent des volumes faibles et le prix revient rapidement de l'autre côté. Attendre le retest du niveau cassé est une stratégie d'entrée plus sûre."
      },
      {
        q: "Un triangle ascendant est caractérisé par :",
        opts: [
          "Des sommets descendants et des creux descendants",
          "Des sommets horizontaux (résistance) et des creux ascendants",
          "Des sommets ascendants et des creux horizontaux (support)",
          "Un range horizontal parfait"
        ],
        correct: 1,
        expl: "Triangle ascendant : résistance horizontale (les vendeurs défendent toujours le même niveau) + creux ascendants (les acheteurs arrivent de plus en plus haut). Les acheteurs gagnent progressivement du terrain. La compression finit par une cassure — statistiquement vers le haut dans ce pattern."
      },
      {
        q: "La 'zone de valeur' en swing trading désigne :",
        opts: [
          "Le prix exact d'une action selon l'analyse fondamentale",
          "La zone de prix avec les plus forts volumes historiques",
          "Une zone où plusieurs éléments techniques convergent pour créer une opportunité",
          "La zone entre Bid et Ask"
        ],
        correct: 2,
        expl: "La zone de valeur (ou 'confluence') est l'endroit où support horizontal + droite de tendance + Fibonacci + chandelier de retournement + volumes convergent. Plus il y a de confluences, plus la probabilité de rebond est élevée et le risque est défini (stop sous la zone). C'est là qu'on cherche à entrer."
      }
    ],
    exercice: {
      type: 'qcm_analyse',
      titre: 'Analyse de figure chartiste',
      consigne: `Tu analyses une action dont voici la séquence : hausse de 40 € à 78 €, puis correction à 62 €, puis remontée à 77 € (proche de 78 €), puis nouvelle baisse qui casse les 62 €. Réponds aux questions suivantes.`,
      questions: [
        {
          q: "Quelle figure chartiste cette séquence décrit-elle ?",
          opts: [
            "Double Bottom (double creux) — signal haussier",
            "Épaule-Tête-Épaule — retournement baissier",
            "Double Top (double sommet) avec cassure de la ligne de cou — signal baissier",
            "Drapeau haussier — continuation de la hausse"
          ],
          correct: 2,
          expl: "Double Top classique : deux sommets à ~78 € (premier à 78 €, deuxième à 77 €), séparés par un creux à 62 € (ligne de cou). La cassure des 62 € confirme la figure et donne un signal baissier. L'objectif théorique = 62 € − (78 − 62) = 46 €, soit la hauteur du double sommet reportée à la baisse."
        },
        {
          q: "Quel est l'objectif de cours théorique après la cassure des 62 € ?",
          opts: ["55 €", "50 €", "46 €", "40 €"],
          correct: 2,
          expl: "Méthode classique du Double Top : hauteur de la figure = 78 − 62 = 16 €. Objectif = ligne de cou − hauteur = 62 − 16 = 46 €. C'est un objectif minimal théorique. En pratique, l'objectif peut être affiné avec des supports horizontaux, des niveaux Fibonacci, etc."
        },
        {
          q: "Le niveau 62 € (ancienne ligne de cou/support) joue maintenant quel rôle ?",
          opts: [
            "Il n'a plus de rôle puisqu'il a été cassé",
            "Il reste un support — le prix va rebondir dessus",
            "Il est devenu une résistance — les vendeurs pourraient l'utiliser pour vendre sur un retest",
            "Il est devenu un objectif d'achat"
          ],
          correct: 2,
          expl: "Inversion des rôles : le support à 62 € cassé devient une résistance. Si le prix remonte vers 62 € (retest), les acheteurs piégés lors de la cassure voudront sortir au break-even, créant une pression vendeuse naturelle. C'est une zone de vente classique pour les traders qui ont manqué la cassure initiale."
        }
      ]
    }
  },

  6: {
    titre: 'Indicateurs : RSI, MACD & Bollinger',
    module: 'Module 2 — Lire les marchés · ~18 min',
    sections: ['Le RSI : force relative', 'Le MACD : momentum et signal', 'Les Bandes de Bollinger : volatilité', 'Combiner les indicateurs', 'Le piège de l\'overloading'],
    cours: `
<h1>Indicateurs : RSI, MACD & Bollinger</h1>
<p class="module-tag">Module 2 — Lire les marchés</p>

<h2>1. Le RSI : Relative Strength Index</h2>
<p>Le <span class="term">RSI</span> (J. Welles Wilder, 1978) mesure la vitesse et l'amplitude des variations de prix sur 14 périodes par défaut. Il oscille entre 0 et 100.</p>
<div class="formula">RSI = 100 − [100 / (1 + RS)] — RS = Moyenne des hausses / Moyenne des baisses sur 14 périodes</div>
<p><strong>Niveaux clés :</strong></p>
<ul>
  <li><strong>RSI &gt; 70</strong> : zone de surachat (overbought). Le mouvement haussier peut s'essouffler.</li>
  <li><strong>RSI &lt; 30</strong> : zone de survente (oversold). Le mouvement baissier peut s'épuiser.</li>
  <li><strong>RSI = 50</strong> : ligne de partage. Au-dessus = biais haussier. En-dessous = biais baissier.</li>
</ul>
<div class="highlight-box">
  ⚡ <strong>La divergence RSI :</strong> le signal le plus puissant. Si le prix fait un nouveau plus haut mais le RSI fait un plus haut inférieur → divergence baissière (momentum s'affaiblit). Si le prix fait un nouveau plus bas mais le RSI remonte → divergence haussière. Ces signaux précèdent souvent les retournements.
</div>

<h2>2. Le MACD : Moving Average Convergence/Divergence</h2>
<p>Le <span class="term">MACD</span> (Gerald Appel) mesure la convergence/divergence de deux moyennes mobiles exponentielles. Paramètres par défaut : 12, 26, 9.</p>
<ul>
  <li><strong>Ligne MACD</strong> : MME(12) − MME(26)</li>
  <li><strong>Ligne Signal</strong> : MME(9) de la ligne MACD</li>
  <li><strong>Histogramme</strong> : MACD − Signal (visualise l'écart)</li>
</ul>
<p><strong>Signaux principaux :</strong></p>
<ul>
  <li><strong>Croisement MACD/Signal</strong> : MACD croise au-dessus du Signal → signal haussier. MACD croise en-dessous → signal baissier.</li>
  <li><strong>Passage de la ligne zéro</strong> : MACD au-dessus de 0 = tendance haussière. En-dessous = tendance baissière.</li>
  <li><strong>Divergence MACD</strong> : comme pour le RSI, les divergences entre prix et MACD sont des signaux précieux.</li>
</ul>
<div class="highlight-box">
  ⚠️ <strong>Lag important :</strong> le MACD est un indicateur retardé (lagging). Les croisements arrivent après que le mouvement a commencé. Utile pour confirmer une tendance, moins pour anticiper les retournements exacts.
</div>

<h2>3. Les Bandes de Bollinger</h2>
<p>Les <span class="term">Bandes de Bollinger</span> (John Bollinger) encadrent le prix avec une bande centrale (MM20) et deux bandes à ±2 écarts-types.</p>
<div class="formula">Bande centrale = MM(20) — Bande haute = MM(20) + 2σ — Bande basse = MM(20) − 2σ</div>
<p>Statistiquement, ~95% des prix restent entre les deux bandes. Quand le prix sort des bandes, c'est exceptionnel.</p>
<p><strong>Lectures clés :</strong></p>
<ul>
  <li><strong>Squeeze (compression)</strong> : les bandes se rapprochent fortement → volatilité en baisse → explosion imminente. On ne sait pas la direction mais une forte cassure est attendue.</li>
  <li><strong>Expansion</strong> : les bandes s'écartent → fort mouvement directionnel en cours.</li>
  <li><strong>Marche sur la bande</strong> : en tendance forte, le prix peut "marcher" sur la bande haute (haussier) sans que ce soit un signal de vente.</li>
</ul>

<h2>4. Combiner les indicateurs intelligemment</h2>
<p>Chaque indicateur a ses forces et ses failles. La combinaison efficace :</p>
<ul>
  <li><strong>Tendance</strong> (MACD, moyennes mobiles) + <strong>Momentum/force</strong> (RSI) + <strong>Volatilité</strong> (Bollinger) = approche complète.</li>
  <li>Exemple : RSI en survente (30) + croisement MACD haussier + prix sur bande basse de Bollinger et sur un support → forte confluence.</li>
</ul>

<h2>5. Le piège de l'overloading</h2>
<p>Trop d'indicateurs = paralysie analytique. Ils finissent par se contredire ou confirmer en boucle les mêmes informations. Règle des traders expérimentés :</p>
<div class="highlight-box">
  🎯 <strong>Ma règle :</strong> 2-3 indicateurs maximum, chacun apportant une information différente (tendance, momentum, volatilité). Le prix et les volumes restent les rois — les indicateurs sont des assistants, pas des décideurs.
</div>
    `,
    qcm: [
      {
        q: "Un RSI à 28 sur une action en tendance baissière signifie :",
        opts: [
          "Achat immédiat — l'action est en survente",
          "Zone de survente — signal de vigilance potentielle de retournement, mais pas un signal d'achat automatique",
          "L'action est à vendre immédiatement",
          "Le RSI est invalide en tendance baissière"
        ],
        correct: 1,
        expl: "RSI < 30 = zone de survente, mais en tendance baissière forte, le RSI peut rester sous 30 longtemps. Ce n'est pas un signal d'achat automatique. La valeur vient du contexte : RSI < 30 + support majeur + chandelier de retournement = signal fort. Seul, c'est juste une alerte de vigilance."
      },
      {
        q: "Une divergence haussière du RSI se produit quand :",
        opts: [
          "Le prix et le RSI font tous les deux de nouveaux plus hauts",
          "Le prix fait un nouveau plus bas mais le RSI fait un plus bas plus haut que le précédent",
          "Le RSI croise la ligne des 50",
          "Le prix monte et le RSI monte également"
        ],
        correct: 1,
        expl: "Divergence haussière : le prix continue de baisser (nouveau plus bas) mais le RSI ne suit pas — il fait un creux plus élevé. Cela signifie que la force des vendeurs s'affaiblit même si le prix baisse encore. C'est un signal précurseur de retournement haussier — souvent l'un des meilleurs signaux de l'AT."
      },
      {
        q: "Le 'Squeeze' des Bandes de Bollinger indique :",
        opts: [
          "Une tendance forte en cours",
          "Un surachat extrême",
          "Une compression de volatilité précédant souvent une forte expansion directionnelle",
          "La fin d'un mouvement de prix"
        ],
        correct: 2,
        expl: "Quand les bandes se rapprochent fortement, la volatilité historique est au plus bas. Les marchés passent des phases de compression à des phases d'expansion. Un squeeze signifie : quelque chose se prépare. On ne connaît pas la direction, mais une cassure forte est imminente. On surveille la direction de la cassure pour trader dans ce sens."
      },
      {
        q: "Dans la construction du MACD, quelle est la ligne Signal ?",
        opts: [
          "La MME(12) des prix",
          "La différence MME(12) − MME(26)",
          "La MME(9) de la ligne MACD",
          "L'histogramme des volumes"
        ],
        correct: 2,
        expl: "Le MACD standard : Ligne MACD = MME(12) − MME(26). Ligne Signal = MME(9) de la ligne MACD. L'Histogramme = Ligne MACD − Ligne Signal. Le croisement de la ligne MACD au-dessus de la ligne Signal est le signal haussier standard (et inversement pour un signal baissier)."
      },
      {
        q: "Quelle est la bonne approche pour utiliser les indicateurs en swing trading ?",
        opts: [
          "Utiliser le maximum d'indicateurs pour avoir toutes les confirmations possibles",
          "Se fier uniquement au RSI — il est suffisant",
          "2-3 indicateurs complémentaires (tendance + momentum + volatilité), les prix et volumes restant prioritaires",
          "Les indicateurs sont inutiles — seul le prix compte"
        ],
        correct: 2,
        expl: "L'approche équilibrée : tendance (MACD/MA), momentum (RSI), volatilité (Bollinger) — chaque indicateur apporte une info différente et évite les redondances. Au-delà de 3-4 indicateurs, tu tombes dans la 'paralysie analytique' où les signaux se contredisent. Le prix et les volumes restent la source de vérité primaire."
      }
    ],
    exercice: {
      type: 'qcm_analyse',
      titre: 'Lecture multi-indicateurs',
      consigne: `Tu analyses une action avec les données suivantes : prix sur un support majeur à 45 €, RSI à 32 (en remontée depuis 28), MACD venant de croiser à la hausse sa ligne Signal, Bandes de Bollinger en début d'expansion haussière. Réponds aux questions.`,
      questions: [
        {
          q: "Combien de signaux bullish confluents peux-tu identifier dans cette situation ?",
          opts: ["1 signal", "2 signaux", "3 signaux", "4 signaux ou plus"],
          correct: 3,
          expl: "4 signaux confluents : (1) Support majeur à 45 € — zone d'achat historique. (2) RSI en survente (32) et en remontée — momentum haussier revient. (3) Croisement MACD haussier — tendance court terme qui s'inverse. (4) Bollinger en expansion haussière — la volatilité confirme le mouvement. Cette confluence est rare et constitue une setup de qualité."
        },
        {
          q: "Le RSI est à 32, en remontée depuis 28. Que signifie ce mouvement du RSI ?",
          opts: [
            "Signal de vente — le RSI était trop bas",
            "Signal neutre — le RSI n'a pas encore atteint 50",
            "Signe que le momentum des vendeurs s'affaiblit et que les acheteurs reprennent de la force",
            "Divergence baissière confirmée"
          ],
          correct: 2,
          expl: "Un RSI qui sort de la zone de survente (remonte depuis < 30) est un signal que la pression vendeuse s'atténue et que les acheteurs réinterviennent. Ce n'est pas le simple fait d'être à 32 qui compte, c'est le rebond depuis 28 qui est significatif — le momentum change de direction."
        },
        {
          q: "Où placerais-tu logiquement un stop-loss dans cette situation ?",
          opts: [
            "Au-dessus de la résistance suivante",
            "Juste en-dessous du support à 45 € (ex : 43,50 €)",
            "À 10% sous le prix d'achat",
            "Pas besoin de stop-loss avec autant de confluences"
          ],
          correct: 1,
          expl: "Le stop logique se place sous le support (zone d'invalidation de la thèse). Si le support à 45 € est cassé, la thèse est fausse — les acheteurs n'ont pas tenu. Placer le stop à ~43,50 € laisse un peu de marge sous le support (évite un stop sur wick) tout en invalidant clairement la setup si cassé. Un stop existe toujours — même avec 4 signaux confluents."
        }
      ]
    }
  },

  7: {
    titre: 'Position sizing & ratio Risque/Récompense',
    module: 'Module 3 — Stratégies & Risk · ~15 min',
    sections: ['Pourquoi le sizing est décisif', 'Le risque par trade : la règle des 1-2%', 'Calculer sa taille de position', 'Le ratio Risque/Récompense (R/R)', 'Expectancy : penser en statistiques'],
    cours: `
<h1>Position Sizing & Ratio Risque/Récompense</h1>
<p class="module-tag">Module 3 — Stratégies & Risk</p>

<h2>1. Pourquoi le sizing est décisif</h2>
<p>Le <span class="term">position sizing</span> (taille de position) est probablement la compétence la plus sous-estimée des traders débutants. Tu peux avoir raison sur la direction d'un trade 6 fois sur 10, et quand même perdre de l'argent — si tes positions perdantes sont trop grandes.</p>
<p>Inversement, un bon sizing permet de survivre aux séries de pertes inévitables et de rester dans le jeu assez longtemps pour que l'edge statistique joue en ta faveur.</p>
<div class="highlight-box">
  💀 <strong>La ruine :</strong> le pire ennemi du trader n'est pas d'avoir tort — c'est de perdre trop sur un seul trade au point de ne plus pouvoir se remettre. Un portefeuille en baisse de 50% doit gagner 100% pour retrouver son niveau initial. Le sizing prévient ce scénario.
</div>

<h2>2. La règle des 1-2% : risque par trade</h2>
<p>La règle d'or du risk management : ne jamais risquer plus de <strong>1 à 2% de son capital total</strong> sur un seul trade.</p>
<ul>
  <li>Capital 5 000 € → risque max par trade : 50-100 €</li>
  <li>Capital 10 000 € → risque max par trade : 100-200 €</li>
</ul>
<p>Avec cette règle, 10 trades perdants consécutifs ne représentent que 10-20% de perte — une série normale dans le trading. Sans cette règle, quelques trades peuvent être fatals.</p>

<h2>3. Calculer sa taille de position</h2>
<p>La formule est simple mais fondamentale :</p>
<div class="formula">Taille de position = Risque en € / Distance au Stop-Loss en €</div>
<p><strong>Exemple concret :</strong></p>
<ul>
  <li>Capital : 10 000 €, risque max : 1% = 100 €</li>
  <li>Prix d'entrée : 50 €, Stop-Loss à 47 € → distance = 3 €</li>
  <li>Taille = 100 € / 3 € = 33 actions</li>
  <li>Investissement total = 33 × 50 € = 1 650 € (16,5% du capital)</li>
</ul>
<div class="highlight-box">
  🎯 <strong>Note importante :</strong> tu risques 100 € (1% du capital), pas 1 650 €. La taille de position n'est pas ton risque — c'est ta distance au stop qui détermine le risque réel.
</div>

<h2>4. Le ratio Risque/Récompense (R/R)</h2>
<p>Le <span class="term">ratio R/R</span> compare le gain potentiel à la perte maximale acceptée.</p>
<div class="formula">Ratio R/R = Gain potentiel / Risque max — Exemple : gagner 300 € pour risquer 100 € = R/R de 3:1</div>
<p><strong>Pourquoi c'est crucial :</strong></p>
<ul>
  <li>Avec un R/R de 2:1, si tu as raison 40% du temps, tu gagnes de l'argent.</li>
  <li>Avec un R/R de 1:1, tu dois avoir raison > 50% juste pour ne pas perdre.</li>
  <li>En swing trading, viser un minimum de <strong>2:1</strong>, idéalement 3:1.</li>
</ul>
<p>Le take-profit se calcule à partir du stop : si le stop est à 3 € du prix d'entrée et que tu veux un R/R de 3:1, le take-profit est à 9 € du prix d'entrée.</p>

<h2>5. Expectancy : penser en statistiques</h2>
<p>L'<span class="term">expectancy</span> (espérance mathématique) d'un système de trading :</p>
<div class="formula">Expectancy = (Taux de gain × R/R moyen) − (Taux de perte × 1)</div>
<p>Exemple : taux de gain 45%, R/R moyen 2,5:1 :<br>
Expectancy = (0,45 × 2,5) − (0,55 × 1) = 1,125 − 0,55 = <strong>+0,575 par trade</strong></p>
<p>Une expectancy positive, c'est un edge. Sur 100 trades, ce système génère +57,5 unités de risque en moyenne — même à seulement 45% de réussite.</p>
    `,
    qcm: [
      {
        q: "Avec un capital de 8 000 €, un risque max de 1% par trade, une entrée à 40 € et un stop-loss à 37,50 €, quelle est la taille de position correcte ?",
        opts: ["20 actions", "32 actions", "50 actions", "80 actions"],
        correct: 1,
        expl: "Risque max = 1% × 8 000 € = 80 €. Distance au stop = 40 − 37,50 = 2,50 €. Taille = 80 € / 2,50 € = 32 actions. Investissement total = 32 × 40 € = 1 280 € (16% du capital), mais le risque réel est de 80 € seulement."
      },
      {
        q: "Pourquoi un portefeuille en baisse de 50% doit-il gagner 100% pour se remettre ?",
        opts: [
          "C'est une approximation, il suffit de gagner 50%",
          "Car le calcul se fait sur une base différente : 5 000 € doit doubler pour retrouver 10 000 €",
          "C'est faux, une perte de 50% se compense par un gain de 50%",
          "À cause des frais de courtage"
        ],
        correct: 1,
        expl: "Exemple : 10 000 € → perte 50% = 5 000 €. Pour retrouver 10 000 €, il faut gagner 5 000 € sur une base de 5 000 € = +100%. La perte et le gain ne sont pas symétriques. C'est pourquoi limiter les pertes est mathématiquement plus important que maximiser les gains."
      },
      {
        q: "Un trade avec un risque de 150 € et un objectif de gain de 450 € a un ratio R/R de :",
        opts: ["1:1", "2:1", "3:1", "4:1"],
        correct: 2,
        expl: "R/R = Gain / Risque = 450 / 150 = 3. Donc R/R de 3:1. Avec ce ratio, même si tu n'as raison que 30% du temps, ton système est profitable : (0,30 × 3) − (0,70 × 1) = 0,90 − 0,70 = +0,20 par unité de risque."
      },
      {
        q: "Quelle est la règle générale du risque max par trade recommandée pour un swing trader ?",
        opts: ["5-10% du capital", "10-20% du capital", "1-2% du capital", "0,1% du capital"],
        correct: 2,
        expl: "La règle des 1-2% est le standard du money management. À 1%, tu peux encaisser 50 trades perdants consécutifs avant de perdre 50% du capital (une situation extrêmement rare). À 10% par trade, 10 pertes consécutives = ruine totale. Commencer à 1% est sage pour un débutant."
      },
      {
        q: "Avec un taux de gain de 40% et un R/R moyen de 3:1, l'expectancy est :",
        opts: ["-0,20 par trade", "+0,20 par trade", "+0,80 par trade", "Nulle — pas suffisant de trades"],
        correct: 1,
        expl: "Expectancy = (0,40 × 3) − (0,60 × 1) = 1,20 − 0,60 = +0,60 par trade. Positif ! Ce système gagne même avec seulement 40% de trades gagnants, car les gains (3R) compensent largement les pertes (1R). C'est le pouvoir d'un bon ratio R/R."
      }
    ],
    exercice: {
      type: 'qcm_analyse',
      titre: 'Calcul de position et validation de setup',
      consigne: `Tu as un capital de 15 000 €. Tu repères une action à 75 € avec un support à 71 €. Tu considères ton stop-loss à 70,50 € (légèrement sous le support). Tu vises un objectif à 84 €. Ta règle : risque max 1,5% par trade.`,
      questions: [
        {
          q: "Quelle est ta taille de position maximale ?",
          opts: ["20 actions", "50 actions", "30 actions", "45 actions"],
          correct: 2,
          expl: "Risque max = 1,5% × 15 000 € = 225 €. Distance au stop = 75 − 70,50 = 4,50 €. Taille = 225 € / 4,50 € = 50 actions. Investissement = 50 × 75 € = 3 750 € (25% du capital). Risque réel = 50 × 4,50 = 225 € = 1,5% du capital. Réponse correcte : 50 actions."
        },
        {
          q: "Quel est le ratio R/R de ce trade ?",
          opts: ["1:1", "2:1", "2,5:1", "4:1"],
          correct: 1,
          expl: "Gain potentiel = 84 − 75 = 9 € par action. Risque = 75 − 70,50 = 4,50 € par action. R/R = 9 / 4,50 = 2:1. C'est au-dessus du minimum recommandé (2:1), donc ce trade passe le filtre R/R."
        },
        {
          q: "Ce trade est-il acceptable selon les critères de risk management vus dans le cours ?",
          opts: [
            "Non — le R/R est insuffisant (minimum 3:1 requis)",
            "Oui — R/R ≥ 2:1 et risque dans la limite des 1,5%",
            "Non — l'investissement de 3 750 € est trop élevé",
            "Non — le stop est trop proche du prix d'entrée"
          ],
          correct: 1,
          expl: "Le trade respecte les deux critères fondamentaux : (1) Risque = 1,5% du capital ✓, (2) R/R = 2:1 ≥ minimum recommandé ✓. L'investissement de 3 750 € représente 25% du capital — c'est la taille en capital, pas le risque. Le vrai risque reste de 225 € (1,5%). Ce trade est acceptable."
        }
      ]
    }
  },

  8: {
    titre: 'Stop-loss, take-profit & gestion du trade',
    module: 'Module 3 — Stratégies & Risk · ~15 min',
    sections: ['Le stop-loss : définition et placement', 'Les erreurs de stop classiques', 'Le take-profit : stratégies de sortie', 'La gestion active : trailing stop et sorties partielles', 'Journal de trading'],
    cours: `
<h1>Stop-loss, Take-profit & Gestion du Trade</h1>
<p class="module-tag">Module 3 — Stratégies & Risk</p>

<h2>1. Le stop-loss : définition et placement</h2>
<p>Le <span class="term">stop-loss</span> est un ordre de vente automatique déclenché si le prix atteint un niveau prédéfini. C'est ton "plan B" — la sortie si la thèse de trade est invalidée.</p>
<p><strong>Où placer son stop :</strong></p>
<ul>
  <li><strong>Sous un support</strong> (achat) ou au-dessus d'une résistance (vente à découvert) : le niveau logique d'invalidation de la thèse.</li>
  <li><strong>Sous la dernière mèche basse</strong> d'un chandelier de retournement : zone où les acheteurs ont historiquement arrêté la baisse.</li>
  <li><strong>Sous la droite de tendance haussière</strong> : cassure = tendance remise en cause.</li>
  <li>Toujours laisser un peu de marge (~0,5-1%) pour éviter les "stop hunting" (chasse aux stops par les market makers).</li>
</ul>
<div class="highlight-box">
  ⚠️ <strong>Stop ≠ target de loss</strong> : Le stop n'est pas placé là où "je peux me permettre de perdre X€". Il est placé là où la thèse est clairement fausse. Le sizing s'adapte à la distance du stop, pas l'inverse.
</div>

<h2>2. Les erreurs de stop classiques</h2>
<ul>
  <li><strong>Déplacer son stop dans la mauvaise direction</strong> (l'éloigner car "le prix va revenir") : la faute la plus couteuse. Ça transforme une petite perte en catastrophe.</li>
  <li><strong>Stop trop serré</strong> : le prix fait un wick normal et touche le stop avant de repartir dans la direction prévue. Laisser un peu de respiration.</li>
  <li><strong>Pas de stop du tout</strong> : "je surveille et je coupe moi-même." L'émotion prend le dessus. Toujours utiliser un stop automatique.</li>
  <li><strong>Stop arbitraire</strong> (ex: -5% systématique) : non basé sur la structure du marché, souvent touché inutilement.</li>
</ul>

<h2>3. Le take-profit : stratégies de sortie</h2>
<p>Le <span class="term">take-profit</span> est l'objectif de gain. Plusieurs approches :</p>
<ul>
  <li><strong>Objectif fixe</strong> : basé sur le R/R cible (ex : stop à 3 € → TP à 6 € pour un R/R de 2:1).</li>
  <li><strong>Résistance suivante</strong> : le TP se place juste avant la prochaine résistance majeure (les vendeurs attendent là).</li>
  <li><strong>Extension Fibonacci</strong> : les niveaux 1,618 ou 2,618 de l'extension Fibonacci sont des cibles classiques.</li>
</ul>
<div class="highlight-box">
  🎯 <strong>Conseil terrain :</strong> je préfère sortir <em>juste avant</em> la résistance (ex : résistance à 80 € → TP à 79,50 €). Les autres traders placent leur TP exactement sur la résistance, créant une zone de vente. Sortir légèrement avant évite de rater la sortie.
</div>

<h2>4. Gestion active : trailing stop & sorties partielles</h2>
<p><span class="term">Trailing stop</span> : un stop qui suit le prix à la hausse (achat). Si le prix monte de 10 € et ton trailing est de 3 €, le stop se déplace aussi. Protège les gains tout en laissant courir les bénéfices.</p>
<p><strong>Sorties partielles</strong> : une technique courante des traders avancés :</p>
<ol>
  <li>Vendre 50% de la position au premier objectif (couvre le risque + un gain).</li>
  <li>Déplacer le stop au break-even sur le solde (plus de risque de perte).</li>
  <li>Laisser courir les 50% restants avec un trailing stop ou jusqu'à un objectif secondaire.</li>
</ol>
<div class="highlight-box">
  💡 Cette technique élimine psychologiquement la pression : tu as déjà sécurisé un gain et le "reste" ne peut que t'enrichir ou sortir au break-even.
</div>

<h2>5. Le journal de trading</h2>
<p>Tenir un <span class="term">journal de trading</span> est l'outil de progression numéro 1. Il doit noter pour chaque trade :</p>
<ul>
  <li>Symbole, date, entrée, stop, TP, taille</li>
  <li>Raison de l'entrée (thèse, setup)</li>
  <li>Résultat en € et en R</li>
  <li>Analyse post-trade : qu'est-ce qui a bien/mal fonctionné ?</li>
</ul>
<p>Sans journal, tu répètes les mêmes erreurs sans t'en rendre compte. Avec journal, tu identifies tes patterns de succès et d'échec.</p>
    `,
    qcm: [
      {
        q: "Où doit logiquement être placé un stop-loss sur un trade d'achat ?",
        opts: [
          "À exactement -5% du prix d'entrée",
          "Là où tu peux te permettre de perdre ton risque max",
          "En-dessous du niveau structurel qui invalide la thèse (support, chandelier, droite de tendance)",
          "Toujours à la même distance en % quel que soit le trade"
        ],
        correct: 2,
        expl: "Le stop se place là où la thèse est clairement invalidée : sous un support, sous la mèche d'un Hammer, sous la droite de tendance. Ce niveau structurel définit le stop, et la taille de position s'adapte à ce stop pour respecter le risque % du capital. Jamais l'inverse."
      },
      {
        q: "Déplacer son stop dans la mauvaise direction (l'éloigner) est :",
        opts: [
          "Une bonne pratique pour laisser plus de marge",
          "L'erreur la plus coûteuse — ça transforme une petite perte contrôlée en désastre",
          "Acceptable si on a de bonnes raisons fondamentales",
          "Utile pour les setups long terme"
        ],
        correct: 1,
        expl: "Déplacer le stop dans la mauvaise direction, c'est trahir son plan de trade et laisser l'émotion prendre le dessus. Une perte de 1R peut devenir 3R, 5R, voire la ruine d'un compte. C'est LA règle à ne jamais enfreindre : le stop se déplace seulement en faveur du trade (break-even, trailing) — jamais pour 'donner plus de chance au trade.'"
      },
      {
        q: "La technique des sorties partielles consiste à :",
        opts: [
          "Vendre toute la position dès que le trade est profitable",
          "Sortir 50% à un premier objectif, déplacer le stop au break-even, laisser courir le reste",
          "Diviser la position en 10 petites sorties progressives",
          "Racheter après une sortie partielle si le prix continue"
        ],
        correct: 1,
        expl: "Les sorties partielles = la technique de gestion active par excellence. Première sortie au 1er objectif (R/R 1:1 ou 2:1) → tu récupères du capital et sécurises. Stop au break-even → tu ne peux plus perdre sur ce trade. Le reste court avec un trailing stop ou jusqu'au 2ème objectif. Psychologiquement très confortable."
      },
      {
        q: "Un trailing stop de 3 € sur une position achetée à 50 €. Si le prix monte à 58 €, où se trouve le stop ?",
        opts: ["47 € — stop initial", "50 € — break-even", "55 € — trailing actif", "58 € — prix actuel"],
        correct: 2,
        expl: "Trailing stop de 3 € : quand le prix atteint 58 €, le stop suit et se place à 58 − 3 = 55 €. Si le prix continue de monter à 60 €, le stop monte à 57 €. Il ne descend jamais — il ne fait que monter avec le prix. Si le prix redescend à 55 €, le trade est clos avec un gain de 5 € par action."
      },
      {
        q: "Pourquoi tenir un journal de trading est-il essentiel ?",
        opts: [
          "Pour des raisons fiscales uniquement",
          "Pour identifier ses patterns de succès et d'erreur et s'améliorer objectivement",
          "Pour impressionner les autres traders sur les forums",
          "Ce n'est pas utile si on utilise de bons indicateurs"
        ],
        correct: 1,
        expl: "Sans journal, tu travailles à l'aveugle. Avec un journal, tu peux analyser : quel setup fonctionne le mieux pour toi ? Sur quels marchés ? À quelle heure ? Quand perds-tu (état émotionnel, news, surtrading) ? C'est ta boucle de feedback personnelle. Les traders professionnels tiennent tous un journal."
      }
    ],
    exercice: {
      type: 'qcm_analyse',
      titre: 'Gestion d\'un trade en cours',
      consigne: `Tu as acheté 50 actions à 60 €, avec un stop à 57 € et un objectif à 66 € (R/R 2:1). Le prix atteint maintenant 64 € (⅔ de l'objectif). Tu dois prendre des décisions de gestion.`,
      questions: [
        {
          q: "Le prix est à 64 €, à 2 € de l'objectif (66 €). Quelle est la meilleure action ?",
          opts: [
            "Fermer toute la position immédiatement — ne pas être gourmand",
            "Ne rien faire — attendre 66 €",
            "Vendre 25 actions (50%) à 64 €, déplacer le stop au break-even (60 €) pour les 25 restantes",
            "Déplacer le stop à 62 € et attendre 66 €"
          ],
          correct: 2,
          expl: "Sortie partielle à 64 € : tu réalises un gain sur 25 actions × (64−60) = +100 €. Le stop au break-even protège les 25 restantes — tu ne peux plus perdre sur ce trade. Si le prix atteint 66 €, tu gagnes encore 25 × (66−60) = +150 €. Total possible : +250 € pour un risque initial de 50 × 3 = 150 €."
        },
        {
          q: "Suite à la sortie partielle, le prix fait une correction à 61 € avant de remonter. Que se passe-t-il avec ton stop au break-even (60 €) ?",
          opts: [
            "Le stop est touché à 61 € — tu sors en perte",
            "Le stop n'est pas touché (61 € > 60 €) — tu restes en position avec les 25 actions",
            "Le stop doit être déplacé à 61 € manuellement",
            "La position est automatiquement fermée car le prix a reculé"
          ],
          correct: 1,
          expl: "Le prix à 61 € reste au-dessus du stop à 60 €. La position continue. Le stop au break-even agit comme un filet : tu ne peux pas perdre sur les 25 actions restantes (dans le pire cas, tu sors à 60 € = 0 de perte sur cette partie). La correction à 61 € est normale — la tendance reste intacte."
        },
        {
          q: "Que dois-tu noter dans ton journal pour ce trade ?",
          opts: [
            "Juste l'entrée et la sortie avec le résultat en €",
            "Uniquement si c'est un trade perdant",
            "Symbole, prix d'entrée/stop/TP, taille, raison d'entrée, résultat (€ et R), et analyse post-trade",
            "Rien — le journal n'est utile qu'en fin de mois"
          ],
          correct: 2,
          expl: "Un journal de trading complet trace chaque décision : entrée (prix, stop, TP, taille), thèse (setup : support + chandelier + RSI…), gestion en cours (sortie partielle), résultat final en € ET en R (nb de risques). L'analyse post-trade est la partie la plus précieuse : qu'est-ce qui a bien fonctionné ? Y avait-il des signaux d'alerte ignorés ?"
        }
      ]
    }
  },

  9: {
    titre: 'Stratégies de swing trading',
    module: 'Module 3 — Stratégies & Risk · ~18 min',
    sections: ['Définition et caractéristiques du swing trading', 'La stratégie du rebond sur support', 'La stratégie de cassure (breakout)', 'La stratégie de pull-back', 'Construire son plan de trading'],
    cours: `
<h1>Stratégies de Swing Trading</h1>
<p class="module-tag">Module 3 — Stratégies & Risk</p>

<h2>1. Définition du swing trading</h2>
<p>Le <span class="term">swing trading</span> consiste à capturer des mouvements de prix sur des durées de quelques jours à quelques semaines. C'est le style idéal pour une activité secondaire :</p>
<ul>
  <li><strong>Pas besoin de surveiller les marchés en temps réel</strong> — on passe ses ordres en dehors des heures de marché (soir/matin).</li>
  <li><strong>Trades significatifs</strong> : on vise des mouvements de 5-15%, pas des fractions de pourcents.</li>
  <li><strong>Timeframes principaux</strong> : journalier (daily) et hebdomadaire (weekly).</li>
</ul>
<div class="highlight-box">
  🕐 <strong>Mon rythme type :</strong> le soir, j'analyse mes watchlists (20-30 min), je passe mes ordres Limit et mes stops pour le lendemain. Le matin, je vérifie les exécutions. En journée, je ne surveille pas — les stops font leur travail.
</div>

<h2>2. Stratégie 1 : Le rebond sur support</h2>
<p>La stratégie la plus simple et la plus efficace pour un débutant.</p>
<p><strong>Setup :</strong></p>
<ol>
  <li>Identifier une action en tendance haussière (HH + HL).</li>
  <li>Attendre un repli vers un support (ancien sommet devenu support, droite de tendance, niveau Fibonacci).</li>
  <li>Chercher un chandelier de retournement (Hammer, Engulfing Haussier, Doji) sur le support.</li>
  <li>Entrée sur la clôture du chandelier de confirmation OU ordre Limit légèrement au-dessus.</li>
  <li>Stop sous le support / sous la mèche basse.</li>
  <li>TP = prochaine résistance, ou R/R 2:1 minimum.</li>
</ol>
<div class="highlight-box">
  ✅ <strong>Avantages :</strong> stop logique et serré → R/R élevé. La tendance principale est favorable. Contexte clair (tendance + support + chandelier = triple confluence).
</div>

<h2>3. Stratégie 2 : Le breakout (cassure)</h2>
<p><strong>Setup :</strong></p>
<ol>
  <li>Identifier un range ou une résistance bien définie testée plusieurs fois.</li>
  <li>Attendre une cassure avec volumes forts (> 1,5× la moyenne).</li>
  <li>Entrée en clôture au-dessus de la résistance cassée, ou sur le retest (pull-back sur l'ancien niveau).</li>
  <li>Stop sous l'ancien niveau de résistance (maintenant support).</li>
  <li>Objectif = hauteur du range reportée à la cassure.</li>
</ol>
<div class="highlight-box">
  ⚠️ <strong>Piège classique :</strong> FOMO (Fear Of Missing Out) — entrer après une cassure sur volumes faibles ou trop loin du niveau. Attendre la confirmation ou le pull-back. Un breakout raté coûte peu (stop serré) ; rater un breakout et le rejoindre trop tard coûte beaucoup.
</div>

<h2>4. Stratégie 3 : Le pull-back</h2>
<p>Après un fort mouvement (impulsion), le prix consolide puis reprend dans la direction initiale.</p>
<p><strong>Setup :</strong></p>
<ol>
  <li>Identifier une tendance forte + une impulsion initiale (marubozu ou forte bougie de cassure).</li>
  <li>Attendre la consolidation / pull-back vers la MM20 ou un niveau de retracement (38-50% Fibonacci).</li>
  <li>Entrée sur signe de fin de correction (chandelier de retournement, RSI remontant depuis 40-50).</li>
  <li>Stop sous le plus bas de la consolidation.</li>
  <li>TP = extension de l'impulsion initiale (100-161,8% Fibonacci).</li>
</ol>

<h2>5. Construire son plan de trading</h2>
<p>Un <span class="term">plan de trading</span> définit à l'avance les règles de jeu. Il évite les décisions impulsives.</p>
<p>Il doit contenir :</p>
<ul>
  <li><strong>Univers d'investissement</strong> : quelles actions/marchés ? (ex : actions françaises du CAC Mid 60 + ETF)</li>
  <li><strong>Setups autorisés</strong> : les stratégies précises que tu trades</li>
  <li><strong>Règles de sizing</strong> : 1-2% max par trade, max X positions simultanées</li>
  <li><strong>Règles de stop</strong> : jamais déplacé dans le mauvais sens, toujours en place avant l'entrée</li>
  <li><strong>Routine d'analyse</strong> : quand, comment, durée</li>
</ul>
<div class="highlight-box">
  📋 <strong>Ma conviction :</strong> le plan de trading vaut mille indicateurs. Il transforme le trading émotionnel et aléatoire en une activité professionnelle répétable. Le respecter dans les mauvais moments, c'est ça qui fait la différence.
</div>
    `,
    qcm: [
      {
        q: "Quel est l'avantage principal du swing trading pour quelqu'un ayant une activité principale ?",
        opts: [
          "Les gains sont plus importants qu'en day trading",
          "Pas besoin de surveiller les marchés en temps réel — ordres passés en dehors des heures de trading",
          "Le swing trading est moins risqué que toutes les autres formes de trading",
          "Il ne nécessite aucune analyse technique"
        ],
        correct: 1,
        expl: "Le swing trading sur timeframe journalier/hebdomadaire se passe de la surveillance en temps réel. On analyse le soir, on passe ses ordres (entrée Limit + stop automatique), et on vérifie le matin. En journée, les stops protègent la position sans intervention humaine. C'est le seul style de trading compatible avec une activité professionnelle classique."
      },
      {
        q: "Dans la stratégie de rebond sur support, quelle est l'ordre chronologique correct ?",
        opts: [
          "1. Identifier la tendance → 2. Chercher un chandelier → 3. Trouver un support → 4. Entrer",
          "1. Identifier la tendance → 2. Attendre le repli vers support → 3. Chandelier de retournement → 4. Entrer avec stop sous support",
          "1. Identifier le support → 2. Entrer immédiatement → 3. Attendre la confirmation → 4. Placer le stop",
          "L'ordre n'a pas d'importance si tous les éléments sont présents"
        ],
        correct: 1,
        expl: "Le processus est top-down et séquentiel : (1) biais directionnel (tendance haussière), (2) zone d'intérêt (support dans la tendance), (3) signal d'entrée (chandelier de retournement sur le support), (4) exécution avec stop logique. Chaque étape filtre et qualifie. Inverser les étapes conduit à des entrées hasardeuses."
      },
      {
        q: "Pour valider un breakout, quel élément est indispensable ?",
        opts: [
          "Une clôture au-dessus de la résistance avec volumes significativement supérieurs à la moyenne",
          "Juste que le prix touche brièvement le niveau de résistance",
          "Un RSI au-dessus de 70 au moment de la cassure",
          "Que la cassure se produise en début de séance"
        ],
        correct: 0,
        expl: "Une vraie cassure nécessite : (1) clôture journalière au-dessus de la résistance (pas juste un wick) + (2) volumes élevés (validation de la participation des gros acteurs). Sans volumes, c'est un fakeout probable. Les volumes montrent que la cassure est acceptée par le marché, pas juste un dépassement fugace."
      },
      {
        q: "La stratégie du pull-back cherche à entrer :",
        opts: [
          "Dès que le prix commence à corriger",
          "Sur la fin de la consolidation/correction après une forte impulsion initiale",
          "À l'extrême du repli (quand le pull-back est au plus bas)",
          "Avant l'impulsion initiale, en anticipation"
        ],
        correct: 1,
        expl: "On n'entre pas pendant le pull-back (le prix peut continuer de corriger) mais sur le signe de fin de correction : chandelier de retournement sur MM20 ou Fibonacci, RSI qui remonte depuis 40-50, petite bougie de compression. Ce signal de fin de correction confirme que la tendance principale reprend le dessus."
      },
      {
        q: "Pourquoi un plan de trading écrit est-il indispensable ?",
        opts: [
          "Pour montrer sa rigueur à des investisseurs extérieurs",
          "Il n'est pas indispensable pour les traders expérimentés",
          "Pour transformer des décisions émotionnelles et impulsives en processus répétable et objectif",
          "Pour se souvenir de ses trades passés"
        ],
        correct: 2,
        expl: "L'ennemi du trader, c'est son propre cerveau en état de stress ou d'excitation. Le plan de trading pré-définit les règles quand on est calme et objectif — on les applique ensuite mécaniquement. Sans plan, chaque trade est une décision nouvelle sous pression émotionnelle. Avec plan, c'est un processus : setup présent ? → appliquer les règles → répéter."
      }
    ],
    exercice: {
      type: 'qcm_analyse',
      titre: 'Identifier et qualifier un setup',
      consigne: `Tu analyses une action en tendance haussière journalière. Après une hausse de 45 € à 62 €, le prix a corrigé à 56 €, niveau qui correspond à un ancien sommet (maintenant support) et à la MM20. On voit un Hammer vert avec des volumes légèrement au-dessus de la moyenne. RSI à 48, en remontée.`,
      questions: [
        {
          q: "Quel type de setup est-ce ?",
          opts: [
            "Breakout — le prix casse un niveau clé",
            "Pull-back / Rebond sur support — repli dans une tendance haussière sur un niveau de confluence",
            "Retournement baissier — la tendance s'inverse",
            "Range — aucune direction claire"
          ],
          correct: 1,
          expl: "Setup classique de pull-back/rebond dans tendance : (1) tendance haussière confirmée (45→62), (2) correction vers support (ancien sommet à 56 € + MM20), (3) signal de retournement (Hammer), (4) RSI en survente légère (48) et remontant. C'est le setup de rebond sur support par excellence."
        },
        {
          q: "Où placer le stop-loss ?",
          opts: [
            "À 54 € — légèrement sous le support à 56 €",
            "À 50 € — loin du support pour éviter les chasses aux stops",
            "À 59 € — sous le prix actuel d'entrée",
            "Pas de stop — le support est très fiable"
          ],
          correct: 0,
          expl: "Stop logique = légèrement sous le support (56 €) et sous la mèche du Hammer. 54 € laisse ~3,5% de marge sous le support, évitant les chasses aux stops sans éloigner le stop excessivement. Si 54 € est touché, la thèse (rebond sur support) est clairement invalidée. Les stops excessivement larges dégradent le R/R."
        },
        {
          q: "Le prix d'entrée est ~56,50 €, stop à 54 €. La résistance suivante est à 62 € (ancien plus haut). Est-ce un setup valide (R/R ≥ 2:1) ?",
          opts: [
            "Non — R/R = 1,4:1 (gain 5,50 € / risque 2,50 €), insuffisant",
            "Oui — R/R = 2,2:1 (gain 5,50 € / risque 2,50 €), acceptable",
            "Oui — R/R = 3:1 (gain 7,50 € / risque 2,50 €)",
            "Non — impossible à calculer sans objectif précis"
          ],
          correct: 1,
          expl: "Gain potentiel = 62 − 56,50 = 5,50 €. Risque = 56,50 − 54 = 2,50 €. R/R = 5,50 / 2,50 = 2,2:1. C'est au-dessus du minimum de 2:1. Le setup passe les filtres : tendance + support + chandelier + RSI + R/R ≥ 2:1. Setup qualifié pour trading."
        }
      ]
    }
  },

  10: {
    titre: 'Psychologie du trader',
    module: 'Module 3 — Stratégies & Risk · ~15 min',
    sections: ['Les émotions dans le trading', 'Les biais cognitifs du trader', 'Fear & Greed : l\'ennemi intérieur', 'Construire sa discipline', 'Le trading comme business'],
    cours: `
<h1>Psychologie du Trader</h1>
<p class="module-tag">Module 3 — Stratégies & Risk</p>

<h2>1. Les émotions dans le trading</h2>
<p>La majorité des traders perdants ont une stratégie correcte — ils échouent sur l'exécution. La <span class="term">psychologie du trading</span> est la partie que personne ne veut travailler, et pourtant c'est la plus déterminante.</p>
<p>Les deux émotions dominantes qui sabotent les traders :</p>
<ul>
  <li><strong>La peur</strong> : peur de perdre → sortir trop tôt d'un bon trade. Peur de rater → entrer sur un mauvais setup par FOMO.</li>
  <li><strong>L'avidité (greed)</strong> : ne pas respecter son TP car "ça va encore monter". Surtraiter après une série gagnante.</li>
</ul>
<div class="highlight-box">
  🧠 <strong>La réalité neurologique :</strong> notre cerveau n'est pas câblé pour le trading. La perte de 100 € génère environ 2× plus de douleur psychologique qu'un gain de 100 € de plaisir (théorie des perspectives, Kahneman & Tversky). Ce biais nous pousse à couper trop tôt les gains et laisser courir les pertes — exactement l'inverse du nécessaire.
</div>

<h2>2. Les biais cognitifs du trader</h2>
<p><span class="term">Biais de confirmation</span> : on cherche les informations qui confirment notre thèse et on ignore celles qui la contredisent. "Cette action va monter" → on ne voit que les signaux haussiers. Solution : chercher activement les arguments contre sa thèse.</p>
<p><span class="term">Biais d'ancrage</span> : s'attacher au prix d'achat comme référence absolue. "Je ne peux pas vendre en perte." Résultat : des positions perdantes qui s'aggravent. Le marché ne sait pas à quel prix tu as acheté.</p>
<p><span class="term">Overconfidence</span> : après une série gagnante, on se croit meilleur qu'on ne l'est → positions trop grandes, setups de moins en moins qualifiés.</p>
<p><span class="term">Revenge trading</span> : après une perte, vouloir se "venger" du marché et reprendre immédiatement une position pour récupérer. C'est le début d'une spirale destructrice.</p>

<h2>3. Fear & Greed : le cycle émotionnel</h2>
<p>Le marché joue sur nos émotions. En haut de cycle : euphorie (tout le monde achète, tout semble facile) → typiquement le meilleur moment pour vendre. En bas de cycle : panique (tout le monde vend, sentiment que ça ne remontera jamais) → historiquement les meilleures opportunités d'achat.</p>
<div class="formula">Règle de Buffett : "Soyez avide quand les autres ont peur, et ayez peur quand les autres sont avides."</div>
<div class="highlight-box">
  📊 <strong>Le Fear & Greed Index :</strong> CNN Money publie un indice Fear & Greed (0-100) qui mesure le sentiment de marché. Extrême peur (< 20) → zone de vigilance achat. Extrême avidité (> 80) → zone de prudence ou allégement.
</div>

<h2>4. Construire sa discipline</h2>
<p>La discipline se construit par des <strong>processus</strong>, pas par la volonté. Stratégies concrètes :</p>
<ul>
  <li><strong>Le plan de trading</strong> : des règles écrites que tu appliques mécaniquement. Pas de décision ad hoc.</li>
  <li><strong>Stops automatiques</strong> : on ne coupe pas manuellement. Le stop fait son travail.</li>
  <li><strong>Limites journalières</strong> : si tu perds X€ dans la journée, tu arrêtes. Évite les spirales.</li>
  <li><strong>Journalisation</strong> : noter ses émotions par trade aide à identifier les patterns comportementaux.</li>
  <li><strong>Trading "small"</strong> au début : quand les positions sont petites, les émotions sont gérables. Augmenter la taille progressivement.</li>
</ul>

<h2>5. Le trading comme business</h2>
<p>Les traders durables traitent leur activité comme un <strong>business</strong>, pas comme un casino :</p>
<ul>
  <li>Un business accepte des coûts d'opération → les petites pertes sont normales.</li>
  <li>Un business optimise ses processus → le journal de trading, l'analyse des setups.</li>
  <li>Un business ne double pas la mise sur un mauvais mois → discipline du capital.</li>
  <li>Un business se forme en continu → lire, analyser, s'améliorer.</li>
</ul>
<div class="highlight-box">
  🎯 <strong>Ma conviction finale :</strong> 80% de ton succès en trading dépend de ta psychologie et de ta discipline. 20% dépend de ta stratégie. Travaille les deux, mais ne sous-estime jamais l'aspect mental. Un bon plan mal exécuté ne vaut rien. Un plan moyen parfaitement exécuté peut être rentable.
</div>
    `,
    qcm: [
      {
        q: "Selon la théorie des perspectives (Kahneman), quelle affirmation est correcte ?",
        opts: [
          "La douleur d'une perte et le plaisir d'un gain équivalent sont ressentis de façon symétrique",
          "Une perte de 100 € génère environ 2× plus de douleur psychologique qu'un gain de 100 € de plaisir",
          "Les traders expérimentés ne sont pas soumis à ces biais",
          "Le gain de 100 € génère plus de plaisir qu'une perte de 100 € de douleur"
        ],
        correct: 1,
        expl: "La théorie des perspectives de Kahneman & Tversky montre que les humains sont avers aux pertes : une perte équivaut psychologiquement à ~2× son montant en gain. Ce biais pousse les traders à vouloir éviter les pertes à tout prix (laisser courir les mauvaises positions) et à sécuriser trop vite les gains. Connaître ce biais aide à le combattre."
      },
      {
        q: "Le 'revenge trading' est :",
        opts: [
          "Une stratégie valide pour récupérer rapidement une perte",
          "Reprendre une position immédiatement après une perte pour 'se venger' du marché — début d'une spirale destructrice",
          "Trader contre la tendance pour profiter des excès",
          "Une technique de scalping avancée"
        ],
        correct: 1,
        expl: "Le revenge trading est l'une des causes les plus fréquentes de comptes détruits. Après une perte, l'état émotionnel est dégradé (colère, ego blessé) — le pire moment pour trader. On prend des positions non qualifiées, trop grandes, et souvent on aggrave la situation. La bonne réaction après une perte : faire une pause, analyser ce qui s'est passé, revenir calme."
      },
      {
        q: "Le biais de confirmation pousse le trader à :",
        opts: [
          "Confirmer ses setups avec plusieurs indicateurs",
          "Chercher uniquement les informations qui confirment sa thèse et ignorer les signaux contraires",
          "Attendre une confirmation supplémentaire avant d'entrer",
          "Comparer plusieurs actions avant de choisir"
        ],
        correct: 1,
        expl: "Biais de confirmation : une fois qu'on a une thèse ('cette action va monter'), on filtre l'information — on voit les signaux haussiers, on rationalise les signaux baissiers. Solution : se forcer à lister les raisons pour lesquelles la thèse est FAUSSE avant d'entrer. Si on ne trouve aucune bonne raison de ne pas trader, c'est suspect."
      },
      {
        q: "La règle de Buffett 'Soyez avide quand les autres ont peur' signifie :",
        opts: [
          "Acheter massivement pendant les paniques de marché sans analyser",
          "Chercher des opportunités d'achat quand le sentiment de marché est à l'extrême pessimisme",
          "Éviter les marchés haussiers car tout le monde est optimiste",
          "Que la psychologie de masse ne compte pas pour le swing trading"
        ],
        correct: 1,
        expl: "Les plus grandes opportunités se présentent quand la panique est maximale (prix déprimés) et les meilleurs moments pour alléger sont ceux d'euphorie (prix surévalués). Ce n'est pas un appel à acheter aveuglément en panique, mais à rester objectif quand la foule perd la tête. Les creux de 2009, 2020 ont été des opportunités historiques — mais ils paraissaient terrifiants sur le moment."
      },
      {
        q: "Quelle est la meilleure façon de gérer les émotions en trading ?",
        opts: [
          "Supprimer totalement les émotions grâce à la méditation",
          "Ne trader que quand on se sent à 100% confiant",
          "Créer des processus (plan de trading, stops automatiques, règles écrites) qui court-circuitent les décisions émotionnelles",
          "Augmenter la taille des positions pour habituer son cerveau au risque"
        ],
        correct: 2,
        expl: "On ne supprime pas les émotions — elles font partie de l'humain. On les neutralise par des systèmes : le plan de trading définit quand et comment entrer/sortir AVANT que les émotions soient actives. Les stops automatiques évitent la décision manuelle sous pression. Les règles écrites empêchent la rationalisation ad hoc. La discipline se construit par des processus, pas par la volonté pure."
      }
    ],
    exercice: {
      type: 'qcm_analyse',
      titre: 'Identifier et corriger un comportement de trader',
      consigne: `Marc est un trader débutant. Il a eu 3 trades gagnants d'affilée et se sent très confiant. Il voit une action qu'il "sent" haussière sans setup clair, prend une position 3× sa taille habituelle. Le trade part en perte immédiatement. Il refuse de couper sa position car "il sait que ça va remonter". Le lendemain, la perte s'est doublée.`,
      questions: [
        {
          q: "Quels biais cognitifs Marc illustre-t-il avec sa position 3× la taille habituelle ?",
          opts: [
            "Biais de confirmation uniquement",
            "Overconfidence (série gagnante → surestimation) + FOMO (entrer sans setup clair)",
            "Biais d'ancrage uniquement",
            "Aucun biais — agrandir sa position est normal après des succès"
          ],
          correct: 1,
          expl: "Double biais : (1) Overconfidence — 3 gains consécutifs lui donnent une fausse impression d'être 'dans le flow', poussant à prendre plus de risque. (2) FOMO/intuition non structurée — entrer sur un 'feeling' sans setup qualifié. Ces deux biais combinés créent la pire situation : trop grosse position sur un trade non qualifié."
        },
        {
          q: "Refuser de couper sa position parce qu'il 'sait que ça va remonter' est un exemple de :",
          opts: [
            "Patience — qualité importante du trader",
            "Biais d'ancrage + biais de confirmation (rationalisation de la perte)",
            "Bonne gestion du trade — les stop-loss sont optionnels",
            "Stratégie de swing trading valide"
          ],
          correct: 1,
          expl: "Biais d'ancrage : Marc est accroché à son prix d'achat comme référence. 'Ça va remonter' = biais de confirmation (il cherche les raisons pour garder, ignore les signaux de sortie). Le stop-loss aurait dû être en place AVANT l'entrée, automatique. Sans stop, chaque minute de baisse augmente l'attachement émotionnel à la position."
        },
        {
          q: "Quelle règle du plan de trading aurait évité toute cette situation ?",
          opts: [
            "Ne jamais trader après une série gagnante",
            "Règle du setup qualifié (pas d'entrée sans critères clairs), règle du sizing (max 1-2% de risque), stop automatique avant l'entrée",
            "Limiter le nombre de trades à 1 par semaine",
            "N'utiliser que des ordres Limit"
          ],
          correct: 1,
          expl: "Trois règles du plan auraient suffi : (1) Setup qualifié obligatoire → pas d'entrée sur 'intuition'. (2) Sizing max 1-2% → impossible de prendre 3× la taille habituelle. (3) Stop automatique en place avant l'entrée → la position aurait été coupée mécaniquement à la perte max prévue. Le plan de trading est le garde-fou contre la psychologie débordante."
        }
      ]
    }
  },
};

// ── COURS — NAVIGATION DES VUES ───────────────────────
let chapitreActif = null;
let qcmState = { current: 0, score: 0, answered: false };
let exoState  = { current: 0, score: 0, answered: false };

function showCoursView(vue) {
  ['list','theory','qcm','exo'].forEach(v => {
    const el = document.getElementById('cours-' + v + '-view');
    if (el) el.style.display = 'none';
  });
  document.getElementById('cours-' + vue + '-view').style.display = 'block';
  if (vue === 'qcm') startChapitreQcm();
  if (vue === 'exo') startExercice();
  if (vue === 'list') renderChapitresList();
}

function renderChapitresList() {
  const container = document.getElementById('chapitres-list');
  if (!container) return;
  const niveauIdx = getNiveauActuel();

  // Grouper par module
  const modules = {};
  CHAPITRES.forEach(ch => {
    if (!modules[ch.module]) modules[ch.module] = [];
    modules[ch.module].push(ch);
  });

  container.innerHTML = Object.entries(modules).map(([mod, chs]) => {
    const items = chs.map(ch => {
      const valide  = state.chapitresValides.includes(ch.id);
      const verrou  = ch.verrou && niveauIdx < ch.verrou - 1;
      const precedentValide = ch.id === 1 || state.chapitresValides.includes(ch.id - 1);
      const accessible = !verrou && (valide || precedentValide);
      const contenu = CONTENU_CHAPITRES[ch.id];
      const onclick = accessible && contenu ? `onclick="ouvrirChapitre(${ch.id})"` : '';
      const cls = verrou ? 'status-lock' : valide ? 'status-done' : accessible ? 'status-todo' : 'status-lock';
      const label = verrou ? '🔒 Niveau 4' : valide ? '✓ Validé' : accessible ? (contenu ? 'Commencer →' : 'Bientôt') : '🔒';
      return `
        <div class="lesson-item ${accessible && contenu ? 'clickable' : ''}" ${onclick}>
          <span class="lesson-num">${String(ch.id).padStart(2,'0')}</span>
          <div class="lesson-info">
            <div class="lesson-title">${ch.icon} ${ch.titre}</div>
            <div class="lesson-meta">${contenu ? contenu.module : ch.module}</div>
          </div>
          <span class="lesson-status ${cls}">${label}</span>
        </div>`;
    }).join('');
    return `<div class="section-title" style="margin-top:20px;">${mod}</div><div class="lesson-list">${items}</div>`;
  }).join('');
}

function ouvrirChapitre(id) {
  const contenu = CONTENU_CHAPITRES[id];
  if (!contenu) return;
  chapitreActif = id;

  // Injecter le cours
  document.getElementById('theory-body').innerHTML = contenu.cours;
  document.getElementById('theory-toc').innerHTML = contenu.sections.map((s, i) =>
    `<div class="toc-item ${i===0?'active':''}"><div class="toc-dot"></div>${s}</div>`
  ).join('');

  showCoursView('theory');
}

// ── QCM DE CHAPITRE ───────────────────────────────────
function startChapitreQcm() {
  const contenu = CONTENU_CHAPITRES[chapitreActif];
  if (!contenu) return;
  qcmState = { current: 0, score: 0, answered: false };
  document.getElementById('chapitre-qcm-active').style.display = 'block';
  document.getElementById('chapitre-qcm-result').style.display = 'none';
  renderQcmQuestion();
}

function renderQcmQuestion() {
  const questions = CONTENU_CHAPITRES[chapitreActif].qcm;
  const q = questions[qcmState.current];
  const pct = (qcmState.current / questions.length) * 100;
  document.getElementById('qcm-prog').style.width = pct + '%';
  document.getElementById('qcm-step-label').textContent = (qcmState.current + 1) + ' / ' + questions.length;
  document.getElementById('qcm-score-label').textContent = 'Score : ' + qcmState.score;
  document.getElementById('qcm-question-text').textContent = q.q;
  document.getElementById('qcm-explanation-box').style.display = 'none';
  document.getElementById('qcm-next-btn').style.display = 'none';
  const letters = ['A','B','C','D'];
  document.getElementById('qcm-options-grid').innerHTML = q.opts.map((opt, i) =>
    `<button class="option-btn" onclick="selectQcmAnswer(${i})" id="qcm-opt-${i}">
      <span class="opt-letter">${letters[i]}</span>${opt}
    </button>`
  ).join('');
  qcmState.answered = false;
}

function selectQcmAnswer(idx) {
  if (qcmState.answered) return;
  qcmState.answered = true;
  const q = CONTENU_CHAPITRES[chapitreActif].qcm[qcmState.current];
  const btns = document.querySelectorAll('#qcm-options-grid .option-btn');
  btns.forEach(b => b.disabled = true);
  btns[idx].classList.add(idx === q.correct ? 'correct' : 'wrong');
  if (idx !== q.correct) btns[q.correct].classList.add('correct');
  if (idx === q.correct) qcmState.score++;
  const expl = document.getElementById('qcm-explanation-box');
  expl.textContent = '📖 ' + q.expl;
  expl.style.display = 'block';
  const btn = document.getElementById('qcm-next-btn');
  const questions = CONTENU_CHAPITRES[chapitreActif].qcm;
  btn.textContent = qcmState.current < questions.length - 1 ? 'Question suivante →' : 'Voir les résultats →';
  btn.style.display = 'block';
}

function qcmNextQuestion() {
  const questions = CONTENU_CHAPITRES[chapitreActif].qcm;
  qcmState.current++;
  if (qcmState.current >= questions.length) {
    showQcmResult();
  } else {
    renderQcmQuestion();
  }
}

function showQcmResult() {
  document.getElementById('chapitre-qcm-active').style.display = 'none';
  document.getElementById('chapitre-qcm-result').style.display = 'block';
  const sc  = qcmState.score;
  const tot = CONTENU_CHAPITRES[chapitreActif].qcm.length;
  const pct = Math.round((sc / tot) * 100);
  const succes = pct >= 70;
  document.getElementById('qcm-result-ring').textContent = sc + '/' + tot;
  document.getElementById('qcm-result-ring').style.borderColor = succes ? 'var(--green)' : 'var(--red)';
  document.getElementById('qcm-result-title').textContent = pct >= 80 ? '🎉 Excellent !' : succes ? '👍 Bien joué !' : '📚 À retravailler…';
  document.getElementById('qcm-result-sub').textContent = sc + ' bonne' + (sc>1?'s':'') + ' réponse' + (sc>1?'s':'') + ' sur ' + tot + ' — ' + pct + '%';
  const msg = document.getElementById('qcm-result-msg');
  const continueBtn = document.getElementById('qcm-continue-btn');
  if (succes) {
    msg.textContent = '✓ Score suffisant — tu peux passer à l\'exercice pratique !';
    msg.style.color = 'var(--green)';
    continueBtn.style.display = 'inline-flex';
  } else {
    msg.textContent = '70% requis. Relis le cours et retente le QCM — pas de limite !';
    msg.style.color = 'var(--gold)';
    continueBtn.style.display = 'none';
  }
}

// ── EXERCICE PRATIQUE ─────────────────────────────────
function startExercice() {
  const contenu = CONTENU_CHAPITRES[chapitreActif];
  if (!contenu || !contenu.exercice) return;
  exoState = { current: 0, score: 0, answered: false };
  renderExoQuestion();
}

function renderExoQuestion() {
  const exo = CONTENU_CHAPITRES[chapitreActif].exercice;
  const q   = exo.questions[exoState.current];
  const tot = exo.questions.length;
  const letters = ['A','B','C','D'];
  document.getElementById('exo-body').innerHTML = `
    <div class="exo-header">
      <div>
        <div class="section-title" style="margin:0 0 4px;">${exo.titre}</div>
        <div style="font-size:13px;color:var(--text2);max-width:680px;line-height:1.5;">${exo.consigne}</div>
      </div>
      <button class="back-btn" style="flex-shrink:0;" onclick="showCoursView('theory')">📖 Revoir le cours</button>
    </div>
    <div class="quiz-container" style="margin-top:24px;">
      <div class="quiz-header">
        <span class="quiz-step">Situation ${exoState.current + 1} / ${tot}</span>
        <div class="quiz-prog-bar"><div class="quiz-prog-fill" style="width:${(exoState.current/tot)*100}%"></div></div>
        <span class="quiz-step">Score : ${exoState.score}</span>
      </div>
      <div class="question-card">
        <div class="question-xp" style="background:rgba(45,212,191,0.08);border-color:rgba(45,212,191,0.2);color:var(--teal);">📋 Mise en situation</div>
        <div class="question-text">${q.q}</div>
        <div class="options-grid">
          ${q.opts.map((opt, i) => `<button class="option-btn" onclick="selectExoAnswer(${i})" id="exo-opt-${i}"><span class="opt-letter">${letters[i]}</span>${opt}</button>`).join('')}
        </div>
        <div class="explanation-box" id="exo-explanation-box"></div>
        <button class="next-btn" id="exo-next-btn" style="display:none;" onclick="exoNextQuestion()"></button>
      </div>
    </div>`;
  exoState.answered = false;
}

function selectExoAnswer(idx) {
  if (exoState.answered) return;
  exoState.answered = true;
  const q = CONTENU_CHAPITRES[chapitreActif].exercice.questions[exoState.current];
  const btns = document.querySelectorAll('#exo-body .option-btn');
  btns.forEach(b => b.disabled = true);
  btns[idx].classList.add(idx === q.correct ? 'correct' : 'wrong');
  if (idx !== q.correct) btns[q.correct].classList.add('correct');
  if (idx === q.correct) exoState.score++;
  document.getElementById('exo-explanation-box').textContent = '📖 ' + q.expl;
  document.getElementById('exo-explanation-box').style.display = 'block';
  const btn = document.getElementById('exo-next-btn');
  const tot = CONTENU_CHAPITRES[chapitreActif].exercice.questions.length;
  btn.textContent = exoState.current < tot - 1 ? 'Situation suivante →' : 'Voir les résultats →';
  btn.style.display = 'block';
}

function exoNextQuestion() {
  const tot = CONTENU_CHAPITRES[chapitreActif].exercice.questions.length;
  exoState.current++;
  if (exoState.current >= tot) {
    showExoResult();
  } else {
    renderExoQuestion();
  }
}

function showExoResult() {
  const sc  = exoState.score;
  const tot = CONTENU_CHAPITRES[chapitreActif].exercice.questions.length;
  const pct = Math.round((sc / tot) * 100);
  const succes = pct >= 70;
  const contenu = CONTENU_CHAPITRES[chapitreActif];
  document.getElementById('exo-body').innerHTML = `
    <div class="result-screen" style="display:block;">
      <div class="result-score-ring" style="border-color:${succes?'var(--green)':'var(--red)'};">${sc}/${tot}</div>
      <div class="result-title">${pct>=80?'🎉 Excellent !':succes?'👍 Bien joué !':'📚 À retravailler…'}</div>
      <div class="result-sub">${sc} bonne${sc>1?'s':''} réponse${sc>1?'s':''} sur ${tot} — ${pct}%</div>
      <div class="result-xp-earned" style="color:${succes?'var(--green)':'var(--gold)'};">
        ${succes ? '✓ Exercice validé — chapitre complété !' : '70% requis — relis le cours et réessaie, sans limite !'}
      </div>
      <br>
      ${succes ? '' : `<button class="replay-btn" onclick="startExercice()">↺ Recommencer l'exercice</button>
                       <button class="replay-btn" onclick="showCoursView('theory')">📖 Revoir le cours</button>`}
      ${succes ? `<button class="replay-btn" onclick="startExercice()">↺ Recommencer</button>
                  <button class="cta-btn" onclick="validerChapitreEtRetour(${chapitreActif}, '${contenu.titre}')">🏆 Valider le chapitre →</button>` : ''}
    </div>`;
}

function validerChapitreEtRetour(id, titre) {
  validerChapitre(id, titre);
  showCoursView('list');
  renderChapitresList();
}

// ── QUIZ PAGE (onglet Quiz libre) ─────────────────────
const questions = [
  {
    q: "Qu'est-ce que le 'spread' sur un marché financier ?",
    opts: ["Le taux d'intérêt annuel d'une obligation","La différence entre le prix Bid et le prix Ask","La commission prélevée par un broker","La volatilité historique d'un actif"],
    correct: 1,
    expl: "Le spread est la différence entre le prix d'achat (Ask) et le prix de vente (Bid). C'est la principale source de revenus des market makers et un coût direct pour le trader. Plus le spread est faible, plus le marché est liquide."
  },
  {
    q: "Un chandelier 'Doji' en fin de tendance haussière indique généralement…",
    opts: ["Une accélération de la hausse","Une continuation de la tendance","Une indécision pouvant signaler un retournement","Une opportunité d'achat immédiate"],
    correct: 2,
    expl: "Le Doji (Open ≈ Close) matérialise l'équilibre entre acheteurs et vendeurs. Après une tendance prononcée, il signale que la pression directionnelle s'essouffle. Ce n'est pas un signal de vente en soi, mais une alerte à surveiller les confirmations suivantes."
  },
  {
    q: "Le 'ratio risque/récompense' (R/R) de 1:3 signifie que…",
    opts: ["On risque 3€ pour gagner 1€","On risque 1€ pour en gagner 3€","On a 3 fois plus de chances de gagner que de perdre","On investit 3 fois son capital initial"],
    correct: 1,
    expl: "Un ratio R/R de 1:3 signifie qu'on accepte de perdre 1 unité (stop-loss) pour cibler un gain de 3 unités (take-profit). Avec ce ratio, même avec seulement 35% de trades gagnants, on peut être profitable sur la durée — c'est le principe fondamental du risk management."
  },
  {
    q: "Sur le marché Forex, 'EUR/USD = 1.0842' signifie…",
    opts: ["1 USD vaut 1.0842 EUR","1 EUR vaut 1.0842 USD","L'EUR a progressé de 1.0842% dans la journée","Il faut 1.0842 USD pour acheter 100 EUR"],
    correct: 1,
    expl: "En forex, la paire EUR/USD indique combien d'USD (devise cotée) vaut 1 EUR (devise de base). EUR/USD = 1.0842 → 1 euro s'échange contre 1.0842 dollars américains."
  },
  {
    q: "Qu'est-ce qu'un 'support' en analyse technique ?",
    opts: ["Un niveau de prix où la pression vendeuse est historiquement forte","Un niveau de prix où la demande est historiquement assez forte pour stopper la baisse","Le volume moyen d'un actif sur 20 séances","Une ligne de tendance haussière à long terme"],
    correct: 1,
    expl: "Un support est une zone de prix où la demande (acheteurs) a suffisamment de force pour stopper ou inverser une tendance baissière. Visuellement, c'est un plancher que le prix a testé plusieurs fois sans le franchir. Plus il a été testé, plus il est 'solide'."
  }
];

let quizState = { current: 0, score: 0, answered: false };

function startQuiz() {
  quizState = { current: 0, score: 0, answered: false };
  document.getElementById('quiz-active').style.display = 'block';
  document.getElementById('quiz-result').style.display = 'none';
  renderQuestion();
}

function renderQuestion() {
  const q = questions[quizState.current];
  const pct = (quizState.current / questions.length) * 100;
  document.getElementById('quiz-prog').style.width = pct + '%';
  document.getElementById('quiz-step-label').textContent = (quizState.current + 1) + ' / ' + questions.length;
  document.getElementById('quiz-score-label').textContent = 'Score : ' + quizState.score;
  document.getElementById('question-text').textContent = q.q;
  document.getElementById('explanation-box').style.display = 'none';
  document.getElementById('next-btn').style.display = 'none';
  const letters = ['A','B','C','D'];
  document.getElementById('options-grid').innerHTML = q.opts.map((opt, i) =>
    `<button class="option-btn" onclick="selectAnswer(${i})" id="opt-${i}">
      <span class="opt-letter">${letters[i]}</span>${opt}
    </button>`
  ).join('');
  quizState.answered = false;
}

function selectAnswer(idx) {
  if (quizState.answered) return;
  quizState.answered = true;
  const q = questions[quizState.current];
  const btns = document.querySelectorAll('.option-btn');
  btns.forEach(b => b.disabled = true);
  btns[idx].classList.add(idx === q.correct ? 'correct' : 'wrong');
  if (idx !== q.correct) btns[q.correct].classList.add('correct');
  if (idx === q.correct) {
    quizState.score++;
  }
  const expl = document.getElementById('explanation-box');
  expl.textContent = '📖 ' + q.expl;
  expl.style.display = 'block';
  document.getElementById('next-btn').style.display = 'block';
  document.getElementById('next-btn').textContent =
    quizState.current < questions.length - 1 ? 'Question suivante →' : 'Voir les résultats →';
}

function nextQuestion() {
  quizState.current++;
  if (quizState.current >= questions.length) {
    showQuizResult();
  } else {
    renderQuestion();
  }
}

function showQuizResult() {
  document.getElementById('quiz-active').style.display = 'none';
  document.getElementById('quiz-result').style.display = 'block';
  const sc = quizState.score;
  const tot = questions.length;
  const pct = Math.round((sc / tot) * 100);
  document.getElementById('result-ring').textContent = sc + '/' + tot;
  document.getElementById('result-ring').style.borderColor =
    pct >= 80 ? 'var(--green)' : pct >= 60 ? 'var(--gold)' : 'var(--red)';
  document.getElementById('result-title').textContent =
    pct >= 80 ? '🎉 Excellent !' : pct >= 60 ? '👍 Bien joué !' : '📚 À retravailler…';
  document.getElementById('result-sub').textContent =
    `${sc} bonne${sc>1?'s':''} réponse${sc>1?'s':''} sur ${tot} — ${pct}% de réussite`;
  const resultXpEl = document.getElementById('result-xp');
  if (pct >= 70) {
    resultXpEl.textContent = '✓ Score suffisant — chapitre validable !';
    resultXpEl.style.color = 'var(--green)';
  } else {
    resultXpEl.textContent = '70% requis pour valider — tu peux recommencer !';
    resultXpEl.style.color = 'var(--gold)';
  }
}

// ── SIMULATEUR ────────────────────────────────────────
let simState = {
  price: 174.50,
  priceHistory: [],
  time: 0,
  interval: null,
};

function initSimulator() {
  if (simState.interval) return;
  simState.priceHistory = [174.50];
  renderSimChart();
  simState.interval = setInterval(() => {
    const change = (Math.random() - 0.49) * 1.5;
    simState.price = Math.max(140, Math.min(220, simState.price + change));
    simState.priceHistory.push(simState.price);
    if (simState.priceHistory.length > 60) simState.priceHistory.shift();
    const pct = ((simState.price - 174.50) / 174.50 * 100);
    document.getElementById('sim-price').textContent = simState.price.toFixed(2);
    document.getElementById('sim-change').textContent = (pct >= 0 ? '+' : '') + pct.toFixed(2) + '%';
    document.getElementById('sim-change').className = 'sim-change ' + (pct >= 0 ? 'up' : 'down');
    updatePnl();
    updateEstCost();
    renderSimChart();
  }, 1200);

  document.getElementById('qty-input').addEventListener('input', updateEstCost);
  document.getElementById('order-type-select').addEventListener('change', function() {
    document.getElementById('limit-price-row').style.display = this.value === 'limit' ? 'block' : 'none';
  });
}

function updateEstCost() {
  const qty = parseInt(document.getElementById('qty-input').value) || 0;
  document.getElementById('est-cost').textContent = (qty * simState.price).toFixed(2) + ' €';
}

function updatePnl() {
  let pnl = 0;
  let posStr = '—';
  if (state.positions.AAPL) {
    const pos = state.positions.AAPL;
    pnl = (simState.price - pos.avgPrice) * pos.qty;
    posStr = pos.qty + ' × ' + pos.avgPrice.toFixed(2) + '€';
  }
  const portfolio = state.cash + (state.positions.AAPL ? state.positions.AAPL.qty * simState.price : 0);
  document.getElementById('pf-cash').textContent = state.cash.toFixed(2) + ' €';
  document.getElementById('pf-pos').textContent = posStr;
  document.getElementById('pf-pnl').textContent = (pnl >= 0 ? '+' : '') + pnl.toFixed(2) + ' €';
  document.getElementById('pf-pnl').style.color = pnl >= 0 ? 'var(--green)' : 'var(--red)';
  document.getElementById('pf-total').textContent = portfolio.toFixed(2) + ' €';
  document.getElementById('top-cash').textContent = portfolio.toFixed(0) + ' €';
  document.getElementById('dash-capital').textContent = portfolio.toFixed(0);
  const totalPnl = portfolio - 10000;
  document.getElementById('dash-pnl').textContent = 'PnL : ' + (totalPnl >= 0 ? '+' : '') + totalPnl.toFixed(2) + ' €';
  document.getElementById('dash-pnl').style.color = totalPnl >= 0 ? 'var(--green)' : 'var(--red)';
}

function executeTrade(side) {
  const qty = parseInt(document.getElementById('qty-input').value) || 0;
  if (qty <= 0) return;
  const cost = qty * simState.price;

  if (side === 'BUY') {
    if (cost > state.cash) { showToast('⚠️', 'Capital insuffisant', 'Réduire la quantité'); return; }
    state.cash -= cost;
    if (!state.positions.AAPL) state.positions.AAPL = { qty: 0, avgPrice: 0 };
    const pos = state.positions.AAPL;
    pos.avgPrice = (pos.avgPrice * pos.qty + simState.price * qty) / (pos.qty + qty);
    pos.qty += qty;
    if (state.trades.length === 0) showToast('🏅', 'Premier trade !', 'Continue à pratiquer.');
  } else {
    if (!state.positions.AAPL || state.positions.AAPL.qty < qty) {
      showToast('⚠️', 'Position insuffisante', 'Vous ne détenez pas assez d\'actions');
      return;
    }
    const pos = state.positions.AAPL;
    const pnl = (simState.price - pos.avgPrice) * qty;
    state.cash += cost;
    pos.qty -= qty;
    if (pos.qty === 0) delete state.positions.AAPL;
    showToast('📊', 'Position clôturée', (pnl >= 0 ? '+' : '') + pnl.toFixed(2) + '€ PnL');
  }

  state.trades.unshift({ side, qty, price: simState.price, time: new Date().toLocaleTimeString('fr-FR', {hour:'2-digit',minute:'2-digit'}) });
  renderTrades();
  updatePnl();
}

function renderTrades() {
  const body = document.getElementById('trades-body');
  if (state.trades.length === 0) {
    body.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text3);font-size:13px;">Aucun trade pour l\'instant.</div>';
    return;
  }
  body.innerHTML = state.trades.slice(0, 8).map(t =>
    `<div class="trade-row">
      <span class="trade-side-${t.side.toLowerCase()}">${t.side}</span>
      <span>AAPL</span>
      <span>${t.price.toFixed(2)} €</span>
      <span>${t.qty} actions</span>
      <span style="color:var(--text3)">${t.time}</span>
    </div>`
  ).join('');
}

function renderSimChart() {
  const canvas = document.getElementById('price-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.parentElement.clientWidth - 40 || 320;
  const H = 220;
  canvas.width = W; canvas.height = H;
  ctx.clearRect(0, 0, W, H);
  const data = simState.priceHistory;
  if (data.length < 2) return;
  const min = Math.min(...data) - 2;
  const max = Math.max(...data) + 2;
  const scaleY = v => H - 20 - ((v - min) / (max - min)) * (H - 40);
  const scaleX = i => 10 + (i / (data.length - 1)) * (W - 20);

  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = 10 + (i / 4) * (H - 40);
    ctx.beginPath(); ctx.moveTo(10, y); ctx.lineTo(W - 10, y); ctx.stroke();
  }

  // Line
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  const lastPrice = data[data.length - 1];
  const firstPrice = data[0];
  const isUp = lastPrice >= firstPrice;
  grad.addColorStop(0, isUp ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.beginPath();
  data.forEach((v, i) => {
    if (i === 0) ctx.moveTo(scaleX(0), scaleY(v));
    else ctx.lineTo(scaleX(i), scaleY(v));
  });
  const lastX = scaleX(data.length - 1);
  ctx.lineTo(lastX, H); ctx.lineTo(10, H); ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();

  ctx.beginPath();
  data.forEach((v, i) => {
    if (i === 0) ctx.moveTo(scaleX(0), scaleY(v));
    else ctx.lineTo(scaleX(i), scaleY(v));
  });
  ctx.strokeStyle = isUp ? 'rgba(34,197,94,0.9)' : 'rgba(239,68,68,0.9)';
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Last price label
  ctx.fillStyle = isUp ? '#22c55e' : '#ef4444';
  ctx.font = '500 11px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText(lastPrice.toFixed(2), W - 10, scaleY(lastPrice) - 6);
}

// ── INIT ──────────────────────────────────────────────
updateNiveauUI();
startQuiz();
