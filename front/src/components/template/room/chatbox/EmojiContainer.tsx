import EmojiPicker from "emoji-picker-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { SmilePlus } from "lucide-react";

interface EmojiProps {
  newMessage: string;
  setNewMessage: Dispatch<SetStateAction<string>>;

  cursorPosition: number | null;
}

export default function EmojiContainer({
  newMessage,
  setNewMessage,
  cursorPosition,
}: EmojiProps) {
  /* ---------- state ---------- */
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);

  /* ---------- handler ---------- */
  const onEmojiClick = ({ emoji }: { emoji: string }) => {
    if (cursorPosition !== null) {
      const beforeCursor = newMessage.slice(0, cursorPosition);
      const afterCursor = newMessage.slice(cursorPosition);

      const updatedMessage = beforeCursor + emoji + afterCursor;

      setNewMessage(updatedMessage);
    } else {
      setNewMessage((prev) => prev + emoji);
    }
  };

  return (
    <>
      {openEmoji && (
        <div className="absolute bottom-full mb-2">
          <EmojiPicker
            open={openEmoji}
            lazyLoadEmojis
            searchDisabled
            skinTonesDisabled
            onEmojiClick={onEmojiClick}
          />
        </div>
      )}
      <Button
        variant="default"
        className={cn(
          "rounded-full size-12 bg-white hover:bg-cyan-700 text-cyan-700 hover:text-white",
          openEmoji && "bg-cyan-700 text-white",
        )}
        onClick={() => setOpenEmoji((prev) => !prev)}
      >
        <SmilePlus className="size-6 shrink-0" />
      </Button>
    </>
  );
}
