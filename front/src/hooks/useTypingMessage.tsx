import { useSocketContext } from "@/contexts/socket";
import useConversation from "@/store";
import { debounce } from "lodash";
import { useEffect, useState, useCallback } from "react";

export default function useTypingMessage() {
  /* ---------- state ---------- */
  const [isTyping, setIsTyping] = useState(false);

  /* ---------- context ---------- */
  const { socket } = useSocketContext();

  /* ---------- store ---------- */
  const { selectedConversation } = useConversation();

  /* ---------- debounced handlers ---------- */
  const handleStopTyping = useCallback(() => {
    socket?.emit("stopTyping", selectedConversation?.id);
  }, [socket, selectedConversation]);

  const handleStopTypingDebounced = useCallback(
    debounce(handleStopTyping, 1500),
    [handleStopTyping]
  );

  /* ---------- main handler ---------- */
  const handleTyping = useCallback(() => {
    socket?.emit("startTyping", selectedConversation?.id);
    handleStopTypingDebounced();
  }, [socket, selectedConversation, handleStopTypingDebounced]);

  /* ---------- socket listeners ---------- */
  const onStartTypingStatus = ({ status }: { status: string }) => {
    if (status === "active") setIsTyping(true);
  };

  const onStopTypingStatus = ({ status }: { status: string }) => {
    if (status === "inactive") setIsTyping(false);
  };

  /* ---------- life cycle ---------- */
  useEffect(() => {
    if (!socket) return;

    socket.on("startTypingStatus", onStartTypingStatus);
    socket.on("stopTypingStatus", onStopTypingStatus);

    return () => {
      socket.off("startTypingStatus", onStartTypingStatus);
      socket.off("stopTypingStatus", onStopTypingStatus);
      handleStopTypingDebounced.cancel();
    };
  }, [socket, handleStopTypingDebounced]);

  /* ---------- return ---------- */
  return { isTyping, handleTyping };
}
