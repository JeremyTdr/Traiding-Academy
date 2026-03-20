import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Zap, LineChart, Trophy, LogOut, User } from 'lucide-react'
import { getIcon } from '../../lib/icons'
import { useAuth } from '../../hooks/useAuth.jsx'
import { useProgression } from '../../hooks/useProgression'
import { useProfile } from '../../hooks/useProfile'

function getInitiales(pseudo, email) {
  const src = pseudo?.trim() || email || ''
  const parts = src.split(/[\s@._-]/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return src.slice(0, 2).toUpperCase()
}

function getAvatarColor(str) {
  const colors = ['#f0b429','#00d4aa','#3d8ef8','#a78bfa','#ff4d4d','#fb923c','#22d3ee','#4ade80']
  let hash = 0
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

const NAV = [
  { to: '/',          Icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/cours',     Icon: BookOpen,        label: 'Cours' },
  { to: '/quiz',      Icon: Zap,             label: 'Quiz rapide' },
  { to: '/simulator', Icon: LineChart,       label: 'Simulateur' },
  { to: '/niveaux',   Icon: Trophy,          label: 'Niveaux' },
]

export default function Sidebar() {
  const { user, signOut }                = useAuth()
  const { chapitresValides, getNiveau }  = useProgression(user)
  const { profile }                      = useProfile(user)
  const navigate                         = useNavigate()
  const niveau                           = getNiveau()

  const displayName = profile?.pseudo?.trim() || user?.email || ''
  const initiales   = getInitiales(profile?.pseudo, user?.email)
  const avatarColor = getAvatarColor(displayName)

  const pct = Math.round((chapitresValides.length / 10) * 100)

  return (
    <aside style={{
      width: 224,
      minHeight: '100vh',
      background: 'var(--bg2)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: '20px 20px 18px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6,
            background: 'rgba(240,180,41,0.12)',
            border: '1px solid rgba(240,180,41,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <LineChart size={14} color="var(--gold)" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', color: 'var(--text)' }}>
              TRADE<span style={{ color: 'var(--gold)' }}>ACADEMY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 10px' }}>
        {NAV.map(({ to, Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 12px',
              borderRadius: 6,
              marginBottom: 1,
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? 'var(--cyan)' : 'var(--text2)',
              background: isActive ? 'rgba(0,212,170,0.08)' : 'transparent',
              borderLeft: isActive ? '2px solid var(--cyan)' : '2px solid transparent',
              textDecoration: 'none',
              transition: 'all 0.15s',
              letterSpacing: '0.01em',
            })}
          >
            {({ isActive }) => (
              <>
                <Icon size={15} strokeWidth={isActive ? 2.5 : 1.8} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Progression bar */}
      <div style={{ padding: '0 16px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 11, color: 'var(--text3)' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>Progression</span>
          <span style={{ fontFamily: 'IBM Plex Mono, monospace', color: 'var(--cyan)' }}>{pct}%</span>
        </div>
        <div style={{ height: 3, background: 'var(--bg4)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${pct}%`,
            background: 'linear-gradient(90deg, var(--cyan), var(--gold))',
            borderRadius: 2, transition: 'width 0.4s',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 11, color: 'var(--text3)' }}>
          <span style={{ color: 'var(--gold)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            {(() => { const I = getIcon(niveau.icon); return I ? <I size={11} color="var(--gold)" strokeWidth={2.5} /> : null })()}
            {niveau.nom}
          </span>
          <span style={{ fontFamily: 'IBM Plex Mono, monospace' }}>{chapitresValides.length}/10</span>
        </div>
      </div>

      {/* User */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid var(--border)' }}>
        <button
          onClick={() => navigate('/profil')}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 10px', marginBottom: 6,
            background: 'var(--bg3)', border: '1px solid var(--border)',
            borderRadius: 6, cursor: 'pointer', textAlign: 'left',
          }}
        >
          <div style={{
            width: 28, height: 28, borderRadius: 6, flexShrink: 0,
            background: avatarColor + '20', border: `1px solid ${avatarColor}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 700, color: avatarColor,
            fontFamily: 'IBM Plex Mono, monospace',
          }}>
            {initiales}
          </div>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {profile?.pseudo?.trim() || 'Mon profil'}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 3 }}>
              <User size={9} /> Profil
            </div>
          </div>
        </button>

        {user && (
          <button
            onClick={signOut}
            style={{
              width: '100%', padding: '7px 0',
              background: 'transparent', border: '1px solid var(--border)',
              borderRadius: 6, color: 'var(--text3)', fontSize: 12,
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 6,
            }}
          >
            <LogOut size={12} strokeWidth={1.8} />
            Déconnexion
          </button>
        )}
      </div>
    </aside>
  )
}
