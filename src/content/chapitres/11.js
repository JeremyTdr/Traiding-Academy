export default {
  id: 11,
  titre: 'Options & Futures',
  module: 'Module 4 — Avancé',
  duree: '~20 min',
  sections: [
    'Les contrats à terme (Futures) : fondamentaux',
    'Les options : call, put, prime et strike',
    'Stratégies de base avec les options',
    'Futures : hedging vs spéculation',
    'Risques spécifiques : levier, thêta et liquidation forcée',
  ],
  cours: `
<h1>Options & Futures</h1>
<p class="module-tag">Module 4 — Avancé</p>

<h2>1. Les contrats à terme (Futures) : fondamentaux</h2>
<p>Un <span class="term">contrat à terme (Future)</span> est un accord standardisé entre deux parties pour acheter ou vendre un actif à un prix fixé aujourd'hui, à une date future déterminée. Contrairement à l'achat d'actions, le Future est un engagement ferme, pas une option.</p>
<p>Caractéristiques clés :</p>
<ul>
  <li><strong>Standardisation :</strong> la taille du contrat, la date d'expiration et la cotation sont fixées par la bourse (ex. : 1 contrat E-mini S&P 500 = 50 × valeur de l'indice).</li>
  <li><strong>Effet de levier :</strong> on ne paie qu'une marge (dépôt de garantie), souvent 5 à 10 % de la valeur notionnelle du contrat. Un mouvement de 1 % sur le sous-jacent peut représenter 10 à 20 % sur la marge déposée.</li>
  <li><strong>Règlement quotidien (mark-to-market) :</strong> les gains et pertes sont crédités ou débités chaque soir. Si la marge tombe sous le seuil minimal, un <span class="term">appel de marge</span> est déclenché.</li>
</ul>
<div class="formula">Exemple concret : Future sur pétrole brut (WTI). 1 contrat = 1 000 barils. Prix actuel : 80 $/baril. Valeur notionnelle : 80 000 $. Marge requise : ~4 000 $ (5 %). Si le pétrole monte à 82 $, gain = 2 000 $ sur 4 000 $ de marge déposée, soit +50 %.</div>

<h2>2. Les options : call, put, prime et strike</h2>
<p>Une <span class="term">option</span> est un contrat qui donne à l'acheteur le <strong>droit</strong> (mais non l'obligation) d'acheter ou de vendre un actif à un prix convenu avant ou à l'expiration. Le vendeur, lui, a l'<strong>obligation</strong> d'exécuter si l'acheteur exerce.</p>
<ul>
  <li><strong>Call :</strong> droit d'acheter l'actif au prix d'exercice. L'acheteur de call parie à la hausse.</li>
  <li><strong>Put :</strong> droit de vendre l'actif au prix d'exercice. L'acheteur de put parie à la baisse ou se protège.</li>
  <li><strong>Strike (prix d'exercice) :</strong> prix auquel le droit peut être exercé, fixé à la création du contrat.</li>
  <li><strong>Prime :</strong> coût de l'option, payé par l'acheteur au vendeur. C'est la perte maximale de l'acheteur si l'option expire sans valeur.</li>
  <li><strong>Expiration :</strong> date limite au-delà de laquelle l'option n'a plus de valeur. Les options américaines peuvent être exercées à tout moment avant l'expiration ; les options européennes uniquement à l'expiration.</li>
</ul>
<div class="formula">Exemple : Call Apple, strike 200 $, expiration dans 30 jours, prime = 5 $. Si Apple monte à 215 $, valeur intrinsèque = 15 $. Gain net = 15 $ - 5 $ (prime) = 10 $ par action, soit +200 % sur la prime investie. Si Apple reste sous 200 $, la prime de 5 $ est perdue intégralement.</div>
<div class="highlight-box">
  <strong>In the money / Out of the money :</strong> Un call est "in the money" (ITM) si le cours est au-dessus du strike. Il est "out of the money" (OTM) si le cours est en dessous. Un put est ITM si le cours est en dessous du strike. Les options OTM sont moins chères mais ont moins de probabilité d'expirer avec de la valeur.
</div>

<h2>3. Stratégies de base avec les options</h2>
<p><strong>Achat de call :</strong> stratégie haussière. Risque limité à la prime payée, gain potentiellement illimité. Idéale pour jouer une hausse forte sans immobiliser le capital d'un achat d'actions direct.</p>
<p><strong>Achat de put :</strong> stratégie baissière ou de protection. Risque limité à la prime. Un investisseur long sur des actions peut acheter des puts pour se couvrir contre une baisse — c'est l'équivalent d'une assurance de portefeuille.</p>
<p><strong>Covered call (vente d'option couverte) :</strong> stratégie de génération de revenus. Tu possèdes 100 actions Apple et tu vends un call OTM contre tes actions. Tu encaisses la prime immédiatement. En contrepartie, tu plafonnes ton gain si l'action monte fortement au-delà du strike.</p>
<div class="formula">Exemple covered call : Tu détiens 100 actions Apple à 200 $. Tu vends 1 call strike 210 $, prime = 3 $. Revenu immédiat : 300 $. Si Apple monte à 215 $, tes actions sont "appelées" à 210 $, ton gain est plafonné à 10 $ (capital) + 3 $ (prime) = 13 $/action. Si Apple stagne ou baisse légèrement, tu gardes la prime de 3 $ comme rendement additionnel.</div>
<ul>
  <li><strong>Avantage du covered call :</strong> génère des revenus réguliers sur un portefeuille passif.</li>
  <li><strong>Inconvénient :</strong> plafonnement à la hausse — si l'action explose, le gain supplémentaire va au vendeur du call.</li>
</ul>

<h2>4. Futures : hedging vs spéculation</h2>
<p>Les futures ont deux utilisations principales, diamétralement opposées dans leur logique :</p>
<p><span class="term">Hedging (couverture) :</span> utilisé par les acteurs économiques réels pour sécuriser un prix futur et éliminer l'incertitude. Un producteur de blé vend des futures blé pour garantir le prix de sa récolte à venir. Une compagnie aérienne achète des futures pétrole pour figer le prix du carburant. L'objectif n'est pas le profit sur le future, mais la stabilité opérationnelle.</p>
<p><span class="term">Spéculation :</span> les traders et fonds cherchent à profiter des variations de prix. Ils n'ont aucune intention de livrer ou de recevoir l'actif sous-jacent — ils clôturent leur position avant l'expiration. Le levier amplifie les gains et les pertes.</p>
<div class="highlight-box">
  <strong>La liquidité des futures profite aux deux parties :</strong> la présence massive de spéculateurs garantit la liquidité du marché. Sans spéculateurs, les hedgers auraient du mal à trouver une contrepartie rapide. C'est une relation symbiotique, même si les objectifs sont opposés.
</div>

<h2>5. Risques spécifiques : levier, thêta et liquidation forcée</h2>
<p><strong>Le risque de levier :</strong> l'effet de levier amplifie tout. Un future avec 10× de levier transforme un mouvement de 5 % sur le sous-jacent en une variation de 50 % sur la marge. La perte peut dépasser le capital initial déposé si des stop-loss ne sont pas en place.</p>
<p><span class="term">Le thêta (time decay) :</span> les options perdent de la valeur chaque jour qui passe, même si le sous-jacent ne bouge pas. Cette érosion temporelle s'accélère dans les dernières semaines avant l'expiration. C'est l'ennemi de l'acheteur d'options et l'allié du vendeur.</p>
<div class="formula">Exemple de thêta : Un call OTM acheté à 5 $ (90 jours avant expiration). À 60 jours : vaut ~3,80 $. À 30 jours : vaut ~2,20 $. À 10 jours : vaut ~0,80 $. Si le sous-jacent n'a pas bougé, l'acheteur a perdu 84 % de sa prime sans aucun mouvement adverse.</div>
<p><strong>La liquidation forcée :</strong> sur les futures, si la perte dépasse la marge disponible, le broker peut liquider la position automatiquement au prix du marché, sans attendre l'accord du trader. Sur certains marchés (crypto), les liquidations forcées en cascade peuvent amplifier les mouvements de prix de façon brutale.</p>
<ul>
  <li><strong>Règle de survie n°1 :</strong> ne jamais utiliser le levier maximum disponible. Taille de position en fonction du risque réel, pas de la capacité technique à ouvrir la position.</li>
  <li><strong>Règle de survie n°2 :</strong> pour les options achetées, tenir compte du thêta — un trade qui tarde à se développer voit sa probabilité de succès diminuer mécaniquement.</li>
  <li><strong>Règle de survie n°3 :</strong> les options peuvent expirer à zéro. Ne jamais investir dans des options un capital qu'on ne peut pas se permettre de perdre intégralement.</li>
</ul>
<div class="highlight-box">
  <strong>Résumé de la hiérarchie du risque :</strong> Actions au comptant — risque modéré. Options achetées — risque élevé mais limité à la prime. Futures avec levier — risque très élevé, pertes potentiellement supérieures au capital. Vente nue d'options — risque théoriquement illimité, réservée aux professionnels.
</div>
  `,
  qcm: [
    {
      q: "Quelle est la caractéristique fondamentale d'un contrat Future par rapport à une option ?",
      opts: [
        "Le Future donne un droit sans obligation, comme une option call",
        "Le Future est un engagement ferme des deux parties à acheter/vendre à une date et un prix fixés",
        "Le Future n'a pas d'effet de levier contrairement aux options",
        "Le Future ne peut pas être clôturé avant son expiration"
      ],
      correct: 1,
      expl: "Le Future est un contrat ferme et obligatoire pour les deux parties. L'option, elle, donne un droit (sans obligation) à l'acheteur. C'est la distinction fondamentale : le Future impose, l'option protège."
    },
    {
      q: "Un acheteur de call sur Tesla, strike 250 $, prime 8 $. Tesla monte à 270 $ à l'expiration. Quel est son gain net par action ?",
      opts: [
        "20 $",
        "12 $",
        "8 $",
        "270 $"
      ],
      correct: 1,
      expl: "Valeur intrinsèque à expiration : 270 $ - 250 $ (strike) = 20 $. On déduit la prime payée : 20 $ - 8 $ = 12 $ de gain net par action. Si Tesla était restée sous 250 $, la perte aurait été limitée aux 8 $ de prime."
    },
    {
      q: "Le thêta (time decay) affecte principalement :",
      opts: [
        "Les contrats Futures, dont la valeur diminue chaque jour",
        "Uniquement les options ITM (in the money)",
        "Les options — leur valeur temps s'érode chaque jour, indépendamment du mouvement du sous-jacent",
        "Les actions à dividende uniquement"
      ],
      correct: 2,
      expl: "Le thêta est spécifique aux options. Chaque jour qui passe, la valeur temps d'une option diminue — cette érosion s'accélère à l'approche de l'expiration. C'est l'ennemi des acheteurs d'options qui voient leur investissement se déprécier sans mouvement de marché."
    },
    {
      q: "Un producteur de blé qui vend des futures blé pour protéger sa récolte à venir pratique :",
      opts: [
        "De la spéculation directionnelle",
        "Un covered call sur matières premières",
        "Du hedging — il sécurise un prix futur pour éliminer l'incertitude sur ses revenus",
        "De l'arbitrage entre marchés"
      ],
      correct: 2,
      expl: "Le hedging consiste à utiliser les dérivés pour réduire ou éliminer un risque existant. Le producteur n'est pas là pour spéculer — il veut garantir un prix de vente pour sa production future et se prémunir d'une chute des cours."
    },
    {
      q: "Dans une stratégie de covered call, quel est le principal inconvénient pour le détenteur d'actions ?",
      opts: [
        "La perte potentielle est illimitée si le marché baisse fortement",
        "Le gain est plafonné si le sous-jacent monte au-delà du strike vendu",
        "La prime encaissée est toujours insuffisante pour couvrir le risque",
        "Il faut vendre les actions immédiatement après avoir vendu le call"
      ],
      correct: 1,
      expl: "En vendant un call couvert, le détenteur encaisse la prime mais s'engage à vendre ses actions au strike si elles montent au-delà. Il ne profite donc pas d'une hausse forte. En échange, la prime réduit son prix de revient et génère un revenu régulier."
    },
  ],
  exercice: {
    consigne: "Mets en pratique tes connaissances sur les options et les futures dans les situations suivantes.",
    questions: [
      {
        q: "Tu es trader et tu anticipes une forte hausse de Nvidia d'ici 45 jours, mais tu ne veux risquer que 500 €. Nvidia cote à 900 $. Quelle stratégie est la plus adaptée ?",
        opts: [
          "Acheter des actions Nvidia au comptant pour 500 €, soit environ 0,55 action",
          "Acheter un call Nvidia OTM (strike ~950 $, expiration 45 jours) pour une prime totale de ~500 €",
          "Vendre un put Nvidia pour encaisser la prime et bénéficier de la hausse",
          "Acheter un Future sur Nvidia avec 10× de levier pour maximiser l'exposition"
        ],
        correct: 1,
        expl: "L'achat de call est la stratégie adaptée : risque limité à la prime de 500 € (perte maximale en cas de baisse), levier naturel important si Nvidia monte. Acheter 0,55 action limiterait fortement les gains. Le Future avec 10× de levier dépasse largement le risque acceptable. La vente de put est une stratégie baissière/neutre, pas haussière."
      },
      {
        q: "Tu détiens 500 actions Total (TTE) à 60 €, soit 30 000 € de valeur. Tu anticipes une stagnation du titre dans les 30 prochains jours mais veux générer un revenu supplémentaire. Quelle stratégie utilises-tu ?",
        opts: [
          "Acheter des puts Total pour te protéger contre une baisse",
          "Vendre 5 calls couverts (strike 63 €, prime 1,20 €/action) sur tes 500 actions",
          "Acheter des calls Total pour profiter d'une éventuelle hausse",
          "Vendre tes 500 actions et acheter des futures Total"
        ],
        correct: 1,
        expl: "Le covered call est la stratégie idéale quand on est neutre à légèrement haussier. Tu encaisses 5 × 100 × 1,20 € = 600 € de prime immédiatement. Si Total reste sous 63 €, tu gardes actions + prime. Si Total monte au-delà de 63 €, tu vends à ce prix (gain plafonné mais augmenté de la prime)."
      },
      {
        q: "Tu es gérant d'un portefeuille de 100 000 € investi en actions françaises. Tu penses que le marché va baisser de 15 % dans les 3 prochains mois mais tu ne veux pas vendre tes positions. Quelle est la stratégie de couverture la plus directe ?",
        opts: [
          "Acheter des calls sur le CAC 40 pour compenser la baisse de ton portefeuille",
          "Vendre des futures CAC 40 pour couvrir ton exposition — un future short gagne si l'indice baisse",
          "Acheter davantage d'actions pour réduire ton prix de revient moyen",
          "Conserver ses positions sans couverture et attendre que le marché remonte"
        ],
        correct: 1,
        expl: "Vendre des futures CAC 40 (short) est la couverture directe d'un portefeuille actions français. Si le marché baisse de 15 %, les futures short génèrent un gain qui compense partiellement ou totalement la perte sur le portefeuille. C'est le principe du hedging : utiliser les dérivés pour neutraliser un risque existant."
      },
    ],
  },
}
