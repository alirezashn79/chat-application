import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import client from "@/configs/axiosRequest";
import { useSocketContext } from "@/contexts/socket";
import useConversation from "@/store";
import { User } from "@/types";
import { EllipsisVertical } from "lucide-react";
import { useEffect, useRef } from "react";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await client.get<User>(url);
  return res.data;
};

export default function ChatHeader() {
  /* ---------- store ---------- */
  const { selectedConversation, setSelectedConversation } = useConversation();

  /* ---------- hook ---------- */
  const {
    data: user,
    mutate,
    isLoading,
  } = useSWR<User>(`/api/user/${selectedConversation?.id}`, fetcher);

  /* ---------- ref ---------- */
  const initialRender = useRef(true);

  /* ---------- context ---------- */
  const { onlineUsers } = useSocketContext();

  const isUserOnline = onlineUsers?.some((item) => item === user?.id);

  /* ---------- lifecycle ---------- */
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (!isUserOnline) {
      console.log("mutate");
      mutate();
    }
  }, [isUserOnline, mutate]);

  if (isLoading) {
    return (
      <header>
        <div className="h-16 p-2  flex items-center justify-between border-b-2">
          <div className="flex-center gap-4">
            <Skeleton className="size-11 rounded-full" />

            <div className="space-y-2">
              <Skeleton className="h-3 w-[250px]" />
              <Skeleton className="h-3 w-[200px]" />
            </div>
          </div>

          <Skeleton className="h-5 w-2 rounded-full mr-4" />
        </div>
      </header>
    );
  }

  return (
    <header>
      <div className="h-16 p-2  flex items-center justify-between border-b-2">
        <div className="flex-center gap-4">
          <Avatar>
            <AvatarImage src={user?.avatar ?? ""} />
          </Avatar>

          <div>
            <p className="text-base">
              {user?.firstName} {user?.lastName}
            </p>
            {isUserOnline ? (
              <span className="text-green-600 text-xs font-bold">Online</span>
            ) : (
              <span className="text-slate-500 text-xs font-bold">
                Last Seen at {user?.lastSeenTime}
              </span>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="me-2">
            <DropdownMenuItem>
              <div
                className="cursor-pointer text-destructive w-full"
                onClick={() => {
                  setSelectedConversation(null);
                }}
              >
                close
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
