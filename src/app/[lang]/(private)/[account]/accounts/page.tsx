import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { P, Loader, Title } from "@/shared/components";
import { OrganizationList } from "@/modules/organization/components";
import { trpc, HydrateClient } from "@/trpc/server";

export default async function Accounts() {
  const t = await getTranslations("organization");
  await trpc.organization.getAll.prefetch();

  return (
    <section className="flex size-full flex-col gap-4 px-4 py-5 md:px-12">
      <div className="flex h-fit w-full flex-col">
        <Title className="text-2xl">{t("title")}</Title>
        <P className="text-2xs">{t("description")}</P>
      </div>
      <HydrateClient>
        <Suspense fallback={<Loader />}>
          <OrganizationList />
        </Suspense>
      </HydrateClient>
    </section>
  );
}

export const metadata: Metadata = {
  title: "Accounts",
  description: "Your accounts will be listed here. You can create new ones or join existing ones.",
};
