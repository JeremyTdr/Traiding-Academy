import { useState, useEffect } from 'react'
import { Zap, RotateCcw, ArrowRight, CheckCircle2, XCircle, ChevronRight } from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'
import { useProgression } from '../hooks/useProgression'
import { loadModule, getChapitresCharges } from '../content/chapitres/index'

const MODES = [
  { id: 'all',      label: 'Tous les chapitres', desc: 'Questions sur l\'ensemble du programme' },
  { id: 'valides',  label: 'Chapitres validés',  desc: 'Révise ce que tu as déjà appris' },
]
const NB_QUESTIONS = 10

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildQuestions(chapitresValides, mode) {
  const pool = getChapitresCharges()
    .filter(ch => mode === 'all' || chapitresValides.includes(ch.id))
    .flatMap(ch => ch.qcm.map(q => ({ ...q, chapitre: ch.titre, chapitreId: ch.id })))
  return shuffleArray(pool).slice(0, NB_QUESTIONS)
}

export default function Quiz() {
  const { user }                      = useAuth()
  const { chapitresValides }          = useProgression(user)
  const [mode, setMode]               = useState(null)       // null = écran d'accueil
  const [pret, setPret]               = useState(false)
  const [questions, setQuestions]     = useState([])
  const [index, setIndex]             = useState(0)
  const [selected, setSelected]       = useState(null)
  const [confirmed, setConfirmed]     = useState(false)
  const [score, setScore]             = useState(0)
  const [termine, setTermine]         = useState(false)
  const [history, setHistory]         = useState([])         // { correct, expl, chapitre }

  useEffect(() => {
    Promise.all([loadModule(2), loadModule(3), loadModule(4)]).then(() => setPret(true))
  }, [])

  const hasValides = chapitresValides.length > 0

  if (!pret) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: 10, color: 'var(--text3)', fontSize: 13 }}>
      <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid var(--border)', borderTopColor: 'var(--cyan)', animation: 'spin 0.7s linear infinite' }} />
      Chargement des questions…
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  function demarrer(m) {
    const qs = buildQuestions(chapitresValides, m)
    if (qs.length === 0) return
    setMode(m)
    setQuestions(qs)
    setIndex(0); setSelected(null); setConfirmed(false)
    setScore(0); setTermine(false); setHistory([])
  }

  function confirmer() {
    if (selected === null) return
    const q = questions[index]
    const correct = selected === q.correct
    setConfirmed(true)
    if (correct) setScore(s => s + 1)
    setHistory(h => [...h, { correct, expl: q.expl, chapitre: q.chapitre }])
  }

  function suivant() {
    if (index + 1 < questions.length) {
      setIndex(i => i + 1); setSelected(null); setConfirmed(false)
    } else {
      setTermine(true)
    }
  }

  function recommencer() { demarrer(mode) }
  function retourAccueil() { setMode(null) }

  // ── Écran d'accueil ─────────────────────────────────────
  if (!mode) {
    return (
      <div>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <Zap size={20} color="var(--cyan)" strokeWidth={2} />
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 26, color: 'var(--text)' }}>
              Quiz rapide
            </h1>
          </div>
          <p style={{ color: 'var(--text2)', fontSize: 13 }}>
            {NB_QUESTIONS} questions tirées aléatoirement · Entraînement libre, sans score sauvegardé
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MODES.map(m => {
            const disabled = m.id === 'valides' && !hasValides
            return (
              <button
                key={m.id}
                onClick={() => !disabled && demarrer(m.id)}
                disabled={disabled}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '18px 20px',
                  background: 'var(--bg2)', border: '1px solid var(--border)',
                  borderTop: `2px solid ${m.id === 'all' ? 'var(--cyan)' : 'var(--gold)'}`,
                  borderRadius: 8, cursor: disabled ? 'not-allowed' : 'pointer',
                  textAlign: 'left', opacity: disabled ? 0.4 : 1,
                  transition: 'all 0.15s',
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text3)' }}>
                    {m.id === 'valides' && !hasValides
                      ? 'Valide au moins un chapitre pour débloquer'
                      : m.desc
                    }
                  </div>
                </div>
                <ChevronRight size={16} color="var(--text3)" />
              </button>
            )
          })}
        </div>

        {chapitresValides.length > 0 && (
          <div style={{
            marginTop: 24, padding: '14px 18px',
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 8, fontSize: 12, color: 'var(--text3)',
            fontFamily: 'IBM Plex Mono, monospace',
          }}>
            {chapitresValides.length * 5} questions disponibles dans ta banque
          </div>
        )}
      </div>
    )
  }

  // ── Résultat ─────────────────────────────────────────────
  if (termine) {
    const pct = Math.round((score / questions.length) * 100)
    const reussi = pct >= 70
    return (
      <div>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          {reussi
            ? <CheckCircle2 size={48} color="var(--green)" strokeWidth={1.5} style={{ margin: '0 auto 16px' }} />
            : <XCircle size={48} color="var(--red)" strokeWidth={1.5} style={{ margin: '0 auto 16px' }} />
          }
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, marginBottom: 8 }}>
            {reussi ? 'Bonne session !' : 'À retravailler'}
          </h2>
          <div style={{ fontSize: 48, fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace', color: reussi ? 'var(--green)' : 'var(--red)', marginBottom: 4 }}>
            {pct}%
          </div>
          <div style={{ fontSize: 13, color: 'var(--text3)' }}>
            {score} / {questions.length} bonnes réponses
          </div>
        </div>

        {/* Récap des réponses */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
          {history.map((h, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 12,
              padding: '12px 14px',
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderLeft: `2px solid ${h.correct ? 'var(--green)' : 'var(--red)'}`,
              borderRadius: 8, fontSize: 12,
            }}>
              {h.correct
                ? <CheckCircle2 size={14} color="var(--green)" style={{ flexShrink: 0, marginTop: 1 }} />
                : <XCircle size={14} color="var(--red)" style={{ flexShrink: 0, marginTop: 1 }} />
              }
              <div>
                <div style={{ color: 'var(--text3)', marginBottom: 2, fontFamily: 'IBM Plex Mono, monospace', fontSize: 10 }}>
                  {h.chapitre}
                </div>
                <div style={{ color: 'var(--text2)', lineHeight: 1.5 }}>{h.expl}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={recommencer} className="btn-primary">
            <RotateCcw size={13} /> Nouveau quiz
          </button>
          <button onClick={retourAccueil} className="btn-secondary">
            Changer de mode
          </button>
        </div>
      </div>
    )
  }

  // ── Question ─────────────────────────────────────────────
  const q = questions[index]
  return (
    <div>
      {/* Nav */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid var(--border)',
      }}>
        <button onClick={retourAccueil} className="btn-secondary">← Accueil</button>
        <div style={{ fontSize: 12, color: 'var(--text3)', letterSpacing: '0.03em' }}>
          <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>Quiz rapide</span>
          <span style={{ margin: '0 6px', opacity: 0.4 }}>·</span>
          <span style={{ fontFamily: 'IBM Plex Mono, monospace' }}>{index + 1}/{questions.length}</span>
        </div>
        <div style={{ fontSize: 11, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--green)' }}>
          {score} pts
        </div>
      </div>

      {/* Barre de progression */}
      <div style={{ height: 2, background: 'var(--bg4)', borderRadius: 1, marginBottom: 24, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${((index + 1) / questions.length) * 100}%`,
          background: 'var(--cyan)', borderRadius: 1, transition: 'width 0.3s',
        }} />
      </div>

      {/* Tag chapitre */}
      <div style={{
        display: 'inline-block', fontSize: 10, fontWeight: 700,
        letterSpacing: '0.06em', textTransform: 'uppercase',
        color: 'var(--text3)', fontFamily: 'IBM Plex Mono, monospace',
        marginBottom: 16,
      }}>
        {q.chapitre}
      </div>

      {/* Question */}
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)',
        borderTop: '2px solid var(--cyan)',
        borderRadius: 8, padding: '22px 22px 18px', marginBottom: 14,
      }}>
        <p style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.55, marginBottom: 20 }}>{q.q}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {q.opts.map((opt, i) => {
            let bg = 'var(--bg3)', border = 'var(--border)', color = 'var(--text)'
            if (selected === i && !confirmed) { bg = 'rgba(0,212,170,0.08)'; border = 'var(--cyan)'; color = 'var(--cyan)' }
            if (confirmed) {
              if (i === q.correct)     { bg = 'rgba(0,192,118,0.1)'; border = 'rgba(0,192,118,0.4)'; color = 'var(--green)' }
              else if (i === selected) { bg = 'rgba(255,77,77,0.08)'; border = 'rgba(255,77,77,0.35)'; color = 'var(--red)' }
            }
            return (
              <button key={i}
                onClick={() => !confirmed && setSelected(i)}
                disabled={confirmed}
                style={{
                  padding: '11px 14px', background: bg, border: `1px solid ${border}`,
                  borderRadius: 6, color, fontSize: 13, textAlign: 'left',
                  cursor: confirmed ? 'default' : 'pointer', transition: 'all 0.15s',
                }}
              >
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, opacity: 0.5, marginRight: 10 }}>
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
              </button>
            )
          })}
        </div>

        {confirmed && (
          <div style={{
            marginTop: 14, padding: '12px 14px',
            background: selected === q.correct ? 'rgba(0,192,118,0.06)' : 'rgba(255,77,77,0.06)',
            borderRadius: 6, fontSize: 12, color: 'var(--text2)', lineHeight: 1.6,
          }}>
            <strong style={{ color: selected === q.correct ? 'var(--green)' : 'var(--red)' }}>
              {selected === q.correct ? '✓ Correct' : '✗ Incorrect'}
            </strong>
            {' — '}{q.expl}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {!confirmed ? (
          <button onClick={confirmer} disabled={selected === null} className="btn-primary">
            Valider
          </button>
        ) : (
          <button onClick={suivant} className="btn-primary">
            <ArrowRight size={14} />
            {index + 1 < questions.length ? 'Question suivante' : 'Voir le résultat'}
          </button>
        )}
      </div>
    </div>
  )
}
