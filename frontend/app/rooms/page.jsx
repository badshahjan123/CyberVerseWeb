"use client"

import { useState } from "react"
import { Users, Zap, Plus, Filter } from "lucide-react"
import { RoomCard } from "@/components/ui/room-card"
import { ModernButton } from "@/components/ui/modern-button"
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"

const mockRooms = [
  {
    id: 1,
    name: "Beginner CTF Challenge",
    difficulty: "beginner",
    currentPlayers: 15,
    maxPlayers: 25,
    timeLeft: "3h 45m",
    description: "Perfect for newcomers to capture the flag competitions",
    isActive: true,
    category: "ctf"
  },
  {
    id: 2,
    name: "Red Team vs Blue Team",
    difficulty: "advanced",
    currentPlayers: 8,
    maxPlayers: 12,
    timeLeft: "1h 20m",
    description: "Advanced team-based attack and defense simulation",
    isActive: true,
    isPremium: true,
    category: "team"
  },
  {
    id: 3,
    name: "Web App Penetration",
    difficulty: "intermediate",
    currentPlayers: 12,
    maxPlayers: 20,
    timeLeft: "2h 10m",
    description: "Live web application security testing environment",
    isActive: true,
    category: "web"
  },
  {
    id: 4,
    name: "Network Intrusion Sim",
    difficulty: "expert",
    currentPlayers: 5,
    maxPlayers: 10,
    timeLeft: "45m",
    description: "Advanced network penetration testing scenario",
    isActive: false,
    isPremium: true,
    category: "network"
  },
  {
    id: 5,
    name: "Malware Analysis Lab",
    difficulty: "advanced",
    currentPlayers: 7,
    maxPlayers: 15,
    timeLeft: "Starting soon",
    description: "Real-time malware analysis and reverse engineering",
    isActive: false,
    isPremium: true,
    category: "forensics"
  },
  {
    id: 6,
    name: "Social Engineering Exercise",
    difficulty: "intermediate",
    currentPlayers: 18,
    maxPlayers: 30,
    timeLeft: "4h 30m",
    description: "Human-based attack simulation and awareness training",
    isActive: true,
    category: "social"
  },
  {
    id: 7,
    name: "Mobile Security Testing",
    difficulty: "advanced",
    currentPlayers: 6,
    maxPlayers: 12,
    timeLeft: "1h 55m",
    description: "iOS and Android application security assessment",
    isActive: true,
    isPremium: true,
    category: "mobile"
  }
]

export default function RoomsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showActiveOnly, setShowActiveOnly] = useState(false)

  const filteredRooms = mockRooms.filter(room => {
    const matchesCategory = selectedCategory === "all" || room.category === selectedCategory
    const matchesActive = !showActiveOnly || room.isActive
    return matchesCategory && matchesActive
  })

  const activeRooms = mockRooms.filter(room => room.isActive).length
  const totalPlayers = mockRooms.reduce((sum, room) => sum + room.currentPlayers, 0)

  return (
    <div className="bg-slate-950 py-8">
      <div className="container mx-auto px-6 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100 mb-2">Attack Rooms</h1>
        <p className="text-slate-400">Join live cybersecurity challenges and compete with others</p>
      </div>

      {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <GlassCard>
          <GlassCardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-xl font-bold text-slate-100">{activeRooms}</span>
            </div>
            <p className="text-sm text-slate-400">Active Rooms</p>
          </GlassCardContent>
        </GlassCard>

        <GlassCard>
          <GlassCardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-4 h-4 text-primary-400" />
              <span className="text-xl font-bold text-slate-100">{totalPlayers}</span>
            </div>
            <p className="text-sm text-slate-400">Players Online</p>
          </GlassCardContent>
        </GlassCard>

        <GlassCard>
          <GlassCardContent className="p-4 text-center">
            <ModernButton variant="primary" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Create Room
            </ModernButton>
          </GlassCardContent>
        </GlassCard>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex gap-2">
          {["all", "ctf", "team", "web", "network", "forensics", "social", "mobile"].map(category => (
            <ModernButton
              key={category}
              variant={selectedCategory === category ? "primary" : "glass"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category === "all" ? "All Categories" : category.toUpperCase()}
            </ModernButton>
          ))}
        </div>
        
        <ModernButton
          variant={showActiveOnly ? "primary" : "glass"}
          size="sm"
          onClick={() => setShowActiveOnly(!showActiveOnly)}
        >
          <Filter className="w-4 h-4 mr-2" />
          Active Only
        </ModernButton>
      </div>

        {/* Active Rooms */}
        <GlassCard className="mb-8 mx-2">
        <GlassCardHeader>
          <GlassCardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-green-400" />
            Live Rooms
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              {activeRooms} Active
            </Badge>
          </GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredRooms
              .filter(room => room.isActive)
              .map(room => (
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

        {/* Upcoming Rooms */}
        <GlassCard className="mx-2">
        <GlassCardHeader>
          <GlassCardTitle>Upcoming Rooms</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredRooms
              .filter(room => !room.isActive)
              .map(room => (
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

      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No rooms found matching your criteria</p>
        </div>
      )}
      </div>
    </div>
  )
}