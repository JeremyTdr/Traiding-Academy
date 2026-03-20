// Génère des données OHLCV simulées avec random walk + tendances
export const ACTIFS = [
  { id: 'AAPL', nom: 'Apple Inc.',        secteur: 'Tech',       prixBase: 182 },
  { id: 'MSFT', nom: 'Microsoft Corp.',   secteur: 'Tech',       prixBase: 415 },
  { id: 'TSLA', nom: 'Tesla Inc.',        secteur: 'Auto',       prixBase: 245 },
  { id: 'SPY',  nom: 'S&P 500 ETF',      secteur: 'ETF',        prixBase: 510 },
  { id: 'GOLD', nom: 'Or (XAU/USD)',      secteur: 'Commodité',  prixBase: 2320 },
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
  const vol   = actif.prixBase * 0.012 // volatilité ~1.2%

  let prix = actif.prixBase
  const candles = []

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < nb; i++) {
    const trend = Math.sin(i / 20) * vol * 0.3

    const open  = prix
    const move  = (rand() - 0.48) * vol * 2 + trend
    const close = Math.max(open + move, open * 0.97)
    const high  = Math.max(open, close) + rand() * vol * 0.8
    const low   = Math.min(open, close) - rand() * vol * 0.8
    const volume = Math.round(1000000 + rand() * 5000000)

    const date = new Date(today)
    date.setDate(today.getDate() - (nb - 1 - i))

    candles.push({ open, high, low, close, volume, index: i, date })
    prix = close
  }
  return candles
}

// Prix "live" simulé — tick toutes les secondes
export function nextTick(lastClose, volatilite = 0.003) {
  const change = (Math.random() - 0.499) * lastClose * volatilite
  return Math.max(lastClose + change, lastClose * 0.95)
}
