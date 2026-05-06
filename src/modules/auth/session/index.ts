import { cache } from "react";
import { headers } from "next/headers";
import { auth } from "@/modules/auth/config";

export const getAuthSession = cache(
  async () =>
    await auth.api.getSession({
      headers: await headers(),
    })
);

/* type for session */
export type Session = Awaited<ReturnType<typeof getAuthSession>>;
