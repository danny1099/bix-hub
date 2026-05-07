"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { I18nMessage, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/shared/hooks";
import { getPrivateRoute } from "@/routes/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { Button, IconPicker, Input } from "@/shared/components";
import { organizationSchema, type OrganizationSchema } from "@/modules/onboarding/schema";
import { useOnboardingStore } from "@/modules/onboarding/store";
import { trpc } from "@/trpc/client";

export const FormOrganization = () => {
  const toast = useToast();
  const router = useRouter();
  const t = useTranslations("onboarding");

  const store = useOnboardingStore((state) => state);

  /* use api services to set onboarding steps */
  const { mutateAsync } = trpc.onboarding.register.useMutation();

  const form = useForm<OrganizationSchema>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      organization: store.organization || "",
      style: "company:black",
    },
  });

  const { formState } = form;

  const onSubmit = async (values: OrganizationSchema) => {
    store.setOrganization(values.organization);
    const { data, status, message } = await mutateAsync({
      name: store.name,
      avatar: store.avatar,
      profession: store.profession,
      organization: values.organization,
      style: values.style,
    });

    if (status === "error" && message) {
      toast({ message: message as I18nMessage, type: "error" });
      return;
    }

    /* reset store state and navigate to sign in */
    store.reset();
    toast({ message: message as I18nMessage, type: "success" });

    /* navigate to private route overview */
    const redirectTo = getPrivateRoute("overview", { account: data?.slug as string });
    router.push(redirectTo, { scroll: false });
  };

  return (
    <div className="mt-5 flex h-auto w-full flex-col justify-center px-4 md:w-120">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex h-auto w-full flex-col gap-3 py-2">
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.organization.label")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={t("form.organization.placeholder")}
                      value={field.value as string}
                      variant="outline"
                      icon="company"
                      className="text-foreground w-full"
                      child={
                        <FormField
                          control={form.control}
                          name="style"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <IconPicker value={field.value as string} onChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      }
                    />
                  </FormControl>
                  {formState.errors["organization"] && <FormMessage />}
                </FormItem>
              )}
            />
            <span className="bg-secondary text-muted-foreground text-3xs h-fit w-full rounded-sm p-2">
              {t("form.org-disclaimer")}
            </span>
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <Button type="submit" icon="arrowRight" isLoading={formState.isSubmitting} className="w-full">
              {t("form.submit-button")}
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
