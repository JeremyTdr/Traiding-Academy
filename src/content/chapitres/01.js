export default {
  id: 1,
  titre: 'Les marchés financiers & leurs acteurs',
  module: 'Module 1 — Fondamentaux',
  duree: '~15 min',
  sections: [
    'Les grandes familles de marchés',
    'Les acteurs : qui achète et qui vend ?',
    "Comment s'organise un marché ?",
    'Le rôle des bourses et brokers',
  ],
  cours: `
<h1>Les marchés financiers & leurs acteurs</h1>
<p class="module-tag">Module 1 — Fondamentaux · 15 min de lecture</p>

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
    titre: "Identifier les acteurs et les marchés",
    consigne: "Pour chaque situation décrite, identifie le type d'acteur et/ou le marché concerné. Tu peux consulter le cours à tout moment.",
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
        expl: "Un fonds de pension a des engagements à très long terme (payer des retraites dans 20-30 ans). Il privilégie donc la sécurité et la stabilité — obligations d'État, grandes capitalisations boursières, immobilier."
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
        expl: "En achetant, tu es 'preneur de liquidité' : tu achètes au prix Ask (52,45€ × 100 = 5 245€). Le spread de 0,05€ × 100 = 5€ est ton coût implicite d'entrée."
      },
    ],
  },
}
