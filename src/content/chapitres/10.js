export default {
  id: 10,
  titre: 'Psychologie du trader',
  module: 'Module 3 — Stratégies & Risk',
  duree: '~15 min',
  sections: [
    'Les émotions dans le trading',
    'Les biais cognitifs du trader',
    "Fear & Greed : l'ennemi intérieur",
    'Construire sa discipline',
    'Le trading comme business',
  ],
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
<p><span class="term">Biais de confirmation</span> : on cherche les informations qui confirment notre thèse et on ignore celles qui la contredisent. Solution : chercher activement les arguments contre sa thèse.</p>
<p><span class="term">Biais d'ancrage</span> : s'attacher au prix d'achat comme référence absolue. "Je ne peux pas vendre en perte." Résultat : des positions perdantes qui s'aggravent. Le marché ne sait pas à quel prix tu as acheté.</p>
<p><span class="term">Overconfidence</span> : après une série gagnante, on se croit meilleur qu'on ne l'est → positions trop grandes, setups de moins en moins qualifiés.</p>
<p><span class="term">Revenge trading</span> : après une perte, vouloir se "venger" du marché et reprendre immédiatement une position pour récupérer. C'est le début d'une spirale destructrice.</p>

<h2>3. Fear & Greed : le cycle émotionnel</h2>
<p>Le marché joue sur nos émotions. En haut de cycle : euphorie → meilleur moment pour vendre. En bas de cycle : panique → meilleures opportunités d'achat.</p>
<div class="formula">Règle de Buffett : "Soyez avide quand les autres ont peur, et ayez peur quand les autres sont avides."</div>
<div class="highlight-box">
  📊 <strong>Le Fear & Greed Index :</strong> CNN Money publie un indice Fear & Greed (0-100). Extrême peur (< 20) → zone de vigilance achat. Extrême avidité (> 80) → zone de prudence ou allégement.
</div>

<h2>4. Construire sa discipline</h2>
<p>La discipline se construit par des <strong>processus</strong>, pas par la volonté. Stratégies concrètes :</p>
<ul>
  <li><strong>Le plan de trading</strong> : des règles écrites que tu appliques mécaniquement.</li>
  <li><strong>Stops automatiques</strong> : on ne coupe pas manuellement. Le stop fait son travail.</li>
  <li><strong>Limites journalières</strong> : si tu perds X€ dans la journée, tu arrêtes. Évite les spirales.</li>
  <li><strong>Journalisation</strong> : noter ses émotions par trade aide à identifier les patterns comportementaux.</li>
  <li><strong>Trading "small" au début</strong> : quand les positions sont petites, les émotions sont gérables.</li>
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
  🎯 <strong>Ma conviction finale :</strong> 80% de ton succès en trading dépend de ta psychologie et de ta discipline. 20% dépend de ta stratégie. Travaille les deux, mais ne sous-estime jamais l'aspect mental.
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
      expl: "La théorie des perspectives montre que les humains sont avers aux pertes : une perte équivaut psychologiquement à ~2× son montant en gain. Ce biais pousse les traders à vouloir éviter les pertes à tout prix et à sécuriser trop vite les gains."
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
      expl: "Le revenge trading est l'une des causes les plus fréquentes de comptes détruits. Après une perte, l'état émotionnel est dégradé — le pire moment pour trader. La bonne réaction après une perte : faire une pause, analyser ce qui s'est passé, revenir calme."
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
      expl: "Biais de confirmation : une fois qu'on a une thèse, on filtre l'information. Solution : se forcer à lister les raisons pour lesquelles la thèse est FAUSSE avant d'entrer."
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
      expl: "Les plus grandes opportunités se présentent quand la panique est maximale (prix déprimés). Ce n'est pas un appel à acheter aveuglément, mais à rester objectif quand la foule perd la tête."
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
      expl: "On ne supprime pas les émotions — on les neutralise par des systèmes : le plan de trading définit quand et comment entrer/sortir AVANT que les émotions soient actives. La discipline se construit par des processus, pas par la volonté pure."
    },
  ],
  exercice: {
    titre: "Identifier et corriger un comportement de trader",
    consigne: "Marc est un trader débutant. Il a eu 3 trades gagnants d'affilée et se sent très confiant. Il voit une action qu'il 'sent' haussière sans setup clair, prend une position 3× sa taille habituelle. Le trade part en perte immédiatement. Il refuse de couper sa position car 'il sait que ça va remonter'. Le lendemain, la perte s'est doublée.",
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
        expl: "Double biais : (1) Overconfidence — 3 gains consécutifs donnent une fausse impression, poussant à prendre plus de risque. (2) FOMO/intuition non structurée — entrer sur un 'feeling' sans setup qualifié."
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
        expl: "Biais d'ancrage : Marc est accroché à son prix d'achat. 'Ça va remonter' = biais de confirmation (il cherche les raisons pour garder, ignore les signaux de sortie). Le stop-loss aurait dû être en place AVANT l'entrée, automatique."
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
        expl: "Trois règles auraient suffi : (1) Setup qualifié obligatoire → pas d'entrée sur intuition. (2) Sizing max 1-2% → impossible de prendre 3× la taille habituelle. (3) Stop automatique → la position aurait été coupée mécaniquement à la perte max prévue."
      },
    ],
  },
}
