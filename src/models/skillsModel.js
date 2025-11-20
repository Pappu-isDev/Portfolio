import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
            unique: true,
            index: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
