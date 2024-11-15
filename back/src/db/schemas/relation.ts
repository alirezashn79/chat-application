import { relations } from "drizzle-orm";
import { messageSchema } from "./message";
import { userSchema } from "./user";
import { conversationSchema } from "./conversation";
import { userConversationSchema } from "./user-conversation";

// Message Relation
relations(messageSchema, ({ one }) => ({
  sender: one(userSchema, {
    fields: [messageSchema.senderId],
    references: [userSchema.id],
  }),
  receiver: one(userSchema, {
    fields: [messageSchema.receiverId],
    references: [userSchema.id],
  }),
  conversation: one(conversationSchema, {
    fields: [messageSchema.conversationId],
    references: [conversationSchema.id],
  }),
}));

// User Relation
relations(userSchema, ({ many }) => ({
  conversations: many(userConversationSchema),
  sentMessages: many(messageSchema),
  receivedMessages: many(messageSchema),
}));

// Conversation Relation
relations(conversationSchema, ({ many }) => ({
  messages: many(messageSchema),
  users: many(userConversationSchema),
}));

// User-Conversation Relation
relations(userConversationSchema, ({ one }) => ({
  user: one(userSchema, {
    fields: [userConversationSchema.userId],
    references: [userSchema.id],
  }),
  conversation: one(conversationSchema, {
    fields: [userConversationSchema.conversationId],
    references: [conversationSchema.id],
  }),
}));
