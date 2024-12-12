import InComingMessage from "@/components/modules/room/chatbox/inComingMessage.tsx";
import OutComingMessage from "@/components/modules/room/chatbox/outComingMessage.tsx";
import React, { useEffect, useState } from "react";
import { Message as MessageType } from "@/types";
import { useUserContext } from "@/contexts/user.tsx";
import { useSocketContext } from "@/contexts/socket";

function Message({ message }: { message: MessageType }) {
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
        const socke = socket?.emit("readMessage", message.id);
        console.log(socke);
      }
    };

    readMessage();

    socket?.on("readMessageStatus", ({ status }) => {
      if (status === "success") {
        setIsRead(true);
      }
    });
  }, [isMe, message, socket]);

  return isMe ? (
    <OutComingMessage message={message} isRead={isRead} />
  ) : (
    <InComingMessage message={message} />
  );
}

export default React.memo(Message);
