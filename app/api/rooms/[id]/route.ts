import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { auth } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const room = await db.rooms.findById(params.id)

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      room,
    })
  } catch (error) {
    console.error("Get room error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = auth.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const room = await db.rooms.findById(params.id)
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 })
    }

    if (room.hostId !== user.id) {
      return NextResponse.json({ error: "Only the room host can update the room" }, { status: 403 })
    }

    const body = await request.json()
    const updatedRoom = await db.rooms.update(params.id, body)

    return NextResponse.json({
      success: true,
      room: updatedRoom,
      message: "Room updated successfully",
    })
  } catch (error) {
    console.error("Update room error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = auth.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const room = await db.rooms.findById(params.id)
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 })
    }

    if (room.hostId !== user.id) {
      return NextResponse.json({ error: "Only the room host can delete the room" }, { status: 403 })
    }

    await db.rooms.delete(params.id)

    return NextResponse.json({
      success: true,
      message: "Room deleted successfully",
    })
  } catch (error) {
    console.error("Delete room error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
