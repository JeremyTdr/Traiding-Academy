import { useEffect, useRef } from 'react'

const PADDING = { top: 20, right: 60, bottom: 40, left: 10 }

export default function CandleChart({ candles, currentPrice, width, height }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!candles?.length || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const dpr    = window.devicePixelRatio || 1

    canvas.width  = width  * dpr
    canvas.height = height * dpr
    canvas.style.width  = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    const W = width  - PADDING.left - PADDING.right
    const H = height - PADDING.top  - PADDING.bottom

    const visible  = candles
    const nb       = visible.length
    const CANDLE_GAP = Math.max(1, Math.floor(W / nb * 0.25))
    const CANDLE_W   = Math.floor((W - CANDLE_GAP * (nb - 1)) / nb)

    const prices = visible.flatMap(c => [c.high, c.low])
    if (currentPrice) prices.push(currentPrice)
    const minP = Math.min(...prices) * 0.999
    const maxP = Math.max(...prices) * 1.001
    const range = maxP - minP

    function toY(p) { return PADDING.top + H - ((p - minP) / range) * H }
    function toX(i) { return PADDING.left + i * (CANDLE_W + CANDLE_GAP) + CANDLE_W / 2 + CANDLE_GAP / 2 }

    // Fond
    ctx.fillStyle = '#060b14'
    ctx.fillRect(0, 0, width, height)

    // Grille horizontale
    const gridLines = 5
    ctx.strokeStyle = 'rgba(255,255,255,0.04)'
    ctx.lineWidth = 1
    for (let i = 0; i <= gridLines; i++) {
      const y = PADDING.top + (i / gridLines) * H
      ctx.beginPath()
      ctx.moveTo(PADDING.left, y)
      ctx.lineTo(width - PADDING.right, y)
      ctx.stroke()

      const price = maxP - (i / gridLines) * range
      ctx.fillStyle = '#445566'
      ctx.font = '10px IBM Plex Mono, monospace'
      ctx.textAlign = 'left'
      ctx.fillText(price.toFixed(2), width - PADDING.right + 4, y + 3)
    }

    // Bougies
    visible.forEach((c, i) => {
      const x     = toX(i)
      const yOpen  = toY(c.open)
      const yClose = toY(c.close)
      const yHigh  = toY(c.high)
      const yLow   = toY(c.low)
      const isBull = c.close >= c.open
      const color  = isBull ? '#00c076' : '#ff4d4d'
      const half   = CANDLE_W / 2

      // Mèche
      ctx.strokeStyle = color
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(x, yHigh)
      ctx.lineTo(x, Math.min(yOpen, yClose))
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, yLow)
      ctx.lineTo(x, Math.max(yOpen, yClose))
      ctx.stroke()

      // Corps
      const bodyTop = Math.min(yOpen, yClose)
      const bodyH   = Math.max(Math.abs(yClose - yOpen), 1)
      ctx.fillStyle = isBull ? 'rgba(0,192,118,0.85)' : 'rgba(255,77,77,0.85)'
      ctx.fillRect(x - half, bodyTop, CANDLE_W, bodyH)
    })

    // Ligne prix courant
    if (currentPrice) {
      const y = toY(currentPrice)
      const isBull = currentPrice >= (visible.at(-1)?.open ?? currentPrice)
      const lineColor = isBull ? '#00c076' : '#ff4d4d'

      ctx.setLineDash([4, 4])
      ctx.strokeStyle = lineColor
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(PADDING.left, y)
      ctx.lineTo(width - PADDING.right, y)
      ctx.stroke()
      ctx.setLineDash([])

      // Badge prix
      ctx.fillStyle = lineColor
      ctx.fillRect(width - PADDING.right, y - 9, PADDING.right - 2, 18)
      ctx.fillStyle = '#000'
      ctx.font = 'bold 10px IBM Plex Mono, monospace'
      ctx.textAlign = 'center'
      ctx.fillText(currentPrice.toFixed(2), width - PADDING.right / 2 - 1, y + 4)
    }

    // Axe X — dates
    ctx.fillStyle = '#445566'
    ctx.font = '9px IBM Plex Mono, monospace'
    ctx.textAlign = 'center'
    const step = Math.max(1, Math.floor(visible.length / 6))
    const lastIdx = visible.length - 1
    visible.forEach((c, i) => {
      if ((i % step === 0 || i === lastIdx) && c.date) {
        const x = toX(i)
        const label = c.date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
        ctx.fillText(label, x, height - 6)
      }
    })

  }, [candles, currentPrice, width, height])

  return <canvas ref={canvasRef} style={{ display: 'block', borderRadius: '6px 6px 0 0' }} />
}
