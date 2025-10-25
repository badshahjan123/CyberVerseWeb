import { Link } from "react-router-dom"
import { useApp } from "../contexts/app-context"
import { useRealtime } from "../contexts/realtime-context"
import { ProtectedRoute } from "../components/protected-route"
import { Trophy, Target, Zap, Clock, CheckCircle2, ArrowRight } from "lucide-react"
import { memo, useMemo, useState } from "react"

const Dashboard = memo(() => {
  const { user } = useApp()
  const { userStats } = useRealtime()
  
  const currentUser = userStats || user

  const userData = useMemo(() => currentUser || {
    name: 'User',
    level: 1,
    points: 0,
    rank: 999,
    completedLabs: 0,
    completedRooms: 0
  }, [currentUser])

  const stats = useMemo(() => [
    { label: "Level", value: userData.level, icon: Zap, color: "text-blue-400" },
    { label: "Points", value: userData.points.toLocaleString(), icon: Trophy, color: "text-yellow-400" },
    { label: "Global Rank", value: `#${userData.rank}`, icon: Target, color: "text-red-400" },
    { label: "Rooms/Labs", value: `${userData.completedRooms || 0}/${userData.completedLabs || 0}`, icon: CheckCircle2, color: "text-green-400" },
  ], [userData])

  const [recentLabs, setRecentLabs] = useState([])

  const [upcomingRooms, setUpcomingRooms] = useState([])

  return (
    <ProtectedRoute>
      <div className="page-container bg-slate-950 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold neon-text">Welcome back, {userData.name}!</h1>
            <p className="text-slate-300">Continue your cybersecurity journey</p>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="futuristic-card hover-lift p-6 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-700/50">
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-100">{stat.value}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="card rounded-xl bg-slate-800/30 border border-slate-700/50">
                <div className="p-6 border-b border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white">Continue Learning</h2>
                      <p className="text-slate-400">Pick up where you left off</p>
                    </div>
                    <Link to="/labs" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
                      View All <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {recentLabs.map((lab) => (
                    <div key={lab.id} className="futuristic-card hover-lift p-4 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-white">{lab.title}</h3>
                          <p className="text-sm text-slate-400">{lab.category}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          lab.difficulty === "Easy" ? "bg-green-600 text-white" :
                          lab.difficulty === "Medium" ? "bg-yellow-600 text-white" : "bg-red-600 text-white"
                        }`}>
                          {lab.difficulty}
                        </span>
                      </div>
                      <div className="mb-2">
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${lab.progress}%` }}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">{lab.progress}% Complete</span>
                        <Link to={`/labs/${lab.id}`} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded">
                          Continue
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card rounded-xl bg-slate-800/30 border border-slate-700/50">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">Level Progress</h3>
                  <p className="text-slate-400 mb-4">Level {userData.level} → {userData.level + 1}</p>
                  <div className="mb-2">
                    <div className="w-full bg-slate-600 rounded-full h-3">
                      <div className="bg-blue-500 h-3 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400">650 / 1000 XP</p>
                </div>
              </div>

              <div className="card rounded-xl bg-slate-800/30 border border-slate-700/50">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">Upcoming Rooms</h3>
                  <p className="text-slate-400 mb-4">Live attack challenges</p>
                  <div className="space-y-3">
                    {upcomingRooms.map((room) => (
                      <div key={room.id} className="futuristic-card hover-lift p-3 rounded-lg">
                        <h4 className="font-semibold text-white text-sm mb-2">{room.title}</h4>
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>{room.participants} players</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {room.startsIn}
                          </span>
                        </div>
                      </div>
                    ))}
                    <Link to="/rooms" className="block w-full py-2 text-center border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white rounded transition-colors">
                      View All Rooms
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
})

Dashboard.displayName = 'Dashboard'
export default Dashboard