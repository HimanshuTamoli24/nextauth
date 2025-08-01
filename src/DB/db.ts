import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);

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
