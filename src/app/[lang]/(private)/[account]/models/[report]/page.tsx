import { Metadata } from "next";
import { Title, P } from "@/shared/components";

interface ModelPageProps {
  params: Promise<{ report: string }>;
}

export default async function Model({ params }: ModelPageProps) {
  const { report } = await params;
  return (
    <section className="flex size-full flex-col gap-4 px-4 py-5 md:px-12">
      <div className="flex h-fit w-full flex-col">
        <Title className="text-2xl">Model: {report}</Title>
        <P className="text-2xs">Here you can see details of your model and its configuration.</P>
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  title: "Model",
  description: "Details of your model.",
};
