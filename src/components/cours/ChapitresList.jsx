import * as LucideIcons from 'lucide-react'
import { CheckCircle, Lock, ChevronRight } from 'lucide-react'
import { CHAPITRES } from '../../content/chapitres'

const MODULE_COLORS = {
  'Module 1 — Fondamentaux':      { color: 'var(--blue)',   bg: 'rgba(61,142,248,0.08)',   border: 'rgba(61,142,248,0.18)'  },
  'Module 2 — Lire les marchés':  { color: 'var(--cyan)',   bg: 'rgba(0,212,170,0.08)',    border: 'rgba(0,212,170,0.18)'   },
  'Module 3 — Stratégies & Risk': { color: 'var(--purple)', bg: 'rgba(167,139,250,0.08)',  border: 'rgba(167,139,250,0.18)' },
  'Module 4 — Avancé':            { color: 'var(--gold)',   bg: 'rgba(240,180,41,0.08)',   border: 'rgba(240,180,41,0.18)'  },
}

function ChapterIcon({ name, size = 16, color }) {
  const Icon = LucideIcons[name]
  if (!Icon) return null
  return <Icon size={size} color={color} strokeWidth={1.8} />
}

export default function ChapitresList({ chapitresValides, onOuvrir }) {
  const modules = {}
  for (const ch of CHAPITRES) {
    if (!modules[ch.module]) modules[ch.module] = []
    modules[ch.module].push(ch)
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 26, color: 'var(--text)', marginBottom: 4 }}>
          Formation
        </h1>
        <p style={{ color: 'var(--text2)', fontSize: 13 }}>
          <span style={{ fontFamily: 'IBM Plex Mono, monospace', color: 'var(--cyan)' }}>{chapitresValides.length}/10</span>
          {' '}chapitres validés
        </p>
      </div>

      {Object.entries(modules).map(([module, chapitres]) => {
        const theme = MODULE_COLORS[module] ?? { color: 'var(--text2)', bg: 'var(--bg3)', border: 'var(--border)' }
        const validesModule = chapitres.filter(ch => chapitresValides.includes(ch.id)).length

        return (
          <div key={module} style={{ marginBottom: 28 }}>
            {/* En-tête module */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 10, paddingLeft: 2,
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: theme.color,
              }}>
                {module}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'IBM Plex Mono, monospace' }}>
                {validesModule}/{chapitres.length}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {chapitres.map(ch => {
                const valide          = chapitresValides.includes(ch.id)
                const precedentOk     = ch.id === 1 || chapitresValides.includes(ch.id - 1)
                const verrouilleNiveau = ch.verrou && chapitresValides.length < (ch.verrou * 2)
                const accessible      = precedentOk && !verrouilleNiveau

                return (
                  <button
                    key={ch.id}
                    onClick={() => accessible && onOuvrir(ch.id)}
                    disabled={!accessible}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '12px 16px',
                      background: valide ? 'rgba(0,192,118,0.05)' : 'var(--bg2)',
                      border: `1px solid ${valide ? 'rgba(0,192,118,0.18)' : 'var(--border)'}`,
                      borderTop: valide ? `2px solid var(--green)` : `2px solid ${accessible ? theme.color : 'var(--border)'}`,
                      borderRadius: 8,
                      cursor: accessible ? 'pointer' : 'not-allowed',
                      opacity: accessible ? 1 : 0.38,
                      textAlign: 'left',
                      transition: 'all 0.15s',
                    }}
                  >
                    {/* Icône */}
                    <div style={{
                      width: 34, height: 34, borderRadius: 7, flexShrink: 0,
                      background: valide ? 'rgba(0,192,118,0.12)' : theme.bg,
                      border: `1px solid ${valide ? 'rgba(0,192,118,0.2)' : theme.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {valide
                        ? <CheckCircle size={16} color="var(--green)" strokeWidth={2} />
                        : ch.verrou
                          ? <Lock size={14} color="var(--text3)" strokeWidth={1.8} />
                          : <ChapterIcon name={ch.icon} size={15} color={theme.color} />
                      }
                    </div>

                    {/* Titre */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: 13, fontWeight: 500,
                        color: valide ? 'var(--green)' : accessible ? 'var(--text)' : 'var(--text3)',
                        marginBottom: 1,
                      }}>
                        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--text3)', marginRight: 6 }}>
                          {String(ch.id).padStart(2, '0')}
                        </span>
                        {ch.titre}
                      </div>
                      {ch.verrou && !accessible && (
                        <div style={{ fontSize: 11, color: 'var(--text3)' }}>Débloqué au niveau Trader</div>
                      )}
                    </div>

                    {/* Badge / chevron */}
                    {valide ? (
                      <span style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
                        color: 'var(--green)', background: 'rgba(0,192,118,0.1)',
                        padding: '3px 8px', borderRadius: 4, flexShrink: 0,
                        textTransform: 'uppercase',
                      }}>
                        Validé
                      </span>
                    ) : accessible ? (
                      <ChevronRight size={14} color="var(--text3)" />
                    ) : null}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
