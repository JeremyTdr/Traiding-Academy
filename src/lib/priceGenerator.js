export const ACTIFS = [
  { id: 'AAPL', nom: 'Apple Inc.',      secteur: 'Tech',      prixBase: 182,  tendance: 0.003,  volat: 0.013 },
  { id: 'MSFT', nom: 'Microsoft Corp.', secteur: 'Tech',      prixBase: 415,  tendance: 0.004,  volat: 0.012 },
  { id: 'TSLA', nom: 'Tesla Inc.',      secteur: 'Auto',      prixBase: 245,  tendance: 0.001,  volat: 0.028 },
  { id: 'SPY',  nom: 'S&P 500 ETF',    secteur: 'ETF',       prixBase: 510,  tendance: 0.003,  volat: 0.008 },
  { id: 'GOLD', nom: 'Or (XAU/USD)',   secteur: 'Commodité', prixBase: 2320, tendance: 0.002,  volat: 0.010 },
]

function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

export function generateCandles(actifId, nb = 30) {
  const actif = ACTIFS.find(a => a.id === actifId)
  const rand  = seededRandom(actif.prixBase * 31)

  let prix = actif.prixBase
  // Régime de volatilité : change tous les ~7 jours
  let regimeVol = 1.0
  let regimeCounter = 0

  const candles = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < nb; i++) {
    // Changement de régime de volatilité (cluster)
    regimeCounter++
    if (regimeCounter > 5 + Math.floor(rand() * 5)) {
      regimeVol = 0.5 + rand() * 2.0  // entre 0.5× et 2.5× la volat normale
      regimeCounter = 0
    }

    const vol = actif.prixBase * actif.volat * regimeVol

    // Tendance de fond + momentum court terme
    const biasTendance = actif.tendance * prix
    const move = (rand() - 0.48) * vol * 2 + biasTendance

    // Gap occasionnel (5% de probabilité) simulant une news
    const gap = rand() < 0.05 ? (rand() - 0.5) * vol * 3 : 0

    const open  = prix + gap
    const close = Math.max(open + move, open * 0.92)

    // Mèches proportionnelles au mouvement (grandes bougies = grandes mèches)
    const bodySize = Math.abs(close - open)
    const wickFactor = 0.3 + rand() * 0.7
    const high  = Math.max(open, close) + bodySize * wickFactor + rand() * vol * 0.3
    const low   = Math.min(open, close) - bodySize * wickFactor - rand() * vol * 0.3

    // Volume corrélé à la taille de la bougie + régime
    const baseVol = actif.id === 'GOLD' ? 80000 : 1000000
    const volMultiplier = 1 + (bodySize / vol) * 2
    const volume = Math.round(baseVol * (0.5 + rand() * 1.5) * volMultiplier * regimeVol)

    const date = new Date(today)
    date.setDate(today.getDate() - (nb - 1 - i))

    candles.push({ open, high, low, close, volume, index: i, date })
    prix = close
  }
  return candles
}

// Prix live — tick toutes les 1.5s, volatilité cohérente avec l'actif
export function nextTick(lastClose, actifId) {
  const actif = ACTIFS.find(a => a.id === actifId) || { volat: 0.015, tendance: 0.001 }
  const biais = actif.tendance * 0.1  // tendance très atténuée sur les ticks
  const change = (Math.random() - 0.499 + biais) * lastClose * actif.volat * 0.4
  return Math.max(lastClose + change, lastClose * 0.95)
}
