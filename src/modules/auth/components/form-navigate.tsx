"use client";
import { Navlink } from "@/shared/components";

interface FormNavigateProps {
  redirectTo: string;
  text: string;
  link: string;
}

export const FormNavigate = ({ redirectTo, text, link }: FormNavigateProps) => {
  return (
    <div className="-mt-1 flex h-fit w-full items-center justify-center gap-2 text-center">
      <span className="text-muted-foreground text-2xs inline-flex items-center gap-1 py-1">
        {text}
        <Navlink
          href={redirectTo}
          variant="ghost"
          className="text-tertiary text-2xs font-semibol h-fit w-auto p-0 dark:text-white"
        >
          {link}
        </Navlink>
      </span>
    </div>
  );
};
