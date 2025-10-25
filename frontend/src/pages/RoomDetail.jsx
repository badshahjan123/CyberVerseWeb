import { useParams, Link, useNavigate } from "react-router-dom"
import { useState, memo, useEffect } from "react"
import { ArrowLeft, Users, Clock, Crown, Send, Trophy, Target, Zap, CheckCircle, Play, BookOpen, Award } from "lucide-react"
import { getRoomBySlug, submitExercise, submitQuiz, completeRoom } from "../services/rooms"
import { useApp } from "../contexts/app-context"

const RoomDetail = memo(() => {
  const { slug } = useParams()
  const { user } = useApp()
  const navigate = useNavigate()
  
  console.log('🔗 URL slug parameter:', slug)
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentTopic, setCurrentTopic] = useState(0)
  const [completedTopics, setCompletedTopics] = useState(new Set())
  const [completedExercises, setCompletedExercises] = useState(new Set())
  const [completedQuizzes, setCompletedQuizzes] = useState(new Set())
  const [exerciseAnswers, setExerciseAnswers] = useState({})
  const [quizAnswers, setQuizAnswers] = useState({})
  const [submittingExercise, setSubmittingExercise] = useState(null)
  const [submittingQuiz, setSubmittingQuiz] = useState(null)
  const [startTime] = useState(Date.now())
  const [roomCompleted, setRoomCompleted] = useState(false)

  useEffect(() => {
    let isMounted = true;
    
    const fetchRoom = async () => {
      if (!slug) {
        setError('No room slug provided');
        setLoading(false);
        return;
      }

      try {
        console.log('🔍 Fetching room with slug:', slug)
        console.log('🌐 API URL:', import.meta.env.VITE_API_URL);
        setLoading(true);
        setError(null);
        
        const roomData = await getRoomBySlug(slug);
        console.log('📦 Room data received:', roomData);
        console.log('📊 Topics count:', roomData?.topics?.length || 0);
        
        if (!isMounted) return;
        
        if (roomData) {
          setRoom(roomData);
        } else {
          throw new Error('No room data received');
        }
      } catch (err) {
        console.error('❌ Error fetching room:', err);
        console.error('❌ Error response:', err.response?.data);
        
        if (!isMounted) return;
        
        setError(err.response?.data?.message || err.message || 'Failed to load room');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRoom();
    
    return () => {
      isMounted = false;
    };
  }, [slug])

  const handleTopicComplete = (topicIndex) => {
    setCompletedTopics(prev => new Set([...prev, topicIndex]))
    if (topicIndex === currentTopic && topicIndex < (room?.topics?.length || 0) - 1) {
      setCurrentTopic(topicIndex + 1)
    }
  }

  const handleExerciseSubmit = async (exerciseId) => {
    const answer = exerciseAnswers[exerciseId]
    if (!answer?.trim()) return

    try {
      setSubmittingExercise(exerciseId)
      const result = await submitExercise(slug, exerciseId, answer)
      
      if (result.correct) {
        setCompletedExercises(prev => new Set([...prev, exerciseId]))
        alert(`Correct! You earned ${result.points} points!`)
      } else {
        alert(result.message || 'Incorrect answer. Try again.')
      }
    } catch (error) {
      alert('Error submitting exercise. Please try again.')
    } finally {
      setSubmittingExercise(null)
    }
  }

  const handleQuizSubmit = async (quizId) => {
    const answers = quizAnswers[quizId]
    if (!answers) return

    try {
      setSubmittingQuiz(quizId)
      const result = await submitQuiz(slug, quizId, answers)
      
      setCompletedQuizzes(prev => new Set([...prev, quizId]))
      if (result.passed) {
        alert(`Quiz completed! Score: ${result.percentage}% (${result.earnedPoints}/${result.totalPoints} points) - Great job!`)
      } else {
        alert(`Quiz completed! Score: ${result.percentage}% (${result.earnedPoints}/${result.totalPoints} points) - Keep learning!`)
      }
    } catch (error) {
      alert('Error submitting quiz. Please try again.')
    } finally {
      setSubmittingQuiz(null)
    }
  }

  const handleCompleteRoom = async () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000 / 60)
    const totalScore = completedTopics.size * 100

    try {
      await completeRoom(slug, timeSpent, totalScore)
    } catch (error) {
      console.log('Room completion API failed, but marking as complete locally')
    } finally {
      setRoomCompleted(true)
      const confirmed = window.confirm(
        `🎉 Congratulations! Room completed successfully!\n\n` +
        `⏱️ Time spent: ${timeSpent} minutes\n` +
        `🏆 Score: ${totalScore} points\n\n` +
        `Would you like to explore more rooms?`
      )
      
      if (confirmed) {
        navigate('/rooms')
      }
    }
  }

  if (loading) {
    return (
      <div className="page-container bg-slate-950 py-8">
        <div className="container mx-auto px-6 max-w-7xl">
          <Link to="/rooms" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Rooms
          </Link>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-400 text-lg">Loading room details...</p>
            <p className="text-slate-500 text-sm mt-2">Slug: {slug}</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-container bg-slate-950 py-8">
        <div className="container mx-auto px-6 max-w-7xl">
          <Link to="/rooms" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Rooms
          </Link>
          <div className="text-center py-12">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-400 text-lg font-semibold mb-2">Error Loading Room</p>
              <p className="text-red-300 mb-4">{error}</p>
              <p className="text-slate-500 text-sm mb-4">Slug: {slug}</p>
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Retry
                </button>
                <Link to="/rooms" className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg">
                  Back to Rooms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="page-container bg-slate-950 py-8">
        <div className="container mx-auto px-6 max-w-7xl">
          <Link to="/rooms" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Rooms
          </Link>
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg mb-4">Room not found</p>
            <p className="text-slate-500 text-sm mb-4">Slug: {slug}</p>
            <Link to="/rooms" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              Back to Rooms
            </Link>
          </div>
        </div>
      </div>
    )
  }

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
              <h1 className="text-3xl font-bold text-white mb-2">{room.title}</h1>
              <p className="text-slate-300 mb-4">{room.short_description}</p>
              <div className="flex items-center gap-6 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {room.estimated_time_minutes} minutes
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {room.completedBy?.length || 0} completed
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  room.difficulty === "Beginner" ? "bg-green-600 text-white" :
                  room.difficulty === "Intermediate" ? "bg-yellow-600 text-white" : "bg-red-600 text-white"
                }`}>
                  {room.difficulty}
                </span>
                <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded-full">
                  {room.category}
                </span>
              </div>
            </div>
            {roomCompleted && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg">
                <CheckCircle className="h-5 w-5" />
                Completed
              </div>
            )}
          </div>
        </div>

        <div className="card rounded-xl bg-slate-800/30 border border-slate-700/50 mb-8">
          <div className="p-6">
            <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {room.long_description_markdown}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {room.topics && room.topics.length > 0 && (
              <div className="card rounded-xl bg-slate-800/30 border border-slate-700/50 mb-6">
                <div className="p-6 border-b border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Learning Topics
                    </h2>
                    <span className="text-sm text-slate-400">
                      {currentTopic + 1} of {room.topics.length}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  {room.topics.map((topic, index) => (
                    <div key={topic.id} className={`mb-6 ${index !== currentTopic ? 'hidden' : ''}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          completedTopics.has(index) ? 'bg-green-600' : 
                          index === currentTopic ? 'bg-blue-600' : 'bg-slate-600'
                        }`}>
                          {completedTopics.has(index) ? (
                            <CheckCircle className="h-4 w-4 text-white" />
                          ) : (
                            <span className="text-white text-sm">{index + 1}</span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-white">{topic.title}</h3>
                        <span className="text-sm text-slate-400">({topic.estimated_time_minutes} min)</span>
                      </div>
                      <div className="bg-slate-900 rounded-lg p-6 mb-4">
                        <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                          {topic.content_markdown}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <button
                          onClick={() => setCurrentTopic(Math.max(0, currentTopic - 1))}
                          disabled={currentTopic === 0}
                          className="px-4 py-2 bg-slate-600 hover:bg-slate-700 disabled:opacity-50 text-white rounded-lg"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => handleTopicComplete(index)}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                        >
                          Mark Complete
                        </button>
                        <button
                          onClick={() => setCurrentTopic(Math.min(room.topics.length - 1, currentTopic + 1))}
                          disabled={currentTopic === room.topics.length - 1}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {room.exercises && room.exercises.length > 0 && (
              <div className="card rounded-xl bg-slate-800/30 border border-slate-700/50 mb-6">
                <div className="p-6 border-b border-slate-700/50">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Exercises
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  {room.exercises.map((exercise) => (
                    <div key={exercise.id} className={`bg-slate-900 rounded-lg p-6 ${completedExercises.has(exercise.id) ? 'border-2 border-green-500' : ''}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-lg font-semibold text-white">{exercise.title}</h3>
                        {completedExercises.has(exercise.id) && (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        )}
                      </div>
                      <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line mb-4">
                        {exercise.description_markdown}
                      </div>
                      {exercise.hint && (
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-4">
                          <p className="text-blue-300 text-sm">💡 Hint: {exercise.hint}</p>
                        </div>
                      )}
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Enter your answer..."
                          value={exerciseAnswers[exercise.id] || ''}
                          onChange={(e) => setExerciseAnswers(prev => ({ ...prev, [exercise.id]: e.target.value }))}
                          className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                        />
                        <button
                          onClick={() => handleExerciseSubmit(exercise.id)}
                          disabled={submittingExercise === exercise.id || !exerciseAnswers[exercise.id]?.trim()}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg flex items-center gap-2"
                        >
                          {submittingExercise === exercise.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                          Submit ({exercise.points} pts)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {room.quizzes && room.quizzes.length > 0 && (
              <div className="card rounded-xl bg-slate-800/30 border border-slate-700/50 mb-6">
                <div className="p-6 border-b border-slate-700/50">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Quizzes
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  {room.quizzes.map((quiz) => (
                    <div key={quiz.id} className={`bg-slate-900 rounded-lg p-6 ${completedQuizzes.has(quiz.id) ? 'border-2 border-green-500' : ''}`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-white">{quiz.title}</h3>
                          {completedQuizzes.has(quiz.id) && (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          )}
                        </div>
                        <span className="text-sm text-slate-400">
                          Pass: {quiz.pass_percentage}% | Time: {quiz.time_limit_seconds ? `${quiz.time_limit_seconds}s` : 'Unlimited'}
                        </span>
                      </div>
                      <div className="space-y-4 mb-6">
                        {quiz.questions.map((question) => (
                          <div key={question.id} className="bg-slate-800 rounded-lg p-4">
                            <p className="text-white mb-3">{question.question_text}</p>
                            {question.type === 'single' && (
                              <div className="space-y-2">
                                {question.options.map((option, optIndex) => (
                                  <label key={optIndex} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={`quiz-${quiz.id}-question-${question.id}`}
                                      value={option}
                                      onChange={(e) => setQuizAnswers(prev => ({
                                        ...prev,
                                        [quiz.id]: { ...prev[quiz.id], [question.id]: e.target.value }
                                      }))}
                                      className="text-blue-600"
                                    />
                                    <span className="text-slate-300">{option}</span>
                                  </label>
                                ))}
                              </div>
                            )}
                            {question.type === 'multi' && (
                              <div className="space-y-2">
                                {question.options.map((option, optIndex) => (
                                  <label key={optIndex} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      value={option}
                                      onChange={(e) => {
                                        const currentAnswers = quizAnswers[quiz.id]?.[question.id] || []
                                        const newAnswers = e.target.checked
                                          ? [...currentAnswers, option]
                                          : currentAnswers.filter(a => a !== option)
                                        setQuizAnswers(prev => ({
                                          ...prev,
                                          [quiz.id]: { ...prev[quiz.id], [question.id]: newAnswers }
                                        }))
                                      }}
                                      className="text-blue-600"
                                    />
                                    <span className="text-slate-300">{option}</span>
                                  </label>
                                ))}
                              </div>
                            )}
                            <div className="text-xs text-slate-500 mt-2">{question.points} points</div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => handleQuizSubmit(quiz.id)}
                        disabled={submittingQuiz === quiz.id}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg flex items-center gap-2"
                      >
                        {submittingQuiz === quiz.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        ) : (
                          <Trophy className="h-4 w-4" />
                        )}
                        Submit Quiz
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={handleCompleteRoom}
                disabled={roomCompleted}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50 text-white rounded-lg font-semibold flex items-center gap-2 mx-auto"
              >
                <Trophy className="h-5 w-5" />
                {roomCompleted ? 'Room Completed!' : 'Complete Room'}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card rounded-xl bg-slate-800/30 border border-slate-700/50">
              <div className="p-6 border-b border-slate-700/50">
                <h3 className="text-lg font-bold text-white">Progress</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-400">Topics</span>
                      <span className="text-sm text-blue-400">{completedTopics.size}/{room.topics?.length || 0}</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2 mb-3">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${((completedTopics.size / (room.topics?.length || 1)) * 100)}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-400">Exercises</span>
                      <span className="text-sm text-green-400">{completedExercises.size}/{room.exercises?.length || 0}</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2 mb-3">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${((completedExercises.size / (room.exercises?.length || 1)) * 100)}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-400">Quizzes</span>
                      <span className="text-sm text-purple-400">{completedQuizzes.size}/{room.quizzes?.length || 0}</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${((completedQuizzes.size / (room.quizzes?.length || 1)) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-slate-300">Learning Objectives</h4>
                    {room.learning_objectives?.map((objective, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className={`h-4 w-4 mt-0.5 ${
                          completedTopics.size > index ? 'text-green-400' : 'text-slate-600'
                        }`} />
                        <span className={`text-sm ${
                          completedTopics.size > index ? 'text-slate-300' : 'text-slate-500'
                        }`}>
                          {objective}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {room.prerequisites && room.prerequisites.length > 0 && (
              <div className="card rounded-xl bg-slate-800/30 border border-slate-700/50">
                <div className="p-6 border-b border-slate-700/50">
                  <h3 className="text-lg font-bold text-white">Prerequisites</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {room.prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        {prereq}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="card rounded-xl bg-slate-800/30 border border-slate-700/50">
              <div className="p-6 border-b border-slate-700/50">
                <h3 className="text-lg font-bold text-white">Room Info</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Creator</span>
                    <span className="text-white font-medium">{room.creator}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Difficulty</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      room.difficulty === "Beginner" ? "bg-green-600 text-white" :
                      room.difficulty === "Intermediate" ? "bg-yellow-600 text-white" : "bg-red-600 text-white"
                    }`}>
                      {room.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Estimated Time</span>
                    <span className="text-white font-medium">{room.estimated_time_minutes} min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Completions</span>
                    <span className="text-white font-medium">{room.completedBy?.length || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {room.tags && room.tags.length > 0 && (
              <div className="card rounded-xl bg-slate-800/30 border border-slate-700/50">
                <div className="p-6 border-b border-slate-700/50">
                  <h3 className="text-lg font-bold text-white">Tags</h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {room.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

RoomDetail.displayName = 'RoomDetail'
export default RoomDetail