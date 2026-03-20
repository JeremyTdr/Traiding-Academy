import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useProfile(user) {
  const [profile, setProfile]   = useState(null)
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)

  useEffect(() => {
    if (!user) { setProfile(null); setLoading(false); return }

    supabase
      .from('profiles')
      .select('id, pseudo')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        setProfile(data ?? { id: user.id, pseudo: '' })
        setLoading(false)
      })
  }, [user])

  const updatePseudo = useCallback(async (pseudo) => {
    if (!user) return
    setSaving(true)
    const { data } = await supabase
      .from('profiles')
      .upsert({ id: user.id, pseudo }, { onConflict: 'id' })
      .select('id, pseudo')
      .single()
    if (data) setProfile(data)
    setSaving(false)
  }, [user])

  return { profile, loading, saving, updatePseudo }
}
