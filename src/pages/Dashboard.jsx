import { useNavigate } from 'react-router-dom'
import { ChevronRight, Zap, LineChart, TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { getIcon } from '../lib/icons'
import { useSimulatorContext } from '../hooks/useSimulatorContext.jsx'
import { CapitalChart } from './Simulator'
import { useAuth } from '../hooks/useAuth.jsx'
import { useProgression } from '../hooks/useProgression'
import { useProfile } from '../hooks/useProfile'
import { CHAPITRES } from '../content/chapitres'
import { NIVEAUX } from '../content/niveaux'

function ChapterIcon({ name, size = 16, color }) {
  const Icon = getIcon(name)
  if (!Icon) return null
  return <Icon size={size} color={color} strokeWidth={1.8} />
}

export default function Dashboard() {
  const { user }                               = useAuth()
  const { chapitresValides, getNiveau }        = useProgression(user)
  const { profile }                            = useProfile(user)
  const navigate                               = useNavigate()
  const niveau                                 = getNiveau()
  const niveauIdx                              = NIVEAUX.findIndex(n => n.id === niveau.id)
  const prochainNiveau                         = NIVEAUX[niveauIdx + 1] ?? null

  // Prochain chapitre à faire
  const prochainsCh = CHAPITRES
    .filter(ch => !chapitresValides.includes(ch.id) && !ch.verrou)
    .filter(ch => ch.id === 1 || chapitresValides.includes(ch.id - 1))
    .slice(0, 3)

  const progression = chapitresValides.length
  const total       = 10

  const { capital: simCapital, positions: simPos, historique: simHisto, courbeCapital } = useSimulatorContext()
  const simPositions = simPos.length
  const simPerf      = ((simCapital - 10000) / 10000) * 100
  const simTrades    = simHisto.length

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 28, color: 'var(--text)', marginBottom: 4 }}>
          Bonjour{profile?.pseudo?.trim() ? `, ${profile.pseudo.trim()}` : ''}
        </h1>
        <p style={{ color: 'var(--text2)', fontSize: 14 }}>
          Voici où tu en es dans ta formation.
        </p>
      </div>

      {/* Niveau hero */}
      <div style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderTop: '2px solid var(--gold)',
        borderRadius: 8,
        padding: '28px 32px',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 12,
            background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {(() => { const I = getIcon(niveau.icon); return I ? <I size={26} color="var(--gold)" strokeWidth={1.5} /> : null })()}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>
              Niveau actuel
            </div>
            <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 26, color: 'var(--text)', marginBottom: 4 }}>
              {niveau.nom}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text2)' }}>{niveau.desc}</div>
          </div>
        </div>

        {prochainNiveau && (
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 8 }}>
              Prochain niveau : <strong style={{ color: 'var(--text2)' }}>{prochainNiveau.nom}</strong>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 10 }}>
              {prochainNiveau.requis - progression} chapitre{prochainNiveau.requis - progression > 1 ? 's' : ''} restant{prochainNiveau.requis - progression > 1 ? 's' : ''}
            </div>
            <MiniProgressBar value={progression} max={prochainNiveau.requis} />
          </div>
        )}
        {!prochainNiveau && (
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, color: 'var(--green)', fontWeight: 600 }}>Formation complète 🏆</div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        <StatCard label="Chapitres validés" value={`${progression} / ${total}`} color="var(--green)" accent="var(--green)" />
        <StatCard label="Module en cours" value={getModuleEnCours(chapitresValides)} color="var(--blue)" accent="var(--blue)" />
        <StatCard label="Progression globale" value={`${Math.round((progression / total) * 100)}%`} color="var(--gold)" accent="var(--gold)" />
      </div>

      {/* Prochains chapitres */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>
            {prochainsCh.length > 0 ? 'Continuer la formation' : 'Formation terminée'}
          </h2>
          <button
            onClick={() => navigate('/cours')}
            style={{ fontSize: 12, color: 'var(--cyan)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.02em' }}
          >
            Voir tous les chapitres →
          </button>
        </div>

        {prochainsCh.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {prochainsCh.map((ch, i) => (
              <button
                key={ch.id}
                onClick={() => navigate('/cours')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '14px 18px',
                  background: i === 0 ? 'var(--bg2)' : 'var(--bg3)',
                  border: '1px solid var(--border)',
                  borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: i === 0 ? 'rgba(0,212,170,0.1)' : 'var(--bg4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ChapterIcon name={ch.icon} size={16} color={i === 0 ? 'var(--cyan)' : 'var(--text3)'} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? 'var(--text)' : 'var(--text2)', marginBottom: 2 }}>
                    {i === 0 && <span style={{ color: 'var(--cyan)', marginRight: 6, fontSize: 10 }}>●</span>}
                    {ch.id}. {ch.titre}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text3)' }}>{ch.module}</div>
                </div>
                <ChevronRight size={14} color="var(--text3)" />
              </button>
            ))}
          </div>
        ) : (
          <div style={{
            padding: '28px', textAlign: 'center',
            background: 'var(--bg2)', borderRadius: 12, border: '1px solid var(--border)',
          }}>
            <div style={{ fontWeight: 600, marginBottom: 4, color: 'var(--gold)' }}>Tous les chapitres validés</div>
            <div style={{ fontSize: 13, color: 'var(--text2)' }}>Tu as complété la formation TradeAcademy.</div>
          </div>
        )}
      </div>

      {/* Outils */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 12 }}>
          Outils
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>

          {/* Quiz rapide */}
          <button onClick={() => navigate('/quiz')} style={toolCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 7, background: 'rgba(0,212,170,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={15} color="var(--cyan)" strokeWidth={2} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>Quiz rapide</div>
              <ChevronRight size={13} color="var(--text3)" style={{ marginLeft: 'auto' }} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--text3)', lineHeight: 1.5 }}>
              Entraîne-toi avec des questions aléatoires sur l&apos;ensemble du programme.
            </div>
          </button>

          {/* Simulateur */}
          <button onClick={() => navigate('/simulator')} style={{ ...toolCard, borderTop: '2px solid var(--purple)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 7, background: 'rgba(167,139,250,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LineChart size={15} color="var(--purple)" strokeWidth={2} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>Simulateur</div>
              <ChevronRight size={13} color="var(--text3)" style={{ marginLeft: 'auto' }} />
            </div>

            {/* Stats portefeuille virtuel */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>Capital</div>
                <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text)' }}>
                  {simCapital.toFixed(0)} €
                </div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>Perf.</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {simPerf >= 0
                    ? <TrendingUp size={12} color="var(--green)" />
                    : <TrendingDown size={12} color="var(--red)" />
                  }
                  <span style={{ fontSize: 14, fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace', color: simPerf >= 0 ? 'var(--green)' : 'var(--red)' }}>
                    {simPerf >= 0 ? '+' : ''}{simPerf.toFixed(2)}%
                  </span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>Trades</div>
                <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text)' }}>
                  {simTrades}
                </div>
              </div>
            </div>

            {/* Courbe capital */}
            {courbeCapital?.length > 1
              ? <CapitalChart data={courbeCapital} height={80} />
              : (
                <div style={{ height: 2, background: 'var(--bg4)', borderRadius: 1, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.min(Math.abs(simPerf) * 5, 100)}%`,
                    background: simPerf >= 0 ? 'var(--green)' : 'var(--red)',
                    borderRadius: 1, transition: 'width 0.4s',
                  }} />
                </div>
              )
            }
            {simPositions > 0 && (
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
                <Wallet size={11} color="var(--gold)" />
                <span style={{ fontSize: 11, color: 'var(--gold)' }}>{simPositions} position{simPositions > 1 ? 's' : ''} ouverte{simPositions > 1 ? 's' : ''}</span>
              </div>
            )}
          </button>

        </div>
      </div>

      {/* Barre de progression globale */}
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)',
        borderRadius: 8, padding: '20px 24px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Progression globale</span>
          <span style={{ fontSize: 13, color: 'var(--text2)' }}>{progression} / {total} chapitres</span>
        </div>
        <div style={{ height: 8, background: 'var(--bg3)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${(progression / total) * 100}%`,
            background: 'linear-gradient(90deg, var(--cyan), var(--gold))',
            borderRadius: 4,
            transition: 'width 0.5s ease',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          {NIVEAUX.map(nv => {
            const I = getIcon(nv.icon)
            const atteint = progression >= nv.requis
            return (
              <div key={nv.id} style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
                  {I && <I size={18} color={atteint ? 'var(--gold)' : 'var(--text3)'} strokeWidth={atteint ? 2 : 1.5} />}
                </div>
                <div style={{ fontSize: 10, color: atteint ? 'var(--gold)' : 'var(--text3)' }}>
                  {nv.nom}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, color, accent }) {
  return (
    <div style={{
      background: 'var(--bg2)',
      border: '1px solid var(--border)',
      borderTop: `2px solid ${accent}`,
      borderRadius: 8,
      padding: '18px 20px',
    }}>
      <div style={{
        fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase',
        letterSpacing: '0.08em', fontWeight: 600, marginBottom: 10,
      }}>
        {label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color, fontFamily: 'IBM Plex Mono, monospace' }}>
        {value}
      </div>
    </div>
  )
}

function MiniProgressBar({ value, max }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div style={{ width: 160, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
      <div style={{
        height: '100%', width: `${pct}%`,
        background: 'var(--gold)', borderRadius: 3,
        transition: 'width 0.4s',
      }} />
    </div>
  )
}

const toolCard = {
  display: 'block', width: '100%', padding: '16px',
  background: 'var(--bg2)', border: '1px solid var(--border)',
  borderTop: '2px solid var(--cyan)',
  borderRadius: 8, cursor: 'pointer', textAlign: 'left',
  transition: 'all 0.15s',
}

function getModuleEnCours(chapitresValides) {
  const n = chapitresValides.length
  if (n < 2)  return 'Module 1'
  if (n < 6)  return 'Module 2'
  if (n < 10) return 'Module 3'
  return 'Module 4'
}
