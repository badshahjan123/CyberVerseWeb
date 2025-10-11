"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Clock, Users, Trophy, Lock, Play } from "lucide-react"
import { GlassCard, GlassCardContent, GlassCardHeader } from "./glass-card"
import { ModernButton } from "./modern-button"
import { Badge } from "./badge"
import { ProgressRing } from "./progress-ring"
import { DifficultyBadge } from "./difficulty-badge"

export function LabCard({ 
  lab, 
  isPremium = false, 
  userProgress = 0, 
  isCompleted = false,
  isLocked = false 
}) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <GlassCard className="group hover:border-primary-400/50 transition-all duration-300 m-2">
      <GlassCardHeader className="relative p-4 pb-2">
        {isPremium && (
          <Badge className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-black border-0">
            <Trophy className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        )}
        {isLocked && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm rounded-t-lg flex items-center justify-center">
            <Lock className="w-8 h-8 text-slate-400" />
          </div>
        )}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-slate-100 mb-2 group-hover:text-primary-400 transition-colors">
              {lab.title}
            </h3>
            <DifficultyBadge level={lab.difficulty} />
          </div>
          <ProgressRing progress={userProgress} size={40} />
        </div>
      </GlassCardHeader>
      
      <GlassCardContent className="p-4 pt-2">
        <p className="text-slate-300 text-sm mb-3 line-clamp-2">
          {lab.description}
        </p>
        
        <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {lab.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {lab.participants}
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="w-3 h-3" />
            {lab.points} pts
          </div>
        </div>

        <div className="flex gap-2">
          <ModernButton 
            variant={isCompleted ? "glass" : "primary"} 
            size="sm" 
            className="flex-1"
            asChild
            disabled={isLocked}
          >
            <Link href={`/labs/${lab.id}`}>
              <Play className="w-4 h-4 mr-2" />
              {mounted ? (isCompleted ? "Review" : "Start Lab") : "Start Lab"}
            </Link>
          </ModernButton>
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}