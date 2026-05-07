"use client";
import { useTranslations } from "next-intl";
import { useModal } from "@/shared/hooks";
import { Button } from "@/shared/components";
import { OrganizationFormCreate } from "@/modules/organization/components";
import { cn } from "@/shared/utils";

interface Props {
  className?: string;
}

export const AddOrganizationButton = ({ className }: Props) => {
  const { openModal } = useModal();
  const t = useTranslations("organization");

  return (
    <Button
      icon="add"
      variant="flat"
      onClick={() => {
        openModal({
          title: t("modal.title"),
          description: t("modal.subtitle"),
          content: <OrganizationFormCreate />,
        });
      }}
      className={cn("text-xs", className)}
    >
      {t("add-button")}
    </Button>
  );
};
