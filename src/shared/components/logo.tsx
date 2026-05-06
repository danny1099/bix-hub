import { Brand } from "@/shared/components/brand";
import { cn } from "@/shared/utils";

interface Props {
  className?: string;
  classNamePicture?: string;
  withText?: boolean;
}

export const Logo = ({ withText, className, classNamePicture }: Props) => {
  return (
    <div className={cn("flex h-full items-center gap-1.5", className)}>
      <picture className={cn("size-8 shrink-0", classNamePicture)}>
        <source srcSet="/images/app-logo_dark.svg" media="(prefers-color-scheme: dark)" />
        <img src="/images/app-logo.svg" alt="Logo of Ascendia AI" className="size-full" loading="eager" />
      </picture>
      {withText && <Brand />}
    </div>
  );
};
