import en from "@/lib/i18n/locales/en.json";
import type { routing } from "@/lib/i18n/core";

export type LangEn = typeof en;

declare module "next-intl" {
  interface AppConfig {
    Messages: LangEn;
    Locale: (typeof routing.locales)[number];
  }

  type I18nMessage = keyof LangEn["messages"];
  type I18nValidation = LangEn["validation"];
}
