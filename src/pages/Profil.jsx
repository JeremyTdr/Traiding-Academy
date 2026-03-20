import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import { useProfile } from '../hooks/useProfile'
import { useProgression } from '../hooks/useProgression'

function getInitiales(pseudo, email) {
  const src = pseudo?.trim() || email || ''
  const parts = src.split(/[\s@._-]/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return src.slice(0, 2).toUpperCase()
}

function getAvatarColor(str) {
  const colors = [
    '#f0b429', '#38bdf8', '#34d399', '#a78bfa', '#fb7185',
    '#fb923c', '#22d3ee', '#4ade80', '#818cf8', '#f472b6',
  ]
  let hash = 0
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

export default function Profil() {
  const { user }                      = useAuth()
  const { profile, saving, updatePseudo } = useProfile(user)
  const { chapitresValides, getNiveau }   = useProgression(user)
  const niveau                            = getNiveau()

  const [input, setInput]     = useState('')
  const [saved, setSaved]     = useState(false)

  useEffect(() => {
    if (profile) setInput(profile.pseudo ?? '')
  }, [profile])

  async function handleSubmit(e) {
    e.preventDefault()
    await updatePseudo(input.trim())
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const displayName = profile?.pseudo?.trim() || user?.email || ''
  const initiales   = getInitiales(profile?.pseudo, user?.email)
  const avatarColor = getAvatarColor(displayName)

  return (
    <div>
      <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 26, marginBottom: 32 }}>
        Mon profil
      </h1>

      {/* Avatar + infos */}
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)',
        borderRadius: 16, padding: '32px', marginBottom: 24,
        display: 'flex', alignItems: 'center', gap: 24,
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: 16,
          background: avatarColor + '22',
          border: `2px solid ${avatarColor}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, fontWeight: 700, color: avatarColor,
          flexShrink: 0,
        }}>
          {initiales}
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
            {profile?.pseudo?.trim() || 'Sans pseudo'}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 6 }}>{user?.email}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 16 }}>{niveau.icon}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold)' }}>{niveau.nom}</span>
            <span style={{ fontSize: 12, color: 'var(--text3)' }}>· {chapitresValides.length} / 10 chapitres</span>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)',
        borderRadius: 16, padding: '28px',
      }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Modifier le profil</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text2)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Pseudo
            </label>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ton pseudo affiché dans l'app"
              maxLength={30}
              style={{
                width: '100%', padding: '10px 14px',
                background: 'var(--bg3)', border: '1px solid var(--border)',
                borderRadius: 8, color: 'var(--text)', fontSize: 14,
                outline: 'none', boxSizing: 'border-box',
              }}
            />
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 6 }}>
              Affiché dans la sidebar et sur le dashboard.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '10px 22px', background: 'var(--gold)', color: '#000',
                fontWeight: 700, fontSize: 14, borderRadius: 8, border: 'none',
                cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? 'Enregistrement…' : 'Enregistrer'}
            </button>
            {saved && (
              <span style={{ fontSize: 13, color: 'var(--green)', fontWeight: 600 }}>
                ✓ Profil mis à jour
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
