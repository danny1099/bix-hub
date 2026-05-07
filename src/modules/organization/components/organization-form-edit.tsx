"use client";
import { useForm } from "react-hook-form";
import { I18nMessage, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Organization } from "@prisma/client";
import { useModal, useToast } from "@/shared/hooks";
import { Button, Cancel, IconPicker, Input } from "@/shared/components";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { organizationWithIdSchema, type OrganizationWithIdSchema } from "@/modules/organization/schema";
import { trpc, useUtils } from "@/trpc/client";

export const OrganizationFormEdit = (organization: Organization) => {
  const toast = useToast();
  const t = useTranslations("organization");
  const { closeModal } = useModal();

  /* use trpc api services and utils to request and refresh data */
  const utils = useUtils();
  const { mutateAsync } = trpc.organization.edit.useMutation({
    onSuccess: () => utils.organization.getAll.invalidate(),
  });

  const form = useForm<OrganizationWithIdSchema>({
    resolver: zodResolver(organizationWithIdSchema),
    defaultValues: {
      id: organization.id,
      name: organization.name,
      style: organization.logo || "company:black",
    },
  });

  const onSubmit = async (values: OrganizationWithIdSchema) => {
    const { error, message } = await mutateAsync(values);

    if (error && message) {
      toast({ message, type: "error" });
      return;
    }

    /* close the modal and show a success message */
    closeModal();
    toast({ message: message as I18nMessage, type: "success" });
  };

  const { formState } = form;

  return (
    <div className="flex h-auto w-full flex-col justify-center md:w-120">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex h-auto w-full flex-col gap-3 py-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.name.label")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={t("form.name.placeholder")}
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
                  {formState.errors["name"] && <FormMessage />}
                </FormItem>
              )}
            />
          </div>
          <div className="mt-10 flex w-full flex-col gap-2 md:flex-row-reverse">
            <Button type="submit" icon="save" isLoading={formState.isSubmitting} className="w-full md:w-fit">
              {t("form.submit-button")}
            </Button>
            <Cancel onModal className="w-full md:w-32">
              {t("form.cancel-button")}
            </Cancel>
          </div>
        </form>
      </Form>
    </div>
  );
};
