import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getPrivateRoute } from "@/routes/utils";
import { Title, P } from "@/shared/components";
import { trpc } from "@/trpc/server";
import { ModelReportView } from "@/modules/models/components";

interface ModelPageProps {
  params: Promise<{ report: string; account: string }>;
}

export default async function Model({ params }: ModelPageProps) {
  const { report, account } = await params;
  const redirectTo = getPrivateRoute("overview", { account });
  const t = await getTranslations("models");

  /* get model data from server using slug param */
  const { data: modelData } = await trpc.model.getBySlug({ param: report });

  if (!modelData) redirect(redirectTo);

  return (
    <section className="flex size-full flex-col gap-4 px-4 py-5 md:px-12">
      <div className="flex h-fit w-full flex-col">
        <Title className="text-2xl">{modelData.name}</Title>
        <P className="text-2xs">{modelData.description || t("no_description")}</P>
      </div>
      <ModelReportView model={modelData} className="flex-1" />
    </section>
  );
}

export const metadata: Metadata = {
  title: "Model",
  description: "Manage your models, explore your data and keep every decision moving forward",
};
