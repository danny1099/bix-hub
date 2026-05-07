"use client";
import { useTranslations } from "next-intl";
import { useModal } from "@/shared/hooks";
import { Button } from "@/shared/components";
import { ModelFormCreate } from "@/modules/models/components";
import { cn } from "@/shared/utils";

interface Props {
  className?: string;
}

export const AddModelButton = ({ className }: Props) => {
  const { openModal } = useModal();
  const t = useTranslations("models");

  return (
    <Button
      icon="add"
      variant="flat"
      onClick={() => {
        openModal({
          title: t("modal.title"),
          description: t("modal.subtitle"),
          content: <ModelFormCreate />,
        });
      }}
      className={cn("text-xs", className)}
    >
      {t("add-button")}
    </Button>
  );
};
