import styles from "./ChatBox.module.css";
import { cn } from "@/lib/utils.ts";
import ChatHeader from "@/components/template/room/chatbox/ChatHeader.tsx";
import MessagesList from "@/components/template/room/chatbox/MessagesList.tsx";
import MessageBox from "@/components/template/room/chatbox/MessageBox.tsx";
import useConversation from "@/store";
import EmptyChatBox from "@/components/template/room/chatbox/EmptyChatBox.tsx";

export default function ChatBox() {
  /* ---------- store ---------- */
  const { selectedConversation } = useConversation();

  console.log(selectedConversation);

  return (
    <section>
      {selectedConversation ? (
        <>
          <ChatHeader />
          <main className={cn(styles.chat, styles.light)}>
            <MessagesList />
            <MessageBox />
          </main>
        </>
      ) : (
        <EmptyChatBox />
      )}
    </section>
  );
}
