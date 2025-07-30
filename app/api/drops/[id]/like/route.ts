import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { auth } from "@/lib/auth"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = auth.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const drop = await db.drops.findById(params.id)
    if (!drop) {
      return NextResponse.json({ error: "Drop not found" }, { status: 404 })
    }

    // In a real app, you'd track which users liked which drops
    // For now, just increment the like count
    const updatedDrop = await db.drops.update(params.id, {
      likes: drop.likes + 1,
    })

    // Award reputation to the drop author
    if (drop.authorId !== user.id) {
      const author = await db.users.findById(drop.authorId)
      if (author) {
        await db.users.update(drop.authorId, {
          reputation: author.reputation + 5,
        })
      }
    }

    return NextResponse.json({
      success: true,
      drop: updatedDrop,
      message: "Drop liked successfully",
    })
  } catch (error) {
    console.error("Like drop error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
