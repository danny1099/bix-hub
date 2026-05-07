import { procedure, router } from "@/trpc/init";
import { tryCatch } from "@/shared/utils";
import type { User } from "@/modules/users/types";
import { userSchema } from "@/modules/users/schema";
import { hashPassword } from "@/modules/auth/helpers";
import { auth } from "@/modules/auth/config";

export const userRouter = router({
  create: procedure.input(userSchema).mutation<APIResult<User>>(async ({ ctx, input }) => {
    const { name, email, password, role, avatar } = input;

    /* validate if user already exists with email */
    const user = await ctx.db.user.findUnique({ where: { email } });
    if (user) {
      return {
        data: null,
        status: "error",
        message: "user_already_exists",
        code: 409,
      };
    }

    const { data, error } = await tryCatch(
      ctx.db.user.create({
        data: {
          name,
          email,
          emailVerified: true,
          image: avatar,
          hasOnboarded: true,
          status: "ACTIVE",
          role,
        },
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

    /* adding user to organization on members table */
    const { data: member, error: memberError } = await tryCatch(
      auth.api.addMember({
        headers: ctx.headers,
        body: {
          userId: data.id,
          organizationId: ctx.organizationId as string,
          role: role as "member" | "owner" | "admin",
        },
      })
    );

    if (memberError || !member) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: memberError?.message,
        code: 500,
      };
    }

    /*create credential account for new user */
    const hashedPassword = await hashPassword(password);
    const { data: credentialAccount, error: credentialError } = await tryCatch(
      ctx.db.account.create({
        data: {
          accountId: data.id,
          providerId: "credential",
          userId: data.id,
          password: hashedPassword,
        },
      })
    );

    if (credentialError || !credentialAccount) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: credentialError?.message,
        code: 500,
      };
    }

    return {
      data,
      status: "success",
      message: "user_created",
      code: 201,
    };
  }),
  getAll: procedure.query<APIResult<User[]>>(async ({ ctx }) => {
    const { data, error } = await tryCatch(
      ctx.db.member.findMany({
        where: { organizationId: ctx.organizationId as string },
        include: { user: true },
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

    const result = data.map((member) => ({
      ...member.user,
      role: member.role,
    }));

    return {
      data: result as User[],
      status: "success",
      message: null,
      code: 200,
    };
  }),
});
