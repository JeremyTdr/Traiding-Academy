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

export default function ExerciceView({ chapitre, persistedState, onStateChange, onRetourCours, onValide }) {
  const { exercice } = chapitre
  const questions    = exercice.questions
  const [state, setState]         = useState(persistedState ?? INITIAL_STATE)
  const [panelOpen, setPanelOpen] = useState(false)

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
        <ResultatExo
        score={score}
        total={questions.length}
        reussi={reussi}
        titreChapitre={chapitre.titre}
        onRecommencer={recommencer}
        onOuvrirCours={() => setPanelOpen(true)}
        onValider={onValide}
      />
      </>
    )
  }

  return (
    <>
      <CoursPanel chapitre={chapitre} open={panelOpen} onClose={() => setPanelOpen(false)} />
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--border)',
      }}>
        <button onClick={() => setPanelOpen(true)} className="btn-secondary">
          <BookOpen size={13} /> Cours
        </button>
        <div style={{ fontSize: 12, color: 'var(--text3)', letterSpacing: '0.03em' }}>
          <span>① Cours</span>
          <span style={{ margin: '0 6px', opacity: 0.4 }}>›</span>
          <span>② QCM</span>
          <span style={{ margin: '0 6px', opacity: 0.4 }}>›</span>
          <span style={{ color: 'var(--purple)', fontWeight: 600 }}>③ Exercice</span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'IBM Plex Mono, monospace' }}>
          {index + 1}/{questions.length}
        </div>
      </div>

      <div style={{
        background: 'rgba(167,139,250,0.07)', border: '1px solid rgba(167,139,250,0.2)',
        borderRadius: 10, padding: '14px 18px', marginBottom: 20,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--purple)', marginBottom: 4 }}>
          Exercice pratique
        </div>
        <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>{exercice.consigne}</div>
      </div>

      <div style={{ height: 2, background: 'var(--bg4)', borderRadius: 1, marginBottom: 20, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${((index + 1) / questions.length) * 100}%`,
          background: 'var(--purple)', borderRadius: 1, transition: 'width 0.3s',
        }} />
      </div>

      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '24px 24px 20px', marginBottom: 16,
      }}>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 10 }}>
          Situation {index + 1} / {questions.length}
        </div>
        <p style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.55, marginBottom: 20 }}>{q.q}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.opts.map((opt, i) => {
            let bg = 'var(--bg3)', border = 'var(--border)', color = 'var(--text)'
            if (selected === i && !confirmed) { bg = 'rgba(167,139,250,0.12)'; border = 'var(--purple)'; color = 'var(--purple)' }
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
    </>
  )
}

function ResultatExo({ score, total, reussi, titreChapitre, onRecommencer, onOuvrirCours, onValider }) {
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
        {reussi ? 'Exercice réussi !' : 'Encore un effort !'}
      </h2>
      <div style={{ fontSize: 44, fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace', color: reussi ? 'var(--green)' : 'var(--red)', margin: '12px 0' }}>
        {pct}%
      </div>
      <p style={{ color: 'var(--text2)', fontSize: 13, marginBottom: reussi ? 8 : 32 }}>
        {score} / {total} bonnes réponses · Seuil requis : 70%
      </p>
      {reussi && (
        <p style={{ color: 'var(--cyan)', fontSize: 13, fontWeight: 600, marginBottom: 32 }}>
          Chapitre « {titreChapitre} » validé
        </p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {reussi ? (
          <button onClick={onValider} className="btn-primary" style={{ justifyContent: 'center' }}>
            <CheckCircle2 size={14} /> Valider le chapitre
          </button>
        ) : (
          <>
            <button onClick={onOuvrirCours} className="btn-secondary" style={{ justifyContent: 'center' }}>
              <BookOpen size={13} /> Consulter le cours
            </button>
            <button onClick={onRecommencer} className="btn-ghost" style={{ justifyContent: 'center' }}>
              <RotateCcw size={13} /> Recommencer l&apos;exercice
            </button>
          </>
        )}
      </div>
    </div>
  )
}
