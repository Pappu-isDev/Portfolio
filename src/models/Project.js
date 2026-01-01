import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, "Project title is required"],
    trim: true 
  },
  description: { 
    type: String, 
    required: [true, "Description is required"] 
  },
  image: { 
    type: String, 
    required: [true, "Image URL is required"] 
  },
  liveUrl: { 
    type: String, 
    required: [true, "Live project URL is required"],
    match: [/^https?:\/\/.+/, "Please enter a valid URL (starting with http/https)"]
  },
  githubUrl: { 
    type: String,
    match: [/^https?:\/\/.+/, "Please enter a valid GitHub URL"]
  },
  tags: [{ type: String }],
  likes: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);