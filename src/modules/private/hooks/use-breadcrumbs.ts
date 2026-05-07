// @ts-nocheck
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useParams } from "next/navigation";
import { getPrivateRoute } from "@/routes/utils";
import { slugToWord } from "@/shared/utils";

export type BreadcrumbSegment = {
  label: string;
  href: string;
  isCurrent: boolean;
};

const OMITTED_SEGMENTS = new Set(["m", "en", "es"]);

export function useBreadcrumbs(): BreadcrumbSegment[] {
  const pathname = usePathname();
  const params = useParams<{ organization: string; workspace?: string }>();
  const t = useTranslations("menu");

  /* convert slugs to words for display purposes */
  const organization = params.organization ?? "";
  const workspace = params.workspace;

  return useMemo(() => {
    const linkedCrumbs = {
      [organization]: {
        label: slugToWord(organization),
        href: getPrivateRoute("overview", { organization }),
        preCrumb: null,
      },
      ...(workspace
        ? {
            [workspace]: {
              label: slugToWord(workspace),
              href: "",
              preCrumb: {
                label: t("items.workspaces"),
                href: getPrivateRoute("workspaces", { organization }),
              },
            },
          }
        : {}),
    };

    const rawSegments = pathname.split("/").filter(Boolean);
    const crumbs: BreadcrumbSegment[] = [];
    const processedSegments = new Set<string>();

    for (let i = 0; i < rawSegments.length; i++) {
      const segment = rawSegments[i];
      if (OMITTED_SEGMENTS.has(segment)) continue;

      /* check if segment is linked to another route */
      const linked = linkedCrumbs[segment];
      if (linked) {
        if (processedSegments.has(segment)) continue;
        processedSegments.add(segment);

        /* check if this is the last segment for preCrumbs */
        if (linked.preCrumb) {
          crumbs.push({
            label: linked.preCrumb.label,
            href: linked.preCrumb.href,
            isCurrent: false,
          });
        }

        crumbs.push({
          label: linked.label,
          href: linked.href,
          isCurrent: false,
        });

        continue;
      }
      const accumulated = "/" + rawSegments.slice(0, i + 1).join("/");
      crumbs.push({
        label: t.has(`items.${segment}`) ? t(`items.${segment}`) : slugToWord(segment),
        href: accumulated,
        isCurrent: false,
      });
    }

    /* mark last crumb as current */
    if (crumbs.length > 0) crumbs[crumbs.length - 1].isCurrent = true;

    return crumbs;
  }, [pathname, params]);
}
