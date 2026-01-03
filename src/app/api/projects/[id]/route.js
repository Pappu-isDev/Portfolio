import { projectController } from "@/lib/controllers/projectController";
export async function GET(req, { params }) {
  const { id } = await params;
  return projectController.getOne(id);
}

export async function PATCH(req, { params }) {
  const { id } = await params;
  return projectController.update(id, req);
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  return projectController.delete(id);
}