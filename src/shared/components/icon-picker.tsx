"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/popover";
import { Button, IconName, appIcons, ImageFromDevice } from "@/shared/components";
import { cn, baseColors, getColor, type Color } from "@/shared/utils";

interface Props {
  value: string;
  onChange: (value: string) => void;
  withLocalDevice?: boolean;
  className?: string;
}

/* prettier-ignore */
export const IconPicker = ({ value, onChange, withLocalDevice = true, className }: Props) => {
  const [selected, setSelected] = useState({ type: "icon", value });
  const [iconActive, colorActive] = selected.value.split(":") ?? [];
  const t = useTranslations("icons");

  const onIconSelect = (value: string) => {
    setSelected({ type: "icon", value });
    onChange(value);
  };

  const onImageSelect = (value: string) => {
    setSelected({ type: "image", value });
    onChange(value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {selected.type === "image" ? (
          <img
            src={selected.value}
            alt={t("title")}
            className={cn("size-6 rounded-full object-cover", className)}
          />
        ) : (
          <Button
            variant="ghost"
            icon={iconActive as IconName}
            size="icon"
            className={cn("size-6 shrink-0", getColor(colorActive as Color), className)}
          />
        )}
      </PopoverTrigger>
      <PopoverContent className="w-74 flex flex-col max-sm:w-68" >
        <div className="flex flex-col px-2 py-1">
          <p className="text-foreground text-xs font-medium">{t("title")}</p>
          <span className="text-3xs text-muted-foreground">{t("description")}</ span>
        </div>
        <div className="mt-2 flex w-full flex-row flex-wrap justify-around gap-2 px-2">
          {Object.entries(baseColors).map(([colorName]) => {
            const isSelected = colorActive === colorName;
            const styles = baseColors[colorName as Color]
            return (
              <button
                key={colorName}
                type="button"
                onClick={() => onIconSelect(`${iconActive}:${colorName}`)}
                className={cn("size-4 rounded-full ring-offset-background", styles, isSelected && "ring-1 ring-offset-1")}
              />
            );
          })}
        </div>
        <div className="mt-3 flex w-full flex-row flex-wrap gap-2 px-2 md:justify-around">
          {appIcons.map((iconName) => {
            const isSelected = iconActive === iconName;
            return (
              <Button
                key={iconName}
                type="button"
                variant="outline"
                icon={iconName as IconName}
                size="icon"
                className={cn("size-8 shrink-0 ring-offset-background", isSelected && `ring-2 ring-offset-1`, isSelected && getColor(colorActive as Color))}
                onClick={() => onIconSelect(`${iconName}:${colorActive}`)}
              />
            );
          })}
        </div>
        {withLocalDevice && <ImageFromDevice format="url" onImageSelect={onImageSelect} />}
      </PopoverContent>
    </Popover>
  );
};
