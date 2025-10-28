// import { createContext, useContext, useEffect, useState } from 'react'
// import { getUserStats } from '../services/progress'

// const RealtimeContext = createContext()

// export const useRealtime = () => {
//   const context = useContext(RealtimeContext)
//   if (!context) {
//     throw new Error('useRealtime must be used within RealtimeProvider')
//   }
//   return context
// }

// export const RealtimeProvider = ({ children }) => {
//   const [userStats, setUserStats] = useState(null)
//   const [recentActivity, setRecentActivity] = useState([])
//   const [weeklyStats, setWeeklyStats] = useState({
//     labsCompleted: 0,
//     pointsEarned: 0,
//     timeSpent: '0h',
//     rankChange: 0
//   })
//   const [lastUpdate, setLastUpdate] = useState(Date.now())

//   const refreshUserStats = async () => {
//     try {
//       const stats = await getUserStats()
//       setUserStats(stats)
//       // Update recent activity if it exists in the stats
//       if (stats.recentActivity) {
//         setRecentActivity(stats.recentActivity)
//       }
//       // Update weekly stats
//       if (stats.weeklyStats) {
//         setWeeklyStats(stats.weeklyStats)
//       }
//       setLastUpdate(Date.now())
//     } catch (error) {
//       console.error('Failed to refresh user stats:', error)
//     }
//   }

//   const triggerUpdate = () => {
//     refreshUserStats()
//   }

//   useEffect(() => {
//     // // Initial load
//     // refreshUserStats()
    
//     // // Refresh every 10 seconds for real-time updates
//     // const interval = setInterval(refreshUserStats, 10000)
    
//     // return () => clearInterval(interval)
//   }, [])

//   return (
//     <RealtimeContext.Provider value={{
//       userStats,
//       recentActivity,
//       weeklyStats,
//       refreshUserStats,
//       triggerUpdate,
//       lastUpdate
//     }}>
//       {children}
//     </RealtimeContext.Provider>
//   )
// }

import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

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
  const [error, setError] = useState(null)

  // Axios instance with auth token
  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}` // Ensure your token is saved in localStorage on login
    }
  })

  const refreshUserStats = async () => {
    try {
      const { data } = await api.get('/user-stats')
      setUserStats(data)
      if (data.recentActivity) setRecentActivity(data.recentActivity)
      if (data.weeklyStats) setWeeklyStats(data.weeklyStats)
      setLastUpdate(Date.now())
      setError(null)
    } catch (err) {
      console.error('Failed to refresh user stats:', err)
      if (err.response?.status === 401) {
        setError('Unauthorized. Please login again.')
        // Optional: redirect user to login page
        // window.location.href = '/login'
      } else {
        setError('Error fetching user stats.')
      }
    }
  }

  // Manual refresh trigger
  const triggerUpdate = () => {
    refreshUserStats()
  }

  useEffect(() => {
    // Initial load
    refreshUserStats()

    // Safe interval refresh every 10 seconds
    const interval = setInterval(() => {
      refreshUserStats()
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <RealtimeContext.Provider
      value={{
        userStats,
        recentActivity,
        weeklyStats,
        refreshUserStats,
        triggerUpdate,
        lastUpdate,
        error
      }}
    >
      {children}
    </RealtimeContext.Provider>
  )
}
