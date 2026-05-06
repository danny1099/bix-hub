import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Title, P } from "@/shared/components";
import { FormSignIn } from "@/modules/auth/components";

export default async function SignIn() {
  const t = await getTranslations("sign_in");

  return (
    <section className="flex size-full flex-col items-center pt-20">
      <div className="flex h-fit flex-col px-4 md:w-1/3">
        <Title>{t("title")}</Title>
        <P className="text-2xs text-pretty">{t("description")}</P>
      </div>
      <FormSignIn />
    </section>
  );
}

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to BIX and keep driving smarter decisions with your data.",
};
