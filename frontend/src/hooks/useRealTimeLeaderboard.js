import { useState, useEffect } from 'react'
import { getLeaderboard } from '../services/progress'

export const useRealTimeLeaderboard = (refreshInterval = 30000) => {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchLeaderboard = async () => {
    try {
      const data = await getLeaderboard(50)
      setLeaderboard(data)
      setError(null)
    } catch (err) {
      setError('Failed to load leaderboard')
      console.error('Leaderboard error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaderboard()
    
    const interval = setInterval(fetchLeaderboard, refreshInterval)
    
    return () => clearInterval(interval)
  }, [refreshInterval])

  return { leaderboard, loading, error, refresh: fetchLeaderboard }
}