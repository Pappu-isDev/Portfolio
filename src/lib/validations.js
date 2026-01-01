import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z.string().min(10, "Description is too short"),
  image: z.string().url("Invalid image URL"),
  liveUrl: z.string().url("Invalid Live URL"),
  githubUrl: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  tags: z.array(z.string()).nonempty("At least one tag is required"),
});