// Métadonnées des chapitres — le contenu détaillé est dans content/chapitres/<id>/
// icon : nom d'une icône Lucide
export const CHAPITRES = [
  // Module 1 — Fondamentaux
  { id: 1,  titre: 'Les marchés financiers & leurs acteurs',    module: 'Module 1 — Fondamentaux',         icon: 'Landmark' },
  { id: 2,  titre: "Bid/Ask, carnet d'ordres & spreads",        module: 'Module 1 — Fondamentaux',         icon: 'BookOpen' },

  // Module 2 — Lire les marchés
  { id: 3,  titre: "Introduction à l'analyse technique",        module: 'Module 2 — Lire les marchés',     icon: 'LineChart' },
  { id: 4,  titre: 'Chandeliers japonais',                      module: 'Module 2 — Lire les marchés',     icon: 'CandlestickChart' },
  { id: 5,  titre: 'Supports, résistances & tendances',         module: 'Module 2 — Lire les marchés',     icon: 'TrendingUp' },
  { id: 6,  titre: 'Indicateurs : RSI, MACD, Bollinger',        module: 'Module 2 — Lire les marchés',     icon: 'Activity' },

  // Module 3 — Stratégies & Risk
  { id: 7,  titre: 'Position sizing & ratio R/R',               module: 'Module 3 — Stratégies & Risk',    icon: 'Scale' },
  { id: 8,  titre: 'Stop-loss, take-profit & gestion du trade', module: 'Module 3 — Stratégies & Risk',    icon: 'ShieldCheck' },
  { id: 9,  titre: 'Stratégies de swing trading',               module: 'Module 3 — Stratégies & Risk',    icon: 'Waves' },
  { id: 10, titre: 'Psychologie du trader',                     module: 'Module 3 — Stratégies & Risk',    icon: 'Brain' },

  // Module 4 — Avancé (débloqué niveau Trader)
  { id: 11, titre: 'Options & Futures',                         module: 'Module 4 — Avancé',               icon: 'Lock', verrou: 4 },
  { id: 12, titre: 'CFD & produits structurés',                 module: 'Module 4 — Avancé',               icon: 'Lock', verrou: 4 },
]
