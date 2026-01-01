import { skillController } from "@/lib/controllers/skillController";

// GET ALL SKILLS
export async function GET() {
  return skillController.getAll();
}

// CREATE NEW SKILL
export async function POST(req) {
  return skillController.create(req);
}