"use client"

import { useState } from "react"
import { ArrowLeft, Play, Pause, RotateCcw, Lightbulb, CheckCircle, Clock, Trophy, Users } from "lucide-react"
import Link from "next/link"
import { ModernButton } from "@/components/ui/modern-button"
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card"
import { ProgressRing } from "@/components/ui/progress-ring"
import { DifficultyBadge } from "@/components/ui/difficulty-badge"
import { Badge } from "@/components/ui/badge"

export default function LabDetail({ params }) {
  const [isStarted, setIsStarted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [completedSteps, setCompletedSteps] = useState([])

  const lab = {
    id: params.id,
    title: "SQL Injection Fundamentals",
    difficulty: "beginner",
    duration: "45 min",
    points: 100,
    description: "Learn the fundamentals of SQL injection attacks and how to prevent them",
    objectives: [
      "Understand SQL injection vulnerabilities",
      "Perform basic SQL injection attacks",
      "Learn prevention techniques",
      "Complete practical exercises"
    ],
    steps: [
      {
        title: "Introduction to SQL Injection",
        content: "SQL injection is a code injection technique that exploits vulnerabilities in an application's software...",
        hint: "Look for input fields that interact with the database"
      },
      {
        title: "Identifying Vulnerable Parameters",
        content: "Learn to identify potential injection points in web applications...",
        hint: "Try adding a single quote (') to see if you get an error"
      },
      {
        title: "Basic Payload Construction",
        content: "Construct your first SQL injection payload...",
        hint: "Use UNION SELECT to extract data from other tables"
      },
      {
        title: "Data Extraction",
        content: "Extract sensitive information from the database...",
        hint: "Look for the users table and try to get password hashes"
      }
    ]
  }

  const progress = (completedSteps.length / lab.steps.length) * 100

  const handleStepComplete = (stepIndex) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex])
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <ModernButton variant="ghost" size="sm" asChild>
          <Link href="/labs">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Labs
          </Link>
        </ModernButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lab Info */}
          <GlassCard>
            <GlassCardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <GlassCardTitle className="text-2xl mb-2">{lab.title}</GlassCardTitle>
                  <div className="flex items-center gap-4 mb-4">
                    <DifficultyBadge level={lab.difficulty} />
                    <div className="flex items-center gap-1 text-sm text-slate-400">
                      <Clock className="w-4 h-4" />
                      {lab.duration}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-400">
                      <Trophy className="w-4 h-4" />
                      {lab.points} points
                    </div>
                  </div>
                </div>
                <ProgressRing progress={progress} size={80} />
              </div>
              <p className="text-slate-300">{lab.description}</p>
            </GlassCardHeader>
          </GlassCard>

          {/* Lab Controls */}
          <GlassCard>
            <GlassCardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <ModernButton 
                    variant={isStarted ? "danger" : "primary"}
                    onClick={() => setIsStarted(!isStarted)}
                  >
                    {isStarted ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Pause Lab
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start Lab
                      </>
                    )}
                  </ModernButton>
                  
                  <ModernButton variant="glass">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </ModernButton>
                </div>

                <ModernButton 
                  variant="glass" 
                  onClick={() => setShowHint(!showHint)}
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Hint
                </ModernButton>
              </div>
            </GlassCardContent>
          </GlassCard>

          {/* Lab Steps */}
          {isStarted && (
            <div className="space-y-4">
              {lab.steps.map((step, index) => (
                <GlassCard 
                  key={index}
                  className={`${
                    index === currentStep ? 'border-primary-400/50' : ''
                  } ${
                    completedSteps.includes(index) ? 'border-green-400/50 bg-green-500/5' : ''
                  }`}
                >
                  <GlassCardHeader>
                    <div className="flex items-center justify-between">
                      <GlassCardTitle className="flex items-center gap-3">
                        {completedSteps.includes(index) ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-slate-600" />
                        )}
                        Step {index + 1}: {step.title}
                      </GlassCardTitle>
                      {index === currentStep && (
                        <Badge className="bg-primary-500/20 text-primary-400 border-primary-500/30">
                          Current
                        </Badge>
                      )}
                    </div>
                  </GlassCardHeader>
                  <GlassCardContent>
                    <p className="text-slate-300 mb-4">{step.content}</p>
                    
                    {showHint && index === currentStep && (
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 text-yellow-400 mb-2">
                          <Lightbulb className="w-4 h-4" />
                          Hint
                        </div>
                        <p className="text-yellow-200 text-sm">{step.hint}</p>
                      </div>
                    )}

                    {index === currentStep && (
                      <div className="flex gap-2">
                        <ModernButton 
                          variant="success"
                          size="sm"
                          onClick={() => {
                            handleStepComplete(index)
                            if (index < lab.steps.length - 1) {
                              setCurrentStep(index + 1)
                            }
                          }}
                        >
                          Complete Step
                        </ModernButton>
                        {index > 0 && (
                          <ModernButton 
                            variant="glass"
                            size="sm"
                            onClick={() => setCurrentStep(index - 1)}
                          >
                            Previous
                          </ModernButton>
                        )}
                      </div>
                    )}
                  </GlassCardContent>
                </GlassCard>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Objectives */}
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle>Learning Objectives</GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent>
              <ul className="space-y-2">
                {lab.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                    {objective}
                  </li>
                ))}
              </ul>
            </GlassCardContent>
          </GlassCard>

          {/* Progress */}
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle>Progress</GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="text-center mb-4">
                <ProgressRing progress={progress} size={100} />
              </div>
              <p className="text-sm text-slate-400 text-center">
                {completedSteps.length} of {lab.steps.length} steps completed
              </p>
            </GlassCardContent>
          </GlassCard>

          {/* Lab Environment */}
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle>Lab Environment</GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Status</span>
                  <span className={isStarted ? "text-green-400" : "text-slate-400"}>
                    {isStarted ? "Running" : "Stopped"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Time Remaining</span>
                  <span className="text-slate-300">42:15</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Attempts</span>
                  <span className="text-slate-300">1/3</span>
                </div>
              </div>
            </GlassCardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}