import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { auth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") as "upcoming" | "live" | "completed" | null
    const type = searchParams.get("type")
    const difficulty = searchParams.get("difficulty")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let sessions = await db.sessions.findAll()

    // Filter by status
    if (status) {
      sessions = sessions.filter((session) => session.status === status)
    }

    // Filter by type
    if (type && type !== "all") {
      sessions = sessions.filter((session) => session.type === type)
    }

    // Filter by difficulty
    if (difficulty && difficulty !== "all") {
      sessions = sessions.filter((session) => session.difficulty === difficulty)
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedSessions = sessions.slice(startIndex, endIndex)

    // Get host information for each session
    const sessionsWithHosts = await Promise.all(
      paginatedSessions.map(async (session) => {
        const host = await db.users.findById(session.hostId)
        return {
          ...session,
          host: host
            ? {
                id: host.id,
                username: host.username,
                avatar: host.avatar,
                level: host.level,
              }
            : null,
        }
      }),
    )

    return NextResponse.json({
      success: true,
      sessions: sessionsWithHosts,
      total: sessions.length,
      page,
      limit,
      hasMore: endIndex < sessions.length,
    })
  } catch (error) {
    console.error("Get sessions error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = auth.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, type, difficulty, duration, maxParticipants, scheduledAt } = body

    if (!title || !description || !type || !difficulty || !scheduledAt) {
      return NextResponse.json(
        { error: "Title, description, type, difficulty, and scheduled time are required" },
        { status: 400 },
      )
    }

    const session = await db.sessions.create({
      title,
      description,
      type,
      difficulty,
      duration: duration || 3600, // Default 1 hour
      maxParticipants: maxParticipants || 20,
      currentParticipants: 0,
      hostId: user.id,
      scheduledAt: new Date(scheduledAt),
      status: "upcoming",
    })

    return NextResponse.json({
      success: true,
      session,
      message: "Session created successfully",
    })
  } catch (error) {
    console.error("Create session error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
