"use client";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils";
import { Button } from "@/shared/components";
import { useModal } from "@/shared/hooks";
import { UserFormCreate } from "@/modules/users/components";

interface Props {
  className?: string;
}

export const AddMemberButton = ({ className }: Props) => {
  const { openModal } = useModal();
  const t = useTranslations("users");

  return (
    <Button
      icon="add"
      variant="flat"
      onClick={() => {
        openModal({
          title: t("modal.title"),
          description: t("modal.subtitle"),
          content: <UserFormCreate />,
        });
      }}
      className={cn("text-xs", className)}
    >
      {t("add-button")}
    </Button>
  );
};
