import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { apiCall } from "../config/api"

const AppContext = createContext(undefined)

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await apiCall('/auth/me')
        setUser(response.user)
      } catch (error) {
        console.error('Auth check failed:', error)
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }

  const login = useCallback(async (email, password) => {
    try {
      const response = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
      
      localStorage.setItem('token', response.token)
      setUser(response.user)
      
      // Note: Admins should use /admin-login for admin panel access
      
      return { success: true, message: response.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }, [])

  const register = useCallback(async (name, email, password) => {
    try {
      const response = await apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      })
      
      localStorage.setItem('token', response.token)
      setUser(response.user)
      return { success: true, message: response.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('token')
    navigate('/')
  }, [navigate])

  const isAuthenticated = useMemo(() => !!user, [user])
  
  const updateProfile = useCallback(async (profileData) => {
    try {
      const response = await apiCall('/users/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData)
      })
      
      setUser(response.user)
      return { success: true, message: response.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }, [])

  const completelab = useCallback(async (labId, score) => {
    try {
      const response = await apiCall('/users/complete-lab', {
        method: 'POST',
        body: JSON.stringify({ labId, score })
      })
      
      setUser(prev => ({
        ...prev,
        ...response.user
      }))
      return { success: true, message: response.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }, [])

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await apiCall('/auth/me')
        setUser(response.user)
      } catch (error) {
        console.error('Failed to refresh user:', error)
      }
    }
  }, [])

  const contextValue = useMemo(() => ({
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    completelab,
    refreshUser,
    loading
  }), [user, isAuthenticated, login, register, logout, updateProfile, completelab, refreshUser, loading])

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}