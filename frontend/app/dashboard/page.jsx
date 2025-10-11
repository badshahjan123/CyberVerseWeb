"use client"

import { Trophy, Target, Clock, Zap, BookOpen, Users } from "lucide-react"
import { StatsCard } from "@/components/dashboard/stats-card"
import { LabCard } from "@/components/ui/lab-card"
import { RoomCard } from "@/components/ui/room-card"
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card"
import { ModernButton } from "@/components/ui/modern-button"

const mockLabs = [
  { id: 1, title: "SQL Injection Basics", difficulty: "beginner", duration: "45 min", participants: "1.2k", points: 100, description: "Learn the fundamentals of SQL injection attacks" },
  { id: 2, title: "XSS Exploitation", difficulty: "intermediate", duration: "60 min", participants: "856", points: 150, description: "Master cross-site scripting techniques" },
  { id: 3, title: "Buffer Overflow Advanced", difficulty: "expert", duration: "120 min", participants: "234", points: 300, description: "Advanced buffer overflow exploitation", isPremium: true }
]

const mockRooms = [
  { id: 1, name: "Capture The Flag", difficulty: "intermediate", currentPlayers: 12, maxPlayers: 20, timeLeft: "2h 15m", description: "Live CTF competition", isActive: true },
  { id: 2, name: "Red Team Exercise", difficulty: "advanced", currentPlayers: 8, maxPlayers: 15, timeLeft: "45m", description: "Advanced penetration testing", isPremium: true }
]

export default function Dashboard() {
  return (
    <div className="bg-slate-950 py-8">
      <div className="container mx-auto px-6 space-y-8 max-w-7xl">
      {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Labs Completed"
          value="24"
          subtitle="8 this week"
          icon={BookOpen}
          progress={75}
          trend={12}
          color="success"
        />
        <StatsCard
          title="Current Rank"
          value="#156"
          subtitle="Top 5%"
          icon={Trophy}
          color="warning"
        />
        <StatsCard
          title="Total Points"
          value="3,420"
          subtitle="420 this week"
          icon={Target}
          trend={8}
          color="primary"
        />
        <StatsCard
          title="Time Spent"
          value="42h"
          subtitle="This month"
          icon={Clock}
          color="danger"
        />
      </div>

        {/* Continue Learning */}
        <GlassCard className="mx-2">
        <GlassCardHeader>
          <GlassCardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary-400" />
            Continue Learning
          </GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
            {mockLabs.map((lab, index) => (
              <LabCard 
                key={lab.id} 
                lab={lab} 
                isPremium={lab.isPremium}
                userProgress={index === 0 ? 65 : index === 1 ? 30 : 0}
                isCompleted={false}
              />
            ))}
          </div>
        </GlassCardContent>
      </GlassCard>

        {/* Active Rooms */}
        <GlassCard className="mx-2">
        <GlassCardHeader>
          <div className="flex items-center justify-between">
            <GlassCardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-400" />
              Live Attack Rooms
            </GlassCardTitle>
            <ModernButton variant="glass" size="sm">
              View All
            </ModernButton>
          </div>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
            {mockRooms.map(room => (
              <RoomCard 
                key={room.id} 
                room={room} 
                isActive={room.isActive}
                isPremium={room.isPremium}
              />
            ))}
          </div>
        </GlassCardContent>
      </GlassCard>
      </div>
    </div>
  )
}