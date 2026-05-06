import { titleFont } from "@/config/fonts";
import { cn } from "@/shared/utils";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/* prettier-ignore */
export const Title = ({ children, type = "h1", ...props }: Props) => {
  const Tag: keyof React.JSX.IntrinsicElements = type;

  return (
    <Tag {...props} className={cn("text-3xl text-foreground scroll-m-20 tracking-tight text-balance font-semibold first:mt-0", props.className, titleFont.className)}>
      {children}
    </Tag>
  );
};

/* prettier-ignore */
export const Heading = ({ children, type = "h2", ...props }: Props) => {
  const Tag: keyof React.JSX.IntrinsicElements = type;

  return (
    <Tag {...props} className={cn("text-xl text-foreground scroll-m-20 tracking-tight text-balance font-medium first:mt-0", props.className, titleFont.className)}>
      {children}
    </Tag>
  );
};
