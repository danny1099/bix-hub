import { titleFont } from "@/config/fonts";
import { cn } from "../utils";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {}

export const Brand = ({ className, ...props }: Props) => {
  return (
    <span {...props} className={cn("text-foreground text-lg font-semibold", titleFont.className, className)}>
      bix
    </span>
  );
};
