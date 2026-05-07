"use client";
import { useTranslations } from "next-intl";
import { ChangeEvent, useRef, useState } from "react";
import { Avatar, Button, Icon } from "@/shared/components";
import { useToast } from "@/shared/hooks";
import { cn } from "@/shared/utils";

interface Props {
  onImageSelect: (url: string) => void;
  format?: "base64" | "url";
  className?: string;
}

export const ImageFromDevice = ({ onImageSelect, format = "base64", className }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("file_picker");
  const toast = useToast();

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({ message: "image-type", type: "info" });
      return;
    }

    /* check file size < 5MB */
    if (file.size > 5 * 1024 * 1024) {
      toast({ message: "image-size", type: "info" });
      return;
    }

    /* url preview to show on component avatar */
    const url = URL.createObjectURL(file);
    setSelectedImage(url);
    onImageSelect(url);
    setFileName(file.name);

    /* convert to base64 if format is selected */
    if (format === "base64") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onImageSelect(base64String);
      };
      reader.readAsDataURL(file);
      return;
    }
  };

  const handleClearClick = () => {
    setSelectedImage("");
    setFileName("");
    onImageSelect("");
  };

  return (
    <div className={cn("border-muted flex w-full flex-col flex-wrap gap-2 border-t p-2 md:justify-around", className)}>
      <p className="text-3xs text-muted-foreground">{t("title")}</p>
      <div className="border-muted bg-accent hover:bg-accent/80 flex h-9 w-full cursor-pointer flex-row items-center justify-between gap-2 rounded-md border border-dashed px-1.5 transition-colors">
        {fileName && (
          <Button
            variant="destructive"
            size="xs"
            icon="delete"
            className="shrink-0 cursor-pointer"
            onClick={handleClearClick}
          />
        )}
        <label htmlFor="avatar-upload" className="flex w-full flex-row items-center gap-1">
          <input
            id="avatar-upload"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />
          {!fileName && <Icon name="device" className="text-muted-foreground size-4 shrink-0" />}
          <span className="text-3xs text-muted-foreground truncate font-medium whitespace-nowrap">
            {!fileName ? t("select_file") : fileName}
          </span>
        </label>
        {fileName && <Avatar url={selectedImage} size="sm" className="ml-auto shrink-0" />}
      </div>
    </div>
  );
};
