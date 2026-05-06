import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import { buttonGroupVariants } from "@/shared/variants";
import { Button, Separator, IconName } from "@/shared/components";
import { DropdownMenu, MenuTrigger, MenuContent, MenuItem, MenuGroup } from "@/shared/components/dropdown";
import { cn } from "@/shared/utils";

export function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

export function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(
        "bg-muted flex items-center gap-2 rounded-md border px-2 text-xs font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

export function ButtonGroupSeparator({
  className,
  type = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      type={type}
      className={cn(
        "bg-input relative self-stretch data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
        className
      )}
      {...props}
    />
  );
}

interface ButtonGroupProps extends React.ComponentProps<typeof Button> {
  items?: ItemButtonDropdown[];
}

export interface ItemButtonDropdown {
  name: string;
  label: string;
  onClick: () => void;
  icon?: string;
  className?: string;
}

export const ButtonDropdown = ({ children, items, variant, className, ...props }: ButtonGroupProps) => {
  return (
    <ButtonGroup>
      <Button {...props} variant={variant} className={cn("text-2xs", className)}>
        {children}
      </Button>
      {variant !== "outline" && <ButtonGroupSeparator className="h-auto" />}
      <DropdownMenu>
        <MenuTrigger asChild>
          <Button variant={variant} icon="chevronDown" size="icon" className={cn("shrink-0", className)} />
        </MenuTrigger>
        <MenuContent align="end" className="flex">
          <MenuGroup className="flex flex-col gap-2">
            {items?.map((item) => (
              <MenuItem key={item.name} className="h-fit w-fit gap-2 p-0">
                <Button
                  key={item.name}
                  icon={item.icon as IconName}
                  place="start"
                  size="sm"
                  variant={item.name === "delete" ? "destructive" : "item"}
                  onClick={item.onClick}
                  className={cn("text-2xs w-36 justify-start gap-3 font-normal [&_svg]:size-4")}
                >
                  {item.label}
                </Button>
              </MenuItem>
            ))}
          </MenuGroup>
        </MenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
};
