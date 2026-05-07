"use client";
import { useCallback } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { getPublicRoute } from "@/routes/utils";
import { useToast } from "@/shared/hooks";
import { capitalize, cn } from "@/shared/utils";
import { useAuth } from "@/modules/auth/hooks";
import { MenuContent, MenuRadioGroup, MenuRadioItem, MenuItem, MenuSeparator } from "@/shared/components/dropdown";
import { MenuSub, MenuSubContent, MenuSubTrigger, MenuPortal } from "@/shared/components/dropdown";
import { Icon, P, DropdownMenu, MenuTrigger, Badge, Avatar } from "@/shared/components";
import { OrganizationLogo } from "@/modules/organization/components";
import { SwitcherSkeleton } from "@/modules/private/components";
import { trpc } from "@/trpc/client";

interface AccountSwitcherProps {
  className?: string;
}

/* prettier-ignore */
export const MenuAccountSwitcher = ({ className }: AccountSwitcherProps) => {
  const toast = useToast();
  const t = useTranslations("organization.switcher");
  const router = useRouter();
  const pathname = usePathname();
  const { account } = useParams<{ account: string }>();
  const { refetch, user, logOut } = useAuth();

  /* get current organization and all organizations available */
  const { data: allOrganizations, isLoading } = trpc.organization.getAll.useQuery();
  const { mutateAsync: setActive } = trpc.organization.change.useMutation();
  const selected = allOrganizations?.data?.find((o) => o.slug === account) ?? allOrganizations?.data?.[0] ?? null;

  const handleSelect = useCallback(
    async (orgId: string) => {
      if (orgId === selected?.id) return;
      const { data, message, status } = await setActive({ param: orgId });

      if (status === "error" && message) {
        toast({ message, type: "error" });
        return;
      }

      /* redirect to the private route of selected organization */
      const redirectTo = pathname.replace(`/${selected?.slug}`, `/${data?.slug}`);
      router.push(redirectTo, { scroll: false });
      refetch();
    },
    [selected?.slug, setActive, router]
  );

  const onLogOut = async () => {
    const redirectTo = getPublicRoute("sign_in")
    await logOut().then(() => {
      router.push(redirectTo);
    });
  }

  if (isLoading) return <SwitcherSkeleton className="mt-auto flex h-10 w-[95%] " />;

  return (
    <DropdownMenu>
      <MenuTrigger asChild>
        <div className={cn("text-2xs hover:bg-accent mt-auto flex h-fit w-[95%] items-center justify-normal gap-2 rounded-md px-3 py-2", className )}>
          <Avatar url={user?.image as string} size="sm" />
          <div className="flex flex-col items-start">
            <P className="text-accent-foreground text-2xs font-medium">{user?.name}</P>
            <span className="text-4xs text-muted-foreground -mt-0.5">{user?.email}</span>
          </div>
          <Icon name="chevronExpand" className="text-muted-foreground ml-auto size-4" />
        </div>
      </MenuTrigger>
      <MenuContent align="start" className="w-72 min-w-56 rounded-md py-2">
        <MenuSub>
          <MenuSubTrigger>
            <div className="flex flex-col justify-center gap-1">
              <P className="text-3xs ml-0.5">{t("title")}</P>
              <div className="flex w-full flex-row gap-2 py-1">
                <OrganizationLogo url={selected?.logo as string} />
                <div className="flex w-full flex-col items-start gap-1 text-start">
                  <p className="max-w-[17ch] truncate text-xs leading-none font-semibold">{selected?.name}</p>
                  <span className="text-muted-foreground text-3xs -mt-0.5">
                    {t("role", {
                      role: capitalize(selected?.role as string) as string,
                      count: selected?.members as number,
                    })}
                  </span>
                </div>
              </div>
              <MenuPortal>
                <MenuSubContent className="w-56">
                  <MenuRadioGroup value={selected?.id} onValueChange={handleSelect}>
                    {allOrganizations?.data?.map((org) => {
                      return (
                        <MenuRadioItem key={org.id} value={org.id} className="group hover:bg-accent">
                          <div className="flex h-full w-full items-center gap-2">
                            <OrganizationLogo url={org?.logo as string} className="size-6" />
                            <P className="text-foreground text-xs">{org.name}</P>
                            {org.role !== "owner" && (
                              <Badge variant="outline" className="text-3xs w-fit px-2">
                                {t("invited")}
                              </Badge>
                            )}
                          </div>
                        </MenuRadioItem>
                      );
                    })}
                  </MenuRadioGroup>
                </MenuSubContent>
              </MenuPortal>
            </div>
          </MenuSubTrigger>
        </MenuSub>
        <MenuSeparator />
        <MenuItem onClick={onLogOut} className="h-10 px-2 font-medium text-2xs">
          <Icon name="logOut" className="size-4" />
          {t("logout")}
        </MenuItem>   
      </MenuContent>
    </DropdownMenu>
  );
};
