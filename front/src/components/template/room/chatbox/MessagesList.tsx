import Message from "@/components/modules/room/chatbox/Message.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";

export default function MessagesList() {
  return (
    <ScrollArea className="h-full p-4">
      <div className="flex flex-col gap-y-6">
        <Message />
      </div>
    </ScrollArea>
  );
}
