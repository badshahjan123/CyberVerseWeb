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
  const [recentActivity, setRecentActivity] = useState([])
  const [weeklyStats, setWeeklyStats] = useState({
    labsCompleted: 0,
    pointsEarned: 0,
    timeSpent: '0h',
    rankChange: 0
  })
  const [lastUpdate, setLastUpdate] = useState(Date.now())

  const refreshUserStats = async () => {
    try {
      const stats = await getUserStats()
      setUserStats(stats)
      // Update recent activity if it exists in the stats
      if (stats.recentActivity) {
        setRecentActivity(stats.recentActivity)
      }
      // Update weekly stats
      if (stats.weeklyStats) {
        setWeeklyStats(stats.weeklyStats)
      }
      setLastUpdate(Date.now())
    } catch (error) {
      console.error('Failed to refresh user stats:', error)
    }
  }

  const triggerUpdate = () => {
    refreshUserStats()
  }

  useEffect(() => {
    // Initial load
    refreshUserStats()
    
    // Refresh every 10 seconds for real-time updates
    const interval = setInterval(refreshUserStats, 10000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <RealtimeContext.Provider value={{
      userStats,
      recentActivity,
      weeklyStats,
      refreshUserStats,
      triggerUpdate,
      lastUpdate
    }}>
      {children}
    </RealtimeContext.Provider>
  )
}