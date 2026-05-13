"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { getPrivateRoute } from "@/routes/utils";
import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger, Icon } from "@/shared/components";
import { MenuLink } from "@/modules/private/components";
import { trpc } from "@/trpc/client";

export const ModelCollapsibleList = () => {
  const t = useTranslations("menu.items");
  const { account } = useParams<{ account: string }>();

  /* get all models  associated with the current account */
  const { data: models } = trpc.model.getAll.useQuery();

  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="navlink" icon="collection" place="start" className="w-[95%] justify-start">
          {t("overview")}
          <Icon name="chevronDown" className="ml-auto size-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="border-border my-2 ml-8 flex h-fit max-h-36 min-h-8 w-full translate-x-px flex-col gap-1.5 overflow-y-auto border-l">
          {models?.data?.map(({ name, slug, id }) => (
            <li key={id}>
              <MenuLink
                route={getPrivateRoute("report", { account, report: slug })}
                className="ml-4 inline-flex h-8 w-[70%] cursor-pointer"
              >
                {name}
              </MenuLink>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};
