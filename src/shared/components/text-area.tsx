import * as React from "react";
import { VariantProps } from "class-variance-authority";
import { inputVariants } from "@/shared/variants";
import { cn } from "@/shared/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof inputVariants> {
  className?: string;
  isBordered?: boolean;
}

/* prettier-ignore */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isBordered = false, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(inputVariants({ variant }), "flex overflow-hidden rounded-md px-3 py-2 text-xs placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-xs", isBordered && "border border-input", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
