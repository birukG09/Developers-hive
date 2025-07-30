import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { auth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const language = searchParams.get("language")
    const search = searchParams.get("search")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let rooms = await db.rooms.findAll()

    // Filter by language
    if (language && language !== "all") {
      rooms = rooms.filter((room) => room.language === language)
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase()
      rooms = rooms.filter(
        (room) => room.name.toLowerCase().includes(searchLower) || room.description.toLowerCase().includes(searchLower),
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedRooms = rooms.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      rooms: paginatedRooms,
      total: rooms.length,
      page,
      limit,
      hasMore: endIndex < rooms.length,
    })
  } catch (error) {
    console.error("Get rooms error:", error)
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
    const { name, description, language, isPrivate, maxParticipants } = body

    if (!name || !description || !language) {
      return NextResponse.json({ error: "Name, description, and language are required" }, { status: 400 })
    }

    const room = await db.rooms.create({
      name,
      description,
      language,
      isPrivate: isPrivate || false,
      maxParticipants: maxParticipants || 10,
      currentParticipants: 1,
      hostId: user.id,
    })

    return NextResponse.json({
      success: true,
      room,
      message: "Room created successfully",
    })
  } catch (error) {
    console.error("Create room error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
