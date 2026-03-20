import { CheckCircle2 } from 'lucide-react'
import { getIcon } from '../lib/icons'
import { useAuth } from '../hooks/useAuth.jsx'
import { useProgression } from '../hooks/useProgression'
import { NIVEAUX } from '../content/niveaux'
import { CHAPITRES } from '../content/chapitres'

function LucideIcon({ name, size, color, strokeWidth = 1.8 }) {
  const Icon = getIcon(name)
  if (!Icon) return null
  return <Icon size={size} color={color} strokeWidth={strokeWidth} />
}

export default function Niveaux() {
  const { user }                        = useAuth()
  const { chapitresValides, getNiveau } = useProgression(user)
  const niveauActuel                    = getNiveau()
  const niveauIdx                       = NIVEAUX.findIndex(n => n.id === niveauActuel.id)

  return (
    <div>
      <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 26, color: 'var(--text)', marginBottom: 4 }}>
        Niveaux
      </h1>
      <p style={{ color: 'var(--text2)', fontSize: 13, marginBottom: 32 }}>
        Ta progression dans la formation TradeAcademy.
      </p>

      {/* Track des niveaux */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
        {NIVEAUX.map((nv, i) => {
          const atteint   = chapitresValides.length >= nv.requis
          const estActuel = nv.id === niveauActuel.id
          const suivant   = i === niveauIdx + 1

          return (
            <div
              key={nv.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 20,
                padding: '18px 22px',
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderTop: `2px solid ${estActuel ? 'var(--gold)' : atteint ? 'var(--green)' : 'var(--border)'}`,
                borderRadius: 8,
                opacity: (!atteint && !suivant && !estActuel) ? 0.45 : 1,
              }}
            >
              {/* Icône */}
              <div style={{
                width: 44, height: 44, borderRadius: 8, flexShrink: 0,
                background: atteint
                  ? 'rgba(0,192,118,0.1)'
                  : estActuel ? 'rgba(240,180,41,0.1)' : 'var(--bg3)',
                border: `1px solid ${atteint ? 'rgba(0,192,118,0.2)' : estActuel ? 'rgba(240,180,41,0.2)' : 'var(--border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <LucideIcon
                  name={nv.icon}
                  size={20}
                  color={atteint ? 'var(--green)' : estActuel ? 'var(--gold)' : 'var(--text3)'}
                  strokeWidth={estActuel || atteint ? 2 : 1.5}
                />
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{
                    fontSize: 15, fontWeight: 700,
                    color: estActuel ? 'var(--gold)' : atteint ? 'var(--green)' : 'var(--text2)',
                  }}>
                    {nv.nom}
                  </span>
                  {estActuel && (
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.07em',
                      textTransform: 'uppercase', color: 'var(--gold)',
                      background: 'rgba(240,180,41,0.1)',
                      padding: '2px 8px', borderRadius: 4,
                    }}>
                      Actuel
                    </span>
                  )}
                  {atteint && !estActuel && (
                    <CheckCircle2 size={14} color="var(--green)" strokeWidth={2} />
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 4 }}>{nv.desc}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'IBM Plex Mono, monospace' }}>
                  {nv.requis === 0 ? 'Niveau de départ' : `${nv.requis} chapitres requis`}
                </div>
              </div>

              {/* Progression vers ce niveau */}
              {suivant && (
                <div style={{ textAlign: 'right', flexShrink: 0, minWidth: 110 }}>
                  <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'IBM Plex Mono, monospace', marginBottom: 6 }}>
                    {chapitresValides.length} / {nv.requis}
                  </div>
                  <div style={{ height: 3, width: 110, background: 'var(--bg4)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.min((chapitresValides.length / nv.requis) * 100, 100)}%`,
                      background: 'linear-gradient(90deg, var(--cyan), var(--gold))',
                      borderRadius: 2, transition: 'width 0.4s',
                    }} />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Grille des chapitres */}
      <h2 style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>
        Chapitres validés <span style={{ fontFamily: 'IBM Plex Mono, monospace', color: 'var(--cyan)' }}>{chapitresValides.length}/10</span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
        {CHAPITRES.filter(ch => !ch.verrou).map(ch => {
          const valide = chapitresValides.includes(ch.id)
          return (
            <div
              key={ch.id}
              style={{
                padding: '12px 14px',
                background: valide ? 'rgba(0,192,118,0.05)' : 'var(--bg2)',
                border: `1px solid ${valide ? 'rgba(0,192,118,0.18)' : 'var(--border)'}`,
                borderTop: `2px solid ${valide ? 'var(--green)' : 'var(--border)'}`,
                borderRadius: 8,
                display: 'flex', alignItems: 'center', gap: 12,
              }}
            >
              <div style={{
                width: 30, height: 30, borderRadius: 6, flexShrink: 0,
                background: valide ? 'rgba(0,192,118,0.1)' : 'var(--bg3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {valide
                  ? <CheckCircle2 size={14} color="var(--green)" strokeWidth={2} />
                  : <LucideIcon name={ch.icon} size={13} color="var(--text3)" />
                }
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontSize: 12, fontWeight: 500,
                  color: valide ? 'var(--text)' : 'var(--text3)',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: 'var(--text3)', marginRight: 6 }}>
                    {String(ch.id).padStart(2, '0')}
                  </span>
                  {ch.titre}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>
                  {ch.module.split(' — ')[0]}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
