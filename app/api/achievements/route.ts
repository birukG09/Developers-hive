import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    let achievements = await db.achievements.findAll()

    // Filter by category
    if (category && category !== "all") {
      achievements = achievements.filter((achievement) => achievement.category.toLowerCase() === category.toLowerCase())
    }

    return NextResponse.json({
      success: true,
      achievements,
    })
  } catch (error) {
    console.error("Get achievements error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
