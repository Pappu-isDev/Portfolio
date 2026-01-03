import { experienceController } from "@/lib/controllers/experienceController";
export async function GET(req, { params }) {
  const { id } = await params;
  return experienceController.getOne(id);
}

export async function PATCH(req, { params }) {
  const { id } = await params;
  return experienceController.update(id, req);
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  return experienceController.delete(id);
}