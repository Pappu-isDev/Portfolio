import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  company: { 
    type: String, 
    required: [true, "Company name is required"],
    trim: true 
  },
  role: { 
    type: String, 
    required: [true, "Job role/title is required"],
    trim: true 
  },
  location: { 
    type: String,
    default: "Remote" 
  },
  startDate: { 
    type: Date, 
    required: [true, "Start date is required"] 
  },
  endDate: { 
    type: Date, 
    default: null // null indicates "Present" or "Currently Working"
  },
  isCurrent: {
    type: Boolean,
    default: false
  },
  description: { 
    type: String, 
    required: [true, "Description of responsibilities is required"] 
  },
  technologies: [{ 
    type: String 
  }], // Array of tech used (e.g., ["React", "Node.js"])
}, { timestamps: true });

export default mongoose.models.Experience || mongoose.model("Experience", ExperienceSchema);