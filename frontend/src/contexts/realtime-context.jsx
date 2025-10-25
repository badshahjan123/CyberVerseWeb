import { createContext, useContext, useEffect, useState } from 'react'
import { getUserStats } from '../services/progress'

const RealtimeContext = createContext()

export const useRealtime = () => {
  const context = useContext(RealtimeContext)
  if (!context) {
    throw new Error('useRealtime must be used within RealtimeProvider')
  }
  return context
}

export const RealtimeProvider = ({ children }) => {
  const [userStats, setUserStats] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(Date.now())

  const refreshUserStats = async () => {
    try {
      const stats = await getUserStats()
      setUserStats(stats)
      setLastUpdate(Date.now())
    } catch (error) {
      console.error('Failed to refresh user stats:', error)
    }
  }

  const triggerUpdate = () => {
    refreshUserStats()
  }

  useEffect(() => {
    refreshUserStats()
    
    // Refresh every 30 seconds for real-time updates
    const interval = setInterval(refreshUserStats, 30000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <RealtimeContext.Provider value={{
      userStats,
      refreshUserStats,
      triggerUpdate,
      lastUpdate
    }}>
      {children}
    </RealtimeContext.Provider>
  )
}