import { useEffect, useState } from 'react'
import { BookOpen, RotateCcw, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
import CoursPanel from './CoursPanel'

const SEUIL = 0.7

const INITIAL_STATE = {
  index: 0,
  selected: null,
  confirmed: false,
  score: 0,
  termine: false,
}

export default function QcmView({ chapitre, persistedState, onStateChange, onRetourCours, onValide }) {
  const questions = chapitre.qcm
  const [state, setState]       = useState(persistedState ?? INITIAL_STATE)
  const [panelOpen, setPanelOpen] = useState(false)

  // Synchronise l'état vers le parent à chaque changement
  useEffect(() => { onStateChange(state) }, [state]) // eslint-disable-line react-hooks/exhaustive-deps

  function update(patch) {
    setState(s => ({ ...s, ...patch }))
  }

  const { index, selected, confirmed, score, termine } = state
  const q = questions[index]

  function confirmer() {
    if (selected === null) return
    update({
      confirmed: true,
      score: selected === q.correct ? score + 1 : score,
    })
  }

  function suivant() {
    if (index + 1 < questions.length) {
      update({ index: index + 1, selected: null, confirmed: false })
    } else {
      update({ termine: true })
    }
  }

  function recommencer() { setState(INITIAL_STATE) }

  const reussi = score / questions.length >= SEUIL

  if (termine) {
    return (
      <>
        <CoursPanel chapitre={chapitre} open={panelOpen} onClose={() => setPanelOpen(false)} />
        <ResultatQcm
        score={score}
        total={questions.length}
        reussi={reussi}
        onRecommencer={recommencer}
        onOuvrirCours={() => setPanelOpen(true)}
        onContinuer={onValide}
      />
      </>
    )
  }

  return (
    <>
      <CoursPanel chapitre={chapitre} open={panelOpen} onClose={() => setPanelOpen(false)} />
    <div>
      <NavBar onOuvrirCours={() => setPanelOpen(true)} index={index} total={questions.length} />
      <ProgressBar index={index} total={questions.length} />

      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '28px 28px 24px', marginBottom: 16,
      }}>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 12 }}>
          Question {index + 1} / {questions.length}
        </div>
        <p style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.5, marginBottom: 24 }}>{q.q}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.opts.map((opt, i) => {
            let bg = 'var(--bg3)', border = 'var(--border)', color = 'var(--text)'
            if (selected === i && !confirmed) { bg = 'rgba(59,130,246,0.12)'; border = 'var(--blue)'; color = 'var(--blue)' }
            if (confirmed) {
              if (i === q.correct)        { bg = 'rgba(34,197,94,0.12)'; border = 'rgba(34,197,94,0.5)'; color = 'var(--green)' }
              else if (i === selected)    { bg = 'rgba(239,68,68,0.1)';  border = 'rgba(239,68,68,0.4)'; color = 'var(--red)' }
            }
            return (
              <button key={i} onClick={() => !confirmed && update({ selected: i })} disabled={confirmed}
                style={{ padding: '12px 16px', background: bg, border: `1px solid ${border}`,
                  borderRadius: 8, color, fontSize: 14, textAlign: 'left',
                  cursor: confirmed ? 'default' : 'pointer', transition: 'all 0.15s' }}>
                <span style={{ opacity: 0.5, marginRight: 10 }}>{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            )
          })}
        </div>

        {confirmed && (
          <div style={{
            marginTop: 16, padding: '14px 16px',
            background: selected === q.correct ? 'rgba(34,197,94,0.07)' : 'rgba(239,68,68,0.07)',
            borderRadius: 8, fontSize: 13, color: 'var(--text2)', lineHeight: 1.6,
          }}>
            <strong style={{ color: selected === q.correct ? 'var(--green)' : 'var(--red)' }}>
              {selected === q.correct ? '✓ Correct' : '✗ Incorrect'}
            </strong>
            {' — '}{q.expl}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
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
    </>
  )
}

function ResultatQcm({ score, total, reussi, onRecommencer, onOuvrirCours, onContinuer }) {
  const pct = Math.round((score / total) * 100)
  return (
    <div style={{ textAlign: 'center', maxWidth: 440, margin: '60px auto 0' }}>
      <div style={{ marginBottom: 20 }}>
        {reussi
          ? <CheckCircle2 size={52} color="var(--green)" strokeWidth={1.5} style={{ margin: '0 auto' }} />
          : <XCircle size={52} color="var(--red)" strokeWidth={1.5} style={{ margin: '0 auto' }} />
        }
      </div>
      <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, marginBottom: 8 }}>
        {reussi ? 'QCM validé !' : 'Pas tout à fait…'}
      </h2>
      <div style={{ fontSize: 44, fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace', color: reussi ? 'var(--green)' : 'var(--red)', margin: '12px 0' }}>
        {pct}%
      </div>
      <p style={{ color: 'var(--text2)', fontSize: 13, marginBottom: 32 }}>
        {score} / {total} bonnes réponses · Seuil requis : 70%
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {reussi ? (
          <button onClick={onContinuer} className="btn-primary" style={{ justifyContent: 'center' }}>
            <ArrowRight size={14} /> Passer à l&apos;exercice pratique
          </button>
        ) : (
          <>
            <button onClick={onOuvrirCours} className="btn-secondary" style={{ justifyContent: 'center' }}>
              <BookOpen size={13} /> Consulter le cours
            </button>
            <button onClick={onRecommencer} className="btn-ghost" style={{ justifyContent: 'center' }}>
              <RotateCcw size={13} /> Recommencer le QCM
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function NavBar({ onOuvrirCours, index, total }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid var(--border)',
    }}>
      <button onClick={onOuvrirCours} className="btn-secondary">
        <BookOpen size={13} /> Cours
      </button>
      <div style={{ fontSize: 12, color: 'var(--text3)', letterSpacing: '0.03em' }}>
        <span style={{ color: 'var(--text3)' }}>① Cours</span>
        <span style={{ margin: '0 6px', opacity: 0.4 }}>›</span>
        <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>② QCM</span>
        <span style={{ margin: '0 6px', opacity: 0.4 }}>›</span>
        <span>③ Exercice</span>
      </div>
      <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'IBM Plex Mono, monospace' }}>
        {index + 1}/{total}
      </div>
    </div>
  )
}

function ProgressBar({ index, total }) {
  return (
    <div style={{ height: 2, background: 'var(--bg4)', borderRadius: 1, marginBottom: 24, overflow: 'hidden' }}>
      <div style={{
        height: '100%', width: `${((index + 1) / total) * 100}%`,
        background: 'var(--cyan)', borderRadius: 1, transition: 'width 0.3s',
      }} />
    </div>
  )
}

