import styles from "./ChatBox.module.css";
import { cn } from "@/lib/utils.ts";
import ChatHeader from "@/components/template/room/chatbox/ChatHeader.tsx";
import MessagesList from "@/components/template/room/chatbox/MessagesList.tsx";
import MessageBox from "@/components/template/room/chatbox/MessageBox.tsx";
import useConversation from "@/store";
import EmptyChatBox from "@/components/template/room/chatbox/EmptyChatBox.tsx";
import { useThemeContext } from "@/contexts/theme.tsx";

export default function ChatBox() {
  /* ---------- store ---------- */
  const { selectedConversation } = useConversation();

  /* ---------- hook ---------- */
  const { theme } = useThemeContext();

  return (
    <section>
      {selectedConversation ? (
        <>
          <ChatHeader />
          <main
            className={cn(
              styles.chat,
              theme === "light" ? styles.light : styles.dark,
            )}
          >
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
