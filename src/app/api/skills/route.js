import { skillController } from "@/lib/controllers/skillController";

export async function GET(req) {
	return await skillController.getAll();
}

export async function POST(req) {
	return await skillController.create(req);
}