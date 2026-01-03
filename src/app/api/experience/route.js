import { experienceController } from "@/lib/controllers/experienceController";

export async function GET(req) {
	return await experienceController.getAll();
}

export async function POST(req) {
	return await experienceController.create(req);
}