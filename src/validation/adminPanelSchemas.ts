import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  file: z.any(),
});

export type TcreatePostForm = z.infer<typeof createPostSchema>;
