import { useState, useMemo, memo, useCallback } from "react"
import { Search, Grid, List, Lock, Clock, Users } from "lucide-react"
import { Link } from "react-router-dom"

const LabCard = memo(({ lab }) => (
  <Link to={`/labs/${lab.id}`} className="block">
    <div className="card p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-blue-500/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-1">{lab.title}</h3>
          <p className="text-sm text-slate-400 mb-2">{lab.description}</p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {lab.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {lab.participants}
            </span>
          </div>
        </div>
        {lab.isPremium && (
          <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">
            <Lock className="h-3 w-3" />
            Pro
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          lab.difficulty === "beginner" ? "bg-green-600 text-white" :
          lab.difficulty === "intermediate" ? "bg-yellow-600 text-white" :
          lab.difficulty === "advanced" ? "bg-orange-600 text-white" : "bg-red-600 text-white"
        }`}>
          {lab.difficulty}
        </span>
        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors">
          Start
        </button>
      </div>
    </div>
  </Link>
))

const Labs = memo(() => {
  const [viewMode, setViewMode] = useState("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const mockLabs = useMemo(() => [
    { id: 1, title: "Ethical Hacking Fundamentals", difficulty: "beginner", duration: "45 min", participants: "1.2k", points: 100, description: "Learn ethical hacking principles and methodologies", category: "ethical" },
    { id: 2, title: "Password Cracking Techniques", difficulty: "intermediate", duration: "60 min", participants: "856", points: 150, description: "Master password security and cracking methods", category: "ethical" },
    { id: 3, title: "Penetration Testing Lab", difficulty: "expert", duration: "120 min", participants: "234", points: 300, description: "Advanced penetration testing methodologies", category: "ethical", isPremium: true },
    { id: 4, title: "React Development Mastery", difficulty: "intermediate", duration: "90 min", participants: "645", points: 200, description: "Build modern React applications", category: "web" },
    { id: 5, title: "Python Programming Pro", difficulty: "advanced", duration: "75 min", participants: "423", points: 250, description: "Advanced Python programming concepts", category: "development", isPremium: true },
    { id: 6, title: "Linux Command Line Ninja", difficulty: "advanced", duration: "100 min", participants: "567", points: 275, description: "Master Linux terminal and system administration", category: "system" },
    { id: 7, title: "Full-Stack Web Development", difficulty: "advanced", duration: "85 min", participants: "312", points: 280, description: "Complete web application development", category: "web", isPremium: true },
    { id: 8, title: "Network Security Essentials", difficulty: "intermediate", duration: "70 min", participants: "489", points: 180, description: "Network security fundamentals and best practices", category: "network" },
    { id: 9, title: "Digital Forensics Investigation", difficulty: "beginner", duration: "55 min", participants: "723", points: 120, description: "Learn digital evidence analysis techniques", category: "forensics" },
    { id: 10, title: "Malware Analysis Workshop", difficulty: "expert", duration: "150 min", participants: "156", points: 350, description: "Advanced malware reverse engineering", category: "ethical", isPremium: true },
    { id: 11, title: "Clean Code Architecture", difficulty: "intermediate", duration: "65 min", participants: "634", points: 160, description: "Write maintainable and scalable code", category: "development" },
    { id: 12, title: "Cloud DevOps Mastery", difficulty: "advanced", duration: "95 min", participants: "298", points: 290, description: "AWS/Azure DevOps and automation", category: "cloud", isPremium: true }
  ], [])

  const categories = useMemo(() => [
    { value: "all", label: "All Categories" },
    { value: "ethical", label: "Ethical Hacking" },
    { value: "web", label: "Web Development" },
    { value: "development", label: "Programming" },
    { value: "network", label: "Network" },
    { value: "system", label: "System" },
  ], [])

  const difficulties = useMemo(() => [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "expert", label: "Expert" }
  ], [])

  const filteredLabs = useMemo(() => {
    return mockLabs.filter(lab => {
      const matchesSearch = lab.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || lab.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === "all" || lab.difficulty === selectedDifficulty
      return matchesSearch && matchesCategory && matchesDifficulty
    })
  }, [mockLabs, searchTerm, selectedCategory, selectedDifficulty])

  const handleSearchChange = useCallback((e) => setSearchTerm(e.target.value), [])
  const handleCategoryChange = useCallback((e) => setSelectedCategory(e.target.value), [])
  const handleDifficultyChange = useCallback((e) => setSelectedDifficulty(e.target.value), [])

  return (
    <div className="page-container bg-slate-950 py-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Interactive Labs</h1>
          <p className="text-slate-300">Master technical skills through hands-on practice</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                placeholder="Search labs..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select 
              value={selectedCategory} 
              onChange={handleCategoryChange}
              className="w-40 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>

            <select 
              value={selectedDifficulty} 
              onChange={handleDifficultyChange}
              className="w-40 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500"
            >
              {difficulties.map(diff => (
                <option key={diff.value} value={diff.value}>{diff.label}</option>
              ))}
            </select>

            <div className="flex border border-slate-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-500 text-white" : "text-slate-400 hover:text-white"}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-blue-500 text-white" : "text-slate-400 hover:text-white"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {selectedCategory === "all" ? (
          <div className="space-y-8">
            {["ethical", "web", "development", "network", "system", "cloud"].map(category => {
              const categoryLabs = filteredLabs.filter(lab => lab.category === category)
              if (categoryLabs.length === 0) return null
              
              const categoryNames = {
                ethical: "Ethical Hacking & Security",
                network: "Network Administration",
                web: "Web Development", 
                system: "System Administration",
                development: "Programming & Development",
                cloud: "Cloud Computing",
                forensics: "Digital Forensics"
              }
              
              return (
                <div key={category} className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white">{categoryNames[category]}</h2>
                    <div className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-sm">
                      {categoryLabs.length} Labs
                    </div>
                  </div>
                  
                  <div className={`grid gap-6 ${
                    viewMode === "grid" 
                      ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                      : "grid-cols-1"
                  }`}>
                    {categoryLabs.map((lab) => (
                      <LabCard key={lab.id} lab={lab} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">Filtered Labs</h2>
              <div className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-sm">
                {filteredLabs.length} Labs
              </div>
            </div>
            
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {filteredLabs.map((lab) => (
                <LabCard key={lab.id} lab={lab} />
              ))}
            </div>
          </div>
        )}

        {filteredLabs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No labs found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
})

Labs.displayName = 'Labs'
export default Labs