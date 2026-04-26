export default {
  id: 4,
  titre: 'Chandeliers japonais',
  module: 'Module 2 — Lire les marchés',
  duree: '~15 min',
  sections: [
    "Anatomie d'un chandelier",
    'Les chandeliers de retournement haussier',
    'Les chandeliers de retournement baissier',
    'Les chandeliers de continuation',
    'Pièges et bonnes pratiques',
  ],
  cours: `
<h1>Chandeliers japonais</h1>
<p class="module-tag">Module 2 — Lire les marchés</p>

<h2>1. Anatomie d'un chandelier</h2>
<p>Le <span class="term">chandelier japonais</span> (candlestick) représente le mouvement de prix sur une période donnée (1 jour, 1 heure, etc.) avec quatre informations clés :</p>
<ul>
  <li><strong>Open (O)</strong> : prix d'ouverture</li>
  <li><strong>High (H)</strong> : plus haut atteint</li>
  <li><strong>Low (L)</strong> : plus bas atteint</li>
  <li><strong>Close (C)</strong> : prix de clôture</li>
</ul>
<div class="formula">Corps (body) = |Close − Open| — Mèches (wicks/shadows) = extensions vers High et Low</div>

<svg viewBox="0 0 500 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;margin:16px 0;border-radius:8px;background:#0d1520;display:block">
  <!-- Chandelier haussier -->
  <text x="90" y="18" font-size="11" fill="#00c076" font-family="IBM Plex Mono" text-anchor="middle">HAUSSIER</text>
  <line x1="90" y1="25" x2="90" y2="48" stroke="#00c076" stroke-width="2"/>
  <rect x="68" y="48" width="44" height="70" rx="2" fill="#00c076" opacity="0.85"/>
  <line x1="90" y1="118" x2="90" y2="148" stroke="#00c076" stroke-width="2"/>
  <text x="120" y="32" font-size="9" fill="#aaa" font-family="IBM Plex Sans">High</text>
  <line x1="118" y1="30" x2="93" y2="30" stroke="#555" stroke-width="0.8"/>
  <text x="120" y="55" font-size="9" fill="#00c076" font-family="IBM Plex Sans">Close</text>
  <line x1="118" y1="53" x2="113" y2="53" stroke="#555" stroke-width="0.8"/>
  <text x="120" y="120" font-size="9" fill="#00c076" font-family="IBM Plex Sans">Open</text>
  <line x1="118" y1="118" x2="113" y2="118" stroke="#555" stroke-width="0.8"/>
  <text x="120" y="148" font-size="9" fill="#aaa" font-family="IBM Plex Sans">Low</text>
  <line x1="118" y1="146" x2="93" y2="146" stroke="#555" stroke-width="0.8"/>
  <text x="90" y="168" font-size="9" fill="#00c076" font-family="IBM Plex Sans" text-anchor="middle">Close &gt; Open</text>

  <!-- Chandelier baissier -->
  <text x="250" y="18" font-size="11" fill="#ff4d4d" font-family="IBM Plex Mono" text-anchor="middle">BAISSIER</text>
  <line x1="250" y1="25" x2="250" y2="48" stroke="#ff4d4d" stroke-width="2"/>
  <rect x="228" y="48" width="44" height="70" rx="2" fill="#ff4d4d" opacity="0.85"/>
  <line x1="250" y1="118" x2="250" y2="148" stroke="#ff4d4d" stroke-width="2"/>
  <text x="280" y="32" font-size="9" fill="#aaa" font-family="IBM Plex Sans">High</text>
  <line x1="278" y1="30" x2="253" y2="30" stroke="#555" stroke-width="0.8"/>
  <text x="280" y="55" font-size="9" fill="#ff4d4d" font-family="IBM Plex Sans">Open</text>
  <line x1="278" y1="53" x2="273" y2="53" stroke="#555" stroke-width="0.8"/>
  <text x="280" y="120" font-size="9" fill="#ff4d4d" font-family="IBM Plex Sans">Close</text>
  <line x1="278" y1="118" x2="273" y2="118" stroke="#555" stroke-width="0.8"/>
  <text x="280" y="148" font-size="9" fill="#aaa" font-family="IBM Plex Sans">Low</text>
  <line x1="278" y1="146" x2="253" y2="146" stroke="#555" stroke-width="0.8"/>
  <text x="250" y="168" font-size="9" fill="#ff4d4d" font-family="IBM Plex Sans" text-anchor="middle">Open &gt; Close</text>

  <!-- Doji -->
  <text x="410" y="18" font-size="11" fill="#f59e0b" font-family="IBM Plex Mono" text-anchor="middle">DOJI</text>
  <line x1="410" y1="25" x2="410" y2="83" stroke="#f59e0b" stroke-width="2"/>
  <line x1="388" y1="83" x2="432" y2="83" stroke="#f59e0b" stroke-width="3"/>
  <line x1="410" y1="83" x2="410" y2="148" stroke="#f59e0b" stroke-width="2"/>
  <text x="410" y="168" font-size="9" fill="#f59e0b" font-family="IBM Plex Sans" text-anchor="middle">Open ≈ Close</text>
  <text x="410" y="178" font-size="9" fill="#f59e0b" font-family="IBM Plex Sans" text-anchor="middle" opacity="0.7">Indécision</text>

  <!-- Séparateurs -->
  <line x1="170" y1="10" x2="170" y2="175" stroke="#ffffff" stroke-width="0.5" opacity="0.1"/>
  <line x1="340" y1="10" x2="340" y2="175" stroke="#ffffff" stroke-width="0.5" opacity="0.1"/>
</svg>

<p><strong>Chandelier haussier (vert/blanc)</strong> : Close &gt; Open. Les acheteurs ont dominé la session.<br>
<strong>Chandelier baissier (rouge/noir)</strong> : Close &lt; Open. Les vendeurs ont dominé.</p>
<div class="highlight-box">
  💡 Un grand corps avec de petites mèches = conviction forte dans la direction. Un petit corps avec de grandes mèches = indécision, lutte acheteurs/vendeurs.
</div>

<h2>2. Chandeliers de retournement haussier</h2>
<p><span class="term">Marteau (Hammer)</span> : petit corps en haut, longue mèche basse (≥ 2× le corps). Apparaît après une tendance baissière. Signifie que les vendeurs ont poussé fort mais les acheteurs ont repris le contrôle avant la clôture.</p>
<p><span class="term">Marteau inversé (Inverted Hammer)</span> : petit corps en bas, longue mèche haute. Après une baisse, signale une tentative des acheteurs. Moins fiable que le Hammer — attendre confirmation.</p>
<p><span class="term">Englobant haussier (Bullish Engulfing)</span> : chandelier rouge suivi d'un vert dont le corps englobe entièrement le précédent. Signal de retournement fort, surtout sur un support ou après une forte baisse.</p>
<p><span class="term">Doji</span> : Open ≈ Close, corps quasi inexistant. Indécision totale. Sur un support ou résistance, il peut annoncer un retournement. En isolation, il est neutre.</p>
<svg viewBox="0 0 500 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;margin:16px 0;border-radius:8px;background:#0d1520;display:block">
  <!-- Hammer -->
  <text x="55" y="18" font-size="10" fill="#00c076" font-family="IBM Plex Mono" text-anchor="middle">HAMMER</text>
  <line x1="55" y1="30" x2="55" y2="44" stroke="#00c076" stroke-width="2"/>
  <rect x="43" y="44" width="24" height="16" rx="2" fill="#00c076"/>
  <line x1="55" y1="60" x2="55" y2="110" stroke="#00c076" stroke-width="2"/>
  <text x="55" y="125" font-size="8" fill="#aaa" font-family="IBM Plex Sans" text-anchor="middle">Retournement ↑</text>

  <!-- Shooting Star -->
  <text x="145" y="18" font-size="10" fill="#ff4d4d" font-family="IBM Plex Mono" text-anchor="middle">SHOOTING STAR</text>
  <line x1="145" y1="30" x2="145" y2="80" stroke="#ff4d4d" stroke-width="2"/>
  <rect x="133" y="80" width="24" height="16" rx="2" fill="#ff4d4d"/>
  <line x1="145" y1="96" x2="145" y2="110" stroke="#ff4d4d" stroke-width="2"/>
  <text x="145" y="125" font-size="8" fill="#aaa" font-family="IBM Plex Sans" text-anchor="middle">Retournement ↓</text>

  <!-- Bullish Engulfing -->
  <text x="255" y="18" font-size="10" fill="#00c076" font-family="IBM Plex Mono" text-anchor="middle">ENGULFING HAUSSIER</text>
  <line x1="240" y1="55" x2="240" y2="62" stroke="#ff4d4d" stroke-width="1.5"/>
  <rect x="232" y="62" width="16" height="26" rx="2" fill="#ff4d4d" opacity="0.9"/>
  <line x1="240" y1="88" x2="240" y2="95" stroke="#ff4d4d" stroke-width="1.5"/>
  <line x1="268" y1="44" x2="268" y2="55" stroke="#00c076" stroke-width="1.5"/>
  <rect x="257" y="55" width="22" height="50" rx="2" fill="#00c076" opacity="0.9"/>
  <line x1="268" y1="105" x2="268" y2="115" stroke="#00c076" stroke-width="1.5"/>
  <text x="255" y="130" font-size="8" fill="#aaa" font-family="IBM Plex Sans" text-anchor="middle">2ème bougie englobe la 1ère</text>

  <!-- Marubozu -->
  <text x="400" y="18" font-size="10" fill="#00d4aa" font-family="IBM Plex Mono" text-anchor="middle">MARUBOZU</text>
  <rect x="384" y="30" width="32" height="80" rx="2" fill="#00d4aa" opacity="0.9"/>
  <text x="400" y="125" font-size="8" fill="#aaa" font-family="IBM Plex Sans" text-anchor="middle">Sans mèches = conviction</text>

  <!-- Séparateurs -->
  <line x1="100" y1="10" x2="100" y2="140" stroke="#fff" stroke-width="0.5" opacity="0.08"/>
  <line x1="200" y1="10" x2="200" y2="140" stroke="#fff" stroke-width="0.5" opacity="0.08"/>
  <line x1="320" y1="10" x2="320" y2="140" stroke="#fff" stroke-width="0.5" opacity="0.08"/>
</svg>

<div class="highlight-box">
  🎯 <strong>Règle d'or :</strong> aucun chandelier ne se lit seul. Le contexte (tendance, niveau de support/résistance, volumes) est indispensable pour interpréter correctement le signal.
</div>

<h2>3. Chandeliers de retournement baissier</h2>
<p><span class="term">Étoile filante (Shooting Star)</span> : petit corps en bas, longue mèche haute (≥ 2× le corps). Apparaît après une tendance haussière. Les acheteurs ont poussé fort en intraday mais les vendeurs ont dominé à la clôture.</p>
<p><span class="term">Pendu (Hanging Man)</span> : identique au Hammer en forme, mais apparaît après une hausse. Les vendeurs commencent à montrer leur force. Signal d'alerte.</p>
<p><span class="term">Englobant baissier (Bearish Engulfing)</span> : chandelier vert suivi d'un rouge dont le corps englobe entièrement le précédent. Signal de retournement fort sur une résistance.</p>

<h2>4. Chandeliers de continuation</h2>
<p><span class="term">Marubozu</span> : grand corps sans mèches (ou très petites). Représente une séance de pure conviction dans une direction. Haussier = acheteurs ont dominé du début à la fin. Baissier = vendeurs totalement aux commandes.</p>
<p><span class="term">Spinning Top</span> : petit corps, mèches des deux côtés. Indécision mais corps visible. En contexte de tendance forte, peut signaler une pause avant continuation.</p>

<h2>5. Pièges et bonnes pratiques</h2>
<ul>
  <li><strong>Ne pas surtrader les patterns</strong> : un Hammer isolé au milieu d'une tendance n'a que peu de valeur. La même formation sur un support majeur est potentiellement très puissante.</li>
  <li><strong>Attendre la confirmation</strong> : le chandelier suivant doit confirmer le signal.</li>
  <li><strong>Timeframe = fiabilité</strong> : un Engulfing en journalier vaut infiniment plus qu'en 5 minutes.</li>
  <li><strong>Volumes</strong> : un retournement sur fort volume = signal de qualité.</li>
</ul>
  `,
  qcm: [
    {
      q: "Un Marteau (Hammer) est caractérisé par :",
      opts: [
        "Un grand corps rouge avec une longue mèche haute",
        "Un petit corps en haut de la bougie, longue mèche basse ≥ 2× le corps",
        "Deux bougies, la seconde englobant la première",
        "Un corps quasi inexistant avec des mèches égales"
      ],
      correct: 1,
      expl: "Le Hammer : petit corps en haut, mèche basse longue (les vendeurs ont poussé fort mais les acheteurs ont repris le contrôle). La mèche basse doit être au moins 2× la taille du corps pour qualifier le pattern."
    },
    {
      q: "Un Doji signifie :",
      opts: [
        "Fort signal haussier immédiat",
        "Fort signal baissier immédiat",
        "Indécision entre acheteurs et vendeurs — signal contextuel",
        "La séance a été suspendue"
      ],
      correct: 2,
      expl: "Le Doji (Open ≈ Close) représente un équilibre parfait entre acheteurs et vendeurs. Seul, il est neutre. Sa valeur vient du contexte : sur un support après une tendance baissière → potentiel retournement. Toujours attendre confirmation."
    },
    {
      q: "Un Englobant Haussier (Bullish Engulfing) se compose de :",
      opts: [
        "Deux bougies vertes consécutives",
        "Une bougie rouge suivie d'une verte dont le corps englobe la précédente",
        "Une bougie verte suivie d'une rouge dont le corps englobe la précédente",
        "Une grande bougie verte isolée"
      ],
      correct: 1,
      expl: "L'Engulfing Haussier : bougie rouge, puis bougie verte dont le CORPS englobe entièrement le corps de la bougie précédente. Signal de force des acheteurs. Plus fiable sur un support ou après une tendance baissière prolongée."
    },
    {
      q: "Un Marubozu haussier signifie :",
      opts: [
        "Les vendeurs ont dominé toute la séance",
        "Indécision totale en séance",
        "Les acheteurs ont dominé du début à la fin de la séance, sans mèches significatives",
        "Ouverture en gap haussier"
      ],
      correct: 2,
      expl: "Marubozu = 'tête rasée' en japonais. Pas de mèches (ou quasi). Le prix a ouvert au plus bas et clôturé au plus haut — les acheteurs n'ont jamais cédé de terrain. Signe d'une conviction maximale."
    },
    {
      q: "Sur quel timeframe un pattern de chandelier est-il le plus fiable ?",
      opts: [
        "1 minute — plus de données",
        "5 minutes — équilibre signal/bruit",
        "Journalier ou hebdomadaire — le bruit est filtré",
        "La fiabilité est identique sur tous les timeframes"
      ],
      correct: 2,
      expl: "Plus le timeframe est élevé, plus les patterns sont fiables. Un Engulfing journalier implique une séance entière de lutte entre acheteurs et vendeurs. En 1 minute, un pattern similaire peut être du bruit aléatoire."
    },
  ],
  exercice: {
    titre: 'Identification de patterns en contexte',
    consigne: "Tu observes trois situations graphiques sur un graphique journalier. Identifie les patterns et leur signification.",
    questions: [
      {
        q: "Situation A : Après 8 jours de baisse, tu vois une bougie avec un petit corps vert en haut et une mèche basse représentant 70% de la bougie totale. Les volumes sont 2× la moyenne. Quel pattern et quelle action ?",
        opts: [
          "Étoile filante baissière — envisager une vente",
          "Marteau haussier sur support — signal de retournement potentiel, attendre confirmation J+1",
          "Doji — aucun signal, ignorer",
          "Marubozu haussier — achat immédiat"
        ],
        correct: 1,
        expl: "Hammer classique après une tendance baissière = signal de retournement haussier potentiel. Le volume 2× la moyenne renforce la qualité du signal. Bonne pratique : attendre que le lendemain clôture au-dessus du Hammer avant d'entrer. Le stop se place sous la mèche basse."
      },
      {
        q: "Situation B : En sommet de tendance haussière, une bougie verte est suivie d'une rouge dont le corps englobe entièrement la précédente. Volumes normaux. Quel pattern ?",
        opts: [
          "Englobant haussier — signal d'achat",
          "Englobant baissier — possible retournement à surveiller",
          "Marteau — continuation haussière probable",
          "Pattern non significatif"
        ],
        correct: 1,
        expl: "Bearish Engulfing en sommet de tendance = signal de retournement baissier potentiel. Les vendeurs ont repris le contrôle d'une séance entière. Avec volumes normaux, surveiller la confirmation."
      },
      {
        q: "Situation C : En milieu de tendance haussière forte, une bougie de type Spinning Top (petit corps, mèches des deux côtés). Comment l'interpréter ?",
        opts: [
          "Retournement baissier immédiat confirmé",
          "Pause/consolidation possible dans la tendance, mais continuation probable si la tendance est forte",
          "Fort signal haussier — doubler la position",
          "Signal de vente immédiate"
        ],
        correct: 1,
        expl: "Spinning Top en milieu de tendance = indécision temporaire, pas nécessairement un retournement. En tendance forte, c'est souvent juste une pause respiratoire avant la continuation."
      },
    ],
  },
}
