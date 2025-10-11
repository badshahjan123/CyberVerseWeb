"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/contexts/app-context"
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card"
import { ModernButton } from "@/components/ui/modern-button"
import { Badge } from "@/components/ui/badge"
import { ProgressRing } from "@/components/ui/progress-ring"
import { Trophy, Medal, Award, TrendingUp, Crown, Star, Zap, Target } from "lucide-react"

export default function LeaderboardPage() {
  const { isAuthenticated, loading, user } = useApp()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return null
  }

  const globalLeaderboard = [
    {
      rank: 1,
      username: "CyberNinja",
      points: 45230,
      level: 28,
      completedLabs: 156,
      avatar: "/hacker-1.jpg",
      trend: "up",
    },
    {
      rank: 2,
      username: "H4ck3rPr0",
      points: 42180,
      level: 26,
      completedLabs: 148,
      avatar: "/hacker-2.jpg",
      trend: "same",
    },
    {
      rank: 3,
      username: "SecurityQueen",
      points: 39540,
      level: 25,
      completedLabs: 142,
      avatar: "/hacker-3.jpg",
      trend: "up",
    },
    {
      rank: 4,
      username: "ByteBandit",
      points: 37920,
      level: 24,
      completedLabs: 138,
      avatar: "/hacker-4.jpg",
      trend: "down",
    },
    {
      rank: 5,
      username: "CodeBreaker",
      points: 35610,
      level: 23,
      completedLabs: 131,
      avatar: "/hacker-5.jpg",
      trend: "up",
    },
    {
      rank: 6,
      username: "PenTestPro",
      points: 33890,
      level: 22,
      completedLabs: 127,
      avatar: "/hacker-6.jpg",
      trend: "same",
    },
    {
      rank: 7,
      username: "CryptoKing",
      points: 32140,
      level: 21,
      completedLabs: 124,
      avatar: "/hacker-7.jpg",
      trend: "up",
    },
    {
      rank: 8,
      username: "NetNinja",
      points: 30520,
      level: 20,
      completedLabs: 119,
      avatar: "/hacker-8.jpg",
      trend: "up",
    },
  ]

  const weeklyLeaderboard = globalLeaderboard.map((user, index) => ({
    ...user,
    rank: index + 1,
    points: Math.floor(user.points * 0.1),
  }))

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-400" />
    if (rank === 2) return <Medal className="h-6 w-6 text-slate-400" />
    if (rank === 3) return <Award className="h-6 w-6 text-orange-400" />
    return <span className="text-lg font-bold text-slate-400">#{rank}</span>
  }

  const [activeTab, setActiveTab] = useState("global")

  return (
    <div className="bg-slate-950 py-8">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-100 mb-2">Global Leaderboard</h1>
          <p className="text-slate-400">See how you stack up against the best hackers worldwide</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <GlassCard className="mx-2">
            <GlassCardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-slate-800/50 text-yellow-400">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Your Rank</p>
                    <p className="text-xl font-bold text-slate-100">#156</p>
                  </div>
                </div>
              </div>
            </GlassCardContent>
          </GlassCard>

          <GlassCard className="mx-2">
            <GlassCardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-slate-800/50 text-primary-400">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Total Points</p>
                    <p className="text-xl font-bold text-slate-100">3,420</p>
                  </div>
                </div>
              </div>
            </GlassCardContent>
          </GlassCard>

          <GlassCard className="mx-2">
            <GlassCardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-slate-800/50 text-green-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">This Week</p>
                    <p className="text-xl font-bold text-slate-100">+420</p>
                  </div>
                </div>
              </div>
            </GlassCardContent>
          </GlassCard>

          <GlassCard className="mx-2">
            <GlassCardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-slate-800/50 text-purple-400">
                    <Star className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Level</p>
                    <p className="text-xl font-bold text-slate-100">8</p>
                  </div>
                </div>
              </div>
            </GlassCardContent>
          </GlassCard>
        </div>

        {/* User Rank Card */}
        <GlassCard className="mb-8 mx-2 border-primary-400/50 bg-gradient-to-br from-primary-500/5 to-teal-500/5">
          <GlassCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">CN</span>
                  </div>
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black border-0 text-xs">
                    Pro
                  </Badge>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100">CyberNinja</h3>
                  <p className="text-sm text-slate-400">Your Global Rank</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                      ↗ +12 this week
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <ProgressRing progress={65} size={60} />
                <div className="text-right">
                  <div className="text-4xl font-bold text-primary-400">#156</div>
                  <p className="text-sm text-slate-400">3,420 points</p>
                </div>
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          {["global", "weekly", "monthly"].map(tab => (
            <ModernButton
              key={tab}
              variant={activeTab === tab ? "primary" : "glass"}
              size="sm"
              onClick={() => setActiveTab(tab)}
            >
              {tab === "global" ? "Global" : tab === "weekly" ? "This Week" : "This Month"}
            </ModernButton>
          ))}
        </div>

        {/* Leaderboard */}
        <GlassCard className="mx-2">
          <GlassCardHeader>
            <GlassCardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              {activeTab === "global" ? "Global Rankings" : activeTab === "weekly" ? "Weekly Rankings" : "Monthly Rankings"}
            </GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent>
            <div className="space-y-3">
              {globalLeaderboard.map((player) => (
                <div
                  key={player.rank}
                  className={`flex items-center justify-between rounded-lg border p-4 transition-all duration-300 ${
                    player.username === "CyberNinja"
                      ? "border-primary-400/50 bg-primary-500/10"
                      : "border-slate-700/50 bg-slate-800/20 hover:bg-slate-800/40 hover:border-slate-600/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center">
                      {getRankIcon(player.rank)}
                    </div>
                    <div className="relative">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {player.username.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      {player.rank <= 3 && (
                        <Crown className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-slate-100">{player.username}</h4>
                        {player.rank === 1 && (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black border-0 text-xs">
                            Champion
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-400">
                        Level {player.level} • {player.completedLabs} labs completed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary-400">
                        {activeTab === "global" ? player.points.toLocaleString() : 
                         activeTab === "weekly" ? Math.floor(player.points * 0.1).toLocaleString() :
                         Math.floor(player.points * 0.3).toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500">points</p>
                    </div>
                    {player.trend === "up" && <TrendingUp className="h-5 w-5 text-green-400" />}
                    {player.trend === "down" && <TrendingUp className="h-5 w-5 text-red-400 rotate-180" />}
                  </div>
                </div>
              ))}
            </div>
          </GlassCardContent>
        </GlassCard>

      </div>
    </div>
  )
}
