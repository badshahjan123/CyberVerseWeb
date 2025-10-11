"use client"

import { useState } from "react"
import { Search, Filter, Grid, List } from "lucide-react"
import { LabCard } from "@/components/ui/lab-card"
import { ModernButton } from "@/components/ui/modern-button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockLabs = [
  { id: 1, title: "SQL Injection Fundamentals", difficulty: "beginner", duration: "45 min", participants: "1.2k", points: 100, description: "Learn SQL injection basics and prevention techniques", category: "web" },
  { id: 2, title: "Cross-Site Scripting (XSS)", difficulty: "intermediate", duration: "60 min", participants: "856", points: 150, description: "Master XSS attack vectors and mitigation", category: "web" },
  { id: 3, title: "Buffer Overflow Exploitation", difficulty: "expert", duration: "120 min", participants: "234", points: 300, description: "Advanced memory corruption techniques", category: "binary", isPremium: true },
  { id: 4, title: "Network Reconnaissance", difficulty: "intermediate", duration: "90 min", participants: "645", points: 200, description: "Information gathering and network mapping", category: "network" },
  { id: 5, title: "Cryptographic Attacks", difficulty: "advanced", duration: "75 min", participants: "423", points: 250, description: "Breaking weak encryption implementations", category: "crypto", isPremium: true },
  { id: 6, title: "Linux Privilege Escalation", difficulty: "advanced", duration: "100 min", participants: "567", points: 275, description: "Escalate privileges on Linux systems", category: "system" },
  { id: 7, title: "Web Application Firewall Bypass", difficulty: "expert", duration: "150 min", participants: "189", points: 350, description: "Advanced WAF evasion techniques", category: "web", isPremium: true },
  { id: 8, title: "Wireless Security Assessment", difficulty: "intermediate", duration: "80 min", participants: "398", points: 180, description: "WiFi penetration testing fundamentals", category: "wireless" },
  { id: 9, title: "Malware Analysis Basics", difficulty: "beginner", duration: "50 min", participants: "892", points: 120, description: "Static and dynamic malware analysis", category: "forensics" },
  { id: 10, title: "Active Directory Attacks", difficulty: "expert", duration: "180 min", participants: "156", points: 400, description: "Advanced AD exploitation techniques", category: "system", isPremium: true },
  { id: 11, title: "Mobile App Security", difficulty: "advanced", duration: "110 min", participants: "334", points: 280, description: "iOS and Android security testing", category: "mobile", isPremium: true },
  { id: 12, title: "Social Engineering Tactics", difficulty: "intermediate", duration: "65 min", participants: "723", points: 160, description: "Human-based attack vectors", category: "social" }
]

export default function LabsPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const filteredLabs = mockLabs.filter(lab => {
    const matchesSearch = lab.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || lab.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || lab.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  return (
    <div className="bg-slate-950 py-8">
      <div className="container mx-auto px-6 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100 mb-2">Interactive Labs</h1>
        <p className="text-slate-400">Master cybersecurity through hands-on practice</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search labs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="web">Web Security</SelectItem>
              <SelectItem value="network">Network</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="crypto">Cryptography</SelectItem>
              <SelectItem value="forensics">Forensics</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="wireless">Wireless</SelectItem>
              <SelectItem value="social">Social Engineering</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border border-slate-700 rounded-lg p-1">
            <ModernButton
              variant={viewMode === "grid" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </ModernButton>
            <ModernButton
              variant={viewMode === "list" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </ModernButton>
          </div>
        </div>
      </div>

      {/* Labs Grid */}
        <div className={`grid gap-6 p-2 ${
        viewMode === "grid" 
          ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
          : "grid-cols-1"
      }`}>
        {filteredLabs.map((lab, index) => (
          <LabCard 
            key={lab.id} 
            lab={lab} 
            isPremium={lab.isPremium}
            userProgress={37 + (lab.id * 7) % 63}
            isCompleted={lab.id % 4 === 0}
            isLocked={lab.isPremium && lab.id % 3 === 0}
          />
        ))}
      </div>

        {filteredLabs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No labs found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}