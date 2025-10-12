import { useState, useMemo, memo, useCallback } from "react"
import { Users, Zap, Plus, Filter, Clock, Crown } from "lucide-react"
import { Link } from "react-router-dom"

const RoomCard = memo(({ room }) => (
  <Link to={`/rooms/${room.id}`} className="block">
    <div className="card p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-blue-500/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-white">{room.name}</h3>
            {room.isPremium && <Crown className="h-4 w-4 text-yellow-400" />}
          </div>
          <p className="text-sm text-slate-400 mb-2">{room.description}</p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {room.timeLeft}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {room.currentPlayers}/{room.maxPlayers}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-400">Live</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          room.difficulty === "beginner" ? "bg-green-600 text-white" :
          room.difficulty === "intermediate" ? "bg-yellow-600 text-white" : "bg-red-600 text-white"
        }`}>
          {room.difficulty}
        </span>
        <div className="w-full mx-3 bg-slate-600 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full" 
            style={{ width: `${(room.currentPlayers / room.maxPlayers) * 100}%` }}
          ></div>
        </div>
        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors">
          Start
        </button>
      </div>
    </div>
  </Link>
))

const Rooms = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showActiveOnly, setShowActiveOnly] = useState(false)

  const mockRooms = useMemo(() => [
    {
      id: 1,
      name: "Ethical Hacking Arena",
      difficulty: "intermediate",
      currentPlayers: 15,
      maxPlayers: 25,
      timeLeft: "3h 45m",
      description: "Live ethical hacking challenges and penetration testing",
      isActive: true,
      category: "ethical"
    },
    {
      id: 2,
      name: "Code Warriors Battle",
      difficulty: "advanced",
      currentPlayers: 8,
      maxPlayers: 12,
      timeLeft: "1h 20m",
      description: "Competitive programming and algorithm challenges",
      isActive: true,
      isPremium: true,
      category: "coding"
    },
    {
      id: 3,
      name: "React Developers Hub",
      difficulty: "intermediate",
      currentPlayers: 12,
      maxPlayers: 20,
      timeLeft: "2h 10m",
      description: "Collaborative React application development",
      isActive: true,
      category: "web"
    },
    {
      id: 4,
      name: "Network Security Lab",
      difficulty: "advanced",
      currentPlayers: 6,
      maxPlayers: 15,
      timeLeft: "4h 30m",
      description: "Advanced network security and monitoring",
      isActive: true,
      category: "network",
      isPremium: true
    },
    {
      id: 5,
      name: "Mobile Dev Studio",
      difficulty: "intermediate",
      currentPlayers: 18,
      maxPlayers: 30,
      timeLeft: "2h 45m",
      description: "iOS and Android app development workshop",
      isActive: true,
      category: "mobile"
    },
    {
      id: 6,
      name: "Linux Masters Dojo",
      difficulty: "expert",
      currentPlayers: 4,
      maxPlayers: 8,
      timeLeft: "5h 15m",
      description: "Advanced Linux system administration and scripting",
      isActive: true,
      category: "system",
      isPremium: true
    },
    {
      id: 7,
      name: "Python Coding Bootcamp",
      difficulty: "beginner",
      currentPlayers: 22,
      maxPlayers: 40,
      timeLeft: "1h 50m",
      description: "Learn Python programming from basics to advanced",
      isActive: true,
      category: "python"
    }
  ], [])

  const filteredRooms = useMemo(() => {
    return mockRooms.filter(room => {
      const matchesCategory = selectedCategory === "all" || room.category === selectedCategory
      const matchesActive = !showActiveOnly || room.isActive
      return matchesCategory && matchesActive
    })
  }, [mockRooms, selectedCategory, showActiveOnly])

  const stats = useMemo(() => {
    const activeRooms = mockRooms.filter(room => room.isActive).length
    const totalPlayers = mockRooms.reduce((sum, room) => sum + room.currentPlayers, 0)
    return { activeRooms, totalPlayers }
  }, [mockRooms])

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category)
  }, [])

  const handleActiveToggle = useCallback(() => {
    setShowActiveOnly(prev => !prev)
  }, [])

  return (
    <div className="page-container bg-slate-950 py-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Practice Rooms</h1>
          <p className="text-slate-300">Join live technical challenges and collaborate with others</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-4 text-center rounded-xl bg-slate-800/30 border border-slate-700/50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-xl font-bold text-slate-100">{stats.activeRooms}</span>
            </div>
            <p className="text-sm text-slate-400">Active Rooms</p>
          </div>

          <div className="card p-4 text-center rounded-xl bg-slate-800/30 border border-slate-700/50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-xl font-bold text-slate-100">{stats.totalPlayers}</span>
            </div>
            <p className="text-sm text-slate-400">Players Online</p>
          </div>

          <div className="card p-4 text-center rounded-xl bg-slate-800/30 border border-slate-700/50">
            <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
              <Plus className="w-4 h-4" />
              Create Room
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex gap-2">
            {["all", "ethical", "coding", "web", "network"].map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  selectedCategory === category 
                    ? "bg-blue-500 text-white" 
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {category === "all" ? "All Categories" : 
                 category === "ethical" ? "ETHICAL HACKING" :
                 category === "coding" ? "CODING" : category.toUpperCase()}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleActiveToggle}
            className={`px-3 py-1 rounded text-sm flex items-center gap-2 transition-colors ${
              showActiveOnly 
                ? "bg-blue-500 text-white" 
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            <Filter className="w-4 h-4" />
            Active Only
          </button>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
            <Zap className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold text-white">Live Attack Rooms</h2>
            <div className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              {filteredRooms.length} Active
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No rooms found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
})

Rooms.displayName = 'Rooms'
export default Rooms