"use client"

import { useState } from "react"
import { User, Trophy, Target, Clock, Edit, Settings, Crown, Medal, Star } from "lucide-react"
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card"
import { ModernButton } from "@/components/ui/modern-button"
import { Badge } from "@/components/ui/badge"
import { ProgressRing } from "@/components/ui/progress-ring"
import { PremiumUpgrade } from "@/components/ui/premium-upgrade"

const achievements = [
  { id: 1, name: "First Steps", description: "Complete your first lab", icon: Target, earned: true, rarity: "common" },
  { id: 2, name: "Speed Demon", description: "Complete a lab in under 30 minutes", icon: Clock, earned: true, rarity: "rare" },
  { id: 3, name: "Team Player", description: "Join 5 attack rooms", icon: User, earned: true, rarity: "uncommon" },
  { id: 4, name: "Elite Hacker", description: "Complete 10 expert-level labs", icon: Crown, earned: false, rarity: "legendary" },
  { id: 5, name: "Mentor", description: "Help 50 other users", icon: Star, earned: false, rarity: "epic" },
  { id: 6, name: "Champion", description: "Win 3 CTF competitions", icon: Trophy, earned: true, rarity: "epic" }
]

const recentActivity = [
  { type: "lab_complete", title: "SQL Injection Fundamentals", points: 100, time: "2 hours ago" },
  { type: "room_join", title: "Red Team Exercise", points: 0, time: "1 day ago" },
  { type: "achievement", title: "Speed Demon", points: 50, time: "2 days ago" },
  { type: "lab_complete", title: "XSS Exploitation", points: 150, time: "3 days ago" }
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isPremium] = useState(false)

  const userStats = {
    rank: 156,
    totalPoints: 3420,
    labsCompleted: 24,
    roomsJoined: 12,
    timeSpent: "42h",
    level: 8,
    nextLevelProgress: 65
  }

  const getRarityColor = (rarity) => {
    const colors = {
      common: "text-slate-400 border-slate-600",
      uncommon: "text-green-400 border-green-600", 
      rare: "text-blue-400 border-blue-600",
      epic: "text-purple-400 border-purple-600",
      legendary: "text-yellow-400 border-yellow-600"
    }
    return colors[rarity] || colors.common
  }

  return (
    <div className="bg-slate-950 py-8">
      <div className="container mx-auto px-6 max-w-7xl">
      {/* Profile Header */}
        <GlassCard className="mb-8 mx-2">
        <GlassCardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              {isPremium && (
                <div className="absolute -top-2 -right-2 p-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500">
                  <Crown className="w-4 h-4 text-black" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-xl font-bold text-slate-100">CyberNinja</h1>
                {isPremium && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black border-0">
                    Premium
                  </Badge>
                )}
              </div>
              <p className="text-slate-400 mb-4">Cybersecurity Enthusiast • Level {userStats.level}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-100">#{userStats.rank}</p>
                  <p className="text-sm text-slate-400">Global Rank</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-100">{userStats.totalPoints}</p>
                  <p className="text-sm text-slate-400">Total Points</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-100">{userStats.labsCompleted}</p>
                  <p className="text-sm text-slate-400">Labs Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-100">{userStats.timeSpent}</p>
                  <p className="text-sm text-slate-400">Time Spent</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <ModernButton variant="glass" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </ModernButton>
              <ModernButton variant="glass" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </ModernButton>
            </div>
          </div>
        </GlassCardContent>
      </GlassCard>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Level Progress */}
            <GlassCard className="mx-2">
            <GlassCardHeader>
              <GlassCardTitle>Level Progress</GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="flex items-center gap-4">
                <ProgressRing progress={userStats.nextLevelProgress} size={80} />
                <div>
                  <p className="text-lg font-semibold text-slate-100">Level {userStats.level}</p>
                  <p className="text-sm text-slate-400">
                    {userStats.nextLevelProgress}% to Level {userStats.level + 1}
                  </p>
                  <p className="text-xs text-slate-500">
                    350 more points needed
                  </p>
                </div>
              </div>
            </GlassCardContent>
          </GlassCard>

            {/* Achievements */}
            <GlassCard className="mx-2">
            <GlassCardHeader>
              <GlassCardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Achievements
              </GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map(achievement => {
                  const Icon = achievement.icon
                  return (
                    <div 
                      key={achievement.id}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        achievement.earned 
                          ? `${getRarityColor(achievement.rarity)} bg-slate-800/30` 
                          : 'border-slate-700 bg-slate-800/10 opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className={`w-5 h-5 ${achievement.earned ? getRarityColor(achievement.rarity).split(' ')[0] : 'text-slate-600'}`} />
                        <div>
                          <p className={`font-semibold ${achievement.earned ? 'text-slate-100' : 'text-slate-500'}`}>
                            {achievement.name}
                          </p>
                          <Badge 
                            className={`text-xs ${getRarityColor(achievement.rarity)} bg-transparent`}
                          >
                            {achievement.rarity}
                          </Badge>
                        </div>
                      </div>
                      <p className={`text-sm ${achievement.earned ? 'text-slate-300' : 'text-slate-600'}`}>
                        {achievement.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </GlassCardContent>
          </GlassCard>

            {/* Recent Activity */}
            <GlassCard className="mx-2">
            <GlassCardHeader>
              <GlassCardTitle>Recent Activity</GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'lab_complete' ? 'bg-green-500/20 text-green-400' :
                        activity.type === 'room_join' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {activity.type === 'lab_complete' && <Target className="w-4 h-4" />}
                        {activity.type === 'room_join' && <User className="w-4 h-4" />}
                        {activity.type === 'achievement' && <Medal className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-medium text-slate-100">{activity.title}</p>
                        <p className="text-sm text-slate-400">{activity.time}</p>
                      </div>
                    </div>
                    {activity.points > 0 && (
                      <Badge className="bg-primary-500/20 text-primary-400 border-primary-500/30">
                        +{activity.points} pts
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </GlassCardContent>
          </GlassCard>
        </div>

        {/* Sidebar */}
          <div className="space-y-6">
          {!isPremium && <PremiumUpgrade compact />}
          
            {/* Quick Stats */}
            <GlassCard className="mx-2">
            <GlassCardHeader>
              <GlassCardTitle>This Week</GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Labs Completed</span>
                  <span className="text-slate-100 font-semibold">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Points Earned</span>
                  <span className="text-slate-100 font-semibold">420</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Time Spent</span>
                  <span className="text-slate-100 font-semibold">12h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Rank Change</span>
                  <span className="text-green-400 font-semibold">↗ +12</span>
                </div>
              </div>
            </GlassCardContent>
          </GlassCard>
        </div>
      </div>
      </div>
    </div>
  )
}