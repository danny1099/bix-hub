// @ts-nocheck
"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/components/select";
import { FormControl, Select, SelectContent, SelectSeparator, SelectSearchInput } from "@/shared/components";
import { PROFESSIONS } from "@/modules/onboarding/helpers";

interface SelectProfessionProps extends React.ComponentProps<typeof Select> {
  className?: string;
}

export const SelectProfession = ({ className, ...props }: SelectProfessionProps) => {
  const [search, setSearch] = useState("");
  const t = useTranslations("onboarding");

  const filterProfessions = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return Object.entries(PROFESSIONS).reduce(
      (acc, [category, professions]) => {
        const matches = professions.filter((p) => p.includes(lowerQuery));
        if (matches.length > 0) acc[category] = matches;
        return acc;
      },
      {} as Record<string, string[]>
    );
  };

  const filteredProfessions = filterProfessions(search);

  return (
    <Select {...props}>
      <FormControl>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t("form.profession.placeholder")} />
        </SelectTrigger>
      </FormControl>
      <SelectContent
        searchSlot={<SelectSearchInput value={search} onChange={setSearch} placeholder={t("search-input")} />}
        className="max-h-64 w-md overflow-y-auto px-2"
      >
        {Object.entries(filteredProfessions).map(([category, professions], idx, arr) => (
          <SelectGroup key={category} onKeyDown={(e) => e.stopPropagation()} onPointerDown={(e) => e.stopPropagation()}>
            <SelectLabel>{t(`profession.${category}`)}</SelectLabel>
            {professions.map((profession) => (
              <SelectItem key={profession} value={profession} className="text-2xs w-104">
                {t(`profession.${profession}`)}
              </SelectItem>
            ))}
            {idx < arr.length - 1 && <SelectSeparator />}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};
