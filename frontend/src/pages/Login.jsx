import { useState, useEffect, memo, useCallback, useMemo } from "react"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import { useApp } from "../contexts/app-context"
import { ModernButton } from "../components/ui/modern-button"
import { Shield, Loader2, Check, ArrowRight } from "lucide-react"

const LoginPage = memo(() => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login, isAuthenticated } = useApp()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [focusedField, setFocusedField] = useState(null)
  
  const redirectTo = useMemo(() => searchParams.get('redirect') || '/dashboard', [searchParams])
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo)
    }
  }, [isAuthenticated, navigate, redirectTo])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await login(email, password)
    
    if (result.success) {
      // Check if OTP verification is required
      if (result.requiresOTP) {
        // Redirect to OTP verification page
        navigate('/verify-otp', { 
          state: { 
            userId: result.userId, 
            deviceId: result.deviceId,
            email: result.email,
            redirectTo: redirectTo
          } 
        })
      } else {
        // Normal login - redirect to dashboard
        setSuccess(true)
        setTimeout(() => {
          navigate(redirectTo)
        }, 1500)
      }
    } else {
      setError(result.message || "Invalid credentials. Please try again.")
    }
    setLoading(false)
  }, [email, password, login, navigate, redirectTo])

  const handleEmailChange = useCallback((e) => setEmail(e.target.value), [])
  const handlePasswordChange = useCallback((e) => setPassword(e.target.value), [])
  const handleFocus = useCallback((field) => setFocusedField(field), [])
  const handleBlur = useCallback(() => setFocusedField(null), [])

  const formFields = useMemo(() => [
    {id: 'email', label: 'Email', type: 'email', placeholder: 'cyber@example.com', value: email, onChange: handleEmailChange},
    {id: 'password', label: 'Password', type: 'password', placeholder: '••••••••', value: password, onChange: handlePasswordChange}
  ], [email, password, handleEmailChange, handlePasswordChange])

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="p-8 rounded-xl bg-slate-800/30 border border-slate-700/50" style={{ transform: 'translateZ(0)' }}>
          <div className="text-center mb-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-teal-500 mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100 mb-2">Welcome Back</h1>
            <p className="text-slate-400">Sign in to continue your cybersecurity journey</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {formFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <label htmlFor={field.id} className="block text-sm font-medium text-slate-300">
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={field.onChange}
                    onFocus={() => handleFocus(field.id)}
                    onBlur={handleBlur}
                    required
                    className="w-full h-14 px-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-200"
                    style={{ transform: 'translateZ(0)', willChange: 'border-color' }}
                  />
                  {focusedField === field.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-teal-500 rounded-r-full" />
                  )}
                </div>
              </div>
            ))}
            
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
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </ModernButton>
          </form>
          
          <div className="mt-8 text-center text-sm">
            <span className="text-slate-400">Don't have an account? </span>
            <Link to="/register" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
})

LoginPage.displayName = 'LoginPage'
export default LoginPage