import { createAuthClient } from "better-auth/react";
import { emailOTPClient, customSessionClient, organizationClient } from "better-auth/client/plugins";
import { inferAdditionalFields, lastLoginMethodClient } from "better-auth/client/plugins";
import type { auth as authConfig } from "@/modules/auth/config";
import { env } from "@/config/env";

export const auth = createAuthClient({
  baseURL: env.NEXT_PUBLIC_APP_HOST_URL,
  plugins: [
    emailOTPClient(),
    organizationClient(),
    lastLoginMethodClient(),
    inferAdditionalFields<typeof authConfig>(),
    customSessionClient<typeof authConfig>(),
  ],
});
