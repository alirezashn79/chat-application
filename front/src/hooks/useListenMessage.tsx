import { useSocketContext } from "@/contexts/socket.tsx";
import useConversation from "@/store";
import { Message } from "@/types";
import { useEffect } from "react";

export default function useListenMessage() {
  /* ---------- context ---------- */
  const { socket } = useSocketContext();

  /* ---------- store ---------- */
  const { messages, setMessages, selectedConversation } = useConversation();

  /* ---------- life cycle ---------- */
  useEffect(() => {
    socket?.on("newMessage", (newMessage: Message) => {
      if (newMessage.senderId === selectedConversation?.id) {
        const cloneMessages = messages.slice();
        cloneMessages.push(newMessage);
        setMessages(cloneMessages);
      }
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages]);
}
