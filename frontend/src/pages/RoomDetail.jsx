import { useParams, Link } from "react-router-dom"
import { useState, memo, useMemo } from "react"
import { ArrowLeft, Users, Clock, Crown, Send, Trophy, Target, Zap } from "lucide-react"

const RoomDetail = memo(() => {
  const { id } = useParams()
  const [message, setMessage] = useState("")
  const [isJoined, setIsJoined] = useState(false)

  const room = useMemo(() => ({
    id: parseInt(id),
    name: "Red Team vs Blue Team",
    description: "Advanced team-based attack and defense simulation",
    difficulty: "advanced",
    currentPlayers: 8,
    maxPlayers: 12,
    timeLeft: "1h 20m",
    category: "team",
    isPremium: true,
    objective: "Compromise the target network while defending your own infrastructure"
  }), [id])

  const players = useMemo(() => [
    { id: 1, username: "CyberNinja", team: "red", score: 1250, isOnline: true },
    { id: 2, username: "H4ck3rPr0", team: "red", score: 980, isOnline: true },
    { id: 3, username: "SecurityQueen", team: "blue", score: 1100, isOnline: true },
    { id: 4, username: "ByteBandit", team: "blue", score: 850, isOnline: false },
    { id: 5, username: "CodeBreaker", team: "red", score: 750, isOnline: true },
    { id: 6, username: "PenTestPro", team: "blue", score: 920, isOnline: true },
  ], [])

  const chatMessages = useMemo(() => [
    { id: 1, username: "CyberNinja", message: "Red team, let's focus on the web server first", time: "2 min ago", team: "red" },
    { id: 2, username: "SecurityQueen", message: "Blue team defending port 443, watch out!", time: "1 min ago", team: "blue" },
    { id: 3, username: "H4ck3rPr0", message: "Found a SQL injection vulnerability!", time: "30 sec ago", team: "red" },
  ], [])

  const handleJoinRoom = () => {
    setIsJoined(!isJoined)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      // Add message logic here
      setMessage("")
    }
  }

  const redTeamScore = players.filter(p => p.team === "red").reduce((sum, p) => sum + p.score, 0)
  const blueTeamScore = players.filter(p => p.team === "blue").reduce((sum, p) => sum + p.score, 0)

  return (
    <div className="page-container bg-slate-950 py-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-6">
          <Link to="/rooms" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Rooms
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{room.name}</h1>
                {room.isPremium && <Crown className="h-6 w-6 text-yellow-400" />}
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-400">Live</span>
                </div>
              </div>
              <p className="text-slate-300 mb-4">{room.description}</p>
              <div className="flex items-center gap-6 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {room.timeLeft} remaining
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {room.currentPlayers}/{room.maxPlayers} players
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  room.difficulty === "beginner" ? "bg-green-600 text-white" :
                  room.difficulty === "intermediate" ? "bg-yellow-600 text-white" : "bg-red-600 text-white"
                }`}>
                  {room.difficulty}
                </span>
              </div>
            </div>
            <button
              onClick={handleJoinRoom}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isJoined 
                  ? "bg-red-600 hover:bg-red-700 text-white" 
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isJoined ? "Leave Room" : "Join Room"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="card rounded-xl bg-slate-800/30 border border-slate-700/50 mb-6">
              <div className="p-6 border-b border-slate-700/50">
                <h2 className="text-xl font-bold text-white">Objective</h2>
              </div>
              <div className="p-6">
                <p className="text-slate-300 mb-4">{room.objective}</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-400">{redTeamScore}</div>
                        <div className="text-sm text-slate-400">Red Team</div>
                      </div>
                      <div className="text-slate-500 text-xl">VS</div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{blueTeamScore}</div>
                        <div className="text-sm text-slate-400">Blue Team</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-400" />
                      <span className="text-white font-medium">
                        {redTeamScore > blueTeamScore ? "Red Team Leading" : 
                         blueTeamScore > redTeamScore ? "Blue Team Leading" : "Tied"}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-3">
                    <div 
                      className="bg-red-500 h-3 rounded-l-full transition-all duration-300" 
                      style={{ width: `${(redTeamScore / (redTeamScore + blueTeamScore)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card rounded-xl bg-slate-800/30 border border-slate-700/50">
              <div className="p-6 border-b border-slate-700/50">
                <h3 className="text-lg font-bold text-white">Live Chat</h3>
              </div>
              <div className="p-6">
                <div className="bg-slate-900 rounded-lg p-4 mb-4 h-64 overflow-y-auto border border-slate-700/50">
                  <div className="space-y-3">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          msg.team === "red" ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                        }`}>
                          {msg.username.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`font-medium ${
                              msg.team === "red" ? "text-red-400" : "text-blue-400"
                            }`}>
                              {msg.username}
                            </span>
                            <span className="text-xs text-slate-500">{msg.time}</span>
                          </div>
                          <p className="text-slate-300 text-sm">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {isJoined && (
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card rounded-xl bg-slate-800/30 border border-slate-700/50">
              <div className="p-6 border-b border-slate-700/50">
                <h3 className="text-lg font-bold text-white">Players</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-red-400 mb-2">Red Team</h4>
                    {players.filter(p => p.team === "red").map((player) => (
                      <div key={player.id} className="list-item flex items-center justify-between p-2 rounded-lg bg-red-500/10 border border-red-500/20 mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${player.isOnline ? "bg-green-400" : "bg-slate-400"}`}></div>
                          <span className="text-white text-sm">{player.username}</span>
                        </div>
                        <span className="text-red-400 text-sm font-medium">{player.score}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-400 mb-2">Blue Team</h4>
                    {players.filter(p => p.team === "blue").map((player) => (
                      <div key={player.id} className="list-item flex items-center justify-between p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${player.isOnline ? "bg-green-400" : "bg-slate-400"}`}></div>
                          <span className="text-white text-sm">{player.username}</span>
                        </div>
                        <span className="text-blue-400 text-sm font-medium">{player.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="card rounded-xl bg-slate-800/30 border border-slate-700/50">
              <div className="p-6 border-b border-slate-700/50">
                <h3 className="text-lg font-bold text-white">Room Stats</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Total Attacks</span>
                    <span className="text-white font-medium">47</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Successful Exploits</span>
                    <span className="text-white font-medium">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Flags Captured</span>
                    <span className="text-white font-medium">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Average Score</span>
                    <span className="text-white font-medium">945</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

RoomDetail.displayName = 'RoomDetail'
export default RoomDetail