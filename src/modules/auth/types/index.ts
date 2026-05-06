import { type User as PrismaUser } from "@prisma/client";

export type User = PrismaUser & {
  role: string | null;
  organization: string | null;
  organizationId: string | null;
};

export type Member = {
  role: string | null;
  organization: string | null;
  organizationId: string | null;
};
