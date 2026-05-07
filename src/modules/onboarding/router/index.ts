import type { Organization } from "@prisma/client";
import { procedure, router } from "@/trpc/init";
import { toSlug, tryCatch } from "@/shared/utils";
import { oboardingSchema } from "@/modules/onboarding/schema";
import { auth } from "@/modules/auth/config";

export const onboardingRouter = router({
  register: procedure.input(oboardingSchema).mutation<APIResult<Organization>>(async ({ ctx, input }) => {
    const { name, avatar, profession, organization, style } = input;

    if (!ctx.userId)
      return {
        data: null,
        status: "error",
        message: "unauthorized",
        code: 401,
      };

    /* search if user exists with current signed in user */
    const user = await ctx.db.user.findUnique({ where: { id: ctx.userId } });
    if (!user) {
      return {
        data: null,
        status: "error",
        message: "user_not_found",
        code: 409,
      };
    }

    /* convert organization name to slug and validate organization does not exist */
    const slug = toSlug(organization);
    const { data: organizationData, error: organizationError } = await tryCatch(
      ctx.db.organization.findUnique({
        where: { slug },
      })
    );

    if (organizationError || organizationData) {
      return {
        data: null,
        status: "error",
        message: "organization_already_exists",
        code: 409,
      };
    }

    const { data, error } = await tryCatch(
      auth.api.createOrganization({
        headers: ctx.headers,
        body: {
          name: organization,
          logo: style,
          slug,
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

    /* get members and organization data from response */
    const { members, ...result } = data;
    const { data: userUpdate, error: userError } = await tryCatch(
      ctx.db.user.update({
        where: { id: ctx.userId },
        data: {
          name,
          image: avatar,
          profession,
          hasOnboarded: true,
          role: "owner",
        },
      })
    );

    if (userError || !userUpdate) {
      console.error("Error updating user after onboarding:", userError);
      return {
        data: null,
        status: "error",
        code: 500,
        message: "onboarding_error",
        errorMessage: userError?.message,
        error: userError,
      };
    }

    return {
      data: result as Organization,
      status: "success",
      message: "onboarding_completed",
      code: 200,
    };
  }),
});
