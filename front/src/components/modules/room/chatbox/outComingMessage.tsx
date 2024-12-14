import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Check, CheckCheck } from "lucide-react";
import { Message } from "@/types";
import { convertDate } from "@/helpers";
import { useUserContext } from "@/contexts/user.tsx";
import { useThemeContext } from "@/contexts/theme.tsx";
import { cn } from "@/lib/utils.ts";

export default function OutComingMessage({
  message,
  isRead,
}: {
  message: Message;
  isRead: boolean;
}) {
  /* ---------- context ---------- */
  const { user } = useUserContext();
  const { theme } = useThemeContext();

  return (
    <div className="flex items-end flex-row-reverse gap-2.5 my-1">
      <Avatar>
        <AvatarImage src={user?.avatar ?? ""} />
        <AvatarFallback>{""}</AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "p-2  rounded-2xl rounded-br-none",
          theme === "light" ? "bg-lime-100" : "bg-lime-950"
        )}
      >
        <p className="text-primary">{message?.content}</p>
        <div className="pt-3 flex items-center  justify-between gap-x-1">
          {message.isRead || isRead ? (
            <CheckCheck className="size-4 text-cyan-500" />
          ) : (
            <Check className="size-4" />
          )}
          <span className="text-xs text-muted-foreground">
            {convertDate(message?.createdAt as Date)}
          </span>
        </div>
      </div>
    </div>
  );
}
