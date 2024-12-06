import { LogOut, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import LogoutComponent from "@/components/template/room/sidebar/Logout.tsx";

export default function MenuOptions() {
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
