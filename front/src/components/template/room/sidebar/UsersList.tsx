import UserCard from "@/components/modules/room/sidebar/UserCard.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import client from "@/configs/axiosRequest.ts";
import useNotification from "@/hooks/useNotification";
import useConversation from "@/store";
import { User } from "@/types";
import { Frown } from "lucide-react";
import { useEffect } from "react";
import useSWR from "swr";

export default function UsersList() {
  /* ---------- store ---------- */
  const { users, setUsers, notifications } = useConversation();

  /* ---------- hook ---------- */
  const { data, isLoading } = useSWR<Array<User>>("users", () => {
    return client.get("/api/user/all").then((res) => res.data);
  });

  useNotification();

  /* ---------- constant ---------- */
  const userNotifications = (userId: string) => {
    return notifications?.find((item) => item.senderId === userId);
  };

  /* ---------- life cycle ---------- */
  useEffect(() => {
    if (data) setUsers(data);
  }, [data, setUsers]);

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 5 })
          .fill(undefined)
          .map((_, idx) => (
            <div key={idx} className="flex items-center space-x-4">
              <Skeleton className="size-12 shrink-0 rounded-full" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-4" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
      </>
    );
  }

  if (!users?.length) {
    return (
      <div className="flex-center flex-col pt-10">
        <Frown className="text-muted-foreground size-12" />
        <p className="text-muted-foreground text-lg font-semibold">
          You are alone
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full pr-2">
      <div className="flex flex-col gap-4">
        {users?.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            notifications={userNotifications(user.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
