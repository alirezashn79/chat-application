import Message from "@/components/modules/room/chatbox/Message.tsx";
import client from "@/configs/axiosRequest.ts";
import useListenMessage from "@/hooks/useListenMessage.tsx";
import useConversation from "@/store";
import { Message as MessageType } from "@/types";
import { useEffect, useRef } from "react";
import useSWR from "swr";

export default function MessagesList() {
  /* ---------- hook ---------- */
  useListenMessage();

  /* ---------- store ---------- */
  const lastMessageRef = useRef<HTMLDivElement>(null);

  /* ---------- store ---------- */
  const { selectedConversation, messages, setMessages } = useConversation();

  /* ---------- hook ---------- */
  const { data } = useSWR<Array<MessageType>>(
    `messages/${selectedConversation?.id}`,
    () =>
      client
        .get(`/api/message/get/${selectedConversation?.id}`)
        .then((res) => res.data)
  );

  /* ---------- life cycle ---------- */
  useEffect(() => {}, [messages]);

  useEffect(() => {
    if (data) setMessages(data);
  }, [data, setMessages]);

  useEffect(() => {
    const domNode = lastMessageRef.current;

    if (domNode) {
      setTimeout(() => {
        domNode.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "end",
        });
      }, 100);
    }
  }, [messages]);

  return (
    <div className="relative overflow-y-auto h-full px-4">
      <div className="flex flex-col">
        {messages?.map((message) => (
          <div key={message.id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      </div>
    </div>
  );
}
