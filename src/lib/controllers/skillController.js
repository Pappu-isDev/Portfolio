import connectDB from "@/lib/db";
import Skill from "@/models/Skill";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const skillController = {
  // --- Centralized Error Management ---
  handleError: (error) => {
    console.error("Skill API Error:", error);
    if (error instanceof mongoose.Error.CastError) {
      return NextResponse.json({ success: false, error: "Invalid Skill ID format" }, { status: 400 });
    }
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: "Skill already exists" }, { status: 409 });
    }
    return NextResponse.json({ success: false, error: error.message || "Server Error" }, { status: 500 });
  },

  // --- GET ALL ---
  async getAll() {
    try {
      await connectDB();
      const skills = await Skill.find({}).sort({ category: 1, name: 1 }).lean();
      return NextResponse.json({ success: true, data: skills }, { status: 200 });
    } catch (err) { return this.handleError(err); }
  },

  // --- GET ONE ---
  async getOne(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) throw new mongoose.Error.CastError();
      await connectDB();
      const skill = await Skill.findById(id).lean();
      if (!skill) return NextResponse.json({ success: false, error: "Skill not found" }, { status: 404 });
      return NextResponse.json({ success: true, data: skill }, { status: 200 });
    } catch (err) { return this.handleError(err); }
  },

  // --- CREATE ---
  async create(req) {
    try {
      await connectDB();
      const body = await req.json();
      const skill = await Skill.create(body);
      return NextResponse.json({ success: true, data: skill }, { status: 201 });
    } catch (err) { return this.handleError(err); }
  },

  // --- UPDATE ---
  async update(id, req) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) throw new mongoose.Error.CastError();
      await connectDB();
      const body = await req.json();
      const updated = await Skill.findByIdAndUpdate(id, body, { new: true, runValidators: true });
      if (!updated) return NextResponse.json({ success: false, error: "Skill not found" }, { status: 404 });
      return NextResponse.json({ success: true, data: updated }, { status: 200 });
    } catch (err) { return this.handleError(err); }
  },

  // --- DELETE ---
  async delete(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) throw new mongoose.Error.CastError();
      await connectDB();
      const deleted = await Skill.findByIdAndDelete(id);
      if (!deleted) return NextResponse.json({ success: false, error: "Skill not found" }, { status: 404 });
      return NextResponse.json({ success: true, message: "Skill removed" }, { status: 200 });
    } catch (err) { return this.handleError(err); }
  }
};