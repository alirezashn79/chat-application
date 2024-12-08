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
    userIDs.receiverId,
  );

  if (!existingConversation) return [];

  const conversationId = existingConversation.id;
  const messages = await getMessages(conversationId);

  return messages;
}
