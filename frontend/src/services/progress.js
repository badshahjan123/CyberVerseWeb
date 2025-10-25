import axios from '../api/axios'

export const updateProgress = async (type, itemId, points, timeSpent) => {
  try {
    const response = await axios.post('/progress/update', {
      type,
      itemId,
      points,
      timeSpent
    })
    return response.data
  } catch (error) {
    console.error('Error updating progress:', error)
    throw error
  }
}

export const getLeaderboard = async (limit = 10) => {
  try {
    const response = await axios.get(`/progress/leaderboard?limit=${limit}`)
    return response.data.data || []
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    throw error
  }
}

export const getUserStats = async () => {
  try {
    const response = await axios.get('/progress/stats')
    return response.data.data
  } catch (error) {
    console.error('Error fetching user stats:', error)
    throw error
  }
}