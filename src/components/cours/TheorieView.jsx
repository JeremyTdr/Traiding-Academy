import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'

export default function TheorieView({ chapitre, onRetour, onAllerQcm, dejaValide, qcmEntame }) {
  return (
    <div>
      {/* Nav bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 28,
        paddingBottom: 16,
        borderBottom: '1px solid var(--border)',
      }}>
        <button onClick={onRetour} className="btn-secondary">
          <ArrowLeft size={13} /> Chapitres
        </button>
        <div style={{ fontSize: 12, color: 'var(--text3)', letterSpacing: '0.03em' }}>
          <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>① Cours</span>
          <span style={{ margin: '0 6px', opacity: 0.4 }}>›</span>
          <span>② QCM</span>
          <span style={{ margin: '0 6px', opacity: 0.4 }}>›</span>
          <span>③ Exercice</span>
        </div>
        <button onClick={onAllerQcm} className="btn-primary">
          {dejaValide
            ? <><RotateCcw size={13} /> Refaire le QCM</>
            : qcmEntame
              ? <><ArrowRight size={13} /> Reprendre le QCM</>
              : <><ArrowRight size={13} /> Démarrer le QCM</>
          }
        </button>
      </div>

      {/* Méta */}
      <div style={{ marginBottom: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--teal)' }}>
          {chapitre.module}
        </span>
        {chapitre.duree && (
          <span style={{ fontSize: 11, color: 'var(--text3)', marginLeft: 12 }}>{chapitre.duree}</span>
        )}
      </div>

      {/* Contenu HTML du cours */}
      <div
        className="theory-body"
        dangerouslySetInnerHTML={{ __html: chapitre.cours }}
      />

      {/* CTA bas de page */}
      <div style={{
        marginTop: 40,
        padding: '20px 24px',
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: 2 }}>Prêt à valider tes connaissances ?</div>
          <div style={{ fontSize: 13, color: 'var(--text2)' }}>QCM de 5 questions · score minimum 70%</div>
        </div>
        <button onClick={onAllerQcm} className="btn-primary">
          {dejaValide
            ? <><RotateCcw size={13} /> Refaire le QCM</>
            : qcmEntame
              ? <><ArrowRight size={13} /> Reprendre le QCM</>
              : <><ArrowRight size={13} /> Démarrer le QCM</>
          }
        </button>
      </div>
    </div>
  )
}

