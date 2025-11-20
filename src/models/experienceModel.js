import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
            select: false
        },

        companyName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
            index: true
        },

        jobTitle: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100
        },

        employmentType: {
            type: String,
            enum: ["full-time", "part-time", "internship", "freelance", "contract"],
            default: "full-time"
        },

        department: {
            type: String,
            trim: true,
            default: ""
        },

        location: {
            type: String,
            trim: true,
            default: ""
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            default: null
        },

        isCurrent: {
            type: Boolean,
            default: false
        },

        description: {
            type: String,
            trim: true,
            maxlength: 800
        },

        achievements: [
            {
                type: String,
                trim: true,
                maxlength: 200
            }
        ],

        technologies: [
            {
                type: String,
                trim: true
            }
        ],

        isDeleted: {
            type: Boolean,
            default: false,
            select: false
        }
    },
    { timestamps: true, versionKey: false }
);

ExperienceSchema.index({ companyName: 1 });
ExperienceSchema.index({ jobTitle: 1 });
ExperienceSchema.index({ startDate: -1 });

export default mongoose.models.Experience ||
    mongoose.model("Experience", ExperienceSchema);
