import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { userSchema } from "./user";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { conversationSchema } from "./conversation";

const userConversationSchema = pgTable("userConversations", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("userId")
    .references(() => userSchema.id)
    .notNull(),
  conversationId: uuid("conversationId")
    .references(() => conversationSchema.id)
    .notNull(),
});

type UserConversation = InferSelectModel<typeof userConversationSchema>;
type NewUserConversation = InferInsertModel<typeof userConversationSchema>;

export type { UserConversation, NewUserConversation };

export { userConversationSchema };
