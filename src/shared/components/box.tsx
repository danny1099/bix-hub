import { type VariantProps } from "class-variance-authority";
import { boxVariants } from "@/shared/variants";
import { cn } from "@/shared/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof boxVariants> {}

export const Box = ({ variant, sizes, type, className, children, ...props }: Props) => {
  return (
    <div className={cn(boxVariants({ variant, sizes, type }), className)} {...props}>
      {children}
    </div>
  );
};
