import { skillController } from "../../../lib/controllers/skillController";

export const GET = () => skillController.getAll();
export const POST = (req) => skillController.create(req);