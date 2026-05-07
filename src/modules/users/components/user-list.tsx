"use client";
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils";
import { useTableSelection } from "@/shared/hooks";
import { AnimatedContent, Avatar, Checkbox, EmptyData, SearchBox } from "@/shared/components";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/table";
import { AddMemberButton, ButtonActions } from "@/modules/users/components";
import { columnsNames } from "@/modules/users/helpers";
import { trpc } from "@/trpc/client";

/* prettier-ignore */
export const UsersList = () => {
  const [search, setSearch] = useState("");
  const setDebouncedSearch = useDebounceCallback(setSearch, 300);
  const t = useTranslations("users");

  const [users] = trpc.user.getAll.useSuspenseQuery();
  const allUsers = users?.data || [];
  const filteredUsers = allUsers.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())
  );

  /* handle table selection functions for table */
  const { isAllSelected, isSelected, toggleAll, toggleRow } = useTableSelection(filteredUsers);

  return (
    <article className="flex size-full flex-col">
      <div className="bg-background mt-3 flex h-fit w-full flex-row items-center">
        <SearchBox placeholder={t("search_box")} onChange={(e) => setDebouncedSearch(e.target.value)} />
        <AddMemberButton className="ml-auto max-sm:hidden md:w-fit" />
      </div>
      <AnimatedContent className="bg-background mt-5 flex size-full flex-col py-4">
        <section className="flex size-full flex-col">
          {filteredUsers.length === 0 ? (
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
                  <TableHead className="w-14" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => {
                  return (
                    <TableRow key={user.id} data-state={isSelected(user.id) && "selected"} className="group hover:text-tertiary hover:bg-accent/80">
                      <TableCell>
                        <Checkbox
                          checked={isSelected(user.id)}
                          onCheckedChange={(checked) => toggleRow(user.id, checked === true)}
                        />
                      </TableCell>
                      {columnsNames.map(({ column, format, style }) => (
                        <TableCell key={column} className={cn("text-2xs text-foreground/75", style)}>
                          {column === "name" && (
                            <span className="flex flex-row items-center gap-2">
                              <Avatar url={user.image as string} size="sm" className="mr-1" />
                              {user.name}
                            </span>
                          )}
                          {column !== "name" && format(user[column])}
                        </TableCell>
                      ))}
                      <TableCell className="flex w-fit flex-row gap-2">
                        <ButtonActions {...user} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </section>
        <AddMemberButton className="mt-auto flex w-full md:hidden" />
      </AnimatedContent>
    </article>
  );
};
