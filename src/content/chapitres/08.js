export default {
  id: 8,
  titre: 'Stop-loss, take-profit & gestion du trade',
  module: 'Module 3 — Stratégies & Risk',
  duree: '~15 min',
  sections: [
    'Le stop-loss : définition et placement',
    'Les erreurs de stop classiques',
    'Le take-profit : stratégies de sortie',
    'La gestion active : trailing stop et sorties partielles',
    'Journal de trading',
  ],
  cours: `
<h1>Stop-loss, Take-profit & Gestion du Trade</h1>
<p class="module-tag">Module 3 — Stratégies & Risk</p>

<h2>1. Le stop-loss : définition et placement</h2>
<p>Le <span class="term">stop-loss</span> est un ordre de vente automatique déclenché si le prix atteint un niveau prédéfini. C'est ton "plan B" — la sortie si la thèse de trade est invalidée.</p>
<p><strong>Où placer son stop :</strong></p>
<ul>
  <li><strong>Sous un support</strong> (achat) ou au-dessus d'une résistance (vente à découvert) : le niveau logique d'invalidation de la thèse.</li>
  <li><strong>Sous la dernière mèche basse</strong> d'un chandelier de retournement.</li>
  <li><strong>Sous la droite de tendance haussière</strong> : cassure = tendance remise en cause.</li>
  <li>Toujours laisser un peu de marge (~0,5-1%) pour éviter les "stop hunting".</li>
</ul>
<div class="highlight-box">
  ⚠️ <strong>Stop ≠ target de loss</strong> : Le stop n'est pas placé là où "je peux me permettre de perdre X€". Il est placé là où la thèse est clairement fausse. Le sizing s'adapte à la distance du stop, pas l'inverse.
</div>

<h2>2. Les erreurs de stop classiques</h2>
<ul>
  <li><strong>Déplacer son stop dans la mauvaise direction</strong> (l'éloigner car "le prix va revenir") : la faute la plus coûteuse.</li>
  <li><strong>Stop trop serré</strong> : le prix fait un wick normal et touche le stop avant de repartir dans la bonne direction.</li>
  <li><strong>Pas de stop du tout</strong> : "je surveille et je coupe moi-même." L'émotion prend le dessus. Toujours utiliser un stop automatique.</li>
  <li><strong>Stop arbitraire</strong> (ex: -5% systématique) : non basé sur la structure du marché, souvent touché inutilement.</li>
</ul>

<h2>3. Le take-profit : stratégies de sortie</h2>
<p>Le <span class="term">take-profit</span> est l'objectif de gain. Plusieurs approches :</p>
<ul>
  <li><strong>Objectif fixe</strong> : basé sur le R/R cible (ex : stop à 3 € → TP à 6 € pour un R/R de 2:1).</li>
  <li><strong>Résistance suivante</strong> : le TP se place juste avant la prochaine résistance majeure.</li>
  <li><strong>Extension Fibonacci</strong> : les niveaux 1,618 ou 2,618 sont des cibles classiques.</li>
</ul>
<div class="highlight-box">
  🎯 <strong>Conseil terrain :</strong> je préfère sortir <em>juste avant</em> la résistance (ex : résistance à 80 € → TP à 79,50 €). Les autres traders placent leur TP exactement sur la résistance, créant une zone de vente. Sortir légèrement avant évite de rater la sortie.
</div>

<h2>4. Gestion active : trailing stop & sorties partielles</h2>
<p><span class="term">Trailing stop</span> : un stop qui suit le prix à la hausse. Si le prix monte de 10 € et ton trailing est de 3 €, le stop se déplace aussi. Protège les gains tout en laissant courir les bénéfices.</p>
<p><strong>Sorties partielles</strong> : technique courante des traders avancés :</p>
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
      expl: "Le stop se place là où la thèse est clairement invalidée : sous un support, sous la mèche d'un Hammer, sous la droite de tendance. Ce niveau structurel définit le stop, et la taille de position s'adapte à ce stop."
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
      expl: "Déplacer le stop dans la mauvaise direction, c'est trahir son plan de trade et laisser l'émotion prendre le dessus. Une perte de 1R peut devenir 3R, 5R, voire la ruine d'un compte."
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
      expl: "Les sorties partielles : première sortie au 1er objectif → tu récupères du capital et sécurises. Stop au break-even → tu ne peux plus perdre sur ce trade. Le reste court avec un trailing stop ou jusqu'au 2ème objectif."
    },
    {
      q: "Un trailing stop de 3 € sur une position achetée à 50 €. Si le prix monte à 58 €, où se trouve le stop ?",
      opts: ["47 € — stop initial", "50 € — break-even", "55 € — trailing actif", "58 € — prix actuel"],
      correct: 2,
      expl: "Trailing stop de 3 € : quand le prix atteint 58 €, le stop suit et se place à 58 − 3 = 55 €. Il ne descend jamais — il ne fait que monter avec le prix."
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
      expl: "Sans journal, tu travailles à l'aveugle. Avec un journal, tu analyses : quel setup fonctionne le mieux ? Quand perds-tu ? C'est ta boucle de feedback personnelle."
    },
  ],
  exercice: {
    titre: "Gestion d'un trade en cours",
    consigne: "Tu as acheté 50 actions à 60 €, avec un stop à 57 € et un objectif à 66 € (R/R 2:1). Le prix atteint maintenant 64 €.",
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
        expl: "Sortie partielle à 64 € : tu réalises un gain sur 25 actions × (64−60) = +100 €. Le stop au break-even protège les 25 restantes — tu ne peux plus perdre sur ce trade. Si le prix atteint 66 €, tu gagnes encore 25 × (66−60) = +150 €."
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
        expl: "Le prix à 61 € reste au-dessus du stop à 60 €. La position continue. Le stop au break-even agit comme un filet : tu ne peux pas perdre sur les 25 actions restantes."
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
        expl: "Un journal complet trace chaque décision : entrée, thèse (setup), gestion en cours, résultat final en € ET en R. L'analyse post-trade est la partie la plus précieuse : qu'est-ce qui a bien fonctionné ?"
      },
    ],
  },
}
