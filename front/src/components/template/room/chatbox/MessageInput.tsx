import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/ui/button.tsx";
import { SendHorizontal } from "lucide-react";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
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
  const textAreaMessageRef = useRef<HTMLTextAreaElement>(null);

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
    textAreaMessageRef.current?.focus();
  }, [data]);

  useEffect(() => {
    if (newMessage.trim().length === 0) {
      setDirection("ltr");
    }
  }, [newMessage]);

  return (
    <>
      <Textarea
        autoFocus
        ref={textAreaMessageRef}
        value={newMessage}
        dir={direction}
        onChange={onChangeInputMessage}
        onSelect={onSelectInput}
        className="resize-none min-h-min rounded-3xl border-2 border-slate-400 transition-all duration-300 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="write message..."
      />

      {newMessage.trim().length > 0 && (
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full size-12 bg-cyan-700 text-white transition-all shrink-0"
          onClick={leaveMessage}
        >
          <SendHorizontal />
        </Button>
      )}
    </>
  );
}
