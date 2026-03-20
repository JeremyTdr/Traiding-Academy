import { createContext, useContext } from 'react'
import { useSimulator } from './useSimulator'
import { useAuth } from './useAuth.jsx'

const SimulatorContext = createContext(null)

export function SimulatorProvider({ children }) {
  const { user } = useAuth()
  const simulator = useSimulator(user)
  return (
    <SimulatorContext.Provider value={simulator}>
      {children}
    </SimulatorContext.Provider>
  )
}

export function useSimulatorContext() {
  return useContext(SimulatorContext)
}
