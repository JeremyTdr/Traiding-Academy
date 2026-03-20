export default {
  id: 5,
  titre: 'Supports, résistances & tendances',
  module: 'Module 2 — Lire les marchés',
  duree: '~15 min',
  sections: [
    'Identifier les supports et résistances',
    'Tracer les droites de tendance',
    'Figures chartistes classiques',
    'La zone de valeur',
    'Gérer les faux signaux',
  ],
  cours: `
<h1>Supports, résistances & tendances</h1>
<p class="module-tag">Module 2 — Lire les marchés</p>

<h2>1. Identifier les supports et résistances</h2>
<p>Un <span class="term">support</span> est un niveau de prix où la demande est historiquement plus forte que l'offre — le prix "rebondit" dessus. Une <span class="term">résistance</span> est l'inverse : l'offre domine, le prix "bute" contre ce plafond.</p>
<p><strong>Comment les identifier :</strong></p>
<ul>
  <li><strong>Anciens sommets/creux significatifs</strong> : les niveaux qui ont été testés plusieurs fois.</li>
  <li><strong>Niveaux psychologiques ronds</strong> : 100 €, 50 $, 10 000 points. Les ordres s'agrègent naturellement sur ces chiffres.</li>
  <li><strong>Gaps</strong> : les zones laissées vides par un saut de prix jouent souvent le rôle de support/résistance.</li>
  <li><strong>Plus on a de "touches", plus le niveau est fort</strong> — et plus sa cassure sera significative.</li>
</ul>
<div class="highlight-box">
  📐 <strong>Zones plutôt que lignes :</strong> en pratique, un support/résistance est une zone (quelques pourcents) plutôt qu'un prix exact. Dessiner des rectangles plutôt que des lignes fines.
</div>

<h2>2. Tracer les droites de tendance</h2>
<p>La <span class="term">droite de tendance haussière</span> relie les creux ascendants (Higher Lows). Elle représente la dynamique d'achat minimum. Tant que le prix est au-dessus, la tendance est intacte.</p>
<p>La <span class="term">droite de tendance baissière</span> relie les sommets descendants (Lower Highs). Cassure = potentiel retournement.</p>
<div class="formula">Règle des 3 touches : une droite de tendance n'est validée qu'après au moins 3 contacts</div>
<p><strong>Canal de tendance</strong> : en traçant une parallèle à la droite de tendance côté opposé, on crée un canal. Le bas du canal = zone d'achat. Le haut = zone de vente partielle ou de prudence.</p>
<div class="highlight-box">
  ⚠️ <strong>Attention aux droites trop pentues :</strong> une tendance très abrupte (45°+) n'est pas tenable longtemps. Elle finira par casser. Préférer les tendances régulières et sostenibles.
</div>

<h2>3. Figures chartistes classiques</h2>
<p><span class="term">Double sommet (Double Top)</span> : deux sommets à des niveaux similaires séparés par un creux. Confirmation à la cassure du creux intermédiaire (ligne de cou). Signal baissier.</p>
<p><span class="term">Double creux (Double Bottom)</span> : inverse. Deux creux + cassure du sommet intermédiaire. Signal haussier. Figure très fiable.</p>
<p><span class="term">Épaule-Tête-Épaule (Head & Shoulders)</span> : trois sommets, celui du milieu plus haut. Cassure de la "ligne de cou" = retournement baissier majeur.</p>
<p><span class="term">Triangle ascendant</span> : sommets horizontaux + creux ascendants. Compression haussière — cassure vers le haut probable.</p>
<p><span class="term">Drapeau (Flag)</span> : forte impulsion suivie d'une consolidation en contre-tendance légère. Figure de continuation.</p>

<h2>4. La zone de valeur</h2>
<p>En swing trading, on cherche à acheter dans la <span class="term">zone de valeur</span> : une zone où de multiples éléments techniques convergent.</p>
<ul>
  <li>Support horizontal</li>
  <li>Droite de tendance haussière</li>
  <li>Niveau de retracement (Fibonacci)</li>
  <li>Chandelier de retournement</li>
  <li>Volumes importants historiquement</li>
</ul>
<p>Plus les éléments convergent, plus la probabilité de rebond est élevée et plus le rapport risque/récompense est favorable.</p>

<h2>5. Gérer les faux signaux (fakeouts)</h2>
<p>Un <span class="term">fakeout</span> est une fausse cassure : le prix dépasse brièvement un niveau clé puis revient de l'autre côté.</p>
<p>Comment les limiter :</p>
<ul>
  <li><strong>Attendre la clôture</strong> au-delà du niveau (pas juste un wick).</li>
  <li><strong>Vérifier les volumes</strong> : une vraie cassure a des volumes forts.</li>
  <li><strong>Laisser un retest</strong> : souvent, après une cassure, le prix revient "tester" le niveau cassé, offrant une entrée plus sûre.</li>
</ul>
  `,
  qcm: [
    {
      q: "Combien de contacts minimum faut-il pour valider une droite de tendance ?",
      opts: ["1 contact suffit", "2 contacts", "3 contacts minimum", "5 contacts"],
      correct: 2,
      expl: "La règle des 3 touches : 2 points définissent une ligne mais ne la valident pas. Le 3ème contact prouve que les acteurs reconnaissent ce niveau et réagissent. Sa cassure sera d'autant plus forte."
    },
    {
      q: "Un Double Bottom (double creux) est un signal :",
      opts: [
        "Baissier — deux tentatives de hausse qui ont échoué",
        "Neutre — pattern de continuation de tendance",
        "Haussier — deux tentatives de baisse rejetées, cassure de la ligne de cou attendue",
        "Impossible à interpréter sans volumes"
      ],
      correct: 2,
      expl: "Double Bottom : le prix teste deux fois un support sans parvenir à le casser. Les vendeurs s'épuisent. La confirmation vient avec la cassure du sommet intermédiaire (ligne de cou)."
    },
    {
      q: "Comment différencier une vraie cassure de support d'un fakeout ?",
      opts: [
        "Un fakeout dure toujours plus de 3 jours",
        "Attendre une clôture journalière en-dessous + volumes forts confirment la cassure",
        "Les fakeouts ne se produisent que sur les résistances, jamais les supports",
        "Seul le RSI peut confirmer une cassure"
      ],
      correct: 1,
      expl: "Deux éléments clés : (1) clôture journalière en-dessous du support, (2) volumes élevés validant que de vrais vendeurs participent. Un fakeout a souvent des volumes faibles et le prix revient rapidement de l'autre côté."
    },
    {
      q: "Un triangle ascendant est caractérisé par :",
      opts: [
        "Des sommets descendants et des creux descendants",
        "Des sommets horizontaux (résistance) et des creux ascendants",
        "Des sommets ascendants et des creux horizontaux (support)",
        "Un range horizontal parfait"
      ],
      correct: 1,
      expl: "Triangle ascendant : résistance horizontale + creux ascendants (les acheteurs arrivent de plus en plus haut). Les acheteurs gagnent progressivement du terrain. La cassure est statistiquement vers le haut."
    },
    {
      q: "La 'zone de valeur' en swing trading désigne :",
      opts: [
        "Le prix exact d'une action selon l'analyse fondamentale",
        "La zone de prix avec les plus forts volumes historiques",
        "Une zone où plusieurs éléments techniques convergent pour créer une opportunité",
        "La zone entre Bid et Ask"
      ],
      correct: 2,
      expl: "La zone de valeur (ou 'confluence') est l'endroit où support horizontal + droite de tendance + Fibonacci + chandelier de retournement + volumes convergent. Plus il y a de confluences, plus la probabilité de rebond est élevée."
    },
  ],
  exercice: {
    titre: 'Analyse de figure chartiste',
    consigne: "Tu analyses une action dont voici la séquence : hausse de 40 € à 78 €, puis correction à 62 €, puis remontée à 77 € (proche de 78 €), puis nouvelle baisse qui casse les 62 €.",
    questions: [
      {
        q: "Quelle figure chartiste cette séquence décrit-elle ?",
        opts: [
          "Double Bottom (double creux) — signal haussier",
          "Épaule-Tête-Épaule — retournement baissier",
          "Double Top (double sommet) avec cassure de la ligne de cou — signal baissier",
          "Drapeau haussier — continuation de la hausse"
        ],
        correct: 2,
        expl: "Double Top classique : deux sommets à ~78 €, séparés par un creux à 62 € (ligne de cou). La cassure des 62 € confirme la figure. L'objectif théorique = 62 − (78 − 62) = 46 €."
      },
      {
        q: "Quel est l'objectif de cours théorique après la cassure des 62 € ?",
        opts: ["55 €", "50 €", "46 €", "40 €"],
        correct: 2,
        expl: "Hauteur de la figure = 78 − 62 = 16 €. Objectif = ligne de cou − hauteur = 62 − 16 = 46 €. C'est un objectif minimal théorique."
      },
      {
        q: "Le niveau 62 € (ancienne ligne de cou/support) joue maintenant quel rôle ?",
        opts: [
          "Il n'a plus de rôle puisqu'il a été cassé",
          "Il reste un support — le prix va rebondir dessus",
          "Il est devenu une résistance — les vendeurs pourraient l'utiliser pour vendre sur un retest",
          "Il est devenu un objectif d'achat"
        ],
        correct: 2,
        expl: "Inversion des rôles : le support à 62 € cassé devient une résistance. Si le prix remonte vers 62 €, les acheteurs piégés lors de la cassure voudront sortir au break-even, créant une pression vendeuse naturelle."
      },
    ],
  },
}
