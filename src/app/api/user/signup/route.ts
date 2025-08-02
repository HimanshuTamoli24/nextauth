import { dbConnect } from "nextAuth/DB/db";
import { NextRequest, NextResponse } from "next/server";
import User from "nextAuth/models/user.model";
import bcrypt from "bcryptjs";
import { sendMail } from "nextAuth/helper/mailer";
dbConnect()

type SignupRequestBody = {
    username: string;
    email: string;
    password: string;
};

export async function POST(request: NextRequest) {
    try {
        const body: SignupRequestBody = await request.json();
        const { username, email, password } = body

        if (!username || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 })
        }

        const existUser = await User.findOne({ email })
        if (existUser) return NextResponse.json({ error: "User already exists" }, { status: 409 });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        sendMail("VERIFY", email, newUser._id.toString())

        return NextResponse.json({ message: "User created successfully", userId: newUser._id }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error", details: (error as Error).message },
            { status: 500 }
        )
    }


}