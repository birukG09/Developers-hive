import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function PUT(request: NextRequest) {
  try {
    const user = auth.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const body = await request.json()
    const { bio, githubUsername, linkedinUrl, redditUsername } = body

    const updatedUser = await auth.updateProfile({
      bio,
      githubUsername,
      linkedinUrl,
      redditUsername,
    })

    if (!updatedUser) {
      return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully",
    })
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
