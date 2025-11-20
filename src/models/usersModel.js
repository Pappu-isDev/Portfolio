import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters"],
            maxlength: [50, "Name cannot exceed 50 characters"]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\S+@\S+\.\S+$/,
                "Please enter a valid email"
            ],
            index: true
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false
        },

        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
            index: true
        },

        avatar: {
            type: String,  // Image URL
            default: null
        },

        isActive: {
            type: Boolean,
            default: true
        },

        isDeleted: {
            type: Boolean,
            default: false,
            select: false
        },

        // Track login attempts
        loginAttempts: {
            type: Number,
            default: 0,
            select: false
        },

        lockUntil: {
            type: Number,
            default: null,
            select: false
        }
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            virtuals: true,
            transform: (_, ret) => {
                delete ret._id;
                delete ret.password;
                delete ret.loginAttempts;
                delete ret.lockUntil;
                return ret;
            }
        }
    }
);
