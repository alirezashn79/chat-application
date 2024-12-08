import Message from "@/components/modules/room/chatbox/Message.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import useSWR from "swr";
import { Message as MessageType } from "@/types";
import useConversation from "@/store";
import client from "@/configs/axiosRequest.ts";
import { useEffect } from "react";
import useListenMessage from "@/hooks/useListenMessage.tsx";

export default function MessagesList() {
  /* ---------- hook ---------- */
  useListenMessage();

  /* ---------- store ---------- */
  const { selectedConversation, messages, setMessages } = useConversation();

  /* ---------- hook ---------- */
  const { data } = useSWR<Array<MessageType>>(
    `messages/${selectedConversation?.id}`,
    () =>
      client
        .get(`/api/message/get/${selectedConversation?.id}`)
        .then((res) => res.data),
  );

  /* ---------- life cycle ---------- */
  useEffect(() => {
    if (data) setMessages(data);
  }, [data]);

  return (
    <ScrollArea className="h-full px-4 pt-0.5 pb-[85px]">
      <div className="flex flex-col gap-y-2">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    </ScrollArea>
  );
}
