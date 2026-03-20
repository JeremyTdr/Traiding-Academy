import { useState } from 'react'
import { CheckCircle2, ArrowRight, RotateCcw, CheckCircle } from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'
import { useProgression } from '../hooks/useProgression'
import { getChapitre, loadModule } from '../content/chapitres/index'
import { CHAPITRES } from '../content/chapitres'
import { NIVEAUX } from '../content/niveaux'
import ChapitresList  from '../components/cours/ChapitresList'
import TheorieView    from '../components/cours/TheorieView'
import QcmView        from '../components/cours/QcmView'
import ExerciceView   from '../components/cours/ExerciceView'

export default function Cours() {
  const { user }                               = useAuth()
  const { chapitresValides, validerChapitre }  = useProgression(user)
  const [vue, setVue]                          = useState('list')
  const [chapitreActif, setChapitreActif]      = useState(null)

  // État QCM conservé ici pour survivre aux allers-retours vers le cours
  const [qcmState, setQcmState] = useState(null)
  const [exoState, setExoState] = useState(null)

  async function ouvrirChapitre(id) {
    const moduleNum = id <= 3 ? 1 : id <= 6 ? 2 : id <= 10 ? 3 : 4
    await loadModule(moduleNum)
    const contenu = getChapitre(id)
    if (!contenu) return
    setChapitreActif(contenu)
    setQcmState(null)
    setExoState(null)
    setVue('theory')
  }

  async function terminerChapitre() {
    await validerChapitre(chapitreActif.id)
    setVue('success')
  }

  function retourListe() {
    setVue('list')
    setChapitreActif(null)
    setQcmState(null)
    setExoState(null)
  }

  return (
    <div>
      {/* Liste — démontée quand on ouvre un chapitre */}
      {vue === 'list' && (
        <ChapitresList
          chapitresValides={chapitresValides}
          onOuvrir={ouvrirChapitre}
        />
      )}

      {/* Barre de progression du module */}
      {chapitreActif && vue !== 'list' && vue !== 'success' && (() => {
        const chapitresModule = CHAPITRES.filter(c => c.module === chapitreActif.module)
        const indexDansMod    = chapitresModule.findIndex(c => c.id === chapitreActif.id)
        return (
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text3)' }}>
                {chapitreActif.module}
              </span>
              <span style={{ fontSize: 11, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text3)' }}>
                {indexDansMod + 1} / {chapitresModule.length}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {chapitresModule.map((c, i) => {
                const valide  = chapitresValides.includes(c.id)
                const actif   = c.id === chapitreActif.id
                return (
                  <div key={c.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                    <div style={{
                      height: 3, width: '100%', borderRadius: 2,
                      background: valide ? 'var(--green)' : actif ? 'var(--cyan)' : 'var(--border)',
                    }} />
                    {chapitresModule.length <= 6 && (
                      <span style={{
                        fontSize: 9, fontFamily: 'IBM Plex Mono, monospace',
                        color: valide ? 'var(--green)' : actif ? 'var(--cyan)' : 'var(--text3)',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        maxWidth: '100%',
                      }}>
                        {String(c.id).padStart(2, '0')}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })()}

      {/* Théorie — affichée/cachée selon la vue, JAMAIS démontée quand on est dans un chapitre */}
      {chapitreActif && (
        <div style={{ display: vue === 'theory' ? 'block' : 'none' }}>
          <TheorieView
            chapitre={chapitreActif}
            onRetour={() => { setVue('list'); setChapitreActif(null); setQcmState(null); setExoState(null) }}
            onAllerQcm={() => setVue('qcm')}
            dejaValide={chapitresValides.includes(chapitreActif.id)}
            qcmEntame={qcmState !== null && !qcmState.termine}
          />
        </div>
      )}

      {/* QCM — monté dès qu'un chapitre est actif, affiché/caché selon la vue */}
      {chapitreActif && (
        <div style={{ display: vue === 'qcm' ? 'block' : 'none' }}>
          <QcmView
            chapitre={chapitreActif}
            persistedState={qcmState}
            onStateChange={setQcmState}
            onRetourCours={() => setVue('theory')}
            onValide={() => setVue('exo')}
          />
        </div>
      )}

      {/* Exercice — même principe */}
      {chapitreActif && (
        <div style={{ display: vue === 'exo' ? 'block' : 'none' }}>
          <ExerciceView
            chapitre={chapitreActif}
            persistedState={exoState}
            onStateChange={setExoState}
            onRetourCours={() => setVue('theory')}
            onValide={terminerChapitre}
          />
        </div>
      )}

      {/* Écran de félicitations */}
      {vue === 'success' && chapitreActif && (() => {
        const totalValides   = chapitresValides.length
        const niveauActuel   = NIVEAUX.filter(n => totalValides >= n.requis).at(-1)
        const niveauPrecedent = NIVEAUX.filter(n => (totalValides - 1) >= n.requis).at(-1)
        const nouveauNiveau  = niveauActuel?.id !== niveauPrecedent?.id
        const suivant        = CHAPITRES.find(c => c.id === chapitreActif.id + 1)

        return (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', textAlign: 'center', padding: '60px 24px',
            gap: 24,
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(0,192,118,0.1)', border: '2px solid rgba(0,192,118,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <CheckCircle2 size={36} color="var(--green)" strokeWidth={1.5} />
            </div>

            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
                Chapitre validé !
              </div>
              <div style={{ fontSize: 14, color: 'var(--text3)', maxWidth: 340 }}>
                Tu as terminé <span style={{ color: 'var(--text)', fontWeight: 600 }}>{chapitreActif.titre}</span>.
              </div>
            </div>

            {nouveauNiveau && (
              <div style={{
                background: 'rgba(240,180,41,0.08)', border: '1px solid rgba(240,180,41,0.25)',
                borderTop: '2px solid var(--gold)', borderRadius: 10,
                padding: '16px 24px', maxWidth: 320,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>
                  Nouveau niveau atteint
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>
                  {niveauActuel.nom}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>
                  {niveauActuel.desc}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button className="btn-ghost" onClick={retourListe}>
                <RotateCcw size={13} /> Retour à la liste
              </button>
              {suivant && (
                <button className="btn-primary" onClick={() => ouvrirChapitre(suivant.id)}>
                  Chapitre suivant <ArrowRight size={13} />
                </button>
              )}
            </div>
          </div>
        )
      })()}
    </div>
  )
}
