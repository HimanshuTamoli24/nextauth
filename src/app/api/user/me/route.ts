import { decodeToken } from "nextAuth/helper/decodeToken"
import User from "nextAuth/models/user.model"
import { NextRequest, NextResponse } from "next/server"
export async function GET(req: NextRequest) {
    const decoded = decodeToken(req)

    if (!decoded) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const user = await User.findById(decoded.id).select("-password ")
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }
        return NextResponse.json(user)
    } catch (error) {
        console.error("Error fetching user:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}