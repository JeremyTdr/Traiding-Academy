export default {
  id: 6,
  titre: 'Indicateurs : RSI, MACD & Bollinger',
  module: 'Module 2 — Lire les marchés',
  duree: '~18 min',
  sections: [
    'Le RSI : force relative',
    'Le MACD : momentum et signal',
    'Les Bandes de Bollinger : volatilité',
    'Combiner les indicateurs',
    "Le piège de l'overloading",
  ],
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
  <li><strong>Croisement MACD/Signal</strong> : MACD croise au-dessus du Signal → signal haussier.</li>
  <li><strong>Passage de la ligne zéro</strong> : MACD au-dessus de 0 = tendance haussière.</li>
  <li><strong>Divergence MACD</strong> : comme pour le RSI, les divergences entre prix et MACD sont des signaux précieux.</li>
</ul>
<div class="highlight-box">
  ⚠️ <strong>Lag important :</strong> le MACD est un indicateur retardé (lagging). Les croisements arrivent après que le mouvement a commencé. Utile pour confirmer une tendance, moins pour anticiper les retournements exacts.
</div>

<h2>3. Les Bandes de Bollinger</h2>
<p>Les <span class="term">Bandes de Bollinger</span> (John Bollinger) encadrent le prix avec une bande centrale (MM20) et deux bandes à ±2 écarts-types.</p>
<div class="formula">Bande centrale = MM(20) — Bande haute = MM(20) + 2σ — Bande basse = MM(20) − 2σ</div>
<p>Statistiquement, ~95% des prix restent entre les deux bandes. Quand le prix sort des bandes, c'est exceptionnel.</p>
<ul>
  <li><strong>Squeeze (compression)</strong> : les bandes se rapprochent fortement → volatilité en baisse → explosion imminente.</li>
  <li><strong>Expansion</strong> : les bandes s'écartent → fort mouvement directionnel en cours.</li>
  <li><strong>Marche sur la bande</strong> : en tendance forte, le prix peut "marcher" sur la bande haute sans que ce soit un signal de vente.</li>
</ul>

<h2>4. Combiner les indicateurs intelligemment</h2>
<p>Chaque indicateur a ses forces et ses failles. La combinaison efficace :</p>
<ul>
  <li><strong>Tendance</strong> (MACD, moyennes mobiles) + <strong>Momentum/force</strong> (RSI) + <strong>Volatilité</strong> (Bollinger) = approche complète.</li>
  <li>Exemple : RSI en survente (30) + croisement MACD haussier + prix sur bande basse de Bollinger et sur un support → forte confluence.</li>
</ul>

<h2>5. Le piège de l'overloading</h2>
<p>Trop d'indicateurs = paralysie analytique. Ils finissent par se contredire ou confirmer en boucle les mêmes informations.</p>
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
      expl: "Divergence haussière : le prix continue de baisser (nouveau plus bas) mais le RSI ne suit pas — il fait un creux plus élevé. Cela signifie que la force des vendeurs s'affaiblit. C'est un signal précurseur de retournement haussier."
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
      expl: "Quand les bandes se rapprochent fortement, la volatilité est au plus bas. Les marchés passent des phases de compression à des phases d'expansion. Un squeeze signifie : quelque chose se prépare. On surveille la direction de la cassure pour trader dans ce sens."
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
      expl: "Le MACD standard : Ligne MACD = MME(12) − MME(26). Ligne Signal = MME(9) de la ligne MACD. L'Histogramme = Ligne MACD − Ligne Signal."
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
      expl: "L'approche équilibrée : tendance (MACD/MA), momentum (RSI), volatilité (Bollinger) — chaque indicateur apporte une info différente et évite les redondances. Au-delà de 3-4 indicateurs, tu tombes dans la 'paralysie analytique'."
    },
  ],
  exercice: {
    titre: 'Lecture multi-indicateurs',
    consigne: "Tu analyses une action : prix sur un support majeur à 45 €, RSI à 32 (en remontée depuis 28), MACD venant de croiser à la hausse sa ligne Signal, Bandes de Bollinger en début d'expansion haussière.",
    questions: [
      {
        q: "Combien de signaux bullish confluents peux-tu identifier dans cette situation ?",
        opts: ["1 signal", "2 signaux", "3 signaux", "4 signaux ou plus"],
        correct: 3,
        expl: "4 signaux confluents : (1) Support majeur à 45 €. (2) RSI en survente et en remontée — momentum haussier revient. (3) Croisement MACD haussier. (4) Bollinger en expansion haussière. Cette confluence est rare et constitue une setup de qualité."
      },
      {
        q: "Le RSI est à 32, en remontée depuis 28. Que signifie ce mouvement ?",
        opts: [
          "Signal de vente — le RSI était trop bas",
          "Signal neutre — le RSI n'a pas encore atteint 50",
          "Signe que le momentum des vendeurs s'affaiblit et que les acheteurs reprennent de la force",
          "Divergence baissière confirmée"
        ],
        correct: 2,
        expl: "Un RSI qui sort de la zone de survente (remonte depuis < 30) signale que la pression vendeuse s'atténue. Ce n'est pas le simple fait d'être à 32 qui compte, c'est le rebond depuis 28 qui est significatif — le momentum change de direction."
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
        expl: "Le stop logique se place sous le support (zone d'invalidation de la thèse). Si le support à 45 € est cassé, la thèse est fausse. Placer le stop à ~43,50 € laisse un peu de marge tout en invalidant clairement la setup si cassé. Un stop existe toujours — même avec 4 signaux confluents."
      },
    ],
  },
}
