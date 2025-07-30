import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { auth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tag = searchParams.get("tag")
    const search = searchParams.get("search")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let drops = await db.drops.findAll()

    // Filter by tag
    if (tag && tag !== "all") {
      drops = drops.filter((drop) => drop.tags.includes(tag))
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase()
      drops = drops.filter(
        (drop) =>
          drop.content.toLowerCase().includes(searchLower) ||
          drop.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedDrops = drops.slice(startIndex, endIndex)

    // Get author information for each drop
    const dropsWithAuthors = await Promise.all(
      paginatedDrops.map(async (drop) => {
        const author = await db.users.findById(drop.authorId)
        return {
          ...drop,
          author: author
            ? {
                id: author.id,
                username: author.username,
                avatar: author.avatar,
                level: author.level,
              }
            : null,
        }
      }),
    )

    return NextResponse.json({
      success: true,
      drops: dropsWithAuthors,
      total: drops.length,
      page,
      limit,
      hasMore: endIndex < drops.length,
    })
  } catch (error) {
    console.error("Get drops error:", error)
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
    const { content, tags } = body

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    const drop = await db.drops.create({
      content: content.trim(),
      tags: tags || [],
      authorId: user.id,
      likes: 0,
      comments: 0,
    })

    // Award XP for sharing knowledge
    await auth.addXP(50)

    return NextResponse.json({
      success: true,
      drop,
      message: "Drop created successfully",
    })
  } catch (error) {
    console.error("Create drop error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
