import type { Metadata } from "next";
import { ViewTransition } from "react";
import { ThemeProvider, I18nProvider, ModalProvider, TrpcProvider } from "@/lib/providers";
import { globalFont } from "@/config/fonts";
import { Toaster, TooltipProvider } from "@/shared/components";
import "@/globals.css";

interface RootLayoutProps extends Children {
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({ children, params }: Readonly<RootLayoutProps>) {
  const { lang } = await params;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${globalFont.className} antialiased`}>
        <I18nProvider>
          <ThemeProvider>
            <TooltipProvider>
              <TrpcProvider>
                <ModalProvider>
                  <ViewTransition>{children}</ViewTransition>
                </ModalProvider>
              </TrpcProvider>
              <Toaster position="top-right" />
            </TooltipProvider>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: "BIX Hub | Reporting Platform",
    template: "%s | BIX Hub",
  },
  description:
    "BIX Hub is a reporting platform that provides comprehensive insights and analytics for businesses. It offers a user-friendly interface to visualize data, track performance, and make informed decisions.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/app_logo.png",
        href: "/images/app_logo.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/app_logo.png",
        href: "/images/app_logo.png",
      },
    ],
  },
};
