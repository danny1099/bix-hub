"use client";
import { Toaster as Sonner } from "sonner";
import { useSystemTheme } from "@/shared/hooks";

type ToasterProps = React.ComponentProps<typeof Sonner>;

/* prettier-ignore */
export const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useSystemTheme();

 return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
};
