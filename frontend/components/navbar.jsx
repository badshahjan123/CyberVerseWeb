"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { ModernButton } from "@/components/ui/modern-button"
import { Badge } from "@/components/ui/badge"
import { Shield, LayoutDashboard, Users, Trophy, User, LogOut, Settings, Menu, X, Crown, BookOpen } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useApp()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = isAuthenticated
    ? [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/labs", label: "Labs", icon: BookOpen },
        { href: "/rooms", label: "Rooms", icon: Users },
        { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
      ]
    : [
        { href: "/", label: "Home", icon: BookOpen },
        { href: "#features", label: "Features", icon: Shield, isAnchor: true },
        { href: "#categories", label: "Categories", icon: Users, isAnchor: true },
      ]

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-teal-500">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary-400 to-teal-400 bg-clip-text text-transparent">
              CYBERVERSE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
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
                    className="relative flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 text-slate-300 hover:text-white hover:bg-slate-800/50"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {link.label}
                  </button>
                )
              }
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className={`relative flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive 
                      ? "text-primary-400 bg-primary-500/10" 
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {link.label}
                  {isActive && (
                    <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary-500/20 to-teal-500/20 border border-primary-500/30" />
                  )}
                </Link>
              )
            })}

            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4">
                {!user?.isPremium && (
                  <ModernButton variant="primary" size="sm" asChild>
                    <Link href="/premium">
                      <Crown className="h-4 w-4 mr-2" />
                      Upgrade
                    </Link>
                  </ModernButton>
                )}
                <Link href="/profile" className="flex items-center gap-2 text-slate-300 hover:text-primary-400 transition-colors">
                  <div className="relative">
                    <User className="h-4 w-4" />
                    {user?.isPremium && (
                      <Crown className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1" />
                    )}
                  </div>
                  <span>{user?.name || "Profile"}</span>
                  {user?.isPremium && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black border-0 text-xs">
                      Pro
                    </Badge>
                  )}
                </Link>
                <ModernButton variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </ModernButton>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <ModernButton variant="ghost" size="sm" asChild>
                  <Link href="/login" prefetch={true}>Login</Link>
                </ModernButton>
                <ModernButton variant="primary" size="sm" asChild>
                  <Link href="/register" prefetch={true}>Get Started</Link>
                </ModernButton>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
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
                      className="flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-slate-300 hover:text-white hover:bg-slate-800/50 w-full text-left"
                    >
                      <Icon className="h-5 w-5" />
                      {link.label}
                    </button>
                  )
                }
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? "text-primary-400 bg-primary-500/10" 
                        : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                )
              })}
              
              {isAuthenticated ? (
                <div className="pt-4 border-t border-slate-700/50 space-y-2">
                  <Link
                    href="/profile"
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50"
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-slate-800/50 w-full text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-slate-700/50 space-y-2">
                  <Link
                    href="/login"
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center bg-transparent border border-slate-600 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
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
