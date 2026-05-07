"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { getPrivateRoute } from "@/routes/utils";
import { cn } from "@/shared/utils";
import { useModal, useToast } from "@/shared/hooks";
import { Button, Divider, IconName, Popover, PopoverContent, PopoverTrigger } from "@/shared/components";
import { ModelFormDelete, ModelFormEdit } from "@/modules/models/components";
import type { Model } from "@/modules/models/types";

export function ButtonActions(model: Model) {
  const router = useRouter();
  const t = useTranslations("models");
  const { openModal } = useModal();

  const items = [
    {
      name: "get_into",
      label: t("options.manage"),
      icon: "building",
      onClick: () => getIntoModel(),
    },
    {
      name: "edit",
      label: t("options.edit"),
      icon: "edit",
      onClick: () =>
        openModal({
          title: t("modal.title"),
          description: t("modal.subtitle"),
          content: <ModelFormEdit {...model} />,
        }),
    },
    {
      name: "delete",
      label: t("options.delete"),
      icon: "delete",
      onClick: () => {
        openModal({
          content: <ModelFormDelete {...model} />,
        });
      },
    },
  ];

  const getIntoModel = async () => {
    const redirectTo = getPrivateRoute("report", { account: model.organization as string, report: model.slug });
    router.push(redirectTo, { scroll: false });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          icon="options"
          variant="ghost"
          size="icon"
          className="text-tertiary md:invisible group-hover:md:visible"
        />
      </PopoverTrigger>
      <PopoverContent className="flex w-44 flex-col gap-1">
        {items.map(({ name, icon, label, onClick }) => {
          return (
            <div key={name} className="flex flex-col">
              {name === "delete" && <Divider type="horizontal" className="my-1.5 w-full" />}
              <Button
                icon={icon as IconName}
                place="start"
                size="sm"
                variant={name === "delete" ? "destructive" : "item"}
                onClick={onClick}
                className={cn("text-2xs w-auto justify-start gap-2 font-normal [&_svg]:size-3.5")}
              >
                {label}
              </Button>
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
