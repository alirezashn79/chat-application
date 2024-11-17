import { Response } from "express";
import {
  createNewConversation,
  createNewMessage,
  getConversationId,
} from "../helpers/db-helpers";

interface MessageDataType {
  senderId: string;
  receiverId: string;
  content: string;
}

export async function sendMessageService(
  res: Response,
  { senderId, receiverId, content }: MessageDataType,
) {
  let conversationId: string;
  const existingConversation = await getConversationId(senderId, receiverId);

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

  return newMessage;
}
