"use client";
import Link from "next/link";
import { Logo, LangToggle, ThemeToggle } from "@/shared/components";
import { cn } from "@/shared/utils";

interface Props {
  className?: string;
  withRedirect?: boolean;
}

export const Navbar = ({ className, withRedirect = true }: Props) => {
  return (
    <header className={cn("bg-background flex h-20 w-full flex-row items-center px-4 py-2 md:px-24", className)}>
      <Link href={withRedirect ? "/" : ""}>
        <Logo withText />
      </Link>
      <nav className="flex size-full flex-row items-center justify-end gap-4">
        <LangToggle />
        <ThemeToggle />
      </nav>
    </header>
  );
};
