"use client";
import { useTranslations } from "next-intl";
import { useState, useMemo, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger, ImageFromDevice, Avatar } from "@/shared/components";
import { cn, shuffleArray } from "@/shared/utils";

interface AvatarPickerProps {
  url: string;
  onImageSelect: (url: string) => void;
  children?: React.ReactNode;
  withLocalDevice?: boolean;
  className?: string;
}

/* prettier-ignore */
export const AvatarPicker = ({ url, onImageSelect, children, className}: AvatarPickerProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(url || "");
  const t = useTranslations("avatar");

  const avatars = useMemo(() => {
    const isMemojiAvatar  = url?.startsWith("https://d2u8k2ocievbld.cloudfront.net/memojis/");
    const indices = shuffleArray(Array.from({ length: 30 }, (_, i) => i + 1));

    const generated  = indices.slice(0, 10).map((index) => {
      const gender = Math.random() < 0.5 ? "male" : "female";        
      return `https://d2u8k2ocievbld.cloudfront.net/memojis/${gender}/${index}.png`;
    });

     return isMemojiAvatar ? (
      generated.map((a) => {
        if(a === url) return url;
        return a;
      })
    ) : generated;
  }, []);

  useEffect(() => {
    if (url) setSelectedImage(url);
  }, [url]);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <Popover>
        <PopoverTrigger asChild>
          {children}
        </PopoverTrigger>
        <PopoverContent className="mt-2 flex w-74 flex-col max-sm:w-68">
          <div className="flex flex-col rounded-sm px-2 py-1">
            <p className="text-foreground text-xs font-medium">{t("title")}</p>
            <span className="text-3xs text-muted-foreground">{t("description")}</span>
          </div>
          <div className="flex w-full flex-row flex-wrap justify-around gap-2 px-2">
            {avatars.map((url) => {
              const isSelected = selectedImage === url;
              return (
                <img
                  key={url}
                  src={url}
                  className={cn("size-10 cursor-pointer rounded-full object-cover", isSelected && "ring-1 ring-offset-2 ring-green-600 dark:ring-offset-background")}
                  onClick={() => {
                    setSelectedImage(url);
                    onImageSelect(url);
                  }}
                />
              );
            })}
          </div>
          <ImageFromDevice onImageSelect={onImageSelect} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

/* prettier-ignore */
export const AvatarPickerForm = ({ url, onImageSelect, withLocalDevice = false, className }: AvatarPickerProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(url || "");
  const t = useTranslations("avatar");

  const avatars = useMemo(() => {
    const isMemojiAvatar = url?.startsWith("https://d2u8k2ocievbld.cloudfront.net/memojis/");
    const indices = shuffleArray(Array.from({ length: 30 }, (_, i) => i + 1));

    const generated = indices.slice(0, 10).map((index) => {
      const gender = Math.random() < 0.5 ? "male" : "female";      
      return `https://d2u8k2ocievbld.cloudfront.net/memojis/${gender}/${index}.png`;
    });

    return isMemojiAvatar ? (
      generated.map((a) => {
        if(a === url) return url;
        return a;
      })
    ) : generated;
  }, []);

  const onAvatarSelect = (url: string) => {
    setSelectedImage(url);
    onImageSelect(url);
  };

  useEffect(() => {
    if (url) setSelectedImage(url);
  }, [url]);

  return (
    <div className={cn("relative flex flex-col items-center justify-center", className)}>
      <Avatar url={selectedImage} size="xl" />
      <div className="flex w-full flex-col px-2 py-1 mt-3">
        <p className="text-foreground text-xs font-medium">{t("title")}</p>
        <span className="text-3xs text-muted-foreground">{t("description")}</span>
      </div>
      <div className="flex w-full flex-row flex-wrap justify-around gap-4 px-2 py-3">
        {avatars.map((url) => {
          const isSelected = selectedImage === url;
          return (
            <img
              key={url}
              src={url}
              className={cn("size-8 cursor-pointer rounded-full object-cover", isSelected && "ring-green-600 dark:ring-offset-background ring-1 ring-offset-2")}
              onClick={() => {
                setSelectedImage(url);
                onImageSelect(url);
              }}
            />
          );
        })}
      </div>
      {withLocalDevice && <ImageFromDevice onImageSelect={onAvatarSelect} />}
    </div>
  );
};
