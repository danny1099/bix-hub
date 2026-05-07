import { param, procedure, router } from "@/trpc/init";
import { tryCatch, toSlug } from "@/shared/utils";
import { organizationSchema, organizationWithIdSchema } from "@/modules/organization/schema";
import type { OrganizationWithMembers, Organization } from "@/modules/organization/types";
import { auth } from "@/modules/auth/config";

export const organizationRouter = router({
  create: procedure.input(organizationSchema).mutation<APIResult<Organization>>(async ({ ctx, input }) => {
    const { name, style } = input;

    /* validate if organization slug already exists */
    const slug = toSlug(name);
    const organizationExisting = await ctx.db.organization.findFirst({ where: { slug } });
    if (organizationExisting) {
      return {
        data: null,
        status: "error",
        message: "organization_already_exists",
        code: 409,
      };
    }

    /* create organization and add user as member */
    const { data, error } = await tryCatch(
      auth.api.createOrganization({
        headers: ctx.headers,
        body: {
          name,
          slug,
          logo: style,
        },
      })
    );

    /* handle error if any occurs */
    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        code: 500,
        errorMessage: error?.message,
        error,
      };
    }

    /* remove members from response and return organization */
    const { members, ...orgs } = data;
    return {
      data: orgs as Organization,
      status: "success",
      message: "organization_created",
      code: 200,
    };
  }),
  edit: procedure.input(organizationWithIdSchema).mutation<APIResult<Organization>>(async ({ ctx, input }) => {
    const { id, name, style } = input;

    /* validate if organization exists searching by id */
    const organizationExisting = await ctx.db.organization.findFirst({ where: { id } });
    if (!organizationExisting) {
      return {
        data: null,
        status: "error",
        message: "organization_not_found",
        code: 409,
      };
    }

    /* validate if slug already exists except current organization */
    const slug = toSlug(name);
    if (slug !== organizationExisting.slug) {
      const slugExisting = await ctx.db.organization.findFirst({ where: { slug, id: { not: id } } });
      if (slugExisting) {
        return {
          data: null,
          status: "error",
          message: "organization_already_exists",
          code: 409,
        };
      }
    }

    /* update organization and add user as member */
    const { data, error } = await tryCatch(
      ctx.db.organization.update({
        data: {
          name: name,
          logo: style,
        },
        where: { id },
      })
    );

    /* handle error if any occurs */
    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        code: 500,
        errorMessage: error?.message,
        error,
      };
    }

    return {
      data,
      status: "success",
      message: "organization_updated",
      code: 200,
    };
  }),
  delete: procedure.input(param).mutation<APIResult<Organization>>(async ({ ctx, input }) => {
    const { param: id } = input;

    /* validate if organization exists searching by id */
    const organizationExisting = await ctx.db.organization.findFirst({ where: { id } });
    if (!organizationExisting) {
      return {
        data: null,
        status: "error",
        message: "organization_not_found",
        code: 409,
      };
    }

    /* validate if organization has members */
    const { data: members } = await tryCatch(ctx.db.member.findMany({ where: { organizationId: id } }));
    if (Array.isArray(members) && members.length > 0) {
      return {
        data: null,
        status: "error",
        message: "organization_has_members",
        code: 500,
      };
    }

    const { data, error } = await tryCatch(
      ctx.db.organization.delete({
        where: { id },
      })
    );

    /* handle error if any occurs */
    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: error?.message,
        code: 500,
      };
    }

    return {
      data: null,
      status: "success",
      message: "organization_deleted",
      code: 200,
    };
  }),
  getAll: procedure.query<APIResult<OrganizationWithMembers[]>>(async ({ ctx }) => {
    const { data, error } = await tryCatch(
      ctx.db.organization.findMany({
        where: {
          OR: [{ members: { some: { userId: ctx.userId } } }],
        },
        include: { members: true },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: error?.message,
        code: 500,
      };
    }

    /* add isActive property to each organization */
    const result = data.map((org) => ({
      ...org,
      isActive: org.id === ctx.organizationId,
      members: org.members.length,
      role: org.members.find((m) => m.userId === ctx.userId)?.role,
    }));

    return {
      data: result as OrganizationWithMembers[],
      status: "success",
      message: null,
      code: 200,
    };
  }),
  change: procedure.input(param).mutation<APIResult<Organization>>(async ({ ctx, input }) => {
    const { param: organizationId } = input;

    /* validate if organization exists searching by id */
    const organizationExisting = await ctx.db.organization.findUnique({ where: { id: organizationId } });
    if (!organizationExisting) {
      return {
        data: null,
        status: "error",
        message: "organization_not_found",
        code: 409,
      };
    }

    const { data, error } = await tryCatch(
      auth.api.setActiveOrganization({
        headers: ctx.headers,
        body: {
          organizationId,
        },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        code: 500,
        message: "unknown_error",
        errorMessage: error?.message,
        error,
      };
    }

    /* remove members, invitations for organization response */
    const { members, invitations, teams, ...org } = data;
    const member = await ctx.db.member.findFirst({
      where: { userId: ctx.userId, AND: { organizationId } },
    });

    if (!member) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: "Member not found",
        code: 500,
      };
    }

    const { data: userUpdate, error: userError } = await tryCatch(
      ctx.db.user.update({
        where: { id: ctx.userId },
        data: { role: member?.role },
      })
    );

    if (userError || !userUpdate) {
      return {
        data: null,
        status: "error",
        code: 500,
        message: "unknown_error",
        errorMessage: userError?.message,
        error: userError,
      };
    }

    return {
      data: org as Organization,
      status: "success",
      message: null,
      code: 200,
    };
  }),
});
