const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        projectType: {
            type: String,
            enum: ["personal", "client", "company"],
            default: "personal",
            index: true,
        },

        technologies: [
            {
                type: String,
                trim: true,
            },
        ],

        githubUrl: {
            type: String,
            trim: true,
            validate: {
                validator: function (v) {
                    return /^https?:\/\/.+/.test(v);
                },
                message: "Invalid GitHub URL",
            },
        },

        liveUrl: {
            type: String,
            trim: true,
            validate: {
                validator: function (v) {
                    if (!v) return true;
                    return /^https?:\/\/.+/.test(v);
                },
                message: "Invalid live URL",
            },
        },

        duration: {
            startDate: { type: Date },
            endDate: { type: Date },
        },

        status: {
            type: String,
            enum: ["completed", "ongoing", "paused"],
            default: "completed",
        },

        images: [
            {
                url: { type: String },
                publicId: { type: String }, // for cloudinary/s3
            },
        ],

        features: [
            {
                type: String,
                trim: true,
            },
        ],

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            select: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
