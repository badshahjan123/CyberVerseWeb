"use client"

// Converted to JS runtime with JSDoc types to avoid TS syntax in .jsx
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"

/** @typedef {{
 *  id: string,
 *  username: string,
 *  email: string,
 *  avatar?: string,
 *  rank: number,
 *  points: number,
 *  level: number,
 *  completedLabs: number,
 * }} User */

/** @typedef {{
 *  user: (User|null),
 *  isAuthenticated: boolean,
 *  login: (email: string, password: string) => Promise<void>,
 *  register: (username: string, email: string, password: string) => Promise<void>,
 *  logout: () => void,
 *  loading: boolean,
 * }} AppContextType */

/** @type {React.Context<AppContextType|undefined>} */
const AppContext = createContext(undefined)

/** @param {{ children: React.ReactNode }} props */
export function AppProvider({ children }) {
  /** @type {[User|null, (u: User|null) => void]} */
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("cyberverse_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem("cyberverse_user")
        // Also clear cookie
        document.cookie = 'cyberverse_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      }
    }
    setLoading(false)
  }, [])

  /** @param {string} email @param {string} password */
  const login = useCallback(async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 200)) // Faster response
    /** @type {User} */
    const mockUser = {
      id: "1",
      username: "CyberNinja",
      email,
      avatar: "/hacker-avatar.png",
      rank: 42,
      points: 15420,
      level: 12,
      completedLabs: 24,
    }
    setUser(mockUser)
    // Non-blocking storage operations
    requestIdleCallback(() => {
      localStorage.setItem("cyberverse_user", JSON.stringify(mockUser))
      document.cookie = `cyberverse_user=${JSON.stringify(mockUser)}; path=/; max-age=86400`
    })
  }, [])

  /** @param {string} username @param {string} email @param {string} password */
  const register = useCallback(async (username, email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 200)) // Faster response
    /** @type {User} */
    const mockUser = {
      id: "1",
      username,
      email,
      avatar: "/hacker-avatar.png",
      rank: 999,
      points: 0,
      level: 1,
      completedLabs: 0,
    }
    setUser(mockUser)
    // Non-blocking storage operations
    requestIdleCallback(() => {
      localStorage.setItem("cyberverse_user", JSON.stringify(mockUser))
      document.cookie = `cyberverse_user=${JSON.stringify(mockUser)}; path=/; max-age=86400`
    })
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    // Non-blocking cleanup
    requestIdleCallback(() => {
      localStorage.removeItem("cyberverse_user")
      document.cookie = 'cyberverse_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    })
    // Redirect to home page
    router.push('/')
  }, [router])

  const isAuthenticated = useMemo(() => !!user, [user])
  
  const contextValue = useMemo(() => ({
    user,
    isAuthenticated,
    login,
    register,
    logout,
    loading
  }), [user, isAuthenticated, login, register, logout, loading])

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
