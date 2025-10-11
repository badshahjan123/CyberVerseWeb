"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useApp } from "@/contexts/app-context"
import { ModernButton } from "@/components/ui/modern-button"
import { Shield, Loader2, Check, ArrowRight } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useApp()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      await register(username, email, password)
      setSuccess(true)
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="p-8 rounded-xl bg-slate-800/30 border border-slate-700/50">
          <div className="text-center mb-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-teal-500 mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100 mb-2">Join CyberVerse</h1>
            <p className="text-slate-400">Create your account and start learning</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-slate-300">Username</label>
              <input
                id="username"
                type="text"
                placeholder="CyberNinja"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full h-14 px-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors duration-200"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
              <input
                id="email"
                type="email"
                placeholder="cyber@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-14 px-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors duration-200"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-14 px-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors duration-200"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full h-14 px-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors duration-200"
              />
            </div>
            
            {error && (
              <p className="text-sm text-coral-400 bg-coral-500/10 border border-coral-500/20 rounded-lg p-3">
                {error}
              </p>
            )}
            
            <ModernButton variant="primary" size="lg" type="submit" disabled={loading || success} className="w-full">
              {success ? (
                <Check className="h-5 w-5" />
              ) : loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </ModernButton>
          </form>
          
          <div className="mt-8 text-center text-sm">
            <span className="text-slate-400">Already have an account? </span>
            <Link href="/login" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}