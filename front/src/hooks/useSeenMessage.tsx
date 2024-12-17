import { useSocketContext } from "@/contexts/socket";
import { useUserContext } from "@/contexts/user";
import { Message } from "@/types";
import { useEffect, useState } from "react";

export default function useSeenMessage(message: Message) {
  /* ---------- state ---------- */
  const [isRead, setIsRead] = useState(false);

  /* ---------- context ---------- */
  const { user } = useUserContext();
  const { socket } = useSocketContext();

  /* ---------- constant ---------- */
  const isMe = message?.senderId === user?.id;

  /* ---------- life cycle ---------- */
  useEffect(() => {
    const readMessage = () => {
      if (!isMe && !message.isRead) {
        socket?.emit("readMessage", message.id);
      }
    };

    readMessage();

    socket?.on("readMessageStatus", ({ status }) => {
      if (status === "success") {
        setIsRead(true);
      }
    });
  }, [isMe, message, socket]);

  return { isMe, isRead };
}
