import UserCard from "@/components/modules/room/sidebar/UserCard.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";

export default function UsersList() {
  return (
    <ScrollArea className="h-full pr-2">
      <div className="flex flex-col gap-4">
        <UserCard />
        <UserCard />
      </div>
    </ScrollArea>
  );
}
