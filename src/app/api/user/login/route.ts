import { dbConnect } from "nextAuth/DB/db";
import { NextRequest, NextResponse } from "next/server";
import User from "nextAuth/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { config } from "nextAuth/config/config";
dbConnect()
type login = {
    email: string,
    password: string
}

export async function POST(req: NextRequest) {

    try {
        const reqBody: login = await req.json()
        const { email, password } = reqBody

        if (!email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 })
        }

        const userCheck = await User.findOne({ email })
        if (!userCheck) {
            return NextResponse.json({ error: "no account exist with this mail " }, { status: 400 })
        }

        const isPasswordMatch = await bcrypt.compare(password, userCheck.password);
        if (!isPasswordMatch) {
            return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
        }

        const tokenData = {
            id: userCheck._id,
            email: userCheck.email
        }

        const token = jwt.sign(
            tokenData, config.TOKEN_SECRET, { expiresIn: "1d" }
        )

        const res = NextResponse.json(
            { message: "Login successful" },
            { status: 200 }
        );

        res.cookies.set("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24
        });

        return res;




    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Internal server error." }, { status: 500 });
    }
}