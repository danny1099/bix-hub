import { z } from "zod";

const name = z.string().min(1, { message: "required" });
const description = z.string().optional();
const url = z.url({ message: "invalid_url" });

export const modelSchema = z.object({
  name: name,
  description: description,
  url: url,
});

export const modelWithIdSchema = modelSchema.extend({ id: z.string() });

export type ModelSchema = z.infer<typeof modelSchema>;
export type ModelWithIdSchema = z.infer<typeof modelWithIdSchema>;
