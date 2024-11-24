import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { SendHorizontal, SmilePlus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useState } from "react";

export default function MessageInput() {
  const [messageInput, setMessageInput] = useState<string>("");
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  return (
    <div className="absolute bottom-0 start-0 mb-6 end-0">
      <EmojiPicker
        open={openEmoji}
        onEmojiClick={({ emoji, unified }) => {
          console.log(unified);
          setMessageInput((prev) => prev + emoji);
        }}
        className="left-24 bottom-1"
      />
      <div className="flex items-center justify-between gap-2 px-10">
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
        <Textarea
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="resize-none rounded-3xl min-h-4 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-transparent"
          placeholder="write message..."
        />
        <Button
          variant="ghost"
          className="rounded-full size-12 bg-cyan-700 text-white"
        >
          <SendHorizontal className="size-6 shrink-0" />
        </Button>
      </div>
    </div>
  );
}
