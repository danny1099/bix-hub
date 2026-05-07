import { z } from "zod";

const name = z.string().min(3, { message: "invalid_name" });
const avatar = z.string().optional();
const profession = z.string().min(1, { message: "required" });
const organization = z.string().min(1, { message: "required" });
const style = z.string();

export const infoUserSchema = z.object({
  name: name,
  avatar: avatar,
});

export const professionSchema = z.object({
  profession: profession,
});

export const organizationSchema = z.object({
  organization: organization,
  style: style,
});

export const oboardingSchema = z.object({
  name,
  avatar,
  profession,
  organization,
  style,
});

export type InfoUserSchema = z.infer<typeof infoUserSchema>;
export type ProfessionSchema = z.infer<typeof professionSchema>;
export type OrganizationSchema = z.infer<typeof organizationSchema>;
export type OboardingSchema = z.infer<typeof oboardingSchema>;
