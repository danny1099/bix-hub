"use client";
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Icon, IconName } from "@/shared/components/icon";
import { cn } from "@/shared/utils";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const MenuTrigger = DropdownMenuPrimitive.Trigger;
export const MenuGroup = DropdownMenuPrimitive.Group;
export const MenuPortal = DropdownMenuPrimitive.Portal;
export const MenuSub = DropdownMenuPrimitive.Sub;
export const MenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

/* prettier-ignore */
export const MenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn('flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none focus:bg-secondary data-[state=open]:bg-secondary [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0', inset && 'pl-8', className)}
    {...props}
  >
    {children}
    <Icon name="chevronRight" className="ml-auto size-4 text-muted-foreground" />
  </DropdownMenuPrimitive.SubTrigger>
))

/* prettier-ignore */
export const MenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn('z-50 min-w-32 text-2xs overflow-hidden rounded-sm border border-border/70 bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', className)}
    {...props}
  />
))

/* prettier-ignore */
export const MenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn('z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md shadow-accent dark:shadow-2xs','data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))

/* prettier-ignore */
export const MenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn('relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-xs outline-none transition-colors focus:bg-secondary focus:text-secondary-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0',inset && 'pl-8', className)}
    {...props}
  />
))

/* interface to change change icon */
interface IconProps {
  indicator?: IconName;
  iconClassName?: string;
}

/* prettier-ignore */
export const MenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> & IconProps
>(({ className, children, checked, indicator = "check", iconClassName, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn('relative flex cursor-default select-none items-center rounded-sm p-1.5 text-xs outline-none transition-colors focus:bg-secondary focus:text-secondary-foreground data-disabled:pointer-events-none data-disabled:opacity-50', className)}
    checked={checked}
    {...props}
  >
    {children}
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Icon name={indicator} className={cn('h-4 w-4 text-tertiary', iconClassName)} />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
  </DropdownMenuPrimitive.CheckboxItem>
))

/* prettier-ignore */
export const MenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> & IconProps
>(({ className, children, indicator = "check", iconClassName, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn('relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-8 pl-2 text-xs outline-none transition-colors focus:bg-accent focus:text-accent-foreground dark:focus:bg-accent data-disabled:pointer-events-none data-disabled:opacity-50',className)}
    {...props}
  >
    {children}
    <span className="absolute right-2 flex size-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Icon name={indicator} className={cn('h-4 w-4 text-tertiary', iconClassName)} />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
  </DropdownMenuPrimitive.RadioItem>
))

export const MenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-xs font-medium", inset && "pl-8", className)}
    {...props}
  />
));

export const MenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator ref={ref} className={cn("bg-accent -mx-1 my-1 h-px", className)} {...props} />
));

export const MenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />;
};
