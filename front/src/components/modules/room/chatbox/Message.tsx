import InComingMessage from "@/components/modules/room/chatbox/inComingMessage.tsx";
import OutComingMessage from "@/components/modules/room/chatbox/outComingMessage.tsx";

export default function Message() {
  return (
    <>
      <InComingMessage />
      <OutComingMessage />
    </>
  );
}
