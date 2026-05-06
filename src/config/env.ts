import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    AUTH_SECRET: z.string(),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
    DATABASE_URL: z.string(),
    EMAIL_API_KEY: z.string(),
    EMAIL_SENDER_NAME: z.string(),
    EMAIL_APP_KEY: z.string(),
    APP_HOST_URL: z.string(),
    CLOUDINARY_API_KEY: z.string(),
    CLOUDINARY_SECRET: z.string(),
    CLOUDINARY_NAME: z.string(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },
  client: {
    NEXT_PUBLIC_APP_HOST_URL: z.string(),
    NEXT_PUBLIC_EMAIL_API_KEY: z.string(),
    NEXT_PUBLIC_AUTH_SECRET: z.string(),
  },

  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    APP_HOST_URL: process.env.APP_HOST_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    EMAIL_API_KEY: process.env.EMAIL_API_KEY,
    EMAIL_SENDER_NAME: process.env.EMAIL_SENDER_NAME,
    EMAIL_APP_KEY: process.env.EMAIL_APP_KEY,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    NEXT_PUBLIC_APP_HOST_URL: process.env.NEXT_PUBLIC_APP_HOST_URL,
    NEXT_PUBLIC_EMAIL_API_KEY: process.env.NEXT_PUBLIC_EMAIL_API_KEY,
    NEXT_PUBLIC_AUTH_SECRET: process.env.NEXT_PUBLIC_AUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  },
  emptyStringAsUndefined: true,
});
