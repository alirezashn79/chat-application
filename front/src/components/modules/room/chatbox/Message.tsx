import InComingMessage from "@/components/modules/room/chatbox/inComingMessage.tsx";
import OutComingMessage from "@/components/modules/room/chatbox/outComingMessage.tsx";
import useSeenMessage from "@/hooks/useSeenMessage";
import { Message as MessageType } from "@/types";
import React from "react";

function Message({ message }: { message: MessageType }) {
  /* ---------- hook ---------- */
  const { isMe, isRead } = useSeenMessage(message);

  return isMe ? (
    <OutComingMessage message={message} isRead={isRead} />
  ) : (
    <InComingMessage message={message} />
  );
}

export default React.memo(Message);
