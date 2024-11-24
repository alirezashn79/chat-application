import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { CheckCheck } from "lucide-react";
import { Card } from "@/components/ui/card.tsx";

export default function UserCard() {
  return (
    <Card className="cursor-pointer group hover:shadow-stone-500">
      <div className="flex items-center gap-4 py-3 px-2">
        <div className="relative online">
          <Avatar className="group-hover:scale-105 duration-100">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-bold group-hover:text-sm transition-all">
            Alireza sharifi nasab
          </p>
          <div className="flex items-center gap-1">
            <p className="text-[10px] text-muted-foreground line-clamp-1 transition-all duration-100">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
              autem commodi dicta dignissimos illo ipsam iure laborum, libero
              recusandae sint sit veniam voluptatem voluptatibus. Accusamus
              beatae deserunt earum libero suscipit!
            </p>
            <CheckCheck className="shrink-0 size-4" />
          </div>
        </div>
      </div>
    </Card>
  );
}
