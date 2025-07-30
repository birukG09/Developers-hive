// Mock Database Layer for DevHive Platform
// This simulates a real database with full CRUD operations

export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  bio?: string
  level: number
  xp: number
  reputation: number
  githubUsername?: string
  linkedinUrl?: string
  redditUsername?: string
  createdAt: Date
  updatedAt: Date
}

export interface Room {
  id: string
  name: string
  description: string
  language: string
  isPrivate: boolean
  maxParticipants: number
  currentParticipants: number
  hostId: string
  createdAt: Date
  updatedAt: Date
}

export interface Drop {
  id: string
  content: string
  authorId: string
  likes: number
  comments: number
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Session {
  id: string
  title: string
  description: string
  type: "challenge" | "workshop" | "interview"
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number
  maxParticipants: number
  currentParticipants: number
  hostId: string
  scheduledAt: Date
  status: "upcoming" | "live" | "completed"
  createdAt: Date
  updatedAt: Date
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: string
  xpReward: number
  requirements: Record<string, any>
  createdAt: Date
}

// Mock data storage
const mockUsers: User[] = [
  {
    id: "user-1",
    username: "birukG09",
    email: "biruk@devhive.com",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Full-stack developer passionate about real-time collaboration and clean code",
    level: 15,
    xp: 12500,
    reputation: 850,
    githubUsername: "birukG09",
    linkedinUrl: "https://www.linkedin.com/in/biruk-gebre-230935238/",
    redditUsername: "Safe-Present-1030",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date(),
  },
  {
    id: "user-2",
    username: "codemaster",
    email: "codemaster@devhive.com",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "TypeScript wizard and performance optimization expert",
    level: 22,
    xp: 18500,
    reputation: 1200,
    githubUsername: "codemaster",
    createdAt: new Date("2023-11-20"),
    updatedAt: new Date(),
  },
]

const mockRooms: Room[] = [
  {
    id: "room-1",
    name: "React Hooks Deep Dive",
    description: "Exploring advanced React hooks patterns and custom hooks",
    language: "javascript",
    isPrivate: false,
    maxParticipants: 10,
    currentParticipants: 7,
    hostId: "user-1",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
  {
    id: "room-2",
    name: "TypeScript Generics Workshop",
    description: "Master TypeScript generics with real-world examples",
    language: "typescript",
    isPrivate: false,
    maxParticipants: 15,
    currentParticipants: 12,
    hostId: "user-2",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
]

const mockDrops: Drop[] = [
  {
    id: "drop-1",
    content:
      "Quick tip: Use `Object.freeze()` to make objects immutable in JavaScript! Perfect for preventing accidental mutations in your state. 🧊",
    authorId: "user-1",
    likes: 42,
    comments: 8,
    tags: ["javascript", "tips", "immutable"],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
  {
    id: "drop-2",
    content:
      "Python list comprehension magic: `[x**2 for x in range(10) if x%2==0]` - squares of even numbers in one line! So clean and readable. ✨",
    authorId: "user-2",
    likes: 38,
    comments: 12,
    tags: ["python", "optimization", "clean-code"],
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
]

const mockSessions: Session[] = [
  {
    id: "session-1",
    title: "Algorithm Challenge: Binary Trees",
    description: "Solve challenging binary tree problems in a competitive environment",
    type: "challenge",
    difficulty: "intermediate",
    duration: 3600,
    maxParticipants: 50,
    currentParticipants: 23,
    hostId: "user-1",
    scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
    status: "upcoming",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
  {
    id: "session-2",
    title: "Advanced TypeScript Patterns",
    description: "Learn advanced TypeScript patterns and best practices",
    type: "workshop",
    difficulty: "advanced",
    duration: 5400,
    maxParticipants: 30,
    currentParticipants: 25,
    hostId: "user-2",
    scheduledAt: new Date(Date.now() - 30 * 60 * 60 * 1000),
    status: "live",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
]

const mockAchievements: Achievement[] = [
  {
    id: "achievement-1",
    name: "First Drop",
    description: "Shared your first knowledge drop with the community",
    icon: "⭐",
    category: "Community",
    xpReward: 100,
    requirements: { dropsShared: 1 },
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "achievement-2",
    name: "Code Master",
    description: "Completed 10 coding sessions successfully",
    icon: "🏆",
    category: "Skills",
    xpReward: 500,
    requirements: { sessionsCompleted: 10 },
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "achievement-3",
    name: "Helper",
    description: "Helped 25 developers with their coding challenges",
    icon: "🤝",
    category: "Community",
    xpReward: 300,
    requirements: { developersHelped: 25 },
    createdAt: new Date("2024-01-01"),
  },
]

// Database operations
export const db = {
  users: {
    findAll: async (): Promise<User[]> => {
      return [...mockUsers]
    },
    findById: async (id: string): Promise<User | null> => {
      return mockUsers.find((user) => user.id === id) || null
    },
    findByUsername: async (username: string): Promise<User | null> => {
      return mockUsers.find((user) => user.username === username) || null
    },
    create: async (userData: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> => {
      const newUser: User = {
        ...userData,
        id: `user-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      mockUsers.push(newUser)
      return newUser
    },
    update: async (id: string, updates: Partial<User>): Promise<User | null> => {
      const userIndex = mockUsers.findIndex((user) => user.id === id)
      if (userIndex === -1) return null

      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...updates,
        updatedAt: new Date(),
      }
      return mockUsers[userIndex]
    },
    delete: async (id: string): Promise<boolean> => {
      const userIndex = mockUsers.findIndex((user) => user.id === id)
      if (userIndex === -1) return false

      mockUsers.splice(userIndex, 1)
      return true
    },
  },

  rooms: {
    findAll: async (): Promise<Room[]> => {
      return [...mockRooms]
    },
    findById: async (id: string): Promise<Room | null> => {
      return mockRooms.find((room) => room.id === id) || null
    },
    findByHost: async (hostId: string): Promise<Room[]> => {
      return mockRooms.filter((room) => room.hostId === hostId)
    },
    create: async (roomData: Omit<Room, "id" | "createdAt" | "updatedAt">): Promise<Room> => {
      const newRoom: Room = {
        ...roomData,
        id: `room-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      mockRooms.push(newRoom)
      return newRoom
    },
    update: async (id: string, updates: Partial<Room>): Promise<Room | null> => {
      const roomIndex = mockRooms.findIndex((room) => room.id === id)
      if (roomIndex === -1) return null

      mockRooms[roomIndex] = {
        ...mockRooms[roomIndex],
        ...updates,
        updatedAt: new Date(),
      }
      return mockRooms[roomIndex]
    },
    delete: async (id: string): Promise<boolean> => {
      const roomIndex = mockRooms.findIndex((room) => room.id === id)
      if (roomIndex === -1) return false

      mockRooms.splice(roomIndex, 1)
      return true
    },
  },

  drops: {
    findAll: async (): Promise<Drop[]> => {
      return [...mockDrops].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    },
    findById: async (id: string): Promise<Drop | null> => {
      return mockDrops.find((drop) => drop.id === id) || null
    },
    findByAuthor: async (authorId: string): Promise<Drop[]> => {
      return mockDrops.filter((drop) => drop.authorId === authorId)
    },
    create: async (dropData: Omit<Drop, "id" | "createdAt" | "updatedAt">): Promise<Drop> => {
      const newDrop: Drop = {
        ...dropData,
        id: `drop-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      mockDrops.push(newDrop)
      return newDrop
    },
    update: async (id: string, updates: Partial<Drop>): Promise<Drop | null> => {
      const dropIndex = mockDrops.findIndex((drop) => drop.id === id)
      if (dropIndex === -1) return null

      mockDrops[dropIndex] = {
        ...mockDrops[dropIndex],
        ...updates,
        updatedAt: new Date(),
      }
      return mockDrops[dropIndex]
    },
    delete: async (id: string): Promise<boolean> => {
      const dropIndex = mockDrops.findIndex((drop) => drop.id === id)
      if (dropIndex === -1) return false

      mockDrops.splice(dropIndex, 1)
      return true
    },
  },

  sessions: {
    findAll: async (): Promise<Session[]> => {
      return [...mockSessions].sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime())
    },
    findById: async (id: string): Promise<Session | null> => {
      return mockSessions.find((session) => session.id === id) || null
    },
    findByHost: async (hostId: string): Promise<Session[]> => {
      return mockSessions.filter((session) => session.hostId === hostId)
    },
    findByStatus: async (status: Session["status"]): Promise<Session[]> => {
      return mockSessions.filter((session) => session.status === status)
    },
    create: async (sessionData: Omit<Session, "id" | "createdAt" | "updatedAt">): Promise<Session> => {
      const newSession: Session = {
        ...sessionData,
        id: `session-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      mockSessions.push(newSession)
      return newSession
    },
    update: async (id: string, updates: Partial<Session>): Promise<Session | null> => {
      const sessionIndex = mockSessions.findIndex((session) => session.id === id)
      if (sessionIndex === -1) return null

      mockSessions[sessionIndex] = {
        ...mockSessions[sessionIndex],
        ...updates,
        updatedAt: new Date(),
      }
      return mockSessions[sessionIndex]
    },
    delete: async (id: string): Promise<boolean> => {
      const sessionIndex = mockSessions.findIndex((session) => session.id === id)
      if (sessionIndex === -1) return false

      mockSessions.splice(sessionIndex, 1)
      return true
    },
  },

  achievements: {
    findAll: async (): Promise<Achievement[]> => {
      return [...mockAchievements]
    },
    findById: async (id: string): Promise<Achievement | null> => {
      return mockAchievements.find((achievement) => achievement.id === id) || null
    },
    findByCategory: async (category: string): Promise<Achievement[]> => {
      return mockAchievements.filter((achievement) => achievement.category === category)
    },
  },
}

// Utility functions
export const dbUtils = {
  generateId: (prefix: string): string => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  },
\
  paginate: <T>(items: T[], page: number, limit: number):
{
  items: T[], total
  : number, hasMore: boolean
}
=>
{
  \
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedItems = items.slice(startIndex, endIndex)

  return {
      items: paginatedItems,
      total: items.length,
      hasMore: endIndex < items.length,
    }
}
,
  \
  search: <T>(items: T[], query: string, searchFields: (keyof T)[]): T[] =>
{
  if (!query.trim()) return items

  const lowercaseQuery = query.toLowerCase()
  return items.filter(item =>
      searchFields.some(field => {
        const value = item[field]
        return typeof value === 'string' && value.toLowerCase().includes(lowercaseQuery)
      })
    )
}
,\
}
