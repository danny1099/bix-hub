import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Title, P, Loader } from "@/shared/components";
import { ModelList } from "@/modules/models/components";
import { trpc, HydrateClient } from "@/trpc/server";

export default async function Models() {
  const t = await getTranslations("models");
  await trpc.model.getAll.prefetch();

  return (
    <section className="flex size-full flex-col gap-4 px-4 py-5 md:px-16">
      <div className="flex h-fit w-full flex-col">
        <Title className="text-2xl">{t("title")}</Title>
        <P className="text-2xs">{t("description")}</P>
      </div>
      <HydrateClient>
        <Suspense fallback={<Loader />}>
          <ModelList />
        </Suspense>
      </HydrateClient>
    </section>
  );
}

export const metadata: Metadata = {
  title: "Models",
  description: "Manage models, define their properties, and organize your machine learning assets.",
};
