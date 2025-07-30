"use client"

// WebSocket service for real-time features in DevHive Platform

export interface WebSocketMessage {
  type: string
  payload: any
  timestamp: Date
  userId?: string
}

export interface RoomMessage extends WebSocketMessage {
  type: "room_message"
  payload: {
    roomId: string
    message: string
    username: string
    avatar?: string
  }
}

export interface CodeUpdate extends WebSocketMessage {
  type: "code_update"
  payload: {
    roomId: string
    code: string
    language: string
    cursorPosition?: { line: number; column: number }
  }
}

export interface UserJoined extends WebSocketMessage {
  type: "user_joined"
  payload: {
    roomId: string
    username: string
    avatar?: string
  }
}

export interface UserLeft extends WebSocketMessage {
  type: "user_left"
  payload: {
    roomId: string
    username: string
  }
}

export interface SessionUpdate extends WebSocketMessage {
  type: "session_update"
  payload: {
    sessionId: string
    timeLeft: number
    leaderboard: Array<{
      username: string
      score: number
      rank: number
    }>
  }
}

type MessageHandler = (message: WebSocketMessage) => void

class WebSocketService {
  private ws: WebSocket | null = null
  private handlers: Map<string, MessageHandler[]> = new Map()
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private isConnecting = false

  constructor() {
    this.connect()
  }

  private connect(): void {
    if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.CONNECTING)) {
      return
    }

    this.isConnecting = true

    try {
      // In a real app, this would be your WebSocket server URL
      // For now, we'll simulate WebSocket behavior
      this.simulateWebSocket()
    } catch (error) {
      console.error("WebSocket connection error:", error)
      this.handleReconnect()
    }
  }

  private simulateWebSocket(): void {
    // Simulate WebSocket connection for demo purposes
    console.log("Simulating WebSocket connection...")

    // Mock WebSocket object
    this.ws = {
      readyState: WebSocket.OPEN,
      send: (data: string) => {
        console.log("Mock WebSocket send:", data)
      },
      close: () => {
        console.log("Mock WebSocket closed")
      },
      addEventListener: () => {},
      removeEventListener: () => {},
    } as any

    this.isConnecting = false
    this.reconnectAttempts = 0

    // Simulate periodic updates
    this.startMockUpdates()
  }

  private startMockUpdates(): void {
    // Simulate real-time updates for demo
    setInterval(() => {
      if (this.handlers.has("session_update")) {
        const mockSessionUpdate: SessionUpdate = {
          type: "session_update",
          payload: {
            sessionId: "session-1",
            timeLeft: Math.max(0, 3600 - (Math.floor(Date.now() / 1000) % 3600)),
            leaderboard: [
              { username: "birukG09", score: 180, rank: 1 },
              { username: "codemaster", score: 160, rank: 2 },
              { username: "devninja", score: 100, rank: 3 },
            ],
          },
          timestamp: new Date(),
        }
        this.handleMessage(mockSessionUpdate)
      }
    }, 5000)

    // Simulate room messages
    setInterval(() => {
      if (this.handlers.has("room_message") && Math.random() > 0.8) {
        const mockMessages = [
          "Great solution! 🚀",
          "Anyone else stuck on this problem?",
          "Try using a different approach",
          "This is really challenging!",
          "Nice work everyone! 👏",
        ]

        const mockRoomMessage: RoomMessage = {
          type: "room_message",
          payload: {
            roomId: "room-1",
            message: mockMessages[Math.floor(Math.random() * mockMessages.length)],
            username: `user${Math.floor(Math.random() * 100)}`,
            avatar: "/placeholder.svg?height=32&width=32",
          },
          timestamp: new Date(),
        }
        this.handleMessage(mockRoomMessage)
      }
    }, 10000)
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("Max reconnection attempts reached")
      return
    }

    this.reconnectAttempts++
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)

    console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`)

    setTimeout(() => {
      this.connect()
    }, delay)
  }

  private handleMessage(message: WebSocketMessage): void {
    const handlers = this.handlers.get(message.type) || []
    handlers.forEach((handler) => {
      try {
        handler(message)
      } catch (error) {
        console.error("Error handling WebSocket message:", error)
      }
    })
  }

  // Public methods
  public subscribe(messageType: string, handler: MessageHandler): () => void {
    if (!this.handlers.has(messageType)) {
      this.handlers.set(messageType, [])
    }

    this.handlers.get(messageType)!.push(handler)

    // Return unsubscribe function
    return () => {
      const handlers = this.handlers.get(messageType)
      if (handlers) {
        const index = handlers.indexOf(handler)
        if (index > -1) {
          handlers.splice(index, 1)
        }
      }
    }
  }

  public send(message: WebSocketMessage): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message))
    } else {
      console.warn("WebSocket is not connected")
    }
  }

  public joinRoom(roomId: string, username: string, avatar?: string): void {
    const message: UserJoined = {
      type: "user_joined",
      payload: { roomId, username, avatar },
      timestamp: new Date(),
    }
    this.send(message)
  }

  public leaveRoom(roomId: string, username: string): void {
    const message: UserLeft = {
      type: "user_left",
      payload: { roomId, username },
      timestamp: new Date(),
    }
    this.send(message)
  }

  public sendRoomMessage(roomId: string, messageText: string, username: string, avatar?: string): void {
    const message: RoomMessage = {
      type: "room_message",
      payload: {
        roomId,
        message: messageText,
        username,
        avatar,
      },
      timestamp: new Date(),
    }
    this.send(message)
  }

  public sendCodeUpdate(
    roomId: string,
    code: string,
    language: string,
    cursorPosition?: { line: number; column: number },
  ): void {
    const message: CodeUpdate = {
      type: "code_update",
      payload: {
        roomId,
        code,
        language,
        cursorPosition,
      },
      timestamp: new Date(),
    }
    this.send(message)
  }

  public disconnect(): void {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.handlers.clear()
  }

  public isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN
  }
}

// Export singleton instance
export const wsService = new WebSocketService()

// Utility hooks for React components
export const useWebSocket = (messageType: string, handler: MessageHandler) => {
  const unsubscribeRef = React.useRef<(() => void) | null>(null)

  React.useEffect(() => {
    unsubscribeRef.current = wsService.subscribe(messageType, handler)

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
      }
    }
  }, [messageType, handler])
}

export const useRoomConnection = (roomId: string, username: string, avatar?: string) => {
  React.useEffect(() => {
    wsService.joinRoom(roomId, username, avatar)

    return () => {
      wsService.leaveRoom(roomId, username)
    }
  }, [roomId, username, avatar])
}

// Import React for hooks
import * as React from "react"
