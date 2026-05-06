"use client";
import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { type VariantProps } from "class-variance-authority";
import { sheetVariants, sheetContainerVariants } from "@/shared/variants";
import { Icon } from "@/shared/components/icon";
import { cn } from "@/shared/utils";

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;
export const SheetPortal = SheetPrimitive.Portal;

interface SheetOverlayProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>, VariantProps<typeof sheetContainerVariants> {}

/* prettier-ignore */
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  SheetOverlayProps
>(({ className, container = "black" , ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(sheetContainerVariants({ container }), className)}
    {...props}
    ref={ref}
  />
))

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>, VariantProps<typeof sheetVariants> {
  container?: "black" | "white" | "gray";
  withCancelButton?: boolean;
}

export const SheetContent = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
  ({ side = "right", className, children, withCancelButton = false, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay title="" container={props.container} />
      <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
        <SheetPrimitive.Close className="ring-offset-background data-[state=open]:bg-secondary absolute top-7 right-3 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
          <Icon name="close" className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
);

export const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);

export const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);

export const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title ref={ref} className={cn("text-foreground text-lg font-semibold", className)} {...props} />
));

export const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description ref={ref} className={cn("text-muted-foreground text-xs", className)} {...props} />
));
