import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP, lastLoginMethod, customSession } from "better-auth/plugins";
import { getActiveOrganization } from "@/modules/auth/helpers";
import { prisma } from "@/lib/db";
import { env } from "@/config/env";

export const auth = betterAuth({
  baseURL: env.APP_HOST_URL,
  secret: env.AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  rateLimit: {
    enabled: true,
    window: 10,
    max: 100,
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
  },
  plugins: [
    emailOTP({
      expiresIn: 5 * 60,
      sendVerificationOTP: async ({ email, otp, type }) => {
        // if (type === "forget-password") await sendEmailResetPassword({ email, token: otp });
      },
    }),
    customSession(async ({ user, session }) => {
      const data = await getActiveOrganization(session.id);
      return {
        user: { ...user, ...data },
        session,
      };
    }),
    lastLoginMethod(),
    nextCookies(),
  ],
});

export type Session = typeof auth.$Infer.Session;
