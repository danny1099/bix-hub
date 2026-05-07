"use client";
import { useTranslations } from "next-intl";
import { useOnboardingStore } from "@/modules/onboarding/store";
import { FormInfo, FormOrganization, FormProfession } from "@/modules/onboarding/components";
import { AnimatedContent, Badge } from "@/shared/components";

export const OnboardingSteps = () => {
  const t = useTranslations("onboarding");
  const store = useOnboardingStore();

  return (
    <section className="bg-background mt-5 flex size-full flex-col items-center">
      <Badge variant="light" className="-mt-3">
        {t("steps", { step: store.currentStep, total: 3 })}
      </Badge>
      <AnimatedContent className="flex h-fit w-full items-center justify-center">
        {store.currentStep === 1 && <FormInfo />}
        {store.currentStep === 2 && <FormProfession />}
        {store.currentStep === 3 && <FormOrganization />}
      </AnimatedContent>
    </section>
  );
};
