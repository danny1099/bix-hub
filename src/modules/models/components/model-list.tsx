"use client";
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils";
import { useTableSelection } from "@/shared/hooks";
import { AnimatedContent, SearchBox, EmptyData, Checkbox } from "@/shared/components";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/table";
import { AddModelButton, ButtonActions } from "@/modules/models/components";
import { columnsNames } from "@/modules/models/helpers";
import { trpc } from "@/trpc/client";

/* prettier-ignore */
export const ModelList = () => {
  const [search, setSearch] = useState("");
  const setDebouncedSearch = useDebounceCallback(setSearch, 300);
  const t = useTranslations("models");

  const [models] = trpc.model.getAll.useSuspenseQuery();
  const allModels = models?.data || [];
  const filteredModels = allModels.filter((model) => model.name.toLowerCase().includes(search.toLowerCase()));

  /* handle table selection functions for table */
  const { isAllSelected, isSelected, toggleAll, toggleRow } = useTableSelection(filteredModels);

  return (
    <article className="flex size-full flex-col">
      <div className="bg-background mt-3 flex h-fit w-full flex-row items-center">
        <SearchBox placeholder={t("search_box")} onChange={(e) => setDebouncedSearch(e.target.value)} />
        <AddModelButton className="ml-auto max-sm:hidden md:w-fit" />
      </div>
      <AnimatedContent className="bg-background mt-5 flex size-full flex-col py-4">
        <section className="flex size-full flex-col">
          {filteredModels.length === 0 ? (
            <EmptyData title={t("no_results.title")} subtitle={t("no_results.subtitle")} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8">
                    <Checkbox checked={isAllSelected} onCheckedChange={(checked) => toggleAll(checked === true)} />
                  </TableHead>
                  {columnsNames.map(({ column, style }) => (
                    <TableHead key={column} className={cn("text-foreground", style)}>
                      {/* @ts-ignore */}
                      {t(`table.${column}`)}
                    </TableHead>
                  ))}
                  <TableHead className="w-fit" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredModels
                  .map((model) => {
                    return (
                      <TableRow key={model.id} data-state={isSelected(model.id) && "selected"} className="group hover:text-tertiary hover:bg-accent/80">
                        <TableCell>
                          <Checkbox
                            checked={isSelected(model.id)}
                            onCheckedChange={(checked) => toggleRow(model.id, checked === true)}
                          />
                        </TableCell>
                        {columnsNames.map(({ column, format, style }) => {
                          return (
                            <TableCell key={column} className={cn("text-2xs text-foreground/75", style)}>
                              {column === "name" && (
                                <span className="flex flex-row items-center gap-3">
                                  {model.name}
                                </span>
                              )}
                              {column !== "name" && format(model[column])}
                            </TableCell>
                          );
                        })}
                        <TableCell className="flex w-14 flex-row gap-2">
                          <ButtonActions {...model} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </section>
        <AddModelButton className="mt-auto flex w-full md:hidden" />
      </AnimatedContent>
    </article>
  );
};
