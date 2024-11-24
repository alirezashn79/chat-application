import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx";
import { AlignJustify } from "lucide-react";

export default function SheetMeno() {
  return (
    <>
      <Sheet modal={false}>
        <SheetTrigger>
          <AlignJustify className="!size-6" />
        </SheetTrigger>
        <SheetContent side="left" className="!duration-100">
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
