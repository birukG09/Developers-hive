import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sortBy = searchParams.get("sortBy") || "xp" // xp, reputation, level
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    const users = await db.users.findAll()

    // Sort users based on the criteria
    const sortedUsers = [...users]
    switch (sortBy) {
      case "reputation":
        sortedUsers.sort((a, b) => b.reputation - a.reputation)
        break
      case "level":
        sortedUsers.sort((a, b) => b.level - a.level)
        break
      case "xp":
      default:
        sortedUsers.sort((a, b) => b.xp - a.xp)
        break
    }

    // Limit results and add ranking
    const leaderboard = sortedUsers.slice(0, limit).map((user, index) => ({
      rank: index + 1,
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      level: user.level,
      xp: user.xp,
      reputation: user.reputation,
      bio: user.bio,
    }))

    return NextResponse.json({
      success: true,
      leaderboard,
      sortBy,
      total: users.length,
    })
  } catch (error) {
    console.error("Get leaderboard error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
