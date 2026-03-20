import ch01 from './01'
import ch02 from './02'
import ch03 from './03'

const modules = {
  1: () => Promise.all([import('./01'), import('./02'), import('./03')]),
  2: () => Promise.all([import('./04'), import('./05'), import('./06')]),
  3: () => Promise.all([import('./07'), import('./08'), import('./09'), import('./10')]),
  4: () => Promise.all([import('./11'), import('./12')]),
}

// Module 1 toujours disponible immédiatement
const chapitresBase = [ch01, ch02, ch03]
let chapitresCache  = [...chapitresBase]

export default chapitresBase

export async function loadModule(moduleNum) {
  if (moduleNum === 1) return
  const imports = await modules[moduleNum]()
  const nouveaux = imports.map(m => m.default).filter(ch => !chapitresCache.find(c => c.id === ch.id))
  chapitresCache = [...chapitresCache, ...nouveaux]
}

export function getChapitre(id) {
  return chapitresCache.find(ch => ch.id === id) ?? null
}

export function getChapitresCharges() {
  return chapitresCache
}
