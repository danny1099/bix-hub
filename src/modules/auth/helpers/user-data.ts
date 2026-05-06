import { cache } from "react";
import { prisma } from "@/lib/db";

export const getActiveOrganization = cache(async (sessionId: string) => {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session?.activeOrganizationId) {
    const membership = await prisma.member.findFirst({
      where: { userId: session?.userId },
      include: { organization: { select: { slug: true, id: true } } },
      orderBy: { createdAt: "desc" },
    });

    if (!membership) {
      return {
        role: null,
        organization: null,
        organizationId: null,
      };
    }

    /* get last organization asociated to user */
    const { role, organization } = membership;
    return {
      role,
      organization: organization.slug,
      organizationId: organization.id,
    };
  }

  /* get active organization from session and current member role */
  const member = await prisma.member.findFirst({
    where: { userId: session?.userId, AND: { organizationId: session?.activeOrganizationId } },
    include: { organization: { select: { slug: true } } },
  });

  if (!member) {
    return {
      role: null,
      organization: null,
      organizationId: null,
    };
  }

  /* get last organization asociated to user */
  const { role, organization } = member;
  return {
    role,
    organization: organization.slug,
    organizationId: session?.activeOrganizationId,
  };
});
