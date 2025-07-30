import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await db.users.findById(params.id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Don't return sensitive information
    const publicUser = {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      bio: user.bio,
      level: user.level,
      xp: user.xp,
      reputation: user.reputation,
      githubUsername: user.githubUsername,
      linkedinUrl: user.linkedinUrl,
      redditUsername: user.redditUsername,
      createdAt: user.createdAt,
    }

    return NextResponse.json({
      success: true,
      user: publicUser,
    })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
