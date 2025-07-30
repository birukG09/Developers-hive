// Authentication utilities for DevHive Platform
import { db, type User } from "./database"

export interface AuthUser {
  id: string
  username: string
  email: string
  avatar?: string
  level: number
  xp: number
  reputation: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
}

// Mock authentication state
let currentUser: AuthUser | null = null

export const auth = {
  // Get current authenticated user
  getCurrentUser: (): AuthUser | null => {
    return currentUser
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<{ user: AuthUser; token: string } | null> => {
    try {
      // In a real app, this would validate against a secure backend
      const user = await db.users.findByUsername(credentials.email.split("@")[0])

      if (!user) {
        throw new Error("User not found")
      }

      // Mock password validation (in real app, use proper hashing)
      if (credentials.password.length < 6) {
        throw new Error("Invalid password")
      }

      const authUser: AuthUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        level: user.level,
        xp: user.xp,
        reputation: user.reputation,
      }

      currentUser = authUser

      // Mock JWT token
      const token = `mock-jwt-token-${user.id}-${Date.now()}`

      return { user: authUser, token }
    } catch (error) {
      console.error("Login error:", error)
      return null
    }
  },

  // Register new user
  register: async (data: RegisterData): Promise<{ user: AuthUser; token: string } | null> => {
    try {
      // Check if user already exists
      const existingUser = await db.users.findByUsername(data.username)
      if (existingUser) {
        throw new Error("Username already exists")
      }

      // Create new user
      const newUser = await db.users.create({
        username: data.username,
        email: data.email,
        level: 1,
        xp: 0,
        reputation: 0,
        bio: `Welcome to DevHive, ${data.username}! 🚀`,
      })

      const authUser: AuthUser = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        level: newUser.level,
        xp: newUser.xp,
        reputation: newUser.reputation,
      }

      currentUser = authUser

      // Mock JWT token
      const token = `mock-jwt-token-${newUser.id}-${Date.now()}`

      return { user: authUser, token }
    } catch (error) {
      console.error("Registration error:", error)
      return null
    }
  },

  // Logout user
  logout: (): void => {
    currentUser = null
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return currentUser !== null
  },

  // Update user profile
  updateProfile: async (updates: Partial<User>): Promise<AuthUser | null> => {
    if (!currentUser) return null

    try {
      const updatedUser = await db.users.update(currentUser.id, updates)
      if (!updatedUser) return null

      const authUser: AuthUser = {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        level: updatedUser.level,
        xp: updatedUser.xp,
        reputation: updatedUser.reputation,
      }

      currentUser = authUser
      return authUser
    } catch (error) {
      console.error("Profile update error:", error)
      return null
    }
  },

  // Add XP to user
  addXP: async (amount: number): Promise<AuthUser | null> => {
    if (!currentUser) return null

    try {
      const newXP = currentUser.xp + amount
      const newLevel = Math.floor(newXP / 1000) + 1

      const updatedUser = await db.users.update(currentUser.id, {
        xp: newXP,
        level: newLevel,
      })

      if (!updatedUser) return null

      const authUser: AuthUser = {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        level: updatedUser.level,
        xp: updatedUser.xp,
        reputation: updatedUser.reputation,
      }

      currentUser = authUser
      return authUser
    } catch (error) {
      console.error("XP update error:", error)
      return null
    }
  },

  // Add reputation to user
  addReputation: async (amount: number): Promise<AuthUser | null> => {
    if (!currentUser) return null

    try {
      const newReputation = currentUser.reputation + amount

      const updatedUser = await db.users.update(currentUser.id, {
        reputation: newReputation,
      })

      if (!updatedUser) return null

      const authUser: AuthUser = {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        level: updatedUser.level,
        xp: updatedUser.xp,
        reputation: updatedUser.reputation,
      }

      currentUser = authUser
      return authUser
    } catch (error) {
      console.error("Reputation update error:", error)
      return null
    }
  },
}

// Mock session management
export const session = {
  // Store session data
  store: (key: string, value: any): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`devhive_${key}`, JSON.stringify(value))
    }
  },

  // Get session data
  get: (key: string): any => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(`devhive_${key}`)
      return item ? JSON.parse(item) : null
    }
    return null
  },

  // Remove session data
  remove: (key: string): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(`devhive_${key}`)
    }
  },

  // Clear all session data
  clear: (): void => {
    if (typeof window !== "undefined") {
      const keys = Object.keys(localStorage).filter((key) => key.startsWith("devhive_"))
      keys.forEach((key) => localStorage.removeItem(key))
    }
  },
}

// Initialize auth state from session storage
if (typeof window !== "undefined") {
  const storedUser = session.get("user")
  if (storedUser) {
    currentUser = storedUser
  }
}
