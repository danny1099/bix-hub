import { Icon, Box, type IconName } from "@/shared/components";
import { cn, type Color } from "@/shared/utils";

interface OrganizationLogoProps {
  url: string;
  className?: string;
}

export const OrganizationLogo = ({ url, className }: OrganizationLogoProps) => {
  const isIconType = !url.startsWith("http") && !url.startsWith("data");
  const [icon, color] = url.split(":") ?? [];

  return isIconType ? (
    <Box sizes="md" variant={color as Color} className={cn("shrink-0", className)}>
      <Icon name={icon as IconName} />
    </Box>
  ) : (
    <img src={url} alt="Organization Logo" className={cn("size-7 shrink-0 rounded-sm object-contain", className)} />
  );
};
