# 📋 Contexte Projet — TradeAcademy
> Colle ce fichier entier dans le chat Claude Code (VS Code) pour reprendre le projet.

---

## 🎯 Vue d'ensemble

**Nom du projet :** TradeAcademy  
**Type :** Application web de formation au trading & finance des marchés  
**Fichier principal :** `trading-academy.html` (single-file, HTML/CSS/JS pur, aucune dépendance externe)  
**Objectif utilisateur :** S'acculturer aux marchés financiers et pratiquer le swing trading en activité secondaire — pas de reconversion pro.

---

## 👤 Profil apprenant

- Quelques notions de base en finance (actions, bourse) mais pas expert
- Objectifs combinés : culture financière + investissement intelligent + swing trading secondaire
- Approche souhaitée : **ludique, progressive, type jeu vidéo** (XP, badges, paliers, scores)

---

## 🏗️ Architecture de l'app (single HTML file)

### Stack technique
- HTML5 / CSS3 / JavaScript vanilla (ES6+)
- Aucun framework, aucune dépendance npm
- Fonts Google : DM Serif Display + DM Sans + JetBrains Mono
- Canvas API pour le graphique du simulateur

### Design system
- Thème **dark** exclusif (`--bg: #0a0e17`)
- Palette : gold (`#f0b429`), green (`#22c55e`), red (`#ef4444`), blue (`#3b82f6`), purple (`#a78bfa`), teal (`#2dd4bf`)
- Typo : DM Serif Display (titres/chiffres), DM Sans (UI), JetBrains Mono (données financières)

### Layout
- **Sidebar fixe** (260px) : logo, barre XP, navigation, streak quotidien
- **Ticker tape** en haut (défilé des cours de marché animé)
- **Top bar** sticky : titre de page + stats rapides (XP, niveau, capital)
- **Main content** : 5 pages, affichage via `display: none/block`

---

## 📱 Pages & fonctionnalités implémentées

### 1. Tableau de bord (`dashboard`)
- Bannière de bienvenue avec CTA
- 4 stat-cards : XP total, leçons complétées, score quiz moyen, capital simulateur + PnL
- Grille des 4 modules (avec barres de progression)
- Aperçu des badges récents

### 2. Cours (`cours`)
- **Vue liste** : 7 leçons avec statuts (Terminé ✓ / En cours / À faire / Verrouillé 🔒)
- **Vue leçon** : contenu pédagogique complet + table des matières sidebar + bouton "Terminer (+50 XP)"
- **2 leçons rédigées** :
  - Leçon 4 : *Introduction à l'Analyse Technique* (piliers théoriques, types de graphiques, timeframes)
  - Leçon 5 : *Les Chandeliers Japonais* (anatomie, bougies de retournement)

### 3. Quiz interactif (`quiz`)
- 5 questions à choix multiples sur les fondamentaux
- Explication détaillée affichée après chaque réponse
- **+20 XP par bonne réponse**
- Écran de résultats avec score, XP gagné, options rejouer/continuer

**Questions actuelles :**
1. Qu'est-ce que le spread Bid/Ask ?
2. Signal d'un Doji en fin de tendance haussière
3. Ratio risque/récompense 1:3
4. Lecture d'une paire Forex EUR/USD
5. Définition d'un support en AT

### 4. Simulateur de trading (`simulator`)
- Actif simulé : **AAPL** (prix aléatoire ±1.5€/1.2s, borné 140–220€)
- Graphique canvas temps réel avec gradient couleur (vert/rouge selon direction)
- Formulaire d'ordre : quantité, type (marché / limite), achat / vente
- Gestion portfolio : cash disponible, positions ouvertes, PnL non réalisé, valeur totale
- Historique des trades (8 derniers)
- Capital de départ : **10 000 €**

### 5. Badges & Paliers (`badges`)
- **5 paliers** : Débutant (0 XP) → Apprenti (250) → Analyste (1000) → Trader (2500) → Expert (5000)
- **10 badges** dont 3 débloqués : Première leçon, Bases validées, 5 jours de suite
- Visualisation track horizontal avec nœuds animés

---

## 🎮 Système de gamification (state JS)

```javascript
let state = {
  xp: 640,           // XP actuel
  level: 2,          // Niveau actuel (Apprenti Trader)
  cash: 10000,       // Capital simulateur
  positions: {},     // { AAPL: { qty, avgPrice } }
  trades: [],        // Historique des ordres
  lessonsCompleted: 7,
};
```

**Sources de XP :**
- Leçon terminée : +50 XP
- Bonne réponse quiz : +20 XP
- Trade exécuté : +10 XP
- Position clôturée : +15 XP

**Niveaux :**
| Niveau | Nom | XP requis |
|--------|-----|-----------|
| 1 | Débutant | 0 |
| 2 | Apprenti Trader | 250 |
| 3 | Analyste Junior | 1000 |
| 4 | Trader Confirmé | 2500 |
| 5 | Expert Marchés | 5000 |

---

## 📚 Contenu pédagogique — Cursus prévu

### Module 1 — Fondamentaux des marchés ✅ (100%)
Types de marchés, acteurs, Bid/Ask, carnet d'ordres

### Module 2 — Lire les marchés 🔄 (45%)
- ✅ Introduction à l'analyse technique
- ✅ Les chandeliers japonais
- ⬜ Supports, résistances & tendances
- ⬜ Indicateurs : RSI, MACD, Bollinger
- ⬜ Volumes et price action

### Module 3 — Stratégies & Risk Management ⬜ (0%)
- Position sizing & ratio R/R
- Stop-loss et take-profit
- Stratégies swing trading (momentum, breakout, mean-reversion)
- Psychologie du trader

### Module 4 — Produits dérivés 🔒 (verrouillé, Niveau 4 requis)
- Options, futures, CFD
- Produits structurés, arbitrage

---

## 🚀 Évolutions prévues / backlog

### Priorité haute
- [ ] Rédiger les leçons manquantes du Module 2 (supports/résistances, RSI, MACD)
- [ ] Ajouter plusieurs actifs au simulateur (indices, forex, crypto)
- [ ] Graphique en chandeliers japonais dans le simulateur (pas juste courbe)
- [ ] Flashcards pour mémoriser les termes clés (mode révision)

### Priorité moyenne
- [ ] Système de streaks persistant (localStorage)
- [ ] Notifications de palier atteint (modal animée)
- [ ] Mode "Quiz thématique" par module
- [ ] Leaderboard / score global

### Priorité basse
- [ ] Export PDF de progression
- [ ] Mode sombre / clair toggle
- [ ] Assistant IA intégré (API Claude dans l'app)

---

## 🎨 Conventions de code à respecter

```css
/* Variables CSS — toujours utiliser ces tokens */
--bg: #0a0e17        /* fond principal */
--bg2: #111828       /* fond secondaire (cards) */
--bg3: #1a2235       /* fond tertiaire (inputs) */
--bg4: #212d42       /* fond quaternaire (hover) */
--border: rgba(255,255,255,0.07)
--border2: rgba(255,255,255,0.13)
--gold: #f0b429      /* couleur accent principale */
--green: #22c55e     /* haussier / succès */
--red: #ef4444       /* baissier / erreur */
--blue: #3b82f6      /* info */
--purple: #a78bfa    /* secondaire */
--teal: #2dd4bf      /* tertiaire */
```

```javascript
// Pattern navigation — toujours via showPage()
showPage('dashboard' | 'cours' | 'quiz' | 'simulator' | 'badges')

// Pattern XP — toujours via addXP()
addXP(amount, 'raison affichée dans le toast')

// Pattern toast — toujours via showToast()
showToast('emoji', 'Titre', 'Sous-titre optionnel')
```

---

## 💬 Ton pédagogique à maintenir

Le contenu des cours est rédigé **à la première personne** par un trader senior fictif, avec :
- Exemples concrets tirés de la pratique en salle des marchés
- Mise en contexte "pourquoi c'est utile pour toi en tant que swing trader"
- Boîtes `highlight-box` pour les conseils terrain importants
- Termes clés mis en valeur avec la classe `.term` (fond violet)
- Formules dans des blocs `.formula` (fond sombre, couleur teal)

---

*Fichier généré depuis claude.ai — session de travail TradeAcademy*
