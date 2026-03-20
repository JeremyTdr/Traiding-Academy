import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const CAPITAL_INITIAL = 10000

export function useSimulator(user) {
  const [capital, setCapital]       = useState(CAPITAL_INITIAL)
  const [positions, setPositions]   = useState([])
  const [historique, setHistorique] = useState([])
  const [loading, setLoading]       = useState(true)

  // Chargement initial
  useEffect(() => {
    if (!user) { setLoading(false); return }

    supabase
      .from('simulator_state')
      .select('capital, positions, historique')
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setCapital(data.capital ?? CAPITAL_INITIAL)
          setPositions(data.positions ?? [])
          setHistorique(data.historique ?? [])
        }
        setLoading(false)
      })
  }, [user])

  // Sauvegarde
  const save = useCallback(async (newCapital, newPositions, newHistorique) => {
    if (!user) return
    await supabase
      .from('simulator_state')
      .upsert({
        user_id: user.id,
        capital: newCapital,
        positions: newPositions,
        historique: newHistorique,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' })
  }, [user])

  const updateState = useCallback((newCapital, newPositions, newHistorique) => {
    setCapital(newCapital)
    setPositions(newPositions)
    setHistorique(newHistorique)
    save(newCapital, newPositions, newHistorique)
  }, [save])

  const reset = useCallback(() => {
    updateState(CAPITAL_INITIAL, [], [])
  }, [updateState])

  return { capital, positions, historique, loading, updateState, reset }
}
