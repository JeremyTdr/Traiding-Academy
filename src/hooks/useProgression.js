import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { NIVEAUX } from '../content/niveaux'

export function useProgression(user) {
  const [chapitresValides, setChapitresValides] = useState([])
  const [loading, setLoading]                   = useState(true)

  // Charger la progression depuis Supabase
  useEffect(() => {
    if (!user) { setChapitresValides([]); setLoading(false); return }

    supabase
      .from('progression')
      .select('chapitres_valides')
      .eq('user_id', user.id)
      .single()
      .then(({ data, error }) => {
        if (data) setChapitresValides(data.chapitres_valides ?? [])
        else if (error?.code === 'PGRST116') setChapitresValides([]) // ligne inexistante
        setLoading(false)
      })
  }, [user])

  // Valider un chapitre et persister
  const validerChapitre = useCallback(async (chapitreId) => {
    if (chapitresValides.includes(chapitreId)) return

    const updated = [...chapitresValides, chapitreId]
    setChapitresValides(updated)

    if (user) {
      await supabase
        .from('progression')
        .upsert({ user_id: user.id, chapitres_valides: updated }, { onConflict: 'user_id' })
    }
  }, [user, chapitresValides])

  // Niveau courant
  const getNiveau = useCallback(() => {
    const n = chapitresValides.length
    let niveau = NIVEAUX[0]
    for (const nv of NIVEAUX) {
      if (n >= nv.requis) niveau = nv
    }
    return niveau
  }, [chapitresValides])

  return { chapitresValides, loading, validerChapitre, getNiveau }
}
