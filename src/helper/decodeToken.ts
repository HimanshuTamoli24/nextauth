import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { config } from "nextAuth/config/config";

export function decodeToken(req: NextRequest) {
    const token = req.cookies.get("authToken")?.value;
    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_SECRET);
        return decoded as { id: string ,email: string }; 
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
}