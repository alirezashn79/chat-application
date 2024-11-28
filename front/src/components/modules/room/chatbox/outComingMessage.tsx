import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { CheckCheck } from "lucide-react";
import { Message } from "@/types";
import { convertDate } from "@/helpers";

export default function OutComingMessage({ message }: { message: Message }) {
  /* ---------- context ---------- */

  return (
    <div className="flex items-end flex-row-reverse gap-2.5">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{""}</AvatarFallback>
      </Avatar>

      <div className="p-2 bg-lime-100 rounded-2xl rounded-br-none">
        <p>{message?.content}</p>
        <div className="pt-3 flex items-center  justify-between">
          <CheckCheck className="size-4 text-cyan-500" />
          <span className="text-xs text-muted-foreground">
            {convertDate(message?.createdAt as Date)}
          </span>
        </div>
      </div>
    </div>
  );
}
