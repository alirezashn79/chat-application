import { useSocketContext } from "@/contexts/socket.tsx";
import useConversation from "@/store";
import { useEffect } from "react";
import { Message } from "@/types";

export default function useListenMessage() {
  /* ---------- context ---------- */
  const { socket } = useSocketContext();

  /* ---------- store ---------- */
  const { messages, setMessages } = useConversation();

  /* ---------- life cycle ---------- */
  useEffect(() => {
    socket?.on("newMessage", (newMessage: Message) => {
      const cloneMessages = messages.slice();
      cloneMessages.push(newMessage);
      setMessages(cloneMessages);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages]);
}
