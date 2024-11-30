import { MessageCirclePlus } from "lucide-react";

export default function EmptyChatBox() {
  return (
    <div className="bg-stone-200 h-screen flex-center flex-col gap-4">
      <MessageCirclePlus className="size-24 text-stone-500" />
      <p className="text-muted-foreground font-semibold text-xl">
        Select a User and start a chat
      </p>
    </div>
  );
}
