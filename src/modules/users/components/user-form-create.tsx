"use client";
import { useForm } from "react-hook-form";
import { I18nMessage, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRandomAvatar, randomPassword } from "@/shared/utils";
import { useModal, useToast } from "@/shared/hooks";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { AvatarPickerForm, Button, Cancel, Input } from "@/shared/components";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/select";
import { userSchema, type UserSchema } from "@/modules/users/schema";
import { trpc, useUtils } from "@/trpc/client";

export const UserFormCreate = () => {
  const toast = useToast();
  const t = useTranslations("users");
  const { closeModal } = useModal();

  /* use trpc api services and utils to request and refresh data */
  const utils = useUtils();
  const { mutateAsync } = trpc.user.create.useMutation({
    onSuccess: () => utils.user.getAll.invalidate(),
  });

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      avatar: getRandomAvatar(),
      role: "",
      password: "",
    },
  });

  const { formState } = form;

  const setRandomPassword = () => {
    form.setValue("password", randomPassword());
  };

  const onSubmit = async (values: UserSchema) => {
    const { error, message } = await mutateAsync(values);

    if (error && message) {
      toast({ message, type: "error" });
      return;
    }

    /* close the modal and show a success message */
    closeModal();
    toast({ message: message as I18nMessage, type: "success" });
  };

  return (
    <div className="flex w-full flex-col justify-center md:h-auto md:w-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex h-full w-full flex-col gap-4 overflow-y-auto md:w-2xl md:flex-row">
            <div className="flex h-full w-full flex-col gap-4 px-1 py-2 md:h-fit">
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.email.label")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder={t("form.email.placeholder")}
                        value={field.value as string}
                        variant="outline"
                        icon="email"
                        className="text-foreground w-full"
                      />
                    </FormControl>
                    {formState.errors["email"] && <FormMessage />}
                  </FormItem>
                )}
              />
              <div className="flex h-auto w-full flex-col gap-4 md:flex-row">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.role.label")}</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value as string}>
                        <FormControl className="w-full md:w-40">
                          <SelectTrigger>
                            <SelectValue placeholder={t("form.role.placeholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["member", "admin"].map((role, idx) => (
                            <SelectItem key={idx} value={role} className="text-2xs">
                              {/* @ts-ignore */}
                              {t(`form.roles.${role}`)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formState.errors["role"] && <FormMessage />}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.password.label")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder={t("form.password.placeholder")}
                          value={field.value as string}
                          variant="outline"
                          icon="password"
                          className="text-foreground w-full"
                          child={
                            <Button
                              type="button"
                              onClick={setRandomPassword}
                              variant="ghost"
                              icon="password"
                              className="hover:bg-accent hover:text-tertiary size-6 rounded-sm"
                            />
                          }
                        />
                      </FormControl>
                      {formState.errors["password"] && <FormMessage />}
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="bg-accent flex h-fit w-full flex-col items-center gap-4 rounded-lg px-3 py-2 md:w-fit">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AvatarPickerForm
                        url={field.value as string}
                        onImageSelect={(url: string) => form.setValue("avatar", url)}
                        withLocalDevice={true}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="mt-10 flex w-full flex-col gap-2 md:flex-row-reverse">
            <Button type="submit" icon="save" isLoading={formState.isSubmitting} className="w-full md:w-40">
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
