const mongoose = require('mongoose');
require("dotenv").config();

let isConnected = false;

export async function connectDB() {
    if (isConnected) {
        return;
    }

    const uri = process.env.MONGO_URL;

    if (!uri) {
        throw new Error("❌ MONGO_URL is not defined in .env.local");
    }

    try {
        const { connection } = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            autoIndex: true,
            dbName: undefined
        });

        isConnected = connection.readyState === 1;

        console.log("🔥 MongoDB Connected:", connection.host);
    } catch (error) {
        console.error("❌ MongoDB Error:", error.message);
        throw new Error("MongoDB connection failed. Please try again later.");
    }
}