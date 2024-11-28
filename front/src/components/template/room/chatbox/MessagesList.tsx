import Message from "@/components/modules/room/chatbox/Message.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import useSWR from "swr";
import { Message as MessageType } from "@/types";
import useConversation from "@/store";
import client from "@/configs/axiosRequest.ts";

export default function MessagesList() {
  /* ---------- store ---------- */
  const { selectedConversation } = useConversation();

  /* ---------- hook ---------- */
  const { data: messages } = useSWR<Array<MessageType>>(
    `messages/${selectedConversation?.id}`,
    () =>
      client
        .get(`/api/message/get/${selectedConversation?.id}`)
        .then((res) => res.data),
  );

  return (
    <ScrollArea className="h-full p-4">
      <div className="flex flex-col gap-y-6">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    </ScrollArea>
  );
}
