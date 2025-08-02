import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Clear the authToken cookie
        const res = NextResponse.json({
            message: "Logout successful"
        }, { status: 200 });

        res.cookies.set("authToken", "", {
            expires: new Date(0),
            path: "/",
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        }
        )

        return res;
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json((error as Error).message, { status: 500 });
    }
}