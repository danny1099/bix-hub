"use client";
import { UserRole } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { getPrivateRoute } from "@/routes/utils";
import { useAuth } from "@/modules/auth/hooks";
import { type IconName, AnimatedContent, Divider } from "@/shared/components";
import { MenuAccountSwitcher, MenuGroup, MenuHeader, MenuLink, MenuSkeleton } from "@/modules/private/components";
import { menuItems, menuSegments } from "@/modules/private/helpers";

export const Menu = () => {
  const t = useTranslations("menu");
  const { account } = useParams<{ account: string }>();
  const { user, isPending } = useAuth();

  /* should not render menu if user role is not defined or is pending */
  if (!user?.role || isPending) return <MenuSkeleton />;

  const role = user.role as UserRole;
  const segments = menuSegments[role] ?? [];
  const items = menuItems[role] ?? [];

  return (
    <div className="border-muted flex size-full flex-col border-r transition-all duration-300">
      <MenuHeader />
      <AnimatedContent key={`${account}:${role}`} className="relative flex size-full flex-col p-4 md:px-8">
        {segments
          .filter((s) => s.view === "admin")
          .map(({ group, title, styles, child }) =>
            group !== "component" ? (
              <MenuGroup key={group} title={title} className={styles}>
                <ul className="relative w-full space-y-2">
                  {items
                    .filter((i) => i.view === "admin")
                    .filter((i) => i.place === group)
                    .map(({ name, path, icon, render }) => {
                      const redirectTo = getPrivateRoute(path, { account });
                      if (render === "divider")
                        return <Divider key={name} type="horizontal" className="bg-border-muted w-full" />;

                      return (
                        <li key={name}>
                          <MenuLink route={redirectTo} icon={icon as IconName}>
                            {/* @ts-ignore */}
                            {t(`items.${name}`)}
                          </MenuLink>
                        </li>
                      );
                    })}
                </ul>
              </MenuGroup>
            ) : (
              <MenuGroup key={group} className={styles}>
                {child}
              </MenuGroup>
            )
          )}
        <MenuAccountSwitcher className="mt-auto" />
      </AnimatedContent>
    </div>
  );
};
