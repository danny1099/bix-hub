"use client";
import type { Route } from "next";
import Link, { LinkProps } from "next/link";
import { VariantProps } from "class-variance-authority";
import { Icon, IconName } from "@/shared/components/icon";
import { buttonVariants } from "@/shared/variants";
import { cn } from "@/shared/utils";

interface Props extends LinkProps<Route>, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  icon?: IconName;
  place?: "start" | "end";
  className?: string;
  isLoading?: boolean;
}

/* prettier-ignore */
export const Navlink = ({ children, variant, size, icon, place = "end", isLoading, className, href, ...props }: Props) => {
  return (
    <Link {...props} href={href as Route}  className={cn(buttonVariants({ variant, size, className }))}>
      {icon && place === "start" && <Icon name={isLoading ? "refresh" : icon} className="size-4" />}
      {children}
      {icon && place === "end" && <Icon name={isLoading ? "refresh" : icon} className="size-4" />}
    </Link>
  )
}
