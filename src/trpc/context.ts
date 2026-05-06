import { prisma } from "@/lib/db";
import { getAuthSession } from "@/modules/auth/session";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await getAuthSession();
  const { user } = session || {};

  return {
    ...opts,
    db: prisma,
    userId: user!.id,
    organization: user!.organization,
    organizationId: user!.organizationId,
  };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
