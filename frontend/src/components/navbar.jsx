import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { useApp } from "../contexts/app-context"
import { ModernButton } from "./ui/modern-button"
import { Badge } from "./ui/badge"
import { Shield, LayoutDashboard, Users, Trophy, User, LogOut, Settings, Menu, X, Crown, BookOpen, Zap, Award } from "lucide-react"

export default function Navbar() {
  const location = useLocation()
  const pathname = location.pathname
  const { user, isAuthenticated, logout } = useApp()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = isAuthenticated
    ? [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/labs", label: "Labs", icon: BookOpen },
        { href: "/rooms", label: "Rooms", icon: Users },
        { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
        { href: "/certificates", label: "Certificates", icon: Award },
      ]
    : [
        { href: "/", label: "Home", icon: BookOpen },
        { href: "#features", label: "Features", icon: Shield, isAnchor: true },
        { href: "#categories", label: "Categories", icon: Users, isAnchor: true },
      ]

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-slate-900/95 backdrop-blur-xl border-b border-blue-500/20 shadow-lg shadow-blue-500/10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-600 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                CYBERVERSE
              </span>
              <span className="text-xs text-slate-400 -mt-1">Learning Platform</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              
              if (link.isAnchor) {
                return (
                  <button
                    key={link.href}
                    onClick={() => {
                      const element = document.querySelector(link.href)
                      element?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 text-slate-300 hover:text-white hover:bg-slate-800/50 group"
                  >
                    <Icon className="h-4 w-4 group-hover:text-cyan-400 transition-colors" />
                    {link.label}
                  </button>
                )
              }
              
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? "text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 shadow-lg shadow-blue-500/10" 
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className={`h-4 w-4 transition-colors ${
                    isActive ? "text-cyan-400" : "group-hover:text-cyan-400"
                  }`} />
                  {link.label}
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                {!user?.isPremium && (
                  <ModernButton variant="primary" size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 shadow-lg shadow-blue-500/25">
                    <Link to="/premium" className="flex items-center gap-2">
                      <Crown className="h-4 w-4" />
                      Upgrade
                    </Link>
                  </ModernButton>
                )}
                
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-800/30 border border-slate-700/50">
                  <Link to="/profile" className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      {user?.isPremium && (
                        <Crown className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1" />
                      )}
                    </div>
                    <span className="font-medium">{user?.name || "Profile"}</span>
                    {user?.isPremium && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black border-0 text-xs px-2 py-0.5">
                        PRO
                      </Badge>
                    )}
                  </Link>
                  
                  <div className="w-px h-6 bg-slate-600"></div>
                  
                  <Link to="/settings" className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all">
                    <Settings className="h-4 w-4" />
                  </Link>
                  
                  <button 
                    onClick={logout}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <ModernButton variant="glass" size="sm" className="border-slate-600/50 hover:border-cyan-500/50">
                  <Link to="/login">Login</Link>
                </ModernButton>
                <ModernButton variant="primary" size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 shadow-lg shadow-blue-500/25">
                  <Link to="/register" className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Get Started
                  </Link>
                </ModernButton>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-blue-500/20 bg-gradient-to-b from-slate-900/95 to-blue-900/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                
                if (link.isAnchor) {
                  return (
                    <button
                      key={link.href}
                      onClick={() => {
                        const element = document.querySelector(link.href)
                        element?.scrollIntoView({ behavior: 'smooth' })
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-300 hover:text-white hover:bg-slate-800/50 w-full text-left"
                    >
                      <Icon className="h-5 w-5" />
                      {link.label}
                    </button>
                  )
                }
                
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? "text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30" 
                        : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                )
              })}
              
              {isAuthenticated ? (
                <div className="pt-4 border-t border-slate-700/30 space-y-2">
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50"
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50"
                  >
                    <Settings className="h-5 w-5" />
                    Settings
                  </Link>

                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-slate-700/30 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center border border-slate-600/50 text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-slate-800/50 rounded-xl transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl transition-all shadow-lg shadow-blue-500/25"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}