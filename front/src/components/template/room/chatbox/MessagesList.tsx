import Message from "@/components/modules/room/chatbox/Message.tsx";
import { Skeleton } from "@/components/ui/skeleton";
import client from "@/configs/axiosRequest.ts";
import useListenMessage from "@/hooks/useListenMessage.tsx";
import { cn } from "@/lib/utils";
import useConversation from "@/store";
import { Message as MessageType } from "@/types";
import { useEffect, useRef } from "react";
import useSWR from "swr";
import NoMessages from "./NoMessages";

export default function MessagesList() {
  /* ---------- ref ---------- */
  const lastMessageRef = useRef<HTMLDivElement>(null);

  /* ---------- store ---------- */
  const { selectedConversation, messages, setMessages } = useConversation();

  /* ---------- hook ---------- */
  useListenMessage();
  const { data, isLoading } = useSWR<Array<MessageType>>(
    `messages/${selectedConversation?.id}`,
    () =>
      client
        .get(`/api/message/get/${selectedConversation?.id}`)
        .then((res) => res.data)
  );

  /* ---------- life cycle ---------- */
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

  if (isLoading) {
    return (
      <div className="relative h-[calc(100vh-64px-85px)] px-4">
        <div className="flex flex-col">
          {Array.from({ length: 10 })
            .fill(undefined)
            .map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-end gap-2.5 my-1",
                  !(idx % 2) ? "mr-auto" : "ml-auto flex-row-reverse"
                )}
              >
                <Skeleton className="size-10 rounded-full" />
                <Skeleton
                  className={cn(
                    "p-2 rounded-2xl h-20 w-44",
                    !(idx % 2) ? "rounded-bl-none" : "rounded-br-none"
                  )}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-y-auto h-[calc(100vh-64px-85px)] px-4">
      {messages.length > 0 ? (
        <div className="flex flex-col">
          {messages?.map((message) => (
            <div key={message.id} ref={lastMessageRef}>
              <Message message={message} />
            </div>
          ))}
        </div>
      ) : (
        <NoMessages />
      )}
    </div>
  );
}
