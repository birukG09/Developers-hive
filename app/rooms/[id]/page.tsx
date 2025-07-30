"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Send,
  Settings,
  Share,
  Play,
  Square,
  Mic,
  MicOff,
  Video,
  VideoOff,
  MoreVertical,
  Rocket,
  Star,
  Zap,
  Moon,
} from "lucide-react"
import { CodeEditor } from "@/components/code-editor"
import { AIAssistant } from "@/components/ai-assistant"

export default function LiveCodeRoom() {
  const [code, setCode] = useState(`// Welcome to DevHive Cosmic Code Room! 🚀
// Collaborate in real-time with developers across the galaxy

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Let's optimize this with memoization! ✨
const fibMemo = {};
function fibonacciOptimized(n) {
  if (n in fibMemo) return fibMemo[n];
  if (n <= 1) return n;
  
  fibMemo[n] = fibonacciOptimized(n - 1) + fibonacciOptimized(n - 2);
  return fibMemo[n];
}

console.log("🌟 Fibonacci(10):", fibonacciOptimized(10));
console.log("🚀 Performance boost achieved!");`)

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "sarah_dev",
      content: "🚀 Hey cosmic coders! Ready to tackle this algorithm challenge?",
      timestamp: "2:30 PM",
      avatar: "S",
      type: "message",
    },
    {
      id: 2,
      user: "mike_codes",
      content: "✨ I think we can optimize this with memoization - great performance boost!",
      timestamp: "2:31 PM",
      avatar: "M",
      type: "message",
    },
    {
      id: 3,
      user: "alex_js",
      content: "🌟 Perfect idea! Let me add that to the code right now",
      timestamp: "2:32 PM",
      avatar: "A",
      type: "message",
    },
    {
      id: 4,
      user: "system",
      content: "🎯 Code execution completed successfully! Output: 55",
      timestamp: "2:33 PM",
      avatar: "🤖",
      type: "system",
    },
  ])

  const [participants] = useState([
    { id: 1, name: "sarah_dev", status: "active", avatar: "S", role: "host", level: "Cosmic Master" },
    { id: 2, name: "mike_codes", status: "active", avatar: "M", role: "participant", level: "Star Coder" },
    { id: 3, name: "alex_js", status: "active", avatar: "A", role: "participant", level: "Galaxy Dev" },
    { id: 4, name: "jenny_py", status: "idle", avatar: "J", role: "participant", level: "Moon Walker" },
    { id: 5, name: "dev_master", status: "active", avatar: "D", role: "participant", level: "Nebula Ninja" },
  ])

  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [executionProgress, setExecutionProgress] = useState(0)

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: "you",
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        avatar: "Y",
        type: "message" as const,
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const runCode = () => {
    setIsRunning(true)
    setExecutionProgress(0)

    // Simulate code execution with progress
    const interval = setInterval(() => {
      setExecutionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRunning(false)
          return 100
        }
        return prev + 20
      })
    }, 400)
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Room Header */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border-b border-slate-800/50 backdrop-blur-xl rounded-t-2xl">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center animate-pulse">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-bounce">
                <Star className="h-3 w-3 text-black m-0.5" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                React Hooks Deep Dive
              </h1>
              <p className="text-slate-400 flex items-center space-x-2">
                <span>JavaScript</span>
                <span>•</span>
                <span>{participants.length} cosmic coders</span>
                <span>•</span>
                <Moon className="h-3 w-3 text-yellow-400" />
                <span>Space Room</span>
              </p>
            </div>
            <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30 backdrop-blur-sm animate-pulse">
              <Zap className="h-3 w-3 mr-1" />
              Live
            </Badge>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className={`border-slate-600 transition-all duration-300 hover:scale-105 ${
                isAudioEnabled
                  ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30"
                  : "hover:bg-slate-800/50 bg-black/20 backdrop-blur-sm"
              }`}
            >
              {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsVideoEnabled(!isVideoEnabled)}
              className={`border-slate-600 transition-all duration-300 hover:scale-105 ${
                isVideoEnabled
                  ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30"
                  : "hover:bg-slate-800/50 bg-black/20 backdrop-blur-sm"
              }`}
            >
              {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-600 hover:bg-slate-800/50 bg-black/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-600 hover:bg-slate-800/50 bg-black/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Code Editor */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between p-4 bg-black/40 border-b border-slate-800/50 backdrop-blur-xl">
              <div className="flex items-center space-x-3">
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30"
                >
                  main.js
                </Badge>
                <span className="text-slate-400 text-sm flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-400" />
                  <span>JavaScript</span>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {isRunning && (
                  <div className="flex items-center space-x-2">
                    <Progress value={executionProgress} className="w-24 h-2" />
                    <span className="text-xs text-slate-400">{executionProgress}%</span>
                  </div>
                )}
                <Button
                  size="sm"
                  onClick={runCode}
                  disabled={isRunning}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105"
                >
                  {isRunning ? (
                    <>
                      <Square className="h-4 w-4 mr-2" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Execute
                    </>
                  )}
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <CodeEditor value={code} onChange={setCode} language="javascript" theme="vs-dark" />
            </div>
            {/* Output Panel */}
            <div className="h-40 bg-black border-t border-slate-800/50 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-300 font-medium flex items-center space-x-2">
                  <Rocket className="h-4 w-4 text-purple-400" />
                  <span>Cosmic Output</span>
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white transition-colors duration-300"
                >
                  Clear
                </Button>
              </div>
              <div className="bg-slate-900 rounded-lg p-3 font-mono text-sm border border-slate-800/50">
                {isRunning ? (
                  <div className="text-yellow-400 animate-pulse flex items-center space-x-2">
                    <Zap className="h-4 w-4" />
                    <span>Executing cosmic code...</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="text-green-400">🌟 Fibonacci(10): 55</div>
                    <div className="text-blue-400">🚀 Performance boost achieved!</div>
                    <div className="text-purple-400">✨ Execution completed in 0.003ms</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 border-l border-slate-800/50 flex flex-col bg-black/20 backdrop-blur-xl">
            {/* Participants */}
            <div className="p-4 border-b border-slate-800/50">
              <h3 className="text-white font-medium mb-4 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Cosmic Coders ({participants.length})
              </h3>
              <div className="space-y-3">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold">
                            {participant.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-800 ${
                            participant.status === "active" ? "bg-green-400 animate-pulse" : "bg-slate-500"
                          }`}
                        />
                      </div>
                      <div>
                        <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors duration-300">
                          {participant.name}
                        </span>
                        <div className="flex items-center space-x-2">
                          {participant.role === "host" && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border border-yellow-500/30"
                            >
                              Host
                            </Badge>
                          )}
                          <span className="text-xs text-slate-500">{participant.level}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat */}
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-slate-800/50">
                <h3 className="text-white font-medium flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-purple-400" />
                  <span>Cosmic Chat</span>
                </h3>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex space-x-3 group">
                      <Avatar className="h-6 w-6 mt-0.5">
                        <AvatarFallback
                          className={`text-xs ${
                            msg.type === "system"
                              ? "bg-gradient-to-r from-blue-500 to-purple-500"
                              : "bg-gradient-to-r from-purple-500 to-pink-500"
                          } text-white font-bold`}
                        >
                          {msg.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span
                            className={`text-sm font-medium ${
                              msg.type === "system" ? "text-blue-300" : "text-slate-300"
                            } group-hover:text-white transition-colors duration-300`}
                          >
                            {msg.user}
                          </span>
                          <span className="text-slate-500 text-xs">{msg.timestamp}</span>
                        </div>
                        <p
                          className={`text-sm leading-relaxed ${
                            msg.type === "system" ? "text-blue-200" : "text-slate-200"
                          } group-hover:text-white transition-colors duration-300`}
                        >
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t border-slate-800/50">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Share your cosmic thoughts..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="bg-slate-800/50 border-slate-600 text-white backdrop-blur-sm"
                  />
                  <Button
                    size="sm"
                    onClick={sendMessage}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Sidebar */}
      <AIAssistant />
    </DashboardLayout>
  )
}
