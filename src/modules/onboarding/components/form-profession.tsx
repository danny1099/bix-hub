"use client";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components";
import { useOnboardingStore } from "@/modules/onboarding/store";
import { professionSchema, type ProfessionSchema } from "@/modules/onboarding/schema";
import { SelectProfession } from "@/modules/onboarding/components";

export const FormProfession = () => {
  const t = useTranslations("onboarding");
  const store = useOnboardingStore((state) => state);

  const form = useForm<ProfessionSchema>({
    resolver: zodResolver(professionSchema),
    defaultValues: {
      profession: store.profession || "",
    },
  });

  const onSubmit = async (data: ProfessionSchema) => {
    store.setProfession(data.profession);
    store.nextStep();
  };

  const { formState } = form;

  return (
    <div className="mt-5 flex h-auto w-full flex-col justify-center px-4 md:w-120">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex h-auto w-full flex-col gap-3 py-2">
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.profession.label")}</FormLabel>
                  <SelectProfession onValueChange={field.onChange} value={field.value as string} />
                  {formState.errors["profession"] && <FormMessage />}
                </FormItem>
              )}
            />
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <Button type="submit" className="w-full" icon="arrowRight">
              {t("form.continue")}
            </Button>
            <Button type="reset" variant="outline" onClick={store.prevStep} className="w-full">
              {t("form.previous")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
