"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Clock, Users, Trophy, Play, Send, CheckCircle, XCircle, Star, MessageCircle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { CodeEditor } from "@/components/code-editor"

interface Problem {
  id: string
  title: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  points: number
  testCases: { input: string; output: string }[]
  starterCode: string
  language: string
}

interface Participant {
  id: string
  username: string
  avatar: string
  score: number
  solved: number
  rank: number
}

interface ChatMessage {
  id: string
  username: string
  avatar: string
  message: string
  timestamp: Date
}

export default function LiveSessionPage() {
  const params = useParams()
  const sessionId = params.id as string

  const [timeLeft, setTimeLeft] = useState(3600) // 1 hour in seconds
  const [isActive, setIsActive] = useState(true)
  const [currentProblem, setCurrentProblem] = useState(0)
  const [code, setCode] = useState("")
  const [testResults, setTestResults] = useState<
    { passed: boolean; input: string; expected: string; actual: string }[]
  >([])
  const [chatMessage, setChatMessage] = useState("")
  const [participants, setParticipants] = useState<Participant[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [problems, setProblems] = useState<Problem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load session data
    const loadSessionData = async () => {
      try {
        // Mock data - replace with real API calls
        const mockProblems: Problem[] = [
          {
            id: "problem-1",
            title: "Two Sum",
            description:
              "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
            difficulty: "easy",
            points: 100,
            testCases: [
              { input: "[2,7,11,15], 9", output: "[0,1]" },
              { input: "[3,2,4], 6", output: "[1,2]" },
              { input: "[3,3], 6", output: "[0,1]" },
            ],
            starterCode: `function twoSum(nums, target) {
    // Your code here
    
}`,
            language: "javascript",
          },
          {
            id: "problem-2",
            title: "Reverse String",
            description:
              "Write a function that reverses a string. The input string is given as an array of characters s.",
            difficulty: "easy",
            points: 80,
            testCases: [
              { input: '["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
              { input: '["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' },
            ],
            starterCode: `function reverseString(s) {
    // Your code here
    
}`,
            language: "javascript",
          },
        ]

        const mockParticipants: Participant[] = [
          {
            id: "user-1",
            username: "birukG09",
            avatar: "/placeholder.svg?height=32&width=32",
            score: 180,
            solved: 2,
            rank: 1,
          },
          {
            id: "user-2",
            username: "codemaster",
            avatar: "/placeholder.svg?height=32&width=32",
            score: 160,
            solved: 2,
            rank: 2,
          },
          {
            id: "user-3",
            username: "devninja",
            avatar: "/placeholder.svg?height=32&width=32",
            score: 100,
            solved: 1,
            rank: 3,
          },
        ]

        const mockChatMessages: ChatMessage[] = [
          {
            id: "msg-1",
            username: "codemaster",
            avatar: "/placeholder.svg?height=32&width=32",
            message: "Great session! Really enjoying the problems.",
            timestamp: new Date(Date.now() - 5 * 60 * 1000),
          },
          {
            id: "msg-2",
            username: "devninja",
            avatar: "/placeholder.svg?height=32&width=32",
            message: "Anyone else stuck on the second problem?",
            timestamp: new Date(Date.now() - 3 * 60 * 1000),
          },
          {
            id: "msg-3",
            username: "birukG09",
            avatar: "/placeholder.svg?height=32&width=32",
            message: "Try thinking about it step by step! 💡",
            timestamp: new Date(Date.now() - 1 * 60 * 1000),
          },
        ]

        setProblems(mockProblems)
        setParticipants(mockParticipants)
        setChatMessages(mockChatMessages)
        setCode(mockProblems[0].starterCode)
      } catch (error) {
        console.error("Failed to load session data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSessionData()
  }, [sessionId])

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleRunCode = () => {
    // Mock test execution
    const mockResults = [
      { passed: true, input: "[2,7,11,15], 9", expected: "[0,1]", actual: "[0,1]" },
      { passed: true, input: "[3,2,4], 6", expected: "[1,2]", actual: "[1,2]" },
      { passed: false, input: "[3,3], 6", expected: "[0,1]", actual: "[1,1]" },
    ]
    setTestResults(mockResults)
  }

  const handleSubmit = () => {
    // Submit solution
    console.log("Submitting solution:", code)
    // Update score and move to next problem
  }

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      username: "birukG09",
      avatar: "/placeholder.svg?height=32&width=32",
      message: chatMessage,
      timestamp: new Date(),
    }

    setChatMessages([...chatMessages, newMessage])
    setChatMessage("")
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "hard":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    return `${Math.floor(diffInMinutes / 60)}h ago`
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
        </div>
      </DashboardLayout>
    )
  }

  const currentProblemData = problems[currentProblem]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Session Header */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-white">Advanced TypeScript Patterns</CardTitle>
                <CardDescription className="text-gray-400 mt-1">Live Coding Challenge Session</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-400 font-medium">LIVE</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Clock className="w-5 h-5" />
                  <span className="text-xl font-mono">{formatTime(timeLeft)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Users className="w-5 h-5" />
                  <span>{participants.length} participants</span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Problem Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {problems.map((problem, index) => (
                <Button
                  key={problem.id}
                  variant={index === currentProblem ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setCurrentProblem(index)
                    setCode(problem.starterCode)
                    setTestResults([])
                  }}
                  className={`flex-shrink-0 ${
                    index === currentProblem
                      ? "bg-purple-500 hover:bg-purple-600"
                      : "border-gray-600 hover:border-purple-500"
                  }`}
                >
                  Problem {index + 1}
                </Button>
              ))}
            </div>

            {/* Problem Description */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-xl text-white">{currentProblemData.title}</CardTitle>
                    <Badge className={getDifficultyColor(currentProblemData.difficulty)}>
                      {currentProblemData.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4" />
                      <span className="text-sm">{currentProblemData.points} pts</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">{currentProblemData.description}</p>

                <div className="mt-6">
                  <h4 className="text-white font-semibold mb-3">Test Cases:</h4>
                  <div className="space-y-2">
                    {currentProblemData.testCases.map((testCase, index) => (
                      <div key={index} className="bg-gray-700/50 p-3 rounded-lg">
                        <div className="text-sm">
                          <span className="text-gray-400">Input: </span>
                          <span className="text-blue-400 font-mono">{testCase.input}</span>
                        </div>
                        <div className="text-sm mt-1">
                          <span className="text-gray-400">Output: </span>
                          <span className="text-green-400 font-mono">{testCase.output}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Code Editor */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Code Editor</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button onClick={handleRunCode} className="bg-blue-500 hover:bg-blue-600">
                      <Play className="w-4 h-4 mr-2" />
                      Run Tests
                    </Button>
                    <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Submit
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CodeEditor value={code} onChange={setCode} language={currentProblemData.language} height="300px" />
              </CardContent>
            </Card>

            {/* Test Results */}
            {testResults.length > 0 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Test Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {testResults.map((result, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${
                          result.passed ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {result.passed ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400" />
                          )}
                          <span className={`font-medium ${result.passed ? "text-green-400" : "text-red-400"}`}>
                            Test Case {index + 1} {result.passed ? "Passed" : "Failed"}
                          </span>
                        </div>
                        <div className="text-sm space-y-1">
                          <div>
                            <span className="text-gray-400">Input: </span>
                            <span className="text-blue-400 font-mono">{result.input}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Expected: </span>
                            <span className="text-green-400 font-mono">{result.expected}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Actual: </span>
                            <span className={`font-mono ${result.passed ? "text-green-400" : "text-red-400"}`}>
                              {result.actual}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {participants.map((participant, index) => (
                    <div key={participant.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-700/30">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0
                            ? "bg-yellow-500 text-black"
                            : index === 1
                              ? "bg-gray-400 text-black"
                              : index === 2
                                ? "bg-orange-600 text-white"
                                : "bg-gray-600 text-white"
                        }`}
                      >
                        {participant.rank}
                      </div>
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{participant.username[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{participant.username}</div>
                        <div className="text-gray-400 text-xs">
                          {participant.solved} solved • {participant.score} pts
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Live Chat */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                  Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-64 p-4">
                  <div className="space-y-3">
                    {chatMessages.map((message) => (
                      <div key={message.id} className="flex items-start gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={message.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">{message.username[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-white text-sm font-medium">{message.username}</span>
                            <span className="text-gray-500 text-xs">{formatTimeAgo(message.timestamp)}</span>
                          </div>
                          <p className="text-gray-300 text-sm mt-1 break-words">{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t border-gray-700">
                  <div className="flex gap-2">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="bg-gray-700 border-gray-600 text-white"
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} size="sm" className="bg-blue-500 hover:bg-blue-600">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
