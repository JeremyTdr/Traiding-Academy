import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import { useNavigate } from 'react-router-dom'
import { LineChart } from 'lucide-react'

export default function Auth() {
  const { signIn, signUp }     = useAuth()
  const navigate               = useNavigate()
  const [mode, setMode]        = useState('login') // 'login' | 'register'
  const [email, setEmail]      = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]      = useState(null)
  const [loading, setLoading]  = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: err } = mode === 'login'
      ? await signIn(email, password)
      : await signUp(email, password)

    setLoading(false)
    if (err) { setError(err.message); return }
    navigate('/')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: 400,
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: 40,
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'rgba(240,180,41,0.12)', border: '1px solid rgba(240,180,41,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <LineChart size={16} color="var(--gold)" strokeWidth={2.5} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text)' }}>
              TRADE<span style={{ color: 'var(--gold)' }}>ACADEMY</span>
            </div>
          </div>
          <div style={{ color: 'var(--text3)', fontSize: 13 }}>
            {mode === 'login' ? 'Connecte-toi pour reprendre ta formation' : 'Crée ton compte gratuit'}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 6, display: 'block' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="ton@email.com"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 6, display: 'block' }}>
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={inputStyle}
            />
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '10px 14px', color: 'var(--red)', fontSize: 13 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 0',
              background: 'var(--gold)',
              color: '#000',
              fontWeight: 700,
              fontSize: 14,
              borderRadius: 9,
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              marginTop: 4,
            }}
          >
            {loading ? '…' : mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'var(--text3)' }}>
          {mode === 'login' ? (
            <>Pas encore de compte ?{' '}
              <button onClick={() => setMode('register')} style={linkBtn}>S&apos;inscrire</button>
            </>
          ) : (
            <>Déjà un compte ?{' '}
              <button onClick={() => setMode('login')} style={linkBtn}>Se connecter</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  background: 'var(--bg3)',
  border: '1px solid var(--border2)',
  borderRadius: 8,
  color: 'var(--text)',
  fontSize: 14,
  outline: 'none',
}

const linkBtn = {
  background: 'none',
  border: 'none',
  color: 'var(--gold)',
  cursor: 'pointer',
  fontSize: 13,
  textDecoration: 'underline',
}
