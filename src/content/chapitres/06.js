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

<svg viewBox="0 0 500 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;margin:16px 0;border-radius:8px;background:#0d1520;display:block">
  <!-- Axe RSI 0-100 -->
  <text x="20" y="18" font-size="10" fill="#00d4aa" font-family="IBM Plex Mono">RSI</text>
  <!-- Zones colorées -->
  <rect x="40" y="20" width="440" height="20" rx="2" fill="#ff4d4d" opacity="0.15"/>
  <rect x="40" y="40" width="440" height="50" rx="0" fill="#1a2535" opacity="0.5"/>
  <rect x="40" y="90" width="440" height="20" rx="2" fill="#00c076" opacity="0.15"/>
  <!-- Labels zones -->
  <text x="46" y="34" font-size="9" fill="#ff4d4d" font-family="IBM Plex Sans">Surachat (70-100) — prudence vente</text>
  <text x="46" y="58" font-size="9" fill="#aaa" font-family="IBM Plex Sans">Zone neutre (30-70)</text>
  <text x="200" y="68" font-size="8" fill="#f59e0b" font-family="IBM Plex Mono">50 — ligne de partage</text>
  <text x="46" y="105" font-size="9" fill="#00c076" font-family="IBM Plex Sans">Survente (0-30) — prudence achat</text>
  <!-- Ligne 50 -->
  <line x1="40" y1="65" x2="480" y2="65" stroke="#f59e0b" stroke-width="0.8" stroke-dasharray="4,3" opacity="0.5"/>
  <!-- Ligne 70 -->
  <line x1="40" y1="40" x2="480" y2="40" stroke="#ff4d4d" stroke-width="1" stroke-dasharray="3,2" opacity="0.6"/>
  <text x="484" y="44" font-size="8" fill="#ff4d4d" font-family="IBM Plex Mono">70</text>
  <!-- Ligne 30 -->
  <line x1="40" y1="90" x2="480" y2="90" stroke="#00c076" stroke-width="1" stroke-dasharray="3,2" opacity="0.6"/>
  <text x="484" y="94" font-size="8" fill="#00c076" font-family="IBM Plex Mono">30</text>
  <!-- Courbe RSI exemple -->
  <polyline points="50,30 80,55 110,75 140,85 165,95 185,88 210,65 240,45 270,35 300,55 330,70 360,80 390,92 420,88 450,65 475,50" fill="none" stroke="#00d4aa" stroke-width="2" stroke-linejoin="round"/>
  <!-- Labels 0 et 100 -->
  <text x="484" y="24" font-size="8" fill="#aaa" font-family="IBM Plex Mono">100</text>
  <text x="484" y="114" font-size="8" fill="#aaa" font-family="IBM Plex Mono">0</text>
  <line x1="40" y1="20" x2="480" y2="20" stroke="#fff" stroke-width="0.5" opacity="0.1"/>
  <line x1="40" y1="110" x2="480" y2="110" stroke="#fff" stroke-width="0.5" opacity="0.1"/>
</svg>

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
<svg viewBox="0 0 500 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;margin:16px 0;border-radius:8px;background:#0d1520;display:block">
  <text x="20" y="18" font-size="10" fill="#00d4aa" font-family="IBM Plex Mono">MACD</text>
  <!-- Ligne zéro -->
  <line x1="30" y1="85" x2="480" y2="85" stroke="#fff" stroke-width="0.8" opacity="0.15"/>
  <text x="484" y="88" font-size="8" fill="#aaa" font-family="IBM Plex Mono">0</text>
  <!-- Histogramme -->
  <rect x="40" y="95" width="12" height="30" rx="1" fill="#ff4d4d" opacity="0.7"/>
  <rect x="58" y="92" width="12" height="33" rx="1" fill="#ff4d4d" opacity="0.7"/>
  <rect x="76" y="88" width="12" height="37" rx="1" fill="#ff4d4d" opacity="0.7"/>
  <rect x="94" y="82" width="12" height="43" rx="1" fill="#ff4d4d" opacity="0.6"/>
  <rect x="112" y="80" width="12" height="5" rx="1" fill="#ff4d4d" opacity="0.5"/>
  <rect x="130" y="79" width="12" height="6" rx="1" fill="#00c076" opacity="0.5"/>
  <rect x="148" y="72" width="12" height="13" rx="1" fill="#00c076" opacity="0.6"/>
  <rect x="166" y="62" width="12" height="23" rx="1" fill="#00c076" opacity="0.7"/>
  <rect x="184" y="52" width="12" height="33" rx="1" fill="#00c076" opacity="0.7"/>
  <rect x="202" y="47" width="12" height="38" rx="1" fill="#00c076" opacity="0.8"/>
  <rect x="220" y="50" width="12" height="35" rx="1" fill="#00c076" opacity="0.7"/>
  <rect x="238" y="60" width="12" height="25" rx="1" fill="#00c076" opacity="0.6"/>
  <rect x="256" y="70" width="12" height="15" rx="1" fill="#00c076" opacity="0.5"/>
  <rect x="274" y="82" width="12" height="3" rx="1" fill="#00c076" opacity="0.4"/>
  <rect x="292" y="83" width="12" height="8" rx="1" fill="#ff4d4d" opacity="0.5"/>
  <rect x="310" y="78" width="12" height="18" rx="1" fill="#ff4d4d" opacity="0.6"/>
  <!-- Ligne MACD -->
  <polyline points="46,118 64,116 82,112 100,106 118,87 136,82 154,76 172,68 190,58 208,52 226,55 244,64 262,73 280,84 298,88 316,82" fill="none" stroke="#00d4aa" stroke-width="2" stroke-linejoin="round"/>
  <!-- Ligne Signal -->
  <polyline points="46,120 64,118 82,115 100,110 118,95 136,87 154,80 172,72 190,62 208,55 226,56 244,63 262,70 280,80 298,86 316,84" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-linejoin="round" stroke-dasharray="4,2"/>
  <!-- Croisement haussier annotation -->
  <circle cx="127" cy="84" r="6" stroke="#00c076" stroke-width="1.5" fill="none"/>
  <text x="100" y="142" font-size="9" fill="#00c076" font-family="IBM Plex Sans">Croisement ↑</text>
  <!-- Légende -->
  <line x1="340" y1="30" x2="360" y2="30" stroke="#00d4aa" stroke-width="2"/>
  <text x="365" y="34" font-size="9" fill="#00d4aa" font-family="IBM Plex Sans">Ligne MACD</text>
  <line x1="340" y1="48" x2="360" y2="48" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="365" y="52" font-size="9" fill="#f59e0b" font-family="IBM Plex Sans">Signal</text>
  <rect x="340" y="62" width="12" height="10" rx="1" fill="#00c076" opacity="0.7"/>
  <text x="357" y="71" font-size="9" fill="#00c076" font-family="IBM Plex Sans">Histogramme +</text>
  <rect x="340" y="78" width="12" height="10" rx="1" fill="#ff4d4d" opacity="0.7"/>
  <text x="357" y="87" font-size="9" fill="#ff4d4d" font-family="IBM Plex Sans">Histogramme −</text>
</svg>

<div class="highlight-box">
  ⚠️ <strong>Lag important :</strong> le MACD est un indicateur retardé (lagging). Les croisements arrivent après que le mouvement a commencé. Utile pour confirmer une tendance, moins pour anticiper les retournements exacts.
</div>

<h2>3. Les Bandes de Bollinger</h2>
<p>Les <span class="term">Bandes de Bollinger</span> (John Bollinger) encadrent le prix avec une bande centrale (MM20) et deux bandes à ±2 écarts-types.</p>
<div class="formula">Bande centrale = MM(20) — Bande haute = MM(20) + 2σ — Bande basse = MM(20) − 2σ</div>

<svg viewBox="0 0 500 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;margin:16px 0;border-radius:8px;background:#0d1520;display:block">
  <text x="20" y="16" font-size="10" fill="#00d4aa" font-family="IBM Plex Mono">BANDES DE BOLLINGER</text>
  <!-- Zone squeeze (gauche) -->
  <text x="70" y="35" font-size="9" fill="#f59e0b" font-family="IBM Plex Sans" text-anchor="middle">SQUEEZE</text>
  <!-- Bande haute squeeze -->
  <path d="M 20,60 C 40,58 60,56 80,57 C 100,58 120,59 140,60" fill="none" stroke="#00d4aa" stroke-width="1.5" opacity="0.7"/>
  <!-- Bande basse squeeze -->
  <path d="M 20,90 C 40,88 60,84 80,83 C 100,82 120,83 140,85" fill="none" stroke="#00d4aa" stroke-width="1.5" opacity="0.7"/>
  <!-- Bande centrale squeeze -->
  <path d="M 20,75 C 60,72 100,71 140,73" fill="none" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3,2" opacity="0.6"/>
  <!-- Zone entre les bandes squeeze -->
  <path d="M 20,60 C 40,58 60,56 80,57 C 100,58 120,59 140,60 L 140,85 C 120,83 100,82 80,83 C 60,84 40,88 20,90 Z" fill="#00d4aa" opacity="0.05"/>
  <!-- Prix dans squeeze -->
  <polyline points="25,74 40,70 55,76 70,72 85,74 100,71 115,75 130,73" fill="none" stroke="#fff" stroke-width="1.5" stroke-linejoin="round" opacity="0.7"/>
  <text x="70" y="125" font-size="8" fill="#f59e0b" font-family="IBM Plex Sans" text-anchor="middle">Volatilité basse → explosion imminente</text>

  <!-- Flèche expansion -->
  <line x1="155" y1="75" x2="180" y2="75" stroke="#aaa" stroke-width="1.5" marker-end="url(#arr)"/>
  <text x="162" y="70" font-size="8" fill="#aaa">→</text>

  <!-- Zone expansion (droite) -->
  <text x="340" y="35" font-size="9" fill="#00c076" font-family="IBM Plex Sans" text-anchor="middle">EXPANSION</text>
  <!-- Bande haute expansion -->
  <path d="M 185,65 C 210,58 240,40 270,25 C 300,15 340,12 380,15 C 410,17 440,20 470,22" fill="none" stroke="#00d4aa" stroke-width="1.5" opacity="0.7"/>
  <!-- Bande basse expansion -->
  <path d="M 185,85 C 210,90 240,100 270,108 C 300,115 340,118 380,115 C 410,112 440,108 470,105" fill="none" stroke="#00d4aa" stroke-width="1.5" opacity="0.7"/>
  <!-- Bande centrale expansion -->
  <path d="M 185,75 C 220,74 270,66 330,62 C 380,60 430,60 470,62" fill="none" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3,2" opacity="0.6"/>
  <!-- Zone entre bandes expansion -->
  <path d="M 185,65 C 210,58 240,40 270,25 C 300,15 340,12 380,15 C 410,17 440,20 470,22 L 470,105 C 440,108 410,112 380,115 C 340,118 300,115 270,108 C 240,100 210,90 185,85 Z" fill="#00c076" opacity="0.05"/>
  <!-- Prix expansion (marche sur bande haute) -->
  <polyline points="190,75 210,62 230,48 250,35 270,28 295,20 320,18 350,16 380,17 410,19 440,21 465,23" fill="none" stroke="#00c076" stroke-width="2" stroke-linejoin="round"/>
  <text x="340" y="130" font-size="8" fill="#00c076" font-family="IBM Plex Sans" text-anchor="middle">Prix "marche" sur la bande haute → tendance forte</text>
</svg>

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
