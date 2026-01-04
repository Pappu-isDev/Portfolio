import { NextResponse } from "next/server";
import { contactController } from "@/lib/controllers/contactController";

export const POST = async (req) => {
  try {
    const result = await contactController.sendContact(req);
    return result;
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
};
