"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/modules/auth/hooks";
import { getRandomAvatar } from "@/shared/utils/helpers";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { Button, Input, Avatar, AvatarPicker } from "@/shared/components";
import { useOnboardingStore } from "@/modules/onboarding/store";
import { infoUserSchema, type InfoUserSchema } from "@/modules/onboarding/schema";

/* prettier-ignore */
export const FormInfo = () => {
  const t = useTranslations("onboarding");
  const { user, isPending } = useAuth();
  const store = useOnboardingStore((state) => state);
  const currentAvatar = store.avatar || (user?.image as string);

  const form = useForm<InfoUserSchema>({
    resolver: zodResolver(infoUserSchema),
    defaultValues: { name: "",  avatar: ""},
  });

  const { formState } = form;

  useEffect(() => {
    if (user) {
      const userName = user.name || "";
      const userAvatar = user.image || "";
      store.setName(userName, userAvatar);

      if (!form.getValues("name")) form.setValue("name", userName);
      if (!form.getValues("avatar")) form.setValue("avatar", userAvatar);
    }
  }, [user, isPending]);

  useEffect(() => {
    if (store.name) form.setValue("name", store.name);
    if (store.avatar) form.setValue("avatar", store.avatar);
  }, []);

  const handleAvatarSelect = (url: string) => {
    form.setValue("avatar", url);
    store.setName(form.getValues("name"), url);
  };

  const onSubmit = async (data: InfoUserSchema) => {
    store.setName(data.name, data.avatar || "");
    store.nextStep();
  };

  return (
    <div className="mt-5 flex h-auto w-full flex-col justify-center px-4 md:w-120">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex h-auto w-full flex-col gap-3 py-2">
            <div className="relative flex items-center justify-center">
              <Avatar size="xl" ring url={currentAvatar || getRandomAvatar()} />
              <AvatarPicker url={currentAvatar} onImageSelect={handleAvatarSelect}>
                <Button
                  variant="tertiary"
                  size="icon"
                  icon="camera"
                  className="absolute -right-1 -bottom-9 z-20 size-5 rounded-full [&>svg]:size-3"
                />
              </AvatarPicker>
            </div>
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
            <Button type="submit" className="w-full" icon="arrowRight">
              {t("form.continue")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
