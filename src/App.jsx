import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AuthProvider, useAuth } from './hooks/useAuth.jsx'
import { SimulatorProvider } from './hooks/useSimulatorContext.jsx'
import AppLayout  from './components/layout/AppLayout'
import Auth       from './pages/Auth'

const Dashboard  = lazy(() => import('./pages/Dashboard'))
const Cours      = lazy(() => import('./pages/Cours'))
const Quiz       = lazy(() => import('./pages/Quiz'))
const Simulator  = lazy(() => import('./pages/Simulator'))
const Niveaux    = lazy(() => import('./pages/Niveaux'))
const Profil     = lazy(() => import('./pages/Profil'))
const NotFound   = lazy(() => import('./pages/NotFound'))

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
    <Suspense fallback={<LoadingScreen />}>
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
    </Suspense>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SimulatorProvider>
          <AppRoutes />
        </SimulatorProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
