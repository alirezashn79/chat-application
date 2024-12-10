import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/ui/button.tsx";
import { SendHorizontal } from "lucide-react";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import useMutation from "@/hooks/useMutation.ts";
import { Message } from "@/types";
import useConversation from "@/store";

interface InputMessageProps {
  newMessage: string;
  setNewMessage: Dispatch<SetStateAction<string>>;
  setCursorPosition: Dispatch<SetStateAction<number | null>>;
}

export default function MessageInput({
  newMessage,
  setNewMessage,
  setCursorPosition,
}: InputMessageProps) {
  /* ---------- state ---------- */
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

  /* ---------- hook ---------- */
  const { data, execute } = useMutation<Message>();
  const { messages, setMessages, selectedConversation } = useConversation();

  /* ---------- handler ---------- */
  const onChangeInputMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const isPersian = /[\u0600-\u06FF]/.test(value);
    setDirection(isPersian ? "rtl" : "ltr");
    setNewMessage(value);
  };

  const onSelectInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const position = e.target.selectionStart;
    setCursorPosition(position);
  };

  const leaveMessage = () => {
    if (newMessage.trim().length > 0) {
      execute({
        url: `/api/message/send/${selectedConversation?.id}`,
        body: {
          content: newMessage,
        },
      });
    }
  };

  /* ---------- life cycle ---------- */
  useEffect(() => {
    if (data) setMessages([...messages, data]);
    setNewMessage("");
  }, [data]);

  useEffect(() => {
    if (newMessage.trim().length === 0) {
      setDirection("ltr");
    }
  }, [newMessage]);

  return (
    <>
      <Textarea
        value={newMessage}
        dir={direction}
        onChange={onChangeInputMessage}
        onSelect={onSelectInput}
        className="resize-none rounded-3xl min-h-4 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-transparent transition-all duration-300"
        placeholder="write message..."
      />

      {newMessage.trim().length > 0 && (
        <Button
          variant="ghost"
          className="rounded-full size-12 bg-cyan-700 text-white transition-all"
          onClick={leaveMessage}
        >
          <SendHorizontal />
        </Button>
      )}
    </>
  );
}
