import * as React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface RouterSheetProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  title: string;
  description?: string;
  // eslint-disable-next-line no-unused-vars
  onOpenChange?: (open: boolean) => void;
}

export function RouterSheet({
  children,
  trigger,
  title,
  description,
  onOpenChange,
}: RouterSheetProps) {
  const [open, setOpen] = React.useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={handleOpenChange}
    >
      {/* <SheetTrigger asChild>{trigger}</SheetTrigger> */}
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="mt-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
