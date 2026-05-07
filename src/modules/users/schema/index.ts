import { z } from "zod";

const name = z.string().min(3, { message: "invalid_name" });
const avatar = z.string().optional();
const email = z.string().email({ message: "invalid_email" });
const role = z.string().min(1, { message: "required" });
const password = z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
  message: "invalid_password",
});

export const userSchema = z.object({
  name: name,
  avatar: avatar,
  email: email,
  role: role,
  password: password,
});

export const userSchemaWithId = userSchema.extend({
  id: z.string().nonempty({ message: "required" }),
});

export const userSetPasswordSchema = z.object({
  password: password,
  confirm_password: z.string().nonempty({ message: "required" }),
  userId: z.string().nonempty({ message: "required" }),
});

export type UserSchema = z.infer<typeof userSchema>;
export type UserSchemaWithId = z.infer<typeof userSchemaWithId>;
export type UserSetPasswordSchema = z.infer<typeof userSetPasswordSchema>;
