export default {
  id: 12,
  titre: 'CFD & produits structurés',
  module: 'Module 4 — Avancé',
  duree: '~20 min',
  sections: [
    'Qu\'est-ce qu\'un CFD ?',
    'Avantages des CFD : levier, short, multi-marchés',
    'Risques CFD : levier, swap, appel de marge',
    'Produits structurés : turbos, warrants, certificats',
    'Réglementation ESMA et limites de levier',
    'CFD vs actions directes : quand choisir quoi ?',
  ],
  cours: `
<h1>CFD & Produits Structurés</h1>
<p class="module-tag">Module 4 — Avancé</p>

<h2>1. Qu'est-ce qu'un CFD ?</h2>
<p>Un <span class="term">CFD (Contract for Difference)</span> est un contrat entre un trader et un broker qui permet de spéculer sur la variation de prix d'un actif sous-jacent (action, indice, matière première, crypto, forex) <strong>sans jamais en détenir la propriété réelle</strong>.</p>
<p>Le gain ou la perte est calculé sur la différence entre le prix d'ouverture et le prix de clôture du contrat, multiplié par la quantité tradée.</p>
<div class="formula">
Résultat CFD = (Prix de clôture − Prix d'ouverture) × Nombre de contrats × Taille du contrat
Exemple : achat de 100 CFD Apple à 180 $, revendu à 190 $.
Gain = (190 − 180) × 100 = 1 000 $ (avant frais)
</div>
<p><strong>Différence clé avec une action réelle :</strong> acheter un CFD Apple ne vous donne aucun droit de vote, aucun dividende réel (un ajustement équivalent peut être versé selon le broker), aucune possession d'actif. Vous tradez uniquement la performance prix.</p>

<h2>2. Avantages des CFD</h2>
<p><span class="term">Effet de levier</span> : c'est l'atout principal du CFD. Avec un levier de 1:10, 1 000 € de capital permet de contrôler une position de 10 000 €. Chaque variation de 1% sur l'actif sous-jacent génère un gain ou une perte de 10% sur le capital engagé.</p>
<div class="formula">
Capital requis (marge) = Valeur nominale de la position / Levier
Exemple : position de 10 000 € sur un indice avec levier 1:20
Marge requise = 10 000 / 20 = 500 €
</div>
<p><span class="term">Positions short</span> : les CFD permettent de vendre un actif sans le posséder. Si vous anticipez une baisse de l'action LVMH de 800 € à 750 €, vous ouvrez un CFD de vente. La baisse devient un profit. C'est impossible avec des actions en direct (sauf via un PEA-PME ou compte-titres avec vente à découvert, complexe et coûteux).</p>
<p><span class="term">Accès multi-marchés</span> : un seul compte CFD donne accès à des milliers d'actifs : actions mondiales, indices (CAC40, S&P500, DAX), matières premières (or, pétrole), forex (EUR/USD), cryptos — sans changer de courtier ni de devise.</p>
<div class="highlight-box">
<strong>Synthèse des avantages CFD :</strong>
1. Levier : amplification des gains avec un capital réduit
2. Short : profiter des baisses sans emprunt complexe
3. Multi-marchés : tout depuis un seul compte
4. Pas de frais de garde sur les actifs sous-jacents
5. Flexibilité : positions intrajournalières sans frais de règlement-livraison
</div>

<h2>3. Risques CFD : les points critiques</h2>
<p>Le levier est à double tranchant. S'il amplifie les gains, il amplifie également les pertes dans les mêmes proportions.</p>
<div class="formula">
Position de 10 000 € (levier 1:10, marge de 1 000 €)
Baisse de 10% du sous-jacent → Perte de 1 000 €
→ Votre mise initiale est intégralement perdue
Baisse de 15% → Perte de 1 500 € (perte supérieure à la mise)
</div>
<p><span class="term">Frais overnight (swap)</span> : les CFD sont des produits à effet de levier financé. Conserver une position ouverte du soir au lendemain génère un <strong>coût de financement journalier</strong>, appelé swap ou rollover. Ce coût est calculé sur la valeur nominale totale de la position, pas sur la marge.</p>
<div class="formula">
Swap journalier approximatif = Valeur nominale × Taux d'intérêt annuel / 365
Position longue de 10 000 € sur action, taux broker = 5% annuel
Swap/jour ≈ 10 000 × 0,05 / 365 ≈ 1,37 €/jour
Sur 30 jours → 41 € de frais de financement (hors variation de prix)
</div>
<p>Pour le swing trading ou les positions longues durées, ces frais peuvent éroder significativement le rendement. <strong>Les CFD sont principalement des instruments de court terme.</strong></p>
<p><span class="term">Appel de marge (Margin Call)</span> : si la position évolue défavorablement et que le capital disponible passe en dessous du seuil de marge minimum exigé par le broker, ce dernier envoie un appel de marge. Si le trader ne reconstitue pas la marge rapidement, le broker <strong>ferme de force les positions</strong>, cristallisant la perte.</p>
<div class="highlight-box">
<strong>Les 3 risques majeurs à retenir :</strong>
1. Levier : une position peut perdre plus que le capital de marge engagé
2. Swap overnight : coût quotidien sur la valeur nominale — pas adapté au long terme
3. Appel de marge : clôture forcée par le broker si la marge est insuffisante
Statistique ESMA : 74 à 89% des comptes CFD retail perdent de l'argent (chiffre affiché obligatoirement par les brokers régulés).
</div>

<h2>4. Produits structurés : turbos, warrants, certificats</h2>
<p>Les <span class="term">produits structurés</span> sont des instruments émis par des banques ou établissements financiers. Ils offrent une exposition à effet de levier mais avec des mécanismes différents des CFD.</p>
<p><span class="term">Turbos (ou knock-out products)</span> : produits à levier incorporé avec une <strong>barrière désactivante</strong>. Si le sous-jacent touche cette barrière, le produit expire immédiatement sans valeur (ou avec une valeur résiduelle faible). Le levier est fixé à l'émission. Plus la barrière est proche du cours, plus le levier est élevé.</p>
<ul>
  <li><strong>Turbo call</strong> : spécule sur la hausse du sous-jacent.</li>
  <li><strong>Turbo put</strong> : spécule sur la baisse du sous-jacent.</li>
  <li>Exemple : Turbo call CAC40, barrière à 7 000, cours actuel 7 500. Levier ≈ 15. Une hausse de 1% du CAC40 génère un gain d'environ 15% sur le turbo.</li>
</ul>
<p><span class="term">Warrants</span> : options émises par des banques, négociables en Bourse. Donnent le droit (pas l'obligation) d'acheter (call) ou vendre (put) un actif à un prix défini (strike) jusqu'à une date d'expiration. Intègrent une valeur temps qui se dégrade (theta decay).</p>
<p><span class="term">Certificats</span> : grande famille de produits (certificats bonus, express, discount, airbag...). Offrent des profils de rendement conditionnels selon les conditions de marché, souvent avec une protection partielle du capital. Plus adaptés à une logique d'investissement qu'à la spéculation pure.</p>
<div class="highlight-box">
<strong>Comparatif rapide :</strong>
CFD : flexible, sans expiration fixe, frais overnight, régulé ESMA
Turbos : barrière désactivante, fort levier, coté en Bourse, pas de swap
Warrants : expiration définie, valeur temps, plus complexes à valoriser
Certificats : profils variés, souvent avec protection capital partielle
</div>

<h2>5. Réglementation ESMA et limites de levier</h2>
<p>L'<span class="term">ESMA (European Securities and Markets Authority)</span> a introduit en 2018 des règles strictes limitant les leviers accessibles aux clients <strong>retail</strong> sur les CFD. Ces mesures visent à protéger les investisseurs particuliers.</p>
<div class="formula">
Limites de levier ESMA pour les clients retail :
Forex majeurs (EUR/USD, GBP/USD...) : 1:30
Indices majeurs (CAC40, S&P500) : 1:20
Or et indices mineurs : 1:10
Actions individuelles : 1:5
Crypto-actifs : 1:2
</div>
<p>Les <span class="term">clients professionnels</span> peuvent accéder à des leviers plus élevés (jusqu'à 1:200 chez certains brokers), mais doivent remplir des critères stricts : patrimoine financier > 500 000 €, expérience professionnelle ou volume de trades élevé. Ce statut implique la perte de certaines protections comme la protection du solde négatif.</p>
<div class="highlight-box">
<strong>Protection du solde négatif :</strong> depuis la réglementation ESMA, les brokers régulés UE doivent garantir que le client retail ne peut pas perdre plus que son dépôt. Si une position se clôture à un montant supérieur au solde disponible, le broker absorbe la différence. Cette protection ne s'applique PAS aux clients professionnels.
</div>

<h2>6. CFD vs actions directes : quand choisir quoi ?</h2>
<p>Le choix entre CFD et achat d'actions en direct dépend de l'horizon d'investissement, de l'objectif et du profil de risque.</p>
<ul>
  <li><strong>CFD recommandé pour :</strong> trading court terme (day trading, swing trading < 2 semaines), spéculation sur la baisse (short), accès rapide à plusieurs marchés, utilisation du levier avec gestion stricte du risque.</li>
  <li><strong>Actions directes recommandées pour :</strong> investissement long terme (> 6 mois), perception des dividendes réels, droits d'actionnaire, fiscalité avantageuse via PEA en France (exonération d'impôts après 5 ans), absence de frais overnight.</li>
</ul>
<div class="formula">
Simulation comparative — position de 5 000 € sur action sur 12 mois :
Actions directes : frais de courtage ≈ 10 € aller-retour. Dividende perçu si détenu.
CFD (levier 1:1) : frais overnight ≈ 5% × 5 000 / 365 × 365 ≈ 250 €/an.
Sur 12 mois, les CFD sans levier coûtent 250 € de plus que les actions.
Conclusion : pour du long terme sans levier, les actions directes sont supérieures.
</div>
<div class="highlight-box">
<strong>Règle de décision simple :</strong>
Horizon inférieur à 1-2 semaines, levier souhaité, ou position short : CFD
Horizon supérieur à 1 mois, conviction long terme, dividendes : actions directes
En cas de doute sur l'horizon → actions directes (pas de risque de margin call, pas de swap)
</div>
  `,
  qcm: [
    {
      q: "Quelle est la principale différence entre un CFD sur action et l'achat d'une action réelle ?",
      opts: [
        "Le CFD génère un rendement supérieur dans tous les cas",
        "L'achat d'une action réelle permet d'utiliser un levier plus élevé",
        "Le CFD ne confère pas la propriété de l'actif sous-jacent : pas de droit de vote, pas de dividende réel",
        "Les CFD sont réservés aux investisseurs institutionnels"
      ],
      correct: 2,
      expl: "Un CFD est un contrat sur la différence de prix, pas un titre de propriété. Le trader n'est pas actionnaire et ne perçoit pas les dividendes réels (un ajustement peut être versé mais ce n'est pas un dividende au sens juridique). C'est la différence fondamentale avec un achat en direct."
    },
    {
      q: "Selon la réglementation ESMA, quel levier maximum peut utiliser un client retail sur une paire forex majeure (EUR/USD) ?",
      opts: [
        "1:2",
        "1:10",
        "1:30",
        "1:100"
      ],
      correct: 2,
      expl: "L'ESMA fixe un levier maximum de 1:30 pour les paires forex majeures pour les clients retail. Les leviers varient selon l'actif : 1:20 pour les indices majeurs, 1:5 pour les actions, 1:2 pour les cryptos. Ces limites visent à protéger les investisseurs particuliers des pertes excessives."
    },
    {
      q: "Un trader détient un CFD long (achat) d'une valeur nominale de 20 000 € pendant 30 jours. Le taux de financement de son broker est de 6% par an. Quel est le coût de financement approximatif ?",
      opts: [
        "Environ 3 €",
        "Environ 10 €",
        "Environ 99 €",
        "0 € — les CFD n'ont pas de frais de financement"
      ],
      correct: 2,
      expl: "Swap = 20 000 × 0,06 / 365 × 30 ≈ 98,6 €, soit environ 99 €. Le swap est calculé sur la valeur nominale totale (pas sur la marge). Ce coût est souvent sous-estimé par les débutants, et peut éroder les gains sur des positions conservées plusieurs semaines."
    },
    {
      q: "Qu'est-ce qu'une barrière désactivante dans un turbo ?",
      opts: [
        "Un niveau de prix au-delà duquel le turbo multiplie ses gains",
        "Un seuil de prix auquel le produit expire immédiatement sans valeur si le sous-jacent le touche",
        "Une protection du capital garantissant un remboursement minimal",
        "Le prix d'exercice permettant de convertir le turbo en action"
      ],
      correct: 1,
      expl: "La barrière désactivante (knock-out) est le niveau de prix auquel le turbo s'annule immédiatement. Si le sous-jacent touche ce niveau, le produit expire et le trader perd généralement l'intégralité de sa mise (ou récupère une valeur résiduelle très faible). Plus la barrière est proche du cours actuel, plus le levier est élevé — et plus le risque de désactivation est fort."
    },
    {
      q: "La protection du solde négatif garantie par les brokers régulés UE s'applique à :",
      opts: [
        "Tous les clients, qu'ils soient retail ou professionnels",
        "Uniquement aux clients professionnels",
        "Uniquement aux clients retail",
        "À tous les produits financiers, y compris les warrants"
      ],
      correct: 2,
      expl: "La protection du solde négatif est une exigence réglementaire ESMA qui s'applique exclusivement aux clients retail. Un client professionnel bénéficie de leviers plus élevés mais perd cette protection — il peut donc perdre plus que son dépôt initial en cas de mouvement violent de marché."
    },
  ],
  exercice: {
    consigne: "Tu es trader actif avec un compte de 10 000 € chez un broker régulé UE. Réponds à chaque situation pratique en choisissant la meilleure décision.",
    questions: [
      {
        q: "Tu anticipes une forte baisse du titre Tesla dans les 3 prochains jours suite à des résultats décevants. Ton capital est de 10 000 €. Quelle est la meilleure approche pour exprimer cette vue ?",
        opts: [
          "Acheter des actions Tesla en direct et les conserver — la baisse générera un profit automatiquement",
          "Ouvrir un CFD short (vente) sur Tesla en limitant l'exposition à 1-2% de risque maximum sur le trade",
          "Acheter un certificat bonus sur Tesla — il profite toujours des baisses",
          "Ne rien faire car shorter est interdit pour les clients retail en Europe"
        ],
        correct: 1,
        expl: "Pour profiter d'une baisse sur un horizon court (3 jours), le CFD short est l'outil adapté : accessible, peu de frais overnight sur 3 jours, et permet de vendre sans posséder le titre. Il faut limiter le risque (stop-loss défini, risque max 1-2% du capital soit 100-200 €). Les certificats bonus profitent des hausses ou de la stabilité, pas des baisses. Shorter en direct requiert des conditions particulières."
      },
      {
        q: "Tu as une conviction forte sur Total Energies pour les 18 prochains mois et souhaites investir 8 000 €. Tu hésites entre CFD (levier 1:1) et achat d'actions directes via ton PEA. Que choisis-tu ?",
        opts: [
          "CFD sans levier — même exposition, plus de flexibilité",
          "Actions en direct via le PEA — meilleure fiscalité après 5 ans, dividendes réels, pas de frais overnight",
          "CFD avec levier 1:5 — amplifier les gains sur 18 mois",
          "Turbos call — levier maximal sur une conviction longue durée"
        ],
        correct: 1,
        expl: "Pour un horizon de 18 mois, les actions en direct via PEA sont clairement supérieures. Raisons : (1) Dividendes réels perçus. (2) Fiscalité avantageuse PEA (exonération d'impôts après 5 ans). (3) Pas de frais overnight — sur 18 mois, le swap CFD coûterait ≈ 8 000 × 5% = 400 €. (4) Aucun risque de margin call. Le CFD sur 18 mois est un choix coûteux et risqué sans justification."
      },
      {
        q: "Tu ouvres un CFD long sur l'indice DAX40 : position nominale de 15 000 €, marge requise de 750 € (levier 1:20). Le DAX chute brutalement de 6%. Qu'est-ce qui se passe et quelle erreur as-tu faite ?",
        opts: [
          "Tu gagnes 6% sur ta marge soit +45 € — la baisse profite aux positions longues",
          "Ta position perd 900 € (6% × 15 000 €), soit 120% de ta marge initiale de 750 €. Tu reçois un appel de marge. Erreur : stop-loss absent et sizing disproportionné.",
          "La protection du solde négatif bloque la perte à 750 € automatiquement sans appel de marge",
          "Le levier 1:20 est interdit sur les indices par l'ESMA — ta position n'aurait pas dû être acceptée"
        ],
        correct: 1,
        expl: "Calcul : 6% × 15 000 € = 900 € de perte, soit 120% de la marge de 750 €. Le solde du compte passe en négatif théoriquement — la protection du solde négatif s'applique (le broker absorbe), mais tu perds toute ta marge. Un stop-loss à -2% (300 € de perte, soit 40% de la marge) aurait limité les dégâts. Le sizing était aussi trop élevé : une position de 15 000 € sur 10 000 € de capital, avec levier 20, expose à des pertes supérieures au capital. Le levier 1:20 est bien autorisé sur les indices majeurs pour les retail (limite ESMA)."
      },
    ]
  }
}
