import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth.jsx'
import AppLayout  from './components/layout/AppLayout'
import Auth       from './pages/Auth'
import Dashboard  from './pages/Dashboard'
import Cours      from './pages/Cours'
import Quiz       from './pages/Quiz'
import Simulator  from './pages/Simulator'
import Niveaux    from './pages/Niveaux'
import Profil     from './pages/Profil'
import NotFound   from './pages/NotFound'

function LoadingScreen() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', flexDirection: 'column', gap: 16,
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        border: '2px solid var(--border)',
        borderTopColor: 'var(--cyan)',
        animation: 'spin 0.7s linear infinite',
      }} />
      <div style={{ fontSize: 12, color: 'var(--text3)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.05em' }}>
        CHARGEMENT…
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (!user)   return <Navigate to="/auth" replace />
  return children
}

function AppRoutes() {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen />

  return (
    <Routes>
      <Route path="/auth" element={user ? <Navigate to="/" replace /> : <Auth />} />
      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="/"          element={<Dashboard />} />
        <Route path="/cours"     element={<Cours />} />
        <Route path="/quiz"      element={<Quiz />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/niveaux"   element={<Niveaux />} />
        <Route path="/profil"    element={<Profil />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
