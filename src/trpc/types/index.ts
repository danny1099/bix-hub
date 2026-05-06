import { I18nMessage } from "next-intl";

declare global {
  interface APIResult<T> {
    data: T | null;
    message: I18nMessage | null;
    status: "success" | "error";
    code: number;
    error?: Error | null;
    errorMessage?: string | null;
  }
}

export {};
