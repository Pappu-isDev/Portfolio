import { userController } from "@/lib/controllers/userController";
export const POST = (req) => userController.resetPassword(req);
