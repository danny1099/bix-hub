import { procedure, router } from "@/trpc/init";
import { onboardingRouter } from "@/modules/onboarding/router";
import { organizationRouter } from "@/modules/organization/router";

export const appRouter = router({
  health: procedure.query(() => "The server is up and running and healthy!"),
  onboarding: onboardingRouter,
  organization: organizationRouter,
});

export type AppRouter = typeof appRouter;
