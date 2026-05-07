import { cn } from "@/shared/utils";

interface Props extends Children {
  title?: string;
  className?: string;
}

export const MenuGroup = ({ children, title, className }: Props) => {
  return (
    <div className={cn("flex h-fit w-full flex-col", className)}>
      {title && <p className="text-2xs text-muted-foreground mb-1 ml-3">{title}</p>}
      {children}
    </div>
  );
};
