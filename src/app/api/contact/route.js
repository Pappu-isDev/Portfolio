import { contactController } from "@/lib/controllers/contactController";

export const POST = (req) => contactController.sendContact(req);
