import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Title, P } from "@/shared/components";
import { FormRegister } from "@/modules/auth/components";

export default async function GetStarted() {
  const t = await getTranslations("get_started");

  return (
    <section className="flex size-full flex-col items-center pt-20">
      <div className="flex h-fit flex-col px-4 md:w-1/3">
        <Title>{t("title")}</Title>
        <P className="text-2xs text-pretty">{t("description")}</P>
      </div>
      <FormRegister />
    </section>
  );
}

export const metadata: Metadata = {
  title: "Get Started",
  description: "Create your BIX account and start turning your data into clear, actionable insights.",
};
