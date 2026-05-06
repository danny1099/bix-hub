import { getTranslations } from "next-intl/server";
import { P, Title, Logo } from "@/shared/components";

export default async function Loading() {
  const t = await getTranslations("loading");

  return (
    <section className="bg-background flex h-dvh flex-row items-center justify-center gap-2 opacity-85">
      <Logo className="shrink-0 animate-pulse" />
      <span className="flex flex-col">
        <Title type="h6" className="text-foreground text-sm font-medium">
          {t("title")}
        </Title>
        <P className="-mt-0.5">{t("description")}</P>
      </span>
    </section>
  );
}
