import { useThemeContext } from "@/contexts/theme";
import { cn } from "@/lib/utils";
import { MessageCirclePlus } from "lucide-react";

export default function EmptyChatBox() {
  /* ---------- context ---------- */
  const { theme } = useThemeContext();
  return (
    <div
      className={cn(
        " h-screen flex-center flex-col gap-4",
        theme === "light" ? "bg-stone-200" : "bg-stone-900"
      )}
    >
      <MessageCirclePlus className="size-24 text-stone-500" />
      <p className="text-muted-foreground font-semibold text-xl">
        Select a User and start a chat
      </p>
    </div>
  );
}
