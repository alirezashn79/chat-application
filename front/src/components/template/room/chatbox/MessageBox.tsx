import { useState } from "react";
import EmojiContainer from "@/components/template/room/chatbox/EmojiContainer.tsx";
import MessageInput from "@/components/template/room/chatbox/MessageInput.tsx";

export default function MessageBox() {
  /* ---------- state ---------- */
  const [newMessage, setNewMessage] = useState("");
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);

  return (
    <div className="absolute bottom-0 start-0 mb-6 end-0">
      <div className="flex items-center justify-between gap-2 px-10 relative">
        <EmojiContainer
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          cursorPosition={cursorPosition}
        />

        <MessageInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          setCursorPosition={setCursorPosition}
        />
      </div>
    </div>
  );
}
