import client from "@/configs/axiosRequest";
import { useSocketContext } from "@/contexts/socket";
import useConversation from "@/store";
import { NotificationType } from "@/types";
import { useEffect } from "react";
import useSWR from "swr";

const fetcher = async () => {
  const res = await client.get<Array<NotificationType>>(
    "/api/message/unreadMessages"
  );
  return res.data;
};

export default function useNotification() {
  /* ---------- state ---------- */

  /* ---------- context ---------- */
  const { socket } = useSocketContext();

  /* ---------- store ---------- */
  const { notifications, setNotifications, selectedConversation } =
    useConversation();

  /* ---------- hook ---------- */
  const { data, mutate } = useSWR<Array<NotificationType>>(
    "notifications",
    fetcher
  );

  useEffect(() => {
    if (data) setNotifications(data);
  }, [data, setNotifications]);

  useEffect(() => {
    socket?.on("notifications", async () => {
      await mutate();
    });

    return () => {
      socket?.off("notifications");
    };
  }, [socket, mutate]);

  useEffect(() => {
    const isNotification = notifications.some(
      (item) => item.senderId === selectedConversation?.id
    );

    if (isNotification) {
      const filteredNotifications = notifications
        .slice()
        .filter((item) => item.senderId !== selectedConversation?.id);

      setNotifications(filteredNotifications);
    }
  }, [selectedConversation, setNotifications]);
}
