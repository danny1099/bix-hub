"use client";
import type { Organization } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { getPrivateRoute } from "@/routes/utils";
import { useModal, useToast } from "@/shared/hooks";
import { Button, Divider, IconName, Popover, PopoverContent, PopoverTrigger } from "@/shared/components";
import { OrganizationFormDelete, OrganizationFormEdit } from "@/modules/organization/components";
import { trpc, useUtils } from "@/trpc/client";
import { cn } from "@/shared/utils";

export function ButtonActions(organization: Organization) {
  const router = useRouter();
  const toast = useToast();
  const t = useTranslations("organization");
  const { openModal } = useModal();

  /* use trpc api services and utils to request and refresh data */
  const utils = useUtils();
  const api = trpc.organization.change.useMutation({
    onSuccess: () => utils.organization.getAll.invalidate(),
  });

  const items = [
    {
      name: "change",
      label: t("options.as_default"),
      icon: "building",
      onClick: () => changeOrganization(),
    },
    {
      name: "edit",
      label: t("options.edit"),
      icon: "edit",
      onClick: () =>
        openModal({
          title: t("modal.title"),
          description: t("modal.subtitle"),
          content: <OrganizationFormEdit {...organization} />,
        }),
    },
    {
      name: "delete",
      label: t("options.delete"),
      icon: "delete",
      onClick: () => {
        openModal({
          content: <OrganizationFormDelete {...organization} />,
        });
      },
    },
  ];

  const changeOrganization = async () => {
    const { error, message } = await api.mutateAsync({
      param: organization.id,
    });

    if (error && message) {
      toast({ message, type: "error" });
      return;
    }

    const redirectTo = getPrivateRoute("overview", {
      account: organization.slug,
    });
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
