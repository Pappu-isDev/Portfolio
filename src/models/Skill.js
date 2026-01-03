import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Skill name is required"],
    trim: true
  },
  category: {
    type: String,
    required: [true, "Skill category is required"],
    enum: ["Frontend", "Backend", "Database", "Tools", "Other"],
    default: "Other"
  },
  proficiency: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
    default: "Beginner"
  },
  icon: {
    type: String,
    default: ""
  }
}, { timestamps: true });

export default mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
