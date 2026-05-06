import { toast as Toast } from "sonner";
import { I18nMessage, useTranslations } from "next-intl";
import { IconName, Icon } from "@/shared/components";
import { cn } from "../utils";

type ToastType = "success" | "error" | "warning" | "info" | "loading";

const toastType = {
  success: { icon: "check" as IconName, className: "bg-green-100 text-green-900" },
  error: { icon: "close" as IconName, className: "bg-red-100 text-red-900" },
  warning: { icon: "warning" as IconName, className: "bg-amber-100 text-amber-900" },
  info: { icon: "info" as IconName, className: "bg-blue-100 text-blue-900" },
  loading: { icon: "refresh" as IconName, className: "bg-violet-100 text-violet-900 animate-spin" },
};

interface ToastProps {
  message: I18nMessage;
  type: ToastType;
  details?: string;
}

export const useToast = () => {
  const t = useTranslations("messages");

  /* all messages toast has a title and description in i18n file */
  const toast = ({ message, type }: ToastProps) => {
    const title = t(`${message}.title`);
    const content = t(`${message}.content`);

    return Toast(title, {
      description: content,
      dismissible: true,
      classNames: {
        title: "font-medium ml-2 text-xs",
        description: "text-foreground-muted text-2xs ml-2 -mt-1",
      },
      icon: (
        <div className={cn("flex size-7 items-center justify-center rounded-full", toastType[type].className)}>
          <Icon name={toastType[type as ToastType].icon} className="size-4" />
        </div>
      ),
    });
  };

  return toast;
};
