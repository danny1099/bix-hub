import { createAuthClient } from "better-auth/react";
import {
  emailOTPClient,
  inferAdditionalFields,
  customSessionClient,
  lastLoginMethodClient,
} from "better-auth/client/plugins";
import type { auth as authConfig } from "@/modules/auth/config";
import { env } from "@/config/env";

export const auth = createAuthClient({
  baseURL: env.NEXT_PUBLIC_APP_HOST_URL,
  plugins: [
    emailOTPClient(),
    lastLoginMethodClient(),
    inferAdditionalFields<typeof authConfig>(),
    customSessionClient<typeof authConfig>(),
  ],
});
