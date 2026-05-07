import { z } from "zod";

const name = z.string().min(1, { message: "required" });
const style = z.string();

export const organizationSchema = z.object({
  name: name,
  style: style,
});

export const organizationWithIdSchema = organizationSchema.extend({ id: z.string() });

export type OrganizationSchema = z.infer<typeof organizationSchema>;
export type OrganizationWithIdSchema = z.infer<typeof organizationWithIdSchema>;
