import { useNavigate } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', flexDirection: 'column', gap: 20, textAlign: 'center',
      padding: '0 24px',
    }}>
      <AlertTriangle size={40} color="var(--gold)" strokeWidth={1.5} />
      <div>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 56, fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>
          404
        </div>
        <div style={{ fontSize: 15, color: 'var(--text3)', marginTop: 10 }}>
          Cette page n'existe pas.
        </div>
      </div>
      <button className="btn-primary" onClick={() => navigate('/')}>
        Retour au dashboard
      </button>
    </div>
  )
}
