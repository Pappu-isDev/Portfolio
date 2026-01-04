import connectDB from "@/lib/db";
import Project from "@/models/Project";

export const POST = async (req, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    // Find the project and increment likes
    const project = await Project.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    // Return the full updated project with _id as string
    const formattedProject = {
      ...project.toObject(),
      _id: project._id.toString()
    };

    return Response.json(formattedProject);
  } catch (error) {
    console.error("Error updating likes:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
