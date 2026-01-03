import { projectController } from "@/lib/controllers/projectController";
// GET ALL PROJECTS
// Used to display the list of projects on your portfolio
export async function GET() {
  return projectController.getAll();
}

// CREATE NEW PROJECT
// Used in your Admin Dashboard to add a new project to MongoDB
export async function POST(req) {
  return projectController.create(req);
}