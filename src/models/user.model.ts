import { Schema, Document, model, models } from "mongoose";

// 1. TypeScript interface
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isadmin?: boolean;
    forgotPasswordToken: string;
    forgotPasswordTokenExpiry: string;
    verifyToken: string;
    verifyTokenExpiry: string;

}

// 2. Schema definition
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    isadmin: {
        type: Boolean,
        default: false,
    },
});

// 3. Prevent model overwrite in dev
const User = models.User || model<IUser>("User", userSchema);

export default User;
