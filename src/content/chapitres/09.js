export default {
  id: 9,
  titre: 'Stratégies de swing trading',
  module: 'Module 3 — Stratégies & Risk',
  duree: '~18 min',
  sections: [
    'Définition et caractéristiques du swing trading',
    'La stratégie du rebond sur support',
    'La stratégie de cassure (breakout)',
    'La stratégie de pull-back',
    'Construire son plan de trading',
  ],
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
<ol>
  <li>Identifier un range ou une résistance bien définie testée plusieurs fois.</li>
  <li>Attendre une cassure avec volumes forts (> 1,5× la moyenne).</li>
  <li>Entrée en clôture au-dessus de la résistance cassée, ou sur le retest (pull-back sur l'ancien niveau).</li>
  <li>Stop sous l'ancien niveau de résistance (maintenant support).</li>
  <li>Objectif = hauteur du range reportée à la cassure.</li>
</ol>
<div class="highlight-box">
  ⚠️ <strong>Piège classique :</strong> FOMO (Fear Of Missing Out) — entrer après une cassure sur volumes faibles ou trop loin du niveau. Attendre la confirmation ou le pull-back.
</div>

<h2>4. Stratégie 3 : Le pull-back</h2>
<p>Après un fort mouvement (impulsion), le prix consolide puis reprend dans la direction initiale.</p>
<ol>
  <li>Identifier une tendance forte + une impulsion initiale.</li>
  <li>Attendre la consolidation / pull-back vers la MM20 ou un niveau de retracement (38-50% Fibonacci).</li>
  <li>Entrée sur signe de fin de correction (chandelier de retournement, RSI remontant depuis 40-50).</li>
  <li>Stop sous le plus bas de la consolidation.</li>
  <li>TP = extension de l'impulsion initiale (100-161,8% Fibonacci).</li>
</ol>

<h2>5. Construire son plan de trading</h2>
<p>Un <span class="term">plan de trading</span> définit à l'avance les règles de jeu. Il évite les décisions impulsives.</p>
<ul>
  <li><strong>Univers d'investissement</strong> : quelles actions/marchés ?</li>
  <li><strong>Setups autorisés</strong> : les stratégies précises que tu trades</li>
  <li><strong>Règles de sizing</strong> : 1-2% max par trade, max X positions simultanées</li>
  <li><strong>Règles de stop</strong> : jamais déplacé dans le mauvais sens, toujours en place avant l'entrée</li>
  <li><strong>Routine d'analyse</strong> : quand, comment, durée</li>
</ul>
<div class="highlight-box">
  📋 <strong>Ma conviction :</strong> le plan de trading vaut mille indicateurs. Il transforme le trading émotionnel et aléatoire en une activité professionnelle répétable.
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
      expl: "Le swing trading sur timeframe journalier/hebdomadaire se passe de la surveillance en temps réel. On analyse le soir, on passe ses ordres (entrée Limit + stop automatique), et on vérifie le matin. C'est le seul style compatible avec une activité professionnelle classique."
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
      expl: "Le processus est top-down et séquentiel : (1) biais directionnel, (2) zone d'intérêt, (3) signal d'entrée, (4) exécution avec stop logique. Chaque étape filtre et qualifie."
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
      expl: "Une vraie cassure nécessite : (1) clôture journalière au-dessus de la résistance + (2) volumes élevés. Sans volumes, c'est un fakeout probable."
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
      expl: "On n'entre pas pendant le pull-back mais sur le signe de fin de correction : chandelier de retournement sur MM20 ou Fibonacci, RSI qui remonte depuis 40-50. Ce signal confirme que la tendance principale reprend le dessus."
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
      expl: "Le plan de trading pré-définit les règles quand on est calme et objectif. Sans plan, chaque trade est une décision sous pression émotionnelle. Avec plan, c'est un processus : setup présent ? → appliquer les règles → répéter."
    },
  ],
  exercice: {
    titre: 'Identifier et qualifier un setup',
    consigne: "Tu analyses une action en tendance haussière journalière. Après une hausse de 45 € à 62 €, le prix a corrigé à 56 €, niveau qui correspond à un ancien sommet (maintenant support) et à la MM20. On voit un Hammer vert avec des volumes légèrement au-dessus de la moyenne. RSI à 48, en remontée.",
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
        expl: "Setup classique de pull-back/rebond dans tendance : (1) tendance haussière confirmée, (2) correction vers support (ancien sommet + MM20), (3) signal de retournement (Hammer), (4) RSI en remontée. C'est le setup de rebond sur support par excellence."
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
        expl: "Stop logique = légèrement sous le support (56 €) et sous la mèche du Hammer. 54 € laisse ~3,5% de marge sous le support. Si 54 € est touché, la thèse est clairement invalidée."
      },
      {
        q: "Le prix d'entrée est ~56,50 €, stop à 54 €. La résistance suivante est à 62 €. Est-ce un setup valide (R/R ≥ 2:1) ?",
        opts: [
          "Non — R/R = 1,4:1 (gain 5,50 € / risque 2,50 €), insuffisant",
          "Oui — R/R = 2,2:1 (gain 5,50 € / risque 2,50 €), acceptable",
          "Oui — R/R = 3:1 (gain 7,50 € / risque 2,50 €)",
          "Non — impossible à calculer sans objectif précis"
        ],
        correct: 1,
        expl: "Gain potentiel = 62 − 56,50 = 5,50 €. Risque = 56,50 − 54 = 2,50 €. R/R = 5,50 / 2,50 = 2,2:1. Au-dessus du minimum de 2:1. Setup qualifié."
      },
    ],
  },
}
