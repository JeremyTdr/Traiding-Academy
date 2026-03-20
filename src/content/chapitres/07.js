export default {
  id: 7,
  titre: 'Position sizing & ratio Risque/Récompense',
  module: 'Module 3 — Stratégies & Risk',
  duree: '~15 min',
  sections: [
    'Pourquoi le sizing est décisif',
    'Le risque par trade : la règle des 1-2%',
    'Calculer sa taille de position',
    'Le ratio Risque/Récompense (R/R)',
    'Expectancy : penser en statistiques',
  ],
  cours: `
<h1>Position Sizing & Ratio Risque/Récompense</h1>
<p class="module-tag">Module 3 — Stratégies & Risk</p>

<h2>1. Pourquoi le sizing est décisif</h2>
<p>Le <span class="term">position sizing</span> (taille de position) est probablement la compétence la plus sous-estimée des traders débutants. Tu peux avoir raison sur la direction d'un trade 6 fois sur 10, et quand même perdre de l'argent — si tes positions perdantes sont trop grandes.</p>
<div class="highlight-box">
  💀 <strong>La ruine :</strong> le pire ennemi du trader n'est pas d'avoir tort — c'est de perdre trop sur un seul trade au point de ne plus pouvoir se remettre. Un portefeuille en baisse de 50% doit gagner 100% pour retrouver son niveau initial. Le sizing prévient ce scénario.
</div>

<h2>2. La règle des 1-2% : risque par trade</h2>
<p>La règle d'or du risk management : ne jamais risquer plus de <strong>1 à 2% de son capital total</strong> sur un seul trade.</p>
<ul>
  <li>Capital 5 000 € → risque max par trade : 50-100 €</li>
  <li>Capital 10 000 € → risque max par trade : 100-200 €</li>
</ul>
<p>Avec cette règle, 10 trades perdants consécutifs ne représentent que 10-20% de perte — une série normale dans le trading.</p>

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
<ul>
  <li>Avec un R/R de 2:1, si tu as raison 40% du temps, tu gagnes de l'argent.</li>
  <li>Avec un R/R de 1:1, tu dois avoir raison > 50% juste pour ne pas perdre.</li>
  <li>En swing trading, viser un minimum de <strong>2:1</strong>, idéalement 3:1.</li>
</ul>

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
      expl: "Risque max = 1% × 8 000 € = 80 €. Distance au stop = 40 − 37,50 = 2,50 €. Taille = 80 € / 2,50 € = 32 actions. Investissement total = 32 × 40 € = 1 280 € (16% du capital), mais le risque réel est de 80 €."
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
      expl: "Exemple : 10 000 € → perte 50% = 5 000 €. Pour retrouver 10 000 €, il faut gagner 5 000 € sur une base de 5 000 € = +100%. La perte et le gain ne sont pas symétriques."
    },
    {
      q: "Un trade avec un risque de 150 € et un objectif de gain de 450 € a un ratio R/R de :",
      opts: ["1:1", "2:1", "3:1", "4:1"],
      correct: 2,
      expl: "R/R = Gain / Risque = 450 / 150 = 3. Donc R/R de 3:1. Avec ce ratio, même si tu n'as raison que 30% du temps, ton système est profitable."
    },
    {
      q: "Quelle est la règle générale du risque max par trade recommandée pour un swing trader ?",
      opts: ["5-10% du capital", "10-20% du capital", "1-2% du capital", "0,1% du capital"],
      correct: 2,
      expl: "La règle des 1-2% est le standard du money management. À 1%, tu peux encaisser 50 trades perdants consécutifs avant de perdre 50% du capital. Commencer à 1% est sage pour un débutant."
    },
    {
      q: "Avec un taux de gain de 40% et un R/R moyen de 3:1, l'expectancy est :",
      opts: ["-0,20 par trade", "+0,20 par trade", "+0,60 par trade", "Nulle"],
      correct: 2,
      expl: "Expectancy = (0,40 × 3) − (0,60 × 1) = 1,20 − 0,60 = +0,60 par trade. Positif ! Ce système gagne même avec seulement 40% de trades gagnants, car les gains (3R) compensent largement les pertes (1R)."
    },
  ],
  exercice: {
    titre: 'Calcul de position et validation de setup',
    consigne: "Tu as un capital de 15 000 €. Tu repères une action à 75 € avec un support à 71 €. Stop-loss à 70,50 €. Objectif à 84 €. Ta règle : risque max 1,5% par trade.",
    questions: [
      {
        q: "Quelle est ta taille de position maximale ?",
        opts: ["20 actions", "50 actions", "30 actions", "45 actions"],
        correct: 1,
        expl: "Risque max = 1,5% × 15 000 € = 225 €. Distance au stop = 75 − 70,50 = 4,50 €. Taille = 225 € / 4,50 € = 50 actions. Investissement = 50 × 75 € = 3 750 €. Risque réel = 50 × 4,50 = 225 € = 1,5% du capital."
      },
      {
        q: "Quel est le ratio R/R de ce trade ?",
        opts: ["1:1", "2:1", "2,5:1", "4:1"],
        correct: 1,
        expl: "Gain potentiel = 84 − 75 = 9 € par action. Risque = 75 − 70,50 = 4,50 €. R/R = 9 / 4,50 = 2:1. C'est au-dessus du minimum recommandé."
      },
      {
        q: "Ce trade est-il acceptable selon les critères de risk management ?",
        opts: [
          "Non — le R/R est insuffisant (minimum 3:1 requis)",
          "Oui — R/R ≥ 2:1 et risque dans la limite des 1,5%",
          "Non — l'investissement de 3 750 € est trop élevé",
          "Non — le stop est trop proche du prix d'entrée"
        ],
        correct: 1,
        expl: "Le trade respecte les deux critères : (1) Risque = 1,5% du capital ✓, (2) R/R = 2:1 ≥ minimum recommandé ✓. L'investissement de 3 750 € représente 25% du capital — c'est la taille en capital, pas le risque réel (225 €)."
      },
    ],
  },
}
