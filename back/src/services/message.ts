import { and, count, eq } from "drizzle-orm";
import db from "../db";
import { messageSchema } from "../db/schemas/message";
import {
  createNewConversation,
  createNewMessage,
  getConversation,
  getMessages,
} from "../helpers/db-helpers";
import { sendNewMessageSocket } from "../socket";

interface MessageDataType {
  senderId: string;
  receiverId: string;
  content: string;
}

export async function sendMessageService({
  senderId,
  receiverId,
  content,
}: MessageDataType) {
  let conversationId: string;
  const existingConversation = await getConversation(senderId, receiverId);

  if (existingConversation) {
    conversationId = existingConversation.id;
  } else {
    const newConversation = await createNewConversation(senderId, receiverId);
    conversationId = newConversation.id;
  }

  const newMessageData = {
    senderId,
    receiverId,
    conversationId,
    content,
  };

  const newMessage = await createNewMessage(newMessageData);

  sendNewMessageSocket(newMessage!);

  return newMessage;
}

export async function getMessagesService(userIDs: {
  senderId: string;
  receiverId: string;
}) {
  const existingConversation = await getConversation(
    userIDs.senderId,
    userIDs.receiverId
  );

  if (!existingConversation) return [];

  const conversationId = existingConversation.id;
  const messages = await getMessages(conversationId);

  return messages;
}

export async function unreadMessagesService(receiverId: string) {
  const unreadMessages = await db
    .select({
      senderId: messageSchema.senderId,
      count: count(messageSchema.id),
    })
    .from(messageSchema)
    .where(
      and(
        eq(messageSchema.receiverId, receiverId),
        eq(messageSchema.isRead, false)
      )
    )
    .groupBy(messageSchema.senderId);

  if (unreadMessages.length > 0) {
    return unreadMessages;
  } else {
    return [];
  }
}
