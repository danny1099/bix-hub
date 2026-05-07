"use client";
import Link from "next/link";
import { Fragment } from "react";
import { cn } from "@/shared/utils";
import { BreadcrumbProvider, BreadcrumbList, BreadcrumbItem, BreadcrumbLink } from "@/shared/components/breadcrumb";
import { BreadcrumbPage, BreadcrumbSeparator, Icon } from "@/shared/components";
import { useBreadcrumbs } from "@/modules/private/hooks";

interface BreadcrumbProps {
  className?: string;
}

/* prettier-ignore */
export const Breadcrumb = ({ className }: BreadcrumbProps) => {
  const crumbs = useBreadcrumbs();

  return (
    <BreadcrumbProvider className={cn("text-muted-foreground text-2xs w-full", className)}>
      <BreadcrumbList>
        <BreadcrumbItem className="mx-1">
          <BreadcrumbPage>
            <Icon name="home" className="text-muted-foreground size-3.5 shrink-0" />
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="ml-0.5" />
        {crumbs.map((crumb) => (
          <Fragment key={crumb.href}>
            <BreadcrumbItem>
              {crumb.isCurrent || !crumb.href ? (
                <BreadcrumbPage className={cn("text-muted-foreground", crumb.isCurrent && "text-foreground font-semibold")}>
                  {crumb.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={crumb.href}>{crumb.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!crumb.isCurrent && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbProvider>
  );
};
