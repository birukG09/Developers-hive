"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, X, Minimize2, Maximize2, Lightbulb, Code, BookOpen, Zap } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content:
        "Hello! I'm your Smart Assistant. I can help you with coding questions, explain concepts, suggest improvements, and provide guidance on your development journey. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "Explain React hooks",
        "Help debug my code",
        "Best practices for TypeScript",
        "Optimize performance",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        type: "assistant",
        content: generateResponse(inputValue),
        timestamp: new Date(),
        suggestions: generateSuggestions(inputValue),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("react") || lowerInput.includes("hook")) {
      return "React hooks are functions that let you use state and other React features in functional components. The most common hooks are useState for managing state, useEffect for side effects, and useContext for consuming context. Here's a quick example:\n\n```jsx\nconst [count, setCount] = useState(0);\n\nuseEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);\n```\n\nWould you like me to explain any specific hook in more detail?"
    }

    if (lowerInput.includes("typescript") || lowerInput.includes("type")) {
      return "TypeScript adds static typing to JavaScript, which helps catch errors early and improves code maintainability. Here are some best practices:\n\n1. Use interfaces for object shapes\n2. Leverage union types for flexibility\n3. Use generics for reusable components\n4. Enable strict mode in tsconfig.json\n\nExample:\n```typescript\ninterface User {\n  id: number;\n  name: string;\n  email?: string;\n}\n```\n\nWhat specific TypeScript concept would you like to explore?"
    }

    if (lowerInput.includes("debug") || lowerInput.includes("error")) {
      return "I'd be happy to help you debug! Here are some general debugging strategies:\n\n1. Check the browser console for error messages\n2. Use console.log() to trace variable values\n3. Use the browser's debugger or breakpoints\n4. Verify your imports and exports\n5. Check for typos in variable/function names\n\nIf you share your specific code or error message, I can provide more targeted help!"
    }

    if (lowerInput.includes("performance") || lowerInput.includes("optimize")) {
      return "Here are key performance optimization techniques:\n\n**React/Frontend:**\n- Use React.memo() for expensive components\n- Implement code splitting with lazy loading\n- Optimize images and use proper formats\n- Minimize bundle size\n\n**General:**\n- Use efficient algorithms and data structures\n- Implement caching strategies\n- Minimize network requests\n- Use CDNs for static assets\n\nWhat specific performance issue are you trying to solve?"
    }

    // Default response
    return "That's an interesting question! I'm here to help with coding concepts, debugging, best practices, and development guidance. Could you provide more details about what you're working on or what specific help you need? I can assist with:\n\n• Code explanations and examples\n• Debugging assistance\n• Best practices and patterns\n• Performance optimization\n• Technology recommendations"
  }

  const generateSuggestions = (input: string): string[] => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("react")) {
      return ["useState vs useReducer", "Custom hooks", "React performance", "Context API"]
    }

    if (lowerInput.includes("typescript")) {
      return ["Generic types", "Utility types", "Type guards", "Declaration files"]
    }

    if (lowerInput.includes("debug")) {
      return ["Console debugging", "Browser DevTools", "Error handling", "Testing strategies"]
    }

    return ["Code review", "Architecture patterns", "Testing best practices", "Deployment strategies"]
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <Bot className="h-6 w-6 text-white" />
      </Button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isMinimized ? "h-14 w-80" : "h-[600px] w-96"
      }`}
    >
      <Card className="h-full bg-gray-800/95 border-gray-700 backdrop-blur-xl shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <CardTitle className="text-white text-sm">Smart Assistant</CardTitle>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Online</Badge>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex flex-col h-[calc(100%-80px)] p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          : "bg-gray-700 text-gray-100"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                      <div className="text-xs opacity-70 mt-2">{formatTime(message.timestamp)}</div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 text-gray-100 rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {messages.length > 0 && messages[messages.length - 1].suggestions && !isTyping && (
                  <div className="space-y-2">
                    <div className="text-xs text-gray-400 flex items-center space-x-1">
                      <Lightbulb className="h-3 w-3" />
                      <span>Suggested topics:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs border-gray-600 hover:border-purple-500 hover:bg-purple-500/10 bg-transparent"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Actions */}
            <div className="border-t border-gray-700 p-3">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSuggestionClick("Explain this code")}
                  className="text-xs text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  <Code className="h-3 w-3 mr-1" />
                  Code Help
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSuggestionClick("Best practices for")}
                  className="text-xs text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  <BookOpen className="h-3 w-3 mr-1" />
                  Best Practices
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSuggestionClick("How to optimize")}
                  className="text-xs text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Optimize
                </Button>
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask me anything about coding..."
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
