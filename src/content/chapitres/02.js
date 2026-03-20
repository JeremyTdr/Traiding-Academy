export default {
  id: 2,
  titre: "Bid/Ask, carnet d'ordres & spreads",
  module: 'Module 1 — Fondamentaux',
  duree: '~12 min',
  sections: [
    'Le prix Bid et le prix Ask',
    'Le spread : coût invisible du trading',
    "Le carnet d'ordres (order book)",
    'Types d\'ordres : Market, Limit, Stop',
  ],
  cours: `
<h1>Bid/Ask, carnet d'ordres & spreads</h1>
<p class="module-tag">Module 1 — Fondamentaux · 12 min de lecture</p>

<h2>1. Le prix Bid et le prix Ask</h2>
<p>Quand tu regardes un cours sur ton terminal, tu vois toujours <strong>deux prix</strong>, jamais un seul. C'est la réalité du marché :</p>
<ul>
  <li><strong>Bid</strong> (prix acheteur) : le prix maximum qu'un acheteur est prêt à payer. C'est le prix auquel <em>tu vends</em>.</li>
  <li><strong>Ask</strong> (prix vendeur) : le prix minimum auquel un vendeur accepte de céder. C'est le prix auquel <em>tu achètes</em>.</li>
</ul>
<div class="highlight-box">
  💡 Moyen mnémotechnique : le marché "demande" (Ask) toujours un peu plus cher qu'il n'offre. Si tu achètes et revends immédiatement, tu perds le spread — c'est le coût d'entrée/sortie implicite.
</div>

<h2>2. Le spread : coût invisible du trading</h2>
<p>Le <span class="term">spread</span> est la différence entre Ask et Bid. C'est la rémunération du teneur de marché (market maker) qui assure la liquidité.</p>
<div class="formula">Spread = Ask − Bid</div>
<p>Exemple : BNP Paribas cote Bid 52,40 € / Ask 52,45 €. Spread = 0,05 €.</p>
<p>Le spread varie selon :</p>
<ul>
  <li><strong>La liquidité</strong> : un titre très échangé (CAC 40, Apple…) aura un spread serré. Un titre illiquide peut avoir un spread de plusieurs euros.</li>
  <li><strong>La volatilité</strong> : lors d'une publication de résultats ou d'une crise, le spread s'élargit.</li>
  <li><strong>L'heure</strong> : à l'ouverture et la clôture, le spread est souvent plus large.</li>
</ul>
<div class="highlight-box">
  🎯 <strong>Implication concrète :</strong> si tu scalpes (trades très courts), le spread te coûte énormément. En swing trading (positions de quelques jours), le spread est marginal face au mouvement visé.
</div>

<h2>3. Le carnet d'ordres (order book)</h2>
<p>Le <span class="term">carnet d'ordres</span> est la liste en temps réel de tous les ordres en attente d'exécution. Il est structuré en deux colonnes :</p>
<ul>
  <li><strong>Côté Bid (gauche)</strong> : les ordres d'achat triés du plus offrant au moins offrant.</li>
  <li><strong>Côté Ask (droite)</strong> : les ordres de vente triés du moins cher au plus cher.</li>
</ul>
<p>Le meilleur Bid et le meilleur Ask se font face au centre — c'est le <span class="term">top of book</span>. Quand ils se croisent, une transaction se produit.</p>
<div class="highlight-box">
  📊 <strong>Lecture du carnet :</strong> un carnet déséquilibré (beaucoup d'acheteurs, peu de vendeurs) indique une pression haussière. Mais attention aux "iceberg orders" — de gros acteurs cachent la taille réelle de leurs ordres.
</div>

<h2>4. Types d'ordres : Market, Limit, Stop</h2>
<p>Trois ordres fondamentaux à maîtriser :</p>
<ul>
  <li><span class="term">Ordre Market</span> : exécuté immédiatement au meilleur prix disponible. Rapide mais tu subis le spread. À utiliser sur des titres très liquides uniquement.</li>
  <li><span class="term">Ordre Limit</span> : tu fixes le prix maximum (achat) ou minimum (vente). Exécuté seulement si le marché atteint ton prix. Pas de garantie d'exécution, mais maîtrise du prix.</li>
  <li><span class="term">Ordre Stop (Stop-Market)</span> : se déclenche quand un seuil est atteint, puis s'exécute au marché. Utilisé pour les stop-loss automatiques.</li>
</ul>
<div class="highlight-box">
  ⚡ <strong>Conseil terrain :</strong> en swing trading, j'utilise quasi exclusivement des ordres Limit à l'entrée (je fixe mon prix) et des ordres Stop-Market pour les stop-loss (exécution garantie en cas de retournement brutal).
</div>
  `,
  qcm: [
    {
      q: "Quand tu passes un ordre d'achat au marché sur une action, à quel prix es-tu exécuté ?",
      opts: ["Au prix Bid", "Au prix médian (Bid+Ask)/2", "Au prix Ask", "Au dernier prix de transaction"],
      correct: 2,
      expl: "Un achat au marché t'exécute au prix Ask — le prix minimum auquel les vendeurs acceptent de céder. Le Bid est le prix auquel tu vends. Ce mécanisme garantit que chaque transaction trouve une contrepartie."
    },
    {
      q: "Le spread d'une action est de 0,10 €. Tu achètes 200 actions. Quel est ton coût implicite lié au spread ?",
      opts: ["0,10 €", "0,20 €", "20 €", "10 €"],
      correct: 2,
      expl: "Le coût spread = 0,10 € × 200 actions = 20 €. C'est le montant que tu 'perdrais' si tu revendais immédiatement après l'achat."
    },
    {
      q: "Un spread large sur un titre indique généralement...",
      opts: ["Une forte liquidité", "Une faible liquidité ou une forte volatilité", "Un titre surévalué", "Un marché fermé"],
      correct: 1,
      expl: "Le spread s'élargit quand la liquidité est faible (peu d'acheteurs/vendeurs) ou la volatilité forte (le teneur de marché se protège du risque)."
    },
    {
      q: "Quel type d'ordre garantit l'exécution mais pas le prix ?",
      opts: ["Ordre Limit", "Ordre Stop-Limit", "Ordre Market", "Ordre GTC (Good Till Cancelled)"],
      correct: 2,
      expl: "L'ordre Market est exécuté immédiatement au meilleur prix disponible — exécution garantie, mais le prix exact dépend de la liquidité disponible."
    },
    {
      q: "Dans un carnet d'ordres, le 'top of book' désigne :",
      opts: ["Le plus gros ordre en attente", "Le meilleur Bid face au meilleur Ask", "Le dernier ordre exécuté", "Le prix d'ouverture de la séance"],
      correct: 1,
      expl: "Le top of book est la ligne de front du carnet : le Bid le plus élevé face au Ask le plus bas. C'est là que se forment les transactions."
    },
  ],
  exercice: {
    titre: "Analyse d'une situation de marché réelle",
    consigne: "Tu regardes le carnet d'ordres d'une action Tech française. Le Bid est à 148,20 € et l'Ask à 148,35 €. Tu veux acheter 150 actions. Réponds aux questions suivantes.",
    questions: [
      {
        q: "Quel est le spread en euros et en pourcentage (arrondi) ?",
        opts: ["0,05 € / 0,03%", "0,15 € / 0,10%", "0,15 € / 0,15%", "0,35 € / 0,24%"],
        correct: 1,
        expl: "Spread = 148,35 − 148,20 = 0,15 €. En % = (0,15 / 148,20) × 100 ≈ 0,10%."
      },
      {
        q: "Tu passes un ordre Market d'achat de 150 actions. Quel est ton prix d'exécution probable et ton coût de spread total ?",
        opts: ["148,20 € — coût spread : 22,50 €", "148,35 € — coût spread : 22,50 €", "148,275 € — coût spread : 0 €", "148,35 € — coût spread : 0 €"],
        correct: 1,
        expl: "Ordre Market achat → exécution au Ask = 148,35 €. Coût spread = 0,15 € × 150 = 22,50 €."
      },
      {
        q: "Tu préfères un ordre Limit à 148,25 €. Qu'est-ce que cela implique ?",
        opts: [
          "L'ordre s'exécute immédiatement à 148,25 €",
          "L'ordre n'est pas valide car 148,25 € est entre Bid et Ask",
          "L'ordre attend que le Ask descende à 148,25 € — exécution non garantie",
          "L'ordre s'exécute au Bid actuel (148,20 €)"
        ],
        correct: 2,
        expl: "Un ordre Limit d'achat à 148,25 € ne sera exécuté que si le Ask descend à ce niveau. Avantage : meilleur prix. Risque : l'action peut repartir à la hausse sans t'exécuter."
      },
    ],
  },
}
