"use client";
import { Button, ButtonProps, DrawerClose, DialogClose } from "@/shared/components";
import { useIsMobile } from "@/shared/hooks";

interface Props extends ButtonProps {
  onModal?: boolean;
}

export const Cancel = ({ onModal = false, ...props }: Props) => {
  const isMobile = useIsMobile();

  if (onModal) {
    return isMobile ? (
      <DrawerClose asChild>
        <Button variant="outline" type="reset" {...props} />
      </DrawerClose>
    ) : (
      <DialogClose asChild>
        <Button variant="outline" type="reset" {...props} />
      </DialogClose>
    );
  }

  return <Button variant="outline" type="reset" {...props} />;
};
