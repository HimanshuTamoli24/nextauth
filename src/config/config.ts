// config.ts
const MONGODB_URI = process.env.MONGO_URI;
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || "3000";
const mailtrapUser = process.env.MAILTRAP_USER!
const mailtrapPass = process.env.MAILTRAP_PASS!

if (!MONGODB_URI) {
    throw new Error("❌ MONGO_URI is not defined in environment variables");
}

if (!TOKEN_SECRET) {
    throw new Error("❌ TOKEN_SECRET is not defined in environment variables");
}

export const config = {
    MONGODB_URI,
    TOKEN_SECRET,
    NODE_ENV,
    PORT,
    mailtrapUser,
    mailtrapPass
};
