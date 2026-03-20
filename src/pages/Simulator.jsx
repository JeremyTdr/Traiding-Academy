import { useState, useEffect, useRef, useCallback } from 'react'
import { TrendingUp, RefreshCw, ChevronDown } from 'lucide-react'
import CandleChart from '../components/simulator/CandleChart'
import { ACTIFS, generateCandles, nextTick } from '../lib/priceGenerator'
import { useAuth } from '../hooks/useAuth.jsx'
import { useSimulatorContext } from '../hooks/useSimulatorContext.jsx'

const TICK_MS = 1500

export default function Simulator() {
  const { user }                                              = useAuth()
  const { capital, positions, historique, courbeCapital,
          loading, updateState, reset: resetSim }             = useSimulatorContext()
  const [actifId, setActifId]           = useState('AAPL')
  const [candles, setCandles]           = useState([])
  const [currentPrice, setCurrentPrice] = useState(null)
  const [qte, setQte]                   = useState(1)
  const [confirmReset, setConfirmReset] = useState(false)
  const [chartSize, setChartSize]       = useState({ w: 600, h: 340 })
  const chartContainerRef               = useRef(null)

  const actif = ACTIFS.find(a => a.id === actifId)

  // Redimensionnement du graphique
  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      const { width } = entries[0].contentRect
      if (width > 0) setChartSize({ w: Math.floor(width), h: 340 })
    })
    if (chartContainerRef.current) obs.observe(chartContainerRef.current)
    return () => obs.disconnect()
  }, [])

  // Chargement des bougies à chaque changement d'actif
  useEffect(() => {
    const c = generateCandles(actifId)
    setCandles(c)
    setCurrentPrice(c.at(-1).close)
  }, [actifId])

  // Tick live
  const tick = useCallback(() => {
    setCurrentPrice(prev => {
      if (prev === null) return prev
      return nextTick(prev, actif.prixBase * 0.00003)
    })
  }, [actif])

  useEffect(() => {
    const id = setInterval(tick, TICK_MS)
    return () => clearInterval(id)
  }, [tick])

  // Mise à jour de la dernière bougie avec le prix courant
  useEffect(() => {
    if (currentPrice === null) return
    setCandles(prev => {
      if (!prev.length) return prev
      const updated = [...prev]
      const last = { ...updated.at(-1) }
      last.close = currentPrice
      last.high  = Math.max(last.high, currentPrice)
      last.low   = Math.min(last.low, currentPrice)
      updated[updated.length - 1] = last
      return updated
    })
  }, [currentPrice])

  // ── Actions ────────────────────────────────────────────
  function acheter() {
    if (!currentPrice || qte <= 0) return
    const cout = currentPrice * qte
    if (cout > capital) return
    const newCapital   = capital - cout
    const newPositions = [...positions, { id: Date.now(), actif: actifId, qty: qte, prixEntree: currentPrice }]
    updateState(newCapital, newPositions, historique)
  }

  function fermerPosition(pos) {
    const px            = pos.actif === actifId ? currentPrice : pos.prixEntree
    const pnl           = (px - pos.prixEntree) * pos.qty
    const newCapital    = capital + pos.prixEntree * pos.qty + pnl
    const newPositions  = positions.filter(x => x.id !== pos.id)
    const newHistorique = [{ actif: pos.actif, qty: pos.qty, entree: pos.prixEntree, sortie: px, pnl }, ...historique].slice(0, 20)
    updateState(newCapital, newPositions, newHistorique, true)
  }

  function reset() {
    resetSim()
    const c = generateCandles(actifId)
    setCandles(c)
    setCurrentPrice(c.at(-1).close)
    setConfirmReset(false)
  }

  // ── Calculs ────────────────────────────────────────────
  const pnlOuvert = positions
    .filter(p => p.actif === actifId)
    .reduce((acc, p) => acc + (currentPrice - p.prixEntree) * p.qty, 0)

  const capitalTotal = capital + positions.reduce((acc, p) => {
    const px = p.actif === actifId ? currentPrice : p.prixEntree
    return acc + px * p.qty
  }, 0)

  const perfGlobale = ((capitalTotal - 10000) / 10000) * 100
  const coutOrdre   = currentPrice ? currentPrice * qte : 0
  const canBuy      = coutOrdre <= capital && qte > 0 && !!currentPrice

  if (loading) return <div style={{ color: 'var(--text3)', fontSize: 13, padding: '40px 0' }}>Chargement…</div>

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, color: 'var(--text)', marginBottom: 2 }}>
            Simulateur
          </h1>
          <p style={{ fontSize: 12, color: 'var(--text3)' }}>Paper trading — capital virtuel de 10 000 €</p>
        </div>
        <button onClick={() => setConfirmReset(true)} className="btn-secondary">
          <RefreshCw size={13} /> Réinitialiser
        </button>
      </div>

      {/* Stats portefeuille */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
        <StatCard label="Capital disponible" value={`${capital.toFixed(2)} €`}        accent="var(--blue)" />
        <StatCard label="Valeur totale"       value={`${capitalTotal.toFixed(2)} €`}  accent="var(--cyan)" />
        <StatCard label="P&L ouvert"          value={`${pnlOuvert >= 0 ? '+' : ''}${pnlOuvert.toFixed(2)} €`}     accent={pnlOuvert >= 0 ? 'var(--green)' : 'var(--red)'}   color={pnlOuvert >= 0 ? 'var(--green)' : 'var(--red)'} />
        <StatCard label="Perf. globale"       value={`${perfGlobale >= 0 ? '+' : ''}${perfGlobale.toFixed(2)}%`}  accent={perfGlobale >= 0 ? 'var(--green)' : 'var(--red)'} color={perfGlobale >= 0 ? 'var(--green)' : 'var(--red)'} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16, alignItems: 'start' }}>

        {/* Graphique */}
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', minWidth: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 14px', borderBottom: '1px solid var(--border)',
          }}>
            <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
              <select
                value={actifId}
                onChange={e => setActifId(e.target.value)}
                style={{
                  appearance: 'none', background: 'var(--bg3)', border: '1px solid var(--border)',
                  borderRadius: 6, color: 'var(--text)', fontSize: 13, fontWeight: 600,
                  padding: '5px 28px 5px 10px', cursor: 'pointer',
                  fontFamily: 'IBM Plex Sans, sans-serif',
                }}
              >
                {ACTIFS.map(a => <option key={a.id} value={a.id}>{a.id} — {a.nom}</option>)}
              </select>
              <ChevronDown size={12} color="var(--text3)" style={{ position: 'absolute', right: 8, pointerEvents: 'none' }} />
            </div>

            {currentPrice && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 18, fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text)' }}>
                  {currentPrice.toFixed(2)} €
                </span>
                <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'IBM Plex Mono, monospace' }}>
                  {actif.secteur}
                </span>
              </div>
            )}
          </div>

          <div ref={chartContainerRef} style={{ width: '100%' }}>
            <CandleChart candles={candles} currentPrice={currentPrice} width={chartSize.w} height={chartSize.h} />
          </div>
        </div>

        {/* Panneau ordre + positions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Ordre */}
          <div style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderTop: '2px solid var(--cyan)', borderRadius: 8, padding: '16px',
          }}>
            <div style={sectionTitle}>Passer un ordre</div>

            <div style={{ marginBottom: 10 }}>
              <label style={labelStyle}>Prix du marché</label>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text)' }}>
                {currentPrice?.toFixed(2) ?? '—'} €
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Quantité</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => setQte(q => Math.max(1, q - 1))} style={qteBtn}>−</button>
                <input
                  type="number" min={1} value={qte}
                  onChange={e => setQte(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{
                    flex: 1, padding: '7px 10px', textAlign: 'center',
                    background: 'var(--bg3)', border: '1px solid var(--border)',
                    borderRadius: 6, color: 'var(--text)', fontSize: 14,
                    fontFamily: 'IBM Plex Mono, monospace',
                  }}
                />
                <button onClick={() => setQte(q => q + 1)} style={qteBtn}>+</button>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 5, fontFamily: 'IBM Plex Mono, monospace' }}>
                Coût estimé : {coutOrdre.toFixed(2)} €
                {!canBuy && qte > 0 && currentPrice && <span style={{ color: 'var(--red)' }}> · Fonds insuffisants</span>}
              </div>
            </div>

            <button
              onClick={acheter}
              disabled={!canBuy}
              style={{
                width: '100%', padding: '10px',
                background: canBuy ? 'var(--green)' : 'rgba(0,192,118,0.1)',
                border: 'none', borderRadius: 6,
                color: canBuy ? '#000' : 'var(--green)',
                fontWeight: 700, fontSize: 13, cursor: canBuy ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                transition: 'all 0.15s',
              }}
            >
              <TrendingUp size={14} /> Acheter {actifId}
            </button>
          </div>

          {/* Positions ouvertes */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px' }}>
            <div style={sectionTitle}>Positions ouvertes ({positions.length})</div>
            {positions.length === 0 ? (
              <div style={{ fontSize: 12, color: 'var(--text3)', textAlign: 'center', padding: '12px 0' }}>
                Aucune position ouverte
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {positions.map(p => {
                  const px   = p.actif === actifId ? currentPrice : p.prixEntree
                  const pnl  = (px - p.prixEntree) * p.qty
                  const pct  = ((px - p.prixEntree) / p.prixEntree) * 100
                  const isUp = pnl >= 0
                  return (
                    <div key={p.id} style={{
                      padding: '10px 12px', background: 'var(--bg3)', borderRadius: 6,
                      borderLeft: `2px solid ${isUp ? 'var(--green)' : 'var(--red)'}`,
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace' }}>
                          {p.actif} ×{p.qty}
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace', color: isUp ? 'var(--green)' : 'var(--red)' }}>
                          {isUp ? '+' : ''}{pnl.toFixed(2)} €
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'IBM Plex Mono, monospace' }}>
                          {p.prixEntree.toFixed(2)} · {isUp ? '+' : ''}{pct.toFixed(2)}%
                        </span>
                        <button
                          onClick={() => fermerPosition(p)}
                          style={{
                            padding: '3px 8px', background: 'transparent', cursor: 'pointer',
                            border: `1px solid ${isUp ? 'rgba(0,192,118,0.3)' : 'rgba(255,77,77,0.3)'}`,
                            borderRadius: 4, color: isUp ? 'var(--green)' : 'var(--red)', fontSize: 10,
                          }}
                        >
                          Fermer
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal confirmation reset */}
      {confirmReset && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(6,11,20,0.85)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderTop: '2px solid var(--red)', borderRadius: 10,
            padding: '28px 32px', maxWidth: 380, width: '100%', textAlign: 'center',
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
              Réinitialiser le simulateur ?
            </div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 24, lineHeight: 1.6 }}>
              Toutes les positions ouvertes et l'historique des trades seront supprimés.
              Le capital sera réinitialisé à 10 000 €.
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button className="btn-ghost" onClick={() => setConfirmReset(false)}>
                Annuler
              </button>
              <button
                onClick={reset}
                style={{
                  padding: '8px 20px', background: 'var(--red)', border: 'none',
                  borderRadius: 6, color: '#fff', fontWeight: 700, fontSize: 13,
                  cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif',
                }}
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Courbe de capital */}
      {courbeCapital.length > 1 && (
        <div style={{ marginTop: 16, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px' }}>
          <div style={sectionTitle}>Évolution du capital</div>
          <CapitalChart data={courbeCapital} />
        </div>
      )}

      {/* Historique */}
      {historique.length > 0 && (
        <div style={{ marginTop: 16, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px' }}>
          <div style={sectionTitle}>Historique des trades</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace' }}>
              <thead>
                <tr>
                  {['Actif', 'Qté', 'Entrée', 'Sortie', 'P&L'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '4px 10px', fontSize: 10, color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {historique.map((t, i) => (
                  <tr key={i} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '7px 10px', color: 'var(--text2)' }}>{t.actif}</td>
                    <td style={{ padding: '7px 10px', color: 'var(--text2)' }}>{t.qty}</td>
                    <td style={{ padding: '7px 10px', color: 'var(--text2)' }}>{t.entree.toFixed(2)}</td>
                    <td style={{ padding: '7px 10px', color: 'var(--text2)' }}>{t.sortie.toFixed(2)}</td>
                    <td style={{ padding: '7px 10px', fontWeight: 700, color: t.pnl >= 0 ? 'var(--green)' : 'var(--red)' }}>
                      {t.pnl >= 0 ? '+' : ''}{t.pnl.toFixed(2)} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, accent, color = 'var(--text)' }) {
  return (
    <div style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderTop: `2px solid ${accent}`, borderRadius: 8, padding: '14px 16px',
    }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color, fontFamily: 'IBM Plex Mono, monospace' }}>
        {value}
      </div>
    </div>
  )
}

export function CapitalChart({ data, height = 120 }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [width, setWidth] = useState(600)

  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width
      if (w > 0) setWidth(Math.floor(w))
    })
    if (containerRef.current) {
      setWidth(Math.floor(containerRef.current.getBoundingClientRect().width))
      obs.observe(containerRef.current)
    }
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!canvasRef.current || data.length < 2 || !width) return
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const dpr    = window.devicePixelRatio || 1
    canvas.width  = width * dpr
    canvas.height = height * dpr
    canvas.style.width  = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    const PAD = { top: 10, right: 10, bottom: 24, left: 10 }
    const W = width - PAD.left - PAD.right
    const H = height - PAD.top - PAD.bottom

    const values = data.map(d => d.valeur)
    const minV = Math.min(...values) * 0.998
    const maxV = Math.max(...values) * 1.002
    const range = maxV - minV || 1

    const toX = i => PAD.left + (i / (data.length - 1)) * W
    const toY = v => PAD.top + H - ((v - minV) / range) * H

    const isUp = values.at(-1) >= values[0]
    const lineColor = isUp ? '#00c076' : '#ff4d4d'
    const fillColor = isUp ? 'rgba(0,192,118,0.08)' : 'rgba(255,77,77,0.08)'

    // Fond
    ctx.fillStyle = '#060b14'
    ctx.fillRect(0, 0, width, height)

    // Ligne de base (capital initial)
    const yBase = toY(10000)
    ctx.setLineDash([3, 3])
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(PAD.left, yBase)
    ctx.lineTo(width - PAD.right, yBase)
    ctx.stroke()
    ctx.setLineDash([])

    // Zone remplie
    ctx.beginPath()
    ctx.moveTo(toX(0), toY(values[0]))
    data.forEach((d, i) => ctx.lineTo(toX(i), toY(d.valeur)))
    ctx.lineTo(toX(data.length - 1), height - PAD.bottom)
    ctx.lineTo(toX(0), height - PAD.bottom)
    ctx.closePath()
    ctx.fillStyle = fillColor
    ctx.fill()

    // Courbe
    ctx.beginPath()
    data.forEach((d, i) => {
      if (i === 0) ctx.moveTo(toX(i), toY(d.valeur))
      else ctx.lineTo(toX(i), toY(d.valeur))
    })
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 1.5
    ctx.stroke()

    // Labels valeur min/max/last
    ctx.font = '9px IBM Plex Mono, monospace'
    ctx.fillStyle = 'var(--text3, #445566)'
    ctx.textAlign = 'left'
    ctx.fillText(`${values[0].toFixed(0)} €`, PAD.left, height - 6)
    ctx.textAlign = 'right'
    ctx.fillStyle = lineColor
    ctx.fillText(`${values.at(-1).toFixed(0)} €`, width - PAD.right, height - 6)

  }, [data, width, height])

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  )
}

const sectionTitle = {
  fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
  letterSpacing: '0.06em', color: 'var(--text3)', marginBottom: 12,
}

const labelStyle = {
  display: 'block', fontSize: 10, fontWeight: 600, color: 'var(--text3)',
  textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4,
}

const qteBtn = {
  width: 30, height: 30, background: 'var(--bg3)', border: '1px solid var(--border)',
  borderRadius: 6, color: 'var(--text2)', fontSize: 16, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}
