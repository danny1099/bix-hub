"use client";
import { useForm } from "react-hook-form";
import { I18nMessage, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal, useToast } from "@/shared/hooks";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { Button, Cancel, Input, Textarea } from "@/shared/components";
import { modelSchema, type ModelSchema } from "@/modules/models/schema";
import { trpc, useUtils } from "@/trpc/client";

export const ModelFormCreate = () => {
  const toast = useToast();
  const t = useTranslations("models");
  const { closeModal } = useModal();

  /* use trpc api services and utils to request and refresh data */
  const utils = useUtils();
  const { mutateAsync } = trpc.model.create.useMutation({
    onSuccess: () => utils.model.getAll.invalidate(),
  });

  const form = useForm<ModelSchema>({
    resolver: zodResolver(modelSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
    },
  });

  const { formState } = form;

  const onSubmit = async (values: ModelSchema) => {
    const { data, error, message } = await mutateAsync(values);

    if (error && message) {
      toast({ message, type: "error" });
      return;
    }

    /* close the modal and show a success message */
    closeModal();
    toast({ message: message as I18nMessage, type: "success" });
  };

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
                      className="text-foreground w-full"
                    />
                  </FormControl>
                  {formState.errors["name"] && <FormMessage />}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.url.label")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="url"
                      placeholder={t("form.url.placeholder")}
                      value={field.value as string}
                      variant="outline"
                      icon="link"
                      className="text-foreground w-full"
                    />
                  </FormControl>
                  {formState.errors["url"] && <FormMessage />}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.description.label")}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t("form.description.placeholder")}
                      value={field.value as string}
                      variant="accent"
                      className="text-foreground border-input h-28 w-full resize-none border"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="mt-10 flex w-full flex-col gap-2 md:flex-row-reverse">
            <Button type="submit" icon="save" isLoading={formState.isSubmitting} className="w-full md:w-auto">
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
