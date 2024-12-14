import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Message } from "@/types";
import { convertDate } from "@/helpers";
import useConversation from "@/store";
import { useThemeContext } from "@/contexts/theme.tsx";
import { cn } from "@/lib/utils.ts";

export default function InComingMessage({ message }: { message: Message }) {
  /* ---------- store ---------- */
  const { selectedConversation } = useConversation();
  const { theme } = useThemeContext();

  return (
    <div className="flex items-end gap-2.5 my-1">
      <Avatar>
        <AvatarImage src={selectedConversation?.avatar ?? ""} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "p-2  rounded-2xl rounded-bl-none",
          theme === "light" ? "bg-white" : "bg-primary-foreground"
        )}
      >
        <p className="text-primary">{message?.content}</p>
        <div className="pt-3 flex justify-end">
          <span className="text-xs text-muted-foreground">
            {convertDate(message?.createdAt as Date)}
          </span>
        </div>
      </div>
    </div>
  );
}
