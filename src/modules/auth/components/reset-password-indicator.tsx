"use client";
import { useTranslations } from "next-intl";
import { useResetPasswordStore } from "@/modules/auth/store";
import { Badge, Icon, Title, IconName, P } from "@/shared/components";

export const StepsIndicator = () => {
  const t = useTranslations("forgot_password");

  const steps = {
    step_1: {
      title: t("steps.enter-email.title"),
      subtitle: t("steps.enter-email.subtitle"),
      icon: "emailSend" as IconName,
    },
    step_2: {
      title: t("steps.enter-code.title"),
      subtitle: t("steps.enter-code.subtitle"),
      icon: "inbox" as IconName,
    },
    step_3: {
      title: t("steps.reset-password.title"),
      subtitle: t("steps.reset-password.subtitle"),
      icon: "password" as IconName,
    },
  };

  const store = useResetPasswordStore();
  const baseStep = `step_${store.currentStep}` as keyof typeof steps;
  const currentStep = steps[baseStep];

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative mt-5 flex h-fit w-fit flex-col items-center justify-center gap-2 px-4">
        <div className="bg-tertiary/10 text-tertiary flex size-20 items-center justify-center rounded-full p-5">
          <Icon name={currentStep.icon} className="text-tertiary size-10" />
        </div>
        <Badge className="absolute right-1 -bottom-2">{`${t("step")} ${store.currentStep}`}</Badge>
      </div>
      <div className="flex flex-col items-center">
        <Title type="h6" className="text-accent-foreground/80 text-xs">
          {currentStep.title}
        </Title>
        <P className="text-2xs">{currentStep.subtitle}</P>
      </div>
    </div>
  );
};
