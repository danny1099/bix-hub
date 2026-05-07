"use client";
import type { User } from "@prisma/client";
import { useTranslations } from "next-intl";
import { Button, Divider, IconName, Popover, PopoverContent, PopoverTrigger } from "@/shared/components";
import { useModal } from "@/shared/hooks";
import { cn } from "@/shared/utils";

export function ButtonActions(user: User) {
  const t = useTranslations("users");
  const { openModal } = useModal();

  const items = [
    {
      name: "manage",
      label: t("options.manage"),
      icon: "collection",
      onClick: () => {},
    },
    {
      name: "edit",
      label: t("options.edit"),
      icon: "edit",
      onClick: () =>
        openModal({
          title: t("modal.title"),
          description: t("modal.subtitle"),
          content: <div />,
        }),
    },

    {
      name: "delete",
      label: t("options.delete"),
      icon: "delete",
      onClick: () => {
        openModal({
          content: <div />,
        });
      },
    },
  ];

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
