"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "./auth"
import { db } from "./database"

// Authentication actions
export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const result = await auth.login({ email, password })

    if (!result) {
      return { error: "Invalid credentials" }
    }

    revalidatePath("/dashboard")
    redirect("/dashboard")
  } catch (error) {
    return { error: "Login failed. Please try again." }
  }
}

export async function registerAction(formData: FormData) {
  const username = formData.get("username") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!username || !email || !password) {
    return { error: "All fields are required" }
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long" }
  }

  try {
    const result = await auth.register({ username, email, password })

    if (!result) {
      return { error: "Registration failed. Username may already exist." }
    }

    revalidatePath("/dashboard")
    redirect("/dashboard")
  } catch (error) {
    return { error: "Registration failed. Please try again." }
  }
}

export async function logoutAction() {
  auth.logout()
  revalidatePath("/")
  redirect("/")
}

// Room actions
export async function createRoomAction(formData: FormData) {
  const user = auth.getCurrentUser()
  if (!user) {
    return { error: "Authentication required" }
  }

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const language = formData.get("language") as string
  const isPrivate = formData.get("isPrivate") === "true"
  const maxParticipants = Number.parseInt(formData.get("maxParticipants") as string) || 10

  if (!name || !description || !language) {
    return { error: "Name, description, and language are required" }
  }

  try {
    const room = await db.rooms.create({
      name,
      description,
      language,
      isPrivate,
      maxParticipants,
      currentParticipants: 1,
      hostId: user.id,
    })

    revalidatePath("/rooms")
    return { success: true, room }
  } catch (error) {
    return { error: "Failed to create room" }
  }
}

// Drop actions
export async function createDropAction(formData: FormData) {
  const user = auth.getCurrentUser()
  if (!user) {
    return { error: "Authentication required" }
  }

  const content = formData.get("content") as string
  const tagsString = formData.get("tags") as string
  const tags = tagsString ? tagsString.split(",").map((tag) => tag.trim()) : []

  if (!content || content.trim().length === 0) {
    return { error: "Content is required" }
  }

  try {
    const drop = await db.drops.create({
      content: content.trim(),
      tags,
      authorId: user.id,
      likes: 0,
      comments: 0,
    })

    // Award XP for sharing knowledge
    await auth.addXP(50)

    revalidatePath("/drops")
    return { success: true, drop }
  } catch (error) {
    return { error: "Failed to create drop" }
  }
}

// Session actions
export async function createSessionAction(formData: FormData) {
  const user = auth.getCurrentUser()
  if (!user) {
    return { error: "Authentication required" }
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const type = formData.get("type") as "challenge" | "workshop" | "interview"
  const difficulty = formData.get("difficulty") as "beginner" | "intermediate" | "advanced"
  const duration = Number.parseInt(formData.get("duration") as string) || 3600
  const maxParticipants = Number.parseInt(formData.get("maxParticipants") as string) || 20
  const scheduledAt = formData.get("scheduledAt") as string

  if (!title || !description || !type || !difficulty || !scheduledAt) {
    return { error: "All fields are required" }
  }

  try {
    const session = await db.sessions.create({
      title,
      description,
      type,
      difficulty,
      duration,
      maxParticipants,
      currentParticipants: 0,
      hostId: user.id,
      scheduledAt: new Date(scheduledAt),
      status: "upcoming",
    })

    revalidatePath("/sessions")
    return { success: true, session }
  } catch (error) {
    return { error: "Failed to create session" }
  }
}

// Profile actions
export async function updateProfileAction(formData: FormData) {
  const user = auth.getCurrentUser()
  if (!user) {
    return { error: "Authentication required" }
  }

  const bio = formData.get("bio") as string
  const githubUsername = formData.get("githubUsername") as string
  const linkedinUrl = formData.get("linkedinUrl") as string
  const redditUsername = formData.get("redditUsername") as string

  try {
    const updatedUser = await auth.updateProfile({
      bio,
      githubUsername,
      linkedinUrl,
      redditUsername,
    })

    if (!updatedUser) {
      return { error: "Failed to update profile" }
    }

    revalidatePath("/profile")
    return { success: true, user: updatedUser }
  } catch (error) {
    return { error: "Failed to update profile" }
  }
}
