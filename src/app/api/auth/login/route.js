import { userController } from "@/lib/controllers/userController";

export const POST = async (req) => {
  return userController.login(req);
};
