import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { EllipsisVertical } from "lucide-react";

export default function ChatHeader() {
  return (
    <header>
      <div className="h-16 p-2  flex items-center justify-between border-b-2">
        <div className="flex-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <p className="text-base">Alireza sharifi nasab</p>
            <span className="text-green-600 text-xs font-bold animate-pulse">
              Online
            </span>
          </div>
        </div>

        <Button variant="ghost" size="icon">
          <EllipsisVertical />
        </Button>
      </div>
    </header>
  );
}
