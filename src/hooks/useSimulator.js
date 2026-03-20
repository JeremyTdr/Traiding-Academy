import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const CAPITAL_INITIAL = 10000

export function useSimulator(user) {
  const [capital, setCapital]           = useState(CAPITAL_INITIAL)
  const [positions, setPositions]       = useState([])
  const [historique, setHistorique]     = useState([])
  const [courbeCapital, setCourbeCapital] = useState([{ date: new Date().toISOString(), valeur: CAPITAL_INITIAL }])
  const [loading, setLoading]           = useState(true)

  // Chargement initial
  useEffect(() => {
    if (!user) { setLoading(false); return }

    supabase
      .from('simulator_state')
      .select('capital, positions, historique, courbe_capital')
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setCapital(data.capital ?? CAPITAL_INITIAL)
          setPositions(data.positions ?? [])
          setHistorique(data.historique ?? [])
          setCourbeCapital(data.courbe_capital ?? [{ date: new Date().toISOString(), valeur: CAPITAL_INITIAL }])
        }
        setLoading(false)
      })
  }, [user])

  // Sauvegarde
  const save = useCallback(async (newCapital, newPositions, newHistorique, newCourbe) => {
    if (!user) return
    await supabase
      .from('simulator_state')
      .upsert({
        user_id: user.id,
        capital: newCapital,
        positions: newPositions,
        historique: newHistorique,
        courbe_capital: newCourbe,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' })
  }, [user])

  const updateState = useCallback((newCapital, newPositions, newHistorique, addPoint = false) => {
    setCapital(newCapital)
    setPositions(newPositions)
    setHistorique(newHistorique)
    setCourbeCapital(prev => {
      const newCourbe = addPoint
        ? [...prev, { date: new Date().toISOString(), valeur: newCapital }].slice(-50)
        : prev
      save(newCapital, newPositions, newHistorique, newCourbe)
      return newCourbe
    })
  }, [save])

  const reset = useCallback(() => {
    const courbeInit = [{ date: new Date().toISOString(), valeur: CAPITAL_INITIAL }]
    setCapital(CAPITAL_INITIAL)
    setPositions([])
    setHistorique([])
    setCourbeCapital(courbeInit)
    save(CAPITAL_INITIAL, [], [], courbeInit)
  }, [save])

  return { capital, positions, historique, courbeCapital, loading, updateState, reset }
}
