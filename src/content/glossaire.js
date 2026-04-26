const glossaire = {
  // Analyse technique générale
  'analyse technique (AT)': "Méthode d'analyse des marchés basée sur l'étude des graphiques de prix et des volumes, sans tenir compte des fondamentaux de l'entreprise.",
  'analyse technique': "Méthode d'analyse des marchés basée sur l'étude des graphiques de prix et des volumes.",
  'tendance': "Direction principale du mouvement de prix. Haussière (uptrend), baissière (downtrend) ou latérale (range).",
  'support': "Niveau de prix où la demande est historiquement suffisante pour stopper ou inverser une baisse.",
  'résistance': "Niveau de prix où l'offre est historiquement suffisante pour stopper ou inverser une hausse.",
  'volume': "Nombre de titres échangés sur une période. Un volume élevé valide un mouvement, un faible volume le fragilise.",

  // Chandeliers japonais
  'chandelier japonais': "Représentation graphique du prix sur une période, affichant l'ouverture, le plus haut, le plus bas et la clôture.",
  'Marteau (Hammer)': "Chandelier de retournement haussier : petit corps en haut, longue mèche basse ≥ 2× le corps. Apparaît après une baisse.",
  'Marteau inversé (Inverted Hammer)': "Chandelier haussier : petit corps en bas, longue mèche haute. Moins fiable que le Hammer, nécessite confirmation.",
  'Englobant haussier (Bullish Engulfing)': "Pattern 2 bougies : bougie rouge suivie d'une verte dont le corps englobe la précédente. Signal de retournement fort.",
  'Doji': "Chandelier dont l'ouverture et la clôture sont quasi identiques. Représente l'indécision du marché.",
  'Étoile filante (Shooting Star)': "Chandelier baissier : petit corps en bas, longue mèche haute ≥ 2×. Apparaît après une hausse. Signal de retournement.",
  'Pendu (Hanging Man)': "Identique au Hammer en forme, mais apparaît après une hausse. Signale un possible retournement baissier.",
  'Englobant baissier (Bearish Engulfing)': "Pattern 2 bougies : bougie verte suivie d'une rouge dont le corps englobe la précédente. Signal de retournement baissier.",
  'Marubozu': "Chandelier sans mèches (ou quasi) symbolisant une conviction maximale dans une direction.",
  'Spinning Top': "Petit corps avec mèches des deux côtés. Signale l'indécision mais moins extrême que le Doji.",

  // Indicateurs
  'RSI': "Relative Strength Index. Oscillateur (0-100) mesurant la force d'un mouvement. Suracheté > 70, survendu < 30.",
  'MACD': "Moving Average Convergence Divergence. Indicateur de tendance et de momentum basé sur deux moyennes mobiles.",
  'moyenne mobile': "Moyenne des prix de clôture sur N périodes, lissant les fluctuations pour identifier la tendance.",
  'Bandes de Bollinger': "Enveloppe autour d'une moyenne mobile à ±2 écarts-types. Mesure la volatilité et les zones de surachat/survente.",
  'stochastique': "Oscillateur (0-100) comparant le dernier prix au range des N dernières périodes. Suracheté > 80, survendu < 20.",

  // Gestion du risque
  'stop-loss': "Ordre automatique de vente placé à un niveau prédéfini pour limiter les pertes si le marché va contre la position.",
  'take-profit': "Ordre automatique de clôture à un niveau de gain prédéfini pour sécuriser les bénéfices.",
  'risk/reward': "Rapport risque/rendement : montant potentiellement gagné divisé par le montant risqué. Minimum recommandé : 1:2.",
  'levier': "Mécanisme permettant de contrôler une position plus grande que son capital. Amplifie gains ET pertes.",
  'marge': "Capital minimum requis pour ouvrir et maintenir une position avec levier.",
  'drawdown': "Perte maximale depuis un sommet de performance jusqu'au creux suivant. Mesure le risque historique d'une stratégie.",

  // Produits financiers
  'CFD': "Contract for Difference. Produit dérivé permettant de spéculer sur la variation d'un actif sans le posséder réellement.",
  'futures': "Contrat standardisé d'achat/vente d'un actif à un prix fixé aujourd'hui pour livraison à une date future.",
  'option': "Droit (sans obligation) d'acheter (call) ou vendre (put) un actif à un prix fixé avant une date d'expiration.",
  'call': "Option donnant le droit d'acheter un actif à un prix fixé (strike) avant la date d'expiration.",
  'put': "Option donnant le droit de vendre un actif à un prix fixé (strike) avant la date d'expiration.",
  'prime': "Prix payé pour acheter une option. C'est la perte maximale pour l'acheteur de l'option.",
  'pip': "Plus Petite Unité de Prix. Sur EUR/USD, 1 pip = 0.0001 (4ème décimale).",
  'spread': "Différence entre le prix d'achat (ask) et de vente (bid). C'est le coût implicite de la transaction.",
  'swap': "Frais de financement overnight pour maintenir une position avec levier d'une journée à l'autre.",

  // Analyse
  'swing trading': "Style de trading consistant à capturer des mouvements de prix sur plusieurs jours à semaines.",
  'scalping': "Style de trading ultra court terme : ouverture et fermeture de positions en quelques secondes à minutes.",
  'position sizing': "Calcul de la taille optimale d'une position en fonction du risque accepté et du stop-loss.",
  'breakout': "Cassure d'un niveau de support ou résistance avec conviction (volumes). Signal d'entrée potentiel.",
  'fakeout': "Fausse cassure : le prix franchit brièvement un niveau clé puis revient dans l'ancien range.",
  'divergence': "Désaccord entre le prix et un indicateur (ex. RSI). Signal de possible retournement.",
  'hedging': "Stratégie de couverture visant à réduire le risque d'une position existante via un instrument opposé.",
}

export default glossaire
