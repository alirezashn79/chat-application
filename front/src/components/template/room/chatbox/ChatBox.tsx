import styles from "./ChatBox.module.css";
import { cn } from "@/lib/utils.ts";
import ChatHeader from "@/components/template/room/chatbox/ChatHeader.tsx";
import MessagesList from "@/components/template/room/chatbox/MessagesList.tsx";
import MessageBox from "@/components/template/room/chatbox/MessageBox.tsx";

export default function ChatBox() {
  return (
    <section>
      <ChatHeader />
      <main className={cn(styles.chat, styles.light)}>
        <MessagesList />
        <MessageBox />
      </main>
    </section>
  );
}
