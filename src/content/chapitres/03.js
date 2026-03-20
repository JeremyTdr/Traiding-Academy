export default {
  id: 3,
  titre: "Introduction à l'analyse technique",
  module: 'Module 2 — Lire les marchés',
  duree: '~15 min',
  sections: [
    "Qu'est-ce que l'analyse technique ?",
    'La notion de tendance',
    'Supports et résistances (intro)',
    'Les volumes : le carburant du mouvement',
    "Limites de l'AT",
  ],
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
  <li><strong>Consolidation (range)</strong> : le prix oscille entre deux niveaux sans direction claire.</li>
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
      expl: "« Le marché escompte tout » est le premier postulat de l'AT (Dow Theory). Cela signifie que le prix actuel reflète déjà les fondamentaux, les anticipations, la psychologie et toutes les informations connues."
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
      expl: "En uptrend, chaque sommet (Higher High) est plus élevé que le précédent, et chaque creux (Higher Low) aussi. C'est la définition Dow de la tendance haussière."
    },
    {
      q: "Un ancien support cassé à la baisse devient :",
      opts: ["Un nouveau point d'entrée à l'achat", "Une résistance", "Un signal de continuation de hausse", "Un niveau neutre sans signification"],
      correct: 1,
      expl: "L'inversion des rôles est une règle fondamentale : support cassé = résistance. Les acheteurs piégés au support cassé souhaiteront vendre au point d'entrée (break-even), créant une pression vendeuse naturelle."
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
      expl: "Les volumes valident les mouvements de prix. Une cassure sans volumes manque de conviction — les gros acheteurs ne participent pas. Souvent, le prix « fakeout » puis revient en-dessous de la résistance."
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
      expl: "L'approche top-down est la plus solide : tendance hebdomadaire donne le biais directionnel, journalier structure les trades, H4/H1 affine les entrées."
    },
  ],
  exercice: {
    titre: 'Lecture de tendance et validation de cassure',
    consigne: "Sur un graphique journalier d'une action, tu observes : sommet à 85 €, creux à 78 €, nouveau sommet à 88 €, creux à 81 €, nouveau sommet à 91 €. Le volume lors de la montée vers 91 € est 3× supérieur à la moyenne.",
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
        expl: "La séquence montre des Higher Highs (85 → 88 → 91 €) et des Higher Lows (78 → 81 €). C'est la définition exacte d'une tendance haussière selon la théorie de Dow."
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
        expl: "85 € était une résistance. Maintenant dépassé, il devient un support (inversion des rôles). Les acheteurs qui avaient raté la cassure pourront potentiellement intervenir lors d'un repli."
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
        expl: "Volume fort + hausse = signal bullish. Les gros acteurs participent au mouvement — il est sain et a de la conviction. Un volume 3× la moyenne sur une cassure est un signal de continuation très positif."
      },
    ],
  },
}
