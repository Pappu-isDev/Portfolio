import connectDB from "@/lib/db";
import Experience from "@/models/Experience";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const experienceController = {
  // --- Centralized Error Management ---
  handleError: (error) => {
    console.error("Experience API Error:", error);
    if (error instanceof mongoose.Error.CastError) {
      return NextResponse.json({ success: false, error: "Invalid Experience ID format" }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message || "Server Error" }, { status: 500 });
  },

  // --- GET ALL (Sorted by Newest First) ---
  async getAll() {
    try {
      await connectDB();
      const data = await Experience.find({}).sort({ startDate: -1 }).lean();
      return NextResponse.json({ success: true, data: data || [] }, { status: 200 });
    } catch (err) { return this.handleError(err); }
  },

  // --- GET ONE ---
  async getOne(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) throw new mongoose.Error.CastError();
      await connectDB();
      const item = await Experience.findById(id).lean();
      if (!item) return NextResponse.json({ success: false, error: "Experience not found" }, { status: 404 });
      return NextResponse.json({ success: true, data: item }, { status: 200 });
    } catch (err) { return this.handleError(err); }
  },

  // --- CREATE ---
  async create(req) {
    try {
      await connectDB();
      const body = await req.json();
      // Logic: If current job, remove any provided end date
      if (body.isCurrent) body.endDate = null;
      const experience = await Experience.create(body);
      return NextResponse.json({ success: true, data: experience }, { status: 201 });
    } catch (err) { return this.handleError(err); }
  },

  // --- UPDATE ---
  async update(id, req) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) throw new mongoose.Error.CastError();
      await connectDB();
      const body = await req.json();
      const updated = await Experience.findByIdAndUpdate(id, body, { new: true, runValidators: true });
      if (!updated) return NextResponse.json({ success: false, error: "Experience not found" }, { status: 404 });
      return NextResponse.json({ success: true, data: updated }, { status: 200 });
    } catch (err) { return this.handleError(err); }
  },

  // --- DELETE ---
  async delete(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) throw new mongoose.Error.CastError();
      await connectDB();
      const deleted = await Experience.findByIdAndDelete(id);
      if (!deleted) return NextResponse.json({ success: false, error: "Experience not found" }, { status: 404 });
      return NextResponse.json({ success: true, message: "Experience record deleted" }, { status: 200 });
    } catch (err) { return this.handleError(err); }
  }
};