import mongoose from "mongoose";
import { config } from "nextAuth/config/config";
export const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect(config.MONGODB_URI);

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected");
        });

        connection.on("error", (err) => {
            console.error("MongoDB connection error:", err);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
