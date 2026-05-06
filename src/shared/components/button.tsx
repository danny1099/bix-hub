import * as React from "react";
import { Slot } from "radix-ui";
import { type VariantProps } from "class-variance-authority";
import { Icon, IconName } from "@/shared/components/icon";
import { buttonVariants } from "@/shared/variants";
import { cn } from "@/shared/utils";

export interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  place?: "start" | "end";
  icon?: IconName;
}

/* prettier-ignore */
export const Button = ({ children, className, variant, size, asChild = false, icon, place = "end", isLoading , ...props }: ButtonProps) => {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp data-slot="button" {...props} className={cn(buttonVariants({ variant, size, className }))}>
      {place === "start" && icon && (<Icon name={isLoading ? "refresh" : icon } className={cn("size-4", isLoading && "animate-spin")}/>)}
      {children}
      {place === "end" && icon && (<Icon name={isLoading ? "refresh" : icon } className={cn("size-4", isLoading && "animate-spin")}/>)}
    </Comp>
  );
};
