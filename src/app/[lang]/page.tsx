import { getTranslations } from "next-intl/server";
import { Navbar, Navlink, P, Title } from "@/shared/components";
import { getPublicRoute, getPrivateRoute } from "@/routes/utils";
import { getAuthSession } from "@/modules/auth/session";

export default async function Home() {
  const t = await getTranslations("marketing");
  const session = await getAuthSession();

  return (
    <div className="flex h-dvh flex-col">
      <Navbar />
      <main className="flex size-full flex-col items-center justify-center text-center">
        <Title className="font-bold">{t("title")}</Title>
        <P>{t("description")}</P>
        <div className="mt-10 flex w-full flex-row justify-center gap-3">
          {!session ? (
            <>
              <Navlink href={getPublicRoute("get_started")} icon="arrowRight">
                Get Started
              </Navlink>
              <Navlink href={getPublicRoute("sign_in")} variant="accent">
                Sign In
              </Navlink>
            </>
          ) : (
            <Navlink href={getPrivateRoute("onboarding")}>Onboarding</Navlink>
          )}
        </div>

        <pre>{JSON.stringify(session?.user, null, 2)}</pre>
      </main>
    </div>
  );
}
