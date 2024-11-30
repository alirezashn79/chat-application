import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useConversation from "@/store";

export default function ChatHeader() {
  /* ---------- store ---------- */
  const { setSelectedConversation } = useConversation();

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

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="me-2">
            <DropdownMenuItem>
              <div
                className="cursor-pointer text-destructive w-full"
                onClick={() => {
                  setSelectedConversation(null);
                }}
              >
                close
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
