import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Title, P, Loader } from "@/shared/components";
import { UsersList } from "@/modules/users/components";
import { trpc, HydrateClient } from "@/trpc/server";

export default async function Users() {
  const t = await getTranslations("users");
  await trpc.user.getAll.prefetch();

  return (
    <section className="flex size-full flex-col gap-4 px-4 py-5 md:px-16">
      <div className="flex h-fit w-full flex-col">
        <Title className="text-2xl">{t("title")}</Title>
        <P className="text-2xs">{t("description")}</P>
      </div>
      <HydrateClient>
        <Suspense fallback={<Loader />}>
          <UsersList />
        </Suspense>
      </HydrateClient>
    </section>
  );
}

export const metadata: Metadata = {
  title: "Users",
  description: "Manage users, define roles, assign permissions and keep your organization aligned and secure.",
};
