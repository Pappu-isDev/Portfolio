import { uploadController } from "@/lib/controllers/uploadController";

export async function POST(req) {
  return await uploadController.uploadImage(req);
}
