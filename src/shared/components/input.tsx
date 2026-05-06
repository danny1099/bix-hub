"use client";
import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { Icon, IconName } from "@/shared/components/icon";
import { inputVariants } from "@/shared/variants";
import { cn } from "@/shared/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  place?: "start" | "end";
  icon?: IconName;
  isBordered?: boolean;
  child?: React.ReactNode;
}

/* prettier-ignore */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, sizes, type, place = "end", icon, isBordered = false, child, ...props }, ref) => {
    return (
      <div className={cn(inputVariants({ variant, sizes }), place === "end" ? "flex-row" : "flex-row-reverse", isBordered && "border border-input", className )}>
        <input
          {...props}
          ref={ref}
          type={type}
          autoComplete="off"
          className={cn("bg-transparent flex h-full w-full px-1.5 text-xs outline-none placeholder:text-muted-foreground placeholder:text-xs autofill:bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-70")}
        />
        {icon && (
          <div className="flex size-7 items-center justify-center">
            {!child 
                ? (<Icon name={icon!} className="h-4 w-4 text-muted-foreground" />)
                : (child)
            }
          </div>
        )}
      </div>
    );
  }
);
