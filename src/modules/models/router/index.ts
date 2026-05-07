import { param, procedure, router } from "@/trpc/init";
import { tryCatch, toSlug } from "@/shared/utils";
import { modelSchema, modelWithIdSchema } from "@/modules/models/schema";
import type { Model } from "@/modules/models/types";

export const modelRouter = router({
  create: procedure.input(modelSchema).mutation<APIResult<Model>>(async ({ ctx, input }) => {
    const { name, description, url } = input;

    /* validate if model bi slug already exists */
    const slug = toSlug(name);
    const modelExisting = await ctx.db.model.findFirst({ where: { slug } });
    if (modelExisting) {
      return {
        data: null,
        status: "error",
        message: "model_already_exists",
        code: 409,
      };
    }

    /* create model bi using url reference */
    const { data, error } = await tryCatch(
      ctx.db.model.create({
        data: {
          name,
          slug,
          description,
          url,
          organizationId: ctx.organizationId!,
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

    return {
      data: data as Model,
      status: "success",
      message: "model_created",
      code: 200,
    };
  }),
  edit: procedure.input(modelWithIdSchema).mutation<APIResult<Model>>(async ({ ctx, input }) => {
    const { id, name, description, url } = input;

    /* validate if model exists searching by id */
    const modelExisting = await ctx.db.model.findFirst({ where: { id } });
    if (!modelExisting) {
      return {
        data: null,
        status: "error",
        message: "model_not_found",
        code: 409,
      };
    }

    /* validate if slug already exists except current model */
    const slug = toSlug(name);
    if (slug !== modelExisting.slug) {
      const slugExisting = await ctx.db.model.findFirst({ where: { slug, id: { not: id } } });
      if (slugExisting) {
        return {
          data: null,
          status: "error",
          message: "model_already_exists",
          code: 409,
        };
      }
    }

    /* update organization and add user as member */
    const { data, error } = await tryCatch(
      ctx.db.model.update({
        data: {
          name: name,
          slug,
          description,
          url,
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
      message: "model_updated",
      code: 200,
    };
  }),
  delete: procedure.input(param).mutation<APIResult<Model>>(async ({ ctx, input }) => {
    const { param: id } = input;

    /* validate if model exists searching by id */
    const modelExisting = await ctx.db.model.findFirst({ where: { id } });
    if (!modelExisting) {
      return {
        data: null,
        status: "error",
        message: "model_not_found",
        code: 409,
      };
    }

    const { data, error } = await tryCatch(
      ctx.db.model.delete({
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
      message: "model_deleted",
      code: 200,
    };
  }),
  getAll: procedure.query<APIResult<Model[]>>(async ({ ctx }) => {
    const { data, error } = await tryCatch(
      ctx.db.model.findMany({
        where: {
          organizationId: ctx.organizationId!,
        },
        include: { organization: { select: { slug: true } } },
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

    const dataWithOrganizationSlug = data.map((model) => ({
      ...model,
      organization: model.organization.slug,
    }));

    return {
      data: dataWithOrganizationSlug,
      status: "success",
      message: null,
      code: 200,
    };
  }),
});
