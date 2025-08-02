import { NextRequest, NextResponse } from "next/server";
import User from "nextAuth/models/user.model";

export async function Post(req: NextRequest) {
    try {
        const { token } = await req.json();
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: new Date() } });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        user.isadmin = true;
        user.verifyToken = "";
        user.verifyTokenExpiry = "";
        await user.save();
        console.log("User verified successfully:", user._id);
        
        return NextResponse.json({ message: "User verified successfully" }, { status: 200 });


    } catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}