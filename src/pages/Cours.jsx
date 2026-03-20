import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import { useProgression } from '../hooks/useProgression'
import { getChapitre } from '../content/chapitres/index'
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

  function ouvrirChapitre(id) {
    const contenu = getChapitre(id)
    if (!contenu) return
    setChapitreActif(contenu)
    setQcmState(null) // reset QCM à chaque nouveau chapitre
    setExoState(null)
    setVue('theory')
  }

  async function terminerChapitre() {
    await validerChapitre(chapitreActif.id)
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
    </div>
  )
}
