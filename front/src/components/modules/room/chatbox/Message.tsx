import InComingMessage from "@/components/modules/room/chatbox/inComingMessage.tsx";
import OutComingMessage from "@/components/modules/room/chatbox/outComingMessage.tsx";
import React from "react";
import { Message as MessageType } from "@/types";
import { useUserContext } from "@/contexts/user.tsx";

function Message({ message }: { message: MessageType }) {
  /* ---------- context ---------- */
  const { user } = useUserContext();

  /* ---------- constant ---------- */
  const isMe = message?.senderId === user?.id;

  return isMe ? (
    <OutComingMessage message={message} />
  ) : (
    <InComingMessage message={message} />
  );
}

export default React.memo(Message);
