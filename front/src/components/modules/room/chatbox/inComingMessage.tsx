import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Message } from "@/types";
import { convertDate } from "@/helpers";
import useConversation from "@/store";

export default function InComingMessage({ message }: { message: Message }) {
  /* ---------- store ---------- */
  const { selectedConversation } = useConversation();
  return (
    <div className="flex items-end gap-2.5">
      <Avatar>
        <AvatarImage src={selectedConversation?.avatar ?? ""} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="p-2 bg-white rounded-2xl rounded-bl-none">
        <p>{message?.content}</p>
        <div className="pt-3 flex justify-end">
          <span className="text-xs text-muted-foreground">
            {convertDate(message?.createdAt as Date)}
          </span>
        </div>
      </div>
    </div>
  );
}
