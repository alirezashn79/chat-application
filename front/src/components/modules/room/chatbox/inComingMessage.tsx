import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";

export default function InComingMessage() {
  return (
    <div className="flex items-end gap-2.5">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="p-2 bg-white rounded-2xl rounded-bl-none">
        <p>سلام داش خوبی سلامتی؟</p>
        <div className="pt-3 flex justify-end">
          <span className="text-xs text-muted-foreground">11:51</span>
        </div>
      </div>
    </div>
  );
}
