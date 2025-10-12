import { Link } from "react-router-dom"
import { useApp } from "../contexts/app-context"
import { ModernButton } from "../components/ui/modern-button"
import { Shield, Zap, Users, Trophy, Lock, Terminal, Network, Code, ArrowRight, Star, Sparkles, Play, CheckCircle } from "lucide-react"
import { memo, useMemo, useCallback } from "react"

// Memoized feature card component
const FeatureCard = memo(({ feature, index }) => {
  const Icon = feature.icon
  return (
    <div className="group h-full" style={{ transform: 'translateZ(0)' }}>
      <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-primary-500/30 transition-all duration-300 h-full flex flex-col will-change-transform">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors flex-shrink-0">
            <Icon className="h-5 w-5 text-primary-400" />
          </div>
          <h3 className="font-semibold text-slate-100 text-sm">{feature.title}</h3>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed flex-1">
          {feature.description}
        </p>
      </div>
    </div>
  )
})

// Memoized category card component
const CategoryCard = memo(({ category, index }) => {
  const Icon = category.icon
  return (
    <div className="group cursor-pointer" style={{ transform: 'translateZ(0)' }}>
      <div className="p-5 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-primary-500/30 transition-all duration-300 text-center h-full will-change-transform">
        <div className="mb-4 mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors">
          <Icon className="h-6 w-6 text-primary-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-slate-100">{category.name}</h3>
        <div className="text-2xl font-bold text-primary-400 mb-1">{category.count}</div>
        <p className="text-xs text-slate-500">Available Labs</p>
      </div>
    </div>
  )
})

const Home = memo(() => {
  const { isAuthenticated } = useApp()

  // Memoized data to prevent re-renders
  const features = useMemo(() => [
    {
      icon: Terminal,
      title: "Interactive Labs",
      description: "Practice real-world cybersecurity scenarios in isolated virtual environments",
      color: "teal"
    },
    {
      icon: Network,
      title: "Live Attack Rooms",
      description: "Join collaborative hacking challenges with players worldwide",
      color: "coral"
    },
    {
      icon: Trophy,
      title: "Global Leaderboard",
      description: "Compete with hackers globally and climb the ranks",
      color: "sunflower"
    },
    {
      icon: Code,
      title: "Skill Progression",
      description: "Track your learning journey from beginner to expert",
      color: "glow"
    },
  ], [])

  const categories = useMemo(() => [
    { name: "Web Security", icon: Lock, count: 45, color: "coral" },
    { name: "Network Pentesting", icon: Network, count: 38, color: "teal" },
    { name: "Cryptography", icon: Shield, count: 27, color: "glow" },
    { name: "Forensics", icon: Zap, count: 31, color: "glass" },
  ], [])

  // Memoized navigation handlers
  const handleGetStarted = useCallback(() => {
    // Add any analytics or tracking here
  }, [])

  const handleViewLabs = useCallback(() => {
    // Add any analytics or tracking here
  }, [])

  return (
    <div className="bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 via-slate-900 to-teal-900/10" />
        
        <div className="container relative mx-auto px-6 max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-500/10 border border-primary-500/20 px-4 py-2 text-sm">
              <Sparkles className="h-3 w-3 text-primary-400" />
              <span className="text-primary-300">Next-gen security training</span>
            </div>
            
            <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
              Master{" "}
              <span className="bg-gradient-to-r from-primary-400 to-teal-400 bg-clip-text text-transparent">
                Cybersecurity
              </span>
              {" "}Skills
            </h1>
            
            <p className="mb-8 text-lg text-slate-300 max-w-2xl mx-auto">
              Learn through hands-on labs, compete in live challenges, and advance your cybersecurity career
            </p>
            
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center mb-12">
              <ModernButton variant="primary" size="lg" onClick={handleGetStarted}>
                <Link to={isAuthenticated ? "/dashboard" : "/register"} className="group flex items-center justify-center">
                  <span>{isAuthenticated ? "Go to Dashboard" : "Start Free Trial"}</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform will-change-transform" />
                </Link>
              </ModernButton>
              <ModernButton variant="glass" size="lg" onClick={handleViewLabs}>
                <Link to={isAuthenticated ? "/labs" : "/register"} className="flex items-center justify-center">
                  {isAuthenticated ? "View Labs" : "Sign Up to Access"}
                </Link>
              </ModernButton>
            </div>

            {/* Compact Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-400">50K+</div>
                <div className="text-xs text-slate-500">Learners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-400">200+</div>
                <div className="text-xs text-slate-500">Labs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-coral-400">24/7</div>
                <div className="text-xs text-slate-500">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 bg-slate-900/20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-100">Why Choose CyberVerse?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Professional cybersecurity training with real-world scenarios</p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-100">Learning Paths</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Choose your specialization and advance your skills</p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-slate-900/20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center p-8 rounded-xl bg-slate-800/30 border border-slate-700/50">
            <div className="mb-6 mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-teal-500">
              <Users className="h-7 w-7 text-white" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-slate-100">
              Join 50,000+ Security Professionals
            </h2>
            <p className="mb-8 text-slate-300 max-w-2xl mx-auto">
              Start your cybersecurity journey today with hands-on training and real-world scenarios
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              {!isAuthenticated ? (
                <>
                  <ModernButton variant="primary" size="lg">
                    <Link to="/register" className="group flex items-center justify-center">
                      <span>Get Started Free</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform will-change-transform" />
                    </Link>
                  </ModernButton>
                  <ModernButton variant="glass" size="lg">
                    <Link to="/login" className="flex items-center justify-center">
                      Sign In
                    </Link>
                  </ModernButton>
                </>
              ) : (
                <ModernButton variant="primary" size="lg">
                  <Link to="/dashboard" className="group flex items-center justify-center">
                    <span>Go to Dashboard</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform will-change-transform" />
                  </Link>
                </ModernButton>
              )}
            </div>
            
            <p className="text-xs text-slate-500">
              No credit card required • Free trial • Join in seconds
            </p>
          </div>
        </div>
      </section>
    </div>
  )
})

Home.displayName = 'Home'
export default Home