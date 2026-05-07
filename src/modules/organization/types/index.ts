import type { Organization as PrismaOrganization } from "@prisma/client";

export interface OrganizationWithMembers extends PrismaOrganization {
  isActive: boolean;
  members?: number;
  role?: string;
}

export interface Organization extends PrismaOrganization {}
