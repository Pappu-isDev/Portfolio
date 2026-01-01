import { skillController } from "@/lib/controllers/skillController";

export async function GET(req, { params }) {
  const { id } = await params;
  return skillController.getOne(id);
}

export async function PATCH(req, { params }) {
  const { id } = await params;
  return skillController.update(id, req);
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  return skillController.delete(id);
}