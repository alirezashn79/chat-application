import styles from "./ChatBox.module.css";
import { cn } from "@/lib/utils.ts";
import ChatHeader from "@/components/template/room/chatbox/ChatHeader.tsx";
import MessagesList from "@/components/template/room/chatbox/MessagesList.tsx";
import MessageInput from "@/components/template/room/chatbox/MessageInput.tsx";

export default function ChatBox() {
  return (
    <section>
      <ChatHeader />
      <main className={cn(styles.chat, styles.light)}>
        <MessagesList />
        <MessageInput />
      </main>
    </section>
  );
}
