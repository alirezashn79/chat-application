import db from "../db";
import { userSchema } from "../db/schemas/user";
import { eq, inArray, ne, sql } from "drizzle-orm";
import { conversationSchema } from "../db/schemas/conversation";
import { userConversationSchema } from "../db/schemas/user-conversation";
import { createError } from "./helper-functions";
import { messageSchema } from "../db/schemas/message";

export async function findUserByEmail(email: string) {
  return db
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, email))
    .limit(1);
}

export async function getAllUsersExceptMe(userId: string) {
  return db
    .select({
      id: userSchema.id,
      firstName: userSchema.firstName,
      lastName: userSchema.lastName,
      avatar: userSchema.avatar,
      lastSeenTime: userSchema.lastSeenTime,
    })
    .from(userSchema)
    .where(ne(userSchema.id, userId))
    .orderBy(userSchema.createdAt);
}

export async function getConversation(senderId: string, receiverId: string) {
  const conversation = await db
    .select({ id: userConversationSchema.conversationId })
    .from(userConversationSchema)
    .where(inArray(userConversationSchema.userId, [senderId, receiverId]))
    .groupBy(userConversationSchema.conversationId)
    .having(sql`COUNT(DISTINCT ${userConversationSchema.userId}) = 2`);

  return conversation[0];
}

export async function createNewConversation(
  senderId: string,
  receiverId: string
) {
  const title = `Conversation between ${senderId} and ${receiverId}`;
  const newConversation = await db
    .insert(conversationSchema)
    .values({ title })
    .returning();
  if (newConversation.length) {
    await createNewUserConversation(
      newConversation[0].id,
      senderId,
      receiverId
    );
    return newConversation[0];
  } else {
    throw createError("error to create a conversation");
  }
}

async function createNewUserConversation(
  conversationId: string,
  senderId: string,
  receiverId: string
) {
  await db.insert(userConversationSchema).values([
    { conversationId, userId: senderId },
    { conversationId, userId: receiverId },
  ]);
}

export async function createNewMessage(newMessageData: {
  senderId: string;
  receiverId: string;
  conversationId: string;
  content: string;
}) {
  const newMessage = await db
    .insert(messageSchema)
    .values(newMessageData)
    .returning();

  if (newMessage.length) return newMessage[0];
}

export async function getMessages(conversationId: string) {
  const messages = db
    .select()
    .from(messageSchema)
    .where(eq(messageSchema.conversationId, conversationId))
    .orderBy(messageSchema.createdAt);

  if (messages) return messages;
}
