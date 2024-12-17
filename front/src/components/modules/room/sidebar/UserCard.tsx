import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card.tsx";
import { useSocketContext } from "@/contexts/socket.tsx";
import { cn } from "@/lib/utils.ts";
import useConversation from "@/store";
import { NotificationType, User } from "@/types";

export default function UserCard({
  user,
  notifications,
}: {
  user: User;
  notifications?: NotificationType | undefined;
}) {
  /* ---------- hook ---------- */
  const { selectedConversation, setSelectedConversation } = useConversation();

  /* ---------- context ---------- */
  const { onlineUsers } = useSocketContext();

  /* ---------- constant ---------- */
  const isOnline = onlineUsers?.some((item) => item === user.id);

  /* ---------- handler ---------- */
  const handleSelectConversation = () => {
    setSelectedConversation(user);
  };

  /* ---------- constant ---------- */
  const isSelectedConversation = selectedConversation?.id === user.id;

  return (
    <Card
      onClick={handleSelectConversation}
      className={cn(
        "cursor-pointer group hover:shadow-stone-500",
        isSelectedConversation && "shadow-stone-500"
      )}
    >
      <div className="py-3 px-2 space-y-2">
        <div className="flex items-center gap-4 ">
          <div className={cn("relative", isOnline && "online")}>
            <Avatar
              className={cn(
                "group-hover:scale-105 duration-100",
                isSelectedConversation && "scale-105"
              )}
            >
              {user.avatar && <AvatarImage src={user.avatar} />}
              <AvatarFallback>
                {`${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-1">
            <p
              className={cn(
                "text-xs font-semibold group-hover:text-sm transition-all",
                isSelectedConversation && "font-bold text-sm text-amber-800"
              )}
            >
              {user.firstName} {user.lastName}
            </p>
            {/*<div className="flex items-center gap-1">*/}
            {/*  <p className="text-[10px] text-muted-foreground line-clamp-1 transition-all duration-100">*/}
            {/*    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet*/}
            {/*    autem commodi dicta dignissimos illo ipsam iure laborum, libero*/}
            {/*    recusandae sint sit veniam voluptatem voluptatibus. Accusamus*/}
            {/*    beatae deserunt earum libero suscipit!*/}
            {/*  </p>*/}
            {/*  <CheckCheck className="shrink-0 size-4" />*/}
            {/*</div>*/}
          </div>

          {notifications && (
            <Badge variant="destructive" className="ml-auto">
              {notifications?.count}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
