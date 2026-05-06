"use client";
import { useLocale, useTranslations } from "next-intl";
import { type Locale, usePathname, useRouter } from "@/lib/i18n/core/routing";
import { DropdownMenu, MenuContent, MenuRadioGroup, MenuRadioItem, MenuTrigger } from "@/shared/components";
import { Button, Tooltip } from "@/shared/components";

export const LangToggle = () => {
  const pathname = usePathname();
  const router = useRouter();

  /* get all locales available and its translations */
  const t = useTranslations("lang");
  const currentLocale = useLocale();

  const allLocales = [
    {
      locale: "en",
      name: t(`en.locale`),
      description: t(`en.description`),
      flag: `/images/flag-en.png`,
    },
  ];

  const handleChangeLang = (newLang: string) => {
    if (currentLocale === newLang) return;
    router.push(pathname, { locale: newLang as Locale, scroll: false });
  };

  return (
    <DropdownMenu>
      <Tooltip text={t("tooltip")}>
        <MenuTrigger asChild>
          <Button variant="ghost" size="icon" icon="translate" className="hover:bg-accent" />
        </MenuTrigger>
      </Tooltip>
      <MenuContent align="end">
        <MenuRadioGroup value={currentLocale} onValueChange={handleChangeLang}>
          {allLocales.map(({ locale, name, description, flag }) => {
            return (
              <MenuRadioItem key={locale} value={locale}>
                <div className="flex flex-row items-center gap-2 text-xs">
                  <img src={flag} alt="Flag of locale selected" className="size-4.5" loading="lazy" />
                  <div className="text-accent-foreground flex flex-col justify-center">
                    <span className="text-xs font-medium uppercase">{name}</span>
                    <p className="text-3xs text-muted-foreground">{description}</p>
                  </div>
                </div>
              </MenuRadioItem>
            );
          })}
        </MenuRadioGroup>
      </MenuContent>
    </DropdownMenu>
  );
};
