import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { auth } from "@/lib/auth"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = auth.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const session = await db.sessions.findById(params.id)
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    if (session.currentParticipants >= session.maxParticipants) {
      return NextResponse.json({ error: "Session is full" }, { status: 400 })
    }

    if (session.status === "completed") {
      return NextResponse.json({ error: "Session has already ended" }, { status: 400 })
    }

    // Update participant count
    const updatedSession = await db.sessions.update(params.id, {
      currentParticipants: session.currentParticipants + 1,
    })

    // Award XP for joining a session
    await auth.addXP(25)

    return NextResponse.json({
      success: true,
      session: updatedSession,
      message: "Successfully joined session",
    })
  } catch (error) {
    console.error("Join session error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
