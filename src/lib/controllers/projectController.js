import connectDB from "@/lib/db";
import Project from "@/models/Project";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const projectController = {
  // --- Centralized Error Management ---
  handleError: (error) => {
    console.error("Project API Error:", error);
    // Security: Handle invalid MongoDB IDs to prevent server crashes
    if (error instanceof mongoose.Error.CastError) {
      return NextResponse.json({ success: false, error: "Invalid Project ID format" }, { status: 400 });
    }
    // Validation: Handle Mongoose validation errors (e.g., missing required fields)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return NextResponse.json({ success: false, error: messages }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  },

  // --- GET ALL PROJECTS ---
  async getAll() {
    try {
      await connectDB();
      // Returns plain objects for better performance
      const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
      // Ensure _id is properly converted to string for frontend use
      const formattedProjects = projects.map(project => ({
        ...project,
        _id: project._id.toString()
      }));
      return NextResponse.json({ success: true, count: formattedProjects.length, data: formattedProjects || [] }, { status: 200 });
    } catch (err) { return this.handleError(err); }
  },

  // --- GET SINGLE PROJECT ---
  async getOne(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) throw new mongoose.Error.CastError();
      await connectDB();
      const project = await Project.findById(id).lean();
      if (!project) return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
      return NextResponse.json({ success: true, data: project }, { status: 200 });
    } catch (err) { return this.handleError(err); }
  },

  // --- CREATE PROJECT ---
  async create(req) {
    try {
      await connectDB();
      const body = await req.json();
      const project = await Project.create(body);
      return NextResponse.json({ success: true, data: project }, { status: 201 });
    } catch (err) { return this.handleError(err); }
  },

  // --- UPDATE PROJECT ---
  async update(id, req) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) throw new mongoose.Error.CastError();
      await connectDB();
      const body = await req.json();
      const updated = await Project.findByIdAndUpdate(id, body, { 
        new: true,           // Returns the updated doc
        runValidators: true  // Ensures updated data follows your Schema rules
      });
      if (!updated) return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
      return NextResponse.json({ success: true, data: updated }, { status: 200 });
    } catch (err) { return this.handleError(err); }
  },

  // --- DELETE PROJECT ---
  async delete(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) throw new mongoose.Error.CastError();
      await connectDB();
      const deleted = await Project.findByIdAndDelete(id);
      if (!deleted) return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
      return NextResponse.json({ success: true, message: "Project deleted successfully" }, { status: 200 });
    } catch (err) { return this.handleError(err); }
  }
};