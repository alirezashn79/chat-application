import { LogOut, Menu } from "lucide-react";

import LogoutComponent from "@/components/template/room/sidebar/Logout.tsx";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserContext } from "@/contexts/user";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function MenuOptions() {
  /* ---------- context ---------- */
  const { user } = useUserContext();

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="px-1 py-0">
            <Menu className="shrink-0 !size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 ml-1">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <div className="flex items-center gap-8 p-2 w-full">
              <div>
                <Avatar className="group-hover:scale-105 duration-100">
                  <AvatarImage src={user?.avatar ?? ""} />
                  <AvatarFallback>
                    {`${user?.firstName[0].toUpperCase()}${user?.lastName[0].toUpperCase()}`}
                  </AvatarFallback>
                </Avatar>
              </div>

              <p>
                {user?.firstName} {user?.lastName}
              </p>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="hover:text-destructive">
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="p-0 w-full justify-start">
                <LogOut />
                <span>Logout</span>
              </Button>
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutComponent />
    </AlertDialog>
  );
}
